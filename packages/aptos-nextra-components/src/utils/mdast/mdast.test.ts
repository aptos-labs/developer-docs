import { expect, test } from 'vitest'
import { astToMarkdown, convertHtmlToMarkdownCodeBlocks, readFileAsTree, writeFile } from './mdast'

test('keyRotation.md parse and fix AST', () => {
  const tree = readFileAsTree("./examples/keyRotation.md");
  convertHtmlToMarkdownCodeBlocks(tree);
  const markdown = astToMarkdown(tree);
  expect(markdown).toEqual(astToMarkdown(readFileAsTree('./examples/keyRotation.expect.md')).toString())
})

test('account.md parse and fix AST', () => {
  const tree = readFileAsTree("./examples/account.md");
  convertHtmlToMarkdownCodeBlocks(tree);
  const markdown = astToMarkdown(tree);
  console.log(markdown)
  expect(markdown).toEqual(astToMarkdown(readFileAsTree('./examples/account.expect.md')).toString())
})