<a id="0x1_aptos_account"></a>

# Module `0x1::aptos_account`

- [Resource `DirectTransferConfig`](#0x1_aptos_account_DirectTransferConfig)
- [Struct `DirectCoinTransferConfigUpdatedEvent`](#0x1_aptos_account_DirectCoinTransferConfigUpdatedEvent)
- [Struct `DirectCoinTransferConfigUpdated`](#0x1_aptos_account_DirectCoinTransferConfigUpdated)
- [Constants](#@Constants_0)
- [Function `create_account`](#0x1_aptos_account_create_account)
- [Function `batch_transfer`](#0x1_aptos_account_batch_transfer)
- [Function `transfer`](#0x1_aptos_account_transfer)
- [Function `batch_transfer_coins`](#0x1_aptos_account_batch_transfer_coins)
- [Function `transfer_coins`](#0x1_aptos_account_transfer_coins)
- [Function `deposit_coins`](#0x1_aptos_account_deposit_coins)
- [Function `assert_account_exists`](#0x1_aptos_account_assert_account_exists)
- [Function `assert_account_is_registered_for_apt`](#0x1_aptos_account_assert_account_is_registered_for_apt)
- [Function `set_allow_direct_coin_transfers`](#0x1_aptos_account_set_allow_direct_coin_transfers)
- [Function `can_receive_direct_coin_transfers`](#0x1_aptos_account_can_receive_direct_coin_transfers)
- [Function `register_apt`](#0x1_aptos_account_register_apt)
- [Function `is_fungible_balance_at_least`](#0x1_aptos_account_is_fungible_balance_at_least)
- [Function `burn_from_fungible_store`](#0x1_aptos_account_burn_from_fungible_store)

```move
module 0x1::aptos_account {
    use 0x1::account;
    use 0x1::aptos_coin;
    use 0x1::coin;
    use 0x1::create_signer;
    use 0x1::error;
    use 0x1::event;
    use 0x1::features;
    use 0x1::fungible_asset;
    use 0x1::object;
    use 0x1::primary_fungible_store;
    use 0x1::signer;
}
```

<a id="0x1_aptos_account_DirectTransferConfig"></a>

## Resource `DirectTransferConfig`

Configuration for whether an account can receive direct transfers of coins that they have not registered.

By default, this is enabled. Users can opt&#45;out by disabling at any time.

```move
module 0x1::aptos_account {
    struct DirectTransferConfig has key
}
```

<a id="0x1_aptos_account_DirectCoinTransferConfigUpdatedEvent"></a>

## Struct `DirectCoinTransferConfigUpdatedEvent`

Event emitted when an account&apos;s direct coins transfer config is updated.

```move
module 0x1::aptos_account {
    struct DirectCoinTransferConfigUpdatedEvent has drop, store
}
```

<a id="0x1_aptos_account_DirectCoinTransferConfigUpdated"></a>

## Struct `DirectCoinTransferConfigUpdated`

```move
module 0x1::aptos_account {
    #[event]
    struct DirectCoinTransferConfigUpdated has drop, store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_aptos_account_EACCOUNT_DOES_NOT_ACCEPT_DIRECT_COIN_TRANSFERS"></a>

Account opted out of receiving coins that they did not register to receive.

```move
module 0x1::aptos_account {
    const EACCOUNT_DOES_NOT_ACCEPT_DIRECT_COIN_TRANSFERS: u64 = 3;
}
```

<a id="0x1_aptos_account_EACCOUNT_DOES_NOT_ACCEPT_DIRECT_TOKEN_TRANSFERS"></a>

Account opted out of directly receiving NFT tokens.

```move
module 0x1::aptos_account {
    const EACCOUNT_DOES_NOT_ACCEPT_DIRECT_TOKEN_TRANSFERS: u64 = 4;
}
```

<a id="0x1_aptos_account_EACCOUNT_NOT_FOUND"></a>

Account does not exist.

```move
module 0x1::aptos_account {
    const EACCOUNT_NOT_FOUND: u64 = 1;
}
```

<a id="0x1_aptos_account_EACCOUNT_NOT_REGISTERED_FOR_APT"></a>

Account is not registered to receive APT.

```move
module 0x1::aptos_account {
    const EACCOUNT_NOT_REGISTERED_FOR_APT: u64 = 2;
}
```

<a id="0x1_aptos_account_EMISMATCHING_RECIPIENTS_AND_AMOUNTS_LENGTH"></a>

The lengths of the recipients and amounts lists don&apos;t match.

```move
module 0x1::aptos_account {
    const EMISMATCHING_RECIPIENTS_AND_AMOUNTS_LENGTH: u64 = 5;
}
```

<a id="0x1_aptos_account_create_account"></a>

## Function `create_account`

Basic account creation methods.

```move
module 0x1::aptos_account {
    public entry fun create_account(auth_key: address)
}
```

<a id="0x1_aptos_account_batch_transfer"></a>

## Function `batch_transfer`

Batch version of APT transfer.

```move
module 0x1::aptos_account {
    public entry fun batch_transfer(source: &signer, recipients: vector<address>, amounts: vector<u64>)
}
```

<a id="0x1_aptos_account_transfer"></a>

## Function `transfer`

Convenient function to transfer APT to a recipient account that might not exist.
This would create the recipient account first, which also registers it to receive APT, before transferring.

```move
module 0x1::aptos_account {
    public entry fun transfer(source: &signer, to: address, amount: u64)
}
```

<a id="0x1_aptos_account_batch_transfer_coins"></a>

## Function `batch_transfer_coins`

Batch version of transfer_coins.

```move
module 0x1::aptos_account {
    public entry fun batch_transfer_coins<CoinType>(from: &signer, recipients: vector<address>, amounts: vector<u64>)
}
```

<a id="0x1_aptos_account_transfer_coins"></a>

## Function `transfer_coins`

Convenient function to transfer a custom CoinType to a recipient account that might not exist.
This would create the recipient account first and register it to receive the CoinType, before transferring.

```move
module 0x1::aptos_account {
    public entry fun transfer_coins<CoinType>(from: &signer, to: address, amount: u64)
}
```

<a id="0x1_aptos_account_deposit_coins"></a>

## Function `deposit_coins`

Convenient function to deposit a custom CoinType into a recipient account that might not exist.
This would create the recipient account first and register it to receive the CoinType, before transferring.

```move
module 0x1::aptos_account {
    public fun deposit_coins<CoinType>(to: address, coins: coin::Coin<CoinType>)
}
```

<a id="0x1_aptos_account_assert_account_exists"></a>

## Function `assert_account_exists`

```move
module 0x1::aptos_account {
    public fun assert_account_exists(addr: address)
}
```

<a id="0x1_aptos_account_assert_account_is_registered_for_apt"></a>

## Function `assert_account_is_registered_for_apt`

```move
module 0x1::aptos_account {
    public fun assert_account_is_registered_for_apt(addr: address)
}
```

<a id="0x1_aptos_account_set_allow_direct_coin_transfers"></a>

## Function `set_allow_direct_coin_transfers`

Set whether `account` can receive direct transfers of coins that they have not explicitly registered to receive.

```move
module 0x1::aptos_account {
    public entry fun set_allow_direct_coin_transfers(account: &signer, allow: bool)
}
```

<a id="0x1_aptos_account_can_receive_direct_coin_transfers"></a>

## Function `can_receive_direct_coin_transfers`

Return true if `account` can receive direct transfers of coins that they have not explicitly registered to
receive.

By default, this returns true if an account has not explicitly set whether the can receive direct transfers.

```move
module 0x1::aptos_account {
    #[view]
    public fun can_receive_direct_coin_transfers(account: address): bool
}
```

<a id="0x1_aptos_account_register_apt"></a>

## Function `register_apt`

```move
module 0x1::aptos_account {
    public(friend) fun register_apt(account_signer: &signer)
}
```

<a id="0x1_aptos_account_is_fungible_balance_at_least"></a>

## Function `is_fungible_balance_at_least`

Is balance from APT Primary FungibleStore at least the given amount

```move
module 0x1::aptos_account {
    public(friend) fun is_fungible_balance_at_least(account: address, amount: u64): bool
}
```

<a id="0x1_aptos_account_burn_from_fungible_store"></a>

## Function `burn_from_fungible_store`

Burn from APT Primary FungibleStore

```move
module 0x1::aptos_account {
    public(friend) fun burn_from_fungible_store(ref: &fungible_asset::BurnRef, account: address, amount: u64)
}
```
