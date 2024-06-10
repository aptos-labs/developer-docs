// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import { themes } from "prism-react-renderer";
import { EnumChangefreq } from "sitemap";
import { ProvidePlugin } from "webpack";
// KaTeX plugin stuff
import math from "remark-math";
import katex from "rehype-katex";
import postcssPreset from "postcss-preset-env";
import codeInjector from "./src/remark/code-injector";

const preset: Preset.Options = {
  docs: {
    routeBasePath: "/",
    sidebarPath: require.resolve("./src/components/sidebars.ts"),
    sidebarCollapsible: false,
    editUrl:
      "https://github.com/aptos-labs/developer-docs/edit/main/apps/docusaurus",
    remarkPlugins: [codeInjector, math],
    path: "docs",
    rehypePlugins: [katex],
    showLastUpdateTime: true,
  },
  sitemap: {
    changefreq: EnumChangefreq.DAILY,
    priority: 0.5,
    ignorePatterns: ["/tags/**"],
    filename: "sitemap.xml",
  },
  blog: false,
  theme: {
    customCss: require.resolve("./src/css/custom.css"),
  },
  gtag: {
    trackingID: "G-HVB7QFB9PQ",
  },
};

const themeConfig: Preset.ThemeConfig = {
  image: "img/meta/og-aptos-docs-default.png",
  colorMode: {
    defaultMode: "dark",
  },
  docs: {
    sidebar: {
      autoCollapseCategories: true,
      hideable: true,
    },
  },
  announcementBar: {
    id: "preview",
    content:
      '🎉 We are revamping our docs! <a target="_blank" rel="noopener noreferrer" href="https://preview.aptos.dev">See the preview of the new docs at preview.aptos.dev</a>',
    backgroundColor: "#fafbfc",
    textColor: "#091E42",
    isCloseable: false,
  },
  head: [
    {
      tagName: "script",
      attributes: {
        type: "text/javascript",
      },
      innerHTML: `
        (function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:3916091,hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      `,
    },
  ],
  navbar: {
    logo: {
      alt: "Aptos Labs Logo",
      src: "img/aptos_word.svg",
      srcDark: "img/aptos_word_dark.svg",
    },
    items: [
      {
        href: "https://learn.aptoslabs.com/",
        label: "Learn",
        position: "right",
      },
      {
        href: "https://github.com/aptos-labs/aptos-developer-discussions/discussions",
        label: "Dev Discussions",
        position: "right",
      },
      {
        type: "dropdown",
        label: "Start",
        to: "aptos-white-paper",
        position: "left",
        items: [
          {
            label: "Learn about Aptos",
            to: "concepts",
          },
          {
            label: "Explore Aptos",
            to: "guides/explore-aptos",
          },
          {
            label: "Latest Releases",
            to: "releases/aptos-releases",
          },
          {
            label: "Networks",
            to: "nodes/networks",
          },
          {
            label: "Read the Aptos White Paper",
            to: "aptos-white-paper",
            activeBaseRegex: "^/aptos-white-paper$|^/aptos-white-paper$",
          },
        ],
      },
      {
        type: "dropdown",
        label: "Build",
        to: "tutorials",
        position: "left",
        items: [
          {
            label: "Tutorials",
            to: "tutorials",
            activeBaseRegex: "^/tutorials$|^/tutorials$",
          },
          {
            label: "Learn the Move Language",
            to: "move/move-on-aptos",
          },
          {
            label: "Aptos Standards",
            to: "standards",
          },
          {
            label: "Aptos APIs",
            to: "apis",
          },
          {
            label: "Aptos SDKs",
            to: "/sdks/index",
          },
          {
            label: "Aptos CLI",
            to: "/tools/aptos-cli",
          },
          {
            label: "Integrate with Aptos",
            to: "integration",
          },
          {
            label: "Build E2E Dapp on Aptos",
            to: "tutorials/build-e2e-dapp/e2e-dapp-index",
          },
        ],
      },
      {
        type: "dropdown",
        label: "Nodes",
        to: "nodes/nodes-landing",
        position: "left",
        items: [
          {
            label: "Learn about Nodes",
            to: "nodes/nodes-landing",
          },
          {
            label: "Run a Validator and VFN",
            to: "nodes/validator-node/validators",
          },
          {
            label: "Run a Public Fullnode",
            to: "nodes/full-node/public-fullnode",
          },
          {
            label: "Bootstrap a Node",
            to: "nodes/operations/operations-index",
          },
          {
            label: "Configure a Node",
            to: "nodes/configure/configure-index",
          },
          {
            label: "Monitor a Node",
            to: "nodes/measure/measure-index",
          },
        ],
      },
      {
        type: "dropdown",
        label: "Reference",
        to: "nodes/aptos-api-spec",
        position: "left",
        items: [
          {
            label: "Aptos REST API Spec",
            to: "nodes/aptos-api-spec",
          },
          {
            label: "Aptos Errors Codes",
            to: "reference/error-codes",
          },
          {
            label: "Aptos Move Framework",
            to: "reference/move",
          },
          {
            label: "Aptos Glossary",
            to: "reference/glossary",
          },
        ],
      },
      {
        type: "dropdown",
        label: "Community",
        to: "community",
        position: "left",
        items: [
          {
            label: "Help the Aptos Ecosystem",
            to: "community",
            activeBaseRegex: "^/community$|^/community$",
          },
          {
            label: "External Resources",
            to: "community/external-resources",
          },
          {
            label: "Update Aptos.dev",
            to: "community/site-updates",
          },
          {
            label: "Follow Aptos Style",
            to: "community/aptos-style",
          },
          {
            label: "Contributors",
            to: "community/contributors",
          },
        ],
      },
    ],
  },
  footer: {
    links: [
      {
        title: null,
        items: [
          {
            html: `
                <div class="footer-left">
                  <a class="footer-logo" href="https://aptosfoundation.org" target="_blank" rel="noopener noreferrer" title="Aptos Foundation">
                    <svg width="100%" height="100%" version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112 112" overflow="visible" xml:space="preserve"><path fill="currentColor" d="M86.6 37.4h-9.9c-1.1 0-2.2-.5-3-1.3l-4-4.5c-1.2-1.3-3.1-1.4-4.5-.3l-.3.3-3.4 3.9c-1.1 1.3-2.8 2-4.5 2H2.9C1.4 41.9.4 46.6 0 51.3h51.2c.9 0 1.8-.4 2.4-1l4.8-5c.6-.6 1.4-1 2.3-1h.2c.9 0 1.8.4 2.4 1.1l4 4.5c.8.9 1.9 1.4 3 1.4H112c-.4-4.7-1.4-9.4-2.9-13.8H86.6zM53.8 65l-4-4.5c-1.2-1.3-3.1-1.4-4.5-.3l-.3.3-3.5 3.9c-1.1 1.3-2.7 2-4.4 2H.8c.9 4.8 2.5 9.5 4.6 14h25.5c.9 0 1.7-.4 2.4-1l4.8-5c.6-.6 1.4-1 2.3-1h.2c.9 0 1.8.4 2.4 1.1l4 4.5c.8.9 1.9 1.4 3 1.4h56.6c2.1-4.4 3.7-9.1 4.6-14H56.8c-1.2 0-2.3-.5-3-1.4zm19.6-43.6 4.8-5c.6-.6 1.4-1 2.3-1h.2c.9 0 1.8.4 2.4 1l4 4.5c.8.9 1.9 1.3 3 1.3h10.8c-18.8-24.8-54.1-29.7-79-11-4.1 3.1-7.8 6.8-11 11H71c1 .2 1.8-.2 2.4-.8zM34.7 94.2c-1.2 0-2.3-.5-3-1.3l-4-4.5c-1.2-1.3-3.2-1.4-4.5-.2l-.2.2-3.5 3.9c-1.1 1.3-2.7 2-4.4 2h-.2C36 116.9 71.7 118 94.4 96.7c.9-.8 1.7-1.7 2.6-2.6H34.7z"/></svg>
                  </a>
                  <div class="copyright">
                    <p class="copyright-text">© ${new Date().getFullYear()} Aptos Foundation</p>
                    <div class="copyright-links">
                      <a href="https://aptosfoundation.org/privacy" target="_blank">Privacy</a>
                      <a href="https://aptosfoundation.org/terms" target="_blank">Terms</a></div>
                  </div>
                </div>
                `,
          },
        ],
      },
      {
        title: null,
        items: [
          {
            html: `
                  <p class="right">
                    <nav class="social-links">
                        <a class="social-link" href="https://github.com/aptos-labs/developer-docs" target="_blank" rel="noopener noreferrer" title="Github">
                         <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 0C4.47514 0 0 4.47514 0 10C0 14.4199 2.86679 18.1645 6.83855 19.4905C7.33579 19.5826 7.51995 19.2756 7.51995 19.0055C7.51995 18.7661 7.51381 18.14 7.50767 17.3051C4.72683 17.9067 4.13751 15.9668 4.13751 15.9668C3.68324 14.8128 3.0264 14.5058 3.0264 14.5058C2.11786 13.8858 3.09392 13.8981 3.09392 13.8981C4.09454 13.9718 4.62861 14.9294 4.62861 14.9294C5.51872 16.4579 6.96746 16.016 7.53837 15.7581C7.63045 15.1136 7.88827 14.6716 8.17066 14.4199C5.94843 14.1682 3.61571 13.3088 3.61571 9.47821C3.61571 8.38551 4.00246 7.4954 4.64702 6.79558C4.54266 6.54389 4.19889 5.52486 4.74524 4.14978C4.74524 4.14978 5.58625 3.87968 7.4954 5.17495C8.29343 4.95396 9.14672 4.84346 10 4.83732C10.8471 4.83732 11.7066 4.95396 12.5046 5.17495C14.4137 3.87968 15.2548 4.14978 15.2548 4.14978C15.8011 5.52486 15.4573 6.54389 15.353 6.79558C15.9914 7.4954 16.3781 8.38551 16.3781 9.47821C16.3781 13.3211 14.0393 14.1621 11.8109 14.4137C12.167 14.7207 12.4923 15.3346 12.4923 16.2676C12.4923 17.6059 12.48 18.6802 12.48 19.0117C12.48 19.2818 12.6581 19.5887 13.1676 19.4905C17.1393 18.1645 20 14.4199 20 10.0061C20 4.47514 15.5249 0 10 0Z" fill="currentColor"/></svg>
                        </a>
                        <a class="social-link" href="https://discord.gg/aptosnetwork" target="_blank" rel="noopener noreferrer" title="Discord">
                          <svg width="100%" height="100%" viewBox="0 0 71 55" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#a)"><path d="M60.105 4.898A58.55 58.55 0 0 0 45.653.415a.22.22 0 0 0-.233.11 40.784 40.784 0 0 0-1.8 3.697c-5.456-.817-10.886-.817-16.23 0-.485-1.164-1.201-2.587-1.828-3.697a.228.228 0 0 0-.233-.11 58.386 58.386 0 0 0-14.451 4.483.207.207 0 0 0-.095.082C1.578 18.73-.944 32.144.293 45.39a.244.244 0 0 0 .093.167c6.073 4.46 11.955 7.167 17.729 8.962a.23.23 0 0 0 .249-.082 42.08 42.08 0 0 0 3.627-5.9.225.225 0 0 0-.123-.312 38.772 38.772 0 0 1-5.539-2.64.228.228 0 0 1-.022-.378 31.17 31.17 0 0 0 1.1-.862.22.22 0 0 1 .23-.03c11.619 5.304 24.198 5.304 35.68 0a.219.219 0 0 1 .233.027c.356.293.728.586 1.103.865a.228.228 0 0 1-.02.378 36.384 36.384 0 0 1-5.54 2.637.227.227 0 0 0-.121.315 47.249 47.249 0 0 0 3.624 5.897.225.225 0 0 0 .249.084c5.801-1.794 11.684-4.502 17.757-8.961a.228.228 0 0 0 .092-.164c1.48-15.315-2.48-28.618-10.497-40.412a.18.18 0 0 0-.093-.084Zm-36.38 32.427c-3.497 0-6.38-3.211-6.38-7.156 0-3.944 2.827-7.156 6.38-7.156 3.583 0 6.438 3.24 6.382 7.156 0 3.945-2.827 7.156-6.381 7.156Zm23.593 0c-3.498 0-6.38-3.211-6.38-7.156 0-3.944 2.826-7.156 6.38-7.156 3.582 0 6.437 3.24 6.38 7.156 0 3.945-2.798 7.156-6.38 7.156Z" fill="currentColor"/></g><defs><clipPath id="a"><path fill="currentColor" d="M0 0h71v55H0z"/></clipPath></defs></svg>
                        </a>
                        <a class="social-link" href="https://twitter.com/Aptos" target="_blank" rel="noopener noreferrer" title="Twitter">
                          <svg width="100%" height="100%" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M22 2.013a9.395 9.395 0 0 1-2.593.676A4.348 4.348 0 0 0 21.392.314a9.341 9.341 0 0 1-2.866 1.042A4.62 4.62 0 0 0 15.232 0c-2.493 0-4.514 1.922-4.514 4.292 0 .336.04.664.117.978C7.083 5.09 3.758 3.382 1.532.786A4.115 4.115 0 0 0 .92 2.944c0 1.489.796 2.802 2.007 3.571A4.669 4.669 0 0 1 .884 5.98v.053c0 2.08 1.555 3.815 3.62 4.209a4.744 4.744 0 0 1-2.038.074c.574 1.705 2.241 2.945 4.216 2.98a9.358 9.358 0 0 1-5.605 1.837c-.365 0-.724-.02-1.077-.06A13.257 13.257 0 0 0 6.918 17c8.303 0 12.843-6.54 12.843-12.21 0-.187-.004-.372-.013-.556A8.929 8.929 0 0 0 22 2.013Z" fill="currentColor"/></svg>
                        </a>
                    </nav>
                  </p>
              `,
          },
        ],
      },
    ],
  },
  prism: {
    theme: themes.github,
    darkTheme: themes.dracula,
    additionalLanguages: ["rust", "python"],
  },
  algolia: {
    appId: "HM7UY0NMLG",
    apiKey: "9e564585ae0eeac4f41758c47c24d27f",
    indexName: "aptos",
    contextualSearch: true,
  },
};

