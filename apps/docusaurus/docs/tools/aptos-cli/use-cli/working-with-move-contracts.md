---
title: "Working With Move Contracts"
---

# Working With Move Contracts

The Aptos CLI is mostly used to compile, test, and formally verify Move contracts. If you have not installed the Aptos CLI yet, you can do so by following the steps here [Install the Aptos CLI](../install-cli/index.md).

You can jump to sections here:

1. [Compiling Move](#1-compiling-move)
2. [Unit Testing Move Contracts](#2-unit-testing-move-contracts)
3. [Generating Test Coverage Reports](#3-generating-test-coverage-reports)
4. [Publishing Move Contracts](#4-publishing-move-contracts)
5. [Running Published Contracts](#5-running-published-contracts)
6. [(Optional) Formally Verifying Move Scripts](#6-optional-formally-verifying-move-scripts)

To see how to chain together Move contracts on-chain using the CLI, you can follow this ["CLI Arguments" tutorial](./move-tutorials/arguments-in-json-tutorial.md).

:::tip
Throughout this document there are parts of commands you will have to modify to fit your situation. Those variables will be wrapped in triangle brackets `<like this>`.
:::

## 1. Compiling Move

You can compile a Move package by running:

```bash
aptos move compile --package-dir <your-package-directory>
```

:::tip
The package directory is the folder which contains the `Move.toml` file.
:::

Based on the settings in your `Move.toml` file, you may need to pass in additional information to that compile command.

For example, if you look at the [hello_blockchain example Move contract](https://github.com/aptos-labs/aptos-core/tree/main/aptos-move/move-examples/hello_blockchain), in the `Move.toml` file it specifies a variable named address called `hello_blockchain`.

```
[addresses]
hello_blockchain = "_"
```

So, to compile this, you will need to pass in the value for `hello_blockchain` with the `--named-addresses` parameter.

```bash
aptos move compile --package-dir aptos-move/move-examples/hello_blockchain/ --named-addresses hello_blockchain=superuser
```

You can learn more about optional parameters when compiling Move contracts by running `aptos move compile --help`.

## 2. Unit Testing Move Contracts

The Aptos CLI can also be used to compile and run unit tests locally by running:

```bash
aptos move test --package-dir <your-package-directory>
```

This command both compiles and runs tests, so it needs all the same optional parameters you use when compiling.

You can learn more about the optional parameters for testing move contracts by running `aptos move test --help`.

### Printing Debugging Information

When writing tests, it can be helpful to print out debug information or stack traces. You can do that by using `debug::print` and `debug::print_stack_trace` to print information when you use `aptos move test`. See an example of how they are used in [DebugDemo.move](https://github.com/aptos-labs/aptos-core/blob/main/crates/aptos/debug-move-example/sources/DebugDemo.move).

To see the output of testing [DebugDemo.move](https://github.com/aptos-labs/aptos-core/blob/main/crates/aptos/debug-move-example/sources/DebugDemo.move)’s package:

1. Clone `[aptos-core](https://github.com/aptos-labs/aptos-core)`.
2. Navigate to the [debug-move-example](https://github.com/aptos-labs/aptos-core/tree/main/crates/aptos/debug-move-example) by running `cd crates/aptos/debug-move-example`.
3. Run `aptos move test`.

You should see:

```
Running Move unit tests
[debug] 0000000000000000000000000000000000000000000000000000000000000001
Call Stack:
    [0] 0000000000000000000000000000000000000000000000000000000000000001::Message::sender_can_set_message

        Code:
            [4] CallGeneric(0)
            [5] MoveLoc(0)
            [6] LdConst(0)
          > [7] Call(1)
            [8] Ret

        Locals:
            [0] -
            [1] 0000000000000000000000000000000000000000000000000000000000000001

Operand Stack:
```

For more on how to write unit tests with Move, follow this [Move tutorial](https://github.com/aptos-labs/aptos-core/tree/main/aptos-move/move-examples/move-tutorial) (step 2 focuses on unit tests).

## 3. Generating Test Coverage Reports

The Aptos CLI can be used to analyze and improve the testing of your Move modules. To use this feature:

To see the code coverage of your tests run the following command from your Move package’s directory:

```bash
aptos move test --coverage
```

If you would like to focus your coverage down to specific packages, you can do so with the `--filter` option. To narrow even further to specific Move modules, use the `--module` parameter.

For more detailed / advanced coverage information (such as your test coverage in the compiled bytecode) you can run `aptos move coverage` . With that command, the CLI will prompt you for more details on what specifically you would like more coverage information about.

You can learn more about optional parameters for test coverage by running `aptos move test --help` and `aptos move coverage --help`.

## 4. Publishing Move Contracts

To publish a Move contract, you will need to run:

```bash
aptos move publish --package-dir <your-package-directory>
```

Note that when you are publishing on the main network, the credentials you pass into optional parameters like `--named-addresses` will need to reflect accounts on that network instead of test credentials.

The package will be published to your default profile in the CLI. You can override that to specify which account to publish to using `--profile` in the command. To generate a new profile for a specific account, use `aptos init --profile <name_of_profile>` and follow the prompts.

Please also note that when publishing Move modules, if multiple modules are in one package, then all modules in that package must use the same account. If they use different accounts, then the publishing will fail at the transaction level.

You can estimate the gas fees associated with publishing your Move contract by using the [Gas Profiler](../../../move/move-on-aptos/gas-profiling.md).

:::caution
By default Move contracts publish their source code. To avoid publishing with source code, publish with the `--included-artifacts none` argument.

Since the Aptos blockchain is inherently open by design, note that even without source access it is possible to regenerate Move source from published Move bytecode.
:::

## 5. Running Published Contracts

Now that you have published your Move package, you can run it directly from the CLI.

You will first need to construct your `function-id` by combining:

```jsx
<the-address-you-published-to>::<module_name>::<function_name>
```

You can then pass in args by using the `--args` parameter.

As an example, if you were to have published the [hello_blockchain example package](https://github.com/aptos-labs/aptos-core/tree/main/aptos-move/move-examples/hello_blockchain) to an account with an address `b9bd2cfa58ca29bce1d7add25fce5c62220604cd0236fe3f90d9de91ed9fb8cb` you could run its `set_message` function via the following command:

```bash
aptos move run --function-id 0xb9bd2cfa58ca29bce1d7add25fce5c62220604cd0236fe3f90d9de91ed9fb8cb::message::set_message --args string:hello!
```

Which should result in:

```json
{
  "Result": {
    "changes": [
      {
        "address": "b9bd2cfa58ca29bce1d7add25fce5c62220604cd0236fe3f90d9de91ed9fb8cb",
        "data": {
          "authentication_key": "0xb9bd2cfa58ca29bce1d7add25fce5c62220604cd0236fe3f90d9de91ed9fb8cb",
          "self_address": "0xb9bd2cfa58ca29bce1d7add25fce5c62220604cd0236fe3f90d9de91ed9fb8cb",
          "sequence_number": "3"
        },
        "event": "write_resource",
        "resource": "0x1::account::Account"
      },
      {
        "address": "b9bd2cfa58ca29bce1d7add25fce5c62220604cd0236fe3f90d9de91ed9fb8cb",
        "data": {
          "coin": {
            "value": "9777"
          },
          "deposit_events": {
            "counter": "1",
            "guid": {
              "id": {
                "addr": "0xb9bd2cfa58ca29bce1d7add25fce5c62220604cd0236fe3f90d9de91ed9fb8cb",
                "creation_num": "1"
              }
            }
          },
          "withdraw_events": {
            "counter": "1",
            "guid": {
              "id": {
                "addr": "0xb9bd2cfa58ca29bce1d7add25fce5c62220604cd0236fe3f90d9de91ed9fb8cb",
                "creation_num": "2"
              }
            }
          }
        },
        "event": "write_resource",
        "resource": "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>"
      },
      {
        "address": "b9bd2cfa58ca29bce1d7add25fce5c62220604cd0236fe3f90d9de91ed9fb8cb",
        "data": {
          "counter": "4"
        },
        "event": "write_resource",
        "resource": "0x1::guid::Generator"
      },
      {
        "address": "b9bd2cfa58ca29bce1d7add25fce5c62220604cd0236fe3f90d9de91ed9fb8cb",
        "data": {
          "message": "hello!",
          "message_change_events": {
            "counter": "0",
            "guid": {
              "id": {
                "addr": "0xb9bd2cfa58ca29bce1d7add25fce5c62220604cd0236fe3f90d9de91ed9fb8cb",
                "creation_num": "3"
              }
            }
          }
        },
        "event": "write_resource",
        "resource": "0xb9bd2cfa58ca29bce1d7add25fce5c62220604cd0236fe3f90d9de91ed9fb8cb::Message::MessageHolder"
      }
    ],
    "gas_used": 41,
    "success": true,
    "version": 3488,
    "vm_status": "Executed successfully"
  }
}
```

## 6. (Optional) Formally Verifying Move Scripts

For cases where you want to guarantee that your code works as expected beyond unit testing, you can use the [Move Prover](../../../move/prover/index.md) to formally verify your Move contract code.

You can install the Move Prover by following [these steps](../install-cli/install-move-prover.md).

Once you have installed the Move Prover, you can use it from the Aptos CLI by running:

```bash
aptos move prove --package-dir <your-package-directory>
```

To learn how to formally verify your code, please follow the in-depth Move tutorial [here](https://github.com/aptos-labs/aptos-core/tree/main/aptos-move/move-examples/move-tutorial) (step 7 and 8 cover how to use the Move Prover and write formal specifications in the example code).
