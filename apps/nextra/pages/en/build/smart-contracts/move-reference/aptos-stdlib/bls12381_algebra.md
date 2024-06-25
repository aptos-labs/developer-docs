<a id="0x1_bls12381_algebra"></a>

# Module `0x1::bls12381_algebra`

This module defines marker types, constants and test cases for working with BLS12&#45;381 curves
using the generic API defined in `algebra.move`.
See https://datatracker.ietf.org/doc/html/draft&#45;irtf&#45;cfrg&#45;pairing&#45;friendly&#45;curves&#45;11#name&#45;bls&#45;curves&#45;for&#45;the&#45;128&#45;bit&#45;
for the full specification of BLS12&#45;381 curves.

Currently&#45;supported BLS12&#45;381 structures include `Fq12`, `Fr`, `G1`, `G2` and `Gt`,
along with their widely&#45;used serialization formats,
the pairing between `G1`, `G2` and `Gt`,
and the hash&#45;to&#45;curve operations for `G1` and `G2` defined in https://datatracker.ietf.org/doc/html/draft&#45;irtf&#45;cfrg&#45;hash&#45;to&#45;curve&#45;16.

Other unimplemented BLS12&#45;381 structures and serialization formats are also listed here,
as they help define some of the currently supported structures.
Their implementation may also be added in the future.

`Fq`: the finite field $F_q$ used in BLS12&#45;381 curves with a prime order $q$ equal to
0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaab.

`FormatFqLsb`: a serialization format for `Fq` elements,
where an element is represented by a byte array `b[]` of size 48 with the least significant byte (LSB) coming first.

`FormatFqMsb`: a serialization format for `Fq` elements,
where an element is represented by a byte array `b[]` of size 48 with the most significant byte (MSB) coming first.

`Fq2`: the finite field $F_&#123;q^2&#125;$ used in BLS12&#45;381 curves,
which is an extension field of `Fq`, constructed as $F_&#123;q^2&#125;&#61;F_q[u]/(u^2&#43;1)$.

