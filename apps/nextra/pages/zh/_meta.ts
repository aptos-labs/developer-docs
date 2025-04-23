export default {
  index: {
    title: "介绍",
    type: "page",
    display: "hidden",
    theme: {
      layout: "raw",
      footer: null,
    },
  },
  build: {
    type: "menu",
    title: "构建",
    items: {
      "get-started": {
        title: "开始使用",
      },
      "smart-contracts": {
        title: "智能合约 (Move)",
      },
      apis: {
        title: "API",
      },
      sdks: {
        title: "SDK",
      },
      indexer: {
        title: "索引器",
      },
      cli: {
        title: "命令行工具",
      },
      "create-aptos-dapp": {
        title: "create-aptos-dapp",
      },
      guides: {
        title: "指南",
      },
    },
  },
  network: {
    type: "menu",
    title: "网络",
    items: {
      nodes: {
        title: "节点",
      },
    },
  },
  "developer-platforms": {
    type: "menu",
    title: "更多资源",
    items: {
      learn: {
        type: "page",
        title: "Aptos 学习 ↗",
        href: "https://learn.aptoslabs.com/",
        newWindow: true,
      },
      forum: {
        title: "社区论坛 ↗",
        href: "https://forum.aptosfoundation.org/",
        newWindow: true,
        type: "page",
      },
      discussions: {
        title: "开发者讨论 ↗",
        href: "https://github.com/aptos-labs/aptos-developer-discussions/discussions",
        newWindow: true,
        type: "page",
      },
      aptos_build: {
        title: "Aptos Build ↗",
        href: "https://build.aptoslabs.com/",
        newWindow: true,
        type: "page",
      },
      aptos_foundation: {
        title: "Aptos 基金会 ↗",
        href: "https://aptosfoundation.org/",
        newWindow: true,
        type: "page",
      },
      contribute: {
        title: "贡献",
        type: "page",
      },
    },
  },
};
