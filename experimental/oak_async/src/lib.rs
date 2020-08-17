use futures::{
    executor::{LocalPool, LocalSpawner},
    future::RemoteHandle,
    stream::BoxStream,
    task::LocalSpawnExt,
    Stream, StreamExt,
};
use log::info;
use oak::{
    grpc::Invocation,
    io::{Decodable, Message, Receiver},
    ChannelReadStatus, Handle, OakError, OakStatus, ReadHandle,
};
use std::{
    cell::RefCell,
    collections::{hash_map::Entry, HashMap},
    future::Future,
    pin::Pin,
    sync::atomic::{AtomicUsize, Ordering},
    task::{Context, Poll, Waker},
};

std::thread_local! {
    static EXECUTOR_STATE: ExecutorState = ExecutorState::new();
}

struct ExecutorState {
    // Used to generate unique ids for readers. Incremented every time a new reader is created.
    reader_id: AtomicUsize,
    // Why not use the Handle as key? Though unlikely in practice, there is nothing stopping a user
    // from having multiple futures reading the same channel, which we cannot support without this
    // indirection.
    waiting_handles: RefCell<HashMap<usize, (Handle, Waker)>>,
    ready_data: RefCell<HashMap<usize, Result<Message, OakError>>>,
    spawner: RefCell<Option<LocalSpawner>>,
}

impl ExecutorState {
    pub fn new() -> ExecutorState {
        ExecutorState {
            reader_id: AtomicUsize::new(0),
            waiting_handles: RefCell::new(HashMap::new()),
            ready_data: RefCell::new(HashMap::new()),
            spawner: RefCell::new(None),
        }
    }

    pub fn none_waiting(&self) -> bool {
        self.waiting_handles.borrow().is_empty()
    }

    pub fn waiting_readers(&self) -> (Vec<usize>, Vec<Handle>) {
        self.waiting_handles
            .borrow()
            .iter()
            .map(|(r, (h, _))| (*r, *h))
            .unzip()
    }

    pub fn set_ready(&self, reader_id: usize, data: Result<Message, OakError>) {
        self.ready_data.borrow_mut().insert(reader_id, data);
        if let Some((handle, waker)) = self.waiting_handles.borrow_mut().remove(&reader_id) {
            println!("Waking waker for handle: {:?}", handle);
            waker.wake()
        } else {
            eprintln!(
                "set_ready called for reader {}, which was not registered as waiting",
                reader_id,
            );
        }
    }

    pub fn take_ready(&self, reader_id: usize) -> Option<Result<Message, OakError>> {
        self.ready_data.borrow_mut().remove(&reader_id)
    }

    pub fn add_waiting_reader(&self, reader_id: usize, handle: Handle, waker: &Waker) {
        match self.waiting_handles.borrow_mut().entry(reader_id) {
            Entry::Occupied(mut entry) => {
                // Only replace the current waker if it would wake a different future.
                if !entry.get().1.will_wake(waker) {
                    *entry.get_mut() = (handle, waker.clone());
                }
            }
            Entry::Vacant(entry) => {
                entry.insert((handle, waker.clone()));
            }
        }
    }

    pub fn remove_waiting_reader(&self, reader_id: usize) {
        let _ = self.waiting_handles.borrow_mut().remove(&reader_id);
    }

    pub fn new_reader_id(&self) -> usize {
        self.reader_id.fetch_add(1, Ordering::Relaxed)
    }

    pub fn set_spawner(&self, spawner: LocalSpawner) {
        let old_spawner = self.spawner.replace(Some(spawner));
        if let Some(_) = old_spawner {
            panic!("Another executor is running on the same thread, or failed to clean up");
        }
    }

    pub fn clear_spawner(&self) {
        self.spawner.replace(None);
    }

    pub fn with_spawner<T, F: FnOnce(&LocalSpawner) -> T>(&self, f: F) -> T {
        let maybe_spawner = self.spawner.borrow();
        let spawner = maybe_spawner
            .as_ref()
            .expect("No spawner found, is the executor running?");
        f(spawner)
    }
}

