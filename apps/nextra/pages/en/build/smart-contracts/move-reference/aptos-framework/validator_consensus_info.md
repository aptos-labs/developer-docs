<a id="0x1_validator_consensus_info"></a>

# Module `0x1::validator_consensus_info`

Common type: `ValidatorConsensusInfo`.

- [Struct `ValidatorConsensusInfo`](#0x1_validator_consensus_info_ValidatorConsensusInfo)
- [Function `default`](#0x1_validator_consensus_info_default)
- [Function `new`](#0x1_validator_consensus_info_new)
- [Function `get_addr`](#0x1_validator_consensus_info_get_addr)
- [Function `get_pk_bytes`](#0x1_validator_consensus_info_get_pk_bytes)
- [Function `get_voting_power`](#0x1_validator_consensus_info_get_voting_power)

```move
module 0x1::validator_consensus_info {
}
```

<a id="0x1_validator_consensus_info_ValidatorConsensusInfo"></a>

## Struct `ValidatorConsensusInfo`

Information about a validator that participates consensus.

```move
module 0x1::validator_consensus_info {
    struct ValidatorConsensusInfo has copy, drop, store
}
```

<a id="0x1_validator_consensus_info_default"></a>

## Function `default`

Create a default `ValidatorConsensusInfo` object. Value may be invalid. Only for place holding prupose.

```move
module 0x1::validator_consensus_info {
    public fun default(): validator_consensus_info::ValidatorConsensusInfo
}
```

<a id="0x1_validator_consensus_info_new"></a>

## Function `new`

Create a `ValidatorConsensusInfo` object.

```move
module 0x1::validator_consensus_info {
    public fun new(addr: address, pk_bytes: vector<u8>, voting_power: u64): validator_consensus_info::ValidatorConsensusInfo
}
```

<a id="0x1_validator_consensus_info_get_addr"></a>

## Function `get_addr`

Get `ValidatorConsensusInfo.addr`.

```move
module 0x1::validator_consensus_info {
    public fun get_addr(vci: &validator_consensus_info::ValidatorConsensusInfo): address
}
```

<a id="0x1_validator_consensus_info_get_pk_bytes"></a>

## Function `get_pk_bytes`

Get `ValidatorConsensusInfo.pk_bytes`.

```move
module 0x1::validator_consensus_info {
    public fun get_pk_bytes(vci: &validator_consensus_info::ValidatorConsensusInfo): vector<u8>
}
```

<a id="0x1_validator_consensus_info_get_voting_power"></a>

## Function `get_voting_power`

Get `ValidatorConsensusInfo.voting_power`.

```move
module 0x1::validator_consensus_info {
    public fun get_voting_power(vci: &validator_consensus_info::ValidatorConsensusInfo): u64
}
```
