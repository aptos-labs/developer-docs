---
title: "Upgrade your PFN"
slug: "update-fullnode-with-new-devnet-releases"
sidebar_position: 11
---

# Upgrade your PFN

This document outlines the process for updating your PFN with new Aptos releases. All PFNs will need to be updated
when new releases are available. For PFNs running in `devnet`, an additional data wipe step is required as `devnet`
is wiped on every new release.

## Source code deployment

If you run your PFN from the [aptos-core][aptos-labs/aptos-core] source code, you can update your PFN by
following these steps:

1.  Stop your PFN by running the command below (or killing the `aptos-node` process manually):

    ```bash
    cargo stop aptos-node
    ```

1.  Fetch the latest release appropriate for your network, e.g., `devnet`, `testnet`, or `mainnet`. Be sure to replace
    `[network_branch]` with the appropriate branch name below:

        ```bash
        git checkout [network_branch] && git pull
        ```

1.  Rebuild the binary as you did during the initial setup.

1.  If your PFN is running in `devnet`, follow the additional steps in the [Data Wipe and Reset](#upgrade-with-data-wipe-devnet-only) section below.

1.  Restart your PFN by running the same deployment command as before. For example:

    ```bash
    cargo run -p aptos-node --release -- -f ./fullnode.yaml
    ```

### (Devnet) Data Wipe and Reset

:::danger Devnet only wipe
Only follow these additional steps if your PFN is running in `devnet`. Other networks (e.g., `testnet` and `mainnet`)
don't require this step (as data is never wiped)!
:::

If your PFN is running in `devnet`, follow these additional steps after stopping your PFN (and before restarting it!):

1. Delete the data folder (the directory path is what you specified in the configuration file, e.g., `fullnode.yaml`).

   - The default data folder is `/opt/aptos/data`.

2. Delete the `genesis.blob` file and `waypoint.txt` file (depending on how you configured it, you might not have this file and may instead have a `waypoint` directly in your configuration file).

3. Download the new [genesis.blob](../node-files-all-networks/node-files.md#genesisblob) file and the new [waypoint](../node-files-all-networks/node-files.md#waypointtxt).

4. Update the configuration file (e.g., `fullnode.yaml`) with the new genesis.blob and waypoint files.

5. Restart your PFN by running the same deployment command as before.

## Docker deployment

If you run your PFN from a Docker image, you can update your PFN by:

1. Stop your PFN by running the command below:
   ```bash
   docker compose down --volumes
   ```
2. (Devnet only!) If your PFN is running in `devnet`, delete the entire directory which holds your PFN config and data directory.
3. Re-install and configure those files as during the original setup.
4. Restart your PFN by running the same deployment command as before. For example:
   ```bash
   docker compose up -d
   ```

## GCP deployment

If you run your PFN in GCP, follow the steps below to update your PFN. Note: if your PFN is
running in `devnet`, an additional data wipe step is required.

### Upgrade with data wipe (devnet only)

:::danger Devnet only wipe
Only follow these steps if your PFN is running in `devnet`. Other networks don't require this step (as data is never wiped)
and we recommend not wiping your data in these networks.
:::

If you are running a `devnet` PFN, follow these steps to update:

1. Increase the `era` number in `main.tf` to trigger a new data volume creation, which will start the PFN on a new DB.

2. Update the `image_tag` in `main.tf` to contain the new release version.

3. Update the Terraform module for the PFN (run this in the same directory of your `main.tf` file):

```bash
terraform get -update
```

4. Apply the Terraform changes:

```bash
terraform apply
```

### Upgrade without data wipe

If you are not running a `devnet` PFN, follow these steps to update:

1. Update the `image_tag` in `main.tf`.

2. Update the Terraform module for the PFN (run this in the same directory of your `main.tf` file):

```bash
terraform get -update
```

3. Apply the Terraform changes:

```bash
terraform apply

# If you didn't update the image tag, terraform will show nothing to change, in this case, force a helm update
terraform apply -var force_helm_update=true
```

[rest_spec]: https://github.com/aptos-labs/aptos-core/tree/main/api
[devnet_genesis]: https://devnet.aptoslabs.com/genesis.blob
[devnet_waypoint]: https://devnet.aptoslabs.com/waypoint.txt
[aptos-labs/aptos-core]: https://github.com/aptos-labs/aptos-core.git
[status dashboard]: https://status.devnet.aptos.dev
