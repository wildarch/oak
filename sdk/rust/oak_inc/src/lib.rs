use bytes::{Buf, BufMut, Bytes, BytesMut};
use oak_abi::Handle;

// Custom derive macro to automatically implement the trait.
pub use oak_inc_derive::OakMessage;
pub trait OakMessage: Sized {
    fn serialize(&self, serializer: Serializer) -> Serializer;
    fn deserialize(deserializer: Deserializer) -> Result<(Self, Deserializer), DeserializeError>;
}

pub struct Serializer {
    message: BytesMut,
    handles: Vec<Handle>,
}

impl Serializer {
    pub fn new() -> Serializer {
        Serializer {
            message: BytesMut::new(),
            handles: Vec::new(),
        }
    }

    pub fn enum_variant(&mut self, discriminant: i32) {
        self.message.put_i32_le(discriminant);
    }

    pub fn finish(self) -> Serialized {
        Serialized {
            message: self.message.freeze(),
            handles: self.handles,
        }
    }
}

#[derive(Clone, Debug)]
pub struct Serialized {
    pub message: Bytes,
    pub handles: Vec<Handle>,
}

pub fn serialize<M: OakMessage>(message: &M) -> Serialized {
    message.serialize(Serializer::new()).finish()
}

pub struct Deserializer {
    message: Bytes,
    handles: Vec<Handle>,
}

impl Deserializer {
    pub fn new(source: Serialized) -> Deserializer {
        let mut handles = source.handles;
        handles.reverse();
        Deserializer {
            message: source.message,
            handles,
        }
    }

    pub fn enum_variant(&mut self) -> Result<i32, DeserializeError> {
        if self.message.remaining() < std::mem::size_of::<i32>() {
            return Err(DeserializeError::EndOfBuffer);
        }
        Ok(self.message.get_i32_le())
    }

    pub fn finish(self) -> Result<(), DeserializeError> {
        if self.message.has_remaining() {
            return Err(DeserializeError::MessageRemaining);
        } else if !self.handles.is_empty() {
            return Err(DeserializeError::HandlesRemaining);
        }
        Ok(())
    }
}

pub fn deserialize<T: OakMessage>(serialized: Serialized) -> Result<T, DeserializeError> {
    let deserializer = Deserializer::new(serialized);
    let (deserialized, deserializer) = T::deserialize(deserializer)?;
    deserializer.finish()?;
    Ok(deserialized)
}

#[derive(Debug)]
pub enum DeserializeError {
    MessageRemaining,
    HandlesRemaining,
    EndOfBuffer,
    Utf8(std::string::FromUtf8Error),
    InvalidEnumDiscriminator,
}

// TODO make these impls for scalar types more DRY
impl OakMessage for u8 {
    fn serialize(&self, mut serializer: Serializer) -> Serializer {
        serializer.message.put_u8(*self);
        serializer
    }

    fn deserialize(
        mut deserializer: Deserializer,
    ) -> Result<(Self, Deserializer), DeserializeError> {
        if deserializer.message.remaining() < std::mem::size_of::<u8>() {
            return Err(DeserializeError::EndOfBuffer);
        }
        let v = deserializer.message.get_u8();
        Ok((v, deserializer))
    }
}

impl OakMessage for i32 {
    fn serialize(&self, mut serializer: Serializer) -> Serializer {
        serializer.message.put_i32_le(*self);
        serializer
    }

    fn deserialize(
        mut deserializer: Deserializer,
    ) -> Result<(Self, Deserializer), DeserializeError> {
        if deserializer.message.remaining() < std::mem::size_of::<i32>() {
            return Err(DeserializeError::EndOfBuffer);
        }
        let v = deserializer.message.get_i32_le();
        Ok((v, deserializer))
    }
}

impl<T: OakMessage> OakMessage for Vec<T> {
    fn serialize(&self, mut serializer: Serializer) -> Serializer {
        serializer.message.put_u64_le(self.len() as u64);
        for item in self.iter() {
            serializer = item.serialize(serializer);
        }
        serializer
    }

    fn deserialize(
        mut deserializer: Deserializer,
    ) -> Result<(Self, Deserializer), DeserializeError> {
        if deserializer.message.remaining() < std::mem::size_of::<u64>() {
            return Err(DeserializeError::EndOfBuffer);
        }
        let len = deserializer.message.get_u64_le() as usize;
        if deserializer.message.remaining() < len {
            return Err(DeserializeError::EndOfBuffer);
        }
        let mut items = Vec::new();
        for _ in 0..len {
            let (v, d) = T::deserialize(deserializer)?;
            items.push(v);
            deserializer = d;
        }
        Ok((items, deserializer))
    }
}

impl OakMessage for String {
    fn serialize(&self, mut serializer: Serializer) -> Serializer {
        serializer.message.put_u64_le(self.len() as u64);
        serializer.message.put_slice(self.as_bytes());
        serializer
    }

    fn deserialize(deserializer: Deserializer) -> Result<(Self, Deserializer), DeserializeError> {
        let (bytes, deserializer) = Vec::<u8>::deserialize(deserializer)?;
        let s = String::from_utf8(bytes).map_err(DeserializeError::Utf8)?;
        Ok((s, deserializer))
    }
}
