---
title: "Create Test Accounts"
---

# Create Test Accounts and Send Transactions From Aptos CLI

You can install the Aptos CLI by following [these steps](../../install-cli/index.md) if you have not done so already.

In general, to make a new account on-chain, you will need to generate keys then fund the account. On test networks we can accomplish that by asking a “faucet” account which has a large amount of test Aptos tokens to send them to our new account.

Using the CLI, you can generate and fund a test account using `aptos init --profile <your-profile-name>` then following the prompts. 

These steps can also be done independently though via `aptos key generate` if you want more control over what your generated credentials look like. (You can generate keys with vanity prefixes like `0xace` with the `--vanity-prefix` option)

If you generate keys in this way, you can fund that account with `aptos account fund-with-faucet --account <your-newly-generated-account-address>`. Note that addresses are different than public keys.

Once you have a funded account (either through `aptos init` or a more manual process) you can send coins between accounts with the `transfer` command like so:

```json
aptos account transfer --account superuser --amount 100

{
  "Result": {
    "gas_used": 73,
    "balance_changes": {
      "742854f7dca56ea6309b51e8cebb830b12623f9c9d76c72c3242e4cad353dedc": {
        "coin": {
          "value": "10100"
        },
        "deposit_events": {
          "counter": "2",
          "guid": {
            "id": {
              "addr": "0x742854f7dca56ea6309b51e8cebb830b12623f9c9d76c72c3242e4cad353dedc",
              "creation_num": "1"
            }
          }
        },
        "withdraw_events": {
          "counter": "0",
          "guid": {
            "id": {
              "addr": "0x742854f7dca56ea6309b51e8cebb830b12623f9c9d76c72c3242e4cad353dedc",
              "creation_num": "2"
            }
          }
        }
      },
      "b9bd2cfa58ca29bce1d7add25fce5c62220604cd0236fe3f90d9de91ed9fb8cb": {
        "coin": {
          "value": "9827"
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
      }
    },
    "sender": "b9bd2cfa58ca29bce1d7add25fce5c62220604cd0236fe3f90d9de91ed9fb8cb",
    "success": true,
    "version": 1139,
    "vm_status": "Executed successfully"
  }
}
```

This can be useful for manual testing of Move contracts or just to try seeing how the chain works in practice.
