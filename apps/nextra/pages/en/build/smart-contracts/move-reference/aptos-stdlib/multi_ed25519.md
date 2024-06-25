<a id="0x1_multi_ed25519"></a>

# Module `0x1::multi_ed25519`

Exports MultiEd25519 multi&#45;signatures in Move.
This module has the exact same interface as the Ed25519 module.

- [Struct `UnvalidatedPublicKey`](#0x1_multi_ed25519_UnvalidatedPublicKey)
- [Struct `ValidatedPublicKey`](#0x1_multi_ed25519_ValidatedPublicKey)
- [Struct `Signature`](#0x1_multi_ed25519_Signature)
- [Constants](#@Constants_0)
- [Function `new_unvalidated_public_key_from_bytes`](#0x1_multi_ed25519_new_unvalidated_public_key_from_bytes)
- [Function `new_validated_public_key_from_bytes`](#0x1_multi_ed25519_new_validated_public_key_from_bytes)
- [Function `new_validated_public_key_from_bytes_v2`](#0x1_multi_ed25519_new_validated_public_key_from_bytes_v2)
- [Function `new_signature_from_bytes`](#0x1_multi_ed25519_new_signature_from_bytes)
- [Function `public_key_to_unvalidated`](#0x1_multi_ed25519_public_key_to_unvalidated)
- [Function `public_key_into_unvalidated`](#0x1_multi_ed25519_public_key_into_unvalidated)
- [Function `unvalidated_public_key_to_bytes`](#0x1_multi_ed25519_unvalidated_public_key_to_bytes)
- [Function `validated_public_key_to_bytes`](#0x1_multi_ed25519_validated_public_key_to_bytes)
- [Function `signature_to_bytes`](#0x1_multi_ed25519_signature_to_bytes)
- [Function `public_key_validate`](#0x1_multi_ed25519_public_key_validate)
- [Function `public_key_validate_v2`](#0x1_multi_ed25519_public_key_validate_v2)
- [Function `signature_verify_strict`](#0x1_multi_ed25519_signature_verify_strict)
- [Function `signature_verify_strict_t`](#0x1_multi_ed25519_signature_verify_strict_t)
- [Function `unvalidated_public_key_to_authentication_key`](#0x1_multi_ed25519_unvalidated_public_key_to_authentication_key)
- [Function `unvalidated_public_key_num_sub_pks`](#0x1_multi_ed25519_unvalidated_public_key_num_sub_pks)
- [Function `unvalidated_public_key_threshold`](#0x1_multi_ed25519_unvalidated_public_key_threshold)
- [Function `validated_public_key_to_authentication_key`](#0x1_multi_ed25519_validated_public_key_to_authentication_key)
- [Function `validated_public_key_num_sub_pks`](#0x1_multi_ed25519_validated_public_key_num_sub_pks)
- [Function `validated_public_key_threshold`](#0x1_multi_ed25519_validated_public_key_threshold)
- [Function `check_and_get_threshold`](#0x1_multi_ed25519_check_and_get_threshold)

```move
module 0x1::multi_ed25519 {
    use 0x1::bcs;
    use 0x1::ed25519;
    use 0x1::error;
    use 0x1::features;
    use 0x1::hash;
    use 0x1::option;
}
```

<a id="0x1_multi_ed25519_UnvalidatedPublicKey"></a>

## Struct `UnvalidatedPublicKey`

An \*unvalidated\*, k out of n MultiEd25519 public key. The `bytes` field contains (1) several chunks of
`ed25519::PUBLIC_KEY_NUM_BYTES` bytes, each encoding a Ed25519 PK, and (2) a single byte encoding the threshold k.
\*Unvalidated\* means there is no guarantee that the underlying PKs are valid elliptic curve points of non&#45;small
order.

```move
module 0x1::multi_ed25519 {
    struct UnvalidatedPublicKey has copy, drop, store
}
```

<a id="0x1_multi_ed25519_ValidatedPublicKey"></a>

## Struct `ValidatedPublicKey`

A \*validated\* k out of n MultiEd25519 public key. \*Validated\* means that all the underlying PKs will be
elliptic curve points that are NOT of small&#45;order. It does not necessarily mean they will be prime&#45;order points.
This struct encodes the public key exactly as `UnvalidatedPublicKey`.

For now, this struct is not used in any verification functions, but it might be in the future.

```move
module 0x1::multi_ed25519 {
    struct ValidatedPublicKey has copy, drop, store
}
```

<a id="0x1_multi_ed25519_Signature"></a>

## Struct `Signature`

A purported MultiEd25519 multi&#45;signature that can be verified via `signature_verify_strict` or
`signature_verify_strict_t`. The `bytes` field contains (1) several chunks of `ed25519::SIGNATURE_NUM_BYTES`
bytes, each encoding a Ed25519 signature, and (2) a `BITMAP_NUM_OF_BYTES`&#45;byte bitmap encoding the signer
identities.

```move
module 0x1::multi_ed25519 {
    struct Signature has copy, drop, store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_multi_ed25519_E_NATIVE_FUN_NOT_AVAILABLE"></a>

The native functions have not been rolled out yet.

```move
module 0x1::multi_ed25519 {
    const E_NATIVE_FUN_NOT_AVAILABLE: u64 = 4;
}
```

<a id="0x1_multi_ed25519_E_WRONG_PUBKEY_SIZE"></a>

Wrong number of bytes were given as input when deserializing an Ed25519 public key.

```move
module 0x1::multi_ed25519 {
    const E_WRONG_PUBKEY_SIZE: u64 = 1;
}
```

<a id="0x1_multi_ed25519_E_WRONG_SIGNATURE_SIZE"></a>

Wrong number of bytes were given as input when deserializing an Ed25519 signature.

```move
module 0x1::multi_ed25519 {
    const E_WRONG_SIGNATURE_SIZE: u64 = 2;
}
```

<a id="0x1_multi_ed25519_SIGNATURE_SCHEME_ID"></a>

The identifier of the MultiEd25519 signature scheme, which is used when deriving Aptos authentication keys by hashing
it together with an MultiEd25519 public key.

```move
module 0x1::multi_ed25519 {
    const SIGNATURE_SCHEME_ID: u8 = 1;
}
```

<a id="0x1_multi_ed25519_BITMAP_NUM_OF_BYTES"></a>

When serializing a MultiEd25519 signature, the bitmap that indicates the signers will be encoded using this many
bytes.

```move
module 0x1::multi_ed25519 {
    const BITMAP_NUM_OF_BYTES: u64 = 4;
}
```

<a id="0x1_multi_ed25519_E_INVALID_THRESHOLD_OR_NUMBER_OF_SIGNERS"></a>

The threshold must be in the range `[1, n]`, where n is the total number of signers.

```move
module 0x1::multi_ed25519 {
    const E_INVALID_THRESHOLD_OR_NUMBER_OF_SIGNERS: u64 = 3;
}
```

<a id="0x1_multi_ed25519_INDIVIDUAL_PUBLIC_KEY_NUM_BYTES"></a>

The size of an individual Ed25519 public key, in bytes.
(A MultiEd25519 public key consists of several of these, plus the threshold.)

```move
module 0x1::multi_ed25519 {
    const INDIVIDUAL_PUBLIC_KEY_NUM_BYTES: u64 = 32;
}
```

<a id="0x1_multi_ed25519_INDIVIDUAL_SIGNATURE_NUM_BYTES"></a>

The size of an individual Ed25519 signature, in bytes.
(A MultiEd25519 signature consists of several of these, plus the signer bitmap.)

```move
module 0x1::multi_ed25519 {
    const INDIVIDUAL_SIGNATURE_NUM_BYTES: u64 = 64;
}
```

<a id="0x1_multi_ed25519_MAX_NUMBER_OF_PUBLIC_KEYS"></a>

Max number of ed25519 public keys allowed in multi&#45;ed25519 keys

```move
module 0x1::multi_ed25519 {
    const MAX_NUMBER_OF_PUBLIC_KEYS: u64 = 32;
}
```

<a id="0x1_multi_ed25519_THRESHOLD_SIZE_BYTES"></a>

When serializing a MultiEd25519 public key, the threshold k will be encoded using this many bytes.

```move
module 0x1::multi_ed25519 {
    const THRESHOLD_SIZE_BYTES: u64 = 1;
}
```

<a id="0x1_multi_ed25519_new_unvalidated_public_key_from_bytes"></a>

## Function `new_unvalidated_public_key_from_bytes`

Parses the input 32 bytes as an \*unvalidated\* MultiEd25519 public key.

NOTE: This function could have also checked that the # of sub&#45;PKs is &gt; 0, but it did not. However, since such
invalid PKs are rejected during signature verification (see `bugfix_unvalidated_pk_from_zero_subpks`) they
will not cause problems.

We could fix this API by adding a new one that checks the # of sub&#45;PKs is &gt; 0, but it is likely not a good idea
to reproduce the PK validation logic in Move. We should not have done so in the first place. Instead, we will
leave it as is and continue assuming `UnvalidatedPublicKey` objects could be invalid PKs that will safely be
rejected during signature verification.

```move
module 0x1::multi_ed25519 {
    public fun new_unvalidated_public_key_from_bytes(bytes: vector<u8>): multi_ed25519::UnvalidatedPublicKey
}
```

<a id="0x1_multi_ed25519_new_validated_public_key_from_bytes"></a>

## Function `new_validated_public_key_from_bytes`

DEPRECATED: Use `new_validated_public_key_from_bytes_v2` instead. See `public_key_validate_internal` comments.

(Incorrectly) parses the input bytes as a \*validated\* MultiEd25519 public key.

```move
module 0x1::multi_ed25519 {
    public fun new_validated_public_key_from_bytes(bytes: vector<u8>): option::Option<multi_ed25519::ValidatedPublicKey>
}
```

<a id="0x1_multi_ed25519_new_validated_public_key_from_bytes_v2"></a>

## Function `new_validated_public_key_from_bytes_v2`

Parses the input bytes as a \*validated\* MultiEd25519 public key (see `public_key_validate_internal_v2`).

```move
module 0x1::multi_ed25519 {
    public fun new_validated_public_key_from_bytes_v2(bytes: vector<u8>): option::Option<multi_ed25519::ValidatedPublicKey>
}
```

<a id="0x1_multi_ed25519_new_signature_from_bytes"></a>

## Function `new_signature_from_bytes`

Parses the input bytes as a purported MultiEd25519 multi&#45;signature.

```move
module 0x1::multi_ed25519 {
    public fun new_signature_from_bytes(bytes: vector<u8>): multi_ed25519::Signature
}
```

<a id="0x1_multi_ed25519_public_key_to_unvalidated"></a>

## Function `public_key_to_unvalidated`

Converts a ValidatedPublicKey to an UnvalidatedPublicKey, which can be used in the strict verification APIs.

```move
module 0x1::multi_ed25519 {
    public fun public_key_to_unvalidated(pk: &multi_ed25519::ValidatedPublicKey): multi_ed25519::UnvalidatedPublicKey
}
```

<a id="0x1_multi_ed25519_public_key_into_unvalidated"></a>

## Function `public_key_into_unvalidated`

Moves a ValidatedPublicKey into an UnvalidatedPublicKey, which can be used in the strict verification APIs.

```move
module 0x1::multi_ed25519 {
    public fun public_key_into_unvalidated(pk: multi_ed25519::ValidatedPublicKey): multi_ed25519::UnvalidatedPublicKey
}
```

<a id="0x1_multi_ed25519_unvalidated_public_key_to_bytes"></a>

## Function `unvalidated_public_key_to_bytes`

Serializes an UnvalidatedPublicKey struct to 32&#45;bytes.

```move
module 0x1::multi_ed25519 {
    public fun unvalidated_public_key_to_bytes(pk: &multi_ed25519::UnvalidatedPublicKey): vector<u8>
}
```

<a id="0x1_multi_ed25519_validated_public_key_to_bytes"></a>

## Function `validated_public_key_to_bytes`

Serializes a ValidatedPublicKey struct to 32&#45;bytes.

```move
module 0x1::multi_ed25519 {
    public fun validated_public_key_to_bytes(pk: &multi_ed25519::ValidatedPublicKey): vector<u8>
}
```

<a id="0x1_multi_ed25519_signature_to_bytes"></a>

## Function `signature_to_bytes`

Serializes a Signature struct to 64&#45;bytes.

```move
module 0x1::multi_ed25519 {
    public fun signature_to_bytes(sig: &multi_ed25519::Signature): vector<u8>
}
```

<a id="0x1_multi_ed25519_public_key_validate"></a>

## Function `public_key_validate`

DEPRECATED: Use `public_key_validate_v2` instead. See `public_key_validate_internal` comments.

Takes in an \*unvalidated\* public key and attempts to validate it.
Returns `Some(ValidatedPublicKey)` if successful and `None` otherwise.

```move
module 0x1::multi_ed25519 {
    public fun public_key_validate(pk: &multi_ed25519::UnvalidatedPublicKey): option::Option<multi_ed25519::ValidatedPublicKey>
}
```

<a id="0x1_multi_ed25519_public_key_validate_v2"></a>

## Function `public_key_validate_v2`

Takes in an \*unvalidated\* public key and attempts to validate it.
Returns `Some(ValidatedPublicKey)` if successful and `None` otherwise.

```move
module 0x1::multi_ed25519 {
    public fun public_key_validate_v2(pk: &multi_ed25519::UnvalidatedPublicKey): option::Option<multi_ed25519::ValidatedPublicKey>
}
```

<a id="0x1_multi_ed25519_signature_verify_strict"></a>

## Function `signature_verify_strict`

Verifies a purported MultiEd25519 `multisignature` under an \*unvalidated\* `public_key` on the specified `message`.
This call will validate the public key by checking it is NOT in the small subgroup.

```move
module 0x1::multi_ed25519 {
    public fun signature_verify_strict(multisignature: &multi_ed25519::Signature, public_key: &multi_ed25519::UnvalidatedPublicKey, message: vector<u8>): bool
}
```

<a id="0x1_multi_ed25519_signature_verify_strict_t"></a>

## Function `signature_verify_strict_t`

This function is used to verify a multi&#45;signature on any BCS&#45;serializable type T. For now, it is used to verify the
proof of private key ownership when rotating authentication keys.

```move
module 0x1::multi_ed25519 {
    public fun signature_verify_strict_t<T: drop>(multisignature: &multi_ed25519::Signature, public_key: &multi_ed25519::UnvalidatedPublicKey, data: T): bool
}
```

<a id="0x1_multi_ed25519_unvalidated_public_key_to_authentication_key"></a>

## Function `unvalidated_public_key_to_authentication_key`

Derives the Aptos&#45;specific authentication key of the given Ed25519 public key.

```move
module 0x1::multi_ed25519 {
    public fun unvalidated_public_key_to_authentication_key(pk: &multi_ed25519::UnvalidatedPublicKey): vector<u8>
}
```

<a id="0x1_multi_ed25519_unvalidated_public_key_num_sub_pks"></a>

## Function `unvalidated_public_key_num_sub_pks`

Returns the number n of sub&#45;PKs in an unvalidated t&#45;out&#45;of&#45;n MultiEd25519 PK.
If this `UnvalidatedPublicKey` would pass validation in `public_key_validate`, then the returned # of sub&#45;PKs
can be relied upon as correct.

We provide this API as a cheaper alternative to calling `public_key_validate` and then `validated_public_key_num_sub_pks`
when the input `pk` is known to be valid.

```move
module 0x1::multi_ed25519 {
    public fun unvalidated_public_key_num_sub_pks(pk: &multi_ed25519::UnvalidatedPublicKey): u8
}
```

<a id="0x1_multi_ed25519_unvalidated_public_key_threshold"></a>

## Function `unvalidated_public_key_threshold`

Returns the number t of sub&#45;PKs in an unvalidated t&#45;out&#45;of&#45;n MultiEd25519 PK (i.e., the threshold) or `None`
if `bytes` does not correctly encode such a PK.

```move
module 0x1::multi_ed25519 {
    public fun unvalidated_public_key_threshold(pk: &multi_ed25519::UnvalidatedPublicKey): option::Option<u8>
}
```

<a id="0x1_multi_ed25519_validated_public_key_to_authentication_key"></a>

## Function `validated_public_key_to_authentication_key`

Derives the Aptos&#45;specific authentication key of the given Ed25519 public key.

```move
module 0x1::multi_ed25519 {
    public fun validated_public_key_to_authentication_key(pk: &multi_ed25519::ValidatedPublicKey): vector<u8>
}
```

<a id="0x1_multi_ed25519_validated_public_key_num_sub_pks"></a>

## Function `validated_public_key_num_sub_pks`

Returns the number n of sub&#45;PKs in a validated t&#45;out&#45;of&#45;n MultiEd25519 PK.
Since the format of this PK has been validated, the returned # of sub&#45;PKs is guaranteed to be correct.

```move
module 0x1::multi_ed25519 {
    public fun validated_public_key_num_sub_pks(pk: &multi_ed25519::ValidatedPublicKey): u8
}
```

<a id="0x1_multi_ed25519_validated_public_key_threshold"></a>

## Function `validated_public_key_threshold`

Returns the number t of sub&#45;PKs in a validated t&#45;out&#45;of&#45;n MultiEd25519 PK (i.e., the threshold).

```move
module 0x1::multi_ed25519 {
    public fun validated_public_key_threshold(pk: &multi_ed25519::ValidatedPublicKey): u8
}
```

<a id="0x1_multi_ed25519_check_and_get_threshold"></a>

## Function `check_and_get_threshold`

Checks that the serialized format of a t&#45;out&#45;of&#45;n MultiEd25519 PK correctly encodes 1 &lt;&#61; n &lt;&#61; 32 sub&#45;PKs.
(All `ValidatedPublicKey` objects are guaranteed to pass this check.)
Returns the threshold t &lt;&#61; n of the PK.

```move
module 0x1::multi_ed25519 {
    public fun check_and_get_threshold(bytes: vector<u8>): option::Option<u8>
}
```
