<a id="0x4_aptos_token"></a>

# Module `0x4::aptos_token`

This defines a minimally viable token for no&#45;code solutions akin to the original token at
0x3::token module.
The key features are: \* Base token and collection features \* Creator definable mutability for tokens \* Creator&#45;based freezing of tokens \* Standard object&#45;based transfer and events \* Metadata property type

- [Resource `AptosCollection`](#0x4_aptos_token_AptosCollection)
- [Resource `AptosToken`](#0x4_aptos_token_AptosToken)
- [Constants](#@Constants_0)
- [Function `create_collection`](#0x4_aptos_token_create_collection)
- [Function `create_collection_object`](#0x4_aptos_token_create_collection_object)
- [Function `mint`](#0x4_aptos_token_mint)
- [Function `mint_token_object`](#0x4_aptos_token_mint_token_object)
- [Function `mint_soul_bound`](#0x4_aptos_token_mint_soul_bound)
- [Function `mint_soul_bound_token_object`](#0x4_aptos_token_mint_soul_bound_token_object)
- [Function `are_properties_mutable`](#0x4_aptos_token_are_properties_mutable)
- [Function `is_burnable`](#0x4_aptos_token_is_burnable)
- [Function `is_freezable_by_creator`](#0x4_aptos_token_is_freezable_by_creator)
- [Function `is_mutable_description`](#0x4_aptos_token_is_mutable_description)
- [Function `is_mutable_name`](#0x4_aptos_token_is_mutable_name)
- [Function `is_mutable_uri`](#0x4_aptos_token_is_mutable_uri)
- [Function `burn`](#0x4_aptos_token_burn)
- [Function `freeze_transfer`](#0x4_aptos_token_freeze_transfer)
- [Function `unfreeze_transfer`](#0x4_aptos_token_unfreeze_transfer)
- [Function `set_description`](#0x4_aptos_token_set_description)
- [Function `set_name`](#0x4_aptos_token_set_name)
- [Function `set_uri`](#0x4_aptos_token_set_uri)
- [Function `add_property`](#0x4_aptos_token_add_property)
- [Function `add_typed_property`](#0x4_aptos_token_add_typed_property)
- [Function `remove_property`](#0x4_aptos_token_remove_property)
- [Function `update_property`](#0x4_aptos_token_update_property)
- [Function `update_typed_property`](#0x4_aptos_token_update_typed_property)
- [Function `is_mutable_collection_description`](#0x4_aptos_token_is_mutable_collection_description)
- [Function `is_mutable_collection_royalty`](#0x4_aptos_token_is_mutable_collection_royalty)
- [Function `is_mutable_collection_uri`](#0x4_aptos_token_is_mutable_collection_uri)
- [Function `is_mutable_collection_token_description`](#0x4_aptos_token_is_mutable_collection_token_description)
- [Function `is_mutable_collection_token_name`](#0x4_aptos_token_is_mutable_collection_token_name)
- [Function `is_mutable_collection_token_uri`](#0x4_aptos_token_is_mutable_collection_token_uri)
- [Function `is_mutable_collection_token_properties`](#0x4_aptos_token_is_mutable_collection_token_properties)
- [Function `are_collection_tokens_burnable`](#0x4_aptos_token_are_collection_tokens_burnable)
- [Function `are_collection_tokens_freezable`](#0x4_aptos_token_are_collection_tokens_freezable)
- [Function `set_collection_description`](#0x4_aptos_token_set_collection_description)
- [Function `set_collection_royalties`](#0x4_aptos_token_set_collection_royalties)
- [Function `set_collection_royalties_call`](#0x4_aptos_token_set_collection_royalties_call)
- [Function `set_collection_uri`](#0x4_aptos_token_set_collection_uri)

```move
module 0x4::aptos_token {
    use 0x1::error;
    use 0x1::object;
    use 0x1::option;
    use 0x1::signer;
    use 0x1::string;
    use 0x4::collection;
    use 0x4::property_map;
    use 0x4::royalty;
    use 0x4::token;
}
```

<a id="0x4_aptos_token_AptosCollection"></a>

## Resource `AptosCollection`

Storage state for managing the no&#45;code Collection.

```move
module 0x4::aptos_token {
    #[resource_group_member(#[group = 0x1::object::ObjectGroup])]
    struct AptosCollection has key
}
```

<a id="0x4_aptos_token_AptosToken"></a>

## Resource `AptosToken`

Storage state for managing the no&#45;code Token.

```move
module 0x4::aptos_token {
    #[resource_group_member(#[group = 0x1::object::ObjectGroup])]
    struct AptosToken has key
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x4_aptos_token_ECOLLECTION_DOES_NOT_EXIST"></a>

The collection does not exist

```move
module 0x4::aptos_token {
    const ECOLLECTION_DOES_NOT_EXIST: u64 = 1;
}
```

<a id="0x4_aptos_token_EFIELD_NOT_MUTABLE"></a>

The field being changed is not mutable

```move
module 0x4::aptos_token {
    const EFIELD_NOT_MUTABLE: u64 = 4;
}
```

<a id="0x4_aptos_token_ENOT_CREATOR"></a>

The provided signer is not the creator

```move
module 0x4::aptos_token {
    const ENOT_CREATOR: u64 = 3;
}
```

<a id="0x4_aptos_token_ETOKEN_DOES_NOT_EXIST"></a>

The token does not exist

```move
module 0x4::aptos_token {
    const ETOKEN_DOES_NOT_EXIST: u64 = 2;
}
```

<a id="0x4_aptos_token_EPROPERTIES_NOT_MUTABLE"></a>

The property map being mutated is not mutable

```move
module 0x4::aptos_token {
    const EPROPERTIES_NOT_MUTABLE: u64 = 6;
}
```

<a id="0x4_aptos_token_ETOKEN_NOT_BURNABLE"></a>

The token being burned is not burnable

```move
module 0x4::aptos_token {
    const ETOKEN_NOT_BURNABLE: u64 = 5;
}
```

<a id="0x4_aptos_token_create_collection"></a>

## Function `create_collection`

Create a new collection

```move
module 0x4::aptos_token {
    public entry fun create_collection(creator: &signer, description: string::String, max_supply: u64, name: string::String, uri: string::String, mutable_description: bool, mutable_royalty: bool, mutable_uri: bool, mutable_token_description: bool, mutable_token_name: bool, mutable_token_properties: bool, mutable_token_uri: bool, tokens_burnable_by_creator: bool, tokens_freezable_by_creator: bool, royalty_numerator: u64, royalty_denominator: u64)
}
```

<a id="0x4_aptos_token_create_collection_object"></a>

## Function `create_collection_object`

```move
module 0x4::aptos_token {
    public fun create_collection_object(creator: &signer, description: string::String, max_supply: u64, name: string::String, uri: string::String, mutable_description: bool, mutable_royalty: bool, mutable_uri: bool, mutable_token_description: bool, mutable_token_name: bool, mutable_token_properties: bool, mutable_token_uri: bool, tokens_burnable_by_creator: bool, tokens_freezable_by_creator: bool, royalty_numerator: u64, royalty_denominator: u64): object::Object<aptos_token::AptosCollection>
}
```

<a id="0x4_aptos_token_mint"></a>

## Function `mint`

With an existing collection, directly mint a viable token into the creators account.

```move
module 0x4::aptos_token {
    public entry fun mint(creator: &signer, collection: string::String, description: string::String, name: string::String, uri: string::String, property_keys: vector<string::String>, property_types: vector<string::String>, property_values: vector<vector<u8>>)
}
```

<a id="0x4_aptos_token_mint_token_object"></a>

## Function `mint_token_object`

Mint a token into an existing collection, and retrieve the object / address of the token.

```move
module 0x4::aptos_token {
    public fun mint_token_object(creator: &signer, collection: string::String, description: string::String, name: string::String, uri: string::String, property_keys: vector<string::String>, property_types: vector<string::String>, property_values: vector<vector<u8>>): object::Object<aptos_token::AptosToken>
}
```

<a id="0x4_aptos_token_mint_soul_bound"></a>

## Function `mint_soul_bound`

With an existing collection, directly mint a soul bound token into the recipient&apos;s account.

```move
module 0x4::aptos_token {
    public entry fun mint_soul_bound(creator: &signer, collection: string::String, description: string::String, name: string::String, uri: string::String, property_keys: vector<string::String>, property_types: vector<string::String>, property_values: vector<vector<u8>>, soul_bound_to: address)
}
```

<a id="0x4_aptos_token_mint_soul_bound_token_object"></a>

## Function `mint_soul_bound_token_object`

With an existing collection, directly mint a soul bound token into the recipient&apos;s account.

```move
module 0x4::aptos_token {
    public fun mint_soul_bound_token_object(creator: &signer, collection: string::String, description: string::String, name: string::String, uri: string::String, property_keys: vector<string::String>, property_types: vector<string::String>, property_values: vector<vector<u8>>, soul_bound_to: address): object::Object<aptos_token::AptosToken>
}
```

<a id="0x4_aptos_token_are_properties_mutable"></a>

## Function `are_properties_mutable`

```move
module 0x4::aptos_token {
    #[view]
    public fun are_properties_mutable<T: key>(token: object::Object<T>): bool
}
```

<a id="0x4_aptos_token_is_burnable"></a>

## Function `is_burnable`

```move
module 0x4::aptos_token {
    #[view]
    public fun is_burnable<T: key>(token: object::Object<T>): bool
}
```

<a id="0x4_aptos_token_is_freezable_by_creator"></a>

## Function `is_freezable_by_creator`

```move
module 0x4::aptos_token {
    #[view]
    public fun is_freezable_by_creator<T: key>(token: object::Object<T>): bool
}
```

<a id="0x4_aptos_token_is_mutable_description"></a>

## Function `is_mutable_description`

```move
module 0x4::aptos_token {
    #[view]
    public fun is_mutable_description<T: key>(token: object::Object<T>): bool
}
```

<a id="0x4_aptos_token_is_mutable_name"></a>

## Function `is_mutable_name`

```move
module 0x4::aptos_token {
    #[view]
    public fun is_mutable_name<T: key>(token: object::Object<T>): bool
}
```

<a id="0x4_aptos_token_is_mutable_uri"></a>

## Function `is_mutable_uri`

```move
module 0x4::aptos_token {
    #[view]
    public fun is_mutable_uri<T: key>(token: object::Object<T>): bool
}
```

<a id="0x4_aptos_token_burn"></a>

## Function `burn`

```move
module 0x4::aptos_token {
    public entry fun burn<T: key>(creator: &signer, token: object::Object<T>)
}
```

<a id="0x4_aptos_token_freeze_transfer"></a>

## Function `freeze_transfer`

```move
module 0x4::aptos_token {
    public entry fun freeze_transfer<T: key>(creator: &signer, token: object::Object<T>)
}
```

<a id="0x4_aptos_token_unfreeze_transfer"></a>

## Function `unfreeze_transfer`

```move
module 0x4::aptos_token {
    public entry fun unfreeze_transfer<T: key>(creator: &signer, token: object::Object<T>)
}
```

<a id="0x4_aptos_token_set_description"></a>

## Function `set_description`

```move
module 0x4::aptos_token {
    public entry fun set_description<T: key>(creator: &signer, token: object::Object<T>, description: string::String)
}
```

<a id="0x4_aptos_token_set_name"></a>

## Function `set_name`

```move
module 0x4::aptos_token {
    public entry fun set_name<T: key>(creator: &signer, token: object::Object<T>, name: string::String)
}
```

<a id="0x4_aptos_token_set_uri"></a>

## Function `set_uri`

```move
module 0x4::aptos_token {
    public entry fun set_uri<T: key>(creator: &signer, token: object::Object<T>, uri: string::String)
}
```

<a id="0x4_aptos_token_add_property"></a>

## Function `add_property`

```move
module 0x4::aptos_token {
    public entry fun add_property<T: key>(creator: &signer, token: object::Object<T>, key: string::String, type: string::String, value: vector<u8>)
}
```

<a id="0x4_aptos_token_add_typed_property"></a>

## Function `add_typed_property`

```move
module 0x4::aptos_token {
    public entry fun add_typed_property<T: key, V: drop>(creator: &signer, token: object::Object<T>, key: string::String, value: V)
}
```

<a id="0x4_aptos_token_remove_property"></a>

## Function `remove_property`

```move
module 0x4::aptos_token {
    public entry fun remove_property<T: key>(creator: &signer, token: object::Object<T>, key: string::String)
}
```

<a id="0x4_aptos_token_update_property"></a>

## Function `update_property`

```move
module 0x4::aptos_token {
    public entry fun update_property<T: key>(creator: &signer, token: object::Object<T>, key: string::String, type: string::String, value: vector<u8>)
}
```

<a id="0x4_aptos_token_update_typed_property"></a>

## Function `update_typed_property`

```move
module 0x4::aptos_token {
    public entry fun update_typed_property<T: key, V: drop>(creator: &signer, token: object::Object<T>, key: string::String, value: V)
}
```

<a id="0x4_aptos_token_is_mutable_collection_description"></a>

## Function `is_mutable_collection_description`

```move
module 0x4::aptos_token {
    public fun is_mutable_collection_description<T: key>(collection: object::Object<T>): bool
}
```

<a id="0x4_aptos_token_is_mutable_collection_royalty"></a>

## Function `is_mutable_collection_royalty`

```move
module 0x4::aptos_token {
    public fun is_mutable_collection_royalty<T: key>(collection: object::Object<T>): bool
}
```

<a id="0x4_aptos_token_is_mutable_collection_uri"></a>

## Function `is_mutable_collection_uri`

```move
module 0x4::aptos_token {
    public fun is_mutable_collection_uri<T: key>(collection: object::Object<T>): bool
}
```

<a id="0x4_aptos_token_is_mutable_collection_token_description"></a>

## Function `is_mutable_collection_token_description`

```move
module 0x4::aptos_token {
    public fun is_mutable_collection_token_description<T: key>(collection: object::Object<T>): bool
}
```

<a id="0x4_aptos_token_is_mutable_collection_token_name"></a>

## Function `is_mutable_collection_token_name`

```move
module 0x4::aptos_token {
    public fun is_mutable_collection_token_name<T: key>(collection: object::Object<T>): bool
}
```

<a id="0x4_aptos_token_is_mutable_collection_token_uri"></a>

## Function `is_mutable_collection_token_uri`

```move
module 0x4::aptos_token {
    public fun is_mutable_collection_token_uri<T: key>(collection: object::Object<T>): bool
}
```

<a id="0x4_aptos_token_is_mutable_collection_token_properties"></a>

## Function `is_mutable_collection_token_properties`

```move
module 0x4::aptos_token {
    public fun is_mutable_collection_token_properties<T: key>(collection: object::Object<T>): bool
}
```

<a id="0x4_aptos_token_are_collection_tokens_burnable"></a>

## Function `are_collection_tokens_burnable`

```move
module 0x4::aptos_token {
    public fun are_collection_tokens_burnable<T: key>(collection: object::Object<T>): bool
}
```

<a id="0x4_aptos_token_are_collection_tokens_freezable"></a>

## Function `are_collection_tokens_freezable`

```move
module 0x4::aptos_token {
    public fun are_collection_tokens_freezable<T: key>(collection: object::Object<T>): bool
}
```

<a id="0x4_aptos_token_set_collection_description"></a>

## Function `set_collection_description`

```move
module 0x4::aptos_token {
    public entry fun set_collection_description<T: key>(creator: &signer, collection: object::Object<T>, description: string::String)
}
```

<a id="0x4_aptos_token_set_collection_royalties"></a>

## Function `set_collection_royalties`

```move
module 0x4::aptos_token {
    public fun set_collection_royalties<T: key>(creator: &signer, collection: object::Object<T>, royalty: royalty::Royalty)
}
```

<a id="0x4_aptos_token_set_collection_royalties_call"></a>

## Function `set_collection_royalties_call`

```move
module 0x4::aptos_token {
    entry fun set_collection_royalties_call<T: key>(creator: &signer, collection: object::Object<T>, royalty_numerator: u64, royalty_denominator: u64, payee_address: address)
}
```

<a id="0x4_aptos_token_set_collection_uri"></a>

## Function `set_collection_uri`

```move
module 0x4::aptos_token {
    public entry fun set_collection_uri<T: key>(creator: &signer, collection: object::Object<T>, uri: string::String)
}
```
