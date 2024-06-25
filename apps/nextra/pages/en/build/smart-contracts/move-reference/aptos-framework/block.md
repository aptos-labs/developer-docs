<a id="0x1_block"></a>

# Module `0x1::block`

This module defines a struct storing the metadata of the block and new block events.

- [Resource `BlockResource`](#0x1_block_BlockResource)
- [Resource `CommitHistory`](#0x1_block_CommitHistory)
- [Struct `NewBlockEvent`](#0x1_block_NewBlockEvent)
- [Struct `UpdateEpochIntervalEvent`](#0x1_block_UpdateEpochIntervalEvent)
- [Struct `NewBlock`](#0x1_block_NewBlock)
- [Struct `UpdateEpochInterval`](#0x1_block_UpdateEpochInterval)
- [Constants](#@Constants_0)
- [Function `initialize`](#0x1_block_initialize)
- [Function `initialize_commit_history`](#0x1_block_initialize_commit_history)
- [Function `update_epoch_interval_microsecs`](#0x1_block_update_epoch_interval_microsecs)
- [Function `get_epoch_interval_secs`](#0x1_block_get_epoch_interval_secs)
- [Function `get_current_block_height`](#0x1_block_get_current_block_height)
- [Function `emit_writeset_block_event`](#0x1_block_emit_writeset_block_event)

```move
module 0x1::block {
    use 0x1::account;
    use 0x1::error;
    use 0x1::event;
    use 0x1::features;
    use 0x1::option;
    use 0x1::randomness;
    use 0x1::reconfiguration;
    use 0x1::reconfiguration_with_dkg;
    use 0x1::stake;
    use 0x1::state_storage;
    use 0x1::system_addresses;
    use 0x1::table_with_length;
    use 0x1::timestamp;
    use 0x1::transaction_fee;
}
```

<a id="0x1_block_BlockResource"></a>

## Resource `BlockResource`

Should be in&#45;sync with BlockResource rust struct in new_block.rs

```move
module 0x1::block {
    struct BlockResource has key
}
```

<a id="0x1_block_CommitHistory"></a>

## Resource `CommitHistory`

Store new block events as a move resource, internally using a circular buffer.

```move
module 0x1::block {
    struct CommitHistory has key
}
```

<a id="0x1_block_NewBlockEvent"></a>

## Struct `NewBlockEvent`

Should be in&#45;sync with NewBlockEvent rust struct in new_block.rs

```move
module 0x1::block {
    struct NewBlockEvent has copy, drop, store
}
```

<a id="0x1_block_UpdateEpochIntervalEvent"></a>

## Struct `UpdateEpochIntervalEvent`

Event emitted when a proposal is created.

```move
module 0x1::block {
    struct UpdateEpochIntervalEvent has drop, store
}
```

<a id="0x1_block_NewBlock"></a>

## Struct `NewBlock`

Should be in&#45;sync with NewBlockEvent rust struct in new_block.rs

```move
module 0x1::block {
    #[event]
    struct NewBlock has drop, store
}
```

<a id="0x1_block_UpdateEpochInterval"></a>

## Struct `UpdateEpochInterval`

Event emitted when a proposal is created.

```move
module 0x1::block {
    #[event]
    struct UpdateEpochInterval has drop, store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_block_MAX_U64"></a>

```move
module 0x1::block {
    const MAX_U64: u64 = 18446744073709551615;
}
```

<a id="0x1_block_EINVALID_PROPOSER"></a>

An invalid proposer was provided. Expected the proposer to be the VM or an active validator.

```move
module 0x1::block {
    const EINVALID_PROPOSER: u64 = 2;
}
```

<a id="0x1_block_ENUM_NEW_BLOCK_EVENTS_DOES_NOT_MATCH_BLOCK_HEIGHT"></a>

The number of new block events does not equal the current block height.

```move
module 0x1::block {
    const ENUM_NEW_BLOCK_EVENTS_DOES_NOT_MATCH_BLOCK_HEIGHT: u64 = 1;
}
```

<a id="0x1_block_EZERO_EPOCH_INTERVAL"></a>

Epoch interval cannot be 0.

```move
module 0x1::block {
    const EZERO_EPOCH_INTERVAL: u64 = 3;
}
```

<a id="0x1_block_EZERO_MAX_CAPACITY"></a>

The maximum capacity of the commit history cannot be 0.

```move
module 0x1::block {
    const EZERO_MAX_CAPACITY: u64 = 3;
}
```

<a id="0x1_block_initialize"></a>

## Function `initialize`

This can only be called during Genesis.

```move
module 0x1::block {
    public(friend) fun initialize(aptos_framework: &signer, epoch_interval_microsecs: u64)
}
```

<a id="0x1_block_initialize_commit_history"></a>

## Function `initialize_commit_history`

Initialize the commit history resource if it&apos;s not in genesis.

```move
module 0x1::block {
    public fun initialize_commit_history(fx: &signer, max_capacity: u32)
}
```

<a id="0x1_block_update_epoch_interval_microsecs"></a>

## Function `update_epoch_interval_microsecs`

Update the epoch interval.
Can only be called as part of the Aptos governance proposal process established by the AptosGovernance module.

```move
module 0x1::block {
    public fun update_epoch_interval_microsecs(aptos_framework: &signer, new_epoch_interval: u64)
}
```

<a id="0x1_block_get_epoch_interval_secs"></a>

## Function `get_epoch_interval_secs`

Return epoch interval in seconds.

```move
module 0x1::block {
    #[view]
    public fun get_epoch_interval_secs(): u64
}
```

<a id="0x1_block_get_current_block_height"></a>

## Function `get_current_block_height`

Get the current block height

```move
module 0x1::block {
    #[view]
    public fun get_current_block_height(): u64
}
```

<a id="0x1_block_emit_writeset_block_event"></a>

## Function `emit_writeset_block_event`

Emit a `NewBlockEvent` event. This function will be invoked by write set script directly to generate the
new block event for WriteSetPayload.

```move
module 0x1::block {
    public fun emit_writeset_block_event(vm_signer: &signer, fake_block_hash: address)
}
```
