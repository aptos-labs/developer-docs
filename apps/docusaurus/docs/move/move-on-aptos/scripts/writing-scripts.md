---
title: "Writing Move Scripts"
---

import CodeBlock from '@theme/CodeBlock';

# How can I write Move Scripts?

Move scripts can be written in tandem with Move contracts, but it's highly
suggested to use a separate Move package for it. This will make it easier for
you to determine which bytecode file comes from the script.

## Package layout

The package needs a Move.toml and a sources directory, similar to code modules.

For example, we may have a directory layout like:

```
my_project/
├── Move.toml
└── sources/
    └── my_script.move

```

## Script syntax

Scripts can be written exactly the same as modules on Aptos. Imports can be used
for any dependencies in the Move.toml file, and all public functions, including
entry functions, can be called from the contract. There are a few limitations:

- There must be only one function in the contract, it will compile to that name.
- Input arguments can only be one of
  [`u8`, `u16`, `u32`, `u64`, `u256`, `address`, `bool`, `signer`, `&signer`, `vector<u8>`].
  There is no support for vectors of other types, or structs.

An example below:

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

For more specific details see:
[Move Book on Scripts](/move/book/modules-and-scripts.md)
