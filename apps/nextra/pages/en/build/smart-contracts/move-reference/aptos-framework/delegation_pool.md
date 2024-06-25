<a id="0x1_delegation_pool"></a>

# Module `0x1::delegation_pool`

Allow multiple delegators to participate in the same stake pool in order to collect the minimum
stake required to join the validator set. Delegators are rewarded out of the validator rewards
proportionally to their stake and provided the same stake&#45;management API as the stake pool owner.

The main accounting logic in the delegation pool contract handles the following:

1. Tracks how much stake each delegator owns, privately deposited as well as earned.
   Accounting individual delegator stakes is achieved through the shares&#45;based pool defined at
   <code>aptos_std::pool_u64</code>, hence delegators own shares rather than absolute stakes into the delegation pool.
2. Tracks rewards earned by the stake pool, implicitly by the delegation one, in the meantime
   and distribute them accordingly.
3. Tracks lockup cycles on the stake pool in order to separate inactive stake (not earning rewards)
   from pending_inactive stake (earning rewards) and allow its delegators to withdraw the former.
4. Tracks how much commission fee has to be paid to the operator out of incoming rewards before
   distributing them to the internal pool_u64 pools.

In order to distinguish between stakes in different states and route rewards accordingly,
separate pool_u64 pools are used for individual stake states:

1. one of <code>active</code> &#43; <code>pending_active</code> stake
2. one of <code>inactive</code> stake FOR each past observed lockup cycle (OLC) on the stake pool
3. one of <code>pending_inactive</code> stake scheduled during this ongoing OLC

As stake&#45;state transitions and rewards are computed only at the stake pool level, the delegation pool
gets outdated. To mitigate this, at any interaction with the delegation pool, a process of synchronization
to the underlying stake pool is executed before the requested operation itself.

At synchronization:
&#45; stake deviations between the two pools are actually the rewards produced in the meantime.
&#45; the commission fee is extracted from the rewards, the remaining stake is distributed to the internal
pool_u64 pools and then the commission stake used to buy shares for operator.
&#45; if detecting that the lockup expired on the stake pool, the delegation pool will isolate its
pending_inactive stake (now inactive) and create a new pool_u64 to host future pending_inactive stake
scheduled this newly started lockup.
Detecting a lockup expiration on the stake pool resumes to detecting new inactive stake.

Accounting main invariants:
&#45; each stake&#45;management operation (add/unlock/reactivate/withdraw) and operator change triggers
the synchronization process before executing its own function.
&#45; each OLC maps to one or more real lockups on the stake pool, but not the opposite. Actually, only a real
lockup with &apos;activity&apos; (which inactivated some unlocking stake) triggers the creation of a new OLC.
&#45; unlocking and/or unlocked stake originating from different real lockups are never mixed together into
the same pool_u64. This invalidates the accounting of which rewards belong to whom.
&#45; no delegator can have unlocking and/or unlocked stake (pending withdrawals) in different OLCs. This ensures
delegators do not have to keep track of the OLCs when they unlocked. When creating a new pending withdrawal,
the existing one is executed (withdrawn) if is already inactive.
&#45; <code>add_stake</code> fees are always refunded, but only after the epoch when they have been charged ends.
&#45; withdrawing pending_inactive stake (when validator had gone inactive before its lockup expired)
does not inactivate any stake additional to the requested one to ensure OLC would not advance indefinitely.
&#45; the pending withdrawal exists at an OLC iff delegator owns some shares within the shares pool of that OLC.

Example flow:

<ol>
<li>A node operator creates a delegation pool by calling
<code>initialize_delegation_pool</code> and sets
its commission fee to 0% (for simplicity). A stake pool is created with no initial stake and owned by
a resource account controlled by the delegation pool.</li>
<li>Delegator A adds 100 stake which is converted to 100 shares into the active pool_u64</li>
<li>Operator joins the validator set as the stake pool has now the minimum stake</li>
<li>The stake pool earned rewards and now has 200 active stake. A&apos;s active shares are worth 200 coins as
the commission fee is 0%.</li>
<li></li>
<ol>
<li>A requests <code>unlock</code> for 100 stake</li>
<li>Synchronization detects 200 &#45; 100 active rewards which are entirely (0% commission) added to the active pool.</li>
<li>100 coins &#61; (100 &#42; 100) / 200 &#61; 50 shares are redeemed from the active pool and exchanged for 100 shares
into the pending_inactive one on A&apos;s behalf</li>
</ol>
<li>Delegator B adds 200 stake which is converted to (200 &#42; 50) / 100 &#61; 100 shares into the active pool</li>
<li>The stake pool earned rewards and now has 600 active and 200 pending_inactive stake.</li>
<li></li>
<ol>
<li>A requests <code>reactivate_stake</code> for 100 stake</li>
<li>
Synchronization detects 600 &#45; 300 active and 200 &#45; 100 pending_inactive rewards which are both entirely
distributed to their corresponding pools
</li>
<li>
100 coins &#61; (100 &#42; 100) / 200 &#61; 50 shares are redeemed from the pending_inactive pool and exchanged for
(100 &#42; 150) / 600 &#61; 25 shares into the active one on A&apos;s behalf
</li>
</ol>
<li>The lockup expires on the stake pool, inactivating the entire pending_inactive stake</li>
<li></li>
<ol>
<li>B requests <code>unlock</code> for 100 stake</li>
<li>
Synchronization detects no active or pending_inactive rewards, but 0 &#45;&gt; 100 inactive stake on the stake pool,
so it advances the observed lockup cycle and creates a pool_u64 for the new lockup, hence allowing previous
pending_inactive shares to be redeemed</li>
<li>
100 coins &#61; (100 &#42; 175) / 700 &#61; 25 shares are redeemed from the active pool and exchanged for 100 shares
into the new pending_inactive one on B&apos;s behalf
</li>
</ol>
<li>The stake pool earned rewards and now has some pending_inactive rewards.</li>
<li></li>
<ol>
<li>A requests <code>withdraw</code> for its entire inactive stake</li>
<li>
Synchronization detects no new inactive stake, but some pending_inactive rewards which are distributed
to the (2nd) pending_inactive pool
</li>
<li>
A&apos;s 50 shares &#61; (50 &#42; 100) / 50 &#61; 100 coins are redeemed from the (1st) inactive pool and 100 stake is
transferred to A
</li>
</ol>
</ol>

- [Resource `DelegationPoolOwnership`](#0x1_delegation_pool_DelegationPoolOwnership)
- [Struct `ObservedLockupCycle`](#0x1_delegation_pool_ObservedLockupCycle)
- [Resource `DelegationPool`](#0x1_delegation_pool_DelegationPool)
- [Struct `VotingRecordKey`](#0x1_delegation_pool_VotingRecordKey)
- [Struct `VoteDelegation`](#0x1_delegation_pool_VoteDelegation)
- [Struct `DelegatedVotes`](#0x1_delegation_pool_DelegatedVotes)
- [Resource `GovernanceRecords`](#0x1_delegation_pool_GovernanceRecords)
- [Resource `BeneficiaryForOperator`](#0x1_delegation_pool_BeneficiaryForOperator)
- [Resource `NextCommissionPercentage`](#0x1_delegation_pool_NextCommissionPercentage)
- [Resource `DelegationPoolAllowlisting`](#0x1_delegation_pool_DelegationPoolAllowlisting)
- [Struct `AddStake`](#0x1_delegation_pool_AddStake)
- [Struct `AddStakeEvent`](#0x1_delegation_pool_AddStakeEvent)
- [Struct `ReactivateStake`](#0x1_delegation_pool_ReactivateStake)
- [Struct `ReactivateStakeEvent`](#0x1_delegation_pool_ReactivateStakeEvent)
- [Struct `UnlockStake`](#0x1_delegation_pool_UnlockStake)
- [Struct `UnlockStakeEvent`](#0x1_delegation_pool_UnlockStakeEvent)
- [Struct `WithdrawStake`](#0x1_delegation_pool_WithdrawStake)
- [Struct `WithdrawStakeEvent`](#0x1_delegation_pool_WithdrawStakeEvent)
- [Struct `DistributeCommissionEvent`](#0x1_delegation_pool_DistributeCommissionEvent)
- [Struct `DistributeCommission`](#0x1_delegation_pool_DistributeCommission)
- [Struct `Vote`](#0x1_delegation_pool_Vote)
- [Struct `VoteEvent`](#0x1_delegation_pool_VoteEvent)
- [Struct `CreateProposal`](#0x1_delegation_pool_CreateProposal)
- [Struct `CreateProposalEvent`](#0x1_delegation_pool_CreateProposalEvent)
- [Struct `DelegateVotingPower`](#0x1_delegation_pool_DelegateVotingPower)
- [Struct `DelegateVotingPowerEvent`](#0x1_delegation_pool_DelegateVotingPowerEvent)
- [Struct `SetBeneficiaryForOperator`](#0x1_delegation_pool_SetBeneficiaryForOperator)
- [Struct `CommissionPercentageChange`](#0x1_delegation_pool_CommissionPercentageChange)
- [Struct `EnableDelegatorsAllowlisting`](#0x1_delegation_pool_EnableDelegatorsAllowlisting)
- [Struct `DisableDelegatorsAllowlisting`](#0x1_delegation_pool_DisableDelegatorsAllowlisting)
- [Struct `AllowlistDelegator`](#0x1_delegation_pool_AllowlistDelegator)
- [Struct `RemoveDelegatorFromAllowlist`](#0x1_delegation_pool_RemoveDelegatorFromAllowlist)
- [Struct `EvictDelegator`](#0x1_delegation_pool_EvictDelegator)
- [Constants](#@Constants_0)
- [Function `owner_cap_exists`](#0x1_delegation_pool_owner_cap_exists)
- [Function `get_owned_pool_address`](#0x1_delegation_pool_get_owned_pool_address)
- [Function `delegation_pool_exists`](#0x1_delegation_pool_delegation_pool_exists)
- [Function `partial_governance_voting_enabled`](#0x1_delegation_pool_partial_governance_voting_enabled)
- [Function `observed_lockup_cycle`](#0x1_delegation_pool_observed_lockup_cycle)
- [Function `is_next_commission_percentage_effective`](#0x1_delegation_pool_is_next_commission_percentage_effective)
- [Function `operator_commission_percentage`](#0x1_delegation_pool_operator_commission_percentage)
- [Function `operator_commission_percentage_next_lockup_cycle`](#0x1_delegation_pool_operator_commission_percentage_next_lockup_cycle)
- [Function `shareholders_count_active_pool`](#0x1_delegation_pool_shareholders_count_active_pool)
- [Function `get_delegation_pool_stake`](#0x1_delegation_pool_get_delegation_pool_stake)
- [Function `get_pending_withdrawal`](#0x1_delegation_pool_get_pending_withdrawal)
- [Function `get_stake`](#0x1_delegation_pool_get_stake)
- [Function `get_add_stake_fee`](#0x1_delegation_pool_get_add_stake_fee)
- [Function `can_withdraw_pending_inactive`](#0x1_delegation_pool_can_withdraw_pending_inactive)
- [Function `calculate_and_update_voter_total_voting_power`](#0x1_delegation_pool_calculate_and_update_voter_total_voting_power)
- [Function `calculate_and_update_remaining_voting_power`](#0x1_delegation_pool_calculate_and_update_remaining_voting_power)
- [Function `calculate_and_update_delegator_voter`](#0x1_delegation_pool_calculate_and_update_delegator_voter)
- [Function `calculate_and_update_voting_delegation`](#0x1_delegation_pool_calculate_and_update_voting_delegation)
- [Function `get_expected_stake_pool_address`](#0x1_delegation_pool_get_expected_stake_pool_address)
- [Function `min_remaining_secs_for_commission_change`](#0x1_delegation_pool_min_remaining_secs_for_commission_change)
- [Function `allowlisting_enabled`](#0x1_delegation_pool_allowlisting_enabled)
- [Function `delegator_allowlisted`](#0x1_delegation_pool_delegator_allowlisted)
- [Function `get_delegators_allowlist`](#0x1_delegation_pool_get_delegators_allowlist)
- [Function `initialize_delegation_pool`](#0x1_delegation_pool_initialize_delegation_pool)
- [Function `beneficiary_for_operator`](#0x1_delegation_pool_beneficiary_for_operator)
- [Function `enable_partial_governance_voting`](#0x1_delegation_pool_enable_partial_governance_voting)
- [Function `vote`](#0x1_delegation_pool_vote)
- [Function `create_proposal`](#0x1_delegation_pool_create_proposal)
- [Function `set_operator`](#0x1_delegation_pool_set_operator)
- [Function `set_beneficiary_for_operator`](#0x1_delegation_pool_set_beneficiary_for_operator)
- [Function `update_commission_percentage`](#0x1_delegation_pool_update_commission_percentage)
- [Function `set_delegated_voter`](#0x1_delegation_pool_set_delegated_voter)
- [Function `delegate_voting_power`](#0x1_delegation_pool_delegate_voting_power)
- [Function `enable_delegators_allowlisting`](#0x1_delegation_pool_enable_delegators_allowlisting)
- [Function `disable_delegators_allowlisting`](#0x1_delegation_pool_disable_delegators_allowlisting)
- [Function `allowlist_delegator`](#0x1_delegation_pool_allowlist_delegator)
- [Function `remove_delegator_from_allowlist`](#0x1_delegation_pool_remove_delegator_from_allowlist)
- [Function `evict_delegator`](#0x1_delegation_pool_evict_delegator)
- [Function `add_stake`](#0x1_delegation_pool_add_stake)
- [Function `unlock`](#0x1_delegation_pool_unlock)
- [Function `reactivate_stake`](#0x1_delegation_pool_reactivate_stake)
- [Function `withdraw`](#0x1_delegation_pool_withdraw)
- [Function `synchronize_delegation_pool`](#0x1_delegation_pool_synchronize_delegation_pool)
- [Function `multiply_then_divide`](#0x1_delegation_pool_multiply_then_divide)

```move
module 0x1::delegation_pool {
    use 0x1::account;
    use 0x1::aptos_account;
    use 0x1::aptos_coin;
    use 0x1::aptos_governance;
    use 0x1::coin;
    use 0x1::error;
    use 0x1::event;
    use 0x1::features;
    use 0x1::pool_u64_unbound;
    use 0x1::signer;
    use 0x1::smart_table;
    use 0x1::stake;
    use 0x1::staking_config;
    use 0x1::table;
    use 0x1::table_with_length;
    use 0x1::timestamp;
    use 0x1::vector;
}
```

<a id="0x1_delegation_pool_DelegationPoolOwnership"></a>

## Resource `DelegationPoolOwnership`

Capability that represents ownership over privileged operations on the underlying stake pool.

```move
module 0x1::delegation_pool {
    struct DelegationPoolOwnership has store, key
}
```

<a id="0x1_delegation_pool_ObservedLockupCycle"></a>

## Struct `ObservedLockupCycle`

```move
module 0x1::delegation_pool {
    struct ObservedLockupCycle has copy, drop, store
}
```

<a id="0x1_delegation_pool_DelegationPool"></a>

## Resource `DelegationPool`

```move
module 0x1::delegation_pool {
    struct DelegationPool has key
}
```

<a id="0x1_delegation_pool_VotingRecordKey"></a>

## Struct `VotingRecordKey`

```move
module 0x1::delegation_pool {
    struct VotingRecordKey has copy, drop, store
}
```

<a id="0x1_delegation_pool_VoteDelegation"></a>

## Struct `VoteDelegation`

Track delegated voter of each delegator.

```move
module 0x1::delegation_pool {
    struct VoteDelegation has copy, drop, store
}
```

<a id="0x1_delegation_pool_DelegatedVotes"></a>

## Struct `DelegatedVotes`

Track total voting power of each voter.

```move
module 0x1::delegation_pool {
    struct DelegatedVotes has copy, drop, store
}
```

<a id="0x1_delegation_pool_GovernanceRecords"></a>

## Resource `GovernanceRecords`

Track governance information of a delegation(e.g. voter delegation/voting power calculation).
This struct should be stored in the delegation pool resource account.

```move
module 0x1::delegation_pool {
    struct GovernanceRecords has key
}
```

<a id="0x1_delegation_pool_BeneficiaryForOperator"></a>

## Resource `BeneficiaryForOperator`

```move
module 0x1::delegation_pool {
    struct BeneficiaryForOperator has key
}
```

<a id="0x1_delegation_pool_NextCommissionPercentage"></a>

## Resource `NextCommissionPercentage`

```move
module 0x1::delegation_pool {
    struct NextCommissionPercentage has key
}
```

<a id="0x1_delegation_pool_DelegationPoolAllowlisting"></a>

## Resource `DelegationPoolAllowlisting`

Tracks a delegation pool&apos;s allowlist of delegators.
If allowlisting is enabled, existing delegators are not implicitly allowlisted and they can be individually
evicted later by the pool owner.

```move
module 0x1::delegation_pool {
    struct DelegationPoolAllowlisting has key
}
```

<a id="0x1_delegation_pool_AddStake"></a>

## Struct `AddStake`

```move
module 0x1::delegation_pool {
    #[event]
    struct AddStake has drop, store
}
```

<a id="0x1_delegation_pool_AddStakeEvent"></a>

## Struct `AddStakeEvent`

```move
module 0x1::delegation_pool {
    struct AddStakeEvent has drop, store
}
```

<a id="0x1_delegation_pool_ReactivateStake"></a>

## Struct `ReactivateStake`

```move
module 0x1::delegation_pool {
    #[event]
    struct ReactivateStake has drop, store
}
```

<a id="0x1_delegation_pool_ReactivateStakeEvent"></a>

## Struct `ReactivateStakeEvent`

```move
module 0x1::delegation_pool {
    struct ReactivateStakeEvent has drop, store
}
```

<a id="0x1_delegation_pool_UnlockStake"></a>

## Struct `UnlockStake`

```move
module 0x1::delegation_pool {
    #[event]
    struct UnlockStake has drop, store
}
```

<a id="0x1_delegation_pool_UnlockStakeEvent"></a>

## Struct `UnlockStakeEvent`

```move
module 0x1::delegation_pool {
    struct UnlockStakeEvent has drop, store
}
```

<a id="0x1_delegation_pool_WithdrawStake"></a>

## Struct `WithdrawStake`

```move
module 0x1::delegation_pool {
    #[event]
    struct WithdrawStake has drop, store
}
```

<a id="0x1_delegation_pool_WithdrawStakeEvent"></a>

## Struct `WithdrawStakeEvent`

```move
module 0x1::delegation_pool {
    struct WithdrawStakeEvent has drop, store
}
```

<a id="0x1_delegation_pool_DistributeCommissionEvent"></a>

## Struct `DistributeCommissionEvent`

```move
module 0x1::delegation_pool {
    #[event]
    struct DistributeCommissionEvent has drop, store
}
```

<a id="0x1_delegation_pool_DistributeCommission"></a>

## Struct `DistributeCommission`

```move
module 0x1::delegation_pool {
    #[event]
    struct DistributeCommission has drop, store
}
```

<a id="0x1_delegation_pool_Vote"></a>

## Struct `Vote`

```move
module 0x1::delegation_pool {
    #[event]
    struct Vote has drop, store
}
```

<a id="0x1_delegation_pool_VoteEvent"></a>

## Struct `VoteEvent`

```move
module 0x1::delegation_pool {
    struct VoteEvent has drop, store
}
```

<a id="0x1_delegation_pool_CreateProposal"></a>

## Struct `CreateProposal`

```move
module 0x1::delegation_pool {
    #[event]
    struct CreateProposal has drop, store
}
```

<a id="0x1_delegation_pool_CreateProposalEvent"></a>

## Struct `CreateProposalEvent`

```move
module 0x1::delegation_pool {
    struct CreateProposalEvent has drop, store
}
```

<a id="0x1_delegation_pool_DelegateVotingPower"></a>

## Struct `DelegateVotingPower`

```move
module 0x1::delegation_pool {
    #[event]
    struct DelegateVotingPower has drop, store
}
```

<a id="0x1_delegation_pool_DelegateVotingPowerEvent"></a>

## Struct `DelegateVotingPowerEvent`

```move
module 0x1::delegation_pool {
    struct DelegateVotingPowerEvent has drop, store
}
```

<a id="0x1_delegation_pool_SetBeneficiaryForOperator"></a>

## Struct `SetBeneficiaryForOperator`

```move
module 0x1::delegation_pool {
    #[event]
    struct SetBeneficiaryForOperator has drop, store
}
```

<a id="0x1_delegation_pool_CommissionPercentageChange"></a>

## Struct `CommissionPercentageChange`

```move
module 0x1::delegation_pool {
    #[event]
    struct CommissionPercentageChange has drop, store
}
```

<a id="0x1_delegation_pool_EnableDelegatorsAllowlisting"></a>

## Struct `EnableDelegatorsAllowlisting`

```move
module 0x1::delegation_pool {
    #[event]
    struct EnableDelegatorsAllowlisting has drop, store
}
```

<a id="0x1_delegation_pool_DisableDelegatorsAllowlisting"></a>

## Struct `DisableDelegatorsAllowlisting`

```move
module 0x1::delegation_pool {
    #[event]
    struct DisableDelegatorsAllowlisting has drop, store
}
```

<a id="0x1_delegation_pool_AllowlistDelegator"></a>

## Struct `AllowlistDelegator`

```move
module 0x1::delegation_pool {
    #[event]
    struct AllowlistDelegator has drop, store
}
```

<a id="0x1_delegation_pool_RemoveDelegatorFromAllowlist"></a>

## Struct `RemoveDelegatorFromAllowlist`

```move
module 0x1::delegation_pool {
    #[event]
    struct RemoveDelegatorFromAllowlist has drop, store
}
```

<a id="0x1_delegation_pool_EvictDelegator"></a>

## Struct `EvictDelegator`

```move
module 0x1::delegation_pool {
    #[event]
    struct EvictDelegator has drop, store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_delegation_pool_MAX_U64"></a>

```move
module 0x1::delegation_pool {
    const MAX_U64: u64 = 18446744073709551615;
}
```

<a id="0x1_delegation_pool_EDEPRECATED_FUNCTION"></a>

Function is deprecated.

```move
module 0x1::delegation_pool {
    const EDEPRECATED_FUNCTION: u64 = 12;
}
```

<a id="0x1_delegation_pool_EDISABLED_FUNCTION"></a>

The function is disabled or hasn&apos;t been enabled.

```move
module 0x1::delegation_pool {
    const EDISABLED_FUNCTION: u64 = 13;
}
```

<a id="0x1_delegation_pool_ENOT_OPERATOR"></a>

The account is not the operator of the stake pool.

```move
module 0x1::delegation_pool {
    const ENOT_OPERATOR: u64 = 18;
}
```

<a id="0x1_delegation_pool_EOWNER_CAP_ALREADY_EXISTS"></a>

Account is already owning a delegation pool.

```move
module 0x1::delegation_pool {
    const EOWNER_CAP_ALREADY_EXISTS: u64 = 2;
}
```

<a id="0x1_delegation_pool_EOWNER_CAP_NOT_FOUND"></a>

Delegation pool owner capability does not exist at the provided account.

```move
module 0x1::delegation_pool {
    const EOWNER_CAP_NOT_FOUND: u64 = 1;
}
```

<a id="0x1_delegation_pool_VALIDATOR_STATUS_INACTIVE"></a>

```move
module 0x1::delegation_pool {
    const VALIDATOR_STATUS_INACTIVE: u64 = 4;
}
```

<a id="0x1_delegation_pool_EINSUFFICIENT_PROPOSER_STAKE"></a>

The voter does not have sufficient stake to create a proposal.

```move
module 0x1::delegation_pool {
    const EINSUFFICIENT_PROPOSER_STAKE: u64 = 15;
}
```

<a id="0x1_delegation_pool_ENO_VOTING_POWER"></a>

The voter does not have any voting power on this proposal.

```move
module 0x1::delegation_pool {
    const ENO_VOTING_POWER: u64 = 16;
}
```

<a id="0x1_delegation_pool_EALREADY_VOTED_BEFORE_ENABLE_PARTIAL_VOTING"></a>

The stake pool has already voted on the proposal before enabling partial governance voting on this delegation pool.

```move
module 0x1::delegation_pool {
    const EALREADY_VOTED_BEFORE_ENABLE_PARTIAL_VOTING: u64 = 17;
}
```

<a id="0x1_delegation_pool_ECANNOT_EVICT_ALLOWLISTED_DELEGATOR"></a>

Cannot evict an allowlisted delegator, should remove them from the allowlist first.

```move
module 0x1::delegation_pool {
    const ECANNOT_EVICT_ALLOWLISTED_DELEGATOR: u64 = 26;
}
```

<a id="0x1_delegation_pool_ECANNOT_UNLOCK_NULL_SHAREHOLDER"></a>

Cannot unlock the accumulated active stake of NULL_SHAREHOLDER(0x0).

```move
module 0x1::delegation_pool {
    const ECANNOT_UNLOCK_NULL_SHAREHOLDER: u64 = 27;
}
```

<a id="0x1_delegation_pool_ECOMMISSION_RATE_CHANGE_NOT_SUPPORTED"></a>

Changing operator commission rate in delegation pool is not supported.

```move
module 0x1::delegation_pool {
    const ECOMMISSION_RATE_CHANGE_NOT_SUPPORTED: u64 = 22;
}
```

<a id="0x1_delegation_pool_EDELEGATION_POOLS_DISABLED"></a>

Creating delegation pools is not enabled yet.

```move
module 0x1::delegation_pool {
    const EDELEGATION_POOLS_DISABLED: u64 = 10;
}
```

<a id="0x1_delegation_pool_EDELEGATION_POOL_DOES_NOT_EXIST"></a>

Delegation pool does not exist at the provided pool address.

```move
module 0x1::delegation_pool {
    const EDELEGATION_POOL_DOES_NOT_EXIST: u64 = 3;
}
```

<a id="0x1_delegation_pool_EDELEGATORS_ALLOWLISTING_NOT_ENABLED"></a>

Delegators allowlisting should be enabled to perform this operation.

```move
module 0x1::delegation_pool {
    const EDELEGATORS_ALLOWLISTING_NOT_ENABLED: u64 = 24;
}
```

<a id="0x1_delegation_pool_EDELEGATORS_ALLOWLISTING_NOT_SUPPORTED"></a>

Delegators allowlisting is not supported.

```move
module 0x1::delegation_pool {
    const EDELEGATORS_ALLOWLISTING_NOT_SUPPORTED: u64 = 23;
}
```

<a id="0x1_delegation_pool_EDELEGATOR_ACTIVE_BALANCE_TOO_LOW"></a>

Delegator&apos;s active balance cannot be less than `MIN_COINS_ON_SHARES_POOL`.

```move
module 0x1::delegation_pool {
    const EDELEGATOR_ACTIVE_BALANCE_TOO_LOW: u64 = 8;
}
```

<a id="0x1_delegation_pool_EDELEGATOR_NOT_ALLOWLISTED"></a>

Cannot add/reactivate stake unless being allowlisted by the pool owner.

```move
module 0x1::delegation_pool {
    const EDELEGATOR_NOT_ALLOWLISTED: u64 = 25;
}
```

<a id="0x1_delegation_pool_EDELEGATOR_PENDING_INACTIVE_BALANCE_TOO_LOW"></a>

Delegator&apos;s pending_inactive balance cannot be less than `MIN_COINS_ON_SHARES_POOL`.

```move
module 0x1::delegation_pool {
    const EDELEGATOR_PENDING_INACTIVE_BALANCE_TOO_LOW: u64 = 9;
}
```

<a id="0x1_delegation_pool_EINVALID_COMMISSION_PERCENTAGE"></a>

Commission percentage has to be between 0 and `MAX_FEE` &#45; 100%.

```move
module 0x1::delegation_pool {
    const EINVALID_COMMISSION_PERCENTAGE: u64 = 5;
}
```

<a id="0x1_delegation_pool_ENOT_ENOUGH_ACTIVE_STAKE_TO_UNLOCK"></a>

There is not enough `active` stake on the stake pool to `unlock`.

```move
module 0x1::delegation_pool {
    const ENOT_ENOUGH_ACTIVE_STAKE_TO_UNLOCK: u64 = 6;
}
```

<a id="0x1_delegation_pool_EOPERATOR_BENEFICIARY_CHANGE_NOT_SUPPORTED"></a>

Changing beneficiaries for operators is not supported.

```move
module 0x1::delegation_pool {
    const EOPERATOR_BENEFICIARY_CHANGE_NOT_SUPPORTED: u64 = 19;
}
```

<a id="0x1_delegation_pool_EPARTIAL_GOVERNANCE_VOTING_NOT_ENABLED"></a>

Partial governance voting hasn&apos;t been enabled on this delegation pool.

```move
module 0x1::delegation_pool {
    const EPARTIAL_GOVERNANCE_VOTING_NOT_ENABLED: u64 = 14;
}
```

<a id="0x1_delegation_pool_EPENDING_WITHDRAWAL_EXISTS"></a>

There is a pending withdrawal to be executed before `unlock`ing any new stake.

```move
module 0x1::delegation_pool {
    const EPENDING_WITHDRAWAL_EXISTS: u64 = 4;
}
```

<a id="0x1_delegation_pool_ESLASHED_INACTIVE_STAKE_ON_PAST_OLC"></a>

Slashing (if implemented) should not be applied to already `inactive` stake.
Not only it invalidates the accounting of past observed lockup cycles (OLC),
but is also unfair to delegators whose stake has been inactive before validator started misbehaving.
Additionally, the inactive stake does not count on the voting power of validator.

```move
module 0x1::delegation_pool {
    const ESLASHED_INACTIVE_STAKE_ON_PAST_OLC: u64 = 7;
}
```

<a id="0x1_delegation_pool_ETOO_LARGE_COMMISSION_INCREASE"></a>

Commission percentage increase is too large.

```move
module 0x1::delegation_pool {
    const ETOO_LARGE_COMMISSION_INCREASE: u64 = 20;
}
```

<a id="0x1_delegation_pool_ETOO_LATE_COMMISSION_CHANGE"></a>

Commission percentage change is too late in this lockup period, and should be done at least a quarter (1/4) of the lockup duration before the lockup cycle ends.

```move
module 0x1::delegation_pool {
    const ETOO_LATE_COMMISSION_CHANGE: u64 = 21;
}
```

<a id="0x1_delegation_pool_EWITHDRAW_ZERO_STAKE"></a>

Cannot request to withdraw zero stake.

```move
module 0x1::delegation_pool {
    const EWITHDRAW_ZERO_STAKE: u64 = 11;
}
```

<a id="0x1_delegation_pool_MAX_COMMISSION_INCREASE"></a>

Maximum commission percentage increase per lockup cycle. 10% is represented as 1000.

```move
module 0x1::delegation_pool {
    const MAX_COMMISSION_INCREASE: u64 = 1000;
}
```

<a id="0x1_delegation_pool_MAX_FEE"></a>

Maximum operator percentage fee(of double digit precision): 22.85% is represented as 2285

```move
module 0x1::delegation_pool {
    const MAX_FEE: u64 = 10000;
}
```

<a id="0x1_delegation_pool_MIN_COINS_ON_SHARES_POOL"></a>

Minimum coins to exist on a shares pool at all times.
Enforced per delegator for both active and pending_inactive pools.
This constraint ensures the share price cannot overly increase and lead to
substantial losses when buying shares (can lose at most 1 share which may
be worth a lot if current share price is high).
This constraint is not enforced on inactive pools as they only allow redeems
(can lose at most 1 coin regardless of current share price).

```move
module 0x1::delegation_pool {
    const MIN_COINS_ON_SHARES_POOL: u64 = 1000000000;
}
```

<a id="0x1_delegation_pool_MODULE_SALT"></a>

```move
module 0x1::delegation_pool {
    const MODULE_SALT: vector<u8> = [97, 112, 116, 111, 115, 95, 102, 114, 97, 109, 101, 119, 111, 114, 107, 58, 58, 100, 101, 108, 101, 103, 97, 116, 105, 111, 110, 95, 112, 111, 111, 108];
}
```

<a id="0x1_delegation_pool_NULL_SHAREHOLDER"></a>

Special shareholder temporarily owning the `add_stake` fees charged during this epoch.
On each `add_stake` operation any resulted fee is used to buy active shares for this shareholder.
First synchronization after this epoch ends will distribute accumulated fees to the rest of the pool as refunds.

```move
module 0x1::delegation_pool {
    const NULL_SHAREHOLDER: address = 0x0;
}
```

<a id="0x1_delegation_pool_SHARES_SCALING_FACTOR"></a>

Scaling factor of shares pools used within the delegation pool

```move
module 0x1::delegation_pool {
    const SHARES_SCALING_FACTOR: u64 = 10000000000000000;
}
```

<a id="0x1_delegation_pool_owner_cap_exists"></a>

## Function `owner_cap_exists`

Return whether supplied address `addr` is owner of a delegation pool.

```move
module 0x1::delegation_pool {
    #[view]
    public fun owner_cap_exists(addr: address): bool
}
```

<a id="0x1_delegation_pool_get_owned_pool_address"></a>

## Function `get_owned_pool_address`

Return address of the delegation pool owned by `owner` or fail if there is none.

```move
module 0x1::delegation_pool {
    #[view]
    public fun get_owned_pool_address(owner: address): address
}
```

<a id="0x1_delegation_pool_delegation_pool_exists"></a>

## Function `delegation_pool_exists`

Return whether a delegation pool exists at supplied address `addr`.

```move
module 0x1::delegation_pool {
    #[view]
    public fun delegation_pool_exists(addr: address): bool
}
```

<a id="0x1_delegation_pool_partial_governance_voting_enabled"></a>

## Function `partial_governance_voting_enabled`

Return whether a delegation pool has already enabled partial governance voting.

```move
module 0x1::delegation_pool {
    #[view]
    public fun partial_governance_voting_enabled(pool_address: address): bool
}
```

<a id="0x1_delegation_pool_observed_lockup_cycle"></a>

## Function `observed_lockup_cycle`

Return the index of current observed lockup cycle on delegation pool `pool_address`.

```move
module 0x1::delegation_pool {
    #[view]
    public fun observed_lockup_cycle(pool_address: address): u64
}
```

<a id="0x1_delegation_pool_is_next_commission_percentage_effective"></a>

## Function `is_next_commission_percentage_effective`

Return whether the commission percentage for the next lockup cycle is effective.

```move
module 0x1::delegation_pool {
    #[view]
    public fun is_next_commission_percentage_effective(pool_address: address): bool
}
```

<a id="0x1_delegation_pool_operator_commission_percentage"></a>

## Function `operator_commission_percentage`

Return the operator commission percentage set on the delegation pool `pool_address`.

```move
module 0x1::delegation_pool {
    #[view]
    public fun operator_commission_percentage(pool_address: address): u64
}
```

<a id="0x1_delegation_pool_operator_commission_percentage_next_lockup_cycle"></a>

## Function `operator_commission_percentage_next_lockup_cycle`

Return the operator commission percentage for the next lockup cycle.

```move
module 0x1::delegation_pool {
    #[view]
    public fun operator_commission_percentage_next_lockup_cycle(pool_address: address): u64
}
```

<a id="0x1_delegation_pool_shareholders_count_active_pool"></a>

## Function `shareholders_count_active_pool`

Return the number of delegators owning active stake within `pool_address`.

```move
module 0x1::delegation_pool {
    #[view]
    public fun shareholders_count_active_pool(pool_address: address): u64
}
```

<a id="0x1_delegation_pool_get_delegation_pool_stake"></a>

## Function `get_delegation_pool_stake`

Return the stake amounts on `pool_address` in the different states:
(`active`,`inactive`,`pending_active`,`pending_inactive`)

```move
module 0x1::delegation_pool {
    #[view]
    public fun get_delegation_pool_stake(pool_address: address): (u64, u64, u64, u64)
}
```

<a id="0x1_delegation_pool_get_pending_withdrawal"></a>

## Function `get_pending_withdrawal`

Return whether the given delegator has any withdrawable stake. If they recently requested to unlock
some stake and the stake pool&apos;s lockup cycle has not ended, their coins are not withdrawable yet.

```move
module 0x1::delegation_pool {
    #[view]
    public fun get_pending_withdrawal(pool_address: address, delegator_address: address): (bool, u64)
}
```

<a id="0x1_delegation_pool_get_stake"></a>

## Function `get_stake`

Return total stake owned by `delegator_address` within delegation pool `pool_address`
in each of its individual states: (`active`,`inactive`,`pending_inactive`)

```move
module 0x1::delegation_pool {
    #[view]
    public fun get_stake(pool_address: address, delegator_address: address): (u64, u64, u64)
}
```

<a id="0x1_delegation_pool_get_add_stake_fee"></a>

## Function `get_add_stake_fee`

Return refundable stake to be extracted from added `amount` at `add_stake` operation on pool `pool_address`.
If the validator produces rewards this epoch, added stake goes directly to `pending_active` and
does not earn rewards. However, all shares within a pool appreciate uniformly and when this epoch ends:
&#45; either added shares are still `pending_active` and steal from rewards of existing `active` stake
&#45; or have moved to `pending_inactive` and get full rewards (they displaced `active` stake at `unlock`)
To mitigate this, some of the added stake is extracted and fed back into the pool as placeholder
for the rewards the remaining stake would have earned if active:
extracted&#45;fee &#61; (amount &#45; extracted&#45;fee) \* reward&#45;rate% \* (100% &#45; operator&#45;commission%)

```move
module 0x1::delegation_pool {
    #[view]
    public fun get_add_stake_fee(pool_address: address, amount: u64): u64
}
```

<a id="0x1_delegation_pool_can_withdraw_pending_inactive"></a>

## Function `can_withdraw_pending_inactive`

Return whether `pending_inactive` stake can be directly withdrawn from
the delegation pool, implicitly its stake pool, in the special case
the validator had gone inactive before its lockup expired.

```move
module 0x1::delegation_pool {
    #[view]
    public fun can_withdraw_pending_inactive(pool_address: address): bool
}
```

<a id="0x1_delegation_pool_calculate_and_update_voter_total_voting_power"></a>

## Function `calculate_and_update_voter_total_voting_power`

Return the total voting power of a delegator in a delegation pool. This function syncs DelegationPool to the
latest state.

```move
module 0x1::delegation_pool {
    #[view]
    public fun calculate_and_update_voter_total_voting_power(pool_address: address, voter: address): u64
}
```

<a id="0x1_delegation_pool_calculate_and_update_remaining_voting_power"></a>

## Function `calculate_and_update_remaining_voting_power`

Return the remaining voting power of a delegator in a delegation pool on a proposal. This function syncs DelegationPool to the
latest state.

```move
module 0x1::delegation_pool {
    #[view]
    public fun calculate_and_update_remaining_voting_power(pool_address: address, voter_address: address, proposal_id: u64): u64
}
```

<a id="0x1_delegation_pool_calculate_and_update_delegator_voter"></a>

## Function `calculate_and_update_delegator_voter`

Return the latest delegated voter of a delegator in a delegation pool. This function syncs DelegationPool to the
latest state.

```move
module 0x1::delegation_pool {
    #[view]
    public fun calculate_and_update_delegator_voter(pool_address: address, delegator_address: address): address
}
```

<a id="0x1_delegation_pool_calculate_and_update_voting_delegation"></a>

## Function `calculate_and_update_voting_delegation`

Return the current state of a voting delegation of a delegator in a delegation pool.

```move
module 0x1::delegation_pool {
    #[view]
    public fun calculate_and_update_voting_delegation(pool_address: address, delegator_address: address): (address, address, u64)
}
```

<a id="0x1_delegation_pool_get_expected_stake_pool_address"></a>

## Function `get_expected_stake_pool_address`

Return the address of the stake pool to be created with the provided owner, and seed.

```move
module 0x1::delegation_pool {
    #[view]
    public fun get_expected_stake_pool_address(owner: address, delegation_pool_creation_seed: vector<u8>): address
}
```

<a id="0x1_delegation_pool_min_remaining_secs_for_commission_change"></a>

## Function `min_remaining_secs_for_commission_change`

Return the minimum remaining time in seconds for commission change, which is one fourth of the lockup duration.

```move
module 0x1::delegation_pool {
    #[view]
    public fun min_remaining_secs_for_commission_change(): u64
}
```

<a id="0x1_delegation_pool_allowlisting_enabled"></a>

## Function `allowlisting_enabled`

Return whether allowlisting is enabled for the provided delegation pool.

```move
module 0x1::delegation_pool {
    #[view]
    public fun allowlisting_enabled(pool_address: address): bool
}
```

<a id="0x1_delegation_pool_delegator_allowlisted"></a>

## Function `delegator_allowlisted`

Return whether the provided delegator is allowlisted.
A delegator is allowlisted if:
&#45; allowlisting is disabled on the pool
&#45; delegator is part of the allowlist

```move
module 0x1::delegation_pool {
    #[view]
    public fun delegator_allowlisted(pool_address: address, delegator_address: address): bool
}
```

<a id="0x1_delegation_pool_get_delegators_allowlist"></a>

## Function `get_delegators_allowlist`

Return allowlist or revert if allowlisting is not enabled for the provided delegation pool.

```move
module 0x1::delegation_pool {
    #[view]
    public fun get_delegators_allowlist(pool_address: address): vector<address>
}
```

<a id="0x1_delegation_pool_initialize_delegation_pool"></a>

## Function `initialize_delegation_pool`

Initialize a delegation pool of custom fixed `operator_commission_percentage`.
A resource account is created from `owner` signer and its supplied `delegation_pool_creation_seed`
to host the delegation pool resource and own the underlying stake pool.
Ownership over setting the operator/voter is granted to `owner` who has both roles initially.

```move
module 0x1::delegation_pool {
    public entry fun initialize_delegation_pool(owner: &signer, operator_commission_percentage: u64, delegation_pool_creation_seed: vector<u8>)
}
```

<a id="0x1_delegation_pool_beneficiary_for_operator"></a>

## Function `beneficiary_for_operator`

Return the beneficiary address of the operator.

```move
module 0x1::delegation_pool {
    #[view]
    public fun beneficiary_for_operator(operator: address): address
}
```

<a id="0x1_delegation_pool_enable_partial_governance_voting"></a>

## Function `enable_partial_governance_voting`

Enable partial governance voting on a stake pool. The voter of this stake pool will be managed by this module.
The existing voter will be replaced. The function is permissionless.

```move
module 0x1::delegation_pool {
    public entry fun enable_partial_governance_voting(pool_address: address)
}
```

<a id="0x1_delegation_pool_vote"></a>

## Function `vote`

Vote on a proposal with a voter&apos;s voting power. To successfully vote, the following conditions must be met:

1. The voting period of the proposal hasn&apos;t ended.
2. The delegation pool&apos;s lockup period ends after the voting period of the proposal.
3. The voter still has spare voting power on this proposal.
4. The delegation pool never votes on the proposal before enabling partial governance voting.

```move
module 0x1::delegation_pool {
    public entry fun vote(voter: &signer, pool_address: address, proposal_id: u64, voting_power: u64, should_pass: bool)
}
```

<a id="0x1_delegation_pool_create_proposal"></a>

## Function `create_proposal`

A voter could create a governance proposal by this function. To successfully create a proposal, the voter&apos;s
voting power in THIS delegation pool must be not less than the minimum required voting power specified in
`aptos_governance.move`.

```move
module 0x1::delegation_pool {
    public entry fun create_proposal(voter: &signer, pool_address: address, execution_hash: vector<u8>, metadata_location: vector<u8>, metadata_hash: vector<u8>, is_multi_step_proposal: bool)
}
```

<a id="0x1_delegation_pool_set_operator"></a>

## Function `set_operator`

Allows an owner to change the operator of the underlying stake pool.

```move
module 0x1::delegation_pool {
    public entry fun set_operator(owner: &signer, new_operator: address)
}
```

<a id="0x1_delegation_pool_set_beneficiary_for_operator"></a>

## Function `set_beneficiary_for_operator`

Allows an operator to change its beneficiary. Any existing unpaid commission rewards will be paid to the new
beneficiary. To ensure payment to the current beneficiary, one should first call `synchronize_delegation_pool`
before switching the beneficiary. An operator can set one beneficiary for delegation pools, not a separate
one for each pool.

```move
module 0x1::delegation_pool {
    public entry fun set_beneficiary_for_operator(operator: &signer, new_beneficiary: address)
}
```

<a id="0x1_delegation_pool_update_commission_percentage"></a>

## Function `update_commission_percentage`

Allows an owner to update the commission percentage for the operator of the underlying stake pool.

```move
module 0x1::delegation_pool {
    public entry fun update_commission_percentage(owner: &signer, new_commission_percentage: u64)
}
```

<a id="0x1_delegation_pool_set_delegated_voter"></a>

## Function `set_delegated_voter`

Allows an owner to change the delegated voter of the underlying stake pool.

```move
module 0x1::delegation_pool {
    public entry fun set_delegated_voter(owner: &signer, new_voter: address)
}
```

<a id="0x1_delegation_pool_delegate_voting_power"></a>

## Function `delegate_voting_power`

Allows a delegator to delegate its voting power to a voter. If this delegator already has a delegated voter,
this change won&apos;t take effects until the next lockup period.

```move
module 0x1::delegation_pool {
    public entry fun delegate_voting_power(delegator: &signer, pool_address: address, new_voter: address)
}
```

<a id="0x1_delegation_pool_enable_delegators_allowlisting"></a>

## Function `enable_delegators_allowlisting`

Enable delegators allowlisting as the pool owner.

```move
module 0x1::delegation_pool {
    public entry fun enable_delegators_allowlisting(owner: &signer)
}
```

<a id="0x1_delegation_pool_disable_delegators_allowlisting"></a>

## Function `disable_delegators_allowlisting`

Disable delegators allowlisting as the pool owner. The existing allowlist will be emptied.

```move
module 0x1::delegation_pool {
    public entry fun disable_delegators_allowlisting(owner: &signer)
}
```

<a id="0x1_delegation_pool_allowlist_delegator"></a>

## Function `allowlist_delegator`

Allowlist a delegator as the pool owner.

```move
module 0x1::delegation_pool {
    public entry fun allowlist_delegator(owner: &signer, delegator_address: address)
}
```

<a id="0x1_delegation_pool_remove_delegator_from_allowlist"></a>

## Function `remove_delegator_from_allowlist`

Remove a delegator from the allowlist as the pool owner, but do not unlock their stake.

```move
module 0x1::delegation_pool {
    public entry fun remove_delegator_from_allowlist(owner: &signer, delegator_address: address)
}
```

<a id="0x1_delegation_pool_evict_delegator"></a>

## Function `evict_delegator`

Evict a delegator that is not allowlisted by unlocking their entire stake.

```move
module 0x1::delegation_pool {
    public entry fun evict_delegator(owner: &signer, delegator_address: address)
}
```

<a id="0x1_delegation_pool_add_stake"></a>

## Function `add_stake`

Add `amount` of coins to the delegation pool `pool_address`.

```move
module 0x1::delegation_pool {
    public entry fun add_stake(delegator: &signer, pool_address: address, amount: u64)
}
```

<a id="0x1_delegation_pool_unlock"></a>

## Function `unlock`

Unlock `amount` from the active &#43; pending_active stake of `delegator` or
at most how much active stake there is on the stake pool.

```move
module 0x1::delegation_pool {
    public entry fun unlock(delegator: &signer, pool_address: address, amount: u64)
}
```

<a id="0x1_delegation_pool_reactivate_stake"></a>

## Function `reactivate_stake`

Move `amount` of coins from pending_inactive to active.

```move
module 0x1::delegation_pool {
    public entry fun reactivate_stake(delegator: &signer, pool_address: address, amount: u64)
}
```

<a id="0x1_delegation_pool_withdraw"></a>

## Function `withdraw`

Withdraw `amount` of owned inactive stake from the delegation pool at `pool_address`.

```move
module 0x1::delegation_pool {
    public entry fun withdraw(delegator: &signer, pool_address: address, amount: u64)
}
```

<a id="0x1_delegation_pool_synchronize_delegation_pool"></a>

## Function `synchronize_delegation_pool`

Synchronize delegation and stake pools: distribute yet&#45;undetected rewards to the corresponding internal
shares pools, assign commission to operator and eventually prepare delegation pool for a new lockup cycle.

```move
module 0x1::delegation_pool {
    public entry fun synchronize_delegation_pool(pool_address: address)
}
```

<a id="0x1_delegation_pool_multiply_then_divide"></a>

## Function `multiply_then_divide`

Deprecated, prefer math64::mul_div

```move
module 0x1::delegation_pool {
    #[deprecated]
    public fun multiply_then_divide(x: u64, y: u64, z: u64): u64
}
```
