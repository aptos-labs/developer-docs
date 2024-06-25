<a id="0x1_jwk_consensus_config"></a>

# Module `0x1::jwk_consensus_config`

Structs and functions related to JWK consensus configurations.

- [Resource `JWKConsensusConfig`](#0x1_jwk_consensus_config_JWKConsensusConfig)
- [Struct `ConfigOff`](#0x1_jwk_consensus_config_ConfigOff)
- [Struct `OIDCProvider`](#0x1_jwk_consensus_config_OIDCProvider)
- [Struct `ConfigV1`](#0x1_jwk_consensus_config_ConfigV1)
- [Constants](#@Constants_0)
- [Function `initialize`](#0x1_jwk_consensus_config_initialize)
- [Function `set_for_next_epoch`](#0x1_jwk_consensus_config_set_for_next_epoch)
- [Function `on_new_epoch`](#0x1_jwk_consensus_config_on_new_epoch)
- [Function `new_off`](#0x1_jwk_consensus_config_new_off)
- [Function `new_v1`](#0x1_jwk_consensus_config_new_v1)
- [Function `new_oidc_provider`](#0x1_jwk_consensus_config_new_oidc_provider)

```move
module 0x1::jwk_consensus_config {
    use 0x1::config_buffer;
    use 0x1::copyable_any;
    use 0x1::error;
    use 0x1::option;
    use 0x1::simple_map;
    use 0x1::string;
    use 0x1::system_addresses;
}
```

<a id="0x1_jwk_consensus_config_JWKConsensusConfig"></a>

## Resource `JWKConsensusConfig`

The configuration of the JWK consensus feature.

```move
module 0x1::jwk_consensus_config {
    struct JWKConsensusConfig has drop, store, key
}
```

<a id="0x1_jwk_consensus_config_ConfigOff"></a>

## Struct `ConfigOff`

A JWK consensus config variant indicating JWK consensus should not run.

```move
module 0x1::jwk_consensus_config {
    struct ConfigOff has copy, drop, store
}
```

<a id="0x1_jwk_consensus_config_OIDCProvider"></a>

## Struct `OIDCProvider`

```move
module 0x1::jwk_consensus_config {
    struct OIDCProvider has copy, drop, store
}
```

<a id="0x1_jwk_consensus_config_ConfigV1"></a>

## Struct `ConfigV1`

A JWK consensus config variant indicating JWK consensus should run to watch a given list of OIDC providers.

```move
module 0x1::jwk_consensus_config {
    struct ConfigV1 has copy, drop, store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_jwk_consensus_config_EDUPLICATE_PROVIDERS"></a>

`ConfigV1` creation failed with duplicated providers given.

```move
module 0x1::jwk_consensus_config {
    const EDUPLICATE_PROVIDERS: u64 = 1;
}
```

<a id="0x1_jwk_consensus_config_initialize"></a>

## Function `initialize`

Initialize the configuration. Used in genesis or governance.

```move
module 0x1::jwk_consensus_config {
    public fun initialize(framework: &signer, config: jwk_consensus_config::JWKConsensusConfig)
}
```

<a id="0x1_jwk_consensus_config_set_for_next_epoch"></a>

## Function `set_for_next_epoch`

This can be called by on&#45;chain governance to update JWK consensus configs for the next epoch.
Example usage:

```
use aptos_framework::jwk_consensus_config;
use aptos_framework::aptos_governance;
// ...
let config &#61; jwk_consensus_config::new_v1(vector[]);
jwk_consensus_config::set_for_next_epoch(&amp;framework_signer, config);
aptos_governance::reconfigure(&amp;framework_signer);
```

```move
module 0x1::jwk_consensus_config {
    public fun set_for_next_epoch(framework: &signer, config: jwk_consensus_config::JWKConsensusConfig)
}
```

<a id="0x1_jwk_consensus_config_on_new_epoch"></a>

## Function `on_new_epoch`

Only used in reconfigurations to apply the pending `JWKConsensusConfig`, if there is any.

```move
module 0x1::jwk_consensus_config {
    public(friend) fun on_new_epoch(framework: &signer)
}
```

<a id="0x1_jwk_consensus_config_new_off"></a>

## Function `new_off`

Construct a `JWKConsensusConfig` of variant `ConfigOff`.

```move
module 0x1::jwk_consensus_config {
    public fun new_off(): jwk_consensus_config::JWKConsensusConfig
}
```

<a id="0x1_jwk_consensus_config_new_v1"></a>

## Function `new_v1`

Construct a `JWKConsensusConfig` of variant `ConfigV1`.

Abort if the given provider list contains duplicated provider names.

```move
module 0x1::jwk_consensus_config {
    public fun new_v1(oidc_providers: vector<jwk_consensus_config::OIDCProvider>): jwk_consensus_config::JWKConsensusConfig
}
```

<a id="0x1_jwk_consensus_config_new_oidc_provider"></a>

## Function `new_oidc_provider`

Construct an `OIDCProvider` object.

```move
module 0x1::jwk_consensus_config {
    public fun new_oidc_provider(name: string::String, config_url: string::String): jwk_consensus_config::OIDCProvider
}
```
