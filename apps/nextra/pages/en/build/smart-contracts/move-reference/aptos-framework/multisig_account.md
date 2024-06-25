<a id="0x1_multisig_account"></a>

# Module `0x1::multisig_account`

Enhanced multisig account standard on Aptos. This is different from the native multisig scheme support enforced via
the account&apos;s auth key.

This module allows creating a flexible and powerful multisig account with seamless support for updating owners
without changing the auth key. Users can choose to store transaction payloads waiting for owner signatures on chain
or off chain (primary consideration is decentralization/transparency vs gas cost).

The multisig account is a resource account underneath. By default, it has no auth key and can only be controlled via
the special multisig transaction flow. However, owners can create a transaction to change the auth key to match a
private key off chain if so desired.

Transactions need to be executed in order of creation, similar to transactions for a normal Aptos account (enforced
with account nonce).

The flow is like below:

1. Owners can create a new multisig account by calling create (signer is default single owner) or with
   create_with_owners where multiple initial owner addresses can be specified. This is different (and easier) from
   the native multisig scheme where the owners&apos; public keys have to be specified. Here, only addresses are needed.
2. Owners can be added/removed any time by calling add_owners or remove_owners. The transactions to do still need
   to follow the k&#45;of&#45;n scheme specified for the multisig account.
3. To create a new transaction, an owner can call create_transaction with the transaction payload. This will store
   the full transaction payload on chain, which adds decentralization (censorship is not possible as the data is
   available on chain) and makes it easier to fetch all transactions waiting for execution. If saving gas is desired,
   an owner can alternatively call create_transaction_with_hash where only the payload hash is stored. Later execution
   will be verified using the hash. Only owners can create transactions and a transaction id (incremeting id) will be
   assigned.
4. To approve or reject a transaction, other owners can call approve() or reject() with the transaction id.
5. If there are enough approvals, any owner can execute the transaction using the special MultisigTransaction type
   with the transaction id if the full payload is already stored on chain or with the transaction payload if only a
   hash is stored. Transaction execution will first check with this module that the transaction payload has gotten
   enough signatures. If so, it will be executed as the multisig account. The owner who executes will pay for gas.
6. If there are enough rejections, any owner can finalize the rejection by calling execute_rejected_transaction().

Note that this multisig account model is not designed to use with a large number of owners. The more owners there
are, the more expensive voting on transactions will become. If a large number of owners is designed, such as in a
flat governance structure, clients are encouraged to write their own modules on top of this multisig account module
and implement the governance voting logic on top.

