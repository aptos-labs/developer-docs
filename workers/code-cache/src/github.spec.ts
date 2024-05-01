import {
  env,
  createExecutionContext,
  waitOnExecutionContext,
} from "cloudflare:test";
import { describe, it, expect } from "vitest";
import {
  type ParsePermalinkReturnType,
  parsePermalink,
  fetchCodeSnippetFromGithub,
  FetchCodeSnippetFromGithubReturnType,
} from "./github";

let singleLinePermalink =
  "https://github.com/aptos-labs/aptos-core/blob/be0ef975cee078cd7215b3aea346b2d02fb0843d/codecov.yml#L5";
let multiLinePermalink =
  "https://github.com/aptos-labs/aptos-core/blob/be0ef975cee078cd7215b3aea346b2d02fb0843d/codecov.yml#L5-L8";

describe("Github Functions", () => {
  it("Test Parse Permalink", async () => {
    // Single line
    let permalink = singleLinePermalink;
    let actualResult = parsePermalink(permalink);
    let expectedResult: ParsePermalinkReturnType = {
      owner: "aptos-labs",
      repo: "aptos-core",
      commitSha: "be0ef975cee078cd7215b3aea346b2d02fb0843d",
      path: "codecov.yml",
      startLine: "5",
      endLine: undefined,
      filePath: "codecov.yml",
      filename: "codecov.yml",
    };
    expect(actualResult).toMatchObject(expectedResult);

    // Multi line
    permalink = multiLinePermalink;
    actualResult = parsePermalink(permalink);
    expectedResult = {
      owner: "aptos-labs",
      repo: "aptos-core",
      commitSha: "be0ef975cee078cd7215b3aea346b2d02fb0843d",
      path: "codecov.yml",
      startLine: "5",
      endLine: "8",
      filePath: "codecov.yml",
      filename: "codecov.yml",
    };
    expect(actualResult).toMatchObject(expectedResult);
  });

  it("Fetch code snippet from Github", async () => {
    let codesnippet = await fetchCodeSnippetFromGithub(singleLinePermalink);
    let expectedResult: FetchCodeSnippetFromGithubReturnType = {
      code: "coverage:",
      github_permalink: singleLinePermalink,
    };
    expect(codesnippet).toMatchObject(expectedResult);
  });
});
