<a id="0x1_hash"></a>

# Module `0x1::hash`

Module which defines SHA hashes for byte vectors.

The functions in this module are natively declared both in the Move runtime
as in the Move prover&apos;s prelude.

- [Function `sha2_256`](#0x1_hash_sha2_256)
- [Function `sha3_256`](#0x1_hash_sha3_256)

```move
module 0x1::hash {
}
```

<a id="0x1_hash_sha2_256"></a>

## Function `sha2_256`

```move
module 0x1::hash {
    public fun sha2_256(data: vector<u8>): vector<u8>
}
```

<a id="0x1_hash_sha3_256"></a>

## Function `sha3_256`

```move
module 0x1::hash {
    public fun sha3_256(data: vector<u8>): vector<u8>
}
```
