<a id="0x1_stake"></a>

# Module `0x1::stake`

Validator lifecycle:

1. Prepare a validator node set up and call stake::initialize_validator
2. Once ready to deposit stake (or have funds assigned by a staking service in exchange for ownership capability),
   call stake::add_stake (or \*\_with_cap versions if called from the staking service)
3. Call stake::join_validator_set (or \_with_cap version) to join the active validator set. Changes are effective in
   the next epoch.
4. Validate and gain rewards. The stake will automatically be locked up for a fixed duration (set by governance) and
   automatically renewed at expiration.
5. At any point, if the validator operator wants to update the consensus key or network/fullnode addresses, they can
   call stake::rotate_consensus_key and stake::update_network_and_fullnode_addresses. Similar to changes to stake, the
   changes to consensus key/network/fullnode addresses are only effective in the next epoch.
6. Validator can request to unlock their stake at any time. However, their stake will only become withdrawable when
   their current lockup expires. This can be at most as long as the fixed lockup duration.
7. After exiting, the validator can either explicitly leave the validator set by calling stake::leave_validator_set
   or if their stake drops below the min required, they would get removed at the end of the epoch.
8. Validator can always rejoin the validator set by going through steps 2&#45;3 again.
9. An owner can always switch operators by calling stake::set_operator.
10. An owner can always switch designated voter by calling stake::set_designated_voter.

