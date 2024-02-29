---
title: "Telemetry"
---

When you run a node on an Aptos network, your node will send telemetry data to Aptos Labs. All node types
(e.g., validators, VFNs and PFNs) send telemetry data. This also occurs for other binaries (e.g., the Aptos CLI).
If you would prefer not to send telemetry, you can disable telemetry using the instructions below.

:::danger No personal information is collected
The Aptos node binary does **not** collect any personal information, such as usernames or email addresses.
It only collects relevant node telemetry, such as software version, node metrics, operating system information and the IP
address of your node. This data is used to enhance the decentralization and performance of the network.
:::

## Node telemetry

The list below shows the categories of information collected by Aptos node telemetry:

- **Core metrics:** Core metrics are those emitted by the core components of the `aptos-node` binary. These include,
  state sync, consensus, mempool and storage. You can see the full list of core metrics,
  [here](https://github.com/aptos-labs/aptos-core/blob/main/crates/aptos-telemetry/src/core_metrics.rs#L14-L29).

- **Build information**: Rust build information, including the versions of Rust, cargo, the target architecture and
  the build tag are also collected. You can see the full list of build information, [here](https://github.com/aptos-labs/aptos-core/blob/main/crates/aptos-build-info/src/lib.rs#L8-L20).

- **System information**: System information is also collected by node telemetry. This includes resource information
  (e.g., CPU, RAM, disk and network specifications) as well as operating system information. You can see the full list of
  system information, [here](https://github.com/aptos-labs/aptos-core/blob/main/crates/aptos-telemetry/src/system_information.rs#L14-L32).

- **Network metrics:**: Network metrics are also collected by node telemetry. These include network information such as
  the number of connected peers, the number of inbound and outbound messages, and the size of messages sent and received.
  You can see the full list of network metrics, [here](https://github.com/aptos-labs/aptos-core/blob/main/crates/aptos-telemetry/src/network_metrics.rs#L12-L17).

- **Prometheus metrics**: Prometheus metrics are also collected by node telemetry. These include runtime metrics
  for all the components of the `aptos-node` binary. You can see the full list of Prometheus metrics by visiting the
  metrics endpoint on your node using the [node inspection service](../nodes/measure/node-inspection-service.md).

- **Node logs**: Logs of warn-level and higher are also collected by node telemetry. These are used to monitor the
  health of the network. You can identify these logs by filtering the logs for the `aptos-node` binary, locally.

## CLI telemetry

The Aptos CLI tool also collects telemetry data. The list below shows the categories of information collected by
CLI telemetry:

- **Command metrics**: Command metrics are those emitted by the CLI when a command is executed. These
  include the command itself, the latency of the command, and the success or failure of the command. You can see
  the full list of CLI metrics,
  [here](https://github.com/aptos-labs/aptos-core/blob/main/crates/aptos-telemetry/src/cli_metrics.rs#L12-L15).

- **Build information**: Rust build information, including the versions of Rust, cargo, the target architecture and
  the build tag are also collected for the CLI. You can see the full list of build information, [here](https://github.com/aptos-labs/aptos-core/blob/main/crates/aptos-build-info/src/lib.rs#L8-L20).

## Disabling telemetry

On macOS and Linux, you can set the `APTOS_DISABLE_TELEMETRY` environment variable to disable the metrics sent by
both the Aptos node and the Aptos CLI tool. To disable all telemetry, set `APTOS_DISABLE_TELEMETRY` environment to `true`:

```bash
export APTOS_DISABLE_TELEMETRY=true
```

The above command only disables telemetry for a single session in the current terminal where you run the command.
To disable it permanently across all terminals and Aptos binary invocations, include it in your startup profile.
For example:

```bash
echo "export APTOS_DISABLE_TELEMETRY=true" >> ~/.profile
source ~/.profile
```

## Configuring telemetry

You can also configure telemetry to disable specific telemetry metrics and collections. The environment variable
list below shows the variables you can set to configure telemetry for Aptos nodes and the CLI:

- `APTOS_DISABLE_TELEMETRY`: This disables all telemetry emission, including sending telemetry to the Google Analytics service (GA4).
- `APTOS_FORCE_ENABLE_TELEMETRY`: This overrides the chain ID check and forces the Aptos node to send telemetry regardless of whether the remote service accepts it or not.
- `APTOS_DISABLE_TELEMETRY_PUSH_METRICS`: This disables sending [Prometheus](https://prometheus.io/) metrics.
- `APTOS_DISABLE_TELEMETRY_PUSH_LOGS`: This disables sending logs.
- `APTOS_DISABLE_TELEMETRY_PUSH_EVENTS`: This disables sending custom events.
- `APTOS_DISABLE_LOG_ENV_POLLING`: This disables the dynamic ability to send verbose logs.
- `APTOS_DISABLE_PROMETHEUS_NODE_METRICS`: This disables sending the Aptos node resource metrics such as system CPU, memory, etc.
