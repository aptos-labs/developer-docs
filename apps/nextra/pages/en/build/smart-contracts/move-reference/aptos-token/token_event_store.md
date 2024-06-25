<a id="0x3_token_event_store"></a>

# Module `0x3::token_event_store`

This module provides utils to add and emit new token events that are not in token.move

- [Struct `CollectionDescriptionMutateEvent`](#0x3_token_event_store_CollectionDescriptionMutateEvent)
- [Struct `CollectionDescriptionMutate`](#0x3_token_event_store_CollectionDescriptionMutate)
- [Struct `CollectionUriMutateEvent`](#0x3_token_event_store_CollectionUriMutateEvent)
- [Struct `CollectionUriMutate`](#0x3_token_event_store_CollectionUriMutate)
- [Struct `CollectionMaxiumMutateEvent`](#0x3_token_event_store_CollectionMaxiumMutateEvent)
- [Struct `CollectionMaxiumMutate`](#0x3_token_event_store_CollectionMaxiumMutate)
- [Struct `OptInTransferEvent`](#0x3_token_event_store_OptInTransferEvent)
- [Struct `OptInTransfer`](#0x3_token_event_store_OptInTransfer)
- [Struct `UriMutationEvent`](#0x3_token_event_store_UriMutationEvent)
- [Struct `UriMutation`](#0x3_token_event_store_UriMutation)
- [Struct `DefaultPropertyMutateEvent`](#0x3_token_event_store_DefaultPropertyMutateEvent)
- [Struct `DefaultPropertyMutate`](#0x3_token_event_store_DefaultPropertyMutate)
- [Struct `DescriptionMutateEvent`](#0x3_token_event_store_DescriptionMutateEvent)
- [Struct `DescriptionMutate`](#0x3_token_event_store_DescriptionMutate)
- [Struct `RoyaltyMutateEvent`](#0x3_token_event_store_RoyaltyMutateEvent)
- [Struct `RoyaltyMutate`](#0x3_token_event_store_RoyaltyMutate)
- [Struct `MaxiumMutateEvent`](#0x3_token_event_store_MaxiumMutateEvent)
- [Struct `MaximumMutate`](#0x3_token_event_store_MaximumMutate)
- [Resource `TokenEventStoreV1`](#0x3_token_event_store_TokenEventStoreV1)
- [Function `emit_collection_uri_mutate_event`](#0x3_token_event_store_emit_collection_uri_mutate_event)
- [Function `emit_collection_description_mutate_event`](#0x3_token_event_store_emit_collection_description_mutate_event)
- [Function `emit_collection_maximum_mutate_event`](#0x3_token_event_store_emit_collection_maximum_mutate_event)
- [Function `emit_token_opt_in_event`](#0x3_token_event_store_emit_token_opt_in_event)
- [Function `emit_token_uri_mutate_event`](#0x3_token_event_store_emit_token_uri_mutate_event)
- [Function `emit_default_property_mutate_event`](#0x3_token_event_store_emit_default_property_mutate_event)
- [Function `emit_token_descrition_mutate_event`](#0x3_token_event_store_emit_token_descrition_mutate_event)
- [Function `emit_token_royalty_mutate_event`](#0x3_token_event_store_emit_token_royalty_mutate_event)
- [Function `emit_token_maximum_mutate_event`](#0x3_token_event_store_emit_token_maximum_mutate_event)

```move
module 0x3::token_event_store {
    use 0x1::account;
    use 0x1::any;
    use 0x1::event;
    use 0x1::features;
    use 0x1::option;
    use 0x1::signer;
    use 0x1::string;
    use 0x3::property_map;
}
```

<a id="0x3_token_event_store_CollectionDescriptionMutateEvent"></a>

## Struct `CollectionDescriptionMutateEvent`

Event emitted when collection description is mutated

```move
module 0x3::token_event_store {
    struct CollectionDescriptionMutateEvent has drop, store
}
```

<a id="0x3_token_event_store_CollectionDescriptionMutate"></a>

## Struct `CollectionDescriptionMutate`

Event emitted when collection description is mutated

```move
module 0x3::token_event_store {
    #[event]
    struct CollectionDescriptionMutate has drop, store
}
```

<a id="0x3_token_event_store_CollectionUriMutateEvent"></a>

## Struct `CollectionUriMutateEvent`

Event emitted when collection uri is mutated

```move
module 0x3::token_event_store {
    struct CollectionUriMutateEvent has drop, store
}
```

<a id="0x3_token_event_store_CollectionUriMutate"></a>

## Struct `CollectionUriMutate`

Event emitted when collection uri is mutated

```move
module 0x3::token_event_store {
    #[event]
    struct CollectionUriMutate has drop, store
}
```

<a id="0x3_token_event_store_CollectionMaxiumMutateEvent"></a>

## Struct `CollectionMaxiumMutateEvent`

Event emitted when the collection maximum is mutated

```move
module 0x3::token_event_store {
    struct CollectionMaxiumMutateEvent has drop, store
}
```

<a id="0x3_token_event_store_CollectionMaxiumMutate"></a>

## Struct `CollectionMaxiumMutate`

Event emitted when the collection maximum is mutated

```move
module 0x3::token_event_store {
    #[event]
    struct CollectionMaxiumMutate has drop, store
}
```

<a id="0x3_token_event_store_OptInTransferEvent"></a>

## Struct `OptInTransferEvent`

Event emitted when an user opt&#45;in the direct transfer

```move
module 0x3::token_event_store {
    struct OptInTransferEvent has drop, store
}
```

<a id="0x3_token_event_store_OptInTransfer"></a>

## Struct `OptInTransfer`

Event emitted when an user opt&#45;in the direct transfer

```move
module 0x3::token_event_store {
    #[event]
    struct OptInTransfer has drop, store
}
```

<a id="0x3_token_event_store_UriMutationEvent"></a>

## Struct `UriMutationEvent`

Event emitted when the tokendata uri mutates

```move
module 0x3::token_event_store {
    struct UriMutationEvent has drop, store
}
```

<a id="0x3_token_event_store_UriMutation"></a>

## Struct `UriMutation`

Event emitted when the tokendata uri mutates

```move
module 0x3::token_event_store {
    #[event]
    struct UriMutation has drop, store
}
```

<a id="0x3_token_event_store_DefaultPropertyMutateEvent"></a>

## Struct `DefaultPropertyMutateEvent`

Event emitted when mutating the default the token properties stored at tokendata

```move
module 0x3::token_event_store {
    struct DefaultPropertyMutateEvent has drop, store
}
```

<a id="0x3_token_event_store_DefaultPropertyMutate"></a>

## Struct `DefaultPropertyMutate`

Event emitted when mutating the default the token properties stored at tokendata

```move
module 0x3::token_event_store {
    #[event]
    struct DefaultPropertyMutate has drop, store
}
```

<a id="0x3_token_event_store_DescriptionMutateEvent"></a>

## Struct `DescriptionMutateEvent`

Event emitted when the tokendata description is mutated

```move
module 0x3::token_event_store {
    struct DescriptionMutateEvent has drop, store
}
```

<a id="0x3_token_event_store_DescriptionMutate"></a>

## Struct `DescriptionMutate`

Event emitted when the tokendata description is mutated

```move
module 0x3::token_event_store {
    #[event]
    struct DescriptionMutate has drop, store
}
```

<a id="0x3_token_event_store_RoyaltyMutateEvent"></a>

## Struct `RoyaltyMutateEvent`

Event emitted when the token royalty is mutated

```move
module 0x3::token_event_store {
    struct RoyaltyMutateEvent has drop, store
}
```

<a id="0x3_token_event_store_RoyaltyMutate"></a>

## Struct `RoyaltyMutate`

Event emitted when the token royalty is mutated

```move
module 0x3::token_event_store {
    #[event]
    struct RoyaltyMutate has drop, store
}
```

<a id="0x3_token_event_store_MaxiumMutateEvent"></a>

## Struct `MaxiumMutateEvent`

Event emitted when the token maximum is mutated

```move
module 0x3::token_event_store {
    struct MaxiumMutateEvent has drop, store
}
```

<a id="0x3_token_event_store_MaximumMutate"></a>

## Struct `MaximumMutate`

Event emitted when the token maximum is mutated

```move
module 0x3::token_event_store {
    #[event]
    struct MaximumMutate has drop, store
}
```

<a id="0x3_token_event_store_TokenEventStoreV1"></a>

## Resource `TokenEventStoreV1`

```move
module 0x3::token_event_store {
    struct TokenEventStoreV1 has key
}
```

<a id="0x3_token_event_store_emit_collection_uri_mutate_event"></a>

## Function `emit_collection_uri_mutate_event`

Emit the collection uri mutation event

```move
module 0x3::token_event_store {
    public(friend) fun emit_collection_uri_mutate_event(creator: &signer, collection: string::String, old_uri: string::String, new_uri: string::String)
}
```

<a id="0x3_token_event_store_emit_collection_description_mutate_event"></a>

## Function `emit_collection_description_mutate_event`

Emit the collection description mutation event

```move
module 0x3::token_event_store {
    public(friend) fun emit_collection_description_mutate_event(creator: &signer, collection: string::String, old_description: string::String, new_description: string::String)
}
```

<a id="0x3_token_event_store_emit_collection_maximum_mutate_event"></a>

## Function `emit_collection_maximum_mutate_event`

Emit the collection maximum mutation event

```move
module 0x3::token_event_store {
    public(friend) fun emit_collection_maximum_mutate_event(creator: &signer, collection: string::String, old_maximum: u64, new_maximum: u64)
}
```

<a id="0x3_token_event_store_emit_token_opt_in_event"></a>

## Function `emit_token_opt_in_event`

Emit the direct opt&#45;in event

```move
module 0x3::token_event_store {
    public(friend) fun emit_token_opt_in_event(account: &signer, opt_in: bool)
}
```

<a id="0x3_token_event_store_emit_token_uri_mutate_event"></a>

## Function `emit_token_uri_mutate_event`

Emit URI mutation event

```move
module 0x3::token_event_store {
    public(friend) fun emit_token_uri_mutate_event(creator: &signer, collection: string::String, token: string::String, old_uri: string::String, new_uri: string::String)
}
```

<a id="0x3_token_event_store_emit_default_property_mutate_event"></a>

## Function `emit_default_property_mutate_event`

Emit tokendata property map mutation event

```move
module 0x3::token_event_store {
    public(friend) fun emit_default_property_mutate_event(creator: &signer, collection: string::String, token: string::String, keys: vector<string::String>, old_values: vector<option::Option<property_map::PropertyValue>>, new_values: vector<property_map::PropertyValue>)
}
```

<a id="0x3_token_event_store_emit_token_descrition_mutate_event"></a>

## Function `emit_token_descrition_mutate_event`

Emit description mutation event

```move
module 0x3::token_event_store {
    public(friend) fun emit_token_descrition_mutate_event(creator: &signer, collection: string::String, token: string::String, old_description: string::String, new_description: string::String)
}
```

<a id="0x3_token_event_store_emit_token_royalty_mutate_event"></a>

## Function `emit_token_royalty_mutate_event`

Emit royalty mutation event

```move
module 0x3::token_event_store {
    public(friend) fun emit_token_royalty_mutate_event(creator: &signer, collection: string::String, token: string::String, old_royalty_numerator: u64, old_royalty_denominator: u64, old_royalty_payee_addr: address, new_royalty_numerator: u64, new_royalty_denominator: u64, new_royalty_payee_addr: address)
}
```

<a id="0x3_token_event_store_emit_token_maximum_mutate_event"></a>

## Function `emit_token_maximum_mutate_event`

Emit maximum mutation event

```move
module 0x3::token_event_store {
    public(friend) fun emit_token_maximum_mutate_event(creator: &signer, collection: string::String, token: string::String, old_maximum: u64, new_maximum: u64)
}
```
