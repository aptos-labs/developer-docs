<a id="0x1_any"></a>

# Module `0x1::any`

- [Struct `Any`](#0x1_any_Any)
- [Constants](#@Constants_0)
- [Function `pack`](#0x1_any_pack)
- [Function `unpack`](#0x1_any_unpack)
- [Function `type_name`](#0x1_any_type_name)

```move
module 0x1::any {
    use 0x1::bcs;
    use 0x1::error;
    use 0x1::from_bcs;
    use 0x1::string;
    use 0x1::type_info;
}
```

<a id="0x1_any_Any"></a>

## Struct `Any`

A type which can represent a value of any type. This allows for representation of &apos;unknown&apos; future
values. For example, to define a resource such that it can be later be extended without breaking
changes one can do

```move
struct Resource &#123;
field: Type,
...
extension: Option&lt;Any&gt;
&#125;
```

```move
module 0x1::any {
    struct Any has drop, store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_any_ETYPE_MISMATCH"></a>

The type provided for `unpack` is not the same as was given for `pack`.

```move
module 0x1::any {
    const ETYPE_MISMATCH: u64 = 1;
}
```

<a id="0x1_any_pack"></a>

## Function `pack`

Pack a value into the `Any` representation. Because Any can be stored and dropped, this is
also required from `T`.

```move
module 0x1::any {
    public fun pack<T: drop, store>(x: T): any::Any
}
```

<a id="0x1_any_unpack"></a>

## Function `unpack`

Unpack a value from the `Any` representation. This aborts if the value has not the expected type `T`.

```move
module 0x1::any {
    public fun unpack<T>(x: any::Any): T
}
```

<a id="0x1_any_type_name"></a>

## Function `type_name`

Returns the type name of this Any

```move
module 0x1::any {
    public fun type_name(x: &any::Any): &string::String
}
```
