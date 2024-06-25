<a id="0x1_config_buffer"></a>

# Module `0x1::config_buffer`

This wrapper helps store an on&#45;chain config for the next epoch.

Once reconfigure with DKG is introduced, every on&#45;chain config `C` should do the following.
&#45; Support async update when DKG is enabled. This is typically done by 3 steps below.
&#45; Implement `C::set_for_next_epoch()` using `upsert()` function in this module.
&#45; Implement `C::on_new_epoch()` using `extract()` function in this module.
&#45; Update `0x1::reconfiguration_with_dkg::finish()` to call `C::on_new_epoch()`.
&#45; Support sychronous update when DKG is disabled.
This is typically done by implementing `C::set()` to update the config resource directly.

NOTE: on&#45;chain config `0x1::state::ValidatorSet` implemented its own buffer.

- [Resource `PendingConfigs`](#0x1_config_buffer_PendingConfigs)
- [Constants](#@Constants_0)
- [Function `initialize`](#0x1_config_buffer_initialize)
- [Function `does_exist`](#0x1_config_buffer_does_exist)
- [Function `upsert`](#0x1_config_buffer_upsert)
- [Function `extract`](#0x1_config_buffer_extract)

```move
module 0x1::config_buffer {
    use 0x1::any;
    use 0x1::option;
    use 0x1::simple_map;
    use 0x1::string;
    use 0x1::system_addresses;
    use 0x1::type_info;
}
```

<a id="0x1_config_buffer_PendingConfigs"></a>

## Resource `PendingConfigs`

```move
module 0x1::config_buffer {
    struct PendingConfigs has key
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_config_buffer_ESTD_SIGNER_NEEDED"></a>

Config buffer operations failed with permission denied.

```move
module 0x1::config_buffer {
    const ESTD_SIGNER_NEEDED: u64 = 1;
}
```

<a id="0x1_config_buffer_initialize"></a>

## Function `initialize`

```move
module 0x1::config_buffer {
    public fun initialize(aptos_framework: &signer)
}
```

<a id="0x1_config_buffer_does_exist"></a>

## Function `does_exist`

Check whether there is a pending config payload for `T`.

```move
module 0x1::config_buffer {
    public fun does_exist<T: store>(): bool
}
```

<a id="0x1_config_buffer_upsert"></a>

## Function `upsert`

Upsert an on&#45;chain config to the buffer for the next epoch.

Typically used in `X::set_for_next_epoch()` where X is an on&#45;chain config.

```move
module 0x1::config_buffer {
    public(friend) fun upsert<T: drop, store>(config: T)
}
```

<a id="0x1_config_buffer_extract"></a>

## Function `extract`

Take the buffered config `T` out (buffer cleared). Abort if the buffer is empty.
Should only be used at the end of a reconfiguration.

Typically used in `X::on_new_epoch()` where X is an on&#45;chaon config.

```move
module 0x1::config_buffer {
    public fun extract<T: store>(): T
}
```