`FormatFq2LscLsb`: a serialization format for `Fq2` elements,
where an element in the form $(c_0&#43;c_1\cdot u)$ is represented by a byte array `b[]` of size 96,
which is a concatenation of its coefficients serialized, with the least significant coefficient (LSC) coming first:
&#45; `b[0..48]` is $c_0$ serialized using `FormatFqLsb`.
&#45; `b[48..96]` is $c_1$ serialized using `FormatFqLsb`.

`FormatFq2MscMsb`: a serialization format for `Fq2` elements,
where an element in the form $(c_0&#43;c_1\cdot u)$ is represented by a byte array `b[]` of size 96,
which is a concatenation of its coefficients serialized, with the most significant coefficient (MSC) coming first:
&#45; `b[0..48]` is $c_1$ serialized using `FormatFqLsb`.
&#45; `b[48..96]` is $c_0$ serialized using `FormatFqLsb`.

`Fq6`: the finite field $F_&#123;q^6&#125;$ used in BLS12&#45;381 curves,
which is an extension field of `Fq2`, constructed as $F_&#123;q^6&#125;&#61;F_&#123;q^2&#125;[v]/(v^3&#45;u&#45;1)$.

`FormatFq6LscLsb`: a serialization scheme for `Fq6` elements,
where an element in the form $(c_0&#43;c_1\cdot v&#43;c_2\cdot v^2)$ is represented by a byte array `b[]` of size 288,
which is a concatenation of its coefficients serialized, with the least significant coefficient (LSC) coming first:
&#45; `b[0..96]` is $c_0$ serialized using `FormatFq2LscLsb`.
&#45; `b[96..192]` is $c_1$ serialized using `FormatFq2LscLsb`.
&#45; `b[192..288]` is $c_2$ serialized using `FormatFq2LscLsb`.

`G1Full`: a group constructed by the points on the BLS12&#45;381 curve $E(F_q): y^2&#61;x^3&#43;4$ and the point at infinity,
under the elliptic curve point addition.
It contains the prime&#45;order subgroup $G_1$ used in pairing.

`G2Full`: a group constructed by the points on a curve $E&apos;(F_&#123;q^2&#125;): y^2&#61;x^3&#43;4(u&#43;1)$ and the point at infinity,
under the elliptic curve point addition.
It contains the prime&#45;order subgroup $G_2$ used in pairing.

- [Struct `Fq12`](#0x1_bls12381_algebra_Fq12)
- [Struct `FormatFq12LscLsb`](#0x1_bls12381_algebra_FormatFq12LscLsb)
- [Struct `G1`](#0x1_bls12381_algebra_G1)
- [Struct `FormatG1Uncompr`](#0x1_bls12381_algebra_FormatG1Uncompr)
- [Struct `FormatG1Compr`](#0x1_bls12381_algebra_FormatG1Compr)
- [Struct `G2`](#0x1_bls12381_algebra_G2)
- [Struct `FormatG2Uncompr`](#0x1_bls12381_algebra_FormatG2Uncompr)
- [Struct `FormatG2Compr`](#0x1_bls12381_algebra_FormatG2Compr)
- [Struct `Gt`](#0x1_bls12381_algebra_Gt)
- [Struct `FormatGt`](#0x1_bls12381_algebra_FormatGt)
- [Struct `Fr`](#0x1_bls12381_algebra_Fr)
- [Struct `FormatFrLsb`](#0x1_bls12381_algebra_FormatFrLsb)
- [Struct `FormatFrMsb`](#0x1_bls12381_algebra_FormatFrMsb)
- [Struct `HashG1XmdSha256SswuRo`](#0x1_bls12381_algebra_HashG1XmdSha256SswuRo)
- [Struct `HashG2XmdSha256SswuRo`](#0x1_bls12381_algebra_HashG2XmdSha256SswuRo)

```move
module 0x1::bls12381_algebra {
}
```

<a id="0x1_bls12381_algebra_Fq12"></a>

## Struct `Fq12`

The finite field $F_&#123;q^12&#125;$ used in BLS12&#45;381 curves,
which is an extension field of `Fq6` (defined in the module documentation), constructed as $F_&#123;q^12&#125;&#61;F_&#123;q^6&#125;[w]/(w^2&#45;v)$.

```move
module 0x1::bls12381_algebra {
    struct Fq12
}
```

<a id="0x1_bls12381_algebra_FormatFq12LscLsb"></a>

## Struct `FormatFq12LscLsb`

A serialization scheme for `Fq12` elements,
where an element $(c_0&#43;c_1\cdot w)$ is represented by a byte array `b[]` of size 576,
which is a concatenation of its coefficients serialized, with the least significant coefficient (LSC) coming first.
&#45; `b[0..288]` is $c_0$ serialized using `FormatFq6LscLsb` (defined in the module documentation).
&#45; `b[288..576]` is $c_1$ serialized using `FormatFq6LscLsb`.

NOTE: other implementation(s) using this format: ark&#45;bls12&#45;381&#45;0.4.0.

```move
module 0x1::bls12381_algebra {
    struct FormatFq12LscLsb
}
```

<a id="0x1_bls12381_algebra_G1"></a>

## Struct `G1`

The group $G_1$ in BLS12&#45;381&#45;based pairing $G_1 \times G_2 \rightarrow G_t$.
It is a subgroup of `G1Full` (defined in the module documentation) with a prime order $r$
equal to 0x73eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001.
(so `Fr` is the associated scalar field).

```move
module 0x1::bls12381_algebra {
    struct G1
}
```

<a id="0x1_bls12381_algebra_FormatG1Uncompr"></a>

## Struct `FormatG1Uncompr`

A serialization scheme for `G1` elements derived from
https://www.ietf.org/archive/id/draft&#45;irtf&#45;cfrg&#45;pairing&#45;friendly&#45;curves&#45;11.html#name&#45;zcash&#45;serialization&#45;format&#45;.

Below is the serialization procedure that takes a `G1` element `p` and outputs a byte array of size 96.

1. Let `(x,y)` be the coordinates of `p` if `p` is on the curve, or `(0,0)` otherwise.
1. Serialize `x` and `y` into `b_x[]` and `b_y[]` respectively using `FormatFqMsb` (defined in the module documentation).
1. Concatenate `b_x[]` and `b_y[]` into `b[]`.
1. If `p` is the point at infinity, set the infinity bit: `b[0]: = b[0] | 0x40`.
1. Return `b[]`.

Below is the deserialization procedure that takes a byte array `b[]` and outputs either a `G1` element or none.

1. If the size of `b[]` is not 96, return none.
1. Compute the compression flag as `b[0] & 0x80 != 0`.
1. If the compression flag is true, return none.
1. Compute the infinity flag as `b[0] & 0x40 != 0`.
1. If the infinity flag is set, return the point at infinity.
1. Deserialize `[b[0] & 0x1f, b[1], ..., b[47]]` to `x` using `FormatFqMsb`. If `x` is none, return none.
1. Deserialize `[b[48], ..., b[95]]` to `y` using `FormatFqMsb`. If `y` is none, return none.
1. Check if `(x,y)` is on curve `E`. If not, return none.
1. Check if `(x,y)` is in the subgroup of order `r`. If not, return none.
1. Return `(x,y)`.

NOTE: other implementation(s) using this format: ark&#45;bls12&#45;381&#45;0.4.0.

```move
module 0x1::bls12381_algebra {
    struct FormatG1Uncompr
}
```

<a id="0x1_bls12381_algebra_FormatG1Compr"></a>

## Struct `FormatG1Compr`

A serialization scheme for `G1` elements derived from
https://www.ietf.org/archive/id/draft&#45;irtf&#45;cfrg&#45;pairing&#45;friendly&#45;curves&#45;11.html#name&#45;zcash&#45;serialization&#45;format&#45;.

Below is the serialization procedure that takes a `G1` element `p` and outputs a byte array of size 48.

1. Let `(x,y)` be the coordinates of `p` if `p` is on the curve, or `(0,0)` otherwise.
1. Serialize `x` into `b[]` using `FormatFqMsb` (defined in the module documentation).
1. Set the compression bit: `b[0] := b[0] | 0x80`.
1. If `p` is the point at infinity, set the infinity bit: `b[0]: = b[0] | 0x40`.
1. If `y > -y`, set the lexicographical flag: `b[0] := b[0] | 0x20`.
1. Return `b[]`.

Below is the deserialization procedure that takes a byte array `b[]` and outputs either a `G1` element or none.

1. If the size of `b[]` is not 48, return none.
1. Compute the compression flag as `b[0] & 0x80 != 0`.
1. If the compression flag is false, return none.
1. Compute the infinity flag as `b[0] & 0x40 != 0`.
1. If the infinity flag is set, return the point at infinity.
1. Compute the lexicographical flag as `b[0] & 0x20 != 0`.
1. Deserialize `[b[0] & 0x1f, b[1], ..., b[47]]` to `x` using `FormatFqMsb`. If `x` is none, return none.
1. Solve the curve equation with `x` for `y`. If no such `y` exists, return none.
1. Let `y'` be `max(y,-y)` if the lexicographical flag is set, or `min(y,-y)` otherwise.
1. Check if `(x,y')` is in the subgroup of order `r`. If not, return none.
1. Return `(x,y')`.

NOTE: other implementation(s) using this format: ark&#45;bls12&#45;381&#45;0.4.0.

```move
module 0x1::bls12381_algebra {
    struct FormatG1Compr
}
```

<a id="0x1_bls12381_algebra_G2"></a>

## Struct `G2`

The group $G_2$ in BLS12&#45;381&#45;based pairing $G_1 \times G_2 \rightarrow G_t$.
It is a subgroup of `G2Full` (defined in the module documentation) with a prime order $r$ equal to
0x73eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001.
(so `Fr` is the scalar field).

```move
module 0x1::bls12381_algebra {
    struct G2
}
```

<a id="0x1_bls12381_algebra_FormatG2Uncompr"></a>

## Struct `FormatG2Uncompr`

A serialization scheme for `G2` elements derived from
https://www.ietf.org/archive/id/draft&#45;irtf&#45;cfrg&#45;pairing&#45;friendly&#45;curves&#45;11.html#name&#45;zcash&#45;serialization&#45;format&#45;.

Below is the serialization procedure that takes a `G2` element `p` and outputs a byte array of size 192.

1. Let `(x,y)` be the coordinates of `p` if `p` is on the curve, or `(0,0)` otherwise.
1. Serialize `x` and `y` into `b_x[]` and `b_y[]` respectively using `FormatFq2MscMsb` (defined in the module documentation).
1. Concatenate `b_x[]` and `b_y[]` into `b[]`.
1. If `p` is the point at infinity, set the infinity bit in `b[]`: `b[0]: = b[0] | 0x40`.
1. Return `b[]`.

Below is the deserialization procedure that takes a byte array `b[]` and outputs either a `G2` element or none.

1. If the size of `b[]` is not 192, return none.
1. Compute the compression flag as `b[0] & 0x80 != 0`.
1. If the compression flag is true, return none.
1. Compute the infinity flag as `b[0] & 0x40 != 0`.
1. If the infinity flag is set, return the point at infinity.
1. Deserialize `[b[0] & 0x1f, ..., b[95]]` to `x` using `FormatFq2MscMsb`. If `x` is none, return none.
1. Deserialize `[b[96], ..., b[191]]` to `y` using `FormatFq2MscMsb`. If `y` is none, return none.
1. Check if `(x,y)` is on the curve `E'`. If not, return none.
1. Check if `(x,y)` is in the subgroup of order `r`. If not, return none.
1. Return `(x,y)`.

NOTE: other implementation(s) using this format: ark&#45;bls12&#45;381&#45;0.4.0.

```move
module 0x1::bls12381_algebra {
    struct FormatG2Uncompr
}
```

<a id="0x1_bls12381_algebra_FormatG2Compr"></a>

## Struct `FormatG2Compr`

A serialization scheme for `G2` elements derived from
https://www.ietf.org/archive/id/draft&#45;irtf&#45;cfrg&#45;pairing&#45;friendly&#45;curves&#45;11.html#name&#45;zcash&#45;serialization&#45;format&#45;.

Below is the serialization procedure that takes a `G2` element `p` and outputs a byte array of size 96.

1. Let `(x,y)` be the coordinates of `p` if `p` is on the curve, or `(0,0)` otherwise.
1. Serialize `x` into `b[]` using `FormatFq2MscMsb` (defined in the module documentation).
1. Set the compression bit: `b[0] := b[0] | 0x80`.
1. If `p` is the point at infinity, set the infinity bit: `b[0]: = b[0] | 0x40`.
1. If `y > -y`, set the lexicographical flag: `b[0] := b[0] | 0x20`.
1. Return `b[]`.

Below is the deserialization procedure that takes a byte array `b[]` and outputs either a `G2` element or none.

1. If the size of `b[]` is not 96, return none.
1. Compute the compression flag as `b[0] & 0x80 != 0`.
1. If the compression flag is false, return none.
1. Compute the infinity flag as `b[0] & 0x40 != 0`.
1. If the infinity flag is set, return the point at infinity.
1. Compute the lexicographical flag as `b[0] & 0x20 != 0`.
1. Deserialize `[b[0] & 0x1f, b[1], ..., b[95]]` to `x` using `FormatFq2MscMsb`. If `x` is none, return none.
1. Solve the curve equation with `x` for `y`. If no such `y` exists, return none.
1. Let `y'` be `max(y,-y)` if the lexicographical flag is set, or `min(y,-y)` otherwise.
1. Check if `(x,y')` is in the subgroup of order `r`. If not, return none.
1. Return `(x,y')`.

NOTE: other implementation(s) using this format: ark&#45;bls12&#45;381&#45;0.4.0.

```move
module 0x1::bls12381_algebra {
    struct FormatG2Compr
}
```

<a id="0x1_bls12381_algebra_Gt"></a>

## Struct `Gt`

The group $G_t$ in BLS12&#45;381&#45;based pairing $G_1 \times G_2 \rightarrow G_t$.
It is a multiplicative subgroup of `Fq12`,
with a prime order $r$ equal to 0x73eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001.
(so `Fr` is the scalar field).
The identity of `Gt` is 1.

```move
module 0x1::bls12381_algebra {
    struct Gt
}
```

<a id="0x1_bls12381_algebra_FormatGt"></a>

## Struct `FormatGt`

A serialization scheme for `Gt` elements.

To serialize, it treats a `Gt` element `p` as an `Fq12` element and serialize it using `FormatFq12LscLsb`.

To deserialize, it uses `FormatFq12LscLsb` to try deserializing to an `Fq12` element then test the membership in `Gt`.

NOTE: other implementation(s) using this format: ark&#45;bls12&#45;381&#45;0.4.0.

```move
module 0x1::bls12381_algebra {
    struct FormatGt
}
```

<a id="0x1_bls12381_algebra_Fr"></a>

## Struct `Fr`

The finite field $F_r$ that can be used as the scalar fields
associated with the groups $G_1$, $G_2$, $G_t$ in BLS12&#45;381&#45;based pairing.

```move
module 0x1::bls12381_algebra {
    struct Fr
}
```

<a id="0x1_bls12381_algebra_FormatFrLsb"></a>

## Struct `FormatFrLsb`

A serialization format for `Fr` elements,
where an element is represented by a byte array `b[]` of size 32 with the least significant byte (LSB) coming first.

NOTE: other implementation(s) using this format: ark&#45;bls12&#45;381&#45;0.4.0, blst&#45;0.3.7.

```move
module 0x1::bls12381_algebra {
    struct FormatFrLsb
}
```

<a id="0x1_bls12381_algebra_FormatFrMsb"></a>

## Struct `FormatFrMsb`

A serialization scheme for `Fr` elements,
where an element is represented by a byte array `b[]` of size 32 with the most significant byte (MSB) coming first.

NOTE: other implementation(s) using this format: ark&#45;bls12&#45;381&#45;0.4.0, blst&#45;0.3.7.

```move
module 0x1::bls12381_algebra {
    struct FormatFrMsb
}
```

<a id="0x1_bls12381_algebra_HashG1XmdSha256SswuRo"></a>

## Struct `HashG1XmdSha256SswuRo`

The hash&#45;to&#45;curve suite `BLS12381G1_XMD:SHA-256_SSWU_RO_` that hashes a byte array into `G1` elements.

Full specification is defined in https://datatracker.ietf.org/doc/html/draft&#45;irtf&#45;cfrg&#45;hash&#45;to&#45;curve&#45;16#name&#45;bls12&#45;381&#45;g1.

```move
module 0x1::bls12381_algebra {
    struct HashG1XmdSha256SswuRo
}
```

<a id="0x1_bls12381_algebra_HashG2XmdSha256SswuRo"></a>

## Struct `HashG2XmdSha256SswuRo`

The hash&#45;to&#45;curve suite `BLS12381G2_XMD:SHA-256_SSWU_RO_` that hashes a byte array into `G2` elements.

Full specification is defined in https://datatracker.ietf.org/doc/html/draft&#45;irtf&#45;cfrg&#45;hash&#45;to&#45;curve&#45;16#name&#45;bls12&#45;381&#45;g2.

```move
module 0x1::bls12381_algebra {
    struct HashG2XmdSha256SswuRo
}
```
