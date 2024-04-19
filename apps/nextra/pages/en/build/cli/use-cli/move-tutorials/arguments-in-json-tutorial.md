---
title: "Arguments in JSON Tutorial"
---

import CodeBlock from '@theme/CodeBlock';

# Arguments in JSON Tutorial

## Package info

This section references the [`CliArgs` example package](https://github.com/aptos-labs/aptos-core/tree/main/aptos-move/move-examples/cli_args), which contains the following manifest:

import move_toml from '!!raw-loader!../../../../../static/move-examples/cli_args/Move.toml';

<CodeBlock language="toml" title="Move.toml">{move_toml}</CodeBlock>

Here, the package is deployed under the named address `test_account`.

:::tip
Set your working directory to [`aptos-move/move-examples/cli_args`](https://github.com/aptos-labs/aptos-core/tree/main/aptos-move/move-examples/cli_args) to follow along:

```bash
cd <aptos-core-parent-directory>/aptos-core/aptos-move/move-examples/cli_args
```

:::

## Deploying the package

Start by mining a vanity address for Ace, who will deploy the package:

```bash title=Command
aptos key generate \
    --vanity-prefix 0xace \
    --output-file ace.key
```

<details>
<summary>Output</summary>

```bash
{
  "Result": {
    "Account Address:": "0xacef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46",
    "PublicKey Path": "ace.key.pub",
    "PrivateKey Path": "ace.key"
  }
}
```

</details>

:::tip
The exact account address should vary for each run, though the vanity prefix should not.
:::

Store Ace's address in a shell variable, so you can call it inline later on:

```bash
# Your exact address should vary
ace_addr=0xacef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46
```

Fund Ace's account with the faucet (either devnet or testnet):

```bash title=Command
aptos account fund-with-faucet --account $ace_addr
```

<details>
<summary>Output</summary>

```bash
{
  "Result": "Added 100000000 Octas to account acef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46"
}
```

</details>

Now publish the package under Ace's account:

```bash title=Command
aptos move publish \
    --named-addresses test_account=$ace_addr \
    --private-key-file ace.key \
    --assume-yes
```

<details>
<summary>Output</summary>

```bash
{
  "Result": {
    "transaction_hash": "0x1d7b074dd95724c5459a1c30fe4cb3875e7b0478cc90c87c8e3f21381625bec1",
    "gas_used": 1294,
    "gas_unit_price": 100,
    "sender": "acef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46",
    "sequence_number": 0,
    "success": true,
    "timestamp_us": 1685077849297587,
    "version": 528422121,
    "vm_status": "Executed successfully"
  }
}
```

</details>

## Entry functions

The only module in the package, `cli_args.move`, defines a simple `Holder` resource with fields of various data types:

```rust title="Holder in cli_args.move"
:!: static/move-examples/cli_args/sources/cli_args.move resource
```

A public entry function with multi-nested vectors can be used to set the fields:

```rust title="Setter function in cli_args.move"
:!: static/move-examples/cli_args/sources/cli_args.move setter
```

After the package has been published, `aptos move run` can be used to call `set_vals()`:

:::tip
To pass vectors (including nested vectors) as arguments from the command line, use JSON syntax escaped with quotes!
:::

```bash title="Running function with nested vector arguments from CLI"
aptos move run \
    --function-id $ace_addr::cli_args::set_vals \
    --type-args \
        0x1::account::Account \
        0x1::chain_id::ChainId \
    --args \
        u8:123 \
        "hex:0x1234" \
        "string:hello, world\! ♥" \
        "bool:[false, true, false, false]" \
        'address:[["0xace", "0xbee"], ["0xcad"], []]' \
    --private-key-file ace.key \
    --assume-yes
```

<details>
<summary>Output</summary>

```bash
{
  "Result": {
    "transaction_hash": "0x5e141dc6c28e86fa9f5594de93d07a014264ebadfb99be6db922a929eb1da24f",
    "gas_used": 504,
    "gas_unit_price": 100,
    "sender": "acef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46",
    "sequence_number": 1,
    "success": true,
    "timestamp_us": 1685077888820037,
    "version": 528422422,
    "vm_status": "Executed successfully"
  }
}
```

</details>

The function ID, type arguments, and arguments can alternatively be specified in a JSON file:

import entry_json_file from '!!raw-loader!../../../../../static/move-examples/cli_args/entry_function_arguments.json';

<CodeBlock language="json" title="entry_function_arguments.json">{entry_json_file}</CodeBlock>

Here, the call to `aptos move run` looks like:

```bash title="Running function with JSON input file"
aptos move run \
    --json-file entry_function_arguments.json \
    --private-key-file ace.key \
    --assume-yes
```

<details>
<summary>Output</summary>

```bash
{
  "Result": {
    "transaction_hash": "0x60a32315bb48bf6d31629332f6b1a3471dd0cb016fdee8d0bb7dcd0be9833e60",
    "gas_used": 3,
    "gas_unit_price": 100,
    "sender": "acef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46",
    "sequence_number": 2,
    "success": true,
    "timestamp_us": 1685077961499641,
    "version": 528422965,
    "vm_status": "Executed successfully"
  }
}
```

</details>

:::tip
If you are trying to run the example yourself don't forget to substitute Ace's actual address for `<test_account>` in `entry_function_arguments.json`!
:::

## View functions

Once the values in a `Holder` have been set, the `reveal()` view function can be used to check the first three fields, and to compare type arguments against the last two fields:

```rust title="View function"
:!: static/move-examples/cli_args/sources/cli_args.move view
```

This view function can be called with arguments specified either from the CLI or from a JSON file:

```bash title="Arguments via CLI"
aptos move view \
    --function-id $ace_addr::cli_args::reveal \
    --type-args \
        0x1::account::Account \
        0x1::account::Account \
    --args address:$ace_addr
```

```bash title="Arguments via JSON file"
aptos move view --json-file view_function_arguments.json
```

:::tip
If you are trying to run the example yourself don't forget to substitute Ace's actual address for `<test_account>` in `view_function_arguments.json` (twice)!
:::

import view_json_file from '!!raw-loader!../../../../../static/move-examples//cli_args/view_function_arguments.json';

<CodeBlock language="json" title="view_function_arguments.json">{view_json_file}</CodeBlock>

```bash title="Output"
{
  "Result": [
    {
      "address_vec_vec": [
        [
          "0xace",
          "0xbee"
        ],
        [
          "0xcad"
        ],
        []
      ],
      "bool_vec": [
        false,
        true,
        false,
        false
      ],
      "bytes": "0x1234",
      "type_info_1_match": true,
      "type_info_2_match": false,
      "u8_solo": 123,
      "utf8_string": "hello, world! ♥"
    }
  ]
}
```

## Script functions

The package also contains a script, `set_vals.move`, which is a wrapper for the setter function:

```rust title="script"
:!: static/move-examples/cli_args/scripts/set_vals.move script
```

First compile the package (this will compile the script):

```bash title=Compilation
aptos move compile --named-addresses test_account=$ace_addr
```

<details>
<summary>Output</summary>

```bash
{
  "Result": [
    "acef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46::cli_args"
  ]
}
```

</details>

Next, run `aptos move run-script`:

```bash title="Arguments via CLI"
aptos move run-script \
    --compiled-script-path build/CliArgs/bytecode_scripts/set_vals.mv \
    --type-args \
        0x1::account::Account \
        0x1::chain_id::ChainId \
    --args \
        u8:123 \
        "hex:0x1234" \
        "string:hello, world\! ♥" \
        "u8:[122, 123, 124, 125]" \
        address:"0xace" \
    --private-key-file ace.key \
    --assume-yes
```

<details>
<summary>Output</summary>

```bash
{
  "Result": {
    "transaction_hash": "0x1d644eba8187843cc43919469112339bc2c435a49a733ac813b7bc6c79770152",
    "gas_used": 3,
    "gas_unit_price": 100,
    "sender": "acef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46",
    "sequence_number": 3,
    "success": true,
    "timestamp_us": 1685078415935612,
    "version": 528426413,
    "vm_status": "Executed successfully"
  }
}
```

</details>

```bash title="Arguments via JSON file"
aptos move run-script \
    --compiled-script-path build/CliArgs/bytecode_scripts/set_vals.mv \
    --json-file script_function_arguments.json \
    --private-key-file ace.key \
    --assume-yes
```

<details>
<summary>Output</summary>

```bash
{
  "Result": {
    "transaction_hash": "0x840e2d6a5ab80d5a570effb3665f775f1755e0fd8d76e52bfa7241aaade883d7",
    "gas_used": 3,
    "gas_unit_price": 100,
    "sender": "acef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46",
    "sequence_number": 4,
    "success": true,
    "timestamp_us": 1685078516832128,
    "version": 528427132,
    "vm_status": "Executed successfully"
  }
}
```

</details>

import script_json_file from '!!raw-loader!../../../../../static/move-examples/cli_args/script_function_arguments.json';

<CodeBlock language="json" title="script_function_arguments.json">{script_json_file}</CodeBlock>

Both such script function invocations result in the following `reveal()` view function output:

```bash title="View function call"
aptos move view \
    --function-id $ace_addr::cli_args::reveal \
    --type-args \
        0x1::account::Account \
        0x1::chain_id::ChainId \
    --args address:$ace_addr
```

```json title="View function output"
{
  "Result": [
    {
      "address_vec_vec": [["0xace"]],
      "bool_vec": [false, false, true, true],
      "bytes": "0x1234",
      "type_info_1_match": true,
      "type_info_2_match": true,
      "u8_solo": 123,
      "utf8_string": "hello, world! ♥"
    }
  ]
}
```

:::note
As of the time of this writing, the `aptos` CLI only supports script function arguments for vectors of type `u8`, and only up to a vector depth of 1. Hence `vector<address>` and `vector<vector<u8>>` are invalid script function argument types.
:::
