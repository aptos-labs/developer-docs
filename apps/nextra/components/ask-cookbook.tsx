import React from "react";
import dynamic from "next/dynamic";
const BaseAskCookbook = dynamic(() => import("@cookbookdev/docsbot/react"), {
  ssr: false,
});

/** It's a public API key, so it's safe to expose it here */
const COOKBOOK_PUBLIC_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmJlNDk2ODZkMjk4YjBkZjY5OWI2ODAiLCJpYXQiOjE3MjM3NDY2NjQsImV4cCI6MjAzOTMyMjY2NH0.3zwEhqNMT4wpvUiAx5LJABDIkfy_P0JZetx7wwUQJJc";

export default function AskCookbook() {
  return (
    <>
      <BaseAskCookbook apiKey={COOKBOOK_PUBLIC_API_KEY} />
    </>
  );
}
