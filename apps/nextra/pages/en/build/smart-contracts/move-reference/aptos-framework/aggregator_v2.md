<a id="0x1_aggregator_v2"></a>

# Module `0x1::aggregator_v2`

This module provides an interface for aggregators (version 2). Aggregators are
similar to unsigned integers and support addition and subtraction (aborting on
underflow or on overflowing a custom upper limit). The difference from integers
is that aggregators allow to perform both additions and subtractions in parallel
across multiple transactions, enabling parallel execution. For example, if the
first transaction is doing `try_add(X, 1)` for aggregator `X`, and the second is
doing `try_sub(X,3)`, they can be executed in parallel avoiding a read&#45;modify&#45;write
dependency.
However, reading the aggregator value (i.e. calling `read(X)`) is a resource&#45;intensive
operation that also reduced parallelism, and should be avoided as much as possible.
If you need to capture the value, without revealing it, use snapshot function instead,
which has no parallelism impact.

From parallelism considerations, there are three different levels of effects: \* enable full parallelism (cannot create conflicts):
max*value, create*\*, snapshot, derive_string_concat \* enable speculative parallelism (generally parallel via branch prediction)
try_add, add, try_sub, sub, is_at_least \* create read/write conflicts, as if you were using a regular field
read, read_snapshot, read_derived_string

