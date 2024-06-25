<a id="0x1_keyless_account"></a>

# Module `0x1::keyless_account`

This module is responsible for configuring keyless blockchain accounts which were introduced in
[AIP&#45;61](https://github.com/aptos-foundation/AIPs/blob/main/aips/aip-61.md).

- [Struct `Group`](#0x1_keyless_account_Group)
- [Resource `Groth16VerificationKey`](#0x1_keyless_account_Groth16VerificationKey)
- [Resource `Configuration`](#0x1_keyless_account_Configuration)
- [Constants](#@Constants_0)
- [Function `new_groth16_verification_key`](#0x1_keyless_account_new_groth16_verification_key)
- [Function `new_configuration`](#0x1_keyless_account_new_configuration)
- [Function `update_groth16_verification_key`](#0x1_keyless_account_update_groth16_verification_key)
- [Function `update_configuration`](#0x1_keyless_account_update_configuration)
- [Function `update_training_wheels`](#0x1_keyless_account_update_training_wheels)
- [Function `update_max_exp_horizon`](#0x1_keyless_account_update_max_exp_horizon)
- [Function `remove_all_override_auds`](#0x1_keyless_account_remove_all_override_auds)
- [Function `add_override_aud`](#0x1_keyless_account_add_override_aud)
- [Function `set_groth16_verification_key_for_next_epoch`](#0x1_keyless_account_set_groth16_verification_key_for_next_epoch)
- [Function `set_configuration_for_next_epoch`](#0x1_keyless_account_set_configuration_for_next_epoch)
- [Function `update_training_wheels_for_next_epoch`](#0x1_keyless_account_update_training_wheels_for_next_epoch)
- [Function `update_max_exp_horizon_for_next_epoch`](#0x1_keyless_account_update_max_exp_horizon_for_next_epoch)
- [Function `remove_all_override_auds_for_next_epoch`](#0x1_keyless_account_remove_all_override_auds_for_next_epoch)
- [Function `add_override_aud_for_next_epoch`](#0x1_keyless_account_add_override_aud_for_next_epoch)
- [Function `on_new_epoch`](#0x1_keyless_account_on_new_epoch)

```move
module 0x1::keyless_account {
    use 0x1::bn254_algebra;
    use 0x1::chain_status;
    use 0x1::config_buffer;
    use 0x1::crypto_algebra;
    use 0x1::ed25519;
    use 0x1::option;
    use 0x1::signer;
    use 0x1::string;
    use 0x1::system_addresses;
}
```

<a id="0x1_keyless_account_Group"></a>

## Struct `Group`

```move
module 0x1::keyless_account {
    #[resource_group(#[scope = global])]
    struct Group
}
```

<a id="0x1_keyless_account_Groth16VerificationKey"></a>

## Resource `Groth16VerificationKey`

The 288&#45;byte Groth16 verification key (VK) for the ZK relation that implements keyless accounts

```move
module 0x1::keyless_account {
    #[resource_group_member(#[group = 0x1::keyless_account::Group])]
    struct Groth16VerificationKey has drop, store, key
}
```

<a id="0x1_keyless_account_Configuration"></a>

## Resource `Configuration`

```move
module 0x1::keyless_account {
    #[resource_group_member(#[group = 0x1::keyless_account::Group])]
    struct Configuration has copy, drop, store, key
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_keyless_account_E_INVALID_BN254_G1_SERIALIZATION"></a>

A serialized BN254 G1 point is invalid.

```move
module 0x1::keyless_account {
    const E_INVALID_BN254_G1_SERIALIZATION: u64 = 2;
}
```

<a id="0x1_keyless_account_E_INVALID_BN254_G2_SERIALIZATION"></a>

A serialized BN254 G2 point is invalid.

```move
module 0x1::keyless_account {
    const E_INVALID_BN254_G2_SERIALIZATION: u64 = 3;
}
```

<a id="0x1_keyless_account_E_TRAINING_WHEELS_PK_WRONG_SIZE"></a>

The training wheels PK needs to be 32 bytes long.

```move
module 0x1::keyless_account {
    const E_TRAINING_WHEELS_PK_WRONG_SIZE: u64 = 1;
}
```

<a id="0x1_keyless_account_new_groth16_verification_key"></a>

## Function `new_groth16_verification_key`

```move
module 0x1::keyless_account {
    public fun new_groth16_verification_key(alpha_g1: vector<u8>, beta_g2: vector<u8>, gamma_g2: vector<u8>, delta_g2: vector<u8>, gamma_abc_g1: vector<vector<u8>>): keyless_account::Groth16VerificationKey
}
```

<a id="0x1_keyless_account_new_configuration"></a>

## Function `new_configuration`

```move
module 0x1::keyless_account {
    public fun new_configuration(override_aud_val: vector<string::String>, max_signatures_per_txn: u16, max_exp_horizon_secs: u64, training_wheels_pubkey: option::Option<vector<u8>>, max_commited_epk_bytes: u16, max_iss_val_bytes: u16, max_extra_field_bytes: u16, max_jwt_header_b64_bytes: u32): keyless_account::Configuration
}
```

<a id="0x1_keyless_account_update_groth16_verification_key"></a>

## Function `update_groth16_verification_key`

Sets the Groth16 verification key, only callable during genesis. To call during governance proposals, use
`set_groth16_verification_key_for_next_epoch`.

WARNING: See `set_groth16_verification_key_for_next_epoch` for caveats.

```move
module 0x1::keyless_account {
    public fun update_groth16_verification_key(fx: &signer, vk: keyless_account::Groth16VerificationKey)
}
```

<a id="0x1_keyless_account_update_configuration"></a>

## Function `update_configuration`

Sets the keyless configuration, only callable during genesis. To call during governance proposals, use
`set_configuration_for_next_epoch`.

WARNING: See `set_configuration_for_next_epoch` for caveats.

```move
module 0x1::keyless_account {
    public fun update_configuration(fx: &signer, config: keyless_account::Configuration)
}
```

<a id="0x1_keyless_account_update_training_wheels"></a>

## Function `update_training_wheels`

```move
module 0x1::keyless_account {
    #[deprecated]
    public fun update_training_wheels(fx: &signer, pk: option::Option<vector<u8>>)
}
```

<a id="0x1_keyless_account_update_max_exp_horizon"></a>

## Function `update_max_exp_horizon`

```move
module 0x1::keyless_account {
    #[deprecated]
    public fun update_max_exp_horizon(fx: &signer, max_exp_horizon_secs: u64)
}
```

<a id="0x1_keyless_account_remove_all_override_auds"></a>

## Function `remove_all_override_auds`

```move
module 0x1::keyless_account {
    #[deprecated]
    public fun remove_all_override_auds(fx: &signer)
}
```

<a id="0x1_keyless_account_add_override_aud"></a>

## Function `add_override_aud`

```move
module 0x1::keyless_account {
    #[deprecated]
    public fun add_override_aud(fx: &signer, aud: string::String)
}
```

<a id="0x1_keyless_account_set_groth16_verification_key_for_next_epoch"></a>

## Function `set_groth16_verification_key_for_next_epoch`

Queues up a change to the Groth16 verification key. The change will only be effective after reconfiguration.
Only callable via governance proposal.

WARNING: To mitigate against DoS attacks, a VK change should be done together with a training wheels PK change,
so that old ZKPs for the old VK cannot be replayed as potentially&#45;valid ZKPs.

WARNING: If a malicious key is set, this would lead to stolen funds.

```move
module 0x1::keyless_account {
    public fun set_groth16_verification_key_for_next_epoch(fx: &signer, vk: keyless_account::Groth16VerificationKey)
}
```

<a id="0x1_keyless_account_set_configuration_for_next_epoch"></a>

## Function `set_configuration_for_next_epoch`

Queues up a change to the keyless configuration. The change will only be effective after reconfiguration. Only
callable via governance proposal.

WARNING: A malicious `Configuration` could lead to DoS attacks, create liveness issues, or enable a malicious
recovery service provider to phish users&apos; accounts.

```move
module 0x1::keyless_account {
    public fun set_configuration_for_next_epoch(fx: &signer, config: keyless_account::Configuration)
}
```

<a id="0x1_keyless_account_update_training_wheels_for_next_epoch"></a>

## Function `update_training_wheels_for_next_epoch`

Convenience method to queue up a change to the training wheels PK. The change will only be effective after
reconfiguration. Only callable via governance proposal.

WARNING: If a malicious key is set, this \*could\* lead to stolen funds.

```move
module 0x1::keyless_account {
    public fun update_training_wheels_for_next_epoch(fx: &signer, pk: option::Option<vector<u8>>)
}
```

<a id="0x1_keyless_account_update_max_exp_horizon_for_next_epoch"></a>

## Function `update_max_exp_horizon_for_next_epoch`

Convenience method to queues up a change to the max expiration horizon. The change will only be effective after
reconfiguration. Only callable via governance proposal.

```move
module 0x1::keyless_account {
    public fun update_max_exp_horizon_for_next_epoch(fx: &signer, max_exp_horizon_secs: u64)
}
```

<a id="0x1_keyless_account_remove_all_override_auds_for_next_epoch"></a>

## Function `remove_all_override_auds_for_next_epoch`

Convenience method to queue up clearing the set of override `aud`&apos;s. The change will only be effective after
reconfiguration. Only callable via governance proposal.

WARNING: When no override `aud` is set, recovery of keyless accounts associated with applications that disappeared
is no longer possible.

```move
module 0x1::keyless_account {
    public fun remove_all_override_auds_for_next_epoch(fx: &signer)
}
```

<a id="0x1_keyless_account_add_override_aud_for_next_epoch"></a>

## Function `add_override_aud_for_next_epoch`

Convenience method to queue up an append to to the set of override `aud`&apos;s. The change will only be effective
after reconfiguration. Only callable via governance proposal.

WARNING: If a malicious override `aud` is set, this \*could\* lead to stolen funds.

```move
module 0x1::keyless_account {
    public fun add_override_aud_for_next_epoch(fx: &signer, aud: string::String)
}
```

<a id="0x1_keyless_account_on_new_epoch"></a>

## Function `on_new_epoch`

Only used in reconfigurations to apply the queued up configuration changes, if there are any.

```move
module 0x1::keyless_account {
    public(friend) fun on_new_epoch(fx: &signer)
}
```
