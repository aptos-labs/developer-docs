<a id="0x1_ristretto255"></a>

# Module `0x1::ristretto255`

This module contains functions for Ristretto255 curve arithmetic, assuming addition as the group operation.

The order of the Ristretto255 elliptic curve group is $\ell &#61; 2^252 &#43; 27742317777372353535851937790883648493$, same
as the order of the prime&#45;order subgroup of Curve25519.

This module provides two structs for encoding Ristretto elliptic curves to the developer:

&#45; First, a 32&#45;byte&#45;sized CompressedRistretto struct, which is used to persist points in storage.

&#45; Second, a larger, in&#45;memory, RistrettoPoint struct, which is decompressable from a CompressedRistretto struct. This
larger struct can be used for fast arithmetic operations (additions, multiplications, etc.). The results can be saved
back into storage by compressing RistrettoPoint structs back to CompressedRistretto structs.

This module also provides a Scalar struct for persisting scalars in storage and doing fast arithmetic on them.

One invariant maintained by this module is that all CompressedRistretto structs store a canonically&#45;encoded point,
which can always be decompressed into a valid point on the curve as a RistrettoPoint struct. Unfortunately, due to
limitations in our underlying curve25519&#45;dalek elliptic curve library, this decompression will unnecessarily verify
the validity of the point and thus slightly decrease performance.

Similarly, all Scalar structs store a canonically&#45;encoded scalar, which can always be safely operated on using
arithmetic operations.

In the future, we might support additional features:

\* For scalars:
&#45; batch_invert()

\* For points:
&#45; double()
&#43; The challenge is that curve25519&#45;dalek does NOT export double for Ristretto points (nor for Edwards)

&#45; double_and_compress_batch()

&#45; fixed&#45;base, variable&#45;time via optional_mixed_multiscalar_mul() in VartimePrecomputedMultiscalarMul
&#43; This would require a storage&#45;friendly RistrettoBasepointTable and an in&#45;memory variant of it too
&#43; Similar to the CompressedRistretto and RistrettoPoint structs in this module
&#43; The challenge is that curve25519&#45;dalek&apos;s RistrettoBasepointTable is not serializable

