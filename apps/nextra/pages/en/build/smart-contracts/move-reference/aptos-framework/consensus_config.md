<a id="0x1_consensus_config"></a>

# Module `0x1::consensus_config`

Maintains the consensus config for the blockchain. The config is stored in a
Reconfiguration, and may be updated by root.

- [Resource `ConsensusConfig`](#0x1_consensus_config_ConsensusConfig)
- [Constants](#@Constants_0)
- [Function `initialize`](#0x1_consensus_config_initialize)
- [Function `set`](#0x1_consensus_config_set)
- [Function `set_for_next_epoch`](#0x1_consensus_config_set_for_next_epoch)
- [Function `on_new_epoch`](#0x1_consensus_config_on_new_epoch)
- [Function `validator_txn_enabled`](#0x1_consensus_config_validator_txn_enabled)

```move
module 0x1::consensus_config {
    use 0x1::chain_status;
    use 0x1::config_buffer;
    use 0x1::error;
    use 0x1::reconfiguration;
    use 0x1::system_addresses;
}
```

<a id="0x1_consensus_config_ConsensusConfig"></a>

## Resource `ConsensusConfig`

```move
module 0x1::consensus_config {
    struct ConsensusConfig has drop, store, key
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_consensus_config_EINVALID_CONFIG"></a>

The provided on chain config bytes are empty or invalid

```move
module 0x1::consensus_config {
    const EINVALID_CONFIG: u64 = 1;
}
```

<a id="0x1_consensus_config_initialize"></a>

## Function `initialize`

Publishes the ConsensusConfig config.

```move
module 0x1::consensus_config {
    public(friend) fun initialize(aptos_framework: &signer, config: vector<u8>)
}
```

<a id="0x1_consensus_config_set"></a>

## Function `set`

Deprecated by `set_for_next_epoch()`.

WARNING: calling this while randomness is enabled will trigger a new epoch without randomness!

TODO: update all the tests that reference this function, then disable this function.

```move
module 0x1::consensus_config {
    public fun set(account: &signer, config: vector<u8>)
}
```

<a id="0x1_consensus_config_set_for_next_epoch"></a>

## Function `set_for_next_epoch`

This can be called by on&#45;chain governance to update on&#45;chain consensus configs for the next epoch.
Example usage:

```
aptos_framework::consensus_config::set_for_next_epoch(&amp;framework_signer, some_config_bytes);
aptos_framework::aptos_governance::reconfigure(&amp;framework_signer);
```

```move
module 0x1::consensus_config {
    public fun set_for_next_epoch(account: &signer, config: vector<u8>)
}
```

<a id="0x1_consensus_config_on_new_epoch"></a>

## Function `on_new_epoch`

Only used in reconfigurations to apply the pending `ConsensusConfig`, if there is any.

```move
module 0x1::consensus_config {
    public(friend) fun on_new_epoch(framework: &signer)
}
```

<a id="0x1_consensus_config_validator_txn_enabled"></a>

## Function `validator_txn_enabled`

```move
module 0x1::consensus_config {
    public fun validator_txn_enabled(): bool
}
```
