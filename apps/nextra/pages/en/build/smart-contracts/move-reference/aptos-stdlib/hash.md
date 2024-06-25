<a id="0x1_aptos_hash"></a>

# Module `0x1::aptos_hash`

Cryptographic hashes:
&#45; Keccak&#45;256: see https://keccak.team/keccak.html

In addition, SHA2&#45;256 and SHA3&#45;256 are available in `std::hash`. Note that SHA3&#45;256 is a variant of Keccak: it is
NOT the same as Keccak&#45;256.

Non&#45;cryptograhic hashes:
&#45; SipHash: an add&#45;rotate&#45;xor (ARX) based family of pseudorandom functions created by Jean&#45;Philippe Aumasson and Daniel J. Bernstein in 2012

- [Constants](#@Constants_0)
- [Function `sip_hash`](#0x1_aptos_hash_sip_hash)
- [Function `sip_hash_from_value`](#0x1_aptos_hash_sip_hash_from_value)
- [Function `keccak256`](#0x1_aptos_hash_keccak256)
- [Function `sha2_512`](#0x1_aptos_hash_sha2_512)
- [Function `sha3_512`](#0x1_aptos_hash_sha3_512)
- [Function `ripemd160`](#0x1_aptos_hash_ripemd160)
- [Function `blake2b_256`](#0x1_aptos_hash_blake2b_256)

```move
module 0x1::aptos_hash {
    use 0x1::bcs;
    use 0x1::error;
    use 0x1::features;
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_aptos_hash_E_NATIVE_FUN_NOT_AVAILABLE"></a>

A newly&#45;added native function is not yet enabled.

```move
module 0x1::aptos_hash {
    const E_NATIVE_FUN_NOT_AVAILABLE: u64 = 1;
}
```

<a id="0x1_aptos_hash_sip_hash"></a>

## Function `sip_hash`

Returns the (non&#45;cryptographic) SipHash of `bytes`. See https://en.wikipedia.org/wiki/SipHash

```move
module 0x1::aptos_hash {
    public fun sip_hash(bytes: vector<u8>): u64
}
```

<a id="0x1_aptos_hash_sip_hash_from_value"></a>

## Function `sip_hash_from_value`

Returns the (non&#45;cryptographic) SipHash of the BCS serialization of `v`. See https://en.wikipedia.org/wiki/SipHash

```move
module 0x1::aptos_hash {
    public fun sip_hash_from_value<MoveValue>(v: &MoveValue): u64
}
```

<a id="0x1_aptos_hash_keccak256"></a>

## Function `keccak256`

Returns the Keccak&#45;256 hash of `bytes`.

```move
module 0x1::aptos_hash {
    public fun keccak256(bytes: vector<u8>): vector<u8>
}
```

<a id="0x1_aptos_hash_sha2_512"></a>

## Function `sha2_512`

Returns the SHA2&#45;512 hash of `bytes`.

```move
module 0x1::aptos_hash {
    public fun sha2_512(bytes: vector<u8>): vector<u8>
}
```

<a id="0x1_aptos_hash_sha3_512"></a>

## Function `sha3_512`

Returns the SHA3&#45;512 hash of `bytes`.

```move
module 0x1::aptos_hash {
    public fun sha3_512(bytes: vector<u8>): vector<u8>
}
```

<a id="0x1_aptos_hash_ripemd160"></a>

## Function `ripemd160`

Returns the RIPEMD&#45;160 hash of `bytes`.

WARNING: Only 80&#45;bit security is provided by this function. This means an adversary who can compute roughly 2^80
hashes will, with high probability, find a collision x_1 !&#61; x_2 such that RIPEMD&#45;160(x_1) &#61; RIPEMD&#45;160(x_2).

```move
module 0x1::aptos_hash {
    public fun ripemd160(bytes: vector<u8>): vector<u8>
}
```

<a id="0x1_aptos_hash_blake2b_256"></a>

## Function `blake2b_256`

Returns the BLAKE2B&#45;256 hash of `bytes`.

```move
module 0x1::aptos_hash {
    public fun blake2b_256(bytes: vector<u8>): vector<u8>
}
```
