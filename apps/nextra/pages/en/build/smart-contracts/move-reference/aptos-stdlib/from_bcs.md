<a id="0x1_from_bcs"></a>

# Module `0x1::from_bcs`

This module provides a number of functions to convert _primitive_ types from their representation in `std::bcs`
to values. This is the opposite of `bcs::to_bytes`. Note that it is not safe to define a generic public `from_bytes`
function because this can violate implicit struct invariants, therefore only primitive types are offerred. If
a general conversion back&#45;and&#45;force is needed, consider the `aptos_std::Any` type which preserves invariants.

Example:

```
use std::bcs;
use aptos_std::from_bcs;

assert!(from_bcs::to_address(bcs::to_bytes(&amp;@0xabcdef)) &#61;&#61; @0xabcdef, 0);
```

- [Constants](#@Constants_0)
- [Function `to_bool`](#0x1_from_bcs_to_bool)
- [Function `to_u8`](#0x1_from_bcs_to_u8)
- [Function `to_u16`](#0x1_from_bcs_to_u16)
- [Function `to_u32`](#0x1_from_bcs_to_u32)
- [Function `to_u64`](#0x1_from_bcs_to_u64)
- [Function `to_u128`](#0x1_from_bcs_to_u128)
- [Function `to_u256`](#0x1_from_bcs_to_u256)
- [Function `to_address`](#0x1_from_bcs_to_address)
- [Function `to_bytes`](#0x1_from_bcs_to_bytes)
- [Function `to_string`](#0x1_from_bcs_to_string)
- [Function `from_bytes`](#0x1_from_bcs_from_bytes)

```move
module 0x1::from_bcs {
    use 0x1::string;
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_from_bcs_EINVALID_UTF8"></a>

UTF8 check failed in conversion from bytes to string

```move
module 0x1::from_bcs {
    const EINVALID_UTF8: u64 = 1;
}
```

<a id="0x1_from_bcs_to_bool"></a>

## Function `to_bool`

```move
module 0x1::from_bcs {
    public fun to_bool(v: vector<u8>): bool
}
```

<a id="0x1_from_bcs_to_u8"></a>

## Function `to_u8`

```move
module 0x1::from_bcs {
    public fun to_u8(v: vector<u8>): u8
}
```

<a id="0x1_from_bcs_to_u16"></a>

## Function `to_u16`

```move
module 0x1::from_bcs {
    public fun to_u16(v: vector<u8>): u16
}
```

<a id="0x1_from_bcs_to_u32"></a>

## Function `to_u32`

```move
module 0x1::from_bcs {
    public fun to_u32(v: vector<u8>): u32
}
```

<a id="0x1_from_bcs_to_u64"></a>

## Function `to_u64`

```move
module 0x1::from_bcs {
    public fun to_u64(v: vector<u8>): u64
}
```

<a id="0x1_from_bcs_to_u128"></a>

## Function `to_u128`

```move
module 0x1::from_bcs {
    public fun to_u128(v: vector<u8>): u128
}
```

<a id="0x1_from_bcs_to_u256"></a>

## Function `to_u256`

```move
module 0x1::from_bcs {
    public fun to_u256(v: vector<u8>): u256
}
```

<a id="0x1_from_bcs_to_address"></a>

## Function `to_address`

```move
module 0x1::from_bcs {
    public fun to_address(v: vector<u8>): address
}
```

<a id="0x1_from_bcs_to_bytes"></a>

## Function `to_bytes`

```move
module 0x1::from_bcs {
    public fun to_bytes(v: vector<u8>): vector<u8>
}
```

<a id="0x1_from_bcs_to_string"></a>

## Function `to_string`

```move
module 0x1::from_bcs {
    public fun to_string(v: vector<u8>): string::String
}
```

<a id="0x1_from_bcs_from_bytes"></a>

## Function `from_bytes`

Package private native function to deserialize a type T.

Note that this function does not put any constraint on `T`. If code uses this function to
deserialize a linear value, its their responsibility that the data they deserialize is
owned.

```move
module 0x1::from_bcs {
    public(friend) fun from_bytes<T>(bytes: vector<u8>): T
}
```
