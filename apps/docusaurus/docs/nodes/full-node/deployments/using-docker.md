---
title: "Using Docker"
slug: "deploy-a-pfn-docker"
---

# Deploy a PFN using Docker

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
Override the following if you do not want other PFNs connecting to yours: `listen_address: "/ip4/127.0.0.1/tcp/6182"`.
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

You have now successfully configured and started running a PFN in the Aptos mainnet.

:::tip Verify your PFN
If you want to verify that your PFN is running correctly, you can follow the instructions in the [Verify a PFN](../verify-pfn.md) guide.
:::
