"use client";

import { useEffect } from "react";

export interface PreloadSearchProps {}

/**
 * Hack to Preloads Search by making a search request, then clearing it.
 *
 * NOTE: This must be client-side only as it includes a useEffect hook.
 *
 * @see https://github.com/shuding/nextra/blob/v3/packages/nextra-theme-docs/src/components/flexsearch.tsx
 * @see https://github.com/shuding/nextra/blob/v3/packages/nextra-theme-docs/src/components/search.tsx
 */
export function PreloadSearch(): JSX.Element | null {
  useEffect(() => {
    // Try desktop nav container first
    let container = document.querySelector(".nextra-nav-container");

    // Fallback to mobile sidebar container
    if (!container) {
      container = document.querySelector(".nextra-sidebar-container");
    }

    if (!container) return;

    const input = container.querySelector(
      'input[type="search"]',
    ) as HTMLInputElement;
    if (!input) return;

    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value",
    )?.set;

    nativeInputValueSetter?.call(input, "warmup");
    input.dispatchEvent(new Event("input", { bubbles: true }));

    setTimeout(() => {
      nativeInputValueSetter?.call(input, "");
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }, 500);
  }, []);

  return null;
}

export default PreloadSearch;
