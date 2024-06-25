<a id="0x1_bn254_algebra"></a>

# Module `0x1::bn254_algebra`

This module defines marker types, constants and test cases for working with BN254 curves using the generic API defined in `algebra.move`.
BN254 was sampled as part of the [\[BCTV14\]](https://eprint.iacr.org/2013/879.pdf) paper .
The name denotes that it is a Barreto&#45;Naehrig curve of embedding degree 12, defined over a 254&#45;bit (prime) field.
The scalar field is highly 2&#45;adic which supports subgroups of roots of unity of size &lt;&#61; 2^28.
(as (21888242871839275222246405745257275088548364400416034343698204186575808495617 &#45; 1) mod 2^28 &#61; 0)

This curve is also implemented in [libff](https://github.com/scipr-lab/libff/tree/master/libff/algebra/curves/alt_bn128) under the name `bn128`.
It is the same as the `bn254` curve used in Ethereum (eg: [go&#45;ethereum](https://github.com/ethereum/go-ethereum/tree/master/crypto/bn254/cloudflare)).

<a id="@CAUTION_0"></a>

## CAUTION

\*\*This curve does not satisfy the 128&#45;bit security level anymore.\*\*

Its current security is estimated at 128&#45;bits (see &quot;Updating Key Size Estimations for Pairings&quot;; by Barbulescu, Razvan and Duquesne, Sylvain; in Journal of Cryptology; 2019; https://doi.org/10.1007/s00145&#45;018&#45;9280&#45;5)

Curve information: \* Base field: q &#61;
21888242871839275222246405745257275088696311157297823662689037894645226208583 \* Scalar field: r &#61;
21888242871839275222246405745257275088548364400416034343698204186575808495617 \* valuation(q &#45; 1, 2) &#61; 1 \* valuation(r &#45; 1, 2) &#61; 28 \* G1 curve equation: y^2 &#61; x^3 &#43; 3 \* G2 curve equation: y^2 &#61; x^3 &#43; B, where \* B &#61; 3/(u&#43;9) where Fq2 is represented as Fq\[u\]/(u^2&#43;1) &#61;
Fq2(19485874751759354771024239261021720505790618469301721065564631296452457478373, 266929791119991161246907387137283842545076965332900288569378510910307636690)

Currently&#45;supported BN254 structures include `Fq12`, `Fr`, `Fq`, `Fq2`, `G1`, `G2` and `Gt`,
along with their widely&#45;used serialization formats,
the pairing between `G1`, `G2` and `Gt`.

Other unimplemented BN254 structures and serialization formats are also listed here,
as they help define some of the currently supported structures.
Their implementation may also be added in the future.

`Fq2`: The finite field $F_&#123;q^2&#125;$ that can be used as the base field of $G_2$
which is an extension field of `Fq`, constructed as $F_&#123;q^2&#125;&#61;F_&#123;q&#125;[u]/(u^2&#43;1)$.

`FormatFq2LscLsb`: A serialization scheme for `Fq2` elements,
where an element $(c_0&#43;c_1\cdot u)$ is represented by a byte array `b[]` of size N&#61;64,
which is a concatenation of its coefficients serialized, with the least significant coefficient (LSC) coming first.
&#45; `b[0..32]` is $c_0$ serialized using `FormatFqLscLsb`.
&#45; `b[32..64]` is $c_1$ serialized using `FormatFqLscLsb`.

`Fq6`: the finite field $F_&#123;q^6&#125;$ used in BN254 curves,
which is an extension field of `Fq2`, constructed as $F_&#123;q^6&#125;&#61;F_&#123;q^2&#125;[v]/(v^3&#45;u&#45;9)$.

`FormatFq6LscLsb`: a serialization scheme for `Fq6` elements,
where an element in the form $(c_0&#43;c_1\cdot v&#43;c_2\cdot v^2)$ is represented by a byte array `b[]` of size 192,
which is a concatenation of its coefficients serialized, with the least significant coefficient (LSC) coming first:
&#45; `b[0..64]` is $c_0$ serialized using `FormatFq2LscLsb`.
&#45; `b[64..128]` is $c_1$ serialized using `FormatFq2LscLsb`.
&#45; `b[128..192]` is $c_2$ serialized using `FormatFq2LscLsb`.

`G1Full`: a group constructed by the points on the BN254 curve $E(F_q): y^2&#61;x^3&#43;3$ and the point at infinity,
under the elliptic curve point addition.
It contains the prime&#45;order subgroup $G_1$ used in pairing.

`G2Full`: a group constructed by the points on a curve $E&apos;(F_&#123;q^2&#125;): y^2&#61;x^3&#43;3/(u&#43;9)$ and the point at infinity,
under the elliptic curve point addition.
It contains the prime&#45;order subgroup $G_2$ used in pairing.

- [CAUTION](#@CAUTION_0)
- [Struct `Fr`](#0x1_bn254_algebra_Fr)
- [Struct `FormatFrLsb`](#0x1_bn254_algebra_FormatFrLsb)
- [Struct `FormatFrMsb`](#0x1_bn254_algebra_FormatFrMsb)
- [Struct `Fq`](#0x1_bn254_algebra_Fq)
- [Struct `FormatFqLsb`](#0x1_bn254_algebra_FormatFqLsb)
- [Struct `FormatFqMsb`](#0x1_bn254_algebra_FormatFqMsb)
- [Struct `Fq12`](#0x1_bn254_algebra_Fq12)
- [Struct `FormatFq12LscLsb`](#0x1_bn254_algebra_FormatFq12LscLsb)
- [Struct `G1`](#0x1_bn254_algebra_G1)
- [Struct `FormatG1Uncompr`](#0x1_bn254_algebra_FormatG1Uncompr)
- [Struct `FormatG1Compr`](#0x1_bn254_algebra_FormatG1Compr)
- [Struct `G2`](#0x1_bn254_algebra_G2)
- [Struct `FormatG2Uncompr`](#0x1_bn254_algebra_FormatG2Uncompr)
- [Struct `FormatG2Compr`](#0x1_bn254_algebra_FormatG2Compr)
- [Struct `Gt`](#0x1_bn254_algebra_Gt)
- [Struct `FormatGt`](#0x1_bn254_algebra_FormatGt)

```move
module 0x1::bn254_algebra {
}
```

<a id="0x1_bn254_algebra_Fr"></a>

## Struct `Fr`

The finite field $F_r$ that can be used as the scalar fields
associated with the groups $G_1$, $G_2$, $G_t$ in BN254&#45;based pairing.

```move
module 0x1::bn254_algebra {
    struct Fr
}
```

<a id="0x1_bn254_algebra_FormatFrLsb"></a>

## Struct `FormatFrLsb`

A serialization format for `Fr` elements,
where an element is represented by a byte array `b[]` of size 32 with the least significant byte (LSB) coming first.

NOTE: other implementation(s) using this format: ark&#45;bn254&#45;0.4.0.

```move
module 0x1::bn254_algebra {
    struct FormatFrLsb
}
```

<a id="0x1_bn254_algebra_FormatFrMsb"></a>

## Struct `FormatFrMsb`

A serialization scheme for `Fr` elements,
where an element is represented by a byte array `b[]` of size 32 with the most significant byte (MSB) coming first.

NOTE: other implementation(s) using this format: ark&#45;bn254&#45;0.4.0.

```move
module 0x1::bn254_algebra {
    struct FormatFrMsb
}
```

<a id="0x1_bn254_algebra_Fq"></a>

## Struct `Fq`

The finite field $F_q$ that can be used as the base field of $G_1$

```move
module 0x1::bn254_algebra {
    struct Fq
}
```

<a id="0x1_bn254_algebra_FormatFqLsb"></a>

## Struct `FormatFqLsb`

A serialization format for `Fq` elements,
where an element is represented by a byte array `b[]` of size 32 with the least significant byte (LSB) coming first.

NOTE: other implementation(s) using this format: ark&#45;bn254&#45;0.4.0.

```move
module 0x1::bn254_algebra {
    struct FormatFqLsb
}
```

<a id="0x1_bn254_algebra_FormatFqMsb"></a>

## Struct `FormatFqMsb`

A serialization scheme for `Fq` elements,
where an element is represented by a byte array `b[]` of size 32 with the most significant byte (MSB) coming first.

NOTE: other implementation(s) using this format: ark&#45;bn254&#45;0.4.0.

```move
module 0x1::bn254_algebra {
    struct FormatFqMsb
}
```

<a id="0x1_bn254_algebra_Fq12"></a>

## Struct `Fq12`

The finite field $F_&#123;q^12&#125;$ used in BN254 curves,
which is an extension field of `Fq6` (defined in the module documentation), constructed as $F_&#123;q^12&#125;&#61;F_&#123;q^6&#125;[w]/(w^2&#45;v)$.
The field can downcast to `Gt` if it&apos;s an element of the multiplicative subgroup `Gt` of `Fq12`
with a prime order $r$ &#61; 0x73eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001.

```move
module 0x1::bn254_algebra {
    struct Fq12
}
```

<a id="0x1_bn254_algebra_FormatFq12LscLsb"></a>

## Struct `FormatFq12LscLsb`

A serialization scheme for `Fq12` elements,
where an element $(c_0&#43;c_1\cdot w)$ is represented by a byte array `b[]` of size 384,
which is a concatenation of its coefficients serialized, with the least significant coefficient (LSC) coming first.
&#45; `b[0..192]` is $c_0$ serialized using `FormatFq6LscLsb` (defined in the module documentation).
&#45; `b[192..384]` is $c_1$ serialized using `FormatFq6LscLsb`.

NOTE: other implementation(s) using this format: ark&#45;bn254&#45;0.4.0.

```move
module 0x1::bn254_algebra {
    struct FormatFq12LscLsb
}
```

<a id="0x1_bn254_algebra_G1"></a>

## Struct `G1`

The group $G_1$ in BN254&#45;based pairing $G_1 \times G_2 \rightarrow G_t$.
It is a subgroup of `G1Full` (defined in the module documentation) with a prime order $r$
equal to 0x73eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001.
(so `Fr` is the associated scalar field).

```move
module 0x1::bn254_algebra {
    struct G1
}
```

<a id="0x1_bn254_algebra_FormatG1Uncompr"></a>

## Struct `FormatG1Uncompr`

A serialization scheme for `G1` elements derived from arkworks.rs.

Below is the serialization procedure that takes a `G1` element `p` and outputs a byte array of size N&#61;64.

1. Let `(x,y)` be the coordinates of `p` if `p` is on the curve, or `(0,0)` otherwise.
1. Serialize `x` and `y` into `b_x[]` and `b_y[]` respectively using `FormatFqLsb` (defined in the module documentation).
1. Concatenate `b_x[]` and `b_y[]` into `b[]`.
1. If `p` is the point at infinity, set the infinity bit: `b[N-1]: = b[N-1] | 0b0100_0000`.
1. If `y > -y`, set the lexicographical bit: `b[N-1]: = b[N-1] | 0b1000_0000`.
1. Return `b[]`.

Below is the deserialization procedure that takes a byte array `b[]` and outputs either a `G1` element or none.

1. If the size of `b[]` is not N, return none.
1. Compute the infinity flag as `b[N-1] & 0b0100_0000 != 0`.
1. If the infinity flag is set, return the point at infinity.
1. Deserialize `[b[0], b[1], ..., b[N/2-1]]` to `x` using `FormatFqLsb`. If `x` is none, return none.
1. Deserialize `[b[N/2], ..., b[N] & 0b0011_1111]` to `y` using `FormatFqLsb`. If `y` is none, return none.
1. Check if `(x,y)` is on curve `E`. If not, return none.
1. Check if `(x,y)` is in the subgroup of order `r`. If not, return none.
1. Return `(x,y)`.

NOTE: other implementation(s) using this format: ark&#45;bn254&#45;0.4.0.

```move
module 0x1::bn254_algebra {
    struct FormatG1Uncompr
}
```

<a id="0x1_bn254_algebra_FormatG1Compr"></a>

## Struct `FormatG1Compr`

A serialization scheme for `G1` elements derived from arkworks.rs

Below is the serialization procedure that takes a `G1` element `p` and outputs a byte array of size N&#61;32.

1. Let `(x,y)` be the coordinates of `p` if `p` is on the curve, or `(0,0)` otherwise.
1. Serialize `x` into `b[]` using `FormatFqLsb` (defined in the module documentation).
1. If `p` is the point at infinity, set the infinity bit: `b[N-1]: = b[N-1] | 0b0100_0000`.
1. If `y > -y`, set the lexicographical flag: `b[N-1] := b[N-1] | 0x1000_0000`.
1. Return `b[]`.

Below is the deserialization procedure that takes a byte array `b[]` and outputs either a `G1` element or none.

1. If the size of `b[]` is not N, return none.
1. Compute the infinity flag as `b[N-1] & 0b0100_0000 != 0`.
1. If the infinity flag is set, return the point at infinity.
1. Compute the lexicographical flag as `b[N-1] & 0b1000_0000 != 0`.
1. Deserialize `[b[0], b[1], ..., b[N/2-1] & 0b0011_1111]` to `x` using `FormatFqLsb`. If `x` is none, return none.
1. Solve the curve equation with `x` for `y`. If no such `y` exists, return none.
1. Let `y'` be `max(y,-y)` if the lexicographical flag is set, or `min(y,-y)` otherwise.
1. Check if `(x,y')` is in the subgroup of order `r`. If not, return none.
1. Return `(x,y')`.

NOTE: other implementation(s) using this format: ark&#45;bn254&#45;0.4.0.

```move
module 0x1::bn254_algebra {
    struct FormatG1Compr
}
```

<a id="0x1_bn254_algebra_G2"></a>

## Struct `G2`

The group $G_2$ in BN254&#45;based pairing $G_1 \times G_2 \rightarrow G_t$.
It is a subgroup of `G2Full` (defined in the module documentation) with a prime order $r$ equal to
0x73eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001.
(so `Fr` is the scalar field).

```move
module 0x1::bn254_algebra {
    struct G2
}
```

<a id="0x1_bn254_algebra_FormatG2Uncompr"></a>

## Struct `FormatG2Uncompr`

A serialization scheme for `G2` elements derived from arkworks.rs.

Below is the serialization procedure that takes a `G2` element `p` and outputs a byte array of size N&#61;128.

1. Let `(x,y)` be the coordinates of `p` if `p` is on the curve, or `(0,0)` otherwise.
1. Serialize `x` and `y` into `b_x[]` and `b_y[]` respectively using `FormatFq2LscLsb` (defined in the module documentation).
1. Concatenate `b_x[]` and `b_y[]` into `b[]`.
1. If `p` is the point at infinity, set the infinity bit: `b[N-1]: = b[N-1] | 0b0100_0000`.
1. If `y > -y`, set the lexicographical bit: `b[N-1]: = b[N-1] | 0b1000_0000`.
1. Return `b[]`.

Below is the deserialization procedure that takes a byte array `b[]` and outputs either a `G1` element or none.

1. If the size of `b[]` is not N, return none.
1. Compute the infinity flag as `b[N-1] & 0b0100_0000 != 0`.
1. If the infinity flag is set, return the point at infinity.
1. Deserialize `[b[0], b[1], ..., b[N/2-1]]` to `x` using `FormatFq2LscLsb`. If `x` is none, return none.
1. Deserialize `[b[N/2], ..., b[N] & 0b0011_1111]` to `y` using `FormatFq2LscLsb`. If `y` is none, return none.
1. Check if `(x,y)` is on curve `E`. If not, return none.
1. Check if `(x,y)` is in the subgroup of order `r`. If not, return none.
1. Return `(x,y)`.

NOTE: other implementation(s) using this format: ark&#45;bn254&#45;0.4.0.

```move
module 0x1::bn254_algebra {
    struct FormatG2Uncompr
}
```

<a id="0x1_bn254_algebra_FormatG2Compr"></a>

## Struct `FormatG2Compr`

A serialization scheme for `G1` elements derived from arkworks.rs

Below is the serialization procedure that takes a `G1` element `p` and outputs a byte array of size N&#61;64.

1. Let `(x,y)` be the coordinates of `p` if `p` is on the curve, or `(0,0)` otherwise.
1. Serialize `x` into `b[]` using `FormatFq2LscLsb` (defined in the module documentation).
1. If `p` is the point at infinity, set the infinity bit: `b[N-1]: = b[N-1] | 0b0100_0000`.
1. If `y > -y`, set the lexicographical flag: `b[N-1] := b[N-1] | 0x1000_0000`.
1. Return `b[]`.

Below is the deserialization procedure that takes a byte array `b[]` and outputs either a `G1` element or none.

1. If the size of `b[]` is not N, return none.
1. Compute the infinity flag as `b[N-1] & 0b0100_0000 != 0`.
1. If the infinity flag is set, return the point at infinity.
1. Compute the lexicographical flag as `b[N-1] & 0b1000_0000 != 0`.
1. Deserialize `[b[0], b[1], ..., b[N/2-1] & 0b0011_1111]` to `x` using `FormatFq2LscLsb`. If `x` is none, return none.
1. Solve the curve equation with `x` for `y`. If no such `y` exists, return none.
1. Let `y'` be `max(y,-y)` if the lexicographical flag is set, or `min(y,-y)` otherwise.
1. Check if `(x,y')` is in the subgroup of order `r`. If not, return none.
1. Return `(x,y')`.

NOTE: other implementation(s) using this format: ark&#45;bn254&#45;0.4.0.

```move
module 0x1::bn254_algebra {
    struct FormatG2Compr
}
```

<a id="0x1_bn254_algebra_Gt"></a>

## Struct `Gt`

The group $G_t$ in BN254&#45;based pairing $G_1 \times G_2 \rightarrow G_t$.
It is a multiplicative subgroup of `Fq12`, so it can upcast to `Fq12`.
with a prime order $r$ equal to 0x73eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001.
(so `Fr` is the scalar field).
The identity of `Gt` is 1.

```move
module 0x1::bn254_algebra {
    struct Gt
}
```

<a id="0x1_bn254_algebra_FormatGt"></a>

## Struct `FormatGt`

A serialization scheme for `Gt` elements.

To serialize, it treats a `Gt` element `p` as an `Fq12` element and serialize it using `FormatFq12LscLsb`.

To deserialize, it uses `FormatFq12LscLsb` to try deserializing to an `Fq12` element then test the membership in `Gt`.

NOTE: other implementation(s) using this format: ark&#45;bn254&#45;0.4.0.

```move
module 0x1::bn254_algebra {
    struct FormatGt
}
```
