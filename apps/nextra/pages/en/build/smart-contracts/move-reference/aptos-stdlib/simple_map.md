<a id="0x1_simple_map"></a>

# Module `0x1::simple_map`

This module provides a solution for unsorted maps, that is it has the properties that

1. Keys point to Values
2. Each Key must be unique
3. A Key can be found within O(N) time
4. The keys are unsorted.
5. Adds and removals take O(N) time

- [Struct `SimpleMap`](#0x1_simple_map_SimpleMap)
- [Struct `Element`](#0x1_simple_map_Element)
- [Constants](#@Constants_0)
- [Function `length`](#0x1_simple_map_length)
- [Function `new`](#0x1_simple_map_new)
- [Function `new_from`](#0x1_simple_map_new_from)
- [Function `create`](#0x1_simple_map_create)
- [Function `borrow`](#0x1_simple_map_borrow)
- [Function `borrow_mut`](#0x1_simple_map_borrow_mut)
- [Function `contains_key`](#0x1_simple_map_contains_key)
- [Function `destroy_empty`](#0x1_simple_map_destroy_empty)
- [Function `add`](#0x1_simple_map_add)
- [Function `add_all`](#0x1_simple_map_add_all)
- [Function `upsert`](#0x1_simple_map_upsert)
- [Function `keys`](#0x1_simple_map_keys)
- [Function `values`](#0x1_simple_map_values)
- [Function `to_vec_pair`](#0x1_simple_map_to_vec_pair)
- [Function `destroy`](#0x1_simple_map_destroy)
- [Function `remove`](#0x1_simple_map_remove)

```move
module 0x1::simple_map {
    use 0x1::error;
    use 0x1::option;
    use 0x1::vector;
}
```

<a id="0x1_simple_map_SimpleMap"></a>

## Struct `SimpleMap`

```move
module 0x1::simple_map {
    struct SimpleMap<Key, Value> has copy, drop, store
}
```

<a id="0x1_simple_map_Element"></a>

## Struct `Element`

```move
module 0x1::simple_map {
    struct Element<Key, Value> has copy, drop, store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_simple_map_EKEY_ALREADY_EXISTS"></a>

Map key already exists

```move
module 0x1::simple_map {
    const EKEY_ALREADY_EXISTS: u64 = 1;
}
```

<a id="0x1_simple_map_EKEY_NOT_FOUND"></a>

Map key is not found

```move
module 0x1::simple_map {
    const EKEY_NOT_FOUND: u64 = 2;
}
```

<a id="0x1_simple_map_length"></a>

## Function `length`

```move
module 0x1::simple_map {
    public fun length<Key: store, Value: store>(map: &simple_map::SimpleMap<Key, Value>): u64
}
```

<a id="0x1_simple_map_new"></a>

## Function `new`

Create an empty SimpleMap.

```move
module 0x1::simple_map {
    public fun new<Key: store, Value: store>(): simple_map::SimpleMap<Key, Value>
}
```

<a id="0x1_simple_map_new_from"></a>

## Function `new_from`

Create a SimpleMap from a vector of keys and values. The keys must be unique.

```move
module 0x1::simple_map {
    public fun new_from<Key: store, Value: store>(keys: vector<Key>, values: vector<Value>): simple_map::SimpleMap<Key, Value>
}
```

<a id="0x1_simple_map_create"></a>

## Function `create`

Create an empty SimpleMap.
This function is deprecated, use `new` instead.

```move
module 0x1::simple_map {
    #[deprecated]
    public fun create<Key: store, Value: store>(): simple_map::SimpleMap<Key, Value>
}
```

<a id="0x1_simple_map_borrow"></a>

## Function `borrow`

```move
module 0x1::simple_map {
    public fun borrow<Key: store, Value: store>(map: &simple_map::SimpleMap<Key, Value>, key: &Key): &Value
}
```

<a id="0x1_simple_map_borrow_mut"></a>

## Function `borrow_mut`

```move
module 0x1::simple_map {
    public fun borrow_mut<Key: store, Value: store>(map: &mut simple_map::SimpleMap<Key, Value>, key: &Key): &mut Value
}
```

<a id="0x1_simple_map_contains_key"></a>

## Function `contains_key`

```move
module 0x1::simple_map {
    public fun contains_key<Key: store, Value: store>(map: &simple_map::SimpleMap<Key, Value>, key: &Key): bool
}
```

<a id="0x1_simple_map_destroy_empty"></a>

## Function `destroy_empty`

```move
module 0x1::simple_map {
    public fun destroy_empty<Key: store, Value: store>(map: simple_map::SimpleMap<Key, Value>)
}
```

<a id="0x1_simple_map_add"></a>

## Function `add`

Add a key/value pair to the map. The key must not already exist.

```move
module 0x1::simple_map {
    public fun add<Key: store, Value: store>(map: &mut simple_map::SimpleMap<Key, Value>, key: Key, value: Value)
}
```

<a id="0x1_simple_map_add_all"></a>

## Function `add_all`

Add multiple key/value pairs to the map. The keys must not already exist.

```move
module 0x1::simple_map {
    public fun add_all<Key: store, Value: store>(map: &mut simple_map::SimpleMap<Key, Value>, keys: vector<Key>, values: vector<Value>)
}
```

<a id="0x1_simple_map_upsert"></a>

## Function `upsert`

Insert key/value pair or update an existing key to a new value

```move
module 0x1::simple_map {
    public fun upsert<Key: store, Value: store>(map: &mut simple_map::SimpleMap<Key, Value>, key: Key, value: Value): (option::Option<Key>, option::Option<Value>)
}
```

<a id="0x1_simple_map_keys"></a>

## Function `keys`

Return all keys in the map. This requires keys to be copyable.

```move
module 0x1::simple_map {
    public fun keys<Key: copy, Value>(map: &simple_map::SimpleMap<Key, Value>): vector<Key>
}
```

<a id="0x1_simple_map_values"></a>

## Function `values`

Return all values in the map. This requires values to be copyable.

```move
module 0x1::simple_map {
    public fun values<Key, Value: copy>(map: &simple_map::SimpleMap<Key, Value>): vector<Value>
}
```

<a id="0x1_simple_map_to_vec_pair"></a>

## Function `to_vec_pair`

Transform the map into two vectors with the keys and values respectively
Primarily used to destroy a map

```move
module 0x1::simple_map {
    public fun to_vec_pair<Key: store, Value: store>(map: simple_map::SimpleMap<Key, Value>): (vector<Key>, vector<Value>)
}
```

<a id="0x1_simple_map_destroy"></a>

## Function `destroy`

For maps that cannot be dropped this is a utility to destroy them
using lambdas to destroy the individual keys and values.

```move
module 0x1::simple_map {
    public fun destroy<Key: store, Value: store>(map: simple_map::SimpleMap<Key, Value>, dk: |Key|, dv: |Value|)
}
```

<a id="0x1_simple_map_remove"></a>

## Function `remove`

Remove a key/value pair from the map. The key must exist.

```move
module 0x1::simple_map {
    public fun remove<Key: store, Value: store>(map: &mut simple_map::SimpleMap<Key, Value>, key: &Key): (Key, Value)
}
```
