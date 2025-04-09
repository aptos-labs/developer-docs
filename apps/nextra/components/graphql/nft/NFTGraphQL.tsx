import React from "react";
import { Fetcher } from "@graphiql/toolkit";
import { GraphiQL } from "../NonDynamicGraphQL";
import { useForm, FormProvider } from "react-hook-form";
import "graphiql/graphiql.min.css";

const NETWORK_URL =
  "https://api.mainnet.aptoslabs.com/nft-aggregator-staging/v1/graphql" as const;

const fetcher: Fetcher = async (graphQLParams) => {
  try {
    const response = await fetch(NETWORK_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphQLParams),
      credentials: "same-origin",
    });

    // Handle non-200 responses
    if (!response.ok) {
      return {
        data: null,
        errors: [
          {
            message: `HTTP Error: ${response.status} ${response.statusText}`,
          },
        ],
      };
    }

    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      const result = await response.json();
      // Ensure we have a properly structured GraphQL response
      if (!result.data && !result.errors) {
        return {
          data: null,
          errors: [{ message: "Invalid GraphQL response format" }],
        };
      }
      return result;
    }

    // For non-JSON responses, try to get meaningful content
    const textContent = await response.text();
    return {
      data: null,
      errors: [
        {
          message: textContent || "Received non-JSON response from server",
        },
      ],
    };
  } catch (error) {
    console.error("GraphQL fetch error:", error);
    return {
      data: null,
      errors: [
        {
          message:
            error instanceof Error
              ? error.message
              : "Failed to fetch data from server",
        },
      ],
    };
  }
};

type FormValues = {
  network: "mainnet";
};

export interface NFTGraphQLEditorProps {
  query: string;
  variables?: string;
}

export const NFTGraphQLEditor = ({
  query,
  variables,
}: NFTGraphQLEditorProps) => {
  const methods = useForm<FormValues>({
    defaultValues: {
      network: "mainnet",
    },
  });

  return (
    <FormProvider {...methods}>
      <form className="2xl:max-w-[1136px] xl:max-w-[1136px] w-full lg:max-w-[calc(100vw - 256px)] overflow-x-auto">
        <GraphiQL
          defaultQuery={query}
          fetcher={fetcher}
          variables={variables}
          disableTabs={true}
        />
      </form>
    </FormProvider>
  );
};

export default NFTGraphQLEditor;
