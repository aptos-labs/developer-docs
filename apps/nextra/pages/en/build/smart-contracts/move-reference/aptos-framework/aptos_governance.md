<a id="0x1_aptos_governance"></a>

# Module `0x1::aptos_governance`

AptosGovernance represents the on&#45;chain governance of the Aptos network. Voting power is calculated based on the
current epoch&apos;s voting power of the proposer or voter&apos;s backing stake pool. In addition, for it to count,
the stake pool&apos;s lockup needs to be at least as long as the proposal&apos;s duration.

It provides the following flow:

1. Proposers can create a proposal by calling AptosGovernance::create_proposal. The proposer&apos;s backing stake pool
   needs to have the minimum proposer stake required. Off&#45;chain components can subscribe to CreateProposalEvent to
   track proposal creation and proposal ids.
2. Voters can vote on a proposal. Their voting power is derived from the backing stake pool. A stake pool can vote
   on a proposal multiple times as long as the total voting power of these votes doesn&apos;t exceed its total voting power.

- [Resource `GovernanceResponsbility`](#0x1_aptos_governance_GovernanceResponsbility)
- [Resource `GovernanceConfig`](#0x1_aptos_governance_GovernanceConfig)
- [Struct `RecordKey`](#0x1_aptos_governance_RecordKey)
- [Resource `VotingRecords`](#0x1_aptos_governance_VotingRecords)
- [Resource `VotingRecordsV2`](#0x1_aptos_governance_VotingRecordsV2)
- [Resource `ApprovedExecutionHashes`](#0x1_aptos_governance_ApprovedExecutionHashes)
- [Resource `GovernanceEvents`](#0x1_aptos_governance_GovernanceEvents)
- [Struct `CreateProposalEvent`](#0x1_aptos_governance_CreateProposalEvent)
- [Struct `VoteEvent`](#0x1_aptos_governance_VoteEvent)
- [Struct `UpdateConfigEvent`](#0x1_aptos_governance_UpdateConfigEvent)
- [Struct `CreateProposal`](#0x1_aptos_governance_CreateProposal)
- [Struct `Vote`](#0x1_aptos_governance_Vote)
- [Struct `UpdateConfig`](#0x1_aptos_governance_UpdateConfig)
- [Constants](#@Constants_0)
- [Function `store_signer_cap`](#0x1_aptos_governance_store_signer_cap)
- [Function `update_governance_config`](#0x1_aptos_governance_update_governance_config)
- [Function `initialize_partial_voting`](#0x1_aptos_governance_initialize_partial_voting)
- [Function `get_voting_duration_secs`](#0x1_aptos_governance_get_voting_duration_secs)
- [Function `get_min_voting_threshold`](#0x1_aptos_governance_get_min_voting_threshold)
- [Function `get_required_proposer_stake`](#0x1_aptos_governance_get_required_proposer_stake)
- [Function `has_entirely_voted`](#0x1_aptos_governance_has_entirely_voted)
- [Function `get_remaining_voting_power`](#0x1_aptos_governance_get_remaining_voting_power)
- [Function `create_proposal`](#0x1_aptos_governance_create_proposal)
- [Function `create_proposal_v2`](#0x1_aptos_governance_create_proposal_v2)
- [Function `create_proposal_v2_impl`](#0x1_aptos_governance_create_proposal_v2_impl)
- [Function `batch_vote`](#0x1_aptos_governance_batch_vote)
- [Function `batch_partial_vote`](#0x1_aptos_governance_batch_partial_vote)
- [Function `vote`](#0x1_aptos_governance_vote)
- [Function `partial_vote`](#0x1_aptos_governance_partial_vote)
- [Function `add_approved_script_hash_script`](#0x1_aptos_governance_add_approved_script_hash_script)
- [Function `add_approved_script_hash`](#0x1_aptos_governance_add_approved_script_hash)
- [Function `resolve`](#0x1_aptos_governance_resolve)
- [Function `resolve_multi_step_proposal`](#0x1_aptos_governance_resolve_multi_step_proposal)
- [Function `remove_approved_hash`](#0x1_aptos_governance_remove_approved_hash)
- [Function `reconfigure`](#0x1_aptos_governance_reconfigure)
- [Function `force_end_epoch`](#0x1_aptos_governance_force_end_epoch)
- [Function `force_end_epoch_test_only`](#0x1_aptos_governance_force_end_epoch_test_only)
- [Function `toggle_features`](#0x1_aptos_governance_toggle_features)
- [Function `get_signer_testnet_only`](#0x1_aptos_governance_get_signer_testnet_only)
- [Function `get_voting_power`](#0x1_aptos_governance_get_voting_power)
- [Function `initialize_for_verification`](#0x1_aptos_governance_initialize_for_verification)

```move
module 0x1::aptos_governance {
    use 0x1::account;
    use 0x1::aptos_coin;
    use 0x1::coin;
    use 0x1::consensus_config;
    use 0x1::error;
    use 0x1::event;
    use 0x1::features;
    use 0x1::governance_proposal;
    use 0x1::math64;
    use 0x1::option;
    use 0x1::randomness_config;
    use 0x1::reconfiguration_with_dkg;
    use 0x1::signer;
    use 0x1::simple_map;
    use 0x1::smart_table;
    use 0x1::stake;
    use 0x1::staking_config;
    use 0x1::string;
    use 0x1::system_addresses;
    use 0x1::table;
    use 0x1::timestamp;
    use 0x1::vector;
    use 0x1::voting;
}
```

<a id="0x1_aptos_governance_GovernanceResponsbility"></a>

## Resource `GovernanceResponsbility`

Store the SignerCapabilities of accounts under the on&#45;chain governance&apos;s control.

```move
module 0x1::aptos_governance {
    struct GovernanceResponsbility has key
}
```

<a id="0x1_aptos_governance_GovernanceConfig"></a>

## Resource `GovernanceConfig`

Configurations of the AptosGovernance, set during Genesis and can be updated by the same process offered
by this AptosGovernance module.

```move
module 0x1::aptos_governance {
    struct GovernanceConfig has key
}
```

<a id="0x1_aptos_governance_RecordKey"></a>

## Struct `RecordKey`

```move
module 0x1::aptos_governance {
    struct RecordKey has copy, drop, store
}
```

<a id="0x1_aptos_governance_VotingRecords"></a>

## Resource `VotingRecords`

Records to track the proposals each stake pool has been used to vote on.

```move
module 0x1::aptos_governance {
    struct VotingRecords has key
}
```

<a id="0x1_aptos_governance_VotingRecordsV2"></a>

## Resource `VotingRecordsV2`

Records to track the voting power usage of each stake pool on each proposal.

```move
module 0x1::aptos_governance {
    struct VotingRecordsV2 has key
}
```

<a id="0x1_aptos_governance_ApprovedExecutionHashes"></a>

## Resource `ApprovedExecutionHashes`

Used to track which execution script hashes have been approved by governance.
This is required to bypass cases where the execution scripts exceed the size limit imposed by mempool.

```move
module 0x1::aptos_governance {
    struct ApprovedExecutionHashes has key
}
```

<a id="0x1_aptos_governance_GovernanceEvents"></a>

## Resource `GovernanceEvents`

Events generated by interactions with the AptosGovernance module.

```move
module 0x1::aptos_governance {
    struct GovernanceEvents has key
}
```

<a id="0x1_aptos_governance_CreateProposalEvent"></a>

## Struct `CreateProposalEvent`

Event emitted when a proposal is created.

```move
module 0x1::aptos_governance {
    struct CreateProposalEvent has drop, store
}
```

<a id="0x1_aptos_governance_VoteEvent"></a>

## Struct `VoteEvent`

Event emitted when there&apos;s a vote on a proposa;

```move
module 0x1::aptos_governance {
    struct VoteEvent has drop, store
}
```

<a id="0x1_aptos_governance_UpdateConfigEvent"></a>

## Struct `UpdateConfigEvent`

Event emitted when the governance configs are updated.

```move
module 0x1::aptos_governance {
    struct UpdateConfigEvent has drop, store
}
```

<a id="0x1_aptos_governance_CreateProposal"></a>

## Struct `CreateProposal`

Event emitted when a proposal is created.

```move
module 0x1::aptos_governance {
    #[event]
    struct CreateProposal has drop, store
}
```

<a id="0x1_aptos_governance_Vote"></a>

## Struct `Vote`

Event emitted when there&apos;s a vote on a proposa;

```move
module 0x1::aptos_governance {
    #[event]
    struct Vote has drop, store
}
```

<a id="0x1_aptos_governance_UpdateConfig"></a>

## Struct `UpdateConfig`

Event emitted when the governance configs are updated.

```move
module 0x1::aptos_governance {
    #[event]
    struct UpdateConfig has drop, store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_aptos_governance_MAX_U64"></a>

```move
module 0x1::aptos_governance {
    const MAX_U64: u64 = 18446744073709551615;
}
```

<a id="0x1_aptos_governance_PROPOSAL_STATE_SUCCEEDED"></a>

This matches the same enum const in voting. We have to duplicate it as Move doesn&apos;t have support for enums yet.

```move
module 0x1::aptos_governance {
    const PROPOSAL_STATE_SUCCEEDED: u64 = 1;
}
```

<a id="0x1_aptos_governance_EALREADY_VOTED"></a>

The specified stake pool has already been used to vote on the same proposal

```move
module 0x1::aptos_governance {
    const EALREADY_VOTED: u64 = 4;
}
```

<a id="0x1_aptos_governance_EINSUFFICIENT_PROPOSER_STAKE"></a>

The specified stake pool does not have sufficient stake to create a proposal

```move
module 0x1::aptos_governance {
    const EINSUFFICIENT_PROPOSER_STAKE: u64 = 1;
}
```

<a id="0x1_aptos_governance_EINSUFFICIENT_STAKE_LOCKUP"></a>

The specified stake pool does not have long enough remaining lockup to create a proposal or vote

```move
module 0x1::aptos_governance {
    const EINSUFFICIENT_STAKE_LOCKUP: u64 = 3;
}
```

<a id="0x1_aptos_governance_EMETADATA_HASH_TOO_LONG"></a>

Metadata hash cannot be longer than 256 chars

```move
module 0x1::aptos_governance {
    const EMETADATA_HASH_TOO_LONG: u64 = 10;
}
```

<a id="0x1_aptos_governance_EMETADATA_LOCATION_TOO_LONG"></a>

Metadata location cannot be longer than 256 chars

```move
module 0x1::aptos_governance {
    const EMETADATA_LOCATION_TOO_LONG: u64 = 9;
}
```

<a id="0x1_aptos_governance_ENOT_DELEGATED_VOTER"></a>

This account is not the designated voter of the specified stake pool

```move
module 0x1::aptos_governance {
    const ENOT_DELEGATED_VOTER: u64 = 2;
}
```

<a id="0x1_aptos_governance_ENOT_PARTIAL_VOTING_PROPOSAL"></a>

The proposal in the argument is not a partial voting proposal.

```move
module 0x1::aptos_governance {
    const ENOT_PARTIAL_VOTING_PROPOSAL: u64 = 14;
}
```

<a id="0x1_aptos_governance_ENO_VOTING_POWER"></a>

The specified stake pool must be part of the validator set

```move
module 0x1::aptos_governance {
    const ENO_VOTING_POWER: u64 = 5;
}
```

<a id="0x1_aptos_governance_EPARTIAL_VOTING_NOT_INITIALIZED"></a>

Partial voting feature hasn&apos;t been properly initialized.

```move
module 0x1::aptos_governance {
    const EPARTIAL_VOTING_NOT_INITIALIZED: u64 = 13;
}
```

<a id="0x1_aptos_governance_EPROPOSAL_NOT_RESOLVABLE_YET"></a>

Proposal is not ready to be resolved. Waiting on time or votes

```move
module 0x1::aptos_governance {
    const EPROPOSAL_NOT_RESOLVABLE_YET: u64 = 6;
}
```

<a id="0x1_aptos_governance_EPROPOSAL_NOT_RESOLVED_YET"></a>

The proposal has not been resolved yet

```move
module 0x1::aptos_governance {
    const EPROPOSAL_NOT_RESOLVED_YET: u64 = 8;
}
```

<a id="0x1_aptos_governance_EUNAUTHORIZED"></a>

Account is not authorized to call this function.

```move
module 0x1::aptos_governance {
    const EUNAUTHORIZED: u64 = 11;
}
```

<a id="0x1_aptos_governance_EVOTING_POWER_OVERFLOW"></a>

The stake pool is using voting power more than it has.

```move
module 0x1::aptos_governance {
    const EVOTING_POWER_OVERFLOW: u64 = 12;
}
```

<a id="0x1_aptos_governance_METADATA_HASH_KEY"></a>

```move
module 0x1::aptos_governance {
    const METADATA_HASH_KEY: vector<u8> = [109, 101, 116, 97, 100, 97, 116, 97, 95, 104, 97, 115, 104];
}
```

<a id="0x1_aptos_governance_METADATA_LOCATION_KEY"></a>

Proposal metadata attribute keys.

```move
module 0x1::aptos_governance {
    const METADATA_LOCATION_KEY: vector<u8> = [109, 101, 116, 97, 100, 97, 116, 97, 95, 108, 111, 99, 97, 116, 105, 111, 110];
}
```

<a id="0x1_aptos_governance_store_signer_cap"></a>

## Function `store_signer_cap`

Can be called during genesis or by the governance itself.
Stores the signer capability for a given address.

```move
module 0x1::aptos_governance {
    public fun store_signer_cap(aptos_framework: &signer, signer_address: address, signer_cap: account::SignerCapability)
}
```

<a id="0x1_aptos_governance_update_governance_config"></a>

## Function `update_governance_config`

Update the governance configurations. This can only be called as part of resolving a proposal in this same
AptosGovernance.

```move
module 0x1::aptos_governance {
    public fun update_governance_config(aptos_framework: &signer, min_voting_threshold: u128, required_proposer_stake: u64, voting_duration_secs: u64)
}
```

<a id="0x1_aptos_governance_initialize_partial_voting"></a>

## Function `initialize_partial_voting`

Initializes the state for Aptos Governance partial voting. Can only be called through Aptos governance
proposals with a signer for the aptos_framework (0x1) account.

```move
module 0x1::aptos_governance {
    public fun initialize_partial_voting(aptos_framework: &signer)
}
```

<a id="0x1_aptos_governance_get_voting_duration_secs"></a>

## Function `get_voting_duration_secs`

```move
module 0x1::aptos_governance {
    #[view]
    public fun get_voting_duration_secs(): u64
}
```

<a id="0x1_aptos_governance_get_min_voting_threshold"></a>

## Function `get_min_voting_threshold`

```move
module 0x1::aptos_governance {
    #[view]
    public fun get_min_voting_threshold(): u128
}
```

<a id="0x1_aptos_governance_get_required_proposer_stake"></a>

## Function `get_required_proposer_stake`

```move
module 0x1::aptos_governance {
    #[view]
    public fun get_required_proposer_stake(): u64
}
```

<a id="0x1_aptos_governance_has_entirely_voted"></a>

## Function `has_entirely_voted`

Return true if a stake pool has already voted on a proposal before partial governance voting is enabled.

```move
module 0x1::aptos_governance {
    #[view]
    public fun has_entirely_voted(stake_pool: address, proposal_id: u64): bool
}
```

<a id="0x1_aptos_governance_get_remaining_voting_power"></a>

## Function `get_remaining_voting_power`

Return remaining voting power of a stake pool on a proposal.
Note: a stake pool&apos;s voting power on a proposal could increase over time(e.g. rewards/new stake).

```move
module 0x1::aptos_governance {
    #[view]
    public fun get_remaining_voting_power(stake_pool: address, proposal_id: u64): u64
}
```

<a id="0x1_aptos_governance_create_proposal"></a>

## Function `create_proposal`

Create a single&#45;step proposal with the backing `stake_pool`.
@param execution_hash Required. This is the hash of the resolution script. When the proposal is resolved,
only the exact script with matching hash can be successfully executed.

```move
module 0x1::aptos_governance {
    public entry fun create_proposal(proposer: &signer, stake_pool: address, execution_hash: vector<u8>, metadata_location: vector<u8>, metadata_hash: vector<u8>)
}
```

<a id="0x1_aptos_governance_create_proposal_v2"></a>

## Function `create_proposal_v2`

Create a single&#45;step or multi&#45;step proposal with the backing `stake_pool`.
@param execution_hash Required. This is the hash of the resolution script. When the proposal is resolved,
only the exact script with matching hash can be successfully executed.

```move
module 0x1::aptos_governance {
    public entry fun create_proposal_v2(proposer: &signer, stake_pool: address, execution_hash: vector<u8>, metadata_location: vector<u8>, metadata_hash: vector<u8>, is_multi_step_proposal: bool)
}
```

<a id="0x1_aptos_governance_create_proposal_v2_impl"></a>

## Function `create_proposal_v2_impl`

Create a single&#45;step or multi&#45;step proposal with the backing `stake_pool`.
@param execution_hash Required. This is the hash of the resolution script. When the proposal is resolved,
only the exact script with matching hash can be successfully executed.
Return proposal_id when a proposal is successfully created.

```move
module 0x1::aptos_governance {
    public fun create_proposal_v2_impl(proposer: &signer, stake_pool: address, execution_hash: vector<u8>, metadata_location: vector<u8>, metadata_hash: vector<u8>, is_multi_step_proposal: bool): u64
}
```

<a id="0x1_aptos_governance_batch_vote"></a>

## Function `batch_vote`

Vote on proposal with proposal_id and all voting power from multiple stake_pools.

```move
module 0x1::aptos_governance {
    public entry fun batch_vote(voter: &signer, stake_pools: vector<address>, proposal_id: u64, should_pass: bool)
}
```

<a id="0x1_aptos_governance_batch_partial_vote"></a>

## Function `batch_partial_vote`

Batch vote on proposal with proposal_id and specified voting power from multiple stake_pools.

```move
module 0x1::aptos_governance {
    public entry fun batch_partial_vote(voter: &signer, stake_pools: vector<address>, proposal_id: u64, voting_power: u64, should_pass: bool)
}
```

<a id="0x1_aptos_governance_vote"></a>

## Function `vote`

Vote on proposal with `proposal_id` and all voting power from `stake_pool`.

```move
module 0x1::aptos_governance {
    public entry fun vote(voter: &signer, stake_pool: address, proposal_id: u64, should_pass: bool)
}
```

<a id="0x1_aptos_governance_partial_vote"></a>

## Function `partial_vote`

Vote on proposal with `proposal_id` and specified voting power from `stake_pool`.

```move
module 0x1::aptos_governance {
    public entry fun partial_vote(voter: &signer, stake_pool: address, proposal_id: u64, voting_power: u64, should_pass: bool)
}
```

<a id="0x1_aptos_governance_add_approved_script_hash_script"></a>

## Function `add_approved_script_hash_script`

```move
module 0x1::aptos_governance {
    public entry fun add_approved_script_hash_script(proposal_id: u64)
}
```

<a id="0x1_aptos_governance_add_approved_script_hash"></a>

## Function `add_approved_script_hash`

Add the execution script hash of a successful governance proposal to the approved list.
This is needed to bypass the mempool transaction size limit for approved governance proposal transactions that
are too large (e.g. module upgrades).

```move
module 0x1::aptos_governance {
    public fun add_approved_script_hash(proposal_id: u64)
}
```

<a id="0x1_aptos_governance_resolve"></a>

## Function `resolve`

Resolve a successful single&#45;step proposal. This would fail if the proposal is not successful (not enough votes or more no
than yes).

```move
module 0x1::aptos_governance {
    public fun resolve(proposal_id: u64, signer_address: address): signer
}
```

<a id="0x1_aptos_governance_resolve_multi_step_proposal"></a>

## Function `resolve_multi_step_proposal`

Resolve a successful multi&#45;step proposal. This would fail if the proposal is not successful.

```move
module 0x1::aptos_governance {
    public fun resolve_multi_step_proposal(proposal_id: u64, signer_address: address, next_execution_hash: vector<u8>): signer
}
```

<a id="0x1_aptos_governance_remove_approved_hash"></a>

## Function `remove_approved_hash`

Remove an approved proposal&apos;s execution script hash.

```move
module 0x1::aptos_governance {
    public fun remove_approved_hash(proposal_id: u64)
}
```

<a id="0x1_aptos_governance_reconfigure"></a>

## Function `reconfigure`

Manually reconfigure. Called at the end of a governance txn that alters on&#45;chain configs.

WARNING: this function always ensures a reconfiguration starts, but when the reconfiguration finishes depends.
&#45; If feature `RECONFIGURE_WITH_DKG` is disabled, it finishes immediately.
&#45; At the end of the calling transaction, we will be in a new epoch.
&#45; If feature `RECONFIGURE_WITH_DKG` is enabled, it starts DKG, and the new epoch will start in a block prologue after DKG finishes.

This behavior affects when an update of an on&#45;chain config (e.g. `ConsensusConfig`, `Features`) takes effect,
since such updates are applied whenever we enter an new epoch.

```move
module 0x1::aptos_governance {
    public entry fun reconfigure(aptos_framework: &signer)
}
```

<a id="0x1_aptos_governance_force_end_epoch"></a>

## Function `force_end_epoch`

Change epoch immediately.
If `RECONFIGURE_WITH_DKG` is enabled and we are in the middle of a DKG,
stop waiting for DKG and enter the new epoch without randomness.

WARNING: currently only used by tests. In most cases you should use `reconfigure()` instead.
TODO: migrate these tests to be aware of async reconfiguration.

```move
module 0x1::aptos_governance {
    public entry fun force_end_epoch(aptos_framework: &signer)
}
```

<a id="0x1_aptos_governance_force_end_epoch_test_only"></a>

## Function `force_end_epoch_test_only`

`force_end_epoch()` equivalent but only called in testnet,
where the core resources account exists and has been granted power to mint Aptos coins.

```move
module 0x1::aptos_governance {
    public entry fun force_end_epoch_test_only(aptos_framework: &signer)
}
```

<a id="0x1_aptos_governance_toggle_features"></a>

## Function `toggle_features`

Update feature flags and also trigger reconfiguration.

```move
module 0x1::aptos_governance {
    public fun toggle_features(aptos_framework: &signer, enable: vector<u64>, disable: vector<u64>)
}
```

<a id="0x1_aptos_governance_get_signer_testnet_only"></a>

## Function `get_signer_testnet_only`

Only called in testnet where the core resources account exists and has been granted power to mint Aptos coins.

```move
module 0x1::aptos_governance {
    public fun get_signer_testnet_only(core_resources: &signer, signer_address: address): signer
}
```

<a id="0x1_aptos_governance_get_voting_power"></a>

## Function `get_voting_power`

Return the voting power a stake pool has with respect to governance proposals.

```move
module 0x1::aptos_governance {
    #[view]
    public fun get_voting_power(pool_address: address): u64
}
```

<a id="0x1_aptos_governance_initialize_for_verification"></a>

## Function `initialize_for_verification`

```move
module 0x1::aptos_governance {
    #[verify_only]
    public fun initialize_for_verification(aptos_framework: &signer, min_voting_threshold: u128, required_proposer_stake: u64, voting_duration_secs: u64)
}
```
