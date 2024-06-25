<a id="0x1_pool_u64"></a>

# Module `0x1::pool_u64`

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

- [Struct `Pool`](#0x1_pool_u64_Pool)
- [Constants](#@Constants_0)
- [Function `new`](#0x1_pool_u64_new)
- [Function `create`](#0x1_pool_u64_create)
- [Function `create_with_scaling_factor`](#0x1_pool_u64_create_with_scaling_factor)
- [Function `destroy_empty`](#0x1_pool_u64_destroy_empty)
- [Function `total_coins`](#0x1_pool_u64_total_coins)
- [Function `total_shares`](#0x1_pool_u64_total_shares)
- [Function `contains`](#0x1_pool_u64_contains)
- [Function `shares`](#0x1_pool_u64_shares)
- [Function `balance`](#0x1_pool_u64_balance)
- [Function `shareholders`](#0x1_pool_u64_shareholders)
- [Function `shareholders_count`](#0x1_pool_u64_shareholders_count)
- [Function `update_total_coins`](#0x1_pool_u64_update_total_coins)
- [Function `buy_in`](#0x1_pool_u64_buy_in)
- [Function `redeem_shares`](#0x1_pool_u64_redeem_shares)
- [Function `transfer_shares`](#0x1_pool_u64_transfer_shares)
- [Function `amount_to_shares`](#0x1_pool_u64_amount_to_shares)
- [Function `amount_to_shares_with_total_coins`](#0x1_pool_u64_amount_to_shares_with_total_coins)
- [Function `shares_to_amount`](#0x1_pool_u64_shares_to_amount)
- [Function `shares_to_amount_with_total_coins`](#0x1_pool_u64_shares_to_amount_with_total_coins)
- [Function `multiply_then_divide`](#0x1_pool_u64_multiply_then_divide)

```move
module 0x1::pool_u64 {
    use 0x1::error;
    use 0x1::simple_map;
    use 0x1::vector;
}
```

<a id="0x1_pool_u64_Pool"></a>

## Struct `Pool`

```move
module 0x1::pool_u64 {
    struct Pool has store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_pool_u64_MAX_U64"></a>

```move
module 0x1::pool_u64 {
    const MAX_U64: u64 = 18446744073709551615;
}
```

<a id="0x1_pool_u64_EINSUFFICIENT_SHARES"></a>

Cannot redeem more shares than the shareholder has in the pool.

```move
module 0x1::pool_u64 {
    const EINSUFFICIENT_SHARES: u64 = 4;
}
```

<a id="0x1_pool_u64_EPOOL_IS_NOT_EMPTY"></a>

Cannot destroy non&#45;empty pool.

```move
module 0x1::pool_u64 {
    const EPOOL_IS_NOT_EMPTY: u64 = 3;
}
```

<a id="0x1_pool_u64_EPOOL_TOTAL_COINS_OVERFLOW"></a>

Pool&apos;s total coins cannot exceed u64.max.

```move
module 0x1::pool_u64 {
    const EPOOL_TOTAL_COINS_OVERFLOW: u64 = 6;
}
```

<a id="0x1_pool_u64_EPOOL_TOTAL_SHARES_OVERFLOW"></a>

Pool&apos;s total shares cannot exceed u64.max.

```move
module 0x1::pool_u64 {
    const EPOOL_TOTAL_SHARES_OVERFLOW: u64 = 7;
}
```

<a id="0x1_pool_u64_ESHAREHOLDER_NOT_FOUND"></a>

Shareholder not present in pool.

```move
module 0x1::pool_u64 {
    const ESHAREHOLDER_NOT_FOUND: u64 = 1;
}
```

<a id="0x1_pool_u64_ESHAREHOLDER_SHARES_OVERFLOW"></a>

Shareholder cannot have more than u64.max shares.

```move
module 0x1::pool_u64 {
    const ESHAREHOLDER_SHARES_OVERFLOW: u64 = 5;
}
```

<a id="0x1_pool_u64_ETOO_MANY_SHAREHOLDERS"></a>

There are too many shareholders in the pool.

```move
module 0x1::pool_u64 {
    const ETOO_MANY_SHAREHOLDERS: u64 = 2;
}
```

<a id="0x1_pool_u64_new"></a>

## Function `new`

Create a new pool.

```move
module 0x1::pool_u64 {
    public fun new(shareholders_limit: u64): pool_u64::Pool
}
```

<a id="0x1_pool_u64_create"></a>

## Function `create`

Deprecated. Use `new` instead.
Create a new pool.

```move
module 0x1::pool_u64 {
    #[deprecated]
    public fun create(shareholders_limit: u64): pool_u64::Pool
}
```

<a id="0x1_pool_u64_create_with_scaling_factor"></a>

## Function `create_with_scaling_factor`

Create a new pool with custom `scaling_factor`.

```move
module 0x1::pool_u64 {
    public fun create_with_scaling_factor(shareholders_limit: u64, scaling_factor: u64): pool_u64::Pool
}
```

<a id="0x1_pool_u64_destroy_empty"></a>

## Function `destroy_empty`

Destroy an empty pool. This will fail if the pool has any balance of coins.

```move
module 0x1::pool_u64 {
    public fun destroy_empty(pool: pool_u64::Pool)
}
```

<a id="0x1_pool_u64_total_coins"></a>

## Function `total_coins`

Return `pool`&apos;s total balance of coins.

```move
module 0x1::pool_u64 {
    public fun total_coins(pool: &pool_u64::Pool): u64
}
```

<a id="0x1_pool_u64_total_shares"></a>

## Function `total_shares`

Return the total number of shares across all shareholders in `pool`.

```move
module 0x1::pool_u64 {
    public fun total_shares(pool: &pool_u64::Pool): u64
}
```

<a id="0x1_pool_u64_contains"></a>

## Function `contains`

Return true if `shareholder` is in `pool`.

```move
module 0x1::pool_u64 {
    public fun contains(pool: &pool_u64::Pool, shareholder: address): bool
}
```

<a id="0x1_pool_u64_shares"></a>

## Function `shares`

Return the number of shares of `stakeholder` in `pool`.

```move
module 0x1::pool_u64 {
    public fun shares(pool: &pool_u64::Pool, shareholder: address): u64
}
```

<a id="0x1_pool_u64_balance"></a>

## Function `balance`

Return the balance in coins of `shareholder` in `pool.`

```move
module 0x1::pool_u64 {
    public fun balance(pool: &pool_u64::Pool, shareholder: address): u64
}
```

<a id="0x1_pool_u64_shareholders"></a>

## Function `shareholders`

Return the list of shareholders in `pool`.

```move
module 0x1::pool_u64 {
    public fun shareholders(pool: &pool_u64::Pool): vector<address>
}
```

<a id="0x1_pool_u64_shareholders_count"></a>

## Function `shareholders_count`

Return the number of shareholders in `pool`.

```move
module 0x1::pool_u64 {
    public fun shareholders_count(pool: &pool_u64::Pool): u64
}
```

<a id="0x1_pool_u64_update_total_coins"></a>

## Function `update_total_coins`

Update `pool`&apos;s total balance of coins.

```move
module 0x1::pool_u64 {
    public fun update_total_coins(pool: &mut pool_u64::Pool, new_total_coins: u64)
}
```

<a id="0x1_pool_u64_buy_in"></a>

## Function `buy_in`

Allow an existing or new shareholder to add their coins to the pool in exchange for new shares.

```move
module 0x1::pool_u64 {
    public fun buy_in(pool: &mut pool_u64::Pool, shareholder: address, coins_amount: u64): u64
}
```

<a id="0x1_pool_u64_redeem_shares"></a>

## Function `redeem_shares`

Allow `shareholder` to redeem their shares in `pool` for coins.

```move
module 0x1::pool_u64 {
    public fun redeem_shares(pool: &mut pool_u64::Pool, shareholder: address, shares_to_redeem: u64): u64
}
```

<a id="0x1_pool_u64_transfer_shares"></a>

## Function `transfer_shares`

Transfer shares from `shareholder_1` to `shareholder_2`.

```move
module 0x1::pool_u64 {
    public fun transfer_shares(pool: &mut pool_u64::Pool, shareholder_1: address, shareholder_2: address, shares_to_transfer: u64)
}
```

<a id="0x1_pool_u64_amount_to_shares"></a>

## Function `amount_to_shares`

Return the number of new shares `coins_amount` can buy in `pool`.
`amount` needs to big enough to avoid rounding number.

```move
module 0x1::pool_u64 {
    public fun amount_to_shares(pool: &pool_u64::Pool, coins_amount: u64): u64
}
```

<a id="0x1_pool_u64_amount_to_shares_with_total_coins"></a>

## Function `amount_to_shares_with_total_coins`

Return the number of new shares `coins_amount` can buy in `pool` with a custom total coins number.
`amount` needs to big enough to avoid rounding number.

```move
module 0x1::pool_u64 {
    public fun amount_to_shares_with_total_coins(pool: &pool_u64::Pool, coins_amount: u64, total_coins: u64): u64
}
```

<a id="0x1_pool_u64_shares_to_amount"></a>

## Function `shares_to_amount`

Return the number of coins `shares` are worth in `pool`.
`shares` needs to big enough to avoid rounding number.

```move
module 0x1::pool_u64 {
    public fun shares_to_amount(pool: &pool_u64::Pool, shares: u64): u64
}
```

<a id="0x1_pool_u64_shares_to_amount_with_total_coins"></a>

## Function `shares_to_amount_with_total_coins`

Return the number of coins `shares` are worth in `pool` with a custom total coins number.
`shares` needs to big enough to avoid rounding number.

```move
module 0x1::pool_u64 {
    public fun shares_to_amount_with_total_coins(pool: &pool_u64::Pool, shares: u64, total_coins: u64): u64
}
```

<a id="0x1_pool_u64_multiply_then_divide"></a>

## Function `multiply_then_divide`

```move
module 0x1::pool_u64 {
    public fun multiply_then_divide(_pool: &pool_u64::Pool, x: u64, y: u64, z: u64): u64
}
```
