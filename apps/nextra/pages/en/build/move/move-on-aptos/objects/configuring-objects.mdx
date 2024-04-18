---
title: "Configuring objects"
---

# Configuring objects

At this point, you have an object, but how do you specialize it? Objects must
be configured for their capabilities at creation time. If they are not
configured with the correct capabilities at creation time, it will be impossible
to change later.

## Adding Resources

An object must store data in resources. The signer of the object is required to
move resources to the object's storage. Below we'll go through a deletable
object example.

When I create my object, I can use the special `ConstructorRef` to create
resources only available at creation time. For example, you can create a signer
at creation time to move a resource into the object.

```move
module my_addr::object_playground {
  use std::signer;
  use aptos_framework::object;

  #[resource_group_member(group = aptos_framework::object::ObjectGroup)]
  struct MyStruct has key {
    num: u8
  }

  entry fun create_my_object(caller: &signer) {
    let caller_address = signer::address_of(caller);

    // Creates the object
    let constructor_ref = object::create_object(caller_address);

    // Retrieves a signer for the object
    let object_signer = object::generate_signer(&constructor_ref);

    // Moves the MyStruct resource into the object
    move_to(&object_signer, MyStruct { num: 0 });

    // ...
  }
}
```

## Extending the object

The object was created, but the user decided to add extra data. The `ExtendRef`
provides this functionality to retrieve the object's `signer` at a later time.

The `ExtendRef` can be used to generate a signer for the object. Permissions on
who can retrieve it must be defined by the contract.

```move
module my_addr::object_playground {
  use std::signer;
  use std::string::{self, String};
  use aptos_framework::object::{self, Object};

  /// Caller is not the owner of the object
  const E_NOT_OWNER: u64 = 1;
  /// Caller is not the publisher of the contract
  const E_NOT_PUBLISHER: u64 = 2;

  #[resource_group_member(group = aptos_framework::object::ObjectGroup)]
  struct MyStruct has key {
    num: u8
  }

  #[resource_group_member(group = aptos_framework::object::ObjectGroup)]
  struct Message has key {
    message: string::String
  }

  #[resource_group_member(group = aptos_framework::object::ObjectGroup)]
  struct ObjectController has key {
    extend_ref: object::ExtendRef,
  }

  entry fun create_my_object(caller: &signer) {
    let caller_address = signer::address_of(caller);

    // Creates the object
    let constructor_ref = object::create_object(caller_address);

    // Retrieves a signer for the object
    let object_signer = object::generate_signer(&constructor_ref);

    // Moves the MyStruct resource into the object
    move_to(&object_signer, MyStruct { num: 0 });

    // Creates an extend ref, and moves it to the object
    let extend_ref = object::generate_extend_ref(&constructor_ref);
    move_to(&object_signer, ObjectController { extend_ref });
    // ...
  }

  entry fun add_message(
    caller: &signer,
    object: Object<MyStruct>,
    message: String
  ) acquires ObjectController {
    let caller_address = signer::address_of(caller);
    // There are a couple ways to go about permissions

    // Allow only the owner of the object
    assert!(object::is_owner(object, caller_address), E_NOT_OWNER);
    // Allow only the publisher of the contract
    assert!(caller_address == @my_addr, E_NOT_PUBLISHER);
    // Or any other permission scheme you can think of, the possibilities are endless!

    // Use the extend ref to get a signer
    let object_address = object::object_address(object);
    let extend_ref = borrow_global<ObjectController>(object_address).extend_ref;
    let object_signer = object::generate_signer_for_extending(&extend_ref);

    // Extend the object to have a message
    move_to(object_signer, Message { message });
  }
}
```

## Disabling or re-enabling Transfers

Objects can be able to be transferred or not. By default, all objects are
transferable. However, this functionality can be toggled on and off, or chosen
at creation time. It is enabled by the `TransferRef`, which we'll illustrate
below.

```move
module my_addr::object_playground {
  use std::signer;
  use std::string::{self, String};
  use aptos_framework::object::{self, Object};

  /// Caller is not the publisher of the contract
  const E_NOT_PUBLISHER: u64 = 1;

  #[resource_group_member(group = aptos_framework::object::ObjectGroup)]
  struct ObjectController has key {
    transfer_ref: object::TransferRef,
  }

  entry fun create_my_object(
    caller: &signer,
    transferrable: bool,
    controllable: bool
  ) {
    let caller_address = signer::address_of(caller);

    // Creates the object
    let constructor_ref = object::create_object(caller_address);

    // Retrieves a signer for the object
    let object_signer = object::generate_signer(&constructor_ref);

    // Creates a transfer ref for controlling transfers
    let transfer_ref = object::generate_transfer_ref(&constructor_ref);

    // We now have a choice, we can make it so the object can be transferred
    // and we can decide if we want to allow it to change later.  By default, it
    // is transferrable
    if (!transferrable) {
      object::disable_ungated_transfer(&transfer_ref);
    };

    // If we want it to be controllable, we must store the transfer ref for later
    if (controllable) {
      move_to(&object_signer, ObjectController { transfer_ref });
    }
    // ...
  }

  /// In this example, we'll only let the publisher of the contract change the
  /// permissions of transferring
  entry fun toggle_transfer(
    caller: &signer,
    object: Object<ObjectController>
  ) acquires ObjectController {
    // Only let the publisher toggle transfers
    let caller_address = signer::address_of(caller);
    assert!(caller_address == @my_addr, E_NOT_PUBLISHER);

    // Retrieve the transfer ref
    let object_address = object::object_address(object);
    let transfer_ref = borrow_global<ObjectController>(
      object_address
    ).transfer_ref;

    // Toggle it based on its current state
    if (object::ungated_transfer_allowed(object)) {
      object::disable_ungated_transfer(&transfer_ref);
    } else {
      object::enable_ungated_transfer(&transfer_ref);
    }
  }
}
```

