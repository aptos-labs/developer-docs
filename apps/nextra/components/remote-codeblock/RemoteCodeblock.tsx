import { CodeBlock } from "@components/landing/components/CodeBlock";
import { CodeSnippet } from "./types";
import { useData } from "nextra/hooks";
import { highlightCode } from "utils/highlightCode";

export interface RemoteCodeblockProps {
  permalink: string;
}

export function RemoteCodeblock({ permalink }: RemoteCodeblockProps) {
  const data = useData();
  const snippetInfo: CodeSnippet = data[permalink];

  return (
    <CodeBlock codeSnippet={data} fileName={snippetInfo.filename} />
  )
}
