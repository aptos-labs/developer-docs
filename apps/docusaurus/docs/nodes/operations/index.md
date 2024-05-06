---
title: "Bootstrap a Node"
slug: "operations-index"
---

# Bootstrap a Node with historical data

Bootstrapping a new node usually only depends on [state sync](../../guides/state-sync.md) in its fast sync mode, which synchronises to a recent state with help from its peers and start syncing recent ledger history from there. However, if longer ledger history is needed for any reason, we have these choices:

- ### [Bootstrap from a Snapshot](../full-node/bootstrap-fullnode.md)
- ### [Bootstrap from a Backup](../full-node/aptos-db-restore.md)