- [Resource `OwnerCapability`](#0x1_stake_OwnerCapability)
- [Resource `StakePool`](#0x1_stake_StakePool)
- [Resource `ValidatorConfig`](#0x1_stake_ValidatorConfig)
- [Struct `ValidatorInfo`](#0x1_stake_ValidatorInfo)
- [Resource `ValidatorSet`](#0x1_stake_ValidatorSet)
- [Resource `AptosCoinCapabilities`](#0x1_stake_AptosCoinCapabilities)
- [Struct `IndividualValidatorPerformance`](#0x1_stake_IndividualValidatorPerformance)
- [Resource `ValidatorPerformance`](#0x1_stake_ValidatorPerformance)
- [Struct `RegisterValidatorCandidateEvent`](#0x1_stake_RegisterValidatorCandidateEvent)
- [Struct `RegisterValidatorCandidate`](#0x1_stake_RegisterValidatorCandidate)
- [Struct `SetOperatorEvent`](#0x1_stake_SetOperatorEvent)
- [Struct `SetOperator`](#0x1_stake_SetOperator)
- [Struct `AddStakeEvent`](#0x1_stake_AddStakeEvent)
- [Struct `AddStake`](#0x1_stake_AddStake)
- [Struct `ReactivateStakeEvent`](#0x1_stake_ReactivateStakeEvent)
- [Struct `ReactivateStake`](#0x1_stake_ReactivateStake)
- [Struct `RotateConsensusKeyEvent`](#0x1_stake_RotateConsensusKeyEvent)
- [Struct `RotateConsensusKey`](#0x1_stake_RotateConsensusKey)
- [Struct `UpdateNetworkAndFullnodeAddressesEvent`](#0x1_stake_UpdateNetworkAndFullnodeAddressesEvent)
- [Struct `UpdateNetworkAndFullnodeAddresses`](#0x1_stake_UpdateNetworkAndFullnodeAddresses)
- [Struct `IncreaseLockupEvent`](#0x1_stake_IncreaseLockupEvent)
- [Struct `IncreaseLockup`](#0x1_stake_IncreaseLockup)
- [Struct `JoinValidatorSetEvent`](#0x1_stake_JoinValidatorSetEvent)
- [Struct `JoinValidatorSet`](#0x1_stake_JoinValidatorSet)
- [Struct `DistributeRewardsEvent`](#0x1_stake_DistributeRewardsEvent)
- [Struct `DistributeRewards`](#0x1_stake_DistributeRewards)
- [Struct `UnlockStakeEvent`](#0x1_stake_UnlockStakeEvent)
- [Struct `UnlockStake`](#0x1_stake_UnlockStake)
- [Struct `WithdrawStakeEvent`](#0x1_stake_WithdrawStakeEvent)
- [Struct `WithdrawStake`](#0x1_stake_WithdrawStake)
- [Struct `LeaveValidatorSetEvent`](#0x1_stake_LeaveValidatorSetEvent)
- [Struct `LeaveValidatorSet`](#0x1_stake_LeaveValidatorSet)
- [Resource `ValidatorFees`](#0x1_stake_ValidatorFees)
- [Resource `AllowedValidators`](#0x1_stake_AllowedValidators)
- [Resource `Ghost$ghost_valid_perf`](#0x1_stake_Ghost$ghost_valid_perf)
- [Resource `Ghost$ghost_proposer_idx`](#0x1_stake_Ghost$ghost_proposer_idx)
- [Resource `Ghost$ghost_active_num`](#0x1_stake_Ghost$ghost_active_num)
- [Resource `Ghost$ghost_pending_inactive_num`](#0x1_stake_Ghost$ghost_pending_inactive_num)
- [Constants](#@Constants_0)
- [Function `initialize_validator_fees`](#0x1_stake_initialize_validator_fees)
- [Function `add_transaction_fee`](#0x1_stake_add_transaction_fee)
- [Function `get_lockup_secs`](#0x1_stake_get_lockup_secs)
- [Function `get_remaining_lockup_secs`](#0x1_stake_get_remaining_lockup_secs)
- [Function `get_stake`](#0x1_stake_get_stake)
- [Function `get_validator_state`](#0x1_stake_get_validator_state)
- [Function `get_current_epoch_voting_power`](#0x1_stake_get_current_epoch_voting_power)
- [Function `get_delegated_voter`](#0x1_stake_get_delegated_voter)
- [Function `get_operator`](#0x1_stake_get_operator)
- [Function `get_owned_pool_address`](#0x1_stake_get_owned_pool_address)
- [Function `get_validator_index`](#0x1_stake_get_validator_index)
- [Function `get_current_epoch_proposal_counts`](#0x1_stake_get_current_epoch_proposal_counts)
- [Function `get_validator_config`](#0x1_stake_get_validator_config)
- [Function `stake_pool_exists`](#0x1_stake_stake_pool_exists)
- [Function `initialize`](#0x1_stake_initialize)
- [Function `store_aptos_coin_mint_cap`](#0x1_stake_store_aptos_coin_mint_cap)
- [Function `remove_validators`](#0x1_stake_remove_validators)
- [Function `initialize_stake_owner`](#0x1_stake_initialize_stake_owner)
- [Function `initialize_validator`](#0x1_stake_initialize_validator)
- [Function `extract_owner_cap`](#0x1_stake_extract_owner_cap)
- [Function `deposit_owner_cap`](#0x1_stake_deposit_owner_cap)
- [Function `destroy_owner_cap`](#0x1_stake_destroy_owner_cap)
- [Function `set_operator`](#0x1_stake_set_operator)
- [Function `set_operator_with_cap`](#0x1_stake_set_operator_with_cap)
- [Function `set_delegated_voter`](#0x1_stake_set_delegated_voter)
- [Function `set_delegated_voter_with_cap`](#0x1_stake_set_delegated_voter_with_cap)
- [Function `add_stake`](#0x1_stake_add_stake)
- [Function `add_stake_with_cap`](#0x1_stake_add_stake_with_cap)
- [Function `reactivate_stake`](#0x1_stake_reactivate_stake)
- [Function `reactivate_stake_with_cap`](#0x1_stake_reactivate_stake_with_cap)
- [Function `rotate_consensus_key`](#0x1_stake_rotate_consensus_key)
- [Function `update_network_and_fullnode_addresses`](#0x1_stake_update_network_and_fullnode_addresses)
- [Function `increase_lockup`](#0x1_stake_increase_lockup)
- [Function `increase_lockup_with_cap`](#0x1_stake_increase_lockup_with_cap)
- [Function `join_validator_set`](#0x1_stake_join_validator_set)
- [Function `join_validator_set_internal`](#0x1_stake_join_validator_set_internal)
- [Function `unlock`](#0x1_stake_unlock)
- [Function `unlock_with_cap`](#0x1_stake_unlock_with_cap)
- [Function `withdraw`](#0x1_stake_withdraw)
- [Function `withdraw_with_cap`](#0x1_stake_withdraw_with_cap)
- [Function `leave_validator_set`](#0x1_stake_leave_validator_set)
- [Function `is_current_epoch_validator`](#0x1_stake_is_current_epoch_validator)
- [Function `update_performance_statistics`](#0x1_stake_update_performance_statistics)
- [Function `on_new_epoch`](#0x1_stake_on_new_epoch)
- [Function `cur_validator_consensus_infos`](#0x1_stake_cur_validator_consensus_infos)
- [Function `next_validator_consensus_infos`](#0x1_stake_next_validator_consensus_infos)
- [Function `configure_allowed_validators`](#0x1_stake_configure_allowed_validators)

```move
module 0x1::stake {
    use 0x1::account;
    use 0x1::aptos_coin;
    use 0x1::bls12381;
    use 0x1::chain_status;
    use 0x1::coin;
    use 0x1::error;
    use 0x1::event;
    use 0x1::features;
    use 0x1::fixed_point64;
    use 0x1::math64;
    use 0x1::option;
    use 0x1::reconfiguration_state;
    use 0x1::signer;
    use 0x1::staking_config;
    use 0x1::system_addresses;
    use 0x1::table;
    use 0x1::timestamp;
    use 0x1::validator_consensus_info;
    use 0x1::vector;
}
```

<a id="0x1_stake_OwnerCapability"></a>

## Resource `OwnerCapability`

Capability that represents ownership and can be used to control the validator and the associated stake pool.
Having this be separate from the signer for the account that the validator resources are hosted at allows
modules to have control over a validator.

```move
module 0x1::stake {
    struct OwnerCapability has store, key
}
```

<a id="0x1_stake_StakePool"></a>

## Resource `StakePool`

Each validator has a separate StakePool resource and can provide a stake.
Changes in stake for an active validator:

1. If a validator calls add_stake, the newly added stake is moved to pending_active.
2. If validator calls unlock, their stake is moved to pending_inactive.
3. When the next epoch starts, any pending_inactive stake is moved to inactive and can be withdrawn.
   Any pending_active stake is moved to active and adds to the validator&apos;s voting power.

Changes in stake for an inactive validator:

1. If a validator calls add_stake, the newly added stake is moved directly to active.
2. If validator calls unlock, their stake is moved directly to inactive.
3. When the next epoch starts, the validator can be activated if their active stake is more than the minimum.

```move
module 0x1::stake {
    struct StakePool has key
}
```

<a id="0x1_stake_ValidatorConfig"></a>

## Resource `ValidatorConfig`

Validator info stored in validator address.

```move
module 0x1::stake {
    struct ValidatorConfig has copy, drop, store, key
}
```

<a id="0x1_stake_ValidatorInfo"></a>

## Struct `ValidatorInfo`

Consensus information per validator, stored in ValidatorSet.

```move
module 0x1::stake {
    struct ValidatorInfo has copy, drop, store
}
```

<a id="0x1_stake_ValidatorSet"></a>

## Resource `ValidatorSet`

Full ValidatorSet, stored in @aptos_framework.

1. join_validator_set adds to pending_active queue.
2. leave_valdiator_set moves from active to pending_inactive queue.
3. on_new_epoch processes two pending queues and refresh ValidatorInfo from the owner&apos;s address.

```move
module 0x1::stake {
    struct ValidatorSet has copy, drop, store, key
}
```

<a id="0x1_stake_AptosCoinCapabilities"></a>

## Resource `AptosCoinCapabilities`

AptosCoin capabilities, set during genesis and stored in @CoreResource account.
This allows the Stake module to mint rewards to stakers.

```move
module 0x1::stake {
    struct AptosCoinCapabilities has key
}
```

<a id="0x1_stake_IndividualValidatorPerformance"></a>

## Struct `IndividualValidatorPerformance`

```move
module 0x1::stake {
    struct IndividualValidatorPerformance has drop, store
}
```

<a id="0x1_stake_ValidatorPerformance"></a>

## Resource `ValidatorPerformance`

```move
module 0x1::stake {
    struct ValidatorPerformance has key
}
```

<a id="0x1_stake_RegisterValidatorCandidateEvent"></a>

## Struct `RegisterValidatorCandidateEvent`

```move
module 0x1::stake {
    struct RegisterValidatorCandidateEvent has drop, store
}
```

<a id="0x1_stake_RegisterValidatorCandidate"></a>

## Struct `RegisterValidatorCandidate`

```move
module 0x1::stake {
    #[event]
    struct RegisterValidatorCandidate has drop, store
}
```

<a id="0x1_stake_SetOperatorEvent"></a>

## Struct `SetOperatorEvent`

```move
module 0x1::stake {
    struct SetOperatorEvent has drop, store
}
```

<a id="0x1_stake_SetOperator"></a>

## Struct `SetOperator`

```move
module 0x1::stake {
    #[event]
    struct SetOperator has drop, store
}
```

<a id="0x1_stake_AddStakeEvent"></a>

## Struct `AddStakeEvent`

```move
module 0x1::stake {
    struct AddStakeEvent has drop, store
}
```

<a id="0x1_stake_AddStake"></a>

## Struct `AddStake`

```move
module 0x1::stake {
    #[event]
    struct AddStake has drop, store
}
```

<a id="0x1_stake_ReactivateStakeEvent"></a>

## Struct `ReactivateStakeEvent`

```move
module 0x1::stake {
    struct ReactivateStakeEvent has drop, store
}
```

<a id="0x1_stake_ReactivateStake"></a>

## Struct `ReactivateStake`

```move
module 0x1::stake {
    #[event]
    struct ReactivateStake has drop, store
}
```

<a id="0x1_stake_RotateConsensusKeyEvent"></a>

## Struct `RotateConsensusKeyEvent`

```move
module 0x1::stake {
    struct RotateConsensusKeyEvent has drop, store
}
```

<a id="0x1_stake_RotateConsensusKey"></a>

## Struct `RotateConsensusKey`

```move
module 0x1::stake {
    #[event]
    struct RotateConsensusKey has drop, store
}
```

<a id="0x1_stake_UpdateNetworkAndFullnodeAddressesEvent"></a>

## Struct `UpdateNetworkAndFullnodeAddressesEvent`

```move
module 0x1::stake {
    struct UpdateNetworkAndFullnodeAddressesEvent has drop, store
}
```

<a id="0x1_stake_UpdateNetworkAndFullnodeAddresses"></a>

## Struct `UpdateNetworkAndFullnodeAddresses`

```move
module 0x1::stake {
    #[event]
    struct UpdateNetworkAndFullnodeAddresses has drop, store
}
```

<a id="0x1_stake_IncreaseLockupEvent"></a>

## Struct `IncreaseLockupEvent`

```move
module 0x1::stake {
    struct IncreaseLockupEvent has drop, store
}
```

<a id="0x1_stake_IncreaseLockup"></a>

## Struct `IncreaseLockup`

```move
module 0x1::stake {
    #[event]
    struct IncreaseLockup has drop, store
}
```

<a id="0x1_stake_JoinValidatorSetEvent"></a>

## Struct `JoinValidatorSetEvent`

```move
module 0x1::stake {
    struct JoinValidatorSetEvent has drop, store
}
```

<a id="0x1_stake_JoinValidatorSet"></a>

## Struct `JoinValidatorSet`

```move
module 0x1::stake {
    #[event]
    struct JoinValidatorSet has drop, store
}
```

<a id="0x1_stake_DistributeRewardsEvent"></a>

## Struct `DistributeRewardsEvent`

```move
module 0x1::stake {
    struct DistributeRewardsEvent has drop, store
}
```

<a id="0x1_stake_DistributeRewards"></a>

## Struct `DistributeRewards`

```move
module 0x1::stake {
    #[event]
    struct DistributeRewards has drop, store
}
```

<a id="0x1_stake_UnlockStakeEvent"></a>

## Struct `UnlockStakeEvent`

```move
module 0x1::stake {
    struct UnlockStakeEvent has drop, store
}
```

<a id="0x1_stake_UnlockStake"></a>

## Struct `UnlockStake`

```move
module 0x1::stake {
    #[event]
    struct UnlockStake has drop, store
}
```

<a id="0x1_stake_WithdrawStakeEvent"></a>

## Struct `WithdrawStakeEvent`

```move
module 0x1::stake {
    struct WithdrawStakeEvent has drop, store
}
```

<a id="0x1_stake_WithdrawStake"></a>

## Struct `WithdrawStake`

```move
module 0x1::stake {
    #[event]
    struct WithdrawStake has drop, store
}
```

<a id="0x1_stake_LeaveValidatorSetEvent"></a>

## Struct `LeaveValidatorSetEvent`

```move
module 0x1::stake {
    struct LeaveValidatorSetEvent has drop, store
}
```

<a id="0x1_stake_LeaveValidatorSet"></a>

## Struct `LeaveValidatorSet`

```move
module 0x1::stake {
    #[event]
    struct LeaveValidatorSet has drop, store
}
```

<a id="0x1_stake_ValidatorFees"></a>

## Resource `ValidatorFees`

Stores transaction fees assigned to validators. All fees are distributed to validators
at the end of the epoch.

```move
module 0x1::stake {
    struct ValidatorFees has key
}
```

<a id="0x1_stake_AllowedValidators"></a>

## Resource `AllowedValidators`

This provides an ACL for Testnet purposes. In testnet, everyone is a whale, a whale can be a validator.
This allows a testnet to bring additional entities into the validator set without compromising the
security of the testnet. This will NOT be enabled in Mainnet.

```move
module 0x1::stake {
    struct AllowedValidators has key
}
```

<a id="0x1_stake_Ghost$ghost_valid_perf"></a>

## Resource `Ghost$ghost_valid_perf`

```move
module 0x1::stake {
    struct Ghost$ghost_valid_perf has copy, drop, store, key
}
```

<a id="0x1_stake_Ghost$ghost_proposer_idx"></a>

## Resource `Ghost$ghost_proposer_idx`

```move
module 0x1::stake {
    struct Ghost$ghost_proposer_idx has copy, drop, store, key
}
```

<a id="0x1_stake_Ghost$ghost_active_num"></a>

## Resource `Ghost$ghost_active_num`

```move
module 0x1::stake {
    struct Ghost$ghost_active_num has copy, drop, store, key
}
```

<a id="0x1_stake_Ghost$ghost_pending_inactive_num"></a>

## Resource `Ghost$ghost_pending_inactive_num`

```move
module 0x1::stake {
    struct Ghost$ghost_pending_inactive_num has copy, drop, store, key
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_stake_MAX_U64"></a>

```move
module 0x1::stake {
    const MAX_U64: u128 = 18446744073709551615;
}
```

<a id="0x1_stake_EALREADY_REGISTERED"></a>

Account is already registered as a validator candidate.

```move
module 0x1::stake {
    const EALREADY_REGISTERED: u64 = 8;
}
```

<a id="0x1_stake_MAX_REWARDS_RATE"></a>

Limit the maximum value of `rewards_rate` in order to avoid any arithmetic overflow.

```move
module 0x1::stake {
    const MAX_REWARDS_RATE: u64 = 1000000;
}
```

<a id="0x1_stake_EALREADY_ACTIVE_VALIDATOR"></a>

Account is already a validator or pending validator.

```move
module 0x1::stake {
    const EALREADY_ACTIVE_VALIDATOR: u64 = 4;
}
```

<a id="0x1_stake_EFEES_TABLE_ALREADY_EXISTS"></a>

Table to store collected transaction fees for each validator already exists.

```move
module 0x1::stake {
    const EFEES_TABLE_ALREADY_EXISTS: u64 = 19;
}
```

<a id="0x1_stake_EINELIGIBLE_VALIDATOR"></a>

Validator is not defined in the ACL of entities allowed to be validators

```move
module 0x1::stake {
    const EINELIGIBLE_VALIDATOR: u64 = 17;
}
```

<a id="0x1_stake_EINVALID_LOCKUP"></a>

Cannot update stake pool&apos;s lockup to earlier than current lockup.

```move
module 0x1::stake {
    const EINVALID_LOCKUP: u64 = 18;
}
```

<a id="0x1_stake_EINVALID_PUBLIC_KEY"></a>

Invalid consensus public key

```move
module 0x1::stake {
    const EINVALID_PUBLIC_KEY: u64 = 11;
}
```

<a id="0x1_stake_ELAST_VALIDATOR"></a>

Can&apos;t remove last validator.

```move
module 0x1::stake {
    const ELAST_VALIDATOR: u64 = 6;
}
```

<a id="0x1_stake_ENOT_OPERATOR"></a>

Account does not have the right operator capability.

```move
module 0x1::stake {
    const ENOT_OPERATOR: u64 = 9;
}
```

<a id="0x1_stake_ENOT_VALIDATOR"></a>

Account is not a validator.

```move
module 0x1::stake {
    const ENOT_VALIDATOR: u64 = 5;
}
```

<a id="0x1_stake_ENO_POST_GENESIS_VALIDATOR_SET_CHANGE_ALLOWED"></a>

Validators cannot join or leave post genesis on this test network.

```move
module 0x1::stake {
    const ENO_POST_GENESIS_VALIDATOR_SET_CHANGE_ALLOWED: u64 = 10;
}
```

<a id="0x1_stake_EOWNER_CAP_ALREADY_EXISTS"></a>

An account cannot own more than one owner capability.

```move
module 0x1::stake {
    const EOWNER_CAP_ALREADY_EXISTS: u64 = 16;
}
```

<a id="0x1_stake_EOWNER_CAP_NOT_FOUND"></a>

Owner capability does not exist at the provided account.

```move
module 0x1::stake {
    const EOWNER_CAP_NOT_FOUND: u64 = 15;
}
```

<a id="0x1_stake_ERECONFIGURATION_IN_PROGRESS"></a>

Validator set change temporarily disabled because of in&#45;progress reconfiguration.

```move
module 0x1::stake {
    const ERECONFIGURATION_IN_PROGRESS: u64 = 20;
}
```

<a id="0x1_stake_ESTAKE_EXCEEDS_MAX"></a>

Total stake exceeds maximum allowed.

```move
module 0x1::stake {
    const ESTAKE_EXCEEDS_MAX: u64 = 7;
}
```

<a id="0x1_stake_ESTAKE_POOL_DOES_NOT_EXIST"></a>

Stake pool does not exist at the provided pool address.

```move
module 0x1::stake {
    const ESTAKE_POOL_DOES_NOT_EXIST: u64 = 14;
}
```

<a id="0x1_stake_ESTAKE_TOO_HIGH"></a>

Too much stake to join validator set.

```move
module 0x1::stake {
    const ESTAKE_TOO_HIGH: u64 = 3;
}
```

<a id="0x1_stake_ESTAKE_TOO_LOW"></a>

Not enough stake to join validator set.

```move
module 0x1::stake {
    const ESTAKE_TOO_LOW: u64 = 2;
}
```

<a id="0x1_stake_EVALIDATOR_CONFIG"></a>

Validator Config not published.

```move
module 0x1::stake {
    const EVALIDATOR_CONFIG: u64 = 1;
}
```

<a id="0x1_stake_EVALIDATOR_SET_TOO_LARGE"></a>

Validator set exceeds the limit

```move
module 0x1::stake {
    const EVALIDATOR_SET_TOO_LARGE: u64 = 12;
}
```

<a id="0x1_stake_EVOTING_POWER_INCREASE_EXCEEDS_LIMIT"></a>

Voting power increase has exceeded the limit for this current epoch.

```move
module 0x1::stake {
    const EVOTING_POWER_INCREASE_EXCEEDS_LIMIT: u64 = 13;
}
```

<a id="0x1_stake_MAX_VALIDATOR_SET_SIZE"></a>

Limit the maximum size to u16::max, it&apos;s the current limit of the bitvec
https://github.com/aptos&#45;labs/aptos&#45;core/blob/main/crates/aptos&#45;bitvec/src/lib.rs#L20

```move
module 0x1::stake {
    const MAX_VALIDATOR_SET_SIZE: u64 = 65536;
}
```

<a id="0x1_stake_VALIDATOR_STATUS_ACTIVE"></a>

```move
module 0x1::stake {
    const VALIDATOR_STATUS_ACTIVE: u64 = 2;
}
```

<a id="0x1_stake_VALIDATOR_STATUS_INACTIVE"></a>

```move
module 0x1::stake {
    const VALIDATOR_STATUS_INACTIVE: u64 = 4;
}
```

<a id="0x1_stake_VALIDATOR_STATUS_PENDING_ACTIVE"></a>

Validator status enum. We can switch to proper enum later once Move supports it.

```move
module 0x1::stake {
    const VALIDATOR_STATUS_PENDING_ACTIVE: u64 = 1;
}
```

<a id="0x1_stake_VALIDATOR_STATUS_PENDING_INACTIVE"></a>

```move
module 0x1::stake {
    const VALIDATOR_STATUS_PENDING_INACTIVE: u64 = 3;
}
```

<a id="0x1_stake_initialize_validator_fees"></a>

## Function `initialize_validator_fees`

Initializes the resource storing information about collected transaction fees per validator.
Used by `transaction_fee.move` to initialize fee collection and distribution.

```move
module 0x1::stake {
    public(friend) fun initialize_validator_fees(aptos_framework: &signer)
}
```

<a id="0x1_stake_add_transaction_fee"></a>

## Function `add_transaction_fee`

Stores the transaction fee collected to the specified validator address.

```move
module 0x1::stake {
    public(friend) fun add_transaction_fee(validator_addr: address, fee: coin::Coin<aptos_coin::AptosCoin>)
}
```

<a id="0x1_stake_get_lockup_secs"></a>

## Function `get_lockup_secs`

Return the lockup expiration of the stake pool at `pool_address`.
This will throw an error if there&apos;s no stake pool at `pool_address`.

```move
module 0x1::stake {
    #[view]
    public fun get_lockup_secs(pool_address: address): u64
}
```

<a id="0x1_stake_get_remaining_lockup_secs"></a>

## Function `get_remaining_lockup_secs`

Return the remaining lockup of the stake pool at `pool_address`.
This will throw an error if there&apos;s no stake pool at `pool_address`.

```move
module 0x1::stake {
    #[view]
    public fun get_remaining_lockup_secs(pool_address: address): u64
}
```

<a id="0x1_stake_get_stake"></a>

## Function `get_stake`

Return the different stake amounts for `pool_address` (whether the validator is active or not).
The returned amounts are for (active, inactive, pending_active, pending_inactive) stake respectively.

```move
module 0x1::stake {
    #[view]
    public fun get_stake(pool_address: address): (u64, u64, u64, u64)
}
```

<a id="0x1_stake_get_validator_state"></a>

## Function `get_validator_state`

Returns the validator&apos;s state.

```move
module 0x1::stake {
    #[view]
    public fun get_validator_state(pool_address: address): u64
}
```

<a id="0x1_stake_get_current_epoch_voting_power"></a>

## Function `get_current_epoch_voting_power`

Return the voting power of the validator in the current epoch.
This is the same as the validator&apos;s total active and pending_inactive stake.

```move
module 0x1::stake {
    #[view]
    public fun get_current_epoch_voting_power(pool_address: address): u64
}
```

<a id="0x1_stake_get_delegated_voter"></a>

## Function `get_delegated_voter`

Return the delegated voter of the validator at `pool_address`.

```move
module 0x1::stake {
    #[view]
    public fun get_delegated_voter(pool_address: address): address
}
```

<a id="0x1_stake_get_operator"></a>

## Function `get_operator`

Return the operator of the validator at `pool_address`.

```move
module 0x1::stake {
    #[view]
    public fun get_operator(pool_address: address): address
}
```

<a id="0x1_stake_get_owned_pool_address"></a>

## Function `get_owned_pool_address`

Return the pool address in `owner_cap`.

```move
module 0x1::stake {
    public fun get_owned_pool_address(owner_cap: &stake::OwnerCapability): address
}
```

<a id="0x1_stake_get_validator_index"></a>

## Function `get_validator_index`

Return the validator index for `pool_address`.

```move
module 0x1::stake {
    #[view]
    public fun get_validator_index(pool_address: address): u64
}
```

<a id="0x1_stake_get_current_epoch_proposal_counts"></a>

## Function `get_current_epoch_proposal_counts`

Return the number of successful and failed proposals for the proposal at the given validator index.

```move
module 0x1::stake {
    #[view]
    public fun get_current_epoch_proposal_counts(validator_index: u64): (u64, u64)
}
```

<a id="0x1_stake_get_validator_config"></a>

## Function `get_validator_config`

Return the validator&apos;s config.

```move
module 0x1::stake {
    #[view]
    public fun get_validator_config(pool_address: address): (vector<u8>, vector<u8>, vector<u8>)
}
```

<a id="0x1_stake_stake_pool_exists"></a>

## Function `stake_pool_exists`

```move
module 0x1::stake {
    #[view]
    public fun stake_pool_exists(addr: address): bool
}
```

<a id="0x1_stake_initialize"></a>

## Function `initialize`

Initialize validator set to the core resource account.

```move
module 0x1::stake {
    public(friend) fun initialize(aptos_framework: &signer)
}
```

<a id="0x1_stake_store_aptos_coin_mint_cap"></a>

## Function `store_aptos_coin_mint_cap`

This is only called during Genesis, which is where MintCapability&lt;AptosCoin&gt; can be created.
Beyond genesis, no one can create AptosCoin mint/burn capabilities.

```move
module 0x1::stake {
    public(friend) fun store_aptos_coin_mint_cap(aptos_framework: &signer, mint_cap: coin::MintCapability<aptos_coin::AptosCoin>)
}
```

<a id="0x1_stake_remove_validators"></a>

## Function `remove_validators`

Allow on chain governance to remove validators from the validator set.

```move
module 0x1::stake {
    public fun remove_validators(aptos_framework: &signer, validators: &vector<address>)
}
```

<a id="0x1_stake_initialize_stake_owner"></a>

## Function `initialize_stake_owner`

Initialize the validator account and give ownership to the signing account
except it leaves the ValidatorConfig to be set by another entity.
Note: this triggers setting the operator and owner, set it to the account&apos;s address
to set later.

```move
module 0x1::stake {
    public entry fun initialize_stake_owner(owner: &signer, initial_stake_amount: u64, operator: address, voter: address)
}
```

<a id="0x1_stake_initialize_validator"></a>

## Function `initialize_validator`

Initialize the validator account and give ownership to the signing account.

```move
module 0x1::stake {
    public entry fun initialize_validator(account: &signer, consensus_pubkey: vector<u8>, proof_of_possession: vector<u8>, network_addresses: vector<u8>, fullnode_addresses: vector<u8>)
}
```

<a id="0x1_stake_extract_owner_cap"></a>

## Function `extract_owner_cap`

Extract and return owner capability from the signing account.

```move
module 0x1::stake {
    public fun extract_owner_cap(owner: &signer): stake::OwnerCapability
}
```

<a id="0x1_stake_deposit_owner_cap"></a>

## Function `deposit_owner_cap`

Deposit `owner_cap` into `account`. This requires `account` to not already have ownership of another
staking pool.

```move
module 0x1::stake {
    public fun deposit_owner_cap(owner: &signer, owner_cap: stake::OwnerCapability)
}
```

<a id="0x1_stake_destroy_owner_cap"></a>

## Function `destroy_owner_cap`

Destroy `owner_cap`.

```move
module 0x1::stake {
    public fun destroy_owner_cap(owner_cap: stake::OwnerCapability)
}
```

<a id="0x1_stake_set_operator"></a>

## Function `set_operator`

Allows an owner to change the operator of the stake pool.

```move
module 0x1::stake {
    public entry fun set_operator(owner: &signer, new_operator: address)
}
```

<a id="0x1_stake_set_operator_with_cap"></a>

## Function `set_operator_with_cap`

Allows an account with ownership capability to change the operator of the stake pool.

```move
module 0x1::stake {
    public fun set_operator_with_cap(owner_cap: &stake::OwnerCapability, new_operator: address)
}
```

<a id="0x1_stake_set_delegated_voter"></a>

## Function `set_delegated_voter`

Allows an owner to change the delegated voter of the stake pool.

```move
module 0x1::stake {
    public entry fun set_delegated_voter(owner: &signer, new_voter: address)
}
```

<a id="0x1_stake_set_delegated_voter_with_cap"></a>

## Function `set_delegated_voter_with_cap`

Allows an owner to change the delegated voter of the stake pool.

```move
module 0x1::stake {
    public fun set_delegated_voter_with_cap(owner_cap: &stake::OwnerCapability, new_voter: address)
}
```

<a id="0x1_stake_add_stake"></a>

## Function `add_stake`

Add `amount` of coins from the `account` owning the StakePool.

```move
module 0x1::stake {
    public entry fun add_stake(owner: &signer, amount: u64)
}
```

<a id="0x1_stake_add_stake_with_cap"></a>

## Function `add_stake_with_cap`

Add `coins` into `pool_address`. this requires the corresponding `owner_cap` to be passed in.

```move
module 0x1::stake {
    public fun add_stake_with_cap(owner_cap: &stake::OwnerCapability, coins: coin::Coin<aptos_coin::AptosCoin>)
}
```

<a id="0x1_stake_reactivate_stake"></a>

## Function `reactivate_stake`

Move `amount` of coins from pending_inactive to active.

```move
module 0x1::stake {
    public entry fun reactivate_stake(owner: &signer, amount: u64)
}
```

<a id="0x1_stake_reactivate_stake_with_cap"></a>

## Function `reactivate_stake_with_cap`

```move
module 0x1::stake {
    public fun reactivate_stake_with_cap(owner_cap: &stake::OwnerCapability, amount: u64)
}
```

<a id="0x1_stake_rotate_consensus_key"></a>

## Function `rotate_consensus_key`

Rotate the consensus key of the validator, it&apos;ll take effect in next epoch.

```move
module 0x1::stake {
    public entry fun rotate_consensus_key(operator: &signer, pool_address: address, new_consensus_pubkey: vector<u8>, proof_of_possession: vector<u8>)
}
```

<a id="0x1_stake_update_network_and_fullnode_addresses"></a>

## Function `update_network_and_fullnode_addresses`

Update the network and full node addresses of the validator. This only takes effect in the next epoch.

```move
module 0x1::stake {
    public entry fun update_network_and_fullnode_addresses(operator: &signer, pool_address: address, new_network_addresses: vector<u8>, new_fullnode_addresses: vector<u8>)
}
```

<a id="0x1_stake_increase_lockup"></a>

## Function `increase_lockup`

Similar to increase_lockup_with_cap but will use ownership capability from the signing account.

```move
module 0x1::stake {
    public entry fun increase_lockup(owner: &signer)
}
```

<a id="0x1_stake_increase_lockup_with_cap"></a>

## Function `increase_lockup_with_cap`

Unlock from active delegation, it&apos;s moved to pending_inactive if locked_until_secs &lt; current_time or
directly inactive if it&apos;s not from an active validator.

```move
module 0x1::stake {
    public fun increase_lockup_with_cap(owner_cap: &stake::OwnerCapability)
}
```

<a id="0x1_stake_join_validator_set"></a>

## Function `join_validator_set`

This can only called by the operator of the validator/staking pool.

```move
module 0x1::stake {
    public entry fun join_validator_set(operator: &signer, pool_address: address)
}
```

<a id="0x1_stake_join_validator_set_internal"></a>

## Function `join_validator_set_internal`

Request to have `pool_address` join the validator set. Can only be called after calling `initialize_validator`.
If the validator has the required stake (more than minimum and less than maximum allowed), they will be
added to the pending_active queue. All validators in this queue will be added to the active set when the next
epoch starts (eligibility will be rechecked).

This internal version can only be called by the Genesis module during Genesis.

```move
module 0x1::stake {
    public(friend) fun join_validator_set_internal(operator: &signer, pool_address: address)
}
```

<a id="0x1_stake_unlock"></a>

## Function `unlock`

Similar to unlock_with_cap but will use ownership capability from the signing account.

```move
module 0x1::stake {
    public entry fun unlock(owner: &signer, amount: u64)
}
```

<a id="0x1_stake_unlock_with_cap"></a>

## Function `unlock_with_cap`

Unlock `amount` from the active stake. Only possible if the lockup has expired.

```move
module 0x1::stake {
    public fun unlock_with_cap(amount: u64, owner_cap: &stake::OwnerCapability)
}
```

<a id="0x1_stake_withdraw"></a>

## Function `withdraw`

Withdraw from `account`&apos;s inactive stake.

```move
module 0x1::stake {
    public entry fun withdraw(owner: &signer, withdraw_amount: u64)
}
```

<a id="0x1_stake_withdraw_with_cap"></a>

## Function `withdraw_with_cap`

Withdraw from `pool_address`&apos;s inactive stake with the corresponding `owner_cap`.

```move
module 0x1::stake {
    public fun withdraw_with_cap(owner_cap: &stake::OwnerCapability, withdraw_amount: u64): coin::Coin<aptos_coin::AptosCoin>
}
```

<a id="0x1_stake_leave_validator_set"></a>

## Function `leave_validator_set`

Request to have `pool_address` leave the validator set. The validator is only actually removed from the set when
the next epoch starts.
The last validator in the set cannot leave. This is an edge case that should never happen as long as the network
is still operational.

Can only be called by the operator of the validator/staking pool.

```move
module 0x1::stake {
    public entry fun leave_validator_set(operator: &signer, pool_address: address)
}
```

<a id="0x1_stake_is_current_epoch_validator"></a>

## Function `is_current_epoch_validator`

Returns true if the current validator can still vote in the current epoch.
This includes validators that requested to leave but are still in the pending_inactive queue and will be removed
when the epoch starts.

```move
module 0x1::stake {
    public fun is_current_epoch_validator(pool_address: address): bool
}
```

<a id="0x1_stake_update_performance_statistics"></a>

## Function `update_performance_statistics`

Update the validator performance (proposal statistics). This is only called by block::prologue().
This function cannot abort.

```move
module 0x1::stake {
    public(friend) fun update_performance_statistics(proposer_index: option::Option<u64>, failed_proposer_indices: vector<u64>)
}
```

<a id="0x1_stake_on_new_epoch"></a>

## Function `on_new_epoch`

Triggered during a reconfiguration. This function shouldn&apos;t abort.

1. Distribute transaction fees and rewards to stake pools of active and pending inactive validators (requested
   to leave but not yet removed).
2. Officially move pending active stake to active and move pending inactive stake to inactive.
   The staking pool&apos;s voting power in this new epoch will be updated to the total active stake.
3. Add pending active validators to the active set if they satisfy requirements so they can vote and remove
   pending inactive validators so they no longer can vote.
4. The validator&apos;s voting power in the validator set is updated to be the corresponding staking pool&apos;s voting
   power.

```move
module 0x1::stake {
    public(friend) fun on_new_epoch()
}
```

<a id="0x1_stake_cur_validator_consensus_infos"></a>

## Function `cur_validator_consensus_infos`

Return the `ValidatorConsensusInfo` of each current validator, sorted by current validator index.

```move
module 0x1::stake {
    public fun cur_validator_consensus_infos(): vector<validator_consensus_info::ValidatorConsensusInfo>
}
```

<a id="0x1_stake_next_validator_consensus_infos"></a>

## Function `next_validator_consensus_infos`

```move
module 0x1::stake {
    public fun next_validator_consensus_infos(): vector<validator_consensus_info::ValidatorConsensusInfo>
}
```

<a id="0x1_stake_configure_allowed_validators"></a>

## Function `configure_allowed_validators`

```move
module 0x1::stake {
    public fun configure_allowed_validators(aptos_framework: &signer, accounts: vector<address>)
}
```
