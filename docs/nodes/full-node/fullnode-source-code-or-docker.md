---
title: "Run a PFN from Source or Docker"
slug: "fullnode-source-code-or-docker"
sidebar_position: 10
---

# Run a PFN from Source Code or Docker

You can run your own public fullnode (PFN) to synchronize the state of the Aptos blockchain and stay
up-to-date. PFNs replicate the entire state of the blockchain by syncing from other Aptos VFNs and PFNs. PFNs
can be run by anyone. This tutorial explains how to deploy a PFN and connect to an Aptos network.

:::tip Do I have to run a PFN?
If you do not wish to run a PFN, but still want to interact with the Aptos blockchain, you can use the REST API
provided by the Aptos Labs' PFNs (see [Aptos APIs](../../apis)). Note, however, that Aptos Labs-provided PFNs have rate
limits, which can impede your development. If you want to avoid such rate limits, you can deploy your own PFN
and synchronize with the Aptos blockchain directly.
:::

:::caution Choose a network
This document describes how to start a public fullnode in the Aptos mainnet network, but it can easily be used to do
the same in the devnet or testnet networks. To do so, check out the desired network branch and use
the `genesis.blob` and `waypoint.txt` node files for the respective branches:
[mainnet](../node-files-all-networks/node-files.md),
[devnet](../node-files-all-networks/node-files-devnet.md), and
[testnet](../node-files-all-networks/node-files-testnet.md).
:::

## Hardware requirements

