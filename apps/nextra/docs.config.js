/* eslint-disable no-undef */
// Unfortunately making this a .ts file is not easily doable atm
// TODO: revisit this if time allows

export const getOrigin = () => {
  if (process.env.NEXT_PUBLIC_ORIGIN) {
    return process.env.NEXT_PUBLIC_ORIGIN;
  } else {
    console.warn(
      "\x1b[33mWarning:\x1b[0m [nextra] No .env with NEXT_PUBLIC_ORIGIN found in apps/nextra. Using default http://localhost:3030\n",
    );
    return "http://localhost:3030";
  }
};

export const en = {
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
  indexerDescription: "Easily query for on-chain data with the Aptos Indexer.",
  graphqlLogoAlt: "GraphQL Logo",
  sdkIllustrationAlt: "SDK Illustration",
  sdkLabel: "SDK Docs",
  sdkDescription: "Build web applications quickly using Aptos' TypeScript SDK.",
  typescriptLogoAlt: "TypeScript Logo",

  // Developers Section

  developersSectionHeadline: "At Aptos, developers come first",
  developerDiscussionsLabel: "Developer Discussions",
  developerDiscussionsDescription:
    "Receive timely responses to your burning questions, from any timezone.",
  developerDiscussionsLink: "Join",
  aptosLearnLabel: "Aptos Learn",
  aptosLearnDescription:
    "Master blockchain on Aptos Learn with comprehensive tutorials and guides for developers at all levels.",
  aptosLearnLink: "Learn",
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
    "Cellana Finance chose to build on Aptos because of its rapid transaction speed, cost-effectiveness, and robust security. Moreover, Aptos's instant finality (less than 1s) will be a significant strength in attracting a variety of financial applications from Web 2 in the future.",
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
};

