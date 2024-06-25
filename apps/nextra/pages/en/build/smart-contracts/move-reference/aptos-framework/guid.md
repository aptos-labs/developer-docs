<a id="0x1_guid"></a>

# Module `0x1::guid`

A module for generating globally unique identifiers

- [Struct `GUID`](#0x1_guid_GUID)
- [Struct `ID`](#0x1_guid_ID)
- [Constants](#@Constants_0)
- [Function `create`](#0x1_guid_create)
- [Function `create_id`](#0x1_guid_create_id)
- [Function `id`](#0x1_guid_id)
- [Function `creator_address`](#0x1_guid_creator_address)
- [Function `id_creator_address`](#0x1_guid_id_creator_address)
- [Function `creation_num`](#0x1_guid_creation_num)
- [Function `id_creation_num`](#0x1_guid_id_creation_num)
- [Function `eq_id`](#0x1_guid_eq_id)

```move
module 0x1::guid {
}
```

<a id="0x1_guid_GUID"></a>

## Struct `GUID`

A globally unique identifier derived from the sender&apos;s address and a counter

```move
module 0x1::guid {
    struct GUID has drop, store
}
```

<a id="0x1_guid_ID"></a>

## Struct `ID`

A non&#45;privileged identifier that can be freely created by anyone. Useful for looking up GUID&apos;s.

```move
module 0x1::guid {
    struct ID has copy, drop, store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_guid_EGUID_GENERATOR_NOT_PUBLISHED"></a>

GUID generator must be published ahead of first usage of `create_with_capability` function.

```move
module 0x1::guid {
    const EGUID_GENERATOR_NOT_PUBLISHED: u64 = 0;
}
```

<a id="0x1_guid_create"></a>

## Function `create`

Create and return a new GUID from a trusted module.

```move
module 0x1::guid {
    public(friend) fun create(addr: address, creation_num_ref: &mut u64): guid::GUID
}
```

<a id="0x1_guid_create_id"></a>

## Function `create_id`

Create a non&#45;privileged id from `addr` and `creation_num`

```move
module 0x1::guid {
    public fun create_id(addr: address, creation_num: u64): guid::ID
}
```

<a id="0x1_guid_id"></a>

## Function `id`

Get the non&#45;privileged ID associated with a GUID

```move
module 0x1::guid {
    public fun id(guid: &guid::GUID): guid::ID
}
```

<a id="0x1_guid_creator_address"></a>

## Function `creator_address`

Return the account address that created the GUID

```move
module 0x1::guid {
    public fun creator_address(guid: &guid::GUID): address
}
```

<a id="0x1_guid_id_creator_address"></a>

## Function `id_creator_address`

Return the account address that created the guid::ID

```move
module 0x1::guid {
    public fun id_creator_address(id: &guid::ID): address
}
```

<a id="0x1_guid_creation_num"></a>

## Function `creation_num`

Return the creation number associated with the GUID

```move
module 0x1::guid {
    public fun creation_num(guid: &guid::GUID): u64
}
```

<a id="0x1_guid_id_creation_num"></a>

## Function `id_creation_num`

Return the creation number associated with the guid::ID

```move
module 0x1::guid {
    public fun id_creation_num(id: &guid::ID): u64
}
```

<a id="0x1_guid_eq_id"></a>

## Function `eq_id`

Return true if the GUID&apos;s ID is `id`

```move
module 0x1::guid {
    public fun eq_id(guid: &guid::GUID, id: &guid::ID): bool
}
```
