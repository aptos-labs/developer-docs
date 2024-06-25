<a id="0x1_dispatchable_fungible_asset"></a>

# Module `0x1::dispatchable_fungible_asset`

This defines the fungible asset module that can issue fungible asset of any `Metadata` object. The
metadata object can be any object that equipped with `Metadata` resource.

The dispatchable_fungible_asset wraps the existing fungible_asset module and adds the ability for token issuer
to customize the logic for withdraw and deposit operations. For example:

&#45; Deflation token: a fixed percentage of token will be destructed upon transfer.
&#45; Transfer allowlist: token can only be transfered to addresses in the allow list.
&#45; Predicated transfer: transfer can only happen when some certain predicate has been met.
&#45; Loyalty token: a fixed loyalty will be paid to a designated address when a fungible asset transfer happens

The api listed here intended to be an in&#45;place replacement for defi applications that uses fungible_asset api directly
and is safe for non&#45;dispatchable (aka vanilla) fungible assets as well.

See AIP&#45;73 for further discussion

- [Resource `TransferRefStore`](#0x1_dispatchable_fungible_asset_TransferRefStore)
- [Constants](#@Constants_0)
- [Function `register_dispatch_functions`](#0x1_dispatchable_fungible_asset_register_dispatch_functions)
- [Function `withdraw`](#0x1_dispatchable_fungible_asset_withdraw)
- [Function `deposit`](#0x1_dispatchable_fungible_asset_deposit)
- [Function `transfer`](#0x1_dispatchable_fungible_asset_transfer)
- [Function `transfer_assert_minimum_deposit`](#0x1_dispatchable_fungible_asset_transfer_assert_minimum_deposit)
- [Function `derived_balance`](#0x1_dispatchable_fungible_asset_derived_balance)

```move
module 0x1::dispatchable_fungible_asset {
    use 0x1::error;
    use 0x1::features;
    use 0x1::function_info;
    use 0x1::fungible_asset;
    use 0x1::object;
    use 0x1::option;
}
```

<a id="0x1_dispatchable_fungible_asset_TransferRefStore"></a>

## Resource `TransferRefStore`

```move
module 0x1::dispatchable_fungible_asset {
    #[resource_group_member(#[group = 0x1::object::ObjectGroup])]
    struct TransferRefStore has key
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_dispatchable_fungible_asset_ENOT_ACTIVATED"></a>

Feature is not activated yet on the network.

```move
module 0x1::dispatchable_fungible_asset {
    const ENOT_ACTIVATED: u64 = 3;
}
```

<a id="0x1_dispatchable_fungible_asset_EAMOUNT_MISMATCH"></a>

Recipient is not getting the guaranteed value;

```move
module 0x1::dispatchable_fungible_asset {
    const EAMOUNT_MISMATCH: u64 = 2;
}
```

<a id="0x1_dispatchable_fungible_asset_ENOT_LOADED"></a>

Dispatch target is not loaded.

```move
module 0x1::dispatchable_fungible_asset {
    const ENOT_LOADED: u64 = 4;
}
```

<a id="0x1_dispatchable_fungible_asset_ESTORE_NOT_FOUND"></a>

TransferRefStore doesn&apos;t exist on the fungible asset type.

```move
module 0x1::dispatchable_fungible_asset {
    const ESTORE_NOT_FOUND: u64 = 1;
}
```

<a id="0x1_dispatchable_fungible_asset_register_dispatch_functions"></a>

## Function `register_dispatch_functions`

```move
module 0x1::dispatchable_fungible_asset {
    public fun register_dispatch_functions(constructor_ref: &object::ConstructorRef, withdraw_function: option::Option<function_info::FunctionInfo>, deposit_function: option::Option<function_info::FunctionInfo>, derived_balance_function: option::Option<function_info::FunctionInfo>)
}
```

<a id="0x1_dispatchable_fungible_asset_withdraw"></a>

## Function `withdraw`

Withdraw `amount` of the fungible asset from `store` by the owner.

The semantics of deposit will be governed by the function specified in DispatchFunctionStore.

```move
module 0x1::dispatchable_fungible_asset {
    public fun withdraw<T: key>(owner: &signer, store: object::Object<T>, amount: u64): fungible_asset::FungibleAsset
}
```

<a id="0x1_dispatchable_fungible_asset_deposit"></a>

## Function `deposit`

Deposit `amount` of the fungible asset to `store`.

The semantics of deposit will be governed by the function specified in DispatchFunctionStore.

```move
module 0x1::dispatchable_fungible_asset {
    public fun deposit<T: key>(store: object::Object<T>, fa: fungible_asset::FungibleAsset)
}
```

<a id="0x1_dispatchable_fungible_asset_transfer"></a>

## Function `transfer`

Transfer an `amount` of fungible asset from `from_store`, which should be owned by `sender`, to `receiver`.
Note: it does not move the underlying object.

```move
module 0x1::dispatchable_fungible_asset {
    public entry fun transfer<T: key>(sender: &signer, from: object::Object<T>, to: object::Object<T>, amount: u64)
}
```

<a id="0x1_dispatchable_fungible_asset_transfer_assert_minimum_deposit"></a>

## Function `transfer_assert_minimum_deposit`

Transfer an `amount` of fungible asset from `from_store`, which should be owned by `sender`, to `receiver`.
The recipient is guranteed to receive asset greater than the expected amount.
Note: it does not move the underlying object.

```move
module 0x1::dispatchable_fungible_asset {
    public entry fun transfer_assert_minimum_deposit<T: key>(sender: &signer, from: object::Object<T>, to: object::Object<T>, amount: u64, expected: u64)
}
```

<a id="0x1_dispatchable_fungible_asset_derived_balance"></a>

## Function `derived_balance`

Get the derived value of store using the overloaded hook.

The semantics of value will be governed by the function specified in DispatchFunctionStore.

```move
module 0x1::dispatchable_fungible_asset {
    #[view]
    public fun derived_balance<T: key>(store: object::Object<T>): u64
}
```
