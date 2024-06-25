<a id="0x1_vesting"></a>

# Module `0x1::vesting`

Simple vesting contract that allows specifying how much APT coins should be vesting in each fixed&#45;size period. The
vesting contract also comes with staking and allows shareholders to withdraw rewards anytime.

Vesting schedule is represented as a vector of distributions. For example, a vesting schedule of
[3/48, 3/48, 1/48] means that after the vesting starts:

1. The first and second periods will vest 3/48 of the total original grant.
2. The third period will vest 1/48.
3. All subsequent periods will also vest 1/48 (last distribution in the schedule) until the original grant runs out.

Shareholder flow:

1. Admin calls create_vesting_contract with a schedule of [3/48, 3/48, 1/48] with a vesting cliff of 1 year and
   vesting period of 1 month.
2. After a month, a shareholder calls unlock_rewards to request rewards. They can also call vest() which would also
   unlocks rewards but since the 1 year cliff has not passed (vesting has not started), vest() would not release any of
   the original grant.
3. After the unlocked rewards become fully withdrawable (as it&apos;s subject to staking lockup), shareholders can call
   distribute() to send all withdrawable funds to all shareholders based on the original grant&apos;s shares structure.
4. After 1 year and 1 month, the vesting schedule now starts. Shareholders call vest() to unlock vested coins. vest()
   checks the schedule and unlocks 3/48 of the original grant in addition to any accumulated rewards since last
   unlock_rewards(). Once the unlocked coins become withdrawable, shareholders can call distribute().
5. Assuming the shareholders forgot to call vest() for 2 months, when they call vest() again, they will unlock vested
   tokens for the next period since last vest. This would be for the first month they missed. They can call vest() a
   second time to unlock for the second month they missed.

Admin flow:

1. After creating the vesting contract, admin cannot change the vesting schedule.
2. Admin can call update_voter, update_operator, or reset_lockup at any time to update the underlying staking
   contract.
3. Admin can also call update_beneficiary for any shareholder. This would send all distributions (rewards, vested
   coins) of that shareholder to the beneficiary account. By defalt, if a beneficiary is not set, the distributions are
   send directly to the shareholder account.
4. Admin can call terminate_vesting_contract to terminate the vesting. This would first finish any distribution but
   will prevent any further rewards or vesting distributions from being created. Once the locked up stake becomes
   withdrawable, admin can call admin_withdraw to withdraw all funds to the vesting contract&apos;s withdrawal address.

