import { highlightCode } from "utils/highlightCode";
import type {
  CodeSnippet,
  CodecacheResponse,
  CodecacheSSGProps,
  ParsedCodeSnippet,
} from "./types";
import { EXTENSION_TO_LANGUAGE } from "utils/language/language";
import { BundledLanguage } from "shiki";
import {
  fetchCodeSnippetFromGithub,
  parsePermalink,
} from "@aptos-labs/github-fetch";

const baseRoute = "https://code-cache.petra-wallet.workers.dev";
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
 * Reformat Permalink Response
 *
 * Given response.data, reformats an array of codeSnippets to include
 * highlight information for shiki rendering and restructures response
 * for use with SSG components implementing useData() in .mdx files
 * e.g., <RemoteCodeblock />
 */
export async function reformatPermalinkResponse(codeSnippets: CodeSnippet[]) {
  const formattedJsonResponse: CodecacheSSGProps<ParsedCodeSnippet> = {
    props: { ssg: {} },
  };

  for (let value of codeSnippets) {
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

/**
 * Fetches Github Permalinks from CodeCache
 *
 * Requires the existence of a NEXT_PUBLIC_CODECACHE_API_KEY in .env
 * NOT RATE LIMITED, REQUIRES API KEY FOR CACHE
 */
export async function permalinkFetchFromCache(
  permalinks: string[],
): Promise<CodecacheSSGProps<ParsedCodeSnippet>> {
  const apiKey = process.env.NEXT_PUBLIC_CODECACHE_API_KEY;
  if (!apiKey) {
    // Should panic
    throw new Error(
      "Unexpected error: fetching permalinks from cache but no NEXT_PUBLIC_CODECACHE_API_KEY defined in .env",
    );
  }

  try {
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

    const jsonResponse: CodecacheResponse<CodeSnippet[]> =
      await response.json();
    const formattedJsonResponse: CodecacheSSGProps<ParsedCodeSnippet> =
      await reformatPermalinkResponse(jsonResponse.data);
    return formattedJsonResponse;
  } catch (err) {
    const errorMessage =
      "An error occurred while fetching github permalinks for Remote Codeblock from codecache: ";
    console.warn(errorMessage, err);
    throw new Error(errorMessage, err);
  }
}

/**
 * Fetches Github Permalinks from Github
 *
 * Fallback in the event that NEXT_PUBLIC_CODECACHE_API_KEY is not set in .env
 * NOTE: RATE LIMITED BY GITHUB, UP TO 5000 REQUESTS PER HOUR
 *
 * @see https://stackoverflow.com/questions/13394077/is-there-a-way-to-increase-the-api-rate-limit-or-to-bypass-it-altogether-for-git
 */
export async function permalinkFetchFromGithub(
  permalinks: string[],
): Promise<CodecacheSSGProps<ParsedCodeSnippet>> {
  try {
    const awaiting_response = permalinks.map((permalink) =>
      fetchCodeSnippetFromGithub(permalink),
    );
    const response = await Promise.all(awaiting_response);

    let snippets: CodeSnippet[] = [];
    for (let item of response) {
      const {
        filePath,
        endLine: end_line,
        startLine: start_line,
        commitSha: commit_sha,
        filename,
        owner,
        repo,
        path,
        ...props
      } = parsePermalink(item.github_permalink);

      snippets.push({
        ...props,
        filename: filename || "",
        owner: owner || "",
        repo: repo || "",
        path: path || "",
        end_line,
        start_line: start_line || "",
        commit_sha: commit_sha || "",
        github_permalink: item.github_permalink,
        updated_at: "",
        used_in_latest_docs: false,
        code: item.code || "Error fetching code from github (non-cached fetch)",
      });
    }

    const formattedJsonResponse: CodecacheSSGProps<ParsedCodeSnippet> =
      await reformatPermalinkResponse(snippets);
    return formattedJsonResponse;
  } catch (err) {
    console.log(
      "Unable to fetch Github Permalinks from Github for remote codeblock component: " +
        err,
    );
    throw new Error(err);
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
    console.warn(
      "Warning: NEXT_PUBLIC_CODECACHE_API_KEY is not defined in .env, not using codecache for Remote Codeblock",
    );
    const result = await permalinkFetchFromGithub(permalinks);
    return result;
  } else {
    const result = await permalinkFetchFromCache(permalinks);
    return result;
  }
}
