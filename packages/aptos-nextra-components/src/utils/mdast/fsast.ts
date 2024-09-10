import fs from "node:fs";
import path from "node:path";

import { fromMarkdown } from "mdast-util-from-markdown";
import { Root } from "mdast-util-from-markdown/lib";

/**
 * Read File as Tree
 */
export function readFileAsTree(relativePath: string): Root {
  const localPath = path.resolve(__dirname, relativePath);
  const doc = fs.readFileSync(localPath);
  const tree = fromMarkdown(doc);
  return tree;
}

export function writeFile(relativePath: string, data: string) {
  const localPath = path.resolve(__dirname, relativePath);
  fs.writeFileSync(localPath, data);
}
