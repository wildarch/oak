//
// Copyright 2019 The Project Oak Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

use futures::{lock::Mutex, prelude::*};
use log::info;
use oak::{
    grpc,
    io::{Sender, SenderExt},
};
use oak_abi::proto::oak::application::ConfigMap;
use oak_async::ChannelReadStream;
use proto::{
    asynchronous::Chat,
    command::Command::{JoinRoom, SendMessage},
    Command,
};
use std::{
    collections::{hash_map::Entry, HashMap},
    sync::Arc,
};

mod backend;
mod proto {
    include!(concat!(env!("OUT_DIR"), "/oak.examples.chat.rs"));
}

type AdminToken = Vec<u8>;

oak::entrypoint!(grpc_oak_main<ConfigMap> => |_receiver| {
    oak::logger::init_default();
    let grpc_channel =
        oak::grpc::server::init("[::]:8080").expect("could not create gRPC server pseudo-Node");
    oak_async::run_command_loop(grpc_channel, async_handler);
});

async fn async_handler(invocations: ChannelReadStream<oak::grpc::Invocation>) {
    let rooms = Arc::new(Mutex::new(HashMap::new()));

    invocations
        .and_then(Chat::from_invocation)
        .try_for_each(|command| async {
            let rooms = rooms.clone();
            let mut rooms = rooms.lock().await;
            match command {
                Chat::CreateRoom(req, res) => {
                    info!("creating room");
                    if rooms.contains_key(&req.room_id) {
                        res.close_error(oak::grpc::Code::AlreadyExists, "room already exists")?;
                        return Ok(());
                    }

                    // Create a new Node for this room, and keep the write handle and admin token in
                    // the `rooms` map.
                    rooms.insert(req.room_id, Room::new(req.admin_token));
                    res.send(&())
                }
                Chat::DestroyRoom(req, res) => {
                    info!("destroying room");
                    match rooms.entry(req.room_id) {
                        Entry::Occupied(e) => {
                            if e.get().admin_token == req.admin_token {
                                // Close the only input channel that reaches the per-room Node,
                                // which will trigger it to terminate.
                                e.get().sender.close().expect("could not close channel");
                                e.remove();
                                res.send(&())
                            } else {
                                res.close_error(grpc::Code::PermissionDenied, "invalid admin token")
                            }
                        }
                        Entry::Vacant(_) => res.close_error(grpc::Code::NotFound, "room not found"),
                    }
                }
                Chat::Subscribe(req, res) => {
                    info!("subscribing to room");
                    match rooms.get(&req.room_id) {
                        None => res.close_error(grpc::Code::NotFound, "room not found"),
                        Some(room) => {
                            info!("new subscription to room {:?}", req.room_id);
                            let command = Command {
                                command: Some(JoinRoom(Sender::new(res.into_inner().handle()))),
                            };
                            room.sender.send(&command)
                        }
                    }
                }
                Chat::SendMessage(req, res) => {
                    info!("sending message to room");
                    match rooms.get(&req.room_id) {
                        None => res.close_error(grpc::Code::NotFound, "room not found"),
                        Some(room) => {
                            info!("new message to room {:?}", req.room_id);
                            let command = Command {
                                command: req.message.map(SendMessage),
                            };
                            room.sender.send(&command)?;
                            res.send(&())
                        }
                    }
                }
            }
        })
        .await
        .expect("Error handling request");
}

struct Room {
    sender: oak::io::Sender<Command>,
    admin_token: AdminToken,
}

impl Room {
    fn new(admin_token: AdminToken) -> Self {
        let (wh, rh) = oak::channel_create().unwrap();
        oak::node_create(&oak::node_config::wasm("app", "backend_oak_main"), rh)
            .expect("could not create node");
        oak::channel_close(rh.handle).expect("could not close channel");
        Room {
            sender: oak::io::Sender::new(wh),
            admin_token,
        }
    }
}
