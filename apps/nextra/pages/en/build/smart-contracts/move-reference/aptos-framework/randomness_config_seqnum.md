<a id="0x1_randomness_config_seqnum"></a>

# Module `0x1::randomness_config_seqnum`

Randomness stall recovery utils.

When randomness generation is stuck due to a bug, the chain is also stuck. Below is the recovery procedure.

1. Ensure more than 2/3 stakes are stuck at the same version.
1. Every validator restarts with `randomness_override_seq_num` set to `X+1` in the node config file,
   where `X` is the current `RandomnessConfigSeqNum` on chain.
1. The chain should then be unblocked.
1. Once the bug is fixed and the binary &#43; framework have been patched,
   a governance proposal is needed to set `RandomnessConfigSeqNum` to be `X+2`.

- [Resource `RandomnessConfigSeqNum`](#0x1_randomness_config_seqnum_RandomnessConfigSeqNum)
- [Function `set_for_next_epoch`](#0x1_randomness_config_seqnum_set_for_next_epoch)
- [Function `initialize`](#0x1_randomness_config_seqnum_initialize)
- [Function `on_new_epoch`](#0x1_randomness_config_seqnum_on_new_epoch)

```move
module 0x1::randomness_config_seqnum {
    use 0x1::config_buffer;
    use 0x1::system_addresses;
}
```

<a id="0x1_randomness_config_seqnum_RandomnessConfigSeqNum"></a>

## Resource `RandomnessConfigSeqNum`

If this seqnum is smaller than a validator local override, the on&#45;chain `RandomnessConfig` will be ignored.
Useful in a chain recovery from randomness stall.

```move
module 0x1::randomness_config_seqnum {
    struct RandomnessConfigSeqNum has drop, store, key
}
```

<a id="0x1_randomness_config_seqnum_set_for_next_epoch"></a>

## Function `set_for_next_epoch`

Update `RandomnessConfigSeqNum`.
Used when re&#45;enable randomness after an emergency randomness disable via local override.

```move
module 0x1::randomness_config_seqnum {
    public fun set_for_next_epoch(framework: &signer, seq_num: u64)
}
```

<a id="0x1_randomness_config_seqnum_initialize"></a>

## Function `initialize`

Initialize the configuration. Used in genesis or governance.

```move
module 0x1::randomness_config_seqnum {
    public fun initialize(framework: &signer)
}
```

<a id="0x1_randomness_config_seqnum_on_new_epoch"></a>

## Function `on_new_epoch`

Only used in reconfigurations to apply the pending `RandomnessConfig`, if there is any.

```move
module 0x1::randomness_config_seqnum {
    public(friend) fun on_new_epoch(framework: &signer)
}
```
