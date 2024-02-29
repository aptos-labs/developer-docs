---
title: "Node Health"
---

This document describes how you can verify and monitor the health of your validator and validator fullnode (VFN) in the
Aptos network. Many of the methods described here rely on the runtime metrics that your nodes collect and report. These
metrics are collected by the Aptos node binary and are exposed via a Prometheus metrics endpoint. For a detailed
description of the important metrics, see the [Node Inspection Service](../../measure/node-inspection-service.md) and
[Important Node Metrics](../../measure/important-metrics.md) documentation.

## Initial Node Verification

After deploying your nodes and connecting them to the Aptos network, you should verify that your nodes are running
correctly.

:::tip First time?
In some environments, e.g., `mainnet` and `testnet`, your VFN will begin syncing first (before your validator is able to sync).
This is normal behaviour. Once your VFN has finished syncing, your validator node will start syncing and eventually start participating in consensus.
:::

You can verify the correctness of your nodes by inspecting several simple metrics. Follow these steps:

1. Check if your nodes are state syncing by running this command:

   ```bash
   curl 127.0.0.1:9101/metrics 2> /dev/null | grep "aptos_state_sync_version"
   ```

   You should expect to see the `synced` or `synced_states` versions increasing. The versions should start increasing
   for your VFN first, then eventually your validator node will start syncing.

   :::tip Cloud deployment?
   You may need to replace `127.0.0.1` with your validator or VFN IP/DNS if deployed on the cloud.
   :::

2. Verify that your validator is connecting to other peers on the network.

   ```bash
   curl 127.0.0.1:9101/metrics 2> /dev/null | grep "aptos_connections{.*\"Validator\".*}"
   ```

   The command will output the number of inbound and outbound connections of your validator node. For example:

   ```bash
   aptos_connections{direction="inbound",network_id="Validator",peer_id="f326fd30",role_type="validator"} 5
   aptos_connections{direction="outbound",network_id="Validator",peer_id="f326fd30",role_type="validator"} 2
   ```

   As long as one of the metrics is greater than zero, your validator node is connected to at least one of the peers on the network. If your validator is not
   connected to any peers, make sure your VFN has completed syncing first. Once your VFN has finished syncing, your validator
   node will start syncing and eventually be able to connect to other peers.

3. After your node syncs to the latest version, you can also check if consensus is making progress, and your node is proposing.

   ```bash
   curl 127.0.0.1:9101/metrics 2> /dev/null | grep "aptos_consensus_current_round"

   curl 127.0.0.1:9101/metrics 2> /dev/null | grep "aptos_consensus_proposals_count"
   ```

   You should expect to see these numbers continue to increase.

## Local Monitoring

If you are a node operator, there are several tools available to you to verify the health of your node going forward:

- **Metrics:** You can monitor your local metrics endpoint by running a `curl` command against the
  [Node Inspection Service](../../measure/node-inspection-service.md) and verify key metrics. For example, you can
  verify the synchronization status of your node by running the command outlined in the
  [Verify synchronization](../../full-node/verify-pfn.md#verify-synchronization) section.

- **REST API:** You can also monitor your node's health by querying the REST API. For example, you can verify the
  current block height of your node by pinging the index page of your node's REST API. For more information, see the
  [Aptos API Specification](../../../nodes/aptos-api-spec.md).

- **Monitoring tools:** To improve observability, you can also install monitoring tools that scrape the local metrics endpoint:
  - For Kubernetes based deployments, install the monitoring Helm chart ([https://github.com/aptos-labs/aptos-core/tree/main/terraform/helm/monitoring](https://github.com/aptos-labs/aptos-core/tree/main/terraform/helm/monitoring)).
  - Locally, you may run Prometheus and Grafana directly. Dashboards that utilize the metrics can be found here: ([https://github.com/aptos-labs/aptos-core/tree/main/dashboards](https://github.com/aptos-labs/aptos-core/tree/main/dashboards)).

## Telemetry

The Aptos Labs team can also monitor your node remotely using [Node Telemetry](../../../reference/telemetry.md). When you enable telemetry on
your nodes, the Aptos node binary will send telemetry data in the background, which includes the node's metrics.
Telemetry data from your node is necessary to evaluate the performance, liveness and health of your nodes.

If your node is using the default config without explicitly disabling telemetry, and has `HTTPS` egress access to the
internet, then it will report various key metrics to Aptos Labs. Aptos Labs will also observe the on-chain events
such as proposals per hour on your node, as defined in the liveness criteria.
