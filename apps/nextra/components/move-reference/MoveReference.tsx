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
import { useMoveContent } from "./useMoveContent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

const DocsSkeleton = () => {
  return (
    <div role="status" className="mt-8 w-full mx-auto">
      {/* Title Placeholder */}
      <div className="animate-pulse">
        <div className="h-20 bg-gray-200 rounded-lg dark:bg-gray-700 w-3/4 mb-4"></div>
      </div>

      {/* Subtitle Placeholder */}
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 mb-6"></div>
      </div>

      {/* Paragraph Placeholders */}
      <div className="space-y-4 animate-pulse">
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-5/6"></div>
      </div>

      {/* Code Block Placeholder */}
      <div className="mt-6 animate-pulse">
        {/* Code Block Title Placeholder */}
        <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-1/3 mb-4"></div>
        {/* Code Block Content Placeholder */}
        <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 overflow-hidden">
          {/* Simulating multiple lines of code */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
          </div>
        </div>
        <span className="sr-only">Loading code block...</span>
      </div>

      {/* Additional Paragraphs */}
      <div className="space-y-4 mt-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4"></div>
      </div>

      {/* Accessibility Text */}
      <span className="sr-only">Loading documentation content...</span>
    </div>
  );
};

const Content = () => {
  const [compiledMdx, setCompiledMdx] = useState<string | null>(null);
  const location = usePathname();
  const { asPath } = useRouter();
  const { branch, page } = useMoveReference();

  const hash = asPath.split("#")[1];
  const { data: content, isLoading } = useMoveContent({
    args: { page, branch },
  });

  useEffect(() => {
    if (content && hash) {
      window.location.hash = "";
      window.location.hash = hash;
    }
  }, [content, hash]);

  if (isLoading) {
    return <DocsSkeleton />;
  }

  console.log(content);

  // Conditional rendering based on whether a page is selected
  return (
    <div className="move-content lg:max-w-[calc(100%-16rem)]">
      {content ? (
        <Playground fallback={<DocsSkeleton />} source={content} />
      ) : null}
    </div>
  );
};

const queryClient = new QueryClient();

export const MoveReference = () => {
  const value = useURLParams();
  return (
    <QueryClientProvider client={queryClient}>
      <MoveReferenceContext.Provider value={value}>
        <div id="move-reference-body">
          <div id="move-reference-nav">
            <BranchSelector />
            <ModulePageSelector />
          </div>
          <div id="move-reference-contents">
            <Content />
          </div>
        </div>
      </MoveReferenceContext.Provider>
    </QueryClientProvider>
  );
};

export default MoveReference;
