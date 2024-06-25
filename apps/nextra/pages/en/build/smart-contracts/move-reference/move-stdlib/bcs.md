<a id="0x1_bcs"></a>

# Module `0x1::bcs`

Utility for converting a Move value to its binary representation in BCS (Binary Canonical
Serialization). BCS is the binary encoding for Move resources and other non&#45;module values
published on&#45;chain. See https://github.com/aptos&#45;labs/bcs#binary&#45;canonical&#45;serialization&#45;bcs for more
details on BCS.

- [Function `to_bytes`](#0x1_bcs_to_bytes)

```move
module 0x1::bcs {
}
```

<a id="0x1_bcs_to_bytes"></a>

## Function `to_bytes`

Return the binary representation of `v` in BCS (Binary Canonical Serialization) format

```move
module 0x1::bcs {
    public fun to_bytes<MoveValue>(v: &MoveValue): vector<u8>
}
```