export const zh = {
  ...en,
  locale: "zh",
  name: "简体中文",
  direction: "ltr",
  title: "Aptos 文档",
  editText: "在 Github 上修改当前页面 →",
  feedbackText: "找到问题? 请给我们反馈 →",
  footerLinkText: "https://vercel.com/?utm_source=swr",
  footerLinkElement: undefined,
  searchPlaceholderText: "搜索文档",
  searchLoadingText: "Loading...",
  searchEmptyText: "没有找到任何结果.",
  searchErrorText: "索引加载失败.",
  lastUpdatedOn: "最近的更新",

  ////////// Landing Page //////////

  // Title Section

  headline: "在 Aptos 上构建 Web3 未来",
  subHeading: "构建一流的 Web3 开发人员所需的一切",
  quickStartBtnLabel: "快速开始",
  learnBtnLabel: "开始学习",

  // Move Section

  moveSectionHeadline: "使用 Move 制作安全且高性能的智能合约",
  moveExamplesHeadline: "开始使用这些 Move 示例",
  coinsExampleLabel: "Coins",
  coinsExampleDescription: "简单、类型安全且可替代的资产",
  objectsExampleLabel: "Objects",
  objectsExampleDescription: "可组合的资源容器",
  fungibleAssetsExampleLabel: "Fungible Assets",
  fungibleAssetsExampleDescription: "高表现力、可替代的数字资产",

  // Tooling Section

  toolingSectionHeadline: "Aptos 工具让 web3 开发变得前所未有的简单",
  indexerIllustrationAlt: "Indexer 插图",
  indexerLabel: "Indexer",
  indexerDescription: "使用 Aptos Indexer 轻松查询链上数据",
  graphqlLogoAlt: "GraphQL 图标",
  sdkIllustrationAlt: "SDK 插图",
  sdkLabel: "SDK Docs",
  sdkDescription: "使用 Aptos 的 TypeScript SDK 快速构建 Web 应用程序",
  typescriptLogoAlt: "TypeScript 图标",

  // Developers Section

  developersSectionHeadline: "在 Aptos, 开发人员是最重要的",
  developerDiscussionsLabel: "Developer Discussions",
  developerDiscussionsDescription:
    "在任何时区都能及时收到对您迫切的问题的答复。",
  developerDiscussionsLink: "Join",
  aptosLearnLabel: "Aptos Learn",
  aptosLearnDescription:
    "在 Aptos Learn 上掌握区块链，为各个级别的开发人员提供全面的教程和指南。",
  aptosLearnLink: "Learn",
  grantsLabel: "Grants",
  grantsDescription: "向 Aptos 基金会申请资助以推动您的项目。",
  grantsLink: "Apply",

  // Blockchain Section

  blockchainSectionHeadline: "探索 Aptos 区块链上的功能",
  performanceLabel: "Performance",
  performanceDescription: "高 TPS、低延迟将重新定义区块链性能",
  parallelExecutionLabel: "Parallel Execution",
  parallelExecutionDescription:
    "了解 Block-STM 如何在 Aptos 上支持并行化和乐观并发",
  validatorsLabel: "Validators & Fullnodes",
  validatorsDescription: "详细了解运行验证器或全节点所需的信息",
  keylessLabel: "Keyless",
  keylessDescription: "通过 Keyless 享受无缝的用户身份验证",
  passkeysLabel: "Passkeys",
  passkeysDescription: "利用生物识别技术轻松使用",
  randomnessLabel: "On-Chain Randomness",
  randomnessDescription: "解锁游戏及其他领域的真正公平性",
  feePayerLabel: "Fee Payer",
  feePayerDescription: "使您的交易能够无缝执行，让其他人代为支付",
  multiSigLabel: "Multi-sig",
  multiSigDescription:
    "通过协作控制和无与伦比的安全性以前所未有的方式保护您的资产",
  gasLabel: "Gas",
  gasDescription: "低汽油费让交易更明智，而不是更困难",
  consensusLabel: "Consensus",
  consensusDescription: "了解有关基于 DAG 的共识的更多信息",
  storageLabel: "Storage",
  storageDescription:
    "了解有关 Aptos Jellyfish Merkle Tree 和自定义 RocksDB 配置的更多信息",
  networkingLabel: "Networking",
  networkingDescription: "了解 Aptos 区块链的拓扑以及节点如何相互通信",
  mempoolLabel: "Mempool",
  mempoolDescription: "了解事务在发送到上游之前如何缓冲处理",
  stateSyncLabel: "State Sync",
  stateSyncDescription: "了解下游节点如何同步最新状态",

  // Testimonials Section

  testimonialsSectionHeadline: "聆听生态系统的声音",
  testimonial1Body:
    "Aptos 的构建具有变革性，提供无与伦比的交易速度和可靠性。我们喜欢充满活力的社区和 Aptos 生态系统的总体方向。",
  testimonial1Author: "–Muhd Dahlan, CEO Zabava Labs",
  testimonial2Body:
    "Aptin Finance 为 Aptos 用户提供安全、直观和无缝的财务交互。与 Aptos 的愿景相一致，我们的目标是为多元化的全球社区建立全链 DeFi 机会的联系。",
  testimonial2Author: "–Elvis Woo, CTO & Co-Founder, Aptin Finance",
  testimonial3Body:
    "Cellana Finance 选择基于 Aptos 进行构建是因为其交易速度快、成本效益高且安全性强。此外，Aptos 的即时终结性（小于1秒）将成为未来吸引 Web 2 各种金融应用的重要优势。",
  testimonial3Author: "–Andy Hoang, CEO, Cellana",
};

export const i18nConfig = Object.freeze({
  en,
  zh,
});

export const docsConfig = Object.freeze({
  i18nConfig,
  defaultTitle: "Aptos Docs",
  defaultDescription: "Docs for Aptos",
  githubUrl: "https://github.com/aptos-labs/developer-docs",
  relativeDocsPath: "/apps/nextra",
  githubNewIssueUrl:
    "https://github.com/aptos-labs/developer-docs/issues/new?assignees=&labels=documentation&projects=&template=content_issue.yml",
  googleAnalyticsId: "G-WCYR52WMW9",
  origin: getOrigin(),
});
