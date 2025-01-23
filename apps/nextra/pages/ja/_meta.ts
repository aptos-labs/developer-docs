export default {
  index: {
    title: "はじめに",
    type: "page",
    display: "hidden",
    theme: {
      layout: "raw",
      footer: null,
    },
  },
  build: {
    type: "menu",
    title: "開発",
    items: {
      "get-started": {
        title: "スタートガイド",
      },
      "smart-contracts": {
        title: "スマートコントラクト (Move)",
      },
      apis: {
        title: "API",
      },
      sdks: {
        title: "SDK",
      },
      indexer: {
        title: "インデクサー",
      },
      cli: {
        title: "CLI",
      },
      "create-aptos-dapp": {
        title: "create-aptos-dapp",
      },
      guides: {
        title: "ガイド",
      },
    },
  },
  network: {
    type: "menu",
    title: "ネットワーク",
    items: {
      blockchain: {
        title: "ブロックチェーン",
      },
      nodes: {
        title: "ノード",
      },
      releases: {
        title: "リリース",
      },
      glossary: {
        title: "用語集",
      },
      faucet: {
        title: "フォーセット",
      },
    },
  },
  "developer-platforms": {
    type: "menu",
    title: "その他のリソース",
    items: {
      learn: {
        type: "page",
        title: "Aptos Learn ↗",
        href: "https://learn.aptoslabs.com/",
        newWindow: true,
      },
      forum: {
        title: "コミュニティフォーラム ↗",
        href: "https://forum.aptosfoundation.org/",
        newWindow: true,
        type: "page",
      },
      discussions: {
        title: "開発者ディスカッション ↗",
        href: "https://github.com/aptos-labs/aptos-developer-discussions/discussions",
        newWindow: true,
        type: "page",
      },
      api_gateway: {
        title: "APIゲートウェイ ↗",
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
        title: "貢献する",
        type: "page",
      },
    },
  },
};
