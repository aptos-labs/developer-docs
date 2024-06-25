<a id="0x1_string"></a>

# Module `0x1::string`

The `string` module defines the `String` type which represents UTF8 encoded strings.

- [Struct `String`](#0x1_string_String)
- [Constants](#@Constants_0)
- [Function `utf8`](#0x1_string_utf8)
- [Function `try_utf8`](#0x1_string_try_utf8)
- [Function `bytes`](#0x1_string_bytes)
- [Function `is_empty`](#0x1_string_is_empty)
- [Function `length`](#0x1_string_length)
- [Function `append`](#0x1_string_append)
- [Function `append_utf8`](#0x1_string_append_utf8)
- [Function `insert`](#0x1_string_insert)
- [Function `sub_string`](#0x1_string_sub_string)
- [Function `index_of`](#0x1_string_index_of)
- [Function `internal_check_utf8`](#0x1_string_internal_check_utf8)

```move
module 0x1::string {
    use 0x1::option;
    use 0x1::vector;
}
```

<a id="0x1_string_String"></a>

## Struct `String`

A `String` holds a sequence of bytes which is guaranteed to be in utf8 format.

```move
module 0x1::string {
    struct String has copy, drop, store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_string_EINVALID_INDEX"></a>

Index out of range.

```move
module 0x1::string {
    const EINVALID_INDEX: u64 = 2;
}
```

<a id="0x1_string_EINVALID_UTF8"></a>

An invalid UTF8 encoding.

```move
module 0x1::string {
    const EINVALID_UTF8: u64 = 1;
}
```

<a id="0x1_string_utf8"></a>

## Function `utf8`

Creates a new string from a sequence of bytes. Aborts if the bytes do not represent valid utf8.

```move
module 0x1::string {
    public fun utf8(bytes: vector<u8>): string::String
}
```

<a id="0x1_string_try_utf8"></a>

## Function `try_utf8`

Tries to create a new string from a sequence of bytes.

```move
module 0x1::string {
    public fun try_utf8(bytes: vector<u8>): option::Option<string::String>
}
```

<a id="0x1_string_bytes"></a>

## Function `bytes`

Returns a reference to the underlying byte vector.

```move
module 0x1::string {
    public fun bytes(s: &string::String): &vector<u8>
}
```

<a id="0x1_string_is_empty"></a>

## Function `is_empty`

Checks whether this string is empty.

```move
module 0x1::string {
    public fun is_empty(s: &string::String): bool
}
```

<a id="0x1_string_length"></a>

## Function `length`

Returns the length of this string, in bytes.

```move
module 0x1::string {
    public fun length(s: &string::String): u64
}
```

<a id="0x1_string_append"></a>

## Function `append`

Appends a string.

```move
module 0x1::string {
    public fun append(s: &mut string::String, r: string::String)
}
```

<a id="0x1_string_append_utf8"></a>

## Function `append_utf8`

Appends bytes which must be in valid utf8 format.

```move
module 0x1::string {
    public fun append_utf8(s: &mut string::String, bytes: vector<u8>)
}
```

<a id="0x1_string_insert"></a>

## Function `insert`

Insert the other string at the byte index in given string. The index must be at a valid utf8 char
boundary.

```move
module 0x1::string {
    public fun insert(s: &mut string::String, at: u64, o: string::String)
}
```

<a id="0x1_string_sub_string"></a>

## Function `sub_string`

Returns a sub&#45;string using the given byte indices, where `i` is the first byte position and `j` is the start
of the first byte not included (or the length of the string). The indices must be at valid utf8 char boundaries,
guaranteeing that the result is valid utf8.

```move
module 0x1::string {
    public fun sub_string(s: &string::String, i: u64, j: u64): string::String
}
```

<a id="0x1_string_index_of"></a>

## Function `index_of`

Computes the index of the first occurrence of a string. Returns `length(s)` if no occurrence found.

```move
module 0x1::string {
    public fun index_of(s: &string::String, r: &string::String): u64
}
```

<a id="0x1_string_internal_check_utf8"></a>

## Function `internal_check_utf8`

```move
module 0x1::string {
    public fun internal_check_utf8(v: &vector<u8>): bool
}
```
