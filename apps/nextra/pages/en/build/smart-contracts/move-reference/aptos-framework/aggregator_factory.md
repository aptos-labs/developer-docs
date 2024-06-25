<a id="0x1_aggregator_factory"></a>

# Module `0x1::aggregator_factory`

This module provides foundations to create aggregators. Currently only
Aptos Framework (0x1) can create them, so this module helps to wrap
the constructor of `Aggregator` struct so that only a system account
can initialize one. In the future, this might change and aggregators
can be enabled for the public.

- [Resource `AggregatorFactory`](#0x1_aggregator_factory_AggregatorFactory)
- [Constants](#@Constants_0)
- [Function `initialize_aggregator_factory`](#0x1_aggregator_factory_initialize_aggregator_factory)
- [Function `create_aggregator_internal`](#0x1_aggregator_factory_create_aggregator_internal)
- [Function `create_aggregator`](#0x1_aggregator_factory_create_aggregator)

```move
module 0x1::aggregator_factory {
    use 0x1::aggregator;
    use 0x1::error;
    use 0x1::system_addresses;
    use 0x1::table;
}
```

<a id="0x1_aggregator_factory_AggregatorFactory"></a>

## Resource `AggregatorFactory`

Creates new aggregators. Used to control the numbers of aggregators in the
system and who can create them. At the moment, only Aptos Framework (0x1)
account can.

```move
module 0x1::aggregator_factory {
    struct AggregatorFactory has key
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_aggregator_factory_EAGGREGATOR_FACTORY_NOT_FOUND"></a>

Aggregator factory is not published yet.

```move
module 0x1::aggregator_factory {
    const EAGGREGATOR_FACTORY_NOT_FOUND: u64 = 1;
}
```

<a id="0x1_aggregator_factory_initialize_aggregator_factory"></a>

## Function `initialize_aggregator_factory`

Creates a new factory for aggregators. Can only be called during genesis.

```move
module 0x1::aggregator_factory {
    public(friend) fun initialize_aggregator_factory(aptos_framework: &signer)
}
```

<a id="0x1_aggregator_factory_create_aggregator_internal"></a>

## Function `create_aggregator_internal`

Creates a new aggregator instance which overflows on exceeding a `limit`.

```move
module 0x1::aggregator_factory {
    public(friend) fun create_aggregator_internal(limit: u128): aggregator::Aggregator
}
```

<a id="0x1_aggregator_factory_create_aggregator"></a>

## Function `create_aggregator`

This is currently a function closed for public. This can be updated in the future by on&#45;chain governance
to allow any signer to call.

```move
module 0x1::aggregator_factory {
    public fun create_aggregator(account: &signer, limit: u128): aggregator::Aggregator
}
```
