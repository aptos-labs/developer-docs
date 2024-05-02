import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  type SandpackFiles,
  SandpackConsole,
  SandpackFileExplorer,
  OpenInCodeSandboxButton,
  useSandpackPreviewProgress,
  SandpackTests,
  useSandpack,
  SandpackPreviewRef,
  LoadingOverlay,
} from "@codesandbox/sandpack-react";
import {
  aptosTsSdkDeps,
  aptosTsSdkDevDeps,
  generateAptosTsSdkPackageJsonString,
} from "./constants";
import { useData } from "nextra/hooks";
import type {
  CodecacheSSGProps,
  ParsedCodeSnippet,
} from "../remote-codeblock/types";
import { commonMap, prefixKeysWithSlash, transformPermalinkMap } from "./utils";
import { CSSProperties, PropsWithChildren, useRef } from "react";
import { useTheme } from "nextra-theme-docs";
import { cn } from "utils/cn";
import { CodeblockHeader } from "..";

interface SandpackTSProps {
  files?: SandpackFiles;
  remoteFiles?: SandpackFiles;
}

type SandpackWrapperProps = PropsWithChildren<{
  className?: string;
}> &
  SandpackTSProps;

function SandpackWrapper({
  children,
  className,
  remoteFiles,
  files,
  ...props
}: SandpackWrapperProps) {
  const { theme: nextraTheme } = useTheme();
  const theme: "light" | "dark" =
    nextraTheme === "system"
      ? "dark"
      : (nextraTheme as "light" | "dark") ?? "dark";
  const data: CodecacheSSGProps<ParsedCodeSnippet>["props"]["ssg"] = useData();

  const fileMap = remoteFiles
    ? {
        ...files,
        ...commonMap(remoteFiles, transformPermalinkMap(data)),
      }
    : { ...files };

  const entry =
    Object.keys(fileMap).length === 1 ? Object.keys(fileMap)[0] : undefined;

  // fileMap["package.json"] = generateAptosTsSdkPackageJsonString({ entry });

  const activeFile = entry;
  const visibleFiles = Object.keys(fileMap);

  return (
    <div className={cn("mt-6", className)} {...props}>
      {/* <CodeblockHeader>
        <div>hello!</div>
      </CodeblockHeader> */}
      <SandpackProvider
        theme={(theme as "light" | "dark") || "dark"}
        template="vanilla-ts"
        customSetup={{
          entry,
          // environment: "node",
          dependencies: aptosTsSdkDeps,
          devDependencies: aptosTsSdkDevDeps,
        }}
        options={{
          activeFile,
          visibleFiles,
          autorun: true,
          autoReload: true,
        }}
        files={fileMap}
      >
        {children}
      </SandpackProvider>
    </div>
  );
}

/**
 * Sandpack React Component
 *
 */
export function SandpackReact() {
  return (
    <SandpackProvider theme={"dark"} template="react">
      <SandpackLayout>
        <SandpackCodeEditor />
        <SandpackPreview />
      </SandpackLayout>
    </SandpackProvider>
  );
}

const commonStyles: CSSProperties = {
  height: "400px",
};

export function SandpackTSCore({ files, remoteFiles }: SandpackTSProps) {
  const sandpack = useSandpack();
  const previewRef = useRef<SandpackPreviewRef>(null);
  const clientId = previewRef.current?.clientId;
  const loading = useSandpackPreviewProgress({ clientId });

  console.log(loading);

  return (
    <>
      <SandpackLayout
        style={{
          borderBottomRightRadius: "0px",
          borderBottomLeftRadius: "0px",
        }}
      >
        {/* <SandpackFileExplorer style={{ ...commonStyles }} /> */}
        <LoadingOverlay showOpenInCodeSandbox />
        <SandpackPreview
          ref={previewRef}
          style={{ width: "0px", display: "none" }}
        />
        <SandpackCodeEditor
          style={{
            ...commonStyles,
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "0px",
          }}
          showLineNumbers={true}
        />
        <div className="absolute bottom-2 right-20">
          <OpenInCodeSandboxButton />
        </div>
      </SandpackLayout>
      <div>
        {/* <LoadingOverlay showOpenInCodeSandbox /> */}
        <SandpackConsole
          standalone
          style={{
            height: "300px",
            borderBottomLeftRadius: "4px",
            borderBottomRightRadius: "4px",
          }}
        />
      </div>
    </>
  );
}

/**
 * Sandpack Typescript Component
 *
 * `files` or `remoteFiles` can be used to pass in code snippets
 *
 * @param files       enables the user to pass in a hard-coded set of filenames
 *                    and associated code snippets
 * @param remoteFiles enables the user to pass in a set of filenames and associated
 *                    github permalinks
 */
export function SandpackTS(props: SandpackTSProps) {
  const data: CodecacheSSGProps<ParsedCodeSnippet>["props"]["ssg"] = useData();
  const { remoteFiles } = props;
  if (!data && remoteFiles) {
    throw new Error(
      "Error: No data is provided via static props, please ensure you are using getStaticProps with this component",
    );
  }

  return (
    <SandpackWrapper {...props}>
      <SandpackTSCore {...props} />
    </SandpackWrapper>
  );
}
