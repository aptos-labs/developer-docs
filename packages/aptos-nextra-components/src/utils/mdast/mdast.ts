import { fromMarkdown } from "mdast-util-from-markdown";
import { toMarkdown } from "mdast-util-to-markdown";
import { Code, Root } from "mdast-util-from-markdown/lib";
import { visit } from "unist-util-visit";

export function readMarkdownString(source: string): Root {
  const tree = fromMarkdown(source);
  return tree;
}

/**
 * Convert HTML to markdown code blocks
 *
 * Parser first pass
 */
export function convertHtmlToMarkdownCodeBlocks(tree: Root) {
  visit(tree, "html", (node, index, parent) => {
    // Codeblock parsing (only applies to <pre><code>)
    const codeblockRegex = /<pre><code[^>]*>([\s\S]*?)<\/code><\/pre>/;
    const codeblockMatch = codeblockRegex.exec(node.value);

    if (codeblockMatch) {
      // Extract the content between <code> and </code>
      const codeContent = codeblockMatch[1]
        .replace(/<[^>]+>/g, "") // Remove all HTML tags
        .replace(/&lt;/g, "<") // Decode escaped characters
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .trim();

      // Create a new 'code' node
      const codeNode: Code = {
        type: "code",
        lang: "move", // You can adjust or detect the language dynamically
        meta: null,
        value: codeContent,
        position: node.position, // Preserve the original position
      };

      // Replace the current 'html' node with the new 'code' node
      if (parent && index !== undefined) {
        parent.children[index] = codeNode;
        return;
      }
    }
  });
}

export const astToMarkdown = (tree: Root) => {
  return toMarkdown(tree);
};
