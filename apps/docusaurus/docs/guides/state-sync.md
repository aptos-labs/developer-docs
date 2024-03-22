---
title: "State Synchronization"
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

Nodes in an Aptos network (e.g., validators, VFNs and PFNs) must always be synchronized to the latest blockchain state.
The [state synchronization](https://medium.com/aptoslabs/the-evolution-of-state-sync-the-path-to-100k-transactions-per-second-with-sub-second-latency-at-52e25a2c6f10) (state sync) component that runs on each node is responsible for this. State sync
identifies and fetches new blockchain data from the peers, validates the data and persists it to local storage. This
document explains how state sync works and how to configure it.

:::danger Manual configuration
Most users should not need to configure state sync. State sync will automatically select the
best configuration for your node. You should only manually configure state sync if you have a specific use case
that requires it. Selecting the wrong configuration will lead to slower syncing times and degraded performance.
:::

## State sync

At a high-level, state sync operates in two phases. First, all nodes will bootstrap on startup (in the **bootstrapping phase**).
This allows the node to catch up to the latest state in the Aptos blockchain. Next, the node will stay up-to-date with the blockchain
by continuously syncing (in the **continuous syncing phase**). Each of these phases has different modes of operation.

:::tip Need to start a node quickly?
If you need to start a node quickly, here's what we recommend by network and use case:

- **Devnet**: To sync the entire blockchain history, use [intelligent syncing](state-sync.md#intelligent-syncing). Otherwise, use [fast sync](state-sync.md#fast-syncing).
- **Testnet**: To sync the entire blockchain history, restore from a [backup](../nodes/full-node/aptos-db-restore.md). Otherwise, download [a snapshot](../nodes/full-node/bootstrap-fullnode.md) or use [fast sync](state-sync.md#fast-syncing).
- **Mainnet**: To sync the entire blockchain history, restore from a [backup](../nodes/full-node/aptos-db-restore.md). Otherwise, use [fast sync](state-sync.md#fast-syncing).
  :::

### Bootstrapping phase

When the node starts, state sync will perform bootstrapping by using the configured bootstrapping mode. There are several
bootstrapping modes:

- **Execute all the transactions since genesis**. In this mode, the node will retrieve from the Aptos network all the
  transactions since genesis, i.e., since the start of the blockchain's history, and re-execute those transactions.
  Naturally, this mode takes the longest amount of time because it must process all transactions since the network began.
- **Apply transaction outputs since genesis**. In this mode, the node will retrieve all the transactions since genesis,
  but it will skip transaction re-execution and instead apply the outputs of the transactions that were previously
  produced by validator execution. This mode reduces the amount of CPU time required, but still processes all transactions
  since the network began.
- **Intelligent syncing since genesis**. In this mode, the node will retrieve all the transactions
  since genesis and will either execute the transactions, or apply the transaction outputs, depending on whichever is
  faster, per data chunk. This allows the node to adapt to CPU and network resource constraints more efficiently.
  This mode is the default mode for devnet and other testing environments.
- **Fast syncing**. In this mode, the node will skip the transaction history in the blockchain and will download only
  the latest blockchain state directly. As a result, the node will not have the historical transaction data, but it will
  be able to catch up to the Aptos network much more rapidly. This mode is the default mode for testnet and mainnet.

:::tip Bootstrapping defaults?
The default bootstrapping mode depends on the network type:

- **Testnet and Mainnet**: The default bootstrapping mode is fast sync, because these networks are long-lived
  and have a large amount of historical data.
- **Devnet and other networks**: The default bootstrapping mode is intelligent syncing, because these networks are
  typically short-lived and have a small amount of historical data.
  :::

### Continuous syncing phase

After the node has bootstrapped and caught up to the Aptos network initially, state sync will then move into
the continuous syncing phase to stay up-to-date with the blockchain. There are several continuous syncing modes:

- **Executing transactions**. This mode will keep the node up-to-date by executing new transactions as they are
  committed to the blockchain.
- **Applying transaction outputs**. This mode will keep the node up-to-date by skipping the transaction execution
  and only applying the outputs of the transactions as previously produced by validator execution.
- **Intelligent syncing**. This mode will keep the node up-to-date by either executing the transactions, or applying
  the transaction outputs, depending on whichever is faster, per data chunk. This allows the node to adapt to CPU and
  network resource constraints more efficiently. This is the default mode for all environments.

:::tip Continuous syncing defaults?
The default continuous syncing mode is always intelligent syncing, because this mode is the most performant.
:::

## Configuring state sync

The snippets below provide instructions for configuring state sync on your nodes for different use cases.
These configurations can be added to your node's configuration file, e.g., `fullnode.yaml` or `validator.yaml`.

:::danger Manual configuration
You should only manually configure state sync if you have a specific use case that requires it. Selecting the wrong
configuration will lead to slower syncing times and degraded performance.
:::

### Executing all transactions

To execute all the transactions since genesis and continue to execute new
transactions as they are committed, add the following to your node
configuration file (for example,`fullnode.yaml` or `validator.yaml`):

```yaml
state_sync:
  state_sync_driver:
    bootstrapping_mode: ExecuteTransactionsFromGenesis
    continuous_syncing_mode: ExecuteTransactions
```

:::tip Verify node syncing
While your node is syncing, you'll be able to see the
[`aptos_state_sync_version{type="synced"}`](../nodes/full-node/verify-pfn.md) metric gradually increase.
:::

### Applying all transaction outputs

To apply all transaction outputs since genesis and continue to apply new
transaction outputs as transactions are committed, add the following to your
node configuration file:

```yaml
state_sync:
  state_sync_driver:
    bootstrapping_mode: ApplyTransactionOutputsFromGenesis
    continuous_syncing_mode: ApplyTransactionOutputs
```

:::tip Verify node syncing
While your node is syncing, you'll be able to see the
[`aptos_state_sync_version{type="synced"}`](../nodes/full-node/verify-pfn.md) metric gradually increase.
:::

### Intelligent syncing

To execute or apply all transactions and outputs since genesis (and continue to
do the same as new transactions are committed), add the following to your node
configuration file:

```yaml
state_sync:
  state_sync_driver:
    bootstrapping_mode: ExecuteOrApplyFromGenesis
    continuous_syncing_mode: ExecuteTransactionsOrApplyOutputs
```

:::tip Verify node syncing
While your node is syncing, you'll be able to see the
[`aptos_state_sync_version{type="synced"}`](../nodes/full-node/verify-pfn.md) metric gradually increase.
:::

### Fast syncing

:::caution Proceed with caution
Fast sync should only be used as a last resort for validators and VFNs. This is because fast sync skips the
blockchain history, and: (i) reduces data availability in the network (as the blockchain history is truncated on
the fast synced nodes); and (ii) hinders validator consensus performance (if too much data has been skipped).
Validators that fast sync may require additional running time before they are eligible to participate in consensus.
:::

To download the latest blockchain state and continue to process new
transactions as they are committed, add the following to your
node configuration file:

```yaml
state_sync:
  state_sync_driver:
    bootstrapping_mode: DownloadLatestStates
    continuous_syncing_mode: ExecuteTransactionsOrApplyOutputs
```

:::tip Verify node syncing
While your node is syncing, you'll be able to see the
`aptos_state_sync_version{type="synced_states"}` metric gradually increase.
However, `aptos_state_sync_version{type="synced"}` will only increase once
the node has bootstrapped. This may take several hours depending on the
amount of data, network bandwidth and node resources available.

**Note:** If `aptos_state_sync_version{type="synced_states"}` does not
increase then do the following:

1. Double-check the node configuration file has correctly been updated.
2. Make sure that the node is starting up with an empty storage database
   (i.e., that it has not synced any state previously).
   :::

## Archival PFNs

To operate an archival PFN (which is a PFN that contains all blockchain data
since the start of the network, i.e., genesis), you should:

1. Make sure that your PFN is **not** using fast syncing as the bootstrapping mode.
   Fast syncing will skip the transaction history. Instead, using a mode that syncs from genesis,
   e.g., intelligent syncing from genesis.
2. Disable the ledger pruner, as described in the [Data Pruning document](data-pruning.md#disable-the-ledger-pruner).
   This will ensure that no data is deleted and the PFN contains all blockchain data.

Following these two steps together will ensure that your PFN fetches all data since
genesis, and continues to synchronize without pruning any data.

:::danger Archival nodes are deprecated
Running and maintaining archival nodes is expensive and slow, as the amount of data being stored
on the node will grow endlessly. As a result, archival nodes have officially been deprecated.
If you wish to store and maintain the entire blockchain history, we recommend using an [Indexer](../indexer/indexer-landing.md).
:::

## Security implications and data integrity

Each of the different state sync syncing modes perform data integrity verifications to
ensure that the data being synced to the node has been correctly produced
and signed by the validators. This occurs slightly differently for
each syncing mode:

1. **Executing transactions**: Executing transactions from genesis is the most secure syncing mode. It will
   verify that all transactions since the beginning of time were correctly agreed
   upon by consensus and that all transactions were correctly executed by the
   validators. All resulting blockchain state will thus be re-verified by the
   syncing node.
2. **Applying transaction outputs**: Applying transaction outputs from genesis is faster than executing all
   transactions, but it requires that the syncing node trusts the validators to
   have executed the transactions correctly. However, all other
   blockchain state is still manually re-verified, e.g., consensus messages,
   the transaction history and the state hashes are still verified.
3. **Intelligent syncing**: Intelligent syncing will either execute or apply the transaction outputs
   depending on whichever is faster, per data chunk. Thus, the security implications of using this mode
   are identical to those of applying transaction outputs.
4. **Fast syncing**: Fast syncing skips the transaction history and downloads the latest
   blockchain state before continuously syncing. To do this, it requires that the
   syncing node trust the validators to have correctly agreed upon all
   transactions in the transaction history as well as trust that all transactions
   were correctly executed by the validators. However, all other blockchain state
   is still manually re-verified, e.g., epoch changes and the resulting blockchain states.

All the syncing modes get their root of trust from the validator set
and cryptographic signatures from those validators over the blockchain data.
For more information about how this works, see the [state synchronization blog post](https://medium.com/aptoslabs/the-evolution-of-state-sync-the-path-to-100k-transactions-per-second-with-sub-second-latency-at-52e25a2c6f10).
