<a id="0x3_property_map"></a>

# Module `0x3::property_map`

PropertyMap is a specialization of SimpleMap for Tokens.
It maps a String key to a PropertyValue that consists of type (string) and value (vector&lt;u8&gt;)
It provides basic on&#45;chain serialization of primitive and string to property value with type information
It also supports deserializing property value to it original type.

- [Struct `PropertyMap`](#0x3_property_map_PropertyMap)
- [Struct `PropertyValue`](#0x3_property_map_PropertyValue)
- [Constants](#@Constants_0)
- [Function `new`](#0x3_property_map_new)
- [Function `new_with_key_and_property_value`](#0x3_property_map_new_with_key_and_property_value)
- [Function `empty`](#0x3_property_map_empty)
- [Function `contains_key`](#0x3_property_map_contains_key)
- [Function `add`](#0x3_property_map_add)
- [Function `length`](#0x3_property_map_length)
- [Function `borrow`](#0x3_property_map_borrow)
- [Function `keys`](#0x3_property_map_keys)
- [Function `types`](#0x3_property_map_types)
- [Function `values`](#0x3_property_map_values)
- [Function `read_string`](#0x3_property_map_read_string)
- [Function `read_u8`](#0x3_property_map_read_u8)
- [Function `read_u64`](#0x3_property_map_read_u64)
- [Function `read_address`](#0x3_property_map_read_address)
- [Function `read_u128`](#0x3_property_map_read_u128)
- [Function `read_bool`](#0x3_property_map_read_bool)
- [Function `borrow_value`](#0x3_property_map_borrow_value)
- [Function `borrow_type`](#0x3_property_map_borrow_type)
- [Function `remove`](#0x3_property_map_remove)
- [Function `update_property_map`](#0x3_property_map_update_property_map)
- [Function `update_property_value`](#0x3_property_map_update_property_value)
- [Function `create_property_value_raw`](#0x3_property_map_create_property_value_raw)
- [Function `create_property_value`](#0x3_property_map_create_property_value)

```move
module 0x3::property_map {
    use 0x1::bcs;
    use 0x1::error;
    use 0x1::from_bcs;
    use 0x1::simple_map;
    use 0x1::string;
    use 0x1::type_info;
}
```

<a id="0x3_property_map_PropertyMap"></a>

## Struct `PropertyMap`

```move
module 0x3::property_map {
    struct PropertyMap has copy, drop, store
}
```

<a id="0x3_property_map_PropertyValue"></a>

## Struct `PropertyValue`

```move
module 0x3::property_map {
    struct PropertyValue has copy, drop, store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x3_property_map_EKEY_AREADY_EXIST_IN_PROPERTY_MAP"></a>

The property key already exists

```move
module 0x3::property_map {
    const EKEY_AREADY_EXIST_IN_PROPERTY_MAP: u64 = 1;
}
```

<a id="0x3_property_map_EKEY_COUNT_NOT_MATCH_TYPE_COUNT"></a>

Property key and type count don&apos;t match

```move
module 0x3::property_map {
    const EKEY_COUNT_NOT_MATCH_TYPE_COUNT: u64 = 5;
}
```

<a id="0x3_property_map_EKEY_COUNT_NOT_MATCH_VALUE_COUNT"></a>

Property key and value count don&apos;t match

```move
module 0x3::property_map {
    const EKEY_COUNT_NOT_MATCH_VALUE_COUNT: u64 = 4;
}
```

<a id="0x3_property_map_EPROPERTY_MAP_NAME_TOO_LONG"></a>

The name (key) of the property is too long

```move
module 0x3::property_map {
    const EPROPERTY_MAP_NAME_TOO_LONG: u64 = 7;
}
```

<a id="0x3_property_map_EPROPERTY_NOT_EXIST"></a>

The property doesn&apos;t exist

```move
module 0x3::property_map {
    const EPROPERTY_NOT_EXIST: u64 = 3;
}
```

<a id="0x3_property_map_EPROPERTY_NUMBER_EXCEED_LIMIT"></a>

The number of property exceeds the limit

```move
module 0x3::property_map {
    const EPROPERTY_NUMBER_EXCEED_LIMIT: u64 = 2;
}
```

<a id="0x3_property_map_ETYPE_NOT_MATCH"></a>

Property type doesn&apos;t match

```move
module 0x3::property_map {
    const ETYPE_NOT_MATCH: u64 = 6;
}
```

<a id="0x3_property_map_MAX_PROPERTY_MAP_SIZE"></a>

The maximal number of property that can be stored in property map

```move
module 0x3::property_map {
    const MAX_PROPERTY_MAP_SIZE: u64 = 1000;
}
```

<a id="0x3_property_map_MAX_PROPERTY_NAME_LENGTH"></a>

```move
module 0x3::property_map {
    const MAX_PROPERTY_NAME_LENGTH: u64 = 128;
}
```

<a id="0x3_property_map_new"></a>

## Function `new`

```move
module 0x3::property_map {
    public fun new(keys: vector<string::String>, values: vector<vector<u8>>, types: vector<string::String>): property_map::PropertyMap
}
```

<a id="0x3_property_map_new_with_key_and_property_value"></a>

## Function `new_with_key_and_property_value`

Create property map directly from key and property value

```move
module 0x3::property_map {
    public fun new_with_key_and_property_value(keys: vector<string::String>, values: vector<property_map::PropertyValue>): property_map::PropertyMap
}
```

<a id="0x3_property_map_empty"></a>

## Function `empty`

```move
module 0x3::property_map {
    public fun empty(): property_map::PropertyMap
}
```

<a id="0x3_property_map_contains_key"></a>

## Function `contains_key`

```move
module 0x3::property_map {
    public fun contains_key(map: &property_map::PropertyMap, key: &string::String): bool
}
```

<a id="0x3_property_map_add"></a>

## Function `add`

```move
module 0x3::property_map {
    public fun add(map: &mut property_map::PropertyMap, key: string::String, value: property_map::PropertyValue)
}
```

<a id="0x3_property_map_length"></a>

## Function `length`

```move
module 0x3::property_map {
    public fun length(map: &property_map::PropertyMap): u64
}
```

<a id="0x3_property_map_borrow"></a>

## Function `borrow`

```move
module 0x3::property_map {
    public fun borrow(map: &property_map::PropertyMap, key: &string::String): &property_map::PropertyValue
}
```

<a id="0x3_property_map_keys"></a>

## Function `keys`

Return all the keys in the property map in the order they are added.

```move
module 0x3::property_map {
    public fun keys(map: &property_map::PropertyMap): vector<string::String>
}
```

<a id="0x3_property_map_types"></a>

## Function `types`

Return the types of all properties in the property map in the order they are added.

```move
module 0x3::property_map {
    public fun types(map: &property_map::PropertyMap): vector<string::String>
}
```

<a id="0x3_property_map_values"></a>

## Function `values`

Return the values of all properties in the property map in the order they are added.

```move
module 0x3::property_map {
    public fun values(map: &property_map::PropertyMap): vector<vector<u8>>
}
```

<a id="0x3_property_map_read_string"></a>

## Function `read_string`

```move
module 0x3::property_map {
    public fun read_string(map: &property_map::PropertyMap, key: &string::String): string::String
}
```

<a id="0x3_property_map_read_u8"></a>

## Function `read_u8`

```move
module 0x3::property_map {
    public fun read_u8(map: &property_map::PropertyMap, key: &string::String): u8
}
```

<a id="0x3_property_map_read_u64"></a>

## Function `read_u64`

```move
module 0x3::property_map {
    public fun read_u64(map: &property_map::PropertyMap, key: &string::String): u64
}
```

<a id="0x3_property_map_read_address"></a>

## Function `read_address`

```move
module 0x3::property_map {
    public fun read_address(map: &property_map::PropertyMap, key: &string::String): address
}
```

<a id="0x3_property_map_read_u128"></a>

## Function `read_u128`

```move
module 0x3::property_map {
    public fun read_u128(map: &property_map::PropertyMap, key: &string::String): u128
}
```

<a id="0x3_property_map_read_bool"></a>

## Function `read_bool`

```move
module 0x3::property_map {
    public fun read_bool(map: &property_map::PropertyMap, key: &string::String): bool
}
```

<a id="0x3_property_map_borrow_value"></a>

## Function `borrow_value`

```move
module 0x3::property_map {
    public fun borrow_value(property: &property_map::PropertyValue): vector<u8>
}
```

<a id="0x3_property_map_borrow_type"></a>

## Function `borrow_type`

```move
module 0x3::property_map {
    public fun borrow_type(property: &property_map::PropertyValue): string::String
}
```

<a id="0x3_property_map_remove"></a>

## Function `remove`

```move
module 0x3::property_map {
    public fun remove(map: &mut property_map::PropertyMap, key: &string::String): (string::String, property_map::PropertyValue)
}
```

<a id="0x3_property_map_update_property_map"></a>

## Function `update_property_map`

Update the property in the existing property map
Allow updating existing keys&apos; value and add new key&#45;value pairs

```move
module 0x3::property_map {
    public fun update_property_map(map: &mut property_map::PropertyMap, keys: vector<string::String>, values: vector<vector<u8>>, types: vector<string::String>)
}
```

<a id="0x3_property_map_update_property_value"></a>

## Function `update_property_value`

```move
module 0x3::property_map {
    public fun update_property_value(map: &mut property_map::PropertyMap, key: &string::String, value: property_map::PropertyValue)
}
```

<a id="0x3_property_map_create_property_value_raw"></a>

## Function `create_property_value_raw`

```move
module 0x3::property_map {
    public fun create_property_value_raw(value: vector<u8>, type: string::String): property_map::PropertyValue
}
```

<a id="0x3_property_map_create_property_value"></a>

## Function `create_property_value`

create a property value from generic type data

```move
module 0x3::property_map {
    public fun create_property_value<T: copy>(data: &T): property_map::PropertyValue
}
```
