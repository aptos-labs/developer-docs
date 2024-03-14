---
title: "Building with Move Scripts"
---

import CodeBlock from '@theme/CodeBlock';

# What are Move Scripts?

Move Scripts are a way to run multiple public functions on Aptos in a single
transaction. This is similar to deploying a helper module that would do common
tasks, but allows for the flexibility of not having to deploy beforehand.

An example would be a function to transfer a half of a user's balance to another
account. This is something that is easily programmable, but likely would not
need a module deployed for it:

```move
script {
  use std::signer;
  use aptos_framework::coin;
  use aptos_framework::aptos_account;

  fun transfer_half<Coin>(caller: &signer, receiver_address: address) {
    // Retrieve the balance of the caller
    let caller_address: address = signer::address_of(caller);
    let balance: u64 = coin::balance<Coin>(caller_address);

    // Send half to the receiver
    let half = balance / 2;
    aptos_account::transfer_coins<Coin>(caller, receiver_address, half);
  }
}
```

# Learn more about using Move Scripts

- [Writing scripts](./writing-scripts.md)
- [Compiling scripts](./compiling-scripts.md)
- [Running scripts](./running-scripts.md)

# More details

For more details on Move Scripts, checkout:

- [Move Book on Scripts](/move/book/modules-and-scripts.md)
- [Tutorial on Scripts](./script-tutorial.md)
