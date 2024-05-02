import type { SandpackSetup } from "@codesandbox/sandpack-react";

export const aptosTsSdkDeps: SandpackSetup["dependencies"] = Object.freeze({
  // Quick Reference: https://www.npmjs.com/package/@aptos-labs/ts-sdk
  "@aptos-labs/ts-sdk": "latest",
} as const);

export const aptosTsSdkDevDeps: SandpackSetup["devDependencies"] =
  Object.freeze({
    "ts-node": "latest",
    typescript: "latest",
  } as const);

export interface GenerateAptosTsSdkPackageJsonProps {
  entry?: string;
}

export const generateAptosTsSdkPackageJsonString = ({
  entry,
}: GenerateAptosTsSdkPackageJsonProps) => {
  const packageJson = Object.freeze({
    scripts: {
      start: `ts-node ${entry}`,
    },
    main: `${entry}`,
    dependencies: { ...aptosTsSdkDeps },
    devDependencies: { ...aptosTsSdkDevDeps },
  });
  return JSON.stringify(packageJson);
};

// export const generateAptosTsSdkPackageJsonString = ({
//   entry,
// }: GenerateAptosTsSdkPackageJsonProps) => {
//   const packageJson = Object.freeze({
//     scripts: {
//       start: `node ${entry}`,
//     },
//     main: `${entry}`,
//     dependencies: { ...aptosTsSdkDeps },
//     devDependencies: { ...aptosTsSdkDevDeps },
//   });
//   return JSON.stringify(packageJson);
// };