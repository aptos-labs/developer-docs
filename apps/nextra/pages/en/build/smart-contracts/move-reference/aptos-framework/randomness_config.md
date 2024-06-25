<a id="0x1_randomness_config"></a>

# Module `0x1::randomness_config`

Structs and functions for on&#45;chain randomness configurations.

- [Resource `RandomnessConfig`](#0x1_randomness_config_RandomnessConfig)
- [Struct `ConfigOff`](#0x1_randomness_config_ConfigOff)
- [Struct `ConfigV1`](#0x1_randomness_config_ConfigV1)
- [Struct `ConfigV2`](#0x1_randomness_config_ConfigV2)
- [Constants](#@Constants_0)
- [Function `initialize`](#0x1_randomness_config_initialize)
- [Function `set_for_next_epoch`](#0x1_randomness_config_set_for_next_epoch)
- [Function `on_new_epoch`](#0x1_randomness_config_on_new_epoch)
- [Function `enabled`](#0x1_randomness_config_enabled)
- [Function `new_off`](#0x1_randomness_config_new_off)
- [Function `new_v1`](#0x1_randomness_config_new_v1)
- [Function `new_v2`](#0x1_randomness_config_new_v2)
- [Function `current`](#0x1_randomness_config_current)

```move
module 0x1::randomness_config {
    use 0x1::config_buffer;
    use 0x1::copyable_any;
    use 0x1::fixed_point64;
    use 0x1::string;
    use 0x1::system_addresses;
}
```

<a id="0x1_randomness_config_RandomnessConfig"></a>

## Resource `RandomnessConfig`

The configuration of the on&#45;chain randomness feature.

```move
module 0x1::randomness_config {
    struct RandomnessConfig has copy, drop, store, key
}
```

<a id="0x1_randomness_config_ConfigOff"></a>

## Struct `ConfigOff`

A randomness config variant indicating the feature is disabled.

```move
module 0x1::randomness_config {
    struct ConfigOff has copy, drop, store
}
```

<a id="0x1_randomness_config_ConfigV1"></a>

## Struct `ConfigV1`

A randomness config variant indicating the feature is enabled.

```move
module 0x1::randomness_config {
    struct ConfigV1 has copy, drop, store
}
```

<a id="0x1_randomness_config_ConfigV2"></a>

## Struct `ConfigV2`

A randomness config variant indicating the feature is enabled with fast path.

```move
module 0x1::randomness_config {
    struct ConfigV2 has copy, drop, store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_randomness_config_EINVALID_CONFIG_VARIANT"></a>

```move
module 0x1::randomness_config {
    const EINVALID_CONFIG_VARIANT: u64 = 1;
}
```

<a id="0x1_randomness_config_initialize"></a>

## Function `initialize`

Initialize the configuration. Used in genesis or governance.

```move
module 0x1::randomness_config {
    public fun initialize(framework: &signer, config: randomness_config::RandomnessConfig)
}
```

<a id="0x1_randomness_config_set_for_next_epoch"></a>

## Function `set_for_next_epoch`

This can be called by on&#45;chain governance to update on&#45;chain consensus configs for the next epoch.

```move
module 0x1::randomness_config {
    public fun set_for_next_epoch(framework: &signer, new_config: randomness_config::RandomnessConfig)
}
```

<a id="0x1_randomness_config_on_new_epoch"></a>

## Function `on_new_epoch`

Only used in reconfigurations to apply the pending `RandomnessConfig`, if there is any.

```move
module 0x1::randomness_config {
    public(friend) fun on_new_epoch(framework: &signer)
}
```

<a id="0x1_randomness_config_enabled"></a>

## Function `enabled`

Check whether on&#45;chain randomness main logic (e.g., `DKGManager`, `RandManager`, `BlockMetadataExt`) is enabled.

NOTE: this returning true does not mean randomness will run.
The feature works if and only if `consensus_config::validator_txn_enabled() && randomness_config::enabled()`.

```move
module 0x1::randomness_config {
    public fun enabled(): bool
}
```

<a id="0x1_randomness_config_new_off"></a>

## Function `new_off`

Create a `ConfigOff` variant.

```move
module 0x1::randomness_config {
    public fun new_off(): randomness_config::RandomnessConfig
}
```

<a id="0x1_randomness_config_new_v1"></a>

## Function `new_v1`

Create a `ConfigV1` variant.

```move
module 0x1::randomness_config {
    public fun new_v1(secrecy_threshold: fixed_point64::FixedPoint64, reconstruction_threshold: fixed_point64::FixedPoint64): randomness_config::RandomnessConfig
}
```

<a id="0x1_randomness_config_new_v2"></a>

## Function `new_v2`

Create a `ConfigV2` variant.

```move
module 0x1::randomness_config {
    public fun new_v2(secrecy_threshold: fixed_point64::FixedPoint64, reconstruction_threshold: fixed_point64::FixedPoint64, fast_path_secrecy_threshold: fixed_point64::FixedPoint64): randomness_config::RandomnessConfig
}
```

<a id="0x1_randomness_config_current"></a>

## Function `current`

Get the currently effective randomness configuration object.

```move
module 0x1::randomness_config {
    public fun current(): randomness_config::RandomnessConfig
}
```
