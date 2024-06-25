<a id="0x1_comparator"></a>

# Module `0x1::comparator`

Provides a framework for comparing two elements

- [Struct `Result`](#0x1_comparator_Result)
- [Constants](#@Constants_0)
- [Function `is_equal`](#0x1_comparator_is_equal)
- [Function `is_smaller_than`](#0x1_comparator_is_smaller_than)
- [Function `is_greater_than`](#0x1_comparator_is_greater_than)
- [Function `compare`](#0x1_comparator_compare)
- [Function `compare_u8_vector`](#0x1_comparator_compare_u8_vector)

```move
module 0x1::comparator {
    use 0x1::bcs;
}
```

<a id="0x1_comparator_Result"></a>

## Struct `Result`

```move
module 0x1::comparator {
    struct Result has drop
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_comparator_EQUAL"></a>

```move
module 0x1::comparator {
    const EQUAL: u8 = 0;
}
```

<a id="0x1_comparator_GREATER"></a>

```move
module 0x1::comparator {
    const GREATER: u8 = 2;
}
```

<a id="0x1_comparator_SMALLER"></a>

```move
module 0x1::comparator {
    const SMALLER: u8 = 1;
}
```

<a id="0x1_comparator_is_equal"></a>

## Function `is_equal`

```move
module 0x1::comparator {
    public fun is_equal(result: &comparator::Result): bool
}
```

<a id="0x1_comparator_is_smaller_than"></a>

## Function `is_smaller_than`

```move
module 0x1::comparator {
    public fun is_smaller_than(result: &comparator::Result): bool
}
```

<a id="0x1_comparator_is_greater_than"></a>

## Function `is_greater_than`

```move
module 0x1::comparator {
    public fun is_greater_than(result: &comparator::Result): bool
}
```

<a id="0x1_comparator_compare"></a>

## Function `compare`

```move
module 0x1::comparator {
    public fun compare<T>(left: &T, right: &T): comparator::Result
}
```

<a id="0x1_comparator_compare_u8_vector"></a>

## Function `compare_u8_vector`

```move
module 0x1::comparator {
    public fun compare_u8_vector(left: vector<u8>, right: vector<u8>): comparator::Result
}
```
