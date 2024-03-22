---
title: "Upgrade Nodes"
slug: "update-validator-node"
---

# Upgrade Nodes

This section contains tutorials for upgrading your validator and validator fullnode (VFN). Upgrades are a
common operation for maintaining your nodes. Aptos Labs frequently releases new versions of the
Aptos node software, and you should keep your nodes up to date to ensure they are secure and reliable.

:::danger
Running old node versions and failing to update your nodes can lead to security vulnerabilities, performance
degradation, and network instability. It is important to keep your nodes up to date.
:::

There are two primary ways to upgrade your nodes. The first is a **simple** **upgrade** of the node software, and the
second is a more **complex** **failover** process between your validator and VFN. The failover process is useful for
minimizing validator downtime when you need to upgrade.

## Simple Upgrade

To perform a simple node upgrade, you can upgrade the validator and VFN individually, one at a time.
This process is straightforward and can be repeated for each node. The steps are as follows:

1. First, stop the node manually (e.g., the validator or VFN). To stop the node, it will depend on your deployment method.
2. Next, update the node software to the latest version. This may require downloading the latest binary or Docker image,
   or recompiling the source code. Depending on your deployment method, you can perform this step in the background while the node is still running.
   This should help minimize downtime.
3. Finally, once you have updated the node software, restart the node using the latest software version and the original
   commands you used to start the node.

   :::tip Repeat for each node
   You will need to perform the simple upgrade process for each node individually. This means you will need to upgrade
   the validator and VFN separately.
   :::

# Upgrade via VFN Failover

To minimize validator downtime, you can perform a failover process between your validator and VFN. This process involves
upgrading the VFN to the latest version and converting it to the validator. Once the VFN has been converted to the new
validator, you can then upgrade the original validator and convert it into the new VFN.

The benefit of this approach is that it minimizes validator downtime by allowing you to prepare the new
validator while the original validator is still running. For a community-provided guide using Docker, see this
[Aptos Community Forum Post](https://forum.aptoslabs.com/t/failover-and-migrate-validator-nodes-for-less-downtime/144846).

:::danger Node differences
Before you begin the failover process, it is important to understand that the data maintained by the two nodes
(i.e., validator and VFN) is not identical. The VFN is missing the `consensus_db` and the `secure-data.json`
file, and both nodes use different configuration files (including identities).

If you are not comfortable with the failover process, you should consider performing a simple upgrade instead.
:::

To perform a VFN failover upgrade, you should follow these steps:

1. Update your DNS to swap the [network addresses](./connect-to-aptos-network.md#3-update-on-chain-network-addresses) between the validator and VFN.
2. Stop the VFN and update the node software to the latest version. This may require downloading the latest binary or Docker image,
   or recompiling the source code. In addition, you will need to copy the `consensus_db` and `secure-data.json` file from the validator to the VFN,
   as well as the validator configuration file (including validator identities).
3. Once the VFN is primed to become the new validator, you can stop the old validator, and start the new validator
   immediately. This will minimize validator downtime.

   :::danger Only one validator at a time
   It is important to ensure that only a single validator is running at any given time. If you fail to stop
   the original validator before starting the new validator, you will have two validators running at the same time,
   and this will lead to consensus failures and performance issues on your nodes.
   :::

4. Now, you will have a validator running the new code version. Observe that before DNS changes take effect your new
   validator will only have outbound connections.
5. Next, prepare the original validator to become the new VFN. This will involve updating the node software to the latest
   version, and copying the VFN configuration file (including VFN identities) across.
6. Once the original validator is ready to become the new VFN, you can start the new VFN.

:::tip
Once you have completed the failover process, you should monitor the new validator and VFN to ensure they are running
correctly, and that your validator is still participating in consensus.
:::
