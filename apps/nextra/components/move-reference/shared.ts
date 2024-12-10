// MOVE MODULES
export const PKGS = [
  "move-stdlib",
  "aptos-stdlib",
  "aptos-framework",
  "aptos-token",
  "aptos-token-objects",
] as const;

// GITHUB
export const GITHUB_APTOS_CORE =
  "https://raw.githubusercontent.com/aptos-labs/aptos-core";

export const GITHUB_APTOS_CORE_CONTENT = `https://github.com/aptos-labs/aptos-core/blob`;

// BRANCHES
export const BRANCHES = ["mainnet", "testnet", "devnet", "main"] as const;
export const DEFAULT_BRANCH = BRANCHES[0];
export const DEFAULT_FRAMEWORK = PKGS[0];
export const TENG_COMMIT = "0522837fab5552c027c9dfa73a89907e3980a131";

export type Branch = (typeof BRANCHES)[number];
export type Framework = (typeof PKGS)[number];
export type FrameworkData = {
  framework: Framework;
  pages: { id: string; name: string }[];
};

// BRANCH TITLES
export const BRANCH_TITLES: Record<Branch, string> = {
  mainnet: "Mainnet",
  testnet: "Testnet",
  devnet: "Devnet",
  main: "Main",
};
