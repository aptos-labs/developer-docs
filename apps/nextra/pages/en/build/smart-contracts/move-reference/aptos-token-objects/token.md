<a id="0x4_token"></a>

# Module `0x4::token`

This defines an object&#45;based Token. The key differentiating features from the Aptos standard
token are: \* Decoupled token ownership from token data. \* Explicit data model for token metadata via adjacent resources \* Extensible framework for tokens

- [Resource `Token`](#0x4_token_Token)
- [Resource `TokenIdentifiers`](#0x4_token_TokenIdentifiers)
- [Resource `ConcurrentTokenIdentifiers`](#0x4_token_ConcurrentTokenIdentifiers)
- [Struct `BurnRef`](#0x4_token_BurnRef)
- [Struct `MutatorRef`](#0x4_token_MutatorRef)
- [Struct `MutationEvent`](#0x4_token_MutationEvent)
- [Struct `Mutation`](#0x4_token_Mutation)
- [Constants](#@Constants_0)
- [Function `create_token`](#0x4_token_create_token)
- [Function `create`](#0x4_token_create)
- [Function `create_numbered_token_object`](#0x4_token_create_numbered_token_object)
- [Function `create_numbered_token`](#0x4_token_create_numbered_token)
- [Function `create_named_token_object`](#0x4_token_create_named_token_object)
- [Function `create_named_token`](#0x4_token_create_named_token)
- [Function `create_named_token_from_seed`](#0x4_token_create_named_token_from_seed)
- [Function `create_from_account`](#0x4_token_create_from_account)
- [Function `create_token_address`](#0x4_token_create_token_address)
- [Function `create_token_address_with_seed`](#0x4_token_create_token_address_with_seed)
- [Function `create_token_seed`](#0x4_token_create_token_seed)
- [Function `create_token_name_with_seed`](#0x4_token_create_token_name_with_seed)
- [Function `generate_mutator_ref`](#0x4_token_generate_mutator_ref)
- [Function `generate_burn_ref`](#0x4_token_generate_burn_ref)
- [Function `address_from_burn_ref`](#0x4_token_address_from_burn_ref)
- [Function `creator`](#0x4_token_creator)
- [Function `collection_name`](#0x4_token_collection_name)
- [Function `collection_object`](#0x4_token_collection_object)
- [Function `description`](#0x4_token_description)
- [Function `name`](#0x4_token_name)
- [Function `uri`](#0x4_token_uri)
- [Function `royalty`](#0x4_token_royalty)
- [Function `index`](#0x4_token_index)
- [Function `burn`](#0x4_token_burn)
- [Function `set_description`](#0x4_token_set_description)
- [Function `set_name`](#0x4_token_set_name)
- [Function `set_uri`](#0x4_token_set_uri)

```move
module 0x4::token {
    use 0x1::aggregator_v2;
    use 0x1::error;
    use 0x1::event;
    use 0x1::features;
    use 0x1::object;
    use 0x1::option;
    use 0x1::signer;
    use 0x1::string;
    use 0x1::vector;
    use 0x4::collection;
    use 0x4::royalty;
}
```

<a id="0x4_token_Token"></a>

## Resource `Token`

Represents the common fields to all tokens.

```move
module 0x4::token {
    #[resource_group_member(#[group = 0x1::object::ObjectGroup])]
    struct Token has key
}
```

<a id="0x4_token_TokenIdentifiers"></a>

## Resource `TokenIdentifiers`

Represents first addition to the common fields for all tokens
Started being populated once aggregator_v2_api_enabled was enabled.

```move
module 0x4::token {
    #[resource_group_member(#[group = 0x1::object::ObjectGroup])]
    struct TokenIdentifiers has key
}
```

<a id="0x4_token_ConcurrentTokenIdentifiers"></a>

## Resource `ConcurrentTokenIdentifiers`

```move
module 0x4::token {
    #[resource_group_member(#[group = 0x1::object::ObjectGroup])]
    #[deprecated]
    struct ConcurrentTokenIdentifiers has key
}
```

<a id="0x4_token_BurnRef"></a>

## Struct `BurnRef`

This enables burning an NFT, if possible, it will also delete the object. Note, the data
in inner and self occupies 32&#45;bytes each, rather than have both, this data structure makes
a small optimization to support either and take a fixed amount of 34&#45;bytes.

```move
module 0x4::token {
    struct BurnRef has drop, store
}
```

<a id="0x4_token_MutatorRef"></a>

## Struct `MutatorRef`

This enables mutating description and URI by higher level services.

```move
module 0x4::token {
    struct MutatorRef has drop, store
}
```

<a id="0x4_token_MutationEvent"></a>

## Struct `MutationEvent`

Contains the mutated fields name. This makes the life of indexers easier, so that they can
directly understand the behavior in a writeset.

```move
module 0x4::token {
    struct MutationEvent has drop, store
}
```

<a id="0x4_token_Mutation"></a>

## Struct `Mutation`

```move
module 0x4::token {
    #[event]
    struct Mutation has drop, store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x4_token_EURI_TOO_LONG"></a>

The URI is over the maximum length

```move
module 0x4::token {
    const EURI_TOO_LONG: u64 = 5;
}
```

<a id="0x4_token_MAX_URI_LENGTH"></a>

```move
module 0x4::token {
    const MAX_URI_LENGTH: u64 = 512;
}
```

<a id="0x4_token_EDESCRIPTION_TOO_LONG"></a>

The description is over the maximum length

```move
module 0x4::token {
    const EDESCRIPTION_TOO_LONG: u64 = 6;
}
```

<a id="0x4_token_MAX_DESCRIPTION_LENGTH"></a>

```move
module 0x4::token {
    const MAX_DESCRIPTION_LENGTH: u64 = 2048;
}
```

<a id="0x4_token_EFIELD_NOT_MUTABLE"></a>

The field being changed is not mutable

```move
module 0x4::token {
    const EFIELD_NOT_MUTABLE: u64 = 3;
}
```

<a id="0x4_token_ENOT_CREATOR"></a>

The provided signer is not the creator

```move
module 0x4::token {
    const ENOT_CREATOR: u64 = 2;
}
```

<a id="0x4_token_ESEED_TOO_LONG"></a>

The seed is over the maximum length

```move
module 0x4::token {
    const ESEED_TOO_LONG: u64 = 7;
}
```

<a id="0x4_token_ETOKEN_DOES_NOT_EXIST"></a>

The token does not exist

```move
module 0x4::token {
    const ETOKEN_DOES_NOT_EXIST: u64 = 1;
}
```

<a id="0x4_token_ETOKEN_NAME_TOO_LONG"></a>

The token name is over the maximum length

```move
module 0x4::token {
    const ETOKEN_NAME_TOO_LONG: u64 = 4;
}
```

<a id="0x4_token_MAX_TOKEN_NAME_LENGTH"></a>

```move
module 0x4::token {
    const MAX_TOKEN_NAME_LENGTH: u64 = 128;
}
```

<a id="0x4_token_MAX_TOKEN_SEED_LENGTH"></a>

```move
module 0x4::token {
    const MAX_TOKEN_SEED_LENGTH: u64 = 128;
}
```

<a id="0x4_token_create_token"></a>

## Function `create_token`

Creates a new token object with a unique address and returns the ConstructorRef
for additional specialization.
This takes in the collection object instead of the collection name.
This function must be called if the collection name has been previously changed.

```move
module 0x4::token {
    public fun create_token(creator: &signer, collection: object::Object<collection::Collection>, description: string::String, name: string::String, royalty: option::Option<royalty::Royalty>, uri: string::String): object::ConstructorRef
}
```

<a id="0x4_token_create"></a>

## Function `create`

Creates a new token object with a unique address and returns the ConstructorRef
for additional specialization.

```move
module 0x4::token {
    public fun create(creator: &signer, collection_name: string::String, description: string::String, name: string::String, royalty: option::Option<royalty::Royalty>, uri: string::String): object::ConstructorRef
}
```

<a id="0x4_token_create_numbered_token_object"></a>

## Function `create_numbered_token_object`

Creates a new token object with a unique address and returns the ConstructorRef
for additional specialization.
The name is created by concatenating the (name_prefix, index, name_suffix).
This function allows creating tokens in parallel, from the same collection,
while providing sequential names.

This takes in the collection object instead of the collection name.
This function must be called if the collection name has been previously changed.

```move
module 0x4::token {
    public fun create_numbered_token_object(creator: &signer, collection: object::Object<collection::Collection>, description: string::String, name_with_index_prefix: string::String, name_with_index_suffix: string::String, royalty: option::Option<royalty::Royalty>, uri: string::String): object::ConstructorRef
}
```

<a id="0x4_token_create_numbered_token"></a>

## Function `create_numbered_token`

Creates a new token object with a unique address and returns the ConstructorRef
for additional specialization.
The name is created by concatenating the (name_prefix, index, name_suffix).
This function will allow creating tokens in parallel, from the same collection,
while providing sequential names.

```move
module 0x4::token {
    public fun create_numbered_token(creator: &signer, collection_name: string::String, description: string::String, name_with_index_prefix: string::String, name_with_index_suffix: string::String, royalty: option::Option<royalty::Royalty>, uri: string::String): object::ConstructorRef
}
```

<a id="0x4_token_create_named_token_object"></a>

## Function `create_named_token_object`

Creates a new token object from a token name and returns the ConstructorRef for
additional specialization.
This function must be called if the collection name has been previously changed.

```move
module 0x4::token {
    public fun create_named_token_object(creator: &signer, collection: object::Object<collection::Collection>, description: string::String, name: string::String, royalty: option::Option<royalty::Royalty>, uri: string::String): object::ConstructorRef
}
```

<a id="0x4_token_create_named_token"></a>

## Function `create_named_token`

Creates a new token object from a token name and returns the ConstructorRef for
additional specialization.

```move
module 0x4::token {
    public fun create_named_token(creator: &signer, collection_name: string::String, description: string::String, name: string::String, royalty: option::Option<royalty::Royalty>, uri: string::String): object::ConstructorRef
}
```

<a id="0x4_token_create_named_token_from_seed"></a>

## Function `create_named_token_from_seed`

Creates a new token object from a token name and seed.
Returns the ConstructorRef for additional specialization.
This function must be called if the collection name has been previously changed.

```move
module 0x4::token {
    public fun create_named_token_from_seed(creator: &signer, collection: object::Object<collection::Collection>, description: string::String, name: string::String, seed: string::String, royalty: option::Option<royalty::Royalty>, uri: string::String): object::ConstructorRef
}
```

<a id="0x4_token_create_from_account"></a>

## Function `create_from_account`

DEPRECATED: Use `create` instead for identical behavior.

Creates a new token object from an account GUID and returns the ConstructorRef for
additional specialization.

```move
module 0x4::token {
    #[deprecated]
    public fun create_from_account(creator: &signer, collection_name: string::String, description: string::String, name: string::String, royalty: option::Option<royalty::Royalty>, uri: string::String): object::ConstructorRef
}
```

<a id="0x4_token_create_token_address"></a>

## Function `create_token_address`

Generates the token&apos;s address based upon the creator&apos;s address, the collection&apos;s name and the token&apos;s name.

```move
module 0x4::token {
    public fun create_token_address(creator: &address, collection: &string::String, name: &string::String): address
}
```

<a id="0x4_token_create_token_address_with_seed"></a>

## Function `create_token_address_with_seed`

Generates the token&apos;s address based upon the creator&apos;s address, the collection object and the token&apos;s name and seed.

```move
module 0x4::token {
    #[view]
    public fun create_token_address_with_seed(creator: address, collection: string::String, name: string::String, seed: string::String): address
}
```

<a id="0x4_token_create_token_seed"></a>

## Function `create_token_seed`

Named objects are derived from a seed, the token&apos;s seed is its name appended to the collection&apos;s name.

```move
module 0x4::token {
    public fun create_token_seed(collection: &string::String, name: &string::String): vector<u8>
}
```

<a id="0x4_token_create_token_name_with_seed"></a>

## Function `create_token_name_with_seed`

```move
module 0x4::token {
    public fun create_token_name_with_seed(collection: &string::String, name: &string::String, seed: &string::String): vector<u8>
}
```

<a id="0x4_token_generate_mutator_ref"></a>

## Function `generate_mutator_ref`

Creates a MutatorRef, which gates the ability to mutate any fields that support mutation.

```move
module 0x4::token {
    public fun generate_mutator_ref(ref: &object::ConstructorRef): token::MutatorRef
}
```

<a id="0x4_token_generate_burn_ref"></a>

## Function `generate_burn_ref`

Creates a BurnRef, which gates the ability to burn the given token.

```move
module 0x4::token {
    public fun generate_burn_ref(ref: &object::ConstructorRef): token::BurnRef
}
```

<a id="0x4_token_address_from_burn_ref"></a>

## Function `address_from_burn_ref`

Extracts the tokens address from a BurnRef.

```move
module 0x4::token {
    public fun address_from_burn_ref(ref: &token::BurnRef): address
}
```

<a id="0x4_token_creator"></a>

## Function `creator`

```move
module 0x4::token {
    #[view]
    public fun creator<T: key>(token: object::Object<T>): address
}
```

<a id="0x4_token_collection_name"></a>

## Function `collection_name`

```move
module 0x4::token {
    #[view]
    public fun collection_name<T: key>(token: object::Object<T>): string::String
}
```

<a id="0x4_token_collection_object"></a>

## Function `collection_object`

```move
module 0x4::token {
    #[view]
    public fun collection_object<T: key>(token: object::Object<T>): object::Object<collection::Collection>
}
```

<a id="0x4_token_description"></a>

## Function `description`

```move
module 0x4::token {
    #[view]
    public fun description<T: key>(token: object::Object<T>): string::String
}
```

<a id="0x4_token_name"></a>

## Function `name`

Avoid this method in the same transaction as the token is minted
as that would prohibit transactions to be executed in parallel.

```move
module 0x4::token {
    #[view]
    public fun name<T: key>(token: object::Object<T>): string::String
}
```

<a id="0x4_token_uri"></a>

## Function `uri`

```move
module 0x4::token {
    #[view]
    public fun uri<T: key>(token: object::Object<T>): string::String
}
```

<a id="0x4_token_royalty"></a>

## Function `royalty`

```move
module 0x4::token {
    #[view]
    public fun royalty<T: key>(token: object::Object<T>): option::Option<royalty::Royalty>
}
```

<a id="0x4_token_index"></a>

## Function `index`

Avoid this method in the same transaction as the token is minted
as that would prohibit transactions to be executed in parallel.

```move
module 0x4::token {
    #[view]
    public fun index<T: key>(token: object::Object<T>): u64
}
```

<a id="0x4_token_burn"></a>

## Function `burn`

```move
module 0x4::token {
    public fun burn(burn_ref: token::BurnRef)
}
```

<a id="0x4_token_set_description"></a>

## Function `set_description`

```move
module 0x4::token {
    public fun set_description(mutator_ref: &token::MutatorRef, description: string::String)
}
```

<a id="0x4_token_set_name"></a>

## Function `set_name`

```move
module 0x4::token {
    public fun set_name(mutator_ref: &token::MutatorRef, name: string::String)
}
```

<a id="0x4_token_set_uri"></a>

## Function `set_uri`

```move
module 0x4::token {
    public fun set_uri(mutator_ref: &token::MutatorRef, uri: string::String)
}
```
