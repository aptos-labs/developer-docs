<a id="0x1_chain_status"></a>

# Module `0x1::chain_status`

This module code to assert that it is running in genesis (`Self::assert_genesis`) or after
genesis (`Self::assert_operating`). These are essentially distinct states of the system. Specifically,
if `Self::assert_operating` succeeds, assumptions about invariants over the global state can be made
which reflect that the system has been successfully initialized.

- [Resource `GenesisEndMarker`](#0x1_chain_status_GenesisEndMarker)
- [Constants](#@Constants_0)
- [Function `set_genesis_end`](#0x1_chain_status_set_genesis_end)
- [Function `is_genesis`](#0x1_chain_status_is_genesis)
- [Function `is_operating`](#0x1_chain_status_is_operating)
- [Function `assert_operating`](#0x1_chain_status_assert_operating)
- [Function `assert_genesis`](#0x1_chain_status_assert_genesis)

```move
module 0x1::chain_status {
    use 0x1::error;
    use 0x1::system_addresses;
}
```

<a id="0x1_chain_status_GenesisEndMarker"></a>

## Resource `GenesisEndMarker`

Marker to publish at the end of genesis.

```move
module 0x1::chain_status {
    struct GenesisEndMarker has key
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_chain_status_ENOT_GENESIS"></a>

The blockchain is not in the genesis status.

```move
module 0x1::chain_status {
    const ENOT_GENESIS: u64 = 2;
}
```

<a id="0x1_chain_status_ENOT_OPERATING"></a>

The blockchain is not in the operating status.

```move
module 0x1::chain_status {
    const ENOT_OPERATING: u64 = 1;
}
```

<a id="0x1_chain_status_set_genesis_end"></a>

## Function `set_genesis_end`

Marks that genesis has finished.

```move
module 0x1::chain_status {
    public(friend) fun set_genesis_end(aptos_framework: &signer)
}
```

<a id="0x1_chain_status_is_genesis"></a>

## Function `is_genesis`

Helper function to determine if Aptos is in genesis state.

```move
module 0x1::chain_status {
    #[view]
    public fun is_genesis(): bool
}
```

<a id="0x1_chain_status_is_operating"></a>

## Function `is_operating`

Helper function to determine if Aptos is operating. This is
the same as `!is_genesis()` and is provided for convenience.
Testing `is_operating()` is more frequent than `is_genesis()`.

```move
module 0x1::chain_status {
    #[view]
    public fun is_operating(): bool
}
```

<a id="0x1_chain_status_assert_operating"></a>

## Function `assert_operating`

Helper function to assert operating (not genesis) state.

```move
module 0x1::chain_status {
    public fun assert_operating()
}
```

<a id="0x1_chain_status_assert_genesis"></a>

## Function `assert_genesis`

Helper function to assert genesis state.

```move
module 0x1::chain_status {
    public fun assert_genesis()
}
```
