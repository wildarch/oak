extern crate proc_macro;
extern crate quote;
extern crate syn;

use proc_macro2::{Span, TokenStream};
use quote::quote;
use syn::{DataEnum, DataStruct, Fields, Ident, Type};

#[proc_macro_derive(OakMessage)]
pub fn oak_serialize(input: proc_macro::TokenStream) -> proc_macro::TokenStream {
    let ast = syn::parse_macro_input!(input as syn::DeriveInput);

    let name = &ast.ident;
    match &ast.data {
        syn::Data::Struct(data) => struct_impl(name, data),
        syn::Data::Enum(data) => enum_impl(name, data),
        syn::Data::Union(_data) => panic!("Cannot be derived for unions"),
    }
    .into()
}

fn struct_impl(name: &Ident, data: &DataStruct) -> TokenStream {
    let fields: Vec<(Ident, Type)> = match &data.fields {
        syn::Fields::Named(fields) => fields
            .named
            .iter()
            .flat_map(|f| f.ident.clone().map(|ident| (ident, f.ty.clone())))
            .collect(),
        syn::Fields::Unnamed(fields) => fields
            .unnamed
            .iter()
            .enumerate()
            .map(|(i, f)| {
                (
                    Ident::new(&format!("{}", i), Span::call_site()),
                    f.ty.clone(),
                )
            })
            .collect(),
        // Implement Unit structs
        _ => unimplemented!(),
    };
    let (accessors, types): (Vec<Ident>, Vec<Type>) = fields.into_iter().unzip();

    let gen = quote! {
        impl ::oak_inc::OakMessage for #name {
            fn serialize(&self, mut serializer: ::oak_inc::Serializer) -> ::oak_inc::Serializer {
                #(
                    serializer = self.#accessors.serialize(serializer);
                )*
                serializer
            }

            fn deserialize(deserializer: ::oak_inc::Deserializer) ->
                Result<(Self, ::oak_inc::Deserializer), ::oak_inc::DeserializeError> {
                    use ::oak_inc::OakMessage;
                    #(
                        let (#accessors, deserializer) = <#types>::deserialize(deserializer)?;
                    )*
                    Ok((
                        #name {
                            #(
                                #accessors,
                            )*
                        },
                        deserializer
                    ))
            }
        }
    };
    gen.into()
}

fn enum_impl(name: &Ident, data: &DataEnum) -> TokenStream {
    let (serialize_variants, deserialize_variants): (Vec<TokenStream>, Vec<TokenStream>) = data
        .variants
        .iter()
        .enumerate()
        .map(|(i, v)| {
            (
                serialize_variant(name, v, i as i32),
                deserialize_variant(name, v, i as i32),
            )
        })
        .unzip();
    let gen = quote! {
        impl ::oak_inc::OakMessage for #name {
            fn serialize(&self, mut serializer: ::oak_inc::Serializer) -> ::oak_inc::Serializer {
                match self {
                    #(
                        #serialize_variants
                    )*
                }
            }

            fn deserialize(mut deserializer: ::oak_inc::Deserializer) ->
                Result<(Self, ::oak_inc::Deserializer), ::oak_inc::DeserializeError> {
                    use ::oak_inc::OakMessage;
                    let discriminant = deserializer.enum_variant()?;
                    match discriminant {
                        #(
                            #deserialize_variants
                        )*
                        _ => Err(::oak_inc::DeserializeError::InvalidEnumDiscriminator),
                    }
            }
        }
    };
    gen.into()
}

fn serialize_variant(name: &Ident, variant: &syn::Variant, discriminant: i32) -> TokenStream {
    match &variant.fields {
        Fields::Named(fields) => {
            let field_names: Vec<Ident> =
                fields.named.iter().flat_map(|f| f.ident.clone()).collect();
            quote! {
                #name::#variant({ #( #field_names),* }) => {
                    #(
                        serializer.enum_variant(#discriminant);
                        let serializer = #field_names.serialize(serializer);
                    )*
                    serializer
                },
            }
        }
        Fields::Unnamed(fields) => {
            let field_names: Vec<Ident> = fields
                .unnamed
                .iter()
                .enumerate()
                .map(|(i, _)| num_ident(i as i32))
                .collect();
            quote! {
                #name::#variant(#( #field_names),*) => {
                    #(
                        serializer.enum_variant(#discriminant);
                        let serializer = #field_names.serialize(serializer);
                    )*
                    serializer
                },
            }
        }
        Fields::Unit => quote! {
            #name::#variant => {
                serializer.enum_variant(#discriminant);
                serializer
            },
        },
    }
}

fn deserialize_variant(name: &Ident, variant: &syn::Variant, discriminant: i32) -> TokenStream {
    match &variant.fields {
        Fields::Named(fields) => {
            let (names, types): (Vec<Ident>, Vec<Type>) = fields
                .named
                .iter()
                .map(|f| (f.ident.clone().unwrap(), f.ty.clone()))
                .unzip();
            quote! {
                #discriminant => {
                    #(
                        let (#names, deserializer) = <#types>::deserialize(deserializer)?;
                    )*
                    Ok((#name::#variant { #(#names),* }, deserializer))
                },
            }
        }
        Fields::Unnamed(fields) => {
            let (names, types): (Vec<Ident>, Vec<Type>) = fields
                .unnamed
                .iter()
                .enumerate()
                .map(|(i, f)| (num_ident(i as i32), f.ty.clone()))
                .unzip();
            quote! {
                #discriminant => {
                    #(
                        let (#names, deserializer) = <#types>::deserialize(deserializer)?;
                    )*
                    Ok((#name::#variant(#(#names),*), deserializer))
                },
            }
        }
        Fields::Unit => quote! {
            #discriminant => Ok((#name::#variant, deserializer)),
        },
    }
}

fn num_ident(i: i32) -> Ident {
    Ident::new(&format!("_{}", i), Span::call_site())
}
