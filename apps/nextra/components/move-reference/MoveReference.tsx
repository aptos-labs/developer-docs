"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Playground } from "nextra/components";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import {
  readMarkdownString,
  convertHtmlToMarkdownCodeBlocks,
  astToMarkdown,
} from "@aptos-labs/nextra-components";
import { ModuleContainer } from "./ModuleContainer";
import {
  MoveReferenceContext,
  useMoveReference,
  useURLParams,
} from "./MoveReferenceProvider";
import { BRANCHES, FrameworkData, GITHUB_APTOS_CORE } from "./shared";

const BranchSelector = () => {
  const { updateBranch, branch } = useMoveReference();

  return (
    <form className="w-full mt-6">
      <label
        htmlFor="branches"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Branch
      </label>
      <select
        id="branches"
        onChange={(event) => {
          updateBranch(event.currentTarget.value as any);
        }}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-60"
      >
        {BRANCHES.map((branchIndex) => {
          return (
            <option key={branchIndex} selected={branchIndex === branch}>
              {branchIndex}
            </option>
          );
        })}
      </select>
    </form>
  );
};

type ModulePageSelectorProps = {
  pkgsData: FrameworkData[];
  selectedPage: string | null;
  onSelectPage: (newPage: string) => void;
};

const ModulePageSelector = () => {
  const itemRefs = useRef({});

  return (
    <div className="mt-6">
      <ModuleContainer branch="main" />
    </div>
  );
};

const Content = () => {
  const [content, setContent] = useState<string | null>(null);
  const [compiledMdx, setCompiledMdx] = useState<string | null>(null);
  const location = usePathname();
  const { asPath } = useRouter();
  const { branch, page } = useMoveReference();

  const hash = asPath.split("#")[1];

  useEffect(() => {
    let isMounted = true;

    const fetchContent = async () => {
      if (page && isMounted) {
        console.log("PAGE: ", page);
        const pagePath = `${GITHUB_APTOS_CORE}/${branch}/aptos-move/framework/${page}`;
        // const pagePath = "https://raw.githubusercontent.com/aptos-labs/aptos-core/main/aptos-move/framework/aptos-stdlib/doc/table.md"
        const response = await fetch(pagePath);
        if (response.ok) {
          const rawContent = await response.text();
          const tree = readMarkdownString(rawContent);
          convertHtmlToMarkdownCodeBlocks(tree);
          const mdxString = astToMarkdown(tree);
          console.log(mdxString);
          setContent(mdxString);
        }
      } else {
        setContent(null);
      }
    };

    if (page) {
      fetchContent().catch((err) =>
        console.log(`Error fetching content: ${err}`),
      );
    }

    return () => {
      isMounted = false;
    };
  }, [branch, page]);

  useEffect(() => {
    if (content && hash) {
      window.location.hash = "";
      window.location.hash = hash;
    }
  }, [content, hash]);

  // Conditional rendering based on whether a page is selected
  return (
    <div className="move-content">
      {content ? <Playground source={content} /> : null}
    </div>
  );
};

export const MoveReference = () => {
  const value = useURLParams();
  return (
    <MoveReferenceContext.Provider value={value}>
      <div className="move-reference-body">
        <div className="move-reference-nav">
          <BranchSelector />
          <ModulePageSelector />
        </div>
        <div className="move-reference-contents">
          <Content />
        </div>
      </div>
    </MoveReferenceContext.Provider>
  );
};

export default MoveReference;
