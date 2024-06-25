<a id="0x1_fungible_asset"></a>

# Module `0x1::fungible_asset`

This defines the fungible asset module that can issue fungible asset of any `Metadata` object. The
metadata object can be any object that equipped with `Metadata` resource.

- [Resource `Supply`](#0x1_fungible_asset_Supply)
- [Resource `ConcurrentSupply`](#0x1_fungible_asset_ConcurrentSupply)
- [Resource `Metadata`](#0x1_fungible_asset_Metadata)
- [Resource `Untransferable`](#0x1_fungible_asset_Untransferable)
- [Resource `FungibleStore`](#0x1_fungible_asset_FungibleStore)
- [Resource `DispatchFunctionStore`](#0x1_fungible_asset_DispatchFunctionStore)
- [Resource `ConcurrentFungibleBalance`](#0x1_fungible_asset_ConcurrentFungibleBalance)
- [Struct `FungibleAsset`](#0x1_fungible_asset_FungibleAsset)
- [Struct `MintRef`](#0x1_fungible_asset_MintRef)
- [Struct `TransferRef`](#0x1_fungible_asset_TransferRef)
- [Struct `BurnRef`](#0x1_fungible_asset_BurnRef)
- [Struct `Deposit`](#0x1_fungible_asset_Deposit)
- [Struct `Withdraw`](#0x1_fungible_asset_Withdraw)
- [Struct `Frozen`](#0x1_fungible_asset_Frozen)
- [Resource `FungibleAssetEvents`](#0x1_fungible_asset_FungibleAssetEvents)
- [Struct `DepositEvent`](#0x1_fungible_asset_DepositEvent)
- [Struct `WithdrawEvent`](#0x1_fungible_asset_WithdrawEvent)
- [Struct `FrozenEvent`](#0x1_fungible_asset_FrozenEvent)
- [Constants](#@Constants_0)
- [Function `add_fungibility`](#0x1_fungible_asset_add_fungibility)
- [Function `set_untransferable`](#0x1_fungible_asset_set_untransferable)
- [Function `is_untransferable`](#0x1_fungible_asset_is_untransferable)
- [Function `register_dispatch_functions`](#0x1_fungible_asset_register_dispatch_functions)
- [Function `generate_mint_ref`](#0x1_fungible_asset_generate_mint_ref)
- [Function `generate_burn_ref`](#0x1_fungible_asset_generate_burn_ref)
- [Function `generate_transfer_ref`](#0x1_fungible_asset_generate_transfer_ref)
- [Function `supply`](#0x1_fungible_asset_supply)
- [Function `maximum`](#0x1_fungible_asset_maximum)
- [Function `name`](#0x1_fungible_asset_name)
- [Function `symbol`](#0x1_fungible_asset_symbol)
- [Function `decimals`](#0x1_fungible_asset_decimals)
- [Function `icon_uri`](#0x1_fungible_asset_icon_uri)
- [Function `project_uri`](#0x1_fungible_asset_project_uri)
- [Function `store_exists`](#0x1_fungible_asset_store_exists)
- [Function `metadata_from_asset`](#0x1_fungible_asset_metadata_from_asset)
- [Function `store_metadata`](#0x1_fungible_asset_store_metadata)
- [Function `amount`](#0x1_fungible_asset_amount)
- [Function `balance`](#0x1_fungible_asset_balance)
- [Function `is_balance_at_least`](#0x1_fungible_asset_is_balance_at_least)
- [Function `is_address_balance_at_least`](#0x1_fungible_asset_is_address_balance_at_least)
- [Function `is_frozen`](#0x1_fungible_asset_is_frozen)
- [Function `is_store_dispatchable`](#0x1_fungible_asset_is_store_dispatchable)
- [Function `deposit_dispatch_function`](#0x1_fungible_asset_deposit_dispatch_function)
- [Function `withdraw_dispatch_function`](#0x1_fungible_asset_withdraw_dispatch_function)
- [Function `derived_balance_dispatch_function`](#0x1_fungible_asset_derived_balance_dispatch_function)
- [Function `asset_metadata`](#0x1_fungible_asset_asset_metadata)
- [Function `mint_ref_metadata`](#0x1_fungible_asset_mint_ref_metadata)
- [Function `transfer_ref_metadata`](#0x1_fungible_asset_transfer_ref_metadata)
- [Function `burn_ref_metadata`](#0x1_fungible_asset_burn_ref_metadata)
- [Function `transfer`](#0x1_fungible_asset_transfer)
- [Function `create_store`](#0x1_fungible_asset_create_store)
- [Function `remove_store`](#0x1_fungible_asset_remove_store)
- [Function `withdraw`](#0x1_fungible_asset_withdraw)
- [Function `withdraw_sanity_check`](#0x1_fungible_asset_withdraw_sanity_check)
- [Function `deposit_sanity_check`](#0x1_fungible_asset_deposit_sanity_check)
- [Function `deposit`](#0x1_fungible_asset_deposit)
- [Function `mint`](#0x1_fungible_asset_mint)
- [Function `mint_internal`](#0x1_fungible_asset_mint_internal)
- [Function `mint_to`](#0x1_fungible_asset_mint_to)
- [Function `set_frozen_flag`](#0x1_fungible_asset_set_frozen_flag)
- [Function `set_frozen_flag_internal`](#0x1_fungible_asset_set_frozen_flag_internal)
- [Function `burn`](#0x1_fungible_asset_burn)
- [Function `burn_internal`](#0x1_fungible_asset_burn_internal)
- [Function `burn_from`](#0x1_fungible_asset_burn_from)
- [Function `address_burn_from`](#0x1_fungible_asset_address_burn_from)
- [Function `withdraw_with_ref`](#0x1_fungible_asset_withdraw_with_ref)
- [Function `deposit_with_ref`](#0x1_fungible_asset_deposit_with_ref)
- [Function `transfer_with_ref`](#0x1_fungible_asset_transfer_with_ref)
- [Function `zero`](#0x1_fungible_asset_zero)
- [Function `extract`](#0x1_fungible_asset_extract)
- [Function `merge`](#0x1_fungible_asset_merge)
- [Function `destroy_zero`](#0x1_fungible_asset_destroy_zero)
- [Function `deposit_internal`](#0x1_fungible_asset_deposit_internal)
- [Function `withdraw_internal`](#0x1_fungible_asset_withdraw_internal)
- [Function `upgrade_to_concurrent`](#0x1_fungible_asset_upgrade_to_concurrent)
- [Function `upgrade_store_to_concurrent`](#0x1_fungible_asset_upgrade_store_to_concurrent)

```move
module 0x1::fungible_asset {
    use 0x1::aggregator_v2;
    use 0x1::create_signer;
    use 0x1::error;
    use 0x1::event;
    use 0x1::features;
    use 0x1::function_info;
    use 0x1::object;
    use 0x1::option;
    use 0x1::signer;
    use 0x1::string;
}
```

<a id="0x1_fungible_asset_Supply"></a>

## Resource `Supply`

```move
module 0x1::fungible_asset {
    #[resource_group_member(#[group = 0x1::object::ObjectGroup])]
    struct Supply has key
}
```

<a id="0x1_fungible_asset_ConcurrentSupply"></a>

## Resource `ConcurrentSupply`

```move
module 0x1::fungible_asset {
    #[resource_group_member(#[group = 0x1::object::ObjectGroup])]
    struct ConcurrentSupply has key
}
```

<a id="0x1_fungible_asset_Metadata"></a>

## Resource `Metadata`

Metadata of a Fungible asset

```move
module 0x1::fungible_asset {
    #[resource_group_member(#[group = 0x1::object::ObjectGroup])]
    struct Metadata has key
}
```

<a id="0x1_fungible_asset_Untransferable"></a>

## Resource `Untransferable`

Defines a `FungibleAsset`, such that all `FungibleStore`s stores are untransferable at
the object layer.

```move
module 0x1::fungible_asset {
    #[resource_group_member(#[group = 0x1::object::ObjectGroup])]
    struct Untransferable has key
}
```

<a id="0x1_fungible_asset_FungibleStore"></a>

## Resource `FungibleStore`

The store object that holds fungible assets of a specific type associated with an account.

```move
module 0x1::fungible_asset {
    #[resource_group_member(#[group = 0x1::object::ObjectGroup])]
    struct FungibleStore has key
}
```

<a id="0x1_fungible_asset_DispatchFunctionStore"></a>

## Resource `DispatchFunctionStore`

```move
module 0x1::fungible_asset {
    #[resource_group_member(#[group = 0x1::object::ObjectGroup])]
    struct DispatchFunctionStore has key
}
```

<a id="0x1_fungible_asset_ConcurrentFungibleBalance"></a>

## Resource `ConcurrentFungibleBalance`

The store object that holds concurrent fungible asset balance.

```move
module 0x1::fungible_asset {
    #[resource_group_member(#[group = 0x1::object::ObjectGroup])]
    struct ConcurrentFungibleBalance has key
}
```

<a id="0x1_fungible_asset_FungibleAsset"></a>

## Struct `FungibleAsset`

FungibleAsset can be passed into function for type safety and to guarantee a specific amount.
FungibleAsset is ephemeral and cannot be stored directly. It must be deposited back into a store.

```move
module 0x1::fungible_asset {
    struct FungibleAsset
}
```

<a id="0x1_fungible_asset_MintRef"></a>

## Struct `MintRef`

MintRef can be used to mint the fungible asset into an account&apos;s store.

```move
module 0x1::fungible_asset {
    struct MintRef has drop, store
}
```

<a id="0x1_fungible_asset_TransferRef"></a>

## Struct `TransferRef`

TransferRef can be used to allow or disallow the owner of fungible assets from transferring the asset
and allow the holder of TransferRef to transfer fungible assets from any account.

```move
module 0x1::fungible_asset {
    struct TransferRef has drop, store
}
```

<a id="0x1_fungible_asset_BurnRef"></a>

## Struct `BurnRef`

BurnRef can be used to burn fungible assets from a given holder account.

```move
module 0x1::fungible_asset {
    struct BurnRef has drop, store
}
```

<a id="0x1_fungible_asset_Deposit"></a>

## Struct `Deposit`

Emitted when fungible assets are deposited into a store.

```move
module 0x1::fungible_asset {
    #[event]
    struct Deposit has drop, store
}
```

<a id="0x1_fungible_asset_Withdraw"></a>

## Struct `Withdraw`

Emitted when fungible assets are withdrawn from a store.

```move
module 0x1::fungible_asset {
    #[event]
    struct Withdraw has drop, store
}
```

<a id="0x1_fungible_asset_Frozen"></a>

## Struct `Frozen`

Emitted when a store&apos;s frozen status is updated.

```move
module 0x1::fungible_asset {
    #[event]
    struct Frozen has drop, store
}
```

<a id="0x1_fungible_asset_FungibleAssetEvents"></a>

## Resource `FungibleAssetEvents`

```move
module 0x1::fungible_asset {
    #[resource_group_member(#[group = 0x1::object::ObjectGroup])]
    #[deprecated]
    struct FungibleAssetEvents has key
}
```

<a id="0x1_fungible_asset_DepositEvent"></a>

## Struct `DepositEvent`

```move
module 0x1::fungible_asset {
    #[deprecated]
    struct DepositEvent has drop, store
}
```

<a id="0x1_fungible_asset_WithdrawEvent"></a>

## Struct `WithdrawEvent`

```move
module 0x1::fungible_asset {
    #[deprecated]
    struct WithdrawEvent has drop, store
}
```

<a id="0x1_fungible_asset_FrozenEvent"></a>

## Struct `FrozenEvent`

```move
module 0x1::fungible_asset {
    #[deprecated]
    struct FrozenEvent has drop, store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_fungible_asset_MAX_U128"></a>

Maximum possible coin supply.

```move
module 0x1::fungible_asset {
    const MAX_U128: u128 = 340282366920938463463374607431768211455;
}
```

<a id="0x1_fungible_asset_EALREADY_REGISTERED"></a>

Trying to re&#45;register dispatch hook on a fungible asset.

```move
module 0x1::fungible_asset {
    const EALREADY_REGISTERED: u64 = 29;
}
```

<a id="0x1_fungible_asset_EAMOUNT_CANNOT_BE_ZERO"></a>

Amount cannot be zero.

```move
module 0x1::fungible_asset {
    const EAMOUNT_CANNOT_BE_ZERO: u64 = 1;
}
```

<a id="0x1_fungible_asset_EAMOUNT_IS_NOT_ZERO"></a>

Cannot destroy non&#45;empty fungible assets.

```move
module 0x1::fungible_asset {
    const EAMOUNT_IS_NOT_ZERO: u64 = 12;
}
```

<a id="0x1_fungible_asset_EAPT_NOT_DISPATCHABLE"></a>

Cannot register dispatch hook for APT.

```move
module 0x1::fungible_asset {
    const EAPT_NOT_DISPATCHABLE: u64 = 31;
}
```

<a id="0x1_fungible_asset_EBALANCE_IS_NOT_ZERO"></a>

Cannot destroy fungible stores with a non&#45;zero balance.

```move
module 0x1::fungible_asset {
    const EBALANCE_IS_NOT_ZERO: u64 = 14;
}
```

<a id="0x1_fungible_asset_EBURN_REF_AND_FUNGIBLE_ASSET_MISMATCH"></a>

Burn ref and fungible asset do not match.

```move
module 0x1::fungible_asset {
    const EBURN_REF_AND_FUNGIBLE_ASSET_MISMATCH: u64 = 13;
}
```

<a id="0x1_fungible_asset_EBURN_REF_AND_STORE_MISMATCH"></a>

Burn ref and store do not match.

```move
module 0x1::fungible_asset {
    const EBURN_REF_AND_STORE_MISMATCH: u64 = 10;
}
```

<a id="0x1_fungible_asset_ECONCURRENT_BALANCE_NOT_ENABLED"></a>

Flag for Concurrent Supply not enabled

```move
module 0x1::fungible_asset {
    const ECONCURRENT_BALANCE_NOT_ENABLED: u64 = 32;
}
```

<a id="0x1_fungible_asset_ECONCURRENT_SUPPLY_NOT_ENABLED"></a>

Flag for Concurrent Supply not enabled

```move
module 0x1::fungible_asset {
    const ECONCURRENT_SUPPLY_NOT_ENABLED: u64 = 22;
}
```

<a id="0x1_fungible_asset_EDECIMALS_TOO_LARGE"></a>

Decimals is over the maximum of 32

```move
module 0x1::fungible_asset {
    const EDECIMALS_TOO_LARGE: u64 = 17;
}
```

<a id="0x1_fungible_asset_EDEPOSIT_FUNCTION_SIGNATURE_MISMATCH"></a>

Provided deposit function type doesn&apos;t meet the signature requirement.

```move
module 0x1::fungible_asset {
    const EDEPOSIT_FUNCTION_SIGNATURE_MISMATCH: u64 = 26;
}
```

<a id="0x1_fungible_asset_EDERIVED_BALANCE_FUNCTION_SIGNATURE_MISMATCH"></a>

Provided derived_balance function type doesn&apos;t meet the signature requirement.

```move
module 0x1::fungible_asset {
    const EDERIVED_BALANCE_FUNCTION_SIGNATURE_MISMATCH: u64 = 27;
}
```

<a id="0x1_fungible_asset_EFUNGIBLE_ASSET_AND_STORE_MISMATCH"></a>

Fungible asset and store do not match.

```move
module 0x1::fungible_asset {
    const EFUNGIBLE_ASSET_AND_STORE_MISMATCH: u64 = 11;
}
```

<a id="0x1_fungible_asset_EFUNGIBLE_ASSET_MISMATCH"></a>

Fungible asset do not match when merging.

```move
module 0x1::fungible_asset {
    const EFUNGIBLE_ASSET_MISMATCH: u64 = 6;
}
```

<a id="0x1_fungible_asset_EFUNGIBLE_METADATA_EXISTENCE"></a>

Fungible metadata does not exist on this account.

```move
module 0x1::fungible_asset {
    const EFUNGIBLE_METADATA_EXISTENCE: u64 = 30;
}
```

<a id="0x1_fungible_asset_EFUNGIBLE_STORE_EXISTENCE"></a>

Flag for the existence of fungible store.

```move
module 0x1::fungible_asset {
    const EFUNGIBLE_STORE_EXISTENCE: u64 = 23;
}
```

<a id="0x1_fungible_asset_EINSUFFICIENT_BALANCE"></a>

Insufficient balance to withdraw or transfer.

```move
module 0x1::fungible_asset {
    const EINSUFFICIENT_BALANCE: u64 = 4;
}
```

<a id="0x1_fungible_asset_EINVALID_DISPATCHABLE_OPERATIONS"></a>

Invalid withdraw/deposit on dispatchable token. The specified token has a dispatchable function hook.
Need to invoke dispatchable_fungible_asset::withdraw/deposit to perform transfer.

```move
module 0x1::fungible_asset {
    const EINVALID_DISPATCHABLE_OPERATIONS: u64 = 28;
}
```

<a id="0x1_fungible_asset_EMAX_SUPPLY_EXCEEDED"></a>

The fungible asset&apos;s supply has exceeded maximum.

```move
module 0x1::fungible_asset {
    const EMAX_SUPPLY_EXCEEDED: u64 = 5;
}
```

<a id="0x1_fungible_asset_EMINT_REF_AND_STORE_MISMATCH"></a>

The mint ref and the store do not match.

```move
module 0x1::fungible_asset {
    const EMINT_REF_AND_STORE_MISMATCH: u64 = 7;
}
```

<a id="0x1_fungible_asset_ENAME_TOO_LONG"></a>

Name of the fungible asset metadata is too long

```move
module 0x1::fungible_asset {
    const ENAME_TOO_LONG: u64 = 15;
}
```

<a id="0x1_fungible_asset_ENOT_METADATA_OWNER"></a>

Account is not the owner of metadata object.

```move
module 0x1::fungible_asset {
    const ENOT_METADATA_OWNER: u64 = 24;
}
```

<a id="0x1_fungible_asset_ENOT_STORE_OWNER"></a>

Account is not the store&apos;s owner.

```move
module 0x1::fungible_asset {
    const ENOT_STORE_OWNER: u64 = 8;
}
```

<a id="0x1_fungible_asset_EOBJECT_IS_DELETABLE"></a>

Fungibility is only available for non&#45;deletable objects.

```move
module 0x1::fungible_asset {
    const EOBJECT_IS_DELETABLE: u64 = 18;
}
```

<a id="0x1_fungible_asset_ESTORE_IS_FROZEN"></a>

Store is disabled from sending and receiving this fungible asset.

```move
module 0x1::fungible_asset {
    const ESTORE_IS_FROZEN: u64 = 3;
}
```

<a id="0x1_fungible_asset_ESUPPLY_NOT_FOUND"></a>

Supply resource is not found for a metadata object.

```move
module 0x1::fungible_asset {
    const ESUPPLY_NOT_FOUND: u64 = 21;
}
```

<a id="0x1_fungible_asset_ESUPPLY_UNDERFLOW"></a>

The fungible asset&apos;s supply will be negative which should be impossible.

```move
module 0x1::fungible_asset {
    const ESUPPLY_UNDERFLOW: u64 = 20;
}
```

<a id="0x1_fungible_asset_ESYMBOL_TOO_LONG"></a>

Symbol of the fungible asset metadata is too long

```move
module 0x1::fungible_asset {
    const ESYMBOL_TOO_LONG: u64 = 16;
}
```

<a id="0x1_fungible_asset_ETRANSFER_REF_AND_FUNGIBLE_ASSET_MISMATCH"></a>

The transfer ref and the fungible asset do not match.

```move
module 0x1::fungible_asset {
    const ETRANSFER_REF_AND_FUNGIBLE_ASSET_MISMATCH: u64 = 2;
}
```

<a id="0x1_fungible_asset_ETRANSFER_REF_AND_STORE_MISMATCH"></a>

Transfer ref and store do not match.

```move
module 0x1::fungible_asset {
    const ETRANSFER_REF_AND_STORE_MISMATCH: u64 = 9;
}
```

<a id="0x1_fungible_asset_EURI_TOO_LONG"></a>

URI for the icon of the fungible asset metadata is too long

```move
module 0x1::fungible_asset {
    const EURI_TOO_LONG: u64 = 19;
}
```

<a id="0x1_fungible_asset_EWITHDRAW_FUNCTION_SIGNATURE_MISMATCH"></a>

Provided withdraw function type doesn&apos;t meet the signature requirement.

```move
module 0x1::fungible_asset {
    const EWITHDRAW_FUNCTION_SIGNATURE_MISMATCH: u64 = 25;
}
```

<a id="0x1_fungible_asset_MAX_DECIMALS"></a>

```move
module 0x1::fungible_asset {
    const MAX_DECIMALS: u8 = 32;
}
```

<a id="0x1_fungible_asset_MAX_NAME_LENGTH"></a>

```move
module 0x1::fungible_asset {
    const MAX_NAME_LENGTH: u64 = 32;
}
```

<a id="0x1_fungible_asset_MAX_SYMBOL_LENGTH"></a>

```move
module 0x1::fungible_asset {
    const MAX_SYMBOL_LENGTH: u64 = 10;
}
```

<a id="0x1_fungible_asset_MAX_URI_LENGTH"></a>

```move
module 0x1::fungible_asset {
    const MAX_URI_LENGTH: u64 = 512;
}
```

<a id="0x1_fungible_asset_add_fungibility"></a>

## Function `add_fungibility`

Make an existing object fungible by adding the Metadata resource.
This returns the capabilities to mint, burn, and transfer.
maximum_supply defines the behavior of maximum supply when monitoring:
&#45; option::none(): Monitoring unlimited supply
(width of the field &#45; MAX_U128 is the implicit maximum supply)
if option::some(MAX_U128) is used, it is treated as unlimited supply.
&#45; option::some(max): Monitoring fixed supply with `max` as the maximum supply.

```move
module 0x1::fungible_asset {
    public fun add_fungibility(constructor_ref: &object::ConstructorRef, maximum_supply: option::Option<u128>, name: string::String, symbol: string::String, decimals: u8, icon_uri: string::String, project_uri: string::String): object::Object<fungible_asset::Metadata>
}
```

<a id="0x1_fungible_asset_set_untransferable"></a>

## Function `set_untransferable`

Set that only untransferable stores can be created for this fungible asset.

```move
module 0x1::fungible_asset {
    public fun set_untransferable(constructor_ref: &object::ConstructorRef)
}
```

<a id="0x1_fungible_asset_is_untransferable"></a>

## Function `is_untransferable`

Returns true if the FA is untransferable.

```move
module 0x1::fungible_asset {
    #[view]
    public fun is_untransferable<T: key>(metadata: object::Object<T>): bool
}
```

<a id="0x1_fungible_asset_register_dispatch_functions"></a>

## Function `register_dispatch_functions`

Create a fungible asset store whose transfer rule would be overloaded by the provided function.

```move
module 0x1::fungible_asset {
    public(friend) fun register_dispatch_functions(constructor_ref: &object::ConstructorRef, withdraw_function: option::Option<function_info::FunctionInfo>, deposit_function: option::Option<function_info::FunctionInfo>, derived_balance_function: option::Option<function_info::FunctionInfo>)
}
```

<a id="0x1_fungible_asset_generate_mint_ref"></a>

## Function `generate_mint_ref`

Creates a mint ref that can be used to mint fungible assets from the given fungible object&apos;s constructor ref.
This can only be called at object creation time as constructor_ref is only available then.

```move
module 0x1::fungible_asset {
    public fun generate_mint_ref(constructor_ref: &object::ConstructorRef): fungible_asset::MintRef
}
```

<a id="0x1_fungible_asset_generate_burn_ref"></a>

## Function `generate_burn_ref`

Creates a burn ref that can be used to burn fungible assets from the given fungible object&apos;s constructor ref.
This can only be called at object creation time as constructor_ref is only available then.

```move
module 0x1::fungible_asset {
    public fun generate_burn_ref(constructor_ref: &object::ConstructorRef): fungible_asset::BurnRef
}
```

<a id="0x1_fungible_asset_generate_transfer_ref"></a>

## Function `generate_transfer_ref`

Creates a transfer ref that can be used to freeze/unfreeze/transfer fungible assets from the given fungible
object&apos;s constructor ref.
This can only be called at object creation time as constructor_ref is only available then.

```move
module 0x1::fungible_asset {
    public fun generate_transfer_ref(constructor_ref: &object::ConstructorRef): fungible_asset::TransferRef
}
```

<a id="0x1_fungible_asset_supply"></a>

## Function `supply`

Get the current supply from the `metadata` object.

```move
module 0x1::fungible_asset {
    #[view]
    public fun supply<T: key>(metadata: object::Object<T>): option::Option<u128>
}
```

<a id="0x1_fungible_asset_maximum"></a>

## Function `maximum`

Get the maximum supply from the `metadata` object.
If supply is unlimited (or set explicitly to MAX_U128), none is returned

```move
module 0x1::fungible_asset {
    #[view]
    public fun maximum<T: key>(metadata: object::Object<T>): option::Option<u128>
}
```

<a id="0x1_fungible_asset_name"></a>

## Function `name`

Get the name of the fungible asset from the `metadata` object.

```move
module 0x1::fungible_asset {
    #[view]
    public fun name<T: key>(metadata: object::Object<T>): string::String
}
```

<a id="0x1_fungible_asset_symbol"></a>

## Function `symbol`

Get the symbol of the fungible asset from the `metadata` object.

```move
module 0x1::fungible_asset {
    #[view]
    public fun symbol<T: key>(metadata: object::Object<T>): string::String
}
```

<a id="0x1_fungible_asset_decimals"></a>

## Function `decimals`

Get the decimals from the `metadata` object.

```move
module 0x1::fungible_asset {
    #[view]
    public fun decimals<T: key>(metadata: object::Object<T>): u8
}
```

<a id="0x1_fungible_asset_icon_uri"></a>

## Function `icon_uri`

Get the icon uri from the `metadata` object.

```move
module 0x1::fungible_asset {
    #[view]
    public fun icon_uri<T: key>(metadata: object::Object<T>): string::String
}
```

<a id="0x1_fungible_asset_project_uri"></a>

## Function `project_uri`

Get the project uri from the `metadata` object.

```move
module 0x1::fungible_asset {
    #[view]
    public fun project_uri<T: key>(metadata: object::Object<T>): string::String
}
```

<a id="0x1_fungible_asset_store_exists"></a>

## Function `store_exists`

Return whether the provided address has a store initialized.

```move
module 0x1::fungible_asset {
    #[view]
    public fun store_exists(store: address): bool
}
```

<a id="0x1_fungible_asset_metadata_from_asset"></a>

## Function `metadata_from_asset`

Return the underlying metadata object

```move
module 0x1::fungible_asset {
    public fun metadata_from_asset(fa: &fungible_asset::FungibleAsset): object::Object<fungible_asset::Metadata>
}
```

<a id="0x1_fungible_asset_store_metadata"></a>

## Function `store_metadata`

Return the underlying metadata object.

```move
module 0x1::fungible_asset {
    #[view]
    public fun store_metadata<T: key>(store: object::Object<T>): object::Object<fungible_asset::Metadata>
}
```

<a id="0x1_fungible_asset_amount"></a>

## Function `amount`

Return the `amount` of a given fungible asset.

```move
module 0x1::fungible_asset {
    public fun amount(fa: &fungible_asset::FungibleAsset): u64
}
```

<a id="0x1_fungible_asset_balance"></a>

## Function `balance`

Get the balance of a given store.

```move
module 0x1::fungible_asset {
    #[view]
    public fun balance<T: key>(store: object::Object<T>): u64
}
```

<a id="0x1_fungible_asset_is_balance_at_least"></a>

## Function `is_balance_at_least`

Check whether the balance of a given store is &gt;&#61; `amount`.

```move
module 0x1::fungible_asset {
    #[view]
    public fun is_balance_at_least<T: key>(store: object::Object<T>, amount: u64): bool
}
```

<a id="0x1_fungible_asset_is_address_balance_at_least"></a>

## Function `is_address_balance_at_least`

Check whether the balance of a given store is &gt;&#61; `amount`.

```move
module 0x1::fungible_asset {
    public(friend) fun is_address_balance_at_least(store_addr: address, amount: u64): bool
}
```

<a id="0x1_fungible_asset_is_frozen"></a>

## Function `is_frozen`

Return whether a store is frozen.

If the store has not been created, we default to returning false so deposits can be sent to it.

```move
module 0x1::fungible_asset {
    #[view]
    public fun is_frozen<T: key>(store: object::Object<T>): bool
}
```

<a id="0x1_fungible_asset_is_store_dispatchable"></a>

## Function `is_store_dispatchable`

Return whether a fungible asset type is dispatchable.

```move
module 0x1::fungible_asset {
    #[view]
    public fun is_store_dispatchable<T: key>(store: object::Object<T>): bool
}
```

<a id="0x1_fungible_asset_deposit_dispatch_function"></a>

## Function `deposit_dispatch_function`

```move
module 0x1::fungible_asset {
    public fun deposit_dispatch_function<T: key>(store: object::Object<T>): option::Option<function_info::FunctionInfo>
}
```

<a id="0x1_fungible_asset_withdraw_dispatch_function"></a>

## Function `withdraw_dispatch_function`

```move
module 0x1::fungible_asset {
    public fun withdraw_dispatch_function<T: key>(store: object::Object<T>): option::Option<function_info::FunctionInfo>
}
```

<a id="0x1_fungible_asset_derived_balance_dispatch_function"></a>

## Function `derived_balance_dispatch_function`

```move
module 0x1::fungible_asset {
    public(friend) fun derived_balance_dispatch_function<T: key>(store: object::Object<T>): option::Option<function_info::FunctionInfo>
}
```

<a id="0x1_fungible_asset_asset_metadata"></a>

## Function `asset_metadata`

```move
module 0x1::fungible_asset {
    public fun asset_metadata(fa: &fungible_asset::FungibleAsset): object::Object<fungible_asset::Metadata>
}
```

<a id="0x1_fungible_asset_mint_ref_metadata"></a>

## Function `mint_ref_metadata`

Get the underlying metadata object from the `MintRef`.

```move
module 0x1::fungible_asset {
    public fun mint_ref_metadata(ref: &fungible_asset::MintRef): object::Object<fungible_asset::Metadata>
}
```

<a id="0x1_fungible_asset_transfer_ref_metadata"></a>

## Function `transfer_ref_metadata`

Get the underlying metadata object from the `TransferRef`.

```move
module 0x1::fungible_asset {
    public fun transfer_ref_metadata(ref: &fungible_asset::TransferRef): object::Object<fungible_asset::Metadata>
}
```

<a id="0x1_fungible_asset_burn_ref_metadata"></a>

## Function `burn_ref_metadata`

Get the underlying metadata object from the `BurnRef`.

```move
module 0x1::fungible_asset {
    public fun burn_ref_metadata(ref: &fungible_asset::BurnRef): object::Object<fungible_asset::Metadata>
}
```

<a id="0x1_fungible_asset_transfer"></a>

## Function `transfer`

Transfer an `amount` of fungible asset from `from_store`, which should be owned by `sender`, to `receiver`.
Note: it does not move the underlying object.

```move
module 0x1::fungible_asset {
    public entry fun transfer<T: key>(sender: &signer, from: object::Object<T>, to: object::Object<T>, amount: u64)
}
```

<a id="0x1_fungible_asset_create_store"></a>

## Function `create_store`

Allow an object to hold a store for fungible assets.
Applications can use this to create multiple stores for isolating fungible assets for different purposes.

```move
module 0x1::fungible_asset {
    public fun create_store<T: key>(constructor_ref: &object::ConstructorRef, metadata: object::Object<T>): object::Object<fungible_asset::FungibleStore>
}
```

<a id="0x1_fungible_asset_remove_store"></a>

## Function `remove_store`

Used to delete a store. Requires the store to be completely empty prior to removing it

```move
module 0x1::fungible_asset {
    public fun remove_store(delete_ref: &object::DeleteRef)
}
```

<a id="0x1_fungible_asset_withdraw"></a>

## Function `withdraw`

Withdraw `amount` of the fungible asset from `store` by the owner.

```move
module 0x1::fungible_asset {
    public fun withdraw<T: key>(owner: &signer, store: object::Object<T>, amount: u64): fungible_asset::FungibleAsset
}
```

<a id="0x1_fungible_asset_withdraw_sanity_check"></a>

## Function `withdraw_sanity_check`

Check the permission for withdraw operation.

```move
module 0x1::fungible_asset {
    public(friend) fun withdraw_sanity_check<T: key>(owner: &signer, store: object::Object<T>, abort_on_dispatch: bool)
}
```

<a id="0x1_fungible_asset_deposit_sanity_check"></a>

## Function `deposit_sanity_check`

Deposit `amount` of the fungible asset to `store`.

```move
module 0x1::fungible_asset {
    public fun deposit_sanity_check<T: key>(store: object::Object<T>, abort_on_dispatch: bool)
}
```

<a id="0x1_fungible_asset_deposit"></a>

## Function `deposit`

Deposit `amount` of the fungible asset to `store`.

```move
module 0x1::fungible_asset {
    public fun deposit<T: key>(store: object::Object<T>, fa: fungible_asset::FungibleAsset)
}
```

<a id="0x1_fungible_asset_mint"></a>

## Function `mint`

Mint the specified `amount` of the fungible asset.

```move
module 0x1::fungible_asset {
    public fun mint(ref: &fungible_asset::MintRef, amount: u64): fungible_asset::FungibleAsset
}
```

<a id="0x1_fungible_asset_mint_internal"></a>

## Function `mint_internal`

CAN ONLY BE CALLED BY coin.move for migration.

```move
module 0x1::fungible_asset {
    public(friend) fun mint_internal(metadata: object::Object<fungible_asset::Metadata>, amount: u64): fungible_asset::FungibleAsset
}
```

<a id="0x1_fungible_asset_mint_to"></a>

## Function `mint_to`

Mint the specified `amount` of the fungible asset to a destination store.

```move
module 0x1::fungible_asset {
    public fun mint_to<T: key>(ref: &fungible_asset::MintRef, store: object::Object<T>, amount: u64)
}
```

<a id="0x1_fungible_asset_set_frozen_flag"></a>

## Function `set_frozen_flag`

Enable/disable a store&apos;s ability to do direct transfers of the fungible asset.

```move
module 0x1::fungible_asset {
    public fun set_frozen_flag<T: key>(ref: &fungible_asset::TransferRef, store: object::Object<T>, frozen: bool)
}
```

<a id="0x1_fungible_asset_set_frozen_flag_internal"></a>

## Function `set_frozen_flag_internal`

```move
module 0x1::fungible_asset {
    public(friend) fun set_frozen_flag_internal<T: key>(store: object::Object<T>, frozen: bool)
}
```

<a id="0x1_fungible_asset_burn"></a>

## Function `burn`

Burns a fungible asset

```move
module 0x1::fungible_asset {
    public fun burn(ref: &fungible_asset::BurnRef, fa: fungible_asset::FungibleAsset)
}
```

<a id="0x1_fungible_asset_burn_internal"></a>

## Function `burn_internal`

CAN ONLY BE CALLED BY coin.move for migration.

```move
module 0x1::fungible_asset {
    public(friend) fun burn_internal(fa: fungible_asset::FungibleAsset): u64
}
```

<a id="0x1_fungible_asset_burn_from"></a>

## Function `burn_from`

Burn the `amount` of the fungible asset from the given store.

```move
module 0x1::fungible_asset {
    public fun burn_from<T: key>(ref: &fungible_asset::BurnRef, store: object::Object<T>, amount: u64)
}
```

<a id="0x1_fungible_asset_address_burn_from"></a>

## Function `address_burn_from`

```move
module 0x1::fungible_asset {
    public(friend) fun address_burn_from(ref: &fungible_asset::BurnRef, store_addr: address, amount: u64)
}
```

<a id="0x1_fungible_asset_withdraw_with_ref"></a>

## Function `withdraw_with_ref`

Withdraw `amount` of the fungible asset from the `store` ignoring `frozen`.

```move
module 0x1::fungible_asset {
    public fun withdraw_with_ref<T: key>(ref: &fungible_asset::TransferRef, store: object::Object<T>, amount: u64): fungible_asset::FungibleAsset
}
```

<a id="0x1_fungible_asset_deposit_with_ref"></a>

## Function `deposit_with_ref`

Deposit the fungible asset into the `store` ignoring `frozen`.

```move
module 0x1::fungible_asset {
    public fun deposit_with_ref<T: key>(ref: &fungible_asset::TransferRef, store: object::Object<T>, fa: fungible_asset::FungibleAsset)
}
```

<a id="0x1_fungible_asset_transfer_with_ref"></a>

## Function `transfer_with_ref`

Transfer `amount` of the fungible asset with `TransferRef` even it is frozen.

```move
module 0x1::fungible_asset {
    public fun transfer_with_ref<T: key>(transfer_ref: &fungible_asset::TransferRef, from: object::Object<T>, to: object::Object<T>, amount: u64)
}
```

<a id="0x1_fungible_asset_zero"></a>

## Function `zero`

Create a fungible asset with zero amount.
This can be useful when starting a series of computations where the initial value is 0.

```move
module 0x1::fungible_asset {
    public fun zero<T: key>(metadata: object::Object<T>): fungible_asset::FungibleAsset
}
```

<a id="0x1_fungible_asset_extract"></a>

## Function `extract`

Extract a given amount from the given fungible asset and return a new one.

```move
module 0x1::fungible_asset {
    public fun extract(fungible_asset: &mut fungible_asset::FungibleAsset, amount: u64): fungible_asset::FungibleAsset
}
```

<a id="0x1_fungible_asset_merge"></a>

## Function `merge`

&quot;Merges&quot; the two given fungible assets. The fungible asset passed in as `dst_fungible_asset` will have a value
equal to the sum of the two (`dst_fungible_asset` and `src_fungible_asset`).

```move
module 0x1::fungible_asset {
    public fun merge(dst_fungible_asset: &mut fungible_asset::FungibleAsset, src_fungible_asset: fungible_asset::FungibleAsset)
}
```

<a id="0x1_fungible_asset_destroy_zero"></a>

## Function `destroy_zero`

Destroy an empty fungible asset.

```move
module 0x1::fungible_asset {
    public fun destroy_zero(fungible_asset: fungible_asset::FungibleAsset)
}
```

<a id="0x1_fungible_asset_deposit_internal"></a>

## Function `deposit_internal`

```move
module 0x1::fungible_asset {
    public(friend) fun deposit_internal(store_addr: address, fa: fungible_asset::FungibleAsset)
}
```

<a id="0x1_fungible_asset_withdraw_internal"></a>

## Function `withdraw_internal`

Extract `amount` of the fungible asset from `store`.

```move
module 0x1::fungible_asset {
    public(friend) fun withdraw_internal(store_addr: address, amount: u64): fungible_asset::FungibleAsset
}
```

<a id="0x1_fungible_asset_upgrade_to_concurrent"></a>

## Function `upgrade_to_concurrent`

```move
module 0x1::fungible_asset {
    public fun upgrade_to_concurrent(ref: &object::ExtendRef)
}
```

<a id="0x1_fungible_asset_upgrade_store_to_concurrent"></a>

## Function `upgrade_store_to_concurrent`

```move
module 0x1::fungible_asset {
    public entry fun upgrade_store_to_concurrent<T: key>(owner: &signer, store: object::Object<T>)
}
```
