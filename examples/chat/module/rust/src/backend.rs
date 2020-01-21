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

use crate::proto::chat::Message;
use crate::proto::chat::{
    CreateRoomRequest, DestroyRoomRequest, GetAllMessagesCountResponse, SubscribeRequest,
};
use crate::proto::chat_grpc::{dispatch, ChatNode};
use log::{error, info};
use oak::grpc;
use oak::grpc::OakNode;
use oak_derive::OakExports;
use protobuf::well_known_types::Empty;

type AdminToken = Vec<u8>;

/// An Oak Node dedicated to handling chat functionality for a pre-determined and fixed label.
#[derive(Default, OakExports)]
struct Room {
    initialized: bool,
    admin_token: AdminToken,
    messages: Vec<Message>,
    clients: Vec<oak::grpc::ChannelResponseWriter>,
}

impl OakNode for Room {
    fn new() -> Self {
        oak_log::init_default();
        Room::default()
    }

    fn invoke(&mut self, method: &str, req: &[u8], writer: grpc::ChannelResponseWriter) {
        dispatch(self, method, req, writer)
    }
}

impl ChatNode for Room {
    fn create_room(&mut self, req: CreateRoomRequest) -> grpc::Result<Empty> {
        if self.initialized {
            return Err(grpc::build_status(
                grpc::Code::ALREADY_EXISTS,
                "room already created",
            ));
        }

        info!("creating room");
        self.admin_token = req.admin_token;
        self.initialized = true;

        Ok(Empty::new())
    }

    fn destroy_room(&mut self, req: DestroyRoomRequest) -> grpc::Result<Empty> {
        if !self.initialized {
            return Err(grpc::build_status(
                grpc::Code::PERMISSION_DENIED,
                "room not initialized",
            ));
        }

        info!("destroying room");
        if self.admin_token == req.admin_token {
            self.close_all();
            Ok(Empty::new())
        } else {
            Err(grpc::build_status(
                grpc::Code::PERMISSION_DENIED,
                "invalid admin token",
            ))
        }
    }

    fn subscribe(&mut self, _req: SubscribeRequest, mut writer: grpc::ChannelResponseWriter) {
        if !self.initialized {
            writer
                .close(Err(grpc::build_status(
                    grpc::Code::PERMISSION_DENIED,
                    "room not initialized",
                )))
                .expect("could not send gRPC response");
        }

        info!("subscribing to room");
        self.clients.push(writer);
    }

    fn send_message(&mut self, req: Message) -> grpc::Result<Empty> {
        if !self.initialized {
            return Err(grpc::build_status(
                grpc::Code::PERMISSION_DENIED,
                "room not initialized",
            ));
        }

        info!("new message to room");
        self.messages.push(req.clone());
        for writer in &mut self.clients {
            writer
                .write(&req, oak::grpc::WriteMode::KeepOpen)
                .expect("could not write to channel");
        }
        Ok(Empty::new())
    }

    fn get_all_messages_count(&mut self, req: Empty) -> grpc::Result<GetAllMessagesCountResponse> {
        Err(grpc::build_status(grpc::Code::UNIMPLEMENTED, "n"))
    }
}

impl Room {
    fn close_all(&mut self) {
        for writer in &mut self.clients {
            writer
                .close(Ok(()))
                .unwrap_or_else(|err| error!("could not close channel: {:?}", err))
        }
    }
}
