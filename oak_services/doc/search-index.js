var searchIndex = JSON.parse('{\
"oak_services":{"doc":"Type, constant and Wasm host function definitions for the…","i":[[0,"grpc","oak_services","",null,null],[5,"encap_request","oak_services::grpc","Encapsulate a protocol buffer message in a GrpcRequest…",null,[[],[["option",4],["grpcrequest",3]]]],[0,"http","oak_services","",null,null],[0,"proto","","",null,null],[0,"google","oak_services::proto","",null,null],[0,"rpc","oak_services::proto::google","",null,null],[3,"Status","oak_services::proto::google::rpc","The `Status` type defines a logical error model that is…",null,null],[12,"code","","The status code, which should be an enum value of…",0,null],[12,"message","","A developer-facing error message, which should be in…",0,null],[12,"details","","A list of messages that carry the error details. There is…",0,null],[4,"Code","","The canonical error codes for Google APIs.",null,null],[13,"Ok","","Not an error; returned on success",1,null],[13,"Cancelled","","The operation was cancelled, typically by the caller.",1,null],[13,"Unknown","","Unknown error. For example, this error may be returned…",1,null],[13,"InvalidArgument","","The client specified an invalid argument. Note that this…",1,null],[13,"DeadlineExceeded","","The deadline expired before the operation could complete.…",1,null],[13,"NotFound","","Some requested entity (e.g., file or directory) was not…",1,null],[13,"AlreadyExists","","The entity that a client attempted to create (e.g., file…",1,null],[13,"PermissionDenied","","The caller does not have permission to execute the…",1,null],[13,"Unauthenticated","","The request does not have valid authentication credentials…",1,null],[13,"ResourceExhausted","","Some resource has been exhausted, perhaps a per-user…",1,null],[13,"FailedPrecondition","","The operation was rejected because the system is not in a…",1,null],[13,"Aborted","","The operation was aborted, typically due to a concurrency…",1,null],[13,"OutOfRange","","The operation was attempted past the valid range. E.g.,…",1,null],[13,"Unimplemented","","The operation is not implemented or is not…",1,null],[13,"Internal","","Internal errors. This means that some invariants expected…",1,null],[13,"Unavailable","","The service is currently unavailable. This is most likely…",1,null],[13,"DataLoss","","Unrecoverable data loss or corruption.",1,null],[11,"is_valid","","Returns `true` if `value` is a variant of `Code`.",1,[[]]],[11,"from_i32","","Converts an `i32` to a `Code`, or `None` if `value` is not…",1,[[],[["code",4],["option",4]]]],[0,"oak","oak_services::proto","",null,null],[0,"encap","oak_services::proto::oak","",null,null],[3,"GrpcRequest","oak_services::proto::oak::encap","",null,null],[12,"method_name","","",2,null],[12,"req_msg","","The body of the request. Usually a serialized protobuf…",2,null],[12,"last","","",2,null],[3,"GrpcResponse","","",null,null],[12,"rsp_msg","","The body of the response. Usually a serialized protobuf…",3,null],[12,"status","","",3,null],[12,"last","","The last field indicates that this is definitely the final…",3,null],[3,"HttpRequest","","Protocol buffer encoding representing an HTTP request.",null,null],[12,"uri","","The URI (including scheme and authority) to which the…",4,null],[12,"method","","The HTTP request method used.",4,null],[12,"body","","The body of the request.",4,null],[12,"headers","","The HTTP request headers.",4,null],[3,"HttpResponse","","Protocol buffer encoding representing an HTTP response.",null,null],[12,"body","","The body of the response.",5,null],[12,"status","","The HTTP status code.",5,null],[12,"headers","","The HTTP response headers.",5,null],[3,"HeaderMap","","Wrapper around a HashMap representing the headers in…",null,null],[12,"headers","","",6,null],[3,"HeaderValue","","Each header name in an HTTP request or HTTP response may…",null,null],[12,"values","","",7,null],[0,"log","oak_services::proto::oak","",null,null],[3,"LogMessage","oak_services::proto::oak::log","This message defines the data that is passed as a log…",null,null],[12,"file","","The source file containing the message.",8,null],[12,"line","","The line containing the message.",8,null],[12,"level","","The verbosity level of the message.",8,null],[12,"message","","The message body.",8,null],[4,"Level","","Logging levels as defined in…",null,null],[13,"UnknownLevel","","",9,null],[13,"Error","","",9,null],[13,"Warn","","",9,null],[13,"Info","","",9,null],[13,"Debugging","","",9,null],[13,"Trace","","",9,null],[11,"level","","Returns the enum value of `level`, or the default if the…",8,[[],["level",4]]],[11,"set_level","","Sets `level` to the provided enum value.",8,[[["level",4]]]],[11,"is_valid","","Returns `true` if `value` is a variant of `Level`.",9,[[]]],[11,"from_i32","","Converts an `i32` to a `Level`, or `None` if `value` is…",9,[[],[["option",4],["level",4]]]],[0,"roughtime","oak_services::proto::oak","",null,null],[3,"GetRoughtimeRequest","oak_services::proto::oak::roughtime","",null,null],[3,"Roughtime","","",null,null],[12,"roughtime_usec","","Time is UTC and is given as microseconds since the UNIX…",10,null],[11,"from","oak_services::proto::google::rpc","",0,[[]]],[11,"into","","",0,[[]]],[11,"to_owned","","",0,[[]]],[11,"clone_into","","",0,[[]]],[11,"borrow","","",0,[[]]],[11,"borrow_mut","","",0,[[]]],[11,"try_from","","",0,[[],["result",4]]],[11,"try_into","","",0,[[],["result",4]]],[11,"type_id","","",0,[[],["typeid",3]]],[11,"from","","",1,[[]]],[11,"into","","",1,[[]]],[11,"to_owned","","",1,[[]]],[11,"clone_into","","",1,[[]]],[11,"borrow","","",1,[[]]],[11,"borrow_mut","","",1,[[]]],[11,"try_from","","",1,[[],["result",4]]],[11,"try_into","","",1,[[],["result",4]]],[11,"type_id","","",1,[[],["typeid",3]]],[11,"from","oak_services::proto::oak::encap","",2,[[]]],[11,"into","","",2,[[]]],[11,"to_owned","","",2,[[]]],[11,"clone_into","","",2,[[]]],[11,"borrow","","",2,[[]]],[11,"borrow_mut","","",2,[[]]],[11,"try_from","","",2,[[],["result",4]]],[11,"try_into","","",2,[[],["result",4]]],[11,"type_id","","",2,[[],["typeid",3]]],[11,"decode","","",2,[[["message",3]],[["oakerror",4],["result",4]]]],[11,"encode","","",2,[[],[["message",3],["result",4],["oakerror",4]]]],[11,"from","","",3,[[]]],[11,"into","","",3,[[]]],[11,"to_owned","","",3,[[]]],[11,"clone_into","","",3,[[]]],[11,"borrow","","",3,[[]]],[11,"borrow_mut","","",3,[[]]],[11,"try_from","","",3,[[],["result",4]]],[11,"try_into","","",3,[[],["result",4]]],[11,"type_id","","",3,[[],["typeid",3]]],[11,"decode","","",3,[[["message",3]],[["oakerror",4],["result",4]]]],[11,"encode","","",3,[[],[["message",3],["result",4],["oakerror",4]]]],[11,"from","","",4,[[]]],[11,"into","","",4,[[]]],[11,"to_owned","","",4,[[]]],[11,"clone_into","","",4,[[]]],[11,"borrow","","",4,[[]]],[11,"borrow_mut","","",4,[[]]],[11,"try_from","","",4,[[],["result",4]]],[11,"try_into","","",4,[[],["result",4]]],[11,"type_id","","",4,[[],["typeid",3]]],[11,"decode","","",4,[[["message",3]],[["oakerror",4],["result",4]]]],[11,"encode","","",4,[[],[["message",3],["result",4],["oakerror",4]]]],[11,"from","","",5,[[]]],[11,"into","","",5,[[]]],[11,"to_owned","","",5,[[]]],[11,"clone_into","","",5,[[]]],[11,"borrow","","",5,[[]]],[11,"borrow_mut","","",5,[[]]],[11,"try_from","","",5,[[],["result",4]]],[11,"try_into","","",5,[[],["result",4]]],[11,"type_id","","",5,[[],["typeid",3]]],[11,"decode","","",5,[[["message",3]],[["oakerror",4],["result",4]]]],[11,"encode","","",5,[[],[["message",3],["result",4],["oakerror",4]]]],[11,"from","","",6,[[]]],[11,"into","","",6,[[]]],[11,"into_iter","","",6,[[]]],[11,"to_owned","","",6,[[]]],[11,"clone_into","","",6,[[]]],[11,"borrow","","",6,[[]]],[11,"borrow_mut","","",6,[[]]],[11,"try_from","","",6,[[],["result",4]]],[11,"try_into","","",6,[[],["result",4]]],[11,"type_id","","",6,[[],["typeid",3]]],[11,"from","","",7,[[]]],[11,"into","","",7,[[]]],[11,"to_owned","","",7,[[]]],[11,"clone_into","","",7,[[]]],[11,"borrow","","",7,[[]]],[11,"borrow_mut","","",7,[[]]],[11,"try_from","","",7,[[],["result",4]]],[11,"try_into","","",7,[[],["result",4]]],[11,"type_id","","",7,[[],["typeid",3]]],[11,"from","oak_services::proto::oak::log","",8,[[]]],[11,"into","","",8,[[]]],[11,"to_owned","","",8,[[]]],[11,"clone_into","","",8,[[]]],[11,"borrow","","",8,[[]]],[11,"borrow_mut","","",8,[[]]],[11,"try_from","","",8,[[],["result",4]]],[11,"try_into","","",8,[[],["result",4]]],[11,"type_id","","",8,[[],["typeid",3]]],[11,"decode","","",8,[[["message",3]],[["oakerror",4],["result",4]]]],[11,"encode","","",8,[[],[["message",3],["result",4],["oakerror",4]]]],[11,"from","","",9,[[]]],[11,"into","","",9,[[]]],[11,"to_owned","","",9,[[]]],[11,"clone_into","","",9,[[]]],[11,"borrow","","",9,[[]]],[11,"borrow_mut","","",9,[[]]],[11,"try_from","","",9,[[],["result",4]]],[11,"try_into","","",9,[[],["result",4]]],[11,"type_id","","",9,[[],["typeid",3]]],[11,"from","oak_services::proto::oak::roughtime","",11,[[]]],[11,"into","","",11,[[]]],[11,"to_owned","","",11,[[]]],[11,"clone_into","","",11,[[]]],[11,"borrow","","",11,[[]]],[11,"borrow_mut","","",11,[[]]],[11,"try_from","","",11,[[],["result",4]]],[11,"try_into","","",11,[[],["result",4]]],[11,"type_id","","",11,[[],["typeid",3]]],[11,"decode","","",11,[[["message",3]],[["oakerror",4],["result",4]]]],[11,"encode","","",11,[[],[["message",3],["result",4],["oakerror",4]]]],[11,"from","","",10,[[]]],[11,"into","","",10,[[]]],[11,"to_owned","","",10,[[]]],[11,"clone_into","","",10,[[]]],[11,"borrow","","",10,[[]]],[11,"borrow_mut","","",10,[[]]],[11,"try_from","","",10,[[],["result",4]]],[11,"try_into","","",10,[[],["result",4]]],[11,"type_id","","",10,[[],["typeid",3]]],[11,"decode","","",10,[[["message",3]],[["oakerror",4],["result",4]]]],[11,"encode","","",10,[[],[["message",3],["result",4],["oakerror",4]]]],[11,"from","oak_services::proto::oak::encap","",5,[[["response",3]]]],[11,"from","","",6,[[["headermap",3],["headervalue",3]]]],[11,"into_iter","","Convert into an iterator over (http::header::HeaderName,…",6,[[]]],[11,"clone","oak_services::proto::google::rpc","",0,[[],["status",3]]],[11,"clone","","",1,[[],["code",4]]],[11,"clone","oak_services::proto::oak::encap","",2,[[],["grpcrequest",3]]],[11,"clone","","",3,[[],["grpcresponse",3]]],[11,"clone","","",4,[[],["httprequest",3]]],[11,"clone","","",5,[[],["httpresponse",3]]],[11,"clone","","",6,[[],["headermap",3]]],[11,"clone","","",7,[[],["headervalue",3]]],[11,"clone","oak_services::proto::oak::log","",8,[[],["logmessage",3]]],[11,"clone","","",9,[[],["level",4]]],[11,"clone","oak_services::proto::oak::roughtime","",11,[[],["getroughtimerequest",3]]],[11,"clone","","",10,[[],["roughtime",3]]],[11,"default","oak_services::proto::google::rpc","",0,[[],["status",3]]],[11,"default","","",1,[[],["code",4]]],[11,"default","oak_services::proto::oak::encap","",2,[[],["grpcrequest",3]]],[11,"default","","",3,[[],["grpcresponse",3]]],[11,"default","","",4,[[],["httprequest",3]]],[11,"default","","",5,[[],["httpresponse",3]]],[11,"default","","",6,[[],["headermap",3]]],[11,"default","","",7,[[],["headervalue",3]]],[11,"default","oak_services::proto::oak::log","",8,[[],["logmessage",3]]],[11,"default","","",9,[[],["level",4]]],[11,"default","oak_services::proto::oak::roughtime","",11,[[],["getroughtimerequest",3]]],[11,"default","","",10,[[],["roughtime",3]]],[11,"cmp","oak_services::proto::google::rpc","",1,[[["code",4]],["ordering",4]]],[11,"cmp","oak_services::proto::oak::log","",9,[[["level",4]],["ordering",4]]],[11,"eq","oak_services::proto::google::rpc","",0,[[["status",3]]]],[11,"ne","","",0,[[["status",3]]]],[11,"eq","","",1,[[["code",4]]]],[11,"eq","oak_services::proto::oak::encap","",2,[[["grpcrequest",3]]]],[11,"ne","","",2,[[["grpcrequest",3]]]],[11,"eq","","",3,[[["grpcresponse",3]]]],[11,"ne","","",3,[[["grpcresponse",3]]]],[11,"eq","","",4,[[["httprequest",3]]]],[11,"ne","","",4,[[["httprequest",3]]]],[11,"eq","","",5,[[["httpresponse",3]]]],[11,"ne","","",5,[[["httpresponse",3]]]],[11,"eq","","",6,[[["headermap",3]]]],[11,"ne","","",6,[[["headermap",3]]]],[11,"eq","","",7,[[["headervalue",3]]]],[11,"ne","","",7,[[["headervalue",3]]]],[11,"eq","oak_services::proto::oak::log","",8,[[["logmessage",3]]]],[11,"ne","","",8,[[["logmessage",3]]]],[11,"eq","","",9,[[["level",4]]]],[11,"eq","oak_services::proto::oak::roughtime","",11,[[["getroughtimerequest",3]]]],[11,"eq","","",10,[[["roughtime",3]]]],[11,"ne","","",10,[[["roughtime",3]]]],[11,"partial_cmp","oak_services::proto::google::rpc","",1,[[["code",4]],[["ordering",4],["option",4]]]],[11,"partial_cmp","oak_services::proto::oak::log","",9,[[["level",4]],[["ordering",4],["option",4]]]],[11,"fmt","oak_services::proto::google::rpc","",0,[[["formatter",3]],["result",6]]],[11,"fmt","","",1,[[["formatter",3]],["result",6]]],[11,"fmt","oak_services::proto::oak::encap","",2,[[["formatter",3]],["result",6]]],[11,"fmt","","",3,[[["formatter",3]],["result",6]]],[11,"fmt","","",4,[[["formatter",3]],["result",6]]],[11,"fmt","","",5,[[["formatter",3]],["result",6]]],[11,"fmt","","",6,[[["formatter",3]],["result",6]]],[11,"fmt","","",7,[[["formatter",3]],["result",6]]],[11,"fmt","oak_services::proto::oak::log","",8,[[["formatter",3]],["result",6]]],[11,"fmt","","",9,[[["formatter",3]],["result",6]]],[11,"fmt","oak_services::proto::oak::roughtime","",11,[[["formatter",3]],["result",6]]],[11,"fmt","","",10,[[["formatter",3]],["result",6]]],[11,"hash","oak_services::proto::google::rpc","",1,[[]]],[11,"hash","oak_services::proto::oak::log","",9,[[]]],[11,"encode_raw","oak_services::proto::google::rpc","",0,[[]]],[11,"merge_field","","",0,[[["wiretype",4],["decodecontext",3]],[["result",4],["decodeerror",3]]]],[11,"encoded_len","","",0,[[]]],[11,"clear","","",0,[[]]],[11,"encode_raw","oak_services::proto::oak::encap","",2,[[]]],[11,"merge_field","","",2,[[["wiretype",4],["decodecontext",3]],[["result",4],["decodeerror",3]]]],[11,"encoded_len","","",2,[[]]],[11,"clear","","",2,[[]]],[11,"encode_raw","","",3,[[]]],[11,"merge_field","","",3,[[["wiretype",4],["decodecontext",3]],[["result",4],["decodeerror",3]]]],[11,"encoded_len","","",3,[[]]],[11,"clear","","",3,[[]]],[11,"encode_raw","","",4,[[]]],[11,"merge_field","","",4,[[["wiretype",4],["decodecontext",3]],[["result",4],["decodeerror",3]]]],[11,"encoded_len","","",4,[[]]],[11,"clear","","",4,[[]]],[11,"encode_raw","","",5,[[]]],[11,"merge_field","","",5,[[["wiretype",4],["decodecontext",3]],[["result",4],["decodeerror",3]]]],[11,"encoded_len","","",5,[[]]],[11,"clear","","",5,[[]]],[11,"encode_raw","","",6,[[]]],[11,"merge_field","","",6,[[["wiretype",4],["decodecontext",3]],[["result",4],["decodeerror",3]]]],[11,"encoded_len","","",6,[[]]],[11,"clear","","",6,[[]]],[11,"encode_raw","","",7,[[]]],[11,"merge_field","","",7,[[["wiretype",4],["decodecontext",3]],[["result",4],["decodeerror",3]]]],[11,"encoded_len","","",7,[[]]],[11,"clear","","",7,[[]]],[11,"encode_raw","oak_services::proto::oak::log","",8,[[]]],[11,"merge_field","","",8,[[["wiretype",4],["decodecontext",3]],[["result",4],["decodeerror",3]]]],[11,"encoded_len","","",8,[[]]],[11,"clear","","",8,[[]]],[11,"encode_raw","oak_services::proto::oak::roughtime","",11,[[]]],[11,"merge_field","","",11,[[["wiretype",4],["decodecontext",3]],[["result",4],["decodeerror",3]]]],[11,"encoded_len","","",11,[[]]],[11,"clear","","",11,[[]]],[11,"encode_raw","","",10,[[]]],[11,"merge_field","","",10,[[["wiretype",4],["decodecontext",3]],[["result",4],["decodeerror",3]]]],[11,"encoded_len","","",10,[[]]],[11,"clear","","",10,[[]]],[11,"visit","oak_services::proto::oak::log","",8,[[["fnmut",8]],["fnmut",8]]],[11,"visit","","",9,[[["fnmut",8]],["fnmut",8]]],[11,"visit","oak_services::proto::oak::roughtime","",11,[[["fnmut",8]],["fnmut",8]]],[11,"visit","","",10,[[["fnmut",8]],["fnmut",8]]],[11,"visit","oak_services::proto::oak::encap","",3,[[["fnmut",8]],["fnmut",8]]],[11,"visit","","",2,[[["fnmut",8]],["fnmut",8]]],[11,"visit","","",5,[[["fnmut",8]],["fnmut",8]]],[11,"visit","","",4,[[["fnmut",8]],["fnmut",8]]]],"p":[[3,"Status"],[4,"Code"],[3,"GrpcRequest"],[3,"GrpcResponse"],[3,"HttpRequest"],[3,"HttpResponse"],[3,"HeaderMap"],[3,"HeaderValue"],[3,"LogMessage"],[4,"Level"],[3,"Roughtime"],[3,"GetRoughtimeRequest"]]}\
}');
addSearchOptions(searchIndex);initSearch(searchIndex);