- [Struct `VestingSchedule`](#0x1_vesting_VestingSchedule)
- [Struct `StakingInfo`](#0x1_vesting_StakingInfo)
- [Resource `VestingContract`](#0x1_vesting_VestingContract)
- [Resource `VestingAccountManagement`](#0x1_vesting_VestingAccountManagement)
- [Resource `AdminStore`](#0x1_vesting_AdminStore)
- [Struct `CreateVestingContract`](#0x1_vesting_CreateVestingContract)
- [Struct `UpdateOperator`](#0x1_vesting_UpdateOperator)
- [Struct `UpdateVoter`](#0x1_vesting_UpdateVoter)
- [Struct `ResetLockup`](#0x1_vesting_ResetLockup)
- [Struct `SetBeneficiary`](#0x1_vesting_SetBeneficiary)
- [Struct `UnlockRewards`](#0x1_vesting_UnlockRewards)
- [Struct `Vest`](#0x1_vesting_Vest)
- [Struct `Distribute`](#0x1_vesting_Distribute)
- [Struct `Terminate`](#0x1_vesting_Terminate)
- [Struct `AdminWithdraw`](#0x1_vesting_AdminWithdraw)
- [Struct `CreateVestingContractEvent`](#0x1_vesting_CreateVestingContractEvent)
- [Struct `UpdateOperatorEvent`](#0x1_vesting_UpdateOperatorEvent)
- [Struct `UpdateVoterEvent`](#0x1_vesting_UpdateVoterEvent)
- [Struct `ResetLockupEvent`](#0x1_vesting_ResetLockupEvent)
- [Struct `SetBeneficiaryEvent`](#0x1_vesting_SetBeneficiaryEvent)
- [Struct `UnlockRewardsEvent`](#0x1_vesting_UnlockRewardsEvent)
- [Struct `VestEvent`](#0x1_vesting_VestEvent)
- [Struct `DistributeEvent`](#0x1_vesting_DistributeEvent)
- [Struct `TerminateEvent`](#0x1_vesting_TerminateEvent)
- [Struct `AdminWithdrawEvent`](#0x1_vesting_AdminWithdrawEvent)
- [Constants](#@Constants_0)
- [Function `stake_pool_address`](#0x1_vesting_stake_pool_address)
- [Function `vesting_start_secs`](#0x1_vesting_vesting_start_secs)
- [Function `period_duration_secs`](#0x1_vesting_period_duration_secs)
- [Function `remaining_grant`](#0x1_vesting_remaining_grant)
- [Function `beneficiary`](#0x1_vesting_beneficiary)
- [Function `operator_commission_percentage`](#0x1_vesting_operator_commission_percentage)
- [Function `vesting_contracts`](#0x1_vesting_vesting_contracts)
- [Function `operator`](#0x1_vesting_operator)
- [Function `voter`](#0x1_vesting_voter)
- [Function `vesting_schedule`](#0x1_vesting_vesting_schedule)
- [Function `total_accumulated_rewards`](#0x1_vesting_total_accumulated_rewards)
- [Function `accumulated_rewards`](#0x1_vesting_accumulated_rewards)
- [Function `shareholders`](#0x1_vesting_shareholders)
- [Function `shareholder`](#0x1_vesting_shareholder)
- [Function `create_vesting_schedule`](#0x1_vesting_create_vesting_schedule)
- [Function `create_vesting_contract`](#0x1_vesting_create_vesting_contract)
- [Function `unlock_rewards`](#0x1_vesting_unlock_rewards)
- [Function `unlock_rewards_many`](#0x1_vesting_unlock_rewards_many)
- [Function `vest`](#0x1_vesting_vest)
- [Function `vest_many`](#0x1_vesting_vest_many)
- [Function `distribute`](#0x1_vesting_distribute)
- [Function `distribute_many`](#0x1_vesting_distribute_many)
- [Function `terminate_vesting_contract`](#0x1_vesting_terminate_vesting_contract)
- [Function `admin_withdraw`](#0x1_vesting_admin_withdraw)
- [Function `update_operator`](#0x1_vesting_update_operator)
- [Function `update_operator_with_same_commission`](#0x1_vesting_update_operator_with_same_commission)
- [Function `update_commission_percentage`](#0x1_vesting_update_commission_percentage)
- [Function `update_voter`](#0x1_vesting_update_voter)
- [Function `reset_lockup`](#0x1_vesting_reset_lockup)
- [Function `set_beneficiary`](#0x1_vesting_set_beneficiary)
- [Function `reset_beneficiary`](#0x1_vesting_reset_beneficiary)
- [Function `set_management_role`](#0x1_vesting_set_management_role)
- [Function `set_beneficiary_resetter`](#0x1_vesting_set_beneficiary_resetter)
- [Function `set_beneficiary_for_operator`](#0x1_vesting_set_beneficiary_for_operator)
- [Function `get_role_holder`](#0x1_vesting_get_role_holder)
- [Function `get_vesting_account_signer`](#0x1_vesting_get_vesting_account_signer)

```move
module 0x1::vesting {
    use 0x1::account;
    use 0x1::aptos_account;
    use 0x1::aptos_coin;
    use 0x1::bcs;
    use 0x1::coin;
    use 0x1::error;
    use 0x1::event;
    use 0x1::features;
    use 0x1::fixed_point32;
    use 0x1::math64;
    use 0x1::pool_u64;
    use 0x1::signer;
    use 0x1::simple_map;
    use 0x1::stake;
    use 0x1::staking_contract;
    use 0x1::string;
    use 0x1::system_addresses;
    use 0x1::timestamp;
    use 0x1::vector;
}
```

<a id="0x1_vesting_VestingSchedule"></a>

## Struct `VestingSchedule`

```move
module 0x1::vesting {
    struct VestingSchedule has copy, drop, store
}
```

<a id="0x1_vesting_StakingInfo"></a>

## Struct `StakingInfo`

```move
module 0x1::vesting {
    struct StakingInfo has store
}
```

<a id="0x1_vesting_VestingContract"></a>

## Resource `VestingContract`

```move
module 0x1::vesting {
    struct VestingContract has key
}
```

<a id="0x1_vesting_VestingAccountManagement"></a>

## Resource `VestingAccountManagement`

```move
module 0x1::vesting {
    struct VestingAccountManagement has key
}
```

<a id="0x1_vesting_AdminStore"></a>

## Resource `AdminStore`

```move
module 0x1::vesting {
    struct AdminStore has key
}
```

<a id="0x1_vesting_CreateVestingContract"></a>

## Struct `CreateVestingContract`

```move
module 0x1::vesting {
    #[event]
    struct CreateVestingContract has drop, store
}
```

<a id="0x1_vesting_UpdateOperator"></a>

## Struct `UpdateOperator`

```move
module 0x1::vesting {
    #[event]
    struct UpdateOperator has drop, store
}
```

<a id="0x1_vesting_UpdateVoter"></a>

## Struct `UpdateVoter`

```move
module 0x1::vesting {
    #[event]
    struct UpdateVoter has drop, store
}
```

<a id="0x1_vesting_ResetLockup"></a>

## Struct `ResetLockup`

```move
module 0x1::vesting {
    #[event]
    struct ResetLockup has drop, store
}
```

<a id="0x1_vesting_SetBeneficiary"></a>

## Struct `SetBeneficiary`

```move
module 0x1::vesting {
    #[event]
    struct SetBeneficiary has drop, store
}
```

<a id="0x1_vesting_UnlockRewards"></a>

## Struct `UnlockRewards`

```move
module 0x1::vesting {
    #[event]
    struct UnlockRewards has drop, store
}
```

<a id="0x1_vesting_Vest"></a>

## Struct `Vest`

```move
module 0x1::vesting {
    #[event]
    struct Vest has drop, store
}
```

<a id="0x1_vesting_Distribute"></a>

## Struct `Distribute`

```move
module 0x1::vesting {
    #[event]
    struct Distribute has drop, store
}
```

<a id="0x1_vesting_Terminate"></a>

## Struct `Terminate`

```move
module 0x1::vesting {
    #[event]
    struct Terminate has drop, store
}
```

<a id="0x1_vesting_AdminWithdraw"></a>

## Struct `AdminWithdraw`

```move
module 0x1::vesting {
    #[event]
    struct AdminWithdraw has drop, store
}
```

<a id="0x1_vesting_CreateVestingContractEvent"></a>

## Struct `CreateVestingContractEvent`

```move
module 0x1::vesting {
    struct CreateVestingContractEvent has drop, store
}
```

<a id="0x1_vesting_UpdateOperatorEvent"></a>

## Struct `UpdateOperatorEvent`

```move
module 0x1::vesting {
    struct UpdateOperatorEvent has drop, store
}
```

<a id="0x1_vesting_UpdateVoterEvent"></a>

## Struct `UpdateVoterEvent`

```move
module 0x1::vesting {
    struct UpdateVoterEvent has drop, store
}
```

<a id="0x1_vesting_ResetLockupEvent"></a>

## Struct `ResetLockupEvent`

```move
module 0x1::vesting {
    struct ResetLockupEvent has drop, store
}
```

<a id="0x1_vesting_SetBeneficiaryEvent"></a>

## Struct `SetBeneficiaryEvent`

```move
module 0x1::vesting {
    struct SetBeneficiaryEvent has drop, store
}
```

<a id="0x1_vesting_UnlockRewardsEvent"></a>

## Struct `UnlockRewardsEvent`

```move
module 0x1::vesting {
    struct UnlockRewardsEvent has drop, store
}
```

<a id="0x1_vesting_VestEvent"></a>

## Struct `VestEvent`

```move
module 0x1::vesting {
    struct VestEvent has drop, store
}
```

<a id="0x1_vesting_DistributeEvent"></a>

## Struct `DistributeEvent`

```move
module 0x1::vesting {
    struct DistributeEvent has drop, store
}
```

<a id="0x1_vesting_TerminateEvent"></a>

## Struct `TerminateEvent`

```move
module 0x1::vesting {
    struct TerminateEvent has drop, store
}
```

<a id="0x1_vesting_AdminWithdrawEvent"></a>

## Struct `AdminWithdrawEvent`

```move
module 0x1::vesting {
    struct AdminWithdrawEvent has drop, store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_vesting_EEMPTY_VESTING_SCHEDULE"></a>

Vesting schedule cannot be empty.

```move
module 0x1::vesting {
    const EEMPTY_VESTING_SCHEDULE: u64 = 2;
}
```

<a id="0x1_vesting_EINVALID_WITHDRAWAL_ADDRESS"></a>

Withdrawal address is invalid.

```move
module 0x1::vesting {
    const EINVALID_WITHDRAWAL_ADDRESS: u64 = 1;
}
```

<a id="0x1_vesting_ENOT_ADMIN"></a>

The signer is not the admin of the vesting contract.

```move
module 0x1::vesting {
    const ENOT_ADMIN: u64 = 7;
}
```

<a id="0x1_vesting_ENO_SHAREHOLDERS"></a>

Shareholders list cannot be empty.

```move
module 0x1::vesting {
    const ENO_SHAREHOLDERS: u64 = 4;
}
```

<a id="0x1_vesting_EPENDING_STAKE_FOUND"></a>

Cannot terminate the vesting contract with pending active stake. Need to wait until next epoch.

```move
module 0x1::vesting {
    const EPENDING_STAKE_FOUND: u64 = 11;
}
```

<a id="0x1_vesting_EPERMISSION_DENIED"></a>

Account is not admin or does not have the required role to take this action.

```move
module 0x1::vesting {
    const EPERMISSION_DENIED: u64 = 15;
}
```

<a id="0x1_vesting_EROLE_NOT_FOUND"></a>

The vesting account has no such management role.

```move
module 0x1::vesting {
    const EROLE_NOT_FOUND: u64 = 14;
}
```

<a id="0x1_vesting_ESHARES_LENGTH_MISMATCH"></a>

The length of shareholders and shares lists don&apos;t match.

```move
module 0x1::vesting {
    const ESHARES_LENGTH_MISMATCH: u64 = 5;
}
```

<a id="0x1_vesting_EVEC_EMPTY_FOR_MANY_FUNCTION"></a>

Zero items were provided to a \*\_many function.

```move
module 0x1::vesting {
    const EVEC_EMPTY_FOR_MANY_FUNCTION: u64 = 16;
}
```

<a id="0x1_vesting_EVESTING_ACCOUNT_HAS_NO_ROLES"></a>

Vesting account has no other management roles beside admin.

```move
module 0x1::vesting {
    const EVESTING_ACCOUNT_HAS_NO_ROLES: u64 = 13;
}
```

<a id="0x1_vesting_EVESTING_CONTRACT_NOT_ACTIVE"></a>

Vesting contract needs to be in active state.

```move
module 0x1::vesting {
    const EVESTING_CONTRACT_NOT_ACTIVE: u64 = 8;
}
```

<a id="0x1_vesting_EVESTING_CONTRACT_NOT_FOUND"></a>

No vesting contract found at provided address.

```move
module 0x1::vesting {
    const EVESTING_CONTRACT_NOT_FOUND: u64 = 10;
}
```

<a id="0x1_vesting_EVESTING_CONTRACT_STILL_ACTIVE"></a>

Admin can only withdraw from an inactive (paused or terminated) vesting contract.

```move
module 0x1::vesting {
    const EVESTING_CONTRACT_STILL_ACTIVE: u64 = 9;
}
```

<a id="0x1_vesting_EVESTING_START_TOO_SOON"></a>

Vesting cannot start before or at the current block timestamp. Has to be in the future.

```move
module 0x1::vesting {
    const EVESTING_START_TOO_SOON: u64 = 6;
}
```

<a id="0x1_vesting_EZERO_GRANT"></a>

Grant amount cannot be 0.

```move
module 0x1::vesting {
    const EZERO_GRANT: u64 = 12;
}
```

<a id="0x1_vesting_EZERO_VESTING_SCHEDULE_PERIOD"></a>

Vesting period cannot be 0.

```move
module 0x1::vesting {
    const EZERO_VESTING_SCHEDULE_PERIOD: u64 = 3;
}
```

<a id="0x1_vesting_MAXIMUM_SHAREHOLDERS"></a>

Maximum number of shareholders a vesting pool can support.

```move
module 0x1::vesting {
    const MAXIMUM_SHAREHOLDERS: u64 = 30;
}
```

<a id="0x1_vesting_ROLE_BENEFICIARY_RESETTER"></a>

Roles that can manage certain aspects of the vesting account beyond the main admin.

```move
module 0x1::vesting {
    const ROLE_BENEFICIARY_RESETTER: vector<u8> = [82, 79, 76, 69, 95, 66, 69, 78, 69, 70, 73, 67, 73, 65, 82, 89, 95, 82, 69, 83, 69, 84, 84, 69, 82];
}
```

<a id="0x1_vesting_VESTING_POOL_ACTIVE"></a>

Vesting contract states.
Vesting contract is active and distributions can be made.

```move
module 0x1::vesting {
    const VESTING_POOL_ACTIVE: u64 = 1;
}
```

<a id="0x1_vesting_VESTING_POOL_SALT"></a>

```move
module 0x1::vesting {
    const VESTING_POOL_SALT: vector<u8> = [97, 112, 116, 111, 115, 95, 102, 114, 97, 109, 101, 119, 111, 114, 107, 58, 58, 118, 101, 115, 116, 105, 110, 103];
}
```

<a id="0x1_vesting_VESTING_POOL_TERMINATED"></a>

Vesting contract has been terminated and all funds have been released back to the withdrawal address.

```move
module 0x1::vesting {
    const VESTING_POOL_TERMINATED: u64 = 2;
}
```

<a id="0x1_vesting_stake_pool_address"></a>

## Function `stake_pool_address`

Return the address of the underlying stake pool (separate resource account) of the vesting contract.

This errors out if the vesting contract with the provided address doesn&apos;t exist.

```move
module 0x1::vesting {
    #[view]
    public fun stake_pool_address(vesting_contract_address: address): address
}
```

<a id="0x1_vesting_vesting_start_secs"></a>

## Function `vesting_start_secs`

Return the vesting start timestamp (in seconds) of the vesting contract.
Vesting will start at this time, and once a full period has passed, the first vest will become unlocked.

This errors out if the vesting contract with the provided address doesn&apos;t exist.

```move
module 0x1::vesting {
    #[view]
    public fun vesting_start_secs(vesting_contract_address: address): u64
}
```

<a id="0x1_vesting_period_duration_secs"></a>

## Function `period_duration_secs`

Return the duration of one vesting period (in seconds).
Each vest is released after one full period has started, starting from the specified start_timestamp_secs.

This errors out if the vesting contract with the provided address doesn&apos;t exist.

```move
module 0x1::vesting {
    #[view]
    public fun period_duration_secs(vesting_contract_address: address): u64
}
```

<a id="0x1_vesting_remaining_grant"></a>

## Function `remaining_grant`

Return the remaining grant, consisting of unvested coins that have not been distributed to shareholders.
Prior to start_timestamp_secs, the remaining grant will always be equal to the original grant.
Once vesting has started, and vested tokens are distributed, the remaining grant will decrease over time,
according to the vesting schedule.

This errors out if the vesting contract with the provided address doesn&apos;t exist.

```move
module 0x1::vesting {
    #[view]
    public fun remaining_grant(vesting_contract_address: address): u64
}
```

<a id="0x1_vesting_beneficiary"></a>

## Function `beneficiary`

Return the beneficiary account of the specified shareholder in a vesting contract.
This is the same as the shareholder address by default and only different if it&apos;s been explicitly set.

This errors out if the vesting contract with the provided address doesn&apos;t exist.

```move
module 0x1::vesting {
    #[view]
    public fun beneficiary(vesting_contract_address: address, shareholder: address): address
}
```

<a id="0x1_vesting_operator_commission_percentage"></a>

## Function `operator_commission_percentage`

Return the percentage of accumulated rewards that is paid to the operator as commission.

This errors out if the vesting contract with the provided address doesn&apos;t exist.

```move
module 0x1::vesting {
    #[view]
    public fun operator_commission_percentage(vesting_contract_address: address): u64
}
```

<a id="0x1_vesting_vesting_contracts"></a>

## Function `vesting_contracts`

Return all the vesting contracts a given address is an admin of.

```move
module 0x1::vesting {
    #[view]
    public fun vesting_contracts(admin: address): vector<address>
}
```

<a id="0x1_vesting_operator"></a>

## Function `operator`

Return the operator who runs the validator for the vesting contract.

This errors out if the vesting contract with the provided address doesn&apos;t exist.

```move
module 0x1::vesting {
    #[view]
    public fun operator(vesting_contract_address: address): address
}
```

<a id="0x1_vesting_voter"></a>

## Function `voter`

Return the voter who will be voting on on&#45;chain governance proposals on behalf of the vesting contract&apos;s stake
pool.

This errors out if the vesting contract with the provided address doesn&apos;t exist.

```move
module 0x1::vesting {
    #[view]
    public fun voter(vesting_contract_address: address): address
}
```

<a id="0x1_vesting_vesting_schedule"></a>

## Function `vesting_schedule`

Return the vesting contract&apos;s vesting schedule. The core schedule is represented as a list of u64&#45;based
fractions, where the rightmmost 32 bits can be divided by 2^32 to get the fraction, and anything else is the
whole number.

For example 3/48, or 0.0625, will be represented as 268435456. The fractional portion would be
268435456 / 2^32 &#61; 0.0625. Since there are fewer than 32 bits, the whole number portion is effectively 0.
So 268435456 &#61; 0.0625.

This errors out if the vesting contract with the provided address doesn&apos;t exist.

```move
module 0x1::vesting {
    #[view]
    public fun vesting_schedule(vesting_contract_address: address): vesting::VestingSchedule
}
```

<a id="0x1_vesting_total_accumulated_rewards"></a>

## Function `total_accumulated_rewards`

Return the total accumulated rewards that have not been distributed to shareholders of the vesting contract.
This excludes any unpaid commission that the operator has not collected.

This errors out if the vesting contract with the provided address doesn&apos;t exist.

```move
module 0x1::vesting {
    #[view]
    public fun total_accumulated_rewards(vesting_contract_address: address): u64
}
```

<a id="0x1_vesting_accumulated_rewards"></a>

## Function `accumulated_rewards`

Return the accumulated rewards that have not been distributed to the provided shareholder. Caller can also pass
the beneficiary address instead of shareholder address.

This errors out if the vesting contract with the provided address doesn&apos;t exist.

```move
module 0x1::vesting {
    #[view]
    public fun accumulated_rewards(vesting_contract_address: address, shareholder_or_beneficiary: address): u64
}
```

<a id="0x1_vesting_shareholders"></a>

## Function `shareholders`

Return the list of all shareholders in the vesting contract.

```move
module 0x1::vesting {
    #[view]
    public fun shareholders(vesting_contract_address: address): vector<address>
}
```

<a id="0x1_vesting_shareholder"></a>

## Function `shareholder`

Return the shareholder address given the beneficiary address in a given vesting contract. If there are multiple
shareholders with the same beneficiary address, only the first shareholder is returned. If the given beneficiary
address is actually a shareholder address, just return the address back.

This returns 0x0 if no shareholder is found for the given beneficiary / the address is not a shareholder itself.

```move
module 0x1::vesting {
    #[view]
    public fun shareholder(vesting_contract_address: address, shareholder_or_beneficiary: address): address
}
```

<a id="0x1_vesting_create_vesting_schedule"></a>

## Function `create_vesting_schedule`

Create a vesting schedule with the given schedule of distributions, a vesting start time and period duration.

```move
module 0x1::vesting {
    public fun create_vesting_schedule(schedule: vector<fixed_point32::FixedPoint32>, start_timestamp_secs: u64, period_duration: u64): vesting::VestingSchedule
}
```

<a id="0x1_vesting_create_vesting_contract"></a>

## Function `create_vesting_contract`

Create a vesting contract with a given configurations.

```move
module 0x1::vesting {
    public fun create_vesting_contract(admin: &signer, shareholders: &vector<address>, buy_ins: simple_map::SimpleMap<address, coin::Coin<aptos_coin::AptosCoin>>, vesting_schedule: vesting::VestingSchedule, withdrawal_address: address, operator: address, voter: address, commission_percentage: u64, contract_creation_seed: vector<u8>): address
}
```

<a id="0x1_vesting_unlock_rewards"></a>

## Function `unlock_rewards`

Unlock any accumulated rewards.

```move
module 0x1::vesting {
    public entry fun unlock_rewards(contract_address: address)
}
```

<a id="0x1_vesting_unlock_rewards_many"></a>

## Function `unlock_rewards_many`

Call `unlock_rewards` for many vesting contracts.

```move
module 0x1::vesting {
    public entry fun unlock_rewards_many(contract_addresses: vector<address>)
}
```

<a id="0x1_vesting_vest"></a>

## Function `vest`

Unlock any vested portion of the grant.

```move
module 0x1::vesting {
    public entry fun vest(contract_address: address)
}
```

<a id="0x1_vesting_vest_many"></a>

## Function `vest_many`

Call `vest` for many vesting contracts.

```move
module 0x1::vesting {
    public entry fun vest_many(contract_addresses: vector<address>)
}
```

<a id="0x1_vesting_distribute"></a>

## Function `distribute`

Distribute any withdrawable stake from the stake pool.

```move
module 0x1::vesting {
    public entry fun distribute(contract_address: address)
}
```

<a id="0x1_vesting_distribute_many"></a>

## Function `distribute_many`

Call `distribute` for many vesting contracts.

```move
module 0x1::vesting {
    public entry fun distribute_many(contract_addresses: vector<address>)
}
```

<a id="0x1_vesting_terminate_vesting_contract"></a>

## Function `terminate_vesting_contract`

Terminate the vesting contract and send all funds back to the withdrawal address.

```move
module 0x1::vesting {
    public entry fun terminate_vesting_contract(admin: &signer, contract_address: address)
}
```

<a id="0x1_vesting_admin_withdraw"></a>

## Function `admin_withdraw`

Withdraw all funds to the preset vesting contract&apos;s withdrawal address. This can only be called if the contract
has already been terminated.

```move
module 0x1::vesting {
    public entry fun admin_withdraw(admin: &signer, contract_address: address)
}
```

<a id="0x1_vesting_update_operator"></a>

## Function `update_operator`

```move
module 0x1::vesting {
    public entry fun update_operator(admin: &signer, contract_address: address, new_operator: address, commission_percentage: u64)
}
```

<a id="0x1_vesting_update_operator_with_same_commission"></a>

## Function `update_operator_with_same_commission`

```move
module 0x1::vesting {
    public entry fun update_operator_with_same_commission(admin: &signer, contract_address: address, new_operator: address)
}
```

<a id="0x1_vesting_update_commission_percentage"></a>

## Function `update_commission_percentage`

```move
module 0x1::vesting {
    public entry fun update_commission_percentage(admin: &signer, contract_address: address, new_commission_percentage: u64)
}
```

<a id="0x1_vesting_update_voter"></a>

## Function `update_voter`

```move
module 0x1::vesting {
    public entry fun update_voter(admin: &signer, contract_address: address, new_voter: address)
}
```

<a id="0x1_vesting_reset_lockup"></a>

## Function `reset_lockup`

```move
module 0x1::vesting {
    public entry fun reset_lockup(admin: &signer, contract_address: address)
}
```

<a id="0x1_vesting_set_beneficiary"></a>

## Function `set_beneficiary`

```move
module 0x1::vesting {
    public entry fun set_beneficiary(admin: &signer, contract_address: address, shareholder: address, new_beneficiary: address)
}
```

<a id="0x1_vesting_reset_beneficiary"></a>

## Function `reset_beneficiary`

Remove the beneficiary for the given shareholder. All distributions will sent directly to the shareholder
account.

```move
module 0x1::vesting {
    public entry fun reset_beneficiary(account: &signer, contract_address: address, shareholder: address)
}
```

<a id="0x1_vesting_set_management_role"></a>

## Function `set_management_role`

```move
module 0x1::vesting {
    public entry fun set_management_role(admin: &signer, contract_address: address, role: string::String, role_holder: address)
}
```

<a id="0x1_vesting_set_beneficiary_resetter"></a>

## Function `set_beneficiary_resetter`

```move
module 0x1::vesting {
    public entry fun set_beneficiary_resetter(admin: &signer, contract_address: address, beneficiary_resetter: address)
}
```

<a id="0x1_vesting_set_beneficiary_for_operator"></a>

## Function `set_beneficiary_for_operator`

Set the beneficiary for the operator.

```move
module 0x1::vesting {
    public entry fun set_beneficiary_for_operator(operator: &signer, new_beneficiary: address)
}
```

<a id="0x1_vesting_get_role_holder"></a>

## Function `get_role_holder`

```move
module 0x1::vesting {
    public fun get_role_holder(contract_address: address, role: string::String): address
}
```

<a id="0x1_vesting_get_vesting_account_signer"></a>

## Function `get_vesting_account_signer`

For emergency use in case the admin needs emergency control of vesting contract account.
This doesn&apos;t give the admin total power as the admin would still need to follow the rules set by
staking_contract and stake modules.

```move
module 0x1::vesting {
    public fun get_vesting_account_signer(admin: &signer, contract_address: address): signer
}
```
