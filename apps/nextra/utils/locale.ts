import { localeMap } from "./generated/localeMap";

/**
 * Remove Locale From Pathname
 *
 * Locale should be the content beginning from the first trailing slash
 * up until the second trailing slash
 *
 * @example
 * ```
 * "/en/first" -> "/first"
 * ```
 */
export const removeLocaleFromPathname = (pathname: string) => {
  const parts = pathname.split("/");
  if (parts.length > 2) {
    return "/" + parts.slice(2).join("/");
  }
  return pathname;
};

export interface CheckIfEnglishPathAvailableReturnType {
  isEnglishPathAvailable: boolean;
  redirectUrl: string | undefined;
}

/**
 * Check to see if English pathname is available for a given route
 */
export const checkIfEnglishPathAvailable = (
  pathname: string | null,
): CheckIfEnglishPathAvailableReturnType => {
  if (!pathname) {
    return {
      isEnglishPathAvailable: false,
      redirectUrl: undefined,
    };
  }

  const revisedPathname = removeLocaleFromPathname(pathname);
  if (
    localeMap[revisedPathname] !== undefined &&
    localeMap[revisedPathname]["en"] === true
  ) {
    return {
      isEnglishPathAvailable: true,
      redirectUrl: `/en${revisedPathname}`,
    };
  }

  return {
    isEnglishPathAvailable: false,
    redirectUrl: undefined,
  };
};
