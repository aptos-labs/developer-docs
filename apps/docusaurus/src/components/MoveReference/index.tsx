import React, { useEffect, useMemo, useRef, useState } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMermaid from "remark-mermaid-plugin";
import {
  Select,
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
import { useLocation, useHistory } from "@docusaurus/router";

const root = "https://raw.githubusercontent.com/aptos-labs/aptos-core";
const branches = ["mainnet", "testnet", "devnet", "main"] as const;
const defaultBranch = branches[0];
const branchTitles: Record<Branch, string> = {
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
type URLParams = { branch: Branch; page: string };

type TopNavProps = {
  branch: Branch;
  onBranchChange: (branch: Branch) => void;
};

const TopNav = ({ branch, onBranchChange }: TopNavProps) => (
  <Select selectedKey={branch} onSelectionChange={onBranchChange}>
    <Label>Branch</Label>
    <Button>
      <SelectValue>{branchTitles[branch]}</SelectValue>
      <IconChevronDown aria-hidden="true" />
    </Button>
    <Popover>
      <ListBox>
        {branches.map((branch) => (
          <ListBoxItem key={branch} id={branch}>
            {branchTitles[branch]}
          </ListBoxItem>
        ))}
      </ListBox>
    </Popover>
  </Select>
);

type ModulePageSelectorProps = {
  pkgsData: FrameworkData[];
  selectedPage: string;
  onSelectPage: (newPage: string) => void;
};

const ModulePageSelector = ({
  pkgsData,
  selectedPage,
  onSelectPage,
}: ModulePageSelectorProps) => {
  const itemRefs = useRef({});
  const items = useMemo(
    () => pkgsData.flatMap((frameworkData) => frameworkData.pages),
    [pkgsData],
  );
  const [isComboBoxOpen, setOpen] = useState(false);
  const comboBoxKey = selectedPage || "none";

  useEffect(() => {
    if (isComboBoxOpen && itemRefs.current[selectedPage]) {
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
    <div className="d-flex">
      <ComboBox
        defaultItems={items}
        defaultSelectedKey={selectedPage}
        defaultInputValue={selectedPage}
        menuTrigger="focus"
        onSelectionChange={onSelectPage}
        onOpenChange={setOpen}
        key={comboBoxKey}
      >
        <Label>Module</Label>
        <div className="d-flex align-items-center pl-2">
          <Input placeholder="Select a module" />
          <Button>
            <IconChevronDown />
          </Button>
          {selectedPage && (
            <a className="form-reset" href="#" onClick={handleClear}>
              Clear
            </a>
          )}
        </div>
        <Popover>
          <ListBox>
            {pkgsData.map((frameworkData) => (
              <Section key={frameworkData.framework}>
                <Header>{frameworkData.framework}</Header>
                {frameworkData.pages.map((item) => (
                  <ListBoxItem
                    key={item.id}
                    id={item.id}
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
  page: string;
};

const Content = ({ branch, page }: ContentProps) => {
  const [content, setContent] = useState(null);
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    const fetchContent = async () => {
      if (page && isMounted) {
        const pagePath = `${root}/${branch}/aptos-move/framework/${page}`;
        const response = await fetch(pagePath);
        if (response.ok) {
          const rawContent = await response.text();
          setContent(rawContent);
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
    if (content && location.hash) {
      const hash = location.hash;
      window.location.hash = "";
      window.location.hash = hash;
    }
  }, [content, location.hash]);

  // Conditional rendering based on whether a page is selected
  return (
    <div className="move-content">
      {page && content ? (
        <ReactMarkdown
          children={content}
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[remarkGfm, [remarkMermaid as any, { theme: "dark" }]]}
          remarkRehypeOptions={{ allowDangerousHtml: true }}
        />
      ) : page ? (
        <div>Loading content...</div>
      ) : (
        <div>Please select a module to view its content.</div>
      )}
    </div>
  );
};

function parseFilters(searchParams: string): URLParams {
  const params = new URLSearchParams(searchParams);
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
  const history = useHistory();
  const location = useLocation();
  const params = parseFilters(location.search);

  const updateParams = (newParams: Partial<URLParams>) => {
    const newSearchParams = new URLSearchParams();

    newSearchParams.set("branch", newParams.branch ?? params.branch);
    if (newParams.page) {
      newSearchParams.set("page", newParams.page);
    }

    history.push({ search: decodeURIComponent(newSearchParams.toString()) });
  };

  return { params, updateParams };
}

async function loadFrameworkData(
  branch: Branch,
  framework: Framework,
): Promise<FrameworkData | null> {
  const pageUrl = `${root}/${branch}/aptos-move/framework/${framework}/doc/overview.md`;
  const response = await fetch(pageUrl);

  if (!response.ok) {
    return null;
  }

  const rawContent = await response.text();
  const linksRegex = /\[(.+)\]\(([^ ]+?)( "(.+)")?\)/g;
  const pages = Array.from(rawContent.matchAll(linksRegex), (entry) => {
    const name = entry[1].replace(/`/gi, "");
    const page = entry[2].split("#")[0];
    const id = `${framework}/doc/${page}`;

    return { id, name };
  });

  return { framework, pages };
}

function useFrameworksData(branch: Branch) {
  const [pkgsData, setFrameworksData] = useState<FrameworkData[]>([]);

  useEffect(() => {
    Promise.all(pkgs.map((framework) => loadFrameworkData(branch, framework)))
      .then((data) => data.filter(Boolean))
      .then(setFrameworksData);
  }, [branch]);

  return pkgsData;
}

const MoveReference = () => {
  const {
    params: { branch, page },
    updateParams,
  } = useURLParams();
  const pkgsData = useFrameworksData(branch);

  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => (
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
      )}
    </BrowserOnly>
  );
};

export default MoveReference;