const config: Config = {
  title: "Aptos Docs",
  tagline: "Developer Documentation",
  url: "https://aptos.dev",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenAnchors: "warn",
  onDuplicateRoutes: "warn",
  onBrokenMarkdownLinks: "throw",
  favicon: "img/favicon.ico",
  organizationName: "aptos-labs", // Usually your GitHub org/user name.
  projectName: "aptos-core", // Usually your repo name.
  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],
  presets: [["@docusaurus/preset-classic", preset]],
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
    {
      href: "https://unpkg.com/@stoplight/elements@7.7.5/styles.min.css",
      type: "text/css",
      integrity:
        "sha384-1lLf7J28IOR7k5RlItk6Y+G3hDgVB3y4RCgWNq6ZSwjYfvJXPtZAdW0uklsAZbGW",
      crossorigin: "anonymous",
    },
  ],

  themeConfig,
  plugins: [
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            from: "/category/nft",
            to: "/guides/nfts/aptos-token-overview",
          },
          {
            from: "/guides/nfts/mint-nft-cli",
            to: "/guides/nfts/aptos-token-overview",
          },
          {
            from: "/guides/nfts/mint-onchain-data",
            to: "/guides/nfts/aptos-token-overview",
          },
          {
            from: "/releases/cli-release",
            to: "/tools/aptos-cli/install-cli",
          },
          {
            from: "/releases/sdk-release",
            to: "/sdks/index",
          },
          {
            from: "/integration/indexing",
            to: "/indexer/indexer-landing",
          },
          {
            from: "/nodes/indexer-fullnode",
            to: "/indexer/indexer-landing",
          },
          {
            from: "/aptos-white-paper/aptos-white-paper-index/",
            to: "/aptos-white-paper",
          },
          {
            from: "/nodes/local-testnet/run-a-local-testnet",
            to: "/nodes/localnet/run-a-localnet",
          },
          {
            from: "/nodes/local-testnet/local-testnet-index",
            to: "/nodes/localnet",
          },
          {
            from: "/guides/localnet-dev-flow",
            to: "/tools/aptos-cli/use-cli/running-a-local-network",
          },
          {
            from: "/nodes/localnet/using-cli-to-run-a-local-testnet",
            to: "/tools/aptos-cli/use-cli/running-a-local-network",
          },
          {
            from: "/nodes/localnet/using-cli-to-run-a-localnet",
            to: "/tools/aptos-cli/use-cli/running-a-local-network",
          },
          {
            from: "/guides/getting-started",
            to: "/guides/system-integrators-guide",
          },
          {
            from: "/basics/basics-accounts/",
            to: "/concepts/accounts",
          },
          {
            from: "/guides/move-guides/aptos-move-guides",
            to: "/move/move-on-aptos",
          },
          {
            from: "/tools/install-cli",
            to: "/tools/aptos-cli/install-cli",
          },
          {
            from: "/integration/handle-aptos-errors",
            to: "/reference/error-codes",
          },
          {
            from: "/integration/aptos-api",
            to: "/apis/fullnode-rest-api",
          },
          {
            from: "/nodes/deployments",
            to: "/nodes/networks",
          },
          {
            from: "/sdks/new-ts-sdk",
            to: "/sdks/ts-sdk",
          },
          {
            from: "/sdks/new-ts-sdk/account",
            to: "/sdks/ts-sdk/account",
          },
          {
            from: "/sdks/new-ts-sdk/fetch-data-from-chain",
            to: "/sdks/ts-sdk/fetch-data-from-chain",
          },
          {
            from: "/sdks/new-ts-sdk/http-client",
            to: "/sdks/ts-sdk/http-client",
          },
          {
            from: "/sdks/new-ts-sdk/migration-guide",
            to: "/sdks/ts-sdk/migration-guide",
          },
          {
            from: "/sdks/new-ts-sdk/move-types",
            to: "/sdks/ts-sdk/move-types",
          },
          {
            from: "/sdks/new-ts-sdk/sdk-configuration",
            to: "/sdks/ts-sdk/sdk-configuration",
          },
          {
            from: "/sdks/new-ts-sdk/transaction-builder",
            to: "/sdks/ts-sdk/transaction-builder",
          },
          {
            from: "/sdks/new-ts-sdk/typescript",
            to: "/sdks/ts-sdk/typescript",
          },
          {
            from: "/move/move-on-aptos/move-scripts",
            to: "/move/move-on-aptos/scripts/script-tutorial",
          },
          // CLI Docs Rewrite April 2024
          {
            from: "/tools/aptos-cli/install-cli/install-from-brew",
            to: "/tools/aptos-cli/install-cli/install-cli-mac",
          },
          {
            from: "/tools/aptos-cli/install-cli/automated-install",
            to: "/tools/aptos-cli",
          },
          {
            from: "/tools/aptos-cli/install-cli/download-cli-binaries",
            to: "/tools/aptos-cli",
          },
          {
            from: "/tools/aptos-cli/install-cli/build-from-source",
            to: "/tools/aptos-cli/install-cli/install-cli-specific-version",
          },
          {
            from: "/tools/aptos-cli/use-cli/use-aptos-cli",
            to: "/tools/aptos-cli/use-cli",
          },
          {
            from: "/guides/local-development-network",
            to: "/tools/aptos-cli/use-cli/running-a-local-network",
          },
          {
            from: "/tools/aptos-cli/use-cli/cli-account",
            to: "/tools/aptos-cli/cli-configuration",
          },
          {
            from: "/tools/aptos-cli/use-cli/cli-key",
            to: "/tools/aptos-cli/use-cli/on-chain/create-test-accounts",
          },
          {
            from: "/tools/aptos-cli/use-cli/cli-node",
            to: "/tools/aptos-cli/use-cli/managing-a-network-node",
          },
          {
            from: "/move/move-on-aptos/cli",
            to: "/tools/aptos-cli/use-cli/working-with-move-contracts",
          },
          {
            from: "/tools/aptos-cli/use-cli/cli-genesis",
            to: "/tools/aptos-cli/use-cli/public-network/run-public-network",
          },
          {
            from: "/tools/aptos-cli/use-cli/cli-configuration",
            to: "/tools/aptos-cli/cli-configuration",
          },
          {
            from: "/guides/keyless-accounts",
            to: "/aptos-keyless/integration-guide",
          },
        ],
        // Create redirects for all the move pages
        createRedirects(existingPath) {
          if (existingPath.includes("/move")) {
            const paths = [];

            // This is to ensure that we don't push redirects to itself
            const provePath = existingPath.replace(
              "/move/prover",
              "/guides/prover-guides",
            );
            if (provePath !== existingPath) {
              paths.push(provePath);
            }

            const movePath = existingPath.replace(
              "/move",
              "/guides/move-guides",
            );
            if (movePath !== existingPath) {
              paths.push(movePath);
            }

            if (paths.length > 0) {
              return paths;
            }
          }
          return undefined;
        },
      },
    ],
    () => ({
      name: "custom-webpack-config",
      configureWebpack: () => {
        return {
          module: {
            rules: [
              {
                test: /\.m?js/,
                resolve: {
                  fullySpecified: false,
                },
              },
            ],
          },
          plugins: [
            new ProvidePlugin({
              process: require.resolve("process/browser"),
            }),
          ],
          resolve: {
            fallback: {
              buffer: require.resolve("buffer"),
              stream: false,
              path: false,
              process: false,
            },
          },
        };
      },
    }),
    () => ({
      name: "new-css-syntax",
      configurePostCss(options) {
        options.plugins.push(postcssPreset); // allow newest CSS syntax
        return options;
      },
    }),
  ],
};

module.exports = config;
