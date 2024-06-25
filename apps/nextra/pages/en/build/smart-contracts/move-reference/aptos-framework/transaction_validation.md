<a id="0x1_transaction_validation"></a>

# Module `0x1::transaction_validation`

- [Resource `TransactionValidation`](#0x1_transaction_validation_TransactionValidation)
- [Constants](#@Constants_0)
- [Function `initialize`](#0x1_transaction_validation_initialize)

```move
module 0x1::transaction_validation {
    use 0x1::account;
    use 0x1::aptos_account;
    use 0x1::aptos_coin;
    use 0x1::bcs;
    use 0x1::chain_id;
    use 0x1::coin;
    use 0x1::error;
    use 0x1::features;
    use 0x1::option;
    use 0x1::signer;
    use 0x1::system_addresses;
    use 0x1::timestamp;
    use 0x1::transaction_fee;
}
```

<a id="0x1_transaction_validation_TransactionValidation"></a>

## Resource `TransactionValidation`

This holds information that will be picked up by the VM to call the
correct chain&#45;specific prologue and epilogue functions

```move
module 0x1::transaction_validation {
    struct TransactionValidation has key
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_transaction_validation_MAX_U64"></a>

MSB is used to indicate a gas payer tx

```move
module 0x1::transaction_validation {
    const MAX_U64: u128 = 18446744073709551615;
}
```

<a id="0x1_transaction_validation_EOUT_OF_GAS"></a>

Transaction exceeded its allocated max gas

```move
module 0x1::transaction_validation {
    const EOUT_OF_GAS: u64 = 6;
}
```

<a id="0x1_transaction_validation_PROLOGUE_EACCOUNT_DOES_NOT_EXIST"></a>

```move
module 0x1::transaction_validation {
    const PROLOGUE_EACCOUNT_DOES_NOT_EXIST: u64 = 1004;
}
```

<a id="0x1_transaction_validation_PROLOGUE_EBAD_CHAIN_ID"></a>

```move
module 0x1::transaction_validation {
    const PROLOGUE_EBAD_CHAIN_ID: u64 = 1007;
}
```

<a id="0x1_transaction_validation_PROLOGUE_ECANT_PAY_GAS_DEPOSIT"></a>

```move
module 0x1::transaction_validation {
    const PROLOGUE_ECANT_PAY_GAS_DEPOSIT: u64 = 1005;
}
```

<a id="0x1_transaction_validation_PROLOGUE_EFEE_PAYER_NOT_ENABLED"></a>

```move
module 0x1::transaction_validation {
    const PROLOGUE_EFEE_PAYER_NOT_ENABLED: u64 = 1010;
}
```

<a id="0x1_transaction_validation_PROLOGUE_EINSUFFICIENT_BALANCE_FOR_REQUIRED_DEPOSIT"></a>

```move
module 0x1::transaction_validation {
    const PROLOGUE_EINSUFFICIENT_BALANCE_FOR_REQUIRED_DEPOSIT: u64 = 1011;
}
```

<a id="0x1_transaction_validation_PROLOGUE_EINVALID_ACCOUNT_AUTH_KEY"></a>

Prologue errors. These are separated out from the other errors in this
module since they are mapped separately to major VM statuses, and are
important to the semantics of the system.

```move
module 0x1::transaction_validation {
    const PROLOGUE_EINVALID_ACCOUNT_AUTH_KEY: u64 = 1001;
}
```

<a id="0x1_transaction_validation_PROLOGUE_ESECONDARY_KEYS_ADDRESSES_COUNT_MISMATCH"></a>

```move
module 0x1::transaction_validation {
    const PROLOGUE_ESECONDARY_KEYS_ADDRESSES_COUNT_MISMATCH: u64 = 1009;
}
```

<a id="0x1_transaction_validation_PROLOGUE_ESEQUENCE_NUMBER_TOO_BIG"></a>

```move
module 0x1::transaction_validation {
    const PROLOGUE_ESEQUENCE_NUMBER_TOO_BIG: u64 = 1008;
}
```

<a id="0x1_transaction_validation_PROLOGUE_ESEQUENCE_NUMBER_TOO_NEW"></a>

```move
module 0x1::transaction_validation {
    const PROLOGUE_ESEQUENCE_NUMBER_TOO_NEW: u64 = 1003;
}
```

<a id="0x1_transaction_validation_PROLOGUE_ESEQUENCE_NUMBER_TOO_OLD"></a>

```move
module 0x1::transaction_validation {
    const PROLOGUE_ESEQUENCE_NUMBER_TOO_OLD: u64 = 1002;
}
```

<a id="0x1_transaction_validation_PROLOGUE_ETRANSACTION_EXPIRED"></a>

```move
module 0x1::transaction_validation {
    const PROLOGUE_ETRANSACTION_EXPIRED: u64 = 1006;
}
```

<a id="0x1_transaction_validation_initialize"></a>

## Function `initialize`

Only called during genesis to initialize system resources for this module.

```move
module 0x1::transaction_validation {
    public(friend) fun initialize(aptos_framework: &signer, script_prologue_name: vector<u8>, module_prologue_name: vector<u8>, multi_agent_prologue_name: vector<u8>, user_epilogue_name: vector<u8>)
}
```
