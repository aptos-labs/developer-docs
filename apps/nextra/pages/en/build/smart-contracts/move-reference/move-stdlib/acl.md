<a id="0x1_acl"></a>

# Module `0x1::acl`

Access control list (acl) module. An acl is a list of account addresses who
have the access permission to a certain object.
This module uses a `vector` to represent the list, but can be refactored to
use a &quot;set&quot; instead when it&apos;s available in the language in the future.

- [Struct `ACL`](#0x1_acl_ACL)
- [Constants](#@Constants_0)
- [Function `empty`](#0x1_acl_empty)
- [Function `add`](#0x1_acl_add)
- [Function `remove`](#0x1_acl_remove)
- [Function `contains`](#0x1_acl_contains)
- [Function `assert_contains`](#0x1_acl_assert_contains)

```move
module 0x1::acl {
    use 0x1::error;
    use 0x1::vector;
}
```

<a id="0x1_acl_ACL"></a>

## Struct `ACL`

```move
module 0x1::acl {
    struct ACL has copy, drop, store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_acl_ECONTAIN"></a>

The ACL already contains the address.

```move
module 0x1::acl {
    const ECONTAIN: u64 = 0;
}
```

<a id="0x1_acl_ENOT_CONTAIN"></a>

The ACL does not contain the address.

```move
module 0x1::acl {
    const ENOT_CONTAIN: u64 = 1;
}
```

<a id="0x1_acl_empty"></a>

## Function `empty`

Return an empty ACL.

```move
module 0x1::acl {
    public fun empty(): acl::ACL
}
```

<a id="0x1_acl_add"></a>

## Function `add`

Add the address to the ACL.

```move
module 0x1::acl {
    public fun add(acl: &mut acl::ACL, addr: address)
}
```

<a id="0x1_acl_remove"></a>

## Function `remove`

Remove the address from the ACL.

```move
module 0x1::acl {
    public fun remove(acl: &mut acl::ACL, addr: address)
}
```

<a id="0x1_acl_contains"></a>

## Function `contains`

Return true iff the ACL contains the address.

```move
module 0x1::acl {
    public fun contains(acl: &acl::ACL, addr: address): bool
}
```

<a id="0x1_acl_assert_contains"></a>

## Function `assert_contains`

assert! that the ACL has the address.

```move
module 0x1::acl {
    public fun assert_contains(acl: &acl::ACL, addr: address)
}
```
