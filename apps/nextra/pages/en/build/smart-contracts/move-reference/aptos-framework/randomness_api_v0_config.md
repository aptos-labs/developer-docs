<a id="0x1_randomness_api_v0_config"></a>

# Module `0x1::randomness_api_v0_config`

- [Resource `RequiredGasDeposit`](#0x1_randomness_api_v0_config_RequiredGasDeposit)
- [Resource `AllowCustomMaxGasFlag`](#0x1_randomness_api_v0_config_AllowCustomMaxGasFlag)
- [Function `set_for_next_epoch`](#0x1_randomness_api_v0_config_set_for_next_epoch)
- [Function `set_allow_max_gas_flag_for_next_epoch`](#0x1_randomness_api_v0_config_set_allow_max_gas_flag_for_next_epoch)
- [Function `on_new_epoch`](#0x1_randomness_api_v0_config_on_new_epoch)

```move
module 0x1::randomness_api_v0_config {
    use 0x1::chain_status;
    use 0x1::config_buffer;
    use 0x1::option;
    use 0x1::system_addresses;
}
```

<a id="0x1_randomness_api_v0_config_RequiredGasDeposit"></a>

## Resource `RequiredGasDeposit`

```move
module 0x1::randomness_api_v0_config {
    struct RequiredGasDeposit has drop, store, key
}
```

<a id="0x1_randomness_api_v0_config_AllowCustomMaxGasFlag"></a>

## Resource `AllowCustomMaxGasFlag`

If this flag is set, `max_gas` specified inside `#[randomness()]` will be used as the required deposit.

```move
module 0x1::randomness_api_v0_config {
    struct AllowCustomMaxGasFlag has drop, store, key
}
```

<a id="0x1_randomness_api_v0_config_set_for_next_epoch"></a>

## Function `set_for_next_epoch`

This can be called by on&#45;chain governance to update `RequiredGasDeposit` for the next epoch.

```move
module 0x1::randomness_api_v0_config {
    public fun set_for_next_epoch(framework: &signer, gas_amount: option::Option<u64>)
}
```

<a id="0x1_randomness_api_v0_config_set_allow_max_gas_flag_for_next_epoch"></a>

## Function `set_allow_max_gas_flag_for_next_epoch`

This can be called by on&#45;chain governance to update `AllowCustomMaxGasFlag` for the next epoch.

```move
module 0x1::randomness_api_v0_config {
    public fun set_allow_max_gas_flag_for_next_epoch(framework: &signer, value: bool)
}
```

<a id="0x1_randomness_api_v0_config_on_new_epoch"></a>

## Function `on_new_epoch`

Only used in reconfigurations to apply the pending `RequiredGasDeposit`, if there is any.

```move
module 0x1::randomness_api_v0_config {
    public fun on_new_epoch(framework: &signer)
}
```
