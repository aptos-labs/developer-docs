---
title: "Learn about Nodes"
hide_table_of_contents: true
---

The Aptos network consists of three node types: validator nodes, validator fullnodes (VFNs), and public fullnodes (PFNs). To
participate in consensus, you are required to run a validator node and stake the minimum amount of utility coins. VFNs and PFNs
are not required to participate in consensus, but they are necessary to distribute blockchain data and enable ecosystem services,
e.g., indexing, querying, and RESTful API services (see [Aptos APIs](../apis)). VFNs can only be run by validator operators,
while PFNs can be run by anyone. You can learn more about the different types of nodes in the [Blockchain Deep Dive](../concepts/blockchain.md) section.

This section provides detailed, step-by-step instructions on how to deploy and operate Aptos nodes in different
environments. It also describes everything you need to stake and participate in consensus and governance. You can also
find additional resources for node operation in the [External Resources](../community/external-resources.md) section.

## Quick Links

<div class="docs-card-container">
  <div class="row row-cols-1 row-cols-md-2a g-4">
    <div class="col">
      <div class="card-no-border card-body h-100 d-flex flex-column align-items-start">
        <div class="card-body">
          <h2 class="card-title">Validation on Aptos</h2>
          <p class="card-text">
            Everything you need to know about how validation, staking and governance works on Aptos.
          </p>
        </div>
        <div class="list-group list-group-flush">
          <a href="/concepts/staking#validation-on-the-aptos-blockchain" class="list-group-item">
            <div class="d-flex w-100 justify-content-between">
              <h4 class="mb-1">How validation works</h4>
            </div>
            <small>Validator-leader proposes and earns rewards on success.</small>
          </a>
          <a href="/concepts/staking#validator-state-and-stake-state" class="list-group-item">
            <div class="d-flex w-100 justify-content-between">
              <h4 class="mb-1">Validator states</h4>
            </div>
            <small>Learn how a validator gets into a validator set.</small>
          </a>
          <div class="card-body">
          <h2 class="card-title">Staking</h2>
          </div>
          <a href="/concepts/staking" class="list-group-item">
            <div class="d-flex w-100 justify-content-between">
              <h4 class="mb-1">Staking on Aptos</h4>
            </div>
            <small>A comprehensive guide to how staking works on Aptos.</small>
          </a>
          <a href="/concepts/governance" class="list-group-item">
            <div class="d-flex w-100 justify-content-between">
              <h4 class="mb-1">Governance</h4>
            </div>
            <small>Who can propose, who can vote, and how an AIP is resolved.</small>
          </a>
          <a href="/nodes/validator-node/operator/staking-pool-operations#perform-pool-owner-operations" class="list-group-item">
            <div class="d-flex w-100 justify-content-between">
              <h4 class="mb-1">Owner</h4>
            </div>
            <small>Describes the owner operations performed for staking.</small>
          </a>
          <a href="/nodes/validator-node/voter/index" class="list-group-item">
            <div class="d-flex w-100 justify-content-between">
              <h4 class="mb-1">Voter</h4>
            </div>
            <small>Describes the voter operations performed for staking.</small>
          </a>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card-no-border card-body h-100 d-flex flex-column">
        <div class="card-body">
          <h2 class="card-title">Validators and VFNs</h2>
          <p class="card-text">
            A comprehensive guide to deploying nodes, staking operations and participate in consensus.
          </p>
        </div>
        <div class="list-group list-group-flush">
          <a href="/nodes/validator-node/operator/node-requirements" class="list-group-item">
            <div class="d-flex w-100 justify-content-between">
              <h4 class="mb-1">Node requirements</h4>
            </div>
            <small>Details the compute and storage resources you need. Read this first before anything.</small>
          </a>
          <a href="/nodes/validator-node/operator/running-validator-node/running-validator-node" class="list-group-item">
            <div class="d-flex w-100 justify-content-between">
              <h4 class="mb-1">Running validator node</h4>
            </div>
            <small>In the cloud or on-premises, Docker or source, you will read step-by-step instructions here.</small>
          </a>
          <a href="/nodes/validator-node/operator/node-liveness-criteria" class="list-group-item">
            <div class="d-flex w-100 justify-content-between">
              <h4 class="mb-1">Node health</h4>
            </div>
            <small>You can verify your node health using several options.</small>
          </a>
          <a href="/nodes/validator-node/operator/connect-to-aptos-network" class="list-group-item">
            <div class="d-flex w-100 justify-content-between">
              <h4 class="mb-1">Connecting to Aptos network</h4>
            </div>
            <small>Steps to connect your nodes to an Aptos network. </small>
          </a>
          <a href="/nodes/validator-node/operator/staking-pool-operations" class="list-group-item">
            <div class="d-flex w-100 justify-content-between">
              <h4 class="mb-1">Staking pool operations</h4>
            </div>
            <small>Step-by-step guide for how to perform staking pool operations. </small>
          </a>
          <a href="/nodes/validator-node/operator/shutting-down-nodes" class="list-group-item">
            <div class="d-flex w-100 justify-content-between">
              <h4 class="mb-1">Shutting down nodes</h4>
            </div>
            <small>Leave the validator set first, and then shut down your node. </small>
          </a>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card-no-border card-body h-100 d-flex flex-column">
        <div class="card-body">
          <h2 class="card-title">Public Fullnodes (PFNs)</h2>
          <p class="card-text">
            A section with detailed, step-by-step instructions on everything related to Aptos PFNs.
          </p>
        </div>
        <div class="list-group list-group-flush">
          <a href="/nodes/full-node/public-fullnode" class="list-group-item">
            <div class="d-flex w-100 justify-content-between">
              <h4 class="mb-1">Deploy a PFN</h4>
            </div>
            <small>Follow this section to deploy a PFN.</small>
          </a>
          <a href="/indexer/legacy/indexer-fullnode" class="list-group-item">
            <div class="d-flex w-100 justify-content-between">
              <h4 class="mb-1">Indexer PFN</h4>
            </div>
            <small
              >Describes how to run an indexer PFN on the Aptos network. </small>
          </a>
          <div class="card-body">
          <h2 class="card-title">Common Operations</h2>
          </div>
          <a href="/nodes/local-testnet/local-testnet-index" class="list-group-item">
            <div class="d-flex w-100 justify-content-between">
              <h4 class="mb-1">Local development testnet</h4>
            </div>
            <small>Run a local testnet for development (including validator nodes).</small>
          </a>
          <a href="/nodes/full-node/update-fullnode-with-new-devnet-releases" class="list-group-item">
            <div class="d-flex w-100 justify-content-between">
              <h4 class="mb-1">Upgrade a node</h4>
            </div>
            <small>Upgrade your node with new releases.</small>
          </a>
          <a href="/nodes/full-node/bootstrap-fullnode" class="list-group-item">
            <div class="d-flex w-100 justify-content-between">
              <h4 class="mb-1">Bootstrap from a snapshot</h4>
            </div>
            <small>Use a snapshot to bootstrap a new node.</small>
          </a>
          <a href="/nodes/full-node/bootstrap-fullnode" class="list-group-item">
            <div class="d-flex w-100 justify-content-between">
              <h4 class="mb-1">Bootstrap from a backup</h4>
            </div>
            <small>Use data restore to bootstrap a new node.</small>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
