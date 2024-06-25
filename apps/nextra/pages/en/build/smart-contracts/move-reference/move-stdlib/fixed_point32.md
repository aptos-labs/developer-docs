<a id="0x1_fixed_point32"></a>

# Module `0x1::fixed_point32`

Defines a fixed&#45;point numeric type with a 32&#45;bit integer part and
a 32&#45;bit fractional part.

- [Struct `FixedPoint32`](#0x1_fixed_point32_FixedPoint32)
- [Constants](#@Constants_0)
- [Function `multiply_u64`](#0x1_fixed_point32_multiply_u64)
- [Function `divide_u64`](#0x1_fixed_point32_divide_u64)
- [Function `create_from_rational`](#0x1_fixed_point32_create_from_rational)
- [Function `create_from_raw_value`](#0x1_fixed_point32_create_from_raw_value)
- [Function `get_raw_value`](#0x1_fixed_point32_get_raw_value)
- [Function `is_zero`](#0x1_fixed_point32_is_zero)
- [Function `min`](#0x1_fixed_point32_min)
- [Function `max`](#0x1_fixed_point32_max)
- [Function `create_from_u64`](#0x1_fixed_point32_create_from_u64)
- [Function `floor`](#0x1_fixed_point32_floor)
- [Function `ceil`](#0x1_fixed_point32_ceil)
- [Function `round`](#0x1_fixed_point32_round)

```move
module 0x1::fixed_point32 {
}
```

<a id="0x1_fixed_point32_FixedPoint32"></a>

## Struct `FixedPoint32`

Define a fixed&#45;point numeric type with 32 fractional bits.
This is just a u64 integer but it is wrapped in a struct to
make a unique type. This is a binary representation, so decimal
values may not be exactly representable, but it provides more
than 9 decimal digits of precision both before and after the
decimal point (18 digits total). For comparison, double precision
floating&#45;point has less than 16 decimal digits of precision, so
be careful about using floating&#45;point to convert these values to
decimal.

```move
module 0x1::fixed_point32 {
    struct FixedPoint32 has copy, drop, store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_fixed_point32_MAX_U64"></a>

```move
module 0x1::fixed_point32 {
    const MAX_U64: u128 = 18446744073709551615;
}
```

<a id="0x1_fixed_point32_EDENOMINATOR"></a>

The denominator provided was zero

```move
module 0x1::fixed_point32 {
    const EDENOMINATOR: u64 = 65537;
}
```

<a id="0x1_fixed_point32_EDIVISION"></a>

The quotient value would be too large to be held in a `u64`

```move
module 0x1::fixed_point32 {
    const EDIVISION: u64 = 131074;
}
```

<a id="0x1_fixed_point32_EDIVISION_BY_ZERO"></a>

A division by zero was encountered

```move
module 0x1::fixed_point32 {
    const EDIVISION_BY_ZERO: u64 = 65540;
}
```

<a id="0x1_fixed_point32_EMULTIPLICATION"></a>

The multiplied value would be too large to be held in a `u64`

```move
module 0x1::fixed_point32 {
    const EMULTIPLICATION: u64 = 131075;
}
```

<a id="0x1_fixed_point32_ERATIO_OUT_OF_RANGE"></a>

The computed ratio when converting to a `FixedPoint32` would be unrepresentable

```move
module 0x1::fixed_point32 {
    const ERATIO_OUT_OF_RANGE: u64 = 131077;
}
```

<a id="0x1_fixed_point32_multiply_u64"></a>

## Function `multiply_u64`

Multiply a u64 integer by a fixed&#45;point number, truncating any
fractional part of the product. This will abort if the product
overflows.

```move
module 0x1::fixed_point32 {
    public fun multiply_u64(val: u64, multiplier: fixed_point32::FixedPoint32): u64
}
```

<a id="0x1_fixed_point32_divide_u64"></a>

## Function `divide_u64`

Divide a u64 integer by a fixed&#45;point number, truncating any
fractional part of the quotient. This will abort if the divisor
is zero or if the quotient overflows.

```move
module 0x1::fixed_point32 {
    public fun divide_u64(val: u64, divisor: fixed_point32::FixedPoint32): u64
}
```

<a id="0x1_fixed_point32_create_from_rational"></a>

## Function `create_from_rational`

Create a fixed&#45;point value from a rational number specified by its
numerator and denominator. Calling this function should be preferred
for using `Self::create_from_raw_value` which is also available.
This will abort if the denominator is zero. It will also
abort if the numerator is nonzero and the ratio is not in the range
2^&#45;32 .. 2^32&#45;1. When specifying decimal fractions, be careful about
rounding errors: if you round to display N digits after the decimal
point, you can use a denominator of 10^N to avoid numbers where the
very small imprecision in the binary representation could change the
rounding, e.g., 0.0125 will round down to 0.012 instead of up to 0.013.

```move
module 0x1::fixed_point32 {
    public fun create_from_rational(numerator: u64, denominator: u64): fixed_point32::FixedPoint32
}
```

<a id="0x1_fixed_point32_create_from_raw_value"></a>

## Function `create_from_raw_value`

Create a fixedpoint value from a raw value.

```move
module 0x1::fixed_point32 {
    public fun create_from_raw_value(value: u64): fixed_point32::FixedPoint32
}
```

<a id="0x1_fixed_point32_get_raw_value"></a>

## Function `get_raw_value`

Accessor for the raw u64 value. Other less common operations, such as
adding or subtracting FixedPoint32 values, can be done using the raw
values directly.

```move
module 0x1::fixed_point32 {
    public fun get_raw_value(num: fixed_point32::FixedPoint32): u64
}
```

<a id="0x1_fixed_point32_is_zero"></a>

## Function `is_zero`

Returns true if the ratio is zero.

```move
module 0x1::fixed_point32 {
    public fun is_zero(num: fixed_point32::FixedPoint32): bool
}
```

<a id="0x1_fixed_point32_min"></a>

## Function `min`

Returns the smaller of the two FixedPoint32 numbers.

```move
module 0x1::fixed_point32 {
    public fun min(num1: fixed_point32::FixedPoint32, num2: fixed_point32::FixedPoint32): fixed_point32::FixedPoint32
}
```

<a id="0x1_fixed_point32_max"></a>

## Function `max`

Returns the larger of the two FixedPoint32 numbers.

```move
module 0x1::fixed_point32 {
    public fun max(num1: fixed_point32::FixedPoint32, num2: fixed_point32::FixedPoint32): fixed_point32::FixedPoint32
}
```

<a id="0x1_fixed_point32_create_from_u64"></a>

## Function `create_from_u64`

Create a fixedpoint value from a u64 value.

```move
module 0x1::fixed_point32 {
    public fun create_from_u64(val: u64): fixed_point32::FixedPoint32
}
```

<a id="0x1_fixed_point32_floor"></a>

## Function `floor`

Returns the largest integer less than or equal to a given number.

```move
module 0x1::fixed_point32 {
    public fun floor(num: fixed_point32::FixedPoint32): u64
}
```

<a id="0x1_fixed_point32_ceil"></a>

## Function `ceil`

Rounds up the given FixedPoint32 to the next largest integer.

```move
module 0x1::fixed_point32 {
    public fun ceil(num: fixed_point32::FixedPoint32): u64
}
```

<a id="0x1_fixed_point32_round"></a>

## Function `round`

Returns the value of a FixedPoint32 to the nearest integer.

```move
module 0x1::fixed_point32 {
    public fun round(num: fixed_point32::FixedPoint32): u64
}
```
