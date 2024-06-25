<a id="0x1_fixed_point64"></a>

# Module `0x1::fixed_point64`

Defines a fixed&#45;point numeric type with a 64&#45;bit integer part and
a 64&#45;bit fractional part.

- [Struct `FixedPoint64`](#0x1_fixed_point64_FixedPoint64)
- [Constants](#@Constants_0)
- [Function `sub`](#0x1_fixed_point64_sub)
- [Function `add`](#0x1_fixed_point64_add)
- [Function `multiply_u128`](#0x1_fixed_point64_multiply_u128)
- [Function `divide_u128`](#0x1_fixed_point64_divide_u128)
- [Function `create_from_rational`](#0x1_fixed_point64_create_from_rational)
- [Function `create_from_raw_value`](#0x1_fixed_point64_create_from_raw_value)
- [Function `get_raw_value`](#0x1_fixed_point64_get_raw_value)
- [Function `is_zero`](#0x1_fixed_point64_is_zero)
- [Function `min`](#0x1_fixed_point64_min)
- [Function `max`](#0x1_fixed_point64_max)
- [Function `less_or_equal`](#0x1_fixed_point64_less_or_equal)
- [Function `less`](#0x1_fixed_point64_less)
- [Function `greater_or_equal`](#0x1_fixed_point64_greater_or_equal)
- [Function `greater`](#0x1_fixed_point64_greater)
- [Function `equal`](#0x1_fixed_point64_equal)
- [Function `almost_equal`](#0x1_fixed_point64_almost_equal)
- [Function `create_from_u128`](#0x1_fixed_point64_create_from_u128)
- [Function `floor`](#0x1_fixed_point64_floor)
- [Function `ceil`](#0x1_fixed_point64_ceil)
- [Function `round`](#0x1_fixed_point64_round)

```move
module 0x1::fixed_point64 {
}
```

<a id="0x1_fixed_point64_FixedPoint64"></a>

## Struct `FixedPoint64`

Define a fixed&#45;point numeric type with 64 fractional bits.
This is just a u128 integer but it is wrapped in a struct to
make a unique type. This is a binary representation, so decimal
values may not be exactly representable, but it provides more
than 9 decimal digits of precision both before and after the
decimal point (18 digits total). For comparison, double precision
floating&#45;point has less than 16 decimal digits of precision, so
be careful about using floating&#45;point to convert these values to
decimal.

```move
module 0x1::fixed_point64 {
    struct FixedPoint64 has copy, drop, store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_fixed_point64_MAX_U128"></a>

```move
module 0x1::fixed_point64 {
    const MAX_U128: u256 = 340282366920938463463374607431768211455;
}
```

<a id="0x1_fixed_point64_EDENOMINATOR"></a>

The denominator provided was zero

```move
module 0x1::fixed_point64 {
    const EDENOMINATOR: u64 = 65537;
}
```

<a id="0x1_fixed_point64_EDIVISION"></a>

The quotient value would be too large to be held in a `u128`

```move
module 0x1::fixed_point64 {
    const EDIVISION: u64 = 131074;
}
```

<a id="0x1_fixed_point64_EDIVISION_BY_ZERO"></a>

A division by zero was encountered

```move
module 0x1::fixed_point64 {
    const EDIVISION_BY_ZERO: u64 = 65540;
}
```

<a id="0x1_fixed_point64_EMULTIPLICATION"></a>

The multiplied value would be too large to be held in a `u128`

```move
module 0x1::fixed_point64 {
    const EMULTIPLICATION: u64 = 131075;
}
```

<a id="0x1_fixed_point64_ENEGATIVE_RESULT"></a>

Abort code on calculation result is negative.

```move
module 0x1::fixed_point64 {
    const ENEGATIVE_RESULT: u64 = 65542;
}
```

<a id="0x1_fixed_point64_ERATIO_OUT_OF_RANGE"></a>

The computed ratio when converting to a `FixedPoint64` would be unrepresentable

```move
module 0x1::fixed_point64 {
    const ERATIO_OUT_OF_RANGE: u64 = 131077;
}
```

<a id="0x1_fixed_point64_sub"></a>

## Function `sub`

Returns x &#45; y. x must be not less than y.

```move
module 0x1::fixed_point64 {
    public fun sub(x: fixed_point64::FixedPoint64, y: fixed_point64::FixedPoint64): fixed_point64::FixedPoint64
}
```

<a id="0x1_fixed_point64_add"></a>

## Function `add`

Returns x &#43; y. The result cannot be greater than MAX_U128.

```move
module 0x1::fixed_point64 {
    public fun add(x: fixed_point64::FixedPoint64, y: fixed_point64::FixedPoint64): fixed_point64::FixedPoint64
}
```

<a id="0x1_fixed_point64_multiply_u128"></a>

## Function `multiply_u128`

Multiply a u128 integer by a fixed&#45;point number, truncating any
fractional part of the product. This will abort if the product
overflows.

```move
module 0x1::fixed_point64 {
    public fun multiply_u128(val: u128, multiplier: fixed_point64::FixedPoint64): u128
}
```

<a id="0x1_fixed_point64_divide_u128"></a>

## Function `divide_u128`

Divide a u128 integer by a fixed&#45;point number, truncating any
fractional part of the quotient. This will abort if the divisor
is zero or if the quotient overflows.

```move
module 0x1::fixed_point64 {
    public fun divide_u128(val: u128, divisor: fixed_point64::FixedPoint64): u128
}
```

<a id="0x1_fixed_point64_create_from_rational"></a>

## Function `create_from_rational`

Create a fixed&#45;point value from a rational number specified by its
numerator and denominator. Calling this function should be preferred
for using `Self::create_from_raw_value` which is also available.
This will abort if the denominator is zero. It will also
abort if the numerator is nonzero and the ratio is not in the range
2^&#45;64 .. 2^64&#45;1. When specifying decimal fractions, be careful about
rounding errors: if you round to display N digits after the decimal
point, you can use a denominator of 10^N to avoid numbers where the
very small imprecision in the binary representation could change the
rounding, e.g., 0.0125 will round down to 0.012 instead of up to 0.013.

```move
module 0x1::fixed_point64 {
    public fun create_from_rational(numerator: u128, denominator: u128): fixed_point64::FixedPoint64
}
```

<a id="0x1_fixed_point64_create_from_raw_value"></a>

## Function `create_from_raw_value`

Create a fixedpoint value from a raw value.

```move
module 0x1::fixed_point64 {
    public fun create_from_raw_value(value: u128): fixed_point64::FixedPoint64
}
```

<a id="0x1_fixed_point64_get_raw_value"></a>

## Function `get_raw_value`

Accessor for the raw u128 value. Other less common operations, such as
adding or subtracting FixedPoint64 values, can be done using the raw
values directly.

```move
module 0x1::fixed_point64 {
    public fun get_raw_value(num: fixed_point64::FixedPoint64): u128
}
```

<a id="0x1_fixed_point64_is_zero"></a>

## Function `is_zero`

Returns true if the ratio is zero.

```move
module 0x1::fixed_point64 {
    public fun is_zero(num: fixed_point64::FixedPoint64): bool
}
```

<a id="0x1_fixed_point64_min"></a>

## Function `min`

Returns the smaller of the two FixedPoint64 numbers.

```move
module 0x1::fixed_point64 {
    public fun min(num1: fixed_point64::FixedPoint64, num2: fixed_point64::FixedPoint64): fixed_point64::FixedPoint64
}
```

<a id="0x1_fixed_point64_max"></a>

## Function `max`

Returns the larger of the two FixedPoint64 numbers.

```move
module 0x1::fixed_point64 {
    public fun max(num1: fixed_point64::FixedPoint64, num2: fixed_point64::FixedPoint64): fixed_point64::FixedPoint64
}
```

<a id="0x1_fixed_point64_less_or_equal"></a>

## Function `less_or_equal`

Returns true if num1 &lt;&#61; num2

```move
module 0x1::fixed_point64 {
    public fun less_or_equal(num1: fixed_point64::FixedPoint64, num2: fixed_point64::FixedPoint64): bool
}
```

<a id="0x1_fixed_point64_less"></a>

## Function `less`

Returns true if num1 &lt; num2

```move
module 0x1::fixed_point64 {
    public fun less(num1: fixed_point64::FixedPoint64, num2: fixed_point64::FixedPoint64): bool
}
```

<a id="0x1_fixed_point64_greater_or_equal"></a>

## Function `greater_or_equal`

Returns true if num1 &gt;&#61; num2

```move
module 0x1::fixed_point64 {
    public fun greater_or_equal(num1: fixed_point64::FixedPoint64, num2: fixed_point64::FixedPoint64): bool
}
```

<a id="0x1_fixed_point64_greater"></a>

## Function `greater`

Returns true if num1 &gt; num2

```move
module 0x1::fixed_point64 {
    public fun greater(num1: fixed_point64::FixedPoint64, num2: fixed_point64::FixedPoint64): bool
}
```

<a id="0x1_fixed_point64_equal"></a>

## Function `equal`

Returns true if num1 &#61; num2

```move
module 0x1::fixed_point64 {
    public fun equal(num1: fixed_point64::FixedPoint64, num2: fixed_point64::FixedPoint64): bool
}
```

<a id="0x1_fixed_point64_almost_equal"></a>

## Function `almost_equal`

Returns true if num1 almost equals to num2, which means abs(num1&#45;num2) &lt;&#61; precision

```move
module 0x1::fixed_point64 {
    public fun almost_equal(num1: fixed_point64::FixedPoint64, num2: fixed_point64::FixedPoint64, precision: fixed_point64::FixedPoint64): bool
}
```

<a id="0x1_fixed_point64_create_from_u128"></a>

## Function `create_from_u128`

Create a fixedpoint value from a u128 value.

```move
module 0x1::fixed_point64 {
    public fun create_from_u128(val: u128): fixed_point64::FixedPoint64
}
```

<a id="0x1_fixed_point64_floor"></a>

## Function `floor`

Returns the largest integer less than or equal to a given number.

```move
module 0x1::fixed_point64 {
    public fun floor(num: fixed_point64::FixedPoint64): u128
}
```

<a id="0x1_fixed_point64_ceil"></a>

## Function `ceil`

Rounds up the given FixedPoint64 to the next largest integer.

```move
module 0x1::fixed_point64 {
    public fun ceil(num: fixed_point64::FixedPoint64): u128
}
```

<a id="0x1_fixed_point64_round"></a>

## Function `round`

Returns the value of a FixedPoint64 to the nearest integer.

```move
module 0x1::fixed_point64 {
    public fun round(num: fixed_point64::FixedPoint64): u128
}
```
