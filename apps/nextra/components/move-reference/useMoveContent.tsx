import {
  type UndefinedInitialDataOptions,
  useQuery,
} from "@tanstack/react-query";
import { GITHUB_APTOS_CORE } from "./shared";
import { URLParams } from "./MoveReferenceProvider";
import {
  astToMarkdown,
  markdownToMdx,
  readMarkdownString,
} from "@aptos-labs/nextra-components";

interface FetchContentParams {
  page: string | null;
  // isMounted: boolean;
  branch: URLParams["branch"];
}

const fetchContent = async ({ page, branch }: FetchContentParams) => {
  // TODO used to have isMounted, but was not used
  if (page) {
    const pagePath = `${GITHUB_APTOS_CORE}/${branch}/aptos-move/framework/${page}`;
    // const pagePath = "https://raw.githubusercontent.com/aptos-labs/aptos-core/main/aptos-move/framework/aptos-stdlib/doc/table.md"
    const response = await fetch(pagePath);
    if (response.ok) {
      const rawContent = await response.text();
      const tree = readMarkdownString(rawContent);
      markdownToMdx(tree);
      const mdxString = astToMarkdown(tree);
      return mdxString;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export type FetchContentReturnType = Awaited<ReturnType<typeof fetchContent>>;

type GetQueryKeyParams = Omit<FetchContentParams, "isMounted">;

const getQueryKey = ({ page, branch }: GetQueryKeyParams) => {
  return ["move-content", page, branch];
};

type QueryKeyReturn = ReturnType<typeof getQueryKey>;

export interface UseMoveContentParams {
  args: GetQueryKeyParams;
  options?: UndefinedInitialDataOptions<
    FetchContentReturnType,
    Error,
    FetchContentReturnType,
    QueryKeyReturn
  >;
}

export const useMoveContent = ({ args, options }: UseMoveContentParams) => {
  return useQuery<
    FetchContentReturnType,
    Error,
    FetchContentReturnType,
    QueryKeyReturn
  >({
    ...options,
    queryKey: getQueryKey({ ...args }),
    queryFn: async () => {
      const result = await fetchContent(args);
      return result;
    },
  });
};
