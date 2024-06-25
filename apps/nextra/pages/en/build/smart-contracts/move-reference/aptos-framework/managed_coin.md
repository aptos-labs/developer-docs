<a id="0x1_managed_coin"></a>

# Module `0x1::managed_coin`

ManagedCoin is built to make a simple walkthrough of the Coins module.
It contains scripts you will need to initialize, mint, burn, transfer coins.
By utilizing this current module, a developer can create his own coin and care less about mint and burn capabilities,

- [Resource `Capabilities`](#0x1_managed_coin_Capabilities)
- [Constants](#@Constants_0)
- [Function `burn`](#0x1_managed_coin_burn)
- [Function `initialize`](#0x1_managed_coin_initialize)
- [Function `mint`](#0x1_managed_coin_mint)
- [Function `register`](#0x1_managed_coin_register)

```move
module 0x1::managed_coin {
    use 0x1::coin;
    use 0x1::error;
    use 0x1::signer;
    use 0x1::string;
}
```

<a id="0x1_managed_coin_Capabilities"></a>

## Resource `Capabilities`

Capabilities resource storing mint and burn capabilities.
The resource is stored on the account that initialized coin `CoinType`.

```move
module 0x1::managed_coin {
    struct Capabilities<CoinType> has key
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_managed_coin_ENO_CAPABILITIES"></a>

Account has no capabilities (burn/mint).

```move
module 0x1::managed_coin {
    const ENO_CAPABILITIES: u64 = 1;
}
```

<a id="0x1_managed_coin_burn"></a>

## Function `burn`

Withdraw an `amount` of coin `CoinType` from `account` and burn it.

```move
module 0x1::managed_coin {
    public entry fun burn<CoinType>(account: &signer, amount: u64)
}
```

<a id="0x1_managed_coin_initialize"></a>

## Function `initialize`

Initialize new coin `CoinType` in Aptos Blockchain.
Mint and Burn Capabilities will be stored under `account` in `Capabilities` resource.

```move
module 0x1::managed_coin {
    public entry fun initialize<CoinType>(account: &signer, name: vector<u8>, symbol: vector<u8>, decimals: u8, monitor_supply: bool)
}
```

<a id="0x1_managed_coin_mint"></a>

## Function `mint`

Create new coins `CoinType` and deposit them into dst_addr&apos;s account.

```move
module 0x1::managed_coin {
    public entry fun mint<CoinType>(account: &signer, dst_addr: address, amount: u64)
}
```

<a id="0x1_managed_coin_register"></a>

## Function `register`

Creating a resource that stores balance of `CoinType` on user&apos;s account, withdraw and deposit event handlers.
Required if user wants to start accepting deposits of `CoinType` in his account.

```move
module 0x1::managed_coin {
    public entry fun register<CoinType>(account: &signer)
}
```