/// Mirrors `tokio::spawn`.
pub fn spawn<T>(task: T) -> JoinHandle<T::Output>
where
    T: Future + Send + 'static,
    T::Output: Send + 'static,
{
    EXECUTOR_STATE.with(|executor| {
        executor.with_spawner(|spawner| {
            JoinHandle(Some(
                spawner
                    .spawn_local_with_handle(task)
                    .expect("Failed to spawn future"),
            ))
        })
    })
}

/// Analog to `tokio::task::JoinHandle`.
#[derive(Debug)]
pub struct JoinHandle<T>(Option<RemoteHandle<T>>);

// Dropping a RemoteHandle also cancels the future, but we want Tokio's behaviour, which keeps
// polling the spawned future.
impl<T> Drop for JoinHandle<T> {
    fn drop(&mut self) {
        let inner = self.0.take().unwrap();
        inner.forget()
    }
}

impl<T: 'static> Future for JoinHandle<T> {
    // `tokio` returns Result<T, JoinError> here.
    type Output = T;

    fn poll(self: Pin<&mut Self>, cx: &mut Context) -> Poll<T> {
        let h = unsafe { self.map_unchecked_mut(|s| s.0.as_mut().unwrap()) };
        RemoteHandle::poll(h, cx)
    }
}

pub fn block_on<F: Future + 'static>(f: F) -> Result<F::Output, OakStatus>
where
{
    let mut pool = LocalPool::new();
    let spawner = pool.spawner();
    let handle = spawner
        .spawn_local_with_handle(f)
        .expect("Failed to spawn main future");

    EXECUTOR_STATE.with(|executor| {
        executor.set_spawner(spawner);

        loop {
            pool.run_until_stalled();

            // We could not make more progress but no handles are waiting: we should be done!
            if executor.none_waiting() {
                break;
            }

            // Wait for some handle to have new data
            let (readers, handles) = executor.waiting_readers();
            let data = wait_on_handles(&handles)?;

            // Find the handles that had data come in
            let readers_with_data = readers
                .iter()
                .copied()
                .zip(data.into_iter())
                .filter_map(|(c, d)| d.map(|d| (c, d)));

            // Mark all as ready and wake them.
            for (reader_id, data) in readers_with_data {
                executor.set_ready(reader_id, data);
            }
        }

        // Fetch the return value from the handle, this should return immediately.
        let result = pool.run_until(handle);
        executor.clear_spawner();
        Ok(result)
    })
}

fn wait_on_handles(
    handles: &[Handle],
) -> Result<Vec<Option<Result<Message, OakError>>>, OakStatus> {
    let handles: Vec<ReadHandle> = handles
        .iter()
        .copied()
        .map(|handle| ReadHandle { handle })
        .collect();
    Ok(oak::wait_on_channels(&handles)?
        .into_iter()
        .zip(handles.iter())
        .map(|(status, handle)| match status {
            ChannelReadStatus::ReadReady => Some(read_ready_handle(handle)),
            ChannelReadStatus::NotReady => None,
            ChannelReadStatus::InvalidChannel => {
                Some(Err(OakError::OakStatus(OakStatus::ErrBadHandle)))
            }
            ChannelReadStatus::Orphaned => {
                Some(Err(OakError::OakStatus(OakStatus::ErrChannelClosed)))
            }
            ChannelReadStatus::PermissionDenied => {
                Some(Err(OakError::OakStatus(OakStatus::ErrPermissionDenied)))
            }
        })
        .collect())
}

fn read_ready_handle(handle: &ReadHandle) -> Result<Message, OakError> {
    let mut message = Message {
        bytes: Vec::new(),
        handles: Vec::new(),
    };
    oak::channel_read(*handle, &mut message.bytes, &mut message.handles)?;
    Ok(message)
}

