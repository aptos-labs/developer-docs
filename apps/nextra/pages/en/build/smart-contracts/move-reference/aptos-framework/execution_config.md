<a id="0x1_execution_config"></a>

# Module `0x1::execution_config`

Maintains the execution config for the blockchain. The config is stored in a
Reconfiguration, and may be updated by root.

- [Resource `ExecutionConfig`](#0x1_execution_config_ExecutionConfig)
- [Constants](#@Constants_0)
- [Function `set`](#0x1_execution_config_set)
- [Function `set_for_next_epoch`](#0x1_execution_config_set_for_next_epoch)
- [Function `on_new_epoch`](#0x1_execution_config_on_new_epoch)

```move
module 0x1::execution_config {
    use 0x1::chain_status;
    use 0x1::config_buffer;
    use 0x1::error;
    use 0x1::reconfiguration;
    use 0x1::system_addresses;
}
```

<a id="0x1_execution_config_ExecutionConfig"></a>

## Resource `ExecutionConfig`

```move
module 0x1::execution_config {
    struct ExecutionConfig has drop, store, key
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_execution_config_EINVALID_CONFIG"></a>

The provided on chain config bytes are empty or invalid

```move
module 0x1::execution_config {
    const EINVALID_CONFIG: u64 = 1;
}
```

<a id="0x1_execution_config_set"></a>

## Function `set`

Deprecated by `set_for_next_epoch()`.

WARNING: calling this while randomness is enabled will trigger a new epoch without randomness!

TODO: update all the tests that reference this function, then disable this function.

```move
module 0x1::execution_config {
    public fun set(account: &signer, config: vector<u8>)
}
```

<a id="0x1_execution_config_set_for_next_epoch"></a>

## Function `set_for_next_epoch`

This can be called by on&#45;chain governance to update on&#45;chain execution configs for the next epoch.
Example usage:

```
aptos_framework::execution_config::set_for_next_epoch(&amp;framework_signer, some_config_bytes);
aptos_framework::aptos_governance::reconfigure(&amp;framework_signer);
```

```move
module 0x1::execution_config {
    public fun set_for_next_epoch(account: &signer, config: vector<u8>)
}
```

<a id="0x1_execution_config_on_new_epoch"></a>

## Function `on_new_epoch`

Only used in reconfigurations to apply the pending `ExecutionConfig`, if there is any.

```move
module 0x1::execution_config {
    public(friend) fun on_new_epoch(framework: &signer)
}
```
