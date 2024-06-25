<a id="0x1_crypto_algebra"></a>

# Module `0x1::crypto_algebra`

This module provides generic structs/functions for operations of algebraic structures (e.g. fields and groups),
which can be used to build generic cryptographic schemes atop.
E.g., a Groth16 ZK proof verifier can be built to work over any pairing supported in this module.

In general, every structure implements basic operations like (de)serialization, equality check, random sampling.

A group may also implement the following operations. (Additive group notation is assumed.)
&#45; `order()` for getting the group order.
&#45; `zero()` for getting the group identity.
&#45; `one()` for getting the group generator (if exists).
&#45; `neg()` for group element inversion.
&#45; `add()` for group operation (i.e., a group addition).
&#45; `sub()` for group element subtraction.
&#45; `double()` for efficient doubling.
&#45; `scalar_mul()` for group scalar multiplication.
&#45; `multi_scalar_mul()` for efficient group multi&#45;scalar multiplication.
&#45; `hash_to()` for hash&#45;to&#45;group.

A field may also implement the following operations.
&#45; `zero()` for getting the field additive identity.
&#45; `one()` for getting the field multiplicative identity.
&#45; `add()` for field addition.
&#45; `sub()` for field subtraction.
&#45; `mul()` for field multiplication.
&#45; `div()` for field division.
&#45; `neg()` for field negation.
&#45; `inv()` for field inversion.
&#45; `sqr()` for efficient field element squaring.
&#45; `from_u64()` for quick conversion from u64 to field element.

For 3 groups that admit a bilinear map, `pairing()` and `multi_pairing()` may be implemented.

For a subset/superset relationship between 2 structures, `upcast()` and `downcast()` may be implemented.
E.g., in BLS12&#45;381 pairing, since `Gt` is a subset of `Fq12`,
`upcast<Gt, Fq12>()` and `downcast<Fq12, Gt>()` will be supported.

See `*_algebra.move` for currently implemented algebraic structures.

