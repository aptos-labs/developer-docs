---
title: "Reading data"
---

# Ways to read data from the blockchain

There are four ways to read state from the blockchain:

- Resource state
- View functions
- Transactions
- Indexer

For the purposes of this tutorial, we will use the [Aptos Explorer](https://explorer.aptoslabs.com?network=mainnet), but there are many other explorers that provide various different features. You can check them out on the foundation's [explorer list](https://aptosfoundation.org/ecosystem/projects/explorers).

## 1. Fetching resource state

A resource is a collection of data on-chain at an address. It is the representation of a Move struct, which is how all
data is stored on-chain. This data can be fetched at it's latest ledger version, or an older version in the past.

Here is an example of how to read resources in a browser using an explorer. You can use any explorer you like, but for
this guide, we'll use the Aptos Explorer.

1. You can navigate to an [account page](https://explorer.aptoslabs.com/account/0x1?network=mainnet).
2. Then, click on the [resources tab](https://explorer.aptoslabs.com/account/0x1/resources?network=mainnet).

In this example, you can see the resources for the Aptos framework address 0x1. The explorer shows each resource with a
type, which is the Move struct name, and each of the values within the resource.

This can similarly be run via the SDKs (TODO LINK) and the aptos CLI (TODO LINK).

:: tip
Imagine looking through pages of a book. The address is the page of the book, and the resources are each of the
paragraphs. Individual words in the book are values within the resources. The second version of the book, may have
different words than the first edition of the book. But, generally the reader wants the latest version to read. The same
applies to the blockchain, and the default values read are the latest version!
::

## 2. View functions

A view function is a Move function created for reading on-chain data. This allows for a developer to define functions to
read data outside a transaction. View functions can also be run for different ledger versions. Though, they are often
run for just the latest state.

Here is an example of how to read a view function in a browser using the Aptos Explorer.

1. Navigate to an [account page](https://explorer.aptoslabs.com/account/0x1).
2. Then, click on the [modules tab](https://explorer.aptoslabs.com/account/0x1/modules/code/account?network=mainnet)
   this shows you the code deployed at the address.
3. Then, navigate to the [view tab](https://explorer.aptoslabs.com/account/0x1/modules/view/account?network=mainnet).
4. Then, you can scroll down the left side, and choose a view function to run. For this case, we'll choose
   to [view current timestamp in microseconds](https://explorer.aptoslabs.com/account/0x1/modules/view/timestamp/now_microseconds?network=mainnet).
5. Click view, and you can see that a result pops up as the UNIX timestamp in microseconds.
6. When you click view again, you can see the value increases, as time passes. This button will always fetch the latest
   state.

This can similarly be run via the SDKs (TODO LINK) and the aptos CLI (TODO LINK).

## 3. Transactions

All transactions on the blockchain are available to be read on the blockchain. Transactions show the outputs of a
transaction as well as any on-chain events that are associated with the transaction.

(TODO Details of a transaction)

Here is an example of how to read transactions with the Aptos Explorer.

1. The [main page](https://explorer.aptoslabs.com/) shows a list of all user transactions.
2. An [account page](https://explorer.aptoslabs.com/account/0x517589e2a01b680c291ce2c3c94fbb755896287158ea790bdcd5fa2533b5a70d?network=mainnet)
   can show all the transactions that an individual account has interacted with.
3. A [transaction page](https://explorer.aptoslabs.com/txn/55585502?network=mainnet) can show the details of a specific
   transaction.
4. For the specific transaction, you can view a couple parts that are always visible in a transaction.
   1. The [Changes tab](https://explorer.aptoslabs.com/txn/55585502/changes?network=mainnet) shows information about the output of the transaction. This is the final state of the modified resources during the transaction. Note, that it will not tell you the difference between before and after.
   2. The [Payload tab](https://explorer.aptoslabs.com/txn/55585502/payload?network=mainnet) shows the inputs to the transaction. In this case, you can see it's a coin transfer.
   3. The [Events tab](https://explorer.aptoslabs.com/txn/55585502/events?network=mainnet) shows the events associated with the transaction. In this case, you can see it shows a withdraw and a deposit.

## 4. Indexer

An indexer is a program that processes the transactions as they are committed on-chain, and transforms them into a
faster and easier way to access data.

You may have already seen an example of using an indexer today. The [main page](https://explorer.aptoslabs.com/) of the explorer
uses the indexer to filter out non-user transactions. Other use cases are the activity in your wallet that shows transfers to and from your account.

# Learn more

(TODO: redirect elsewhere)
