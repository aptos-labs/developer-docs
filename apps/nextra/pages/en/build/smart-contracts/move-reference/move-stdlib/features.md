<a id="0x1_features"></a>

# Module `0x1::features`

Defines feature flags for Aptos. Those are used in Aptos specific implementations of features in
the Move stdlib, the Aptos stdlib, and the Aptos framework.

&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;
Feature Flag Definitions

Each feature flag should come with documentation which justifies the need of the flag.
Introduction of a new feature flag requires approval of framework owners. Be frugal when
introducing new feature flags, as too many can make it hard to understand the code.

Each feature flag should come with a specification of a lifetime:

&#45; a \*transient\* feature flag is only needed until a related code rollout has happened. This
is typically associated with the introduction of new native Move functions, and is only used
from Move code. The owner of this feature is obliged to remove it once this can be done.

&#45; a \*permanent\* feature flag is required to stay around forever. Typically, those flags guard
behavior in native code, and the behavior with or without the feature need to be preserved
for playback.

Note that removing a feature flag still requires the function which tests for the feature
(like `code_dependency_check_enabled` below) to stay around for compatibility reasons, as it
is a public function. However, once the feature flag is disabled, those functions can constantly
return true.

- [Resource `Features`](#0x1_features_Features)
- [Resource `PendingFeatures`](#0x1_features_PendingFeatures)
- [Constants](#@Constants_0)
- [Function `code_dependency_check_enabled`](#0x1_features_code_dependency_check_enabled)
- [Function `treat_friend_as_private`](#0x1_features_treat_friend_as_private)
- [Function `get_sha_512_and_ripemd_160_feature`](#0x1_features_get_sha_512_and_ripemd_160_feature)
- [Function `sha_512_and_ripemd_160_enabled`](#0x1_features_sha_512_and_ripemd_160_enabled)
- [Function `get_aptos_stdlib_chain_id_feature`](#0x1_features_get_aptos_stdlib_chain_id_feature)
- [Function `aptos_stdlib_chain_id_enabled`](#0x1_features_aptos_stdlib_chain_id_enabled)
- [Function `get_vm_binary_format_v6`](#0x1_features_get_vm_binary_format_v6)
- [Function `allow_vm_binary_format_v6`](#0x1_features_allow_vm_binary_format_v6)
- [Function `get_collect_and_distribute_gas_fees_feature`](#0x1_features_get_collect_and_distribute_gas_fees_feature)
- [Function `collect_and_distribute_gas_fees`](#0x1_features_collect_and_distribute_gas_fees)
- [Function `multi_ed25519_pk_validate_v2_feature`](#0x1_features_multi_ed25519_pk_validate_v2_feature)
- [Function `multi_ed25519_pk_validate_v2_enabled`](#0x1_features_multi_ed25519_pk_validate_v2_enabled)
- [Function `get_blake2b_256_feature`](#0x1_features_get_blake2b_256_feature)
- [Function `blake2b_256_enabled`](#0x1_features_blake2b_256_enabled)
- [Function `get_resource_groups_feature`](#0x1_features_get_resource_groups_feature)
- [Function `resource_groups_enabled`](#0x1_features_resource_groups_enabled)
- [Function `get_multisig_accounts_feature`](#0x1_features_get_multisig_accounts_feature)
- [Function `multisig_accounts_enabled`](#0x1_features_multisig_accounts_enabled)
- [Function `get_delegation_pools_feature`](#0x1_features_get_delegation_pools_feature)
- [Function `delegation_pools_enabled`](#0x1_features_delegation_pools_enabled)
- [Function `get_cryptography_algebra_natives_feature`](#0x1_features_get_cryptography_algebra_natives_feature)
- [Function `cryptography_algebra_enabled`](#0x1_features_cryptography_algebra_enabled)
- [Function `get_bls12_381_strutures_feature`](#0x1_features_get_bls12_381_strutures_feature)
- [Function `bls12_381_structures_enabled`](#0x1_features_bls12_381_structures_enabled)
- [Function `get_periodical_reward_rate_decrease_feature`](#0x1_features_get_periodical_reward_rate_decrease_feature)
- [Function `periodical_reward_rate_decrease_enabled`](#0x1_features_periodical_reward_rate_decrease_enabled)
- [Function `get_partial_governance_voting`](#0x1_features_get_partial_governance_voting)
- [Function `partial_governance_voting_enabled`](#0x1_features_partial_governance_voting_enabled)
- [Function `get_delegation_pool_partial_governance_voting`](#0x1_features_get_delegation_pool_partial_governance_voting)
- [Function `delegation_pool_partial_governance_voting_enabled`](#0x1_features_delegation_pool_partial_governance_voting_enabled)
- [Function `fee_payer_enabled`](#0x1_features_fee_payer_enabled)
- [Function `get_auids`](#0x1_features_get_auids)
- [Function `auids_enabled`](#0x1_features_auids_enabled)
- [Function `get_bulletproofs_feature`](#0x1_features_get_bulletproofs_feature)
- [Function `bulletproofs_enabled`](#0x1_features_bulletproofs_enabled)
- [Function `get_signer_native_format_fix_feature`](#0x1_features_get_signer_native_format_fix_feature)
- [Function `signer_native_format_fix_enabled`](#0x1_features_signer_native_format_fix_enabled)
- [Function `get_module_event_feature`](#0x1_features_get_module_event_feature)
- [Function `module_event_enabled`](#0x1_features_module_event_enabled)
- [Function `get_aggregator_v2_api_feature`](#0x1_features_get_aggregator_v2_api_feature)
- [Function `aggregator_v2_api_enabled`](#0x1_features_aggregator_v2_api_enabled)
- [Function `get_aggregator_snapshots_feature`](#0x1_features_get_aggregator_snapshots_feature)
- [Function `aggregator_snapshots_enabled`](#0x1_features_aggregator_snapshots_enabled)
- [Function `get_sponsored_automatic_account_creation`](#0x1_features_get_sponsored_automatic_account_creation)
- [Function `sponsored_automatic_account_creation_enabled`](#0x1_features_sponsored_automatic_account_creation_enabled)
- [Function `get_concurrent_token_v2_feature`](#0x1_features_get_concurrent_token_v2_feature)
- [Function `concurrent_token_v2_enabled`](#0x1_features_concurrent_token_v2_enabled)
- [Function `get_concurrent_assets_feature`](#0x1_features_get_concurrent_assets_feature)
- [Function `concurrent_assets_enabled`](#0x1_features_concurrent_assets_enabled)
- [Function `get_operator_beneficiary_change_feature`](#0x1_features_get_operator_beneficiary_change_feature)
- [Function `operator_beneficiary_change_enabled`](#0x1_features_operator_beneficiary_change_enabled)
- [Function `get_commission_change_delegation_pool_feature`](#0x1_features_get_commission_change_delegation_pool_feature)
- [Function `commission_change_delegation_pool_enabled`](#0x1_features_commission_change_delegation_pool_enabled)
- [Function `get_bn254_strutures_feature`](#0x1_features_get_bn254_strutures_feature)
- [Function `bn254_structures_enabled`](#0x1_features_bn254_structures_enabled)
- [Function `get_reconfigure_with_dkg_feature`](#0x1_features_get_reconfigure_with_dkg_feature)
- [Function `reconfigure_with_dkg_enabled`](#0x1_features_reconfigure_with_dkg_enabled)
- [Function `get_keyless_accounts_feature`](#0x1_features_get_keyless_accounts_feature)
- [Function `keyless_accounts_enabled`](#0x1_features_keyless_accounts_enabled)
- [Function `get_keyless_but_zkless_accounts_feature`](#0x1_features_get_keyless_but_zkless_accounts_feature)
- [Function `keyless_but_zkless_accounts_feature_enabled`](#0x1_features_keyless_but_zkless_accounts_feature_enabled)
- [Function `get_jwk_consensus_feature`](#0x1_features_get_jwk_consensus_feature)
- [Function `jwk_consensus_enabled`](#0x1_features_jwk_consensus_enabled)
- [Function `get_concurrent_fungible_assets_feature`](#0x1_features_get_concurrent_fungible_assets_feature)
- [Function `concurrent_fungible_assets_enabled`](#0x1_features_concurrent_fungible_assets_enabled)
- [Function `is_object_code_deployment_enabled`](#0x1_features_is_object_code_deployment_enabled)
- [Function `get_max_object_nesting_check_feature`](#0x1_features_get_max_object_nesting_check_feature)
- [Function `max_object_nesting_check_enabled`](#0x1_features_max_object_nesting_check_enabled)
- [Function `get_keyless_accounts_with_passkeys_feature`](#0x1_features_get_keyless_accounts_with_passkeys_feature)
- [Function `keyless_accounts_with_passkeys_feature_enabled`](#0x1_features_keyless_accounts_with_passkeys_feature_enabled)
- [Function `get_multisig_v2_enhancement_feature`](#0x1_features_get_multisig_v2_enhancement_feature)
- [Function `multisig_v2_enhancement_feature_enabled`](#0x1_features_multisig_v2_enhancement_feature_enabled)
- [Function `get_delegation_pool_allowlisting_feature`](#0x1_features_get_delegation_pool_allowlisting_feature)
- [Function `delegation_pool_allowlisting_enabled`](#0x1_features_delegation_pool_allowlisting_enabled)
- [Function `get_module_event_migration_feature`](#0x1_features_get_module_event_migration_feature)
- [Function `module_event_migration_enabled`](#0x1_features_module_event_migration_enabled)
- [Function `get_transaction_context_extension_feature`](#0x1_features_get_transaction_context_extension_feature)
- [Function `transaction_context_extension_enabled`](#0x1_features_transaction_context_extension_enabled)
- [Function `get_coin_to_fungible_asset_migration_feature`](#0x1_features_get_coin_to_fungible_asset_migration_feature)
- [Function `coin_to_fungible_asset_migration_feature_enabled`](#0x1_features_coin_to_fungible_asset_migration_feature_enabled)
- [Function `get_primary_apt_fungible_store_at_user_address_feature`](#0x1_features_get_primary_apt_fungible_store_at_user_address_feature)
- [Function `primary_apt_fungible_store_at_user_address_enabled`](#0x1_features_primary_apt_fungible_store_at_user_address_enabled)
- [Function `aggregator_v2_is_at_least_api_enabled`](#0x1_features_aggregator_v2_is_at_least_api_enabled)
- [Function `get_object_native_derived_address_feature`](#0x1_features_get_object_native_derived_address_feature)
- [Function `object_native_derived_address_enabled`](#0x1_features_object_native_derived_address_enabled)
- [Function `get_dispatchable_fungible_asset_feature`](#0x1_features_get_dispatchable_fungible_asset_feature)
- [Function `dispatchable_fungible_asset_enabled`](#0x1_features_dispatchable_fungible_asset_enabled)
- [Function `get_new_accounts_default_to_fa_apt_store_feature`](#0x1_features_get_new_accounts_default_to_fa_apt_store_feature)
- [Function `new_accounts_default_to_fa_apt_store_enabled`](#0x1_features_new_accounts_default_to_fa_apt_store_enabled)
- [Function `get_operations_default_to_fa_apt_store_feature`](#0x1_features_get_operations_default_to_fa_apt_store_feature)
- [Function `operations_default_to_fa_apt_store_enabled`](#0x1_features_operations_default_to_fa_apt_store_enabled)
- [Function `get_concurrent_fungible_balance_feature`](#0x1_features_get_concurrent_fungible_balance_feature)
- [Function `concurrent_fungible_balance_enabled`](#0x1_features_concurrent_fungible_balance_enabled)
- [Function `get_default_to_concurrent_fungible_balance_feature`](#0x1_features_get_default_to_concurrent_fungible_balance_feature)
- [Function `default_to_concurrent_fungible_balance_enabled`](#0x1_features_default_to_concurrent_fungible_balance_enabled)
- [Function `get_abort_if_multisig_payload_mismatch_feature`](#0x1_features_get_abort_if_multisig_payload_mismatch_feature)
- [Function `abort_if_multisig_payload_mismatch_enabled`](#0x1_features_abort_if_multisig_payload_mismatch_enabled)
- [Function `change_feature_flags`](#0x1_features_change_feature_flags)
- [Function `change_feature_flags_for_next_epoch`](#0x1_features_change_feature_flags_for_next_epoch)
- [Function `on_new_epoch`](#0x1_features_on_new_epoch)
- [Function `is_enabled`](#0x1_features_is_enabled)
- [Function `change_feature_flags_for_verification`](#0x1_features_change_feature_flags_for_verification)

```move
module 0x1::features {
    use 0x1::error;
    use 0x1::signer;
    use 0x1::vector;
}
```

<a id="0x1_features_Features"></a>

## Resource `Features`

The enabled features, represented by a bitset stored on chain.

```move
module 0x1::features {
    struct Features has key
}
```

<a id="0x1_features_PendingFeatures"></a>

## Resource `PendingFeatures`

This resource holds the feature vec updates received in the current epoch.
On epoch change, the updates take effect and this buffer is cleared.

```move
module 0x1::features {
    struct PendingFeatures has key
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_features_ABORT_IF_MULTISIG_PAYLOAD_MISMATCH"></a>

Whether the multisig v2 fix is enabled. Once enabled, the multisig transaction execution will explicitly
abort if the provided payload does not match the payload stored on&#45;chain.

Lifetime: transient

```move
module 0x1::features {
    const ABORT_IF_MULTISIG_PAYLOAD_MISMATCH: u64 = 70;
}
```

<a id="0x1_features_AGGREGATOR_V2_IS_AT_LEAST_API"></a>

```move
module 0x1::features {
    const AGGREGATOR_V2_IS_AT_LEAST_API: u64 = 66;
}
```

<a id="0x1_features_APTOS_STD_CHAIN_ID_NATIVES"></a>

Whether the new `aptos_stdlib::type_info::chain_id()` native for fetching the chain ID is enabled.
This is needed because of the introduction of a new native function.
Lifetime: transient

```move
module 0x1::features {
    const APTOS_STD_CHAIN_ID_NATIVES: u64 = 4;
}
```

<a id="0x1_features_APTOS_UNIQUE_IDENTIFIERS"></a>

Whether enable MOVE functions to call create_auid method to create AUIDs.
Lifetime: transient

```move
module 0x1::features {
    const APTOS_UNIQUE_IDENTIFIERS: u64 = 23;
}
```

<a id="0x1_features_BLAKE2B_256_NATIVE"></a>

Whether the new BLAKE2B&#45;256 hash function native is enabled.
This is needed because of the introduction of new native function(s).
Lifetime: transient

```move
module 0x1::features {
    const BLAKE2B_256_NATIVE: u64 = 8;
}
```

<a id="0x1_features_BLS12_381_STRUCTURES"></a>

Whether the generic algebra implementation for BLS12381 operations are enabled.

Lifetime: transient

```move
module 0x1::features {
    const BLS12_381_STRUCTURES: u64 = 13;
}
```

<a id="0x1_features_BN254_STRUCTURES"></a>

Whether the generic algebra implementation for BN254 operations are enabled.

Lifetime: transient

```move
module 0x1::features {
    const BN254_STRUCTURES: u64 = 43;
}
```

<a id="0x1_features_BULLETPROOFS_NATIVES"></a>

Whether the Bulletproofs zero&#45;knowledge range proof module is enabled, and the related native function is
available. This is needed because of the introduction of a new native function.
Lifetime: transient

```move
module 0x1::features {
    const BULLETPROOFS_NATIVES: u64 = 24;
}
```

<a id="0x1_features_CHARGE_INVARIANT_VIOLATION"></a>

Charge invariant violation error.
Lifetime: transient

```move
module 0x1::features {
    const CHARGE_INVARIANT_VIOLATION: u64 = 20;
}
```

<a id="0x1_features_CODE_DEPENDENCY_CHECK"></a>

Whether validation of package dependencies is enabled, and the related native function is
available. This is needed because of introduction of a new native function.
Lifetime: transient

```move
module 0x1::features {
    const CODE_DEPENDENCY_CHECK: u64 = 1;
}
```

<a id="0x1_features_COIN_TO_FUNGIBLE_ASSET_MIGRATION"></a>

Whether migration from coin to fungible asset feature is enabled.

Lifetime: transient

```move
module 0x1::features {
    const COIN_TO_FUNGIBLE_ASSET_MIGRATION: u64 = 60;
}
```

<a id="0x1_features_COLLECT_AND_DISTRIBUTE_GAS_FEES"></a>

Whether gas fees are collected and distributed to the block proposers.
Lifetime: transient

```move
module 0x1::features {
    const COLLECT_AND_DISTRIBUTE_GAS_FEES: u64 = 6;
}
```

<a id="0x1_features_COMMISSION_CHANGE_DELEGATION_POOL"></a>

Whether the operator commission rate change in delegation pool is enabled.
Lifetime: transient

```move
module 0x1::features {
    const COMMISSION_CHANGE_DELEGATION_POOL: u64 = 42;
}
```

<a id="0x1_features_CONCURRENT_FUNGIBLE_ASSETS"></a>

Whether enable Fungible Asset creation
to create higher throughput concurrent variants.
Lifetime: transient

```move
module 0x1::features {
    const CONCURRENT_FUNGIBLE_ASSETS: u64 = 50;
}
```

<a id="0x1_features_CONCURRENT_FUNGIBLE_BALANCE"></a>

Whether enable concurent Fungible Balance
to create higher throughput concurrent variants.
Lifetime: transient

```move
module 0x1::features {
    const CONCURRENT_FUNGIBLE_BALANCE: u64 = 67;
}
```

<a id="0x1_features_CRYPTOGRAPHY_ALGEBRA_NATIVES"></a>

Whether generic algebra basic operation support in `crypto_algebra.move` are enabled.

Lifetime: transient

```move
module 0x1::features {
    const CRYPTOGRAPHY_ALGEBRA_NATIVES: u64 = 12;
}
```

<a id="0x1_features_DEFAULT_TO_CONCURRENT_FUNGIBLE_BALANCE"></a>

Whether to default new Fungible Store to the concurrent variant.
Lifetime: transient

```move
module 0x1::features {
    const DEFAULT_TO_CONCURRENT_FUNGIBLE_BALANCE: u64 = 68;
}
```

<a id="0x1_features_DELEGATION_POOLS"></a>

Whether delegation pools are enabled.
Lifetime: transient

```move
module 0x1::features {
    const DELEGATION_POOLS: u64 = 11;
}
```

<a id="0x1_features_DELEGATION_POOL_ALLOWLISTING"></a>

Whether delegators allowlisting for delegation pools is supported.
Lifetime: transient

```move
module 0x1::features {
    const DELEGATION_POOL_ALLOWLISTING: u64 = 56;
}
```

<a id="0x1_features_DELEGATION_POOL_PARTIAL_GOVERNANCE_VOTING"></a>

Whether enable paritial governance voting on delegation_pool.
Lifetime: transient

```move
module 0x1::features {
    const DELEGATION_POOL_PARTIAL_GOVERNANCE_VOTING: u64 = 21;
}
```

<a id="0x1_features_DISPATCHABLE_FUNGIBLE_ASSET"></a>

Whether the dispatchable fungible asset standard feature is enabled.

Lifetime: transient

```move
module 0x1::features {
    const DISPATCHABLE_FUNGIBLE_ASSET: u64 = 63;
}
```

<a id="0x1_features_EAPI_DISABLED"></a>

```move
module 0x1::features {
    const EAPI_DISABLED: u64 = 2;
}
```

<a id="0x1_features_ED25519_PUBKEY_VALIDATE_RETURN_FALSE_WRONG_LENGTH"></a>

Whether native_public_key_validate aborts when a public key of the wrong length is given
Lifetime: ephemeral

```move
module 0x1::features {
    const ED25519_PUBKEY_VALIDATE_RETURN_FALSE_WRONG_LENGTH: u64 = 14;
}
```

<a id="0x1_features_EFEATURE_CANNOT_BE_DISABLED"></a>

Deployed to production, and disabling is deprecated.

```move
module 0x1::features {
    const EFEATURE_CANNOT_BE_DISABLED: u64 = 3;
}
```

<a id="0x1_features_EFRAMEWORK_SIGNER_NEEDED"></a>

The provided signer has not a framework address.

```move
module 0x1::features {
    const EFRAMEWORK_SIGNER_NEEDED: u64 = 1;
}
```

<a id="0x1_features_EINVALID_FEATURE"></a>

```move
module 0x1::features {
    const EINVALID_FEATURE: u64 = 1;
}
```

<a id="0x1_features_FEE_PAYER_ACCOUNT_OPTIONAL"></a>

```move
module 0x1::features {
    const FEE_PAYER_ACCOUNT_OPTIONAL: u64 = 35;
}
```

<a id="0x1_features_FEE_PAYER_ENABLED"></a>

Whether alternate gas payer is supported
Lifetime: transient

```move
module 0x1::features {
    const FEE_PAYER_ENABLED: u64 = 22;
}
```

<a id="0x1_features_JWK_CONSENSUS"></a>

Deprecated by `aptos_framework::jwk_consensus_config::JWKConsensusConfig`.

```move
module 0x1::features {
    const JWK_CONSENSUS: u64 = 49;
}
```

<a id="0x1_features_KEYLESS_ACCOUNTS"></a>

Whether the OIDB feature is enabled, possibly with the ZK&#45;less verification mode.

Lifetime: transient

```move
module 0x1::features {
    const KEYLESS_ACCOUNTS: u64 = 46;
}
```

<a id="0x1_features_KEYLESS_ACCOUNTS_WITH_PASSKEYS"></a>

Whether keyless accounts support passkey&#45;based ephemeral signatures.

Lifetime: transient

```move
module 0x1::features {
    const KEYLESS_ACCOUNTS_WITH_PASSKEYS: u64 = 54;
}
```

<a id="0x1_features_KEYLESS_BUT_ZKLESS_ACCOUNTS"></a>

Whether the ZK&#45;less mode of the keyless accounts feature is enabled.

Lifetime: transient

```move
module 0x1::features {
    const KEYLESS_BUT_ZKLESS_ACCOUNTS: u64 = 47;
}
```

<a id="0x1_features_LIMIT_MAX_IDENTIFIER_LENGTH"></a>

```move
module 0x1::features {
    const LIMIT_MAX_IDENTIFIER_LENGTH: u64 = 38;
}
```

<a id="0x1_features_MAX_OBJECT_NESTING_CHECK"></a>

Whether checking the maximum object nesting is enabled.

```move
module 0x1::features {
    const MAX_OBJECT_NESTING_CHECK: u64 = 53;
}
```

<a id="0x1_features_MODULE_EVENT"></a>

Whether emit function in `event.move` are enabled for module events.

Lifetime: transient

```move
module 0x1::features {
    const MODULE_EVENT: u64 = 26;
}
```

<a id="0x1_features_MODULE_EVENT_MIGRATION"></a>

Whether aptos_framwork enables the behavior of module event migration.

Lifetime: transient

```move
module 0x1::features {
    const MODULE_EVENT_MIGRATION: u64 = 57;
}
```

<a id="0x1_features_MULTISIG_ACCOUNTS"></a>

Whether multisig accounts (different from accounts with multi&#45;ed25519 auth keys) are enabled.

```move
module 0x1::features {
    const MULTISIG_ACCOUNTS: u64 = 10;
}
```

<a id="0x1_features_MULTISIG_V2_ENHANCEMENT"></a>

Whether the Multisig V2 enhancement feature is enabled.

Lifetime: transient

```move
module 0x1::features {
    const MULTISIG_V2_ENHANCEMENT: u64 = 55;
}
```

<a id="0x1_features_MULTI_ED25519_PK_VALIDATE_V2_NATIVES"></a>

Whether the new `aptos_stdlib::multi_ed25519::public_key_validate_internal_v2()` native is enabled.
This is needed because of the introduction of a new native function.
Lifetime: transient

```move
module 0x1::features {
    const MULTI_ED25519_PK_VALIDATE_V2_NATIVES: u64 = 7;
}
```

<a id="0x1_features_NEW_ACCOUNTS_DEFAULT_TO_FA_APT_STORE"></a>

Lifetime: transient

```move
module 0x1::features {
    const NEW_ACCOUNTS_DEFAULT_TO_FA_APT_STORE: u64 = 64;
}
```

<a id="0x1_features_OBJECT_CODE_DEPLOYMENT"></a>

Whether deploying to objects is enabled.

```move
module 0x1::features {
    const OBJECT_CODE_DEPLOYMENT: u64 = 52;
}
```

<a id="0x1_features_OBJECT_NATIVE_DERIVED_ADDRESS"></a>

Whether we use more efficient native implementation of computing object derived address

```move
module 0x1::features {
    const OBJECT_NATIVE_DERIVED_ADDRESS: u64 = 62;
}
```

<a id="0x1_features_OPERATIONS_DEFAULT_TO_FA_APT_STORE"></a>

Lifetime: transient

```move
module 0x1::features {
    const OPERATIONS_DEFAULT_TO_FA_APT_STORE: u64 = 65;
}
```

<a id="0x1_features_OPERATOR_BENEFICIARY_CHANGE"></a>

Whether allow changing beneficiaries for operators.
Lifetime: transient

```move
module 0x1::features {
    const OPERATOR_BENEFICIARY_CHANGE: u64 = 39;
}
```

<a id="0x1_features_PARTIAL_GOVERNANCE_VOTING"></a>

Whether enable paritial governance voting on aptos_governance.
Lifetime: transient

```move
module 0x1::features {
    const PARTIAL_GOVERNANCE_VOTING: u64 = 17;
}
```

<a id="0x1_features_PERIODICAL_REWARD_RATE_DECREASE"></a>

Whether reward rate decreases periodically.
Lifetime: transient

```move
module 0x1::features {
    const PERIODICAL_REWARD_RATE_DECREASE: u64 = 16;
}
```

<a id="0x1_features_PRIMARY_APT_FUNGIBLE_STORE_AT_USER_ADDRESS"></a>

```move
module 0x1::features {
    const PRIMARY_APT_FUNGIBLE_STORE_AT_USER_ADDRESS: u64 = 61;
}
```

<a id="0x1_features_RECONFIGURE_WITH_DKG"></a>

Deprecated by `aptos_framework::randomness_config::RandomnessConfig`.

```move
module 0x1::features {
    const RECONFIGURE_WITH_DKG: u64 = 45;
}
```

<a id="0x1_features_RESOURCE_GROUPS"></a>

Whether resource groups are enabled.
This is needed because of new attributes for structs and a change in storage representation.

```move
module 0x1::features {
    const RESOURCE_GROUPS: u64 = 9;
}
```

<a id="0x1_features_RESOURCE_GROUPS_SPLIT_IN_VM_CHANGE_SET"></a>

```move
module 0x1::features {
    const RESOURCE_GROUPS_SPLIT_IN_VM_CHANGE_SET: u64 = 41;
}
```

<a id="0x1_features_SAFER_METADATA"></a>

```move
module 0x1::features {
    const SAFER_METADATA: u64 = 32;
}
```

<a id="0x1_features_SAFER_RESOURCE_GROUPS"></a>

```move
module 0x1::features {
    const SAFER_RESOURCE_GROUPS: u64 = 31;
}
```

<a id="0x1_features_SHA_512_AND_RIPEMD_160_NATIVES"></a>

Whether the new SHA2&#45;512, SHA3&#45;512 and RIPEMD&#45;160 hash function natives are enabled.
This is needed because of the introduction of new native functions.
Lifetime: transient

```move
module 0x1::features {
    const SHA_512_AND_RIPEMD_160_NATIVES: u64 = 3;
}
```

<a id="0x1_features_SIGNATURE_CHECKER_V2_SCRIPT_FIX"></a>

Whether the fix for a counting bug in the script path of the signature checker pass is enabled.
Lifetime: transient

```move
module 0x1::features {
    const SIGNATURE_CHECKER_V2_SCRIPT_FIX: u64 = 29;
}
```

<a id="0x1_features_SIGNER_NATIVE_FORMAT_FIX"></a>

Fix the native formatter for signer.
Lifetime: transient

```move
module 0x1::features {
    const SIGNER_NATIVE_FORMAT_FIX: u64 = 25;
}
```

<a id="0x1_features_SINGLE_SENDER_AUTHENTICATOR"></a>

```move
module 0x1::features {
    const SINGLE_SENDER_AUTHENTICATOR: u64 = 33;
}
```

<a id="0x1_features_SPONSORED_AUTOMATIC_ACCOUNT_CREATION"></a>

Whether the automatic creation of accounts is enabled for sponsored transactions.
Lifetime: transient

```move
module 0x1::features {
    const SPONSORED_AUTOMATIC_ACCOUNT_CREATION: u64 = 34;
}
```

<a id="0x1_features_STRUCT_CONSTRUCTORS"></a>

Whether struct constructors are enabled

Lifetime: transient

```move
module 0x1::features {
    const STRUCT_CONSTRUCTORS: u64 = 15;
}
```

<a id="0x1_features_TRANSACTION_CONTEXT_EXTENSION"></a>

Whether the transaction context extension is enabled. This feature allows the module
`transaction_context` to provide contextual information about the user transaction.

Lifetime: transient

```move
module 0x1::features {
    const TRANSACTION_CONTEXT_EXTENSION: u64 = 59;
}
```

<a id="0x1_features_TREAT_FRIEND_AS_PRIVATE"></a>

Whether during upgrade compatibility checking, friend functions should be treated similar like
private functions.
Lifetime: permanent

```move
module 0x1::features {
    const TREAT_FRIEND_AS_PRIVATE: u64 = 2;
}
```

<a id="0x1_features_VM_BINARY_FORMAT_V6"></a>

Whether to allow the use of binary format version v6.
Lifetime: transient

```move
module 0x1::features {
    const VM_BINARY_FORMAT_V6: u64 = 5;
}
```

<a id="0x1_features_VM_BINARY_FORMAT_V7"></a>

```move
module 0x1::features {
    const VM_BINARY_FORMAT_V7: u64 = 40;
}
```

<a id="0x1_features_code_dependency_check_enabled"></a>

## Function `code_dependency_check_enabled`

```move
module 0x1::features {
    public fun code_dependency_check_enabled(): bool
}
```

<a id="0x1_features_treat_friend_as_private"></a>

## Function `treat_friend_as_private`

```move
module 0x1::features {
    public fun treat_friend_as_private(): bool
}
```

<a id="0x1_features_get_sha_512_and_ripemd_160_feature"></a>

## Function `get_sha_512_and_ripemd_160_feature`

```move
module 0x1::features {
    public fun get_sha_512_and_ripemd_160_feature(): u64
}
```

<a id="0x1_features_sha_512_and_ripemd_160_enabled"></a>

## Function `sha_512_and_ripemd_160_enabled`

```move
module 0x1::features {
    public fun sha_512_and_ripemd_160_enabled(): bool
}
```

<a id="0x1_features_get_aptos_stdlib_chain_id_feature"></a>

## Function `get_aptos_stdlib_chain_id_feature`

```move
module 0x1::features {
    public fun get_aptos_stdlib_chain_id_feature(): u64
}
```

<a id="0x1_features_aptos_stdlib_chain_id_enabled"></a>

## Function `aptos_stdlib_chain_id_enabled`

```move
module 0x1::features {
    public fun aptos_stdlib_chain_id_enabled(): bool
}
```

<a id="0x1_features_get_vm_binary_format_v6"></a>

## Function `get_vm_binary_format_v6`

```move
module 0x1::features {
    public fun get_vm_binary_format_v6(): u64
}
```

<a id="0x1_features_allow_vm_binary_format_v6"></a>

## Function `allow_vm_binary_format_v6`

```move
module 0x1::features {
    public fun allow_vm_binary_format_v6(): bool
}
```

<a id="0x1_features_get_collect_and_distribute_gas_fees_feature"></a>

## Function `get_collect_and_distribute_gas_fees_feature`

```move
module 0x1::features {
    public fun get_collect_and_distribute_gas_fees_feature(): u64
}
```

<a id="0x1_features_collect_and_distribute_gas_fees"></a>

## Function `collect_and_distribute_gas_fees`

```move
module 0x1::features {
    public fun collect_and_distribute_gas_fees(): bool
}
```

<a id="0x1_features_multi_ed25519_pk_validate_v2_feature"></a>

## Function `multi_ed25519_pk_validate_v2_feature`

```move
module 0x1::features {
    public fun multi_ed25519_pk_validate_v2_feature(): u64
}
```

<a id="0x1_features_multi_ed25519_pk_validate_v2_enabled"></a>

## Function `multi_ed25519_pk_validate_v2_enabled`

```move
module 0x1::features {
    public fun multi_ed25519_pk_validate_v2_enabled(): bool
}
```

<a id="0x1_features_get_blake2b_256_feature"></a>

## Function `get_blake2b_256_feature`

```move
module 0x1::features {
    public fun get_blake2b_256_feature(): u64
}
```

<a id="0x1_features_blake2b_256_enabled"></a>

## Function `blake2b_256_enabled`

```move
module 0x1::features {
    public fun blake2b_256_enabled(): bool
}
```

<a id="0x1_features_get_resource_groups_feature"></a>

## Function `get_resource_groups_feature`

```move
module 0x1::features {
    public fun get_resource_groups_feature(): u64
}
```

<a id="0x1_features_resource_groups_enabled"></a>

## Function `resource_groups_enabled`

```move
module 0x1::features {
    public fun resource_groups_enabled(): bool
}
```

<a id="0x1_features_get_multisig_accounts_feature"></a>

## Function `get_multisig_accounts_feature`

```move
module 0x1::features {
    public fun get_multisig_accounts_feature(): u64
}
```

<a id="0x1_features_multisig_accounts_enabled"></a>

## Function `multisig_accounts_enabled`

```move
module 0x1::features {
    public fun multisig_accounts_enabled(): bool
}
```

<a id="0x1_features_get_delegation_pools_feature"></a>

## Function `get_delegation_pools_feature`

```move
module 0x1::features {
    public fun get_delegation_pools_feature(): u64
}
```

<a id="0x1_features_delegation_pools_enabled"></a>

## Function `delegation_pools_enabled`

```move
module 0x1::features {
    public fun delegation_pools_enabled(): bool
}
```

<a id="0x1_features_get_cryptography_algebra_natives_feature"></a>

## Function `get_cryptography_algebra_natives_feature`

```move
module 0x1::features {
    public fun get_cryptography_algebra_natives_feature(): u64
}
```

<a id="0x1_features_cryptography_algebra_enabled"></a>

## Function `cryptography_algebra_enabled`

```move
module 0x1::features {
    public fun cryptography_algebra_enabled(): bool
}
```

<a id="0x1_features_get_bls12_381_strutures_feature"></a>

## Function `get_bls12_381_strutures_feature`

```move
module 0x1::features {
    public fun get_bls12_381_strutures_feature(): u64
}
```

<a id="0x1_features_bls12_381_structures_enabled"></a>

## Function `bls12_381_structures_enabled`

```move
module 0x1::features {
    public fun bls12_381_structures_enabled(): bool
}
```

<a id="0x1_features_get_periodical_reward_rate_decrease_feature"></a>

## Function `get_periodical_reward_rate_decrease_feature`

```move
module 0x1::features {
    public fun get_periodical_reward_rate_decrease_feature(): u64
}
```

<a id="0x1_features_periodical_reward_rate_decrease_enabled"></a>

## Function `periodical_reward_rate_decrease_enabled`

```move
module 0x1::features {
    public fun periodical_reward_rate_decrease_enabled(): bool
}
```

<a id="0x1_features_get_partial_governance_voting"></a>

## Function `get_partial_governance_voting`

```move
module 0x1::features {
    public fun get_partial_governance_voting(): u64
}
```

<a id="0x1_features_partial_governance_voting_enabled"></a>

## Function `partial_governance_voting_enabled`

```move
module 0x1::features {
    public fun partial_governance_voting_enabled(): bool
}
```

<a id="0x1_features_get_delegation_pool_partial_governance_voting"></a>

## Function `get_delegation_pool_partial_governance_voting`

```move
module 0x1::features {
    public fun get_delegation_pool_partial_governance_voting(): u64
}
```

<a id="0x1_features_delegation_pool_partial_governance_voting_enabled"></a>

## Function `delegation_pool_partial_governance_voting_enabled`

```move
module 0x1::features {
    public fun delegation_pool_partial_governance_voting_enabled(): bool
}
```

<a id="0x1_features_fee_payer_enabled"></a>

## Function `fee_payer_enabled`

```move
module 0x1::features {
    public fun fee_payer_enabled(): bool
}
```

<a id="0x1_features_get_auids"></a>

## Function `get_auids`

```move
module 0x1::features {
    public fun get_auids(): u64
}
```

<a id="0x1_features_auids_enabled"></a>

## Function `auids_enabled`

```move
module 0x1::features {
    public fun auids_enabled(): bool
}
```

<a id="0x1_features_get_bulletproofs_feature"></a>

## Function `get_bulletproofs_feature`

```move
module 0x1::features {
    public fun get_bulletproofs_feature(): u64
}
```

<a id="0x1_features_bulletproofs_enabled"></a>

## Function `bulletproofs_enabled`

```move
module 0x1::features {
    public fun bulletproofs_enabled(): bool
}
```

<a id="0x1_features_get_signer_native_format_fix_feature"></a>

## Function `get_signer_native_format_fix_feature`

```move
module 0x1::features {
    public fun get_signer_native_format_fix_feature(): u64
}
```

<a id="0x1_features_signer_native_format_fix_enabled"></a>

## Function `signer_native_format_fix_enabled`

```move
module 0x1::features {
    public fun signer_native_format_fix_enabled(): bool
}
```

<a id="0x1_features_get_module_event_feature"></a>

## Function `get_module_event_feature`

```move
module 0x1::features {
    public fun get_module_event_feature(): u64
}
```

<a id="0x1_features_module_event_enabled"></a>

## Function `module_event_enabled`

```move
module 0x1::features {
    public fun module_event_enabled(): bool
}
```

<a id="0x1_features_get_aggregator_v2_api_feature"></a>

## Function `get_aggregator_v2_api_feature`

```move
module 0x1::features {
    public fun get_aggregator_v2_api_feature(): u64
}
```

<a id="0x1_features_aggregator_v2_api_enabled"></a>

## Function `aggregator_v2_api_enabled`

```move
module 0x1::features {
    public fun aggregator_v2_api_enabled(): bool
}
```

<a id="0x1_features_get_aggregator_snapshots_feature"></a>

## Function `get_aggregator_snapshots_feature`

```move
module 0x1::features {
    #[deprecated]
    public fun get_aggregator_snapshots_feature(): u64
}
```

<a id="0x1_features_aggregator_snapshots_enabled"></a>

## Function `aggregator_snapshots_enabled`

```move
module 0x1::features {
    #[deprecated]
    public fun aggregator_snapshots_enabled(): bool
}
```

<a id="0x1_features_get_sponsored_automatic_account_creation"></a>

## Function `get_sponsored_automatic_account_creation`

```move
module 0x1::features {
    public fun get_sponsored_automatic_account_creation(): u64
}
```

<a id="0x1_features_sponsored_automatic_account_creation_enabled"></a>

## Function `sponsored_automatic_account_creation_enabled`

```move
module 0x1::features {
    public fun sponsored_automatic_account_creation_enabled(): bool
}
```

<a id="0x1_features_get_concurrent_token_v2_feature"></a>

## Function `get_concurrent_token_v2_feature`

```move
module 0x1::features {
    public fun get_concurrent_token_v2_feature(): u64
}
```

<a id="0x1_features_concurrent_token_v2_enabled"></a>

## Function `concurrent_token_v2_enabled`

```move
module 0x1::features {
    public fun concurrent_token_v2_enabled(): bool
}
```

<a id="0x1_features_get_concurrent_assets_feature"></a>

## Function `get_concurrent_assets_feature`

```move
module 0x1::features {
    #[deprecated]
    public fun get_concurrent_assets_feature(): u64
}
```

<a id="0x1_features_concurrent_assets_enabled"></a>

## Function `concurrent_assets_enabled`

```move
module 0x1::features {
    #[deprecated]
    public fun concurrent_assets_enabled(): bool
}
```

<a id="0x1_features_get_operator_beneficiary_change_feature"></a>

## Function `get_operator_beneficiary_change_feature`

```move
module 0x1::features {
    public fun get_operator_beneficiary_change_feature(): u64
}
```

<a id="0x1_features_operator_beneficiary_change_enabled"></a>

## Function `operator_beneficiary_change_enabled`

```move
module 0x1::features {
    public fun operator_beneficiary_change_enabled(): bool
}
```

<a id="0x1_features_get_commission_change_delegation_pool_feature"></a>

## Function `get_commission_change_delegation_pool_feature`

```move
module 0x1::features {
    public fun get_commission_change_delegation_pool_feature(): u64
}
```

<a id="0x1_features_commission_change_delegation_pool_enabled"></a>

## Function `commission_change_delegation_pool_enabled`

```move
module 0x1::features {
    public fun commission_change_delegation_pool_enabled(): bool
}
```

<a id="0x1_features_get_bn254_strutures_feature"></a>

## Function `get_bn254_strutures_feature`

```move
module 0x1::features {
    public fun get_bn254_strutures_feature(): u64
}
```

<a id="0x1_features_bn254_structures_enabled"></a>

## Function `bn254_structures_enabled`

```move
module 0x1::features {
    public fun bn254_structures_enabled(): bool
}
```

<a id="0x1_features_get_reconfigure_with_dkg_feature"></a>

## Function `get_reconfigure_with_dkg_feature`

```move
module 0x1::features {
    public fun get_reconfigure_with_dkg_feature(): u64
}
```

<a id="0x1_features_reconfigure_with_dkg_enabled"></a>

## Function `reconfigure_with_dkg_enabled`

```move
module 0x1::features {
    public fun reconfigure_with_dkg_enabled(): bool
}
```

<a id="0x1_features_get_keyless_accounts_feature"></a>

## Function `get_keyless_accounts_feature`

```move
module 0x1::features {
    public fun get_keyless_accounts_feature(): u64
}
```

<a id="0x1_features_keyless_accounts_enabled"></a>

## Function `keyless_accounts_enabled`

```move
module 0x1::features {
    public fun keyless_accounts_enabled(): bool
}
```

<a id="0x1_features_get_keyless_but_zkless_accounts_feature"></a>

## Function `get_keyless_but_zkless_accounts_feature`

```move
module 0x1::features {
    public fun get_keyless_but_zkless_accounts_feature(): u64
}
```

<a id="0x1_features_keyless_but_zkless_accounts_feature_enabled"></a>

## Function `keyless_but_zkless_accounts_feature_enabled`

```move
module 0x1::features {
    public fun keyless_but_zkless_accounts_feature_enabled(): bool
}
```

<a id="0x1_features_get_jwk_consensus_feature"></a>

## Function `get_jwk_consensus_feature`

```move
module 0x1::features {
    public fun get_jwk_consensus_feature(): u64
}
```

<a id="0x1_features_jwk_consensus_enabled"></a>

## Function `jwk_consensus_enabled`

```move
module 0x1::features {
    public fun jwk_consensus_enabled(): bool
}
```

<a id="0x1_features_get_concurrent_fungible_assets_feature"></a>

## Function `get_concurrent_fungible_assets_feature`

```move
module 0x1::features {
    public fun get_concurrent_fungible_assets_feature(): u64
}
```

<a id="0x1_features_concurrent_fungible_assets_enabled"></a>

## Function `concurrent_fungible_assets_enabled`

```move
module 0x1::features {
    public fun concurrent_fungible_assets_enabled(): bool
}
```

<a id="0x1_features_is_object_code_deployment_enabled"></a>

## Function `is_object_code_deployment_enabled`

```move
module 0x1::features {
    public fun is_object_code_deployment_enabled(): bool
}
```

<a id="0x1_features_get_max_object_nesting_check_feature"></a>

## Function `get_max_object_nesting_check_feature`

```move
module 0x1::features {
    public fun get_max_object_nesting_check_feature(): u64
}
```

<a id="0x1_features_max_object_nesting_check_enabled"></a>

## Function `max_object_nesting_check_enabled`

```move
module 0x1::features {
    public fun max_object_nesting_check_enabled(): bool
}
```

<a id="0x1_features_get_keyless_accounts_with_passkeys_feature"></a>

## Function `get_keyless_accounts_with_passkeys_feature`

```move
module 0x1::features {
    public fun get_keyless_accounts_with_passkeys_feature(): u64
}
```

<a id="0x1_features_keyless_accounts_with_passkeys_feature_enabled"></a>

## Function `keyless_accounts_with_passkeys_feature_enabled`

```move
module 0x1::features {
    public fun keyless_accounts_with_passkeys_feature_enabled(): bool
}
```

<a id="0x1_features_get_multisig_v2_enhancement_feature"></a>

## Function `get_multisig_v2_enhancement_feature`

```move
module 0x1::features {
    public fun get_multisig_v2_enhancement_feature(): u64
}
```

<a id="0x1_features_multisig_v2_enhancement_feature_enabled"></a>

## Function `multisig_v2_enhancement_feature_enabled`

```move
module 0x1::features {
    public fun multisig_v2_enhancement_feature_enabled(): bool
}
```

<a id="0x1_features_get_delegation_pool_allowlisting_feature"></a>

## Function `get_delegation_pool_allowlisting_feature`

```move
module 0x1::features {
    public fun get_delegation_pool_allowlisting_feature(): u64
}
```

<a id="0x1_features_delegation_pool_allowlisting_enabled"></a>

## Function `delegation_pool_allowlisting_enabled`

```move
module 0x1::features {
    public fun delegation_pool_allowlisting_enabled(): bool
}
```

<a id="0x1_features_get_module_event_migration_feature"></a>

## Function `get_module_event_migration_feature`

```move
module 0x1::features {
    public fun get_module_event_migration_feature(): u64
}
```

<a id="0x1_features_module_event_migration_enabled"></a>

## Function `module_event_migration_enabled`

```move
module 0x1::features {
    public fun module_event_migration_enabled(): bool
}
```

<a id="0x1_features_get_transaction_context_extension_feature"></a>

## Function `get_transaction_context_extension_feature`

```move
module 0x1::features {
    public fun get_transaction_context_extension_feature(): u64
}
```

<a id="0x1_features_transaction_context_extension_enabled"></a>

## Function `transaction_context_extension_enabled`

```move
module 0x1::features {
    public fun transaction_context_extension_enabled(): bool
}
```

<a id="0x1_features_get_coin_to_fungible_asset_migration_feature"></a>

## Function `get_coin_to_fungible_asset_migration_feature`

```move
module 0x1::features {
    public fun get_coin_to_fungible_asset_migration_feature(): u64
}
```

<a id="0x1_features_coin_to_fungible_asset_migration_feature_enabled"></a>

## Function `coin_to_fungible_asset_migration_feature_enabled`

```move
module 0x1::features {
    public fun coin_to_fungible_asset_migration_feature_enabled(): bool
}
```

<a id="0x1_features_get_primary_apt_fungible_store_at_user_address_feature"></a>

## Function `get_primary_apt_fungible_store_at_user_address_feature`

```move
module 0x1::features {
    #[deprecated]
    public fun get_primary_apt_fungible_store_at_user_address_feature(): u64
}
```

<a id="0x1_features_primary_apt_fungible_store_at_user_address_enabled"></a>

## Function `primary_apt_fungible_store_at_user_address_enabled`

```move
module 0x1::features {
    #[deprecated]
    public fun primary_apt_fungible_store_at_user_address_enabled(): bool
}
```

<a id="0x1_features_aggregator_v2_is_at_least_api_enabled"></a>

## Function `aggregator_v2_is_at_least_api_enabled`

```move
module 0x1::features {
    public fun aggregator_v2_is_at_least_api_enabled(): bool
}
```

<a id="0x1_features_get_object_native_derived_address_feature"></a>

## Function `get_object_native_derived_address_feature`

```move
module 0x1::features {
    public fun get_object_native_derived_address_feature(): u64
}
```

<a id="0x1_features_object_native_derived_address_enabled"></a>

## Function `object_native_derived_address_enabled`

```move
module 0x1::features {
    public fun object_native_derived_address_enabled(): bool
}
```

<a id="0x1_features_get_dispatchable_fungible_asset_feature"></a>

## Function `get_dispatchable_fungible_asset_feature`

```move
module 0x1::features {
    public fun get_dispatchable_fungible_asset_feature(): u64
}
```

<a id="0x1_features_dispatchable_fungible_asset_enabled"></a>

## Function `dispatchable_fungible_asset_enabled`

```move
module 0x1::features {
    public fun dispatchable_fungible_asset_enabled(): bool
}
```

<a id="0x1_features_get_new_accounts_default_to_fa_apt_store_feature"></a>

## Function `get_new_accounts_default_to_fa_apt_store_feature`

```move
module 0x1::features {
    public fun get_new_accounts_default_to_fa_apt_store_feature(): u64
}
```

<a id="0x1_features_new_accounts_default_to_fa_apt_store_enabled"></a>

## Function `new_accounts_default_to_fa_apt_store_enabled`

```move
module 0x1::features {
    public fun new_accounts_default_to_fa_apt_store_enabled(): bool
}
```

<a id="0x1_features_get_operations_default_to_fa_apt_store_feature"></a>

## Function `get_operations_default_to_fa_apt_store_feature`

```move
module 0x1::features {
    public fun get_operations_default_to_fa_apt_store_feature(): u64
}
```

<a id="0x1_features_operations_default_to_fa_apt_store_enabled"></a>

## Function `operations_default_to_fa_apt_store_enabled`

```move
module 0x1::features {
    public fun operations_default_to_fa_apt_store_enabled(): bool
}
```

<a id="0x1_features_get_concurrent_fungible_balance_feature"></a>

## Function `get_concurrent_fungible_balance_feature`

```move
module 0x1::features {
    public fun get_concurrent_fungible_balance_feature(): u64
}
```

<a id="0x1_features_concurrent_fungible_balance_enabled"></a>

## Function `concurrent_fungible_balance_enabled`

```move
module 0x1::features {
    public fun concurrent_fungible_balance_enabled(): bool
}
```

<a id="0x1_features_get_default_to_concurrent_fungible_balance_feature"></a>

## Function `get_default_to_concurrent_fungible_balance_feature`

```move
module 0x1::features {
    public fun get_default_to_concurrent_fungible_balance_feature(): u64
}
```

<a id="0x1_features_default_to_concurrent_fungible_balance_enabled"></a>

## Function `default_to_concurrent_fungible_balance_enabled`

```move
module 0x1::features {
    public fun default_to_concurrent_fungible_balance_enabled(): bool
}
```

<a id="0x1_features_get_abort_if_multisig_payload_mismatch_feature"></a>

## Function `get_abort_if_multisig_payload_mismatch_feature`

```move
module 0x1::features {
    public fun get_abort_if_multisig_payload_mismatch_feature(): u64
}
```

<a id="0x1_features_abort_if_multisig_payload_mismatch_enabled"></a>

## Function `abort_if_multisig_payload_mismatch_enabled`

```move
module 0x1::features {
    public fun abort_if_multisig_payload_mismatch_enabled(): bool
}
```

<a id="0x1_features_change_feature_flags"></a>

## Function `change_feature_flags`

Deprecated to prevent validator set changes during DKG.

Genesis/tests should use `change_feature_flags_internal()` for feature vec initialization.

Governance proposals should use `change_feature_flags_for_next_epoch()` to enable/disable features.

```move
module 0x1::features {
    public fun change_feature_flags(_framework: &signer, _enable: vector<u64>, _disable: vector<u64>)
}
```

<a id="0x1_features_change_feature_flags_for_next_epoch"></a>

## Function `change_feature_flags_for_next_epoch`

Enable and disable features for the next epoch.

```move
module 0x1::features {
    public fun change_feature_flags_for_next_epoch(framework: &signer, enable: vector<u64>, disable: vector<u64>)
}
```

<a id="0x1_features_on_new_epoch"></a>

## Function `on_new_epoch`

Apply all the pending feature flag changes. Should only be used at the end of a reconfiguration with DKG.

While the scope is public, it can only be usd in system transactions like `block_prologue` and governance proposals,
who have permission to set the flag that&apos;s checked in `extract()`.

```move
module 0x1::features {
    public fun on_new_epoch(framework: &signer)
}
```

<a id="0x1_features_is_enabled"></a>

## Function `is_enabled`

Check whether the feature is enabled.

```move
module 0x1::features {
    #[view]
    public fun is_enabled(feature: u64): bool
}
```

<a id="0x1_features_change_feature_flags_for_verification"></a>

## Function `change_feature_flags_for_verification`

```move
module 0x1::features {
    #[verify_only]
    public fun change_feature_flags_for_verification(framework: &signer, enable: vector<u64>, disable: vector<u64>)
}
```
