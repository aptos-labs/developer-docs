<a id="0x3_token"></a>

# Module `0x3::token`

This module provides the foundation for Tokens.
Checkout our developer doc on our token standard https://aptos.dev/standards

- [Struct `Token`](#0x3_token_Token)
- [Struct `TokenId`](#0x3_token_TokenId)
- [Struct `TokenDataId`](#0x3_token_TokenDataId)
- [Struct `TokenData`](#0x3_token_TokenData)
- [Struct `Royalty`](#0x3_token_Royalty)
- [Struct `TokenMutabilityConfig`](#0x3_token_TokenMutabilityConfig)
- [Resource `TokenStore`](#0x3_token_TokenStore)
- [Struct `CollectionMutabilityConfig`](#0x3_token_CollectionMutabilityConfig)
- [Resource `Collections`](#0x3_token_Collections)
- [Struct `CollectionData`](#0x3_token_CollectionData)
- [Struct `WithdrawCapability`](#0x3_token_WithdrawCapability)
- [Struct `DepositEvent`](#0x3_token_DepositEvent)
- [Struct `Deposit`](#0x3_token_Deposit)
- [Struct `WithdrawEvent`](#0x3_token_WithdrawEvent)
- [Struct `Withdraw`](#0x3_token_Withdraw)
- [Struct `CreateTokenDataEvent`](#0x3_token_CreateTokenDataEvent)
- [Struct `CreateTokenData`](#0x3_token_CreateTokenData)
- [Struct `MintTokenEvent`](#0x3_token_MintTokenEvent)
- [Struct `MintToken`](#0x3_token_MintToken)
- [Struct `BurnTokenEvent`](#0x3_token_BurnTokenEvent)
- [Struct `BurnToken`](#0x3_token_BurnToken)
- [Struct `MutateTokenPropertyMapEvent`](#0x3_token_MutateTokenPropertyMapEvent)
- [Struct `MutateTokenPropertyMap`](#0x3_token_MutateTokenPropertyMap)
- [Struct `CreateCollectionEvent`](#0x3_token_CreateCollectionEvent)
- [Struct `CreateCollection`](#0x3_token_CreateCollection)
- [Constants](#@Constants_0)
- [Function `create_collection_script`](#0x3_token_create_collection_script)
- [Function `create_token_script`](#0x3_token_create_token_script)
- [Function `mint_script`](#0x3_token_mint_script)
- [Function `mutate_token_properties`](#0x3_token_mutate_token_properties)
- [Function `direct_transfer_script`](#0x3_token_direct_transfer_script)
- [Function `opt_in_direct_transfer`](#0x3_token_opt_in_direct_transfer)
- [Function `transfer_with_opt_in`](#0x3_token_transfer_with_opt_in)
- [Function `burn_by_creator`](#0x3_token_burn_by_creator)
- [Function `burn`](#0x3_token_burn)
- [Function `mutate_collection_description`](#0x3_token_mutate_collection_description)
- [Function `mutate_collection_uri`](#0x3_token_mutate_collection_uri)
- [Function `mutate_collection_maximum`](#0x3_token_mutate_collection_maximum)
- [Function `mutate_tokendata_maximum`](#0x3_token_mutate_tokendata_maximum)
- [Function `mutate_tokendata_uri`](#0x3_token_mutate_tokendata_uri)
- [Function `mutate_tokendata_royalty`](#0x3_token_mutate_tokendata_royalty)
- [Function `mutate_tokendata_description`](#0x3_token_mutate_tokendata_description)
- [Function `mutate_tokendata_property`](#0x3_token_mutate_tokendata_property)
- [Function `mutate_one_token`](#0x3_token_mutate_one_token)
- [Function `create_royalty`](#0x3_token_create_royalty)
- [Function `deposit_token`](#0x3_token_deposit_token)
- [Function `direct_deposit_with_opt_in`](#0x3_token_direct_deposit_with_opt_in)
- [Function `direct_transfer`](#0x3_token_direct_transfer)
- [Function `initialize_token_store`](#0x3_token_initialize_token_store)
- [Function `merge`](#0x3_token_merge)
- [Function `split`](#0x3_token_split)
- [Function `token_id`](#0x3_token_token_id)
- [Function `transfer`](#0x3_token_transfer)
- [Function `create_withdraw_capability`](#0x3_token_create_withdraw_capability)
- [Function `withdraw_with_capability`](#0x3_token_withdraw_with_capability)
- [Function `partial_withdraw_with_capability`](#0x3_token_partial_withdraw_with_capability)
- [Function `withdraw_token`](#0x3_token_withdraw_token)
- [Function `create_collection`](#0x3_token_create_collection)
- [Function `check_collection_exists`](#0x3_token_check_collection_exists)
- [Function `check_tokendata_exists`](#0x3_token_check_tokendata_exists)
- [Function `create_tokendata`](#0x3_token_create_tokendata)
- [Function `get_collection_supply`](#0x3_token_get_collection_supply)
- [Function `get_collection_description`](#0x3_token_get_collection_description)
- [Function `get_collection_uri`](#0x3_token_get_collection_uri)
- [Function `get_collection_maximum`](#0x3_token_get_collection_maximum)
- [Function `get_token_supply`](#0x3_token_get_token_supply)
- [Function `get_tokendata_largest_property_version`](#0x3_token_get_tokendata_largest_property_version)
- [Function `get_token_id`](#0x3_token_get_token_id)
- [Function `get_direct_transfer`](#0x3_token_get_direct_transfer)
- [Function `create_token_mutability_config`](#0x3_token_create_token_mutability_config)
- [Function `create_collection_mutability_config`](#0x3_token_create_collection_mutability_config)
- [Function `mint_token`](#0x3_token_mint_token)
- [Function `mint_token_to`](#0x3_token_mint_token_to)
- [Function `create_token_id`](#0x3_token_create_token_id)
- [Function `create_token_data_id`](#0x3_token_create_token_data_id)
- [Function `create_token_id_raw`](#0x3_token_create_token_id_raw)
- [Function `balance_of`](#0x3_token_balance_of)
- [Function `has_token_store`](#0x3_token_has_token_store)
- [Function `get_royalty`](#0x3_token_get_royalty)
- [Function `get_royalty_numerator`](#0x3_token_get_royalty_numerator)
- [Function `get_royalty_denominator`](#0x3_token_get_royalty_denominator)
- [Function `get_royalty_payee`](#0x3_token_get_royalty_payee)
- [Function `get_token_amount`](#0x3_token_get_token_amount)
- [Function `get_token_id_fields`](#0x3_token_get_token_id_fields)
- [Function `get_token_data_id_fields`](#0x3_token_get_token_data_id_fields)
- [Function `get_property_map`](#0x3_token_get_property_map)
- [Function `get_tokendata_maximum`](#0x3_token_get_tokendata_maximum)
- [Function `get_tokendata_uri`](#0x3_token_get_tokendata_uri)
- [Function `get_tokendata_description`](#0x3_token_get_tokendata_description)
- [Function `get_tokendata_royalty`](#0x3_token_get_tokendata_royalty)
- [Function `get_tokendata_id`](#0x3_token_get_tokendata_id)
- [Function `get_tokendata_mutability_config`](#0x3_token_get_tokendata_mutability_config)
- [Function `get_token_mutability_maximum`](#0x3_token_get_token_mutability_maximum)
- [Function `get_token_mutability_royalty`](#0x3_token_get_token_mutability_royalty)
- [Function `get_token_mutability_uri`](#0x3_token_get_token_mutability_uri)
- [Function `get_token_mutability_description`](#0x3_token_get_token_mutability_description)
- [Function `get_token_mutability_default_properties`](#0x3_token_get_token_mutability_default_properties)
- [Function `get_collection_mutability_config`](#0x3_token_get_collection_mutability_config)
- [Function `get_collection_mutability_description`](#0x3_token_get_collection_mutability_description)
- [Function `get_collection_mutability_uri`](#0x3_token_get_collection_mutability_uri)
- [Function `get_collection_mutability_maximum`](#0x3_token_get_collection_mutability_maximum)
- [Function `initialize_token_script`](#0x3_token_initialize_token_script)
- [Function `initialize_token`](#0x3_token_initialize_token)

```move
module 0x3::token {
    use 0x1::account;
    use 0x1::error;
    use 0x1::event;
    use 0x1::features;
    use 0x1::option;
    use 0x1::signer;
    use 0x1::string;
    use 0x1::table;
    use 0x1::timestamp;
    use 0x3::property_map;
    use 0x3::token_event_store;
}
```

<a id="0x3_token_Token"></a>

## Struct `Token`

```move
module 0x3::token {
    struct Token has store
}
```

<a id="0x3_token_TokenId"></a>

## Struct `TokenId`

global unique identifier of a token

```move
module 0x3::token {
    struct TokenId has copy, drop, store
}
```

<a id="0x3_token_TokenDataId"></a>

## Struct `TokenDataId`

globally unique identifier of tokendata

```move
module 0x3::token {
    struct TokenDataId has copy, drop, store
}
```

<a id="0x3_token_TokenData"></a>

## Struct `TokenData`

The shared TokenData by tokens with different property_version

```move
module 0x3::token {
    struct TokenData has store
}
```

<a id="0x3_token_Royalty"></a>

## Struct `Royalty`

The royalty of a token

```move
module 0x3::token {
    struct Royalty has copy, drop, store
}
```

<a id="0x3_token_TokenMutabilityConfig"></a>

## Struct `TokenMutabilityConfig`

This config specifies which fields in the TokenData are mutable

```move
module 0x3::token {
    struct TokenMutabilityConfig has copy, drop, store
}
```

<a id="0x3_token_TokenStore"></a>

## Resource `TokenStore`

Represents token resources owned by token owner

```move
module 0x3::token {
    struct TokenStore has key
}
```

<a id="0x3_token_CollectionMutabilityConfig"></a>

## Struct `CollectionMutabilityConfig`

This config specifies which fields in the Collection are mutable

```move
module 0x3::token {
    struct CollectionMutabilityConfig has copy, drop, store
}
```

<a id="0x3_token_Collections"></a>

## Resource `Collections`

Represent collection and token metadata for a creator

```move
module 0x3::token {
    struct Collections has key
}
```

<a id="0x3_token_CollectionData"></a>

## Struct `CollectionData`

Represent the collection metadata

```move
module 0x3::token {
    struct CollectionData has store
}
```

<a id="0x3_token_WithdrawCapability"></a>

## Struct `WithdrawCapability`

capability to withdraw without signer, this struct should be non&#45;copyable

```move
module 0x3::token {
    struct WithdrawCapability has drop, store
}
```

<a id="0x3_token_DepositEvent"></a>

## Struct `DepositEvent`

Set of data sent to the event stream during a receive

```move
module 0x3::token {
    struct DepositEvent has drop, store
}
```

<a id="0x3_token_Deposit"></a>

## Struct `Deposit`

Set of data sent to the event stream during a receive

```move
module 0x3::token {
    #[event]
    struct Deposit has drop, store
}
```

<a id="0x3_token_WithdrawEvent"></a>

## Struct `WithdrawEvent`

Set of data sent to the event stream during a withdrawal

```move
module 0x3::token {
    struct WithdrawEvent has drop, store
}
```

<a id="0x3_token_Withdraw"></a>

## Struct `Withdraw`

Set of data sent to the event stream during a withdrawal

```move
module 0x3::token {
    #[event]
    struct Withdraw has drop, store
}
```

<a id="0x3_token_CreateTokenDataEvent"></a>

## Struct `CreateTokenDataEvent`

token creation event id of token created

```move
module 0x3::token {
    struct CreateTokenDataEvent has drop, store
}
```

<a id="0x3_token_CreateTokenData"></a>

## Struct `CreateTokenData`

```move
module 0x3::token {
    #[event]
    struct CreateTokenData has drop, store
}
```

<a id="0x3_token_MintTokenEvent"></a>

## Struct `MintTokenEvent`

mint token event. This event triggered when creator adds more supply to existing token

```move
module 0x3::token {
    struct MintTokenEvent has drop, store
}
```

<a id="0x3_token_MintToken"></a>

## Struct `MintToken`

```move
module 0x3::token {
    #[event]
    struct MintToken has drop, store
}
```

<a id="0x3_token_BurnTokenEvent"></a>

## Struct `BurnTokenEvent`

```move
module 0x3::token {
    struct BurnTokenEvent has drop, store
}
```

<a id="0x3_token_BurnToken"></a>

## Struct `BurnToken`

```move
module 0x3::token {
    #[event]
    struct BurnToken has drop, store
}
```

<a id="0x3_token_MutateTokenPropertyMapEvent"></a>

## Struct `MutateTokenPropertyMapEvent`

```move
module 0x3::token {
    struct MutateTokenPropertyMapEvent has drop, store
}
```

<a id="0x3_token_MutateTokenPropertyMap"></a>

## Struct `MutateTokenPropertyMap`

```move
module 0x3::token {
    #[event]
    struct MutateTokenPropertyMap has drop, store
}
```

<a id="0x3_token_CreateCollectionEvent"></a>

## Struct `CreateCollectionEvent`

create collection event with creator address and collection name

```move
module 0x3::token {
    struct CreateCollectionEvent has drop, store
}
```

<a id="0x3_token_CreateCollection"></a>

## Struct `CreateCollection`

```move
module 0x3::token {
    #[event]
    struct CreateCollection has drop, store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x3_token_EINSUFFICIENT_BALANCE"></a>

Insufficient token balance

```move
module 0x3::token {
    const EINSUFFICIENT_BALANCE: u64 = 5;
}
```

<a id="0x3_token_EURI_TOO_LONG"></a>

The URI is too long

```move
module 0x3::token {
    const EURI_TOO_LONG: u64 = 27;
}
```

<a id="0x3_token_MAX_URI_LENGTH"></a>

```move
module 0x3::token {
    const MAX_URI_LENGTH: u64 = 512;
}
```

<a id="0x3_token_BURNABLE_BY_CREATOR"></a>

```move
module 0x3::token {
    const BURNABLE_BY_CREATOR: vector<u8> = [84, 79, 75, 69, 78, 95, 66, 85, 82, 78, 65, 66, 76, 69, 95, 66, 89, 95, 67, 82, 69, 65, 84, 79, 82];
}
```

<a id="0x3_token_BURNABLE_BY_OWNER"></a>

```move
module 0x3::token {
    const BURNABLE_BY_OWNER: vector<u8> = [84, 79, 75, 69, 78, 95, 66, 85, 82, 78, 65, 66, 76, 69, 95, 66, 89, 95, 79, 87, 78, 69, 82];
}
```

<a id="0x3_token_COLLECTION_DESCRIPTION_MUTABLE_IND"></a>

```move
module 0x3::token {
    const COLLECTION_DESCRIPTION_MUTABLE_IND: u64 = 0;
}
```

<a id="0x3_token_COLLECTION_MAX_MUTABLE_IND"></a>

```move
module 0x3::token {
    const COLLECTION_MAX_MUTABLE_IND: u64 = 2;
}
```

<a id="0x3_token_COLLECTION_URI_MUTABLE_IND"></a>

```move
module 0x3::token {
    const COLLECTION_URI_MUTABLE_IND: u64 = 1;
}
```

<a id="0x3_token_EALREADY_HAS_BALANCE"></a>

The token has balance and cannot be initialized

```move
module 0x3::token {
    const EALREADY_HAS_BALANCE: u64 = 0;
}
```

<a id="0x3_token_ECANNOT_UPDATE_RESERVED_PROPERTY"></a>

Reserved fields for token contract
Cannot be updated by user

```move
module 0x3::token {
    const ECANNOT_UPDATE_RESERVED_PROPERTY: u64 = 32;
}
```

<a id="0x3_token_ECOLLECTIONS_NOT_PUBLISHED"></a>

There isn&apos;t any collection under this account

```move
module 0x3::token {
    const ECOLLECTIONS_NOT_PUBLISHED: u64 = 1;
}
```

<a id="0x3_token_ECOLLECTION_ALREADY_EXISTS"></a>

The collection already exists

```move
module 0x3::token {
    const ECOLLECTION_ALREADY_EXISTS: u64 = 3;
}
```

<a id="0x3_token_ECOLLECTION_NAME_TOO_LONG"></a>

The collection name is too long

```move
module 0x3::token {
    const ECOLLECTION_NAME_TOO_LONG: u64 = 25;
}
```

<a id="0x3_token_ECOLLECTION_NOT_PUBLISHED"></a>

Cannot find collection in creator&apos;s account

```move
module 0x3::token {
    const ECOLLECTION_NOT_PUBLISHED: u64 = 2;
}
```

<a id="0x3_token_ECREATE_WOULD_EXCEED_COLLECTION_MAXIMUM"></a>

Exceeds the collection&apos;s maximal number of token_data

```move
module 0x3::token {
    const ECREATE_WOULD_EXCEED_COLLECTION_MAXIMUM: u64 = 4;
}
```

<a id="0x3_token_ECREATOR_CANNOT_BURN_TOKEN"></a>

Token is not burnable by creator

```move
module 0x3::token {
    const ECREATOR_CANNOT_BURN_TOKEN: u64 = 31;
}
```

<a id="0x3_token_EFIELD_NOT_MUTABLE"></a>

The field is not mutable

```move
module 0x3::token {
    const EFIELD_NOT_MUTABLE: u64 = 13;
}
```

<a id="0x3_token_EINSUFFICIENT_WITHDRAW_CAPABILITY_AMOUNT"></a>

Withdraw capability doesn&apos;t have sufficient amount

```move
module 0x3::token {
    const EINSUFFICIENT_WITHDRAW_CAPABILITY_AMOUNT: u64 = 38;
}
```

<a id="0x3_token_EINVALID_MAXIMUM"></a>

Collection or tokendata maximum must be larger than supply

```move
module 0x3::token {
    const EINVALID_MAXIMUM: u64 = 36;
}
```

<a id="0x3_token_EINVALID_ROYALTY_NUMERATOR_DENOMINATOR"></a>

Royalty invalid if the numerator is larger than the denominator

```move
module 0x3::token {
    const EINVALID_ROYALTY_NUMERATOR_DENOMINATOR: u64 = 34;
}
```

<a id="0x3_token_EINVALID_TOKEN_MERGE"></a>

Cannot merge the two tokens with different token id

```move
module 0x3::token {
    const EINVALID_TOKEN_MERGE: u64 = 6;
}
```

<a id="0x3_token_EMINT_WOULD_EXCEED_TOKEN_MAXIMUM"></a>

Exceed the token data maximal allowed

```move
module 0x3::token {
    const EMINT_WOULD_EXCEED_TOKEN_MAXIMUM: u64 = 7;
}
```

<a id="0x3_token_ENFT_NAME_TOO_LONG"></a>

The NFT name is too long

```move
module 0x3::token {
    const ENFT_NAME_TOO_LONG: u64 = 26;
}
```

<a id="0x3_token_ENFT_NOT_SPLITABLE"></a>

Cannot split a token that only has 1 amount

```move
module 0x3::token {
    const ENFT_NOT_SPLITABLE: u64 = 18;
}
```

<a id="0x3_token_ENO_BURN_CAPABILITY"></a>

No burn capability

```move
module 0x3::token {
    const ENO_BURN_CAPABILITY: u64 = 8;
}
```

<a id="0x3_token_ENO_BURN_TOKEN_WITH_ZERO_AMOUNT"></a>

Cannot burn 0 Token

```move
module 0x3::token {
    const ENO_BURN_TOKEN_WITH_ZERO_AMOUNT: u64 = 29;
}
```

<a id="0x3_token_ENO_DEPOSIT_TOKEN_WITH_ZERO_AMOUNT"></a>

Cannot deposit a Token with 0 amount

```move
module 0x3::token {
    const ENO_DEPOSIT_TOKEN_WITH_ZERO_AMOUNT: u64 = 28;
}
```

<a id="0x3_token_ENO_MINT_CAPABILITY"></a>

No mint capability

```move
module 0x3::token {
    const ENO_MINT_CAPABILITY: u64 = 19;
}
```

<a id="0x3_token_ENO_MUTATE_CAPABILITY"></a>

Not authorized to mutate

```move
module 0x3::token {
    const ENO_MUTATE_CAPABILITY: u64 = 14;
}
```

<a id="0x3_token_ENO_TOKEN_IN_TOKEN_STORE"></a>

Token not in the token store

```move
module 0x3::token {
    const ENO_TOKEN_IN_TOKEN_STORE: u64 = 15;
}
```

<a id="0x3_token_EOWNER_CANNOT_BURN_TOKEN"></a>

Token is not burnable by owner

```move
module 0x3::token {
    const EOWNER_CANNOT_BURN_TOKEN: u64 = 30;
}
```

<a id="0x3_token_EPROPERTY_RESERVED_BY_STANDARD"></a>

The property is reserved by token standard

```move
module 0x3::token {
    const EPROPERTY_RESERVED_BY_STANDARD: u64 = 40;
}
```

<a id="0x3_token_EROYALTY_PAYEE_ACCOUNT_DOES_NOT_EXIST"></a>

Royalty payee account does not exist

```move
module 0x3::token {
    const EROYALTY_PAYEE_ACCOUNT_DOES_NOT_EXIST: u64 = 35;
}
```

<a id="0x3_token_ETOKEN_CANNOT_HAVE_ZERO_AMOUNT"></a>

TOKEN with 0 amount is not allowed

```move
module 0x3::token {
    const ETOKEN_CANNOT_HAVE_ZERO_AMOUNT: u64 = 33;
}
```

<a id="0x3_token_ETOKEN_DATA_ALREADY_EXISTS"></a>

TokenData already exists

```move
module 0x3::token {
    const ETOKEN_DATA_ALREADY_EXISTS: u64 = 9;
}
```

<a id="0x3_token_ETOKEN_DATA_NOT_PUBLISHED"></a>

TokenData not published

```move
module 0x3::token {
    const ETOKEN_DATA_NOT_PUBLISHED: u64 = 10;
}
```

<a id="0x3_token_ETOKEN_PROPERTIES_COUNT_NOT_MATCH"></a>

Token Properties count doesn&apos;t match

```move
module 0x3::token {
    const ETOKEN_PROPERTIES_COUNT_NOT_MATCH: u64 = 37;
}
```

<a id="0x3_token_ETOKEN_SPLIT_AMOUNT_LARGER_OR_EQUAL_TO_TOKEN_AMOUNT"></a>

Cannot split token to an amount larger than its amount

```move
module 0x3::token {
    const ETOKEN_SPLIT_AMOUNT_LARGER_OR_EQUAL_TO_TOKEN_AMOUNT: u64 = 12;
}
```

<a id="0x3_token_ETOKEN_STORE_NOT_PUBLISHED"></a>

TokenStore doesn&apos;t exist

```move
module 0x3::token {
    const ETOKEN_STORE_NOT_PUBLISHED: u64 = 11;
}
```

<a id="0x3_token_EUSER_NOT_OPT_IN_DIRECT_TRANSFER"></a>

User didn&apos;t opt&#45;in direct transfer

```move
module 0x3::token {
    const EUSER_NOT_OPT_IN_DIRECT_TRANSFER: u64 = 16;
}
```

<a id="0x3_token_EWITHDRAW_PROOF_EXPIRES"></a>

Withdraw proof expires

```move
module 0x3::token {
    const EWITHDRAW_PROOF_EXPIRES: u64 = 39;
}
```

<a id="0x3_token_EWITHDRAW_ZERO"></a>

Cannot withdraw 0 token

```move
module 0x3::token {
    const EWITHDRAW_ZERO: u64 = 17;
}
```

<a id="0x3_token_MAX_COLLECTION_NAME_LENGTH"></a>

```move
module 0x3::token {
    const MAX_COLLECTION_NAME_LENGTH: u64 = 128;
}
```

<a id="0x3_token_MAX_NFT_NAME_LENGTH"></a>

```move
module 0x3::token {
    const MAX_NFT_NAME_LENGTH: u64 = 128;
}
```

<a id="0x3_token_TOKEN_DESCRIPTION_MUTABLE_IND"></a>

```move
module 0x3::token {
    const TOKEN_DESCRIPTION_MUTABLE_IND: u64 = 3;
}
```

<a id="0x3_token_TOKEN_MAX_MUTABLE_IND"></a>

```move
module 0x3::token {
    const TOKEN_MAX_MUTABLE_IND: u64 = 0;
}
```

<a id="0x3_token_TOKEN_PROPERTY_MUTABLE"></a>

```move
module 0x3::token {
    const TOKEN_PROPERTY_MUTABLE: vector<u8> = [84, 79, 75, 69, 78, 95, 80, 82, 79, 80, 69, 82, 84, 89, 95, 77, 85, 84, 65, 84, 66, 76, 69];
}
```

<a id="0x3_token_TOKEN_PROPERTY_MUTABLE_IND"></a>

```move
module 0x3::token {
    const TOKEN_PROPERTY_MUTABLE_IND: u64 = 4;
}
```

<a id="0x3_token_TOKEN_PROPERTY_VALUE_MUTABLE_IND"></a>

```move
module 0x3::token {
    const TOKEN_PROPERTY_VALUE_MUTABLE_IND: u64 = 5;
}
```

<a id="0x3_token_TOKEN_ROYALTY_MUTABLE_IND"></a>

```move
module 0x3::token {
    const TOKEN_ROYALTY_MUTABLE_IND: u64 = 2;
}
```

<a id="0x3_token_TOKEN_URI_MUTABLE_IND"></a>

```move
module 0x3::token {
    const TOKEN_URI_MUTABLE_IND: u64 = 1;
}
```

<a id="0x3_token_create_collection_script"></a>

## Function `create_collection_script`

create a empty token collection with parameters

```move
module 0x3::token {
    public entry fun create_collection_script(creator: &signer, name: string::String, description: string::String, uri: string::String, maximum: u64, mutate_setting: vector<bool>)
}
```

<a id="0x3_token_create_token_script"></a>

## Function `create_token_script`

create token with raw inputs

```move
module 0x3::token {
    public entry fun create_token_script(account: &signer, collection: string::String, name: string::String, description: string::String, balance: u64, maximum: u64, uri: string::String, royalty_payee_address: address, royalty_points_denominator: u64, royalty_points_numerator: u64, mutate_setting: vector<bool>, property_keys: vector<string::String>, property_values: vector<vector<u8>>, property_types: vector<string::String>)
}
```

<a id="0x3_token_mint_script"></a>

## Function `mint_script`

Mint more token from an existing token_data. Mint only adds more token to property_version 0

```move
module 0x3::token {
    public entry fun mint_script(account: &signer, token_data_address: address, collection: string::String, name: string::String, amount: u64)
}
```

<a id="0x3_token_mutate_token_properties"></a>

## Function `mutate_token_properties`

mutate the token property and save the new property in TokenStore
if the token property_version is 0, we will create a new property_version per token to generate a new token_id per token
if the token property_version is not 0, we will just update the propertyMap and use the existing token_id (property_version)

```move
module 0x3::token {
    public entry fun mutate_token_properties(account: &signer, token_owner: address, creator: address, collection_name: string::String, token_name: string::String, token_property_version: u64, amount: u64, keys: vector<string::String>, values: vector<vector<u8>>, types: vector<string::String>)
}
```

<a id="0x3_token_direct_transfer_script"></a>

## Function `direct_transfer_script`

```move
module 0x3::token {
    public entry fun direct_transfer_script(sender: &signer, receiver: &signer, creators_address: address, collection: string::String, name: string::String, property_version: u64, amount: u64)
}
```

<a id="0x3_token_opt_in_direct_transfer"></a>

## Function `opt_in_direct_transfer`

```move
module 0x3::token {
    public entry fun opt_in_direct_transfer(account: &signer, opt_in: bool)
}
```

<a id="0x3_token_transfer_with_opt_in"></a>

## Function `transfer_with_opt_in`

Transfers `amount` of tokens from `from` to `to`.
The receiver `to` has to opt&#45;in direct transfer first

```move
module 0x3::token {
    public entry fun transfer_with_opt_in(from: &signer, creator: address, collection_name: string::String, token_name: string::String, token_property_version: u64, to: address, amount: u64)
}
```

<a id="0x3_token_burn_by_creator"></a>

## Function `burn_by_creator`

Burn a token by creator when the token&apos;s BURNABLE_BY_CREATOR is true
The token is owned at address owner

```move
module 0x3::token {
    public entry fun burn_by_creator(creator: &signer, owner: address, collection: string::String, name: string::String, property_version: u64, amount: u64)
}
```

<a id="0x3_token_burn"></a>

## Function `burn`

Burn a token by the token owner

```move
module 0x3::token {
    public entry fun burn(owner: &signer, creators_address: address, collection: string::String, name: string::String, property_version: u64, amount: u64)
}
```

<a id="0x3_token_mutate_collection_description"></a>

## Function `mutate_collection_description`

```move
module 0x3::token {
    public fun mutate_collection_description(creator: &signer, collection_name: string::String, description: string::String)
}
```

<a id="0x3_token_mutate_collection_uri"></a>

## Function `mutate_collection_uri`

```move
module 0x3::token {
    public fun mutate_collection_uri(creator: &signer, collection_name: string::String, uri: string::String)
}
```

<a id="0x3_token_mutate_collection_maximum"></a>

## Function `mutate_collection_maximum`

```move
module 0x3::token {
    public fun mutate_collection_maximum(creator: &signer, collection_name: string::String, maximum: u64)
}
```

<a id="0x3_token_mutate_tokendata_maximum"></a>

## Function `mutate_tokendata_maximum`

```move
module 0x3::token {
    public fun mutate_tokendata_maximum(creator: &signer, token_data_id: token::TokenDataId, maximum: u64)
}
```

<a id="0x3_token_mutate_tokendata_uri"></a>

## Function `mutate_tokendata_uri`

```move
module 0x3::token {
    public fun mutate_tokendata_uri(creator: &signer, token_data_id: token::TokenDataId, uri: string::String)
}
```

<a id="0x3_token_mutate_tokendata_royalty"></a>

## Function `mutate_tokendata_royalty`

```move
module 0x3::token {
    public fun mutate_tokendata_royalty(creator: &signer, token_data_id: token::TokenDataId, royalty: token::Royalty)
}
```

<a id="0x3_token_mutate_tokendata_description"></a>

## Function `mutate_tokendata_description`

```move
module 0x3::token {
    public fun mutate_tokendata_description(creator: &signer, token_data_id: token::TokenDataId, description: string::String)
}
```

<a id="0x3_token_mutate_tokendata_property"></a>

## Function `mutate_tokendata_property`

Allow creator to mutate the default properties in TokenData

```move
module 0x3::token {
    public fun mutate_tokendata_property(creator: &signer, token_data_id: token::TokenDataId, keys: vector<string::String>, values: vector<vector<u8>>, types: vector<string::String>)
}
```

<a id="0x3_token_mutate_one_token"></a>

## Function `mutate_one_token`

Mutate the token_properties of one token.

```move
module 0x3::token {
    public fun mutate_one_token(account: &signer, token_owner: address, token_id: token::TokenId, keys: vector<string::String>, values: vector<vector<u8>>, types: vector<string::String>): token::TokenId
}
```

<a id="0x3_token_create_royalty"></a>

## Function `create_royalty`

```move
module 0x3::token {
    public fun create_royalty(royalty_points_numerator: u64, royalty_points_denominator: u64, payee_address: address): token::Royalty
}
```

<a id="0x3_token_deposit_token"></a>

## Function `deposit_token`

Deposit the token balance into the owner&apos;s account and emit an event.

```move
module 0x3::token {
    public fun deposit_token(account: &signer, token: token::Token)
}
```

<a id="0x3_token_direct_deposit_with_opt_in"></a>

## Function `direct_deposit_with_opt_in`

direct deposit if user opt in direct transfer

```move
module 0x3::token {
    public fun direct_deposit_with_opt_in(account_addr: address, token: token::Token)
}
```

<a id="0x3_token_direct_transfer"></a>

## Function `direct_transfer`

```move
module 0x3::token {
    public fun direct_transfer(sender: &signer, receiver: &signer, token_id: token::TokenId, amount: u64)
}
```

<a id="0x3_token_initialize_token_store"></a>

## Function `initialize_token_store`

```move
module 0x3::token {
    public fun initialize_token_store(account: &signer)
}
```

<a id="0x3_token_merge"></a>

## Function `merge`

```move
module 0x3::token {
    public fun merge(dst_token: &mut token::Token, source_token: token::Token)
}
```

<a id="0x3_token_split"></a>

## Function `split`

```move
module 0x3::token {
    public fun split(dst_token: &mut token::Token, amount: u64): token::Token
}
```

<a id="0x3_token_token_id"></a>

## Function `token_id`

```move
module 0x3::token {
    public fun token_id(token: &token::Token): &token::TokenId
}
```

<a id="0x3_token_transfer"></a>

## Function `transfer`

Transfers `amount` of tokens from `from` to `to`.

```move
module 0x3::token {
    public fun transfer(from: &signer, id: token::TokenId, to: address, amount: u64)
}
```

<a id="0x3_token_create_withdraw_capability"></a>

## Function `create_withdraw_capability`

Token owner can create this one&#45;time withdraw capability with an expiration time

```move
module 0x3::token {
    public fun create_withdraw_capability(owner: &signer, token_id: token::TokenId, amount: u64, expiration_sec: u64): token::WithdrawCapability
}
```

<a id="0x3_token_withdraw_with_capability"></a>

## Function `withdraw_with_capability`

Withdraw the token with a capability

```move
module 0x3::token {
    public fun withdraw_with_capability(withdraw_proof: token::WithdrawCapability): token::Token
}
```

<a id="0x3_token_partial_withdraw_with_capability"></a>

## Function `partial_withdraw_with_capability`

Withdraw the token with a capability.

```move
module 0x3::token {
    public fun partial_withdraw_with_capability(withdraw_proof: token::WithdrawCapability, withdraw_amount: u64): (token::Token, option::Option<token::WithdrawCapability>)
}
```

<a id="0x3_token_withdraw_token"></a>

## Function `withdraw_token`

```move
module 0x3::token {
    public fun withdraw_token(account: &signer, id: token::TokenId, amount: u64): token::Token
}
```

<a id="0x3_token_create_collection"></a>

## Function `create_collection`

Create a new collection to hold tokens

```move
module 0x3::token {
    public fun create_collection(creator: &signer, name: string::String, description: string::String, uri: string::String, maximum: u64, mutate_setting: vector<bool>)
}
```

<a id="0x3_token_check_collection_exists"></a>

## Function `check_collection_exists`

```move
module 0x3::token {
    public fun check_collection_exists(creator: address, name: string::String): bool
}
```

<a id="0x3_token_check_tokendata_exists"></a>

## Function `check_tokendata_exists`

```move
module 0x3::token {
    public fun check_tokendata_exists(creator: address, collection_name: string::String, token_name: string::String): bool
}
```

<a id="0x3_token_create_tokendata"></a>

## Function `create_tokendata`

```move
module 0x3::token {
    public fun create_tokendata(account: &signer, collection: string::String, name: string::String, description: string::String, maximum: u64, uri: string::String, royalty_payee_address: address, royalty_points_denominator: u64, royalty_points_numerator: u64, token_mutate_config: token::TokenMutabilityConfig, property_keys: vector<string::String>, property_values: vector<vector<u8>>, property_types: vector<string::String>): token::TokenDataId
}
```

<a id="0x3_token_get_collection_supply"></a>

## Function `get_collection_supply`

return the number of distinct token_data_id created under this collection

```move
module 0x3::token {
    public fun get_collection_supply(creator_address: address, collection_name: string::String): option::Option<u64>
}
```

<a id="0x3_token_get_collection_description"></a>

## Function `get_collection_description`

```move
module 0x3::token {
    public fun get_collection_description(creator_address: address, collection_name: string::String): string::String
}
```

<a id="0x3_token_get_collection_uri"></a>

## Function `get_collection_uri`

```move
module 0x3::token {
    public fun get_collection_uri(creator_address: address, collection_name: string::String): string::String
}
```

<a id="0x3_token_get_collection_maximum"></a>

## Function `get_collection_maximum`

```move
module 0x3::token {
    public fun get_collection_maximum(creator_address: address, collection_name: string::String): u64
}
```

<a id="0x3_token_get_token_supply"></a>

## Function `get_token_supply`

return the number of distinct token_id created under this TokenData

```move
module 0x3::token {
    public fun get_token_supply(creator_address: address, token_data_id: token::TokenDataId): option::Option<u64>
}
```

<a id="0x3_token_get_tokendata_largest_property_version"></a>

## Function `get_tokendata_largest_property_version`

return the largest_property_version of this TokenData

```move
module 0x3::token {
    public fun get_tokendata_largest_property_version(creator_address: address, token_data_id: token::TokenDataId): u64
}
```

<a id="0x3_token_get_token_id"></a>

## Function `get_token_id`

return the TokenId for a given Token

```move
module 0x3::token {
    public fun get_token_id(token: &token::Token): token::TokenId
}
```

<a id="0x3_token_get_direct_transfer"></a>

## Function `get_direct_transfer`

```move
module 0x3::token {
    public fun get_direct_transfer(receiver: address): bool
}
```

<a id="0x3_token_create_token_mutability_config"></a>

## Function `create_token_mutability_config`

```move
module 0x3::token {
    public fun create_token_mutability_config(mutate_setting: &vector<bool>): token::TokenMutabilityConfig
}
```

<a id="0x3_token_create_collection_mutability_config"></a>

## Function `create_collection_mutability_config`

```move
module 0x3::token {
    public fun create_collection_mutability_config(mutate_setting: &vector<bool>): token::CollectionMutabilityConfig
}
```

<a id="0x3_token_mint_token"></a>

## Function `mint_token`

```move
module 0x3::token {
    public fun mint_token(account: &signer, token_data_id: token::TokenDataId, amount: u64): token::TokenId
}
```

<a id="0x3_token_mint_token_to"></a>

## Function `mint_token_to`

create tokens and directly deposite to receiver&apos;s address. The receiver should opt&#45;in direct transfer

```move
module 0x3::token {
    public fun mint_token_to(account: &signer, receiver: address, token_data_id: token::TokenDataId, amount: u64)
}
```

<a id="0x3_token_create_token_id"></a>

## Function `create_token_id`

```move
module 0x3::token {
    public fun create_token_id(token_data_id: token::TokenDataId, property_version: u64): token::TokenId
}
```

<a id="0x3_token_create_token_data_id"></a>

## Function `create_token_data_id`

```move
module 0x3::token {
    public fun create_token_data_id(creator: address, collection: string::String, name: string::String): token::TokenDataId
}
```

<a id="0x3_token_create_token_id_raw"></a>

## Function `create_token_id_raw`

```move
module 0x3::token {
    public fun create_token_id_raw(creator: address, collection: string::String, name: string::String, property_version: u64): token::TokenId
}
```

<a id="0x3_token_balance_of"></a>

## Function `balance_of`

```move
module 0x3::token {
    public fun balance_of(owner: address, id: token::TokenId): u64
}
```

<a id="0x3_token_has_token_store"></a>

## Function `has_token_store`

```move
module 0x3::token {
    public fun has_token_store(owner: address): bool
}
```

<a id="0x3_token_get_royalty"></a>

## Function `get_royalty`

```move
module 0x3::token {
    public fun get_royalty(token_id: token::TokenId): token::Royalty
}
```

<a id="0x3_token_get_royalty_numerator"></a>

## Function `get_royalty_numerator`

```move
module 0x3::token {
    public fun get_royalty_numerator(royalty: &token::Royalty): u64
}
```

<a id="0x3_token_get_royalty_denominator"></a>

## Function `get_royalty_denominator`

```move
module 0x3::token {
    public fun get_royalty_denominator(royalty: &token::Royalty): u64
}
```

<a id="0x3_token_get_royalty_payee"></a>

## Function `get_royalty_payee`

```move
module 0x3::token {
    public fun get_royalty_payee(royalty: &token::Royalty): address
}
```

<a id="0x3_token_get_token_amount"></a>

## Function `get_token_amount`

```move
module 0x3::token {
    public fun get_token_amount(token: &token::Token): u64
}
```

<a id="0x3_token_get_token_id_fields"></a>

## Function `get_token_id_fields`

return the creator address, collection name, token name and property_version

```move
module 0x3::token {
    public fun get_token_id_fields(token_id: &token::TokenId): (address, string::String, string::String, u64)
}
```

<a id="0x3_token_get_token_data_id_fields"></a>

## Function `get_token_data_id_fields`

```move
module 0x3::token {
    public fun get_token_data_id_fields(token_data_id: &token::TokenDataId): (address, string::String, string::String)
}
```

<a id="0x3_token_get_property_map"></a>

## Function `get_property_map`

return a copy of the token property map.
if property_version &#61; 0, return the default property map
if property_version &gt; 0, return the property value stored at owner&apos;s token store

```move
module 0x3::token {
    public fun get_property_map(owner: address, token_id: token::TokenId): property_map::PropertyMap
}
```

<a id="0x3_token_get_tokendata_maximum"></a>

## Function `get_tokendata_maximum`

```move
module 0x3::token {
    public fun get_tokendata_maximum(token_data_id: token::TokenDataId): u64
}
```

<a id="0x3_token_get_tokendata_uri"></a>

## Function `get_tokendata_uri`

```move
module 0x3::token {
    public fun get_tokendata_uri(creator: address, token_data_id: token::TokenDataId): string::String
}
```

<a id="0x3_token_get_tokendata_description"></a>

## Function `get_tokendata_description`

```move
module 0x3::token {
    public fun get_tokendata_description(token_data_id: token::TokenDataId): string::String
}
```

<a id="0x3_token_get_tokendata_royalty"></a>

## Function `get_tokendata_royalty`

```move
module 0x3::token {
    public fun get_tokendata_royalty(token_data_id: token::TokenDataId): token::Royalty
}
```

<a id="0x3_token_get_tokendata_id"></a>

## Function `get_tokendata_id`

return the token_data_id from the token_id

```move
module 0x3::token {
    public fun get_tokendata_id(token_id: token::TokenId): token::TokenDataId
}
```

<a id="0x3_token_get_tokendata_mutability_config"></a>

## Function `get_tokendata_mutability_config`

return the mutation setting of the token

```move
module 0x3::token {
    public fun get_tokendata_mutability_config(token_data_id: token::TokenDataId): token::TokenMutabilityConfig
}
```

<a id="0x3_token_get_token_mutability_maximum"></a>

## Function `get_token_mutability_maximum`

return if the token&apos;s maximum is mutable

```move
module 0x3::token {
    public fun get_token_mutability_maximum(config: &token::TokenMutabilityConfig): bool
}
```

<a id="0x3_token_get_token_mutability_royalty"></a>

## Function `get_token_mutability_royalty`

return if the token royalty is mutable with a token mutability config

```move
module 0x3::token {
    public fun get_token_mutability_royalty(config: &token::TokenMutabilityConfig): bool
}
```

<a id="0x3_token_get_token_mutability_uri"></a>

## Function `get_token_mutability_uri`

return if the token uri is mutable with a token mutability config

```move
module 0x3::token {
    public fun get_token_mutability_uri(config: &token::TokenMutabilityConfig): bool
}
```

<a id="0x3_token_get_token_mutability_description"></a>

## Function `get_token_mutability_description`

return if the token description is mutable with a token mutability config

```move
module 0x3::token {
    public fun get_token_mutability_description(config: &token::TokenMutabilityConfig): bool
}
```

<a id="0x3_token_get_token_mutability_default_properties"></a>

## Function `get_token_mutability_default_properties`

return if the tokendata&apos;s default properties is mutable with a token mutability config

```move
module 0x3::token {
    public fun get_token_mutability_default_properties(config: &token::TokenMutabilityConfig): bool
}
```

<a id="0x3_token_get_collection_mutability_config"></a>

## Function `get_collection_mutability_config`

return the collection mutation setting

```move
module 0x3::token {
    #[view]
    public fun get_collection_mutability_config(creator: address, collection_name: string::String): token::CollectionMutabilityConfig
}
```

<a id="0x3_token_get_collection_mutability_description"></a>

## Function `get_collection_mutability_description`

return if the collection description is mutable with a collection mutability config

```move
module 0x3::token {
    public fun get_collection_mutability_description(config: &token::CollectionMutabilityConfig): bool
}
```

<a id="0x3_token_get_collection_mutability_uri"></a>

## Function `get_collection_mutability_uri`

return if the collection uri is mutable with a collection mutability config

```move
module 0x3::token {
    public fun get_collection_mutability_uri(config: &token::CollectionMutabilityConfig): bool
}
```

<a id="0x3_token_get_collection_mutability_maximum"></a>

## Function `get_collection_mutability_maximum`

return if the collection maximum is mutable with collection mutability config

```move
module 0x3::token {
    public fun get_collection_mutability_maximum(config: &token::CollectionMutabilityConfig): bool
}
```

<a id="0x3_token_initialize_token_script"></a>

## Function `initialize_token_script`

```move
module 0x3::token {
    public entry fun initialize_token_script(_account: &signer)
}
```

<a id="0x3_token_initialize_token"></a>

## Function `initialize_token`

```move
module 0x3::token {
    public fun initialize_token(_account: &signer, _token_id: token::TokenId)
}
```
