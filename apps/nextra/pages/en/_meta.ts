export default {
  index: {
    title: "Introduction",
    type: "page",
    display: "hidden",
    theme: {
      layout: "raw",
      footer: null,
    },
  },
  build: {
    type: "menu",
    title: "Build",
    items: {
      "get-started": {
        title: "Get Started",
      },
      "smart-contracts": {
        title: "Smart Contracts (Move)",
      },
      apis: {
        title: "APIs",
      },
      sdks: {
        title: "SDKs",
      },
      indexer: {
        title: "Indexer",
      },
      cli: {
        title: "CLI",
      },
      "create-aptos-dapp": {
        title: "create-aptos-dapp",
      },
      guides: {
        title: "Guides",
      },
    },
  },
  network: {
    type: "menu",
    title: "Network",
    items: {
      blockchain: {
        title: "Blockchain",
      },
      nodes: {
        title: "Nodes",
      },
      releases: {
        title: "Releases",
      },
      glossary: {
        title: "Glossary",
      },
    },
  },
  "developer-platforms": {
    type: "menu",
    title: "Additional Resources",
    items: {
      learn: {
        type: "page",
        title: "Aptos Learn ↗",
        href: "https://learn.aptoslabs.com/",
        newWindow: true,
      },
      forum: {
        title: "Community Forum ↗",
        href: "https://forum.aptosfoundation.org/",
        newWindow: true,
        type: "page",
      },
      discussions: {
        title: "Developer Discussions ↗",
        href: "https://github.com/aptos-labs/aptos-developer-discussions/discussions",
        newWindow: true,
        type: "page",
      },
      api_gateway: {
        title: "API Gateway ↗",
        href: "https://developers.aptoslabs.com/",
        newWindow: true,
        type: "page",
      },
      aptos_foundation: {
        title: "Aptos Foundation ↗",
        href: "https://aptosfoundation.org/",
        newWindow: true,
        type: "page",
      },
      contribute: {
        title: "Contribute",
        type: "page",
      },
    },
  },
};
