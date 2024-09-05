import { expect, test } from 'vitest'
import { astToMarkdown, convertHtmlToMarkdownCodeBlocks, readFileAsTree } from './mdast'

test('mdast readFileAsTree from local markdown', () => {
  const tree = readFileAsTree();
  console.log("Tree pre-treatment: ", tree);
  convertHtmlToMarkdownCodeBlocks(tree);
  console.log("Tree post-codeblock treatment: ", tree);
  const markdown = astToMarkdown(tree);
  console.log(markdown)
})