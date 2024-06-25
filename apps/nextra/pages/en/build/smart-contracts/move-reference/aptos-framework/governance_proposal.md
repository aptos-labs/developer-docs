<a id="0x1_governance_proposal"></a>

# Module `0x1::governance_proposal`

Define the GovernanceProposal that will be used as part of on&#45;chain governance by AptosGovernance.

This is separate from the AptosGovernance module to avoid circular dependency between AptosGovernance and Stake.

- [Struct `GovernanceProposal`](#0x1_governance_proposal_GovernanceProposal)
- [Function `create_proposal`](#0x1_governance_proposal_create_proposal)
- [Function `create_empty_proposal`](#0x1_governance_proposal_create_empty_proposal)

```move
module 0x1::governance_proposal {
}
```

<a id="0x1_governance_proposal_GovernanceProposal"></a>

## Struct `GovernanceProposal`

```move
module 0x1::governance_proposal {
    struct GovernanceProposal has drop, store
}
```

<a id="0x1_governance_proposal_create_proposal"></a>

## Function `create_proposal`

Create and return a GovernanceProposal resource. Can only be called by AptosGovernance

```move
module 0x1::governance_proposal {
    public(friend) fun create_proposal(): governance_proposal::GovernanceProposal
}
```

<a id="0x1_governance_proposal_create_empty_proposal"></a>

## Function `create_empty_proposal`

Useful for AptosGovernance to create an empty proposal as proof.

```move
module 0x1::governance_proposal {
    public(friend) fun create_empty_proposal(): governance_proposal::GovernanceProposal
}
```
