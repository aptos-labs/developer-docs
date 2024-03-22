---
title: "Building with Objects"
---

import CodeBlock from '@theme/CodeBlock';

# What are objects?

The Move language controls access to resources using the store ability and
accounts. The Object model provides a way to associate a collection of resources
with a single address, using centralized resource control and ownership
management. An Object is a container for resources at a single address which can
be managed and accessed as a group for efficiency. The contract creating an
Object can define custom behaviors around changes and transfers of those
resources.

It's simply represented as an `ObjectCore` struct, which keeps track of the
owner of the `Object` and transfer permissions. Along with the ability to store
resources with an `ObjectGroup`. You can find more technical details at the
[Object standard](/standards/aptos-object.md) page, and view the code at the
[framework generated object documentation](../../../reference/move.md).

An example of creating and transferring an object:

```move
module my_addr::object_playground {
  use std::signer;
  use aptos_framework::object::{self, ObjectCore};

  entry fun create_and_transfer(caller: &signer, destination: address) {
    // Create object
    let caller_address = signer::address_of(caller);
    let constructor_ref = object::create_object(caller_address);

    // Set up the object...

    // Transfer to destination
    let object = object::object_from_constructor_ref<ObjectCore>(
      &constructor_ref
    );
    object::transfer(caller, object, destination);
  }
}
```

# Learn more about using Objects

- [Creating objects](./creating-objects.md)
- [Configuring objects](./configuring-objects.md)
- [Using objects](./using-objects.md)

# More details

For more details on objects, checkout:

- [Object standards](/standards/aptos-object.md) page.
- [Framework generated object documentation](/reference/move/##?branch=mainnet&page=aptos-framework/doc/object.md)
