<a id="0x1_math_fixed64"></a>

# Module `0x1::math_fixed64`

Standard math utilities missing in the Move Language.

- [Constants](#@Constants_0)
- [Function `sqrt`](#0x1_math_fixed64_sqrt)
- [Function `exp`](#0x1_math_fixed64_exp)
- [Function `log2_plus_64`](#0x1_math_fixed64_log2_plus_64)
- [Function `ln_plus_32ln2`](#0x1_math_fixed64_ln_plus_32ln2)
- [Function `pow`](#0x1_math_fixed64_pow)
- [Function `mul_div`](#0x1_math_fixed64_mul_div)

```move
module 0x1::math_fixed64 {
    use 0x1::error;
    use 0x1::fixed_point64;
    use 0x1::math128;
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_math_fixed64_EOVERFLOW_EXP"></a>

Abort code on overflow

```move
module 0x1::math_fixed64 {
    const EOVERFLOW_EXP: u64 = 1;
}
```

<a id="0x1_math_fixed64_LN2"></a>

Natural log 2 in 32 bit fixed point

```move
module 0x1::math_fixed64 {
    const LN2: u256 = 12786308645202655660;
}
```

<a id="0x1_math_fixed64_sqrt"></a>

## Function `sqrt`

Square root of fixed point number

```move
module 0x1::math_fixed64 {
    public fun sqrt(x: fixed_point64::FixedPoint64): fixed_point64::FixedPoint64
}
```

<a id="0x1_math_fixed64_exp"></a>

## Function `exp`

Exponent function with a precission of 9 digits.

```move
module 0x1::math_fixed64 {
    public fun exp(x: fixed_point64::FixedPoint64): fixed_point64::FixedPoint64
}
```

<a id="0x1_math_fixed64_log2_plus_64"></a>

## Function `log2_plus_64`

Because log2 is negative for values &lt; 1 we instead return log2(x) &#43; 64 which
is positive for all values of x.

```move
module 0x1::math_fixed64 {
    public fun log2_plus_64(x: fixed_point64::FixedPoint64): fixed_point64::FixedPoint64
}
```

<a id="0x1_math_fixed64_ln_plus_32ln2"></a>

## Function `ln_plus_32ln2`

```move
module 0x1::math_fixed64 {
    public fun ln_plus_32ln2(x: fixed_point64::FixedPoint64): fixed_point64::FixedPoint64
}
```

<a id="0x1_math_fixed64_pow"></a>

## Function `pow`

Integer power of a fixed point number

```move
module 0x1::math_fixed64 {
    public fun pow(x: fixed_point64::FixedPoint64, n: u64): fixed_point64::FixedPoint64
}
```

<a id="0x1_math_fixed64_mul_div"></a>

## Function `mul_div`

Specialized function for x \* y / z that omits intermediate shifting

```move
module 0x1::math_fixed64 {
    public fun mul_div(x: fixed_point64::FixedPoint64, y: fixed_point64::FixedPoint64, z: fixed_point64::FixedPoint64): fixed_point64::FixedPoint64
}
```
