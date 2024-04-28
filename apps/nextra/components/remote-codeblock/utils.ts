import { highlightCode } from "utils/highlightCode";
import type {
  CodeSnippet,
  CodecacheResponse,
  CodecacheSSGProps,
  ParsedCodeSnippet,
} from "./types";
import { EXTENSION_TO_LANGUAGE } from "utils/language/language";
import { BundledLanguage } from "shiki";

const baseRoute = "https://code-cache.petra-wallet.workers.dev";
const codeCacheApiKeyName = "NEXT_PUBLIC_CODECACHE_API_KEY";
const Origin = "http://localhost";

function getFileExtension(url: string): string {
  // Remove any fragment identifier which might include line numbers
  const basePart = url.split("#")[0];

  // Extract the last segment of the URL after the last slash
  const lastSegment = basePart.split("/").pop() || "";

  // Find the position of the last dot, which should precede the extension
  const lastDotIndex = lastSegment.lastIndexOf(".");

  // Extract and return the substring after the last dot
  // If there's no dot, return an empty string (or adjust as needed)
  if (lastDotIndex !== -1 && lastDotIndex + 1 < lastSegment.length) {
    return lastSegment.substring(lastDotIndex + 1);
  } else {
    return "";
  }
}

/**
 * Fetches Github Permalinks
 *
 * This is designed to be used in the context of a
 * getStaticProps call. This ensures that permalinks are fetched
 * once and only once during the site build, rather than client-side,
 * every page load
 *
 * See ssg.mdx for more info
 */
export async function permalinkFetch(permalinks: string[]) {
  // Check to ensure permalinks are well-formed
  permalinks.map((permalink) => {
    const match = permalink.match(
      /github\.com\/([^\/]+)\/([^\/]+)\/blob\/([^\/]+)\/(.+)#L(\d+)(-L(\d+))?$/,
    );
    if (!match) {
      throw new Error(
        "Error: GitHub permalink " + permalink + " is not well-formed",
      );
    }
  });

  const apiKey = process.env.NEXT_PUBLIC_CODECACHE_API_KEY;
  if (!apiKey) {
    throw new Error("NEXT_PUBLIC_CODECACHE_API_KEY is not defined in .env");
  }

  const body = JSON.stringify({
    github_permalinks: permalinks,
  });

  // Request all links from cache
  const response = await fetch(`${baseRoute}/codecache`, {
    headers: {
      Origin,
      "x-api-key": apiKey,
    },
    method: "POST",
    body,
  });

  const jsonResponse: CodecacheResponse<CodeSnippet[]> = await response.json();
  const formattedJsonResponse: CodecacheSSGProps<ParsedCodeSnippet> = {
    props: { ssg: {} },
  };

  for (let value of jsonResponse.data) {
    const extension = getFileExtension(value.github_permalink);
    let language: BundledLanguage;
    if (Object.keys(EXTENSION_TO_LANGUAGE).includes(extension)) {
      language = EXTENSION_TO_LANGUAGE[extension];
    } else {
      language = EXTENSION_TO_LANGUAGE["bash"];
    }
    const highlightedSnippet = await highlightCode(value.code, language);
    formattedJsonResponse.props.ssg[value.github_permalink] = {
      ...value,
      highlightedCode: highlightedSnippet,
      language,
    };
  }

  return formattedJsonResponse;
}