## Controlled transfers

Additionally, if the creator wants to control all transfers,
a `LinearTransferRef` can be created from the `TransferRef` to provide a one
time use transfer functionality. The `LinearTransferRef` has to be used by the
owner of the object.

```move
module my_addr::object_playground {
  use std::signer;
  use std::option;
  use std::string::{self, String};
  use aptos_framework::object::{self, Object};

  /// Caller is not the publisher of the contract
  const E_NOT_PUBLISHER: u64 = 1;

  #[resource_group_member(group = aptos_framework::object::ObjectGroup)]
  struct ObjectController has key {
    transfer_ref: object::TransferRef,
    linear_transfer_ref: option::Option<object::LinearTransferRef>,
  }

  entry fun create_my_object(
    caller: &signer,
    transferrable: bool,
    controllable: bool
  ) {
    let caller_address = signer::address_of(caller);

    // Creates the object
    let constructor_ref = object::create_object(caller_address);

    // Retrieves a signer for the object
    let object_signer = object::generate_signer(&constructor_ref);

    // Creates a transfer ref for controlling transfers
    let transfer_ref = object::generate_transfer_ref(&constructor_ref);

    // Disable ungated transfer
    object::disable_ungated_transfer(&transfer_ref);
    move_to(&object_signer, ObjectController {
      transfer_ref,
      linear_transfer_ref: option::none(),
    });
    // ...
  }

  /// In this example, we'll only let the publisher of the contract change the
  /// permissions of transferring
  entry fun allow_single_transfer(
    caller: &signer,
    object: Object<ObjectController>
  ) acquires ObjectController {
    // Only let the publisher toggle transfers
    let caller_address = signer::address_of(caller);
    assert!(caller_address == @my_addr, E_NOT_PUBLISHER);

    let object_address = object::object_address(object);

    // Retrieve the transfer ref
    let transfer_ref = borrow_global<ObjectController>(
      object_address
    ).transfer_ref;

    // Generate a one time use `LinearTransferRef`
    let linear_transfer_ref = object::generate_linear_transfer_ref(
      &transfer_ref
    );

    // Store it for later usage
    let object_controller = borrow_global_mut<ObjectController>(
      object_address
    );
    option::fill(
      &mut object_controller.linear_transfer_ref,
      linear_transfer_ref
    )
  }

  /// Now only owner can transfer exactly once
  entry fun transfer(
    caller: &signer,
    object: Object<ObjectController>,
    new_owner: address
  ) acquires ObjectController {
    let object_address = object::object_address(object);

    // Retrieve the linear_transfer ref, it is consumed so it must be extracted
    // from the resource
    let object_controller = borrow_global_mut<ObjectController>(
      object_address
    );
    let linear_transfer_ref = option::extract(
      &mut object_controller.linear_transfer_ref
    );

    object::transfer_with_ref(linear_transfer_ref, new_owner);
  }
}
```

## Allowing deletion of an Object

Deleting an object can be useful to get rid of clutter, as well as retrieve back
storage refunds. Deletion can be done with a `DeleteRef`, which must be created
at object creation time.

Note that you cannot create a `DeleteRef` for a non-deletable object.

```move
module my_addr::object_playground {
  use std::signer;
  use std::option;
  use std::string::{self, String};
  use aptos_framework::object::{self, Object};

  /// Caller is not the owner of the object
  const E_NOT_OWNER: u64 = 1;

  #[resource_group_member(group = aptos_framework::object::ObjectGroup)]
  struct ObjectController has key {
    delete_ref: object::DeleteRef,
  }

  entry fun create_my_object(
    caller: &signer,
    transferrable: bool,
    controllable: bool
  ) {
    let caller_address = signer::address_of(caller);

    // Creates the object
    let constructor_ref = object::create_object(caller_address);

    // Retrieves a signer for the object
    let object_signer = object::generate_signer(&constructor_ref);

    // Creates and store the delete ref
    let delete_ref = object::generate_delete_ref(&constructor_ref);
    move_to(&object_signer, ObjectController {
      delete_ref
    });
    // ...
  }

  /// Now only let the owner delete the object
  entry fun delete(
    caller: &signer,
    object: Object<ObjectController>,
  ) {
    // Only let caller delete
    let caller_address = signer::address_of(caller);
    assert!(object::is_owner(&object, caller_address), E_NOT_OWNER);

    let object_address = object::object_address(object);

    // Retrieve the delete ref, it is consumed so it must be extracted
    // from the resource
    let ObjectController {
      delete_ref
    } = move_from<ObjectController>(
      object_address
    );

    // Delete the object forever!
    object::delete(delete_ref);
  }
}
```

## Immutability

An object can be made immutable by making the contract associated immutable, and
removing any ability to extend or mutate the object. By default, contracts are
not immutable, and objects can be extended with an ExtendRef, and resources can
be mutated if the contract allows for it.
