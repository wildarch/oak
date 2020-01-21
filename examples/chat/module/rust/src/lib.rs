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

use log::info;
use oak::grpc::Invocation;
use oak::grpc::OakNode;
use oak::Node;
use std::collections::HashMap;

mod backend;
mod proto;

/// An Oak Node that routes incoming gRPC connections to Room nodes, according to the label attached
/// by the client to the incoming gRPC request.
///
/// For each incoming gRPC invocation, it checks the corresponding label, and if a Room node
/// handling that label already exists, forwards the connection to it, without looking at the
/// incoming request (which would otherwise taint this node with the corresponding label). If a Room
/// node for that label does not exist, it creates one, together with a channel, and keeps the write
/// end of that channel in an in-memory map, keyed by the label.create_room_node()
///
/// In principle anyone would be able to send data with a specific label, since labels themselves
/// are public. Therefore there is no guarantee that labelled data that arrives to the Room node
/// actually originates from one of the other users of the Room. This problem is instead solved by
/// integrity labels, which are not supported at the moment.
///
/// Note that this node only ever observes public data (including labels), and never changes its own
/// label from "public".
#[derive(Default)]
struct Router {
    rooms: HashMap<oak::label::Label, oak::io::Sender<Invocation>>,
}

// TODO(#462): Change application configuration to use this function as main entry point.
#[no_mangle]
pub extern "C" fn router_oak_main(in_handle: u64) {
    let _ = std::panic::catch_unwind(|| {
        oak_log::init_default();
        oak::set_panic_hook();
        let router = Router::default();
        ::oak::run_event_loop(router, in_handle);
    });
}

// TODO: Make this node generic over a trait `Routable` or similar, which determines what to route
// incoming messages based on.
impl Node<Invocation> for Router {
    fn new() -> Self {
        Router::default()
    }

    fn handle_command(&mut self, grpc_invocation: Invocation) -> Result<(), oak::OakError> {
        let grpc_invocation_label = grpc_invocation.request_receiver.label()?;
        info!(
            "handling incoming gRPC invocation with label {:?}",
            grpc_invocation_label
        );
        let room_node_sender = self
            .rooms
            .entry(grpc_invocation_label.clone())
            .or_insert_with(|| create_room_node(&grpc_invocation_label));
        room_node_sender.send(&grpc_invocation)
    }
}

fn create_room_node(grpc_invocation_label: &oak::label::Label) -> oak::io::Sender<Invocation> {
    let (wh, rh) = oak::channel_create_with_label(grpc_invocation_label).unwrap();
    oak::node_create_with_label("room-config", "oak_main", rh, grpc_invocation_label)
        .expect("could not create node");
    oak::channel_close(rh.handle).expect("could not close channel");
    oak::io::Sender::new(wh)
}
