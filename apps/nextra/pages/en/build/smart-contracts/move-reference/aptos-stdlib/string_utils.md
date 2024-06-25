<a id="0x1_string_utils"></a>

# Module `0x1::string_utils`

A module for formatting move values as strings.

- [Struct `Cons`](#0x1_string_utils_Cons)
- [Struct `NIL`](#0x1_string_utils_NIL)
- [Struct `FakeCons`](#0x1_string_utils_FakeCons)
  - [[test_only]](#@[test_only]\_0)
- [Constants](#@Constants_1)
- [Function `to_string`](#0x1_string_utils_to_string)
- [Function `to_string_with_canonical_addresses`](#0x1_string_utils_to_string_with_canonical_addresses)
- [Function `to_string_with_integer_types`](#0x1_string_utils_to_string_with_integer_types)
- [Function `debug_string`](#0x1_string_utils_debug_string)
- [Function `format1`](#0x1_string_utils_format1)
- [Function `format2`](#0x1_string_utils_format2)
- [Function `format3`](#0x1_string_utils_format3)
- [Function `format4`](#0x1_string_utils_format4)

```move
module 0x1::string_utils {
    use 0x1::string;
}
```

<a id="0x1_string_utils_Cons"></a>

## Struct `Cons`

```move
module 0x1::string_utils {
    struct Cons<T, N> has copy, drop, store
}
```

<a id="0x1_string_utils_NIL"></a>

## Struct `NIL`

```move
module 0x1::string_utils {
    struct NIL has copy, drop, store
}
```

<a id="0x1_string_utils_FakeCons"></a>

## Struct `FakeCons`

<a id="@[test_only]_0"></a>

### [test_only]

```move
module 0x1::string_utils {
    struct FakeCons<T, N> has copy, drop, store
}
```

<a id="@Constants_1"></a>

## Constants

<a id="0x1_string_utils_EARGS_MISMATCH"></a>

The number of values in the list does not match the number of &quot;&#123;&#125;&quot; in the format string.

```move
module 0x1::string_utils {
    const EARGS_MISMATCH: u64 = 1;
}
```

<a id="0x1_string_utils_EINVALID_FORMAT"></a>

The format string is not valid.

```move
module 0x1::string_utils {
    const EINVALID_FORMAT: u64 = 2;
}
```

<a id="0x1_string_utils_EUNABLE_TO_FORMAT_DELAYED_FIELD"></a>

Formatting is not possible because the value contains delayed fields such as aggregators.

```move
module 0x1::string_utils {
    const EUNABLE_TO_FORMAT_DELAYED_FIELD: u64 = 3;
}
```

<a id="0x1_string_utils_to_string"></a>

## Function `to_string`

Format a move value as a human readable string,
eg. `to_string(&1u64) == "1"`, `to_string(&false) == "false"`, `to_string(&@0x1) == "@0x1"`.
For vectors and structs the format is similar to rust, eg.
`to_string(&cons(1,2)) == "Cons { car: 1, cdr: 2 }"` and `to_string(&vector[1, 2, 3]) == "[ 1, 2, 3 ]"`
For vectors of u8 the output is hex encoded, eg. `to_string(&vector[1u8, 2u8, 3u8]) == "0x010203"`
For std::string::String the output is the string itself including quotes, eg.
`to_string(&std::string::utf8(b"My string")) == "\"My string\""`

```move
module 0x1::string_utils {
    public fun to_string<T>(s: &T): string::String
}
```

<a id="0x1_string_utils_to_string_with_canonical_addresses"></a>

## Function `to_string_with_canonical_addresses`

Format addresses as 64 zero&#45;padded hexadecimals.

```move
module 0x1::string_utils {
    public fun to_string_with_canonical_addresses<T>(s: &T): string::String
}
```

<a id="0x1_string_utils_to_string_with_integer_types"></a>

## Function `to_string_with_integer_types`

Format emitting integers with types ie. 6u8 or 128u32.

```move
module 0x1::string_utils {
    public fun to_string_with_integer_types<T>(s: &T): string::String
}
```

<a id="0x1_string_utils_debug_string"></a>

## Function `debug_string`

Format vectors and structs with newlines and indentation.

```move
module 0x1::string_utils {
    public fun debug_string<T>(s: &T): string::String
}
```

<a id="0x1_string_utils_format1"></a>

## Function `format1`

Formatting with a rust&#45;like format string, eg. `format2(&b"a = {}, b = {}", 1, 2) == "a = 1, b = 2"`.

```move
module 0x1::string_utils {
    public fun format1<T0: drop>(fmt: &vector<u8>, a: T0): string::String
}
```

<a id="0x1_string_utils_format2"></a>

## Function `format2`

```move
module 0x1::string_utils {
    public fun format2<T0: drop, T1: drop>(fmt: &vector<u8>, a: T0, b: T1): string::String
}
```

<a id="0x1_string_utils_format3"></a>

## Function `format3`

```move
module 0x1::string_utils {
    public fun format3<T0: drop, T1: drop, T2: drop>(fmt: &vector<u8>, a: T0, b: T1, c: T2): string::String
}
```

<a id="0x1_string_utils_format4"></a>

## Function `format4`

```move
module 0x1::string_utils {
    public fun format4<T0: drop, T1: drop, T2: drop, T3: drop>(fmt: &vector<u8>, a: T0, b: T1, c: T2, d: T3): string::String
}
```
