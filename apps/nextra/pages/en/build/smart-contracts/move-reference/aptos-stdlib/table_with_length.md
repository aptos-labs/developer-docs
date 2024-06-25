<a id="0x1_table_with_length"></a>

# Module `0x1::table_with_length`

Extends Table and provides functions such as length and the ability to be destroyed

- [Struct `TableWithLength`](#0x1_table_with_length_TableWithLength)
- [Constants](#@Constants_0)
- [Function `new`](#0x1_table_with_length_new)
- [Function `destroy_empty`](#0x1_table_with_length_destroy_empty)
- [Function `add`](#0x1_table_with_length_add)
- [Function `borrow`](#0x1_table_with_length_borrow)
- [Function `borrow_mut`](#0x1_table_with_length_borrow_mut)
- [Function `length`](#0x1_table_with_length_length)
- [Function `empty`](#0x1_table_with_length_empty)
- [Function `borrow_mut_with_default`](#0x1_table_with_length_borrow_mut_with_default)
- [Function `upsert`](#0x1_table_with_length_upsert)
- [Function `remove`](#0x1_table_with_length_remove)
- [Function `contains`](#0x1_table_with_length_contains)

```move
module 0x1::table_with_length {
    use 0x1::error;
    use 0x1::table;
}
```

<a id="0x1_table_with_length_TableWithLength"></a>

## Struct `TableWithLength`

Type of tables

```move
module 0x1::table_with_length {
    struct TableWithLength<K: copy, drop, V> has store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_table_with_length_EALREADY_EXISTS"></a>

```move
module 0x1::table_with_length {
    const EALREADY_EXISTS: u64 = 100;
}
```

<a id="0x1_table_with_length_ENOT_EMPTY"></a>

```move
module 0x1::table_with_length {
    const ENOT_EMPTY: u64 = 102;
}
```

<a id="0x1_table_with_length_ENOT_FOUND"></a>

```move
module 0x1::table_with_length {
    const ENOT_FOUND: u64 = 101;
}
```

<a id="0x1_table_with_length_new"></a>

## Function `new`

Create a new Table.

```move
module 0x1::table_with_length {
    public fun new<K: copy, drop, V: store>(): table_with_length::TableWithLength<K, V>
}
```

<a id="0x1_table_with_length_destroy_empty"></a>

## Function `destroy_empty`

Destroy a table. The table must be empty to succeed.

```move
module 0x1::table_with_length {
    public fun destroy_empty<K: copy, drop, V>(table: table_with_length::TableWithLength<K, V>)
}
```

<a id="0x1_table_with_length_add"></a>

## Function `add`

Add a new entry to the table. Aborts if an entry for this
key already exists. The entry itself is not stored in the
table, and cannot be discovered from it.

```move
module 0x1::table_with_length {
    public fun add<K: copy, drop, V>(table: &mut table_with_length::TableWithLength<K, V>, key: K, val: V)
}
```

<a id="0x1_table_with_length_borrow"></a>

## Function `borrow`

Acquire an immutable reference to the value which `key` maps to.
Aborts if there is no entry for `key`.

```move
module 0x1::table_with_length {
    public fun borrow<K: copy, drop, V>(table: &table_with_length::TableWithLength<K, V>, key: K): &V
}
```

<a id="0x1_table_with_length_borrow_mut"></a>

## Function `borrow_mut`

Acquire a mutable reference to the value which `key` maps to.
Aborts if there is no entry for `key`.

```move
module 0x1::table_with_length {
    public fun borrow_mut<K: copy, drop, V>(table: &mut table_with_length::TableWithLength<K, V>, key: K): &mut V
}
```

<a id="0x1_table_with_length_length"></a>

## Function `length`

Returns the length of the table, i.e. the number of entries.

```move
module 0x1::table_with_length {
    public fun length<K: copy, drop, V>(table: &table_with_length::TableWithLength<K, V>): u64
}
```

<a id="0x1_table_with_length_empty"></a>

## Function `empty`

Returns true if this table is empty.

```move
module 0x1::table_with_length {
    public fun empty<K: copy, drop, V>(table: &table_with_length::TableWithLength<K, V>): bool
}
```

<a id="0x1_table_with_length_borrow_mut_with_default"></a>

## Function `borrow_mut_with_default`

Acquire a mutable reference to the value which `key` maps to.
Insert the pair (`key`, `default`) first if there is no entry for `key`.

```move
module 0x1::table_with_length {
    public fun borrow_mut_with_default<K: copy, drop, V: drop>(table: &mut table_with_length::TableWithLength<K, V>, key: K, default: V): &mut V
}
```

<a id="0x1_table_with_length_upsert"></a>

## Function `upsert`

Insert the pair (`key`, `value`) if there is no entry for `key`.
update the value of the entry for `key` to `value` otherwise

```move
module 0x1::table_with_length {
    public fun upsert<K: copy, drop, V: drop>(table: &mut table_with_length::TableWithLength<K, V>, key: K, value: V)
}
```

<a id="0x1_table_with_length_remove"></a>

## Function `remove`

Remove from `table` and return the value which `key` maps to.
Aborts if there is no entry for `key`.

```move
module 0x1::table_with_length {
    public fun remove<K: copy, drop, V>(table: &mut table_with_length::TableWithLength<K, V>, key: K): V
}
```

<a id="0x1_table_with_length_contains"></a>

## Function `contains`

Returns true iff `table` contains an entry for `key`.

```move
module 0x1::table_with_length {
    public fun contains<K: copy, drop, V>(table: &table_with_length::TableWithLength<K, V>, key: K): bool
}
```
