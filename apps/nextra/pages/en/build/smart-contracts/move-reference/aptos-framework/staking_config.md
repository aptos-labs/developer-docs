<a id="0x1_staking_config"></a>

# Module `0x1::staking_config`

Provides the configuration for staking and rewards

- [Resource `StakingConfig`](#0x1_staking_config_StakingConfig)
- [Resource `StakingRewardsConfig`](#0x1_staking_config_StakingRewardsConfig)
- [Constants](#@Constants_0)
- [Function `initialize`](#0x1_staking_config_initialize)
- [Function `reward_rate`](#0x1_staking_config_reward_rate)
- [Function `initialize_rewards`](#0x1_staking_config_initialize_rewards)
- [Function `get`](#0x1_staking_config_get)
- [Function `get_allow_validator_set_change`](#0x1_staking_config_get_allow_validator_set_change)
- [Function `get_required_stake`](#0x1_staking_config_get_required_stake)
- [Function `get_recurring_lockup_duration`](#0x1_staking_config_get_recurring_lockup_duration)
- [Function `get_reward_rate`](#0x1_staking_config_get_reward_rate)
- [Function `get_voting_power_increase_limit`](#0x1_staking_config_get_voting_power_increase_limit)
- [Function `calculate_and_save_latest_epoch_rewards_rate`](#0x1_staking_config_calculate_and_save_latest_epoch_rewards_rate)
- [Function `update_required_stake`](#0x1_staking_config_update_required_stake)
- [Function `update_recurring_lockup_duration_secs`](#0x1_staking_config_update_recurring_lockup_duration_secs)
- [Function `update_rewards_rate`](#0x1_staking_config_update_rewards_rate)
- [Function `update_rewards_config`](#0x1_staking_config_update_rewards_config)
- [Function `update_voting_power_increase_limit`](#0x1_staking_config_update_voting_power_increase_limit)

```move
module 0x1::staking_config {
    use 0x1::error;
    use 0x1::features;
    use 0x1::fixed_point64;
    use 0x1::math_fixed64;
    use 0x1::system_addresses;
    use 0x1::timestamp;
}
```

<a id="0x1_staking_config_StakingConfig"></a>

## Resource `StakingConfig`

Validator set configurations that will be stored with the @aptos_framework account.

```move
module 0x1::staking_config {
    struct StakingConfig has copy, drop, key
}
```

<a id="0x1_staking_config_StakingRewardsConfig"></a>

## Resource `StakingRewardsConfig`

Staking reward configurations that will be stored with the @aptos_framework account.

```move
module 0x1::staking_config {
    struct StakingRewardsConfig has copy, drop, key
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_staking_config_MAX_U64"></a>

```move
module 0x1::staking_config {
    const MAX_U64: u128 = 18446744073709551615;
}
```

<a id="0x1_staking_config_BPS_DENOMINATOR"></a>

Denominator of number in basis points. 1 bps(basis points) &#61; 0.01%.

```move
module 0x1::staking_config {
    const BPS_DENOMINATOR: u64 = 10000;
}
```

<a id="0x1_staking_config_EDEPRECATED_FUNCTION"></a>

The function has been deprecated.

```move
module 0x1::staking_config {
    const EDEPRECATED_FUNCTION: u64 = 10;
}
```

<a id="0x1_staking_config_EDISABLED_FUNCTION"></a>

The function is disabled or hasn&apos;t been enabled.

```move
module 0x1::staking_config {
    const EDISABLED_FUNCTION: u64 = 11;
}
```

<a id="0x1_staking_config_EINVALID_LAST_REWARDS_RATE_PERIOD_START"></a>

Specified start time of last rewards rate period is invalid, which must be not late than the current timestamp.

```move
module 0x1::staking_config {
    const EINVALID_LAST_REWARDS_RATE_PERIOD_START: u64 = 7;
}
```

<a id="0x1_staking_config_EINVALID_MIN_REWARDS_RATE"></a>

Specified min rewards rate is invalid, which must be within [0, rewards_rate].

```move
module 0x1::staking_config {
    const EINVALID_MIN_REWARDS_RATE: u64 = 6;
}
```

<a id="0x1_staking_config_EINVALID_REWARDS_RATE"></a>

Specified rewards rate is invalid, which must be within [0, MAX_REWARDS_RATE].

```move
module 0x1::staking_config {
    const EINVALID_REWARDS_RATE: u64 = 5;
}
```

<a id="0x1_staking_config_EINVALID_REWARDS_RATE_DECREASE_RATE"></a>

Specified rewards rate decrease rate is invalid, which must be not greater than BPS_DENOMINATOR.

```move
module 0x1::staking_config {
    const EINVALID_REWARDS_RATE_DECREASE_RATE: u64 = 8;
}
```

<a id="0x1_staking_config_EINVALID_REWARDS_RATE_PERIOD"></a>

Specified rewards rate period is invalid. It must be larger than 0 and cannot be changed if configured.

```move
module 0x1::staking_config {
    const EINVALID_REWARDS_RATE_PERIOD: u64 = 9;
}
```

<a id="0x1_staking_config_EINVALID_STAKE_RANGE"></a>

Specified stake range is invalid. Max must be greater than min.

```move
module 0x1::staking_config {
    const EINVALID_STAKE_RANGE: u64 = 3;
}
```

<a id="0x1_staking_config_EINVALID_VOTING_POWER_INCREASE_LIMIT"></a>

The voting power increase limit percentage must be within (0, 50].

```move
module 0x1::staking_config {
    const EINVALID_VOTING_POWER_INCREASE_LIMIT: u64 = 4;
}
```

<a id="0x1_staking_config_EZERO_LOCKUP_DURATION"></a>

Stake lockup duration cannot be zero.

```move
module 0x1::staking_config {
    const EZERO_LOCKUP_DURATION: u64 = 1;
}
```

<a id="0x1_staking_config_EZERO_REWARDS_RATE_DENOMINATOR"></a>

Reward rate denominator cannot be zero.

```move
module 0x1::staking_config {
    const EZERO_REWARDS_RATE_DENOMINATOR: u64 = 2;
}
```

<a id="0x1_staking_config_MAX_REWARDS_RATE"></a>

Limit the maximum value of `rewards_rate` in order to avoid any arithmetic overflow.

```move
module 0x1::staking_config {
    const MAX_REWARDS_RATE: u64 = 1000000;
}
```

<a id="0x1_staking_config_ONE_YEAR_IN_SECS"></a>

1 year &#61;&gt; 365 \* 24 \* 60 \* 60

```move
module 0x1::staking_config {
    const ONE_YEAR_IN_SECS: u64 = 31536000;
}
```

<a id="0x1_staking_config_initialize"></a>

## Function `initialize`

Only called during genesis.

```move
module 0x1::staking_config {
    public(friend) fun initialize(aptos_framework: &signer, minimum_stake: u64, maximum_stake: u64, recurring_lockup_duration_secs: u64, allow_validator_set_change: bool, rewards_rate: u64, rewards_rate_denominator: u64, voting_power_increase_limit: u64)
}
```

<a id="0x1_staking_config_reward_rate"></a>

## Function `reward_rate`

Return the reward rate of this epoch as a tuple (numerator, denominator).

```move
module 0x1::staking_config {
    #[view]
    public fun reward_rate(): (u64, u64)
}
```

<a id="0x1_staking_config_initialize_rewards"></a>

## Function `initialize_rewards`

Initialize rewards configurations.
Can only be called as part of the Aptos governance proposal process established by the AptosGovernance module.

```move
module 0x1::staking_config {
    public fun initialize_rewards(aptos_framework: &signer, rewards_rate: fixed_point64::FixedPoint64, min_rewards_rate: fixed_point64::FixedPoint64, rewards_rate_period_in_secs: u64, last_rewards_rate_period_start_in_secs: u64, rewards_rate_decrease_rate: fixed_point64::FixedPoint64)
}
```

<a id="0x1_staking_config_get"></a>

## Function `get`

```move
module 0x1::staking_config {
    public fun get(): staking_config::StakingConfig
}
```

<a id="0x1_staking_config_get_allow_validator_set_change"></a>

## Function `get_allow_validator_set_change`

Return whether validator set changes are allowed

```move
module 0x1::staking_config {
    public fun get_allow_validator_set_change(config: &staking_config::StakingConfig): bool
}
```

<a id="0x1_staking_config_get_required_stake"></a>

## Function `get_required_stake`

Return the required min/max stake.

```move
module 0x1::staking_config {
    public fun get_required_stake(config: &staking_config::StakingConfig): (u64, u64)
}
```

<a id="0x1_staking_config_get_recurring_lockup_duration"></a>

## Function `get_recurring_lockup_duration`

Return the recurring lockup duration that every validator is automatically renewed for (unless they unlock and
withdraw all funds).

```move
module 0x1::staking_config {
    public fun get_recurring_lockup_duration(config: &staking_config::StakingConfig): u64
}
```

<a id="0x1_staking_config_get_reward_rate"></a>

## Function `get_reward_rate`

Return the reward rate of this epoch.

```move
module 0x1::staking_config {
    public fun get_reward_rate(config: &staking_config::StakingConfig): (u64, u64)
}
```

<a id="0x1_staking_config_get_voting_power_increase_limit"></a>

## Function `get_voting_power_increase_limit`

Return the joining limit %.

```move
module 0x1::staking_config {
    public fun get_voting_power_increase_limit(config: &staking_config::StakingConfig): u64
}
```

<a id="0x1_staking_config_calculate_and_save_latest_epoch_rewards_rate"></a>

## Function `calculate_and_save_latest_epoch_rewards_rate`

Calculate and save the latest rewards rate.

```move
module 0x1::staking_config {
    public(friend) fun calculate_and_save_latest_epoch_rewards_rate(): fixed_point64::FixedPoint64
}
```

<a id="0x1_staking_config_update_required_stake"></a>

## Function `update_required_stake`

Update the min and max stake amounts.
Can only be called as part of the Aptos governance proposal process established by the AptosGovernance module.

```move
module 0x1::staking_config {
    public fun update_required_stake(aptos_framework: &signer, minimum_stake: u64, maximum_stake: u64)
}
```

<a id="0x1_staking_config_update_recurring_lockup_duration_secs"></a>

## Function `update_recurring_lockup_duration_secs`

Update the recurring lockup duration.
Can only be called as part of the Aptos governance proposal process established by the AptosGovernance module.

```move
module 0x1::staking_config {
    public fun update_recurring_lockup_duration_secs(aptos_framework: &signer, new_recurring_lockup_duration_secs: u64)
}
```

<a id="0x1_staking_config_update_rewards_rate"></a>

## Function `update_rewards_rate`

DEPRECATING
Update the rewards rate.
Can only be called as part of the Aptos governance proposal process established by the AptosGovernance module.

```move
module 0x1::staking_config {
    public fun update_rewards_rate(aptos_framework: &signer, new_rewards_rate: u64, new_rewards_rate_denominator: u64)
}
```

<a id="0x1_staking_config_update_rewards_config"></a>

## Function `update_rewards_config`

```move
module 0x1::staking_config {
    public fun update_rewards_config(aptos_framework: &signer, rewards_rate: fixed_point64::FixedPoint64, min_rewards_rate: fixed_point64::FixedPoint64, rewards_rate_period_in_secs: u64, rewards_rate_decrease_rate: fixed_point64::FixedPoint64)
}
```

<a id="0x1_staking_config_update_voting_power_increase_limit"></a>

## Function `update_voting_power_increase_limit`

Update the joining limit %.
Can only be called as part of the Aptos governance proposal process established by the AptosGovernance module.

```move
module 0x1::staking_config {
    public fun update_voting_power_increase_limit(aptos_framework: &signer, new_voting_power_increase_limit: u64)
}
```
