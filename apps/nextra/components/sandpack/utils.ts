import { SandpackFiles } from "@codesandbox/sandpack-react";
import { CodeSnippet } from "..";

/**
 * Transforms a map of
 * [github_permalink: string]: CodeSnippet to
 * [filename: string]: CodeSnippet
 *
 * Used with permalinkFetch(...)
 */
export function transformPermalinkMap(
  originalMap?: Record<string, any>,
): SandpackFiles {
  if (!originalMap) {
    return {};
  }

  const newMap: SandpackFiles = {};
  Object.values(originalMap).forEach((snippet) => {
    if (typeof snippet === "string") {
      throw new Error(
        "Unexpected string in transformPermalinkMap, expected type of CodeSnippet",
      );
    }
    if (snippet.filename) {
      const { filename } = snippet;
      newMap[filename] = snippet;
    } else {
      console.warn(
        "In transformPermalinkMap, expected attribute with filename in originalMap, but none was found",
      );
    }
  });

  return newMap;
}

/**
 * Return a map with keys that are the intersection of map1 and map2 but the values of map2
 */
export function commonMap(
  map1: Record<string, any>,
  map2: Record<string, any>,
): Record<string, any> {
  const result: Record<string, any> = {};

  for (const key in map2) {
    if (map2.hasOwnProperty(key) && map1.hasOwnProperty(key)) {
      result[key] = map2[key];
    }
  }

  return result;
}

/**
 * For use with the TS SDK
 *
 * Sandpack expects an entry file to begin with a slash "/"
 */
export function prefixKeysWithSlash(
  map: Record<string, any>,
): Record<string, any> {
  return Object.entries(map).reduce(
    (newMap, [key, value]) => {
      newMap[`/${key}`] = value;
      return newMap;
    },
    {} as Record<string, any>,
  );
}
