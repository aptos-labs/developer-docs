<a id="0x1_staking_proxy"></a>

# Module `0x1::staking_proxy`

- [Function `set_operator`](#0x1_staking_proxy_set_operator)
- [Function `set_voter`](#0x1_staking_proxy_set_voter)
- [Function `set_vesting_contract_operator`](#0x1_staking_proxy_set_vesting_contract_operator)
- [Function `set_staking_contract_operator`](#0x1_staking_proxy_set_staking_contract_operator)
- [Function `set_stake_pool_operator`](#0x1_staking_proxy_set_stake_pool_operator)
- [Function `set_vesting_contract_voter`](#0x1_staking_proxy_set_vesting_contract_voter)
- [Function `set_staking_contract_voter`](#0x1_staking_proxy_set_staking_contract_voter)
- [Function `set_stake_pool_voter`](#0x1_staking_proxy_set_stake_pool_voter)

```move
module 0x1::staking_proxy {
    use 0x1::signer;
    use 0x1::stake;
    use 0x1::staking_contract;
    use 0x1::vesting;
}
```

<a id="0x1_staking_proxy_set_operator"></a>

## Function `set_operator`

```move
module 0x1::staking_proxy {
    public entry fun set_operator(owner: &signer, old_operator: address, new_operator: address)
}
```

<a id="0x1_staking_proxy_set_voter"></a>

## Function `set_voter`

```move
module 0x1::staking_proxy {
    public entry fun set_voter(owner: &signer, operator: address, new_voter: address)
}
```

<a id="0x1_staking_proxy_set_vesting_contract_operator"></a>

## Function `set_vesting_contract_operator`

```move
module 0x1::staking_proxy {
    public entry fun set_vesting_contract_operator(owner: &signer, old_operator: address, new_operator: address)
}
```

<a id="0x1_staking_proxy_set_staking_contract_operator"></a>

## Function `set_staking_contract_operator`

```move
module 0x1::staking_proxy {
    public entry fun set_staking_contract_operator(owner: &signer, old_operator: address, new_operator: address)
}
```

<a id="0x1_staking_proxy_set_stake_pool_operator"></a>

## Function `set_stake_pool_operator`

```move
module 0x1::staking_proxy {
    public entry fun set_stake_pool_operator(owner: &signer, new_operator: address)
}
```

<a id="0x1_staking_proxy_set_vesting_contract_voter"></a>

## Function `set_vesting_contract_voter`

```move
module 0x1::staking_proxy {
    public entry fun set_vesting_contract_voter(owner: &signer, operator: address, new_voter: address)
}
```

<a id="0x1_staking_proxy_set_staking_contract_voter"></a>

## Function `set_staking_contract_voter`

```move
module 0x1::staking_proxy {
    public entry fun set_staking_contract_voter(owner: &signer, operator: address, new_voter: address)
}
```

<a id="0x1_staking_proxy_set_stake_pool_voter"></a>

## Function `set_stake_pool_voter`

```move
module 0x1::staking_proxy {
    public entry fun set_stake_pool_voter(owner: &signer, new_voter: address)
}
```
