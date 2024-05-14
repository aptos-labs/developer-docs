import React from "react";
import dynamic from "next/dynamic";
import type { Fetcher } from "@graphiql/toolkit";
import type { GraphiQLProps } from "graphiql";
import "graphiql/graphiql.min.css";

const GraphiQL: React.FunctionComponent<GraphiQLProps> = dynamic(
  () => import("graphiql"),
  {
    loading: () => <div>Loading...</div>,
    ssr: false,
  },
) as any;

const fetcher: Fetcher = async (graphQLParams) => {
  const data = await fetch("https://api.mainnet.aptoslabs.com/v1/graphql", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(graphQLParams),
    credentials: "same-origin",
  });
  return data.json<any>().catch(() => data.text());
};

export const OLD_GraphQL = () => {
  return <GraphiQL fetcher={fetcher}></GraphiQL>;
};

export default OLD_GraphQL;