- [Struct `Scalar`](#0x1_ristretto255_Scalar)
- [Struct `CompressedRistretto`](#0x1_ristretto255_CompressedRistretto)
- [Struct `RistrettoPoint`](#0x1_ristretto255_RistrettoPoint)
- [Constants](#@Constants_0)
- [Function `point_identity_compressed`](#0x1_ristretto255_point_identity_compressed)
- [Function `point_identity`](#0x1_ristretto255_point_identity)
- [Function `basepoint_compressed`](#0x1_ristretto255_basepoint_compressed)
- [Function `hash_to_point_base`](#0x1_ristretto255_hash_to_point_base)
- [Function `basepoint`](#0x1_ristretto255_basepoint)
- [Function `basepoint_mul`](#0x1_ristretto255_basepoint_mul)
- [Function `new_compressed_point_from_bytes`](#0x1_ristretto255_new_compressed_point_from_bytes)
- [Function `new_point_from_bytes`](#0x1_ristretto255_new_point_from_bytes)
- [Function `compressed_point_to_bytes`](#0x1_ristretto255_compressed_point_to_bytes)
- [Function `new_point_from_sha512`](#0x1_ristretto255_new_point_from_sha512)
- [Function `new_point_from_sha2_512`](#0x1_ristretto255_new_point_from_sha2_512)
- [Function `new_point_from_64_uniform_bytes`](#0x1_ristretto255_new_point_from_64_uniform_bytes)
- [Function `point_decompress`](#0x1_ristretto255_point_decompress)
- [Function `point_clone`](#0x1_ristretto255_point_clone)
- [Function `point_compress`](#0x1_ristretto255_point_compress)
- [Function `point_to_bytes`](#0x1_ristretto255_point_to_bytes)
- [Function `point_mul`](#0x1_ristretto255_point_mul)
- [Function `point_mul_assign`](#0x1_ristretto255_point_mul_assign)
- [Function `basepoint_double_mul`](#0x1_ristretto255_basepoint_double_mul)
- [Function `point_add`](#0x1_ristretto255_point_add)
- [Function `point_add_assign`](#0x1_ristretto255_point_add_assign)
- [Function `point_sub`](#0x1_ristretto255_point_sub)
- [Function `point_sub_assign`](#0x1_ristretto255_point_sub_assign)
- [Function `point_neg`](#0x1_ristretto255_point_neg)
- [Function `point_neg_assign`](#0x1_ristretto255_point_neg_assign)
- [Function `point_equals`](#0x1_ristretto255_point_equals)
- [Function `double_scalar_mul`](#0x1_ristretto255_double_scalar_mul)
- [Function `multi_scalar_mul`](#0x1_ristretto255_multi_scalar_mul)
- [Function `new_scalar_from_bytes`](#0x1_ristretto255_new_scalar_from_bytes)
- [Function `new_scalar_from_sha512`](#0x1_ristretto255_new_scalar_from_sha512)
- [Function `new_scalar_from_sha2_512`](#0x1_ristretto255_new_scalar_from_sha2_512)
- [Function `new_scalar_from_u8`](#0x1_ristretto255_new_scalar_from_u8)
- [Function `new_scalar_from_u32`](#0x1_ristretto255_new_scalar_from_u32)
- [Function `new_scalar_from_u64`](#0x1_ristretto255_new_scalar_from_u64)
- [Function `new_scalar_from_u128`](#0x1_ristretto255_new_scalar_from_u128)
- [Function `new_scalar_reduced_from_32_bytes`](#0x1_ristretto255_new_scalar_reduced_from_32_bytes)
- [Function `new_scalar_uniform_from_64_bytes`](#0x1_ristretto255_new_scalar_uniform_from_64_bytes)
- [Function `scalar_zero`](#0x1_ristretto255_scalar_zero)
- [Function `scalar_is_zero`](#0x1_ristretto255_scalar_is_zero)
- [Function `scalar_one`](#0x1_ristretto255_scalar_one)
- [Function `scalar_is_one`](#0x1_ristretto255_scalar_is_one)
- [Function `scalar_equals`](#0x1_ristretto255_scalar_equals)
- [Function `scalar_invert`](#0x1_ristretto255_scalar_invert)
- [Function `scalar_mul`](#0x1_ristretto255_scalar_mul)
- [Function `scalar_mul_assign`](#0x1_ristretto255_scalar_mul_assign)
- [Function `scalar_add`](#0x1_ristretto255_scalar_add)
- [Function `scalar_add_assign`](#0x1_ristretto255_scalar_add_assign)
- [Function `scalar_sub`](#0x1_ristretto255_scalar_sub)
- [Function `scalar_sub_assign`](#0x1_ristretto255_scalar_sub_assign)
- [Function `scalar_neg`](#0x1_ristretto255_scalar_neg)
- [Function `scalar_neg_assign`](#0x1_ristretto255_scalar_neg_assign)
- [Function `scalar_to_bytes`](#0x1_ristretto255_scalar_to_bytes)

```move
module 0x1::ristretto255 {
    use 0x1::error;
    use 0x1::features;
    use 0x1::option;
    use 0x1::vector;
}
```

<a id="0x1_ristretto255_Scalar"></a>

## Struct `Scalar`

This struct represents a scalar as a little&#45;endian byte encoding of an integer in $\mathbb&#123;Z&#125;_\ell$, which is
stored in `data`. Here, \ell denotes the order of the scalar field (and the underlying elliptic curve group).

```move
module 0x1::ristretto255 {
    struct Scalar has copy, drop, store
}
```

<a id="0x1_ristretto255_CompressedRistretto"></a>

## Struct `CompressedRistretto`

This struct represents a serialized point on the Ristretto255 curve, in 32 bytes.
This struct can be decompressed from storage into an in&#45;memory RistrettoPoint, on which fast curve arithmetic
can be performed.

```move
module 0x1::ristretto255 {
    struct CompressedRistretto has copy, drop, store
}
```

<a id="0x1_ristretto255_RistrettoPoint"></a>

## Struct `RistrettoPoint`

This struct represents an in&#45;memory Ristretto255 point and supports fast curve arithmetic.

An important invariant: There will never be two RistrettoPoint&apos;s constructed with the same handle. One can have
immutable references to the same RistrettoPoint, of course.

```move
module 0x1::ristretto255 {
    struct RistrettoPoint has drop
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_ristretto255_E_NATIVE_FUN_NOT_AVAILABLE"></a>

The native function has not been deployed yet.

```move
module 0x1::ristretto255 {
    const E_NATIVE_FUN_NOT_AVAILABLE: u64 = 5;
}
```

<a id="0x1_ristretto255_BASE_POINT"></a>

The basepoint (generator) of the Ristretto255 group

```move
module 0x1::ristretto255 {
    const BASE_POINT: vector<u8> = [226, 242, 174, 10, 106, 188, 78, 113, 168, 132, 169, 97, 197, 0, 81, 95, 88, 227, 11, 106, 165, 130, 221, 141, 182, 166, 89, 69, 224, 141, 45, 118];
}
```

<a id="0x1_ristretto255_E_DIFFERENT_NUM_POINTS_AND_SCALARS"></a>

The number of scalars does not match the number of points.

```move
module 0x1::ristretto255 {
    const E_DIFFERENT_NUM_POINTS_AND_SCALARS: u64 = 1;
}
```

<a id="0x1_ristretto255_E_TOO_MANY_POINTS_CREATED"></a>

Too many points have been created in the current transaction execution.

```move
module 0x1::ristretto255 {
    const E_TOO_MANY_POINTS_CREATED: u64 = 4;
}
```

<a id="0x1_ristretto255_E_ZERO_POINTS"></a>

Expected more than zero points as input.

```move
module 0x1::ristretto255 {
    const E_ZERO_POINTS: u64 = 2;
}
```

<a id="0x1_ristretto255_E_ZERO_SCALARS"></a>

Expected more than zero scalars as input.

```move
module 0x1::ristretto255 {
    const E_ZERO_SCALARS: u64 = 3;
}
```

<a id="0x1_ristretto255_HASH_BASE_POINT"></a>

The hash of the basepoint of the Ristretto255 group using SHA3_512

```move
module 0x1::ristretto255 {
    const HASH_BASE_POINT: vector<u8> = [140, 146, 64, 180, 86, 169, 230, 220, 101, 195, 119, 161, 4, 141, 116, 95, 148, 160, 140, 219, 127, 68, 203, 205, 123, 70, 243, 64, 72, 135, 17, 52];
}
```

<a id="0x1_ristretto255_L_MINUS_ONE"></a>

`ORDER_ELL` &#45; 1: i.e., the &quot;largest&quot;, reduced scalar in the field

```move
module 0x1::ristretto255 {
    const L_MINUS_ONE: vector<u8> = [236, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16];
}
```

<a id="0x1_ristretto255_MAX_POINT_NUM_BYTES"></a>

The maximum size in bytes of a canonically&#45;encoded Ristretto255 point is 32 bytes.

```move
module 0x1::ristretto255 {
    const MAX_POINT_NUM_BYTES: u64 = 32;
}
```

<a id="0x1_ristretto255_MAX_SCALAR_NUM_BITS"></a>

The maximum size in bits of a canonically&#45;encoded Scalar is 256 bits.

```move
module 0x1::ristretto255 {
    const MAX_SCALAR_NUM_BITS: u64 = 256;
}
```

<a id="0x1_ristretto255_MAX_SCALAR_NUM_BYTES"></a>

The maximum size in bytes of a canonically&#45;encoded Scalar is 32 bytes.

```move
module 0x1::ristretto255 {
    const MAX_SCALAR_NUM_BYTES: u64 = 32;
}
```

<a id="0x1_ristretto255_ORDER_ELL"></a>

The order of the Ristretto255 group and its scalar field, in little&#45;endian.

```move
module 0x1::ristretto255 {
    const ORDER_ELL: vector<u8> = [237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16];
}
```

<a id="0x1_ristretto255_point_identity_compressed"></a>

## Function `point_identity_compressed`

Returns the identity point as a CompressedRistretto.

```move
module 0x1::ristretto255 {
    public fun point_identity_compressed(): ristretto255::CompressedRistretto
}
```

<a id="0x1_ristretto255_point_identity"></a>

## Function `point_identity`

Returns the identity point as a CompressedRistretto.

```move
module 0x1::ristretto255 {
    public fun point_identity(): ristretto255::RistrettoPoint
}
```

<a id="0x1_ristretto255_basepoint_compressed"></a>

## Function `basepoint_compressed`

Returns the basepoint (generator) of the Ristretto255 group as a compressed point

```move
module 0x1::ristretto255 {
    public fun basepoint_compressed(): ristretto255::CompressedRistretto
}
```

<a id="0x1_ristretto255_hash_to_point_base"></a>

## Function `hash_to_point_base`

Returns the hash&#45;to&#45;point result of serializing the basepoint of the Ristretto255 group.
For use as the random value basepoint in Pedersen commitments

```move
module 0x1::ristretto255 {
    public fun hash_to_point_base(): ristretto255::RistrettoPoint
}
```

<a id="0x1_ristretto255_basepoint"></a>

## Function `basepoint`

Returns the basepoint (generator) of the Ristretto255 group

```move
module 0x1::ristretto255 {
    public fun basepoint(): ristretto255::RistrettoPoint
}
```

<a id="0x1_ristretto255_basepoint_mul"></a>

## Function `basepoint_mul`

Multiplies the basepoint (generator) of the Ristretto255 group by a scalar and returns the result.
This call is much faster than `point_mul(&basepoint(), &some_scalar)` because of precomputation tables.

```move
module 0x1::ristretto255 {
    public fun basepoint_mul(a: &ristretto255::Scalar): ristretto255::RistrettoPoint
}
```

<a id="0x1_ristretto255_new_compressed_point_from_bytes"></a>

## Function `new_compressed_point_from_bytes`

Creates a new CompressedRistretto point from a sequence of 32 bytes. If those bytes do not represent a valid
point, returns None.

```move
module 0x1::ristretto255 {
    public fun new_compressed_point_from_bytes(bytes: vector<u8>): option::Option<ristretto255::CompressedRistretto>
}
```

<a id="0x1_ristretto255_new_point_from_bytes"></a>

## Function `new_point_from_bytes`

Creates a new RistrettoPoint from a sequence of 32 bytes. If those bytes do not represent a valid point,
returns None.

```move
module 0x1::ristretto255 {
    public fun new_point_from_bytes(bytes: vector<u8>): option::Option<ristretto255::RistrettoPoint>
}
```

<a id="0x1_ristretto255_compressed_point_to_bytes"></a>

## Function `compressed_point_to_bytes`

Given a compressed ristretto point `point`, returns the byte representation of that point

```move
module 0x1::ristretto255 {
    public fun compressed_point_to_bytes(point: ristretto255::CompressedRistretto): vector<u8>
}
```

<a id="0x1_ristretto255_new_point_from_sha512"></a>

## Function `new_point_from_sha512`

DEPRECATED: Use the more clearly&#45;named `new_point_from_sha2_512`

Hashes the input to a uniformly&#45;at&#45;random RistrettoPoint via SHA512.

```move
module 0x1::ristretto255 {
    public fun new_point_from_sha512(sha2_512_input: vector<u8>): ristretto255::RistrettoPoint
}
```

<a id="0x1_ristretto255_new_point_from_sha2_512"></a>

## Function `new_point_from_sha2_512`

Hashes the input to a uniformly&#45;at&#45;random RistrettoPoint via SHA2&#45;512.

```move
module 0x1::ristretto255 {
    public fun new_point_from_sha2_512(sha2_512_input: vector<u8>): ristretto255::RistrettoPoint
}
```

<a id="0x1_ristretto255_new_point_from_64_uniform_bytes"></a>

## Function `new_point_from_64_uniform_bytes`

Samples a uniformly&#45;at&#45;random RistrettoPoint given a sequence of 64 uniformly&#45;at&#45;random bytes. This function
can be used to build a collision&#45;resistant hash function that maps 64&#45;byte messages to RistrettoPoint&apos;s.

```move
module 0x1::ristretto255 {
    public fun new_point_from_64_uniform_bytes(bytes: vector<u8>): option::Option<ristretto255::RistrettoPoint>
}
```

<a id="0x1_ristretto255_point_decompress"></a>

## Function `point_decompress`

Decompresses a CompressedRistretto from storage into a RistrettoPoint which can be used for fast arithmetic.

```move
module 0x1::ristretto255 {
    public fun point_decompress(point: &ristretto255::CompressedRistretto): ristretto255::RistrettoPoint
}
```

<a id="0x1_ristretto255_point_clone"></a>

## Function `point_clone`

Clones a RistrettoPoint.

```move
module 0x1::ristretto255 {
    public fun point_clone(point: &ristretto255::RistrettoPoint): ristretto255::RistrettoPoint
}
```

<a id="0x1_ristretto255_point_compress"></a>

## Function `point_compress`

Compresses a RistrettoPoint to a CompressedRistretto which can be put in storage.

```move
module 0x1::ristretto255 {
    public fun point_compress(point: &ristretto255::RistrettoPoint): ristretto255::CompressedRistretto
}
```

<a id="0x1_ristretto255_point_to_bytes"></a>

## Function `point_to_bytes`

Returns the sequence of bytes representin this Ristretto point.
To convert a RistrettoPoint &apos;p&apos; to bytes, first compress it via `c = point_compress(&p)`, and then call this
function on `c`.

```move
module 0x1::ristretto255 {
    public fun point_to_bytes(point: &ristretto255::CompressedRistretto): vector<u8>
}
```

<a id="0x1_ristretto255_point_mul"></a>

## Function `point_mul`

Returns a \* point.

```move
module 0x1::ristretto255 {
    public fun point_mul(point: &ristretto255::RistrettoPoint, a: &ristretto255::Scalar): ristretto255::RistrettoPoint
}
```

<a id="0x1_ristretto255_point_mul_assign"></a>

## Function `point_mul_assign`

Sets a \*&#61; point and returns &apos;a&apos;.

```move
module 0x1::ristretto255 {
    public fun point_mul_assign(point: &mut ristretto255::RistrettoPoint, a: &ristretto255::Scalar): &mut ristretto255::RistrettoPoint
}
```

<a id="0x1_ristretto255_basepoint_double_mul"></a>

## Function `basepoint_double_mul`

Returns (a \* a_base &#43; b \* base_point), where base_point is the Ristretto basepoint encoded in `BASE_POINT`.

```move
module 0x1::ristretto255 {
    public fun basepoint_double_mul(a: &ristretto255::Scalar, a_base: &ristretto255::RistrettoPoint, b: &ristretto255::Scalar): ristretto255::RistrettoPoint
}
```

<a id="0x1_ristretto255_point_add"></a>

## Function `point_add`

Returns a &#43; b

```move
module 0x1::ristretto255 {
    public fun point_add(a: &ristretto255::RistrettoPoint, b: &ristretto255::RistrettoPoint): ristretto255::RistrettoPoint
}
```

<a id="0x1_ristretto255_point_add_assign"></a>

## Function `point_add_assign`

Sets a &#43;&#61; b and returns &apos;a&apos;.

```move
module 0x1::ristretto255 {
    public fun point_add_assign(a: &mut ristretto255::RistrettoPoint, b: &ristretto255::RistrettoPoint): &mut ristretto255::RistrettoPoint
}
```

<a id="0x1_ristretto255_point_sub"></a>

## Function `point_sub`

Returns a &#45; b

```move
module 0x1::ristretto255 {
    public fun point_sub(a: &ristretto255::RistrettoPoint, b: &ristretto255::RistrettoPoint): ristretto255::RistrettoPoint
}
```

<a id="0x1_ristretto255_point_sub_assign"></a>

## Function `point_sub_assign`

Sets a &#45;&#61; b and returns &apos;a&apos;.

```move
module 0x1::ristretto255 {
    public fun point_sub_assign(a: &mut ristretto255::RistrettoPoint, b: &ristretto255::RistrettoPoint): &mut ristretto255::RistrettoPoint
}
```

<a id="0x1_ristretto255_point_neg"></a>

## Function `point_neg`

Returns &#45;a

```move
module 0x1::ristretto255 {
    public fun point_neg(a: &ristretto255::RistrettoPoint): ristretto255::RistrettoPoint
}
```

<a id="0x1_ristretto255_point_neg_assign"></a>

## Function `point_neg_assign`

Sets a &#61; &#45;a, and returns &apos;a&apos;.

```move
module 0x1::ristretto255 {
    public fun point_neg_assign(a: &mut ristretto255::RistrettoPoint): &mut ristretto255::RistrettoPoint
}
```

<a id="0x1_ristretto255_point_equals"></a>

## Function `point_equals`

Returns true if the two RistrettoPoints are the same points on the elliptic curve.

```move
module 0x1::ristretto255 {
    public fun point_equals(g: &ristretto255::RistrettoPoint, h: &ristretto255::RistrettoPoint): bool
}
```

<a id="0x1_ristretto255_double_scalar_mul"></a>

## Function `double_scalar_mul`

Computes a double&#45;scalar multiplication, returning a_1 p_1 &#43; a_2 p_2
This function is much faster than computing each a_i p_i using `point_mul` and adding up the results using `point_add`.

```move
module 0x1::ristretto255 {
    public fun double_scalar_mul(scalar1: &ristretto255::Scalar, point1: &ristretto255::RistrettoPoint, scalar2: &ristretto255::Scalar, point2: &ristretto255::RistrettoPoint): ristretto255::RistrettoPoint
}
```

<a id="0x1_ristretto255_multi_scalar_mul"></a>

## Function `multi_scalar_mul`

Computes a multi&#45;scalar multiplication, returning a_1 p_1 &#43; a_2 p_2 &#43; ... &#43; a_n p_n.
This function is much faster than computing each a_i p_i using `point_mul` and adding up the results using `point_add`.

```move
module 0x1::ristretto255 {
    public fun multi_scalar_mul(points: &vector<ristretto255::RistrettoPoint>, scalars: &vector<ristretto255::Scalar>): ristretto255::RistrettoPoint
}
```

<a id="0x1_ristretto255_new_scalar_from_bytes"></a>

## Function `new_scalar_from_bytes`

Given a sequence of 32 bytes, checks if they canonically&#45;encode a Scalar and return it.
Otherwise, returns None.

```move
module 0x1::ristretto255 {
    public fun new_scalar_from_bytes(bytes: vector<u8>): option::Option<ristretto255::Scalar>
}
```

<a id="0x1_ristretto255_new_scalar_from_sha512"></a>

## Function `new_scalar_from_sha512`

DEPRECATED: Use the more clearly&#45;named `new_scalar_from_sha2_512`

Hashes the input to a uniformly&#45;at&#45;random Scalar via SHA2&#45;512

```move
module 0x1::ristretto255 {
    public fun new_scalar_from_sha512(sha2_512_input: vector<u8>): ristretto255::Scalar
}
```

<a id="0x1_ristretto255_new_scalar_from_sha2_512"></a>

## Function `new_scalar_from_sha2_512`

Hashes the input to a uniformly&#45;at&#45;random Scalar via SHA2&#45;512

```move
module 0x1::ristretto255 {
    public fun new_scalar_from_sha2_512(sha2_512_input: vector<u8>): ristretto255::Scalar
}
```

<a id="0x1_ristretto255_new_scalar_from_u8"></a>

## Function `new_scalar_from_u8`

Creates a Scalar from an u8.

```move
module 0x1::ristretto255 {
    public fun new_scalar_from_u8(byte: u8): ristretto255::Scalar
}
```

<a id="0x1_ristretto255_new_scalar_from_u32"></a>

## Function `new_scalar_from_u32`

Creates a Scalar from an u32.

```move
module 0x1::ristretto255 {
    public fun new_scalar_from_u32(four_bytes: u32): ristretto255::Scalar
}
```

<a id="0x1_ristretto255_new_scalar_from_u64"></a>

## Function `new_scalar_from_u64`

Creates a Scalar from an u64.

```move
module 0x1::ristretto255 {
    public fun new_scalar_from_u64(eight_bytes: u64): ristretto255::Scalar
}
```

<a id="0x1_ristretto255_new_scalar_from_u128"></a>

## Function `new_scalar_from_u128`

Creates a Scalar from an u128.

```move
module 0x1::ristretto255 {
    public fun new_scalar_from_u128(sixteen_bytes: u128): ristretto255::Scalar
}
```

<a id="0x1_ristretto255_new_scalar_reduced_from_32_bytes"></a>

## Function `new_scalar_reduced_from_32_bytes`

Creates a Scalar from 32 bytes by reducing the little&#45;endian&#45;encoded number in those bytes modulo $\ell$.

```move
module 0x1::ristretto255 {
    public fun new_scalar_reduced_from_32_bytes(bytes: vector<u8>): option::Option<ristretto255::Scalar>
}
```

<a id="0x1_ristretto255_new_scalar_uniform_from_64_bytes"></a>

## Function `new_scalar_uniform_from_64_bytes`

Samples a scalar uniformly&#45;at&#45;random given 64 uniform&#45;at&#45;random bytes as input by reducing the little&#45;endian&#45;encoded number
in those bytes modulo $\ell$.

```move
module 0x1::ristretto255 {
    public fun new_scalar_uniform_from_64_bytes(bytes: vector<u8>): option::Option<ristretto255::Scalar>
}
```

<a id="0x1_ristretto255_scalar_zero"></a>

## Function `scalar_zero`

Returns 0 as a Scalar.

```move
module 0x1::ristretto255 {
    public fun scalar_zero(): ristretto255::Scalar
}
```

<a id="0x1_ristretto255_scalar_is_zero"></a>

## Function `scalar_is_zero`

Returns true if the given Scalar equals 0.

```move
module 0x1::ristretto255 {
    public fun scalar_is_zero(s: &ristretto255::Scalar): bool
}
```

<a id="0x1_ristretto255_scalar_one"></a>

## Function `scalar_one`

Returns 1 as a Scalar.

```move
module 0x1::ristretto255 {
    public fun scalar_one(): ristretto255::Scalar
}
```

<a id="0x1_ristretto255_scalar_is_one"></a>

## Function `scalar_is_one`

Returns true if the given Scalar equals 1.

```move
module 0x1::ristretto255 {
    public fun scalar_is_one(s: &ristretto255::Scalar): bool
}
```

<a id="0x1_ristretto255_scalar_equals"></a>

## Function `scalar_equals`

Returns true if the two scalars are equal.

```move
module 0x1::ristretto255 {
    public fun scalar_equals(lhs: &ristretto255::Scalar, rhs: &ristretto255::Scalar): bool
}
```

<a id="0x1_ristretto255_scalar_invert"></a>

## Function `scalar_invert`

Returns the inverse s^&#123;&#45;1&#125; mod \ell of a scalar s.
Returns None if s is zero.

```move
module 0x1::ristretto255 {
    public fun scalar_invert(s: &ristretto255::Scalar): option::Option<ristretto255::Scalar>
}
```

<a id="0x1_ristretto255_scalar_mul"></a>

## Function `scalar_mul`

Returns the product of the two scalars.

```move
module 0x1::ristretto255 {
    public fun scalar_mul(a: &ristretto255::Scalar, b: &ristretto255::Scalar): ristretto255::Scalar
}
```

<a id="0x1_ristretto255_scalar_mul_assign"></a>

## Function `scalar_mul_assign`

Computes the product of &apos;a&apos; and &apos;b&apos; and assigns the result to &apos;a&apos;.
Returns &apos;a&apos;.

```move
module 0x1::ristretto255 {
    public fun scalar_mul_assign(a: &mut ristretto255::Scalar, b: &ristretto255::Scalar): &mut ristretto255::Scalar
}
```

<a id="0x1_ristretto255_scalar_add"></a>

## Function `scalar_add`

Returns the sum of the two scalars.

```move
module 0x1::ristretto255 {
    public fun scalar_add(a: &ristretto255::Scalar, b: &ristretto255::Scalar): ristretto255::Scalar
}
```

<a id="0x1_ristretto255_scalar_add_assign"></a>

## Function `scalar_add_assign`

Computes the sum of &apos;a&apos; and &apos;b&apos; and assigns the result to &apos;a&apos;
Returns &apos;a&apos;.

```move
module 0x1::ristretto255 {
    public fun scalar_add_assign(a: &mut ristretto255::Scalar, b: &ristretto255::Scalar): &mut ristretto255::Scalar
}
```

<a id="0x1_ristretto255_scalar_sub"></a>

## Function `scalar_sub`

Returns the difference of the two scalars.

```move
module 0x1::ristretto255 {
    public fun scalar_sub(a: &ristretto255::Scalar, b: &ristretto255::Scalar): ristretto255::Scalar
}
```

<a id="0x1_ristretto255_scalar_sub_assign"></a>

## Function `scalar_sub_assign`

Subtracts &apos;b&apos; from &apos;a&apos; and assigns the result to &apos;a&apos;.
Returns &apos;a&apos;.

```move
module 0x1::ristretto255 {
    public fun scalar_sub_assign(a: &mut ristretto255::Scalar, b: &ristretto255::Scalar): &mut ristretto255::Scalar
}
```

<a id="0x1_ristretto255_scalar_neg"></a>

## Function `scalar_neg`

Returns the negation of &apos;a&apos;: i.e., $(0 &#45; a) \mod \ell$.

```move
module 0x1::ristretto255 {
    public fun scalar_neg(a: &ristretto255::Scalar): ristretto255::Scalar
}
```

<a id="0x1_ristretto255_scalar_neg_assign"></a>

## Function `scalar_neg_assign`

Replaces &apos;a&apos; by its negation.
Returns &apos;a&apos;.

```move
module 0x1::ristretto255 {
    public fun scalar_neg_assign(a: &mut ristretto255::Scalar): &mut ristretto255::Scalar
}
```

<a id="0x1_ristretto255_scalar_to_bytes"></a>

## Function `scalar_to_bytes`

Returns the byte&#45;representation of the scalar.

```move
module 0x1::ristretto255 {
    public fun scalar_to_bytes(s: &ristretto255::Scalar): vector<u8>
}
```
