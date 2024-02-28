---
title: "Network Identity For PFNs"
slug: "network-identity-fullnode"
---

# Network Identity For PFNs

:::danger
Validators and VFNs have their identities initialized when first created and their identities are long-lived (immutable).
PFN identities are more ephemeral and can be regenerated on demand. As such, generating an identity using this
guide **should only be done for PFNs**, and not for validators or VFNs.
:::

Public fullnodes (PFNs) will automatically start up with a randomly generated network identity. This works well for regular PFNs. However:

- You may want your PFN to be added to a specific upstream node's allowlist (i.e., another PFN participant in the Aptos network), because:

  - You might require specific permissions for your PFN on this specific upstream PFN, or
  - This upstream PFN only allows known identities to connect to it, or
  - You may wish to advertise your PFN for other Aptos PFNs to connect to (to help support the Aptos network).

In such cases, it helps if you run your PFN with a static network identity, instead of a randomly generated network identity that keeps changing every time you start up your PFN.

This guide will show you how to:

- Create a static network identity for your PFN.
- Start a node with a static network identity.

## Before you proceed

Before you proceed, make sure that you already know how to start your local PFN. See [Run a Public Fullnode](./index.md) for detailed documentation.

:::caution Docker support only on Linux
Docker containers are currently only supported on Linux x86-64 platform. If you are on macOS or Windows platform, use the aptos-core source approach.
:::

## Creating a static identity for a PFN

To create a static identity for your PFN:

1. You first create a private and public key pair for your PFN.
2. Next you derive the `peer_id` from the public key.
3. Finally, you use the `peer_id` in your `fullnode.yaml` to create a static network identity for your PFN.

Follow the below detailed steps:

1. Preparation

   **Using Aptos-core source code**

   See [Building Aptos From Source](../../guides/building-from-source.md)

   **Using Docker**

   Alternatively, if you are on Linux x86-64 platform, you can use the Aptos Docker image.

   `cd` into the directory for your local PFN and start a Docker container with the latest tools, for example:

   ```bash
   cd ~/my-full-node
   docker run -it aptoslabs/tools:devnet /bin/bash
   ```

2. Generate the private key

   **Using Aptos-core source code**

Run the [Aptos CLI](../../tools/aptos-cli/use-cli/use-aptos-cli.md) `aptos` to produce a hex encoded static x25519 private key. This will be the private key for your network identity.

:::tip

The below command will also create a corresponding `private-key.txt.pub` file with the public identity key in it.

:::

```bash
aptos key generate --key-type x25519 --output-file /path/to/private-key.txt

```

Example `private-key.txt` and the associated `private-key.txt.pub` files are shown below:

```bash
cat ~/private-key.txt
C83110913CBE4583F820FABEB7514293624E46862FAE1FD339B923F0CACC647D%

cat ~/private-key.txt.pub
B881EA2C174D8211C123E5A91D86227DB116A44BB345A6E66874F83D8993F813%
```

**Using Docker**

Run this step from inside the `aptoslabs/tools` Docker container. Open a new terminal and `cd` into the directory where you started the Docker container for your PFN. Making sure to provide the full path to where you want the private key TXT file to be stored, run the command as below:

```bash
aptos key generate \
    --key-type x25519 \
    --output-file /path/to/private-key.txt
```

3. Retrieve the peer identity

   **Using Aptos-core source code**

:::tip Required: host information
Use the `--host` flag to provide the host information to output a network address for the PFN.
:::

```bash
aptos key extract-peer --host example.com:6180 \
    --public-network-key-file private-key.txt.pub \
    --output-file peer-info.yaml
```

which will produce the following output:

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

or

```bash
aptos key extract-peer --host 1.1.1.1:6180 \
    --public-network-key-file private-key.txt.pub \
    --output-file peer-info.yaml
```

which will produce the following output:

```json
{
  "Result": {
    "B881EA2C174D8211C123E5A91D86227DB116A44BB345A6E66874F83D8993F813": {
      "addresses": [
        "/ip4/1.1.1.1/tcp/6180/noise-ik/0xB881EA2C174D8211C123E5A91D86227DB116A44BB345A6E66874F83D8993F813/handshake/0"
      ],
      "keys": [
        "0xB881EA2C174D8211C123E5A91D86227DB116A44BB345A6E66874F83D8993F813"
      ],
      "role": "Upstream"
    }
  }
}
```

**Using Docker**

Run the same above commands to extract the peer from inside the `aptoslabs/tools` Docker container. For example:

```bash
aptos key extract-peer --host 1.1.1.1:6180 \
    --public-network-key-file /path/to/private-key.txt.pub \
    --output-file /path/to/peer-info.yaml
```

This will create a YAML file that will have your `peer_id` corresponding to the `private-key.txt` you provided.

Example output `peer-info.yaml` for the `--host example.com:6180` option:

````yaml
---
B881EA2C174D8211C123E5A91D86227DB116A44BB345A6E66874F83D8993F813:
  addresses: ["/dns/example.com/tcp/6180/noise-ik/0xB881EA2C174D8211C123E5A91D86227DB116A44BB345A6E66874F83D8993F813/handshake/0"]
  keys:
    - "0xB881EA2C174D8211C123E5A91D86227DB116A44BB345A6E66874F83D8993F813"
role: Upstream
 ```

In this example, `B881EA2C174D8211C123E5A91D86227DB116A44BB345A6E66874F83D8993F813` is the `peer_id`. Use this in the `peer_id` field of your `fullnode.yaml` to create a static identity for your PFN.


## Start a node with a static network identity

After you generated the public identity key you can startup the PFN with a static network identity by using the public key in the `peer_id` field of the configuration file `fullnode.yaml`:

```yaml
full_node_networks:
- network_id: "public"
discovery_method: "onchain"
identity:
 type: "from_config"
 key: "<PRIVATE_KEY>"
 peer_id: "<PEER_ID>"
````

In our example, you would specify the above-generated `peer_id` in place of the `<PEER_ID>`:

```yaml
full_node_networks:
  - network_id: "public"
    discovery_method: "onchain"
    identity:
      type: "from_config"
      key: "C83110913CBE4583F820FABEB7514293624E46862FAE1FD339B923F0CACC647D"
      peer_id: "B881EA2C174D8211C123E5A91D86227DB116A44BB345A6E66874F83D8993F813"
```
