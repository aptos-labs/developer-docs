<a id="0x1_aptos_coin"></a>

# Module `0x1::aptos_coin`

This module defines a minimal and generic Coin and Balance.
modified from https://github.com/move&#45;language/move/tree/main/language/documentation/tutorial

- [Resource `AptosCoin`](#0x1_aptos_coin_AptosCoin)
- [Resource `MintCapStore`](#0x1_aptos_coin_MintCapStore)
- [Struct `DelegatedMintCapability`](#0x1_aptos_coin_DelegatedMintCapability)
- [Resource `Delegations`](#0x1_aptos_coin_Delegations)
- [Constants](#@Constants_0)
- [Function `initialize`](#0x1_aptos_coin_initialize)
- [Function `has_mint_capability`](#0x1_aptos_coin_has_mint_capability)
- [Function `destroy_mint_cap`](#0x1_aptos_coin_destroy_mint_cap)
- [Function `configure_accounts_for_test`](#0x1_aptos_coin_configure_accounts_for_test)
- [Function `mint`](#0x1_aptos_coin_mint)
- [Function `delegate_mint_capability`](#0x1_aptos_coin_delegate_mint_capability)
- [Function `claim_mint_capability`](#0x1_aptos_coin_claim_mint_capability)

```move
module 0x1::aptos_coin {
    use 0x1::coin;
    use 0x1::error;
    use 0x1::option;
    use 0x1::signer;
    use 0x1::string;
    use 0x1::system_addresses;
    use 0x1::vector;
}
```

<a id="0x1_aptos_coin_AptosCoin"></a>

## Resource `AptosCoin`

```move
module 0x1::aptos_coin {
    struct AptosCoin has key
}
```

<a id="0x1_aptos_coin_MintCapStore"></a>

## Resource `MintCapStore`

```move
module 0x1::aptos_coin {
    struct MintCapStore has key
}
```

<a id="0x1_aptos_coin_DelegatedMintCapability"></a>

## Struct `DelegatedMintCapability`

Delegation token created by delegator and can be claimed by the delegatee as MintCapability.

```move
module 0x1::aptos_coin {
    struct DelegatedMintCapability has store
}
```

<a id="0x1_aptos_coin_Delegations"></a>

## Resource `Delegations`

The container stores the current pending delegations.

```move
module 0x1::aptos_coin {
    struct Delegations has key
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_aptos_coin_EALREADY_DELEGATED"></a>

Mint capability has already been delegated to this specified address

```move
module 0x1::aptos_coin {
    const EALREADY_DELEGATED: u64 = 2;
}
```

<a id="0x1_aptos_coin_EDELEGATION_NOT_FOUND"></a>

Cannot find delegation of mint capability to this account

```move
module 0x1::aptos_coin {
    const EDELEGATION_NOT_FOUND: u64 = 3;
}
```

<a id="0x1_aptos_coin_ENO_CAPABILITIES"></a>

Account does not have mint capability

```move
module 0x1::aptos_coin {
    const ENO_CAPABILITIES: u64 = 1;
}
```

<a id="0x1_aptos_coin_initialize"></a>

## Function `initialize`

Can only called during genesis to initialize the Aptos coin.

```move
module 0x1::aptos_coin {
    public(friend) fun initialize(aptos_framework: &signer): (coin::BurnCapability<aptos_coin::AptosCoin>, coin::MintCapability<aptos_coin::AptosCoin>)
}
```

<a id="0x1_aptos_coin_has_mint_capability"></a>

## Function `has_mint_capability`

```move
module 0x1::aptos_coin {
    public fun has_mint_capability(account: &signer): bool
}
```

<a id="0x1_aptos_coin_destroy_mint_cap"></a>

## Function `destroy_mint_cap`

Only called during genesis to destroy the aptos framework account&apos;s mint capability once all initial validators
and accounts have been initialized during genesis.

```move
module 0x1::aptos_coin {
    public(friend) fun destroy_mint_cap(aptos_framework: &signer)
}
```

<a id="0x1_aptos_coin_configure_accounts_for_test"></a>

## Function `configure_accounts_for_test`

Can only be called during genesis for tests to grant mint capability to aptos framework and core resources
accounts.
Expects account and APT store to be registered before calling.

```move
module 0x1::aptos_coin {
    public(friend) fun configure_accounts_for_test(aptos_framework: &signer, core_resources: &signer, mint_cap: coin::MintCapability<aptos_coin::AptosCoin>)
}
```

<a id="0x1_aptos_coin_mint"></a>

## Function `mint`

Only callable in tests and testnets where the core resources account exists.
Create new coins and deposit them into dst_addr&apos;s account.

```move
module 0x1::aptos_coin {
    public entry fun mint(account: &signer, dst_addr: address, amount: u64)
}
```

<a id="0x1_aptos_coin_delegate_mint_capability"></a>

## Function `delegate_mint_capability`

Only callable in tests and testnets where the core resources account exists.
Create delegated token for the address so the account could claim MintCapability later.

```move
module 0x1::aptos_coin {
    public entry fun delegate_mint_capability(account: signer, to: address)
}
```

<a id="0x1_aptos_coin_claim_mint_capability"></a>

## Function `claim_mint_capability`

Only callable in tests and testnets where the core resources account exists.
Claim the delegated mint capability and destroy the delegated token.

```move
module 0x1::aptos_coin {
    public entry fun claim_mint_capability(account: &signer)
}
```