- [Resource `MultisigAccount`](#0x1_multisig_account_MultisigAccount)
- [Struct `MultisigTransaction`](#0x1_multisig_account_MultisigTransaction)
- [Struct `ExecutionError`](#0x1_multisig_account_ExecutionError)
- [Struct `MultisigAccountCreationMessage`](#0x1_multisig_account_MultisigAccountCreationMessage)
- [Struct `MultisigAccountCreationWithAuthKeyRevocationMessage`](#0x1_multisig_account_MultisigAccountCreationWithAuthKeyRevocationMessage)
- [Struct `AddOwnersEvent`](#0x1_multisig_account_AddOwnersEvent)
- [Struct `AddOwners`](#0x1_multisig_account_AddOwners)
- [Struct `RemoveOwnersEvent`](#0x1_multisig_account_RemoveOwnersEvent)
- [Struct `RemoveOwners`](#0x1_multisig_account_RemoveOwners)
- [Struct `UpdateSignaturesRequiredEvent`](#0x1_multisig_account_UpdateSignaturesRequiredEvent)
- [Struct `UpdateSignaturesRequired`](#0x1_multisig_account_UpdateSignaturesRequired)
- [Struct `CreateTransactionEvent`](#0x1_multisig_account_CreateTransactionEvent)
- [Struct `CreateTransaction`](#0x1_multisig_account_CreateTransaction)
- [Struct `VoteEvent`](#0x1_multisig_account_VoteEvent)
- [Struct `Vote`](#0x1_multisig_account_Vote)
- [Struct `ExecuteRejectedTransactionEvent`](#0x1_multisig_account_ExecuteRejectedTransactionEvent)
- [Struct `ExecuteRejectedTransaction`](#0x1_multisig_account_ExecuteRejectedTransaction)
- [Struct `TransactionExecutionSucceededEvent`](#0x1_multisig_account_TransactionExecutionSucceededEvent)
- [Struct `TransactionExecutionSucceeded`](#0x1_multisig_account_TransactionExecutionSucceeded)
- [Struct `TransactionExecutionFailedEvent`](#0x1_multisig_account_TransactionExecutionFailedEvent)
- [Struct `TransactionExecutionFailed`](#0x1_multisig_account_TransactionExecutionFailed)
- [Struct `MetadataUpdatedEvent`](#0x1_multisig_account_MetadataUpdatedEvent)
- [Struct `MetadataUpdated`](#0x1_multisig_account_MetadataUpdated)
- [Constants](#@Constants_0)
- [Function `metadata`](#0x1_multisig_account_metadata)
- [Function `num_signatures_required`](#0x1_multisig_account_num_signatures_required)
- [Function `owners`](#0x1_multisig_account_owners)
- [Function `is_owner`](#0x1_multisig_account_is_owner)
- [Function `get_transaction`](#0x1_multisig_account_get_transaction)
- [Function `get_pending_transactions`](#0x1_multisig_account_get_pending_transactions)
- [Function `get_next_transaction_payload`](#0x1_multisig_account_get_next_transaction_payload)
- [Function `can_be_executed`](#0x1_multisig_account_can_be_executed)
- [Function `can_execute`](#0x1_multisig_account_can_execute)
- [Function `can_be_rejected`](#0x1_multisig_account_can_be_rejected)
- [Function `can_reject`](#0x1_multisig_account_can_reject)
- [Function `get_next_multisig_account_address`](#0x1_multisig_account_get_next_multisig_account_address)
- [Function `last_resolved_sequence_number`](#0x1_multisig_account_last_resolved_sequence_number)
- [Function `next_sequence_number`](#0x1_multisig_account_next_sequence_number)
- [Function `vote`](#0x1_multisig_account_vote)
- [Function `available_transaction_queue_capacity`](#0x1_multisig_account_available_transaction_queue_capacity)
- [Function `create_with_existing_account`](#0x1_multisig_account_create_with_existing_account)
- [Function `create_with_existing_account_and_revoke_auth_key`](#0x1_multisig_account_create_with_existing_account_and_revoke_auth_key)
- [Function `create`](#0x1_multisig_account_create)
- [Function `create_with_owners`](#0x1_multisig_account_create_with_owners)
- [Function `create_with_owners_then_remove_bootstrapper`](#0x1_multisig_account_create_with_owners_then_remove_bootstrapper)
- [Function `add_owner`](#0x1_multisig_account_add_owner)
- [Function `add_owners`](#0x1_multisig_account_add_owners)
- [Function `add_owners_and_update_signatures_required`](#0x1_multisig_account_add_owners_and_update_signatures_required)
- [Function `remove_owner`](#0x1_multisig_account_remove_owner)
- [Function `remove_owners`](#0x1_multisig_account_remove_owners)
- [Function `swap_owner`](#0x1_multisig_account_swap_owner)
- [Function `swap_owners`](#0x1_multisig_account_swap_owners)
- [Function `swap_owners_and_update_signatures_required`](#0x1_multisig_account_swap_owners_and_update_signatures_required)
- [Function `update_signatures_required`](#0x1_multisig_account_update_signatures_required)
- [Function `update_metadata`](#0x1_multisig_account_update_metadata)
- [Function `create_transaction`](#0x1_multisig_account_create_transaction)
- [Function `create_transaction_with_hash`](#0x1_multisig_account_create_transaction_with_hash)
- [Function `approve_transaction`](#0x1_multisig_account_approve_transaction)
- [Function `reject_transaction`](#0x1_multisig_account_reject_transaction)
- [Function `vote_transanction`](#0x1_multisig_account_vote_transanction)
- [Function `vote_transaction`](#0x1_multisig_account_vote_transaction)
- [Function `vote_transactions`](#0x1_multisig_account_vote_transactions)
- [Function `execute_rejected_transaction`](#0x1_multisig_account_execute_rejected_transaction)
- [Function `execute_rejected_transactions`](#0x1_multisig_account_execute_rejected_transactions)

```move
module 0x1::multisig_account {
    use 0x1::account;
    use 0x1::aptos_coin;
    use 0x1::bcs;
    use 0x1::chain_id;
    use 0x1::coin;
    use 0x1::create_signer;
    use 0x1::error;
    use 0x1::event;
    use 0x1::features;
    use 0x1::hash;
    use 0x1::option;
    use 0x1::signer;
    use 0x1::simple_map;
    use 0x1::string;
    use 0x1::table;
    use 0x1::timestamp;
    use 0x1::vector;
}
```

<a id="0x1_multisig_account_MultisigAccount"></a>

## Resource `MultisigAccount`

Represents a multisig account&apos;s configurations and transactions.
This will be stored in the multisig account (created as a resource account separate from any owner accounts).

```move
module 0x1::multisig_account {
    struct MultisigAccount has key
}
```

<a id="0x1_multisig_account_MultisigTransaction"></a>

## Struct `MultisigTransaction`

A transaction to be executed in a multisig account.
This must contain either the full transaction payload or its hash (stored as bytes).

```move
module 0x1::multisig_account {
    struct MultisigTransaction has copy, drop, store
}
```

<a id="0x1_multisig_account_ExecutionError"></a>

## Struct `ExecutionError`

Contains information about execution failure.

```move
module 0x1::multisig_account {
    struct ExecutionError has copy, drop, store
}
```

<a id="0x1_multisig_account_MultisigAccountCreationMessage"></a>

## Struct `MultisigAccountCreationMessage`

Used only for verifying multisig account creation on top of existing accounts.

```move
module 0x1::multisig_account {
    struct MultisigAccountCreationMessage has copy, drop
}
```

<a id="0x1_multisig_account_MultisigAccountCreationWithAuthKeyRevocationMessage"></a>

## Struct `MultisigAccountCreationWithAuthKeyRevocationMessage`

Used only for verifying multisig account creation on top of existing accounts and rotating the auth key to 0x0.

```move
module 0x1::multisig_account {
    struct MultisigAccountCreationWithAuthKeyRevocationMessage has copy, drop
}
```

<a id="0x1_multisig_account_AddOwnersEvent"></a>

## Struct `AddOwnersEvent`

Event emitted when new owners are added to the multisig account.

```move
module 0x1::multisig_account {
    struct AddOwnersEvent has drop, store
}
```

<a id="0x1_multisig_account_AddOwners"></a>

## Struct `AddOwners`

```move
module 0x1::multisig_account {
    #[event]
    struct AddOwners has drop, store
}
```

<a id="0x1_multisig_account_RemoveOwnersEvent"></a>

## Struct `RemoveOwnersEvent`

Event emitted when new owners are removed from the multisig account.

```move
module 0x1::multisig_account {
    struct RemoveOwnersEvent has drop, store
}
```

<a id="0x1_multisig_account_RemoveOwners"></a>

## Struct `RemoveOwners`

```move
module 0x1::multisig_account {
    #[event]
    struct RemoveOwners has drop, store
}
```

<a id="0x1_multisig_account_UpdateSignaturesRequiredEvent"></a>

## Struct `UpdateSignaturesRequiredEvent`

Event emitted when the number of signatures required is updated.

```move
module 0x1::multisig_account {
    struct UpdateSignaturesRequiredEvent has drop, store
}
```

<a id="0x1_multisig_account_UpdateSignaturesRequired"></a>

## Struct `UpdateSignaturesRequired`

```move
module 0x1::multisig_account {
    #[event]
    struct UpdateSignaturesRequired has drop, store
}
```

<a id="0x1_multisig_account_CreateTransactionEvent"></a>

## Struct `CreateTransactionEvent`

Event emitted when a transaction is created.

```move
module 0x1::multisig_account {
    struct CreateTransactionEvent has drop, store
}
```

<a id="0x1_multisig_account_CreateTransaction"></a>

## Struct `CreateTransaction`

```move
module 0x1::multisig_account {
    #[event]
    struct CreateTransaction has drop, store
}
```

<a id="0x1_multisig_account_VoteEvent"></a>

## Struct `VoteEvent`

Event emitted when an owner approves or rejects a transaction.

```move
module 0x1::multisig_account {
    struct VoteEvent has drop, store
}
```

<a id="0x1_multisig_account_Vote"></a>

## Struct `Vote`

```move
module 0x1::multisig_account {
    #[event]
    struct Vote has drop, store
}
```

<a id="0x1_multisig_account_ExecuteRejectedTransactionEvent"></a>

## Struct `ExecuteRejectedTransactionEvent`

Event emitted when a transaction is officially rejected because the number of rejections has reached the
number of signatures required.

```move
module 0x1::multisig_account {
    struct ExecuteRejectedTransactionEvent has drop, store
}
```

<a id="0x1_multisig_account_ExecuteRejectedTransaction"></a>

## Struct `ExecuteRejectedTransaction`

```move
module 0x1::multisig_account {
    #[event]
    struct ExecuteRejectedTransaction has drop, store
}
```

<a id="0x1_multisig_account_TransactionExecutionSucceededEvent"></a>

## Struct `TransactionExecutionSucceededEvent`

Event emitted when a transaction is executed.

```move
module 0x1::multisig_account {
    struct TransactionExecutionSucceededEvent has drop, store
}
```

<a id="0x1_multisig_account_TransactionExecutionSucceeded"></a>

## Struct `TransactionExecutionSucceeded`

```move
module 0x1::multisig_account {
    #[event]
    struct TransactionExecutionSucceeded has drop, store
}
```

<a id="0x1_multisig_account_TransactionExecutionFailedEvent"></a>

## Struct `TransactionExecutionFailedEvent`

Event emitted when a transaction&apos;s execution failed.

```move
module 0x1::multisig_account {
    struct TransactionExecutionFailedEvent has drop, store
}
```

<a id="0x1_multisig_account_TransactionExecutionFailed"></a>

## Struct `TransactionExecutionFailed`

```move
module 0x1::multisig_account {
    #[event]
    struct TransactionExecutionFailed has drop, store
}
```

<a id="0x1_multisig_account_MetadataUpdatedEvent"></a>

## Struct `MetadataUpdatedEvent`

Event emitted when a transaction&apos;s metadata is updated.

```move
module 0x1::multisig_account {
    struct MetadataUpdatedEvent has drop, store
}
```

<a id="0x1_multisig_account_MetadataUpdated"></a>

## Struct `MetadataUpdated`

```move
module 0x1::multisig_account {
    #[event]
    struct MetadataUpdated has drop, store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_multisig_account_ZERO_AUTH_KEY"></a>

```move
module 0x1::multisig_account {
    const ZERO_AUTH_KEY: vector<u8> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}
```

<a id="0x1_multisig_account_DOMAIN_SEPARATOR"></a>

The salt used to create a resource account during multisig account creation.
This is used to avoid conflicts with other modules that also create resource accounts with the same owner
account.

```move
module 0x1::multisig_account {
    const DOMAIN_SEPARATOR: vector<u8> = [97, 112, 116, 111, 115, 95, 102, 114, 97, 109, 101, 119, 111, 114, 107, 58, 58, 109, 117, 108, 116, 105, 115, 105, 103, 95, 97, 99, 99, 111, 117, 110, 116];
}
```

<a id="0x1_multisig_account_EACCOUNT_NOT_MULTISIG"></a>

Specified account is not a multisig account.

```move
module 0x1::multisig_account {
    const EACCOUNT_NOT_MULTISIG: u64 = 2002;
}
```

<a id="0x1_multisig_account_EDUPLICATE_METADATA_KEY"></a>

The specified metadata contains duplicate attributes (keys).

```move
module 0x1::multisig_account {
    const EDUPLICATE_METADATA_KEY: u64 = 16;
}
```

<a id="0x1_multisig_account_EDUPLICATE_OWNER"></a>

Owner list cannot contain the same address more than once.

```move
module 0x1::multisig_account {
    const EDUPLICATE_OWNER: u64 = 1;
}
```

<a id="0x1_multisig_account_EINVALID_PAYLOAD_HASH"></a>

Payload hash must be exactly 32 bytes (sha3&#45;256).

```move
module 0x1::multisig_account {
    const EINVALID_PAYLOAD_HASH: u64 = 12;
}
```

<a id="0x1_multisig_account_EINVALID_SEQUENCE_NUMBER"></a>

The sequence number provided is invalid. It must be between [1, next pending transaction &#45; 1].

```move
module 0x1::multisig_account {
    const EINVALID_SEQUENCE_NUMBER: u64 = 17;
}
```

<a id="0x1_multisig_account_EINVALID_SIGNATURES_REQUIRED"></a>

Number of signatures required must be more than zero and at most the total number of owners.

```move
module 0x1::multisig_account {
    const EINVALID_SIGNATURES_REQUIRED: u64 = 11;
}
```

<a id="0x1_multisig_account_EMAX_PENDING_TRANSACTIONS_EXCEEDED"></a>

The number of pending transactions has exceeded the maximum allowed.

```move
module 0x1::multisig_account {
    const EMAX_PENDING_TRANSACTIONS_EXCEEDED: u64 = 19;
}
```

<a id="0x1_multisig_account_EMULTISIG_ACCOUNTS_NOT_ENABLED_YET"></a>

Multisig accounts has not been enabled on this current network yet.

```move
module 0x1::multisig_account {
    const EMULTISIG_ACCOUNTS_NOT_ENABLED_YET: u64 = 14;
}
```

<a id="0x1_multisig_account_EMULTISIG_V2_ENHANCEMENT_NOT_ENABLED"></a>

The multisig v2 enhancement feature is not enabled.

```move
module 0x1::multisig_account {
    const EMULTISIG_V2_ENHANCEMENT_NOT_ENABLED: u64 = 20;
}
```

<a id="0x1_multisig_account_ENOT_ENOUGH_APPROVALS"></a>

Transaction has not received enough approvals to be executed.

```move
module 0x1::multisig_account {
    const ENOT_ENOUGH_APPROVALS: u64 = 2009;
}
```

<a id="0x1_multisig_account_ENOT_ENOUGH_OWNERS"></a>

Multisig account must have at least one owner.

```move
module 0x1::multisig_account {
    const ENOT_ENOUGH_OWNERS: u64 = 5;
}
```

<a id="0x1_multisig_account_ENOT_ENOUGH_REJECTIONS"></a>

Transaction has not received enough rejections to be officially rejected.

```move
module 0x1::multisig_account {
    const ENOT_ENOUGH_REJECTIONS: u64 = 10;
}
```

<a id="0x1_multisig_account_ENOT_OWNER"></a>

Account executing this operation is not an owner of the multisig account.

```move
module 0x1::multisig_account {
    const ENOT_OWNER: u64 = 2003;
}
```

<a id="0x1_multisig_account_ENUMBER_OF_METADATA_KEYS_AND_VALUES_DONT_MATCH"></a>

The number of metadata keys and values don&apos;t match.

```move
module 0x1::multisig_account {
    const ENUMBER_OF_METADATA_KEYS_AND_VALUES_DONT_MATCH: u64 = 15;
}
```

<a id="0x1_multisig_account_EOWNERS_TO_REMOVE_NEW_OWNERS_OVERLAP"></a>

Provided owners to remove and new owners overlap.

```move
module 0x1::multisig_account {
    const EOWNERS_TO_REMOVE_NEW_OWNERS_OVERLAP: u64 = 18;
}
```

<a id="0x1_multisig_account_EOWNER_CANNOT_BE_MULTISIG_ACCOUNT_ITSELF"></a>

The multisig account itself cannot be an owner.

```move
module 0x1::multisig_account {
    const EOWNER_CANNOT_BE_MULTISIG_ACCOUNT_ITSELF: u64 = 13;
}
```

<a id="0x1_multisig_account_EPAYLOAD_CANNOT_BE_EMPTY"></a>

Transaction payload cannot be empty.

```move
module 0x1::multisig_account {
    const EPAYLOAD_CANNOT_BE_EMPTY: u64 = 4;
}
```

<a id="0x1_multisig_account_EPAYLOAD_DOES_NOT_MATCH"></a>

Provided target function does not match the payload stored in the on&#45;chain transaction.

```move
module 0x1::multisig_account {
    const EPAYLOAD_DOES_NOT_MATCH: u64 = 2010;
}
```

<a id="0x1_multisig_account_EPAYLOAD_DOES_NOT_MATCH_HASH"></a>

Provided target function does not match the hash stored in the on&#45;chain transaction.

```move
module 0x1::multisig_account {
    const EPAYLOAD_DOES_NOT_MATCH_HASH: u64 = 2008;
}
```

<a id="0x1_multisig_account_ETRANSACTION_NOT_FOUND"></a>

Transaction with specified id cannot be found.

```move
module 0x1::multisig_account {
    const ETRANSACTION_NOT_FOUND: u64 = 2006;
}
```

<a id="0x1_multisig_account_MAX_PENDING_TRANSACTIONS"></a>

```move
module 0x1::multisig_account {
    const MAX_PENDING_TRANSACTIONS: u64 = 20;
}
```

<a id="0x1_multisig_account_metadata"></a>

## Function `metadata`

Return the multisig account&apos;s metadata.

```move
module 0x1::multisig_account {
    #[view]
    public fun metadata(multisig_account: address): simple_map::SimpleMap<string::String, vector<u8>>
}
```

<a id="0x1_multisig_account_num_signatures_required"></a>

## Function `num_signatures_required`

Return the number of signatures required to execute or execute&#45;reject a transaction in the provided
multisig account.

```move
module 0x1::multisig_account {
    #[view]
    public fun num_signatures_required(multisig_account: address): u64
}
```

<a id="0x1_multisig_account_owners"></a>

## Function `owners`

Return a vector of all of the provided multisig account&apos;s owners.

```move
module 0x1::multisig_account {
    #[view]
    public fun owners(multisig_account: address): vector<address>
}
```

<a id="0x1_multisig_account_is_owner"></a>

## Function `is_owner`

Return true if the provided owner is an owner of the provided multisig account.

```move
module 0x1::multisig_account {
    #[view]
    public fun is_owner(owner: address, multisig_account: address): bool
}
```

<a id="0x1_multisig_account_get_transaction"></a>

## Function `get_transaction`

Return the transaction with the given transaction id.

```move
module 0x1::multisig_account {
    #[view]
    public fun get_transaction(multisig_account: address, sequence_number: u64): multisig_account::MultisigTransaction
}
```

<a id="0x1_multisig_account_get_pending_transactions"></a>

## Function `get_pending_transactions`

Return all pending transactions.

```move
module 0x1::multisig_account {
    #[view]
    public fun get_pending_transactions(multisig_account: address): vector<multisig_account::MultisigTransaction>
}
```

<a id="0x1_multisig_account_get_next_transaction_payload"></a>

## Function `get_next_transaction_payload`

Return the payload for the next transaction in the queue.

```move
module 0x1::multisig_account {
    #[view]
    public fun get_next_transaction_payload(multisig_account: address, provided_payload: vector<u8>): vector<u8>
}
```

<a id="0x1_multisig_account_can_be_executed"></a>

## Function `can_be_executed`

Return true if the transaction with given transaction id can be executed now.

```move
module 0x1::multisig_account {
    #[view]
    public fun can_be_executed(multisig_account: address, sequence_number: u64): bool
}
```

<a id="0x1_multisig_account_can_execute"></a>

## Function `can_execute`

Return true if the owner can execute the transaction with given transaction id now.

```move
module 0x1::multisig_account {
    #[view]
    public fun can_execute(owner: address, multisig_account: address, sequence_number: u64): bool
}
```

<a id="0x1_multisig_account_can_be_rejected"></a>

## Function `can_be_rejected`

Return true if the transaction with given transaction id can be officially rejected.

```move
module 0x1::multisig_account {
    #[view]
    public fun can_be_rejected(multisig_account: address, sequence_number: u64): bool
}
```

<a id="0x1_multisig_account_can_reject"></a>

## Function `can_reject`

Return true if the owner can execute the &quot;rejected&quot; transaction with given transaction id now.

```move
module 0x1::multisig_account {
    #[view]
    public fun can_reject(owner: address, multisig_account: address, sequence_number: u64): bool
}
```

<a id="0x1_multisig_account_get_next_multisig_account_address"></a>

## Function `get_next_multisig_account_address`

Return the predicted address for the next multisig account if created from the given creator address.

```move
module 0x1::multisig_account {
    #[view]
    public fun get_next_multisig_account_address(creator: address): address
}
```

<a id="0x1_multisig_account_last_resolved_sequence_number"></a>

## Function `last_resolved_sequence_number`

Return the id of the last transaction that was executed (successful or failed) or removed.

```move
module 0x1::multisig_account {
    #[view]
    public fun last_resolved_sequence_number(multisig_account: address): u64
}
```

<a id="0x1_multisig_account_next_sequence_number"></a>

## Function `next_sequence_number`

Return the id of the next transaction created.

```move
module 0x1::multisig_account {
    #[view]
    public fun next_sequence_number(multisig_account: address): u64
}
```

<a id="0x1_multisig_account_vote"></a>

## Function `vote`

Return a bool tuple indicating whether an owner has voted and if so, whether they voted yes or no.

```move
module 0x1::multisig_account {
    #[view]
    public fun vote(multisig_account: address, sequence_number: u64, owner: address): (bool, bool)
}
```

<a id="0x1_multisig_account_available_transaction_queue_capacity"></a>

## Function `available_transaction_queue_capacity`

```move
module 0x1::multisig_account {
    #[view]
    public fun available_transaction_queue_capacity(multisig_account: address): u64
}
```

<a id="0x1_multisig_account_create_with_existing_account"></a>

## Function `create_with_existing_account`

Creates a new multisig account on top of an existing account.

This offers a migration path for an existing account with a multi&#45;ed25519 auth key (native multisig account).
In order to ensure a malicious module cannot obtain backdoor control over an existing account, a signed message
with a valid signature from the account&apos;s auth key is required.

Note that this does not revoke auth key&#45;based control over the account. Owners should separately rotate the auth
key after they are fully migrated to the new multisig account. Alternatively, they can call
create_with_existing_account_and_revoke_auth_key instead.

```move
module 0x1::multisig_account {
    public entry fun create_with_existing_account(multisig_address: address, owners: vector<address>, num_signatures_required: u64, account_scheme: u8, account_public_key: vector<u8>, create_multisig_account_signed_message: vector<u8>, metadata_keys: vector<string::String>, metadata_values: vector<vector<u8>>)
}
```

<a id="0x1_multisig_account_create_with_existing_account_and_revoke_auth_key"></a>

## Function `create_with_existing_account_and_revoke_auth_key`

Creates a new multisig account on top of an existing account and immediately rotate the origin auth key to 0x0.

Note: If the original account is a resource account, this does not revoke all control over it as if any
SignerCapability of the resource account still exists, it can still be used to generate the signer for the
account.

```move
module 0x1::multisig_account {
    public entry fun create_with_existing_account_and_revoke_auth_key(multisig_address: address, owners: vector<address>, num_signatures_required: u64, account_scheme: u8, account_public_key: vector<u8>, create_multisig_account_signed_message: vector<u8>, metadata_keys: vector<string::String>, metadata_values: vector<vector<u8>>)
}
```

<a id="0x1_multisig_account_create"></a>

## Function `create`

Creates a new multisig account and add the signer as a single owner.

```move
module 0x1::multisig_account {
    public entry fun create(owner: &signer, num_signatures_required: u64, metadata_keys: vector<string::String>, metadata_values: vector<vector<u8>>)
}
```

<a id="0x1_multisig_account_create_with_owners"></a>

## Function `create_with_owners`

Creates a new multisig account with the specified additional owner list and signatures required.

@param additional_owners The owner account who calls this function cannot be in the additional_owners and there
cannot be any duplicate owners in the list.
@param num_signatures_required The number of signatures required to execute a transaction. Must be at least 1 and
at most the total number of owners.

```move
module 0x1::multisig_account {
    public entry fun create_with_owners(owner: &signer, additional_owners: vector<address>, num_signatures_required: u64, metadata_keys: vector<string::String>, metadata_values: vector<vector<u8>>)
}
```

<a id="0x1_multisig_account_create_with_owners_then_remove_bootstrapper"></a>

## Function `create_with_owners_then_remove_bootstrapper`

Like `create_with_owners`, but removes the calling account after creation.

This is for creating a vanity multisig account from a bootstrapping account that should not
be an owner after the vanity multisig address has been secured.

```move
module 0x1::multisig_account {
    public entry fun create_with_owners_then_remove_bootstrapper(bootstrapper: &signer, owners: vector<address>, num_signatures_required: u64, metadata_keys: vector<string::String>, metadata_values: vector<vector<u8>>)
}
```

<a id="0x1_multisig_account_add_owner"></a>

## Function `add_owner`

Similar to add_owners, but only allow adding one owner.

```move
module 0x1::multisig_account {
    entry fun add_owner(multisig_account: &signer, new_owner: address)
}
```

<a id="0x1_multisig_account_add_owners"></a>

## Function `add_owners`

Add new owners to the multisig account. This can only be invoked by the multisig account itself, through the
proposal flow.

Note that this function is not public so it can only be invoked directly instead of via a module or script. This
ensures that a multisig transaction cannot lead to another module obtaining the multisig signer and using it to
maliciously alter the owners list.

```move
module 0x1::multisig_account {
    entry fun add_owners(multisig_account: &signer, new_owners: vector<address>)
}
```

<a id="0x1_multisig_account_add_owners_and_update_signatures_required"></a>

## Function `add_owners_and_update_signatures_required`

Add owners then update number of signatures required, in a single operation.

```move
module 0x1::multisig_account {
    entry fun add_owners_and_update_signatures_required(multisig_account: &signer, new_owners: vector<address>, new_num_signatures_required: u64)
}
```

<a id="0x1_multisig_account_remove_owner"></a>

## Function `remove_owner`

Similar to remove_owners, but only allow removing one owner.

```move
module 0x1::multisig_account {
    entry fun remove_owner(multisig_account: &signer, owner_to_remove: address)
}
```

<a id="0x1_multisig_account_remove_owners"></a>

## Function `remove_owners`

Remove owners from the multisig account. This can only be invoked by the multisig account itself, through the
proposal flow.

This function skips any owners who are not in the multisig account&apos;s list of owners.
Note that this function is not public so it can only be invoked directly instead of via a module or script. This
ensures that a multisig transaction cannot lead to another module obtaining the multisig signer and using it to
maliciously alter the owners list.

```move
module 0x1::multisig_account {
    entry fun remove_owners(multisig_account: &signer, owners_to_remove: vector<address>)
}
```

<a id="0x1_multisig_account_swap_owner"></a>

## Function `swap_owner`

Swap an owner in for an old one, without changing required signatures.

```move
module 0x1::multisig_account {
    entry fun swap_owner(multisig_account: &signer, to_swap_in: address, to_swap_out: address)
}
```

<a id="0x1_multisig_account_swap_owners"></a>

## Function `swap_owners`

Swap owners in and out, without changing required signatures.

```move
module 0x1::multisig_account {
    entry fun swap_owners(multisig_account: &signer, to_swap_in: vector<address>, to_swap_out: vector<address>)
}
```

<a id="0x1_multisig_account_swap_owners_and_update_signatures_required"></a>

## Function `swap_owners_and_update_signatures_required`

Swap owners in and out, updating number of required signatures.

```move
module 0x1::multisig_account {
    entry fun swap_owners_and_update_signatures_required(multisig_account: &signer, new_owners: vector<address>, owners_to_remove: vector<address>, new_num_signatures_required: u64)
}
```

<a id="0x1_multisig_account_update_signatures_required"></a>

## Function `update_signatures_required`

Update the number of signatures required to execute transaction in the specified multisig account.

This can only be invoked by the multisig account itself, through the proposal flow.
Note that this function is not public so it can only be invoked directly instead of via a module or script. This
ensures that a multisig transaction cannot lead to another module obtaining the multisig signer and using it to
maliciously alter the number of signatures required.

```move
module 0x1::multisig_account {
    entry fun update_signatures_required(multisig_account: &signer, new_num_signatures_required: u64)
}
```

<a id="0x1_multisig_account_update_metadata"></a>

## Function `update_metadata`

Allow the multisig account to update its own metadata. Note that this overrides the entire existing metadata.
If any attributes are not specified in the metadata, they will be removed!

This can only be invoked by the multisig account itself, through the proposal flow.
Note that this function is not public so it can only be invoked directly instead of via a module or script. This
ensures that a multisig transaction cannot lead to another module obtaining the multisig signer and using it to
maliciously alter the number of signatures required.

```move
module 0x1::multisig_account {
    entry fun update_metadata(multisig_account: &signer, keys: vector<string::String>, values: vector<vector<u8>>)
}
```

<a id="0x1_multisig_account_create_transaction"></a>

## Function `create_transaction`

Create a multisig transaction, which will have one approval initially (from the creator).

```move
module 0x1::multisig_account {
    public entry fun create_transaction(owner: &signer, multisig_account: address, payload: vector<u8>)
}
```

<a id="0x1_multisig_account_create_transaction_with_hash"></a>

## Function `create_transaction_with_hash`

Create a multisig transaction with a transaction hash instead of the full payload.
This means the payload will be stored off chain for gas saving. Later, during execution, the executor will need
to provide the full payload, which will be validated against the hash stored on&#45;chain.

```move
module 0x1::multisig_account {
    public entry fun create_transaction_with_hash(owner: &signer, multisig_account: address, payload_hash: vector<u8>)
}
```

<a id="0x1_multisig_account_approve_transaction"></a>

## Function `approve_transaction`

Approve a multisig transaction.

```move
module 0x1::multisig_account {
    public entry fun approve_transaction(owner: &signer, multisig_account: address, sequence_number: u64)
}
```

<a id="0x1_multisig_account_reject_transaction"></a>

## Function `reject_transaction`

Reject a multisig transaction.

```move
module 0x1::multisig_account {
    public entry fun reject_transaction(owner: &signer, multisig_account: address, sequence_number: u64)
}
```

<a id="0x1_multisig_account_vote_transanction"></a>

## Function `vote_transanction`

Generic function that can be used to either approve or reject a multisig transaction
Retained for backward compatibility: the function with the typographical error in its name
will continue to be an accessible entry point.

```move
module 0x1::multisig_account {
    public entry fun vote_transanction(owner: &signer, multisig_account: address, sequence_number: u64, approved: bool)
}
```

<a id="0x1_multisig_account_vote_transaction"></a>

## Function `vote_transaction`

Generic function that can be used to either approve or reject a multisig transaction

```move
module 0x1::multisig_account {
    public entry fun vote_transaction(owner: &signer, multisig_account: address, sequence_number: u64, approved: bool)
}
```

<a id="0x1_multisig_account_vote_transactions"></a>

## Function `vote_transactions`

Generic function that can be used to either approve or reject a batch of transactions within a specified range.

```move
module 0x1::multisig_account {
    public entry fun vote_transactions(owner: &signer, multisig_account: address, starting_sequence_number: u64, final_sequence_number: u64, approved: bool)
}
```

<a id="0x1_multisig_account_execute_rejected_transaction"></a>

## Function `execute_rejected_transaction`

Remove the next transaction if it has sufficient owner rejections.

```move
module 0x1::multisig_account {
    public entry fun execute_rejected_transaction(owner: &signer, multisig_account: address)
}
```

<a id="0x1_multisig_account_execute_rejected_transactions"></a>

## Function `execute_rejected_transactions`

Remove the next transactions until the final_sequence_number if they have sufficient owner rejections.

```move
module 0x1::multisig_account {
    public entry fun execute_rejected_transactions(owner: &signer, multisig_account: address, final_sequence_number: u64)
}
```
