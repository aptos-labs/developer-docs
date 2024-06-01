/**
 * Parse Github Permalink
 *
 * Given a permalink string, parse the owner, repo, startline, endline
 * and other information from the url
 *
 * @example
 * Single-line: https://github.com/aptos-labs/aptos-core/blob/be0ef975cee078cd7215b3aea346b2d02fb0843d/codecov.yml#L5
 * Multi-line: https://github.com/aptos-labs/aptos-core/blob/be0ef975cee078cd7215b3aea346b2d02fb0843d/codecov.yml#L5-L8
 *
 */
export function parsePermalink(permalink: string) {
  // Updated regex to make end line optional
  const match = permalink.match(
    /github\.com\/([^\/]+)\/([^\/]+)\/blob\/([^\/]+)\/(.+)#L(\d+)(-L(\d+))?$/,
  );
  if (!match) {
    throw new Error("Invalid GitHub permalink");
  }

  const [, owner, repo, commitSha, path, startLine, , endLine] = match;
  const filePath = path?.replace(/\/blob\/[^\/]+\//, "");

  // Extract the file name from the filePath
  const segments = filePath?.split("/");
  let filename: undefined | string = undefined;
  if (segments) {
    filename = segments[segments.length - 1]; // This gets the last segment of the path, which is the file name
  }

  return {
    filename,
    owner,
    repo,
    commitSha,
    path,
    startLine,
    endLine,
    filePath,
  };
}

export function parsePermalinks(permalinks: string[]) {
  return permalinks.map((permalink) => {
    return parsePermalink(permalink);
  });
}

export type ParsePermalinkReturnType = ReturnType<typeof parsePermalink>;

/**
 * Generate Github API Url
 *
 * Given an owner, repo, commitSha, and filePath reconstruct a Github API Url
 * for fetching the code contents
 */
export function generateApiUrl({
  owner,
  repo,
  commitSha,
  filePath,
}: ParsePermalinkReturnType) {
  if (!owner || !repo || !filePath || !commitSha) {
    throw new Error("Missing parameters for generateApiUrl");
  }

  const apiUrl =
    `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${commitSha}` as const;
  return apiUrl;
}

type TrimCodeSnippetProps = {
  content: string;
} & Pick<ParsePermalinkReturnType, "startLine" | "endLine">;

/**
 * Trim Code Snippet
 *
 * Trim content to startLine and endLine of code snippet
 */
export function trimCodeSnippet({
  content,
  startLine,
  endLine,
}: TrimCodeSnippetProps) {
  const lines = content.split("\n");

  if (!startLine) {
    throw new Error("");
  }

  const snippetStartLine = parseInt(startLine) - 1;

  // Use endLine if specified, otherwise use startLine for a single line snippet
  const snippetEndLine = endLine ? parseInt(endLine) : snippetStartLine + 1;
  const codeSnippet = lines.slice(snippetStartLine, snippetEndLine).join("\n");
  return codeSnippet;
}

export type GitHubFileDetail = {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: "file"; // Assuming 'type' can have other values, you might want to use a string union type here.
  content: string;
  encoding: "base64"; // Similar to 'type', if 'encoding' can have other values, consider using a string union type.
  _links: {
    self: string;
    git: string;
    html: string;
  };
};

/**
 * Fetch Code Snippet from Github
 *
 * Using the Github REST API, fetch the contents from the permalink,
 * truncate the content of the file to only include the code snippet
 * desired, and return that as a response
 */
export async function fetchCodeSnippetFromGithub(permalink: string) {
  const parsedPermalink = parsePermalink(permalink);
  const { startLine, endLine, filePath } = parsedPermalink;
  const apiUrl = generateApiUrl({ ...parsedPermalink });

  // Fetching the file content from GitHub API
  const headers: HeadersInit = {
    // 'Content-Type': 'application/json',
    // Accept: "application/vnd.github.v3.raw",
    "User-Agent": "request",
    // 'Authorization': 'token YOUR_GITHUB_TOKEN_HERE' // Uncomment and replace with your token if needed
  };
  const response = await fetch(apiUrl, { headers, method: "GET" });

  if (!response.ok) {
    throw new Error(`GitHub API responded with status code ${response.status}`);
  }

  const responseJson: GitHubFileDetail = await response.json();
  const content = atob(responseJson.content);
  const codeSnippet = trimCodeSnippet({ content, startLine, endLine });

  // Extracting the file name and extension
  const fileName = filePath?.split("/").pop() ?? "Unknown";
  const fileExtension = fileName.split(".").pop() ?? "Unknown";

  return {
    code: codeSnippet,
    github_permalink: permalink,
  };
}

export type FetchCodeSnippetFromGithubReturnType = Awaited<
  ReturnType<typeof fetchCodeSnippetFromGithub>
>;

export type DBData = {
  github_permalink: string;
  code: string | null;
  used_in_latest_docs: boolean | null;
  updated_at: string;
}[];

export function unifiedReturn(dbData: DBData) {
  const permalinks = dbData.map((data) => {
    // Convert to snake case
    const {
      commitSha: commit_sha,
      filePath: file_path,
      startLine: start_line,
      endLine: end_line,
      ...props
    } = parsePermalink(data.github_permalink);
    return {
      ...props,
      commit_sha,
      end_line,
      start_line,
      code: data.code,
      github_permalink: data.github_permalink,
      used_in_latest_docs: data.used_in_latest_docs,
      updated_at: data.updated_at,
    };
  });

  return permalinks;
}

export type UnifiedReturnReturnType = ReturnType<typeof unifiedReturn>;
