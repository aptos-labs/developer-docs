<a id="0x1_reconfiguration"></a>

# Module `0x1::reconfiguration`

Publishes configuration information for validators, and issues reconfiguration events
to synchronize configuration changes for the validators.

- [Struct `NewEpochEvent`](#0x1_reconfiguration_NewEpochEvent)
- [Struct `NewEpoch`](#0x1_reconfiguration_NewEpoch)
- [Resource `Configuration`](#0x1_reconfiguration_Configuration)
- [Resource `DisableReconfiguration`](#0x1_reconfiguration_DisableReconfiguration)
- [Constants](#@Constants_0)
- [Function `initialize`](#0x1_reconfiguration_initialize)
- [Function `reconfigure`](#0x1_reconfiguration_reconfigure)
- [Function `last_reconfiguration_time`](#0x1_reconfiguration_last_reconfiguration_time)
- [Function `current_epoch`](#0x1_reconfiguration_current_epoch)

```move
module 0x1::reconfiguration {
    use 0x1::account;
    use 0x1::chain_status;
    use 0x1::error;
    use 0x1::event;
    use 0x1::features;
    use 0x1::reconfiguration_state;
    use 0x1::signer;
    use 0x1::stake;
    use 0x1::storage_gas;
    use 0x1::system_addresses;
    use 0x1::timestamp;
    use 0x1::transaction_fee;
}
```

<a id="0x1_reconfiguration_NewEpochEvent"></a>

## Struct `NewEpochEvent`

Event that signals consensus to start a new epoch,
with new configuration information. This is also called a
&quot;reconfiguration event&quot;

```move
module 0x1::reconfiguration {
    #[event]
    struct NewEpochEvent has drop, store
}
```

<a id="0x1_reconfiguration_NewEpoch"></a>

## Struct `NewEpoch`

Event that signals consensus to start a new epoch,
with new configuration information. This is also called a
&quot;reconfiguration event&quot;

```move
module 0x1::reconfiguration {
    #[event]
    struct NewEpoch has drop, store
}
```

<a id="0x1_reconfiguration_Configuration"></a>

## Resource `Configuration`

Holds information about state of reconfiguration

```move
module 0x1::reconfiguration {
    struct Configuration has key
}
```

<a id="0x1_reconfiguration_DisableReconfiguration"></a>

## Resource `DisableReconfiguration`

Reconfiguration will be disabled if this resource is published under the
aptos_framework system address

```move
module 0x1::reconfiguration {
    struct DisableReconfiguration has key
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_reconfiguration_ECONFIG"></a>

A `Reconfiguration` resource is in an invalid state

```move
module 0x1::reconfiguration {
    const ECONFIG: u64 = 2;
}
```

<a id="0x1_reconfiguration_ECONFIGURATION"></a>

The `Configuration` resource is in an invalid state

```move
module 0x1::reconfiguration {
    const ECONFIGURATION: u64 = 1;
}
```

<a id="0x1_reconfiguration_EINVALID_BLOCK_TIME"></a>

An invalid block time was encountered.

```move
module 0x1::reconfiguration {
    const EINVALID_BLOCK_TIME: u64 = 4;
}
```

<a id="0x1_reconfiguration_EINVALID_GUID_FOR_EVENT"></a>

An invalid block time was encountered.

```move
module 0x1::reconfiguration {
    const EINVALID_GUID_FOR_EVENT: u64 = 5;
}
```

<a id="0x1_reconfiguration_EMODIFY_CAPABILITY"></a>

A `ModifyConfigCapability` is in a different state than was expected

```move
module 0x1::reconfiguration {
    const EMODIFY_CAPABILITY: u64 = 3;
}
```

<a id="0x1_reconfiguration_initialize"></a>

## Function `initialize`

Only called during genesis.
Publishes `Configuration` resource. Can only be invoked by aptos framework account, and only a single time in Genesis.

```move
module 0x1::reconfiguration {
    public(friend) fun initialize(aptos_framework: &signer)
}
```

<a id="0x1_reconfiguration_reconfigure"></a>

## Function `reconfigure`

Signal validators to start using new configuration. Must be called from friend config modules.

```move
module 0x1::reconfiguration {
    public(friend) fun reconfigure()
}
```

<a id="0x1_reconfiguration_last_reconfiguration_time"></a>

## Function `last_reconfiguration_time`

```move
module 0x1::reconfiguration {
    public fun last_reconfiguration_time(): u64
}
```

<a id="0x1_reconfiguration_current_epoch"></a>

## Function `current_epoch`

```move
module 0x1::reconfiguration {
    public fun current_epoch(): u64
}
```
