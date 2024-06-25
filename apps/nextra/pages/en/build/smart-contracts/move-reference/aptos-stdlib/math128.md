<a id="0x1_math128"></a>

# Module `0x1::math128`

Standard math utilities missing in the Move Language.

- [Constants](#@Constants_0)
- [Function `max`](#0x1_math128_max)
- [Function `min`](#0x1_math128_min)
- [Function `average`](#0x1_math128_average)
- [Function `gcd`](#0x1_math128_gcd)
- [Function `mul_div`](#0x1_math128_mul_div)
- [Function `clamp`](#0x1_math128_clamp)
- [Function `pow`](#0x1_math128_pow)
- [Function `floor_log2`](#0x1_math128_floor_log2)
- [Function `log2`](#0x1_math128_log2)
- [Function `log2_64`](#0x1_math128_log2_64)
- [Function `sqrt`](#0x1_math128_sqrt)
- [Function `ceil_div`](#0x1_math128_ceil_div)

```move
module 0x1::math128 {
    use 0x1::error;
    use 0x1::fixed_point32;
    use 0x1::fixed_point64;
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_math128_EINVALID_ARG_FLOOR_LOG2"></a>

Cannot log2 the value 0

```move
module 0x1::math128 {
    const EINVALID_ARG_FLOOR_LOG2: u64 = 1;
}
```

<a id="0x1_math128_max"></a>

## Function `max`

Return the largest of two numbers.

```move
module 0x1::math128 {
    public fun max(a: u128, b: u128): u128
}
```

<a id="0x1_math128_min"></a>

## Function `min`

Return the smallest of two numbers.

```move
module 0x1::math128 {
    public fun min(a: u128, b: u128): u128
}
```

<a id="0x1_math128_average"></a>

## Function `average`

Return the average of two.

```move
module 0x1::math128 {
    public fun average(a: u128, b: u128): u128
}
```

<a id="0x1_math128_gcd"></a>

## Function `gcd`

Return greatest common divisor of `a` &amp; `b`, via the Euclidean algorithm.

```move
module 0x1::math128 {
    public fun gcd(a: u128, b: u128): u128
}
```

<a id="0x1_math128_mul_div"></a>

## Function `mul_div`

Returns a \* b / c going through u256 to prevent intermediate overflow

```move
module 0x1::math128 {
    public fun mul_div(a: u128, b: u128, c: u128): u128
}
```

<a id="0x1_math128_clamp"></a>

## Function `clamp`

Return x clamped to the interval [lower, upper].

```move
module 0x1::math128 {
    public fun clamp(x: u128, lower: u128, upper: u128): u128
}
```

<a id="0x1_math128_pow"></a>

## Function `pow`

Return the value of n raised to power e

```move
module 0x1::math128 {
    public fun pow(n: u128, e: u128): u128
}
```

<a id="0x1_math128_floor_log2"></a>

## Function `floor_log2`

Returns floor(log2(x))

```move
module 0x1::math128 {
    public fun floor_log2(x: u128): u8
}
```

<a id="0x1_math128_log2"></a>

## Function `log2`

```move
module 0x1::math128 {
    public fun log2(x: u128): fixed_point32::FixedPoint32
}
```

<a id="0x1_math128_log2_64"></a>

## Function `log2_64`

```move
module 0x1::math128 {
    public fun log2_64(x: u128): fixed_point64::FixedPoint64
}
```

<a id="0x1_math128_sqrt"></a>

## Function `sqrt`

Returns square root of x, precisely floor(sqrt(x))

```move
module 0x1::math128 {
    public fun sqrt(x: u128): u128
}
```

<a id="0x1_math128_ceil_div"></a>

## Function `ceil_div`

```move
module 0x1::math128 {
    public fun ceil_div(x: u128, y: u128): u128
}
```
