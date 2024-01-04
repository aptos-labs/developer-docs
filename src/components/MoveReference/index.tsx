import React, { useEffect, useRef, useState } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { Select, Label, Button, ListBox, ListBoxItem, Popover, SelectValue, ComboBox, Input, Section, Header } from 'react-aria-components';
import { IconChevronDown } from '@tabler/icons-react';

const root = "https://raw.githubusercontent.com/aptos-labs/aptos-core";
const branches = ["mainnet", "testnet", "devnet", "main"];
const branchTitles = ["Mainnet", "Testnet", "Devnet", "Main"];
const frameworks = ["move-stdlib", "aptos-stdlib", "aptos-framework", "aptos-token", "aptos-token-objects"];
const defaultFramework = "move-stdlib";

const TopNav = ({ branch, onBranchChange }) => (
  <Select selectedKey={branch} onSelectionChange={onBranchChange}>
    <Label>Branch</Label>
    <Button>
      <SelectValue>{branchTitles[branches.indexOf(branch)]}</SelectValue>
      <IconChevronDown aria-hidden="true" />
    </Button>
    <Popover>
      <ListBox>
        {branches.map((b, index) => (
          <ListBoxItem key={b} id={b}>{branchTitles[index]}</ListBoxItem>
        ))}
      </ListBox>
    </Popover>
  </Select>
);

const FrameworkSelector = ({ frameworkData, selectedFramework, onSelectFramework }) => {
  const itemRefs = useRef({});
  const [isComboBoxOpen, setOpen] = useState(false);

  // Handler for framework selection changes
  const handleSelectionChange = (selectedFrameworkUrl) => {
    onSelectFramework(selectedFrameworkUrl);
  };

  useEffect(() => {
    if (isComboBoxOpen && selectedFramework && itemRefs.current[selectedFramework]) {
      itemRefs.current[selectedFramework].scrollIntoView({ behavior: "instant", block: "nearest" });
      
    }
  }, [selectedFramework, isComboBoxOpen]);

  return (
    <>
      Loaded: {selectedFramework}
<br></br>
      More: {itemRefs.current[selectedFramework]}
      <ComboBox 
        menuTrigger="focus" 
        defaultItems={frameworkData}
        onSelectionChange={handleSelectionChange}
        // selectedKey={frameworkData.find(f => f.id === selectedFramework)}
        defaultSelectedKey={selectedFramework}
        onOpenChange={setOpen}
        //defaultSelectedKey={itemRefs.url}
      >
        <Label>Framework</Label>
        <div>
          <Input placeholder="Select a framework" />
          <Button><IconChevronDown/></Button>
        </div>
        <Popover>
          <ListBox>
            {frameworkData.map(framework => (
              <Section key={framework.id}>
                <Header>{framework.name}</Header>
                {framework.content.map(item => (
                  <ListBoxItem 
                    key={item.name}
                    id={item.url} 
                    ref={el => itemRefs.current[item.name] = el} 
                  >
                    {item.name}
                  </ListBoxItem>
                ))}
              </Section>
            ))}
          </ListBox>
        </Popover>
      </ComboBox>
    </>
  );
};


const Content = ({ branch, page, onContentLoaded }) => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      const pagePath = `${root}/${branch}/aptos-move/framework/${page}`;
      const response = await fetch(pagePath);
      if (response.ok) {
        const rawContent = await response.text();
        setContent(rawContent);

        const nameMatch = rawContent.match(/<a name="([^"]+)">/);
        if (nameMatch && nameMatch[1]) {
          onContentLoaded(nameMatch[1]);
        }
      }
    };

    if (page) {
      fetchContent();
    }
  }, [branch, page, onContentLoaded]);

  return (
    <div className="move-content">
      {content ? (
        <ReactMarkdown
          children={content}
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[remarkGfm]}
          remarkRehypeOptions={{ allowDangerousHtml: true }}
        />
      ) : (
        <div>Loading content...</div>
      )}
    </div>
  );
};

const MoveReference = () => {
  const [branch, setBranch] = useState("mainnet");
  const [page, setPage] = useState(`${defaultFramework}/doc/overview.md`);
  const [frameworkData, setFrameworkData] = useState([]);
  const [selectedFramework, setSelectedFramework] = useState("");

  useEffect(() => {
    const fetchFrameworkData = async () => {
      const data = await Promise.all(frameworks.map(async (framework) => {
        const pageUrl = `${root}/${branch}/aptos-move/framework/${framework}/doc/overview.md`;
        const response = await fetch(pageUrl);
        if (!response.ok) return null;

        const rawContent = await response.text();
        const linksRegex = /\[(.+)\]\(([^ ]+?)( "(.+)")?\)/g;
        const content = Array.from(rawContent.matchAll(linksRegex), entry => ({
          name: entry[1].replaceAll("`", ""),
          url: `${framework}/doc/${entry[2]}`
        }));

        return { id: framework, name: framework, content };
      }));

      setFrameworkData(data.filter(Boolean));
    };

    fetchFrameworkData();
  }, [branch]);

  useEffect(() => {
    if (ExecutionEnvironment.canUseViewport) {
      const currentUrl = new URL(window.location.href);
      const params = new URLSearchParams(currentUrl.search);

      const branchFromURL = params.get("branch") ?? "mainnet";
      const pageFromURL = params.get("page") ?? `${defaultFramework}/doc/overview.md`;

      setBranch(branchFromURL);
      setPage(pageFromURL);
    }
  }, []);

  const updateURL = (newBranch, newPage) => {
    const newUrl = new URL(window.location.origin + window.location.pathname);
    newUrl.searchParams.set("branch", newBranch || branch);
    newUrl.searchParams.set("page", newPage || page);
    // Use decodeURIComponent for a clean URL
    const cleanUrl = decodeURIComponent(newUrl.toString());
    window.history.pushState({}, '', cleanUrl);
  };

  const handleBranchChange = (newBranch) => {
    setBranch(newBranch);
    updateURL(newBranch, page);
  };

  const handleFrameworkSelect = (selectedFrameworkUrl) => {
    setPage(selectedFrameworkUrl);
    setSelectedFramework(selectedFrameworkUrl);
    updateURL(null, selectedFrameworkUrl);
  };

  const handleContentLoaded = (extractedValue) => {
    setSelectedFramework(extractedValue);
  };


  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => (
        <div className="move-reference-body">
          <div className="move-reference-nav">
          <TopNav branch={branch} onBranchChange={handleBranchChange} />
            <FrameworkSelector 
              frameworkData={frameworkData} 
              selectedFramework={selectedFramework}
              onSelectFramework={handleFrameworkSelect} />
          </div>
          <div className="move-reference-contents">
            <Content 
              branch={branch} 
              page={page} 
              onContentLoaded={handleContentLoaded} />
          </div>
        </div>
      )}
    </BrowserOnly>
  );
};

export default MoveReference;
