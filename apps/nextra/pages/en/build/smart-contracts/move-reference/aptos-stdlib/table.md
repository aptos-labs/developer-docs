<a id="0x1_table"></a>

# Module `0x1::table`

Type of large&#45;scale storage tables.
source: https://github.com/move&#45;language/move/blob/1b6b7513dcc1a5c866f178ca5c1e74beb2ce181e/language/extensions/move&#45;table&#45;extension/sources/Table.move#L1

It implements the Table type which supports individual table items to be represented by
separate global state items. The number of items and a unique handle are tracked on the table
struct itself, while the operations are implemented as native functions. No traversal is provided.

- [Struct `Table`](#0x1_table_Table)
- [Resource `Box`](#0x1_table_Box)
- [Function `new`](#0x1_table_new)
- [Function `add`](#0x1_table_add)
- [Function `borrow`](#0x1_table_borrow)
- [Function `borrow_with_default`](#0x1_table_borrow_with_default)
- [Function `borrow_mut`](#0x1_table_borrow_mut)
- [Function `borrow_mut_with_default`](#0x1_table_borrow_mut_with_default)
- [Function `upsert`](#0x1_table_upsert)
- [Function `remove`](#0x1_table_remove)
- [Function `contains`](#0x1_table_contains)
- [Function `destroy`](#0x1_table_destroy)

```move
module 0x1::table {
}
```

<a id="0x1_table_Table"></a>

## Struct `Table`

Type of tables

```move
module 0x1::table {
    struct Table<K: copy, drop, V> has store
}
```

<a id="0x1_table_Box"></a>

## Resource `Box`

Wrapper for values. Required for making values appear as resources in the implementation.

```move
module 0x1::table {
    struct Box<V> has drop, store, key
}
```

<a id="0x1_table_new"></a>

## Function `new`

Create a new Table.

```move
module 0x1::table {
    public fun new<K: copy, drop, V: store>(): table::Table<K, V>
}
```

<a id="0x1_table_add"></a>

## Function `add`

Add a new entry to the table. Aborts if an entry for this
key already exists. The entry itself is not stored in the
table, and cannot be discovered from it.

```move
module 0x1::table {
    public fun add<K: copy, drop, V>(table: &mut table::Table<K, V>, key: K, val: V)
}
```

<a id="0x1_table_borrow"></a>

## Function `borrow`

Acquire an immutable reference to the value which `key` maps to.
Aborts if there is no entry for `key`.

```move
module 0x1::table {
    public fun borrow<K: copy, drop, V>(table: &table::Table<K, V>, key: K): &V
}
```

<a id="0x1_table_borrow_with_default"></a>

## Function `borrow_with_default`

Acquire an immutable reference to the value which `key` maps to.
Returns specified default value if there is no entry for `key`.

```move
module 0x1::table {
    public fun borrow_with_default<K: copy, drop, V>(table: &table::Table<K, V>, key: K, default: &V): &V
}
```

<a id="0x1_table_borrow_mut"></a>

## Function `borrow_mut`

Acquire a mutable reference to the value which `key` maps to.
Aborts if there is no entry for `key`.

```move
module 0x1::table {
    public fun borrow_mut<K: copy, drop, V>(table: &mut table::Table<K, V>, key: K): &mut V
}
```

<a id="0x1_table_borrow_mut_with_default"></a>

## Function `borrow_mut_with_default`

Acquire a mutable reference to the value which `key` maps to.
Insert the pair (`key`, `default`) first if there is no entry for `key`.

```move
module 0x1::table {
    public fun borrow_mut_with_default<K: copy, drop, V: drop>(table: &mut table::Table<K, V>, key: K, default: V): &mut V
}
```

<a id="0x1_table_upsert"></a>

## Function `upsert`

Insert the pair (`key`, `value`) if there is no entry for `key`.
update the value of the entry for `key` to `value` otherwise

```move
module 0x1::table {
    public fun upsert<K: copy, drop, V: drop>(table: &mut table::Table<K, V>, key: K, value: V)
}
```

<a id="0x1_table_remove"></a>

## Function `remove`

Remove from `table` and return the value which `key` maps to.
Aborts if there is no entry for `key`.

```move
module 0x1::table {
    public fun remove<K: copy, drop, V>(table: &mut table::Table<K, V>, key: K): V
}
```

<a id="0x1_table_contains"></a>

## Function `contains`

Returns true iff `table` contains an entry for `key`.

```move
module 0x1::table {
    public fun contains<K: copy, drop, V>(table: &table::Table<K, V>, key: K): bool
}
```

<a id="0x1_table_destroy"></a>

## Function `destroy`

```move
module 0x1::table {
    public(friend) fun destroy<K: copy, drop, V>(table: table::Table<K, V>)
}
```
