<a id="0x1_version"></a>

# Module `0x1::version`

Maintains the version number for the blockchain.

- [Resource `Version`](#0x1_version_Version)
- [Resource `SetVersionCapability`](#0x1_version_SetVersionCapability)
- [Constants](#@Constants_0)
- [Function `initialize`](#0x1_version_initialize)
- [Function `set_version`](#0x1_version_set_version)
- [Function `set_for_next_epoch`](#0x1_version_set_for_next_epoch)
- [Function `on_new_epoch`](#0x1_version_on_new_epoch)

```move
module 0x1::version {
    use 0x1::chain_status;
    use 0x1::config_buffer;
    use 0x1::error;
    use 0x1::reconfiguration;
    use 0x1::signer;
    use 0x1::system_addresses;
}
```

<a id="0x1_version_Version"></a>

## Resource `Version`

```move
module 0x1::version {
    struct Version has drop, store, key
}
```

<a id="0x1_version_SetVersionCapability"></a>

## Resource `SetVersionCapability`

```move
module 0x1::version {
    struct SetVersionCapability has key
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_version_EINVALID_MAJOR_VERSION_NUMBER"></a>

Specified major version number must be greater than current version number.

```move
module 0x1::version {
    const EINVALID_MAJOR_VERSION_NUMBER: u64 = 1;
}
```

<a id="0x1_version_ENOT_AUTHORIZED"></a>

Account is not authorized to make this change.

```move
module 0x1::version {
    const ENOT_AUTHORIZED: u64 = 2;
}
```

<a id="0x1_version_initialize"></a>

## Function `initialize`

Only called during genesis.
Publishes the Version config.

```move
module 0x1::version {
    public(friend) fun initialize(aptos_framework: &signer, initial_version: u64)
}
```

<a id="0x1_version_set_version"></a>

## Function `set_version`

Deprecated by `set_for_next_epoch()`.

WARNING: calling this while randomness is enabled will trigger a new epoch without randomness!

TODO: update all the tests that reference this function, then disable this function.

```move
module 0x1::version {
    public entry fun set_version(account: &signer, major: u64)
}
```

<a id="0x1_version_set_for_next_epoch"></a>

## Function `set_for_next_epoch`

Used in on&#45;chain governances to update the major version for the next epoch.
Example usage:
&#45; `aptos_framework::version::set_for_next_epoch(&framework_signer, new_version);`
&#45; `aptos_framework::aptos_governance::reconfigure(&framework_signer);`

```move
module 0x1::version {
    public entry fun set_for_next_epoch(account: &signer, major: u64)
}
```

<a id="0x1_version_on_new_epoch"></a>

## Function `on_new_epoch`

Only used in reconfigurations to apply the pending `Version`, if there is any.

```move
module 0x1::version {
    public(friend) fun on_new_epoch(framework: &signer)
}
```
