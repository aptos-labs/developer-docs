<a id="0x1_pool_u64_unbound"></a>

# Module `0x1::pool_u64_unbound`

Simple module for tracking and calculating shares of a pool of coins. The shares are worth more as the total coins in
the pool increases. New shareholder can buy more shares or redeem their existing shares.

Example flow:

1. Pool start outs empty.
2. Shareholder A buys in with 1000 coins. A will receive 1000 shares in the pool. Pool now has 1000 total coins and
   1000 total shares.
3. Pool appreciates in value from rewards and now has 2000 coins. A&apos;s 1000 shares are now worth 2000 coins.
4. Shareholder B now buys in with 1000 coins. Since before the buy in, each existing share is worth 2 coins, B will
   receive 500 shares in exchange for 1000 coins. Pool now has 1500 shares and 3000 coins.
5. Pool appreciates in value from rewards and now has 6000 coins.
6. A redeems 500 shares. Each share is worth 6000 / 1500 &#61; 4. A receives 2000 coins. Pool has 4000 coins and 1000
   shares left.

- [Struct `Pool`](#0x1_pool_u64_unbound_Pool)
- [Constants](#@Constants_0)
- [Function `new`](#0x1_pool_u64_unbound_new)
- [Function `create`](#0x1_pool_u64_unbound_create)
- [Function `create_with_scaling_factor`](#0x1_pool_u64_unbound_create_with_scaling_factor)
- [Function `destroy_empty`](#0x1_pool_u64_unbound_destroy_empty)
- [Function `total_coins`](#0x1_pool_u64_unbound_total_coins)
- [Function `total_shares`](#0x1_pool_u64_unbound_total_shares)
- [Function `contains`](#0x1_pool_u64_unbound_contains)
- [Function `shares`](#0x1_pool_u64_unbound_shares)
- [Function `balance`](#0x1_pool_u64_unbound_balance)
- [Function `shareholders_count`](#0x1_pool_u64_unbound_shareholders_count)
- [Function `update_total_coins`](#0x1_pool_u64_unbound_update_total_coins)
- [Function `buy_in`](#0x1_pool_u64_unbound_buy_in)
- [Function `redeem_shares`](#0x1_pool_u64_unbound_redeem_shares)
- [Function `transfer_shares`](#0x1_pool_u64_unbound_transfer_shares)
- [Function `amount_to_shares`](#0x1_pool_u64_unbound_amount_to_shares)
- [Function `amount_to_shares_with_total_coins`](#0x1_pool_u64_unbound_amount_to_shares_with_total_coins)
- [Function `shares_to_amount`](#0x1_pool_u64_unbound_shares_to_amount)
- [Function `shares_to_amount_with_total_coins`](#0x1_pool_u64_unbound_shares_to_amount_with_total_coins)
- [Function `shares_to_amount_with_total_stats`](#0x1_pool_u64_unbound_shares_to_amount_with_total_stats)
- [Function `multiply_then_divide`](#0x1_pool_u64_unbound_multiply_then_divide)

```move
module 0x1::pool_u64_unbound {
    use 0x1::error;
    use 0x1::table_with_length;
}
```

<a id="0x1_pool_u64_unbound_Pool"></a>

## Struct `Pool`

```move
module 0x1::pool_u64_unbound {
    struct Pool has store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_pool_u64_unbound_MAX_U64"></a>

```move
module 0x1::pool_u64_unbound {
    const MAX_U64: u64 = 18446744073709551615;
}
```

<a id="0x1_pool_u64_unbound_MAX_U128"></a>

```move
module 0x1::pool_u64_unbound {
    const MAX_U128: u128 = 340282366920938463463374607431768211455;
}
```

<a id="0x1_pool_u64_unbound_EINSUFFICIENT_SHARES"></a>

Cannot redeem more shares than the shareholder has in the pool.

```move
module 0x1::pool_u64_unbound {
    const EINSUFFICIENT_SHARES: u64 = 4;
}
```

<a id="0x1_pool_u64_unbound_EPOOL_IS_NOT_EMPTY"></a>

Cannot destroy non&#45;empty pool.

```move
module 0x1::pool_u64_unbound {
    const EPOOL_IS_NOT_EMPTY: u64 = 3;
}
```

<a id="0x1_pool_u64_unbound_EPOOL_TOTAL_COINS_OVERFLOW"></a>

Pool&apos;s total coins cannot exceed u64.max.

```move
module 0x1::pool_u64_unbound {
    const EPOOL_TOTAL_COINS_OVERFLOW: u64 = 6;
}
```

<a id="0x1_pool_u64_unbound_EPOOL_TOTAL_SHARES_OVERFLOW"></a>

Pool&apos;s total shares cannot exceed u64.max.

```move
module 0x1::pool_u64_unbound {
    const EPOOL_TOTAL_SHARES_OVERFLOW: u64 = 7;
}
```

<a id="0x1_pool_u64_unbound_ESHAREHOLDER_NOT_FOUND"></a>

Shareholder not present in pool.

```move
module 0x1::pool_u64_unbound {
    const ESHAREHOLDER_NOT_FOUND: u64 = 1;
}
```

<a id="0x1_pool_u64_unbound_ESHAREHOLDER_SHARES_OVERFLOW"></a>

Shareholder cannot have more than u64.max shares.

```move
module 0x1::pool_u64_unbound {
    const ESHAREHOLDER_SHARES_OVERFLOW: u64 = 5;
}
```

<a id="0x1_pool_u64_unbound_ETOO_MANY_SHAREHOLDERS"></a>

There are too many shareholders in the pool.

```move
module 0x1::pool_u64_unbound {
    const ETOO_MANY_SHAREHOLDERS: u64 = 2;
}
```

<a id="0x1_pool_u64_unbound_new"></a>

## Function `new`

Create a new pool.

```move
module 0x1::pool_u64_unbound {
    public fun new(): pool_u64_unbound::Pool
}
```

<a id="0x1_pool_u64_unbound_create"></a>

## Function `create`

Deprecated. Use `new` instead.
Create a new pool.

```move
module 0x1::pool_u64_unbound {
    #[deprecated]
    public fun create(): pool_u64_unbound::Pool
}
```

<a id="0x1_pool_u64_unbound_create_with_scaling_factor"></a>

## Function `create_with_scaling_factor`

Create a new pool with custom `scaling_factor`.

```move
module 0x1::pool_u64_unbound {
    public fun create_with_scaling_factor(scaling_factor: u64): pool_u64_unbound::Pool
}
```

<a id="0x1_pool_u64_unbound_destroy_empty"></a>

## Function `destroy_empty`

Destroy an empty pool. This will fail if the pool has any balance of coins.

```move
module 0x1::pool_u64_unbound {
    public fun destroy_empty(pool: pool_u64_unbound::Pool)
}
```

<a id="0x1_pool_u64_unbound_total_coins"></a>

## Function `total_coins`

Return `pool`&apos;s total balance of coins.

```move
module 0x1::pool_u64_unbound {
    public fun total_coins(pool: &pool_u64_unbound::Pool): u64
}
```

<a id="0x1_pool_u64_unbound_total_shares"></a>

## Function `total_shares`

Return the total number of shares across all shareholders in `pool`.

```move
module 0x1::pool_u64_unbound {
    public fun total_shares(pool: &pool_u64_unbound::Pool): u128
}
```

<a id="0x1_pool_u64_unbound_contains"></a>

## Function `contains`

Return true if `shareholder` is in `pool`.

```move
module 0x1::pool_u64_unbound {
    public fun contains(pool: &pool_u64_unbound::Pool, shareholder: address): bool
}
```

<a id="0x1_pool_u64_unbound_shares"></a>

## Function `shares`

Return the number of shares of `stakeholder` in `pool`.

```move
module 0x1::pool_u64_unbound {
    public fun shares(pool: &pool_u64_unbound::Pool, shareholder: address): u128
}
```

<a id="0x1_pool_u64_unbound_balance"></a>

## Function `balance`

Return the balance in coins of `shareholder` in `pool.`

```move
module 0x1::pool_u64_unbound {
    public fun balance(pool: &pool_u64_unbound::Pool, shareholder: address): u64
}
```

<a id="0x1_pool_u64_unbound_shareholders_count"></a>

## Function `shareholders_count`

Return the number of shareholders in `pool`.

```move
module 0x1::pool_u64_unbound {
    public fun shareholders_count(pool: &pool_u64_unbound::Pool): u64
}
```

<a id="0x1_pool_u64_unbound_update_total_coins"></a>

## Function `update_total_coins`

Update `pool`&apos;s total balance of coins.

```move
module 0x1::pool_u64_unbound {
    public fun update_total_coins(pool: &mut pool_u64_unbound::Pool, new_total_coins: u64)
}
```

<a id="0x1_pool_u64_unbound_buy_in"></a>

## Function `buy_in`

Allow an existing or new shareholder to add their coins to the pool in exchange for new shares.

```move
module 0x1::pool_u64_unbound {
    public fun buy_in(pool: &mut pool_u64_unbound::Pool, shareholder: address, coins_amount: u64): u128
}
```

<a id="0x1_pool_u64_unbound_redeem_shares"></a>

## Function `redeem_shares`

Allow `shareholder` to redeem their shares in `pool` for coins.

```move
module 0x1::pool_u64_unbound {
    public fun redeem_shares(pool: &mut pool_u64_unbound::Pool, shareholder: address, shares_to_redeem: u128): u64
}
```

<a id="0x1_pool_u64_unbound_transfer_shares"></a>

## Function `transfer_shares`

Transfer shares from `shareholder_1` to `shareholder_2`.

```move
module 0x1::pool_u64_unbound {
    public fun transfer_shares(pool: &mut pool_u64_unbound::Pool, shareholder_1: address, shareholder_2: address, shares_to_transfer: u128)
}
```

<a id="0x1_pool_u64_unbound_amount_to_shares"></a>

## Function `amount_to_shares`

Return the number of new shares `coins_amount` can buy in `pool`.
`amount` needs to big enough to avoid rounding number.

```move
module 0x1::pool_u64_unbound {
    public fun amount_to_shares(pool: &pool_u64_unbound::Pool, coins_amount: u64): u128
}
```

<a id="0x1_pool_u64_unbound_amount_to_shares_with_total_coins"></a>

## Function `amount_to_shares_with_total_coins`

Return the number of new shares `coins_amount` can buy in `pool` with a custom total coins number.
`amount` needs to big enough to avoid rounding number.

```move
module 0x1::pool_u64_unbound {
    public fun amount_to_shares_with_total_coins(pool: &pool_u64_unbound::Pool, coins_amount: u64, total_coins: u64): u128
}
```

<a id="0x1_pool_u64_unbound_shares_to_amount"></a>

## Function `shares_to_amount`

Return the number of coins `shares` are worth in `pool`.
`shares` needs to big enough to avoid rounding number.

```move
module 0x1::pool_u64_unbound {
    public fun shares_to_amount(pool: &pool_u64_unbound::Pool, shares: u128): u64
}
```

<a id="0x1_pool_u64_unbound_shares_to_amount_with_total_coins"></a>

## Function `shares_to_amount_with_total_coins`

Return the number of coins `shares` are worth in `pool` with a custom total coins number.
`shares` needs to big enough to avoid rounding number.

```move
module 0x1::pool_u64_unbound {
    public fun shares_to_amount_with_total_coins(pool: &pool_u64_unbound::Pool, shares: u128, total_coins: u64): u64
}
```

<a id="0x1_pool_u64_unbound_shares_to_amount_with_total_stats"></a>

## Function `shares_to_amount_with_total_stats`

Return the number of coins `shares` are worth in `pool` with custom total coins and shares numbers.

```move
module 0x1::pool_u64_unbound {
    public fun shares_to_amount_with_total_stats(pool: &pool_u64_unbound::Pool, shares: u128, total_coins: u64, total_shares: u128): u64
}
```

<a id="0x1_pool_u64_unbound_multiply_then_divide"></a>

## Function `multiply_then_divide`

```move
module 0x1::pool_u64_unbound {
    public fun multiply_then_divide(_pool: &pool_u64_unbound::Pool, x: u128, y: u128, z: u128): u128
}
```
