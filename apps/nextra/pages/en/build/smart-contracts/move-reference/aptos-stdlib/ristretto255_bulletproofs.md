<a id="0x1_ristretto255_bulletproofs"></a>

# Module `0x1::ristretto255_bulletproofs`

This module implements a Bulletproof range proof verifier on the Ristretto255 curve.

A Bulletproof&#45;based zero&#45;knowledge range proof is a proof that a Pedersen commitment
$c &#61; v G &#43; r H$ commits to an $n$&#45;bit value $v$ (i.e., $v \in [0, 2^n)$). Currently, this module only supports
$n \in \&#123;8, 16, 32, 64\&#125;$ for the number of bits.

- [Struct `RangeProof`](#0x1_ristretto255_bulletproofs_RangeProof)
- [Constants](#@Constants_0)
- [Function `get_max_range_bits`](#0x1_ristretto255_bulletproofs_get_max_range_bits)
- [Function `range_proof_from_bytes`](#0x1_ristretto255_bulletproofs_range_proof_from_bytes)
- [Function `range_proof_to_bytes`](#0x1_ristretto255_bulletproofs_range_proof_to_bytes)
- [Function `verify_range_proof_pedersen`](#0x1_ristretto255_bulletproofs_verify_range_proof_pedersen)
- [Function `verify_range_proof`](#0x1_ristretto255_bulletproofs_verify_range_proof)

```move
module 0x1::ristretto255_bulletproofs {
    use 0x1::error;
    use 0x1::features;
    use 0x1::ristretto255;
    use 0x1::ristretto255_pedersen;
}
```

<a id="0x1_ristretto255_bulletproofs_RangeProof"></a>

## Struct `RangeProof`

Represents a zero&#45;knowledge range proof that a value committed inside a Pedersen commitment lies in
`[0, 2^{MAX_RANGE_BITS})`.

```move
module 0x1::ristretto255_bulletproofs {
    struct RangeProof has copy, drop, store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_ristretto255_bulletproofs_E_NATIVE_FUN_NOT_AVAILABLE"></a>

The native functions have not been rolled out yet.

```move
module 0x1::ristretto255_bulletproofs {
    const E_NATIVE_FUN_NOT_AVAILABLE: u64 = 4;
}
```

<a id="0x1_ristretto255_bulletproofs_E_DESERIALIZE_RANGE_PROOF"></a>

There was an error deserializing the range proof.

```move
module 0x1::ristretto255_bulletproofs {
    const E_DESERIALIZE_RANGE_PROOF: u64 = 1;
}
```

<a id="0x1_ristretto255_bulletproofs_E_RANGE_NOT_SUPPORTED"></a>

The range proof system only supports proving ranges of type $[0, 2^b)$ where $b \in \&#123;8, 16, 32, 64\&#125;$.

```move
module 0x1::ristretto255_bulletproofs {
    const E_RANGE_NOT_SUPPORTED: u64 = 3;
}
```

<a id="0x1_ristretto255_bulletproofs_E_VALUE_OUTSIDE_RANGE"></a>

The committed value given to the prover is too large.

```move
module 0x1::ristretto255_bulletproofs {
    const E_VALUE_OUTSIDE_RANGE: u64 = 2;
}
```

<a id="0x1_ristretto255_bulletproofs_MAX_RANGE_BITS"></a>

The maximum range supported by the Bulletproofs library is $[0, 2^&#123;64&#125;)$.

```move
module 0x1::ristretto255_bulletproofs {
    const MAX_RANGE_BITS: u64 = 64;
}
```

<a id="0x1_ristretto255_bulletproofs_get_max_range_bits"></a>

## Function `get_max_range_bits`

Returns the maximum # of bits that the range proof system can verify proofs for.

```move
module 0x1::ristretto255_bulletproofs {
    public fun get_max_range_bits(): u64
}
```

<a id="0x1_ristretto255_bulletproofs_range_proof_from_bytes"></a>

## Function `range_proof_from_bytes`

Deserializes a range proof from a sequence of bytes. The serialization format is the same as the format in
the zkcrypto&apos;s `bulletproofs` library (https://docs.rs/bulletproofs/4.0.0/bulletproofs/struct.RangeProof.html#method.from_bytes).

```move
module 0x1::ristretto255_bulletproofs {
    public fun range_proof_from_bytes(bytes: vector<u8>): ristretto255_bulletproofs::RangeProof
}
```

<a id="0x1_ristretto255_bulletproofs_range_proof_to_bytes"></a>

## Function `range_proof_to_bytes`

Returns the byte&#45;representation of a range proof.

```move
module 0x1::ristretto255_bulletproofs {
    public fun range_proof_to_bytes(proof: &ristretto255_bulletproofs::RangeProof): vector<u8>
}
```

<a id="0x1_ristretto255_bulletproofs_verify_range_proof_pedersen"></a>

## Function `verify_range_proof_pedersen`

Verifies a zero&#45;knowledge range proof that the value `v` committed in `com` (under the default Bulletproofs
commitment key; see `pedersen::new_commitment_for_bulletproof`) satisfies $v \in [0, 2^b)$. Only works
for $b \in \&#123;8, 16, 32, 64\&#125;$. Additionally, checks that the prover used `dst` as the domain&#45;separation
tag (DST).

WARNING: The DST check is VERY important for security as it prevents proofs computed for one application
(a.k.a., a _domain_) with `dst_1` from verifying in a different application with `dst_2 != dst_1`.

```move
module 0x1::ristretto255_bulletproofs {
    public fun verify_range_proof_pedersen(com: &ristretto255_pedersen::Commitment, proof: &ristretto255_bulletproofs::RangeProof, num_bits: u64, dst: vector<u8>): bool
}
```

<a id="0x1_ristretto255_bulletproofs_verify_range_proof"></a>

## Function `verify_range_proof`

Verifies a zero&#45;knowledge range proof that the value `v` committed in `com` (as v \* val_base &#43; r \* rand_base,
for some randomness `r`) satisfies `v` in `[0, 2^num_bits)`. Only works for `num_bits` in `{8, 16, 32, 64}`.

```move
module 0x1::ristretto255_bulletproofs {
    public fun verify_range_proof(com: &ristretto255::RistrettoPoint, val_base: &ristretto255::RistrettoPoint, rand_base: &ristretto255::RistrettoPoint, proof: &ristretto255_bulletproofs::RangeProof, num_bits: u64, dst: vector<u8>): bool
}
```
