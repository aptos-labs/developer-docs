<a id="0x3_token_transfers"></a>

# Module `0x3::token_transfers`

This module provides the foundation for transferring of Tokens

- [Resource `PendingClaims`](#0x3_token_transfers_PendingClaims)
- [Struct `TokenOfferId`](#0x3_token_transfers_TokenOfferId)
- [Struct `TokenOffer`](#0x3_token_transfers_TokenOffer)
- [Struct `TokenOfferEvent`](#0x3_token_transfers_TokenOfferEvent)
- [Struct `TokenCancelOfferEvent`](#0x3_token_transfers_TokenCancelOfferEvent)
- [Struct `TokenCancelOffer`](#0x3_token_transfers_TokenCancelOffer)
- [Struct `TokenClaimEvent`](#0x3_token_transfers_TokenClaimEvent)
- [Struct `TokenClaim`](#0x3_token_transfers_TokenClaim)
- [Constants](#@Constants_0)
- [Function `offer_script`](#0x3_token_transfers_offer_script)
- [Function `offer`](#0x3_token_transfers_offer)
- [Function `claim_script`](#0x3_token_transfers_claim_script)
- [Function `claim`](#0x3_token_transfers_claim)
- [Function `cancel_offer_script`](#0x3_token_transfers_cancel_offer_script)
- [Function `cancel_offer`](#0x3_token_transfers_cancel_offer)

```move
module 0x3::token_transfers {
    use 0x1::account;
    use 0x1::error;
    use 0x1::event;
    use 0x1::features;
    use 0x1::signer;
    use 0x1::string;
    use 0x1::table;
    use 0x3::token;
}
```

<a id="0x3_token_transfers_PendingClaims"></a>

## Resource `PendingClaims`

```move
module 0x3::token_transfers {
    struct PendingClaims has key
}
```

<a id="0x3_token_transfers_TokenOfferId"></a>

## Struct `TokenOfferId`

```move
module 0x3::token_transfers {
    #[event]
    struct TokenOfferId has copy, drop, store
}
```

<a id="0x3_token_transfers_TokenOffer"></a>

## Struct `TokenOffer`

```move
module 0x3::token_transfers {
    #[event]
    struct TokenOffer has drop, store
}
```

<a id="0x3_token_transfers_TokenOfferEvent"></a>

## Struct `TokenOfferEvent`

```move
module 0x3::token_transfers {
    #[event]
    struct TokenOfferEvent has drop, store
}
```

<a id="0x3_token_transfers_TokenCancelOfferEvent"></a>

## Struct `TokenCancelOfferEvent`

```move
module 0x3::token_transfers {
    #[event]
    struct TokenCancelOfferEvent has drop, store
}
```

<a id="0x3_token_transfers_TokenCancelOffer"></a>

## Struct `TokenCancelOffer`

```move
module 0x3::token_transfers {
    #[event]
    struct TokenCancelOffer has drop, store
}
```

<a id="0x3_token_transfers_TokenClaimEvent"></a>

## Struct `TokenClaimEvent`

```move
module 0x3::token_transfers {
    #[event]
    struct TokenClaimEvent has drop, store
}
```

<a id="0x3_token_transfers_TokenClaim"></a>

## Struct `TokenClaim`

```move
module 0x3::token_transfers {
    #[event]
    struct TokenClaim has drop, store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x3_token_transfers_ETOKEN_OFFER_NOT_EXIST"></a>

Token offer doesn&apos;t exist

```move
module 0x3::token_transfers {
    const ETOKEN_OFFER_NOT_EXIST: u64 = 1;
}
```

<a id="0x3_token_transfers_offer_script"></a>

## Function `offer_script`

```move
module 0x3::token_transfers {
    public entry fun offer_script(sender: signer, receiver: address, creator: address, collection: string::String, name: string::String, property_version: u64, amount: u64)
}
```

<a id="0x3_token_transfers_offer"></a>

## Function `offer`

```move
module 0x3::token_transfers {
    public fun offer(sender: &signer, receiver: address, token_id: token::TokenId, amount: u64)
}
```

<a id="0x3_token_transfers_claim_script"></a>

## Function `claim_script`

```move
module 0x3::token_transfers {
    public entry fun claim_script(receiver: signer, sender: address, creator: address, collection: string::String, name: string::String, property_version: u64)
}
```

<a id="0x3_token_transfers_claim"></a>

## Function `claim`

```move
module 0x3::token_transfers {
    public fun claim(receiver: &signer, sender: address, token_id: token::TokenId)
}
```

<a id="0x3_token_transfers_cancel_offer_script"></a>

## Function `cancel_offer_script`

```move
module 0x3::token_transfers {
    public entry fun cancel_offer_script(sender: signer, receiver: address, creator: address, collection: string::String, name: string::String, property_version: u64)
}
```

<a id="0x3_token_transfers_cancel_offer"></a>

## Function `cancel_offer`

```move
module 0x3::token_transfers {
    public fun cancel_offer(sender: &signer, receiver: address, token_id: token::TokenId)
}
```
