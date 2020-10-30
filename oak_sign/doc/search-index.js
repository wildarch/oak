var searchIndex = JSON.parse('{\
"oak_sign":{"doc":"","i":[[3,"KeyPair","oak_sign","Convenience struct that encapsulates…",null,null],[3,"SignatureBundle","","",null,null],[12,"public_key","","",0,null],[12,"signed_hash","","",0,null],[12,"hash","","",0,null],[5,"read_pem_file","","",null,[[],[["vec",3],["result",6]]]],[5,"write_pem_file","","",null,[[],["result",6]]],[5,"get_sha256","","Computes a SHA-256 digest of `input` and returns it in a…",null,[[],["vec",3]]],[5,"get_sha256_hex","","Computes a SHA-256 digest of `bytes` and returns it in a…",null,[[],["string",3]]],[17,"PRIVATE_KEY_TAG","","",null,null],[17,"PUBLIC_KEY_TAG","","",null,null],[17,"SIGNATURE_TAG","","",null,null],[17,"HASH_TAG","","",null,null],[11,"generate","","Generates a Ed25519 key pair.",1,[[],[["result",6],["keypair",3]]]],[11,"parse","","Parses a Ed25519 key pair from a PKCS#8 v2 encoded…",1,[[],[["result",6],["keypair",3]]]],[11,"pkcs8_key_pair","","Returns a PKCS#8 v2 encoded key pair.",1,[[],["vec",3]]],[11,"pkcs8_public_key","","Returns a PKCS#8 v2 encoded public key.",1,[[],["vec",3]]],[11,"sign","","",1,[[],["vec",3]]],[11,"create","","Signs a SHA-256 hash of the `input` using `private_key`.",0,[[["keypair",3]],[["result",6],["signaturebundle",3]]]],[11,"verify","","Verifies the signature validity.",0,[[],["result",6]]],[11,"from_pem_file","","Parses public key, signature and SHA-256 hash encoded…",0,[[],[["result",6],["signaturebundle",3]]]],[11,"to_pem_file","","",0,[[],["result",6]]],[11,"from","","",1,[[]]],[11,"into","","",1,[[]]],[11,"to_owned","","",1,[[]]],[11,"clone_into","","",1,[[]]],[11,"borrow","","",1,[[]]],[11,"borrow_mut","","",1,[[]]],[11,"try_from","","",1,[[],["result",4]]],[11,"try_into","","",1,[[],["result",4]]],[11,"type_id","","",1,[[],["typeid",3]]],[11,"from","","",0,[[]]],[11,"into","","",0,[[]]],[11,"to_owned","","",0,[[]]],[11,"clone_into","","",0,[[]]],[11,"borrow","","",0,[[]]],[11,"borrow_mut","","",0,[[]]],[11,"try_from","","",0,[[],["result",4]]],[11,"try_into","","",0,[[],["result",4]]],[11,"type_id","","",0,[[],["typeid",3]]],[11,"clone","","",1,[[]]],[11,"clone","","",0,[[],["signaturebundle",3]]],[11,"default","","",0,[[],["signaturebundle",3]]],[11,"eq","","",1,[[]]],[11,"fmt","","",1,[[["formatter",3]],["result",6]]],[11,"fmt","","",0,[[["formatter",3]],["result",6]]]],"p":[[3,"SignatureBundle"],[3,"KeyPair"]]},\
"oak_sign_bin":{"doc":"An utility binary to sign files using Ed25519.…","i":[[3,"Opt","oak_sign_bin","Command line options for `oak_sign`.",null,null],[12,"cmd","","",0,null],[3,"Generate","","",null,null],[12,"private_key","","",1,null],[12,"public_key","","",1,null],[3,"Sign","","",null,null],[12,"private_key","","",2,null],[12,"input_file","","",2,null],[12,"input_string","","",2,null],[12,"signature_file","","",2,null],[3,"Verify","","",null,null],[12,"signature_file","","",3,null],[4,"Command","","Available commands for `oak_sign`.",null,null],[13,"Generate","","",4,null],[13,"Sign","","",4,null],[13,"Verify","","",4,null],[5,"main","","Main execution point for `oak_sign`.",null,[[],["result",6]]],[11,"from","","",0,[[]]],[11,"into","","",0,[[]]],[11,"to_owned","","",0,[[]]],[11,"clone_into","","",0,[[]]],[11,"borrow","","",0,[[]]],[11,"borrow_mut","","",0,[[]]],[11,"try_from","","",0,[[],["result",4]]],[11,"try_into","","",0,[[],["result",4]]],[11,"type_id","","",0,[[],["typeid",3]]],[11,"from","","",1,[[]]],[11,"into","","",1,[[]]],[11,"to_owned","","",1,[[]]],[11,"clone_into","","",1,[[]]],[11,"borrow","","",1,[[]]],[11,"borrow_mut","","",1,[[]]],[11,"try_from","","",1,[[],["result",4]]],[11,"try_into","","",1,[[],["result",4]]],[11,"type_id","","",1,[[],["typeid",3]]],[11,"from","","",2,[[]]],[11,"into","","",2,[[]]],[11,"to_owned","","",2,[[]]],[11,"clone_into","","",2,[[]]],[11,"borrow","","",2,[[]]],[11,"borrow_mut","","",2,[[]]],[11,"try_from","","",2,[[],["result",4]]],[11,"try_into","","",2,[[],["result",4]]],[11,"type_id","","",2,[[],["typeid",3]]],[11,"from","","",3,[[]]],[11,"into","","",3,[[]]],[11,"to_owned","","",3,[[]]],[11,"clone_into","","",3,[[]]],[11,"borrow","","",3,[[]]],[11,"borrow_mut","","",3,[[]]],[11,"try_from","","",3,[[],["result",4]]],[11,"try_into","","",3,[[],["result",4]]],[11,"type_id","","",3,[[],["typeid",3]]],[11,"from","","",4,[[]]],[11,"into","","",4,[[]]],[11,"to_owned","","",4,[[]]],[11,"clone_into","","",4,[[]]],[11,"borrow","","",4,[[]]],[11,"borrow_mut","","",4,[[]]],[11,"try_from","","",4,[[],["result",4]]],[11,"try_into","","",4,[[],["result",4]]],[11,"type_id","","",4,[[],["typeid",3]]],[11,"clone","","",0,[[],["opt",3]]],[11,"clone","","",4,[[],["command",4]]],[11,"clone","","",1,[[],["generate",3]]],[11,"clone","","",2,[[],["sign",3]]],[11,"clone","","",3,[[],["verify",3]]],[11,"clap","","",0,[[],["app",3]]],[11,"from_clap","","",0,[[["argmatches",3]]]],[11,"clap","","",4,[[],["app",3]]],[11,"from_clap","","",4,[[["argmatches",3]]]],[11,"clap","","",1,[[],["app",3]]],[11,"from_clap","","",1,[[["argmatches",3]]]],[11,"clap","","",2,[[],["app",3]]],[11,"from_clap","","",2,[[["argmatches",3]]]],[11,"clap","","",3,[[],["app",3]]],[11,"from_clap","","",3,[[["argmatches",3]]]],[11,"augment_clap","","",0,[[["app",3]],["app",3]]],[11,"is_subcommand","","",0,[[]]],[11,"augment_clap","","",4,[[["app",3]],["app",3]]],[11,"from_subcommand","","",4,[[],["option",4]]],[11,"is_subcommand","","",4,[[]]],[11,"augment_clap","","",1,[[["app",3]],["app",3]]],[11,"is_subcommand","","",1,[[]]],[11,"augment_clap","","",2,[[["app",3]],["app",3]]],[11,"is_subcommand","","",2,[[]]],[11,"augment_clap","","",3,[[["app",3]],["app",3]]],[11,"is_subcommand","","",3,[[]]]],"p":[[3,"Opt"],[3,"Generate"],[3,"Sign"],[3,"Verify"],[4,"Command"]]}\
}');
addSearchOptions(searchIndex);initSearch(searchIndex);