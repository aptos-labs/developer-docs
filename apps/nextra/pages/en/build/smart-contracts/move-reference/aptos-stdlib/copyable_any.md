<a id="0x1_copyable_any"></a>

# Module `0x1::copyable_any`

- [Struct `Any`](#0x1_copyable_any_Any)
- [Constants](#@Constants_0)
- [Function `pack`](#0x1_copyable_any_pack)
- [Function `unpack`](#0x1_copyable_any_unpack)
- [Function `type_name`](#0x1_copyable_any_type_name)

```move
module 0x1::copyable_any {
    use 0x1::bcs;
    use 0x1::error;
    use 0x1::from_bcs;
    use 0x1::string;
    use 0x1::type_info;
}
```

<a id="0x1_copyable_any_Any"></a>

## Struct `Any`

The same as `any::Any` but with the copy ability.

```move
module 0x1::copyable_any {
    struct Any has copy, drop, store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_copyable_any_ETYPE_MISMATCH"></a>

The type provided for `unpack` is not the same as was given for `pack`.

```move
module 0x1::copyable_any {
    const ETYPE_MISMATCH: u64 = 0;
}
```

<a id="0x1_copyable_any_pack"></a>

## Function `pack`

Pack a value into the `Any` representation. Because Any can be stored, dropped, and copied this is
also required from `T`.

```move
module 0x1::copyable_any {
    public fun pack<T: copy, drop, store>(x: T): copyable_any::Any
}
```

<a id="0x1_copyable_any_unpack"></a>

## Function `unpack`

Unpack a value from the `Any` representation. This aborts if the value has not the expected type `T`.

```move
module 0x1::copyable_any {
    public fun unpack<T>(x: copyable_any::Any): T
}
```

<a id="0x1_copyable_any_type_name"></a>

## Function `type_name`

Returns the type name of this Any

```move
module 0x1::copyable_any {
    public fun type_name(x: &copyable_any::Any): &string::String
}
```
