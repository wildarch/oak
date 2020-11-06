use proc_macro2::TokenStream;
use quote::{format_ident, quote, ToTokens};
use syn::{Data, Fields, FnArg, GenericArgument, Ident, PathArguments, Type};

pub fn entrypoint(
    _attr: proc_macro2::TokenStream,
    item: proc_macro2::TokenStream,
) -> proc_macro2::TokenStream {
    let ast = syn::parse_macro_input!(item as syn::ItemFn);
    let name = &ast.sig.ident;

    // must have no attrs on macro
    // visibility should be public
    // may be const
    // must be async
    // must not be unsafe
    // must be normal abi
    // must not use generics
    // no return type specified

    let msg_type = match ast.sig.inputs.first().unwrap() {
        FnArg::Typed(typed) => match typed.ty.as_ref() {
            Type::Path(path) => match &path.path.segments.last().unwrap().arguments {
                PathArguments::AngleBracketed(args) => match args.args.first().unwrap() {
                    GenericArgument::Type(ty) => ty,
                    _ => panic!(),
                },
                _ => panic!(),
            },
            _ => panic!(),
        },
        _ => panic!(),
    };

    let mut renamed_fn = ast.clone();
    let renamed_fn_ident = Ident::new("handler", proc_macro2::Span::call_site());
    renamed_fn.sig.ident = renamed_fn_ident.clone();
    let stringified_name = name.to_string();

    quote! {
        pub mod #name {
            pub fn start(label: &::oak::Label) -> Result<::oak::io::Sender<#msg_type>, ::oak::OakStatus> {
                let node_config = &::oak::node_config::wasm("app", #stringified_name);
                let (sender, receiver) = ::oak::channel_create(&format!("{}-in", #stringified_name), label)?;
                let sender = ::oak::io::Sender::<#msg_type>::new(sender);
                let receiver = ::oak::io::Receiver::<#msg_type>::new(receiver);
                match ::oak::node_create(#stringified_name, node_config, label, receiver.handle) {
                    Ok(_) => {}
                    Err(e) => {
                        let _ = ::oak::io::SenderExt::close(&sender);
                        let _ = ::oak::io::ReceiverExt::close(&receiver);
                        return Err(e);
                    }
                };
                ::oak::io::ReceiverExt::close(&receiver)?;
                Ok(sender)
            }

            // Do not mangle these functions when running unit tests, because the Rust unit test
            // framework will add a `pub extern "C" fn main()` containing the test runner. This can
            // cause clashes when $name = main. We don't fully omit it in tests so that compile errors
            // in the Node creation expression are still caught, and unit tests can still refer to the
            // symbol if they really want to.
            #[cfg_attr(not(test), no_mangle)]
            pub extern "C" fn #name(in_handle: u64) {
                // A panic in the Rust module code cannot safely pass through the FFI
                // boundary, so catch any panics here and drop them.
                // https://doc.rust-lang.org/nomicon/ffi.html#ffi-and-panics
                let _ = ::std::panic::catch_unwind(|| {
                    ::oak::set_panic_hook();

                    // Run the Node's entrypoint handler.
                    let in_read_handle = ::oak::ReadHandle { handle: in_handle };
                    let receiver = ::oak::io::Receiver::<#msg_type>::new(in_read_handle);
                    #renamed_fn_ident(receiver);
                });
            }

            // Make sure the imports all still resolve fine
            use super::*;
            #renamed_fn
        }
    }
}
