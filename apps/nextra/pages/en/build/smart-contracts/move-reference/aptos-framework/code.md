<a id="0x1_code"></a>

# Module `0x1::code`

This module supports functionality related to code management.

- [Resource `PackageRegistry`](#0x1_code_PackageRegistry)
- [Struct `PackageMetadata`](#0x1_code_PackageMetadata)
- [Struct `PackageDep`](#0x1_code_PackageDep)
- [Struct `ModuleMetadata`](#0x1_code_ModuleMetadata)
- [Struct `UpgradePolicy`](#0x1_code_UpgradePolicy)
- [Struct `PublishPackage`](#0x1_code_PublishPackage)
- [Struct `AllowedDep`](#0x1_code_AllowedDep)
- [Constants](#@Constants_0)
- [Function `upgrade_policy_arbitrary`](#0x1_code_upgrade_policy_arbitrary)
- [Function `upgrade_policy_compat`](#0x1_code_upgrade_policy_compat)
- [Function `upgrade_policy_immutable`](#0x1_code_upgrade_policy_immutable)
- [Function `can_change_upgrade_policy_to`](#0x1_code_can_change_upgrade_policy_to)
- [Function `publish_package`](#0x1_code_publish_package)
- [Function `freeze_code_object`](#0x1_code_freeze_code_object)
- [Function `publish_package_txn`](#0x1_code_publish_package_txn)

```move
module 0x1::code {
    use 0x1::copyable_any;
    use 0x1::error;
    use 0x1::event;
    use 0x1::features;
    use 0x1::object;
    use 0x1::option;
    use 0x1::signer;
    use 0x1::string;
    use 0x1::system_addresses;
    use 0x1::util;
    use 0x1::vector;
}
```

<a id="0x1_code_PackageRegistry"></a>

## Resource `PackageRegistry`

The package registry at the given address.

```move
module 0x1::code {
    struct PackageRegistry has drop, store, key
}
```

<a id="0x1_code_PackageMetadata"></a>

## Struct `PackageMetadata`

Metadata for a package. All byte blobs are represented as base64&#45;of&#45;gzipped&#45;bytes

```move
module 0x1::code {
    struct PackageMetadata has drop, store
}
```

<a id="0x1_code_PackageDep"></a>

## Struct `PackageDep`

A dependency to a package published at address

```move
module 0x1::code {
    struct PackageDep has copy, drop, store
}
```

<a id="0x1_code_ModuleMetadata"></a>

## Struct `ModuleMetadata`

Metadata about a module in a package.

```move
module 0x1::code {
    struct ModuleMetadata has drop, store
}
```

<a id="0x1_code_UpgradePolicy"></a>

## Struct `UpgradePolicy`

Describes an upgrade policy

```move
module 0x1::code {
    struct UpgradePolicy has copy, drop, store
}
```

<a id="0x1_code_PublishPackage"></a>

## Struct `PublishPackage`

Event emitted when code is published to an address.

```move
module 0x1::code {
    #[event]
    struct PublishPackage has drop, store
}
```

<a id="0x1_code_AllowedDep"></a>

## Struct `AllowedDep`

A helper type for request_publish_with_allowed_deps

```move
module 0x1::code {
    struct AllowedDep has drop
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_code_ECODE_OBJECT_DOES_NOT_EXIST"></a>

`code_object` does not exist.

```move
module 0x1::code {
    const ECODE_OBJECT_DOES_NOT_EXIST: u64 = 10;
}
```

<a id="0x1_code_EDEP_ARBITRARY_NOT_SAME_ADDRESS"></a>

A dependency to an `arbitrary` package must be on the same address.

```move
module 0x1::code {
    const EDEP_ARBITRARY_NOT_SAME_ADDRESS: u64 = 7;
}
```

<a id="0x1_code_EDEP_WEAKER_POLICY"></a>

A dependency cannot have a weaker upgrade policy.

```move
module 0x1::code {
    const EDEP_WEAKER_POLICY: u64 = 6;
}
```

<a id="0x1_code_EINCOMPATIBLE_POLICY_DISABLED"></a>

Creating a package with incompatible upgrade policy is disabled.

```move
module 0x1::code {
    const EINCOMPATIBLE_POLICY_DISABLED: u64 = 8;
}
```

<a id="0x1_code_EMODULE_MISSING"></a>

Cannot delete a module that was published in the same package

```move
module 0x1::code {
    const EMODULE_MISSING: u64 = 4;
}
```

<a id="0x1_code_EMODULE_NAME_CLASH"></a>

Package contains duplicate module names with existing modules publised in other packages on this address

```move
module 0x1::code {
    const EMODULE_NAME_CLASH: u64 = 1;
}
```

<a id="0x1_code_ENOT_PACKAGE_OWNER"></a>

Not the owner of the package registry.

```move
module 0x1::code {
    const ENOT_PACKAGE_OWNER: u64 = 9;
}
```

<a id="0x1_code_EPACKAGE_DEP_MISSING"></a>

Dependency could not be resolved to any published package.

```move
module 0x1::code {
    const EPACKAGE_DEP_MISSING: u64 = 5;
}
```

<a id="0x1_code_EUPGRADE_IMMUTABLE"></a>

Cannot upgrade an immutable package

```move
module 0x1::code {
    const EUPGRADE_IMMUTABLE: u64 = 2;
}
```

<a id="0x1_code_EUPGRADE_WEAKER_POLICY"></a>

Cannot downgrade a package&apos;s upgradability policy

```move
module 0x1::code {
    const EUPGRADE_WEAKER_POLICY: u64 = 3;
}
```

<a id="0x1_code_upgrade_policy_arbitrary"></a>

## Function `upgrade_policy_arbitrary`

Whether unconditional code upgrade with no compatibility check is allowed. This
publication mode should only be used for modules which aren&apos;t shared with user others.
The developer is responsible for not breaking memory layout of any resources he already
stored on chain.

```move
module 0x1::code {
    public fun upgrade_policy_arbitrary(): code::UpgradePolicy
}
```

<a id="0x1_code_upgrade_policy_compat"></a>

## Function `upgrade_policy_compat`

Whether a compatibility check should be performed for upgrades. The check only passes if
a new module has (a) the same public functions (b) for existing resources, no layout change.

```move
module 0x1::code {
    public fun upgrade_policy_compat(): code::UpgradePolicy
}
```

<a id="0x1_code_upgrade_policy_immutable"></a>

## Function `upgrade_policy_immutable`

Whether the modules in the package are immutable and cannot be upgraded.

```move
module 0x1::code {
    public fun upgrade_policy_immutable(): code::UpgradePolicy
}
```

<a id="0x1_code_can_change_upgrade_policy_to"></a>

## Function `can_change_upgrade_policy_to`

Whether the upgrade policy can be changed. In general, the policy can be only
strengthened but not weakened.

```move
module 0x1::code {
    public fun can_change_upgrade_policy_to(from: code::UpgradePolicy, to: code::UpgradePolicy): bool
}
```

<a id="0x1_code_publish_package"></a>

## Function `publish_package`

Publishes a package at the given signer&apos;s address. The caller must provide package metadata describing the
package.

```move
module 0x1::code {
    public fun publish_package(owner: &signer, pack: code::PackageMetadata, code: vector<vector<u8>>)
}
```

<a id="0x1_code_freeze_code_object"></a>

## Function `freeze_code_object`

```move
module 0x1::code {
    public fun freeze_code_object(publisher: &signer, code_object: object::Object<code::PackageRegistry>)
}
```

<a id="0x1_code_publish_package_txn"></a>

## Function `publish_package_txn`

Same as `publish_package` but as an entry function which can be called as a transaction. Because
of current restrictions for txn parameters, the metadata needs to be passed in serialized form.

```move
module 0x1::code {
    public entry fun publish_package_txn(owner: &signer, metadata_serialized: vector<u8>, code: vector<vector<u8>>)
}
```
