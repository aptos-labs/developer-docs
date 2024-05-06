---
title: "Compiling Move Scripts"
---

import CodeBlock from '@theme/CodeBlock';

# How can I compile Move Scripts?

Move scripts can be compiled with the already existing Aptos Move compiler in
the Aptos CLI. Simply create a script file and compile it in the package with:

```shell
aptos move compile
```

There will then be compiled bytecode files under `build/` with the same name as
the function in Move.

For example this script in package `transfer_half`, would compile
to `build/transfer_half/bytecode_scripts/transfer_half.mv`

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

Additionally, there is a convenience function for a package with exactly one
script with the below command:

```shell
aptos move compile-script
```

Providing output like below returning the exact location of the script and a
hash for convenience

```shell
Compiling, may take a little while to download git dependencies...
UPDATING GIT DEPENDENCY https://github.com/aptos-labs/aptos-core.git
INCLUDING DEPENDENCY AptosFramework
INCLUDING DEPENDENCY AptosStdlib
INCLUDING DEPENDENCY MoveStdlib
BUILDING transfer_half
{
  "Result": {
    "script_location": "/opt/git/developer-docs/apps/docusaurus/static/move-examples/scripts/transfer_half/script.mv",
    "script_hash": "9b57ffa952da2a35438e2cf7e941ef2120bb6c2e4674d4fcefb51d5e8431a148"
  }
}
```
