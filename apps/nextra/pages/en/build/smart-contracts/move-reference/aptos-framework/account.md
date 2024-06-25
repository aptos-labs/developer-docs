<a id="0x1_account"></a>

# Module `0x1::account`

- [Struct `KeyRotation`](#0x1_account_KeyRotation)
- [Resource `Account`](#0x1_account_Account)
- [Struct `KeyRotationEvent`](#0x1_account_KeyRotationEvent)
- [Struct `CoinRegisterEvent`](#0x1_account_CoinRegisterEvent)
- [Struct `CapabilityOffer`](#0x1_account_CapabilityOffer)
- [Struct `RotationCapability`](#0x1_account_RotationCapability)
- [Struct `SignerCapability`](#0x1_account_SignerCapability)
- [Resource `OriginatingAddress`](#0x1_account_OriginatingAddress)
- [Struct `RotationProofChallenge`](#0x1_account_RotationProofChallenge)
- [Struct `RotationCapabilityOfferProofChallenge`](#0x1_account_RotationCapabilityOfferProofChallenge)
- [Struct `SignerCapabilityOfferProofChallenge`](#0x1_account_SignerCapabilityOfferProofChallenge)
- [Struct `RotationCapabilityOfferProofChallengeV2`](#0x1_account_RotationCapabilityOfferProofChallengeV2)
- [Struct `SignerCapabilityOfferProofChallengeV2`](#0x1_account_SignerCapabilityOfferProofChallengeV2)
- [Constants](#@Constants_0)
- [Function `initialize`](#0x1_account_initialize)
- [Function `create_account_if_does_not_exist`](#0x1_account_create_account_if_does_not_exist)
- [Function `create_account`](#0x1_account_create_account)
- [Function `exists_at`](#0x1_account_exists_at)
- [Function `get_guid_next_creation_num`](#0x1_account_get_guid_next_creation_num)
- [Function `get_sequence_number`](#0x1_account_get_sequence_number)
- [Function `increment_sequence_number`](#0x1_account_increment_sequence_number)
- [Function `get_authentication_key`](#0x1_account_get_authentication_key)
- [Function `rotate_authentication_key_internal`](#0x1_account_rotate_authentication_key_internal)
- [Function `rotate_authentication_key_call`](#0x1_account_rotate_authentication_key_call)
- [Function `rotate_authentication_key`](#0x1_account_rotate_authentication_key)
- [Function `rotate_authentication_key_with_rotation_capability`](#0x1_account_rotate_authentication_key_with_rotation_capability)
- [Function `offer_rotation_capability`](#0x1_account_offer_rotation_capability)
- [Function `is_rotation_capability_offered`](#0x1_account_is_rotation_capability_offered)
- [Function `get_rotation_capability_offer_for`](#0x1_account_get_rotation_capability_offer_for)
- [Function `revoke_rotation_capability`](#0x1_account_revoke_rotation_capability)
- [Function `revoke_any_rotation_capability`](#0x1_account_revoke_any_rotation_capability)
- [Function `offer_signer_capability`](#0x1_account_offer_signer_capability)
- [Function `is_signer_capability_offered`](#0x1_account_is_signer_capability_offered)
- [Function `get_signer_capability_offer_for`](#0x1_account_get_signer_capability_offer_for)
- [Function `revoke_signer_capability`](#0x1_account_revoke_signer_capability)
- [Function `revoke_any_signer_capability`](#0x1_account_revoke_any_signer_capability)
- [Function `create_authorized_signer`](#0x1_account_create_authorized_signer)
- [Function `create_resource_address`](#0x1_account_create_resource_address)
- [Function `create_resource_account`](#0x1_account_create_resource_account)
- [Function `create_framework_reserved_account`](#0x1_account_create_framework_reserved_account)
- [Function `create_guid`](#0x1_account_create_guid)
- [Function `new_event_handle`](#0x1_account_new_event_handle)
- [Function `register_coin`](#0x1_account_register_coin)
- [Function `create_signer_with_capability`](#0x1_account_create_signer_with_capability)
- [Function `get_signer_capability_address`](#0x1_account_get_signer_capability_address)
- [Function `verify_signed_message`](#0x1_account_verify_signed_message)

```move
module 0x1::account {
    use 0x1::bcs;
    use 0x1::chain_id;
    use 0x1::create_signer;
    use 0x1::ed25519;
    use 0x1::error;
    use 0x1::event;
    use 0x1::features;
    use 0x1::from_bcs;
    use 0x1::guid;
    use 0x1::hash;
    use 0x1::multi_ed25519;
    use 0x1::option;
    use 0x1::signer;
    use 0x1::system_addresses;
    use 0x1::table;
    use 0x1::type_info;
    use 0x1::vector;
}
```

<a id="0x1_account_KeyRotation"></a>

## Struct `KeyRotation`

```move
module 0x1::account {
    #[event]
    struct KeyRotation has drop, store
}
```

<a id="0x1_account_Account"></a>

## Resource `Account`

Resource representing an account.

```move
module 0x1::account {
    struct Account has store, key
}
```

<a id="0x1_account_KeyRotationEvent"></a>

## Struct `KeyRotationEvent`

```move
module 0x1::account {
    struct KeyRotationEvent has drop, store
}
```

<a id="0x1_account_CoinRegisterEvent"></a>

## Struct `CoinRegisterEvent`

```move
module 0x1::account {
    struct CoinRegisterEvent has drop, store
}
```

<a id="0x1_account_CapabilityOffer"></a>

## Struct `CapabilityOffer`

```move
module 0x1::account {
    struct CapabilityOffer<T> has store
}
```

<a id="0x1_account_RotationCapability"></a>

## Struct `RotationCapability`

```move
module 0x1::account {
    struct RotationCapability has drop, store
}
```

<a id="0x1_account_SignerCapability"></a>

## Struct `SignerCapability`

```move
module 0x1::account {
    struct SignerCapability has drop, store
}
```

<a id="0x1_account_OriginatingAddress"></a>

## Resource `OriginatingAddress`

It is easy to fetch the authentication key of an address by simply reading it from the `Account` struct at that address.
The table in this struct makes it possible to do a reverse lookup: it maps an authentication key, to the address of the account which has that authentication key set.

This mapping is needed when recovering wallets for accounts whose authentication key has been rotated.

For example, imagine a freshly&#45;created wallet with address `a` and thus also with authentication key `a`, derived from a PK `pk_a` with corresponding SK `sk_a`.
It is easy to recover such a wallet given just the secret key `sk_a`, since the PK can be derived from the SK, the authentication key can then be derived from the PK, and the address equals the authentication key (since there was no key rotation).

However, if such a wallet rotates its authentication key to `b` derived from a different PK `pk_b` with SK `sk_b`, how would account recovery work?
The recovered address would no longer be &apos;a&apos;; it would be `b`, which is incorrect.
This struct solves this problem by mapping the new authentication key `b` to the original address `a` and thus helping the wallet software during recovery find the correct address.

```move
module 0x1::account {
    struct OriginatingAddress has key
}
```

<a id="0x1_account_RotationProofChallenge"></a>

## Struct `RotationProofChallenge`

This structs stores the challenge message that should be signed during key rotation. First, this struct is
signed by the account owner&apos;s current public key, which proves possession of a capability to rotate the key.
Second, this struct is signed by the new public key that the account owner wants to rotate to, which proves
knowledge of this new public key&apos;s associated secret key. These two signatures cannot be replayed in another
context because they include the TXN&apos;s unique sequence number.

```move
module 0x1::account {
    struct RotationProofChallenge has copy, drop
}
```

<a id="0x1_account_RotationCapabilityOfferProofChallenge"></a>

## Struct `RotationCapabilityOfferProofChallenge`

Deprecated struct &#45; newest version is `RotationCapabilityOfferProofChallengeV2`

```move
module 0x1::account {
    struct RotationCapabilityOfferProofChallenge has drop
}
```

<a id="0x1_account_SignerCapabilityOfferProofChallenge"></a>

## Struct `SignerCapabilityOfferProofChallenge`

Deprecated struct &#45; newest version is `SignerCapabilityOfferProofChallengeV2`

```move
module 0x1::account {
    struct SignerCapabilityOfferProofChallenge has drop
}
```

<a id="0x1_account_RotationCapabilityOfferProofChallengeV2"></a>

## Struct `RotationCapabilityOfferProofChallengeV2`

This struct stores the challenge message that should be signed by the source account, when the source account
is delegating its rotation capability to the `recipient_address`.
This V2 struct adds the `chain_id` and `source_address` to the challenge message, which prevents replaying the challenge message.

```move
module 0x1::account {
    struct RotationCapabilityOfferProofChallengeV2 has drop
}
```

<a id="0x1_account_SignerCapabilityOfferProofChallengeV2"></a>

## Struct `SignerCapabilityOfferProofChallengeV2`

```move
module 0x1::account {
    struct SignerCapabilityOfferProofChallengeV2 has copy, drop
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_account_MAX_U64"></a>

```move
module 0x1::account {
    const MAX_U64: u128 = 18446744073709551615;
}
```

<a id="0x1_account_DERIVE_RESOURCE_ACCOUNT_SCHEME"></a>

Scheme identifier used when hashing an account&apos;s address together with a seed to derive the address (not the
authentication key) of a resource account. This is an abuse of the notion of a scheme identifier which, for now,
serves to domain separate hashes used to derive resource account addresses from hashes used to derive
authentication keys. Without such separation, an adversary could create (and get a signer for) a resource account
whose address matches an existing address of a MultiEd25519 wallet.

```move
module 0x1::account {
    const DERIVE_RESOURCE_ACCOUNT_SCHEME: u8 = 255;
}
```

<a id="0x1_account_EACCOUNT_ALREADY_EXISTS"></a>

Account already exists

```move
module 0x1::account {
    const EACCOUNT_ALREADY_EXISTS: u64 = 1;
}
```

<a id="0x1_account_EACCOUNT_ALREADY_USED"></a>

An attempt to create a resource account on an account that has a committed transaction

```move
module 0x1::account {
    const EACCOUNT_ALREADY_USED: u64 = 16;
}
```

<a id="0x1_account_EACCOUNT_DOES_NOT_EXIST"></a>

Account does not exist

```move
module 0x1::account {
    const EACCOUNT_DOES_NOT_EXIST: u64 = 2;
}
```

<a id="0x1_account_ECANNOT_RESERVED_ADDRESS"></a>

Cannot create account because address is reserved

```move
module 0x1::account {
    const ECANNOT_RESERVED_ADDRESS: u64 = 5;
}
```

<a id="0x1_account_ED25519_SCHEME"></a>

Scheme identifier for Ed25519 signatures used to derive authentication keys for Ed25519 public keys.

```move
module 0x1::account {
    const ED25519_SCHEME: u8 = 0;
}
```

<a id="0x1_account_EEXCEEDED_MAX_GUID_CREATION_NUM"></a>

```move
module 0x1::account {
    const EEXCEEDED_MAX_GUID_CREATION_NUM: u64 = 20;
}
```

<a id="0x1_account_EINVALID_ACCEPT_ROTATION_CAPABILITY"></a>

The caller does not have a valid rotation capability offer from the other account

```move
module 0x1::account {
    const EINVALID_ACCEPT_ROTATION_CAPABILITY: u64 = 10;
}
```

<a id="0x1_account_EINVALID_ORIGINATING_ADDRESS"></a>

Abort the transaction if the expected originating address is different from the originating address on&#45;chain

```move
module 0x1::account {
    const EINVALID_ORIGINATING_ADDRESS: u64 = 13;
}
```

<a id="0x1_account_EINVALID_PROOF_OF_KNOWLEDGE"></a>

Specified proof of knowledge required to prove ownership of a public key is invalid

```move
module 0x1::account {
    const EINVALID_PROOF_OF_KNOWLEDGE: u64 = 8;
}
```

<a id="0x1_account_EINVALID_SCHEME"></a>

Specified scheme required to proceed with the smart contract operation &#45; can only be ED25519_SCHEME(0) OR MULTI_ED25519_SCHEME(1)

```move
module 0x1::account {
    const EINVALID_SCHEME: u64 = 12;
}
```

<a id="0x1_account_EMALFORMED_AUTHENTICATION_KEY"></a>

The provided authentication key has an invalid length

```move
module 0x1::account {
    const EMALFORMED_AUTHENTICATION_KEY: u64 = 4;
}
```

<a id="0x1_account_ENO_CAPABILITY"></a>

The caller does not have a digital&#45;signature&#45;based capability to call this function

```move
module 0x1::account {
    const ENO_CAPABILITY: u64 = 9;
}
```

<a id="0x1_account_ENO_SIGNER_CAPABILITY_OFFERED"></a>

```move
module 0x1::account {
    const ENO_SIGNER_CAPABILITY_OFFERED: u64 = 19;
}
```

<a id="0x1_account_ENO_SUCH_ROTATION_CAPABILITY_OFFER"></a>

The specified rotation capablity offer does not exist at the specified offerer address

```move
module 0x1::account {
    const ENO_SUCH_ROTATION_CAPABILITY_OFFER: u64 = 18;
}
```

<a id="0x1_account_ENO_SUCH_SIGNER_CAPABILITY"></a>

The signer capability offer doesn&apos;t exist at the given address

```move
module 0x1::account {
    const ENO_SUCH_SIGNER_CAPABILITY: u64 = 14;
}
```

<a id="0x1_account_ENO_VALID_FRAMEWORK_RESERVED_ADDRESS"></a>

Address to create is not a valid reserved address for Aptos framework

```move
module 0x1::account {
    const ENO_VALID_FRAMEWORK_RESERVED_ADDRESS: u64 = 11;
}
```

<a id="0x1_account_EOFFERER_ADDRESS_DOES_NOT_EXIST"></a>

Offerer address doesn&apos;t exist

```move
module 0x1::account {
    const EOFFERER_ADDRESS_DOES_NOT_EXIST: u64 = 17;
}
```

<a id="0x1_account_EOUT_OF_GAS"></a>

Transaction exceeded its allocated max gas

```move
module 0x1::account {
    const EOUT_OF_GAS: u64 = 6;
}
```

<a id="0x1_account_ERESOURCE_ACCCOUNT_EXISTS"></a>

An attempt to create a resource account on a claimed account

```move
module 0x1::account {
    const ERESOURCE_ACCCOUNT_EXISTS: u64 = 15;
}
```

<a id="0x1_account_ESEQUENCE_NUMBER_TOO_BIG"></a>

Sequence number exceeds the maximum value for a u64

```move
module 0x1::account {
    const ESEQUENCE_NUMBER_TOO_BIG: u64 = 3;
}
```

<a id="0x1_account_EWRONG_CURRENT_PUBLIC_KEY"></a>

Specified current public key is not correct

```move
module 0x1::account {
    const EWRONG_CURRENT_PUBLIC_KEY: u64 = 7;
}
```

<a id="0x1_account_MAX_GUID_CREATION_NUM"></a>

Explicitly separate the GUID space between Object and Account to prevent accidental overlap.

```move
module 0x1::account {
    const MAX_GUID_CREATION_NUM: u64 = 1125899906842624;
}
```

<a id="0x1_account_MULTI_ED25519_SCHEME"></a>

Scheme identifier for MultiEd25519 signatures used to derive authentication keys for MultiEd25519 public keys.

```move
module 0x1::account {
    const MULTI_ED25519_SCHEME: u8 = 1;
}
```

<a id="0x1_account_ZERO_AUTH_KEY"></a>

```move
module 0x1::account {
    const ZERO_AUTH_KEY: vector<u8> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}
```

<a id="0x1_account_initialize"></a>

## Function `initialize`

Only called during genesis to initialize system resources for this module.

```move
module 0x1::account {
    public(friend) fun initialize(aptos_framework: &signer)
}
```

<a id="0x1_account_create_account_if_does_not_exist"></a>

## Function `create_account_if_does_not_exist`

```move
module 0x1::account {
    public fun create_account_if_does_not_exist(account_address: address)
}
```

<a id="0x1_account_create_account"></a>

## Function `create_account`

Publishes a new `Account` resource under `new_address`. A signer representing `new_address`
is returned. This way, the caller of this function can publish additional resources under
`new_address`.

```move
module 0x1::account {
    public(friend) fun create_account(new_address: address): signer
}
```

<a id="0x1_account_exists_at"></a>

## Function `exists_at`

```move
module 0x1::account {
    #[view]
    public fun exists_at(addr: address): bool
}
```

<a id="0x1_account_get_guid_next_creation_num"></a>

## Function `get_guid_next_creation_num`

```move
module 0x1::account {
    #[view]
    public fun get_guid_next_creation_num(addr: address): u64
}
```

<a id="0x1_account_get_sequence_number"></a>

## Function `get_sequence_number`

```move
module 0x1::account {
    #[view]
    public fun get_sequence_number(addr: address): u64
}
```

<a id="0x1_account_increment_sequence_number"></a>

## Function `increment_sequence_number`

```move
module 0x1::account {
    public(friend) fun increment_sequence_number(addr: address)
}
```

<a id="0x1_account_get_authentication_key"></a>

## Function `get_authentication_key`

```move
module 0x1::account {
    #[view]
    public fun get_authentication_key(addr: address): vector<u8>
}
```

<a id="0x1_account_rotate_authentication_key_internal"></a>

## Function `rotate_authentication_key_internal`

This function is used to rotate a resource account&apos;s authentication key to `new_auth_key`. This is done in
many contexts:

1. During normal key rotation via `rotate_authentication_key` or `rotate_authentication_key_call`
2. During resource account initialization so that no private key can control the resource account
3. During multisig_v2 account creation

```move
module 0x1::account {
    public(friend) fun rotate_authentication_key_internal(account: &signer, new_auth_key: vector<u8>)
}
```

<a id="0x1_account_rotate_authentication_key_call"></a>

## Function `rotate_authentication_key_call`

Private entry function for key rotation that allows the signer to update their authentication key.
Note that this does not update the `OriginatingAddress` table because the `new_auth_key` is not &quot;verified&quot;: it
does not come with a proof&#45;of&#45;knowledge of the underlying SK. Nonetheless, we need this functionality due to
the introduction of non&#45;standard key algorithms, such as passkeys, which cannot produce proofs&#45;of&#45;knowledge in
the format expected in `rotate_authentication_key`.

```move
module 0x1::account {
    entry fun rotate_authentication_key_call(account: &signer, new_auth_key: vector<u8>)
}
```

<a id="0x1_account_rotate_authentication_key"></a>

## Function `rotate_authentication_key`

Generic authentication key rotation function that allows the user to rotate their authentication key from any scheme to any scheme.
To authorize the rotation, we need two signatures:
&#45; the first signature `cap_rotate_key` refers to the signature by the account owner&apos;s current key on a valid `RotationProofChallenge`,
demonstrating that the user intends to and has the capability to rotate the authentication key of this account;
&#45; the second signature `cap_update_table` refers to the signature by the new key (that the account owner wants to rotate to) on a
valid `RotationProofChallenge`, demonstrating that the user owns the new private key, and has the authority to update the
`OriginatingAddress` map with the new address mapping `<new_address, originating_address>`.
To verify these two signatures, we need their corresponding public key and public key scheme: we use `from_scheme` and `from_public_key_bytes`
to verify `cap_rotate_key`, and `to_scheme` and `to_public_key_bytes` to verify `cap_update_table`.
A scheme of 0 refers to an Ed25519 key and a scheme of 1 refers to Multi&#45;Ed25519 keys.
`originating address` refers to an account&apos;s original/first address.

Here is an example attack if we don&apos;t ask for the second signature `cap_update_table`:
Alice has rotated her account `addr_a` to `new_addr_a`. As a result, the following entry is created, to help Alice when recovering her wallet:
`OriginatingAddress[new_addr_a]` &#45;&gt; `addr_a`
Alice has had bad day: her laptop blew up and she needs to reset her account on a new one.
(Fortunately, she still has her secret key `new_sk_a` associated with her new address `new_addr_a`, so she can do this.)

But Bob likes to mess with Alice.
Bob creates an account `addr_b` and maliciously rotates it to Alice&apos;s new address `new_addr_a`. Since we are no longer checking a PoK,
Bob can easily do this.

Now, the table will be updated to make Alice&apos;s new address point to Bob&apos;s address: `OriginatingAddress[new_addr_a]` &#45;&gt; `addr_b`.
When Alice recovers her account, her wallet will display the attacker&apos;s address (Bob&apos;s) `addr_b` as her address.
Now Alice will give `addr_b` to everyone to pay her, but the money will go to Bob.

Because we ask for a valid `cap_update_table`, this kind of attack is not possible. Bob would not have the secret key of Alice&apos;s address
to rotate his address to Alice&apos;s address in the first place.

```move
module 0x1::account {
    public entry fun rotate_authentication_key(account: &signer, from_scheme: u8, from_public_key_bytes: vector<u8>, to_scheme: u8, to_public_key_bytes: vector<u8>, cap_rotate_key: vector<u8>, cap_update_table: vector<u8>)
}
```

<a id="0x1_account_rotate_authentication_key_with_rotation_capability"></a>

## Function `rotate_authentication_key_with_rotation_capability`

```move
module 0x1::account {
    public entry fun rotate_authentication_key_with_rotation_capability(delegate_signer: &signer, rotation_cap_offerer_address: address, new_scheme: u8, new_public_key_bytes: vector<u8>, cap_update_table: vector<u8>)
}
```

<a id="0x1_account_offer_rotation_capability"></a>

## Function `offer_rotation_capability`

Offers rotation capability on behalf of `account` to the account at address `recipient_address`.
An account can delegate its rotation capability to only one other address at one time. If the account
has an existing rotation capability offer, calling this function will update the rotation capability offer with
the new `recipient_address`.
Here, `rotation_capability_sig_bytes` signature indicates that this key rotation is authorized by the account owner,
and prevents the classic &quot;time&#45;of&#45;check time&#45;of&#45;use&quot; attack.
For example, users usually rely on what the wallet displays to them as the transaction&apos;s outcome. Consider a contract that with 50% probability
(based on the current timestamp in Move), rotates somebody&apos;s key. The wallet might be unlucky and get an outcome where nothing is rotated,
incorrectly telling the user nothing bad will happen. But when the transaction actually gets executed, the attacker gets lucky and
the execution path triggers the account key rotation.
We prevent such attacks by asking for this extra signature authorizing the key rotation.

@param rotation_capability_sig_bytes is the signature by the account owner&apos;s key on `RotationCapabilityOfferProofChallengeV2`.
@param account_scheme is the scheme of the account (ed25519 or multi_ed25519).
@param account_public_key_bytes is the public key of the account owner.
@param recipient_address is the address of the recipient of the rotation capability &#45; note that if there&apos;s an existing rotation capability
offer, calling this function will replace the previous `recipient_address` upon successful verification.

```move
module 0x1::account {
    public entry fun offer_rotation_capability(account: &signer, rotation_capability_sig_bytes: vector<u8>, account_scheme: u8, account_public_key_bytes: vector<u8>, recipient_address: address)
}
```

<a id="0x1_account_is_rotation_capability_offered"></a>

## Function `is_rotation_capability_offered`

Returns true if the account at `account_addr` has a rotation capability offer.

```move
module 0x1::account {
    #[view]
    public fun is_rotation_capability_offered(account_addr: address): bool
}
```

<a id="0x1_account_get_rotation_capability_offer_for"></a>

## Function `get_rotation_capability_offer_for`

Returns the address of the account that has a rotation capability offer from the account at `account_addr`.

```move
module 0x1::account {
    #[view]
    public fun get_rotation_capability_offer_for(account_addr: address): address
}
```

<a id="0x1_account_revoke_rotation_capability"></a>

## Function `revoke_rotation_capability`

Revoke the rotation capability offer given to `to_be_revoked_recipient_address` from `account`

```move
module 0x1::account {
    public entry fun revoke_rotation_capability(account: &signer, to_be_revoked_address: address)
}
```

<a id="0x1_account_revoke_any_rotation_capability"></a>

## Function `revoke_any_rotation_capability`

Revoke any rotation capability offer in the specified account.

```move
module 0x1::account {
    public entry fun revoke_any_rotation_capability(account: &signer)
}
```

<a id="0x1_account_offer_signer_capability"></a>

## Function `offer_signer_capability`

Offers signer capability on behalf of `account` to the account at address `recipient_address`.
An account can delegate its signer capability to only one other address at one time.
`signer_capability_key_bytes` is the `SignerCapabilityOfferProofChallengeV2` signed by the account owner&apos;s key
`account_scheme` is the scheme of the account (ed25519 or multi_ed25519).
`account_public_key_bytes` is the public key of the account owner.
`recipient_address` is the address of the recipient of the signer capability &#45; note that if there&apos;s an existing
`recipient_address` in the account owner&apos;s `SignerCapabilityOffer`, this will replace the
previous `recipient_address` upon successful verification (the previous recipient will no longer have access
to the account owner&apos;s signer capability).

```move
module 0x1::account {
    public entry fun offer_signer_capability(account: &signer, signer_capability_sig_bytes: vector<u8>, account_scheme: u8, account_public_key_bytes: vector<u8>, recipient_address: address)
}
```

<a id="0x1_account_is_signer_capability_offered"></a>

## Function `is_signer_capability_offered`

Returns true if the account at `account_addr` has a signer capability offer.

```move
module 0x1::account {
    #[view]
    public fun is_signer_capability_offered(account_addr: address): bool
}
```

<a id="0x1_account_get_signer_capability_offer_for"></a>

## Function `get_signer_capability_offer_for`

Returns the address of the account that has a signer capability offer from the account at `account_addr`.

```move
module 0x1::account {
    #[view]
    public fun get_signer_capability_offer_for(account_addr: address): address
}
```

<a id="0x1_account_revoke_signer_capability"></a>

## Function `revoke_signer_capability`

Revoke the account owner&apos;s signer capability offer for `to_be_revoked_address` (i.e., the address that
has a signer capability offer from `account` but will be revoked in this function).

```move
module 0x1::account {
    public entry fun revoke_signer_capability(account: &signer, to_be_revoked_address: address)
}
```

<a id="0x1_account_revoke_any_signer_capability"></a>

## Function `revoke_any_signer_capability`

Revoke any signer capability offer in the specified account.

```move
module 0x1::account {
    public entry fun revoke_any_signer_capability(account: &signer)
}
```

<a id="0x1_account_create_authorized_signer"></a>

## Function `create_authorized_signer`

Return an authorized signer of the offerer, if there&apos;s an existing signer capability offer for `account`
at the offerer&apos;s address.

```move
module 0x1::account {
    public fun create_authorized_signer(account: &signer, offerer_address: address): signer
}
```

<a id="0x1_account_create_resource_address"></a>

## Function `create_resource_address`

Basic account creation methods.
This is a helper function to compute resource addresses. Computation of the address
involves the use of a cryptographic hash operation and should be use thoughtfully.

```move
module 0x1::account {
    public fun create_resource_address(source: &address, seed: vector<u8>): address
}
```

<a id="0x1_account_create_resource_account"></a>

## Function `create_resource_account`

A resource account is used to manage resources independent of an account managed by a user.
In Aptos a resource account is created based upon the sha3 256 of the source&apos;s address and additional seed data.
A resource account can only be created once, this is designated by setting the
`Account::signer_capability_offer::for` to the address of the resource account. While an entity may call
`create_account` to attempt to claim an account ahead of the creation of a resource account, if found Aptos will
transition ownership of the account over to the resource account. This is done by validating that the account has
yet to execute any transactions and that the `Account::signer_capability_offer::for` is none. The probability of a
collision where someone has legitimately produced a private key that maps to a resource account address is less
than `(1/2)^(256)`.

```move
module 0x1::account {
    public fun create_resource_account(source: &signer, seed: vector<u8>): (signer, account::SignerCapability)
}
```

<a id="0x1_account_create_framework_reserved_account"></a>

## Function `create_framework_reserved_account`

create the account for system reserved addresses

```move
module 0x1::account {
    public(friend) fun create_framework_reserved_account(addr: address): (signer, account::SignerCapability)
}
```

<a id="0x1_account_create_guid"></a>

## Function `create_guid`

GUID management methods.

```move
module 0x1::account {
    public fun create_guid(account_signer: &signer): guid::GUID
}
```

<a id="0x1_account_new_event_handle"></a>

## Function `new_event_handle`

GUID management methods.

```move
module 0x1::account {
    public fun new_event_handle<T: drop, store>(account: &signer): event::EventHandle<T>
}
```

<a id="0x1_account_register_coin"></a>

## Function `register_coin`

Coin management methods.

```move
module 0x1::account {
    public(friend) fun register_coin<CoinType>(account_addr: address)
}
```

<a id="0x1_account_create_signer_with_capability"></a>

## Function `create_signer_with_capability`

Capability based functions for efficient use.

```move
module 0x1::account {
    public fun create_signer_with_capability(capability: &account::SignerCapability): signer
}
```

<a id="0x1_account_get_signer_capability_address"></a>

## Function `get_signer_capability_address`

```move
module 0x1::account {
    public fun get_signer_capability_address(capability: &account::SignerCapability): address
}
```

<a id="0x1_account_verify_signed_message"></a>

## Function `verify_signed_message`

```move
module 0x1::account {
    public fun verify_signed_message<T: drop>(account: address, account_scheme: u8, account_public_key: vector<u8>, signed_message_bytes: vector<u8>, message: T)
}
```
