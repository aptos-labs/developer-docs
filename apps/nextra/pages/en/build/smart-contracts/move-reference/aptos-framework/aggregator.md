<a id="0x1_aggregator"></a>

# Module `0x1::aggregator`

This module provides an interface for aggregators. Aggregators are similar to
unsigned integers and support addition and subtraction (aborting on underflow
or on overflowing a custom upper limit). The difference from integers is that
aggregators allow to perform both additions and subtractions in parallel across
multiple transactions, enabling parallel execution. For example, if the first
transaction is doing `add(X, 1)` for aggregator resource `X`, and the second
is doing `sub(X,3)`, they can be executed in parallel avoiding a read&#45;modify&#45;write
dependency.
However, reading the aggregator value (i.e. calling `read(X)`) is an expensive
operation and should be avoided as much as possible because it reduces the
parallelism. Moreover, \*\*aggregators can only be created by Aptos Framework (0x1)
at the moment.\*\*

- [Struct `Aggregator`](#0x1_aggregator_Aggregator)
- [Constants](#@Constants_0)
- [Function `limit`](#0x1_aggregator_limit)
- [Function `add`](#0x1_aggregator_add)
- [Function `sub`](#0x1_aggregator_sub)
- [Function `read`](#0x1_aggregator_read)
- [Function `destroy`](#0x1_aggregator_destroy)

```move
module 0x1::aggregator {
}
```

<a id="0x1_aggregator_Aggregator"></a>

## Struct `Aggregator`

Represents an integer which supports parallel additions and subtractions
across multiple transactions. See the module description for more details.

```move
module 0x1::aggregator {
    struct Aggregator has store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_aggregator_EAGGREGATOR_OVERFLOW"></a>

The value of aggregator overflows. Raised by native code.

```move
module 0x1::aggregator {
    const EAGGREGATOR_OVERFLOW: u64 = 1;
}
```

<a id="0x1_aggregator_EAGGREGATOR_UNDERFLOW"></a>

The value of aggregator underflows (goes below zero). Raised by native code.

```move
module 0x1::aggregator {
    const EAGGREGATOR_UNDERFLOW: u64 = 2;
}
```

<a id="0x1_aggregator_ENOT_SUPPORTED"></a>

Aggregator feature is not supported. Raised by native code.

```move
module 0x1::aggregator {
    const ENOT_SUPPORTED: u64 = 3;
}
```

<a id="0x1_aggregator_limit"></a>

## Function `limit`

Returns `limit` exceeding which aggregator overflows.

```move
module 0x1::aggregator {
    public fun limit(aggregator: &aggregator::Aggregator): u128
}
```

<a id="0x1_aggregator_add"></a>

## Function `add`

Adds `value` to aggregator. Aborts on overflowing the limit.

```move
module 0x1::aggregator {
    public fun add(aggregator: &mut aggregator::Aggregator, value: u128)
}
```

<a id="0x1_aggregator_sub"></a>

## Function `sub`

Subtracts `value` from aggregator. Aborts on going below zero.

```move
module 0x1::aggregator {
    public fun sub(aggregator: &mut aggregator::Aggregator, value: u128)
}
```

<a id="0x1_aggregator_read"></a>

## Function `read`

Returns a value stored in this aggregator.

```move
module 0x1::aggregator {
    public fun read(aggregator: &aggregator::Aggregator): u128
}
```

<a id="0x1_aggregator_destroy"></a>

## Function `destroy`

Destroys an aggregator and removes it from its `AggregatorFactory`.

```move
module 0x1::aggregator {
    public fun destroy(aggregator: aggregator::Aggregator)
}
```
