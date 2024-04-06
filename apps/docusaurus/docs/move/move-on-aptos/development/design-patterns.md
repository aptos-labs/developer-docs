---
title: "Move Design Patterns"
---

# Design patterns

Design patterns can help classify common tasks in an easy to define way

## Error handling

Errors are generally checking for invalid inputs or preventing access
accordingly. Keep in mind that if a transaction aborts, no changes in the
transaction will occur (except for taking gas).

### Assert on conditions

Asserting on a value can stop the transaction at that point if there is
unexpected state. This is usually the easiest, as it will revert any changes
done prior.

In the example below, we mint NFTs. If the number of NFTs left is lower than
the amount requested, the contract will abort, and no NFTs will be minted. This
is ideal to ensure the calling application checks the amount prior. The output
will also always be the same, the `amount` will be minted.

```move
module deployer_address::error_example {
  use mint_address::minter;

  /// Requested to mint more than is left to mint
  const E_MINT_AMOUNT_TOO_HIGH: u64 = 1;

  /// Mint multiple NFTs, aborting if there are not enough
  public fun mint_many(caller: &signer, amount: u64) {
    // Cancel the transaction if there are too many to mint
    assert!(amount <= minter::amount_left(), E_MINT_AMOUNT_TOO_HIGH);

    // Mint the amount
    for (i in 0..amount) {
      minter::mint_one();
    }
  }
}
```

### Handle conditions without abort

The other pattern we can take is to never abort the transaction unless there is
a particular reason to abort. This ensures state will always change regardless
of error conditions.

In the example below, the user mints up to the amount requested and it will not
abort if there are zero NFTs to actually mint. This is ideal in that the calling
application does not need to know the amount ahead of time. The caveat is that
the output state is different, it can be any value from 0 minted up to `amount`
minted of NFTs.

```move
module deployer_address::error_example {

  use mint_address::minter;

  /// Mint multiple NFTs up to the amount requested
  /// This will never fail, even if there's none to mint
  public fun mint_many(caller: &signer, amount: u64) {
    for (i in 0..amount) {
      // Mint as many as we can, if there are no more, quit
      if (0 == minter::amount_left()) {
        return
      };

      // Mint a single NFT
      minter::mint_one();
    }
  }
}
```

## Permissions

Access control and permissions are handled specifically by the contract writer.
If access control is skipped, it is possible that there is unexpected access to
the contract, and can lead to bugs and unexpected behavior.

### Access Control List (ACL) Model

An access control list (ACL) specifically checks a list or known addresses to
ensure that only known users can access (or not access) a function. This
specifically must use a `signer` as an input, as proof that the user is who they
say they are.

```move
module deployer_address::access_control_example {
  use aptos_framework::signer;

  /// User is not allowed
  const E_NOT_ALLOWED: u64 = 1;
  /// User is denied
  const E_DENIED: u64 = 2;

  struct AccessControl has key {
    allowlist: vector<address>,
    denylist: vector<address>
  }

  fun init_module(deployer: &signer) {
    move_to(deployer, AccessControl {
      allowlist: vector[],
      denylist: vector[],
    })
  }

  public fun only_allowed(caller: &signer) {
    let caller_address = signer::address_of(caller);

    let acl = borrow_global<AccessControl>(@deployer_address);
    assert!(vector::contains(acl.allowlist), E_NOT_ALLOWED);
  }

  public fun only_not_denied(caller: &signer) {
    let caller_address = signer::address_of(caller);

    let acl = borrow_global<AccessControl>(@deployer_address);
    assert!(vector::contains(acl.denylist), E_DENIED);
  }
}
```

### Capability Model

A capability model allows for accounts to be given a capability resource or
object that provides access to a given account.

```move
module deployer_address::capability_example {
  use aptos_framework::signer;

  /// Capability does not match expected address
  const E_NOT_ALLOWED: u64 = 1;
  /// Account doesn't own capability object
  const E_OBJECT_NOT_OWNED: u64 = 2;

  struct AccountCapability has key {
    capability: address,
  }

  fun init_module(deployer: &signer) {
    move_to(deployer, AccessControl {
      allowlist: vector[],
      denylist: vector[],
    })
  }

  public fun send_capability(deployer: &signer, destination: address) {
    let constructor_ref = object::create_object(destination);
    let object_signer = object::generate_signer(&constructor_ref);

    move_to(&object_signer, AccountCapability {
      capability: deployer
    })
  }

  public fun has_capability(
    capability: &AccountCapability,
    expected_address: address
  ) {
    assert!(capability.address == expected_address, E_NOT_ALLOWED);
  }

  public fun has_capability_object(
    caller: &signer,
    capability_object: Object<AccountCapability>,
    expected_address: address
  ) {
    // Ensure caller is owner of the object
    let caller_address = signer::address_of(caller);
    assert!(
      object::is_owner(&capability_object, caller_address),
      E_OBJECT_NOT_OWNED
    );

    // Ensure the capability matches the expected state
    let object_address = object::object_address(&capability_object);
    let capability = borrow_global<AccountCapability>(object_address);
    assert!(capability.address == expected_address, E_NOT_ALLOWED);
  }
}
```
