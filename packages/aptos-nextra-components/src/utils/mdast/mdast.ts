import { fromMarkdown } from "mdast-util-from-markdown";
import { toMarkdown } from "mdast-util-to-markdown";
import { Options } from "mdast-util-to-markdown/lib";
import { Code, Root, Text } from "mdast-util-from-markdown/lib";
import { visit } from "unist-util-visit";
import { visitParents } from "unist-util-visit-parents";
import { mdxExpressionToMarkdown } from "mdast-util-mdx-expression";

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

    // Move Docgen should be escaping "<" tags but is not
    // Example from object.md: Convert Object<X> to Object<Y>.
    // @see https://raw.githubusercontent.com/aptos-labs/aptos-core/main/aptos-move/framework/aptos-framework/doc/object.md
    const preApprovedTagsRegex =
      /^(?!<\/?(pre|code|p|a|b|i|strong|em|u|ul|ol|li|blockquote|h[1-6]|dl|dt|dd|details|summary|table|thead|tbody|tfoot|tr|th|td|caption)\b).*/;
    const notHtmlTagMatch = preApprovedTagsRegex.exec(node.value);

    if (notHtmlTagMatch) {
      const nodeValueCopy = node.value.toString();
      const textNode: Text = {
        type: "text",
        value: nodeValueCopy
          .replace(/</g, (match, offset, str) => {
            if (str[offset + 1] !== "&") {
              return "&lt;";
            }
            return match; // don't escape if already an entity
          })
          .replace(/>/g, (match, offset, str) => {
            if (str[offset - 1] !== ";") {
              return "&gt;";
            }
            return match; // don't escape if already an entity
          }),
      };

      // Replace the current 'html' node with the new 'text' node
      if (parent && index !== undefined) {
        parent.children[index] = textNode;
        return;
      }
    }
  });
}

// TODO: Keep for now, may delete later
// export function escapeAngleBrackets(tree: Root) {
//   visit(tree, "text", (node, index, parent) => {
//     if (!parent || index === null || index === undefined) {
//       return;
//     }

//     const excludedTypes = new Set(["code", "inlineCode", "html"]);
//     const inExcludedNode = excludedTypes.has(parent.type);

//     let inCodeSequence = false;

//     if (!inExcludedNode) {
//       if (parent.type === "paragraph" && parent.children) {
//         const prevNode = parent.children[index - 1];
//         const nextNode = parent.children[index + 1];

//         if (
//           prevNode &&
//           nextNode &&
//           prevNode.type === "html" &&
//           nextNode.type === "html" &&
//           prevNode.value === "<code>" &&
//           nextNode.value === "</code>"
//         ) {
//           inCodeSequence = true;
//         }
//       }
//     }

//     if (!inExcludedNode && !inCodeSequence) {
//       node.value = node.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
//     }
//   });
// }

export function escapeAngleBrackets(tree: Root) {
  visit(tree, "text", (node, index, parent) => {
    if (!parent || index === null || index === undefined) {
      return;
    }

    const excludedTypes = new Set(["code", "inlineCode", "html"]);

    // Check if we're inside an excluded node type
    if (excludedTypes.has(parent.type)) {
      return;
    }

    // Only escape the angle brackets for text nodes outside of code blocks
    // node.value = node.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    // Ensure that we don't re-escape already escaped characters
    node.value = node.value
      .replace(/</g, (match, offset, str) => {
        if (str[offset + 1] !== "&") {
          return "&lt;";
        }
        return match; // don't escape if already an entity
      })
      .replace(/>/g, (match, offset, str) => {
        if (str[offset - 1] !== ";") {
          return "&gt;";
        }
        return match; // don't escape if already an entity
      });
  });
}

/**
 * Primary function for transpiling markdown -> MDX
 */
export function markdownToMdx(tree: Root) {
  convertHtmlToMarkdownCodeBlocks(tree);
  escapeAngleBrackets(tree);
}

/**
 * Convert AST to Markdown string
 */
export const astToMarkdown = (tree: Root) => {
  const options: Options = {
    extensions: [mdxExpressionToMarkdown()],
  };
  const textMarkdown = toMarkdown(tree, options);
  return textMarkdown.replaceAll("\\&lt;", "&lt;").replaceAll("\\&gt;", "&gt;");
};
