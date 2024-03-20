---
title: "Running Move Scripts"
---

import CodeBlock from '@theme/CodeBlock';

# How can I run Move Scripts?

Move scripts are supported in the Aptos TypeScript SDK, Aptos Wallet Adapter,
and in the Aptos CLI.

## Running scripts with the TypeScript SDK

To use a script with the TypeScript SDK, add the `bytecode` directly to the
transaction in place of an entry function name.

```ts
import { readFileSync } from "fs";
import { Aptos, Account, AccountAddress } from "@aptos-labs/ts-sdk";

// Setup client, and account to sign
const aptos = new Aptos();
const account = Account.generate();

// Load script bytecode
const buffer = readFileSync("./transfer_half.mv", "buffer");
const bytecode = new Uint8Array.from(buffer);

// Build a transaction with the bytecode of the script
const transaction = await aptos.transaction.build.simple({
  sender: account.accountAddress,
  data: {
    bytecode,
    typeArguments: ["0x1::aptos_coin::AptosCoin"],
    functionArguments: ["0x1"],
  },
});

// Submit and wait for the transaction to complete
const pendingTxn = await aptos.signAndSubmitTransaction({
  signer: account,
  transaction,
});
await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
```

## Running scripts with the Aptos Wallet Adapter

:::warning
Not all wallets support scripts, but when the wallet supports scripts, it can be
provided as below
:::

Similar to the TypeScript SDK, the same inputs are accepted as a transaction
type on the wallet adapter. Just simply load the bytecode as a hex `string` or
a `uint8array`.

```ts
import { useWallet } from "@aptos-labs/wallet-adapter-react";

//...

// Load the bytecode either as a uint8array or a hex encoded string
const BYTECODE_IN_HEX = "0xa11ceb0b...78979";

export default function App() {
  const { signAndSubmitTransaction } = useWallet();

  function submitScript() {
    signAndSubmitTransaction({
      data: {
        bytecode: BYTECODE_IN_HEX,
        typeArguments: ["0x1::aptos_coin::AptosCoin"],
        functionArguments: ["0x1"],
      },
    });
  }

  // ...
}
```

## Running scripts with the CLI

Running scripts with the CLI can be run with the command

```shell
aptos move run-script
```

There are two ways to run it, with a pre-compiled script, or it will compile the
script in-place similar to the compile step.

If you already have a compiled script, you can run it
with `--compiled-script-path` like the example below:

```shell
aptos move run-script --compiled-script-path /opt/git/developer-docs/apps/docusaurus/static/move-examples/scripts/transfer_half/script.mv
```

Similarly, if it's not compiled, just use `--script-path`

```shell
aptos move run-script --script-path ./sources/transfer_half.move
```
