<a id="0x4_royalty"></a>

# Module `0x4::royalty`

This defines an object&#45;based Royalty. The royalty can be applied to either a collection or a
token. Applications should read the royalty from the token, as it will read the appropriate
royalty.

- [Resource `Royalty`](#0x4_royalty_Royalty)
- [Struct `MutatorRef`](#0x4_royalty_MutatorRef)
- [Constants](#@Constants_0)
- [Function `init`](#0x4_royalty_init)
- [Function `update`](#0x4_royalty_update)
- [Function `create`](#0x4_royalty_create)
- [Function `generate_mutator_ref`](#0x4_royalty_generate_mutator_ref)
- [Function `exists_at`](#0x4_royalty_exists_at)
- [Function `delete`](#0x4_royalty_delete)
- [Function `get`](#0x4_royalty_get)
- [Function `denominator`](#0x4_royalty_denominator)
- [Function `numerator`](#0x4_royalty_numerator)
- [Function `payee_address`](#0x4_royalty_payee_address)

```move
module 0x4::royalty {
    use 0x1::error;
    use 0x1::object;
    use 0x1::option;
}
```

<a id="0x4_royalty_Royalty"></a>

## Resource `Royalty`

The royalty of a token within this collection

Royalties are optional for a collection. Royalty percentage is calculated
by (numerator / denominator) \* 100%

```move
module 0x4::royalty {
    #[resource_group_member(#[group = 0x1::object::ObjectGroup])]
    struct Royalty has copy, drop, key
}
```

<a id="0x4_royalty_MutatorRef"></a>

## Struct `MutatorRef`

This enables creating or overwriting a `MutatorRef`.

```move
module 0x4::royalty {
    struct MutatorRef has drop, store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x4_royalty_EROYALTY_DENOMINATOR_IS_ZERO"></a>

The royalty denominator cannot be 0

```move
module 0x4::royalty {
    const EROYALTY_DENOMINATOR_IS_ZERO: u64 = 3;
}
```

<a id="0x4_royalty_EROYALTY_DOES_NOT_EXIST"></a>

Royalty does not exist

```move
module 0x4::royalty {
    const EROYALTY_DOES_NOT_EXIST: u64 = 1;
}
```

<a id="0x4_royalty_EROYALTY_EXCEEDS_MAXIMUM"></a>

The royalty cannot be greater than 100%

```move
module 0x4::royalty {
    const EROYALTY_EXCEEDS_MAXIMUM: u64 = 2;
}
```

<a id="0x4_royalty_init"></a>

## Function `init`

Add a royalty, given a ConstructorRef.

```move
module 0x4::royalty {
    public fun init(ref: &object::ConstructorRef, royalty: royalty::Royalty)
}
```

<a id="0x4_royalty_update"></a>

## Function `update`

Set the royalty if it does not exist, replace it otherwise.

```move
module 0x4::royalty {
    public fun update(mutator_ref: &royalty::MutatorRef, royalty: royalty::Royalty)
}
```

<a id="0x4_royalty_create"></a>

## Function `create`

Creates a new royalty, verifying that it is a valid percentage

```move
module 0x4::royalty {
    public fun create(numerator: u64, denominator: u64, payee_address: address): royalty::Royalty
}
```

<a id="0x4_royalty_generate_mutator_ref"></a>

## Function `generate_mutator_ref`

```move
module 0x4::royalty {
    public fun generate_mutator_ref(ref: object::ExtendRef): royalty::MutatorRef
}
```

<a id="0x4_royalty_exists_at"></a>

## Function `exists_at`

```move
module 0x4::royalty {
    public fun exists_at(addr: address): bool
}
```

<a id="0x4_royalty_delete"></a>

## Function `delete`

```move
module 0x4::royalty {
    public(friend) fun delete(addr: address)
}
```

<a id="0x4_royalty_get"></a>

## Function `get`

```move
module 0x4::royalty {
    public fun get<T: key>(maybe_royalty: object::Object<T>): option::Option<royalty::Royalty>
}
```

<a id="0x4_royalty_denominator"></a>

## Function `denominator`

```move
module 0x4::royalty {
    public fun denominator(royalty: &royalty::Royalty): u64
}
```

<a id="0x4_royalty_numerator"></a>

## Function `numerator`

```move
module 0x4::royalty {
    public fun numerator(royalty: &royalty::Royalty): u64
}
```

<a id="0x4_royalty_payee_address"></a>

## Function `payee_address`

```move
module 0x4::royalty {
    public fun payee_address(royalty: &royalty::Royalty): address
}
```
