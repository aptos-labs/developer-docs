---
title: "Data Pruning"
---

All Aptos nodes (e.g., validators, VFNs and PFNs) process transactions and commit new data to the blockchain.
As the blockchain grows (indefinitely), nodes can manage the amount of storage disk space required by pruning old
blockchain data. To achieve this, Aptos nodes prune the blockchain **ledger history** in their database, which
contains the history of all transactions. The ledger history may be **complete** (e.g., if you're operating an archival
node), or **pruned** to a certain window of transactions (to reduce storage requirements).

By default, ledger pruning is enabled on all nodes, and the pruning window can be configured. This document
describes how you can configure the behavior of the ledger pruner.

:::tip Default pruning window
The default configuration of the ledger pruner is to keep only the most recent 150 million transactions.
This roughly corresponds to around ~200G of disk space, depending on transaction types and outputs.
Almost all Aptos nodes in testnet and mainnet use the default configuration. If you instead wish to run
an archival node, follow the instructions, [here](../guides/state-sync.md#archival-pfns).
:::

## Disable the ledger pruner

If you wish to disable the ledger pruner entirely, you can do so by adding the following to the node
configuration file, e.g., `fullnode.yaml` or `validator.yaml`.

```yaml
storage:
  storage_pruner_config:
    ledger_pruner_config:
      enable: false
```

:::danger Unbounded storage growth
Be warned that disabling the ledger pruner will result in unbounded storage growth. This can
lead to the storage disk filling up very quickly.
:::

## Configure the ledger pruner

If you wish, you can configure the size of the ledger pruning window (i.e., the number of the most recent transactions
to retain in storage). To do this, add the following to the node configuration file, e.g., `fullnode.yaml` or `validator.yaml`.

```yaml
storage:
  storage_pruner_config:
    ledger_pruner_config:
      prune_window: 100000000 # 100 million transactions
```

:::danger Minimum pruning window
Setting the pruning window smaller than 100 million transactions can lead to runtime errors and damage the
health of the node.
:::
