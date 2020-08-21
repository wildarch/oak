//
// Copyright 2018 The Project Oak Authors
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

pub mod proto {
    include!(concat!(env!("OUT_DIR"), "/oak.examples.hello_world.rs"));
}

use log::info;
use oak::grpc;
use proto::{HelloRequest, HelloResponse, HelloWorld, HelloWorldDispatcher};

/*
oak::entrypoint!(old_oak_main => |_in_channel| {
    oak::logger::init_default();
    let node = Node {
        translator: grpc::client::Client::new(&oak::node_config::wasm("translator", "oak_main"))
            .map(translator_common::TranslatorClient),
    };
    let dispatcher = HelloWorldDispatcher::new(node);
    let grpc_channel =
        oak::grpc::server::init("[::]:8080").expect("could not create gRPC server pseudo-Node");
    oak::run_event_loop(dispatcher, grpc_channel);
});
*/

oak::entrypoint!(oak_main => |_in_channel| {
    oak::logger::init_default();
    let grpc_channel =
        oak::grpc::server::init("[::]:8080").expect("could not create gRPC server pseudo-Node");
    oak_async::run_async_event_loop(grpc_channel, async_handler);
});

use oak::grpc::Invocation;
use oak_async::ChannelReadStream;
async fn async_handler(invocations: ChannelReadStream<Invocation>) {
    use futures::{
        stream::{self, BoxStream},
        Stream, StreamExt, TryStreamExt,
    };
    use oak::{
        grpc::{ChannelResponseWriter, WriteMode},
        io::Encodable,
        OakError,
    };
    use oak_async::ReceiverAsync;
    use prost::Message;
    #[must_use = "Must send a reply"]
    struct OneshotWriter<T> {
        writer: ChannelResponseWriter,
        _msg: core::marker::PhantomData<T>,
    }

    impl<T: Encodable + ::prost::Message> OneshotWriter<T> {
        pub fn new(writer: ChannelResponseWriter) -> OneshotWriter<T> {
            OneshotWriter {
                writer,
                _msg: core::marker::PhantomData,
            }
        }

        pub fn send(self, msg: &T) -> Result<(), OakError> {
            self.writer.write(msg, WriteMode::Close)
        }
    }

    struct MultiWriter<T> {
        writer: ChannelResponseWriter,
        _msg: core::marker::PhantomData<T>,
    }

    impl<T: Encodable + ::prost::Message> MultiWriter<T> {
        pub fn new(writer: ChannelResponseWriter) -> MultiWriter<T> {
            MultiWriter {
                writer,
                _msg: core::marker::PhantomData,
            }
        }

        pub fn send(&self, msg: &T) -> Result<(), OakError> {
            self.writer.write(msg, WriteMode::KeepOpen)
        }
    }

    impl<T> Drop for MultiWriter<T> {
        fn drop(&mut self) {
            self.writer.close(Ok(())).unwrap();
        }
    }

    enum HelloWorldService {
        SayHello(HelloRequest, OneshotWriter<HelloResponse>),
        LotsOfReplies(HelloRequest, MultiWriter<HelloResponse>),
        LotsOfGreetings(
            BoxStream<'static, Result<HelloRequest, OakError>>,
            OneshotWriter<HelloResponse>,
        ),
        BidiHello(
            BoxStream<'static, Result<HelloRequest, OakError>>,
            MultiWriter<HelloResponse>,
        ),
    }

    fn code_stream(
        invocations: ChannelReadStream<Invocation>,
    ) -> impl Stream<Item = HelloWorldService> {
        invocations.then(|invocation| async move {
            let invocation = invocation.unwrap();
            let mut reqs = invocation.request_receiver.receive_stream();
            let req1 = reqs.next().await.unwrap().unwrap();
            match req1.method_name.as_str() {
                "/oak.examples.hello_world.HelloWorld/SayHello" => HelloWorldService::SayHello(
                    HelloRequest::decode(&req1.req_msg[..]).unwrap(),
                    OneshotWriter::new(ChannelResponseWriter::new(invocation.response_sender)),
                ),
                "/oak.examples.hello_world.HelloWorld/LotsOfReplies" => {
                    HelloWorldService::LotsOfReplies(
                        HelloRequest::decode(&req1.req_msg[..]).unwrap(),
                        MultiWriter::new(ChannelResponseWriter::new(invocation.response_sender)),
                    )
                }
                "/oak.examples.hello_world.HelloWorld/LotsOfGreetings" => {
                    let reqs = stream::once(async { Ok(req1) }).chain(reqs);
                    HelloWorldService::LotsOfGreetings(
                        reqs.map(|req| {
                            let req = req?;
                            Ok(HelloRequest::decode(&req.req_msg[..])?)
                        })
                        .boxed(),
                        OneshotWriter::new(ChannelResponseWriter::new(invocation.response_sender)),
                    )
                }
                "/oak.examples.hello_world.HelloWorld/BidiHello" => {
                    let reqs = stream::once(async { Ok(req1) }).chain(reqs);
                    HelloWorldService::BidiHello(
                        reqs.map(|req| {
                            let req = req?;
                            Ok(HelloRequest::decode(&req.req_msg[..])?)
                        })
                        .boxed(),
                        MultiWriter::new(ChannelResponseWriter::new(invocation.response_sender)),
                    )
                }
                method => panic!("Unknown request method: {}", method),
            }
        })
    }

    fn translate(
        translator: &Option<translator_common::TranslatorClient>,
        text: &str,
        from_lang: &str,
        to_lang: &str,
    ) -> Option<String> {
        let client = translator.as_ref()?;
        translator_common::translate(client, text, from_lang, to_lang)
    }

    let translator = grpc::client::Client::new(&oak::node_config::wasm("translator", "oak_main"))
        .map(translator_common::TranslatorClient);
    let translator_ref = &translator;

    code_stream(invocations)
        .for_each_concurrent(None, |rpc| async move {
            match rpc {
                HelloWorldService::SayHello(request, response) => {
                    info!("Say hello to {}", request.greeting);
                    let mut res = HelloResponse::default();
                    res.reply = format!("ASYNC HELLO {}!", request.greeting);
                    response.send(&res).expect("Failed to write response");
                }
                HelloWorldService::LotsOfReplies(req, response) => {
                    info!("Say hello to {}", req.greeting);
                    let mut res1 = HelloResponse::default();
                    res1.reply = format!("HELLO {}!", req.greeting);
                    response.send(&res1).expect("Failed to write response");

                    // Attempt to also generate a translated response.
                    if let Some(salutation) = translate(translator_ref, &req.greeting, "en", "fr") {
                        info!("Say bonjour to {}", salutation);
                        let mut res = HelloResponse::default();
                        res.reply = format!("BONJOUR {}!", salutation);
                        response
                            .send(&res)
                            .expect("Failed to write translated response");
                    }

                    info!("Say hello again to {}", req.greeting);
                    let mut res2 = HelloResponse::default();
                    res2.reply = format!("HELLO AGAIN {}!", req.greeting);
                    response
                        .send(&res2)
                        .expect("Failed to write final response");
                }
                HelloWorldService::LotsOfGreetings(req, response) => {
                    let reqs: Vec<HelloRequest> =
                        req.try_collect().await.expect("Error reading stream");
                    info!("Say hello");
                    let mut msg = String::new();
                    msg.push_str("Hello ");
                    msg.push_str(&recipients(&reqs));
                    let mut res = HelloResponse::default();
                    res.reply = msg;
                    response.send(&res).expect("Failed to write response")
                }
                HelloWorldService::BidiHello(req, response) => {
                    info!("Say hello to pairs");
                    let response = &response;
                    req.map(|r| r.unwrap())
                        .chunks(2)
                        .for_each(|pair| async move {
                            let mut res1 = HelloResponse::default();
                            res1.reply = format!("HELLO {}!", pair[0].greeting);
                            response.send(&res1).expect("Failed to write response");

                            let mut res2 = HelloResponse::default();
                            res2.reply = format!("BONJOUR {}!", pair[1].greeting);
                            response.send(&res2).expect("Failed to write response");
                        })
                        .await;
                }
            }
        })
        .await;
}

