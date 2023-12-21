---
title: "Node Liveness Criteria"
---

When you participate in the Aptos network, your validator node and the validator fullnode must pass liveness checks within 24 hours of being selected to participate in the network, and at a regular cadence onwards. This is required to ensure that your nodes contribute to the health of the overall network.

This document describes how you can verify the status of your deployed validator node in the Aptos network to meet our success criteria. Once your nodes are up and running, you can also [measure their success](../../measure/index.md) using the [Node Health Checker](../../measure/node-health-checker.md) and [Node Inspection Service](../../measure/node-inspection-service.md).

The liveness of your validator node will be evaluated using both on-chain and off-chain data. On-chain data will be pulled directly from your validator node syncing to the chain, and off-chain data will be received from your validator node via telemetry. Such data includes:

- At least one proposed block per hour. This data will be used to determine your node’s availability over time.
- Telemetry data pushed by your validator node:
  - A continuously increasing synced version of your node, alongside a reasonable delta from the highest state of the blockchain.
  - Aptos Labs' validator is among your set of peers.

## Verifying the liveness of your node

### Monitoring tools

If you are a node operator, then several tools are available to you (provided by the Aptos team and the community) to verify the status of your own node locally. This local status will act as a good proxy for overall node health as seen from the network level and as reported by the remote analytics system operated by Aptos Labs.

- Locally, the best way to verify your node status is to interact with your node. You can monitor your local metrics endpoint by running a `curl` command and observe various key metrics. Follow the steps described in detail in the [Verify initial synchronization](../../full-node/fullnode-source-code-or-docker.md#verify-the-correctness-of-your-fullnode) document.

- To make your validator node more observable, install monitoring tools that scrape the local metrics endpoint:
  - For Kubernetes based deployments, install the monitoring Helm chart ([https://github.com/aptos-labs/aptos-core/tree/main/terraform/helm/monitoring](https://github.com/aptos-labs/aptos-core/tree/main/terraform/helm/monitoring)).
  - Locally, you may run Prometheus and Grafana directly. Dashboards that utilize the metrics can be found here: ([https://github.com/aptos-labs/aptos-core/tree/main/dashboards](https://github.com/aptos-labs/aptos-core/tree/main/dashboards)).

The above two monitoring methods rely on your node’s reported Prometheus Metrics. Of particular importance, the following metrics are directly related to the liveness success criteria above:

- `aptos_consensus_proposals_count`
- `aptos_state_sync_version{type="synced"}`
- `aptos_connections`

### Monitor via telemetry

Remotely, the Aptos team can verify the state of your node via [telemetry](../../../reference/telemetry.md). When you enable telemetry on your node, the Aptos node binary will send telemetry data in the background to the Aptos team.

Telemetry data from your node is necessary for the Aptos team to evaluate the off-chain liveness metrics for verification. You can view the exact contents of each telemetry call by checking the `DEBUG` logs on your validator. If your node is using the default config without explicitly disabling telemetry, and has HTTPS egress access to the internet, then it will report various key metrics to Aptos Labs, such as the current synced version and peers connected to your node.

Aptos Labs will also observe the on-chain events such as proposals per hour on your node, as defined in the liveness criteria.

Aptos Labs’ own analytics system will aggregate all the off-chain telemetry data and all on-chain participation events to calculate your node’s health. Node health will be displayed on the community platform site as well as on a separate validator leaderboard for each testnet.
