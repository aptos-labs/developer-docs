const root = "https://raw.githubusercontent.com/aptos-labs/aptos-core";

const branches = ["mainnet", "testnet", "devnet", "main"] as const;
type Branch = (typeof branches)[number];
const defaultBranch = branches[0];
const branchTitles: Record<Branch, string> = {
  mainnet: "Mainnet",
  testnet: "Testnet",
  devnet: "Devnet",
  main: "Main",
};

const pkgs = [
  "move-stdlib",
  "aptos-stdlib",
  "aptos-framework",
  "aptos-token",
  "aptos-token-objects",
] as const;

type Framework = (typeof pkgs)[number];
const defaultFramework = pkgs[0];
