import { ReadonlyURLSearchParams } from "next/navigation";
import { createContext, useCallback, useContext } from "react";
import { useRouter } from "nextra/hooks";
import { useSearchParams } from "next/navigation";
import { Branch, BRANCHES, DEFAULT_BRANCH } from "./shared";

export type URLParams = { branch: Branch; page: string | null };

export function parseFilters(params: ReadonlyURLSearchParams): URLParams {
  const branchFromParams = params.get("branch") as Branch;
  const pageFromParams = params.get("page");

  const branch = BRANCHES.includes(branchFromParams)
    ? branchFromParams
    : DEFAULT_BRANCH;
  // If 'page' parameter is not in the URL, return null for page
  const page = pageFromParams ? `${pageFromParams}` : null;

  return { branch, page };
}

export function useURLParams() {
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

  /**
   * Updates the 'branch' parameter in the URL.
   * @param newBranch The new branch value to set.
   */
  const updateBranch = useCallback(
    (newBranch: Branch) => {
      console.log("Updating branch to:", newBranch);
      const newSearchParams = new URLSearchParams(searchParams.toString());

      newSearchParams.set("branch", newBranch);

      router.push(`?${newSearchParams.toString()}`);
    },
    [searchParams, router],
  );

  /**
   * Updates the 'page' parameter in the URL.
   * @param newPage The new page value to set. If null, removes the 'page' parameter.
   */
  const updatePage = useCallback(
    (newPage: string | null) => {
      console.log("Updating page to:", newPage);
      const newSearchParams = new URLSearchParams(searchParams.toString());

      if (newPage !== null) {
        newSearchParams.set("page", newPage);
      } else {
        newSearchParams.delete("page");
      }

      router.push(`?${newSearchParams.toString()}`);
    },
    [searchParams, router],
  );

  return {
    params,
    updateParams,
    updateBranch,
    updatePage,
    branch: params.branch,
    page: params.page,
  };
}

interface MoveReferenceContextProps {
  branch: URLParams["branch"];
  page: URLParams["page"];
  updateBranch: (newBranch: URLParams["branch"]) => void;
  updatePage: (newPage: string | null) => void;
}

export const MoveReferenceContext = createContext<
  MoveReferenceContextProps | undefined
>(undefined);

MoveReferenceContext.displayName = "MoveReferenceContext";

export const useMoveReference = (): MoveReferenceContextProps => {
  const context = useContext(MoveReferenceContext);
  if (!context) {
    throw new Error(
      "useMoveReference must be used within a MoveReferenceProvider",
    );
  }
  return context;
};
