/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check
import { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // defaultSidebar: [{type: 'autogenerated', dirName: '.', }],
  aptosSidebar: [
    {
      type: "html",
      value: "Start",
      className: "sidebar-title",
    },
    {
      type: "category",
      label: "Learn about Aptos",
      link: { type: "doc", id: "concepts/index" },
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "category",
          label: "Aptos Blockchain Deep Dive",
          link: { type: "doc", id: "concepts/blockchain" },
          collapsible: true,
          collapsed: true,
          items: [
            "concepts/validator-nodes",
            "concepts/fullnodes",
            "concepts/node-networks-sync",
          ],
        },
        "concepts/move",
        "concepts/accounts",
        "concepts/resources",
        "concepts/events",
        "concepts/txns-states",
        "concepts/gas-txn-fee",
        "concepts/base-gas",
        "concepts/blocks",
        {
          type: "category",
          label: "Staking",
          link: { type: "doc", id: "concepts/staking" },
          collapsible: true,
          collapsed: true,
          items: ["concepts/delegated-staking"],
        },
        "concepts/governance",
      ],
    },
    "guides/explore-aptos",
    "releases/index",
    "nodes/networks",
    {
      type: "category",
      label: "Read the Aptos White Paper",
      collapsible: true,
      collapsed: true,
      link: { type: "doc", id: "aptos-white-paper/index" },
      items: ["aptos-white-paper/in-korean", "aptos-white-paper/in-japanese"],
    },
  ],
  appSidebar: [
    {
      type: "html",
      value: "Build",
      className: "sidebar-title",
    },
    {
      type: "category",
      label: "Tutorials",
      link: { type: "doc", id: "tutorials/index" },
      collapsible: true,
      collapsed: true,
      items: [
        "tutorials/first-transaction",
        "tutorials/your-first-nft",
        "tutorials/first-coin",
        "tutorials/first-fungible-asset",
        "tutorials/first-move-module",
        "tutorials/first-multisig",
        "tutorials/build-e2e-dapp/index",
      ],
    },
    {
      type: "category",
      label: "Learn the Move Language",
      link: { type: "doc", id: "move/move-on-aptos" },
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "category",
          label: "The Move Book",
          link: { type: "doc", id: "move/book/SUMMARY" },
          collapsible: true,
          collapsed: true,
          items: [
            {
              type: "category",
              label: "Getting Started",
              collapsible: true,
              collapsed: true,
              items: [
                "move/book/introduction",
                "move/book/modules-and-scripts",
              ],
            },
            {
              type: "category",
              label: "Primitive Types",
              collapsible: true,
              collapsed: true,
              items: [
                "move/book/creating-coins",
                "move/book/integers",
                "move/book/bool",
                "move/book/address",
                "move/book/vector",
                "move/book/signer",
                "move/book/references",
                "move/book/tuples",
              ],
            },
            {
              type: "category",
              label: "Basic Concepts",
              collapsible: true,
              collapsed: true,
              items: [
                "move/book/variables",
                "move/book/equality",
                "move/book/abort-and-assert",
                "move/book/conditionals",
                "move/book/loops",
                "move/book/functions",
                "move/book/structs-and-resources",
                "move/book/constants",
                "move/book/generics",
                "move/book/abilities",
                "move/book/uses",
                "move/book/friends",
                "move/book/packages",
                "move/book/package-upgrades",
                "move/book/unit-testing",
              ],
            },
            {
              type: "category",
              label: "Global Storage",
              collapsible: true,
              collapsed: true,
              items: [
                "move/book/global-storage-structure",
                "move/book/global-storage-operators",
              ],
            },
            {
              type: "category",
              label: "Reference",
              collapsible: true,
              collapsed: true,
              items: [
                "move/book/standard-library",
                "move/book/coding-conventions",
              ],
            },
          ],
        },
        {
          type: "category",
          label: "Advanced Move Guides",
          collapsible: true,
          collapsed: true,
          link: {
            type: "generated-index",
            title: "Advanced Move Guides",
            description:
              "Take the next step into building complex Move applications on Aptos.",
            slug: "move/aptos-move",
          },
          items: [
            {
              type: "category",
              label: "Objects",
              collapsible: true,
              collapsed: true,
              link: {
                type: "doc",
                id: "move/move-on-aptos/objects/index",
              },
              items: [
                "move/move-on-aptos/objects/creating-objects",
                "move/move-on-aptos/objects/configuring-objects",
                "move/move-on-aptos/objects/using-objects",
              ],
            },
            {
              type: "category",
              label: "Move Scripts",
              collapsible: true,
              collapsed: true,
              link: {
                type: "doc",
                id: "move/move-on-aptos/scripts/index",
              },
              items: [
                "move/move-on-aptos/scripts/writing-scripts",
                "move/move-on-aptos/scripts/compiling-scripts",
                "move/move-on-aptos/scripts/running-scripts",
                "move/move-on-aptos/scripts/script-tutorial",
              ],
            },
            "move/move-on-aptos/resource-accounts",
            "move/move-on-aptos/modules-on-aptos",
            "move/move-on-aptos/cli",
            "move/move-on-aptos/cryptography",
            "move/move-on-aptos/gas-profiling",
            "move/move-on-aptos/move-security-guidelines",
          ],
        },
        {
          type: "category",
          label: "The Move Prover Book",
          link: { type: "doc", id: "move/prover/index" },
          collapsible: true,
          collapsed: true,
          items: [
            "move/prover/prover-guide",
            "move/prover/spec-lang",
            "move/prover/supporting-resources",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Aptos Standards",
      link: { type: "doc", id: "standards/index" },
      collapsible: true,
      collapsed: true,
      items: [
        "standards/aptos-object",
        "standards/aptos-coin",
        "standards/fungible-asset",
        "standards/digital-asset",
        "standards/aptos-token",
        "standards/wallets",
      ],
    },
    {
      type: "category",
      label: "Aptos APIs",
      link: { type: "doc", id: "apis/index" },
      collapsible: true,
      collapsed: true,
      items: [
        "apis/fullnode-rest-api",
        "apis/aptos-labs-developer-portal",
        {
          type: "category",
          label: "Indexing",
          collapsible: true,
          collapsed: true,
          link: { type: "doc", id: "indexer/indexer-landing" },
          items: [
            {
              type: "category",
              label: "Indexer API",
              link: { type: "doc", id: "indexer/api/index" },
              collapsible: true,
              collapsed: true,
              items: [
                "indexer/api/labs-hosted",
                "indexer/api/self-hosted",
                "indexer/api/example-queries",
              ],
            },
            {
              type: "category",
              label: "Custom Processors",
              link: { type: "doc", id: "indexer/custom-processors/index" },
              collapsible: true,
              collapsed: true,
              items: [
                "indexer/custom-processors/e2e-tutorial",
                "indexer/custom-processors/parsing-txns",
              ],
            },
            {
              type: "category",
              label: "Transaction Stream Service",
              link: { type: "doc", id: "indexer/txn-stream/index" },
              collapsible: true,
              collapsed: true,
              items: [
                "indexer/txn-stream/labs-hosted",
                "indexer/txn-stream/self-hosted",
                "indexer/txn-stream/local-development",
              ],
            },
            {
              type: "category",
              label: "Legacy Indexer",
              link: { type: "doc", id: "indexer/legacy/index" },
              collapsible: true,
              collapsed: true,
              items: [
                "indexer/legacy/indexer-fullnode",
                "indexer/legacy/custom-data-model",
                "indexer/legacy/migration",
              ],
            },
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Aptos SDKs",
      collapsible: true,
      collapsed: true,
      link: { type: "doc", id: "sdks/index" },
      items: [
        {
          type: "category",
          label: "TypeScript SDK",
          link: { type: "doc", id: "sdks/ts-sdk/index" },
          collapsible: true,
          collapsed: true,
          items: [
            "sdks/ts-sdk/migration-guide",
            "sdks/ts-sdk/account",
            "sdks/ts-sdk/sdk-configuration",
            "sdks/ts-sdk/fetch-data-from-chain",
            "sdks/ts-sdk/transaction-builder",
            "sdks/ts-sdk/http-client",
            "sdks/ts-sdk/move-types",
            "sdks/ts-sdk/testing",
            "sdks/ts-sdk/typescript",
          ],
        },
        {
          type: "category",
          label: "Legacy TypeScript SDK",
          link: { type: "doc", id: "sdks/legacy-ts-sdk/index" },
          collapsible: true,
          collapsed: true,
          items: [
            "sdks/legacy-ts-sdk/typescript-sdk-overview",
            {
              type: "category",
              label: "API Client Layer",
              link: {
                type: "doc",
                id: "sdks/legacy-ts-sdk/sdk-client-layer",
              },
              collapsible: true,
              collapsed: true,
              items: [
                "sdks/legacy-ts-sdk/aptos-client",
                "sdks/legacy-ts-sdk/indexer-client",
              ],
            },
            "sdks/legacy-ts-sdk/sdk-core-layer",
            "sdks/legacy-ts-sdk/sdk-plugins-layer",
            "sdks/legacy-ts-sdk/sdk-tests",
          ],
        },
        // Migrate these to proper folders when more info is there
        "sdks/python-sdk/index",
        "sdks/rust-sdk/index",
        "sdks/unity-sdk/index",
      ],
    },
    {
      type: "category",
      label: "Aptos CLI",
      collapsible: true,
      collapsed: true,
      link: { type: "doc", id: "tools/aptos-cli/index" },
      items: [
        {
          type: "category",
          label: "Install the Aptos CLI",
          link: { type: "doc", id: "tools/aptos-cli/install-cli/index" },
          collapsible: true,
          collapsed: true,
          items: [
            "tools/aptos-cli/install-cli/install-cli-mac",
            "tools/aptos-cli/install-cli/install-cli-windows",
            "tools/aptos-cli/install-cli/install-cli-linux",
            "tools/aptos-cli/install-cli/install-cli-specific-version",
            "tools/aptos-cli/install-cli/install-move-prover",
          ],
        },
        {
          type: "category",
          label: "Use Aptos CLI",
          link: {
            type: "doc",
            id: "tools/aptos-cli/use-cli/use-aptos-cli",
          },
          collapsible: true,
          collapsed: true,
          items: [
            "tools/aptos-cli/use-cli/cli-configuration",
            "tools/aptos-cli/use-cli/cli-account",
            "tools/aptos-cli/use-cli/cli-key",
            "tools/aptos-cli/use-cli/cli-node",
            "tools/aptos-cli/use-cli/cli-genesis",
            "tools/aptos-cli/use-cli/use-aptos-ledger",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Integrate with Aptos",
      link: { type: "doc", id: "integration/index" },
      collapsible: true,
      collapsed: true,
      items: [
        "guides/nfts/aptos-token-overview",
        {
          type: "category",
          label: "Integrate with Wallets",
          link: { type: "doc", id: "integration/wallet-adapter-concept" },
          items: [
            "integration/wallet-adapter-for-dapp",
            "integration/wallet-adapter-for-wallets",
          ],
          collapsible: true,
          collapsed: true,
        },
        "integration/aptos-names-service-package",
        "reference/error-codes",
        "guides/system-integrators-guide",
      ],
    },
    {
      type: "category",
      label: "Build E2E Dapp with Aptos",
      link: { type: "doc", id: "tutorials/build-e2e-dapp/index" },
      collapsible: true,
      collapsed: true,
      items: [
        "tutorials/build-e2e-dapp/create-a-smart-contract",
        "tutorials/build-e2e-dapp/set-up-react-app",
        "tutorials/build-e2e-dapp/add-wallet-support",
        "tutorials/build-e2e-dapp/fetch-data-from-chain",
        "tutorials/build-e2e-dapp/submit-data-to-chain",
        "tutorials/build-e2e-dapp/handle-tasks",
      ],
    },
    {
      type: "category",
      label: "Advanced Builder Guides",
      collapsible: true,
      collapsed: true,
      link: {
        type: "generated-index",
        title: "Advanced Builder Guides",
        description:
          "Take the next step into building complex applications on Aptos.",
        slug: "/category/advanced-builders",
      },
      items: [
        {
          type: "category",
          label: "Develop Locally",
          link: { type: "doc", id: "nodes/local-testnet/index" },
          collapsible: true,
          collapsed: true,
          items: [
            "guides/local-development-network",
            "nodes/local-testnet/run-a-local-testnet",
            "guides/running-a-local-multi-node-network",
          ],
        },
        "guides/sponsored-transactions",
        "guides/transaction-management",
        "guides/account-management/key-rotation",
        "guides/building-from-source",
      ],
    },
  ],
  nodeSidebar: [
    {
      type: "html",
      value: "Run Nodes",
      className: "sidebar-title",
    },
    "nodes/nodes-landing",
    {
      type: "category",
      label: "Run a Validator and VFN",
      link: { type: "doc", id: "nodes/validator-node/index" },
      collapsible: true,
      collapsed: true,
      items: [
        "nodes/validator-node/operator/node-requirements",
        {
          type: "category",
          label: "Deploy Nodes",
          collapsible: true,
          collapsed: true,
          link: {
            type: "doc",
            id: "nodes/validator-node/operator/running-validator-node/index",
          },
          items: [
            "nodes/validator-node/operator/running-validator-node/using-source-code",
            "nodes/validator-node/operator/running-validator-node/using-docker",
            "nodes/validator-node/operator/running-validator-node/using-aws",
            "nodes/validator-node/operator/running-validator-node/using-azure",
            "nodes/validator-node/operator/running-validator-node/using-gcp",
          ],
        },
        {
          type: "category",
          label: "Connect Nodes",
          collapsible: true,
          collapsed: true,
          link: {
            type: "doc",
            id: "nodes/validator-node/operator/connect-nodes/index",
          },
          items: [
            "nodes/validator-node/operator/connect-to-aptos-network",
            "nodes/validator-node/operator/staking-pool-operations",
            "nodes/validator-node/operator/delegation-pool-operations",
            "nodes/validator-node/voter/index",
          ],
        },
        {
          type: "category",
          label: "Verify Nodes",
          collapsible: true,
          collapsed: true,
          link: {
            type: "doc",
            id: "nodes/validator-node/operator/verify-nodes/index",
          },
          items: [
            "nodes/validator-node/operator/node-liveness-criteria",
            "nodes/leaderboard-metrics",
          ],
        },
        {
          type: "category",
          label: "Modify Nodes",
          collapsible: true,
          collapsed: true,
          link: {
            type: "doc",
            id: "nodes/validator-node/operator/modify-nodes/index",
          },
          items: [
            "nodes/validator-node/operator/update-validator-node",
            "nodes/validator-node/operator/shutting-down-nodes",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Run a Public Fullnode",
      link: { type: "doc", id: "nodes/full-node/index" },
      collapsible: true,
      collapsed: true,
      items: [
        "nodes/full-node/pfn-requirements",
        {
          type: "category",
          label: "Deploy a PFN",
          collapsible: true,
          collapsed: true,
          link: {
            type: "doc",
            id: "nodes/full-node/deployments/index",
          },
          items: [
            "nodes/full-node/deployments/using-source-code",
            "nodes/full-node/deployments/using-docker",
            "nodes/full-node/deployments/using-gcp",
          ],
        },
        "nodes/full-node/verify-pfn",
        {
          type: "category",
          label: "Modify a PFN",
          collapsible: true,
          collapsed: true,
          link: {
            type: "doc",
            id: "nodes/modify/index",
          },
          items: [
            "nodes/full-node/update-fullnode-with-new-releases",
            "nodes/full-node/network-identity-fullnode",
            "nodes/full-node/fullnode-network-connections",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Bootstrap a Node",
      collapsible: true,
      collapsed: true,
      link: { type: "doc", id: "nodes/operations/index" },
      items: [
        "nodes/full-node/bootstrap-fullnode",
        "nodes/full-node/aptos-db-restore",
      ],
    },
    {
      type: "category",
      label: "Configure a Node",
      collapsible: true,
      collapsed: true,
      link: { type: "doc", id: "nodes/configure/index" },
      items: [
        "guides/state-sync",
        "guides/data-pruning",
        "reference/telemetry",
        {
          type: "category",
          label: "Locating Node Files",
          collapsible: true,
          collapsed: true,
          link: { type: "doc", id: "nodes/node-files-all-networks/index" },
          items: [
            "nodes/node-files-all-networks/node-files",
            "nodes/node-files-all-networks/node-files-testnet",
            "nodes/node-files-all-networks/node-files-devnet",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Monitor a Node",
      collapsible: true,
      collapsed: true,
      link: { type: "doc", id: "nodes/measure/index" },
      items: [
        "nodes/measure/node-inspection-service",
        "nodes/measure/important-metrics",
        "nodes/measure/node-health-checker",
      ],
    },
  ],
  refSidebar: [
    {
      type: "html",
      value: "Aptos References",
      className: "sidebar-title",
    },
    "nodes/aptos-api-spec",
    "reference/error-codes",
    "reference/move",
    "reference/glossary",
  ],
  comSidebar: [
    {
      type: "html",
      value: "Aptos Community",
      className: "sidebar-title",
    },
    "community/index",
    "community/external-resources",
    "community/site-updates",
    "community/aptos-style",
    "community/contributors",
  ],
};

module.exports = sidebars;
