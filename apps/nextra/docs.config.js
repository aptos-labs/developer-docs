/* eslint-disable no-undef */
// Unfortunately making this a .ts file is not easily doable atm
// TODO: revisit this if time allows
export const i18nConfig = Object.freeze({
  en: {
    locale: "en",
    name: "English",
    direction: "ltr",
    title: "Aptos Docs",
    editText: "Edit this page on GitHub →",
    feedbackText: "Question? Give us feedback →",
    footerLinkText: "https://vercel.com/?utm_source=swr",
    footerLinkElement: undefined,
    searchPlaceholderText: "Search documentation",
    searchLoadingText: "Loading...",
    searchEmptyText: "No results found.",
    searchErrorText: "Failed to load search index.",
    lastUpdatedOn: "Last updated on",

    // Landing Page
    headline: "Build the Future of Web3 on Aptos",
    subHeading:
      "Everything you need to build the best-in-class Web3 developer experience.",
    quickStartBtnLabel: "Quick Start",
    learnBtnLabel: "Learn",
    moveSectionHeadline:
      "Craft safe and high-performance smart contracts with Move",
    moveExamplesHeadline: "Get started with these Move examples",
    coinsExampleLabel: "Coins",
    coinsExampleDescription: "Simple, type-safe, and fungible assets",
    objectsExampleLabel: "Objects",
    objectsExampleDescription: "Composable containers for resources",
    fungibleAssetsExampleLabel: "Fungible Assets",
    fungibleAssetsExampleDescription:
      "Highly expressive, fungible, digital assets",
  },
});

export const docsConfig = Object.freeze({
  i18nConfig,
  defaultTitle: "Aptos Docs",
  defaultDescription: "Docs for Aptos",
  githubUrl: "https://github.com/aptos-labs/developer-docs",
  relativeDocsPath: "/apps/nextra",
  githubNewIssueUrl: "https://github.com/aptos-labs/developer-docs/issues/new",
  googleAnalyticsId: "G-LLF79THJN0",
  origin: process.env.NEXT_PUBLIC_ORIGIN,
});
