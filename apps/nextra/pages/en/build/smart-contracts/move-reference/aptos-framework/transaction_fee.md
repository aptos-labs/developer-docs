<a id="0x1_transaction_fee"></a>

# Module `0x1::transaction_fee`

This module provides an interface to burn or collect and redistribute transaction fees.

- [Resource `AptosCoinCapabilities`](#0x1_transaction_fee_AptosCoinCapabilities)
- [Resource `AptosFABurnCapabilities`](#0x1_transaction_fee_AptosFABurnCapabilities)
- [Resource `AptosCoinMintCapability`](#0x1_transaction_fee_AptosCoinMintCapability)
- [Resource `CollectedFeesPerBlock`](#0x1_transaction_fee_CollectedFeesPerBlock)
- [Struct `FeeStatement`](#0x1_transaction_fee_FeeStatement)
- [Constants](#@Constants_0)
- [Function `initialize_fee_collection_and_distribution`](#0x1_transaction_fee_initialize_fee_collection_and_distribution)
- [Function `upgrade_burn_percentage`](#0x1_transaction_fee_upgrade_burn_percentage)
- [Function `register_proposer_for_fee_collection`](#0x1_transaction_fee_register_proposer_for_fee_collection)
- [Function `process_collected_fees`](#0x1_transaction_fee_process_collected_fees)
- [Function `burn_fee`](#0x1_transaction_fee_burn_fee)
- [Function `mint_and_refund`](#0x1_transaction_fee_mint_and_refund)
- [Function `collect_fee`](#0x1_transaction_fee_collect_fee)
- [Function `store_aptos_coin_burn_cap`](#0x1_transaction_fee_store_aptos_coin_burn_cap)
- [Function `convert_to_aptos_fa_burn_ref`](#0x1_transaction_fee_convert_to_aptos_fa_burn_ref)
- [Function `store_aptos_coin_mint_cap`](#0x1_transaction_fee_store_aptos_coin_mint_cap)
- [Function `initialize_storage_refund`](#0x1_transaction_fee_initialize_storage_refund)

```move
module 0x1::transaction_fee {
    use 0x1::aptos_account;
    use 0x1::aptos_coin;
    use 0x1::coin;
    use 0x1::error;
    use 0x1::event;
    use 0x1::features;
    use 0x1::fungible_asset;
    use 0x1::option;
    use 0x1::signer;
    use 0x1::stake;
    use 0x1::system_addresses;
}
```

<a id="0x1_transaction_fee_AptosCoinCapabilities"></a>

## Resource `AptosCoinCapabilities`

Stores burn capability to burn the gas fees.

```move
module 0x1::transaction_fee {
    struct AptosCoinCapabilities has key
}
```

<a id="0x1_transaction_fee_AptosFABurnCapabilities"></a>

## Resource `AptosFABurnCapabilities`

Stores burn capability to burn the gas fees.

```move
module 0x1::transaction_fee {
    struct AptosFABurnCapabilities has key
}
```

<a id="0x1_transaction_fee_AptosCoinMintCapability"></a>

## Resource `AptosCoinMintCapability`

Stores mint capability to mint the refunds.

```move
module 0x1::transaction_fee {
    struct AptosCoinMintCapability has key
}
```

<a id="0x1_transaction_fee_CollectedFeesPerBlock"></a>

## Resource `CollectedFeesPerBlock`

Stores information about the block proposer and the amount of fees
collected when executing the block.

```move
module 0x1::transaction_fee {
    struct CollectedFeesPerBlock has key
}
```

<a id="0x1_transaction_fee_FeeStatement"></a>

## Struct `FeeStatement`

Breakdown of fee charge and refund for a transaction.
The structure is:

&#45; Net charge or refund (not in the statement)
&#45; total charge: total_charge_gas_units, matches `gas_used` in the on&#45;chain `TransactionInfo`.
This is the sum of the sub&#45;items below. Notice that there&apos;s potential precision loss when
the conversion between internal and external gas units and between native token and gas
units, so it&apos;s possible that the numbers don&apos;t add up exactly. &#45;&#45; This number is the final
charge, while the break down is merely informational.
&#45; gas charge for execution (CPU time): `execution_gas_units`
&#45; gas charge for IO (storage random access): `io_gas_units`
&#45; storage fee charge (storage space): `storage_fee_octas`, to be included in
`total_charge_gas_unit`, this number is converted to gas units according to the user
specified `gas_unit_price` on the transaction.
&#45; storage deletion refund: `storage_fee_refund_octas`, this is not included in `gas_used` or
`total_charge_gas_units`, the net charge / refund is calculated by
`total_charge_gas_units` \* `gas_unit_price` &#45; `storage_fee_refund_octas`.

This is meant to emitted as a module event.

```move
module 0x1::transaction_fee {
    #[event]
    struct FeeStatement has drop, store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_transaction_fee_EALREADY_COLLECTING_FEES"></a>

Gas fees are already being collected and the struct holding
information about collected amounts is already published.

```move
module 0x1::transaction_fee {
    const EALREADY_COLLECTING_FEES: u64 = 1;
}
```

<a id="0x1_transaction_fee_EFA_GAS_CHARGING_NOT_ENABLED"></a>

```move
module 0x1::transaction_fee {
    const EFA_GAS_CHARGING_NOT_ENABLED: u64 = 5;
}
```

<a id="0x1_transaction_fee_EINVALID_BURN_PERCENTAGE"></a>

The burn percentage is out of range [0, 100].

```move
module 0x1::transaction_fee {
    const EINVALID_BURN_PERCENTAGE: u64 = 3;
}
```

<a id="0x1_transaction_fee_ENO_LONGER_SUPPORTED"></a>

No longer supported.

```move
module 0x1::transaction_fee {
    const ENO_LONGER_SUPPORTED: u64 = 4;
}
```

<a id="0x1_transaction_fee_initialize_fee_collection_and_distribution"></a>

## Function `initialize_fee_collection_and_distribution`

Initializes the resource storing information about gas fees collection and
distribution. Should be called by on&#45;chain governance.

```move
module 0x1::transaction_fee {
    public fun initialize_fee_collection_and_distribution(aptos_framework: &signer, burn_percentage: u8)
}
```

<a id="0x1_transaction_fee_upgrade_burn_percentage"></a>

## Function `upgrade_burn_percentage`

Sets the burn percentage for collected fees to a new value. Should be called by on&#45;chain governance.

```move
module 0x1::transaction_fee {
    public fun upgrade_burn_percentage(aptos_framework: &signer, new_burn_percentage: u8)
}
```

<a id="0x1_transaction_fee_register_proposer_for_fee_collection"></a>

## Function `register_proposer_for_fee_collection`

Registers the proposer of the block for gas fees collection. This function
can only be called at the beginning of the block.

```move
module 0x1::transaction_fee {
    public(friend) fun register_proposer_for_fee_collection(proposer_addr: address)
}
```

<a id="0x1_transaction_fee_process_collected_fees"></a>

## Function `process_collected_fees`

Calculates the fee which should be distributed to the block proposer at the
end of an epoch, and records it in the system. This function can only be called
at the beginning of the block or during reconfiguration.

```move
module 0x1::transaction_fee {
    public(friend) fun process_collected_fees()
}
```

<a id="0x1_transaction_fee_burn_fee"></a>

## Function `burn_fee`

Burn transaction fees in epilogue.

```move
module 0x1::transaction_fee {
    public(friend) fun burn_fee(account: address, fee: u64)
}
```

<a id="0x1_transaction_fee_mint_and_refund"></a>

## Function `mint_and_refund`

Mint refund in epilogue.

```move
module 0x1::transaction_fee {
    public(friend) fun mint_and_refund(account: address, refund: u64)
}
```

<a id="0x1_transaction_fee_collect_fee"></a>

## Function `collect_fee`

Collect transaction fees in epilogue.

```move
module 0x1::transaction_fee {
    public(friend) fun collect_fee(account: address, fee: u64)
}
```

<a id="0x1_transaction_fee_store_aptos_coin_burn_cap"></a>

## Function `store_aptos_coin_burn_cap`

Only called during genesis.

```move
module 0x1::transaction_fee {
    public(friend) fun store_aptos_coin_burn_cap(aptos_framework: &signer, burn_cap: coin::BurnCapability<aptos_coin::AptosCoin>)
}
```

<a id="0x1_transaction_fee_convert_to_aptos_fa_burn_ref"></a>

## Function `convert_to_aptos_fa_burn_ref`

```move
module 0x1::transaction_fee {
    public entry fun convert_to_aptos_fa_burn_ref(aptos_framework: &signer)
}
```

<a id="0x1_transaction_fee_store_aptos_coin_mint_cap"></a>

## Function `store_aptos_coin_mint_cap`

Only called during genesis.

```move
module 0x1::transaction_fee {
    public(friend) fun store_aptos_coin_mint_cap(aptos_framework: &signer, mint_cap: coin::MintCapability<aptos_coin::AptosCoin>)
}
```

<a id="0x1_transaction_fee_initialize_storage_refund"></a>

## Function `initialize_storage_refund`

```move
module 0x1::transaction_fee {
    #[deprecated]
    public fun initialize_storage_refund(_: &signer)
}
```
