"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import Select from "react-select";
// import remarkMermaid from "remark-mermaid-plugin";
import {
  // Select,
  Label,
  Button,
  ListBox,
  ListBoxItem,
  Popover,
  SelectValue,
  ComboBox,
  Input,
  Section,
  Header,
} from "react-aria-components";
import { IconChevronDown } from "@tabler/icons-react";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useSearchParams,
} from "next/navigation";
import { useRouter } from "next/router";
import { MoveReferenceContent } from "./MoveReferenceContent";

const tengCommit = "0522837fab5552c027c9dfa73a89907e3980a131"
const root = "https://raw.githubusercontent.com/aptos-labs/aptos-core";
const branches = [tengCommit, "mainnet", "testnet", "devnet", "main"] as const;
const defaultBranch = branches[0];
const branchTitles: Record<Branch, string> = {
  "0522837fab5552c027c9dfa73a89907e3980a131": "Teng's Commit",
  mainnet: "Mainnet",
  testnet: "Testnet",
  devnet: "Devnet",
  main: "Main",
};
const pkgs = [
  "move-stdlib",
  "aptos-stdlib",
  "aptos-framework",
  "aptos-token",
  "aptos-token-objects",
] as const;
const defaultFramework = pkgs[0];

type Branch = (typeof branches)[number];
type Framework = (typeof pkgs)[number];
type FrameworkData = {
  framework: Framework;
  pages: { id: string; name: string }[];
};
type URLParams = { branch: Branch; page: string | null };

type TopNavProps = {
  branch: Branch;
  onBranchChange: (branch: Branch) => void;
};

const TopNav = ({ branch, onBranchChange }: TopNavProps) => (
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
        onBranchChange(event.currentTarget.value as any);
      }}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-60"
    >
      {branches.map((branchIndex) => {
        return (
          <option key={branchIndex} selected={branchIndex === branch}>
            {branchIndex}
          </option>
        );
      })}
    </select>
  </form>
);

type ModulePageSelectorProps = {
  pkgsData: FrameworkData[];
  selectedPage: string | null;
  onSelectPage: (newPage: string) => void;
};

const ModulePageSelector = ({
  pkgsData,
  selectedPage,
  onSelectPage,
}: ModulePageSelectorProps) => {
  const itemRefs = useRef({});
  const items = useMemo(
    () =>
      pkgsData
        .flatMap((frameworkData) => frameworkData.pages)
        .map((pkg) => {
          return {
            ...pkg,
            value: pkg.name,
          };
        }),
    [pkgsData],
  );
  const [isComboBoxOpen, setOpen] = useState(false);
  const comboBoxKey = selectedPage || "none";

  useEffect(() => {
    if (isComboBoxOpen && selectedPage && itemRefs.current[selectedPage]) {
      itemRefs.current[selectedPage].scrollIntoView({
        behavior: "instant",
        block: "nearest",
      });
    }
  }, [selectedPage, isComboBoxOpen]);

  const handleClear = () => {
    onSelectPage(""); // Update the parent component's state
  };

  return (
    <div className="mt-6">
      {/* <form className="w-full mt-6">
        <label
          htmlFor="modules"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Branch
        </label>
        <select
          id="modules"
          onChange={(event) => {
            onSelectPage(event.currentTarget.value as any);
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-60"
        >
          {items.map((item) => {
            return (
              <option key={item.value} selected={item.value === selectedPage}>
                {item.value}
              </option>
            );
          })}
        </select>
      </form> */}
      <ComboBox
        defaultItems={items}
        defaultSelectedKey={selectedPage || ""}
        defaultInputValue={selectedPage || ""}
        menuTrigger="focus"
        onSelectionChange={onSelectPage}
        onOpenChange={setOpen}
        key={comboBoxKey}
      >
        <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Module
        </Label>
        <div className="flex gap-2 relative">
          <Input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-60"
            placeholder="Select a module"
          />
          <Button>
            <IconChevronDown />
          </Button>
          {selectedPage && (
            <a className="form-reset" href="#" onClick={handleClear}>
              Clear
            </a>
          )}
        </div>
        <Popover className="max-h-32 overflow-y-auto bg-white dark:bg-gray-700">
          <ListBox className="max-h-32 overflow-auto ">
            {pkgsData.map((frameworkData) => (
              <Section key={frameworkData.framework}>
                <Header>{frameworkData.framework}</Header>
                {frameworkData.pages.map((item) => (
                  <ListBoxItem
                    key={item.id}
                    id={item.id}
                    // @ts-ignore
                    ref={(el) => (itemRefs.current[item.id] = el)}
                  >
                    {item.name}
                  </ListBoxItem>
                ))}
              </Section>
            ))}
          </ListBox>
        </Popover>
      </ComboBox>
    </div>
  );
};

