<a id="0x1_object"></a>

# Module `0x1::object`

This defines the Move object model with the following properties:
&#45; Simplified storage interface that supports a heterogeneous collection of resources to be
stored together. This enables data types to share a common core data layer (e.g., tokens),
while having richer extensions (e.g., concert ticket, sword).
&#45; Globally accessible data and ownership model that enables creators and developers to dictate
the application and lifetime of data.
&#45; Extensible programming model that supports individualization of user applications that
leverage the core framework including tokens.
&#45; Support emitting events directly, thus improving discoverability of events associated with
objects.
&#45; Considerate of the underlying system by leveraging resource groups for gas efficiency,
avoiding costly deserialization and serialization costs, and supporting deletability.

TODO: \* There is no means to borrow an object or a reference to an object. We are exploring how to
make it so that a reference to a global object can be returned from a function.

- [Resource `ObjectCore`](#0x1_object_ObjectCore)
- [Resource `TombStone`](#0x1_object_TombStone)
- [Resource `Untransferable`](#0x1_object_Untransferable)
- [Struct `ObjectGroup`](#0x1_object_ObjectGroup)
- [Struct `Object`](#0x1_object_Object)
- [Struct `ConstructorRef`](#0x1_object_ConstructorRef)
- [Struct `DeleteRef`](#0x1_object_DeleteRef)
- [Struct `ExtendRef`](#0x1_object_ExtendRef)
- [Struct `TransferRef`](#0x1_object_TransferRef)
- [Struct `LinearTransferRef`](#0x1_object_LinearTransferRef)
- [Struct `DeriveRef`](#0x1_object_DeriveRef)
- [Struct `TransferEvent`](#0x1_object_TransferEvent)
- [Struct `Transfer`](#0x1_object_Transfer)
- [Constants](#@Constants_0)
- [Function `is_untransferable`](#0x1_object_is_untransferable)
- [Function `is_burnt`](#0x1_object_is_burnt)
- [Function `address_to_object`](#0x1_object_address_to_object)
- [Function `is_object`](#0x1_object_is_object)
- [Function `object_exists`](#0x1_object_object_exists)
- [Function `create_object_address`](#0x1_object_create_object_address)
- [Function `create_user_derived_object_address`](#0x1_object_create_user_derived_object_address)
- [Function `create_guid_object_address`](#0x1_object_create_guid_object_address)
- [Function `object_address`](#0x1_object_object_address)
- [Function `convert`](#0x1_object_convert)
- [Function `create_named_object`](#0x1_object_create_named_object)
- [Function `create_user_derived_object`](#0x1_object_create_user_derived_object)
- [Function `create_object`](#0x1_object_create_object)
- [Function `create_sticky_object`](#0x1_object_create_sticky_object)
- [Function `create_sticky_object_at_address`](#0x1_object_create_sticky_object_at_address)
- [Function `create_object_from_account`](#0x1_object_create_object_from_account)
- [Function `create_object_from_object`](#0x1_object_create_object_from_object)
- [Function `generate_delete_ref`](#0x1_object_generate_delete_ref)
- [Function `generate_extend_ref`](#0x1_object_generate_extend_ref)
- [Function `generate_transfer_ref`](#0x1_object_generate_transfer_ref)
- [Function `generate_derive_ref`](#0x1_object_generate_derive_ref)
- [Function `generate_signer`](#0x1_object_generate_signer)
- [Function `address_from_constructor_ref`](#0x1_object_address_from_constructor_ref)
- [Function `object_from_constructor_ref`](#0x1_object_object_from_constructor_ref)
- [Function `can_generate_delete_ref`](#0x1_object_can_generate_delete_ref)
- [Function `create_guid`](#0x1_object_create_guid)
- [Function `new_event_handle`](#0x1_object_new_event_handle)
- [Function `address_from_delete_ref`](#0x1_object_address_from_delete_ref)
- [Function `object_from_delete_ref`](#0x1_object_object_from_delete_ref)
- [Function `delete`](#0x1_object_delete)
- [Function `generate_signer_for_extending`](#0x1_object_generate_signer_for_extending)
- [Function `address_from_extend_ref`](#0x1_object_address_from_extend_ref)
- [Function `disable_ungated_transfer`](#0x1_object_disable_ungated_transfer)
- [Function `set_untransferable`](#0x1_object_set_untransferable)
- [Function `enable_ungated_transfer`](#0x1_object_enable_ungated_transfer)
- [Function `generate_linear_transfer_ref`](#0x1_object_generate_linear_transfer_ref)
- [Function `transfer_with_ref`](#0x1_object_transfer_with_ref)
- [Function `transfer_call`](#0x1_object_transfer_call)
- [Function `transfer`](#0x1_object_transfer)
- [Function `transfer_raw`](#0x1_object_transfer_raw)
- [Function `transfer_to_object`](#0x1_object_transfer_to_object)
- [Function `burn`](#0x1_object_burn)
- [Function `unburn`](#0x1_object_unburn)
- [Function `ungated_transfer_allowed`](#0x1_object_ungated_transfer_allowed)
- [Function `owner`](#0x1_object_owner)
- [Function `is_owner`](#0x1_object_is_owner)
- [Function `owns`](#0x1_object_owns)
- [Function `root_owner`](#0x1_object_root_owner)

```move
module 0x1::object {
    use 0x1::account;
    use 0x1::bcs;
    use 0x1::create_signer;
    use 0x1::error;
    use 0x1::event;
    use 0x1::features;
    use 0x1::from_bcs;
    use 0x1::guid;
    use 0x1::hash;
    use 0x1::signer;
    use 0x1::transaction_context;
    use 0x1::vector;
}
```

<a id="0x1_object_ObjectCore"></a>

## Resource `ObjectCore`

The core of the object model that defines ownership, transferability, and events.

```move
module 0x1::object {
    #[resource_group_member(#[group = 0x1::object::ObjectGroup])]
    struct ObjectCore has key
}
```

<a id="0x1_object_TombStone"></a>

## Resource `TombStone`

This is added to objects that are burnt (ownership transferred to BURN_ADDRESS).

```move
module 0x1::object {
    #[resource_group_member(#[group = 0x1::object::ObjectGroup])]
    struct TombStone has key
}
```

<a id="0x1_object_Untransferable"></a>

## Resource `Untransferable`

The existence of this renders all `TransferRef`s irrelevant. The object cannot be moved.

```move
module 0x1::object {
    #[resource_group_member(#[group = 0x1::object::ObjectGroup])]
    struct Untransferable has key
}
```

<a id="0x1_object_ObjectGroup"></a>

## Struct `ObjectGroup`

A shared resource group for storing object resources together in storage.

```move
module 0x1::object {
    #[resource_group(#[scope = global])]
    struct ObjectGroup
}
```

<a id="0x1_object_Object"></a>

## Struct `Object`

A pointer to an object &#45;&#45; these can only provide guarantees based upon the underlying data
type, that is the validity of T existing at an address is something that cannot be verified
by any other module than the module that defined T. Similarly, the module that defines T
can remove it from storage at any point in time.

```move
module 0x1::object {
    struct Object<T> has copy, drop, store
}
```

<a id="0x1_object_ConstructorRef"></a>

## Struct `ConstructorRef`

This is a one time ability given to the creator to configure the object as necessary

```move
module 0x1::object {
    struct ConstructorRef has drop
}
```

<a id="0x1_object_DeleteRef"></a>

## Struct `DeleteRef`

Used to remove an object from storage.

```move
module 0x1::object {
    struct DeleteRef has drop, store
}
```

<a id="0x1_object_ExtendRef"></a>

## Struct `ExtendRef`

Used to create events or move additional resources into object storage.

```move
module 0x1::object {
    struct ExtendRef has drop, store
}
```

<a id="0x1_object_TransferRef"></a>

## Struct `TransferRef`

Used to create LinearTransferRef, hence ownership transfer.

```move
module 0x1::object {
    struct TransferRef has drop, store
}
```

<a id="0x1_object_LinearTransferRef"></a>

## Struct `LinearTransferRef`

Used to perform transfers. This locks transferring ability to a single time use bound to
the current owner.

```move
module 0x1::object {
    struct LinearTransferRef has drop
}
```

<a id="0x1_object_DeriveRef"></a>

## Struct `DeriveRef`

Used to create derived objects from a given objects.

```move
module 0x1::object {
    struct DeriveRef has drop, store
}
```

<a id="0x1_object_TransferEvent"></a>

## Struct `TransferEvent`

Emitted whenever the object&apos;s owner field is changed.

```move
module 0x1::object {
    struct TransferEvent has drop, store
}
```

<a id="0x1_object_Transfer"></a>

## Struct `Transfer`

Emitted whenever the object&apos;s owner field is changed.

```move
module 0x1::object {
    #[event]
    struct Transfer has drop, store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_object_BURN_ADDRESS"></a>

Address where unwanted objects can be forcefully transferred to.

```move
module 0x1::object {
    const BURN_ADDRESS: address = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;
}
```

<a id="0x1_object_DERIVE_AUID_ADDRESS_SCHEME"></a>

generate_unique_address uses this for domain separation within its native implementation

```move
module 0x1::object {
    const DERIVE_AUID_ADDRESS_SCHEME: u8 = 251;
}
```

<a id="0x1_object_ECANNOT_DELETE"></a>

The object does not allow for deletion

```move
module 0x1::object {
    const ECANNOT_DELETE: u64 = 5;
}
```

<a id="0x1_object_EMAXIMUM_NESTING"></a>

Exceeds maximum nesting for an object transfer.

```move
module 0x1::object {
    const EMAXIMUM_NESTING: u64 = 6;
}
```

<a id="0x1_object_ENOT_OBJECT_OWNER"></a>

The caller does not have ownership permissions

```move
module 0x1::object {
    const ENOT_OBJECT_OWNER: u64 = 4;
}
```

<a id="0x1_object_ENO_UNGATED_TRANSFERS"></a>

The object does not have ungated transfers enabled

```move
module 0x1::object {
    const ENO_UNGATED_TRANSFERS: u64 = 3;
}
```

<a id="0x1_object_EOBJECT_DOES_NOT_EXIST"></a>

An object does not exist at this address

```move
module 0x1::object {
    const EOBJECT_DOES_NOT_EXIST: u64 = 2;
}
```

<a id="0x1_object_EOBJECT_EXISTS"></a>

An object already exists at this address

```move
module 0x1::object {
    const EOBJECT_EXISTS: u64 = 1;
}
```

<a id="0x1_object_EOBJECT_NOT_BURNT"></a>

Cannot reclaim objects that weren&apos;t burnt.

```move
module 0x1::object {
    const EOBJECT_NOT_BURNT: u64 = 8;
}
```

<a id="0x1_object_EOBJECT_NOT_TRANSFERRABLE"></a>

Object is untransferable any operations that might result in a transfer are disallowed.

```move
module 0x1::object {
    const EOBJECT_NOT_TRANSFERRABLE: u64 = 9;
}
```

<a id="0x1_object_ERESOURCE_DOES_NOT_EXIST"></a>

The resource is not stored at the specified address.

```move
module 0x1::object {
    const ERESOURCE_DOES_NOT_EXIST: u64 = 7;
}
```

<a id="0x1_object_INIT_GUID_CREATION_NUM"></a>

Explicitly separate the GUID space between Object and Account to prevent accidental overlap.

```move
module 0x1::object {
    const INIT_GUID_CREATION_NUM: u64 = 1125899906842624;
}
```

<a id="0x1_object_MAXIMUM_OBJECT_NESTING"></a>

Maximum nesting from one object to another. That is objects can technically have infinte
nesting, but any checks such as transfer will only be evaluated this deep.

```move
module 0x1::object {
    const MAXIMUM_OBJECT_NESTING: u8 = 8;
}
```

<a id="0x1_object_OBJECT_DERIVED_SCHEME"></a>

Scheme identifier used to generate an object&apos;s address `obj_addr` as derived from another object.
The object&apos;s address is generated as:

```
obj_addr &#61; sha3_256(account addr &#124; derived from object&apos;s address &#124; 0xFC)
```

This 0xFC constant serves as a domain separation tag to prevent existing authentication key and resource account
derivation to produce an object address.

```move
module 0x1::object {
    const OBJECT_DERIVED_SCHEME: u8 = 252;
}
```

<a id="0x1_object_OBJECT_FROM_GUID_ADDRESS_SCHEME"></a>

Scheme identifier used to generate an object&apos;s address `obj_addr` via a fresh GUID generated by the creator at
`source_addr`. The object&apos;s address is generated as:

```
obj_addr &#61; sha3_256(guid &#124; 0xFD)
```

where `guid = account::create_guid(create_signer(source_addr))`

This 0xFD constant serves as a domain separation tag to prevent existing authentication key and resource account
derivation to produce an object address.

```move
module 0x1::object {
    const OBJECT_FROM_GUID_ADDRESS_SCHEME: u8 = 253;
}
```

<a id="0x1_object_OBJECT_FROM_SEED_ADDRESS_SCHEME"></a>

Scheme identifier used to generate an object&apos;s address `obj_addr` from the creator&apos;s `source_addr` and a `seed` as:
obj_addr &#61; sha3_256(source_addr &#124; seed &#124; 0xFE).

This 0xFE constant serves as a domain separation tag to prevent existing authentication key and resource account
derivation to produce an object address.

```move
module 0x1::object {
    const OBJECT_FROM_SEED_ADDRESS_SCHEME: u8 = 254;
}
```

<a id="0x1_object_is_untransferable"></a>

## Function `is_untransferable`

```move
module 0x1::object {
    #[view]
    public fun is_untransferable<T: key>(object: object::Object<T>): bool
}
```

<a id="0x1_object_is_burnt"></a>

## Function `is_burnt`

```move
module 0x1::object {
    #[view]
    public fun is_burnt<T: key>(object: object::Object<T>): bool
}
```

<a id="0x1_object_address_to_object"></a>

## Function `address_to_object`

Produces an ObjectId from the given address. This is not verified.

```move
module 0x1::object {
    public fun address_to_object<T: key>(object: address): object::Object<T>
}
```

<a id="0x1_object_is_object"></a>

## Function `is_object`

Returns true if there exists an object or the remnants of an object.

```move
module 0x1::object {
    public fun is_object(object: address): bool
}
```

<a id="0x1_object_object_exists"></a>

## Function `object_exists`

Returns true if there exists an object with resource T.

```move
module 0x1::object {
    public fun object_exists<T: key>(object: address): bool
}
```

<a id="0x1_object_create_object_address"></a>

## Function `create_object_address`

Derives an object address from source material: sha3_256([creator address &#124; seed &#124; 0xFE]).

```move
module 0x1::object {
    public fun create_object_address(source: &address, seed: vector<u8>): address
}
```

<a id="0x1_object_create_user_derived_object_address"></a>

## Function `create_user_derived_object_address`

Derives an object address from the source address and an object: sha3_256([source &#124; object addr &#124; 0xFC]).

```move
module 0x1::object {
    public fun create_user_derived_object_address(source: address, derive_from: address): address
}
```

<a id="0x1_object_create_guid_object_address"></a>

## Function `create_guid_object_address`

Derives an object from an Account GUID.

```move
module 0x1::object {
    public fun create_guid_object_address(source: address, creation_num: u64): address
}
```

<a id="0x1_object_object_address"></a>

## Function `object_address`

Returns the address of within an ObjectId.

```move
module 0x1::object {
    public fun object_address<T: key>(object: &object::Object<T>): address
}
```

<a id="0x1_object_convert"></a>

## Function `convert`

Convert Object&lt;X&gt; to Object&lt;Y&gt;.

```move
module 0x1::object {
    public fun convert<X: key, Y: key>(object: object::Object<X>): object::Object<Y>
}
```

<a id="0x1_object_create_named_object"></a>

## Function `create_named_object`

Create a new named object and return the ConstructorRef. Named objects can be queried globally
by knowing the user generated seed used to create them. Named objects cannot be deleted.

```move
module 0x1::object {
    public fun create_named_object(creator: &signer, seed: vector<u8>): object::ConstructorRef
}
```

<a id="0x1_object_create_user_derived_object"></a>

## Function `create_user_derived_object`

Create a new object whose address is derived based on the creator account address and another object.
Derivde objects, similar to named objects, cannot be deleted.

```move
module 0x1::object {
    public(friend) fun create_user_derived_object(creator_address: address, derive_ref: &object::DeriveRef): object::ConstructorRef
}
```

<a id="0x1_object_create_object"></a>

## Function `create_object`

Create a new object by generating a random unique address based on transaction hash.
The unique address is computed sha3_256([transaction hash &#124; auid counter &#124; 0xFB]).
The created object is deletable as we can guarantee the same unique address can
never be regenerated with future txs.

```move
module 0x1::object {
    public fun create_object(owner_address: address): object::ConstructorRef
}
```

<a id="0x1_object_create_sticky_object"></a>

## Function `create_sticky_object`

Same as `create_object` except the object to be created will be undeletable.

```move
module 0x1::object {
    public fun create_sticky_object(owner_address: address): object::ConstructorRef
}
```

<a id="0x1_object_create_sticky_object_at_address"></a>

## Function `create_sticky_object_at_address`

Create a sticky object at a specific address. Only used by aptos_framework::coin.

```move
module 0x1::object {
    public(friend) fun create_sticky_object_at_address(owner_address: address, object_address: address): object::ConstructorRef
}
```

<a id="0x1_object_create_object_from_account"></a>

## Function `create_object_from_account`

Use `create_object` instead.
Create a new object from a GUID generated by an account.
As the GUID creation internally increments a counter, two transactions that executes
`create_object_from_account` function for the same creator run sequentially.
Therefore, using `create_object` method for creating objects is preferrable as it
doesn&apos;t have the same bottlenecks.

```move
module 0x1::object {
    #[deprecated]
    public fun create_object_from_account(creator: &signer): object::ConstructorRef
}
```

<a id="0x1_object_create_object_from_object"></a>

## Function `create_object_from_object`

Use `create_object` instead.
Create a new object from a GUID generated by an object.
As the GUID creation internally increments a counter, two transactions that executes
`create_object_from_object` function for the same creator run sequentially.
Therefore, using `create_object` method for creating objects is preferrable as it
doesn&apos;t have the same bottlenecks.

```move
module 0x1::object {
    #[deprecated]
    public fun create_object_from_object(creator: &signer): object::ConstructorRef
}
```

<a id="0x1_object_generate_delete_ref"></a>

## Function `generate_delete_ref`

Generates the DeleteRef, which can be used to remove ObjectCore from global storage.

```move
module 0x1::object {
    public fun generate_delete_ref(ref: &object::ConstructorRef): object::DeleteRef
}
```

<a id="0x1_object_generate_extend_ref"></a>

## Function `generate_extend_ref`

Generates the ExtendRef, which can be used to add new events and resources to the object.

```move
module 0x1::object {
    public fun generate_extend_ref(ref: &object::ConstructorRef): object::ExtendRef
}
```

<a id="0x1_object_generate_transfer_ref"></a>

## Function `generate_transfer_ref`

Generates the TransferRef, which can be used to manage object transfers.

```move
module 0x1::object {
    public fun generate_transfer_ref(ref: &object::ConstructorRef): object::TransferRef
}
```

<a id="0x1_object_generate_derive_ref"></a>

## Function `generate_derive_ref`

Generates the DeriveRef, which can be used to create determnistic derived objects from the current object.

```move
module 0x1::object {
    public fun generate_derive_ref(ref: &object::ConstructorRef): object::DeriveRef
}
```

<a id="0x1_object_generate_signer"></a>

## Function `generate_signer`

Create a signer for the ConstructorRef

```move
module 0x1::object {
    public fun generate_signer(ref: &object::ConstructorRef): signer
}
```

<a id="0x1_object_address_from_constructor_ref"></a>

## Function `address_from_constructor_ref`

Returns the address associated with the constructor

```move
module 0x1::object {
    public fun address_from_constructor_ref(ref: &object::ConstructorRef): address
}
```

<a id="0x1_object_object_from_constructor_ref"></a>

## Function `object_from_constructor_ref`

Returns an Object&lt;T&gt; from within a ConstructorRef

```move
module 0x1::object {
    public fun object_from_constructor_ref<T: key>(ref: &object::ConstructorRef): object::Object<T>
}
```

<a id="0x1_object_can_generate_delete_ref"></a>

## Function `can_generate_delete_ref`

Returns whether or not the ConstructorRef can be used to create DeleteRef

```move
module 0x1::object {
    public fun can_generate_delete_ref(ref: &object::ConstructorRef): bool
}
```

<a id="0x1_object_create_guid"></a>

## Function `create_guid`

Create a guid for the object, typically used for events

```move
module 0x1::object {
    public fun create_guid(object: &signer): guid::GUID
}
```

<a id="0x1_object_new_event_handle"></a>

## Function `new_event_handle`

Generate a new event handle.

```move
module 0x1::object {
    public fun new_event_handle<T: drop, store>(object: &signer): event::EventHandle<T>
}
```

<a id="0x1_object_address_from_delete_ref"></a>

## Function `address_from_delete_ref`

Returns the address associated with the constructor

```move
module 0x1::object {
    public fun address_from_delete_ref(ref: &object::DeleteRef): address
}
```

<a id="0x1_object_object_from_delete_ref"></a>

## Function `object_from_delete_ref`

Returns an Object&lt;T&gt; from within a DeleteRef.

```move
module 0x1::object {
    public fun object_from_delete_ref<T: key>(ref: &object::DeleteRef): object::Object<T>
}
```

<a id="0x1_object_delete"></a>

## Function `delete`

Removes from the specified Object from global storage.

```move
module 0x1::object {
    public fun delete(ref: object::DeleteRef)
}
```

<a id="0x1_object_generate_signer_for_extending"></a>

## Function `generate_signer_for_extending`

Create a signer for the ExtendRef

```move
module 0x1::object {
    public fun generate_signer_for_extending(ref: &object::ExtendRef): signer
}
```

<a id="0x1_object_address_from_extend_ref"></a>

## Function `address_from_extend_ref`

Returns an address from within a ExtendRef.

```move
module 0x1::object {
    public fun address_from_extend_ref(ref: &object::ExtendRef): address
}
```

<a id="0x1_object_disable_ungated_transfer"></a>

## Function `disable_ungated_transfer`

Disable direct transfer, transfers can only be triggered via a TransferRef

```move
module 0x1::object {
    public fun disable_ungated_transfer(ref: &object::TransferRef)
}
```

<a id="0x1_object_set_untransferable"></a>

## Function `set_untransferable`

Prevent moving of the object

```move
module 0x1::object {
    public fun set_untransferable(ref: &object::ConstructorRef)
}
```

<a id="0x1_object_enable_ungated_transfer"></a>

## Function `enable_ungated_transfer`

Enable direct transfer.

```move
module 0x1::object {
    public fun enable_ungated_transfer(ref: &object::TransferRef)
}
```

<a id="0x1_object_generate_linear_transfer_ref"></a>

## Function `generate_linear_transfer_ref`

Create a LinearTransferRef for a one&#45;time transfer. This requires that the owner at the
time of generation is the owner at the time of transferring.

```move
module 0x1::object {
    public fun generate_linear_transfer_ref(ref: &object::TransferRef): object::LinearTransferRef
}
```

<a id="0x1_object_transfer_with_ref"></a>

## Function `transfer_with_ref`

Transfer to the destination address using a LinearTransferRef.

```move
module 0x1::object {
    public fun transfer_with_ref(ref: object::LinearTransferRef, to: address)
}
```

<a id="0x1_object_transfer_call"></a>

## Function `transfer_call`

Entry function that can be used to transfer, if allow_ungated_transfer is set true.

```move
module 0x1::object {
    public entry fun transfer_call(owner: &signer, object: address, to: address)
}
```

<a id="0x1_object_transfer"></a>

## Function `transfer`

Transfers ownership of the object (and all associated resources) at the specified address
for Object&lt;T&gt; to the &quot;to&quot; address.

```move
module 0x1::object {
    public entry fun transfer<T: key>(owner: &signer, object: object::Object<T>, to: address)
}
```

<a id="0x1_object_transfer_raw"></a>

## Function `transfer_raw`

Attempts to transfer using addresses only. Transfers the given object if
allow_ungated_transfer is set true. Note, that this allows the owner of a nested object to
transfer that object, so long as allow_ungated_transfer is enabled at each stage in the
hierarchy.

```move
module 0x1::object {
    public fun transfer_raw(owner: &signer, object: address, to: address)
}
```

<a id="0x1_object_transfer_to_object"></a>

## Function `transfer_to_object`

Transfer the given object to another object. See `transfer` for more information.

```move
module 0x1::object {
    public entry fun transfer_to_object<O: key, T: key>(owner: &signer, object: object::Object<O>, to: object::Object<T>)
}
```

<a id="0x1_object_burn"></a>

## Function `burn`

Forcefully transfer an unwanted object to BURN_ADDRESS, ignoring whether ungated_transfer is allowed.
This only works for objects directly owned and for simplicity does not apply to indirectly owned objects.
Original owners can reclaim burnt objects any time in the future by calling unburn.

```move
module 0x1::object {
    public entry fun burn<T: key>(owner: &signer, object: object::Object<T>)
}
```

<a id="0x1_object_unburn"></a>

## Function `unburn`

Allow origin owners to reclaim any objects they previous burnt.

```move
module 0x1::object {
    public entry fun unburn<T: key>(original_owner: &signer, object: object::Object<T>)
}
```

<a id="0x1_object_ungated_transfer_allowed"></a>

## Function `ungated_transfer_allowed`

Accessors
Return true if ungated transfer is allowed.

```move
module 0x1::object {
    public fun ungated_transfer_allowed<T: key>(object: object::Object<T>): bool
}
```

<a id="0x1_object_owner"></a>

## Function `owner`

Return the current owner.

```move
module 0x1::object {
    public fun owner<T: key>(object: object::Object<T>): address
}
```

<a id="0x1_object_is_owner"></a>

## Function `is_owner`

Return true if the provided address is the current owner.

```move
module 0x1::object {
    public fun is_owner<T: key>(object: object::Object<T>, owner: address): bool
}
```

<a id="0x1_object_owns"></a>

## Function `owns`

Return true if the provided address has indirect or direct ownership of the provided object.

```move
module 0x1::object {
    public fun owns<T: key>(object: object::Object<T>, owner: address): bool
}
```

<a id="0x1_object_root_owner"></a>

## Function `root_owner`

Returns the root owner of an object. As objects support nested ownership, it can be useful
to determine the identity of the starting point of ownership.

```move
module 0x1::object {
    public fun root_owner<T: key>(object: object::Object<T>): address
}
```
