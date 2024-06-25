<a id="0x1_system_addresses"></a>

# Module `0x1::system_addresses`

- [Constants](#@Constants_0)
- [Function `assert_core_resource`](#0x1_system_addresses_assert_core_resource)
- [Function `assert_core_resource_address`](#0x1_system_addresses_assert_core_resource_address)
- [Function `is_core_resource_address`](#0x1_system_addresses_is_core_resource_address)
- [Function `assert_aptos_framework`](#0x1_system_addresses_assert_aptos_framework)
- [Function `assert_framework_reserved_address`](#0x1_system_addresses_assert_framework_reserved_address)
- [Function `assert_framework_reserved`](#0x1_system_addresses_assert_framework_reserved)
- [Function `is_framework_reserved_address`](#0x1_system_addresses_is_framework_reserved_address)
- [Function `is_aptos_framework_address`](#0x1_system_addresses_is_aptos_framework_address)
- [Function `assert_vm`](#0x1_system_addresses_assert_vm)
- [Function `is_vm`](#0x1_system_addresses_is_vm)
- [Function `is_vm_address`](#0x1_system_addresses_is_vm_address)
- [Function `is_reserved_address`](#0x1_system_addresses_is_reserved_address)

```move
module 0x1::system_addresses {
    use 0x1::error;
    use 0x1::signer;
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_system_addresses_ENOT_APTOS_FRAMEWORK_ADDRESS"></a>

The address/account did not correspond to the core framework address

```move
module 0x1::system_addresses {
    const ENOT_APTOS_FRAMEWORK_ADDRESS: u64 = 3;
}
```

<a id="0x1_system_addresses_ENOT_CORE_RESOURCE_ADDRESS"></a>

The address/account did not correspond to the core resource address

```move
module 0x1::system_addresses {
    const ENOT_CORE_RESOURCE_ADDRESS: u64 = 1;
}
```

<a id="0x1_system_addresses_ENOT_FRAMEWORK_RESERVED_ADDRESS"></a>

The address is not framework reserved address

```move
module 0x1::system_addresses {
    const ENOT_FRAMEWORK_RESERVED_ADDRESS: u64 = 4;
}
```

<a id="0x1_system_addresses_EVM"></a>

The operation can only be performed by the VM

```move
module 0x1::system_addresses {
    const EVM: u64 = 2;
}
```

<a id="0x1_system_addresses_assert_core_resource"></a>

## Function `assert_core_resource`

```move
module 0x1::system_addresses {
    public fun assert_core_resource(account: &signer)
}
```

<a id="0x1_system_addresses_assert_core_resource_address"></a>

## Function `assert_core_resource_address`

```move
module 0x1::system_addresses {
    public fun assert_core_resource_address(addr: address)
}
```

<a id="0x1_system_addresses_is_core_resource_address"></a>

## Function `is_core_resource_address`

```move
module 0x1::system_addresses {
    public fun is_core_resource_address(addr: address): bool
}
```

<a id="0x1_system_addresses_assert_aptos_framework"></a>

## Function `assert_aptos_framework`

```move
module 0x1::system_addresses {
    public fun assert_aptos_framework(account: &signer)
}
```

<a id="0x1_system_addresses_assert_framework_reserved_address"></a>

## Function `assert_framework_reserved_address`

```move
module 0x1::system_addresses {
    public fun assert_framework_reserved_address(account: &signer)
}
```

<a id="0x1_system_addresses_assert_framework_reserved"></a>

## Function `assert_framework_reserved`

```move
module 0x1::system_addresses {
    public fun assert_framework_reserved(addr: address)
}
```

<a id="0x1_system_addresses_is_framework_reserved_address"></a>

## Function `is_framework_reserved_address`

Return true if `addr` is 0x0 or under the on chain governance&apos;s control.

```move
module 0x1::system_addresses {
    public fun is_framework_reserved_address(addr: address): bool
}
```

<a id="0x1_system_addresses_is_aptos_framework_address"></a>

## Function `is_aptos_framework_address`

Return true if `addr` is 0x1.

```move
module 0x1::system_addresses {
    public fun is_aptos_framework_address(addr: address): bool
}
```

<a id="0x1_system_addresses_assert_vm"></a>

## Function `assert_vm`

Assert that the signer has the VM reserved address.

```move
module 0x1::system_addresses {
    public fun assert_vm(account: &signer)
}
```

<a id="0x1_system_addresses_is_vm"></a>

## Function `is_vm`

Return true if `addr` is a reserved address for the VM to call system modules.

```move
module 0x1::system_addresses {
    public fun is_vm(account: &signer): bool
}
```

<a id="0x1_system_addresses_is_vm_address"></a>

## Function `is_vm_address`

Return true if `addr` is a reserved address for the VM to call system modules.

```move
module 0x1::system_addresses {
    public fun is_vm_address(addr: address): bool
}
```

<a id="0x1_system_addresses_is_reserved_address"></a>

## Function `is_reserved_address`

Return true if `addr` is either the VM address or an Aptos Framework address.

```move
module 0x1::system_addresses {
    public fun is_reserved_address(addr: address): bool
}
```
