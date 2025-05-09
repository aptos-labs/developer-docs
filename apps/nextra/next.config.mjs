/* eslint-disable no-undef */
import bundleAnalyzer from "@next/bundle-analyzer";
import nextra from "nextra";
import { i18nConfig } from "./docs.config.js";
import { macros } from "@aptos-labs/aptos-nextra-config";

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  defaultShowCopyCode: true,
  latex: {
    options: {
      macros: {
        ...macros,
      },
    },
    renderer: "katex",
  },
});

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/**
 * @type {import("next").NextConfig}
 */
export default withBundleAnalyzer(
  withNextra({
    eslint: {
      // Eslint behaves weirdly in this monorepo.
      ignoreDuringBuilds: true,
    },
    i18n: {
      locales: Object.keys(i18nConfig).map((locale) => locale),
      defaultLocale: "en",
    },
    distDir: "./.next", // Nextra supports custom `nextConfig.distDir`
    reactStrictMode: true,
    transpilePackages: [
      "@aptos-labs/aptos-nextra-config",
      "@aptos-labs/github-fetch",
    ],
    redirects: async () => [
      {
        source: "/build",
        destination: "/en/build/get-started",
        permanent: true,
      },
      {
        source: "/docs",
        destination: "/en/docs",
        statusCode: 302,
      },
      {
        source: "/",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/concepts/validator-nodes",
        destination: "/en/network/blockchain/validator-nodes",
        permanent: true,
      },
      {
        source: "/concepts/fullnodes",
        destination: "/en/network/blockchain/fullnodes",
        permanent: true,
      },
      {
        source: "/concepts/node-networks-sync",
        destination: "/en/network/blockchain/node-networks-sync",
        permanent: true,
      },
      {
        source: "/concepts/move-on-aptos",
        destination: "/en/network/blockchain/move",
        permanent: true,
      },
      {
        source: "/concepts/accounts",
        destination: "/en/network/blockchain/accounts",
        permanent: true,
      },
      {
        source: "/concepts/resources",
        destination: "/en/network/blockchain/resources",
        permanent: true,
      },
      {
        source: "/concepts/events",
        destination: "/en/network/blockchain/events",
        permanent: true,
      },
      {
        source: "/concepts/txns-states",
        destination: "/en/network/blockchain/txns-states",
        permanent: true,
      },
      {
        source: "/concepts/gas-txn-fee",
        destination: "/en/network/blockchain/gas-txn-fee",
        permanent: true,
      },
      {
        source: "/concepts/base-gas",
        destination: "/en/network/blockchain/base-gas",
        permanent: true,
      },
      {
        source: "/concepts/blocks",
        destination: "/en/network/blockchain/blocks",
        permanent: true,
      },
      {
        source: "/concepts/delegated-staking",
        destination: "/en/network/blockchain/delegated-staking",
        permanent: true,
      },
      {
        source: "/concepts/governance",
        destination: "/en/network/blockchain/governance",
        permanent: true,
      },
      {
        source: "/releases/aptos-releases",
        destination: "/en/network/releases",
        permanent: true,
      },
      {
        source: "/nodes/networks",
        destination: "/en/network/nodes/networks",
        permanent: true,
      },
      {
        source: "/move/book/modules-and-scripts",
        destination: "/en/build/smart-contracts/book/modules-and-scripts",
        permanent: true,
      },
      {
        source: "/move/book/integers",
        destination: "/en/build/smart-contracts/book/integers",
        permanent: true,
      },
      {
        source: "/move/book/bool",
        destination: "/en/build/smart-contracts/book/bool",
        permanent: true,
      },
      {
        source: "/move/book/address",
        destination: "/en/build/smart-contracts/book/address",
        permanent: true,
      },
      {
        source: "/move/book/vector",
        destination: "/en/build/smart-contracts/book/vector",
        permanent: true,
      },
      {
        source: "/move/book/signer",
        destination: "/en/build/smart-contracts/book/signer",
        permanent: true,
      },
      {
        source: "/move/book/references",
        destination: "/en/build/smart-contracts/move-reference",
        permanent: true,
      },
      {
        source: "/reference/move",
        destination: "/en/build/smart-contracts/move-reference",
        permanent: true,
      },
      {
        source: "/move/book/tuples",
        destination: "/en/build/smart-contracts/book/tuples",
        permanent: true,
      },
      {
        source: "/move/book/variables",
        destination: "/en/build/smart-contracts/book/variables",
        permanent: true,
      },
      {
        source: "/move/book/equality",
        destination: "/en/build/smart-contracts/book/equality",
        permanent: true,
      },
      {
        source: "/move/book/abort-and-assert",
        destination: "/en/build/smart-contracts/book/abort-and-assert",
        permanent: true,
      },
      {
        source: "/move/book/conditionals",
        destination: "/en/build/smart-contracts/book/conditionals",
        permanent: true,
      },
      {
        source: "/move/book/loops",
        destination: "/en/build/smart-contracts/book/loops",
        permanent: true,
      },
      {
        source: "/move/book/functions",
        destination: "/en/build/smart-contracts/book/functions",
        permanent: true,
      },
      {
        source: "/move/book/structs-and-resources",
        destination: "/en/build/smart-contracts/book/structs-and-resources",
        permanent: true,
      },
      {
        source: "/move/book/constants",
        destination: "/en/build/smart-contracts/book/constants",
        permanent: true,
      },
      {
        source: "/move/book/generics",
        destination: "/en/build/smart-contracts/book/generics",
        permanent: true,
      },
      {
        source: "/move/book/abilities",
        destination: "/en/build/smart-contracts/book/abilities",
        permanent: true,
      },
      {
        source: "/move/book/uses",
        destination: "/en/build/smart-contracts/book/uses",
        permanent: true,
      },
      {
        source: "/move/book/friends",
        destination: "/en/build/smart-contracts/book/friends",
        permanent: true,
      },
      {
        source: "/move/book/packages",
        destination: "/en/build/smart-contracts/book/packages",
        permanent: true,
      },
      {
        source: "/move/book/package-upgrades",
        destination: "/en/build/smart-contracts/book/package-upgrades",
        permanent: true,
      },
      {
        source: "/move/book/unit-testing",
        destination: "/en/build/smart-contracts/book/unit-testing",
        permanent: true,
      },
      {
        source: "/move/book/global-storage-structure",
        destination: "/en/build/smart-contracts/book/global-storage-structure",
        permanent: true,
      },
      {
        source: "/move/book/global-storage-operators",
        destination: "/en/build/smart-contracts/book/global-storage-operators",
        permanent: true,
      },
      {
        source: "/move/book/standard-library",
        destination: "/en/build/smart-contracts/book/standard-library",
        permanent: true,
      },
      {
        source: "/move/book/coding-conventions",
        destination: "/en/build/smart-contracts/book/coding-conventions",
        permanent: true,
      },
      {
        source: "/move/move-on-aptos/objects",
        destination: "/en/build/smart-contracts/objects",
        permanent: true,
      },
      {
        source: "/move/move-on-aptos/object/configuring-objects",
        destination: "/en/build/smart-contracts/object/creating-objects",
        permanent: true,
      },
      {
        source: "/move/move-on-aptos/object/:path",
        destination: "/en/build/smart-contracts/object/:path",
        permanent: true,
      },
      {
        source: "/move/move-on-aptos/scripts/writing-scripts",
        destination: "/en/build/smart-contracts/scripts/writing-scripts",
        permanent: true,
      },
      {
        source: "/move/move-on-aptos/scripts/compiling-scripts",
        destination: "/en/build/smart-contracts/scripts/compiling-scripts",
        permanent: true,
      },
      {
        source: "/move/move-on-aptos/scripts/running-scripts",
        destination: "/en/build/smart-contracts/scripts/running-scripts",
        permanent: true,
      },
      {
        source: "/move/move-on-aptos/scripts/script-tutorial",
        destination: "/en/build/smart-contracts/scripts/script-tutorial",
        permanent: true,
      },
      {
        source: "/move/move-on-aptos/resource-accounts",
        destination: "/en/build/smart-contracts/resource-accounts",
        permanent: true,
      },
      {
        source: "/move/move-on-aptos/modules-on-aptos",
        destination: "/en/build/smart-contracts/modules-on-aptos",
        permanent: true,
      },
      {
        source: "/move/move-on-aptos/cryptography",
        destination: "/en/build/smart-contracts/cryptography",
        permanent: true,
      },
      {
        source: "/move/move-on-aptos/move-security-guidelines",
        destination: "/en/build/smart-contracts/move-security-guidelines",
        permanent: true,
      },
      {
        source: "/move/prover/prover-guide",
        destination: "/en/build/smart-contracts/prover/prover-guide",
        permanent: true,
      },
      {
        source: "/move/prover/spec-lang",
        destination: "/en/build/smart-contracts/prover/spec-lang",
        permanent: true,
      },
      {
        source: "/move/prover/supporting-resources",
        destination: "/en/build/smart-contracts/prover/supporting-resources",
        permanent: true,
      },
      {
        source: "/standards/aptos-object",
        destination: "/en/build/smart-contracts/aptos-standards/aptos-object",
        permanent: true,
      },
      {
        source: "/standards/aptos-coin",
        destination: "/en/build/smart-contracts/aptos-standards/aptos-coin",
        permanent: true,
      },
      {
        source: "/standards/fungible-asset",
        destination: "/en/build/smart-contracts/aptos-standards/fungible-asset",
        permanent: true,
      },
      {
        source: "/standards/digital-asset",
        destination: "/en/build/smart-contracts/aptos-standards/digital-asset",
        permanent: true,
      },
      {
        source: "/standards/aptos-token",
        destination: "/en/build/smart-contracts/aptos-standards/aptos-token",
        permanent: true,
      },
      {
        source: "/standards/wallets",
        destination: "/en/build/sdks/wallet-adapter/wallets",
        permanent: true,
      },
      {
        source: "/apis/fullnode-rest-api",
        destination: "/en/build/apis/fullnode-rest-api",
        permanent: true,
      },
      {
        source: "/apis/aptos-labs-developer-portal",
        destination: "/en/build/apis/aptos-labs-developer-portal",
        permanent: true,
      },
      {
        source: "/indexer/api/labs-hosted",
        destination: "/en/build/indexer/api/labs-hosted",
        permanent: true,
      },
      {
        source: "/indexer/api/self-hosted",
        destination: "/en/build/indexer/api/self-hosted",
        permanent: true,
      },
      {
        source: "/indexer/indexer-sdk/quickstart",
        destination: "/en/build/indexer/indexer-sdk/quickstart",
        permanent: true,
      },
      {
        source: "/indexer/indexer-sdk/documentation",
        destination: "/en/build/indexer/indexer-sdk/documentation",
        permanent: true,
      },
      {
        source: "/indexer/indexer-sdk/documentation/setup",
        destination: "/en/build/indexer/indexer-sdk/documentation/setup",
        permanent: true,
      },
      {
        source: "/indexer/indexer-sdk/documentation/define-schema",
        destination:
          "/en/build/indexer/indexer-sdk/documentation/define-schema",
        permanent: true,
      },
      {
        source: "/indexer/indexer-sdk/documentation/create-processor",
        destination:
          "/en/build/indexer/indexer-sdk/documentation/create-processor",
        permanent: true,
      },
      {
        source: "/indexer/indexer-sdk/documentation/steps",
        destination: "/en/build/indexer/indexer-sdk/documentation/steps",
        permanent: true,
      },
      {
        source: "/indexer/indexer-sdk/documentation/parsing-txns",
        destination: "/en/build/indexer/indexer-sdk/documentation/parsing-txns",
        permanent: true,
      },
      {
        source: "/indexer/indexer-sdk/documentation/connect-steps",
        destination:
          "/en/build/indexer/indexer-sdk/documentation/connect-steps",
        permanent: true,
      },
      {
        source: "/indexer/indexer-sdk/documentation/transaction-stream",
        destination:
          "/en/build/indexer/indexer-sdk/documentation/transaction-stream",
        permanent: true,
      },
      {
        source: "/indexer/indexer-sdk/documentation/version-tracking",
        destination:
          "/en/build/indexer/indexer-sdk/documentation/version-tracking",
        permanent: true,
      },
      {
        source: "/indexer/indexer-sdk/documentation/run-processor",
        destination:
          "/en/build/indexer/indexer-sdk/documentation/run-processor",
        permanent: true,
      },
      {
        source: "/indexer/indexer-sdk/documentation/advanced-tutorials",
        destination:
          "/en/build/indexer/indexer-sdk/documentation/advanced-tutorials",
        permanent: true,
      },
      {
        source:
          "/indexer/indexer-sdk/documentation/advanced-tutorials/txn-importer",
        destination:
          "/en/build/indexer/indexer-sdk/documentation/advanced-tutorials/txn-importer",
        permanent: true,
      },
      {
        source:
          "/indexer/indexer-sdk/documentation/advanced-tutorials/txn-script",
        destination:
          "/en/build/indexer/indexer-sdk/documentation/advanced-tutorials/txn-script",
        permanent: true,
      },
      {
        source:
          "/indexer/indexer-sdk/documentation/advanced-tutorials/processor-test",
        destination:
          "/en/build/indexer/indexer-sdk/documentation/advanced-tutorials/processor-test",
        permanent: true,
      },
      {
        source: "/indexer/txn-stream/labs-hosted",
        destination: "/en/build/indexer/api/labs-hosted",
        permanent: true,
      },
      {
        source: "/indexer/txn-stream/self-hosted",
        destination: "/en/build/indexer/api/self-hosted",
        permanent: true,
      },
      {
        source: "/indexer/txn-stream/local-development",
        destination: "/en/build/indexer/txn-stream/local-development",
        permanent: true,
      },
      {
        source: "/guides/local-development-network",
        destination: "/en/network/nodes/localnet/local-development-network",
        permanent: true,
      },
      {
        source: "/concepts/coin-and-token/aptos-token",
        destination: "/en/build/smart-contracts/aptos-token",
        permanent: true,
      },
      {
        source: "/guides/move-guides/move-on-aptos",
        destination: "/en/build/smart-contracts",
        permanent: true,
      },
      {
        source: "/en/build/cli/use-cli",
        destination: "/en/build/cli",
        permanent: true,
      },
      {
        source: "/cli-tools/aptos-cli-tool",
        destination: "/en/build/cli",
        permanent: true,
      },
      {
        source: "/nodes/aptos-deployments",
        destination: "/en/network/nodes/full-node/deployments",
        permanent: true,
      },
      {
        source: "/indexer/legacy/indexer-fullnode",
        destination: "/en/build/indexer/legacy/indexer-fullnode",
        permanent: true,
      },
      {
        source: "/indexer/legacy/custom-data-model",
        destination: "/en/build/indexer/legacy/custom-data-model",
        permanent: true,
      },
      {
        source: "/indexer/legacy/migration",
        destination: "/en/build/indexer/legacy/migration",
        permanent: true,
      },
      {
        source: "/sdks/ts-sdk/migration-guide",
        destination: "/en/build/sdks/ts-sdk/legacy-ts-sdk/migration-guide",
        permanent: true,
      },
      {
        source: "/sdks/ts-sdk/account",
        destination: "/en/build/sdks/ts-sdk/account",
        permanent: true,
      },
      {
        source: "/sdks/legacy-ts-sdk/index",
        destination: "/en/build/sdks/ts-sdk/legacy-ts-sdk",
        permanent: true,
      },
      {
        source: "/sdks/legacy-ts-sdk/typescript-sdk-overview",
        destination:
          "/en/build/sdks/ts-sdk/legacy-ts-sdk/typescript-sdk-overview",
        permanent: true,
      },
      {
        source: "/sdks/legacy-ts-sdk/typescript-sdk-aptos-client-class",
        destination:
          "/en/build/sdks/ts-sdk/legacy-ts-sdk/sdk-client-layer/aptos-client",
        permanent: true,
      },
      {
        source: "/sdks/legacy-ts-sdk/typescript-sdk-indexer-client-class",
        destination:
          "/en/build/sdks/ts-sdk/legacy-ts-sdk/sdk-client-layer/indexer-client",
        permanent: true,
      },
      {
        source: "/sdks/legacy-ts-sdk/typescript-sdk-core-layer",
        destination: "/en/build/sdks/ts-sdk/legacy-ts-sdk/sdk-core-layer",
        permanent: true,
      },
      {
        source: "/sdks/legacy-ts-sdk/typescript-sdk-plugins-layer",
        destination: "/en/build/sdks/ts-sdk/legacy-ts-sdk/sdk-plugins-layer",
        permanent: true,
      },
      {
        source: "/sdks/legacy-ts-sdk/typescript-sdk-tests",
        destination: "/en/build/sdks/ts-sdk/legacy-ts-sdk/sdk-tests",
        permanent: true,
      },
      {
        source: "/sdks/python-sdk",
        destination: "/en/build/sdks/python-sdk",
        permanent: true,
      },
      {
        source: "/sdks/rust-sdk",
        destination: "/en/build/sdks/rust-sdk",
        permanent: true,
      },
      {
        source: "/sdks/unity-sdk",
        destination: "/en/build/sdks/unity-sdk",
        permanent: true,
      },
      {
        source: "/tools/aptos-cli/install-cli/install-cli-mac",
        destination: "/en/build/cli/install-cli/install-cli-mac",
        permanent: true,
      },
      {
        source: "/tools/aptos-cli/install-cli/install-cli-windows",
        destination: "/en/build/cli/install-cli/install-cli-windows",
        permanent: true,
      },
      {
        source: "/tools/aptos-cli/install-cli/install-cli-linux",
        destination: "/en/build/cli/install-cli/install-cli-linux",
        permanent: true,
      },
      {
        source: "/tools/aptos-cli/install-cli/install-cli-specific-version",
        destination: "/en/build/cli/install-cli/install-cli-specific-version",
        permanent: true,
      },
      {
        source: "/tools/aptos-cli/install-cli/install-move-prover",
        destination: "/en/build/cli/setup-cli/install-move-prover",
        permanent: true,
      },
      {
        source:
          "/tools/aptos-cli/use-cli/move-tutorials/arguments-in-json-tutorial",
        destination:
          "/en/build/cli/working-with-move-contracts/arguments-in-json-tutorial",
        permanent: true,
      },
      {
        source:
          "/tools/aptos-cli/use-cli/move-tutorials/multi-signature-tutorial",
        destination:
          "/en/build/cli/working-with-move-contracts/multi-signature-tutorial",
        permanent: true,
      },
      {
        source: "/tools/aptos-cli/use-cli/on-chain/looking-up-account-info",
        destination:
          "/en/build/cli/trying-things-on-chain/looking-up-account-info",
        permanent: true,
      },
      {
        source: "/tools/aptos-cli/use-cli/on-chain/create-test-accounts",
        destination:
          "/en/build/cli/trying-things-on-chain/create-test-accounts",
        permanent: true,
      },
      {
        source: "/tools/aptos-cli/use-cli/on-chain/ledger",
        destination: "/en/build/cli/trying-things-on-chain/ledger",
        permanent: true,
      },
      {
        source: "/tools/aptos-cli/use-cli/managing-a-network-node",
        destination: "/en/build/cli/managing-a-network-node",
        permanent: true,
      },
      {
        source: "/reference/error-codes",
        destination: "/en/build/smart-contracts/error-codes",
        permanent: true,
      },
      {
        source: "/integration",
        destination: "/en/build/guides/system-integrators-guide",
        permanent: true,
      },
      {
        source: "/guides/system-integrators-guide",
        destination: "/en/build/guides/system-integrators-guide",
        permanent: true,
      },
      {
        source: "/tools/aptos-cli/use-cli/running-a-local-network",
        destination: "/en/build/cli/running-a-local-network",
        permanent: true,
      },
      {
        source: "/nodes/localnet/run-a-localnet",
        destination: "/en/network/nodes/localnet/run-a-localnet",
        permanent: true,
      },
      {
        source: "/guides/sponsored-transactions",
        destination: "/en/build/guides/sponsored-transactions",
        permanent: true,
      },
      {
        source: "/guides/transaction-management",
        destination: "/en/build/guides/transaction-management",
        permanent: true,
      },
      {
        source: "/guides/account-management/key-rotation",
        destination: "/en/build/guides/key-rotation",
        permanent: true,
      },
      {
        source: "/guides/building-from-source",
        destination: "/en/network/nodes/building-from-source",
        permanent: true,
      },
      {
        source: "/nodes/validator-node/operator/node-requirements",
        destination: "/en/network/nodes/validator-node/node-requirements",
        permanent: true,
      },
      {
        source:
          "/nodes/validator-node/operator/running-validator-node/run-validator-node-using-source",
        destination:
          "/en/network/nodes/full-node/deployments/using-source-code",
        permanent: true,
      },
      {
        source:
          "/nodes/validator-node/operator/running-validator-node/run-validator-node-using-docker",
        destination: "/en/network/nodes/full-node/deployments/using-docker",
        permanent: true,
      },
      {
        source:
          "/nodes/validator-node/operator/running-validator-node/run-validator-node-using-aws",
        destination: "/en/network/nodes/validator-node/deploy-nodes/using-aws",
        permanent: true,
      },
      {
        source:
          "/nodes/validator-node/operator/running-validator-node/run-validator-node-using-azure",
        destination:
          "/en/network/nodes/validator-node/deploy-nodes/using-azure",
        permanent: true,
      },
      {
        source:
          "/nodes/validator-node/operator/running-validator-node/run-validator-node-using-gcp",
        destination: "/en/network/nodes/full-node/deployments/using-gcp",
        permanent: true,
      },
      {
        source: "/nodes/validator-node/operator/connect-to-aptos-network",
        destination:
          "/en/network/nodes/validator-node/connect-nodes/connect-to-aptos-network",
        permanent: true,
      },
      {
        source: "/nodes/validator-node/operator/staking-pool-operations",
        destination:
          "/en/network/nodes/validator-node/connect-nodes/staking-pool-operations",
        permanent: true,
      },
      {
        source: "/nodes/validator-node/operator/delegation-pool-operations",
        destination:
          "/en/network/nodes/validator-node/connect-nodes/delegation-pool-operations",
        permanent: true,
      },
      {
        source: "/nodes/validator-node/operator/node-liveness-criteria",
        destination:
          "/en/network/nodes/validator-node/verify-nodes/node-liveness-criteria",
        permanent: true,
      },
      {
        source: "/nodes/leaderboard-metrics",
        destination:
          "/en/network/nodes/validator-node/verify-nodes/leaderboard-metrics",
        permanent: true,
      },
      {
        source: "/nodes/validator-node/operator/update-validator-node",
        destination:
          "/en/network/nodes/validator-node/modify-nodes/update-validator-node",
        permanent: true,
      },
      {
        source: "/nodes/validator-node/operator/shutting-down-nodes",
        destination:
          "/en/network/nodes/validator-node/modify-nodes/shutting-down-nodes",
        permanent: true,
      },
      {
        source: "/nodes/full-node/pfn-requirements",
        destination: "/en/network/nodes/full-node/pfn-requirements",
        permanent: true,
      },
      {
        source: "/nodes/full-node/deployments/deploy-a-pfn-source-code",
        destination:
          "/en/network/nodes/full-node/deployments/using-source-code",
        permanent: true,
      },
      {
        source: "/nodes/full-node/deployments/deploy-a-pfn-docker",
        destination: "/en/network/nodes/full-node/deployments/using-docker",
        permanent: true,
      },
      {
        source: "/nodes/full-node/deployments/deploy-a-pfn-gcp",
        destination: "/en/network/nodes/full-node/deployments/using-gcp",
        permanent: true,
      },
      {
        source: "/nodes/full-node/verify-pfn",
        destination: "/en/network/nodes/full-node/verify-pfn",
        permanent: true,
      },
      {
        source: "/nodes/full-node/update-fullnode-with-new-devnet-releases",
        destination:
          "/en/network/nodes/full-node/modify/update-fullnode-with-new-releases",
        permanent: true,
      },
      {
        source: "/nodes/full-node/network-identity-fullnode",
        destination:
          "/en/network/nodes/full-node/modify/network-identity-fullnode",
        permanent: true,
      },
      {
        source: "/nodes/full-node/fullnode-network-connections",
        destination:
          "/en/network/nodes/full-node/modify/fullnode-network-connections",
        permanent: true,
      },
      {
        source: "/nodes/full-node/bootstrap-fullnode",
        destination: "/en/network/nodes/bootstrap-fullnode",
        permanent: true,
      },
      {
        source: "/nodes/full-node/aptos-db-restore",
        destination: "/en/network/nodes/bootstrap-fullnode/aptos-db-restore",
        permanent: true,
      },
      {
        source: "/guides/aptos-guides",
        destination: "/en/network/nodes",
        permanent: true,
      },
      {
        source: "/guides/handle-aptos-errors",
        destination: "/en/build/smart-contracts/error-codes",
        permanent: true,
      },
      {
        source: "/guides/move-guides",
        destination: "/en/build/smart-contracts",
        permanent: true,
      },
      {
        source: "/guides/state-sync",
        destination: "/en/network/nodes/configure/state-sync",
        permanent: true,
      },
      {
        source: "/guides/data-pruning",
        destination: "/en/network/nodes/configure/data-pruning",
        permanent: true,
      },
      {
        source: "/reference/telemetry",
        destination: "/en/network/nodes/configure/telemetry",
        permanent: true,
      },
      {
        source: "/nodes/node-files-all-networks/node-files-testnet",
        destination:
          "/en/network/nodes/configure/node-files-all-networks/node-files-testnet",
        permanent: true,
      },
      {
        source: "/nodes/node-files-all-networks/node-files-devnet",
        destination:
          "/en/network/nodes/configure/node-files-all-networks/node-files-devnet",
        permanent: true,
      },
      {
        source: "/nodes/measure/node-inspection-service",
        destination: "/en/network/nodes/measure/node-inspection-service",
        permanent: true,
      },
      {
        source: "/nodes/measure/important-metrics",
        destination: "/en/network/nodes/measure/important-metrics",
        permanent: true,
      },
      {
        source: "/nodes/measure/node-health-checker",
        destination: "/en/network/nodes/measure/node-health-checker",
        permanent: true,
      },
      {
        source: "/nodes/aptos-api-spec",
        destination: "/en/build/apis/fullnode-rest-api-reference",
        permanent: true,
      },
      {
        source: "/reference/error-codes",
        destination: "/en/build/smart-contracts/error-codes",
        permanent: true,
      },
      {
        source: "/reference/glossary",
        destination: "/en/network/glossary",
        permanent: true,
      },
      {
        source: "/indexer/api/example-queries",
        destination: "/en/build/indexer/common-queries",
        permanent: true,
      },
      {
        source: "/guides/explore-aptos",
        destination: "/en/network/glossary#aptos-explorer",
        permanent: true,
      },
      {
        source: "/aptos-white-paper/aptos-white-paper-in-korean",
        destination: "/en/network/blockchain/aptos-white-paper",
        permanent: true,
      },
      {
        source: "/aptos-white-paper/aptos-white-paper-in-japanese",
        destination: "/en/network/blockchain/aptos-white-paper",
        permanent: true,
      },
      {
        source: "/move/move-on-aptos/gas-profiling",
        destination:
          "/en/build/cli/working-with-move-contracts/local-simulation-benchmarking-and-gas-profiling",
        permanent: true,
      },
      {
        source: "/sdks/ts-sdk/sdk-configuration",
        destination: "/en/build/sdks/ts-sdk",
        permanent: true,
      },
      {
        source: "/sdks/ts-sdk/fetch-data-from-chain",
        destination: "/en/build/sdks/ts-sdk/fetch-data-via-sdk",
        permanent: true,
      },
      {
        source: "/sdks/ts-sdk/transaction-builder",
        destination: "/en/build/sdks/ts-sdk/building-transactions",
        permanent: true,
      },
      {
        source: "/sdks/ts-sdk/http-client",
        destination: "/en/build/sdks/ts-sdk",
        permanent: true,
      },
      {
        source: "/sdks/ts-sdk/move-types",
        destination: "/en/build/sdks/ts-sdk/building-transactions/bcs-format",
        permanent: true,
      },
      {
        source: "/sdks/ts-sdk/testing",
        destination: "/en/build/sdks/ts-sdk",
        permanent: true,
      },
      {
        source: "/sdks/ts-sdk/typescript",
        destination: "/en/build/sdks/ts-sdk",
        permanent: true,
      },
      {
        source: "/tools/aptos-cli/cli-configuration",
        destination: "/en/build/cli/setup-cli",
        permanent: true,
      },
      {
        source: "/tools/aptos-cli/use-cli/public-network/run-public-network",
        destination: "/en/build/cli/public-network",
        permanent: true,
      },
      {
        source: "/guides/nfts/aptos-token-overview",
        destination: "/en/build/smart-contracts/aptos-standards/tokens",
        permanent: true,
      },
      {
        source: "/integration/wallet-adapter-for-dapp",
        destination: "/en/build/sdks/wallet-adapter/dapp",
        permanent: true,
      },
      {
        source: "/integration/wallet-adapter-for-wallets",
        destination: "/en/build/sdks/wallet-adapter/wallets",
        permanent: true,
      },
      {
        source: "/integration/aptos-names-service-package",
        destination: "https://aptosnames.com",
        permanent: true,
      },
      {
        source: "/nodes/nodes-landing",
        destination: "/en/network/nodes",
        permanent: true,
      },
      {
        source: "/nodes/validator-node/voter/index",
        destination:
          "/en/network/nodes/validator-node/connect-nodes/staking-pool-voter",
        permanent: true,
      },
      {
        source: "/nodes/node-files-all-networks/node-files",
        destination:
          "/en/network/nodes/configure/node-files-all-networks/node-files-mainnet",
        permanent: true,
      },
      {
        source: "/move/book/introduction",
        destination: "/en/build/smart-contracts/book",
        permanent: true,
      },
      {
        source: "/move/book/creating-coins",
        destination: "/en/build/smart-contracts/book/move-tutorial",
        permanent: true,
      },
      {
        source: "/tutorials",
        destination: "/en/build/guides",
        permanent: true,
      },
      {
        source: "/tutorials/your-first-transaction",
        destination: "/en/build/guides/first-transaction",
        permanent: true,
      },
      {
        source: "/tutorials/your-first-transaction-sdk",
        destination: "/en/build/sdks/ts-sdk/quickstart",
        permanent: true,
      },
      {
        source: "/tutorials/your-first-nft",
        destination: "/en/build/guides/your-first-nft",
        permanent: true,
      },
      {
        source: "/tutorials/your-first-coin",
        destination: "/en/build/guides/first-coin",
        permanent: true,
      },
      {
        source: "/tutorials/your-first-fungible-asset",
        destination: "/en/build/guides/first-fungible-asset",
        permanent: true,
      },
      {
        source: "/tutorials/first-move-module",
        destination: "/en/build/guides/first-move-module",
        permanent: true,
      },
      {
        source: "/tutorials/your-first-multisig",
        destination: "/en/build/guides/first-multisig",
        permanent: true,
      },
      {
        source: "/community/site-updates",
        destination: "/en/developer-platforms/contribute",
        permanent: true,
      },
      {
        source: "/community/aptos-style",
        destination: "/en/developer-platforms/contribute",
        permanent: true,
      },
      {
        source: "/community/contributors",
        destination: "/en/developer-platforms/contribute",
        permanent: true,
      },
      {
        source: "/tutorials/build-e2e-dapp/e2e-dapp-index",
        destination: "/en/build/guides/build-e2e-dapp",
        permanent: true,
      },
      {
        source: "/tutorials/build-e2e-dapp/create-a-smart-contract",
        destination: "/en/build/guides/build-e2e-dapp/1-create-smart-contract",
        permanent: true,
      },
      {
        source: "/tutorials/build-e2e-dapp/set-up-react-app",
        destination: "/en/build/guides/build-e2e-dapp/2-set-up-react-app",
        permanent: true,
      },
      {
        source: "/tutorials/build-e2e-dapp/add-wallet-support",
        destination: "/en/build/guides/build-e2e-dapp/2-set-up-react-app",
        permanent: true,
      },
      {
        source: "/tutorials/build-e2e-dapp/3-add-wallet-support",
        destination: "/en/build/guides/build-e2e-dapp/2-set-up-react-app",
        permanent: true,
      },
      {
        source: "/tutorials/build-e2e-dapp/fetch-data-from-chain",
        destination: "/en/build/guides/build-e2e-dapp/3-fetch-data-from-chain",
        permanent: true,
      },
      {
        source: "/tutorials/build-e2e-dapp/4-fetch-data-from-chain",
        destination: "/en/build/guides/build-e2e-dapp/3-fetch-data-from-chain",
        permanent: true,
      },
      {
        source: "/tutorials/build-e2e-dapp/submit-data-to-chain",
        destination: "/en/build/guides/build-e2e-dapp/4-submit-data-to-chain",
        permanent: true,
      },
      {
        source: "/tutorials/build-e2e-dapp/5-submit-data-to-chain",
        destination: "/en/build/guides/build-e2e-dapp/4-submit-data-to-chain",
        permanent: true,
      },
      {
        source: "/tutorials/build-e2e-dapp/handle-tasks",
        destination: "/en/build/guides/build-e2e-dapp/5-handle-tasks",
        permanent: true,
      },
      {
        source: "/tutorials/build-e2e-dapp/6-handle-tasks",
        destination: "/en/build/guides/build-e2e-dapp/5-handle-tasks",
        permanent: true,
      },
      {
        source: "/en/build/smart-contracts/aptos-standards/aptos-object",
        destination: "/en/build/smart-contracts/objects",
        permanent: true,
      },
      {
        source: "/en/build/smart-contracts/aptos-standards/objects",
        destination: "/en/build/smart-contracts/objects",
        permanent: true,
      },
      {
        source:
          "/en/build/smart-contracts/aptos-standards/object/creating-objects",
        destination: "/en/build/smart-contracts/object/creating-objects",
        permanent: true,
      },
      {
        source:
          "/en/build/smart-contracts/aptos-standards/object/configuring-objects",
        destination: "/en/build/smart-contracts/object/creating-objects",
        permanent: true,
      },
      {
        source: "/guides/nfts/mint-onchain-data",
        destination: "/en/build/guides/your-first-nft",
        permanent: true,
      },
      {
        source:
          "/assets/files/whitepaper-korean-67e84101467803b96c4f481a1161ec45.pdf",
        destination:
          "/en/network/blockchain/aptos-white-paper#full-pdf-versions",
        permanent: true,
      },
      {
        source: "/integration/aptos-api",
        destination: "/en/build/advanced-guides/system-integrators-guide",
        permanent: true,
      },
      {
        source: "/move/move-on-aptos/scripts",
        destination: "/en/build/smart-contracts/scripts",
        permanent: true,
      },
      {
        source: "/en/build/sdks/wallet-adapter/wallet-standard",
        destination: "/en/build/sdks/wallet-adapter/wallet-standards",
        permanent: true,
      },
      {
        source: "/sdks/aptos-sdk-overview",
        destination: "/en/build/sdks",
        permanent: true,
      },
      {
        source: "/guides/keyless-accounts",
        destination: "/en/build/guides/aptos-keyless",
        permanent: true,
      },
      {
        source: "/aptos-keyless",
        destination: "/en/build/guides/aptos-keyless",
        permanent: true,
      },
      {
        source: "/aptos-keyless/introduction",
        destination: "/en/build/guides/aptos-keyless/introduction",
        permanent: true,
      },
      {
        source: "/aptos-keyless/oidc-support",
        destination: "/en/build/guides/aptos-keyless/oidc-support",
        permanent: true,
      },
      {
        source: "/aptos-keyless/integration-guide",
        destination: "/en/build/guides/aptos-keyless/integration-guide",
        permanent: true,
      },
      {
        source: "/aptos-keyless/how-keyless-works",
        destination: "/en/build/guides/aptos-keyless/how-keyless-works",
        permanent: true,
      },
      {
        source: "/aptos-keyless/other",
        destination: "/en/build/guides/aptos-keyless/other",
        permanent: true,
      },
      {
        source: "/indexer/api",
        destination: "/en/build/indexer/api",
        permanent: true,
      },
      {
        source: "/tools/aptos-cli",
        destination: "/en/build/cli",
        permanent: true,
      },
      {
        source: "/tools/aptos-cli/install-cli",
        destination: "/en/build/cli",
        permanent: true,
      },
      {
        source: "/sdks/index",
        destination: "/en/build/sdks",
        permanent: true,
      },
      {
        source:
          "/assets/files/Aptos-Whitepaper-47099b4b907b432f81fc0effd34f3b6a.pdf",
        destination:
          "/en/network/blockchain/aptos-white-paper#full-pdf-versions",
        permanent: true,
      },
      {
        source: "/cli-tools/aptos-cli-tool/use-aptos-cli",
        destination: "/en/build/cli",
        permanent: true,
      },
      {
        source: "/tutorials/your-first-dapp",
        destination: "/en/build/guides/build-e2e-dapp",
        permanent: true,
      },
      {
        source: "/build/smart-contracts/book/references",
        destination: "/en/build/smart-contracts/book/references",
        permanent: true,
      },
      {
        source: "/cli-tools",
        destination: "/en/build/cli",
        permanent: true,
      },
      {
        source: "/sdks/ts-sdk/typescript-sdk",
        destination: "/en/build/sdks/ts-sdk",
        permanent: true,
      },
      {
        source: "/sdks/ts-sdk",
        destination: "/en/build/sdks/ts-sdk",
        permanent: true,
      },
      {
        source: "/scripts",
        destination: "/en/build/smart-contracts/scripts",
        permanent: true,
      },
      {
        source: "/standards/aptos-token-v2",
        destination: "/en/build/smart-contracts/digital-asset",
        permanent: true,
      },
      {
        source: "/sdks/cpp-sdk",
        destination: "/en/build/sdks/cpp-sdk",
        permanent: true,
      },
      {
        source: "/sdks/go-sdk",
        destination: "/en/build/sdks/go-sdk",
        permanent: true,
      },
      {
        source: "/indexer/indexer-landing",
        destination: "/en/build/indexer",
        permanent: true,
      },
      {
        source: "/move/aptos-move",
        destination: "/en/build/smart-contracts",
        permanent: true,
      },
      {
        source: "/move/move-on-aptos",
        destination: "/en/build/smart-contracts",
        permanent: true,
      },
      {
        source: "/apis",
        destination: "/en/build/apis",
        permanent: true,
      },
      {
        source: "/concepts",
        destination: "/en/network/blockchain",
        permanent: true,
      },
      {
        source: "/concepts/blockchain",
        destination: "/en/network/blockchain/blockchain-deep-dive",
        permanent: true,
      },
      {
        source: "/concepts/staking",
        destination: "/en/network/blockchain/staking",
        permanent: true,
      },
      {
        source: "/move/book/summary",
        destination: "/en/build/smart-contracts/book",
        permanent: true,
      },
      {
        source: "/nodes/validator-node/validators",
        destination: "/en/network/nodes/validator-node",
        permanent: true,
      },
      {
        source: "/standards",
        destination: "/en/build/smart-contracts/aptos-standards",
        permanent: true,
      },
      {
        source: "/category/advanced-builders",
        destination: "/en/build/guides",
        permanent: true,
      },
      {
        source: "/move/compiler_v2",
        destination: "/en/build/smart-contracts/compiler_v2",
        permanent: true,
      },
      {
        source: "/nodes/configure/configure-index",
        destination: "/en/network/nodes/configure",
        permanent: true,
      },
      {
        source: "/en/build/smart-contracts/aptos-standards/fungible-asset",
        destination: "/en/build/smart-contracts/fungible-asset",
        permanent: true,
      },
      {
        source: "/integration/wallet-adapter-concept",
        destination: "/en/build/sdks/wallet-adapter",
        permanent: true,
      },
      {
        source: "/en/build/smart-contracts/aptos-standards/tokens",
        destination: "/en/build/smart-contracts/aptos-token",
        permanent: true,
      },
      {
        source: "/en/build/smart-contracts/aptos-standards/digital-asset",
        destination: "/en/build/smart-contracts/digital-asset",
        permanent: true,
      },
      {
        source: "/concepts/aptos-concepts",
        destination: "/en/build/get-started",
        permanent: true,
      },
      // This guide seems to have been deleted, so redirecting to a similar guide.
      {
        source: "/guides/basics-life-of-txn",
        destination: "/en/network/blockchain/txns-states",
        permanent: true,
      },
      {
        source: "/cli-tools/aptos-cli-tool/aptos-cli-index",
        destination: "/en/build/cli",
        permanent: true,
      },
      {
        source: "/nodes/validator-node/operator/index",
        destination: "/en/network/nodes/validator-node/operator",
        permanent: true,
      },
      {
        source: "/guides/creating-a-signed-transaction",
        destination: "/en/build/sdks/ts-sdk/building-transactions",
        permanent: true,
      },
      {
        source: "/en/build/pdf/aptos.dev-en-build-get-started",
        destination: "/en/build/get-started",
        permanent: true,
      },
      {
        source: "/nodes/nodes-index",
        destination: "/en/network/nodes",
        permanent: true,
      },
      {
        source: "/move/prover/move-prover",
        destination: "/en/build/smart-contracts/prover",
        permanent: true,
      },
      {
        source: "/nodes/full-node/public-fullnode",
        destination: "/en/network/nodes",
        permanent: true,
      },
      {
        source: "/tools/aptos-cli/index",
        destination: "/en/build/cli",
        permanent: true,
      },
      {
        source: "/sdks/new-ts-sdk",
        destination: "/en/build/sdks/ts-sdk",
        permanent: true,
      },
      {
        source: "/en/build/smart-contracts/aptos-standards/aptos-coin",
        destination: "/en/build/smart-contracts/aptos-coin",
        permanent: true,
      },
      {
        source: "/guides/randomness",
        destination: "/en/build/smart-contracts/randomness",
        permanent: true,
      },
      {
        source: "/en/network/nodes/aptos-api-spec",
        destination: "/en/build/apis/fullnode-rest-api-reference",
        permanent: true,
      },
      {
        source: "/sdks/new-ts-sdk/migration-guide",
        destination: "/en/build/sdks/ts-sdk/legacy-ts-sdk/migration-guide",
        permanent: true,
      },
      {
        source: "/en/build/smart-contracts/aptos-standards/aptos-token",
        destination: "/en/build/smart-contracts/aptos-token",
        permanent: true,
      },
      {
        source: "/tools/aptos-cli/use-cli/working-with-move-contracts",
        destination: "/en/build/cli/working-with-move-contracts",
        permanent: true,
      },
      {
        source: "/aptos-white-paper/aptos-white-paper-index",
        destination: "/en/network/blockchain/aptos-white-paper",
        permanent: true,
      },
      {
        source: "/en/build/smart-contracts/object-code-deployment",
        destination: "/en/build/smart-contracts/deployment",
        permanent: true,
      },
      {
        source: "/guides/running-a-local-multi-node-network",
        destination: "/en/build/cli/running-a-local-network",
        permanent: true,
      },
      {
        source: "/move/move-on-aptos/cli",
        destination: "/en/build/cli",
        permanent: true,
      },
      {
        source: "/sdks/new-ts-sdk/transaction-builder",
        destination: "/en/build/sdks/ts-sdk/building-transactions",
        permanent: true,
      },
      {
        source: "/en/build",
        destination: "/en/build/get-started",
        permanent: true,
      },
      {
        source: "/nodes/full-node/fullnode-source-code-or-docker",
        destination: "/en/network/nodes/full-node/deployments",
        permanent: true,
      },
      {
        source: "/en/network/nodes/full-node/fullnode-source-code-or-docker",
        destination: "/en/network/nodes/full-node/deployments",
        permanent: true,
      },
      {
        source: "/reference",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/sdks/ts-sdk/index",
        destination: "/en/build/sdks/ts-sdk",
        permanent: true,
      },
      {
        source: "/tools/aptos-cli/use-cli",
        destination: "/en/build/cli",
        permanent: true,
      },
      {
        source: "/tools/install-cli",
        destination: "/en/build/cli",
        permanent: true,
      },
      {
        source: "/aptos-white-paper",
        destination: "/en/network/blockchain/aptos-white-paper",
        permanent: true,
      },
      {
        source: "/en/build/advanced-guides/keyless-accounts",
        destination: "/en/build/guides/aptos-keyless",
        permanent: true,
      },
      {
        source: "/en/build/guides/nfts/aptos-token-overview",
        destination: "/en/build/smart-contracts/aptos-token",
        permanent: true,
      },
      {
        source: "/en/build/smart-contracts/object/configuring-objects",
        destination: "/en/build/smart-contracts/object",
        permanent: true,
      },
      {
        source: "/guides/getting-started",
        destination: "/en/build/get-started",
        permanent: true,
      },
      {
        source: "/tools/aptos-cli/use-cli/cli-genesis",
        destination: "/en/build/cli",
        permanent: true,
      },
      {
        source: "/tutorials/programmatic-upgradeable-module",
        destination: "/en/build/smart-contracts/book/package-upgrades",
        permanent: true,
      },
      {
        source: "/cli-tools/aptos-cli-tool/install-aptos-cli",
        destination: "/en/build/cli",
        permanent: true,
      },
      {
        source: "/community",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/concepts/keyless",
        destination: "/en/build/guides/aptos-keyless",
        permanent: true,
      },
      {
        source: "/guides/nfts/mint-nft-cli",
        destination: "/en/build/guides/your-first-nft",
        permanent: true,
      },
      {
        source: "/integration/creating-a-signed-transaction",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/move/book",
        destination: "/en/build/smart-contracts/book",
        permanent: true,
      },
      {
        source: "/nodes",
        destination: "/en/network/nodes",
        permanent: true,
      },
      {
        source: "/nodes/deployments",
        destination: "/en/network/nodes/full-node/deployments",
        permanent: true,
      },
      {
        source: "/tools/aptos-cli/use-cli/use-aptos-cli",
        destination: "/en/build/cli",
        permanent: true,
      },
      {
        source: "/tutorials/aptos-quickstarts",
        destination: "/en/build/get-started",
        permanent: true,
      },
      {
        source: "/build/smart-contracts/aptos-standards/aptos-coin",
        destination: "/en/build/smart-contracts/aptos-coin",
        permanent: true,
      },
      {
        source: "/community/external-resources",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/concepts/coin-and-token/aptos-coin",
        destination: "/en/build/smart-contracts/aptos-coin",
        permanent: true,
      },
      // create-aptos-dapp routes. Template routes should point to Aptos Learn
      {
        source: "/create-aptos-dapp/index",
        destination: "/en/build/create-aptos-dapp",
        permanent: true,
      },
      {
        source: "/create-aptos-dapp/templates",
        destination: "https://learn.aptoslabs.com/en/dapp-templates",
        permanent: true,
      },
      {
        source: "/en/build/create-aptos-dapp/templates/boilerplate",
        destination:
          "https://learn.aptoslabs.com/en/dapp-templates/boilerplate-template",
        permanent: true,
      },
      {
        source: "/en/build/create-aptos-dapp/templates/nft-minting-dapp",
        destination:
          "https://learn.aptoslabs.com/en/dapp-templates/nft-minting-template",
        permanent: true,
      },
      {
        source: "/en/build/create-aptos-dapp/templates/token-minting-dapp",
        destination:
          "https://learn.aptoslabs.com/en/dapp-templates/token-minting-template",
        permanent: true,
      },
      {
        source: "/en/build/create-aptos-dapp/templates/token-staking-dapp",
        destination:
          "https://learn.aptoslabs.com/en/dapp-templates/token-staking-template",
        permanent: true,
      },
      {
        source: "/en/build/create-aptos-dapp/templates/custom-indexer",
        destination:
          "https://learn.aptoslabs.com/en/dapp-templates/custom-indexer-template",
        permanent: true,
      },
      // Old templates redirects
      {
        source: "/create-aptos-dapp/templates/digital-asset",
        destination:
          "https://learn.aptoslabs.com/en/dapp-templates/nft-minting-template",
        permanent: true,
      },
      {
        source: "/en/build/create-aptos-dapp/templates/digital-asset",
        destination:
          "https://learn.aptoslabs.com/en/dapp-templates/nft-minting-template",
        permanent: true,
      },
      {
        source: "/create-aptos-dapp/templates/fungible-asset",
        destination:
          "https://learn.aptoslabs.com/en/dapp-templates/token-minting-template",
        permanent: true,
      },
      {
        source: "/docs/tutorials/functions",
        destination: "/en/build/smart-contracts/book/functions",
        permanent: true,
      },
      {
        source: "/en/build/sdks/sdks/wallet-adapter",
        destination: "/en/build/sdks/wallet-adapter",
        permanent: true,
      },
      {
        source: "/en/build/system-integrators-guide",
        destination: "/en/build/guides/system-integrators-guide",
        permanent: true,
      },
      {
        source: "/en/move/book/modules-and-scripts",
        destination: "/en/build/smart-contracts/book/modules-and-scripts",
        permanent: true,
      },
      {
        source: "/guides",
        destination: "/en/build/guides",
        permanent: true,
      },
      {
        source: "/guides/building-wallet-extension",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/guides/indexing",
        destination: "/en/build/indexer",
        permanent: true,
      },
      {
        source: "/guides/install-petra-wallet-extension",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/guides/nfts",
        destination: "/en/build/guides/your-first-nft",
        permanent: true,
      },
      {
        source: "/guides/resource-accounts",
        destination: "/en/build/smart-contracts/resource-accounts",
        permanent: true,
      },
      {
        source: "/guides/wallet-standard",
        destination: "/en/build/sdks/wallet-adapter/wallet-standards",
        permanent: true,
      },
      {
        source: "/indexer",
        destination: "/en/build/indexer",
        permanent: true,
      },
      {
        source: "/indexer/legacy",
        destination: "/en/build/indexer/legacy",
        permanent: true,
      },
      {
        source: "/indexer/nft-aggregator",
        destination: "/en/build/indexer/nft-aggregator",
        permanent: true,
      },
      {
        source: "/indexer/txn-stream",
        destination: "/en/build/indexer/txn-stream",
        permanent: true,
      },
      {
        source: "/indexer/nft-aggregator/marketplaces",
        destination: "/en/build/indexer/nft-aggregator/marketplaces",
        permanent: true,
      },
      {
        source: "/indexer/nft-aggregator/marketplaces/bluemove",
        destination: "/en/build/indexer/nft-aggregator/marketplaces/bluemove",
        permanent: true,
      },
      {
        source: "/indexer/nft-aggregator/marketplaces/tradeport",
        destination: "/en/build/indexer/nft-aggregator/marketplaces/tradeport",
        permanent: true,
      },
      {
        source: "/indexer/nft-aggregator/marketplaces/topaz",
        destination: "/en/build/indexer/nft-aggregator/marketplaces/topaz",
        permanent: true,
      },
      {
        source: "/indexer/nft-aggregator/marketplaces/rarible",
        destination: "/en/build/indexer/nft-aggregator/marketplaces/rarible",
        permanent: true,
      },
      {
        source: "/indexer/nft-aggregator/marketplaces/wapal",
        destination: "/en/build/indexer/nft-aggregator/marketplaces/wapal",
        permanent: true,
      },
      {
        source: "/integration/wallet-adapter-concept",
        destination: "/en/build/sdks/wallet-adapter",
        permanent: true,
      },
      {
        source: "/integration/wallet-adapter-concept",
        destination: "/en/build/sdks/wallet-adapter",
        permanent: true,
      },
      {
        source: "/move",
        destination: "/en/build/smart-contracts",
        permanent: true,
      },
      {
        source: "/en/build/indexer/api",
        destination: "/en/build/indexer/aptos-hosted",
        permanent: true,
      },
      {
        source: "/en/build/indexer/api/labs-hosted",
        destination: "/en/build/indexer/aptos-hosted",
        permanent: true,
      },
      {
        source: "/en/build/indexer/api/self-hosted",
        destination: "/en/build/indexer/self-hosted",
        permanent: true,
      },
      {
        source: "/en/build/indexer/txn-stream/labs-hosted",
        destination: "/en/build/indexer/txn-stream/aptos-hosted-txn-stream",
        permanent: true,
      },
      {
        source: "/en/build/indexer/coin-balances",
        destination: "/en/build/indexer/fungible-asset-balances",
        permanent: true,
      },
      {
        source: "/en/build/indexer/coin-info",
        destination: "/en/build/indexer/fungible-asset-info",
        permanent: true,
      },
      /* Redirect community swift SDK */
      {
        source: "/en/build/sdks/swift-sdk",
        destination: "/en/build/sdks/community-sdks/swift-sdk",
        permanent: false,
      },
      {
        source: "/en/build/sdks/ts-sdk/legacy-ts-sdk/sdk-client-layer",
        destination: "/en/build/sdks/ts-sdk/legacy-ts-sdk/migration-guide",
        permanent: true,
      },
      {
        source:
          "/en/build/sdks/ts-sdk/legacy-ts-sdk/sdk-client-layer/aptos-client",
        destination: "/en/build/sdks/ts-sdk/legacy-ts-sdk/migration-guide",
        permanent: true,
      },
      {
        source:
          "/en/build/sdks/ts-sdk/legacy-ts-sdk/sdk-client-layer/indexer-client",
        destination: "/en/build/sdks/ts-sdk/legacy-ts-sdk/migration-guide",
        permanent: true,
      },
      {
        source: "/en/build/sdks/ts-sdk/legacy-ts-sdk/sdk-core-layer",
        destination: "/en/build/sdks/ts-sdk/legacy-ts-sdk/migration-guide",
        permanent: true,
      },
      {
        source: "/en/build/sdks/ts-sdk/legacy-ts-sdk/sdk-plugins-layer",
        destination: "/en/build/sdks/ts-sdk/legacy-ts-sdk/migration-guide",
        permanent: true,
      },
      {
        source: "/en/build/sdks/ts-sdk/legacy-ts-sdk/sdk-tests",
        destination: "/en/build/sdks/ts-sdk/legacy-ts-sdk/migration-guide",
        permanent: true,
      },
      {
        source: "/en/build/sdks/ts-sdk/legacy-ts-sdk/typescript-sdk-overview",
        destination: "/en/build/sdks/ts-sdk/legacy-ts-sdk/migration-guide",
        permanent: true,
      },
      /* Redirect community Kotlin SDK */
      {
        source: "/en/build/sdks/kotlin-sdk",
        destination: "/en/build/sdks/community-sdks/kotlin-sdk",
        permanent: false,
      },
      {
        source: "/en/build/smart-contracts/book/move-2.0",
        destination: "/en/build/smart-contracts/book/move-2",
        permanent: true,
      },
      {
        source: "/network/faucet",
        destination: "/en/network/faucet",
        permanent: true,
      },
      {
        source: "/en/build/smart-contracts/smart-table",
        destination: "/en/build/smart-contracts/maps",
        permanent: true,
      },
    ],
  }),
);