// Stub for Receiver::try_receive
fn try_receive(handle: Handle) -> Option<Result<Message, OakError>> {
    let mut message = Message {
        bytes: Vec::new(),
        handles: Vec::new(),
    };

    match oak::channel_read(
        ReadHandle { handle },
        &mut message.bytes,
        &mut message.handles,
    ) {
        Ok(()) => Some(Ok(message)),
        Err(OakStatus::ErrChannelEmpty) => None,
        Err(e) => Some(Err(OakError::from(e))),
    }
}

pub struct ChannelRead<T: Decodable> {
    id: usize,
    handle: Handle,
    _result: core::marker::PhantomData<T>,
}

impl<T: Decodable> ChannelRead<T> {
    pub fn new(handle: Handle) -> ChannelRead<T> {
        ChannelRead {
            id: EXECUTOR_STATE.with(|executor| executor.new_reader_id()),
            handle,
            _result: core::marker::PhantomData,
        }
    }
}

impl<T: Decodable> Future for ChannelRead<T> {
    type Output = Result<T, OakError>;

    fn poll(self: Pin<&mut Self>, cx: &mut Context) -> Poll<Self::Output> {
        EXECUTOR_STATE.with(|executor| {
            if let Some(data) = executor.take_ready(self.id) {
                return Poll::Ready(data.and_then(|data| T::decode(&data)));
            }
            // Eagerly try to read from the handle, in case data is already available.
            // TODO: Could we further optimize this by checking if we've already added ourselves to
            // the waiting handle?
            else if let Some(data) = try_receive(self.handle) {
                return Poll::Ready(data.and_then(|data| T::decode(&data)));
            }
            executor.add_waiting_reader(self.id, self.handle, cx.waker());
            Poll::Pending
        })
    }
}

impl<T: Decodable> Drop for ChannelRead<T> {
    fn drop(&mut self) {
        // Make sure the executor doesn't wait for this handle if we drop the future.
        EXECUTOR_STATE.with(|executor| executor.remove_waiting_reader(self.id));
    }
}

// TODO(wildarch): Implement a stream type to avoid allocating on the heap.
pub struct ChannelReadStream<T: Decodable>(BoxStream<'static, Result<T, OakError>>);

impl<T: Decodable> Stream for ChannelReadStream<T> {
    type Item = Result<T, OakError>;

    fn poll_next(self: Pin<&mut Self>, cx: &mut Context) -> Poll<Option<Self::Item>> {
        Stream::poll_next(unsafe { self.map_unchecked_mut(|s| &mut s.0) }, cx)
    }

    fn size_hint(&self) -> (usize, Option<usize>) {
        self.0.size_hint()
    }
}

pub trait ReceiverAsync {
    type Message: Decodable;
    fn receive_async(&self) -> ChannelRead<Self::Message>;

    fn receive_stream(self) -> ChannelReadStream<Self::Message>;
}

impl<T: Decodable + Send> ReceiverAsync for Receiver<T> {
    type Message = T;

    fn receive_async(&self) -> ChannelRead<Self::Message> {
        ChannelRead::new(self.handle.handle)
    }

    fn receive_stream(self) -> ChannelReadStream<Self::Message> {
        ChannelReadStream(
            futures::stream::unfold(self.handle.handle, |handle| async move {
                let msg = ChannelRead::new(handle).await;
                if let Err(OakError::OakStatus(OakStatus::ErrChannelClosed)) = msg {
                    None
                } else {
                    Some((msg, handle))
                }
            })
            .boxed(),
        )
    }
}

pub fn run_async_event_loop<F, R>(receiver: Receiver<Invocation>, handler: F)
where
    F: FnOnce(ChannelReadStream<Invocation>) -> R,
    R: Future<Output = ()> + 'static,
{
    match block_on(handler(receiver.receive_stream())) {
        Ok(()) => {}
        Err(OakStatus::ErrTerminated) => {
            info!("Received termination status, terminating event loop");
        }
        Err(e) => panic!("Event loop received non-termination error: {:?}", e),
    }
}
