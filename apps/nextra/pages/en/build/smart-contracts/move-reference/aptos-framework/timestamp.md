<a id="0x1_timestamp"></a>

# Module `0x1::timestamp`

This module keeps a global wall clock that stores the current Unix time in microseconds.
It interacts with the other modules in the following ways: \* genesis: to initialize the timestamp \* block: to reach consensus on the global wall clock time

- [Resource `CurrentTimeMicroseconds`](#0x1_timestamp_CurrentTimeMicroseconds)
- [Constants](#@Constants_0)
- [Function `set_time_has_started`](#0x1_timestamp_set_time_has_started)
- [Function `update_global_time`](#0x1_timestamp_update_global_time)
- [Function `now_microseconds`](#0x1_timestamp_now_microseconds)
- [Function `now_seconds`](#0x1_timestamp_now_seconds)

```move
module 0x1::timestamp {
    use 0x1::error;
    use 0x1::system_addresses;
}
```

<a id="0x1_timestamp_CurrentTimeMicroseconds"></a>

## Resource `CurrentTimeMicroseconds`

A singleton resource holding the current Unix time in microseconds

```move
module 0x1::timestamp {
    struct CurrentTimeMicroseconds has key
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_timestamp_ENOT_OPERATING"></a>

The blockchain is not in an operating state yet

```move
module 0x1::timestamp {
    const ENOT_OPERATING: u64 = 1;
}
```

<a id="0x1_timestamp_EINVALID_TIMESTAMP"></a>

An invalid timestamp was provided

```move
module 0x1::timestamp {
    const EINVALID_TIMESTAMP: u64 = 2;
}
```

<a id="0x1_timestamp_MICRO_CONVERSION_FACTOR"></a>

Conversion factor between seconds and microseconds

```move
module 0x1::timestamp {
    const MICRO_CONVERSION_FACTOR: u64 = 1000000;
}
```

<a id="0x1_timestamp_set_time_has_started"></a>

## Function `set_time_has_started`

Marks that time has started. This can only be called from genesis and with the aptos framework account.

```move
module 0x1::timestamp {
    public(friend) fun set_time_has_started(aptos_framework: &signer)
}
```

<a id="0x1_timestamp_update_global_time"></a>

## Function `update_global_time`

Updates the wall clock time by consensus. Requires VM privilege and will be invoked during block prologue.

```move
module 0x1::timestamp {
    public fun update_global_time(account: &signer, proposer: address, timestamp: u64)
}
```

<a id="0x1_timestamp_now_microseconds"></a>

## Function `now_microseconds`

Gets the current time in microseconds.

```move
module 0x1::timestamp {
    #[view]
    public fun now_microseconds(): u64
}
```

<a id="0x1_timestamp_now_seconds"></a>

## Function `now_seconds`

Gets the current time in seconds.

```move
module 0x1::timestamp {
    #[view]
    public fun now_seconds(): u64
}
```
