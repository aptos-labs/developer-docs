---
title: "Verify a PFN"
slug: "verify-pfn"
sidebar_position: 10
---

After deploying your PFN, you can verify that it is operating correctly by checking several of the PFN's metrics.
This document describes the common types of checks that you might wish to perform.

:::tip
You can learn more about Aptos metrics in the [Node Inspection Service](../measure/node-inspection-service.md) documents.
:::

### Verify synchronization

During the initial synchronization of your PFN, there may be a lot of data to transfer (read more about how state
sync works in the [state sync](../../guides/state-sync.md) guide). You can monitor state sync progress
by querying the metrics port to see what version your node is currently synced to. Run the following example
command to see the currently synced version of your node:

```bash
curl 127.0.0.1:9101/metrics 2> /dev/null | grep "aptos_state_sync_version{.*\"synced\"}" | awk '{print $2}'
```

The command will output the current synced version of your node. For example:

```bash
71000
```

Compare the synced version returned by this command (e.g., `71000`) with the highest version shown on the
[Aptos explorer page](https://explorer.aptoslabs.com/?network=mainnet). If your node is catching up to the highest
version, it is synchronizing correctly. It is fine if the explorer page differs by a few versions, as the explorer
nodes may sync with some variance.

:::caution Using fast sync?
If your node is fast syncing, the command may show `0` until it has finally caught up. To verify that the node is
fast syncing, run the following command:

```bash
curl 127.0.0.1:9101/metrics 2> /dev/null | grep "aptos_state_sync_version{.*\"synced_states\"}" | awk '{print $2}'
```

This should show an increasing number of synced states. It may take several hours for your node to fast sync to the
latest version. Eventually, once fast syncing is complete, the `aptos_state_sync_version{.*"synced"}` command will
return the current synced version of your node.

You can read more about fast syncing here: [State sync bootstrapping](../../guides/state-sync.md#bootstrapping-phase).
:::

### (Optional) Verify outbound network connections

If you wish, you can also check the outbound network connections for your PFN. The number of outbound network
connections should be more than `0` for healthy PFNs. Run the following command:

```bash
curl 127.0.0.1:9101/metrics 2> /dev/null | grep "aptos_connections{direction=\"outbound\""
```

The above command will output the number of outbound network connections for your node. For example:

```bash
curl 127.0.0.1:9101/metrics 2> /dev/null | grep "aptos_connections{direction=\"outbound\""
aptos_connections{direction="outbound",network_id="Public",peer_id="aabd651f",role_type="full_node"} 3
```

If the number of outbound connections returned is `0`, then it means your node cannot connect to the Aptos blockchain. If this happens to you, follow these steps to resolve the issue:

1. Update your node to the latest release by following the [Update your Node](./update-fullnode-with-new-releases.md).
2. Remove any `seed` peers you may have added to your configuration file. The seeds may be preventing you from
   connecting to the network. Seed peers are discussed in the [Connecting your PFN to seed peers](./fullnode-network-connections.md#connecting-to-seed-peers) section.
3. Ensure that you have used the correct `genesis.blob` and `waypoint.txt` files for your network. This is a common error.

### (Optional) Examine Docker ledger size

If you are running your PFN using Docker, you can monitor the size of the blockchain ledger by entering the Docker
container and checking the size. This will allow you to see how much storage the blockchain ledger is currently consuming.

- First, run `docker container ls` on your terminal and copy the NAME field output. This will be a string similar to `public_full_node_fullnode_1`.
- Next, run these commands to check the storage size consumed by the ledger, using the NAME field you copied over in place of `public_full_node_fullnode_1`:

```bash
# Obtain the container ID:
id=$(docker container ls | grep public_full_node_fullnode_1 | grep -oE "^[0-9a-zA-Z]+")

# Enter the container:
docker exec -it $id /bin/bash

# Observe the volume (ledger) size:
du -cs -BM /opt/aptos/data
```

[rest_spec]: https://github.com/aptos-labs/aptos-core/tree/main/api
[devnet_genesis]: https://devnet.aptoslabs.com/genesis.blob
[devnet_waypoint]: https://devnet.aptoslabs.com/waypoint.txt
[aptos-labs/aptos-core]: https://github.com/aptos-labs/aptos-core.git
[status dashboard]: https://status.devnet.aptos.dev
