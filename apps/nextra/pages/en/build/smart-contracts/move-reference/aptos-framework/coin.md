<a id="0x1_coin"></a>

# Module `0x1::coin`

This module provides the foundation for typesafe Coins.

- [Struct `Coin`](#0x1_coin_Coin)
- [Struct `AggregatableCoin`](#0x1_coin_AggregatableCoin)
- [Resource `CoinStore`](#0x1_coin_CoinStore)
- [Resource `SupplyConfig`](#0x1_coin_SupplyConfig)
- [Resource `CoinInfo`](#0x1_coin_CoinInfo)
- [Struct `CoinDeposit`](#0x1_coin_CoinDeposit)
- [Struct `CoinWithdraw`](#0x1_coin_CoinWithdraw)
- [Struct `Deposit`](#0x1_coin_Deposit)
- [Struct `Withdraw`](#0x1_coin_Withdraw)
- [Struct `DepositEvent`](#0x1_coin_DepositEvent)
- [Struct `WithdrawEvent`](#0x1_coin_WithdrawEvent)
- [Struct `CoinEventHandleDeletion`](#0x1_coin_CoinEventHandleDeletion)
- [Struct `PairCreation`](#0x1_coin_PairCreation)
- [Resource `MigrationFlag`](#0x1_coin_MigrationFlag)
- [Struct `MintCapability`](#0x1_coin_MintCapability)
- [Struct `FreezeCapability`](#0x1_coin_FreezeCapability)
- [Struct `BurnCapability`](#0x1_coin_BurnCapability)
- [Resource `CoinConversionMap`](#0x1_coin_CoinConversionMap)
- [Resource `PairedCoinType`](#0x1_coin_PairedCoinType)
- [Resource `PairedFungibleAssetRefs`](#0x1_coin_PairedFungibleAssetRefs)
- [Struct `MintRefReceipt`](#0x1_coin_MintRefReceipt)
- [Struct `TransferRefReceipt`](#0x1_coin_TransferRefReceipt)
- [Struct `BurnRefReceipt`](#0x1_coin_BurnRefReceipt)
- [Resource `Ghost$supply`](#0x1_coin_Ghost$supply)
- [Resource `Ghost$aggregate_supply`](#0x1_coin_Ghost$aggregate_supply)
- [Constants](#@Constants_0)
- [Function `paired_metadata`](#0x1_coin_paired_metadata)
- [Function `create_coin_conversion_map`](#0x1_coin_create_coin_conversion_map)
- [Function `create_pairing`](#0x1_coin_create_pairing)
- [Function `ensure_paired_metadata`](#0x1_coin_ensure_paired_metadata)
- [Function `paired_coin`](#0x1_coin_paired_coin)
- [Function `coin_to_fungible_asset`](#0x1_coin_coin_to_fungible_asset)
- [Function `paired_mint_ref_exists`](#0x1_coin_paired_mint_ref_exists)
- [Function `get_paired_mint_ref`](#0x1_coin_get_paired_mint_ref)
- [Function `return_paired_mint_ref`](#0x1_coin_return_paired_mint_ref)
- [Function `paired_transfer_ref_exists`](#0x1_coin_paired_transfer_ref_exists)
- [Function `get_paired_transfer_ref`](#0x1_coin_get_paired_transfer_ref)
- [Function `return_paired_transfer_ref`](#0x1_coin_return_paired_transfer_ref)
- [Function `paired_burn_ref_exists`](#0x1_coin_paired_burn_ref_exists)
- [Function `get_paired_burn_ref`](#0x1_coin_get_paired_burn_ref)
- [Function `convert_and_take_paired_burn_ref`](#0x1_coin_convert_and_take_paired_burn_ref)
- [Function `return_paired_burn_ref`](#0x1_coin_return_paired_burn_ref)
- [Function `initialize_supply_config`](#0x1_coin_initialize_supply_config)
- [Function `allow_supply_upgrades`](#0x1_coin_allow_supply_upgrades)
- [Function `initialize_aggregatable_coin`](#0x1_coin_initialize_aggregatable_coin)
- [Function `is_aggregatable_coin_zero`](#0x1_coin_is_aggregatable_coin_zero)
- [Function `drain_aggregatable_coin`](#0x1_coin_drain_aggregatable_coin)
- [Function `merge_aggregatable_coin`](#0x1_coin_merge_aggregatable_coin)
- [Function `collect_into_aggregatable_coin`](#0x1_coin_collect_into_aggregatable_coin)
- [Function `migrate_to_fungible_store`](#0x1_coin_migrate_to_fungible_store)
- [Function `balance`](#0x1_coin_balance)
- [Function `is_balance_at_least`](#0x1_coin_is_balance_at_least)
- [Function `is_coin_initialized`](#0x1_coin_is_coin_initialized)
- [Function `is_coin_store_frozen`](#0x1_coin_is_coin_store_frozen)
- [Function `is_account_registered`](#0x1_coin_is_account_registered)
- [Function `name`](#0x1_coin_name)
- [Function `symbol`](#0x1_coin_symbol)
- [Function `decimals`](#0x1_coin_decimals)
- [Function `supply`](#0x1_coin_supply)
- [Function `coin_supply`](#0x1_coin_coin_supply)
- [Function `burn`](#0x1_coin_burn)
- [Function `burn_from`](#0x1_coin_burn_from)
- [Function `deposit`](#0x1_coin_deposit)
- [Function `force_deposit`](#0x1_coin_force_deposit)
- [Function `destroy_zero`](#0x1_coin_destroy_zero)
- [Function `extract`](#0x1_coin_extract)
- [Function `extract_all`](#0x1_coin_extract_all)
- [Function `freeze_coin_store`](#0x1_coin_freeze_coin_store)
- [Function `unfreeze_coin_store`](#0x1_coin_unfreeze_coin_store)
- [Function `upgrade_supply`](#0x1_coin_upgrade_supply)
- [Function `initialize`](#0x1_coin_initialize)
- [Function `initialize_with_parallelizable_supply`](#0x1_coin_initialize_with_parallelizable_supply)
- [Function `merge`](#0x1_coin_merge)
- [Function `mint`](#0x1_coin_mint)
- [Function `register`](#0x1_coin_register)
- [Function `transfer`](#0x1_coin_transfer)
- [Function `value`](#0x1_coin_value)
- [Function `withdraw`](#0x1_coin_withdraw)
- [Function `zero`](#0x1_coin_zero)
- [Function `destroy_freeze_cap`](#0x1_coin_destroy_freeze_cap)
- [Function `destroy_mint_cap`](#0x1_coin_destroy_mint_cap)
- [Function `destroy_burn_cap`](#0x1_coin_destroy_burn_cap)

```move
module 0x1::coin {
    use 0x1::account;
    use 0x1::aggregator;
    use 0x1::aggregator_factory;
    use 0x1::create_signer;
    use 0x1::error;
    use 0x1::event;
    use 0x1::features;
    use 0x1::fungible_asset;
    use 0x1::guid;
    use 0x1::object;
    use 0x1::option;
    use 0x1::optional_aggregator;
    use 0x1::primary_fungible_store;
    use 0x1::signer;
    use 0x1::string;
    use 0x1::system_addresses;
    use 0x1::table;
    use 0x1::type_info;
}
```

<a id="0x1_coin_Coin"></a>

## Struct `Coin`

Core data structures
Main structure representing a coin/token in an account&apos;s custody.

```move
module 0x1::coin {
    struct Coin<CoinType> has store
}
```

<a id="0x1_coin_AggregatableCoin"></a>

## Struct `AggregatableCoin`

Represents a coin with aggregator as its value. This allows to update
the coin in every transaction avoiding read&#45;modify&#45;write conflicts. Only
used for gas fees distribution by Aptos Framework (0x1).

```move
module 0x1::coin {
    struct AggregatableCoin<CoinType> has store
}
```

<a id="0x1_coin_CoinStore"></a>

## Resource `CoinStore`

A holder of a specific coin types and associated event handles.
These are kept in a single resource to ensure locality of data.

```move
module 0x1::coin {
    struct CoinStore<CoinType> has key
}
```

<a id="0x1_coin_SupplyConfig"></a>

## Resource `SupplyConfig`

Configuration that controls the behavior of total coin supply. If the field
is set, coin creators are allowed to upgrade to parallelizable implementations.

```move
module 0x1::coin {
    struct SupplyConfig has key
}
```

<a id="0x1_coin_CoinInfo"></a>

## Resource `CoinInfo`

Information about a specific coin type. Stored on the creator of the coin&apos;s account.

```move
module 0x1::coin {
    struct CoinInfo<CoinType> has key
}
```

<a id="0x1_coin_CoinDeposit"></a>

## Struct `CoinDeposit`

Module event emitted when some amount of a coin is deposited into an account.

```move
module 0x1::coin {
    #[event]
    struct CoinDeposit has drop, store
}
```

<a id="0x1_coin_CoinWithdraw"></a>

## Struct `CoinWithdraw`

Module event emitted when some amount of a coin is withdrawn from an account.

```move
module 0x1::coin {
    #[event]
    struct CoinWithdraw has drop, store
}
```

<a id="0x1_coin_Deposit"></a>

## Struct `Deposit`

```move
module 0x1::coin {
    #[event]
    #[deprecated]
    struct Deposit<CoinType> has drop, store
}
```

<a id="0x1_coin_Withdraw"></a>

## Struct `Withdraw`

```move
module 0x1::coin {
    #[event]
    #[deprecated]
    struct Withdraw<CoinType> has drop, store
}
```

<a id="0x1_coin_DepositEvent"></a>

## Struct `DepositEvent`

Event emitted when some amount of a coin is deposited into an account.

```move
module 0x1::coin {
    struct DepositEvent has drop, store
}
```

<a id="0x1_coin_WithdrawEvent"></a>

## Struct `WithdrawEvent`

Event emitted when some amount of a coin is withdrawn from an account.

```move
module 0x1::coin {
    struct WithdrawEvent has drop, store
}
```

<a id="0x1_coin_CoinEventHandleDeletion"></a>

## Struct `CoinEventHandleDeletion`

Module event emitted when the event handles related to coin store is deleted.

```move
module 0x1::coin {
    #[event]
    struct CoinEventHandleDeletion has drop, store
}
```

<a id="0x1_coin_PairCreation"></a>

## Struct `PairCreation`

Module event emitted when a new pair of coin and fungible asset is created.

```move
module 0x1::coin {
    #[event]
    struct PairCreation has drop, store
}
```

<a id="0x1_coin_MigrationFlag"></a>

## Resource `MigrationFlag`

The flag the existence of which indicates the primary fungible store is created by the migration from CoinStore.

```move
module 0x1::coin {
    #[resource_group_member(#[group = 0x1::object::ObjectGroup])]
    struct MigrationFlag has key
}
```

<a id="0x1_coin_MintCapability"></a>

## Struct `MintCapability`

Capability required to mint coins.

```move
module 0x1::coin {
    struct MintCapability<CoinType> has copy, store
}
```

<a id="0x1_coin_FreezeCapability"></a>

## Struct `FreezeCapability`

Capability required to freeze a coin store.

```move
module 0x1::coin {
    struct FreezeCapability<CoinType> has copy, store
}
```

<a id="0x1_coin_BurnCapability"></a>

## Struct `BurnCapability`

Capability required to burn coins.

```move
module 0x1::coin {
    struct BurnCapability<CoinType> has copy, store
}
```

<a id="0x1_coin_CoinConversionMap"></a>

## Resource `CoinConversionMap`

The mapping between coin and fungible asset.

```move
module 0x1::coin {
    struct CoinConversionMap has key
}
```

<a id="0x1_coin_PairedCoinType"></a>

## Resource `PairedCoinType`

The paired coin type info stored in fungible asset metadata object.

```move
module 0x1::coin {
    #[resource_group_member(#[group = 0x1::object::ObjectGroup])]
    struct PairedCoinType has key
}
```

<a id="0x1_coin_PairedFungibleAssetRefs"></a>

## Resource `PairedFungibleAssetRefs`

The refs of the paired fungible asset.

```move
module 0x1::coin {
    #[resource_group_member(#[group = 0x1::object::ObjectGroup])]
    struct PairedFungibleAssetRefs has key
}
```

<a id="0x1_coin_MintRefReceipt"></a>

## Struct `MintRefReceipt`

The hot potato receipt for flash borrowing MintRef.

```move
module 0x1::coin {
    struct MintRefReceipt
}
```

<a id="0x1_coin_TransferRefReceipt"></a>

## Struct `TransferRefReceipt`

The hot potato receipt for flash borrowing TransferRef.

```move
module 0x1::coin {
    struct TransferRefReceipt
}
```

<a id="0x1_coin_BurnRefReceipt"></a>

## Struct `BurnRefReceipt`

The hot potato receipt for flash borrowing BurnRef.

```move
module 0x1::coin {
    struct BurnRefReceipt
}
```

<a id="0x1_coin_Ghost$supply"></a>

## Resource `Ghost$supply`

```move
module 0x1::coin {
    struct Ghost$supply<CoinType> has copy, drop, store, key
}
```

<a id="0x1_coin_Ghost$aggregate_supply"></a>

## Resource `Ghost$aggregate_supply`

```move
module 0x1::coin {
    struct Ghost$aggregate_supply<CoinType> has copy, drop, store, key
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_coin_MAX_U64"></a>

Maximum possible aggregatable coin value.

```move
module 0x1::coin {
    const MAX_U64: u128 = 18446744073709551615;
}
```

<a id="0x1_coin_MAX_U128"></a>

Maximum possible coin supply.

```move
module 0x1::coin {
    const MAX_U128: u128 = 340282366920938463463374607431768211455;
}
```

<a id="0x1_coin_EINSUFFICIENT_BALANCE"></a>

Not enough coins to complete transaction

```move
module 0x1::coin {
    const EINSUFFICIENT_BALANCE: u64 = 6;
}
```

<a id="0x1_coin_EAGGREGATABLE_COIN_VALUE_TOO_LARGE"></a>

The value of aggregatable coin used for transaction fees redistribution does not fit in u64.

```move
module 0x1::coin {
    const EAGGREGATABLE_COIN_VALUE_TOO_LARGE: u64 = 14;
}
```

<a id="0x1_coin_EAPT_PAIRING_IS_NOT_ENABLED"></a>

APT pairing is not eanbled yet.

```move
module 0x1::coin {
    const EAPT_PAIRING_IS_NOT_ENABLED: u64 = 28;
}
```

<a id="0x1_coin_EBURN_REF_NOT_FOUND"></a>

The BurnRef does not exist.

```move
module 0x1::coin {
    const EBURN_REF_NOT_FOUND: u64 = 25;
}
```

<a id="0x1_coin_EBURN_REF_RECEIPT_MISMATCH"></a>

The BurnRefReceipt does not match the BurnRef to be returned.

```move
module 0x1::coin {
    const EBURN_REF_RECEIPT_MISMATCH: u64 = 24;
}
```

<a id="0x1_coin_ECOIN_CONVERSION_MAP_NOT_FOUND"></a>

The coin converison map is not created yet.

```move
module 0x1::coin {
    const ECOIN_CONVERSION_MAP_NOT_FOUND: u64 = 27;
}
```

<a id="0x1_coin_ECOIN_INFO_ADDRESS_MISMATCH"></a>

Address of account which is used to initialize a coin `CoinType` doesn&apos;t match the deployer of module

```move
module 0x1::coin {
    const ECOIN_INFO_ADDRESS_MISMATCH: u64 = 1;
}
```

<a id="0x1_coin_ECOIN_INFO_ALREADY_PUBLISHED"></a>

`CoinType` is already initialized as a coin

```move
module 0x1::coin {
    const ECOIN_INFO_ALREADY_PUBLISHED: u64 = 2;
}
```

<a id="0x1_coin_ECOIN_INFO_NOT_PUBLISHED"></a>

`CoinType` hasn&apos;t been initialized as a coin

```move
module 0x1::coin {
    const ECOIN_INFO_NOT_PUBLISHED: u64 = 3;
}
```

<a id="0x1_coin_ECOIN_NAME_TOO_LONG"></a>

Name of the coin is too long

```move
module 0x1::coin {
    const ECOIN_NAME_TOO_LONG: u64 = 12;
}
```

<a id="0x1_coin_ECOIN_STORE_ALREADY_PUBLISHED"></a>

Deprecated. Account already has `CoinStore` registered for `CoinType`

```move
module 0x1::coin {
    const ECOIN_STORE_ALREADY_PUBLISHED: u64 = 4;
}
```

<a id="0x1_coin_ECOIN_STORE_NOT_PUBLISHED"></a>

Account hasn&apos;t registered `CoinStore` for `CoinType`

```move
module 0x1::coin {
    const ECOIN_STORE_NOT_PUBLISHED: u64 = 5;
}
```

<a id="0x1_coin_ECOIN_SUPPLY_UPGRADE_NOT_SUPPORTED"></a>

Cannot upgrade the total supply of coins to different implementation.

```move
module 0x1::coin {
    const ECOIN_SUPPLY_UPGRADE_NOT_SUPPORTED: u64 = 11;
}
```

<a id="0x1_coin_ECOIN_SYMBOL_TOO_LONG"></a>

Symbol of the coin is too long

```move
module 0x1::coin {
    const ECOIN_SYMBOL_TOO_LONG: u64 = 13;
}
```

<a id="0x1_coin_ECOIN_TO_FUNGIBLE_ASSET_FEATURE_NOT_ENABLED"></a>

The feature of migration from coin to fungible asset is not enabled.

```move
module 0x1::coin {
    const ECOIN_TO_FUNGIBLE_ASSET_FEATURE_NOT_ENABLED: u64 = 18;
}
```

<a id="0x1_coin_ECOIN_TYPE_MISMATCH"></a>

The coin type from the map does not match the calling function type argument.

```move
module 0x1::coin {
    const ECOIN_TYPE_MISMATCH: u64 = 17;
}
```

<a id="0x1_coin_EDESTRUCTION_OF_NONZERO_TOKEN"></a>

Cannot destroy non&#45;zero coins

```move
module 0x1::coin {
    const EDESTRUCTION_OF_NONZERO_TOKEN: u64 = 7;
}
```

<a id="0x1_coin_EFROZEN"></a>

CoinStore is frozen. Coins cannot be deposited or withdrawn

```move
module 0x1::coin {
    const EFROZEN: u64 = 10;
}
```

<a id="0x1_coin_EMIGRATION_FRAMEWORK_NOT_ENABLED"></a>

The migration process from coin to fungible asset is not enabled yet.

```move
module 0x1::coin {
    const EMIGRATION_FRAMEWORK_NOT_ENABLED: u64 = 26;
}
```

<a id="0x1_coin_EMINT_REF_NOT_FOUND"></a>

The MintRef does not exist.

```move
module 0x1::coin {
    const EMINT_REF_NOT_FOUND: u64 = 21;
}
```

<a id="0x1_coin_EMINT_REF_RECEIPT_MISMATCH"></a>

The MintRefReceipt does not match the MintRef to be returned.

```move
module 0x1::coin {
    const EMINT_REF_RECEIPT_MISMATCH: u64 = 20;
}
```

<a id="0x1_coin_EPAIRED_COIN"></a>

Error regarding paired coin type of the fungible asset metadata.

```move
module 0x1::coin {
    const EPAIRED_COIN: u64 = 15;
}
```

<a id="0x1_coin_EPAIRED_FUNGIBLE_ASSET"></a>

Error regarding paired fungible asset metadata of a coin type.

```move
module 0x1::coin {
    const EPAIRED_FUNGIBLE_ASSET: u64 = 16;
}
```

<a id="0x1_coin_EPAIRED_FUNGIBLE_ASSET_REFS_NOT_FOUND"></a>

PairedFungibleAssetRefs resource does not exist.

```move
module 0x1::coin {
    const EPAIRED_FUNGIBLE_ASSET_REFS_NOT_FOUND: u64 = 19;
}
```

<a id="0x1_coin_ETRANSFER_REF_NOT_FOUND"></a>

The TransferRef does not exist.

```move
module 0x1::coin {
    const ETRANSFER_REF_NOT_FOUND: u64 = 23;
}
```

<a id="0x1_coin_ETRANSFER_REF_RECEIPT_MISMATCH"></a>

The TransferRefReceipt does not match the TransferRef to be returned.

```move
module 0x1::coin {
    const ETRANSFER_REF_RECEIPT_MISMATCH: u64 = 22;
}
```

<a id="0x1_coin_MAX_COIN_NAME_LENGTH"></a>

```move
module 0x1::coin {
    const MAX_COIN_NAME_LENGTH: u64 = 32;
}
```

<a id="0x1_coin_MAX_COIN_SYMBOL_LENGTH"></a>

```move
module 0x1::coin {
    const MAX_COIN_SYMBOL_LENGTH: u64 = 10;
}
```

<a id="0x1_coin_paired_metadata"></a>

## Function `paired_metadata`

Get the paired fungible asset metadata object of a coin type. If not exist, return option::none().

```move
module 0x1::coin {
    #[view]
    public fun paired_metadata<CoinType>(): option::Option<object::Object<fungible_asset::Metadata>>
}
```

<a id="0x1_coin_create_coin_conversion_map"></a>

## Function `create_coin_conversion_map`

```move
module 0x1::coin {
    public entry fun create_coin_conversion_map(aptos_framework: &signer)
}
```

<a id="0x1_coin_create_pairing"></a>

## Function `create_pairing`

Create APT pairing by passing `AptosCoin`.

```move
module 0x1::coin {
    public entry fun create_pairing<CoinType>(aptos_framework: &signer)
}
```

<a id="0x1_coin_ensure_paired_metadata"></a>

## Function `ensure_paired_metadata`

Get the paired fungible asset metadata object of a coin type, create if not exist.

```move
module 0x1::coin {
    public(friend) fun ensure_paired_metadata<CoinType>(): object::Object<fungible_asset::Metadata>
}
```

<a id="0x1_coin_paired_coin"></a>

## Function `paired_coin`

Get the paired coin type of a fungible asset metadata object.

```move
module 0x1::coin {
    #[view]
    public fun paired_coin(metadata: object::Object<fungible_asset::Metadata>): option::Option<type_info::TypeInfo>
}
```

<a id="0x1_coin_coin_to_fungible_asset"></a>

## Function `coin_to_fungible_asset`

Conversion from coin to fungible asset

```move
module 0x1::coin {
    public fun coin_to_fungible_asset<CoinType>(coin: coin::Coin<CoinType>): fungible_asset::FungibleAsset
}
```

<a id="0x1_coin_paired_mint_ref_exists"></a>

## Function `paired_mint_ref_exists`

Check whether `MintRef` has not been taken.

```move
module 0x1::coin {
    #[view]
    public fun paired_mint_ref_exists<CoinType>(): bool
}
```

<a id="0x1_coin_get_paired_mint_ref"></a>

## Function `get_paired_mint_ref`

Get the `MintRef` of paired fungible asset of a coin type from `MintCapability`.

```move
module 0x1::coin {
    public fun get_paired_mint_ref<CoinType>(_: &coin::MintCapability<CoinType>): (fungible_asset::MintRef, coin::MintRefReceipt)
}
```

<a id="0x1_coin_return_paired_mint_ref"></a>

## Function `return_paired_mint_ref`

Return the `MintRef` with the hot potato receipt.

```move
module 0x1::coin {
    public fun return_paired_mint_ref(mint_ref: fungible_asset::MintRef, receipt: coin::MintRefReceipt)
}
```

<a id="0x1_coin_paired_transfer_ref_exists"></a>

## Function `paired_transfer_ref_exists`

Check whether `TransferRef` still exists.

```move
module 0x1::coin {
    #[view]
    public fun paired_transfer_ref_exists<CoinType>(): bool
}
```

<a id="0x1_coin_get_paired_transfer_ref"></a>

## Function `get_paired_transfer_ref`

Get the TransferRef of paired fungible asset of a coin type from `FreezeCapability`.

```move
module 0x1::coin {
    public fun get_paired_transfer_ref<CoinType>(_: &coin::FreezeCapability<CoinType>): (fungible_asset::TransferRef, coin::TransferRefReceipt)
}
```

<a id="0x1_coin_return_paired_transfer_ref"></a>

## Function `return_paired_transfer_ref`

Return the `TransferRef` with the hot potato receipt.

```move
module 0x1::coin {
    public fun return_paired_transfer_ref(transfer_ref: fungible_asset::TransferRef, receipt: coin::TransferRefReceipt)
}
```

<a id="0x1_coin_paired_burn_ref_exists"></a>

## Function `paired_burn_ref_exists`

Check whether `BurnRef` has not been taken.

```move
module 0x1::coin {
    #[view]
    public fun paired_burn_ref_exists<CoinType>(): bool
}
```

<a id="0x1_coin_get_paired_burn_ref"></a>

## Function `get_paired_burn_ref`

Get the `BurnRef` of paired fungible asset of a coin type from `BurnCapability`.

```move
module 0x1::coin {
    public fun get_paired_burn_ref<CoinType>(_: &coin::BurnCapability<CoinType>): (fungible_asset::BurnRef, coin::BurnRefReceipt)
}
```

<a id="0x1_coin_convert_and_take_paired_burn_ref"></a>

## Function `convert_and_take_paired_burn_ref`

```move
module 0x1::coin {
    public fun convert_and_take_paired_burn_ref<CoinType>(burn_cap: coin::BurnCapability<CoinType>): fungible_asset::BurnRef
}
```

<a id="0x1_coin_return_paired_burn_ref"></a>

## Function `return_paired_burn_ref`

Return the `BurnRef` with the hot potato receipt.

```move
module 0x1::coin {
    public fun return_paired_burn_ref(burn_ref: fungible_asset::BurnRef, receipt: coin::BurnRefReceipt)
}
```

<a id="0x1_coin_initialize_supply_config"></a>

## Function `initialize_supply_config`

Publishes supply configuration. Initially, upgrading is not allowed.

```move
module 0x1::coin {
    public(friend) fun initialize_supply_config(aptos_framework: &signer)
}
```

<a id="0x1_coin_allow_supply_upgrades"></a>

## Function `allow_supply_upgrades`

This should be called by on&#45;chain governance to update the config and allow
or disallow upgradability of total supply.

```move
module 0x1::coin {
    public fun allow_supply_upgrades(aptos_framework: &signer, allowed: bool)
}
```

<a id="0x1_coin_initialize_aggregatable_coin"></a>

## Function `initialize_aggregatable_coin`

Creates a new aggregatable coin with value overflowing on `limit`. Note that this function can
only be called by Aptos Framework (0x1) account for now because of `create_aggregator`.

```move
module 0x1::coin {
    public(friend) fun initialize_aggregatable_coin<CoinType>(aptos_framework: &signer): coin::AggregatableCoin<CoinType>
}
```

<a id="0x1_coin_is_aggregatable_coin_zero"></a>

## Function `is_aggregatable_coin_zero`

Returns true if the value of aggregatable coin is zero.

```move
module 0x1::coin {
    public(friend) fun is_aggregatable_coin_zero<CoinType>(coin: &coin::AggregatableCoin<CoinType>): bool
}
```

<a id="0x1_coin_drain_aggregatable_coin"></a>

## Function `drain_aggregatable_coin`

Drains the aggregatable coin, setting it to zero and returning a standard coin.

```move
module 0x1::coin {
    public(friend) fun drain_aggregatable_coin<CoinType>(coin: &mut coin::AggregatableCoin<CoinType>): coin::Coin<CoinType>
}
```

<a id="0x1_coin_merge_aggregatable_coin"></a>

## Function `merge_aggregatable_coin`

Merges `coin` into aggregatable coin (`dst_coin`).

```move
module 0x1::coin {
    public(friend) fun merge_aggregatable_coin<CoinType>(dst_coin: &mut coin::AggregatableCoin<CoinType>, coin: coin::Coin<CoinType>)
}
```

<a id="0x1_coin_collect_into_aggregatable_coin"></a>

## Function `collect_into_aggregatable_coin`

Collects a specified amount of coin form an account into aggregatable coin.

```move
module 0x1::coin {
    public(friend) fun collect_into_aggregatable_coin<CoinType>(account_addr: address, amount: u64, dst_coin: &mut coin::AggregatableCoin<CoinType>)
}
```

<a id="0x1_coin_migrate_to_fungible_store"></a>

## Function `migrate_to_fungible_store`

Voluntarily migrate to fungible store for `CoinType` if not yet.

```move
module 0x1::coin {
    public entry fun migrate_to_fungible_store<CoinType>(account: &signer)
}
```

<a id="0x1_coin_balance"></a>

## Function `balance`

Returns the balance of `owner` for provided `CoinType` and its paired FA if exists.

```move
module 0x1::coin {
    #[view]
    public fun balance<CoinType>(owner: address): u64
}
```

<a id="0x1_coin_is_balance_at_least"></a>

## Function `is_balance_at_least`

Returns whether the balance of `owner` for provided `CoinType` and its paired FA is &gt;&#61; `amount`.

```move
module 0x1::coin {
    #[view]
    public fun is_balance_at_least<CoinType>(owner: address, amount: u64): bool
}
```

<a id="0x1_coin_is_coin_initialized"></a>

## Function `is_coin_initialized`

Returns `true` if the type `CoinType` is an initialized coin.

```move
module 0x1::coin {
    #[view]
    public fun is_coin_initialized<CoinType>(): bool
}
```

<a id="0x1_coin_is_coin_store_frozen"></a>

## Function `is_coin_store_frozen`

Returns `true` is account_addr has frozen the CoinStore or if it&apos;s not registered at all

```move
module 0x1::coin {
    #[view]
    public fun is_coin_store_frozen<CoinType>(account_addr: address): bool
}
```

<a id="0x1_coin_is_account_registered"></a>

## Function `is_account_registered`

Returns `true` if `account_addr` is registered to receive `CoinType`.

```move
module 0x1::coin {
    #[view]
    public fun is_account_registered<CoinType>(account_addr: address): bool
}
```

<a id="0x1_coin_name"></a>

## Function `name`

Returns the name of the coin.

```move
module 0x1::coin {
    #[view]
    public fun name<CoinType>(): string::String
}
```

<a id="0x1_coin_symbol"></a>

## Function `symbol`

Returns the symbol of the coin, usually a shorter version of the name.

```move
module 0x1::coin {
    #[view]
    public fun symbol<CoinType>(): string::String
}
```

<a id="0x1_coin_decimals"></a>

## Function `decimals`

Returns the number of decimals used to get its user representation.
For example, if `decimals` equals `2`, a balance of `505` coins should
be displayed to a user as `5.05` (`505 / 10 ** 2`).

```move
module 0x1::coin {
    #[view]
    public fun decimals<CoinType>(): u8
}
```

<a id="0x1_coin_supply"></a>

## Function `supply`

Returns the amount of coin in existence.

```move
module 0x1::coin {
    #[view]
    public fun supply<CoinType>(): option::Option<u128>
}
```

<a id="0x1_coin_coin_supply"></a>

## Function `coin_supply`

Returns the amount of coin in existence.

```move
module 0x1::coin {
    #[view]
    public fun coin_supply<CoinType>(): option::Option<u128>
}
```

<a id="0x1_coin_burn"></a>

## Function `burn`

Burn `coin` with capability.
The capability `_cap` should be passed as a reference to `BurnCapability<CoinType>`.

```move
module 0x1::coin {
    public fun burn<CoinType>(coin: coin::Coin<CoinType>, _cap: &coin::BurnCapability<CoinType>)
}
```

<a id="0x1_coin_burn_from"></a>

## Function `burn_from`

Burn `coin` from the specified `account` with capability.
The capability `burn_cap` should be passed as a reference to `BurnCapability<CoinType>`.
This function shouldn&apos;t fail as it&apos;s called as part of transaction fee burning.

Note: This bypasses CoinStore::frozen &#45;&#45; coins within a frozen CoinStore can be burned.

```move
module 0x1::coin {
    public fun burn_from<CoinType>(account_addr: address, amount: u64, burn_cap: &coin::BurnCapability<CoinType>)
}
```

<a id="0x1_coin_deposit"></a>

## Function `deposit`

Deposit the coin balance into the recipient&apos;s account and emit an event.

```move
module 0x1::coin {
    public fun deposit<CoinType>(account_addr: address, coin: coin::Coin<CoinType>)
}
```

<a id="0x1_coin_force_deposit"></a>

## Function `force_deposit`

Deposit the coin balance into the recipient&apos;s account without checking if the account is frozen.
This is for internal use only and doesn&apos;t emit an DepositEvent.

```move
module 0x1::coin {
    public(friend) fun force_deposit<CoinType>(account_addr: address, coin: coin::Coin<CoinType>)
}
```

<a id="0x1_coin_destroy_zero"></a>

## Function `destroy_zero`

Destroys a zero&#45;value coin. Calls will fail if the `value` in the passed&#45;in `token` is non&#45;zero
so it is impossible to &quot;burn&quot; any non&#45;zero amount of `Coin` without having
a `BurnCapability` for the specific `CoinType`.

```move
module 0x1::coin {
    public fun destroy_zero<CoinType>(zero_coin: coin::Coin<CoinType>)
}
```

<a id="0x1_coin_extract"></a>

## Function `extract`

Extracts `amount` from the passed&#45;in `coin`, where the original token is modified in place.

```move
module 0x1::coin {
    public fun extract<CoinType>(coin: &mut coin::Coin<CoinType>, amount: u64): coin::Coin<CoinType>
}
```

<a id="0x1_coin_extract_all"></a>

## Function `extract_all`

Extracts the entire amount from the passed&#45;in `coin`, where the original token is modified in place.

```move
module 0x1::coin {
    public fun extract_all<CoinType>(coin: &mut coin::Coin<CoinType>): coin::Coin<CoinType>
}
```

<a id="0x1_coin_freeze_coin_store"></a>

## Function `freeze_coin_store`

Freeze a CoinStore to prevent transfers

```move
module 0x1::coin {
    #[legacy_entry_fun]
    public entry fun freeze_coin_store<CoinType>(account_addr: address, _freeze_cap: &coin::FreezeCapability<CoinType>)
}
```

<a id="0x1_coin_unfreeze_coin_store"></a>

## Function `unfreeze_coin_store`

Unfreeze a CoinStore to allow transfers

```move
module 0x1::coin {
    #[legacy_entry_fun]
    public entry fun unfreeze_coin_store<CoinType>(account_addr: address, _freeze_cap: &coin::FreezeCapability<CoinType>)
}
```

<a id="0x1_coin_upgrade_supply"></a>

## Function `upgrade_supply`

Upgrade total supply to use a parallelizable implementation if it is
available.

```move
module 0x1::coin {
    public entry fun upgrade_supply<CoinType>(account: &signer)
}
```

<a id="0x1_coin_initialize"></a>

## Function `initialize`

Creates a new Coin with given `CoinType` and returns minting/freezing/burning capabilities.
The given signer also becomes the account hosting the information about the coin
(name, supply, etc.). Supply is initialized as non&#45;parallelizable integer.

```move
module 0x1::coin {
    public fun initialize<CoinType>(account: &signer, name: string::String, symbol: string::String, decimals: u8, monitor_supply: bool): (coin::BurnCapability<CoinType>, coin::FreezeCapability<CoinType>, coin::MintCapability<CoinType>)
}
```

<a id="0x1_coin_initialize_with_parallelizable_supply"></a>

## Function `initialize_with_parallelizable_supply`

Same as `initialize` but supply can be initialized to parallelizable aggregator.

```move
module 0x1::coin {
    public(friend) fun initialize_with_parallelizable_supply<CoinType>(account: &signer, name: string::String, symbol: string::String, decimals: u8, monitor_supply: bool): (coin::BurnCapability<CoinType>, coin::FreezeCapability<CoinType>, coin::MintCapability<CoinType>)
}
```

<a id="0x1_coin_merge"></a>

## Function `merge`

&quot;Merges&quot; the two given coins. The coin passed in as `dst_coin` will have a value equal
to the sum of the two tokens (`dst_coin` and `source_coin`).

```move
module 0x1::coin {
    public fun merge<CoinType>(dst_coin: &mut coin::Coin<CoinType>, source_coin: coin::Coin<CoinType>)
}
```

<a id="0x1_coin_mint"></a>

## Function `mint`

Mint new `Coin` with capability.
The capability `_cap` should be passed as reference to `MintCapability<CoinType>`.
Returns minted `Coin`.

```move
module 0x1::coin {
    public fun mint<CoinType>(amount: u64, _cap: &coin::MintCapability<CoinType>): coin::Coin<CoinType>
}
```

<a id="0x1_coin_register"></a>

## Function `register`

```move
module 0x1::coin {
    public fun register<CoinType>(account: &signer)
}
```

<a id="0x1_coin_transfer"></a>

## Function `transfer`

Transfers `amount` of coins `CoinType` from `from` to `to`.

```move
module 0x1::coin {
    public entry fun transfer<CoinType>(from: &signer, to: address, amount: u64)
}
```

<a id="0x1_coin_value"></a>

## Function `value`

Returns the `value` passed in `coin`.

```move
module 0x1::coin {
    public fun value<CoinType>(coin: &coin::Coin<CoinType>): u64
}
```

<a id="0x1_coin_withdraw"></a>

## Function `withdraw`

Withdraw specified `amount` of coin `CoinType` from the signing account.

```move
module 0x1::coin {
    public fun withdraw<CoinType>(account: &signer, amount: u64): coin::Coin<CoinType>
}
```

<a id="0x1_coin_zero"></a>

## Function `zero`

Create a new `Coin<CoinType>` with a value of `0`.

```move
module 0x1::coin {
    public fun zero<CoinType>(): coin::Coin<CoinType>
}
```

<a id="0x1_coin_destroy_freeze_cap"></a>

## Function `destroy_freeze_cap`

Destroy a freeze capability. Freeze capability is dangerous and therefore should be destroyed if not used.

```move
module 0x1::coin {
    public fun destroy_freeze_cap<CoinType>(freeze_cap: coin::FreezeCapability<CoinType>)
}
```

<a id="0x1_coin_destroy_mint_cap"></a>

## Function `destroy_mint_cap`

Destroy a mint capability.

```move
module 0x1::coin {
    public fun destroy_mint_cap<CoinType>(mint_cap: coin::MintCapability<CoinType>)
}
```

<a id="0x1_coin_destroy_burn_cap"></a>

## Function `destroy_burn_cap`

Destroy a burn capability.

```move
module 0x1::coin {
    public fun destroy_burn_cap<CoinType>(burn_cap: coin::BurnCapability<CoinType>)
}
```
