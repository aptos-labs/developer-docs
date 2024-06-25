<a id="0x1_gas_schedule"></a>

# Module `0x1::gas_schedule`

This module defines structs and methods to initialize the gas schedule, which dictates how much
it costs to execute Move on the network.

- [Struct `GasEntry`](#0x1_gas_schedule_GasEntry)
- [Resource `GasSchedule`](#0x1_gas_schedule_GasSchedule)
- [Resource `GasScheduleV2`](#0x1_gas_schedule_GasScheduleV2)
- [Constants](#@Constants_0)
- [Function `initialize`](#0x1_gas_schedule_initialize)
- [Function `set_gas_schedule`](#0x1_gas_schedule_set_gas_schedule)
- [Function `set_for_next_epoch`](#0x1_gas_schedule_set_for_next_epoch)
- [Function `set_for_next_epoch_check_hash`](#0x1_gas_schedule_set_for_next_epoch_check_hash)
- [Function `on_new_epoch`](#0x1_gas_schedule_on_new_epoch)
- [Function `set_storage_gas_config`](#0x1_gas_schedule_set_storage_gas_config)
- [Function `set_storage_gas_config_for_next_epoch`](#0x1_gas_schedule_set_storage_gas_config_for_next_epoch)

```move
module 0x1::gas_schedule {
    use 0x1::aptos_hash;
    use 0x1::bcs;
    use 0x1::chain_status;
    use 0x1::config_buffer;
    use 0x1::error;
    use 0x1::reconfiguration;
    use 0x1::storage_gas;
    use 0x1::string;
    use 0x1::system_addresses;
    use 0x1::util;
    use 0x1::vector;
}
```

<a id="0x1_gas_schedule_GasEntry"></a>

## Struct `GasEntry`

```move
module 0x1::gas_schedule {
    struct GasEntry has copy, drop, store
}
```

<a id="0x1_gas_schedule_GasSchedule"></a>

## Resource `GasSchedule`

```move
module 0x1::gas_schedule {
    struct GasSchedule has copy, drop, key
}
```

<a id="0x1_gas_schedule_GasScheduleV2"></a>

## Resource `GasScheduleV2`

```move
module 0x1::gas_schedule {
    struct GasScheduleV2 has copy, drop, store, key
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_gas_schedule_EINVALID_GAS_FEATURE_VERSION"></a>

```move
module 0x1::gas_schedule {
    const EINVALID_GAS_FEATURE_VERSION: u64 = 2;
}
```

<a id="0x1_gas_schedule_EINVALID_GAS_SCHEDULE"></a>

The provided gas schedule bytes are empty or invalid

```move
module 0x1::gas_schedule {
    const EINVALID_GAS_SCHEDULE: u64 = 1;
}
```

<a id="0x1_gas_schedule_EINVALID_GAS_SCHEDULE_HASH"></a>

```move
module 0x1::gas_schedule {
    const EINVALID_GAS_SCHEDULE_HASH: u64 = 3;
}
```

<a id="0x1_gas_schedule_initialize"></a>

## Function `initialize`

Only called during genesis.

```move
module 0x1::gas_schedule {
    public(friend) fun initialize(aptos_framework: &signer, gas_schedule_blob: vector<u8>)
}
```

<a id="0x1_gas_schedule_set_gas_schedule"></a>

## Function `set_gas_schedule`

Deprecated by `set_for_next_epoch()`.

WARNING: calling this while randomness is enabled will trigger a new epoch without randomness!

TODO: update all the tests that reference this function, then disable this function.

```move
module 0x1::gas_schedule {
    public fun set_gas_schedule(aptos_framework: &signer, gas_schedule_blob: vector<u8>)
}
```

<a id="0x1_gas_schedule_set_for_next_epoch"></a>

## Function `set_for_next_epoch`

Set the gas schedule for the next epoch, typically called by on&#45;chain governance.
Abort if the version of the given schedule is lower than the current version.

Example usage:

```
aptos_framework::gas_schedule::set_for_next_epoch(&amp;framework_signer, some_gas_schedule_blob);
aptos_framework::aptos_governance::reconfigure(&amp;framework_signer);
```

```move
module 0x1::gas_schedule {
    public fun set_for_next_epoch(aptos_framework: &signer, gas_schedule_blob: vector<u8>)
}
```

<a id="0x1_gas_schedule_set_for_next_epoch_check_hash"></a>

## Function `set_for_next_epoch_check_hash`

Set the gas schedule for the next epoch, typically called by on&#45;chain governance.
Abort if the version of the given schedule is lower than the current version.
Require a hash of the old gas schedule to be provided and will abort if the hashes mismatch.

```move
module 0x1::gas_schedule {
    public fun set_for_next_epoch_check_hash(aptos_framework: &signer, old_gas_schedule_hash: vector<u8>, new_gas_schedule_blob: vector<u8>)
}
```

<a id="0x1_gas_schedule_on_new_epoch"></a>

## Function `on_new_epoch`

Only used in reconfigurations to apply the pending `GasScheduleV2`, if there is any.

```move
module 0x1::gas_schedule {
    public(friend) fun on_new_epoch(framework: &signer)
}
```

<a id="0x1_gas_schedule_set_storage_gas_config"></a>

## Function `set_storage_gas_config`

```move
module 0x1::gas_schedule {
    public fun set_storage_gas_config(aptos_framework: &signer, config: storage_gas::StorageGasConfig)
}
```

<a id="0x1_gas_schedule_set_storage_gas_config_for_next_epoch"></a>

## Function `set_storage_gas_config_for_next_epoch`

```move
module 0x1::gas_schedule {
    public fun set_storage_gas_config_for_next_epoch(aptos_framework: &signer, config: storage_gas::StorageGasConfig)
}
```