- [Struct `Aggregator`](#0x1_aggregator_v2_Aggregator)
- [Struct `AggregatorSnapshot`](#0x1_aggregator_v2_AggregatorSnapshot)
- [Struct `DerivedStringSnapshot`](#0x1_aggregator_v2_DerivedStringSnapshot)
- [Constants](#@Constants_0)
- [Function `max_value`](#0x1_aggregator_v2_max_value)
- [Function `create_aggregator`](#0x1_aggregator_v2_create_aggregator)
- [Function `create_aggregator_with_value`](#0x1_aggregator_v2_create_aggregator_with_value)
- [Function `create_unbounded_aggregator`](#0x1_aggregator_v2_create_unbounded_aggregator)
- [Function `create_unbounded_aggregator_with_value`](#0x1_aggregator_v2_create_unbounded_aggregator_with_value)
- [Function `try_add`](#0x1_aggregator_v2_try_add)
- [Function `add`](#0x1_aggregator_v2_add)
- [Function `try_sub`](#0x1_aggregator_v2_try_sub)
- [Function `sub`](#0x1_aggregator_v2_sub)
- [Function `is_at_least`](#0x1_aggregator_v2_is_at_least)
- [Function `read`](#0x1_aggregator_v2_read)
- [Function `snapshot`](#0x1_aggregator_v2_snapshot)
- [Function `create_snapshot`](#0x1_aggregator_v2_create_snapshot)
- [Function `read_snapshot`](#0x1_aggregator_v2_read_snapshot)
- [Function `read_derived_string`](#0x1_aggregator_v2_read_derived_string)
- [Function `create_derived_string`](#0x1_aggregator_v2_create_derived_string)
- [Function `derive_string_concat`](#0x1_aggregator_v2_derive_string_concat)
- [Function `copy_snapshot`](#0x1_aggregator_v2_copy_snapshot)
- [Function `string_concat`](#0x1_aggregator_v2_string_concat)

```move
module 0x1::aggregator_v2 {
    use 0x1::error;
    use 0x1::features;
    use 0x1::string;
}
```

<a id="0x1_aggregator_v2_Aggregator"></a>

## Struct `Aggregator`

Represents an integer which supports parallel additions and subtractions
across multiple transactions. See the module description for more details.

Currently supported types for IntElement are u64 and u128.

```move
module 0x1::aggregator_v2 {
    struct Aggregator<IntElement> has drop, store
}
```

<a id="0x1_aggregator_v2_AggregatorSnapshot"></a>

## Struct `AggregatorSnapshot`

Represents a constant value, that was derived from an aggregator at given instant in time.
Unlike read() and storing the value directly, this enables parallel execution of transactions,
while storing snapshot of aggregator state elsewhere.

```move
module 0x1::aggregator_v2 {
    struct AggregatorSnapshot<IntElement> has drop, store
}
```

<a id="0x1_aggregator_v2_DerivedStringSnapshot"></a>

## Struct `DerivedStringSnapshot`

```move
module 0x1::aggregator_v2 {
    struct DerivedStringSnapshot has drop, store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_aggregator_v2_EAGGREGATOR_OVERFLOW"></a>

The value of aggregator overflows. Raised by uncoditional add() call

```move
module 0x1::aggregator_v2 {
    const EAGGREGATOR_OVERFLOW: u64 = 1;
}
```

<a id="0x1_aggregator_v2_EAGGREGATOR_UNDERFLOW"></a>

The value of aggregator underflows (goes below zero). Raised by uncoditional sub() call

```move
module 0x1::aggregator_v2 {
    const EAGGREGATOR_UNDERFLOW: u64 = 2;
}
```

<a id="0x1_aggregator_v2_EAGGREGATOR_API_V2_NOT_ENABLED"></a>

The aggregator api v2 feature flag is not enabled.

```move
module 0x1::aggregator_v2 {
    const EAGGREGATOR_API_V2_NOT_ENABLED: u64 = 6;
}
```

<a id="0x1_aggregator_v2_EAGGREGATOR_FUNCTION_NOT_YET_SUPPORTED"></a>

The native aggregator function, that is in the move file, is not yet supported.
and any calls will raise this error.

```move
module 0x1::aggregator_v2 {
    const EAGGREGATOR_FUNCTION_NOT_YET_SUPPORTED: u64 = 9;
}
```

<a id="0x1_aggregator_v2_ECONCAT_STRING_LENGTH_TOO_LARGE"></a>

Arguments passed to concat exceed max limit of 256 bytes (for prefix and suffix together).

```move
module 0x1::aggregator_v2 {
    const ECONCAT_STRING_LENGTH_TOO_LARGE: u64 = 8;
}
```

<a id="0x1_aggregator_v2_EUNSUPPORTED_AGGREGATOR_SNAPSHOT_TYPE"></a>

The generic type supplied to the aggregator snapshot is not supported.

```move
module 0x1::aggregator_v2 {
    const EUNSUPPORTED_AGGREGATOR_SNAPSHOT_TYPE: u64 = 5;
}
```

<a id="0x1_aggregator_v2_EUNSUPPORTED_AGGREGATOR_TYPE"></a>

The generic type supplied to the aggregator is not supported.

```move
module 0x1::aggregator_v2 {
    const EUNSUPPORTED_AGGREGATOR_TYPE: u64 = 7;
}
```

<a id="0x1_aggregator_v2_max_value"></a>

## Function `max_value`

Returns `max_value` exceeding which aggregator overflows.

```move
module 0x1::aggregator_v2 {
    public fun max_value<IntElement: copy, drop>(aggregator: &aggregator_v2::Aggregator<IntElement>): IntElement
}
```

<a id="0x1_aggregator_v2_create_aggregator"></a>

## Function `create_aggregator`

Creates new aggregator, with given &apos;max_value&apos;.

Currently supported types for IntElement are u64 and u128.
EAGGREGATOR_ELEMENT_TYPE_NOT_SUPPORTED raised if called with a different type.

```move
module 0x1::aggregator_v2 {
    public fun create_aggregator<IntElement: copy, drop>(max_value: IntElement): aggregator_v2::Aggregator<IntElement>
}
```

<a id="0x1_aggregator_v2_create_aggregator_with_value"></a>

## Function `create_aggregator_with_value`

```move
module 0x1::aggregator_v2 {
    public fun create_aggregator_with_value<IntElement: copy, drop>(start_value: IntElement, max_value: IntElement): aggregator_v2::Aggregator<IntElement>
}
```

<a id="0x1_aggregator_v2_create_unbounded_aggregator"></a>

## Function `create_unbounded_aggregator`

Creates new aggregator, without any &apos;max_value&apos; on top of the implicit bound restriction
due to the width of the type (i.e. MAX_U64 for u64, MAX_U128 for u128).

Currently supported types for IntElement are u64 and u128.
EAGGREGATOR_ELEMENT_TYPE_NOT_SUPPORTED raised if called with a different type.

```move
module 0x1::aggregator_v2 {
    public fun create_unbounded_aggregator<IntElement: copy, drop>(): aggregator_v2::Aggregator<IntElement>
}
```

<a id="0x1_aggregator_v2_create_unbounded_aggregator_with_value"></a>

## Function `create_unbounded_aggregator_with_value`

```move
module 0x1::aggregator_v2 {
    public fun create_unbounded_aggregator_with_value<IntElement: copy, drop>(start_value: IntElement): aggregator_v2::Aggregator<IntElement>
}
```

<a id="0x1_aggregator_v2_try_add"></a>

## Function `try_add`

Adds `value` to aggregator.
If addition would exceed the max_value, `false` is returned, and aggregator value is left unchanged.

Parallelism info: This operation enables speculative parallelism.

```move
module 0x1::aggregator_v2 {
    public fun try_add<IntElement>(aggregator: &mut aggregator_v2::Aggregator<IntElement>, value: IntElement): bool
}
```

<a id="0x1_aggregator_v2_add"></a>

## Function `add`

Adds `value` to aggregator, unconditionally.
If addition would exceed the max_value, EAGGREGATOR_OVERFLOW exception will be thrown.

Parallelism info: This operation enables speculative parallelism.

```move
module 0x1::aggregator_v2 {
    public fun add<IntElement>(aggregator: &mut aggregator_v2::Aggregator<IntElement>, value: IntElement)
}
```

<a id="0x1_aggregator_v2_try_sub"></a>

## Function `try_sub`

Subtracts `value` from aggregator.
If subtraction would result in a negative value, `false` is returned, and aggregator value is left unchanged.

Parallelism info: This operation enables speculative parallelism.

```move
module 0x1::aggregator_v2 {
    public fun try_sub<IntElement>(aggregator: &mut aggregator_v2::Aggregator<IntElement>, value: IntElement): bool
}
```

<a id="0x1_aggregator_v2_sub"></a>

## Function `sub`

Parallelism info: This operation enables speculative parallelism.

```move
module 0x1::aggregator_v2 {
    public fun sub<IntElement>(aggregator: &mut aggregator_v2::Aggregator<IntElement>, value: IntElement)
}
```

<a id="0x1_aggregator_v2_is_at_least"></a>

## Function `is_at_least`

Returns true if aggregator value is larger than or equal to the given `min_amount`, false otherwise.

This operation is more efficient and much more parallelization friendly than calling `read(agg) > min_amount`.
Until traits are deployed, `is_at_most`/`is_equal` utility methods can be derived from this one (assuming &#43;1 doesn&apos;t overflow):
&#45; for `is_at_most(agg, max_amount)`, you can do `!is_at_least(max_amount + 1)`
&#45; for `is_equal(agg, value)`, you can do `is_at_least(value) && !is_at_least(value + 1)`

Parallelism info: This operation enables speculative parallelism.

```move
module 0x1::aggregator_v2 {
    public fun is_at_least<IntElement>(aggregator: &aggregator_v2::Aggregator<IntElement>, min_amount: IntElement): bool
}
```

<a id="0x1_aggregator_v2_read"></a>

## Function `read`

Returns a value stored in this aggregator.
Note: This operation is resource&#45;intensive, and reduces parallelism.
If you need to capture the value, without revealing it, use snapshot function instead,
which has no parallelism impact.
If called in a transaction that also modifies the aggregator, or has other read/write conflicts,
it will sequentialize that transaction. (i.e. up to concurrency_level times slower)
If called in a separate transaction (i.e. after transaction that modifies aggregator), it might be
up to two times slower.

Parallelism info: This operation \*prevents\* speculative parallelism.

```move
module 0x1::aggregator_v2 {
    public fun read<IntElement>(aggregator: &aggregator_v2::Aggregator<IntElement>): IntElement
}
```

<a id="0x1_aggregator_v2_snapshot"></a>

## Function `snapshot`

Returns a wrapper of a current value of an aggregator
Unlike read(), it is fast and avoids sequential dependencies.

Parallelism info: This operation enables parallelism.

```move
module 0x1::aggregator_v2 {
    public fun snapshot<IntElement>(aggregator: &aggregator_v2::Aggregator<IntElement>): aggregator_v2::AggregatorSnapshot<IntElement>
}
```

<a id="0x1_aggregator_v2_create_snapshot"></a>

## Function `create_snapshot`

Creates a snapshot of a given value.
Useful for when object is sometimes created via snapshot() or string_concat(), and sometimes directly.

```move
module 0x1::aggregator_v2 {
    public fun create_snapshot<IntElement: copy, drop>(value: IntElement): aggregator_v2::AggregatorSnapshot<IntElement>
}
```

<a id="0x1_aggregator_v2_read_snapshot"></a>

## Function `read_snapshot`

Returns a value stored in this snapshot.
Note: This operation is resource&#45;intensive, and reduces parallelism.
(Especially if called in a transaction that also modifies the aggregator,
or has other read/write conflicts)

Parallelism info: This operation \*prevents\* speculative parallelism.

```move
module 0x1::aggregator_v2 {
    public fun read_snapshot<IntElement>(snapshot: &aggregator_v2::AggregatorSnapshot<IntElement>): IntElement
}
```

<a id="0x1_aggregator_v2_read_derived_string"></a>

## Function `read_derived_string`

Returns a value stored in this DerivedStringSnapshot.
Note: This operation is resource&#45;intensive, and reduces parallelism.
(Especially if called in a transaction that also modifies the aggregator,
or has other read/write conflicts)

Parallelism info: This operation \*prevents\* speculative parallelism.

```move
module 0x1::aggregator_v2 {
    public fun read_derived_string(snapshot: &aggregator_v2::DerivedStringSnapshot): string::String
}
```

<a id="0x1_aggregator_v2_create_derived_string"></a>

## Function `create_derived_string`

Creates a DerivedStringSnapshot of a given value.
Useful for when object is sometimes created via string_concat(), and sometimes directly.

```move
module 0x1::aggregator_v2 {
    public fun create_derived_string(value: string::String): aggregator_v2::DerivedStringSnapshot
}
```

<a id="0x1_aggregator_v2_derive_string_concat"></a>

## Function `derive_string_concat`

Concatenates `before`, `snapshot` and `after` into a single string.
snapshot passed needs to have integer type &#45; currently supported types are u64 and u128.
Raises EUNSUPPORTED_AGGREGATOR_SNAPSHOT_TYPE if called with another type.
If length of prefix and suffix together exceed 256 bytes, ECONCAT_STRING_LENGTH_TOO_LARGE is raised.

Parallelism info: This operation enables parallelism.

```move
module 0x1::aggregator_v2 {
    public fun derive_string_concat<IntElement>(before: string::String, snapshot: &aggregator_v2::AggregatorSnapshot<IntElement>, after: string::String): aggregator_v2::DerivedStringSnapshot
}
```

<a id="0x1_aggregator_v2_copy_snapshot"></a>

## Function `copy_snapshot`

NOT YET IMPLEMENTED, always raises EAGGREGATOR_FUNCTION_NOT_YET_SUPPORTED.

```move
module 0x1::aggregator_v2 {
    #[deprecated]
    public fun copy_snapshot<IntElement: copy, drop>(snapshot: &aggregator_v2::AggregatorSnapshot<IntElement>): aggregator_v2::AggregatorSnapshot<IntElement>
}
```

<a id="0x1_aggregator_v2_string_concat"></a>

## Function `string_concat`

DEPRECATED, use derive_string_concat() instead. always raises EAGGREGATOR_FUNCTION_NOT_YET_SUPPORTED.

```move
module 0x1::aggregator_v2 {
    #[deprecated]
    public fun string_concat<IntElement>(before: string::String, snapshot: &aggregator_v2::AggregatorSnapshot<IntElement>, after: string::String): aggregator_v2::AggregatorSnapshot<string::String>
}
```
