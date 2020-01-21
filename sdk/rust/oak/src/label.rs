//
// Copyright 2020 The Project Oak Authors
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

/// Placeholder implementation of a label.
#[derive(Debug, Hash, PartialEq, Eq, Clone)]
pub struct Label(pub Vec<u8>);

impl Label {
    /// Returns the least restrictive label, that allows the associated node or channel to handle
    /// public messages.
    pub fn public() -> Label {
        Label(Vec::new())
    }

    pub fn can_flow_to(other: &Label) -> bool {
        true
    }
}

pub fn get_node_label() -> Result<Label, crate::OakStatus> {
    // TODO: Implement this via `oak_abi`.
    Ok(Label::public())
}
