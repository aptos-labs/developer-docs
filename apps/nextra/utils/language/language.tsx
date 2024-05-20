import type { BundledLanguage } from "shiki";

export const EXTENSION_TO_ICON_NAME = Object.freeze({
  js: "JavaScriptIcon",
  jsx: "JavaScriptIcon",
  ts: "TypeScriptIcon",
  typescript: "TypeScriptIcon",
  tsx: "TypeScriptIcon",
  md: "MarkdownIcon",
  mdx: "MdxIcon",
  sh: "TerminalIcon",
  bash: "TerminalIcon",
  css: "CssIcon",
  "c++": "CPPIcon",
  cpp: "CPPIcon",
  csharp: "CsharpIcon",
  cs: "CsharpIcon",
  "c#": "CsharpIcon",
  graphql: "GraphQLIcon",
  python: "PythonIcon",
  py: "PythonIcon",
  rust: "RustIcon",
  rs: "RustIcon",
  terraform: "TerraformIcon",
  tf: "TerraformIcon",
  move: "MoveIcon",
} as const);

export const EXTENSION_TO_SVG = Object.freeze(
  Object.fromEntries(
    Object.keys(EXTENSION_TO_ICON_NAME).map(
      (key: keyof typeof EXTENSION_TO_ICON_NAME) => [
        key,
        `${key}.svg` as const,
      ],
    ),
  ),
);

export const EXTENSION_TO_LANGUAGE: Record<
  keyof typeof EXTENSION_TO_ICON_NAME,
  BundledLanguage
> = {
  js: "javascript",
  jsx: "javascript",
  ts: "typescript",
  typescript: "typescript",
  tsx: "typescript",
  md: "markdown",
  mdx: "markdown",
  sh: "bash",
  bash: "bash",
  css: "css",
  "c++": "c++",
  cpp: "cpp",
  csharp: "csharp",
  cs: "csharp",
  "c#": "csharp",
  graphql: "graphql",
  python: "python",
  py: "python",
  rust: "rust",
  rs: "rust",
  terraform: "terraform",
  tf: "terraform",
  move: "move",
} as const;
