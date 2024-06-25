<a id="0x1_optional_aggregator"></a>

# Module `0x1::optional_aggregator`

This module provides an interface to aggregate integers either via
aggregator (parallelizable) or via normal integers.

- [Struct `Integer`](#0x1_optional_aggregator_Integer)
- [Struct `OptionalAggregator`](#0x1_optional_aggregator_OptionalAggregator)
- [Constants](#@Constants_0)
- [Function `new`](#0x1_optional_aggregator_new)
- [Function `switch`](#0x1_optional_aggregator_switch)
- [Function `destroy`](#0x1_optional_aggregator_destroy)
- [Function `add`](#0x1_optional_aggregator_add)
- [Function `sub`](#0x1_optional_aggregator_sub)
- [Function `read`](#0x1_optional_aggregator_read)
- [Function `is_parallelizable`](#0x1_optional_aggregator_is_parallelizable)

```move
module 0x1::optional_aggregator {
    use 0x1::aggregator;
    use 0x1::aggregator_factory;
    use 0x1::error;
    use 0x1::option;
}
```

<a id="0x1_optional_aggregator_Integer"></a>

## Struct `Integer`

Wrapper around integer with a custom overflow limit. Supports add, subtract and read just like `Aggregator`.

```move
module 0x1::optional_aggregator {
    struct Integer has store
}
```

<a id="0x1_optional_aggregator_OptionalAggregator"></a>

## Struct `OptionalAggregator`

Contains either an aggregator or a normal integer, both overflowing on limit.

```move
module 0x1::optional_aggregator {
    struct OptionalAggregator has store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_optional_aggregator_EAGGREGATOR_OVERFLOW"></a>

The value of aggregator underflows (goes below zero). Raised by native code.

```move
module 0x1::optional_aggregator {
    const EAGGREGATOR_OVERFLOW: u64 = 1;
}
```

<a id="0x1_optional_aggregator_EAGGREGATOR_UNDERFLOW"></a>

Aggregator feature is not supported. Raised by native code.

```move
module 0x1::optional_aggregator {
    const EAGGREGATOR_UNDERFLOW: u64 = 2;
}
```

<a id="0x1_optional_aggregator_new"></a>

## Function `new`

Creates a new optional aggregator.

```move
module 0x1::optional_aggregator {
    public(friend) fun new(limit: u128, parallelizable: bool): optional_aggregator::OptionalAggregator
}
```

<a id="0x1_optional_aggregator_switch"></a>

## Function `switch`

Switches between parallelizable and non&#45;parallelizable implementations.

```move
module 0x1::optional_aggregator {
    public fun switch(optional_aggregator: &mut optional_aggregator::OptionalAggregator)
}
```

<a id="0x1_optional_aggregator_destroy"></a>

## Function `destroy`

Destroys optional aggregator.

```move
module 0x1::optional_aggregator {
    public fun destroy(optional_aggregator: optional_aggregator::OptionalAggregator)
}
```

<a id="0x1_optional_aggregator_add"></a>

## Function `add`

Adds `value` to optional aggregator, aborting on exceeding the `limit`.

```move
module 0x1::optional_aggregator {
    public fun add(optional_aggregator: &mut optional_aggregator::OptionalAggregator, value: u128)
}
```

<a id="0x1_optional_aggregator_sub"></a>

## Function `sub`

Subtracts `value` from optional aggregator, aborting on going below zero.

```move
module 0x1::optional_aggregator {
    public fun sub(optional_aggregator: &mut optional_aggregator::OptionalAggregator, value: u128)
}
```

<a id="0x1_optional_aggregator_read"></a>

## Function `read`

Returns the value stored in optional aggregator.

```move
module 0x1::optional_aggregator {
    public fun read(optional_aggregator: &optional_aggregator::OptionalAggregator): u128
}
```

<a id="0x1_optional_aggregator_is_parallelizable"></a>

## Function `is_parallelizable`

Returns true if optional aggregator uses parallelizable implementation.

```move
module 0x1::optional_aggregator {
    public fun is_parallelizable(optional_aggregator: &optional_aggregator::OptionalAggregator): bool
}
```