- [Struct `Element`](#0x1_crypto_algebra_Element)
- [Constants](#@Constants_0)
- [Function `eq`](#0x1_crypto_algebra_eq)
- [Function `from_u64`](#0x1_crypto_algebra_from_u64)
- [Function `zero`](#0x1_crypto_algebra_zero)
- [Function `one`](#0x1_crypto_algebra_one)
- [Function `neg`](#0x1_crypto_algebra_neg)
- [Function `add`](#0x1_crypto_algebra_add)
- [Function `sub`](#0x1_crypto_algebra_sub)
- [Function `mul`](#0x1_crypto_algebra_mul)
- [Function `div`](#0x1_crypto_algebra_div)
- [Function `sqr`](#0x1_crypto_algebra_sqr)
- [Function `inv`](#0x1_crypto_algebra_inv)
- [Function `double`](#0x1_crypto_algebra_double)
- [Function `multi_scalar_mul`](#0x1_crypto_algebra_multi_scalar_mul)
- [Function `scalar_mul`](#0x1_crypto_algebra_scalar_mul)
- [Function `multi_pairing`](#0x1_crypto_algebra_multi_pairing)
- [Function `pairing`](#0x1_crypto_algebra_pairing)
- [Function `deserialize`](#0x1_crypto_algebra_deserialize)
- [Function `serialize`](#0x1_crypto_algebra_serialize)
- [Function `order`](#0x1_crypto_algebra_order)
- [Function `upcast`](#0x1_crypto_algebra_upcast)
- [Function `downcast`](#0x1_crypto_algebra_downcast)
- [Function `hash_to`](#0x1_crypto_algebra_hash_to)

```move
module 0x1::crypto_algebra {
    use 0x1::error;
    use 0x1::features;
    use 0x1::option;
}
```

<a id="0x1_crypto_algebra_Element"></a>

## Struct `Element`

This struct represents an element of a structure `S`.

```move
module 0x1::crypto_algebra {
    struct Element<S> has copy, drop
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_crypto_algebra_E_NON_EQUAL_LENGTHS"></a>

```move
module 0x1::crypto_algebra {
    const E_NON_EQUAL_LENGTHS: u64 = 2;
}
```

<a id="0x1_crypto_algebra_E_NOT_IMPLEMENTED"></a>

```move
module 0x1::crypto_algebra {
    const E_NOT_IMPLEMENTED: u64 = 1;
}
```

<a id="0x1_crypto_algebra_E_TOO_MUCH_MEMORY_USED"></a>

```move
module 0x1::crypto_algebra {
    const E_TOO_MUCH_MEMORY_USED: u64 = 3;
}
```

<a id="0x1_crypto_algebra_eq"></a>

## Function `eq`

Check if `x == y` for elements `x` and `y` of a structure `S`.

```move
module 0x1::crypto_algebra {
    public fun eq<S>(x: &crypto_algebra::Element<S>, y: &crypto_algebra::Element<S>): bool
}
```

<a id="0x1_crypto_algebra_from_u64"></a>

## Function `from_u64`

Convert a u64 to an element of a structure `S`.

```move
module 0x1::crypto_algebra {
    public fun from_u64<S>(value: u64): crypto_algebra::Element<S>
}
```

<a id="0x1_crypto_algebra_zero"></a>

## Function `zero`

Return the additive identity of field `S`, or the identity of group `S`.

```move
module 0x1::crypto_algebra {
    public fun zero<S>(): crypto_algebra::Element<S>
}
```

<a id="0x1_crypto_algebra_one"></a>

## Function `one`

Return the multiplicative identity of field `S`, or a fixed generator of group `S`.

```move
module 0x1::crypto_algebra {
    public fun one<S>(): crypto_algebra::Element<S>
}
```

<a id="0x1_crypto_algebra_neg"></a>

## Function `neg`

Compute `-x` for an element `x` of a structure `S`.

```move
module 0x1::crypto_algebra {
    public fun neg<S>(x: &crypto_algebra::Element<S>): crypto_algebra::Element<S>
}
```

<a id="0x1_crypto_algebra_add"></a>

## Function `add`

Compute `x + y` for elements `x` and `y` of structure `S`.

```move
module 0x1::crypto_algebra {
    public fun add<S>(x: &crypto_algebra::Element<S>, y: &crypto_algebra::Element<S>): crypto_algebra::Element<S>
}
```

<a id="0x1_crypto_algebra_sub"></a>

## Function `sub`

Compute `x - y` for elements `x` and `y` of a structure `S`.

```move
module 0x1::crypto_algebra {
    public fun sub<S>(x: &crypto_algebra::Element<S>, y: &crypto_algebra::Element<S>): crypto_algebra::Element<S>
}
```

<a id="0x1_crypto_algebra_mul"></a>

## Function `mul`

Compute `x * y` for elements `x` and `y` of a structure `S`.

```move
module 0x1::crypto_algebra {
    public fun mul<S>(x: &crypto_algebra::Element<S>, y: &crypto_algebra::Element<S>): crypto_algebra::Element<S>
}
```

<a id="0x1_crypto_algebra_div"></a>

## Function `div`

Try computing `x / y` for elements `x` and `y` of a structure `S`.
Return none if `y` does not have a multiplicative inverse in the structure `S`
(e.g., when `S` is a field, and `y` is zero).

```move
module 0x1::crypto_algebra {
    public fun div<S>(x: &crypto_algebra::Element<S>, y: &crypto_algebra::Element<S>): option::Option<crypto_algebra::Element<S>>
}
```

<a id="0x1_crypto_algebra_sqr"></a>

## Function `sqr`

Compute `x^2` for an element `x` of a structure `S`. Faster and cheaper than `mul(x, x)`.

```move
module 0x1::crypto_algebra {
    public fun sqr<S>(x: &crypto_algebra::Element<S>): crypto_algebra::Element<S>
}
```

<a id="0x1_crypto_algebra_inv"></a>

## Function `inv`

Try computing `x^(-1)` for an element `x` of a structure `S`.
Return none if `x` does not have a multiplicative inverse in the structure `S`
(e.g., when `S` is a field, and `x` is zero).

```move
module 0x1::crypto_algebra {
    public fun inv<S>(x: &crypto_algebra::Element<S>): option::Option<crypto_algebra::Element<S>>
}
```

<a id="0x1_crypto_algebra_double"></a>

## Function `double`

Compute `2*P` for an element `P` of a structure `S`. Faster and cheaper than `add(P, P)`.

```move
module 0x1::crypto_algebra {
    public fun double<S>(element_p: &crypto_algebra::Element<S>): crypto_algebra::Element<S>
}
```

<a id="0x1_crypto_algebra_multi_scalar_mul"></a>

## Function `multi_scalar_mul`

Compute `k[0]*P[0]+...+k[n-1]*P[n-1]`, where
`P[]` are `n` elements of group `G` represented by parameter `elements`, and
`k[]` are `n` elements of the scalarfield `S` of group `G` represented by parameter `scalars`.

Abort with code `std::error::invalid_argument(E_NON_EQUAL_LENGTHS)` if the sizes of `elements` and `scalars` do not match.

```move
module 0x1::crypto_algebra {
    public fun multi_scalar_mul<G, S>(elements: &vector<crypto_algebra::Element<G>>, scalars: &vector<crypto_algebra::Element<S>>): crypto_algebra::Element<G>
}
```

<a id="0x1_crypto_algebra_scalar_mul"></a>

## Function `scalar_mul`

Compute `k*P`, where `P` is an element of a group `G` and `k` is an element of the scalar field `S` associated to the group `G`.

```move
module 0x1::crypto_algebra {
    public fun scalar_mul<G, S>(element_p: &crypto_algebra::Element<G>, scalar_k: &crypto_algebra::Element<S>): crypto_algebra::Element<G>
}
```

<a id="0x1_crypto_algebra_multi_pairing"></a>

## Function `multi_pairing`

Efficiently compute `e(P[0],Q[0])+...+e(P[n-1],Q[n-1])`,
where `e: (G1,G2) -> (Gt)` is the pairing function from groups `(G1,G2)` to group `Gt`,
`P[]` are `n` elements of group `G1` represented by parameter `g1_elements`, and
`Q[]` are `n` elements of group `G2` represented by parameter `g2_elements`.

Abort with code `std::error::invalid_argument(E_NON_EQUAL_LENGTHS)` if the sizes of `g1_elements` and `g2_elements` do not match.

NOTE: we are viewing the target group `Gt` of the pairing as an additive group,
rather than a multiplicative one (which is typically the case).

```move
module 0x1::crypto_algebra {
    public fun multi_pairing<G1, G2, Gt>(g1_elements: &vector<crypto_algebra::Element<G1>>, g2_elements: &vector<crypto_algebra::Element<G2>>): crypto_algebra::Element<Gt>
}
```

<a id="0x1_crypto_algebra_pairing"></a>

## Function `pairing`

Compute the pairing function (a.k.a., bilinear map) on a `G1` element and a `G2` element.
Return an element in the target group `Gt`.

```move
module 0x1::crypto_algebra {
    public fun pairing<G1, G2, Gt>(element_1: &crypto_algebra::Element<G1>, element_2: &crypto_algebra::Element<G2>): crypto_algebra::Element<Gt>
}
```

<a id="0x1_crypto_algebra_deserialize"></a>

## Function `deserialize`

Try deserializing a byte array to an element of an algebraic structure `S` using a given serialization format `F`.
Return none if the deserialization failed.

```move
module 0x1::crypto_algebra {
    public fun deserialize<S, F>(bytes: &vector<u8>): option::Option<crypto_algebra::Element<S>>
}
```

<a id="0x1_crypto_algebra_serialize"></a>

## Function `serialize`

Serialize an element of an algebraic structure `S` to a byte array using a given serialization format `F`.

```move
module 0x1::crypto_algebra {
    public fun serialize<S, F>(element: &crypto_algebra::Element<S>): vector<u8>
}
```

<a id="0x1_crypto_algebra_order"></a>

## Function `order`

Get the order of structure `S`, a big integer little&#45;endian encoded as a byte array.

```move
module 0x1::crypto_algebra {
    public fun order<S>(): vector<u8>
}
```

<a id="0x1_crypto_algebra_upcast"></a>

## Function `upcast`

Cast an element of a structure `S` to a parent structure `L`.

```move
module 0x1::crypto_algebra {
    public fun upcast<S, L>(element: &crypto_algebra::Element<S>): crypto_algebra::Element<L>
}
```

<a id="0x1_crypto_algebra_downcast"></a>

## Function `downcast`

Try casting an element `x` of a structure `L` to a sub&#45;structure `S`.
Return none if `x` is not a member of `S`.

NOTE: Membership check in `S` is performed inside, which can be expensive, depending on the structures `L` and `S`.

```move
module 0x1::crypto_algebra {
    public fun downcast<L, S>(element_x: &crypto_algebra::Element<L>): option::Option<crypto_algebra::Element<S>>
}
```

<a id="0x1_crypto_algebra_hash_to"></a>

## Function `hash_to`

Hash an arbitrary&#45;length byte array `msg` into structure `S` with a domain separation tag `dst`
using the given hash&#45;to&#45;structure suite `H`.

NOTE: some hashing methods do not accept a `dst` and will abort if a non&#45;empty one is provided.

```move
module 0x1::crypto_algebra {
    public fun hash_to<S, H>(dst: &vector<u8>, msg: &vector<u8>): crypto_algebra::Element<S>
}
```
