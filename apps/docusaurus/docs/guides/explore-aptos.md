---
title: "Explore Aptos"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Use the Aptos Explorer

The [Aptos Explorer](https://explorer.aptoslabs.com/) lets you delve into the activity on the Aptos blockchain in great detail, seeing transactions, validators, and account information. With the Aptos Explorer, you can ensure that the transactions performed on Aptos are accurately reflected. Note, the Aptos ecosystem has [several other explorers](https://aptosfoundation.org/ecosystem/projects/explorers) to choose from.

The Aptos Explorer provides a one-step search engine across the blockchain to discover details about wallets, transactions, network analytics, user accounts, smart contracts, and more. The Aptos Explorer also offers dedicated pages for key elements of the blockchain and acts as the source of truth for all things Aptos. See the [Aptos Glossary](../reference/glossary.md) for definitions of many of the terms found here.

## Users

The Aptos Explorer gives you a near real-time view into the status of the network and the activity related to the core on-chain entities. It serves these audiences and purposes by letting:

- App developers understand the behavior of the smart contracts and sender-receiver transaction flows.
- General users view and analyze Aptos blockchain activity on key entities - transactions, blocks, accounts, and resources.
- Node operators check the health of the network and maximize the value of operating the node.
- Token holders find the best node operator to delegate the tokens and earn a staking reward.

## Common tasks

Follow the instructions here to conduct typical work in the Aptos Explorer.

### Select a network

The Aptos Explorer renders data from all Aptos networks: Mainnet, Testnet, Devnet, and your local host if configured. See [Aptos Blockchain Networks](../nodes/networks.md) for a detailed view of their purposes and differences.

To select a network in the [Aptos Explorer](https://explorer.aptoslabs.com/), load the explorer and use the _Select Network_ drop-down menu at the top right to select your desired network.

<div style={{textAlign:"center"}}>
<ThemedImage
alt="Select Network in Aptos Explorer"
sources={{
    light: useBaseUrl('/img/docs/0-explorer-select-network.png'),
    dark: useBaseUrl('/img/docs/0-explorer-select-network-dark.png'),
  }}
/>
</div>

### Find a transaction

One of the most common tasks is to track a transaction in Aptos Explorer. You may search by the account address, transaction version and hash, or block height and version.

To find a transaction:

1. Enter the value in the _Search transactions_ field near the top of any page.
2. Do not press return.
3. Click the transaction result that appears immediately below the search field, highlighted in green within the following screenshot:

<div style={{textAlign:"center"}}>
<ThemedImage
alt="Search Aptos Explorer for a transaction"
sources={{
    light: useBaseUrl('/img/docs/1-explorer-search-txn.png'),
    dark: useBaseUrl('/img/docs/1-explorer-search-txn-dark.png'),
  }}
/>
</div>

The resulting [Transaction details](#transaction-details) page appears.

### Find an account address

The simplest way to find your address is to use the [Aptos Petra Wallet](https://petra.app/docs/use).

Then simply append it to the following URL to load its details in the Aptos Explorer:
https://explorer.aptoslabs.com/account/

Like so:
https://explorer.aptoslabs.com/account/0x778bdeebb67d3914b181236c2f1f4acc0e561482fc265b9a5709488a97fb3303

See [Accounts](#accounts) for instructions on use.

## Explorer pages

This section walks you through the available screens in Aptos Explorer to help you find the information you need.

### Explorer home

The Aptos Explorer home page provides an immediate view into the total supply of Aptos coins, those that are now staked, transactions per second (TPS), and active validators on the network, as well as a rolling list of the latest transactions:

<div style={{textAlign:"center"}}>
<ThemedImage
alt="Aptos Explorer home page"
sources={{
    light: useBaseUrl('/img/docs/2-explorer-home.png'),
    dark: useBaseUrl('/img/docs/2-explorer-home-dark.png'),
  }}
/>
</div>

Click the **Transactions** tab at the top or **View all Transactions** at the bottom to go to the [Transactions](#transactions) page.

### Transactions

The _Transactions_ page displays all transactions on the Aptos blockchain in order, with the latest at the top of an ever-growing list.

In the transactions list, single-click the **Hash** column to see and copy the hash for the transaction or double-click the hash to go directly to the transaction details for the hash.

<div style={{textAlign:"center"}}>
<ThemedImage
alt="Aptos Explorer Transactions page with hash highlighted"
sources={{
    light: useBaseUrl('/img/docs/3-explorer-transactions.png'),
    dark: useBaseUrl('/img/docs/3-explorer-transactions-dark.png'),
  }}
/>
</div>

Otherwise, click anywhere else in the row of the desired transaction to load its [Transaction details](#transaction-details) page.

Use the controls at the bottom of the list to navigate back through transactions historically.

### Transaction details

The _Transaction details_ page reveals all information for a given transaction, starting with its default _Overview_ tab. There you can see a transaction's status, sender, version, gas fee, and much more:

<div style={{textAlign:"center"}}>
<ThemedImage
alt="Aptos Explorer Transaction Details tab"
sources={{
    light: useBaseUrl('/img/docs/4-explorer-txn-details.png'),
    dark: useBaseUrl('/img/docs/4-explorer-txn-details-dark.png'),
  }}
/>
</div>

Scrolling down on the Overview, you can also see the transaction's signature (with `public_key`) and hashes for tracking.

The Transaction details page offers even more information in the following tabs.

#### Events

The Transaction details _Events_ tab shows the transaction's [sequence numbers](../reference/glossary.md#sequence-number), including their types and data.

#### Payload

The Transaction details _Payload_ tab presents the transaction's actual code used. Click the down arrow at the bottom of the code block to expand it and see all contents.

#### Changes

The Transaction details _Changes_ tab shows the addresses, state key hashes, and data for each index in the transaction.

### Accounts

The _Accounts_ page aggregates all transactions, tokens, and other resources in a single set of views starting with its default _Transactions_ tab:

<div style={{textAlign:"center"}}>
<ThemedImage
alt="Aptos Explorer Accounts page"
sources={{
    light: useBaseUrl('/img/docs/5-explorer-account.png'),
    dark: useBaseUrl('/img/docs/5-explorer-account-dark.png'),
  }}
/>
</div>

You can load your account page by appending your account address to:
https://explorer.aptoslabs.com/account/

See [Find account address](#find-an-account-address) for more help.

On the Accounts > Transactions tab, click any transaction to go to its [Transaction details](#transaction-details) page.

As on the main [Transactions](#transactions) page, you may also single-click the **Hash** column to see and copy the hash for the transaction or double-click the hash to go directly to the transaction details for the hash.

As with Transactions, the Aptos Explorer provides tabs for additional information about the account.

#### Tokens

The _Tokens_ tab presents any assets owned by the account, as well as details about the tokens themselves (name, collection, and more). Click any of the assets to go to the [Token details](#token-details) page.

#### Token details

The _Token details_ page contains:

- _Overview_ tab including token name, owner, collection, creator, royalty, and more.
- _Activities_ tab showing all transfer types, the addresses involved, property version, and amount.

<div style={{textAlign:"center"}}>
<ThemedImage
alt="Aptos Explorer Token Activities tab"
sources={{
    light: useBaseUrl('/img/docs/6-explorer-token-activities.png'),
    dark: useBaseUrl('/img/docs/6-explorer-token-activities-dark.png'),
  }}
/>
</div>

On either tab, click an address to go to the _Account_ page for the address.

#### Resources

The _Resources_ tab presents a view of all types used by the account. Use the _Collapse All_ toggle at top right to see all types at once.

#### Modules

The _Modules_ tab displays the source code and ABI used by the account. Select different modules on the left sidebar to view Move source code and ABI of a specific module. Use the expand button at the top right of the source code to expand the code for better readability.

<div style={{textAlign:"center"}}>
<ThemedImage
alt="Aptos Explorer Modules tab"
sources={{
    light: useBaseUrl('/img/docs/10-explorer-modules.png'),
    dark: useBaseUrl('/img/docs/10-explorer-modules-dark.png'),
  }}
/>
</div>

#### Info

The _Info_ tab shows the [sequence number](../reference/glossary.md#sequence-number) and authentication key used by the account.

### Blocks

The _Blocks_ page presents a running list of the latest blocks to be committed to the Aptos blockchain.

<div style={{textAlign:"center"}}>
<ThemedImage
alt="Aptos Explorer Latest Blocks page"
sources={{
    light: useBaseUrl('/img/docs/7-explorer-latest-blocks.png'),
    dark: useBaseUrl('/img/docs/7-explorer-latest-blocks-dark.png'),
  }}
/>
</div>

Click the:

- Hash to see and copy the hash of the block.
- First version to go to the first transaction in the block.
- Last version to go to the last transaction in the block.
- Block ID or anywhere else to go to the [Block details](#block-details) page.

### Block details

The _Block details_ page contains:

- _Overview_ tab including block height, versions, timestamp, proposer, epoch and round.
- _Transactions_ tab showing the version, status, type, hash, gas, and timestamp.

<div style={{textAlign:"center"}}>
<ThemedImage
alt="Aptos Explorer Block details page"
sources={{
    light: useBaseUrl('/img/docs/8-explorer-block-transactions.png'),
    dark: useBaseUrl('/img/docs/8-explorer-block-transactions-dark.png'),
  }}
/>
</div>

On the _Overview_ tab, click the versions to go to the related transactions or double-click the address of the proposer to go to the _Account_ page for that address.

On the _Transactions_ tab, click the desired row to go to the _Transactions details_ page.

### Validators

The _Validators_ page lists every validator on the Aptos blockchain, including their validator address, voting power, public key, fullnode address, and network address.

<div style={{textAlign:"center"}}>
<ThemedImage
alt="Aptos Explorer Validators page"
sources={{
    light: useBaseUrl('/img/docs/9-explorer-validators.png'),
    dark: useBaseUrl('/img/docs/9-explorer-validators-dark.png'),
  }}
/>
</div>

Click the validator address to go to the _Account_ page for that address. Click the public key or any of the other addresses to see and copy their values.
