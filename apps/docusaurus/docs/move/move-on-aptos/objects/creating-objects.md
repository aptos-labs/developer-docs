---
title: "Creating objects"
---

# Creating Objects

When first creating an object, it will have a resource
named `0x1::object::ObjectCore`
added. This contains metadata about the object, as well as information about the
owner of the object.

Objects can be created in multiple ways depending on your needs. They can be
broken into two main types of objects:

- Deletable objects
- Non-deletable objects

## Creating a deletable object

Generally, users want objects to be deletable. If an object is deletable, then
storage refunds can be acquired by deleting the object, saving on gas.

### Deletable Objects

Create object generates a random unique address based on the transaction hash
and
a counter. The addresses of the objects are always unique and this is the
preferred
way to make most objects.

```move
module my_addr::object_playground {
  use std::signer;
  use aptos_framework::object;

  entry fun create_my_object(caller: &signer) {
    let caller_address = signer::address_of(caller);
    let constructor_ref = object::create_object(caller_address);
    // ...
  }
}
```

## Creating a non-deletable object

Non-deletable objects are useful for certain situations that need a guarantee of
an existing object. There are two ways to handle this on Aptos:

- Named objects
- Sticky objects

### Named objects

Create named object lets you create an object with a fixed seed. This makes it
easy to later

```move
module my_addr::object_playground {
  use std::signer;
  use aptos_framework::object;

  /// Seed for my named object, must be globally unique to the creating account
  const NAME: vector<u8> = b"MyAwesomeObject";

  entry fun create_my_object(caller: &signer) {
    let caller_address = signer::address_of(caller);
    let constructor_ref = object::create_named_object(caller_address, NAME);
    // ...
  }

  #[view]
  fun has_object(creator: address): bool {
    let object_address = object::create_object_address(&creator, NAME);
    object_exists<0x1::object::ObjectCore>(object_address)
  }
}
```

### Sticky objects

This is exactly the same as deletable objects, but the object
cannot be deleted. This is necessary for uses like fungible asset metadata that
would want to not be deleted.

```move
module my_addr::object_playground {
  use std::signer;
  use aptos_framework::object;

  entry fun create_my_object(caller: &signer) {
    let caller_address = signer::address_of(caller);
    let constructor_ref = object::create_sticky_object(caller_address);
    // ...
  }
}
```
