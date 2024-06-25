<a id="0x1_storage_gas"></a>

# Module `0x1::storage_gas`

Gas parameters for global storage.

<a id="@General_overview_sections_0"></a>

## General overview sections

[Definitions](#definitions)

\* [Utilization dimensions](#utilization-dimensions) \* [Utilization ratios](#utilization-ratios) \* [Gas curve lookup](#gas-curve-lookup) \* [Item&#45;wise operations](#item-wise-operations) \* [Byte&#45;wise operations](#byte-wise-operations)

[Function dependencies](#function-dependencies)

\* [Initialization](#initialization) \* [Reconfiguration](#reconfiguration) \* [Setting configurations](#setting-configurations)

<a id="@Definitions_1"></a>

## Definitions

<a id="@Utilization_dimensions_2"></a>

### Utilization dimensions

Global storage gas fluctuates each epoch based on total utilization,
which is defined across two dimensions:

1. The number of &quot;items&quot; in global storage.
2. The number of bytes in global storage.

&quot;Items&quot; include:

1. Resources having the `key` attribute, which have been moved into
   global storage via a `move_to()` operation.
2. Table entries.

<a id="@Utilization_ratios_3"></a>

### Utilization ratios

`initialize()` sets an arbitrary &quot;target&quot; utilization for both
item&#45;wise and byte&#45;wise storage, then each epoch, gas parameters are
reconfigured based on the &quot;utilization ratio&quot; for each of the two
utilization dimensions. The utilization ratio for a given dimension,
either item&#45;wise or byte&#45;wise, is taken as the quotient of actual
utilization and target utilization. For example, given a 500 GB
target and 250 GB actual utilization, the byte&#45;wise utilization
ratio is 50%.

See `base_8192_exponential_curve()` for mathematical definitions.

<a id="@Gas_curve_lookup_4"></a>

### Gas curve lookup

The utilization ratio in a given epoch is used as a lookup value in
a Eulerian approximation to an exponential curve, known as a
`GasCurve`, which is defined in `base_8192_exponential_curve()`,
based on a minimum gas charge and a maximum gas charge.

The minimum gas charge and maximum gas charge at the endpoints of
the curve are set in `initialize()`, and correspond to the following
operations defined in `StorageGas`:

1. Per&#45;item read
2. Per&#45;item create
3. Per&#45;item write
4. Per&#45;byte read
5. Per&#45;byte create
6. Per&#45;byte write

For example, if the byte&#45;wise utilization ratio is 50%, then
per&#45;byte reads will charge the minimum per&#45;byte gas cost, plus
1.09% of the difference between the maximum and the minimum cost.
See `base_8192_exponential_curve()` for a supporting calculation.

<a id="@Item&#45;wise_operations_5"></a>

### Item&#45;wise operations

1. Per&#45;item read gas is assessed whenever an item is read from
   global storage via `borrow_global<T>()` or via a table entry read
   operation.
2. Per&#45;item create gas is assessed whenever an item is created in
   global storage via `move_to<T>()` or via a table entry creation
   operation.
3. Per&#45;item write gas is assessed whenever an item is overwritten in
   global storage via `borrow_global_mut<T>` or via a table entry
   mutation operation.

<a id="@Byte&#45;wise_operations_6"></a>

### Byte&#45;wise operations

Byte&#45;wise operations are assessed in a manner similar to per&#45;item
operations, but account for the number of bytes affected by the
given operation. Notably, this number denotes the total number of
bytes in an \*entire item\*.

For example, if an operation mutates a `u8` field in a resource that
has 5 other `u128` fields, the per&#45;byte gas write cost will account
for $(5 &#42; 128) / 8 &#43; 1 &#61; 81$ bytes. Vectors are similarly treated
as fields.

<a id="@Function_dependencies_7"></a>

## Function dependencies

The below dependency chart uses `mermaid.js` syntax, which can be
automatically rendered into a diagram (depending on the browser)
when viewing the documentation file generated from source code. If
a browser renders the diagrams with coloring that makes it difficult
to read, try a different browser.

<a id="@Initialization_8"></a>

### Initialization

```mermaid

flowchart LR

initialize &#45;&#45;&gt; base_8192_exponential_curve
base_8192_exponential_curve &#45;&#45;&gt; new_gas_curve
base_8192_exponential_curve &#45;&#45;&gt; new_point
new_gas_curve &#45;&#45;&gt; validate_points

```

<a id="@Reconfiguration_9"></a>

### Reconfiguration

```mermaid

flowchart LR

calculate_gas &#45;&#45;&gt; Interpolate %% capitalized
calculate_read_gas &#45;&#45;&gt; calculate_gas
calculate_create_gas &#45;&#45;&gt; calculate_gas
calculate_write_gas &#45;&#45;&gt; calculate_gas
on_reconfig &#45;&#45;&gt; calculate_read_gas
on_reconfig &#45;&#45;&gt; calculate_create_gas
on_reconfig &#45;&#45;&gt; calculate_write_gas
reconfiguration::reconfigure &#45;&#45;&gt; on_reconfig

```

Here, the function `interpolate()` is spelled `Interpolate` because
`interpolate` is a reserved word in `mermaid.js`.

<a id="@Setting_configurations_10"></a>

### Setting configurations

```mermaid

flowchart LR

gas_schedule::set_storage_gas_config &#45;&#45;&gt; set_config

```

<a id="@Complete_docgen_index_11"></a>

## Complete docgen index

The below index is automatically generated from source code:

- [General overview sections](#@General_overview_sections_0)
- [Definitions](#@Definitions_1)
  - [Utilization dimensions](#@Utilization_dimensions_2)
  - [Utilization ratios](#@Utilization_ratios_3)
  - [Gas curve lookup](#@Gas_curve_lookup_4)
  - [Item&#45;wise operations](#@Item-wise_operations_5)
  - [Byte&#45;wise operations](#@Byte-wise_operations_6)
- [Function dependencies](#@Function_dependencies_7)
  - [Initialization](#@Initialization_8)
  - [Reconfiguration](#@Reconfiguration_9)
  - [Setting configurations](#@Setting_configurations_10)
- [Complete docgen index](#@Complete_docgen_index_11)
- [Resource `StorageGas`](#0x1_storage_gas_StorageGas)
- [Struct `Point`](#0x1_storage_gas_Point)
- [Struct `UsageGasConfig`](#0x1_storage_gas_UsageGasConfig)
- [Struct `GasCurve`](#0x1_storage_gas_GasCurve)
- [Resource `StorageGasConfig`](#0x1_storage_gas_StorageGasConfig)
- [Constants](#@Constants_12)
- [Function `base_8192_exponential_curve`](#0x1_storage_gas_base_8192_exponential_curve)
  - [Function definition](#@Function_definition_13)
  - [Example](#@Example_14)
  - [Utilization multipliers](#@Utilization_multipliers_15)
- [Function `new_point`](#0x1_storage_gas_new_point)
- [Function `new_gas_curve`](#0x1_storage_gas_new_gas_curve)
- [Function `new_usage_gas_config`](#0x1_storage_gas_new_usage_gas_config)
- [Function `new_storage_gas_config`](#0x1_storage_gas_new_storage_gas_config)
- [Function `set_config`](#0x1_storage_gas_set_config)
- [Function `initialize`](#0x1_storage_gas_initialize)
- [Function `on_reconfig`](#0x1_storage_gas_on_reconfig)

```move
module 0x1::storage_gas {
    use 0x1::error;
    use 0x1::state_storage;
    use 0x1::system_addresses;
}
```

<a id="0x1_storage_gas_StorageGas"></a>

## Resource `StorageGas`

Storage parameters, reconfigured each epoch.

Parameters are updated during reconfiguration via
`on_reconfig()`, based on storage utilization at the beginning
of the epoch in which the reconfiguration transaction is
executed. The gas schedule derived from these parameters will
then be used to calculate gas for the entirety of the
following epoch, such that the data is one epoch older than
ideal. Notably, however, per this approach, the virtual machine
does not need to reload gas parameters after the
first transaction of an epoch.

```move
module 0x1::storage_gas {
    struct StorageGas has key
}
```

<a id="0x1_storage_gas_Point"></a>

## Struct `Point`

A point in a Eulerian curve approximation, with each coordinate
given in basis points:

&#124; Field value &#124; Percentage &#124;
&#124;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#124;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#124;
&#124; `1` &#124; 00.01 % &#124;
&#124; `10` &#124; 00.10 % &#124;
&#124; `100` &#124; 01.00 % &#124;
&#124; `1000` &#124; 10.00 % &#124;

```move
module 0x1::storage_gas {
    struct Point has copy, drop, store
}
```

<a id="0x1_storage_gas_UsageGasConfig"></a>

## Struct `UsageGasConfig`

A gas configuration for either per&#45;item or per&#45;byte costs.

Contains a target usage amount, as well as a Eulerian
approximation of an exponential curve for reads, creations, and
overwrites. See `StorageGasConfig`.

```move
module 0x1::storage_gas {
    struct UsageGasConfig has copy, drop, store
}
```

<a id="0x1_storage_gas_GasCurve"></a>

## Struct `GasCurve`

Eulerian approximation of an exponential curve.

Assumes the following endpoints:

\* $(x_0, y_0) &#61; (0, 0)$ \* $(x_f, y_f) &#61; (10000, 10000)$

Intermediate points must satisfy:

1. $x_i &gt; x_&#123;i &#45; 1&#125;$ ( $x$ is strictly increasing).
2. $0 \leq x_i \leq 10000$ ( $x$ is between 0 and 10000).
3. $y_i \geq y_&#123;i &#45; 1&#125;$ ( $y$ is non&#45;decreasing).
4. $0 \leq y_i \leq 10000$ ( $y$ is between 0 and 10000).

Lookup between two successive points is calculated via linear
interpolation, e.g., as if there were a straight line between
them.

See `base_8192_exponential_curve()`.

```move
module 0x1::storage_gas {
    struct GasCurve has copy, drop, store
}
```

<a id="0x1_storage_gas_StorageGasConfig"></a>

## Resource `StorageGasConfig`

Gas configurations for per&#45;item and per&#45;byte prices.

```move
module 0x1::storage_gas {
    struct StorageGasConfig has copy, drop, key
}
```

<a id="@Constants_12"></a>

## Constants

<a id="0x1_storage_gas_MAX_U64"></a>

```move
module 0x1::storage_gas {
    const MAX_U64: u64 = 18446744073709551615;
}
```

<a id="0x1_storage_gas_BASIS_POINT_DENOMINATION"></a>

```move
module 0x1::storage_gas {
    const BASIS_POINT_DENOMINATION: u64 = 10000;
}
```

<a id="0x1_storage_gas_EINVALID_GAS_RANGE"></a>

```move
module 0x1::storage_gas {
    const EINVALID_GAS_RANGE: u64 = 2;
}
```

<a id="0x1_storage_gas_EINVALID_MONOTONICALLY_NON_DECREASING_CURVE"></a>

```move
module 0x1::storage_gas {
    const EINVALID_MONOTONICALLY_NON_DECREASING_CURVE: u64 = 5;
}
```

<a id="0x1_storage_gas_EINVALID_POINT_RANGE"></a>

```move
module 0x1::storage_gas {
    const EINVALID_POINT_RANGE: u64 = 6;
}
```

<a id="0x1_storage_gas_ESTORAGE_GAS"></a>

```move
module 0x1::storage_gas {
    const ESTORAGE_GAS: u64 = 1;
}
```

<a id="0x1_storage_gas_ESTORAGE_GAS_CONFIG"></a>

```move
module 0x1::storage_gas {
    const ESTORAGE_GAS_CONFIG: u64 = 0;
}
```

<a id="0x1_storage_gas_ETARGET_USAGE_TOO_BIG"></a>

```move
module 0x1::storage_gas {
    const ETARGET_USAGE_TOO_BIG: u64 = 4;
}
```

<a id="0x1_storage_gas_EZERO_TARGET_USAGE"></a>

```move
module 0x1::storage_gas {
    const EZERO_TARGET_USAGE: u64 = 3;
}
```

<a id="0x1_storage_gas_base_8192_exponential_curve"></a>

## Function `base_8192_exponential_curve`

Default exponential curve having base 8192.

<a id="@Function_definition_13"></a>

### Function definition

Gas price as a function of utilization ratio is defined as:

$$g(u_r) &#61; g_&#123;min&#125; &#43; \frac&#123;(b^&#123;u_r&#125; &#45; 1)&#125;&#123;b &#45; 1&#125; \Delta_g$$

$$g(u_r) &#61; g_&#123;min&#125; &#43; u_m \Delta_g$$

&#124; Variable &#124; Description &#124;
&#124;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#124;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#124;
&#124; $g_&#123;min&#125;$ &#124; `min_gas` &#124;
&#124; $g_&#123;max&#125;$ &#124; `max_gas` &#124;
&#124; $\Delta_&#123;g&#125; &#61; g_&#123;max&#125; &#45; g_&#123;min&#125;$ &#124; Gas delta &#124;
&#124; $u$ &#124; Utilization &#124;
&#124; $u_t$ &#124; Target utilization &#124;
&#124; $u_r &#61; u / u_t$ &#124; Utilization ratio &#124;
&#124; $u_m &#61; \frac&#123;(b^&#123;u_r&#125; &#45; 1)&#125;&#123;b &#45; 1&#125;$ &#124; Utilization multiplier &#124;
&#124; $b &#61; 8192$ &#124; Exponent base &#124;

<a id="@Example_14"></a>

### Example

Hence for a utilization ratio of 50% ( $u_r &#61; 0.5$ ):

$$g(0.5) &#61; g_&#123;min&#125; &#43; \frac&#123;8192^&#123;0.5&#125; &#45; 1&#125;&#123;8192 &#45; 1&#125; \Delta_g$$

$$g(0.5) \approx g_&#123;min&#125; &#43; 0.0109 \Delta_g$$

Which means that the price above `min_gas` is approximately
1.09% of the difference between `max_gas` and `min_gas`.

<a id="@Utilization_multipliers_15"></a>

### Utilization multipliers

&#124; $u_r$ &#124; $u_m$ (approximate) &#124;
&#124;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#124;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#124;
&#124; 10% &#124; 0.02% &#124;
&#124; 20% &#124; 0.06% &#124;
&#124; 30% &#124; 0.17% &#124;
&#124; 40% &#124; 0.44% &#124;
&#124; 50% &#124; 1.09% &#124;
&#124; 60% &#124; 2.71% &#124;
&#124; 70% &#124; 6.69% &#124;
&#124; 80% &#124; 16.48% &#124;
&#124; 90% &#124; 40.61% &#124;
&#124; 95% &#124; 63.72% &#124;
&#124; 99% &#124; 91.38% &#124;

```move
module 0x1::storage_gas {
    public fun base_8192_exponential_curve(min_gas: u64, max_gas: u64): storage_gas::GasCurve
}
```

<a id="0x1_storage_gas_new_point"></a>

## Function `new_point`

```move
module 0x1::storage_gas {
    public fun new_point(x: u64, y: u64): storage_gas::Point
}
```

<a id="0x1_storage_gas_new_gas_curve"></a>

## Function `new_gas_curve`

```move
module 0x1::storage_gas {
    public fun new_gas_curve(min_gas: u64, max_gas: u64, points: vector<storage_gas::Point>): storage_gas::GasCurve
}
```

<a id="0x1_storage_gas_new_usage_gas_config"></a>

## Function `new_usage_gas_config`

```move
module 0x1::storage_gas {
    public fun new_usage_gas_config(target_usage: u64, read_curve: storage_gas::GasCurve, create_curve: storage_gas::GasCurve, write_curve: storage_gas::GasCurve): storage_gas::UsageGasConfig
}
```

<a id="0x1_storage_gas_new_storage_gas_config"></a>

## Function `new_storage_gas_config`

```move
module 0x1::storage_gas {
    public fun new_storage_gas_config(item_config: storage_gas::UsageGasConfig, byte_config: storage_gas::UsageGasConfig): storage_gas::StorageGasConfig
}
```

<a id="0x1_storage_gas_set_config"></a>

## Function `set_config`

```move
module 0x1::storage_gas {
    public(friend) fun set_config(aptos_framework: &signer, config: storage_gas::StorageGasConfig)
}
```

<a id="0x1_storage_gas_initialize"></a>

## Function `initialize`

Initialize per&#45;item and per&#45;byte gas prices.

Target utilization is set to 2 billion items and 1 TB.

`GasCurve` endpoints are initialized as follows:

&#124; Data style &#124; Operation &#124; Minimum gas &#124; Maximum gas &#124;
&#124;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#124;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#124;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#124;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#124;
&#124; Per item &#124; Read &#124; 300K &#124; 300K \* 100 &#124;
&#124; Per item &#124; Create &#124; 300k &#124; 300k \* 100 &#124;
&#124; Per item &#124; Write &#124; 300K &#124; 300K \* 100 &#124;
&#124; Per byte &#124; Read &#124; 300 &#124; 300 \* 100 &#124;
&#124; Per byte &#124; Create &#124; 5K &#124; 5K \* 100 &#124;
&#124; Per byte &#124; Write &#124; 5K &#124; 5K \* 100 &#124;

`StorageGas` values are additionally initialized, but per
`on_reconfig()`, they will be reconfigured for each subsequent
epoch after initialization.

See `base_8192_exponential_curve()` fore more information on
target utilization.

```move
module 0x1::storage_gas {
    public fun initialize(aptos_framework: &signer)
}
```

<a id="0x1_storage_gas_on_reconfig"></a>

## Function `on_reconfig`

```move
module 0x1::storage_gas {
    public(friend) fun on_reconfig()
}
```
