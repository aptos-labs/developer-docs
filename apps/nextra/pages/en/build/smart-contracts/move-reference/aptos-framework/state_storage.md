<a id="0x1_state_storage"></a>

# Module `0x1::state_storage`

- [Struct `Usage`](#0x1_state_storage_Usage)
- [Resource `StateStorageUsage`](#0x1_state_storage_StateStorageUsage)
- [Resource `GasParameter`](#0x1_state_storage_GasParameter)
- [Constants](#@Constants_0)
- [Function `initialize`](#0x1_state_storage_initialize)
- [Function `on_new_block`](#0x1_state_storage_on_new_block)
- [Function `current_items_and_bytes`](#0x1_state_storage_current_items_and_bytes)
- [Function `on_reconfig`](#0x1_state_storage_on_reconfig)

```move
module 0x1::state_storage {
    use 0x1::error;
    use 0x1::system_addresses;
}
```

<a id="0x1_state_storage_Usage"></a>

## Struct `Usage`

```move
module 0x1::state_storage {
    struct Usage has copy, drop, store
}
```

<a id="0x1_state_storage_StateStorageUsage"></a>

## Resource `StateStorageUsage`

This is updated at the beginning of each epoch, reflecting the storage
usage after the last txn of the previous epoch is committed.

```move
module 0x1::state_storage {
    struct StateStorageUsage has store, key
}
```

<a id="0x1_state_storage_GasParameter"></a>

## Resource `GasParameter`

```move
module 0x1::state_storage {
    struct GasParameter has store, key
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_state_storage_ESTATE_STORAGE_USAGE"></a>

```move
module 0x1::state_storage {
    const ESTATE_STORAGE_USAGE: u64 = 0;
}
```

<a id="0x1_state_storage_initialize"></a>

## Function `initialize`

```move
module 0x1::state_storage {
    public(friend) fun initialize(aptos_framework: &signer)
}
```

<a id="0x1_state_storage_on_new_block"></a>

## Function `on_new_block`

```move
module 0x1::state_storage {
    public(friend) fun on_new_block(epoch: u64)
}
```

<a id="0x1_state_storage_current_items_and_bytes"></a>

## Function `current_items_and_bytes`

```move
module 0x1::state_storage {
    public(friend) fun current_items_and_bytes(): (u64, u64)
}
```

<a id="0x1_state_storage_on_reconfig"></a>

## Function `on_reconfig`

```move
module 0x1::state_storage {
    public(friend) fun on_reconfig()
}
```
