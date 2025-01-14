import { expect, test } from "vitest";
import { astToMarkdown, markdownToMdx } from "./mdast";
import { readFileAsTree, writeFile } from "./fsast";

test("keyRotation.md parse and fix AST", () => {
  const tree = readFileAsTree("./examples/keyRotation.md");
  markdownToMdx(tree);
  const markdown = astToMarkdown(tree);
  expect(markdown).toEqual(
    astToMarkdown(readFileAsTree("./examples/keyRotation.expect.md")).toString()
  );
});

test("account_snippet.md parse and fix AST", () => {
  const tree = readFileAsTree("./examples/account_snippet.md");
  console.log("PRE TREE: ", JSON.stringify(tree));
  markdownToMdx(tree);
  const markdown = astToMarkdown(tree);
  expect(markdown).toEqual(
    astToMarkdown(
      readFileAsTree("./examples/account_snippet.expect.md")
    ).toString()
  );
});

test("vector_snippet.md parse and fix AST", () => {
  const tree = readFileAsTree("./examples/vector_snippet.md");
  markdownToMdx(tree);
  const markdown = astToMarkdown(tree);
  expect(markdown).toEqual(
    astToMarkdown(
      readFileAsTree("./examples/vector_snippet.expect.md")
    ).toString()
  );
});

// test("object_snippet.md parse and fix AST", () => {
//   const tree = readFileAsTree("./examples/object_snippet.md");
//   markdownToMdx(tree);
//   console.log(JSON.stringify(tree))
//   const markdown = astToMarkdown(tree);
//   expect(markdown).toEqual(
//     astToMarkdown(
//       readFileAsTree("./examples/object_snippet.expect.md")
//     ).toString()
//   );
// });
