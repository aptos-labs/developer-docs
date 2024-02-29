---
title: "Node Requirements"
---

To ensure that your validator and validator fullnode (VFN) operate smoothly, both nodes should meet the
requirements specified in this document.

:::danger Failure to meet requirements
Failure to meet the requirements outlined in this document will result in your nodes experiencing degradation under load,
consensus failures, reward losses, and general instability.
::::

## Resource isolation

When running an Aptos validator and VFN, we strongly recommend that the nodes run on two separate and
independent machines. These machines should be well-provisioned, meet the requirements outlined below and
be isolated from each other. Maintaining resource isolation between the validator and the VFN is important
for security and to ensure that the nodes do not encounter performance degradation, instability or failures when
under load.

:::tip Terraform support
For deploying the validator and VFN in the cloud, we provide Terraform support on two cloud providers: **GCP** and **AWS**. See [**Running Validator Node**](running-validator-node/index.md).
:::

## Hardware requirements

For running an Aptos validator and VFN in mainnet, we recommend that your hardware be performant enough to maintain
~30,000 transactions per second (TPS). There are two ways to evaluate if your hardware meets this requirement:

1. Use the reference specs provided below.
1. Run the performance benchmarking tool provided by Aptos.

Note that both the validator and VFN require sufficient hardware separately (i.e., two separate machines that
satisfy the requirements outlined below).

### Reference specs

The reference specs for running an Aptos validator and VFN on mainnet can be seen below:

- **CPU**: 32 cores, 2.8GHz, or faster, AMD Milan EPYC or Intel(R) Xeon(R) Platinum
- **Memory**: 64GB RAM.
- **Storage**: 2T SSD with at least 60K IOPS and 200MiB/s bandwidth.
- **Networking bandwidth**: 1Gbps

Example machine types that meet the reference specs (on various clouds):

- **AWS**
  - c6id.16xlarge (if using a local SSD).
  - c6i.16xlarge + io2 EBS volume with 60K IOPS.
- **GCP**
  - t2d-standard-60 + pd-ssd with 60K IOPS.

### Performance benchmarking

If you'd prefer to evaluate your hardware for sufficient performance, you can use the performance benchmarking
tool. First, clone the `aptos-core` repository and install the required dependencies (see the
[**Cloning aptos-core**](https://aptos.dev/guides/building-from-source#clone-the-aptos-core-repo) section).
Then, execute the following commands to run the benchmark:

```
TABULATE_INSTALL=lib-only pip install tabulate

./testsuite/performance_benchmark.sh --short
```

Once the benchmark finishes, it will print out a table, with a column `"t/s"`, which shows the TPS achieved by your
hardware. The evaluation criteria is encoded in the tool, and the tool will display a warning if your hardware does
not meet the requirements.

**Local SSD vs. network storage**

Cloud deployments require choosing between local storage or network storage, such as, AWS EBS and GCP PD.
Loosely speaking, a local SSD often provides lower latency and cost, especially relative to IOPS (input/output
operations per second), while network storage requires CPU support to scale IOPS. However, network
storage provides better support for backups and offers improved reliability for nodes that stop or fail, thus enabling
higher availability. The choice between local SSD and network storage depends on your specific requirements and
constraints.

### Motivating hardware requirements

Hardware requirements for Aptos nodes depend on: (i) the transaction workload being executed; and (ii) the size of the
database on each machine. The current hardware requirements have been set using an estimated transaction workload
(e.g., 30,000 TPS) and an estimated database growth rate for 2024. These may be subject to change. It is also worth
noting that transaction workloads can change frequently, and thus it is necessary to provision your hardware to meet the
requirements of the most demanding transaction workloads. This will ensure that your nodes can perform well under
load and remain stable.

Generally, the size of the database on each machine is a function of the ledger history (i.e., the number
of transactions in the blockchain history) and the number of on-chain states (e.g., accounts and resources).
Both the ledger history and the number of on-chain states depend on several additional factors, including the age
of the blockchain, the average transaction rate over time, and the configuration of the ledger database pruner.
At the time of writing, we estimate that testnet and mainnet require several 100's of GB of storage.

Note that because archival nodes store the entire history of the blockchain, the database size on archival nodes will
continue to grow unbounded. As a result, we cannot provide a recommendation for archival node storage sizes.

## Network requirements and ports

When you are running a validator and a VFN, you are required to open network ports on your nodes to allow other
nodes (i.e., peers) to connect to you. There are different Aptos network types, and each network type uses a different port (see below).

### Network types

There are three types of Aptos networks:

1. **Validator network:** Validators connect to each other over this network. Validator fullnodes (VFNs) and public fullnodes (PFNs) do not use this network.
1. **VFN network:** The validator fullnode (VFN) network allows a validator and VFN pair to connect to each other. This network is private between the validator and the VFN.
1. **Public network:** The public network allows VFNs and public fullnodes (PFNs) to connect to other VFNs and PFNs. This allows public node operators to access the blockchain.

Your node can be configured so that each of these networks can operate using a different port on your node. You can configure
the port settings using the node configuration YAML file. Here is an [example
configuration file](https://github.com/aptos-labs/aptos-core/blob/4ce85456853c7b19b0a751fb645abd2971cc4c0c/docker/compose/aptos-node/fullnode.yaml#L10) for a VFN node
that configures the VFN network to use port `6181` and the public network to use port `6182`.

### Port settings

The recommendations described below assume the default port settings used by validators, VFNs and PFNs. If you have
changed the default port settings in your configuration file, then you should adjust the recommendations accordingly.

:::caution Exposing ports
Unless explicitly required, we recommend that you do not expose any other ports while operating a node. This is because
exposing additional ports can increase the attack surface of your node and make it more vulnerable to adversaries.
:::

#### Running a validator:

Assuming default ports are used, the following should be configured for validator nodes:

- Open the following TCP ports:
  - `6180` - **Validator network**: Open this port publicly to enable the validator to connect to other validators in the network.
  - `6181` – **VFN network**: Open this port privately to only be accessible by your VFN.
- Close the following TCP ports:
  - `6182` – **Public network**: Close this port to prevent PFN connections.
  - `9101` – **Inspection service**: Close this port to prevent unauthorized metric inspection.
  - `9102` – **Admin service**: Close this port to prevent unauthorized admin service interaction.
  - `80/8080` **REST API**: Close this port to prevent unauthorized REST API access.

#### Running a VFN:

Assuming default ports are used, the following should be configured for VFN nodes:

- Open the following TCP ports:
  - `6181` – **VFN network**: Open this port privately to only be accessible by your validator.
  - `6182` – **Public network**: Open this port publicly to enable PFNs to connect to your VFN.
- Close the following TCP ports:
  - `9101` – **Inspection service**: Close this port to prevent unauthorized metric inspection.
  - `9102` – **Admin service**: Close this port to prevent unauthorized admin service interaction.
  - `80/8080` **REST API**: Close this port to prevent unauthorized REST API access.

:::danger Exposing services
The inspection service port (`9101`), admin service port (`9102`) and the REST API port (`80` or `8080`)
are likely useful for your internal network, e.g., application development and debugging. However, the inspection service
port and the admin service port should never be exposed publicly as they can be easily abused. Similarly, if you choose
to expose the REST API endpoint publicly, you should deploy an additional authentication or rate-limiting mechanism to
prevent abuse.
:::
