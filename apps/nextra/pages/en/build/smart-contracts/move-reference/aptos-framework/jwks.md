<a id="0x1_jwks"></a>

# Module `0x1::jwks`

JWK functions and structs.

Note: An important design constraint for this module is that the JWK consensus Rust code is unable to
spawn a VM and make a Move function call. Instead, the JWK consensus Rust code will have to directly
write some of the resources in this file. As a result, the structs in this file are declared so as to
have a simple layout which is easily accessible in Rust.

- [Struct `OIDCProvider`](#0x1_jwks_OIDCProvider)
- [Resource `SupportedOIDCProviders`](#0x1_jwks_SupportedOIDCProviders)
- [Struct `UnsupportedJWK`](#0x1_jwks_UnsupportedJWK)
- [Struct `RSA_JWK`](#0x1_jwks_RSA_JWK)
- [Struct `JWK`](#0x1_jwks_JWK)
- [Struct `ProviderJWKs`](#0x1_jwks_ProviderJWKs)
- [Struct `AllProvidersJWKs`](#0x1_jwks_AllProvidersJWKs)
- [Resource `ObservedJWKs`](#0x1_jwks_ObservedJWKs)
- [Struct `ObservedJWKsUpdated`](#0x1_jwks_ObservedJWKsUpdated)
- [Struct `Patch`](#0x1_jwks_Patch)
- [Struct `PatchRemoveAll`](#0x1_jwks_PatchRemoveAll)
- [Struct `PatchRemoveIssuer`](#0x1_jwks_PatchRemoveIssuer)
- [Struct `PatchRemoveJWK`](#0x1_jwks_PatchRemoveJWK)
- [Struct `PatchUpsertJWK`](#0x1_jwks_PatchUpsertJWK)
- [Resource `Patches`](#0x1_jwks_Patches)
- [Resource `PatchedJWKs`](#0x1_jwks_PatchedJWKs)
- [Constants](#@Constants_0)
- [Function `get_patched_jwk`](#0x1_jwks_get_patched_jwk)
- [Function `try_get_patched_jwk`](#0x1_jwks_try_get_patched_jwk)
- [Function `upsert_oidc_provider`](#0x1_jwks_upsert_oidc_provider)
- [Function `upsert_oidc_provider_for_next_epoch`](#0x1_jwks_upsert_oidc_provider_for_next_epoch)
- [Function `remove_oidc_provider`](#0x1_jwks_remove_oidc_provider)
- [Function `remove_oidc_provider_for_next_epoch`](#0x1_jwks_remove_oidc_provider_for_next_epoch)
- [Function `on_new_epoch`](#0x1_jwks_on_new_epoch)
- [Function `set_patches`](#0x1_jwks_set_patches)
- [Function `new_patch_remove_all`](#0x1_jwks_new_patch_remove_all)
- [Function `new_patch_remove_issuer`](#0x1_jwks_new_patch_remove_issuer)
- [Function `new_patch_remove_jwk`](#0x1_jwks_new_patch_remove_jwk)
- [Function `new_patch_upsert_jwk`](#0x1_jwks_new_patch_upsert_jwk)
- [Function `new_rsa_jwk`](#0x1_jwks_new_rsa_jwk)
- [Function `new_unsupported_jwk`](#0x1_jwks_new_unsupported_jwk)
- [Function `initialize`](#0x1_jwks_initialize)
- [Function `upsert_into_observed_jwks`](#0x1_jwks_upsert_into_observed_jwks)
- [Function `remove_issuer_from_observed_jwks`](#0x1_jwks_remove_issuer_from_observed_jwks)

```move
module 0x1::jwks {
    use 0x1::chain_status;
    use 0x1::comparator;
    use 0x1::config_buffer;
    use 0x1::copyable_any;
    use 0x1::error;
    use 0x1::event;
    use 0x1::option;
    use 0x1::reconfiguration;
    use 0x1::string;
    use 0x1::system_addresses;
    use 0x1::vector;
}
```

<a id="0x1_jwks_OIDCProvider"></a>

## Struct `OIDCProvider`

An OIDC provider.

```move
module 0x1::jwks {
    struct OIDCProvider has copy, drop, store
}
```

<a id="0x1_jwks_SupportedOIDCProviders"></a>

## Resource `SupportedOIDCProviders`

A list of OIDC providers whose JWKs should be watched by validators. Maintained by governance proposals.

```move
module 0x1::jwks {
    struct SupportedOIDCProviders has copy, drop, store, key
}
```

<a id="0x1_jwks_UnsupportedJWK"></a>

## Struct `UnsupportedJWK`

An JWK variant that represents the JWKs which were observed but not yet supported by Aptos.
Observing `UnsupportedJWK`s means the providers adopted a new key type/format, and the system should be updated.

```move
module 0x1::jwks {
    struct UnsupportedJWK has copy, drop, store
}
```

<a id="0x1_jwks_RSA_JWK"></a>

## Struct `RSA_JWK`

A JWK variant where `kty` is `RSA`.

```move
module 0x1::jwks {
    struct RSA_JWK has copy, drop, store
}
```

<a id="0x1_jwks_JWK"></a>

## Struct `JWK`

A JSON web key.

```move
module 0x1::jwks {
    struct JWK has copy, drop, store
}
```

<a id="0x1_jwks_ProviderJWKs"></a>

## Struct `ProviderJWKs`

A provider and its `JWK`s.

```move
module 0x1::jwks {
    struct ProviderJWKs has copy, drop, store
}
```

<a id="0x1_jwks_AllProvidersJWKs"></a>

## Struct `AllProvidersJWKs`

Multiple `ProviderJWKs` objects, indexed by issuer and key ID.

```move
module 0x1::jwks {
    struct AllProvidersJWKs has copy, drop, store
}
```

<a id="0x1_jwks_ObservedJWKs"></a>

## Resource `ObservedJWKs`

The `AllProvidersJWKs` that validators observed and agreed on.

```move
module 0x1::jwks {
    struct ObservedJWKs has copy, drop, store, key
}
```

<a id="0x1_jwks_ObservedJWKsUpdated"></a>

## Struct `ObservedJWKsUpdated`

When `ObservedJWKs` is updated, this event is sent to resync the JWK consensus state in all validators.

```move
module 0x1::jwks {
    #[event]
    struct ObservedJWKsUpdated has drop, store
}
```

<a id="0x1_jwks_Patch"></a>

## Struct `Patch`

A small edit or patch that is applied to a `AllProvidersJWKs` to obtain `PatchedJWKs`.

```move
module 0x1::jwks {
    struct Patch has copy, drop, store
}
```

<a id="0x1_jwks_PatchRemoveAll"></a>

## Struct `PatchRemoveAll`

A `Patch` variant to remove all JWKs.

```move
module 0x1::jwks {
    struct PatchRemoveAll has copy, drop, store
}
```

<a id="0x1_jwks_PatchRemoveIssuer"></a>

## Struct `PatchRemoveIssuer`

A `Patch` variant to remove an issuer and all its JWKs.

```move
module 0x1::jwks {
    struct PatchRemoveIssuer has copy, drop, store
}
```

<a id="0x1_jwks_PatchRemoveJWK"></a>

## Struct `PatchRemoveJWK`

A `Patch` variant to remove a specific JWK of an issuer.

```move
module 0x1::jwks {
    struct PatchRemoveJWK has copy, drop, store
}
```

<a id="0x1_jwks_PatchUpsertJWK"></a>

## Struct `PatchUpsertJWK`

A `Patch` variant to upsert a JWK for an issuer.

```move
module 0x1::jwks {
    struct PatchUpsertJWK has copy, drop, store
}
```

<a id="0x1_jwks_Patches"></a>

## Resource `Patches`

A sequence of `Patch` objects that are applied \*one by one\* to the `ObservedJWKs`.

Maintained by governance proposals.

```move
module 0x1::jwks {
    struct Patches has key
}
```

<a id="0x1_jwks_PatchedJWKs"></a>

## Resource `PatchedJWKs`

The result of applying the `Patches` to the `ObservedJWKs`.
This is what applications should consume.

```move
module 0x1::jwks {
    struct PatchedJWKs has drop, key
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_jwks_EISSUER_NOT_FOUND"></a>

```move
module 0x1::jwks {
    const EISSUER_NOT_FOUND: u64 = 5;
}
```

<a id="0x1_jwks_EJWK_ID_NOT_FOUND"></a>

```move
module 0x1::jwks {
    const EJWK_ID_NOT_FOUND: u64 = 6;
}
```

<a id="0x1_jwks_ENATIVE_INCORRECT_VERSION"></a>

```move
module 0x1::jwks {
    const ENATIVE_INCORRECT_VERSION: u64 = 259;
}
```

<a id="0x1_jwks_ENATIVE_MISSING_RESOURCE_OBSERVED_JWKS"></a>

```move
module 0x1::jwks {
    const ENATIVE_MISSING_RESOURCE_OBSERVED_JWKS: u64 = 258;
}
```

<a id="0x1_jwks_ENATIVE_MISSING_RESOURCE_VALIDATOR_SET"></a>

```move
module 0x1::jwks {
    const ENATIVE_MISSING_RESOURCE_VALIDATOR_SET: u64 = 257;
}
```

<a id="0x1_jwks_ENATIVE_MULTISIG_VERIFICATION_FAILED"></a>

```move
module 0x1::jwks {
    const ENATIVE_MULTISIG_VERIFICATION_FAILED: u64 = 260;
}
```

<a id="0x1_jwks_ENATIVE_NOT_ENOUGH_VOTING_POWER"></a>

```move
module 0x1::jwks {
    const ENATIVE_NOT_ENOUGH_VOTING_POWER: u64 = 261;
}
```

<a id="0x1_jwks_EUNEXPECTED_EPOCH"></a>

```move
module 0x1::jwks {
    const EUNEXPECTED_EPOCH: u64 = 1;
}
```

<a id="0x1_jwks_EUNEXPECTED_VERSION"></a>

```move
module 0x1::jwks {
    const EUNEXPECTED_VERSION: u64 = 2;
}
```

<a id="0x1_jwks_EUNKNOWN_JWK_VARIANT"></a>

```move
module 0x1::jwks {
    const EUNKNOWN_JWK_VARIANT: u64 = 4;
}
```

<a id="0x1_jwks_EUNKNOWN_PATCH_VARIANT"></a>

```move
module 0x1::jwks {
    const EUNKNOWN_PATCH_VARIANT: u64 = 3;
}
```

<a id="0x1_jwks_get_patched_jwk"></a>

## Function `get_patched_jwk`

Get a JWK by issuer and key ID from the `PatchedJWKs`.
Abort if such a JWK does not exist.
More convenient to call from Rust, since it does not wrap the JWK in an `Option`.

```move
module 0x1::jwks {
    public fun get_patched_jwk(issuer: vector<u8>, jwk_id: vector<u8>): jwks::JWK
}
```

<a id="0x1_jwks_try_get_patched_jwk"></a>

## Function `try_get_patched_jwk`

Get a JWK by issuer and key ID from the `PatchedJWKs`, if it exists.
More convenient to call from Move, since it does not abort.

```move
module 0x1::jwks {
    public fun try_get_patched_jwk(issuer: vector<u8>, jwk_id: vector<u8>): option::Option<jwks::JWK>
}
```

<a id="0x1_jwks_upsert_oidc_provider"></a>

## Function `upsert_oidc_provider`

Deprecated by `upsert_oidc_provider_for_next_epoch()`.

TODO: update all the tests that reference this function, then disable this function.

```move
module 0x1::jwks {
    public fun upsert_oidc_provider(fx: &signer, name: vector<u8>, config_url: vector<u8>): option::Option<vector<u8>>
}
```

<a id="0x1_jwks_upsert_oidc_provider_for_next_epoch"></a>

## Function `upsert_oidc_provider_for_next_epoch`

Used in on&#45;chain governances to update the supported OIDC providers, effective starting next epoch.
Example usage:

```
aptos_framework::jwks::upsert_oidc_provider_for_next_epoch(
&amp;framework_signer,
b&quot;https://accounts.google.com&quot;,
b&quot;https://accounts.google.com/.well&#45;known/openid&#45;configuration&quot;
);
aptos_framework::aptos_governance::reconfigure(&amp;framework_signer);
```

```move
module 0x1::jwks {
    public fun upsert_oidc_provider_for_next_epoch(fx: &signer, name: vector<u8>, config_url: vector<u8>): option::Option<vector<u8>>
}
```

<a id="0x1_jwks_remove_oidc_provider"></a>

## Function `remove_oidc_provider`

Deprecated by `remove_oidc_provider_for_next_epoch()`.

TODO: update all the tests that reference this function, then disable this function.

```move
module 0x1::jwks {
    public fun remove_oidc_provider(fx: &signer, name: vector<u8>): option::Option<vector<u8>>
}
```

<a id="0x1_jwks_remove_oidc_provider_for_next_epoch"></a>

## Function `remove_oidc_provider_for_next_epoch`

Used in on&#45;chain governances to update the supported OIDC providers, effective starting next epoch.
Example usage:

```
aptos_framework::jwks::remove_oidc_provider_for_next_epoch(
&amp;framework_signer,
b&quot;https://accounts.google.com&quot;,
);
aptos_framework::aptos_governance::reconfigure(&amp;framework_signer);
```

```move
module 0x1::jwks {
    public fun remove_oidc_provider_for_next_epoch(fx: &signer, name: vector<u8>): option::Option<vector<u8>>
}
```

<a id="0x1_jwks_on_new_epoch"></a>

## Function `on_new_epoch`

Only used in reconfigurations to apply the pending `SupportedOIDCProviders`, if there is any.

```move
module 0x1::jwks {
    public(friend) fun on_new_epoch(framework: &signer)
}
```

<a id="0x1_jwks_set_patches"></a>

## Function `set_patches`

Set the `Patches`. Only called in governance proposals.

```move
module 0x1::jwks {
    public fun set_patches(fx: &signer, patches: vector<jwks::Patch>)
}
```

<a id="0x1_jwks_new_patch_remove_all"></a>

## Function `new_patch_remove_all`

Create a `Patch` that removes all entries.

```move
module 0x1::jwks {
    public fun new_patch_remove_all(): jwks::Patch
}
```

<a id="0x1_jwks_new_patch_remove_issuer"></a>

## Function `new_patch_remove_issuer`

Create a `Patch` that removes the entry of a given issuer, if exists.

```move
module 0x1::jwks {
    public fun new_patch_remove_issuer(issuer: vector<u8>): jwks::Patch
}
```

<a id="0x1_jwks_new_patch_remove_jwk"></a>

## Function `new_patch_remove_jwk`

Create a `Patch` that removes the entry of a given issuer, if exists.

```move
module 0x1::jwks {
    public fun new_patch_remove_jwk(issuer: vector<u8>, jwk_id: vector<u8>): jwks::Patch
}
```

<a id="0x1_jwks_new_patch_upsert_jwk"></a>

## Function `new_patch_upsert_jwk`

Create a `Patch` that upserts a JWK into an issuer&apos;s JWK set.

```move
module 0x1::jwks {
    public fun new_patch_upsert_jwk(issuer: vector<u8>, jwk: jwks::JWK): jwks::Patch
}
```

<a id="0x1_jwks_new_rsa_jwk"></a>

## Function `new_rsa_jwk`

Create a `JWK` of variant `RSA_JWK`.

```move
module 0x1::jwks {
    public fun new_rsa_jwk(kid: string::String, alg: string::String, e: string::String, n: string::String): jwks::JWK
}
```

<a id="0x1_jwks_new_unsupported_jwk"></a>

## Function `new_unsupported_jwk`

Create a `JWK` of variant `UnsupportedJWK`.

```move
module 0x1::jwks {
    public fun new_unsupported_jwk(id: vector<u8>, payload: vector<u8>): jwks::JWK
}
```

<a id="0x1_jwks_initialize"></a>

## Function `initialize`

Initialize some JWK resources. Should only be invoked by genesis.

```move
module 0x1::jwks {
    public fun initialize(fx: &signer)
}
```

<a id="0x1_jwks_upsert_into_observed_jwks"></a>

## Function `upsert_into_observed_jwks`

Only used by validators to publish their observed JWK update.

NOTE: It is assumed verification has been done to ensure each update is quorum&#45;certified,
and its `version` equals to the on&#45;chain version &#43; 1.

```move
module 0x1::jwks {
    public fun upsert_into_observed_jwks(fx: &signer, provider_jwks_vec: vector<jwks::ProviderJWKs>)
}
```

<a id="0x1_jwks_remove_issuer_from_observed_jwks"></a>

## Function `remove_issuer_from_observed_jwks`

Only used by governance to delete an issuer from `ObservedJWKs`, if it exists.

Return the potentially existing `ProviderJWKs` of the given issuer.

```move
module 0x1::jwks {
    public fun remove_issuer_from_observed_jwks(fx: &signer, issuer: vector<u8>): option::Option<jwks::ProviderJWKs>
}
```
