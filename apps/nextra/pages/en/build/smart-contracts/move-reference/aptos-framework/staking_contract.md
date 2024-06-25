<a id="0x1_staking_contract"></a>

# Module `0x1::staking_contract`

Allow stakers and operators to enter a staking contract with reward sharing.
The main accounting logic in a staking contract consists of 2 parts:

1. Tracks how much commission needs to be paid out to the operator. This is tracked with an increasing principal
   amount that&apos;s updated every time the operator requests commission, the staker withdraws funds, or the staker
   switches operators.
2. Distributions of funds to operators (commissions) and stakers (stake withdrawals) use the shares model provided
   by the pool_u64 to track shares that increase in price as the stake pool accumulates rewards.

Example flow:

1. A staker creates a staking contract with an operator by calling create_staking_contract() with 100 coins of
   initial stake and commission &#61; 10%. This means the operator will receive 10% of any accumulated rewards. A new stake
   pool will be created and hosted in a separate account that&apos;s controlled by the staking contract.
2. The operator sets up a validator node and, once ready, joins the validator set by calling stake::join_validator_set
3. After some time, the stake pool gains rewards and now has 150 coins.
4. Operator can now call request_commission. 10% of (150 &#45; 100) &#61; 5 coins will be unlocked from the stake pool. The
   staker&apos;s principal is now updated from 100 to 145 (150 coins &#45; 5 coins of commission). The pending distribution pool
   has 5 coins total and the operator owns all 5 shares of it.
5. Some more time has passed. The pool now has 50 more coins in rewards and a total balance of 195. The operator
   calls request_commission again. Since the previous 5 coins have now become withdrawable, it&apos;ll be deposited into the
   operator&apos;s account first. Their new commission will be 10% of (195 coins &#45; 145 principal) &#61; 5 coins. Principal is
   updated to be 190 (195 &#45; 5). Pending distribution pool has 5 coins and operator owns all 5 shares.
6. Staker calls unlock_stake to unlock 50 coins of stake, which gets added to the pending distribution pool. Based
   on shares math, staker will be owning 50 shares and operator still owns 5 shares of the 55&#45;coin pending distribution
   pool.
7. Some time passes and the 55 coins become fully withdrawable from the stake pool. Due to accumulated rewards, the
   55 coins become 70 coins. Calling distribute() distributes 6 coins to the operator and 64 coins to the validator.

- [Struct `StakingGroupContainer`](#0x1_staking_contract_StakingGroupContainer)
- [Struct `StakingContract`](#0x1_staking_contract_StakingContract)
- [Resource `Store`](#0x1_staking_contract_Store)
- [Resource `BeneficiaryForOperator`](#0x1_staking_contract_BeneficiaryForOperator)
- [Struct `UpdateCommissionEvent`](#0x1_staking_contract_UpdateCommissionEvent)
- [Struct `UpdateCommission`](#0x1_staking_contract_UpdateCommission)
- [Resource `StakingGroupUpdateCommissionEvent`](#0x1_staking_contract_StakingGroupUpdateCommissionEvent)
- [Struct `CreateStakingContract`](#0x1_staking_contract_CreateStakingContract)
- [Struct `UpdateVoter`](#0x1_staking_contract_UpdateVoter)
- [Struct `ResetLockup`](#0x1_staking_contract_ResetLockup)
- [Struct `AddStake`](#0x1_staking_contract_AddStake)
- [Struct `RequestCommission`](#0x1_staking_contract_RequestCommission)
- [Struct `UnlockStake`](#0x1_staking_contract_UnlockStake)
- [Struct `SwitchOperator`](#0x1_staking_contract_SwitchOperator)
- [Struct `AddDistribution`](#0x1_staking_contract_AddDistribution)
- [Struct `Distribute`](#0x1_staking_contract_Distribute)
- [Struct `SetBeneficiaryForOperator`](#0x1_staking_contract_SetBeneficiaryForOperator)
- [Struct `CreateStakingContractEvent`](#0x1_staking_contract_CreateStakingContractEvent)
- [Struct `UpdateVoterEvent`](#0x1_staking_contract_UpdateVoterEvent)
- [Struct `ResetLockupEvent`](#0x1_staking_contract_ResetLockupEvent)
- [Struct `AddStakeEvent`](#0x1_staking_contract_AddStakeEvent)
- [Struct `RequestCommissionEvent`](#0x1_staking_contract_RequestCommissionEvent)
- [Struct `UnlockStakeEvent`](#0x1_staking_contract_UnlockStakeEvent)
- [Struct `SwitchOperatorEvent`](#0x1_staking_contract_SwitchOperatorEvent)
- [Struct `AddDistributionEvent`](#0x1_staking_contract_AddDistributionEvent)
- [Struct `DistributeEvent`](#0x1_staking_contract_DistributeEvent)
- [Constants](#@Constants_0)
- [Function `stake_pool_address`](#0x1_staking_contract_stake_pool_address)
- [Function `last_recorded_principal`](#0x1_staking_contract_last_recorded_principal)
- [Function `commission_percentage`](#0x1_staking_contract_commission_percentage)
- [Function `staking_contract_amounts`](#0x1_staking_contract_staking_contract_amounts)
- [Function `pending_distribution_counts`](#0x1_staking_contract_pending_distribution_counts)
- [Function `staking_contract_exists`](#0x1_staking_contract_staking_contract_exists)
- [Function `beneficiary_for_operator`](#0x1_staking_contract_beneficiary_for_operator)
- [Function `get_expected_stake_pool_address`](#0x1_staking_contract_get_expected_stake_pool_address)
- [Function `create_staking_contract`](#0x1_staking_contract_create_staking_contract)
- [Function `create_staking_contract_with_coins`](#0x1_staking_contract_create_staking_contract_with_coins)
- [Function `add_stake`](#0x1_staking_contract_add_stake)
- [Function `update_voter`](#0x1_staking_contract_update_voter)
- [Function `reset_lockup`](#0x1_staking_contract_reset_lockup)
- [Function `update_commision`](#0x1_staking_contract_update_commision)
- [Function `request_commission`](#0x1_staking_contract_request_commission)
- [Function `unlock_stake`](#0x1_staking_contract_unlock_stake)
- [Function `unlock_rewards`](#0x1_staking_contract_unlock_rewards)
- [Function `switch_operator_with_same_commission`](#0x1_staking_contract_switch_operator_with_same_commission)
- [Function `switch_operator`](#0x1_staking_contract_switch_operator)
- [Function `set_beneficiary_for_operator`](#0x1_staking_contract_set_beneficiary_for_operator)
- [Function `distribute`](#0x1_staking_contract_distribute)

```move
module 0x1::staking_contract {
    use 0x1::account;
    use 0x1::aptos_account;
    use 0x1::aptos_coin;
    use 0x1::bcs;
    use 0x1::coin;
    use 0x1::error;
    use 0x1::event;
    use 0x1::features;
    use 0x1::pool_u64;
    use 0x1::signer;
    use 0x1::simple_map;
    use 0x1::stake;
    use 0x1::staking_config;
    use 0x1::vector;
}
```

<a id="0x1_staking_contract_StakingGroupContainer"></a>

## Struct `StakingGroupContainer`

```move
module 0x1::staking_contract {
    #[resource_group(#[scope = module_])]
    struct StakingGroupContainer
}
```

<a id="0x1_staking_contract_StakingContract"></a>

## Struct `StakingContract`

```move
module 0x1::staking_contract {
    struct StakingContract has store
}
```

<a id="0x1_staking_contract_Store"></a>

## Resource `Store`

```move
module 0x1::staking_contract {
    struct Store has key
}
```

<a id="0x1_staking_contract_BeneficiaryForOperator"></a>

## Resource `BeneficiaryForOperator`

```move
module 0x1::staking_contract {
    struct BeneficiaryForOperator has key
}
```

<a id="0x1_staking_contract_UpdateCommissionEvent"></a>

## Struct `UpdateCommissionEvent`

```move
module 0x1::staking_contract {
    struct UpdateCommissionEvent has drop, store
}
```

<a id="0x1_staking_contract_UpdateCommission"></a>

## Struct `UpdateCommission`

```move
module 0x1::staking_contract {
    #[event]
    struct UpdateCommission has drop, store
}
```

<a id="0x1_staking_contract_StakingGroupUpdateCommissionEvent"></a>

## Resource `StakingGroupUpdateCommissionEvent`

```move
module 0x1::staking_contract {
    #[resource_group_member(#[group = 0x1::staking_contract::StakingGroupContainer])]
    struct StakingGroupUpdateCommissionEvent has key
}
```

<a id="0x1_staking_contract_CreateStakingContract"></a>

## Struct `CreateStakingContract`

```move
module 0x1::staking_contract {
    #[event]
    struct CreateStakingContract has drop, store
}
```

<a id="0x1_staking_contract_UpdateVoter"></a>

## Struct `UpdateVoter`

```move
module 0x1::staking_contract {
    #[event]
    struct UpdateVoter has drop, store
}
```

<a id="0x1_staking_contract_ResetLockup"></a>

## Struct `ResetLockup`

```move
module 0x1::staking_contract {
    #[event]
    struct ResetLockup has drop, store
}
```

<a id="0x1_staking_contract_AddStake"></a>

## Struct `AddStake`

```move
module 0x1::staking_contract {
    #[event]
    struct AddStake has drop, store
}
```

<a id="0x1_staking_contract_RequestCommission"></a>

## Struct `RequestCommission`

```move
module 0x1::staking_contract {
    #[event]
    struct RequestCommission has drop, store
}
```

<a id="0x1_staking_contract_UnlockStake"></a>

## Struct `UnlockStake`

```move
module 0x1::staking_contract {
    #[event]
    struct UnlockStake has drop, store
}
```

<a id="0x1_staking_contract_SwitchOperator"></a>

## Struct `SwitchOperator`

```move
module 0x1::staking_contract {
    #[event]
    struct SwitchOperator has drop, store
}
```

<a id="0x1_staking_contract_AddDistribution"></a>

## Struct `AddDistribution`

```move
module 0x1::staking_contract {
    #[event]
    struct AddDistribution has drop, store
}
```

<a id="0x1_staking_contract_Distribute"></a>

## Struct `Distribute`

```move
module 0x1::staking_contract {
    #[event]
    struct Distribute has drop, store
}
```

<a id="0x1_staking_contract_SetBeneficiaryForOperator"></a>

## Struct `SetBeneficiaryForOperator`

```move
module 0x1::staking_contract {
    #[event]
    struct SetBeneficiaryForOperator has drop, store
}
```

<a id="0x1_staking_contract_CreateStakingContractEvent"></a>

## Struct `CreateStakingContractEvent`

```move
module 0x1::staking_contract {
    struct CreateStakingContractEvent has drop, store
}
```

<a id="0x1_staking_contract_UpdateVoterEvent"></a>

## Struct `UpdateVoterEvent`

```move
module 0x1::staking_contract {
    struct UpdateVoterEvent has drop, store
}
```

<a id="0x1_staking_contract_ResetLockupEvent"></a>

## Struct `ResetLockupEvent`

```move
module 0x1::staking_contract {
    struct ResetLockupEvent has drop, store
}
```

<a id="0x1_staking_contract_AddStakeEvent"></a>

## Struct `AddStakeEvent`

```move
module 0x1::staking_contract {
    struct AddStakeEvent has drop, store
}
```

<a id="0x1_staking_contract_RequestCommissionEvent"></a>

## Struct `RequestCommissionEvent`

```move
module 0x1::staking_contract {
    struct RequestCommissionEvent has drop, store
}
```

<a id="0x1_staking_contract_UnlockStakeEvent"></a>

## Struct `UnlockStakeEvent`

```move
module 0x1::staking_contract {
    struct UnlockStakeEvent has drop, store
}
```

<a id="0x1_staking_contract_SwitchOperatorEvent"></a>

## Struct `SwitchOperatorEvent`

```move
module 0x1::staking_contract {
    struct SwitchOperatorEvent has drop, store
}
```

<a id="0x1_staking_contract_AddDistributionEvent"></a>

## Struct `AddDistributionEvent`

```move
module 0x1::staking_contract {
    struct AddDistributionEvent has drop, store
}
```

<a id="0x1_staking_contract_DistributeEvent"></a>

## Struct `DistributeEvent`

```move
module 0x1::staking_contract {
    struct DistributeEvent has drop, store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_staking_contract_EINVALID_COMMISSION_PERCENTAGE"></a>

Commission percentage has to be between 0 and 100.

```move
module 0x1::staking_contract {
    const EINVALID_COMMISSION_PERCENTAGE: u64 = 2;
}
```

<a id="0x1_staking_contract_EOPERATOR_BENEFICIARY_CHANGE_NOT_SUPPORTED"></a>

Chaning beneficiaries for operators is not supported.

```move
module 0x1::staking_contract {
    const EOPERATOR_BENEFICIARY_CHANGE_NOT_SUPPORTED: u64 = 9;
}
```

<a id="0x1_staking_contract_ECANT_MERGE_STAKING_CONTRACTS"></a>

Staking contracts can&apos;t be merged.

```move
module 0x1::staking_contract {
    const ECANT_MERGE_STAKING_CONTRACTS: u64 = 5;
}
```

<a id="0x1_staking_contract_EINSUFFICIENT_ACTIVE_STAKE_TO_WITHDRAW"></a>

Not enough active stake to withdraw. Some stake might still pending and will be active in the next epoch.

```move
module 0x1::staking_contract {
    const EINSUFFICIENT_ACTIVE_STAKE_TO_WITHDRAW: u64 = 7;
}
```

<a id="0x1_staking_contract_EINSUFFICIENT_STAKE_AMOUNT"></a>

Store amount must be at least the min stake required for a stake pool to join the validator set.

```move
module 0x1::staking_contract {
    const EINSUFFICIENT_STAKE_AMOUNT: u64 = 1;
}
```

<a id="0x1_staking_contract_ENOT_STAKER_OR_OPERATOR_OR_BENEFICIARY"></a>

Caller must be either the staker, operator, or beneficiary.

```move
module 0x1::staking_contract {
    const ENOT_STAKER_OR_OPERATOR_OR_BENEFICIARY: u64 = 8;
}
```

<a id="0x1_staking_contract_ENO_STAKING_CONTRACT_FOUND_FOR_OPERATOR"></a>

No staking contract between the staker and operator found.

```move
module 0x1::staking_contract {
    const ENO_STAKING_CONTRACT_FOUND_FOR_OPERATOR: u64 = 4;
}
```

<a id="0x1_staking_contract_ENO_STAKING_CONTRACT_FOUND_FOR_STAKER"></a>

Staker has no staking contracts.

```move
module 0x1::staking_contract {
    const ENO_STAKING_CONTRACT_FOUND_FOR_STAKER: u64 = 3;
}
```

<a id="0x1_staking_contract_ESTAKING_CONTRACT_ALREADY_EXISTS"></a>

The staking contract already exists and cannot be re&#45;created.

```move
module 0x1::staking_contract {
    const ESTAKING_CONTRACT_ALREADY_EXISTS: u64 = 6;
}
```

<a id="0x1_staking_contract_MAXIMUM_PENDING_DISTRIBUTIONS"></a>

Maximum number of distributions a stake pool can support.

```move
module 0x1::staking_contract {
    const MAXIMUM_PENDING_DISTRIBUTIONS: u64 = 20;
}
```

<a id="0x1_staking_contract_SALT"></a>

```move
module 0x1::staking_contract {
    const SALT: vector<u8> = [97, 112, 116, 111, 115, 95, 102, 114, 97, 109, 101, 119, 111, 114, 107, 58, 58, 115, 116, 97, 107, 105, 110, 103, 95, 99, 111, 110, 116, 114, 97, 99, 116];
}
```

<a id="0x1_staking_contract_stake_pool_address"></a>

## Function `stake_pool_address`

Return the address of the underlying stake pool for the staking contract between the provided staker and
operator.

This errors out the staking contract with the provided staker and operator doesn&apos;t exist.

```move
module 0x1::staking_contract {
    #[view]
    public fun stake_pool_address(staker: address, operator: address): address
}
```

<a id="0x1_staking_contract_last_recorded_principal"></a>

## Function `last_recorded_principal`

Return the last recorded principal (the amount that 100% belongs to the staker with commission already paid for)
for staking contract between the provided staker and operator.

This errors out the staking contract with the provided staker and operator doesn&apos;t exist.

```move
module 0x1::staking_contract {
    #[view]
    public fun last_recorded_principal(staker: address, operator: address): u64
}
```

<a id="0x1_staking_contract_commission_percentage"></a>

## Function `commission_percentage`

Return percentage of accumulated rewards that will be paid to the operator as commission for staking contract
between the provided staker and operator.

This errors out the staking contract with the provided staker and operator doesn&apos;t exist.

```move
module 0x1::staking_contract {
    #[view]
    public fun commission_percentage(staker: address, operator: address): u64
}
```

<a id="0x1_staking_contract_staking_contract_amounts"></a>

## Function `staking_contract_amounts`

Return a tuple of three numbers:

1. The total active stake in the underlying stake pool
2. The total accumulated rewards that haven&apos;t had commission paid out
3. The commission amount owned from those accumulated rewards.

This errors out the staking contract with the provided staker and operator doesn&apos;t exist.

```move
module 0x1::staking_contract {
    #[view]
    public fun staking_contract_amounts(staker: address, operator: address): (u64, u64, u64)
}
```

<a id="0x1_staking_contract_pending_distribution_counts"></a>

## Function `pending_distribution_counts`

Return the number of pending distributions (e.g. commission, withdrawals from stakers).

This errors out the staking contract with the provided staker and operator doesn&apos;t exist.

```move
module 0x1::staking_contract {
    #[view]
    public fun pending_distribution_counts(staker: address, operator: address): u64
}
```

<a id="0x1_staking_contract_staking_contract_exists"></a>

## Function `staking_contract_exists`

Return true if the staking contract between the provided staker and operator exists.

```move
module 0x1::staking_contract {
    #[view]
    public fun staking_contract_exists(staker: address, operator: address): bool
}
```

<a id="0x1_staking_contract_beneficiary_for_operator"></a>

## Function `beneficiary_for_operator`

Return the beneficiary address of the operator.

```move
module 0x1::staking_contract {
    #[view]
    public fun beneficiary_for_operator(operator: address): address
}
```

<a id="0x1_staking_contract_get_expected_stake_pool_address"></a>

## Function `get_expected_stake_pool_address`

Return the address of the stake pool to be created with the provided staker, operator and seed.

```move
module 0x1::staking_contract {
    #[view]
    public fun get_expected_stake_pool_address(staker: address, operator: address, contract_creation_seed: vector<u8>): address
}
```

<a id="0x1_staking_contract_create_staking_contract"></a>

## Function `create_staking_contract`

Staker can call this function to create a simple staking contract with a specified operator.

```move
module 0x1::staking_contract {
    public entry fun create_staking_contract(staker: &signer, operator: address, voter: address, amount: u64, commission_percentage: u64, contract_creation_seed: vector<u8>)
}
```

<a id="0x1_staking_contract_create_staking_contract_with_coins"></a>

## Function `create_staking_contract_with_coins`

Staker can call this function to create a simple staking contract with a specified operator.

```move
module 0x1::staking_contract {
    public fun create_staking_contract_with_coins(staker: &signer, operator: address, voter: address, coins: coin::Coin<aptos_coin::AptosCoin>, commission_percentage: u64, contract_creation_seed: vector<u8>): address
}
```

<a id="0x1_staking_contract_add_stake"></a>

## Function `add_stake`

Add more stake to an existing staking contract.

```move
module 0x1::staking_contract {
    public entry fun add_stake(staker: &signer, operator: address, amount: u64)
}
```

<a id="0x1_staking_contract_update_voter"></a>

## Function `update_voter`

Convenient function to allow the staker to update the voter address in a staking contract they made.

```move
module 0x1::staking_contract {
    public entry fun update_voter(staker: &signer, operator: address, new_voter: address)
}
```

<a id="0x1_staking_contract_reset_lockup"></a>

## Function `reset_lockup`

Convenient function to allow the staker to reset their stake pool&apos;s lockup period to start now.

```move
module 0x1::staking_contract {
    public entry fun reset_lockup(staker: &signer, operator: address)
}
```

<a id="0x1_staking_contract_update_commision"></a>

## Function `update_commision`

Convenience function to allow a staker to update the commission percentage paid to the operator.
TODO: fix the typo in function name. commision &#45;&gt; commission

```move
module 0x1::staking_contract {
    public entry fun update_commision(staker: &signer, operator: address, new_commission_percentage: u64)
}
```

<a id="0x1_staking_contract_request_commission"></a>

## Function `request_commission`

Unlock commission amount from the stake pool. Operator needs to wait for the amount to become withdrawable
at the end of the stake pool&apos;s lockup period before they can actually can withdraw_commission.

Only staker, operator or beneficiary can call this.

```move
module 0x1::staking_contract {
    public entry fun request_commission(account: &signer, staker: address, operator: address)
}
```

<a id="0x1_staking_contract_unlock_stake"></a>

## Function `unlock_stake`

Staker can call this to request withdrawal of part or all of their staking_contract.
This also triggers paying commission to the operator for accounting simplicity.

```move
module 0x1::staking_contract {
    public entry fun unlock_stake(staker: &signer, operator: address, amount: u64)
}
```

<a id="0x1_staking_contract_unlock_rewards"></a>

## Function `unlock_rewards`

Unlock all accumulated rewards since the last recorded principals.

```move
module 0x1::staking_contract {
    public entry fun unlock_rewards(staker: &signer, operator: address)
}
```

<a id="0x1_staking_contract_switch_operator_with_same_commission"></a>

## Function `switch_operator_with_same_commission`

Allows staker to switch operator without going through the lenghthy process to unstake, without resetting commission.

```move
module 0x1::staking_contract {
    public entry fun switch_operator_with_same_commission(staker: &signer, old_operator: address, new_operator: address)
}
```

<a id="0x1_staking_contract_switch_operator"></a>

## Function `switch_operator`

Allows staker to switch operator without going through the lenghthy process to unstake.

```move
module 0x1::staking_contract {
    public entry fun switch_operator(staker: &signer, old_operator: address, new_operator: address, new_commission_percentage: u64)
}
```

<a id="0x1_staking_contract_set_beneficiary_for_operator"></a>

## Function `set_beneficiary_for_operator`

Allows an operator to change its beneficiary. Any existing unpaid commission rewards will be paid to the new
beneficiary. To ensures payment to the current beneficiary, one should first call `distribute` before switching
the beneficiary. An operator can set one beneficiary for staking contract pools, not a separate one for each pool.

```move
module 0x1::staking_contract {
    public entry fun set_beneficiary_for_operator(operator: &signer, new_beneficiary: address)
}
```

<a id="0x1_staking_contract_distribute"></a>

## Function `distribute`

Allow anyone to distribute already unlocked funds. This does not affect reward compounding and therefore does
not need to be restricted to just the staker or operator.

```move
module 0x1::staking_contract {
    public entry fun distribute(staker: address, operator: address)
}
```