type ContentProps = {
  branch: Branch;
  page: string | null;
};

const Content = ({ branch, page }: ContentProps) => {
  const [content, setContent] = useState<string | null>(null);
  const [compiledMdx, setCompiledMdx] = useState<string | null>(null);
  const location = usePathname();
  const { asPath } = useRouter();

  const hash = asPath.split("#")[1];

  useEffect(() => {
    let isMounted = true;

    const fetchContent = async () => {
      if (page && isMounted) {
        // const pagePath = `${root}/${branch}/aptos-move/framework/${page}`;
        const pagePath = `${root}/${branch}/aptos-move/framework/${page}`;
        console.log(pagePath)
        const response = await fetch(pagePath);
        if (response.ok) {
          const rawContent = await response.text();
          console.log(rawContent)
          setContent(rawContent);
          const compileMdxRoute = "/api/compile-mdx";
          const result = await fetch(compileMdxRoute, {
            method: 'POST', // Specify the request method
            headers: {
              'Content-Type': 'application/json', // Set the content type to JSON
            },
            body: JSON.stringify(rawContent), // Convert the raw content to JSON
          });
          console.log(result);
          const responseJson = await response.json();
          const compiledMdx = (responseJson as any).code;
          console.log(compiledMdx)
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
      {/* {page && content ? (
        <ReactMarkdown
          children={content}
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[
            remarkGfm,
            // [remarkMermaid as any, { theme: "dark" }]
          ]}
          remarkRehypeOptions={{ allowDangerousHtml: true }}
        />
      ) : page ? (
        <div>Loading content...</div>
      ) : (
        <div className="mt-6">Please select a module to view its content.</div>
      )} */}
      <MoveReferenceContent compiledSource={compiledMdx} />
    </div>
  );
};

function parseFilters(params: ReadonlyURLSearchParams): URLParams {
  const branchFromParams = params.get("branch") as Branch;
  const pageFromParams = params.get("page");

  const branch = branches.includes(branchFromParams)
    ? branchFromParams
    : defaultBranch;
  // If 'page' parameter is not in the URL, return null for page
  const page = pageFromParams ? `${pageFromParams}` : null;

  return { branch, page };
}

function useURLParams() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = parseFilters(searchParams);

  const updateParams = (newParams: Partial<URLParams>) => {
    console.log("In updating params");
    const newSearchParams = new URLSearchParams();

    newSearchParams.set("branch", newParams.branch ?? params.branch);
    if (newParams.page) {
      newSearchParams.set("page", newParams.page);
    }

    router.push({ search: decodeURIComponent(newSearchParams.toString()) });
  };

  return { params, updateParams };
}

async function loadFrameworkData(
  branch: Branch,
  framework: Framework,
): Promise<FrameworkData> {
  // const pageUrl = `${root}/${branch}/aptos-move/framework/${framework}/doc/overview.md`;
  const pageUrl = `${root}/${branch}/aptos-move/framework/${framework}/mdx_doc/overview.md`;
  const response = await fetch(pageUrl);

  if (!response.ok) {
    throw new Error("Error loading framework data");
  }

  const rawContent = await response.text();
  const linksRegex = /\[(.+)\]\(([^ ]+?)( "(.+)")?\)/g;
  const pages = Array.from(rawContent.matchAll(linksRegex), (entry) => {
    const name = entry[1].replace(/`/gi, "");
    const page = entry[2].split("#")[0];
    // const id = `${framework}/doc/${page}`;
    const id = `${framework}/mdx_doc/${page}`;

    return { id, name };
  });

  return { framework, pages };
}

function useFrameworksData(branch: Branch) {
  const [pkgsData, setFrameworksData] = useState<FrameworkData[]>([]);

  useEffect(() => {
    Promise.all(pkgs.map((framework) => loadFrameworkData(branch, framework)))
      .then((data) => data.filter(Boolean))
      .then((frameworkData) => setFrameworksData(frameworkData ?? []));
  }, [branch]);

  return pkgsData;
}

export const MoveReference = () => {
  const {
    params: { branch, page },
    updateParams,
  } = useURLParams();
  const pkgsData = useFrameworksData(branch);

  return (
    <div className="move-reference-body">
      <div className="move-reference-nav">
        <TopNav
          branch={branch}
          onBranchChange={(branch) => updateParams({ branch })}
        />
        <ModulePageSelector
          pkgsData={pkgsData}
          selectedPage={page}
          onSelectPage={(page) => updateParams({ page })}
        />
      </div>
      <div className="move-reference-contents">
        <Content branch={branch} page={page} />
      </div>
    </div>
  );
};

export default MoveReference;