struct Node {
    translator: Option<translator_common::TranslatorClient>,
}

impl Node {
    fn translate(&self, text: &str, from_lang: &str, to_lang: &str) -> Option<String> {
        let client = self.translator.as_ref()?;
        translator_common::translate(client, text, from_lang, to_lang)
    }
}

impl HelloWorld for Node {
    fn say_hello(&mut self, req: HelloRequest) -> grpc::Result<HelloResponse> {
        info!("Say hello to {}", req.greeting);
        let mut res = HelloResponse::default();
        res.reply = format!("HELLO {}!", req.greeting);
        Ok(res)
    }

    fn lots_of_replies(&mut self, req: HelloRequest, writer: grpc::ChannelResponseWriter) {
        info!("Say hello to {}", req.greeting);
        let mut res1 = HelloResponse::default();
        res1.reply = format!("HELLO {}!", req.greeting);
        writer
            .write(&res1, grpc::WriteMode::KeepOpen)
            .expect("Failed to write response");

        // Attempt to also generate a translated response.
        if let Some(salutation) = self.translate(&req.greeting, "en", "fr") {
            info!("Say bonjour to {}", salutation);
            let mut res = HelloResponse::default();
            res.reply = format!("BONJOUR {}!", salutation);
            writer
                .write(&res, grpc::WriteMode::KeepOpen)
                .expect("Failed to write translated response");
        }

        info!("Say hello again to {}", req.greeting);
        let mut res2 = HelloResponse::default();
        res2.reply = format!("HELLO AGAIN {}!", req.greeting);
        writer
            .write(&res2, grpc::WriteMode::Close)
            .expect("Failed to write final response");
    }

    fn lots_of_greetings(&mut self, reqs: Vec<HelloRequest>) -> grpc::Result<HelloResponse> {
        info!("Say hello");
        let mut msg = String::new();
        msg.push_str("Hello ");
        msg.push_str(&recipients(&reqs));
        let mut res = HelloResponse::default();
        res.reply = msg;
        Ok(res)
    }

    fn bidi_hello(&mut self, reqs: Vec<HelloRequest>, writer: grpc::ChannelResponseWriter) {
        info!("Say hello");
        let msg = recipients(&reqs);
        writer
            .write(
                &HelloResponse {
                    reply: format!("HELLO {}!", msg),
                },
                grpc::WriteMode::KeepOpen,
            )
            .expect("Failed to write response");
        let mut res2 = HelloResponse::default();
        res2.reply = format!("BONJOUR {}!", msg);
        writer
            .write(&res2, grpc::WriteMode::Close)
            .expect("Failed to write final response");
    }
}

fn recipients(reqs: &[HelloRequest]) -> String {
    let mut result = String::new();
    for (i, req) in reqs.iter().enumerate() {
        if i > 0 {
            result.push_str(", ");
        }
        result.push_str(&req.greeting);
    }
    result
}
