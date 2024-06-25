<a id="0x1_reconfiguration_state"></a>

# Module `0x1::reconfiguration_state`

Reconfiguration meta&#45;state resources and util functions.

WARNING: `reconfiguration_state::initialize()` is required before `RECONFIGURE_WITH_DKG` can be enabled.

- [Resource `State`](#0x1_reconfiguration_state_State)
- [Struct `StateInactive`](#0x1_reconfiguration_state_StateInactive)
- [Struct `StateActive`](#0x1_reconfiguration_state_StateActive)
- [Constants](#@Constants_0)
- [Function `is_initialized`](#0x1_reconfiguration_state_is_initialized)
- [Function `initialize`](#0x1_reconfiguration_state_initialize)
- [Function `initialize_for_testing`](#0x1_reconfiguration_state_initialize_for_testing)
- [Function `is_in_progress`](#0x1_reconfiguration_state_is_in_progress)
- [Function `on_reconfig_start`](#0x1_reconfiguration_state_on_reconfig_start)
- [Function `start_time_secs`](#0x1_reconfiguration_state_start_time_secs)
- [Function `on_reconfig_finish`](#0x1_reconfiguration_state_on_reconfig_finish)

```move
module 0x1::reconfiguration_state {
    use 0x1::copyable_any;
    use 0x1::error;
    use 0x1::string;
    use 0x1::system_addresses;
    use 0x1::timestamp;
}
```

<a id="0x1_reconfiguration_state_State"></a>

## Resource `State`

Reconfiguration drivers update this resources to notify other modules of some reconfiguration state.

```move
module 0x1::reconfiguration_state {
    struct State has key
}
```

<a id="0x1_reconfiguration_state_StateInactive"></a>

## Struct `StateInactive`

A state variant indicating no reconfiguration is in progress.

```move
module 0x1::reconfiguration_state {
    struct StateInactive has copy, drop, store
}
```

<a id="0x1_reconfiguration_state_StateActive"></a>

## Struct `StateActive`

A state variant indicating a reconfiguration is in progress.

```move
module 0x1::reconfiguration_state {
    struct StateActive has copy, drop, store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_reconfiguration_state_ERECONFIG_NOT_IN_PROGRESS"></a>

```move
module 0x1::reconfiguration_state {
    const ERECONFIG_NOT_IN_PROGRESS: u64 = 1;
}
```

<a id="0x1_reconfiguration_state_is_initialized"></a>

## Function `is_initialized`

```move
module 0x1::reconfiguration_state {
    public fun is_initialized(): bool
}
```

<a id="0x1_reconfiguration_state_initialize"></a>

## Function `initialize`

```move
module 0x1::reconfiguration_state {
    public fun initialize(fx: &signer)
}
```

<a id="0x1_reconfiguration_state_initialize_for_testing"></a>

## Function `initialize_for_testing`

```move
module 0x1::reconfiguration_state {
    public fun initialize_for_testing(fx: &signer)
}
```

<a id="0x1_reconfiguration_state_is_in_progress"></a>

## Function `is_in_progress`

Return whether the reconfiguration state is marked &quot;in progress&quot;.

```move
module 0x1::reconfiguration_state {
    public(friend) fun is_in_progress(): bool
}
```

<a id="0x1_reconfiguration_state_on_reconfig_start"></a>

## Function `on_reconfig_start`

Called at the beginning of a reconfiguration (either immediate or async)
to mark the reconfiguration state &quot;in progress&quot; if it is currently &quot;stopped&quot;.

Also record the current time as the reconfiguration start time. (Some module, e.g., `stake.move`, needs this info).

```move
module 0x1::reconfiguration_state {
    public(friend) fun on_reconfig_start()
}
```

<a id="0x1_reconfiguration_state_start_time_secs"></a>

## Function `start_time_secs`

Get the unix time when the currently in&#45;progress reconfiguration started.
Abort if the reconfiguration state is not &quot;in progress&quot;.

```move
module 0x1::reconfiguration_state {
    public(friend) fun start_time_secs(): u64
}
```

<a id="0x1_reconfiguration_state_on_reconfig_finish"></a>

## Function `on_reconfig_finish`

Called at the end of every reconfiguration to mark the state as &quot;stopped&quot;.
Abort if the current state is not &quot;in progress&quot;.

```move
module 0x1::reconfiguration_state {
    public(friend) fun on_reconfig_finish()
}
```
