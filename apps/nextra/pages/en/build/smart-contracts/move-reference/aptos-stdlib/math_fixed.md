<a id="0x1_math_fixed"></a>

# Module `0x1::math_fixed`

Standard math utilities missing in the Move Language.

- [Constants](#@Constants_0)
- [Function `sqrt`](#0x1_math_fixed_sqrt)
- [Function `exp`](#0x1_math_fixed_exp)
- [Function `log2_plus_32`](#0x1_math_fixed_log2_plus_32)
- [Function `ln_plus_32ln2`](#0x1_math_fixed_ln_plus_32ln2)
- [Function `pow`](#0x1_math_fixed_pow)
- [Function `mul_div`](#0x1_math_fixed_mul_div)

```move
module 0x1::math_fixed {
    use 0x1::error;
    use 0x1::fixed_point32;
    use 0x1::math128;
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_math_fixed_EOVERFLOW_EXP"></a>

Abort code on overflow

```move
module 0x1::math_fixed {
    const EOVERFLOW_EXP: u64 = 1;
}
```

<a id="0x1_math_fixed_LN2"></a>

Natural log 2 in 32 bit fixed point

```move
module 0x1::math_fixed {
    const LN2: u128 = 2977044472;
}
```

<a id="0x1_math_fixed_LN2_X_32"></a>

```move
module 0x1::math_fixed {
    const LN2_X_32: u64 = 95265423104;
}
```

<a id="0x1_math_fixed_sqrt"></a>

## Function `sqrt`

Square root of fixed point number

```move
module 0x1::math_fixed {
    public fun sqrt(x: fixed_point32::FixedPoint32): fixed_point32::FixedPoint32
}
```

<a id="0x1_math_fixed_exp"></a>

## Function `exp`

Exponent function with a precission of 9 digits.

```move
module 0x1::math_fixed {
    public fun exp(x: fixed_point32::FixedPoint32): fixed_point32::FixedPoint32
}
```

<a id="0x1_math_fixed_log2_plus_32"></a>

## Function `log2_plus_32`

Because log2 is negative for values &lt; 1 we instead return log2(x) &#43; 32 which
is positive for all values of x.

```move
module 0x1::math_fixed {
    public fun log2_plus_32(x: fixed_point32::FixedPoint32): fixed_point32::FixedPoint32
}
```

<a id="0x1_math_fixed_ln_plus_32ln2"></a>

## Function `ln_plus_32ln2`

```move
module 0x1::math_fixed {
    public fun ln_plus_32ln2(x: fixed_point32::FixedPoint32): fixed_point32::FixedPoint32
}
```

<a id="0x1_math_fixed_pow"></a>

## Function `pow`

Integer power of a fixed point number

```move
module 0x1::math_fixed {
    public fun pow(x: fixed_point32::FixedPoint32, n: u64): fixed_point32::FixedPoint32
}
```

<a id="0x1_math_fixed_mul_div"></a>

## Function `mul_div`

Specialized function for x \* y / z that omits intermediate shifting

```move
module 0x1::math_fixed {
    public fun mul_div(x: fixed_point32::FixedPoint32, y: fixed_point32::FixedPoint32, z: fixed_point32::FixedPoint32): fixed_point32::FixedPoint32
}
```
