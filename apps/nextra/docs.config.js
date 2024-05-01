/* eslint-disable no-undef */
// Unfortunately making this a .ts file is not easily doable atm
// TODO: revisit this if time allows

const getOrigin = () => {
  if (process.env.NEXT_PUBLIC_ORIGIN) {
    return process.env.NEXT_PUBLIC_ORIGIN;
  } else {
    console.warn(
      "\x1b[33mWarning:\x1b[0m [nextra] No .env with NEXT_PUBLIC_ORIGIN found in apps/nextra. Using default http://localhost:3030\n",
    );
    return "http://localhost:3030";
  }
};

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

    ////////// Landing Page //////////

    // Title Section
    headline: "Build the Future of Web3 on Aptos",
    subHeading:
      "Everything you need to build the best-in-class Web3 developer experience.",
    quickStartBtnLabel: "Quick Start",
    learnBtnLabel: "Learn",

    // Move Section
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

    // Tooling Section
    toolingSectionHeadline:
      "Aptos tooling makes web3 development easier than ever",
    indexerIllustrationAlt: "Indexer Illustration",
    indexerLabel: "Indexer",
    indexerDescription:
      "Easily query for on-chain data with the Aptos Indexer.",
    graphqlLogoAlt: "GraphQL Logo",
    sdkIllustrationAlt: "SDK Illustration",
    sdkLabel: "SDK Docs",
    sdkDescription:
      "Build web applications quickly using Aptos’ TypeScript SDK.",
    typescriptLogoAlt: "TypeScript Logo",

    // Developers Section
    developersSectionHeadline: "At Aptos, developers come first",
    developerDiscussionsLabel: "Developer Discussions",
    developerDiscussionsDescription:
      "Receive timely responses to your burning questions, from any timezone.",
    developerDiscussionsLink: "Join",
    officeHoursLabel: "Office Hours",
    officeHoursDescription:
      "Enjoy dedicated live support from Aptos engineers.",
    officeHoursLink: "Sign Up",
    grantsLabel: "Grants",
    grantsDescription:
      "Apply for grants from the Aptos Foundation to get your project moving.",
    grantsLink: "Apply",
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
  origin: getOrigin(),
});
