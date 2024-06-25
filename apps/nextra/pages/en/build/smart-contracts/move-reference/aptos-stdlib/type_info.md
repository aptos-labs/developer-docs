<a id="0x1_type_info"></a>

# Module `0x1::type_info`

- [Struct `TypeInfo`](#0x1_type_info_TypeInfo)
- [Constants](#@Constants_0)
- [Function `account_address`](#0x1_type_info_account_address)
- [Function `module_name`](#0x1_type_info_module_name)
- [Function `struct_name`](#0x1_type_info_struct_name)
- [Function `chain_id`](#0x1_type_info_chain_id)
- [Function `type_of`](#0x1_type_info_type_of)
- [Function `type_name`](#0x1_type_info_type_name)
- [Function `size_of_val`](#0x1_type_info_size_of_val)

```move
module 0x1::type_info {
    use 0x1::bcs;
    use 0x1::error;
    use 0x1::features;
    use 0x1::string;
}
```

<a id="0x1_type_info_TypeInfo"></a>

## Struct `TypeInfo`

```move
module 0x1::type_info {
    struct TypeInfo has copy, drop, store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_type_info_E_NATIVE_FUN_NOT_AVAILABLE"></a>

```move
module 0x1::type_info {
    const E_NATIVE_FUN_NOT_AVAILABLE: u64 = 1;
}
```

<a id="0x1_type_info_account_address"></a>

## Function `account_address`

```move
module 0x1::type_info {
    public fun account_address(type_info: &type_info::TypeInfo): address
}
```

<a id="0x1_type_info_module_name"></a>

## Function `module_name`

```move
module 0x1::type_info {
    public fun module_name(type_info: &type_info::TypeInfo): vector<u8>
}
```

<a id="0x1_type_info_struct_name"></a>

## Function `struct_name`

```move
module 0x1::type_info {
    public fun struct_name(type_info: &type_info::TypeInfo): vector<u8>
}
```

<a id="0x1_type_info_chain_id"></a>

## Function `chain_id`

Returns the current chain ID, mirroring what `aptos_framework::chain_id::get()` would return, except in `#[test]`
functions, where this will always return `4u8` as the chain ID, whereas `aptos_framework::chain_id::get()` will
return whichever ID was passed to `aptos_framework::chain_id::initialize_for_test()`.

```move
module 0x1::type_info {
    public fun chain_id(): u8
}
```

<a id="0x1_type_info_type_of"></a>

## Function `type_of`

Return the `TypeInfo` struct containing for the type `T`.

```move
module 0x1::type_info {
    public fun type_of<T>(): type_info::TypeInfo
}
```

<a id="0x1_type_info_type_name"></a>

## Function `type_name`

Return the human readable string for the type, including the address, module name, and any type arguments.
Example: 0x1::coin::CoinStore&lt;0x1::aptos_coin::AptosCoin&gt;
Or: 0x1::table::Table&lt;0x1::string::String, 0x1::string::String&gt;

```move
module 0x1::type_info {
    public fun type_name<T>(): string::String
}
```

<a id="0x1_type_info_size_of_val"></a>

## Function `size_of_val`

Return the BCS size, in bytes, of value at `val_ref`.

See the [BCS spec](https://github.com/diem/bcs)

See `test_size_of_val()` for an analysis of common types and
nesting patterns, as well as `test_size_of_val_vectors()` for an
analysis of vector size dynamism.

```move
module 0x1::type_info {
    public fun size_of_val<T>(val_ref: &T): u64
}
```
