import { expect, test } from 'vitest'
import { astToMarkdown, convertHtmlToMarkdownCodeBlocks, readFileAsTree } from './mdast'

test('keyRotation parse and fix AST', () => {
  const tree = readFileAsTree("./examples/keyRotation.md");
  convertHtmlToMarkdownCodeBlocks(tree);
  const markdown = astToMarkdown(tree);
  console.log(markdown);
  expect(markdown).toEqual(astToMarkdown(readFileAsTree('./examples/keyRotation.expect.md')).toString())
})