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

    // Blockchain Section
    blockchainSectionHeadline: "Discover blockchain features on Aptos",
    performanceLabel: "Performance",
    performanceDescription:
      "Redefine blockchain performance with high TPS and low latency",
    parallelExecutionLabel: "Parallel Execution",
    parallelExecutionDescription:
      "Learn how Block-STM powers parallelization and optimistic concurrency on Aptos",
    validatorsLabel: "Validators & Fullnodes",
    validatorsDescription:
      "Learn more about what it takes to run a validator or fullnode",
    keylessLabel: "Keyless",
    keylessDescription: "Enjoy seamless user authentication with Keyless",
    passkeysLabel: "Passkeys",
    passkeysDescription: "Onboard seamlessly using biometrics",
    randomnessLabel: "On-Chain Randomness",
    randomnessDescription: "Unlock true fairness in gaming and beyond",
    feePayerLabel: "Fee Payer",
    feePayerDescription:
      "Empower your transactions with seamless execution, letting others foot the bill",
    multiSigLabel: "Multi-sig",
    multiSigDescription:
      "Secure your assets like never before with collaborative control and unparalleled safety",
    gasLabel: "Gas",
    gasDescription: "Trade smarter, not harder with low gas fees",
    consensusLabel: "Consensus",
    consensusDescription: "Learn more about DAG based consensus",
    storageLabel: "Storage",
    storageDescription:
      "Learn more about Aptos' Jellyfish Merkle Tree and custom RocksDB configuration",
    networkingLabel: "Networking",
    networkingDescription:
      "Learn about the topology of the Aptos blockchain and how nodes communicate with each other",
    mempoolLabel: "Mempool",
    mempoolDescription:
      "Learn how transactions are buffered for processing before they're sent upstream",
    stateSyncLabel: "State Sync",
    stateSyncDescription:
      "Learn how nodes downstream synchronizes with the latest state",

    // Testimonials Section
    testimonialsSectionHeadline: "Hear From The Ecosystem",
    testimonial1Body:
      "Building on Aptos has been transformative, offering unmatched transaction speed and reliability. We love the vibrant community and overall direction that the Aptos ecosystem is heading.",
    testimonial1Author: "–Muhd Dahlan, CEO Zabava Labs",
    testimonial2Body:
      "Aptin Finance drives secure, intuitive, and seamless financial interactions for Aptos users. Aligned with Aptos' vision, we aim to establish a nexus of Omni-chain DeFi opportunities for a diverse global community.'",
    testimonial2Author: "–Elvis Woo, CTO & Co-Founder, Aptin Finance",
    testimonial3Body:
      "Cellana Finance chose to build on Aptos because of its rapid transaction speed, cost-effectiveness, and robust security. Moreover, Aptos’s instant finality (less than 1s) will be a significant strength in attracting a variety of financial applications from Web 2 in the future.",
    testimonial3Author: "–Andy Hoang, CEO, Cellana",

    // Footer Section
    aptosAlt: "Aptos Foundation",
    discordAlt: "Discord",
    githubAlt: "Github",
    linkedinAlt: "LinkedIn",
    telegramAlt: "Telegram",
    twitterAlt: "Twitter",
    buildHeading: "Build",
    discoverHeading: "Discover",
    connectHeading: "Connect",
    meetAptosHeading: "Meet Aptos",
    documentationLink: "Documentation",
    governanceLink: "Governance",
    networkNumbersLink: "Network Numbers",
    validatorsLink: "Validators",
    nodeOperationsLink: "Node Operations",
    ecosystemHubLink: "Ecosystem Hub",
    grantsLink: "Grants",
    pressLink: "Press",
    eventsLink: "Events",
    collectiveLink: "Collective",
    forumLink: "Forum",
    aboutAptosLink: "About",
    netZeroPolicyLink: "Net Zero Policy",
    whitePaperLink: "White Paper",
    brandLink: "Brand",
    careersLink: "Careers",
    privacyLink: "Privacy",
    termsLink: "Terms",
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
