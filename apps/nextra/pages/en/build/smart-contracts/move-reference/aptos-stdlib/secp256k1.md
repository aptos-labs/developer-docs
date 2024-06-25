<a id="0x1_secp256k1"></a>

# Module `0x1::secp256k1`

This module implements ECDSA signatures based on the prime&#45;order secp256k1 ellptic curve (i.e., cofactor is 1).

- [Struct `ECDSARawPublicKey`](#0x1_secp256k1_ECDSARawPublicKey)
- [Struct `ECDSASignature`](#0x1_secp256k1_ECDSASignature)
- [Constants](#@Constants_0)
- [Function `ecdsa_signature_from_bytes`](#0x1_secp256k1_ecdsa_signature_from_bytes)
- [Function `ecdsa_raw_public_key_from_64_bytes`](#0x1_secp256k1_ecdsa_raw_public_key_from_64_bytes)
- [Function `ecdsa_raw_public_key_to_bytes`](#0x1_secp256k1_ecdsa_raw_public_key_to_bytes)
- [Function `ecdsa_signature_to_bytes`](#0x1_secp256k1_ecdsa_signature_to_bytes)
- [Function `ecdsa_recover`](#0x1_secp256k1_ecdsa_recover)

```move
module 0x1::secp256k1 {
    use 0x1::error;
    use 0x1::option;
}
```

<a id="0x1_secp256k1_ECDSARawPublicKey"></a>

## Struct `ECDSARawPublicKey`

A 64&#45;byte ECDSA public key.

```move
module 0x1::secp256k1 {
    struct ECDSARawPublicKey has copy, drop, store
}
```

<a id="0x1_secp256k1_ECDSASignature"></a>

## Struct `ECDSASignature`

A 64&#45;byte ECDSA signature.

```move
module 0x1::secp256k1 {
    struct ECDSASignature has copy, drop, store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_secp256k1_SIGNATURE_NUM_BYTES"></a>

The size of a secp256k1&#45;based ECDSA signature, in bytes.

```move
module 0x1::secp256k1 {
    const SIGNATURE_NUM_BYTES: u64 = 64;
}
```

<a id="0x1_secp256k1_E_DESERIALIZE"></a>

An error occurred while deserializing, for example due to wrong input size.

```move
module 0x1::secp256k1 {
    const E_DESERIALIZE: u64 = 1;
}
```

<a id="0x1_secp256k1_RAW_PUBLIC_KEY_NUM_BYTES"></a>

The size of a secp256k1&#45;based ECDSA public key, in bytes.

```move
module 0x1::secp256k1 {
    const RAW_PUBLIC_KEY_NUM_BYTES: u64 = 64;
}
```

<a id="0x1_secp256k1_ecdsa_signature_from_bytes"></a>

## Function `ecdsa_signature_from_bytes`

Constructs an ECDSASignature struct from the given 64 bytes.

```move
module 0x1::secp256k1 {
    public fun ecdsa_signature_from_bytes(bytes: vector<u8>): secp256k1::ECDSASignature
}
```

<a id="0x1_secp256k1_ecdsa_raw_public_key_from_64_bytes"></a>

## Function `ecdsa_raw_public_key_from_64_bytes`

Constructs an ECDSARawPublicKey struct, given a 64&#45;byte raw representation.

```move
module 0x1::secp256k1 {
    public fun ecdsa_raw_public_key_from_64_bytes(bytes: vector<u8>): secp256k1::ECDSARawPublicKey
}
```

<a id="0x1_secp256k1_ecdsa_raw_public_key_to_bytes"></a>

## Function `ecdsa_raw_public_key_to_bytes`

Serializes an ECDSARawPublicKey struct to 64&#45;bytes.

```move
module 0x1::secp256k1 {
    public fun ecdsa_raw_public_key_to_bytes(pk: &secp256k1::ECDSARawPublicKey): vector<u8>
}
```

<a id="0x1_secp256k1_ecdsa_signature_to_bytes"></a>

## Function `ecdsa_signature_to_bytes`

Serializes an ECDSASignature struct to 64&#45;bytes.

```move
module 0x1::secp256k1 {
    public fun ecdsa_signature_to_bytes(sig: &secp256k1::ECDSASignature): vector<u8>
}
```

<a id="0x1_secp256k1_ecdsa_recover"></a>

## Function `ecdsa_recover`

Recovers the signer&apos;s raw (64&#45;byte) public key from a secp256k1 ECDSA `signature` given the `recovery_id` and the signed
`message` (32 byte digest).

Note that an invalid signature, or a signature from a different message, will result in the recovery of an
incorrect public key. This recovery algorithm can only be used to check validity of a signature if the signer&apos;s
public key (or its hash) is known beforehand.

```move
module 0x1::secp256k1 {
    public fun ecdsa_recover(message: vector<u8>, recovery_id: u8, signature: &secp256k1::ECDSASignature): option::Option<secp256k1::ECDSARawPublicKey>
}
```
