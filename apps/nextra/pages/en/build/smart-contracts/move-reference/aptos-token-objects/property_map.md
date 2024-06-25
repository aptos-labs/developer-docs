<a id="0x4_property_map"></a>

# Module `0x4::property_map`

`PropertyMap` provides generic metadata support for `AptosToken`. It is a specialization of
`SimpleMap` that enforces strict typing with minimal storage use by using constant u64 to
represent types and storing values in bcs format.

- [Resource `PropertyMap`](#0x4_property_map_PropertyMap)
- [Struct `PropertyValue`](#0x4_property_map_PropertyValue)
- [Struct `MutatorRef`](#0x4_property_map_MutatorRef)
- [Constants](#@Constants_0)
- [Function `init`](#0x4_property_map_init)
- [Function `extend`](#0x4_property_map_extend)
- [Function `burn`](#0x4_property_map_burn)
- [Function `prepare_input`](#0x4_property_map_prepare_input)
- [Function `generate_mutator_ref`](#0x4_property_map_generate_mutator_ref)
- [Function `contains_key`](#0x4_property_map_contains_key)
- [Function `length`](#0x4_property_map_length)
- [Function `read`](#0x4_property_map_read)
- [Function `read_bool`](#0x4_property_map_read_bool)
- [Function `read_u8`](#0x4_property_map_read_u8)
- [Function `read_u16`](#0x4_property_map_read_u16)
- [Function `read_u32`](#0x4_property_map_read_u32)
- [Function `read_u64`](#0x4_property_map_read_u64)
- [Function `read_u128`](#0x4_property_map_read_u128)
- [Function `read_u256`](#0x4_property_map_read_u256)
- [Function `read_address`](#0x4_property_map_read_address)
- [Function `read_bytes`](#0x4_property_map_read_bytes)
- [Function `read_string`](#0x4_property_map_read_string)
- [Function `add`](#0x4_property_map_add)
- [Function `add_typed`](#0x4_property_map_add_typed)
- [Function `update`](#0x4_property_map_update)
- [Function `update_typed`](#0x4_property_map_update_typed)
- [Function `remove`](#0x4_property_map_remove)

```move
module 0x4::property_map {
    use 0x1::bcs;
    use 0x1::error;
    use 0x1::from_bcs;
    use 0x1::object;
    use 0x1::simple_map;
    use 0x1::string;
    use 0x1::type_info;
    use 0x1::vector;
}
```

<a id="0x4_property_map_PropertyMap"></a>

## Resource `PropertyMap`

A Map for typed key to value mapping, the contract using it
should keep track of what keys are what types, and parse them accordingly.

```move
module 0x4::property_map {
    #[resource_group_member(#[group = 0x1::object::ObjectGroup])]
    struct PropertyMap has drop, key
}
```

<a id="0x4_property_map_PropertyValue"></a>

## Struct `PropertyValue`

A typed value for the `PropertyMap` to ensure that typing is always consistent

```move
module 0x4::property_map {
    struct PropertyValue has drop, store
}
```

<a id="0x4_property_map_MutatorRef"></a>

## Struct `MutatorRef`

A mutator ref that allows for mutation of the property map

```move
module 0x4::property_map {
    struct MutatorRef has drop, store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x4_property_map_ETYPE_MISMATCH"></a>

Property value does not match expected type

```move
module 0x4::property_map {
    const ETYPE_MISMATCH: u64 = 6;
}
```

<a id="0x4_property_map_ADDRESS"></a>

```move
module 0x4::property_map {
    const ADDRESS: u8 = 7;
}
```

<a id="0x4_property_map_BOOL"></a>

```move
module 0x4::property_map {
    const BOOL: u8 = 0;
}
```

<a id="0x4_property_map_BYTE_VECTOR"></a>

```move
module 0x4::property_map {
    const BYTE_VECTOR: u8 = 8;
}
```

<a id="0x4_property_map_EKEY_ALREADY_EXISTS_IN_PROPERTY_MAP"></a>

The property key already exists

```move
module 0x4::property_map {
    const EKEY_ALREADY_EXISTS_IN_PROPERTY_MAP: u64 = 2;
}
```

<a id="0x4_property_map_EKEY_TYPE_COUNT_MISMATCH"></a>

Property key and type counts do not match

```move
module 0x4::property_map {
    const EKEY_TYPE_COUNT_MISMATCH: u64 = 5;
}
```

<a id="0x4_property_map_EKEY_VALUE_COUNT_MISMATCH"></a>

Property key and value counts do not match

```move
module 0x4::property_map {
    const EKEY_VALUE_COUNT_MISMATCH: u64 = 4;
}
```

<a id="0x4_property_map_EPROPERTY_MAP_DOES_NOT_EXIST"></a>

The property map does not exist

```move
module 0x4::property_map {
    const EPROPERTY_MAP_DOES_NOT_EXIST: u64 = 1;
}
```

<a id="0x4_property_map_EPROPERTY_MAP_KEY_TOO_LONG"></a>

The key of the property is too long

```move
module 0x4::property_map {
    const EPROPERTY_MAP_KEY_TOO_LONG: u64 = 8;
}
```

<a id="0x4_property_map_ETOO_MANY_PROPERTIES"></a>

The number of properties exceeds the maximum

```move
module 0x4::property_map {
    const ETOO_MANY_PROPERTIES: u64 = 3;
}
```

<a id="0x4_property_map_ETYPE_INVALID"></a>

Invalid value type specified

```move
module 0x4::property_map {
    const ETYPE_INVALID: u64 = 7;
}
```

<a id="0x4_property_map_MAX_PROPERTY_MAP_SIZE"></a>

Maximum number of items in a `PropertyMap`

```move
module 0x4::property_map {
    const MAX_PROPERTY_MAP_SIZE: u64 = 1000;
}
```

<a id="0x4_property_map_MAX_PROPERTY_NAME_LENGTH"></a>

Maximum number of characters in a property name

```move
module 0x4::property_map {
    const MAX_PROPERTY_NAME_LENGTH: u64 = 128;
}
```

<a id="0x4_property_map_STRING"></a>

```move
module 0x4::property_map {
    const STRING: u8 = 9;
}
```

<a id="0x4_property_map_U128"></a>

```move
module 0x4::property_map {
    const U128: u8 = 5;
}
```

<a id="0x4_property_map_U16"></a>

```move
module 0x4::property_map {
    const U16: u8 = 2;
}
```

<a id="0x4_property_map_U256"></a>

```move
module 0x4::property_map {
    const U256: u8 = 6;
}
```

<a id="0x4_property_map_U32"></a>

```move
module 0x4::property_map {
    const U32: u8 = 3;
}
```

<a id="0x4_property_map_U64"></a>

```move
module 0x4::property_map {
    const U64: u8 = 4;
}
```

<a id="0x4_property_map_U8"></a>

```move
module 0x4::property_map {
    const U8: u8 = 1;
}
```

<a id="0x4_property_map_init"></a>

## Function `init`

```move
module 0x4::property_map {
    public fun init(ref: &object::ConstructorRef, container: property_map::PropertyMap)
}
```

<a id="0x4_property_map_extend"></a>

## Function `extend`

```move
module 0x4::property_map {
    public fun extend(ref: &object::ExtendRef, container: property_map::PropertyMap)
}
```

<a id="0x4_property_map_burn"></a>

## Function `burn`

Burns the entire property map

```move
module 0x4::property_map {
    public fun burn(ref: property_map::MutatorRef)
}
```

<a id="0x4_property_map_prepare_input"></a>

## Function `prepare_input`

Helper for external entry functions to produce a valid container for property values.

```move
module 0x4::property_map {
    public fun prepare_input(keys: vector<string::String>, types: vector<string::String>, values: vector<vector<u8>>): property_map::PropertyMap
}
```

<a id="0x4_property_map_generate_mutator_ref"></a>

## Function `generate_mutator_ref`

```move
module 0x4::property_map {
    public fun generate_mutator_ref(ref: &object::ConstructorRef): property_map::MutatorRef
}
```

<a id="0x4_property_map_contains_key"></a>

## Function `contains_key`

```move
module 0x4::property_map {
    public fun contains_key<T: key>(object: &object::Object<T>, key: &string::String): bool
}
```

<a id="0x4_property_map_length"></a>

## Function `length`

```move
module 0x4::property_map {
    public fun length<T: key>(object: &object::Object<T>): u64
}
```

<a id="0x4_property_map_read"></a>

## Function `read`

Read the property and get it&apos;s external type in it&apos;s bcs encoded format

The preferred method is to use `read_<type>` where the type is already known.

```move
module 0x4::property_map {
    public fun read<T: key>(object: &object::Object<T>, key: &string::String): (string::String, vector<u8>)
}
```

<a id="0x4_property_map_read_bool"></a>

## Function `read_bool`

```move
module 0x4::property_map {
    public fun read_bool<T: key>(object: &object::Object<T>, key: &string::String): bool
}
```

<a id="0x4_property_map_read_u8"></a>

## Function `read_u8`

```move
module 0x4::property_map {
    public fun read_u8<T: key>(object: &object::Object<T>, key: &string::String): u8
}
```

<a id="0x4_property_map_read_u16"></a>

## Function `read_u16`

```move
module 0x4::property_map {
    public fun read_u16<T: key>(object: &object::Object<T>, key: &string::String): u16
}
```

<a id="0x4_property_map_read_u32"></a>

## Function `read_u32`

```move
module 0x4::property_map {
    public fun read_u32<T: key>(object: &object::Object<T>, key: &string::String): u32
}
```

<a id="0x4_property_map_read_u64"></a>

## Function `read_u64`

```move
module 0x4::property_map {
    public fun read_u64<T: key>(object: &object::Object<T>, key: &string::String): u64
}
```

<a id="0x4_property_map_read_u128"></a>

## Function `read_u128`

```move
module 0x4::property_map {
    public fun read_u128<T: key>(object: &object::Object<T>, key: &string::String): u128
}
```

<a id="0x4_property_map_read_u256"></a>

## Function `read_u256`

```move
module 0x4::property_map {
    public fun read_u256<T: key>(object: &object::Object<T>, key: &string::String): u256
}
```

<a id="0x4_property_map_read_address"></a>

## Function `read_address`

```move
module 0x4::property_map {
    public fun read_address<T: key>(object: &object::Object<T>, key: &string::String): address
}
```

<a id="0x4_property_map_read_bytes"></a>

## Function `read_bytes`

```move
module 0x4::property_map {
    public fun read_bytes<T: key>(object: &object::Object<T>, key: &string::String): vector<u8>
}
```

<a id="0x4_property_map_read_string"></a>

## Function `read_string`

```move
module 0x4::property_map {
    public fun read_string<T: key>(object: &object::Object<T>, key: &string::String): string::String
}
```

<a id="0x4_property_map_add"></a>

## Function `add`

Add a property, already bcs encoded as a `vector<u8>`

```move
module 0x4::property_map {
    public fun add(ref: &property_map::MutatorRef, key: string::String, type: string::String, value: vector<u8>)
}
```

<a id="0x4_property_map_add_typed"></a>

## Function `add_typed`

Add a property that isn&apos;t already encoded as a `vector<u8>`

```move
module 0x4::property_map {
    public fun add_typed<T: drop>(ref: &property_map::MutatorRef, key: string::String, value: T)
}
```

<a id="0x4_property_map_update"></a>

## Function `update`

Updates a property in place already bcs encoded

```move
module 0x4::property_map {
    public fun update(ref: &property_map::MutatorRef, key: &string::String, type: string::String, value: vector<u8>)
}
```

<a id="0x4_property_map_update_typed"></a>

## Function `update_typed`

Updates a property in place that is not already bcs encoded

```move
module 0x4::property_map {
    public fun update_typed<T: drop>(ref: &property_map::MutatorRef, key: &string::String, value: T)
}
```

<a id="0x4_property_map_remove"></a>

## Function `remove`

Removes a property from the map, ensuring that it does in fact exist

```move
module 0x4::property_map {
    public fun remove(ref: &property_map::MutatorRef, key: &string::String)
}
```
