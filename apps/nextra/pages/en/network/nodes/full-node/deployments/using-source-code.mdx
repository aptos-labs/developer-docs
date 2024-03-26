---
title: "Using Source Code"
slug: "deploy-a-pfn-source-code"
---

# Deploy a PFN using Source Code

To deploy a PFN using the `aptos-core` source code, first, see [Building Aptos From Source](../../../guides/building-from-source.md) for instructions
on how to download the `aptos-core` repository and build the binary. Then, follow the steps below:

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

:::tip Debugging?
The command above will build a release binary for `aptos-node` at: `aptos-core/target/release/aptos-node`. The release
binaries tend to be substantially faster than debug binaries but lack debugging information useful for development.
To build a debug binary, omit the `--release` flag from the command above.
:::

You have now successfully configured and started running a PFN in the Aptos mainnet.

:::tip Verify your PFN
If you want to verify that your PFN is running correctly, you can follow the instructions in the [Verify a PFN](../verify-pfn.md) guide.
:::
