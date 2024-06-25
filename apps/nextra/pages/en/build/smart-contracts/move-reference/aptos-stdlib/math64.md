<a id="0x1_math64"></a>

# Module `0x1::math64`

Standard math utilities missing in the Move Language.

- [Constants](#@Constants_0)
- [Function `max`](#0x1_math64_max)
- [Function `min`](#0x1_math64_min)
- [Function `average`](#0x1_math64_average)
- [Function `gcd`](#0x1_math64_gcd)
- [Function `mul_div`](#0x1_math64_mul_div)
- [Function `clamp`](#0x1_math64_clamp)
- [Function `pow`](#0x1_math64_pow)
- [Function `floor_log2`](#0x1_math64_floor_log2)
- [Function `log2`](#0x1_math64_log2)
- [Function `sqrt`](#0x1_math64_sqrt)
- [Function `ceil_div`](#0x1_math64_ceil_div)

```move
module 0x1::math64 {
    use 0x1::error;
    use 0x1::fixed_point32;
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_math64_EINVALID_ARG_FLOOR_LOG2"></a>

Cannot log2 the value 0

```move
module 0x1::math64 {
    const EINVALID_ARG_FLOOR_LOG2: u64 = 1;
}
```

<a id="0x1_math64_max"></a>

## Function `max`

Return the largest of two numbers.

```move
module 0x1::math64 {
    public fun max(a: u64, b: u64): u64
}
```

<a id="0x1_math64_min"></a>

## Function `min`

Return the smallest of two numbers.

```move
module 0x1::math64 {
    public fun min(a: u64, b: u64): u64
}
```

<a id="0x1_math64_average"></a>

## Function `average`

Return the average of two.

```move
module 0x1::math64 {
    public fun average(a: u64, b: u64): u64
}
```

<a id="0x1_math64_gcd"></a>

## Function `gcd`

Return greatest common divisor of `a` &amp; `b`, via the Euclidean algorithm.

```move
module 0x1::math64 {
    public fun gcd(a: u64, b: u64): u64
}
```

<a id="0x1_math64_mul_div"></a>

## Function `mul_div`

Returns a \* b / c going through u128 to prevent intermediate overflow

```move
module 0x1::math64 {
    public fun mul_div(a: u64, b: u64, c: u64): u64
}
```

<a id="0x1_math64_clamp"></a>

## Function `clamp`

Return x clamped to the interval [lower, upper].

```move
module 0x1::math64 {
    public fun clamp(x: u64, lower: u64, upper: u64): u64
}
```

<a id="0x1_math64_pow"></a>

## Function `pow`

Return the value of n raised to power e

```move
module 0x1::math64 {
    public fun pow(n: u64, e: u64): u64
}
```

<a id="0x1_math64_floor_log2"></a>

## Function `floor_log2`

Returns floor(lg2(x))

```move
module 0x1::math64 {
    public fun floor_log2(x: u64): u8
}
```

<a id="0x1_math64_log2"></a>

## Function `log2`

```move
module 0x1::math64 {
    public fun log2(x: u64): fixed_point32::FixedPoint32
}
```

<a id="0x1_math64_sqrt"></a>

## Function `sqrt`

Returns square root of x, precisely floor(sqrt(x))

```move
module 0x1::math64 {
    public fun sqrt(x: u64): u64
}
```

<a id="0x1_math64_ceil_div"></a>

## Function `ceil_div`

```move
module 0x1::math64 {
    public fun ceil_div(x: u64, y: u64): u64
}
```