For running a production-grade PFN, we recommend that your hardware meet the same requirements as a
validator or VFN. You can see the hardware requirements for these nodes, here: [validator and VFN hardware requirements](../validator-node/operator/node-requirements.md#hardware-requirements).

If you wish to run a PFN for development or testing only, lower hardware specs can be used. But, it should not be
used in production. For example:

- **CPU**: 8 cores, 16 threads (Intel Xeon Skylake or newer).
- **Memory**: 32GB RAM.

:::danger Minimum hardware requirements
Failing to meet the minimum hardware requirements for a production-grade PFN mean that your
PFN will likely experience degradation under load and general instability in production environments.
:::

## Network requirements and ports

When you are running a PFN, you are required to open network ports on your nodes to allow other nodes (i.e., peers)
to connect to you. There are different Aptos network types, and each network type uses a different port. However,
the only network type that a PFN uses is the public network, where PFNs to connect to other PFNs and VFNs.

Your PFN can be configured so that the public network operates using a specific port on your node. You can configure
the port settings using the node configuration YAML file. Here is an [example
configuration file](https://github.com/aptos-labs/aptos-core/blob/main/config/src/config/test_data/public_full_node.yaml#L16) for a PFN
that configures the public network to use port `6180`.

### Port settings

The recommendations described below assume the default port settings used by PFNs. If you have
changed the default port settings in your configuration file, then you should adjust the recommendations accordingly.

:::caution Exposing ports
Unless explicitly required, we recommend that you do not expose any other ports while operating a PFN. This is because
exposing additional ports can increase the attack surface of your node and make it more vulnerable to adversaries.
:::

#### Running a PFN:

Assuming default ports are used, the following should be configured for PFNs:

- Open the following TCP ports:
  - `6182` – **Public network**: Open this port publicly to enable PFNs to connect to your VFN.
- Close the following TCP ports:
  - `9101` – **Inspection service**: Close this port to prevent unauthorized metric inspection.
  - `9102` – **Admin service**: Close this port to prevent unauthorized admin service interaction.
  - `80/8080` **REST API**: Close this port to prevent unauthorized REST API access.

:::danger Exposing services
We note that the inspection service port (`9101`), admin service port (`9102`) and the REST API port (`80` or `8080`)
are likely useful for your internal network, e.g., application development and debugging. However, the inspection service
port and the admin service port should never be exposed publicly as they can be easily abused. Similarly, if you choose
to expose the REST API endpoint publicly, you should deploy an additional authentication or rate-limiting mechanism to
prevent abuse.
:::

:::info Default network settings
You may also need to update the 127.0.0.1 with 0.0.0.0 in the `fullnode.yaml` for the fields `listen_address` and `address` field in the `api` list.
:::

### Storage requirements

The amount of data stored by Aptos depends on the ledger history (length) of the blockchain and the number of
on-chain states (e.g., accounts and resources). Both the ledger history and the number of
on-chain states depend on several additional factors, including the age of the blockchain, the average transaction
rate over time, and the configuration of the ledger database pruner.

Note that because archival nodes store the entire history of the blockchain, the database size on archival nodes
will continue to grow unbounded. As a result, we cannot provide a recommendation for archival node storage sizes.

:::tip Devnet blockchain storage
The Aptos devnet is currently reset on a weekly basis. If you are deploying a devnet PFN, this means that the storage
will be reset (i.e., wiped) every week. See the `#devnet-release` channel on the Aptos Discord.
:::

## Deploying a PFN

You can deploy a PFN in one of two ways: (i) building and running
[aptos-core](https://github.com/aptos-labs/aptos-core) from source code; or (ii) using Docker. This document describes
how to deploy your PFN using both methods.

### Method 1: Building and running from source

First, see [Building Aptos From Source](../../guides/building-from-source.md) for instructions on how to download the `aptos-core` repository and build the binary.
Then, follow the steps below:

1. Make sure your current working directory is `aptos-core`.
1. Check out the `mainnet` branch using `git checkout --track origin/mainnet`; remember, you may instead use `devnet` or `testnet`
   if you wish to run your PFN in a different network.
1. Next, download the `genesis.blob` and `waypoint.txt` files for the network your PFN will connect to:

   - Run this command to download the genesis blob (for mainnet):

     ```bash
     curl -O https://raw.githubusercontent.com/aptos-labs/aptos-networks/main/mainnet/genesis.blob
     ```

   - Run this command to download the waypoint file (for mainnet):
     ```bash
     curl -O https://raw.githubusercontent.com/aptos-labs/aptos-networks/main/mainnet/waypoint.txt
     ```

   :::caution Don't want to connect to mainnet?
   To connect to other networks (e.g., `devnet` and `testnet`), you can find the genesis and waypoint here ➜ https://github.com/aptos-labs/aptos-networks.
   Be sure to download the `genesis.blob` and `waypoint.txt` for those networks, instead of using the genesis
   and waypoint pointed to by the `curl` commands above.
   :::

1. Next, run the command below to create a copy of the PFN configuration YAML template:
   ```bash
   cp config/src/config/test_data/public_full_node.yaml fullnode.yaml
   ```
1. Finally, edit the `fullnode.yaml` configuration file to ensure that your PFN: (i) contains the genesis blob
   and waypoint file you just downloaded; and (ii) saves the synchronized blockchain data to the location of your
   choice (on your local machine). To do this:

   1. Specify the correct path to the `genesis.blob` file you just downloaded by editing `execution.genesis_file_location` in the `fullnode.yaml` configuration. By default, it points to `genesis.blob` in the current working directory.
      ```yaml
      execution:
        genesis_file_location: "./genesis.blob"
      ```
   1. Specify the correct path to the `waypoint.txt` file you just downloaded by editing `base.waypoint.from_file` in the `fullnode.yaml` configuration. By default, it points to `waypoint.txt` in the current working directory. For example:
      ```yaml
      base:
        waypoint:
          from_file: "./waypoint.txt"
      ```
   1. Specify the directory on your local machine that you want to store the blockchain database by editing the `base.data_dir` in the `fullnode.yaml` configuration. For example, you can create a directory `my-full-node/data` in your home directory and specify it as:
      ```yaml
      base:
        data_dir: "</path/to/my/homedir/my-full-node/data>"
      ```

1. Start your local public fullnode by running the below command:

```bash
cargo run -p aptos-node --release -- -f ./fullnode.yaml
```

You have now successfully configured and started running a PFN in the Aptos mainnet.

:::tip Debugging?
The command above will build a release binary for `aptos-node` at: `aptos-core/target/release/aptos-node`. The release
binaries tend to be substantially faster than debug binaries but lack debugging information useful for development.
To build a debug binary, omit the `--release` flag from the command above.
:::

---

### Method 2: Using Docker

This section describes how to configure and run your PFN using Docker.

:::danger Supported only on x86-64 CPUs
Running aptos-core via Docker is currently only supported on x86-64 CPUs. If you have an Apple M1/M2 (ARM64) Mac, use
the aptos-core source code approach (above). If M1/M2 support is important to you, comment on this
issue: https://github.com/aptos-labs/aptos-core/issues/1412
:::

1. First, install [Docker](https://docs.docker.com/get-docker/).
2. Next, run the following script to prepare your local configuration and data directory for mainnet. This will
   download the `fullnode.yaml` configuration file, the `genesis.blob` and `waypoint.txt` files for your PFN, and
   create a `data` directory to store the blockchain database:

```bash
mkdir mainnet && cd mainnet
mkdir data && \
curl -O https://raw.githubusercontent.com/aptos-labs/aptos-core/mainnet/docker/compose/aptos-node/fullnode.yaml && \
curl -O https://raw.githubusercontent.com/aptos-labs/aptos-networks/main/mainnet/waypoint.txt && \
curl -O https://raw.githubusercontent.com/aptos-labs/aptos-networks/main/mainnet/genesis.blob
```

:::caution Don't want to connect to mainnet?
To connect to other networks (e.g., `devnet` and `testnet`), you can find the genesis and waypoint here ➜ https://github.com/aptos-labs/aptos-networks.
Be sure to download the `genesis.blob` and `waypoint.txt` for those networks, instead of using the genesis
and waypoint pointed to by the `curl` commands above.
:::

3. Next, make sure that the `fullnode.yaml` configuration file that you downloaded above contains only the following content.
   This will ensure that this configuration is for a PFN and not for another node type (e.g., validator or VFN):

```yaml
base:
  role: "full_node"
  data_dir: "/opt/aptos/data"
  waypoint:
    from_file: "/opt/aptos/etc/waypoint.txt"

execution:
  genesis_file_location: "/opt/aptos/etc/genesis.blob"

full_node_networks:
  - network_id: "public"
    discovery_method: "onchain"
    listen_address: "/ip4/0.0.0.0/tcp/6182"

api:
  enabled: true
  address: "0.0.0.0:8080"
```

:::caution Don't want to allow inbound connections?
Override the following if you do not want other PFNs connecting to yours: `listen_address: "/ip4/127.0.0.1/tcp/6182"`. Also see the note, below.
:::

4. Next, run the following `docker` command:

```bash
docker run --pull=always \
    --rm -p 8080:8080 \
    -p 9101:9101 -p 6180:6180 \
    -v $(pwd):/opt/aptos/etc -v $(pwd)/data:/opt/aptos/data \
    --workdir /opt/aptos/etc \
    --name=aptos-fullnode aptoslabs/validator:mainnet aptos-node \
    -f /opt/aptos/etc/fullnode.yaml
```

:::caution Sudo access
Note: you may need to prefix the docker command with `sudo` depending on your configuration.
:::

:::info Docker tags
The `mainnet` tag always refers to the latest official Docker image tag. You can find the latest hash for comparison at:
https://github.com/aptos-labs/aptos-networks/tree/main/mainnet
:::

## Verify the correctness of your PFN

### Verify initial synchronization

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

1. Update your node to the latest release by following the [Update Fullnode With New Releases](./update-fullnode-with-new-releases.md).
2. Remove any `seed` peers you may have added to your configuration file. The seeds may be preventing you from
   connecting to the network. Seed peers are discussed in the [Connecting your fullnode to seed peers](./fullnode-network-connections.md#connecting-your-fullnode-to-seed-peers) section.
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
