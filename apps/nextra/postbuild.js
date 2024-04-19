import fs from "fs/promises";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const githubLinkRegex =
  /https:\/\/github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+\/blob\/[a-fA-F0-9]{40}\/[a-zA-Z0-9\/_.-]+#L\d+(?:-L\d+)?/g;
const baseRoute = "https://code-cache.petra-wallet.workers.dev";
const codeCacheApiKeyName = "NEXT_PUBLIC_CODECACHE_API_KEY";
const Origin = "http://localhost";

dotenv.config();

/**
 * Scans all directories for Github Permalinks
 *
 * Returns array of strings (github_permalinks)
 */
async function scanDirectoryForGithubPermalinks(dir) {
  let github_permalinks = [];

  const items = await fs.readdir(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      // Recursively scan the directory
      const nestedLinks = await scanDirectoryForGithubPermalinks(fullPath);
      github_permalinks = github_permalinks.concat(nestedLinks);
    } else if (item.isFile() && item.name.endsWith(".mdx")) {
      // Process .mdx files
      const fileContent = await fs.readFile(fullPath, "utf8");
      const matchedLinks = fileContent.match(githubLinkRegex) || [];
      github_permalinks = github_permalinks.concat(matchedLinks);
    }
  }

  return github_permalinks;
}

/**
 * Given a directory path, recursively scan for all github permalinks
 * in .mdx files within this directory, and cache all of them
 * using the /codecache cloudflare worker endpoint
 */
async function cacheGithubPermalinks(dir) {
  const apiKey = process.env.NEXT_PUBLIC_CODECACHE_API_KEY;
  if (!apiKey) {
    throw new Error(`${codeCacheApiKeyName} missing from .env`);
  }
  const github_permalinks = await scanDirectoryForGithubPermalinks(dir);
  const body = JSON.stringify({
    github_permalinks: github_permalinks,
  });

  // First cache all links
  await fetch(`${baseRoute}/codecache`, {
    headers: {
      Origin,
      "x-api-key": apiKey,
    },
    method: "POST",
    body,
  });

  // Marks all of the above github permalinks with used_in_latest_docs set to true
  return await fetch(`${baseRoute}/codecache/used-in-latest-docs`, {
    headers: {
      Origin,
      "x-api-key": apiKey,
    },
    method: "POST",
    body,
  });
}

async function main() {
  const projectDir = path.join(__dirname, "pages");
  try {
    // Logging this for now for visibility for anyone running the script locally
    const scannedLinks = await scanDirectoryForGithubPermalinks(projectDir);
    console.log("Cached github permalinks: ", scannedLinks);

    const cachedLinksResponse = await cacheGithubPermalinks(projectDir);

    const cachedLinks = await cachedLinksResponse.json();
    if (cachedLinks.status_code !== 200) {
      throw new Error(cachedLinks.message);
    }
    console.log("✔️ Successfully cached all permalinks");
  } catch (error) {
    console.error("⚠️ Error caching permalinks:", error);
  }
}

main();
