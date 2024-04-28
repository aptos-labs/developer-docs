import type { ParsedCodeSnippet } from "./types";
import { useData } from "nextra/hooks";
import { Codeblock } from "..";
import { CopyToClipboard } from "nextra/components";
import { useRef } from "react";
import { EXTENSION_TO_SVG } from "utils/language/language";
import Link from "next/link";

export interface RemoteCodeblockProps {
  permalink: string;
}
/**
 * Remote Codeblock
 *
 * Enables the user to embed github permalinks as codeblocks
 * within the Nextra Docs.
 *
 * Note: When using it in .mdx files, it requires use of
 * `getStaticProps` in tandem with `permalinkFetch` to properly
 * fetch and syntax highlight the code
 *
 * @example
 * ```mdx
 * import { permalinkFetch, RemoteCodeblock } from '@components/index'
 * import { useData } from 'nextra/hooks'
 *
 * # Remote Codeblock
 *
 * Custom Remote Codeblock component.
 *
 * export async function getStaticProps() {
 *   return await permalinkFetch([
 *     'https://github.com/runelite/runelite/blob/2253b25197fe92aed4b6f26b44925842fd3f0dfd/.gitignore#L10'
 *   ])
 * }
 *
 * <RemoteCodeblock
 *   permalink="https://github.com/runelite/runelite/blob/2253b25197fe92aed4b6f26b44925842fd3f0dfd/.gitignore#L10"
 * />
 * ```
 */
export function RemoteCodeblock({ permalink }: RemoteCodeblockProps) {
  const data = useData();
  const codeContainerRef = useRef<HTMLDivElement>(null);

  if (!data[permalink]) {
    throw new Error(
      `Unable to find data for ${permalink}, be sure you've included it in your markdown 
      with permalinkFetch(...) and getStaticProps(...). See RemoteCodeblock.tsx for a usage example`,
    );
  }

  const snippetInfo: ParsedCodeSnippet = data[permalink];
  const html = snippetInfo.highlightedCode;
  const fileName = snippetInfo.filename;
  const language = snippetInfo.language;
  const icon = EXTENSION_TO_SVG[language];

  return (
    <Codeblock.Container>
      <Codeblock.Header>
        <img
          className="filter-none dark:invert h-[16px]"
          src={`/language-icons/${icon}`}
        />
        <Link
          href={snippetInfo.github_permalink}
          target="_blank"
          className="truncate font-medium hover:underline"
        >
          {fileName} ↗️
        </Link>
        <div className="flex flex-row ml-auto gap-2">
          <Link
            href={snippetInfo.github_permalink}
            target="_blank"
            className="transition rounded-md p-1.5 border border-gray-300 dark:border-neutral-700 contrast-more:border-gray-900 contrast-more:dark:border-gray-50"
          >
            Source Code
          </Link>
          <CopyToClipboard
            className="transition rounded-md p-1.5 border border-gray-300 dark:border-neutral-700 contrast-more:border-gray-900 contrast-more:dark:border-gray-50 "
            getValue={() =>
              codeContainerRef.current?.querySelector("code")?.textContent || ""
            }
          />
        </div>
      </Codeblock.Header>
      <Codeblock.Content ref={codeContainerRef} html={html} />
    </Codeblock.Container>
  );
}
