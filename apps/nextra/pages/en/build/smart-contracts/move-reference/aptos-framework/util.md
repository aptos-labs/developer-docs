<a id="0x1_util"></a>

# Module `0x1::util`

Utility functions used by the framework modules.

- [Function `from_bytes`](#0x1_util_from_bytes)
- [Function `address_from_bytes`](#0x1_util_address_from_bytes)

```move
module 0x1::util {
}
```

<a id="0x1_util_from_bytes"></a>

## Function `from_bytes`

Native function to deserialize a type T.

Note that this function does not put any constraint on `T`. If code uses this function to
deserialized a linear value, its their responsibility that the data they deserialize is
owned.

```move
module 0x1::util {
    public(friend) fun from_bytes<T>(bytes: vector<u8>): T
}
```

<a id="0x1_util_address_from_bytes"></a>

## Function `address_from_bytes`

```move
module 0x1::util {
    public fun address_from_bytes(bytes: vector<u8>): address
}
```
