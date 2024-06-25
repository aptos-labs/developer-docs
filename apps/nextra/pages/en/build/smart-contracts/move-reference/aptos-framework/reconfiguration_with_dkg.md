<a id="0x1_reconfiguration_with_dkg"></a>

# Module `0x1::reconfiguration_with_dkg`

Reconfiguration with DKG helper functions.

- [Function `try_start`](#0x1_reconfiguration_with_dkg_try_start)
- [Function `finish`](#0x1_reconfiguration_with_dkg_finish)

```move
module 0x1::reconfiguration_with_dkg {
    use 0x1::consensus_config;
    use 0x1::dkg;
    use 0x1::execution_config;
    use 0x1::features;
    use 0x1::gas_schedule;
    use 0x1::jwk_consensus_config;
    use 0x1::jwks;
    use 0x1::keyless_account;
    use 0x1::option;
    use 0x1::randomness_api_v0_config;
    use 0x1::randomness_config;
    use 0x1::randomness_config_seqnum;
    use 0x1::reconfiguration;
    use 0x1::reconfiguration_state;
    use 0x1::stake;
    use 0x1::system_addresses;
    use 0x1::validator_consensus_info;
    use 0x1::version;
}
```

<a id="0x1_reconfiguration_with_dkg_try_start"></a>

## Function `try_start`

Trigger a reconfiguration with DKG.
Do nothing if one is already in progress.

```move
module 0x1::reconfiguration_with_dkg {
    public(friend) fun try_start()
}
```

<a id="0x1_reconfiguration_with_dkg_finish"></a>

## Function `finish`

Clear incomplete DKG session, if it exists.
Apply buffered on&#45;chain configs (except for ValidatorSet, which is done inside `reconfiguration::reconfigure()`).
Re&#45;enable validator set changes.
Run the default reconfiguration to enter the new epoch.

```move
module 0x1::reconfiguration_with_dkg {
    public(friend) fun finish(framework: &signer)
}
```
