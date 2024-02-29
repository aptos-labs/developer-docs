---
title: "Generate a PFN Identity"
slug: "network-identity-fullnode"
---

# Generate a PFN Identity

:::danger
Validators and VFNs have their identities initialized when first created and their identities are long-lived (immutable).
PFN identities are more ephemeral and can be regenerated on demand. As such, generating an identity using this
guide **should only be done for PFNs**, and not for validators or VFNs.
:::

Public fullnodes (PFNs) will automatically start up with a randomly generated (ephemeral) network identity. This works well for
regular PFNs. However, you may want to generate and assign a static network identity to your PFN. This is useful when:

- You wish to advertise your PFN as a seed (i.e., for other Aptos PFNs to connect to).
- You wish to add your PFN to an allowlist of known identities on an upstream PFN or VFN.
- You wish to fix the identity of your PFN across restarts and releases so that telemetry and other monitoring tools can track your PFN over time.

This guide will show you how to generate a static network identity and start your PFN with this identity.

:::caution
Before you proceed, make sure that you already know how to start your local PFN. See [Run a PFN](./index.md) for detailed documentation.
:::

## Generate a static identity

To create a static identity for your PFN, you will first need to generate a private and public key pair. You will then
need to derive the `peer_id` from the public key, and use the `peer_id` in your configuration file
(e.g., `fullnode.yaml`) to configure the static network identity for your PFN.

The steps below will guide you through the process of generating a static identity for your PFN. The exact steps depend
on whether you are using the `aptos-core` source code to run your PFN, or Docker.

### Using the aptos-core source code

If you use the `aptos-core` source code to run your PFN, follow these steps:

1. **Generate the private key**

First, use the [Aptos CLI](../../tools/aptos-cli/use-cli/use-aptos-cli.md) (`aptos`) to produce a hex encoded static
x25519 private key. This will be the private key for your network identity. Run the following `aptos` CLI command:

```bash
aptos key generate --key-type x25519 --output-file /path/to/private-key.txt
```

This command will create a file `private-key.txt` with the private key in it, and a corresponding
`private-key.txt.pub` file with the public key in it. An example `private-key.txt` file and
`private-key.txt.pub` file are shown below:

    ```bash
    cat ~/private-key.txt
    C83110913CBE4583F820FABEB7514293624E46862FAE1FD339B923F0CACC647D%

    cat ~/private-key.txt.pub
    B881EA2C174D8211C123E5A91D86227DB116A44BB345A6E66874F83D8993F813%
    ```

2. **Retrieve the peer identity**

Next, retrieve the peer identity from the public key using the `aptos` CLI. The `--host` flag in
the command will provide the host information to output a network address for your PFN. Run the following command
(be sure to update the `--host` flag with your actual host information):

```bash
aptos key extract-peer --host example.com:6180 \
    --public-network-key-file private-key.txt.pub \
    --output-file peer-info.yaml
```

This command will output the public identity information for your PFN to a file `peer-info.yaml`. For example:

```json
{
  "Result": {
    "B881EA2C174D8211C123E5A91D86227DB116A44BB345A6E66874F83D8993F813": {
      "addresses": [
        "/dns/example.com/tcp/6180/noise-ik/0xB881EA2C174D8211C123E5A91D86227DB116A44BB345A6E66874F83D8993F813/handshake/0"
      ],
      "keys": [
        "0xB881EA2C174D8211C123E5A91D86227DB116A44BB345A6E66874F83D8993F813"
      ],
      "role": "Upstream"
    }
  }
}
```

In this example, `B881EA2C174D8211C123E5A91D86227DB116A44BB345A6E66874F83D8993F813` is the `peer_id`.

3. **Start a PFN with the identity**

After extracting the peer identity from the public key, you can start your PFN with the identity using the
public key in the `peer_id` field of the configuration file (e.g., `fullnode.yaml`). For example:

```yaml
full_node_networks:
  - network_id: "public"
discovery_method: "onchain"
identity:
  type: "from_config"
  key: "<PRIVATE_KEY>"
  peer_id: "<PEER_ID>"
```

In our example (from above), the configuration file (`fullnode.yaml`) should now have the following information:

```yaml
full_node_networks:
  - network_id: "public"
    discovery_method: "onchain"
    identity:
      type: "from_config"
      key: "C83110913CBE4583F820FABEB7514293624E46862FAE1FD339B923F0CACC647D"
      peer_id: "B881EA2C174D8211C123E5A91D86227DB116A44BB345A6E66874F83D8993F813"
```

Starting your PFN with this configuration will assign your PFN with the static network identity you generated.

### Using Docker

If you use Docker to run your PFN, follow these steps:

1. **Prepare your tools**

First, `cd` into the directory for your local PFN and start a Docker container with the latest tools, for example:

```bash
cd ~/my-full-node
docker run -it aptoslabs/tools:devnet /bin/bash
```

2. **Generate the private key**

Next, follow the remaining steps from inside the `aptoslabs/tools` Docker container.

Open a new terminal and `cd` into the directory where you started the Docker container for your PFN. Making
sure to provide the **full path** to where you want the private key file to be stored, run the command:

```bash
aptos key generate \
    --key-type x25519 \
    --output-file /path/to/private-key.txt
```

3. **Retrieve the peer identity**

Next, retrieve the peer identity from the public key using the `aptos` CLI. The `--host` flag in
the command will provide the host information to output a network address for your PFN. Run the following command
(be sure to update the `--host` flag with your actual host information):

```bash
aptos key extract-peer --host example.com:6180 \
    --public-network-key-file private-key.txt.pub \
    --output-file peer-info.yaml
```

This command will output the public identity information for your PFN to a file `peer-info.yaml`. For example:

```json
{
  "Result": {
    "B881EA2C174D8211C123E5A91D86227DB116A44BB345A6E66874F83D8993F813": {
      "addresses": [
        "/dns/example.com/tcp/6180/noise-ik/0xB881EA2C174D8211C123E5A91D86227DB116A44BB345A6E66874F83D8993F813/handshake/0"
      ],
      "keys": [
        "0xB881EA2C174D8211C123E5A91D86227DB116A44BB345A6E66874F83D8993F813"
      ],
      "role": "Upstream"
    }
  }
}
```

In this example, `B881EA2C174D8211C123E5A91D86227DB116A44BB345A6E66874F83D8993F813` is the `peer_id`.

4. **Start a PFN with the identity**

After extracting the peer identity from the public key, you can start your PFN with the identity using the
public key in the `peer_id` field of the configuration file (e.g., `fullnode.yaml`). For example:

```yaml
full_node_networks:
  - network_id: "public"
discovery_method: "onchain"
identity:
  type: "from_config"
  key: "<PRIVATE_KEY>"
  peer_id: "<PEER_ID>"
```

In our example (from above), the configuration file (`fullnode.yaml`) should now have the following information:

```yaml
full_node_networks:
  - network_id: "public"
    discovery_method: "onchain"
    identity:
      type: "from_config"
      key: "C83110913CBE4583F820FABEB7514293624E46862FAE1FD339B923F0CACC647D"
      peer_id: "B881EA2C174D8211C123E5A91D86227DB116A44BB345A6E66874F83D8993F813"
```

Starting your PFN with this configuration will assign your PFN with the static network identity you generated.
