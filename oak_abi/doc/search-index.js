var searchIndex = JSON.parse('{\
"oak_abi":{"doc":"Type, constant and Wasm host function definitions for the…","i":[[5,"wait_on_channels","oak_abi","Wait for channels to be ready for reading.",null,null],[5,"channel_read","","Read a message from a channel.",null,null],[5,"channel_write","","Write a message to a channel.",null,null],[5,"channel_write_with_downgrade","","The same as `channel_write`, but also applies the current…",null,null],[5,"channel_create","","Create a new unidirectional Channel.",null,null],[5,"channel_create_with_downgrade","","The same as `channel_create`, but also applies the current…",null,null],[5,"channel_close","","Closes the channel identified by `handle`.",null,null],[5,"channel_label_read","","Returns the label for the channel identified by `handle`.",null,null],[5,"node_label_read","","Returns the label of the current calling Node.",null,null],[5,"node_privilege_read","","Returns a label indicating the downgrade privilege of the…",null,null],[5,"node_create","","Creates a new Node instance running code identified by a…",null,null],[5,"node_create_with_downgrade","","The same as `node_create`, but also applies the current…",null,null],[5,"random_get","","Fill a buffer with random data.",null,null],[0,"label","","Labels represent the kinds of information that is allowed…",null,null],[5,"confidentiality_label","oak_abi::label","Convenience function for creating labels with a single…",null,[[["tag",3]],["label",3]]],[5,"web_assembly_module_tag","","Creates a [`Tag`] having as principal the provided…",null,[[],["tag",3]]],[5,"web_assembly_module_signature_tag","","Creates a [`Tag`] having as principal the provided…",null,[[],["tag",3]]],[5,"tls_endpoint_tag","","Creates a [`Tag`] having as principal the provided TLS…",null,[[],["tag",3]]],[5,"public_key_identity_tag","","Creates a [`Tag`] having as principal the provided…",null,[[],["tag",3]]],[5,"top","","Convenience function for creating the top tag.",null,[[],["tag",3]]],[0,"proto","oak_abi","",null,null],[0,"oak","oak_abi::proto","",null,null],[4,"OakStatus","oak_abi::proto::oak","Status values exchanged as i32 values across the Node Wasm…",null,null],[13,"Unspecified","","",0,null],[13,"Ok","","Success.",0,null],[13,"ErrBadHandle","","Invalid handle provided.",0,null],[13,"ErrInvalidArgs","","Arguments invalid.",0,null],[13,"ErrChannelClosed","","Channel has been closed.",0,null],[13,"ErrBufferTooSmall","","Provided buffer was too small for operation (an output…",0,null],[13,"ErrHandleSpaceTooSmall","","Provided handle space was too small for operation (an…",0,null],[13,"ErrOutOfRange","","Argument out of valid range.",0,null],[13,"ErrInternal","","Internal error.",0,null],[13,"ErrTerminated","","Node terminated.",0,null],[13,"ErrChannelEmpty","","Channel has no messages available to read.",0,null],[13,"ErrPermissionDenied","","The node does not have sufficient permissions to perform…",0,null],[4,"ChannelReadStatus","","Single byte values used to indicate the read status of a…",null,null],[13,"NotReady","","No pending messages available on channel.",1,null],[13,"ReadReady","","Pending message available on channel.",1,null],[13,"InvalidChannel","","Channel handle does not identify the read half of a…",1,null],[13,"Orphaned","","Channel has no extant write halves (and is empty).",1,null],[13,"PermissionDenied","","A node trying to access the channel does not have the…",1,null],[0,"application","","",null,null],[3,"ApplicationConfiguration","oak_abi::proto::oak::application","An ApplicationConfiguration represents a unit of…",null,null],[12,"wasm_modules","","Map from Wasm module names to their bytecode representation.",2,null],[12,"initial_node_configuration","","Indication of what configuration the initial Node should…",2,null],[12,"module_signatures","","The bundled signatures for validating Wasm module hashes.",2,null],[3,"ModuleSignature","","Bundled signature of the SHA-256 hash of a Wasm module.…",null,null],[12,"public_key","","",3,null],[12,"signed_hash","","",3,null],[12,"module_hash","","",3,null],[3,"NodeConfiguration","","NodeConfiguration indicates the configuration of a created…",null,null],[12,"config_type","","",4,null],[3,"WebAssemblyConfiguration","","WebAssemblyConfiguration describes the configuration of a…",null,null],[12,"wasm_module_name","","The name of one of the entries in the…",5,null],[12,"wasm_entrypoint_name","","The name of an exported WebAssembly function to invoke as…",5,null],[3,"LogConfiguration","","LogConfiguration describes the configuration of a logging…",null,null],[3,"StorageProxyConfiguration","","StorageProxyConfiguration describes the configuration of a…",null,null],[12,"address","","The address of the external storage provider.",6,null],[3,"GrpcServerConfiguration","","GrpcServerConfiguration describes the configuration of a…",null,null],[12,"address","","The endpoint address for the gRPC server to listen on.…",7,null],[3,"GrpcClientConfiguration","","GrpcClientConfiguration describes the configuration of a…",null,null],[12,"uri","","The URI component of a gRPC server endpoint. Must contain…",8,null],[3,"RoughtimeClientConfiguration","","RoughtimeClientConfiguration describes the configuration…",null,null],[12,"servers","","The collection of Roughtime servers to query. A default…",9,null],[12,"min_overlapping_intervals","","Connection parameters; default values will be used if any…",9,null],[12,"timeout_seconds","","",9,null],[12,"server_retries","","",9,null],[12,"max_radius_microseconds","","",9,null],[3,"HttpServerConfiguration","","HttpServerConfiguration describes the configuration of an…",null,null],[12,"address","","The endpoint address for the HTTP server to listen on.…",10,null],[3,"HttpClientConfiguration","","HttpClientConfiguration describes the configuration of an…",null,null],[12,"authority","","The authority supported by this client. The authority must…",11,null],[3,"RoughtimeServer","","Information to identify a particular Roughtime server.…",null,null],[12,"name","","",12,null],[12,"host","","",12,null],[12,"port","","",12,null],[12,"public_key_base64","","",12,null],[3,"ConfigMap","","A serialized list of key-value pairs that are specified as…",null,null],[12,"items","","",13,null],[0,"node_configuration","","Nested message and enum types in `NodeConfiguration`.",null,null],[4,"ConfigType","oak_abi::proto::oak::application::node_configuration","",null,null],[13,"WasmConfig","","",14,null],[13,"LogConfig","","",14,null],[13,"StorageConfig","","",14,null],[13,"GrpcServerConfig","","",14,null],[13,"GrpcClientConfig","","",14,null],[13,"RoughtimeClientConfig","","",14,null],[13,"HttpServerConfig","","",14,null],[13,"HttpClientConfig","","",14,null],[11,"encode","","",14,[[]]],[11,"merge","","",14,[[["decodecontext",3],["wiretype",4],["option",4]],[["result",4],["decodeerror",3]]]],[11,"encoded_len","","",14,[[]]],[0,"label","oak_abi::proto::oak","",null,null],[3,"Label","oak_abi::proto::oak::label","Label represents information flowing through a Node or…",null,null],[12,"confidentiality_tags","","",15,null],[12,"integrity_tags","","",15,null],[3,"Tag","","Tag represents a category of confidentiality or integrity…",null,null],[12,"tag","","",16,null],[3,"WebAssemblyModuleTag","","Policies related to modules, referring to the native…",null,null],[12,"web_assembly_module_hash_sha_256","","The attestation for a single WebAssembly module, a SHA256…",17,null],[3,"WebAssemblyModuleSignatureTag","","Policies related to modules, referring to the signature of…",null,null],[12,"public_key","","Public key counterpart of the private key used to sign…",18,null],[3,"TlsEndpointTag","","Policies related to HTTPS communication.",null,null],[12,"authority","","The TLS authority (host:port) of the remote endpoint,…",19,null],[3,"PublicKeyIdentityTag","","Policies related to identities, specified using a…",null,null],[12,"public_key","","Public key counterpart of the private key that is used to…",20,null],[3,"Top","","Message representing top element of the principal lattice.…",null,null],[0,"tag","","Nested message and enum types in `Tag`.",null,null],[4,"Tag","oak_abi::proto::oak::label::tag","",null,null],[13,"WebAssemblyModuleTag","","",21,null],[13,"WebAssemblyModuleSignatureTag","","",21,null],[13,"TlsEndpointTag","","",21,null],[13,"PublicKeyIdentityTag","","",21,null],[13,"TopTag","","",21,null],[11,"encode","","",21,[[]]],[11,"merge","","",21,[[["option",4],["wiretype",4],["decodecontext",3]],[["result",4],["decodeerror",3]]]],[11,"encoded_len","","",21,[[]]],[0,"identity","oak_abi::proto::oak","",null,null],[3,"SignedChallenge","oak_abi::proto::oak::identity","Response from the client to a signing challenge. The…",null,null],[12,"signed_hash","","",22,null],[12,"public_key","","",22,null],[11,"is_valid","oak_abi::proto::oak","Returns `true` if `value` is a variant of `OakStatus`.",0,[[]]],[11,"from_i32","","Converts an `i32` to a `OakStatus`, or `None` if `value`…",0,[[],[["oakstatus",4],["option",4]]]],[11,"is_valid","","Returns `true` if `value` is a variant of…",1,[[]]],[11,"from_i32","","Converts an `i32` to a `ChannelReadStatus`, or `None` if…",1,[[],[["channelreadstatus",4],["option",4]]]],[6,"Handle","oak_abi","Handle used to identify read or write channel halves.",null,null],[6,"NodeMainC","","Expected type for a Node entrypoint that is exposed as a…",null,null],[6,"NodeMain","","Expected Rust type for a Node entrypoint.",null,null],[17,"OAK_LABEL_GRPC_METADATA_KEY","","The key used for protobuf encoded Label in gRPC metadata.",null,null],[17,"OAK_SIGNED_CHALLENGE_GRPC_METADATA_KEY","","The key used for protobuf encoded signed authentication…",null,null],[17,"OAK_LABEL_HTTP_JSON_KEY","","The HTTP header key used for JSON encoded Label in HTTP…",null,null],[17,"OAK_LABEL_HTTP_PROTOBUF_KEY","","The HTTP header key used for protobuf encoded Label in…",null,null],[17,"OAK_SIGNED_CHALLENGE_HTTP_JSON_KEY","","The HTTP header key used for JSON encoded signed…",null,null],[17,"OAK_SIGNED_CHALLENGE_HTTP_PROTOBUF_KEY","","The HTTP header key used for protobuf encoded signed…",null,null],[17,"OAK_CHALLENGE","","",null,null],[17,"SPACE_BYTES_PER_HANDLE","","Number of bytes needed per-handle for channel readiness…",null,null],[17,"INVALID_HANDLE","","Invalid handle value.",null,null],[11,"from","oak_abi::proto::oak","",0,[[]]],[11,"into","","",0,[[]]],[11,"to_owned","","",0,[[]]],[11,"clone_into","","",0,[[]]],[11,"to_string","","",0,[[],["string",3]]],[11,"borrow","","",0,[[]]],[11,"borrow_mut","","",0,[[]]],[11,"try_from","","",0,[[],["result",4]]],[11,"try_into","","",0,[[],["result",4]]],[11,"type_id","","",0,[[],["typeid",3]]],[11,"from","","",1,[[]]],[11,"into","","",1,[[]]],[11,"to_owned","","",1,[[]]],[11,"clone_into","","",1,[[]]],[11,"borrow","","",1,[[]]],[11,"borrow_mut","","",1,[[]]],[11,"try_from","","",1,[[],["result",4]]],[11,"try_into","","",1,[[],["result",4]]],[11,"type_id","","",1,[[],["typeid",3]]],[11,"from","oak_abi::proto::oak::application","",2,[[]]],[11,"into","","",2,[[]]],[11,"to_owned","","",2,[[]]],[11,"clone_into","","",2,[[]]],[11,"borrow","","",2,[[]]],[11,"borrow_mut","","",2,[[]]],[11,"try_from","","",2,[[],["result",4]]],[11,"try_into","","",2,[[],["result",4]]],[11,"type_id","","",2,[[],["typeid",3]]],[11,"from","","",3,[[]]],[11,"into","","",3,[[]]],[11,"to_owned","","",3,[[]]],[11,"clone_into","","",3,[[]]],[11,"borrow","","",3,[[]]],[11,"borrow_mut","","",3,[[]]],[11,"try_from","","",3,[[],["result",4]]],[11,"try_into","","",3,[[],["result",4]]],[11,"type_id","","",3,[[],["typeid",3]]],[11,"from","","",4,[[]]],[11,"into","","",4,[[]]],[11,"to_owned","","",4,[[]]],[11,"clone_into","","",4,[[]]],[11,"borrow","","",4,[[]]],[11,"borrow_mut","","",4,[[]]],[11,"try_from","","",4,[[],["result",4]]],[11,"try_into","","",4,[[],["result",4]]],[11,"type_id","","",4,[[],["typeid",3]]],[11,"from","","",5,[[]]],[11,"into","","",5,[[]]],[11,"to_owned","","",5,[[]]],[11,"clone_into","","",5,[[]]],[11,"borrow","","",5,[[]]],[11,"borrow_mut","","",5,[[]]],[11,"try_from","","",5,[[],["result",4]]],[11,"try_into","","",5,[[],["result",4]]],[11,"type_id","","",5,[[],["typeid",3]]],[11,"from","","",23,[[]]],[11,"into","","",23,[[]]],[11,"to_owned","","",23,[[]]],[11,"clone_into","","",23,[[]]],[11,"borrow","","",23,[[]]],[11,"borrow_mut","","",23,[[]]],[11,"try_from","","",23,[[],["result",4]]],[11,"try_into","","",23,[[],["result",4]]],[11,"type_id","","",23,[[],["typeid",3]]],[11,"from","","",6,[[]]],[11,"into","","",6,[[]]],[11,"to_owned","","",6,[[]]],[11,"clone_into","","",6,[[]]],[11,"borrow","","",6,[[]]],[11,"borrow_mut","","",6,[[]]],[11,"try_from","","",6,[[],["result",4]]],[11,"try_into","","",6,[[],["result",4]]],[11,"type_id","","",6,[[],["typeid",3]]],[11,"from","","",7,[[]]],[11,"into","","",7,[[]]],[11,"to_owned","","",7,[[]]],[11,"clone_into","","",7,[[]]],[11,"borrow","","",7,[[]]],[11,"borrow_mut","","",7,[[]]],[11,"try_from","","",7,[[],["result",4]]],[11,"try_into","","",7,[[],["result",4]]],[11,"type_id","","",7,[[],["typeid",3]]],[11,"from","","",8,[[]]],[11,"into","","",8,[[]]],[11,"to_owned","","",8,[[]]],[11,"clone_into","","",8,[[]]],[11,"borrow","","",8,[[]]],[11,"borrow_mut","","",8,[[]]],[11,"try_from","","",8,[[],["result",4]]],[11,"try_into","","",8,[[],["result",4]]],[11,"type_id","","",8,[[],["typeid",3]]],[11,"from","","",9,[[]]],[11,"into","","",9,[[]]],[11,"to_owned","","",9,[[]]],[11,"clone_into","","",9,[[]]],[11,"borrow","","",9,[[]]],[11,"borrow_mut","","",9,[[]]],[11,"try_from","","",9,[[],["result",4]]],[11,"try_into","","",9,[[],["result",4]]],[11,"type_id","","",9,[[],["typeid",3]]],[11,"from","","",10,[[]]],[11,"into","","",10,[[]]],[11,"to_owned","","",10,[[]]],[11,"clone_into","","",10,[[]]],[11,"borrow","","",10,[[]]],[11,"borrow_mut","","",10,[[]]],[11,"try_from","","",10,[[],["result",4]]],[11,"try_into","","",10,[[],["result",4]]],[11,"type_id","","",10,[[],["typeid",3]]],[11,"from","","",11,[[]]],[11,"into","","",11,[[]]],[11,"to_owned","","",11,[[]]],[11,"clone_into","","",11,[[]]],[11,"borrow","","",11,[[]]],[11,"borrow_mut","","",11,[[]]],[11,"try_from","","",11,[[],["result",4]]],[11,"try_into","","",11,[[],["result",4]]],[11,"type_id","","",11,[[],["typeid",3]]],[11,"from","","",12,[[]]],[11,"into","","",12,[[]]],[11,"to_owned","","",12,[[]]],[11,"clone_into","","",12,[[]]],[11,"borrow","","",12,[[]]],[11,"borrow_mut","","",12,[[]]],[11,"try_from","","",12,[[],["result",4]]],[11,"try_into","","",12,[[],["result",4]]],[11,"type_id","","",12,[[],["typeid",3]]],[11,"from","","",13,[[]]],[11,"into","","",13,[[]]],[11,"to_owned","","",13,[[]]],[11,"clone_into","","",13,[[]]],[11,"borrow","","",13,[[]]],[11,"borrow_mut","","",13,[[]]],[11,"try_from","","",13,[[],["result",4]]],[11,"try_into","","",13,[[],["result",4]]],[11,"type_id","","",13,[[],["typeid",3]]],[11,"from","oak_abi::proto::oak::application::node_configuration","",14,[[]]],[11,"into","","",14,[[]]],[11,"to_owned","","",14,[[]]],[11,"clone_into","","",14,[[]]],[11,"borrow","","",14,[[]]],[11,"borrow_mut","","",14,[[]]],[11,"try_from","","",14,[[],["result",4]]],[11,"try_into","","",14,[[],["result",4]]],[11,"type_id","","",14,[[],["typeid",3]]],[11,"from","oak_abi::proto::oak::label","",15,[[]]],[11,"into","","",15,[[]]],[11,"to_owned","","",15,[[]]],[11,"clone_into","","",15,[[]]],[11,"borrow","","",15,[[]]],[11,"borrow_mut","","",15,[[]]],[11,"try_from","","",15,[[],["result",4]]],[11,"try_into","","",15,[[],["result",4]]],[11,"type_id","","",15,[[],["typeid",3]]],[11,"from","","",16,[[]]],[11,"into","","",16,[[]]],[11,"to_owned","","",16,[[]]],[11,"clone_into","","",16,[[]]],[11,"borrow","","",16,[[]]],[11,"borrow_mut","","",16,[[]]],[11,"try_from","","",16,[[],["result",4]]],[11,"try_into","","",16,[[],["result",4]]],[11,"type_id","","",16,[[],["typeid",3]]],[11,"from","","",17,[[]]],[11,"into","","",17,[[]]],[11,"to_owned","","",17,[[]]],[11,"clone_into","","",17,[[]]],[11,"borrow","","",17,[[]]],[11,"borrow_mut","","",17,[[]]],[11,"try_from","","",17,[[],["result",4]]],[11,"try_into","","",17,[[],["result",4]]],[11,"type_id","","",17,[[],["typeid",3]]],[11,"from","","",18,[[]]],[11,"into","","",18,[[]]],[11,"to_owned","","",18,[[]]],[11,"clone_into","","",18,[[]]],[11,"borrow","","",18,[[]]],[11,"borrow_mut","","",18,[[]]],[11,"try_from","","",18,[[],["result",4]]],[11,"try_into","","",18,[[],["result",4]]],[11,"type_id","","",18,[[],["typeid",3]]],[11,"from","","",19,[[]]],[11,"into","","",19,[[]]],[11,"to_owned","","",19,[[]]],[11,"clone_into","","",19,[[]]],[11,"borrow","","",19,[[]]],[11,"borrow_mut","","",19,[[]]],[11,"try_from","","",19,[[],["result",4]]],[11,"try_into","","",19,[[],["result",4]]],[11,"type_id","","",19,[[],["typeid",3]]],[11,"from","","",20,[[]]],[11,"into","","",20,[[]]],[11,"to_owned","","",20,[[]]],[11,"clone_into","","",20,[[]]],[11,"borrow","","",20,[[]]],[11,"borrow_mut","","",20,[[]]],[11,"try_from","","",20,[[],["result",4]]],[11,"try_into","","",20,[[],["result",4]]],[11,"type_id","","",20,[[],["typeid",3]]],[11,"from","","",24,[[]]],[11,"into","","",24,[[]]],[11,"to_owned","","",24,[[]]],[11,"clone_into","","",24,[[]]],[11,"borrow","","",24,[[]]],[11,"borrow_mut","","",24,[[]]],[11,"try_from","","",24,[[],["result",4]]],[11,"try_into","","",24,[[],["result",4]]],[11,"type_id","","",24,[[],["typeid",3]]],[11,"from","oak_abi::proto::oak::label::tag","",21,[[]]],[11,"into","","",21,[[]]],[11,"to_owned","","",21,[[]]],[11,"clone_into","","",21,[[]]],[11,"borrow","","",21,[[]]],[11,"borrow_mut","","",21,[[]]],[11,"try_from","","",21,[[],["result",4]]],[11,"try_into","","",21,[[],["result",4]]],[11,"type_id","","",21,[[],["typeid",3]]],[11,"from","oak_abi::proto::oak::identity","",22,[[]]],[11,"into","","",22,[[]]],[11,"to_owned","","",22,[[]]],[11,"clone_into","","",22,[[]]],[11,"borrow","","",22,[[]]],[11,"borrow_mut","","",22,[[]]],[11,"try_from","","",22,[[],["result",4]]],[11,"try_into","","",22,[[],["result",4]]],[11,"type_id","","",22,[[],["typeid",3]]],[11,"clone","oak_abi::proto::oak","",0,[[],["oakstatus",4]]],[11,"clone","","",1,[[],["channelreadstatus",4]]],[11,"clone","oak_abi::proto::oak::application","",2,[[],["applicationconfiguration",3]]],[11,"clone","","",3,[[],["modulesignature",3]]],[11,"clone","","",4,[[],["nodeconfiguration",3]]],[11,"clone","oak_abi::proto::oak::application::node_configuration","",14,[[],["configtype",4]]],[11,"clone","oak_abi::proto::oak::application","",5,[[],["webassemblyconfiguration",3]]],[11,"clone","","",23,[[],["logconfiguration",3]]],[11,"clone","","",6,[[],["storageproxyconfiguration",3]]],[11,"clone","","",7,[[],["grpcserverconfiguration",3]]],[11,"clone","","",8,[[],["grpcclientconfiguration",3]]],[11,"clone","","",9,[[],["roughtimeclientconfiguration",3]]],[11,"clone","","",10,[[],["httpserverconfiguration",3]]],[11,"clone","","",11,[[],["httpclientconfiguration",3]]],[11,"clone","","",12,[[],["roughtimeserver",3]]],[11,"clone","","",13,[[],["configmap",3]]],[11,"clone","oak_abi::proto::oak::label","",15,[[],["label",3]]],[11,"clone","","",16,[[],["tag",3]]],[11,"clone","oak_abi::proto::oak::label::tag","",21,[[],["tag",4]]],[11,"clone","oak_abi::proto::oak::label","",17,[[],["webassemblymoduletag",3]]],[11,"clone","","",18,[[],["webassemblymodulesignaturetag",3]]],[11,"clone","","",19,[[],["tlsendpointtag",3]]],[11,"clone","","",20,[[],["publickeyidentitytag",3]]],[11,"clone","","",24,[[],["top",3]]],[11,"clone","oak_abi::proto::oak::identity","",22,[[],["signedchallenge",3]]],[11,"default","oak_abi::proto::oak","",0,[[],["oakstatus",4]]],[11,"default","","",1,[[],["channelreadstatus",4]]],[11,"default","oak_abi::proto::oak::application","",2,[[],["applicationconfiguration",3]]],[11,"default","","",3,[[],["modulesignature",3]]],[11,"default","","",4,[[],["nodeconfiguration",3]]],[11,"default","","",5,[[],["webassemblyconfiguration",3]]],[11,"default","","",23,[[],["logconfiguration",3]]],[11,"default","","",6,[[],["storageproxyconfiguration",3]]],[11,"default","","",7,[[],["grpcserverconfiguration",3]]],[11,"default","","",8,[[],["grpcclientconfiguration",3]]],[11,"default","","",9,[[],["roughtimeclientconfiguration",3]]],[11,"default","","",10,[[],["httpserverconfiguration",3]]],[11,"default","","",11,[[],["httpclientconfiguration",3]]],[11,"default","","",12,[[],["roughtimeserver",3]]],[11,"default","","",13,[[],["configmap",3]]],[11,"default","oak_abi::proto::oak::label","",15,[[],["label",3]]],[11,"default","","",16,[[],["tag",3]]],[11,"default","","",17,[[],["webassemblymoduletag",3]]],[11,"default","","",18,[[],["webassemblymodulesignaturetag",3]]],[11,"default","","",19,[[],["tlsendpointtag",3]]],[11,"default","","",20,[[],["publickeyidentitytag",3]]],[11,"default","","",24,[[],["top",3]]],[11,"default","oak_abi::proto::oak::identity","",22,[[],["signedchallenge",3]]],[11,"cmp","oak_abi::proto::oak","",0,[[["oakstatus",4]],["ordering",4]]],[11,"cmp","","",1,[[["channelreadstatus",4]],["ordering",4]]],[11,"eq","","",0,[[["oakstatus",4]]]],[11,"eq","","",1,[[["channelreadstatus",4]]]],[11,"eq","oak_abi::proto::oak::application","",2,[[["applicationconfiguration",3]]]],[11,"ne","","",2,[[["applicationconfiguration",3]]]],[11,"eq","","",3,[[["modulesignature",3]]]],[11,"ne","","",3,[[["modulesignature",3]]]],[11,"eq","","",4,[[["nodeconfiguration",3]]]],[11,"ne","","",4,[[["nodeconfiguration",3]]]],[11,"eq","oak_abi::proto::oak::application::node_configuration","",14,[[["configtype",4]]]],[11,"ne","","",14,[[["configtype",4]]]],[11,"eq","oak_abi::proto::oak::application","",5,[[["webassemblyconfiguration",3]]]],[11,"ne","","",5,[[["webassemblyconfiguration",3]]]],[11,"eq","","",23,[[["logconfiguration",3]]]],[11,"eq","","",6,[[["storageproxyconfiguration",3]]]],[11,"ne","","",6,[[["storageproxyconfiguration",3]]]],[11,"eq","","",7,[[["grpcserverconfiguration",3]]]],[11,"ne","","",7,[[["grpcserverconfiguration",3]]]],[11,"eq","","",8,[[["grpcclientconfiguration",3]]]],[11,"ne","","",8,[[["grpcclientconfiguration",3]]]],[11,"eq","","",9,[[["roughtimeclientconfiguration",3]]]],[11,"ne","","",9,[[["roughtimeclientconfiguration",3]]]],[11,"eq","","",10,[[["httpserverconfiguration",3]]]],[11,"ne","","",10,[[["httpserverconfiguration",3]]]],[11,"eq","","",11,[[["httpclientconfiguration",3]]]],[11,"ne","","",11,[[["httpclientconfiguration",3]]]],[11,"eq","","",12,[[["roughtimeserver",3]]]],[11,"ne","","",12,[[["roughtimeserver",3]]]],[11,"eq","","",13,[[["configmap",3]]]],[11,"ne","","",13,[[["configmap",3]]]],[11,"eq","oak_abi::proto::oak::label","",15,[[["label",3]]]],[11,"ne","","",15,[[["label",3]]]],[11,"eq","","",16,[[["tag",3]]]],[11,"ne","","",16,[[["tag",3]]]],[11,"eq","oak_abi::proto::oak::label::tag","",21,[[["tag",4]]]],[11,"ne","","",21,[[["tag",4]]]],[11,"eq","oak_abi::proto::oak::label","",17,[[["webassemblymoduletag",3]]]],[11,"ne","","",17,[[["webassemblymoduletag",3]]]],[11,"eq","","",18,[[["webassemblymodulesignaturetag",3]]]],[11,"ne","","",18,[[["webassemblymodulesignaturetag",3]]]],[11,"eq","","",19,[[["tlsendpointtag",3]]]],[11,"ne","","",19,[[["tlsendpointtag",3]]]],[11,"eq","","",20,[[["publickeyidentitytag",3]]]],[11,"ne","","",20,[[["publickeyidentitytag",3]]]],[11,"eq","","",24,[[["top",3]]]],[11,"eq","oak_abi::proto::oak::identity","",22,[[["signedchallenge",3]]]],[11,"ne","","",22,[[["signedchallenge",3]]]],[11,"partial_cmp","oak_abi::proto::oak","",0,[[["oakstatus",4]],[["ordering",4],["option",4]]]],[11,"partial_cmp","","",1,[[["channelreadstatus",4]],[["ordering",4],["option",4]]]],[11,"fmt","","",0,[[["formatter",3]],["result",6]]],[11,"fmt","","",1,[[["formatter",3]],["result",6]]],[11,"fmt","oak_abi::proto::oak::application","",2,[[["formatter",3]],["result",6]]],[11,"fmt","","",3,[[["formatter",3]],["result",6]]],[11,"fmt","","",4,[[["formatter",3]],["result",6]]],[11,"fmt","oak_abi::proto::oak::application::node_configuration","",14,[[["formatter",3]],["result",6]]],[11,"fmt","oak_abi::proto::oak::application","",5,[[["formatter",3]],["result",6]]],[11,"fmt","","",23,[[["formatter",3]],["result",6]]],[11,"fmt","","",6,[[["formatter",3]],["result",6]]],[11,"fmt","","",7,[[["formatter",3]],["result",6]]],[11,"fmt","","",8,[[["formatter",3]],["result",6]]],[11,"fmt","","",9,[[["formatter",3]],["result",6]]],[11,"fmt","","",10,[[["formatter",3]],["result",6]]],[11,"fmt","","",11,[[["formatter",3]],["result",6]]],[11,"fmt","","",12,[[["formatter",3]],["result",6]]],[11,"fmt","","",13,[[["formatter",3]],["result",6]]],[11,"fmt","oak_abi::proto::oak::label","",15,[[["formatter",3]],["result",6]]],[11,"fmt","","",16,[[["formatter",3]],["result",6]]],[11,"fmt","oak_abi::proto::oak::label::tag","",21,[[["formatter",3]],["result",6]]],[11,"fmt","oak_abi::proto::oak::label","",17,[[["formatter",3]],["result",6]]],[11,"fmt","","",18,[[["formatter",3]],["result",6]]],[11,"fmt","","",19,[[["formatter",3]],["result",6]]],[11,"fmt","","",20,[[["formatter",3]],["result",6]]],[11,"fmt","","",24,[[["formatter",3]],["result",6]]],[11,"fmt","oak_abi::proto::oak::identity","",22,[[["formatter",3]],["result",6]]],[11,"fmt","oak_abi::proto::oak","",0,[[["formatter",3]],[["error",3],["result",4]]]],[11,"hash","","",0,[[]]],[11,"hash","","",1,[[]]],[11,"hash","oak_abi::proto::oak::label","",15,[[]]],[11,"hash","","",16,[[]]],[11,"hash","oak_abi::proto::oak::label::tag","",21,[[]]],[11,"hash","oak_abi::proto::oak::label","",17,[[]]],[11,"hash","","",18,[[]]],[11,"hash","","",19,[[]]],[11,"hash","","",20,[[]]],[11,"hash","","",24,[[]]],[11,"encode_raw","oak_abi::proto::oak::application","",2,[[]]],[11,"merge_field","","",2,[[["decodecontext",3],["wiretype",4]],[["result",4],["decodeerror",3]]]],[11,"encoded_len","","",2,[[]]],[11,"clear","","",2,[[]]],[11,"encode_raw","","",3,[[]]],[11,"merge_field","","",3,[[["decodecontext",3],["wiretype",4]],[["result",4],["decodeerror",3]]]],[11,"encoded_len","","",3,[[]]],[11,"clear","","",3,[[]]],[11,"encode_raw","","",4,[[]]],[11,"merge_field","","",4,[[["decodecontext",3],["wiretype",4]],[["result",4],["decodeerror",3]]]],[11,"encoded_len","","",4,[[]]],[11,"clear","","",4,[[]]],[11,"encode_raw","","",5,[[]]],[11,"merge_field","","",5,[[["decodecontext",3],["wiretype",4]],[["result",4],["decodeerror",3]]]],[11,"encoded_len","","",5,[[]]],[11,"clear","","",5,[[]]],[11,"encode_raw","","",23,[[]]],[11,"merge_field","","",23,[[["decodecontext",3],["wiretype",4]],[["result",4],["decodeerror",3]]]],[11,"encoded_len","","",23,[[]]],[11,"clear","","",23,[[]]],[11,"encode_raw","","",6,[[]]],[11,"merge_field","","",6,[[["decodecontext",3],["wiretype",4]],[["result",4],["decodeerror",3]]]],[11,"encoded_len","","",6,[[]]],[11,"clear","","",6,[[]]],[11,"encode_raw","","",7,[[]]],[11,"merge_field","","",7,[[["decodecontext",3],["wiretype",4]],[["result",4],["decodeerror",3]]]],[11,"encoded_len","","",7,[[]]],[11,"clear","","",7,[[]]],[11,"encode_raw","","",8,[[]]],[11,"merge_field","","",8,[[["decodecontext",3],["wiretype",4]],[["result",4],["decodeerror",3]]]],[11,"encoded_len","","",8,[[]]],[11,"clear","","",8,[[]]],[11,"encode_raw","","",9,[[]]],[11,"merge_field","","",9,[[["decodecontext",3],["wiretype",4]],[["result",4],["decodeerror",3]]]],[11,"encoded_len","","",9,[[]]],[11,"clear","","",9,[[]]],[11,"encode_raw","","",10,[[]]],[11,"merge_field","","",10,[[["decodecontext",3],["wiretype",4]],[["result",4],["decodeerror",3]]]],[11,"encoded_len","","",10,[[]]],[11,"clear","","",10,[[]]],[11,"encode_raw","","",11,[[]]],[11,"merge_field","","",11,[[["decodecontext",3],["wiretype",4]],[["result",4],["decodeerror",3]]]],[11,"encoded_len","","",11,[[]]],[11,"clear","","",11,[[]]],[11,"encode_raw","","",12,[[]]],[11,"merge_field","","",12,[[["decodecontext",3],["wiretype",4]],[["result",4],["decodeerror",3]]]],[11,"encoded_len","","",12,[[]]],[11,"clear","","",12,[[]]],[11,"encode_raw","","",13,[[]]],[11,"merge_field","","",13,[[["decodecontext",3],["wiretype",4]],[["result",4],["decodeerror",3]]]],[11,"encoded_len","","",13,[[]]],[11,"clear","","",13,[[]]],[11,"encode_raw","oak_abi::proto::oak::label","",15,[[]]],[11,"merge_field","","",15,[[["decodecontext",3],["wiretype",4]],[["result",4],["decodeerror",3]]]],[11,"encoded_len","","",15,[[]]],[11,"clear","","",15,[[]]],[11,"encode_raw","","",16,[[]]],[11,"merge_field","","",16,[[["decodecontext",3],["wiretype",4]],[["result",4],["decodeerror",3]]]],[11,"encoded_len","","",16,[[]]],[11,"clear","","",16,[[]]],[11,"encode_raw","","",17,[[]]],[11,"merge_field","","",17,[[["decodecontext",3],["wiretype",4]],[["result",4],["decodeerror",3]]]],[11,"encoded_len","","",17,[[]]],[11,"clear","","",17,[[]]],[11,"encode_raw","","",18,[[]]],[11,"merge_field","","",18,[[["decodecontext",3],["wiretype",4]],[["result",4],["decodeerror",3]]]],[11,"encoded_len","","",18,[[]]],[11,"clear","","",18,[[]]],[11,"encode_raw","","",19,[[]]],[11,"merge_field","","",19,[[["decodecontext",3],["wiretype",4]],[["result",4],["decodeerror",3]]]],[11,"encoded_len","","",19,[[]]],[11,"clear","","",19,[[]]],[11,"encode_raw","","",20,[[]]],[11,"merge_field","","",20,[[["decodecontext",3],["wiretype",4]],[["result",4],["decodeerror",3]]]],[11,"encoded_len","","",20,[[]]],[11,"clear","","",20,[[]]],[11,"encode_raw","","",24,[[]]],[11,"merge_field","","",24,[[["decodecontext",3],["wiretype",4]],[["result",4],["decodeerror",3]]]],[11,"encoded_len","","",24,[[]]],[11,"clear","","",24,[[]]],[11,"encode_raw","oak_abi::proto::oak::identity","",22,[[]]],[11,"merge_field","","",22,[[["decodecontext",3],["wiretype",4]],[["result",4],["decodeerror",3]]]],[11,"encoded_len","","",22,[[]]],[11,"clear","","",22,[[]]],[11,"serialize","oak_abi::proto::oak::label","",15,[[],["result",4]]],[11,"serialize","","",16,[[],["result",4]]],[11,"serialize","oak_abi::proto::oak::label::tag","",21,[[],["result",4]]],[11,"serialize","oak_abi::proto::oak::label","",17,[[],["result",4]]],[11,"serialize","","",18,[[],["result",4]]],[11,"serialize","","",19,[[],["result",4]]],[11,"serialize","","",20,[[],["result",4]]],[11,"serialize","","",24,[[],["result",4]]],[11,"serialize","oak_abi::proto::oak::identity","",22,[[],["result",4]]],[11,"deserialize","oak_abi::proto::oak::label","",15,[[],["result",4]]],[11,"deserialize","","",16,[[],["result",4]]],[11,"deserialize","oak_abi::proto::oak::label::tag","",21,[[],["result",4]]],[11,"deserialize","oak_abi::proto::oak::label","",17,[[],["result",4]]],[11,"deserialize","","",18,[[],["result",4]]],[11,"deserialize","","",19,[[],["result",4]]],[11,"deserialize","","",20,[[],["result",4]]],[11,"deserialize","","",24,[[],["result",4]]],[11,"deserialize","oak_abi::proto::oak::identity","",22,[[],["result",4]]],[11,"serialize","oak_abi::proto::oak::label","Convert a label to bytes.",15,[[],["vec",3]]],[11,"deserialize","","Build the label from bytes.",15,[[],["option",4]]],[11,"public_untrusted","","Return the least privileged label.",15,[[]]],[11,"flows_to","","Compare two labels according to the lattice structure: L_0…",15,[[]]]],"p":[[4,"OakStatus"],[4,"ChannelReadStatus"],[3,"ApplicationConfiguration"],[3,"ModuleSignature"],[3,"NodeConfiguration"],[3,"WebAssemblyConfiguration"],[3,"StorageProxyConfiguration"],[3,"GrpcServerConfiguration"],[3,"GrpcClientConfiguration"],[3,"RoughtimeClientConfiguration"],[3,"HttpServerConfiguration"],[3,"HttpClientConfiguration"],[3,"RoughtimeServer"],[3,"ConfigMap"],[4,"ConfigType"],[3,"Label"],[3,"Tag"],[3,"WebAssemblyModuleTag"],[3,"WebAssemblyModuleSignatureTag"],[3,"TlsEndpointTag"],[3,"PublicKeyIdentityTag"],[4,"Tag"],[3,"SignedChallenge"],[3,"LogConfiguration"],[3,"Top"]]}\
}');
addSearchOptions(searchIndex);initSearch(searchIndex);