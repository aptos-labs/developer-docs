<a id="0x1_transaction_context"></a>

# Module `0x1::transaction_context`

- [Struct `AUID`](#0x1_transaction_context_AUID)
- [Struct `EntryFunctionPayload`](#0x1_transaction_context_EntryFunctionPayload)
- [Struct `MultisigPayload`](#0x1_transaction_context_MultisigPayload)
- [Constants](#@Constants_0)
- [Function `get_transaction_hash`](#0x1_transaction_context_get_transaction_hash)
- [Function `generate_auid_address`](#0x1_transaction_context_generate_auid_address)
- [Function `get_script_hash`](#0x1_transaction_context_get_script_hash)
- [Function `generate_auid`](#0x1_transaction_context_generate_auid)
- [Function `auid_address`](#0x1_transaction_context_auid_address)
- [Function `sender`](#0x1_transaction_context_sender)
- [Function `secondary_signers`](#0x1_transaction_context_secondary_signers)
- [Function `gas_payer`](#0x1_transaction_context_gas_payer)
- [Function `max_gas_amount`](#0x1_transaction_context_max_gas_amount)
- [Function `gas_unit_price`](#0x1_transaction_context_gas_unit_price)
- [Function `chain_id`](#0x1_transaction_context_chain_id)
- [Function `entry_function_payload`](#0x1_transaction_context_entry_function_payload)
- [Function `account_address`](#0x1_transaction_context_account_address)
- [Function `module_name`](#0x1_transaction_context_module_name)
- [Function `function_name`](#0x1_transaction_context_function_name)
- [Function `type_arg_names`](#0x1_transaction_context_type_arg_names)
- [Function `args`](#0x1_transaction_context_args)
- [Function `multisig_payload`](#0x1_transaction_context_multisig_payload)
- [Function `multisig_address`](#0x1_transaction_context_multisig_address)
- [Function `inner_entry_function_payload`](#0x1_transaction_context_inner_entry_function_payload)

```move
module 0x1::transaction_context {
    use 0x1::error;
    use 0x1::features;
    use 0x1::option;
    use 0x1::string;
}
```

<a id="0x1_transaction_context_AUID"></a>

## Struct `AUID`

A wrapper denoting aptos unique identifer (AUID)
for storing an address

```move
module 0x1::transaction_context {
    struct AUID has drop, store
}
```

<a id="0x1_transaction_context_EntryFunctionPayload"></a>

## Struct `EntryFunctionPayload`

Represents the entry function payload.

```move
module 0x1::transaction_context {
    struct EntryFunctionPayload has copy, drop
}
```

<a id="0x1_transaction_context_MultisigPayload"></a>

## Struct `MultisigPayload`

Represents the multisig payload.

```move
module 0x1::transaction_context {
    struct MultisigPayload has copy, drop
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_transaction_context_ETRANSACTION_CONTEXT_EXTENSION_NOT_ENABLED"></a>

The transaction context extension feature is not enabled.

```move
module 0x1::transaction_context {
    const ETRANSACTION_CONTEXT_EXTENSION_NOT_ENABLED: u64 = 2;
}
```

<a id="0x1_transaction_context_ETRANSACTION_CONTEXT_NOT_AVAILABLE"></a>

Transaction context is only available in the user transaction prologue, execution, or epilogue phases.

```move
module 0x1::transaction_context {
    const ETRANSACTION_CONTEXT_NOT_AVAILABLE: u64 = 1;
}
```

<a id="0x1_transaction_context_get_transaction_hash"></a>

## Function `get_transaction_hash`

Returns the transaction hash of the current transaction.
Internally calls the private function `get_txn_hash`.
This function is created for to feature gate the `get_txn_hash` function.

```move
module 0x1::transaction_context {
    public fun get_transaction_hash(): vector<u8>
}
```

<a id="0x1_transaction_context_generate_auid_address"></a>

## Function `generate_auid_address`

Returns a aptos unique identifier. Internally calls
the private function `generate_unique_address`. This function is
created for to feature gate the `generate_unique_address` function.

```move
module 0x1::transaction_context {
    public fun generate_auid_address(): address
}
```

<a id="0x1_transaction_context_get_script_hash"></a>

## Function `get_script_hash`

Returns the script hash of the current entry function.

```move
module 0x1::transaction_context {
    public fun get_script_hash(): vector<u8>
}
```

<a id="0x1_transaction_context_generate_auid"></a>

## Function `generate_auid`

This method runs `generate_unique_address` native function and returns
the generated unique address wrapped in the AUID class.

```move
module 0x1::transaction_context {
    public fun generate_auid(): transaction_context::AUID
}
```

<a id="0x1_transaction_context_auid_address"></a>

## Function `auid_address`

Returns the unique address wrapped in the given AUID struct.

```move
module 0x1::transaction_context {
    public fun auid_address(auid: &transaction_context::AUID): address
}
```

<a id="0x1_transaction_context_sender"></a>

## Function `sender`

Returns the sender&apos;s address for the current transaction.
This function aborts if called outside of the transaction prologue, execution, or epilogue phases.

```move
module 0x1::transaction_context {
    public fun sender(): address
}
```

<a id="0x1_transaction_context_secondary_signers"></a>

## Function `secondary_signers`

Returns the list of the secondary signers for the current transaction.
If the current transaction has no secondary signers, this function returns an empty vector.
This function aborts if called outside of the transaction prologue, execution, or epilogue phases.

```move
module 0x1::transaction_context {
    public fun secondary_signers(): vector<address>
}
```

<a id="0x1_transaction_context_gas_payer"></a>

## Function `gas_payer`

Returns the gas payer address for the current transaction.
It is either the sender&apos;s address if no separate gas fee payer is specified for the current transaction,
or the address of the separate gas fee payer if one is specified.
This function aborts if called outside of the transaction prologue, execution, or epilogue phases.

```move
module 0x1::transaction_context {
    public fun gas_payer(): address
}
```

<a id="0x1_transaction_context_max_gas_amount"></a>

## Function `max_gas_amount`

Returns the max gas amount in units which is specified for the current transaction.
This function aborts if called outside of the transaction prologue, execution, or epilogue phases.

```move
module 0x1::transaction_context {
    public fun max_gas_amount(): u64
}
```

<a id="0x1_transaction_context_gas_unit_price"></a>

## Function `gas_unit_price`

Returns the gas unit price in Octas which is specified for the current transaction.
This function aborts if called outside of the transaction prologue, execution, or epilogue phases.

```move
module 0x1::transaction_context {
    public fun gas_unit_price(): u64
}
```

<a id="0x1_transaction_context_chain_id"></a>

## Function `chain_id`

Returns the chain ID specified for the current transaction.
This function aborts if called outside of the transaction prologue, execution, or epilogue phases.

```move
module 0x1::transaction_context {
    public fun chain_id(): u8
}
```

<a id="0x1_transaction_context_entry_function_payload"></a>

## Function `entry_function_payload`

Returns the entry function payload if the current transaction has such a payload. Otherwise, return `None`.
This function aborts if called outside of the transaction prologue, execution, or epilogue phases.

```move
module 0x1::transaction_context {
    public fun entry_function_payload(): option::Option<transaction_context::EntryFunctionPayload>
}
```

<a id="0x1_transaction_context_account_address"></a>

## Function `account_address`

Returns the account address of the entry function payload.

```move
module 0x1::transaction_context {
    public fun account_address(payload: &transaction_context::EntryFunctionPayload): address
}
```

<a id="0x1_transaction_context_module_name"></a>

## Function `module_name`

Returns the module name of the entry function payload.

```move
module 0x1::transaction_context {
    public fun module_name(payload: &transaction_context::EntryFunctionPayload): string::String
}
```

<a id="0x1_transaction_context_function_name"></a>

## Function `function_name`

Returns the function name of the entry function payload.

```move
module 0x1::transaction_context {
    public fun function_name(payload: &transaction_context::EntryFunctionPayload): string::String
}
```

<a id="0x1_transaction_context_type_arg_names"></a>

## Function `type_arg_names`

Returns the type arguments names of the entry function payload.

```move
module 0x1::transaction_context {
    public fun type_arg_names(payload: &transaction_context::EntryFunctionPayload): vector<string::String>
}
```

<a id="0x1_transaction_context_args"></a>

## Function `args`

Returns the arguments of the entry function payload.

```move
module 0x1::transaction_context {
    public fun args(payload: &transaction_context::EntryFunctionPayload): vector<vector<u8>>
}
```

<a id="0x1_transaction_context_multisig_payload"></a>

## Function `multisig_payload`

Returns the multisig payload if the current transaction has such a payload. Otherwise, return `None`.
This function aborts if called outside of the transaction prologue, execution, or epilogue phases.

```move
module 0x1::transaction_context {
    public fun multisig_payload(): option::Option<transaction_context::MultisigPayload>
}
```

<a id="0x1_transaction_context_multisig_address"></a>

## Function `multisig_address`

Returns the multisig account address of the multisig payload.

```move
module 0x1::transaction_context {
    public fun multisig_address(payload: &transaction_context::MultisigPayload): address
}
```

<a id="0x1_transaction_context_inner_entry_function_payload"></a>

## Function `inner_entry_function_payload`

Returns the inner entry function payload of the multisig payload.

```move
module 0x1::transaction_context {
    public fun inner_entry_function_payload(payload: &transaction_context::MultisigPayload): option::Option<transaction_context::EntryFunctionPayload>
}
```
