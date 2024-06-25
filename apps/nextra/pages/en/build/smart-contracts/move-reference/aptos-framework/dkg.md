<a id="0x1_dkg"></a>

# Module `0x1::dkg`

DKG on&#45;chain states and helper functions.

- [Struct `DKGSessionMetadata`](#0x1_dkg_DKGSessionMetadata)
- [Struct `DKGStartEvent`](#0x1_dkg_DKGStartEvent)
- [Struct `DKGSessionState`](#0x1_dkg_DKGSessionState)
- [Resource `DKGState`](#0x1_dkg_DKGState)
- [Constants](#@Constants_0)
- [Function `initialize`](#0x1_dkg_initialize)
- [Function `start`](#0x1_dkg_start)
- [Function `finish`](#0x1_dkg_finish)
- [Function `try_clear_incomplete_session`](#0x1_dkg_try_clear_incomplete_session)
- [Function `incomplete_session`](#0x1_dkg_incomplete_session)
- [Function `session_dealer_epoch`](#0x1_dkg_session_dealer_epoch)

```move
module 0x1::dkg {
    use 0x1::error;
    use 0x1::event;
    use 0x1::option;
    use 0x1::randomness_config;
    use 0x1::system_addresses;
    use 0x1::timestamp;
    use 0x1::validator_consensus_info;
}
```

<a id="0x1_dkg_DKGSessionMetadata"></a>

## Struct `DKGSessionMetadata`

This can be considered as the public input of DKG.

```move
module 0x1::dkg {
    struct DKGSessionMetadata has copy, drop, store
}
```

<a id="0x1_dkg_DKGStartEvent"></a>

## Struct `DKGStartEvent`

```move
module 0x1::dkg {
    #[event]
    struct DKGStartEvent has drop, store
}
```

<a id="0x1_dkg_DKGSessionState"></a>

## Struct `DKGSessionState`

The input and output of a DKG session.
The validator set of epoch `x` works together for an DKG output for the target validator set of epoch `x+1`.

```move
module 0x1::dkg {
    struct DKGSessionState has copy, drop, store
}
```

<a id="0x1_dkg_DKGState"></a>

## Resource `DKGState`

The completed and in&#45;progress DKG sessions.

```move
module 0x1::dkg {
    struct DKGState has key
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_dkg_EDKG_IN_PROGRESS"></a>

```move
module 0x1::dkg {
    const EDKG_IN_PROGRESS: u64 = 1;
}
```

<a id="0x1_dkg_EDKG_NOT_IN_PROGRESS"></a>

```move
module 0x1::dkg {
    const EDKG_NOT_IN_PROGRESS: u64 = 2;
}
```

<a id="0x1_dkg_initialize"></a>

## Function `initialize`

Called in genesis to initialize on&#45;chain states.

```move
module 0x1::dkg {
    public fun initialize(aptos_framework: &signer)
}
```

<a id="0x1_dkg_start"></a>

## Function `start`

Mark on&#45;chain DKG state as in&#45;progress. Notify validators to start DKG.
Abort if a DKG is already in progress.

```move
module 0x1::dkg {
    public(friend) fun start(dealer_epoch: u64, randomness_config: randomness_config::RandomnessConfig, dealer_validator_set: vector<validator_consensus_info::ValidatorConsensusInfo>, target_validator_set: vector<validator_consensus_info::ValidatorConsensusInfo>)
}
```

<a id="0x1_dkg_finish"></a>

## Function `finish`

Put a transcript into the currently incomplete DKG session, then mark it completed.

Abort if DKG is not in progress.

```move
module 0x1::dkg {
    public(friend) fun finish(transcript: vector<u8>)
}
```

<a id="0x1_dkg_try_clear_incomplete_session"></a>

## Function `try_clear_incomplete_session`

Delete the currently incomplete session, if it exists.

```move
module 0x1::dkg {
    public fun try_clear_incomplete_session(fx: &signer)
}
```

<a id="0x1_dkg_incomplete_session"></a>

## Function `incomplete_session`

Return the incomplete DKG session state, if it exists.

```move
module 0x1::dkg {
    public fun incomplete_session(): option::Option<dkg::DKGSessionState>
}
```

<a id="0x1_dkg_session_dealer_epoch"></a>

## Function `session_dealer_epoch`

Return the dealer epoch of a `DKGSessionState`.

```move
module 0x1::dkg {
    public fun session_dealer_epoch(session: &dkg::DKGSessionState): u64
}
```
