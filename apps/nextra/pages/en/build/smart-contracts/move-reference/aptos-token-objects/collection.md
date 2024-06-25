<a id="0x4_collection"></a>

# Module `0x4::collection`

This defines an object&#45;based Collection. A collection acts as a set organizer for a group of
tokens. This includes aspects such as a general description, project URI, name, and may contain
other useful generalizations across this set of tokens.

Being built upon objects enables collections to be relatively flexible. As core primitives it
supports: \* Common fields: name, uri, description, creator \* MutatorRef leaving mutability configuration to a higher level component \* Addressed by a global identifier of creator&apos;s address and collection name, thus collections
cannot be deleted as a restriction of the object model. \* Optional support for collection&#45;wide royalties \* Optional support for tracking of supply with events on mint or burn

TODO: \* Consider supporting changing the name of the collection with the MutatorRef. This would
require adding the field original_name. \* Consider supporting changing the aspects of supply with the MutatorRef. \* Add aggregator support when added to framework

- [Resource `Collection`](#0x4_collection_Collection)
- [Struct `MutatorRef`](#0x4_collection_MutatorRef)
- [Struct `MutationEvent`](#0x4_collection_MutationEvent)
- [Struct `Mutation`](#0x4_collection_Mutation)
- [Resource `FixedSupply`](#0x4_collection_FixedSupply)
- [Resource `UnlimitedSupply`](#0x4_collection_UnlimitedSupply)
- [Resource `ConcurrentSupply`](#0x4_collection_ConcurrentSupply)
- [Struct `BurnEvent`](#0x4_collection_BurnEvent)
- [Struct `MintEvent`](#0x4_collection_MintEvent)
- [Struct `Burn`](#0x4_collection_Burn)
- [Struct `Mint`](#0x4_collection_Mint)
- [Struct `ConcurrentBurnEvent`](#0x4_collection_ConcurrentBurnEvent)
- [Struct `ConcurrentMintEvent`](#0x4_collection_ConcurrentMintEvent)
- [Struct `SetMaxSupply`](#0x4_collection_SetMaxSupply)
- [Constants](#@Constants_0)
- [Function `create_fixed_collection`](#0x4_collection_create_fixed_collection)
- [Function `create_unlimited_collection`](#0x4_collection_create_unlimited_collection)
- [Function `create_collection_address`](#0x4_collection_create_collection_address)
- [Function `create_collection_seed`](#0x4_collection_create_collection_seed)
- [Function `increment_supply`](#0x4_collection_increment_supply)
- [Function `decrement_supply`](#0x4_collection_decrement_supply)
- [Function `generate_mutator_ref`](#0x4_collection_generate_mutator_ref)
- [Function `upgrade_to_concurrent`](#0x4_collection_upgrade_to_concurrent)
- [Function `count`](#0x4_collection_count)
- [Function `creator`](#0x4_collection_creator)
- [Function `description`](#0x4_collection_description)
- [Function `name`](#0x4_collection_name)
- [Function `uri`](#0x4_collection_uri)
- [Function `set_name`](#0x4_collection_set_name)
- [Function `set_description`](#0x4_collection_set_description)
- [Function `set_uri`](#0x4_collection_set_uri)
- [Function `set_max_supply`](#0x4_collection_set_max_supply)

```move
module 0x4::collection {
    use 0x1::aggregator_v2;
    use 0x1::error;
    use 0x1::event;
    use 0x1::features;
    use 0x1::object;
    use 0x1::option;
    use 0x1::signer;
    use 0x1::string;
    use 0x4::royalty;
}
```

<a id="0x4_collection_Collection"></a>

## Resource `Collection`

Represents the common fields for a collection.

```move
module 0x4::collection {
    #[resource_group_member(#[group = 0x1::object::ObjectGroup])]
    struct Collection has key
}
```

<a id="0x4_collection_MutatorRef"></a>

## Struct `MutatorRef`

This enables mutating description and URI by higher level services.

```move
module 0x4::collection {
    struct MutatorRef has drop, store
}
```

<a id="0x4_collection_MutationEvent"></a>

## Struct `MutationEvent`

Contains the mutated fields name. This makes the life of indexers easier, so that they can
directly understand the behavior in a writeset.

```move
module 0x4::collection {
    struct MutationEvent has drop, store
}
```

<a id="0x4_collection_Mutation"></a>

## Struct `Mutation`

Contains the mutated fields name. This makes the life of indexers easier, so that they can
directly understand the behavior in a writeset.

```move
module 0x4::collection {
    #[event]
    struct Mutation has drop, store
}
```

<a id="0x4_collection_FixedSupply"></a>

## Resource `FixedSupply`

Fixed supply tracker, this is useful for ensuring that a limited number of tokens are minted.
and adding events and supply tracking to a collection.

```move
module 0x4::collection {
    #[resource_group_member(#[group = 0x1::object::ObjectGroup])]
    struct FixedSupply has key
}
```

<a id="0x4_collection_UnlimitedSupply"></a>

## Resource `UnlimitedSupply`

Unlimited supply tracker, this is useful for adding events and supply tracking to a collection.

```move
module 0x4::collection {
    #[resource_group_member(#[group = 0x1::object::ObjectGroup])]
    struct UnlimitedSupply has key
}
```

<a id="0x4_collection_ConcurrentSupply"></a>

## Resource `ConcurrentSupply`

Supply tracker, useful for tracking amount of issued tokens.
If max_value is not set to U64_MAX, this ensures that a limited number of tokens are minted.

```move
module 0x4::collection {
    #[resource_group_member(#[group = 0x1::object::ObjectGroup])]
    struct ConcurrentSupply has key
}
```

<a id="0x4_collection_BurnEvent"></a>

## Struct `BurnEvent`

```move
module 0x4::collection {
    struct BurnEvent has drop, store
}
```

<a id="0x4_collection_MintEvent"></a>

## Struct `MintEvent`

```move
module 0x4::collection {
    struct MintEvent has drop, store
}
```

<a id="0x4_collection_Burn"></a>

## Struct `Burn`

```move
module 0x4::collection {
    #[event]
    struct Burn has drop, store
}
```

<a id="0x4_collection_Mint"></a>

## Struct `Mint`

```move
module 0x4::collection {
    #[event]
    struct Mint has drop, store
}
```

<a id="0x4_collection_ConcurrentBurnEvent"></a>

## Struct `ConcurrentBurnEvent`

```move
module 0x4::collection {
    #[event]
    #[deprecated]
    struct ConcurrentBurnEvent has drop, store
}
```

<a id="0x4_collection_ConcurrentMintEvent"></a>

## Struct `ConcurrentMintEvent`

```move
module 0x4::collection {
    #[event]
    #[deprecated]
    struct ConcurrentMintEvent has drop, store
}
```

<a id="0x4_collection_SetMaxSupply"></a>

## Struct `SetMaxSupply`

```move
module 0x4::collection {
    #[event]
    struct SetMaxSupply has drop, store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x4_collection_MAX_U64"></a>

```move
module 0x4::collection {
    const MAX_U64: u64 = 18446744073709551615;
}
```

<a id="0x4_collection_EURI_TOO_LONG"></a>

The URI is over the maximum length

```move
module 0x4::collection {
    const EURI_TOO_LONG: u64 = 4;
}
```

<a id="0x4_collection_MAX_URI_LENGTH"></a>

```move
module 0x4::collection {
    const MAX_URI_LENGTH: u64 = 512;
}
```

<a id="0x4_collection_EALREADY_CONCURRENT"></a>

Tried upgrading collection to concurrent, but collection is already concurrent

```move
module 0x4::collection {
    const EALREADY_CONCURRENT: u64 = 8;
}
```

<a id="0x4_collection_ECOLLECTION_DOES_NOT_EXIST"></a>

The collection does not exist

```move
module 0x4::collection {
    const ECOLLECTION_DOES_NOT_EXIST: u64 = 1;
}
```

<a id="0x4_collection_ECOLLECTION_NAME_TOO_LONG"></a>

The collection name is over the maximum length

```move
module 0x4::collection {
    const ECOLLECTION_NAME_TOO_LONG: u64 = 3;
}
```

<a id="0x4_collection_ECOLLECTION_SUPPLY_EXCEEDED"></a>

The collection has reached its supply and no more tokens can be minted, unless some are burned

```move
module 0x4::collection {
    const ECOLLECTION_SUPPLY_EXCEEDED: u64 = 2;
}
```

<a id="0x4_collection_ECONCURRENT_NOT_ENABLED"></a>

Concurrent feature flag is not yet enabled, so the function cannot be performed

```move
module 0x4::collection {
    const ECONCURRENT_NOT_ENABLED: u64 = 7;
}
```

<a id="0x4_collection_EDESCRIPTION_TOO_LONG"></a>

The description is over the maximum length

```move
module 0x4::collection {
    const EDESCRIPTION_TOO_LONG: u64 = 5;
}
```

<a id="0x4_collection_EINVALID_MAX_SUPPLY"></a>

The new max supply cannot be less than the current supply

```move
module 0x4::collection {
    const EINVALID_MAX_SUPPLY: u64 = 9;
}
```

<a id="0x4_collection_EMAX_SUPPLY_CANNOT_BE_ZERO"></a>

The max supply must be positive

```move
module 0x4::collection {
    const EMAX_SUPPLY_CANNOT_BE_ZERO: u64 = 6;
}
```

<a id="0x4_collection_ENO_MAX_SUPPLY_IN_COLLECTION"></a>

The collection does not have a max supply

```move
module 0x4::collection {
    const ENO_MAX_SUPPLY_IN_COLLECTION: u64 = 10;
}
```

<a id="0x4_collection_MAX_COLLECTION_NAME_LENGTH"></a>

```move
module 0x4::collection {
    const MAX_COLLECTION_NAME_LENGTH: u64 = 128;
}
```

<a id="0x4_collection_MAX_DESCRIPTION_LENGTH"></a>

```move
module 0x4::collection {
    const MAX_DESCRIPTION_LENGTH: u64 = 2048;
}
```

<a id="0x4_collection_create_fixed_collection"></a>

## Function `create_fixed_collection`

Creates a fixed&#45;sized collection, or a collection that supports a fixed amount of tokens.
This is useful to create a guaranteed, limited supply on&#45;chain digital asset. For example,
a collection 1111 vicious vipers. Note, creating restrictions such as upward limits results
in data structures that prevent Aptos from parallelizing mints of this collection type.
Beyond that, it adds supply tracking with events.

```move
module 0x4::collection {
    public fun create_fixed_collection(creator: &signer, description: string::String, max_supply: u64, name: string::String, royalty: option::Option<royalty::Royalty>, uri: string::String): object::ConstructorRef
}
```

<a id="0x4_collection_create_unlimited_collection"></a>

## Function `create_unlimited_collection`

Creates an unlimited collection. This has support for supply tracking but does not limit
the supply of tokens.

```move
module 0x4::collection {
    public fun create_unlimited_collection(creator: &signer, description: string::String, name: string::String, royalty: option::Option<royalty::Royalty>, uri: string::String): object::ConstructorRef
}
```

<a id="0x4_collection_create_collection_address"></a>

## Function `create_collection_address`

Generates the collections address based upon the creators address and the collection&apos;s name

```move
module 0x4::collection {
    public fun create_collection_address(creator: &address, name: &string::String): address
}
```

<a id="0x4_collection_create_collection_seed"></a>

## Function `create_collection_seed`

Named objects are derived from a seed, the collection&apos;s seed is its name.

```move
module 0x4::collection {
    public fun create_collection_seed(name: &string::String): vector<u8>
}
```

<a id="0x4_collection_increment_supply"></a>

## Function `increment_supply`

Called by token on mint to increment supply if there&apos;s an appropriate Supply struct.

```move
module 0x4::collection {
    public(friend) fun increment_supply(collection: &object::Object<collection::Collection>, token: address): option::Option<aggregator_v2::AggregatorSnapshot<u64>>
}
```

<a id="0x4_collection_decrement_supply"></a>

## Function `decrement_supply`

Called by token on burn to decrement supply if there&apos;s an appropriate Supply struct.

```move
module 0x4::collection {
    public(friend) fun decrement_supply(collection: &object::Object<collection::Collection>, token: address, index: option::Option<u64>, previous_owner: address)
}
```

<a id="0x4_collection_generate_mutator_ref"></a>

## Function `generate_mutator_ref`

Creates a MutatorRef, which gates the ability to mutate any fields that support mutation.

```move
module 0x4::collection {
    public fun generate_mutator_ref(ref: &object::ConstructorRef): collection::MutatorRef
}
```

<a id="0x4_collection_upgrade_to_concurrent"></a>

## Function `upgrade_to_concurrent`

```move
module 0x4::collection {
    public fun upgrade_to_concurrent(ref: &object::ExtendRef)
}
```

<a id="0x4_collection_count"></a>

## Function `count`

Provides the count of the current selection if supply tracking is used

Note: Calling this method from transaction that also mints/burns, prevents
it from being parallelized.

```move
module 0x4::collection {
    #[view]
    public fun count<T: key>(collection: object::Object<T>): option::Option<u64>
}
```

<a id="0x4_collection_creator"></a>

## Function `creator`

```move
module 0x4::collection {
    #[view]
    public fun creator<T: key>(collection: object::Object<T>): address
}
```

<a id="0x4_collection_description"></a>

## Function `description`

```move
module 0x4::collection {
    #[view]
    public fun description<T: key>(collection: object::Object<T>): string::String
}
```

<a id="0x4_collection_name"></a>

## Function `name`

```move
module 0x4::collection {
    #[view]
    public fun name<T: key>(collection: object::Object<T>): string::String
}
```

<a id="0x4_collection_uri"></a>

## Function `uri`

```move
module 0x4::collection {
    #[view]
    public fun uri<T: key>(collection: object::Object<T>): string::String
}
```

<a id="0x4_collection_set_name"></a>

## Function `set_name`

Callers of this function must be aware that changing the name will change the calculated
collection&apos;s address when calling `create_collection_address`.
Once the collection has been created, the collection address should be saved for reference and
`create_collection_address` should not be used to derive the collection&apos;s address.

After changing the collection&apos;s name, to create tokens &#45; only call functions that accept the collection object as an argument.

```move
module 0x4::collection {
    public fun set_name(mutator_ref: &collection::MutatorRef, name: string::String)
}
```

<a id="0x4_collection_set_description"></a>

## Function `set_description`

```move
module 0x4::collection {
    public fun set_description(mutator_ref: &collection::MutatorRef, description: string::String)
}
```

<a id="0x4_collection_set_uri"></a>

## Function `set_uri`

```move
module 0x4::collection {
    public fun set_uri(mutator_ref: &collection::MutatorRef, uri: string::String)
}
```

<a id="0x4_collection_set_max_supply"></a>

## Function `set_max_supply`

```move
module 0x4::collection {
    public fun set_max_supply(mutator_ref: &collection::MutatorRef, max_supply: u64)
}
```
