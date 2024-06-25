<a id="0x1_smart_table"></a>

# Module `0x1::smart_table`

A smart table implementation based on linear hashing. (https://en.wikipedia.org/wiki/Linear_hashing)
Compare to Table, it uses less storage slots but has higher chance of collision, a trade&#45;off between space and time.
Compare to other dynamic hashing implementation, linear hashing splits one bucket a time instead of doubling buckets
when expanding to avoid unexpected gas cost.
SmartTable uses faster hash function SipHash instead of cryptographically secure hash functions like sha3&#45;256 since
it tolerates collisions.

- [Struct `Entry`](#0x1_smart_table_Entry)
- [Struct `SmartTable`](#0x1_smart_table_SmartTable)
- [Constants](#@Constants_0)
- [Function `new`](#0x1_smart_table_new)
- [Function `new_with_config`](#0x1_smart_table_new_with_config)
- [Function `destroy_empty`](#0x1_smart_table_destroy_empty)
- [Function `destroy`](#0x1_smart_table_destroy)
- [Function `clear`](#0x1_smart_table_clear)
- [Function `add`](#0x1_smart_table_add)
- [Function `add_all`](#0x1_smart_table_add_all)
- [Function `to_simple_map`](#0x1_smart_table_to_simple_map)
- [Function `keys`](#0x1_smart_table_keys)
- [Function `keys_paginated`](#0x1_smart_table_keys_paginated)
- [Function `borrow`](#0x1_smart_table_borrow)
- [Function `borrow_with_default`](#0x1_smart_table_borrow_with_default)
- [Function `borrow_mut`](#0x1_smart_table_borrow_mut)
- [Function `borrow_mut_with_default`](#0x1_smart_table_borrow_mut_with_default)
- [Function `contains`](#0x1_smart_table_contains)
- [Function `remove`](#0x1_smart_table_remove)
- [Function `upsert`](#0x1_smart_table_upsert)
- [Function `length`](#0x1_smart_table_length)
- [Function `load_factor`](#0x1_smart_table_load_factor)
- [Function `update_split_load_threshold`](#0x1_smart_table_update_split_load_threshold)
- [Function `update_target_bucket_size`](#0x1_smart_table_update_target_bucket_size)
- [Function `for_each_ref`](#0x1_smart_table_for_each_ref)
- [Function `for_each_mut`](#0x1_smart_table_for_each_mut)
- [Function `map_ref`](#0x1_smart_table_map_ref)
- [Function `any`](#0x1_smart_table_any)
- [Function `borrow_kv`](#0x1_smart_table_borrow_kv)
- [Function `borrow_kv_mut`](#0x1_smart_table_borrow_kv_mut)
- [Function `num_buckets`](#0x1_smart_table_num_buckets)
- [Function `borrow_buckets`](#0x1_smart_table_borrow_buckets)
- [Function `borrow_buckets_mut`](#0x1_smart_table_borrow_buckets_mut)

```move
module 0x1::smart_table {
    use 0x1::aptos_hash;
    use 0x1::error;
    use 0x1::math64;
    use 0x1::option;
    use 0x1::simple_map;
    use 0x1::table_with_length;
    use 0x1::type_info;
    use 0x1::vector;
}
```

<a id="0x1_smart_table_Entry"></a>

## Struct `Entry`

SmartTable entry contains both the key and value.

```move
module 0x1::smart_table {
    struct Entry<K, V> has copy, drop, store
}
```

<a id="0x1_smart_table_SmartTable"></a>

## Struct `SmartTable`

```move
module 0x1::smart_table {
    struct SmartTable<K, V> has store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_smart_table_ENOT_EMPTY"></a>

Cannot destroy non&#45;empty hashmap

```move
module 0x1::smart_table {
    const ENOT_EMPTY: u64 = 3;
}
```

<a id="0x1_smart_table_ENOT_FOUND"></a>

Key not found in the smart table

```move
module 0x1::smart_table {
    const ENOT_FOUND: u64 = 1;
}
```

<a id="0x1_smart_table_EALREADY_EXIST"></a>

Key already exists

```move
module 0x1::smart_table {
    const EALREADY_EXIST: u64 = 4;
}
```

<a id="0x1_smart_table_EEXCEED_MAX_BUCKET_SIZE"></a>

Invalid target bucket size.

```move
module 0x1::smart_table {
    const EEXCEED_MAX_BUCKET_SIZE: u64 = 7;
}
```

<a id="0x1_smart_table_EINVALID_BUCKET_INDEX"></a>

Invalid bucket index.

```move
module 0x1::smart_table {
    const EINVALID_BUCKET_INDEX: u64 = 8;
}
```

<a id="0x1_smart_table_EINVALID_LOAD_THRESHOLD_PERCENT"></a>

Invalid load threshold percent to trigger split.

```move
module 0x1::smart_table {
    const EINVALID_LOAD_THRESHOLD_PERCENT: u64 = 5;
}
```

<a id="0x1_smart_table_EINVALID_TARGET_BUCKET_SIZE"></a>

Invalid target bucket size.

```move
module 0x1::smart_table {
    const EINVALID_TARGET_BUCKET_SIZE: u64 = 6;
}
```

<a id="0x1_smart_table_EINVALID_VECTOR_INDEX"></a>

Invalid vector index within a bucket.

```move
module 0x1::smart_table {
    const EINVALID_VECTOR_INDEX: u64 = 9;
}
```

<a id="0x1_smart_table_EZERO_CAPACITY"></a>

Smart table capacity must be larger than 0

```move
module 0x1::smart_table {
    const EZERO_CAPACITY: u64 = 2;
}
```

<a id="0x1_smart_table_new"></a>

## Function `new`

Create an empty SmartTable with default configurations.

```move
module 0x1::smart_table {
    public fun new<K: copy, drop, store, V: store>(): smart_table::SmartTable<K, V>
}
```

<a id="0x1_smart_table_new_with_config"></a>

## Function `new_with_config`

Create an empty SmartTable with customized configurations.
`num_initial_buckets`: The number of buckets on initialization. 0 means using default value.
`split_load_threshold`: The percent number which once reached, split will be triggered. 0 means using default
value.
`target_bucket_size`: The target number of entries per bucket, though not guaranteed. 0 means not set and will
dynamically assgined by the contract code.

```move
module 0x1::smart_table {
    public fun new_with_config<K: copy, drop, store, V: store>(num_initial_buckets: u64, split_load_threshold: u8, target_bucket_size: u64): smart_table::SmartTable<K, V>
}
```

<a id="0x1_smart_table_destroy_empty"></a>

## Function `destroy_empty`

Destroy empty table.
Aborts if it&apos;s not empty.

```move
module 0x1::smart_table {
    public fun destroy_empty<K, V>(table: smart_table::SmartTable<K, V>)
}
```

<a id="0x1_smart_table_destroy"></a>

## Function `destroy`

Destroy a table completely when V has `drop`.

```move
module 0x1::smart_table {
    public fun destroy<K: drop, V: drop>(table: smart_table::SmartTable<K, V>)
}
```

<a id="0x1_smart_table_clear"></a>

## Function `clear`

Clear a table completely when T has `drop`.

```move
module 0x1::smart_table {
    public fun clear<K: drop, V: drop>(table: &mut smart_table::SmartTable<K, V>)
}
```

<a id="0x1_smart_table_add"></a>

## Function `add`

Add (key, value) pair in the hash map, it may grow one bucket if current load factor exceeds the threshold.
Note it may not split the actual overflowed bucket. Instead, it was determined by `num_buckets` and `level`.
For standard linear hash algorithm, it is stored as a variable but `num_buckets` here could be leveraged.
Abort if `key` already exists.
Note: This method may occasionally cost much more gas when triggering bucket split.

```move
module 0x1::smart_table {
    public fun add<K, V>(table: &mut smart_table::SmartTable<K, V>, key: K, value: V)
}
```

<a id="0x1_smart_table_add_all"></a>

## Function `add_all`

Add multiple key/value pairs to the smart table. The keys must not already exist.

```move
module 0x1::smart_table {
    public fun add_all<K, V>(table: &mut smart_table::SmartTable<K, V>, keys: vector<K>, values: vector<V>)
}
```

<a id="0x1_smart_table_to_simple_map"></a>

## Function `to_simple_map`

Convert a smart table to a simple_map, which is supposed to be called mostly by view functions to get an atomic
view of the whole table.
Disclaimer: This function may be costly as the smart table may be huge in size. Use it at your own discretion.

```move
module 0x1::smart_table {
    public fun to_simple_map<K: copy, drop, store, V: copy, store>(table: &smart_table::SmartTable<K, V>): simple_map::SimpleMap<K, V>
}
```

<a id="0x1_smart_table_keys"></a>

## Function `keys`

Get all keys in a smart table.

For a large enough smart table this function will fail due to execution gas limits, and
`keys_paginated` should be used instead.

```move
module 0x1::smart_table {
    public fun keys<K: copy, drop, store, V: copy, store>(table_ref: &smart_table::SmartTable<K, V>): vector<K>
}
```

<a id="0x1_smart_table_keys_paginated"></a>

## Function `keys_paginated`

Get keys from a smart table, paginated.

This function can be used to paginate all keys in a large smart table outside of runtime,
e.g. through chained view function calls. The maximum `num_keys_to_get` before hitting gas
limits depends on the data types in the smart table.

When starting pagination, pass `starting_bucket_index` &#61; `starting_vector_index` &#61; 0.

The function will then return a vector of keys, an optional bucket index, and an optional
vector index. The unpacked return indices can then be used as inputs to another pagination
call, which will return a vector of more keys. This process can be repeated until the
returned bucket index and vector index value options are both none, which means that
pagination is complete. For an example, see `test_keys()`.

```move
module 0x1::smart_table {
    public fun keys_paginated<K: copy, drop, store, V: copy, store>(table_ref: &smart_table::SmartTable<K, V>, starting_bucket_index: u64, starting_vector_index: u64, num_keys_to_get: u64): (vector<K>, option::Option<u64>, option::Option<u64>)
}
```

<a id="0x1_smart_table_borrow"></a>

## Function `borrow`

Acquire an immutable reference to the value which `key` maps to.
Aborts if there is no entry for `key`.

```move
module 0x1::smart_table {
    public fun borrow<K: drop, V>(table: &smart_table::SmartTable<K, V>, key: K): &V
}
```

<a id="0x1_smart_table_borrow_with_default"></a>

## Function `borrow_with_default`

Acquire an immutable reference to the value which `key` maps to.
Returns specified default value if there is no entry for `key`.

```move
module 0x1::smart_table {
    public fun borrow_with_default<K: copy, drop, V>(table: &smart_table::SmartTable<K, V>, key: K, default: &V): &V
}
```

<a id="0x1_smart_table_borrow_mut"></a>

## Function `borrow_mut`

Acquire a mutable reference to the value which `key` maps to.
Aborts if there is no entry for `key`.

```move
module 0x1::smart_table {
    public fun borrow_mut<K: drop, V>(table: &mut smart_table::SmartTable<K, V>, key: K): &mut V
}
```

<a id="0x1_smart_table_borrow_mut_with_default"></a>

## Function `borrow_mut_with_default`

Acquire a mutable reference to the value which `key` maps to.
Insert the pair (`key`, `default`) first if there is no entry for `key`.

```move
module 0x1::smart_table {
    public fun borrow_mut_with_default<K: copy, drop, V: drop>(table: &mut smart_table::SmartTable<K, V>, key: K, default: V): &mut V
}
```

<a id="0x1_smart_table_contains"></a>

## Function `contains`

Returns true iff `table` contains an entry for `key`.

```move
module 0x1::smart_table {
    public fun contains<K: drop, V>(table: &smart_table::SmartTable<K, V>, key: K): bool
}
```

<a id="0x1_smart_table_remove"></a>

## Function `remove`

Remove from `table` and return the value which `key` maps to.
Aborts if there is no entry for `key`.

```move
module 0x1::smart_table {
    public fun remove<K: copy, drop, V>(table: &mut smart_table::SmartTable<K, V>, key: K): V
}
```

<a id="0x1_smart_table_upsert"></a>

## Function `upsert`

Insert the pair (`key`, `value`) if there is no entry for `key`.
update the value of the entry for `key` to `value` otherwise

```move
module 0x1::smart_table {
    public fun upsert<K: copy, drop, V: drop>(table: &mut smart_table::SmartTable<K, V>, key: K, value: V)
}
```

<a id="0x1_smart_table_length"></a>

## Function `length`

Returns the length of the table, i.e. the number of entries.

```move
module 0x1::smart_table {
    public fun length<K, V>(table: &smart_table::SmartTable<K, V>): u64
}
```

<a id="0x1_smart_table_load_factor"></a>

## Function `load_factor`

Return the load factor of the hashtable.

```move
module 0x1::smart_table {
    public fun load_factor<K, V>(table: &smart_table::SmartTable<K, V>): u64
}
```

<a id="0x1_smart_table_update_split_load_threshold"></a>

## Function `update_split_load_threshold`

Update `split_load_threshold`.

```move
module 0x1::smart_table {
    public fun update_split_load_threshold<K, V>(table: &mut smart_table::SmartTable<K, V>, split_load_threshold: u8)
}
```

<a id="0x1_smart_table_update_target_bucket_size"></a>

## Function `update_target_bucket_size`

Update `target_bucket_size`.

```move
module 0x1::smart_table {
    public fun update_target_bucket_size<K, V>(table: &mut smart_table::SmartTable<K, V>, target_bucket_size: u64)
}
```

<a id="0x1_smart_table_for_each_ref"></a>

## Function `for_each_ref`

Apply the function to a reference of each key&#45;value pair in the table.

```move
module 0x1::smart_table {
    public fun for_each_ref<K, V>(table: &smart_table::SmartTable<K, V>, f: |(&K, &V)|)
}
```

<a id="0x1_smart_table_for_each_mut"></a>

## Function `for_each_mut`

Apply the function to a mutable reference of each key&#45;value pair in the table.

```move
module 0x1::smart_table {
    public fun for_each_mut<K, V>(table: &mut smart_table::SmartTable<K, V>, f: |(&K, &mut V)|)
}
```

<a id="0x1_smart_table_map_ref"></a>

## Function `map_ref`

Map the function over the references of key&#45;value pairs in the table without modifying it.

```move
module 0x1::smart_table {
    public fun map_ref<K: copy, drop, store, V1, V2: store>(table: &smart_table::SmartTable<K, V1>, f: |&V1|V2): smart_table::SmartTable<K, V2>
}
```

<a id="0x1_smart_table_any"></a>

## Function `any`

Return true if any key&#45;value pair in the table satisfies the predicate.

```move
module 0x1::smart_table {
    public fun any<K, V>(table: &smart_table::SmartTable<K, V>, p: |(&K, &V)|bool): bool
}
```

<a id="0x1_smart_table_borrow_kv"></a>

## Function `borrow_kv`

```move
module 0x1::smart_table {
    public fun borrow_kv<K, V>(e: &smart_table::Entry<K, V>): (&K, &V)
}
```

<a id="0x1_smart_table_borrow_kv_mut"></a>

## Function `borrow_kv_mut`

```move
module 0x1::smart_table {
    public fun borrow_kv_mut<K, V>(e: &mut smart_table::Entry<K, V>): (&mut K, &mut V)
}
```

<a id="0x1_smart_table_num_buckets"></a>

## Function `num_buckets`

```move
module 0x1::smart_table {
    public fun num_buckets<K, V>(table: &smart_table::SmartTable<K, V>): u64
}
```

<a id="0x1_smart_table_borrow_buckets"></a>

## Function `borrow_buckets`

```move
module 0x1::smart_table {
    public fun borrow_buckets<K, V>(table: &smart_table::SmartTable<K, V>): &table_with_length::TableWithLength<u64, vector<smart_table::Entry<K, V>>>
}
```

<a id="0x1_smart_table_borrow_buckets_mut"></a>

## Function `borrow_buckets_mut`

```move
module 0x1::smart_table {
    public fun borrow_buckets_mut<K, V>(table: &mut smart_table::SmartTable<K, V>): &mut table_with_length::TableWithLength<u64, vector<smart_table::Entry<K, V>>>
}
```
