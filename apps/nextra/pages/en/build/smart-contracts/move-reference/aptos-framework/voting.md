<a id="0x1_voting"></a>

# Module `0x1::voting`

This is the general Voting module that can be used as part of a DAO Governance. Voting is designed to be used by
standalone governance modules, who has full control over the voting flow and is responsible for voting power
calculation and including proper capabilities when creating the proposal so resolution can go through.
On&#45;chain governance of the Aptos network also uses Voting.

The voting flow:

1. The Voting module can be deployed at a known address (e.g. 0x1 for Aptos on&#45;chain governance)
2. The governance module, e.g. AptosGovernance, can be deployed later and define a GovernanceProposal resource type
   that can also contain other information such as Capability resource for authorization.
3. The governance module&apos;s owner can then register the ProposalType with Voting. This also hosts the proposal list
   (forum) on the calling account.
4. A proposer, through the governance module, can call Voting::create_proposal to create a proposal. create_proposal
   cannot be called directly not through the governance module. A script hash of the resolution script that can later
   be called to execute the proposal is required.
5. A voter, through the governance module, can call Voting::vote on a proposal. vote requires passing a &amp;ProposalType
   and thus only the governance module that registers ProposalType can call vote.
6. Once the proposal&apos;s expiration time has passed and more than the defined threshold has voted yes on the proposal,
   anyone can call resolve which returns the content of the proposal (of type ProposalType) that can be used to execute.
7. Only the resolution script with the same script hash specified in the proposal can call Voting::resolve as part of
   the resolution process.

- [Struct `Proposal`](#0x1_voting_Proposal)
- [Resource `VotingForum`](#0x1_voting_VotingForum)
- [Struct `VotingEvents`](#0x1_voting_VotingEvents)
- [Struct `CreateProposal`](#0x1_voting_CreateProposal)
- [Struct `RegisterForum`](#0x1_voting_RegisterForum)
- [Struct `Vote`](#0x1_voting_Vote)
- [Struct `ResolveProposal`](#0x1_voting_ResolveProposal)
- [Struct `CreateProposalEvent`](#0x1_voting_CreateProposalEvent)
- [Struct `RegisterForumEvent`](#0x1_voting_RegisterForumEvent)
- [Struct `VoteEvent`](#0x1_voting_VoteEvent)
- [Constants](#@Constants_0)
- [Function `register`](#0x1_voting_register)
- [Function `create_proposal`](#0x1_voting_create_proposal)
- [Function `create_proposal_v2`](#0x1_voting_create_proposal_v2)
- [Function `vote`](#0x1_voting_vote)
- [Function `resolve`](#0x1_voting_resolve)
- [Function `resolve_proposal_v2`](#0x1_voting_resolve_proposal_v2)
- [Function `next_proposal_id`](#0x1_voting_next_proposal_id)
- [Function `get_proposer`](#0x1_voting_get_proposer)
- [Function `is_voting_closed`](#0x1_voting_is_voting_closed)
- [Function `can_be_resolved_early`](#0x1_voting_can_be_resolved_early)
- [Function `get_proposal_metadata`](#0x1_voting_get_proposal_metadata)
- [Function `get_proposal_metadata_value`](#0x1_voting_get_proposal_metadata_value)
- [Function `get_proposal_state`](#0x1_voting_get_proposal_state)
- [Function `get_proposal_creation_secs`](#0x1_voting_get_proposal_creation_secs)
- [Function `get_proposal_expiration_secs`](#0x1_voting_get_proposal_expiration_secs)
- [Function `get_execution_hash`](#0x1_voting_get_execution_hash)
- [Function `get_min_vote_threshold`](#0x1_voting_get_min_vote_threshold)
- [Function `get_early_resolution_vote_threshold`](#0x1_voting_get_early_resolution_vote_threshold)
- [Function `get_votes`](#0x1_voting_get_votes)
- [Function `is_resolved`](#0x1_voting_is_resolved)
- [Function `get_resolution_time_secs`](#0x1_voting_get_resolution_time_secs)
- [Function `is_multi_step_proposal_in_execution`](#0x1_voting_is_multi_step_proposal_in_execution)

```move
module 0x1::voting {
    use 0x1::account;
    use 0x1::bcs;
    use 0x1::error;
    use 0x1::event;
    use 0x1::features;
    use 0x1::from_bcs;
    use 0x1::option;
    use 0x1::signer;
    use 0x1::simple_map;
    use 0x1::string;
    use 0x1::table;
    use 0x1::timestamp;
    use 0x1::transaction_context;
    use 0x1::type_info;
}
```

<a id="0x1_voting_Proposal"></a>

## Struct `Proposal`

Extra metadata (e.g. description, code url) can be part of the ProposalType struct.

```move
module 0x1::voting {
    struct Proposal<ProposalType: store> has store
}
```

<a id="0x1_voting_VotingForum"></a>

## Resource `VotingForum`

```move
module 0x1::voting {
    struct VotingForum<ProposalType: store> has key
}
```

<a id="0x1_voting_VotingEvents"></a>

## Struct `VotingEvents`

```move
module 0x1::voting {
    struct VotingEvents has store
}
```

<a id="0x1_voting_CreateProposal"></a>

## Struct `CreateProposal`

```move
module 0x1::voting {
    #[event]
    struct CreateProposal has drop, store
}
```

<a id="0x1_voting_RegisterForum"></a>

## Struct `RegisterForum`

```move
module 0x1::voting {
    #[event]
    struct RegisterForum has drop, store
}
```

<a id="0x1_voting_Vote"></a>

## Struct `Vote`

```move
module 0x1::voting {
    #[event]
    struct Vote has drop, store
}
```

<a id="0x1_voting_ResolveProposal"></a>

## Struct `ResolveProposal`

```move
module 0x1::voting {
    #[event]
    struct ResolveProposal has drop, store
}
```

<a id="0x1_voting_CreateProposalEvent"></a>

## Struct `CreateProposalEvent`

```move
module 0x1::voting {
    struct CreateProposalEvent has drop, store
}
```

<a id="0x1_voting_RegisterForumEvent"></a>

## Struct `RegisterForumEvent`

```move
module 0x1::voting {
    struct RegisterForumEvent has drop, store
}
```

<a id="0x1_voting_VoteEvent"></a>

## Struct `VoteEvent`

```move
module 0x1::voting {
    struct VoteEvent has drop, store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_voting_EINVALID_MIN_VOTE_THRESHOLD"></a>

Minimum vote threshold cannot be higher than early resolution threshold.

```move
module 0x1::voting {
    const EINVALID_MIN_VOTE_THRESHOLD: u64 = 7;
}
```

<a id="0x1_voting_EMULTI_STEP_PROPOSAL_CANNOT_USE_SINGLE_STEP_RESOLVE_FUNCTION"></a>

If a proposal is multi&#45;step, we need to use `resolve_proposal_v2()` to resolve it.
If we use `resolve()` to resolve a multi&#45;step proposal, it will fail with EMULTI_STEP_PROPOSAL_CANNOT_USE_SINGLE_STEP_RESOLVE_FUNCTION.

```move
module 0x1::voting {
    const EMULTI_STEP_PROPOSAL_CANNOT_USE_SINGLE_STEP_RESOLVE_FUNCTION: u64 = 10;
}
```

<a id="0x1_voting_EMULTI_STEP_PROPOSAL_IN_EXECUTION"></a>

Cannot vote if the specified multi&#45;step proposal is in execution.

```move
module 0x1::voting {
    const EMULTI_STEP_PROPOSAL_IN_EXECUTION: u64 = 9;
}
```

<a id="0x1_voting_EPROPOSAL_ALREADY_RESOLVED"></a>

Proposal cannot be resolved more than once

```move
module 0x1::voting {
    const EPROPOSAL_ALREADY_RESOLVED: u64 = 3;
}
```

<a id="0x1_voting_EPROPOSAL_CANNOT_BE_RESOLVED"></a>

Proposal cannot be resolved. Either voting duration has not passed, not enough votes, or fewer yes than no votes

```move
module 0x1::voting {
    const EPROPOSAL_CANNOT_BE_RESOLVED: u64 = 2;
}
```

<a id="0x1_voting_EPROPOSAL_EMPTY_EXECUTION_HASH"></a>

Proposal cannot contain an empty execution script hash

```move
module 0x1::voting {
    const EPROPOSAL_EMPTY_EXECUTION_HASH: u64 = 4;
}
```

<a id="0x1_voting_EPROPOSAL_EXECUTION_HASH_NOT_MATCHING"></a>

Current script&apos;s execution hash does not match the specified proposal&apos;s

```move
module 0x1::voting {
    const EPROPOSAL_EXECUTION_HASH_NOT_MATCHING: u64 = 1;
}
```

<a id="0x1_voting_EPROPOSAL_IS_SINGLE_STEP"></a>

Cannot call `is_multi_step_proposal_in_execution()` on single&#45;step proposals.

```move
module 0x1::voting {
    const EPROPOSAL_IS_SINGLE_STEP: u64 = 12;
}
```

<a id="0x1_voting_EPROPOSAL_VOTING_ALREADY_ENDED"></a>

Proposal&apos;s voting period has already ended.

```move
module 0x1::voting {
    const EPROPOSAL_VOTING_ALREADY_ENDED: u64 = 5;
}
```

<a id="0x1_voting_ERESOLUTION_CANNOT_BE_ATOMIC"></a>

Resolution of a proposal cannot happen atomically in the same transaction as the last vote.

```move
module 0x1::voting {
    const ERESOLUTION_CANNOT_BE_ATOMIC: u64 = 8;
}
```

<a id="0x1_voting_ESINGLE_STEP_PROPOSAL_CANNOT_HAVE_NEXT_EXECUTION_HASH"></a>

If we call `resolve_proposal_v2()` to resolve a single&#45;step proposal, the `next_execution_hash` parameter should be an empty vector.

```move
module 0x1::voting {
    const ESINGLE_STEP_PROPOSAL_CANNOT_HAVE_NEXT_EXECUTION_HASH: u64 = 11;
}
```

<a id="0x1_voting_EVOTING_FORUM_ALREADY_REGISTERED"></a>

Voting forum has already been registered.

```move
module 0x1::voting {
    const EVOTING_FORUM_ALREADY_REGISTERED: u64 = 6;
}
```

<a id="0x1_voting_IS_MULTI_STEP_PROPOSAL_IN_EXECUTION_KEY"></a>

Key used to track if the multi&#45;step proposal is in execution / resolving in progress.

```move
module 0x1::voting {
    const IS_MULTI_STEP_PROPOSAL_IN_EXECUTION_KEY: vector<u8> = [73, 83, 95, 77, 85, 76, 84, 73, 95, 83, 84, 69, 80, 95, 80, 82, 79, 80, 79, 83, 65, 76, 95, 73, 78, 95, 69, 88, 69, 67, 85, 84, 73, 79, 78];
}
```

<a id="0x1_voting_IS_MULTI_STEP_PROPOSAL_KEY"></a>

Key used to track if the proposal is multi&#45;step

```move
module 0x1::voting {
    const IS_MULTI_STEP_PROPOSAL_KEY: vector<u8> = [73, 83, 95, 77, 85, 76, 84, 73, 95, 83, 84, 69, 80, 95, 80, 82, 79, 80, 79, 83, 65, 76, 95, 75, 69, 89];
}
```

<a id="0x1_voting_PROPOSAL_STATE_FAILED"></a>

Proposal has failed because either the min vote threshold is not met or majority voted no.

```move
module 0x1::voting {
    const PROPOSAL_STATE_FAILED: u64 = 3;
}
```

<a id="0x1_voting_PROPOSAL_STATE_PENDING"></a>

ProposalStateEnum representing proposal state.

```move
module 0x1::voting {
    const PROPOSAL_STATE_PENDING: u64 = 0;
}
```

<a id="0x1_voting_PROPOSAL_STATE_SUCCEEDED"></a>

```move
module 0x1::voting {
    const PROPOSAL_STATE_SUCCEEDED: u64 = 1;
}
```

<a id="0x1_voting_RESOLVABLE_TIME_METADATA_KEY"></a>

Key used to track the resolvable time in the proposal&apos;s metadata.

```move
module 0x1::voting {
    const RESOLVABLE_TIME_METADATA_KEY: vector<u8> = [82, 69, 83, 79, 76, 86, 65, 66, 76, 69, 95, 84, 73, 77, 69, 95, 77, 69, 84, 65, 68, 65, 84, 65, 95, 75, 69, 89];
}
```

<a id="0x1_voting_register"></a>

## Function `register`

```move
module 0x1::voting {
    public fun register<ProposalType: store>(account: &signer)
}
```

<a id="0x1_voting_create_proposal"></a>

## Function `create_proposal`

Create a single&#45;step proposal with the given parameters

@param voting_forum_address The forum&apos;s address where the proposal will be stored.
@param execution_content The execution content that will be given back at resolution time. This can contain
data such as a capability resource used to scope the execution.
@param execution_hash The hash for the execution script module. Only the same exact script module can resolve
this proposal.
@param min_vote_threshold The minimum number of votes needed to consider this proposal successful.
@param expiration_secs The time in seconds at which the proposal expires and can potentially be resolved.
@param early_resolution_vote_threshold The vote threshold for early resolution of this proposal.
@param metadata A simple_map that stores information about this proposal.
@return The proposal id.

```move
module 0x1::voting {
    public fun create_proposal<ProposalType: store>(proposer: address, voting_forum_address: address, execution_content: ProposalType, execution_hash: vector<u8>, min_vote_threshold: u128, expiration_secs: u64, early_resolution_vote_threshold: option::Option<u128>, metadata: simple_map::SimpleMap<string::String, vector<u8>>): u64
}
```

<a id="0x1_voting_create_proposal_v2"></a>

## Function `create_proposal_v2`

Create a single&#45;step or a multi&#45;step proposal with the given parameters

@param voting_forum_address The forum&apos;s address where the proposal will be stored.
@param execution_content The execution content that will be given back at resolution time. This can contain
data such as a capability resource used to scope the execution.
@param execution_hash The sha&#45;256 hash for the execution script module. Only the same exact script module can
resolve this proposal.
@param min_vote_threshold The minimum number of votes needed to consider this proposal successful.
@param expiration_secs The time in seconds at which the proposal expires and can potentially be resolved.
@param early_resolution_vote_threshold The vote threshold for early resolution of this proposal.
@param metadata A simple_map that stores information about this proposal.
@param is_multi_step_proposal A bool value that indicates if the proposal is single&#45;step or multi&#45;step.
@return The proposal id.

```move
module 0x1::voting {
    public fun create_proposal_v2<ProposalType: store>(proposer: address, voting_forum_address: address, execution_content: ProposalType, execution_hash: vector<u8>, min_vote_threshold: u128, expiration_secs: u64, early_resolution_vote_threshold: option::Option<u128>, metadata: simple_map::SimpleMap<string::String, vector<u8>>, is_multi_step_proposal: bool): u64
}
```

<a id="0x1_voting_vote"></a>

## Function `vote`

Vote on the given proposal.

@param \_proof Required so only the governance module that defines ProposalType can initiate voting.
This guarantees that voting eligibility and voting power are controlled by the right governance.
@param voting_forum_address The address of the forum where the proposals are stored.
@param proposal_id The proposal id.
@param num_votes Number of votes. Voting power should be calculated by governance.
@param should_pass Whether the votes are for yes or no.

```move
module 0x1::voting {
    public fun vote<ProposalType: store>(_proof: &ProposalType, voting_forum_address: address, proposal_id: u64, num_votes: u64, should_pass: bool)
}
```

<a id="0x1_voting_resolve"></a>

## Function `resolve`

Resolve a single&#45;step proposal with given id. Can only be done if there are at least as many votes as min required and
there are more yes votes than no. If either of these conditions is not met, this will revert.

@param voting_forum_address The address of the forum where the proposals are stored.
@param proposal_id The proposal id.

```move
module 0x1::voting {
    public fun resolve<ProposalType: store>(voting_forum_address: address, proposal_id: u64): ProposalType
}
```

<a id="0x1_voting_resolve_proposal_v2"></a>

## Function `resolve_proposal_v2`

Resolve a single&#45;step or a multi&#45;step proposal with the given id.
Can only be done if there are at least as many votes as min required and
there are more yes votes than no. If either of these conditions is not met, this will revert.

@param voting_forum_address The address of the forum where the proposals are stored.
@param proposal_id The proposal id.
@param next_execution_hash The next execution hash if the given proposal is multi&#45;step.

```move
module 0x1::voting {
    public fun resolve_proposal_v2<ProposalType: store>(voting_forum_address: address, proposal_id: u64, next_execution_hash: vector<u8>)
}
```

<a id="0x1_voting_next_proposal_id"></a>

## Function `next_proposal_id`

Return the next unassigned proposal id

```move
module 0x1::voting {
    #[view]
    public fun next_proposal_id<ProposalType: store>(voting_forum_address: address): u64
}
```

<a id="0x1_voting_get_proposer"></a>

## Function `get_proposer`

```move
module 0x1::voting {
    #[view]
    public fun get_proposer<ProposalType: store>(voting_forum_address: address, proposal_id: u64): address
}
```

<a id="0x1_voting_is_voting_closed"></a>

## Function `is_voting_closed`

```move
module 0x1::voting {
    #[view]
    public fun is_voting_closed<ProposalType: store>(voting_forum_address: address, proposal_id: u64): bool
}
```

<a id="0x1_voting_can_be_resolved_early"></a>

## Function `can_be_resolved_early`

Return true if the proposal has reached early resolution threshold (if specified).

```move
module 0x1::voting {
    public fun can_be_resolved_early<ProposalType: store>(proposal: &voting::Proposal<ProposalType>): bool
}
```

<a id="0x1_voting_get_proposal_metadata"></a>

## Function `get_proposal_metadata`

```move
module 0x1::voting {
    #[view]
    public fun get_proposal_metadata<ProposalType: store>(voting_forum_address: address, proposal_id: u64): simple_map::SimpleMap<string::String, vector<u8>>
}
```

<a id="0x1_voting_get_proposal_metadata_value"></a>

## Function `get_proposal_metadata_value`

```move
module 0x1::voting {
    #[view]
    public fun get_proposal_metadata_value<ProposalType: store>(voting_forum_address: address, proposal_id: u64, metadata_key: string::String): vector<u8>
}
```

<a id="0x1_voting_get_proposal_state"></a>

## Function `get_proposal_state`

Return the state of the proposal with given id.

@param voting_forum_address The address of the forum where the proposals are stored.
@param proposal_id The proposal id.
@return Proposal state as an enum value.

```move
module 0x1::voting {
    #[view]
    public fun get_proposal_state<ProposalType: store>(voting_forum_address: address, proposal_id: u64): u64
}
```

<a id="0x1_voting_get_proposal_creation_secs"></a>

## Function `get_proposal_creation_secs`

Return the proposal&apos;s creation time.

```move
module 0x1::voting {
    #[view]
    public fun get_proposal_creation_secs<ProposalType: store>(voting_forum_address: address, proposal_id: u64): u64
}
```

<a id="0x1_voting_get_proposal_expiration_secs"></a>

## Function `get_proposal_expiration_secs`

Return the proposal&apos;s expiration time.

```move
module 0x1::voting {
    #[view]
    public fun get_proposal_expiration_secs<ProposalType: store>(voting_forum_address: address, proposal_id: u64): u64
}
```

<a id="0x1_voting_get_execution_hash"></a>

## Function `get_execution_hash`

Return the proposal&apos;s execution hash.

```move
module 0x1::voting {
    #[view]
    public fun get_execution_hash<ProposalType: store>(voting_forum_address: address, proposal_id: u64): vector<u8>
}
```

<a id="0x1_voting_get_min_vote_threshold"></a>

## Function `get_min_vote_threshold`

Return the proposal&apos;s minimum vote threshold

```move
module 0x1::voting {
    #[view]
    public fun get_min_vote_threshold<ProposalType: store>(voting_forum_address: address, proposal_id: u64): u128
}
```

<a id="0x1_voting_get_early_resolution_vote_threshold"></a>

## Function `get_early_resolution_vote_threshold`

Return the proposal&apos;s early resolution minimum vote threshold (optionally set)

```move
module 0x1::voting {
    #[view]
    public fun get_early_resolution_vote_threshold<ProposalType: store>(voting_forum_address: address, proposal_id: u64): option::Option<u128>
}
```

<a id="0x1_voting_get_votes"></a>

## Function `get_votes`

Return the proposal&apos;s current vote count (yes_votes, no_votes)

```move
module 0x1::voting {
    #[view]
    public fun get_votes<ProposalType: store>(voting_forum_address: address, proposal_id: u64): (u128, u128)
}
```

<a id="0x1_voting_is_resolved"></a>

## Function `is_resolved`

Return true if the governance proposal has already been resolved.

```move
module 0x1::voting {
    #[view]
    public fun is_resolved<ProposalType: store>(voting_forum_address: address, proposal_id: u64): bool
}
```

<a id="0x1_voting_get_resolution_time_secs"></a>

## Function `get_resolution_time_secs`

```move
module 0x1::voting {
    #[view]
    public fun get_resolution_time_secs<ProposalType: store>(voting_forum_address: address, proposal_id: u64): u64
}
```

<a id="0x1_voting_is_multi_step_proposal_in_execution"></a>

## Function `is_multi_step_proposal_in_execution`

Return true if the multi&#45;step governance proposal is in execution.

```move
module 0x1::voting {
    #[view]
    public fun is_multi_step_proposal_in_execution<ProposalType: store>(voting_forum_address: address, proposal_id: u64): bool
}
```
