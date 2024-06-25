<a id="0x1_ristretto255_pedersen"></a>

# Module `0x1::ristretto255_pedersen`

This module implements a Pedersen commitment API, over the Ristretto255 curve, that can be used with the
Bulletproofs module.

A Pedersen commitment to a value `v` under _commitment key_ `(g, h)` is `v * g + r * h`, for a random scalar `r`.

- [Struct `Commitment`](#0x1_ristretto255_pedersen_Commitment)
- [Constants](#@Constants_0)
- [Function `new_commitment_from_bytes`](#0x1_ristretto255_pedersen_new_commitment_from_bytes)
- [Function `commitment_to_bytes`](#0x1_ristretto255_pedersen_commitment_to_bytes)
- [Function `commitment_from_point`](#0x1_ristretto255_pedersen_commitment_from_point)
- [Function `commitment_from_compressed`](#0x1_ristretto255_pedersen_commitment_from_compressed)
- [Function `new_commitment`](#0x1_ristretto255_pedersen_new_commitment)
- [Function `new_commitment_with_basepoint`](#0x1_ristretto255_pedersen_new_commitment_with_basepoint)
- [Function `new_commitment_for_bulletproof`](#0x1_ristretto255_pedersen_new_commitment_for_bulletproof)
- [Function `commitment_add`](#0x1_ristretto255_pedersen_commitment_add)
- [Function `commitment_add_assign`](#0x1_ristretto255_pedersen_commitment_add_assign)
- [Function `commitment_sub`](#0x1_ristretto255_pedersen_commitment_sub)
- [Function `commitment_sub_assign`](#0x1_ristretto255_pedersen_commitment_sub_assign)
- [Function `commitment_clone`](#0x1_ristretto255_pedersen_commitment_clone)
- [Function `commitment_equals`](#0x1_ristretto255_pedersen_commitment_equals)
- [Function `commitment_as_point`](#0x1_ristretto255_pedersen_commitment_as_point)
- [Function `commitment_as_compressed_point`](#0x1_ristretto255_pedersen_commitment_as_compressed_point)
- [Function `commitment_into_point`](#0x1_ristretto255_pedersen_commitment_into_point)
- [Function `commitment_into_compressed_point`](#0x1_ristretto255_pedersen_commitment_into_compressed_point)
- [Function `randomness_base_for_bulletproof`](#0x1_ristretto255_pedersen_randomness_base_for_bulletproof)

```move
module 0x1::ristretto255_pedersen {
    use 0x1::option;
    use 0x1::ristretto255;
}
```

<a id="0x1_ristretto255_pedersen_Commitment"></a>

## Struct `Commitment`

A Pedersen commitment to some value with some randomness.

```move
module 0x1::ristretto255_pedersen {
    struct Commitment has drop
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_ristretto255_pedersen_BULLETPROOF_DEFAULT_PEDERSEN_RAND_BASE"></a>

The default Pedersen randomness base `h` used in our underlying Bulletproofs library.
This is obtained by hashing the compressed Ristretto255 basepoint using SHA3&#45;512 (not SHA2&#45;512).

```move
module 0x1::ristretto255_pedersen {
    const BULLETPROOF_DEFAULT_PEDERSEN_RAND_BASE: vector<u8> = [140, 146, 64, 180, 86, 169, 230, 220, 101, 195, 119, 161, 4, 141, 116, 95, 148, 160, 140, 219, 127, 68, 203, 205, 123, 70, 243, 64, 72, 135, 17, 52];
}
```

<a id="0x1_ristretto255_pedersen_new_commitment_from_bytes"></a>

## Function `new_commitment_from_bytes`

Creates a new public key from a serialized Ristretto255 point.

```move
module 0x1::ristretto255_pedersen {
    public fun new_commitment_from_bytes(bytes: vector<u8>): option::Option<ristretto255_pedersen::Commitment>
}
```

<a id="0x1_ristretto255_pedersen_commitment_to_bytes"></a>

## Function `commitment_to_bytes`

Returns a commitment as a serialized byte array

```move
module 0x1::ristretto255_pedersen {
    public fun commitment_to_bytes(comm: &ristretto255_pedersen::Commitment): vector<u8>
}
```

<a id="0x1_ristretto255_pedersen_commitment_from_point"></a>

## Function `commitment_from_point`

Moves a Ristretto point into a Pedersen commitment.

```move
module 0x1::ristretto255_pedersen {
    public fun commitment_from_point(point: ristretto255::RistrettoPoint): ristretto255_pedersen::Commitment
}
```

<a id="0x1_ristretto255_pedersen_commitment_from_compressed"></a>

## Function `commitment_from_compressed`

Deserializes a commitment from a compressed Ristretto point.

```move
module 0x1::ristretto255_pedersen {
    public fun commitment_from_compressed(point: &ristretto255::CompressedRistretto): ristretto255_pedersen::Commitment
}
```

<a id="0x1_ristretto255_pedersen_new_commitment"></a>

## Function `new_commitment`

Returns a commitment `v * val_base + r * rand_base` where `(val_base, rand_base)` is the commitment key.

```move
module 0x1::ristretto255_pedersen {
    public fun new_commitment(v: &ristretto255::Scalar, val_base: &ristretto255::RistrettoPoint, r: &ristretto255::Scalar, rand_base: &ristretto255::RistrettoPoint): ristretto255_pedersen::Commitment
}
```

<a id="0x1_ristretto255_pedersen_new_commitment_with_basepoint"></a>

## Function `new_commitment_with_basepoint`

Returns a commitment `v * G + r * rand_base` where `G` is the Ristretto255 basepoint.

```move
module 0x1::ristretto255_pedersen {
    public fun new_commitment_with_basepoint(v: &ristretto255::Scalar, r: &ristretto255::Scalar, rand_base: &ristretto255::RistrettoPoint): ristretto255_pedersen::Commitment
}
```

<a id="0x1_ristretto255_pedersen_new_commitment_for_bulletproof"></a>

## Function `new_commitment_for_bulletproof`

Returns a commitment `v * G + r * H` where `G` is the Ristretto255 basepoint and `H` is the default randomness
base used in the Bulletproofs library (i.e., `BULLETPROOF_DEFAULT_PEDERSEN_RAND_BASE`).

```move
module 0x1::ristretto255_pedersen {
    public fun new_commitment_for_bulletproof(v: &ristretto255::Scalar, r: &ristretto255::Scalar): ristretto255_pedersen::Commitment
}
```

<a id="0x1_ristretto255_pedersen_commitment_add"></a>

## Function `commitment_add`

Homomorphically combines two commitments `lhs` and `rhs` as `lhs + rhs`.
Useful for re&#45;randomizing the commitment or updating the committed value.

```move
module 0x1::ristretto255_pedersen {
    public fun commitment_add(lhs: &ristretto255_pedersen::Commitment, rhs: &ristretto255_pedersen::Commitment): ristretto255_pedersen::Commitment
}
```

<a id="0x1_ristretto255_pedersen_commitment_add_assign"></a>

## Function `commitment_add_assign`

Like `commitment_add` but assigns `lhs = lhs + rhs`.

```move
module 0x1::ristretto255_pedersen {
    public fun commitment_add_assign(lhs: &mut ristretto255_pedersen::Commitment, rhs: &ristretto255_pedersen::Commitment)
}
```

<a id="0x1_ristretto255_pedersen_commitment_sub"></a>

## Function `commitment_sub`

Homomorphically combines two commitments `lhs` and `rhs` as `lhs - rhs`.
Useful for re&#45;randomizing the commitment or updating the committed value.

```move
module 0x1::ristretto255_pedersen {
    public fun commitment_sub(lhs: &ristretto255_pedersen::Commitment, rhs: &ristretto255_pedersen::Commitment): ristretto255_pedersen::Commitment
}
```

<a id="0x1_ristretto255_pedersen_commitment_sub_assign"></a>

## Function `commitment_sub_assign`

Like `commitment_add` but assigns `lhs = lhs - rhs`.

```move
module 0x1::ristretto255_pedersen {
    public fun commitment_sub_assign(lhs: &mut ristretto255_pedersen::Commitment, rhs: &ristretto255_pedersen::Commitment)
}
```

<a id="0x1_ristretto255_pedersen_commitment_clone"></a>

## Function `commitment_clone`

Creates a copy of this commitment.

```move
module 0x1::ristretto255_pedersen {
    public fun commitment_clone(c: &ristretto255_pedersen::Commitment): ristretto255_pedersen::Commitment
}
```

<a id="0x1_ristretto255_pedersen_commitment_equals"></a>

## Function `commitment_equals`

Returns true if the two commitments are identical: i.e., same value and same randomness.

```move
module 0x1::ristretto255_pedersen {
    public fun commitment_equals(lhs: &ristretto255_pedersen::Commitment, rhs: &ristretto255_pedersen::Commitment): bool
}
```

<a id="0x1_ristretto255_pedersen_commitment_as_point"></a>

## Function `commitment_as_point`

Returns the underlying elliptic curve point representing the commitment as an in&#45;memory `RistrettoPoint`.

```move
module 0x1::ristretto255_pedersen {
    public fun commitment_as_point(c: &ristretto255_pedersen::Commitment): &ristretto255::RistrettoPoint
}
```

<a id="0x1_ristretto255_pedersen_commitment_as_compressed_point"></a>

## Function `commitment_as_compressed_point`

Returns the Pedersen commitment as a `CompressedRistretto` point.

```move
module 0x1::ristretto255_pedersen {
    public fun commitment_as_compressed_point(c: &ristretto255_pedersen::Commitment): ristretto255::CompressedRistretto
}
```

<a id="0x1_ristretto255_pedersen_commitment_into_point"></a>

## Function `commitment_into_point`

Moves the Commitment into a CompressedRistretto point.

```move
module 0x1::ristretto255_pedersen {
    public fun commitment_into_point(c: ristretto255_pedersen::Commitment): ristretto255::RistrettoPoint
}
```

<a id="0x1_ristretto255_pedersen_commitment_into_compressed_point"></a>

## Function `commitment_into_compressed_point`

Moves the Commitment into a `CompressedRistretto` point.

```move
module 0x1::ristretto255_pedersen {
    public fun commitment_into_compressed_point(c: ristretto255_pedersen::Commitment): ristretto255::CompressedRistretto
}
```

<a id="0x1_ristretto255_pedersen_randomness_base_for_bulletproof"></a>

## Function `randomness_base_for_bulletproof`

Returns the randomness base compatible with the Bulletproofs module.

Recal that a Bulletproof range proof attests, in zero&#45;knowledge, that a value `v` inside a Pedersen commitment
`v * g + r * h` is sufficiently &quot;small&quot; (e.g., is 32&#45;bits wide). Here, `h` is referred to as the
&quot;randomness base&quot; of the commitment scheme.

Bulletproof has a default choice for `g` and `h` and this function returns the default `h` as used in the
Bulletproofs Move module.

```move
module 0x1::ristretto255_pedersen {
    public fun randomness_base_for_bulletproof(): ristretto255::RistrettoPoint
}
```
