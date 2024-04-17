---
title: "Using objects"
---

# Using objects

## Using an object as an entry function argument

`0x1::object::Object<T>` can be used as an input argument to an entry function.
It's encoded as the `address` of the object, and type checked to the value
in `T`.

For more generic functions, this can be handled as providing a generic `T` for
typing the input:

```move
module my_addr::object_playground {
  use aptos_framework::object::Object;

  /// This will fail of the object doesn't have the generic `T` stored
  entry fun do_something<T>(object: Object<T>) {
    // ...
  }
}
```

Additionally, the individual resources that are at the object can be used. The
resource will be checked for existence before the function executes.

```move
module my_addr::object_playground {
  use aptos_framework::object::Object;

  struct MyAwesomeStruct has key {}

  /// This will fail if the object doesn't have MyAwesomeStruct stored
  entry fun do_something(object: Object<MyAwesomeStruct>) {
    // ...
  }
}
```

The resource `0x1::object::ObjectCore` is available for all objects

```move
module my_addr::object_playground {
  use aptos_framework::object::{Object, ObjectCore};

  /// This will only fail of the address is not an object
  entry fun do_something(object: Object<ObjectCore>) {
    // ...
  }
}
```

# Object Types

Objects can store multiple resources at their address, and you can refer to an
Object by any of those types. You can convert an address to an object, or
convert
an object between types as long as the resource is available.

```move
module my_addr::object_playground {
  use aptos_framework::object::{self, Object, ObjectCore};

  struct MyAwesomeStruct has key {}

  fun convert_type(object: Object<ObjectCore>): Object<MyAwesomeStruct> {
    object::convert<MyAwesomeStruct>(object)
  }

  fun address_to_type(object_address: address): Object<MyAwesomeStruct> {
    object::address_to_object<MyAwesomeStruct>(object)
  }
}
```

# Object ownership

Objects can be owned by any address, this includes Objects, Accounts, and
Resource
accounts. This allows composability between objects, as well as complex
relationships
between objects.

## Looking up ownership

Ownership can be found by a few methods:

```move
module my_addr::object_playground {
  use std::signer;
  use aptos_framework::object::{self, Object};

  // Not authorized!
  const E_NOT_AUTHORIZED: u64 = 1;

  fun check_owner_is_caller<T>(caller: &signer, object: Object<T>) {
    assert!(
      object::is_owner(object, signer::address_of(caller)),
      E_NOT_AUTHORIZED
    );
  }

  fun check_is_owner_of_object<T>(addr: address, object: Object<T>) {
    assert!(object::owner(object) == addr, E_NOT_AUTHORIZED);
  }

  fun check_is_nested_owner_of_object<T, U>(
    caller: &signer,
    outside_object: Object<T>,
    inside_object: Object<U>
  ) {
    // Ownership expected
    // Caller account -> Outside object -> inside object

    // Check outside object owns inside object
    let outside_address = object::object_address(outside_object);
    assert!(object::owns(inside_object, outside_address), E_NOT_AUTHORIZED);

    // Check that the caller owns the outside object
    let caller_address = signer::address_of(caller);
    assert!(object::owns(outside_object, caller_address), E_NOT_AUTHORIZED);

    // Check that the caller owns the inside object (via the outside object)
    // This can skip the first two calls (and even more nested)
    assert!(object::owns(inside_object, caller_address), E_NOT_AUTHORIZED);
  }
}
```

## Transfer of ownership

An object can be transferred as long as ungated transfer has not been
disabled.  
See [disabling transfer of an object](./configuring-objects.md#disabling-or-re-enabling-transfers).

If the ungated transfer is disabled, only transfers can be done with
a `TransferRef` or a `LinearTransferRef`. When ungated transfers are enabled,
objects can be transferred as follows:

```move
module my_addr::object_playground {
  use aptos_framework::object::{self, Object};

  /// Transfer to another address, this can be an object or account
  fun transfer<T>(owner: &signer, object: Object<T>, destination: address) {
    object::transfer(owner, object, destination);
  }

  /// Transfer to another object
  fun transfer_to_object<T, U>(
    owner: &signer,
    object: Object<T>,
    destination: Object<U>
  ) {
    object::transfer_to_object(owner, object, destination);
  }
}
```

# Deleting or Burning objects

There are two ways to remove an object:

- Delete
- Burn

## Deleting

To delete an object, the user must have a `DeleteRef`
see [allowing deletion of an object](./configuring-objects.md#allowing-deletion-of-an-object).

## Burning

However, if the object is not deletable, you can tombstone and burn the unwanted
object.

```move
module my_addr::object_playground {
  use aptos_framework::object::{self, Object};

  fun burn_object<T>(owner: &signer, object: Object<T>) {
    object::burn(owner, object);
    assert!(object::is_burnt(object) == true, 1);
  }
}
```

If a user decided that they did not want to burn it, they can un-burn it

```move
module my_addr::object_playground {
  use aptos_framework::object::{self, Object};

  fun unburn_object<T>(owner: &signer, object: object::Object<T>) {
    object::unburn(owner, object);
    assert!(object::is_burnt(object) == false, 1);
  }
}
```

## Example contracts

- [Digital Asset Marketplace Example](https://github.com/aptos-labs/aptos-core/tree/main/aptos-move/move-examples/marketplace)
- [Digital Assets Examples](https://github.com/aptos-labs/aptos-core/tree/main/aptos-move/move-examples/token_objects)
- [Fungible Asset Examples](https://github.com/aptos-labs/aptos-core/tree/main/aptos-move/move-examples/fungible_asset)
