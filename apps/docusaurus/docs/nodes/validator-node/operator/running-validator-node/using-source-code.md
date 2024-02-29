---
title: "Using Source Code"
slug: "run-validator-node-using-source"
---

# Using Source Code

This is a step-by-step guide to deploy an Aptos validator and validator fullnode (VFN) using source code. Using this guide, the validator
and VFN will be deployed on separate machines.

:::caution Prerequisites
Before you begin, make sure to read and understand the [Node Requirements](../node-requirements.md). Similarly, make sure you have
installed the [Aptos CLI](https://aptos.dev/tools/aptos-cli/install-cli/index), as you will need it to setup your nodes.
:::

## Deployment Steps

:::tip Default connection to mainnet
If you follow the default setup in this document, then your validator and VFN will be connected to the Aptos mainnet.
To connect to a different Aptos network, such as testnet, make sure you select the appropriate source code branch
when you build the binary, and download the correct genesis and waypoint files for the network you want to connect to.
:::

1.  Follow the steps in [Building Aptos From Source](../../../../guides/building-from-source.md) to download the `aptos-core` repository and source code.

2.  Checkout the `mainnet` branch using `git checkout --track origin/mainnet`. Note: if you want to deploy a validator
    and VFN on another network, use the appropriate branch name (e.g., `testnet`).

3.  Create a working directory for your Aptos nodes, and pick a username for your nodes, e.g.,

    ```bash
    export WORKSPACE=mainnet
    export USERNAME=alice
    mkdir ~/$WORKSPACE
    ```

4.  Generate the key pairs for your nodes in your working directory. You can do this by running
    the following command with the Aptos CLI:

    ```bash
    aptos genesis generate-keys --output-dir ~/$WORKSPACE/keys
    ```

    This will create 4 key files under `~/$WORKSPACE/keys` directory:

    - `public-keys.yaml`: This file contains all public keys for your validator and VFN, as well as your account address.
    - `private-keys.yaml`: This file contains all private keys for your validator and VFN.
    - `validator-identity.yaml`: This file contains the public and private keys for your validator, as well as your account address.
    - `validator-full-node-identity.yaml`: This file contains the public and private keys for your VFN, as well as your account address.

    :::danger Backup your private keys
    Your private keys are important for you to establish ownership of your nodes. Never share your **private** keys with anyone,
    and make sure to **backup** `private-keys.yaml` somewhere safe.
    :::

5.  Next, you will need to set your validator configuration. This includes setting the validator and VFN host names,
    which may be IP addresses or DNS addresses.

    :::tip DNS addresses
    Using DNS is recommended over IP addresses, as it enables more efficient node migrations and is more resilient
    to host changes.
    :::

    You can set your validator configuration by running the following command with the Aptos CLI:

    ```bash

    # Replace <validator node IP / DNS address> and <Full Node IP / DNS address> below,
    # with the appropriate IP or DNS address for your nodes.

    cd ~/$WORKSPACE
    aptos genesis set-validator-configuration \
        --local-repository-dir ~/$WORKSPACE \
        --username $USERNAME \
        --owner-public-identity-file ~/$WORKSPACE/keys/public-keys.yaml \
        --validator-host <validator node IP / DNS address>:<Port> \
        --full-node-host <Full Node IP / DNS address>:<Port> \
        --stake-amount 100000000000000

    # For example, if you are using IP addresses:

    aptos genesis set-validator-configuration \
        --local-repository-dir ~/$WORKSPACE \
        --username $USERNAME \
        --owner-public-identity-file ~/$WORKSPACE/keys/public-keys.yaml \
        --validator-host 35.232.235.205:6180 \
        --full-node-host 34.135.169.144:6182 \
        --stake-amount 100000000000000

    # Otherwise, if you are using DNS addresses:

    aptos genesis set-validator-configuration \
        --local-repository-dir ~/$WORKSPACE \
        --username $USERNAME \
        --owner-public-identity-file ~/$WORKSPACE/keys/public-keys.yaml \
        --validator-host bot.aptosdev.com:6180 \
        --full-node-host fn.bot.aptosdev.com:6182 \
        --stake-amount 100000000000000
    ```

    Configuring the validator will create two YAML files in the `~/$WORKSPACE/$USERNAME` directory: `owner.yaml` and
    `operator.yaml`. These will be useful for connecting your nodes to the Aptos network (later).

6.  Download the following files by following the instructions on the [Node Files](../../../node-files-all-networks/index.md) pages.
    You will need to select the appropriate network (e.g., `mainnet`, `testnet`, `devnet`) and download the following files:

    - `validator.yaml`
    - `fullnode.yaml`
    - `genesis.blob`
    - `waypoint.txt`

7.  Next, copy the `validator.yaml` and `fullnode.yaml` template files (that were just downloaded) into the
    `~/$WORKSPACE/config/` directory. This can be done by running the following commands:

    ```bash
    mkdir ~/$WORKSPACE/config
    cp validator.yaml ~/$WORKSPACE/config/validator.yaml
    cp fullnode.yaml ~/$WORKSPACE/config/fullnode.yaml
    ```

    These will be the primary configuration files for your validator and VFN, respectively.

8.  Now, modify the `validator.yaml` and `fullnode.yaml` template files to contain the appropriate information
    and working directories for your validator and VFN.

    For the `validator.yaml` file, you will need to modify the following fields:

    - `base.data_dir`: The directory where the blockchain data will be stored.
    - `base.waypoint`: The waypoint for the genesis transaction on the network you are connecting to.
    - `consensus.initial_safety_rules_config`: The waypoint for the genesis transaction on the network you are connecting to,
      as well as the `validator-identity.yaml` file location.
    - `execution.genesis_file_location`: The genesis blob for the network you are connecting to.
    - `validator_network.identity`: The `validator-identity.yaml` file location.

    For the `fullnode.yaml` file, you will need to modify the following fields:

    - `base.data_dir`: The directory where the blockchain data will be stored.
    - `base.waypoint`: The waypoint for the genesis transaction on the network you are connecting to.
    - `execution.genesis_file_location`: The genesis blob for the network you are connecting to.
    - `full_node_networks`: - The `public` network will need to be updated with the `validator-full-node-identity.yaml`
      file location. - The `vfn` network will need to be updated with the correct IP address or DNS address of the validator.
      For example, if you are using IP addresses, you will need to update the `addresses` field as follows:

      ```yaml
      ---
      addresses:
        - "/ip4/100.100.100.100/tcp/6181/noise-ik/..." # Set the IP Address of the validator
      ```

      Otherwise, if you are using DNS addresses, you will need to update the `addresses` field as follows:

      ```yaml
      ---
      addresses:
        - "/dns/example.com/tcp/6181/noise-ik/..." # Set the DNS Address of the validator
      ```

9.  To recap, in your working directory (`~/$WORKSPACE`), you should have a list of files:

    - `config` folder containing:
      - `validator.yaml`: The validator config file.
      - `fullnode.yaml`: The VFN config file.
    - `keys` folder containing:
      - `public-keys.yaml`: Public keys for both nodes.
      - `private-keys.yaml`: Private keys for both nodes.
      - `validator-identity.yaml`: Key and account information for the validator.
      - `validator-full-node-identity.yaml`: Key and account information for the VFN.
    - `$username` folder containing:
      - `owner.yaml`: The owner, operator and voter mappings.
      - `operator.yaml`: Validator and VFN operator information.
    - `waypoint.txt`: The waypoint for the genesis transaction on the network you are connecting to.
    - `genesis.blob` The genesis blob for the network you are connecting to.

10. Now that you have set up your configuration files, you can start your validator and VFN.
    To start your validator, run the following commands, with the paths assuming you are in the root of the `aptos-core` directory:

    ```bash
    cargo clean
    cargo build -p aptos-node --release
    sudo mv target/release/aptos-node /usr/local/bin
    aptos-node -f ~/$WORKSPACE/config/validator.yaml
    ```

    To start your VFN, run the following commands on a separate, dedicated VFN machine. You will need to download the
    `aptos-core` source code and build the binary on the VFN machine. Likewise, you will need to copy across
    the keys and configuration files from the validator machine.

    :::danger VFN identity
    You should copy the keys and configuration
    files across to the VFN machine from the working location where they were generated. Do not attempt to generate
    another set of keys or files for the VFN, as these will not be recognized by the network.
    :::

    Start your VFN by running the following commands, with the paths assuming you are in the root of the `aptos-core` directory:

    ```bash
    cargo clean
    cargo build -p aptos-node --release
    sudo mv target/release/aptos-node /usr/local/bin
    aptos-node -f ~/$WORKSPACE/config/fullnode.yaml
    ```

    :::caution Next steps
    You have now completed setting up your validator and VFN using source code. However, your nodes will not be able to connect
    to the Aptos network just yet.
    :::

### (Optional) Running as a Service

If you want to run `aptos-node` as a service, you can set it up to run as a service controlled by `systemctl`.
This is optional, and can be done using the service template below. You will need to modify the template
to match your environment and configuration.

```bash
[Unit]
Description=Aptos Node Service

[Service]
User=nodeuser
Group=nodeuser

LimitNOFILE=500000

#Environment="RUST_LOG=error"
WorkingDirectory=/home/nodeuser/aptos-core
ExecStart=/usr/local/bin/aptos-node -f /home/nodeuser/aptos-mainnet/config/validator.yaml

Restart=on-failure
RestartSec=3s

StandardOutput=journal
StandardError=journal
SyslogIdentifier=aptos-node

[Install]
WantedBy=multi-user.target
```

## Connecting to the Aptos Network

You have now completed setting up your validator and VFN using source code. Proceed to [Connect Nodes](../connect-nodes/index.md)
for the next steps.
