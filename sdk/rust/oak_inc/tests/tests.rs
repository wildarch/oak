use oak_inc::{deserialize, serialize, OakMessage};

#[derive(Debug, PartialEq, OakMessage)]
enum Handedness {
    Left,
    Right,
}

#[derive(Debug, PartialEq, OakMessage)]
struct Person {
    name: String,
    height_cm: i32,
    dominant_hand: Handedness,
}

#[test]
fn roundtrip() {
    let person = Person {
        name: "Alice".into(),
        height_cm: 203,
        dominant_hand: Handedness::Left,
    };

    let serialized = serialize(&person);
    println!("{:?}", serialized);
    let deserialized = deserialize(serialized).expect("Failed to deserialize");

    assert_eq!(person, deserialized);
}

#[test]
fn string() {
    let s = String::from("Bob");
    let serialized = serialize(&s);
    println!("{:?}", serialized);
    let deserialized: String = deserialize(serialized).expect("Failed to deserialize");

    assert_eq!(s, deserialized);
}

#[test]
fn plain_enum() {
    let h = Handedness::Right;

    let serialized = serialize(&h);
    println!("{:?}", serialized);
    let deserialized = deserialize(serialized).expect("Failed to deserialize");

    assert_eq!(h, deserialized);
}
