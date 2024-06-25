<a id="0x1_chain_id"></a>

# Module `0x1::chain_id`

The chain id distinguishes between different chains (e.g., testnet and the main network).
One important role is to prevent transactions intended for one chain from being executed on another.
This code provides a container for storing a chain id and functions to initialize and get it.

- [Resource `ChainId`](#0x1_chain_id_ChainId)
- [Function `initialize`](#0x1_chain_id_initialize)
- [Function `get`](#0x1_chain_id_get)

```move
module 0x1::chain_id {
    use 0x1::system_addresses;
}
```

<a id="0x1_chain_id_ChainId"></a>

## Resource `ChainId`

```move
module 0x1::chain_id {
    struct ChainId has key
}
```

<a id="0x1_chain_id_initialize"></a>

## Function `initialize`

Only called during genesis.
Publish the chain ID `id` of this instance under the SystemAddresses address

```move
module 0x1::chain_id {
    public(friend) fun initialize(aptos_framework: &signer, id: u8)
}
```

<a id="0x1_chain_id_get"></a>

## Function `get`

Return the chain ID of this instance.

```move
module 0x1::chain_id {
    #[view]
    public fun get(): u8
}
```
