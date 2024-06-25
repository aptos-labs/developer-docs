<a id="0x1_genesis"></a>

# Module `0x1::genesis`

- [Struct `AccountMap`](#0x1_genesis_AccountMap)
- [Struct `EmployeeAccountMap`](#0x1_genesis_EmployeeAccountMap)
- [Struct `ValidatorConfiguration`](#0x1_genesis_ValidatorConfiguration)
- [Struct `ValidatorConfigurationWithCommission`](#0x1_genesis_ValidatorConfigurationWithCommission)
- [Constants](#@Constants_0)

```move
module 0x1::genesis {
    use 0x1::account;
    use 0x1::aggregator_factory;
    use 0x1::aptos_account;
    use 0x1::aptos_coin;
    use 0x1::aptos_governance;
    use 0x1::block;
    use 0x1::chain_id;
    use 0x1::chain_status;
    use 0x1::coin;
    use 0x1::consensus_config;
    use 0x1::create_signer;
    use 0x1::error;
    use 0x1::execution_config;
    use 0x1::features;
    use 0x1::fixed_point32;
    use 0x1::gas_schedule;
    use 0x1::reconfiguration;
    use 0x1::simple_map;
    use 0x1::stake;
    use 0x1::staking_config;
    use 0x1::staking_contract;
    use 0x1::state_storage;
    use 0x1::storage_gas;
    use 0x1::timestamp;
    use 0x1::transaction_fee;
    use 0x1::transaction_validation;
    use 0x1::vector;
    use 0x1::version;
    use 0x1::vesting;
}
```

<a id="0x1_genesis_AccountMap"></a>

## Struct `AccountMap`

```move
module 0x1::genesis {
    struct AccountMap has drop
}
```

<a id="0x1_genesis_EmployeeAccountMap"></a>

## Struct `EmployeeAccountMap`

```move
module 0x1::genesis {
    struct EmployeeAccountMap has copy, drop
}
```

<a id="0x1_genesis_ValidatorConfiguration"></a>

## Struct `ValidatorConfiguration`

```move
module 0x1::genesis {
    struct ValidatorConfiguration has copy, drop
}
```

<a id="0x1_genesis_ValidatorConfigurationWithCommission"></a>

## Struct `ValidatorConfigurationWithCommission`

```move
module 0x1::genesis {
    struct ValidatorConfigurationWithCommission has copy, drop
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_genesis_EACCOUNT_DOES_NOT_EXIST"></a>

```move
module 0x1::genesis {
    const EACCOUNT_DOES_NOT_EXIST: u64 = 2;
}
```

<a id="0x1_genesis_EDUPLICATE_ACCOUNT"></a>

```move
module 0x1::genesis {
    const EDUPLICATE_ACCOUNT: u64 = 1;
}
```
