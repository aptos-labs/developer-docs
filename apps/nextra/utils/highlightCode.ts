import { BundledLanguage, codeToHtml } from "shiki";

export const highlightCode = (
  codeSnippet: string,
  lang: BundledLanguage = "move",
): TrustedHTML => {
  return codeToHtml(codeSnippet, {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    defaultColor: false,
  });
};
