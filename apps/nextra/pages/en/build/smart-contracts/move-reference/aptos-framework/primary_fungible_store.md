<a id="0x1_primary_fungible_store"></a>

# Module `0x1::primary_fungible_store`

This module provides a way for creators of fungible assets to enable support for creating primary (deterministic)
stores for their users. This is useful for assets that are meant to be used as a currency, as it allows users to
easily create a store for their account and deposit/withdraw/transfer fungible assets to/from it.

The transfer flow works as below:

1. The sender calls `transfer` on the fungible asset metadata object to transfer `amount` of fungible asset to
   `recipient`.
2. The fungible asset metadata object calls `ensure_primary_store_exists` to ensure that both the sender&apos;s and the
   recipient&apos;s primary stores exist. If either doesn&apos;t, it will be created.
3. The fungible asset metadata object calls `withdraw` on the sender&apos;s primary store to withdraw `amount` of
   fungible asset from it. This emits a withdraw event.
4. The fungible asset metadata object calls `deposit` on the recipient&apos;s primary store to deposit `amount` of
   fungible asset to it. This emits an deposit event.

- [Resource `DeriveRefPod`](#0x1_primary_fungible_store_DeriveRefPod)
- [Function `create_primary_store_enabled_fungible_asset`](#0x1_primary_fungible_store_create_primary_store_enabled_fungible_asset)
- [Function `ensure_primary_store_exists`](#0x1_primary_fungible_store_ensure_primary_store_exists)
- [Function `create_primary_store`](#0x1_primary_fungible_store_create_primary_store)
- [Function `primary_store_address`](#0x1_primary_fungible_store_primary_store_address)
- [Function `primary_store`](#0x1_primary_fungible_store_primary_store)
- [Function `primary_store_exists`](#0x1_primary_fungible_store_primary_store_exists)
- [Function `primary_store_address_inlined`](#0x1_primary_fungible_store_primary_store_address_inlined)
- [Function `primary_store_inlined`](#0x1_primary_fungible_store_primary_store_inlined)
- [Function `primary_store_exists_inlined`](#0x1_primary_fungible_store_primary_store_exists_inlined)
- [Function `balance`](#0x1_primary_fungible_store_balance)
- [Function `is_balance_at_least`](#0x1_primary_fungible_store_is_balance_at_least)
- [Function `is_frozen`](#0x1_primary_fungible_store_is_frozen)
- [Function `withdraw`](#0x1_primary_fungible_store_withdraw)
- [Function `deposit`](#0x1_primary_fungible_store_deposit)
- [Function `force_deposit`](#0x1_primary_fungible_store_force_deposit)
- [Function `transfer`](#0x1_primary_fungible_store_transfer)
- [Function `transfer_assert_minimum_deposit`](#0x1_primary_fungible_store_transfer_assert_minimum_deposit)
- [Function `mint`](#0x1_primary_fungible_store_mint)
- [Function `burn`](#0x1_primary_fungible_store_burn)
- [Function `set_frozen_flag`](#0x1_primary_fungible_store_set_frozen_flag)
- [Function `withdraw_with_ref`](#0x1_primary_fungible_store_withdraw_with_ref)
- [Function `deposit_with_ref`](#0x1_primary_fungible_store_deposit_with_ref)
- [Function `transfer_with_ref`](#0x1_primary_fungible_store_transfer_with_ref)

```move
module 0x1::primary_fungible_store {
    use 0x1::dispatchable_fungible_asset;
    use 0x1::fungible_asset;
    use 0x1::object;
    use 0x1::option;
    use 0x1::signer;
    use 0x1::string;
}
```

<a id="0x1_primary_fungible_store_DeriveRefPod"></a>

## Resource `DeriveRefPod`

A resource that holds the derive ref for the fungible asset metadata object. This is used to create primary
stores for users with deterministic addresses so that users can easily deposit/withdraw/transfer fungible
assets.

```move
module 0x1::primary_fungible_store {
    #[resource_group_member(#[group = 0x1::object::ObjectGroup])]
    struct DeriveRefPod has key
}
```

<a id="0x1_primary_fungible_store_create_primary_store_enabled_fungible_asset"></a>

## Function `create_primary_store_enabled_fungible_asset`

Create a fungible asset with primary store support. When users transfer fungible assets to each other, their
primary stores will be created automatically if they don&apos;t exist. Primary stores have deterministic addresses
so that users can easily deposit/withdraw/transfer fungible assets.

```move
module 0x1::primary_fungible_store {
    public fun create_primary_store_enabled_fungible_asset(constructor_ref: &object::ConstructorRef, maximum_supply: option::Option<u128>, name: string::String, symbol: string::String, decimals: u8, icon_uri: string::String, project_uri: string::String)
}
```

<a id="0x1_primary_fungible_store_ensure_primary_store_exists"></a>

## Function `ensure_primary_store_exists`

Ensure that the primary store object for the given address exists. If it doesn&apos;t, create it.

```move
module 0x1::primary_fungible_store {
    public fun ensure_primary_store_exists<T: key>(owner: address, metadata: object::Object<T>): object::Object<fungible_asset::FungibleStore>
}
```

<a id="0x1_primary_fungible_store_create_primary_store"></a>

## Function `create_primary_store`

Create a primary store object to hold fungible asset for the given address.

```move
module 0x1::primary_fungible_store {
    public fun create_primary_store<T: key>(owner_addr: address, metadata: object::Object<T>): object::Object<fungible_asset::FungibleStore>
}
```

<a id="0x1_primary_fungible_store_primary_store_address"></a>

## Function `primary_store_address`

Get the address of the primary store for the given account.

```move
module 0x1::primary_fungible_store {
    #[view]
    public fun primary_store_address<T: key>(owner: address, metadata: object::Object<T>): address
}
```

<a id="0x1_primary_fungible_store_primary_store"></a>

## Function `primary_store`

Get the primary store object for the given account.

```move
module 0x1::primary_fungible_store {
    #[view]
    public fun primary_store<T: key>(owner: address, metadata: object::Object<T>): object::Object<fungible_asset::FungibleStore>
}
```

<a id="0x1_primary_fungible_store_primary_store_exists"></a>

## Function `primary_store_exists`

Return whether the given account&apos;s primary store exists.

```move
module 0x1::primary_fungible_store {
    #[view]
    public fun primary_store_exists<T: key>(account: address, metadata: object::Object<T>): bool
}
```

<a id="0x1_primary_fungible_store_primary_store_address_inlined"></a>

## Function `primary_store_address_inlined`

Get the address of the primary store for the given account.
Use instead of the corresponding view functions for dispatchable hooks to avoid circular dependencies of modules.

```move
module 0x1::primary_fungible_store {
    public fun primary_store_address_inlined<T: key>(owner: address, metadata: object::Object<T>): address
}
```

<a id="0x1_primary_fungible_store_primary_store_inlined"></a>

## Function `primary_store_inlined`

Get the primary store object for the given account.
Use instead of the corresponding view functions for dispatchable hooks to avoid circular dependencies of modules.

```move
module 0x1::primary_fungible_store {
    public fun primary_store_inlined<T: key>(owner: address, metadata: object::Object<T>): object::Object<fungible_asset::FungibleStore>
}
```

<a id="0x1_primary_fungible_store_primary_store_exists_inlined"></a>

## Function `primary_store_exists_inlined`

Return whether the given account&apos;s primary store exists.
Use instead of the corresponding view functions for dispatchable hooks to avoid circular dependencies of modules.

```move
module 0x1::primary_fungible_store {
    public fun primary_store_exists_inlined<T: key>(account: address, metadata: object::Object<T>): bool
}
```

<a id="0x1_primary_fungible_store_balance"></a>

## Function `balance`

Get the balance of `account`&apos;s primary store.

```move
module 0x1::primary_fungible_store {
    #[view]
    public fun balance<T: key>(account: address, metadata: object::Object<T>): u64
}
```

<a id="0x1_primary_fungible_store_is_balance_at_least"></a>

## Function `is_balance_at_least`

```move
module 0x1::primary_fungible_store {
    #[view]
    public fun is_balance_at_least<T: key>(account: address, metadata: object::Object<T>, amount: u64): bool
}
```

<a id="0x1_primary_fungible_store_is_frozen"></a>

## Function `is_frozen`

Return whether the given account&apos;s primary store is frozen.

```move
module 0x1::primary_fungible_store {
    #[view]
    public fun is_frozen<T: key>(account: address, metadata: object::Object<T>): bool
}
```

<a id="0x1_primary_fungible_store_withdraw"></a>

## Function `withdraw`

Withdraw `amount` of fungible asset from the given account&apos;s primary store.

```move
module 0x1::primary_fungible_store {
    public fun withdraw<T: key>(owner: &signer, metadata: object::Object<T>, amount: u64): fungible_asset::FungibleAsset
}
```

<a id="0x1_primary_fungible_store_deposit"></a>

## Function `deposit`

Deposit fungible asset `fa` to the given account&apos;s primary store.

```move
module 0x1::primary_fungible_store {
    public fun deposit(owner: address, fa: fungible_asset::FungibleAsset)
}
```

<a id="0x1_primary_fungible_store_force_deposit"></a>

## Function `force_deposit`

Deposit fungible asset `fa` to the given account&apos;s primary store.

```move
module 0x1::primary_fungible_store {
    public(friend) fun force_deposit(owner: address, fa: fungible_asset::FungibleAsset)
}
```

<a id="0x1_primary_fungible_store_transfer"></a>

## Function `transfer`

Transfer `amount` of fungible asset from sender&apos;s primary store to receiver&apos;s primary store.

```move
module 0x1::primary_fungible_store {
    public entry fun transfer<T: key>(sender: &signer, metadata: object::Object<T>, recipient: address, amount: u64)
}
```

<a id="0x1_primary_fungible_store_transfer_assert_minimum_deposit"></a>

## Function `transfer_assert_minimum_deposit`

Transfer `amount` of fungible asset from sender&apos;s primary store to receiver&apos;s primary store.
Use the minimum deposit assertion api to make sure receipient will receive a minimum amount of fund.

```move
module 0x1::primary_fungible_store {
    public entry fun transfer_assert_minimum_deposit<T: key>(sender: &signer, metadata: object::Object<T>, recipient: address, amount: u64, expected: u64)
}
```

<a id="0x1_primary_fungible_store_mint"></a>

## Function `mint`

Mint to the primary store of `owner`.

```move
module 0x1::primary_fungible_store {
    public fun mint(mint_ref: &fungible_asset::MintRef, owner: address, amount: u64)
}
```

<a id="0x1_primary_fungible_store_burn"></a>

## Function `burn`

Burn from the primary store of `owner`.

```move
module 0x1::primary_fungible_store {
    public fun burn(burn_ref: &fungible_asset::BurnRef, owner: address, amount: u64)
}
```

<a id="0x1_primary_fungible_store_set_frozen_flag"></a>

## Function `set_frozen_flag`

Freeze/Unfreeze the primary store of `owner`.

```move
module 0x1::primary_fungible_store {
    public fun set_frozen_flag(transfer_ref: &fungible_asset::TransferRef, owner: address, frozen: bool)
}
```

<a id="0x1_primary_fungible_store_withdraw_with_ref"></a>

## Function `withdraw_with_ref`

Withdraw from the primary store of `owner` ignoring frozen flag.

```move
module 0x1::primary_fungible_store {
    public fun withdraw_with_ref(transfer_ref: &fungible_asset::TransferRef, owner: address, amount: u64): fungible_asset::FungibleAsset
}
```

<a id="0x1_primary_fungible_store_deposit_with_ref"></a>

## Function `deposit_with_ref`

Deposit from the primary store of `owner` ignoring frozen flag.

```move
module 0x1::primary_fungible_store {
    public fun deposit_with_ref(transfer_ref: &fungible_asset::TransferRef, owner: address, fa: fungible_asset::FungibleAsset)
}
```

<a id="0x1_primary_fungible_store_transfer_with_ref"></a>

## Function `transfer_with_ref`

Transfer `amount` of FA from the primary store of `from` to that of `to` ignoring frozen flag.

```move
module 0x1::primary_fungible_store {
    public fun transfer_with_ref(transfer_ref: &fungible_asset::TransferRef, from: address, to: address, amount: u64)
}
```
