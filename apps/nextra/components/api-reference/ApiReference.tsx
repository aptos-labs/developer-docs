"use client";

import { ApiReferenceReact } from "@scalar/api-reference-react";
import { useTheme } from "nextra-theme-docs";
import { useData } from "nextra/hooks";
import { useRouter } from "nextra/hooks";
import {
  ChangeEventHandler,
  cloneElement,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";

import "@scalar/api-reference-react/style.css";
import { convertDarkMode } from "./utils";
import { createPortal } from "react-dom";

/**
 * Network to Fullnode REST API endpoint mapping
 */
export const networkReferencesMap = Object.freeze({
  mainnet: "https://api.mainnet.aptoslabs.com",
  testnet: "https://api.testnet.aptoslabs.com",
  devnet: "https://api.devnet.aptoslabs.com",
});

const Portal = ({ children, network, selector }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const target = document.querySelector(selector);
      if (target) {
        setElement(target);
        setMounted(true);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [selector, network]);

  return mounted && element
    ? createPortal(
        cloneElement(children, {
          ref: (node) => {
            if (node && element.firstChild !== node) {
              element.insertBefore(node, element.firstChild);
            }
          },
        }),
        element,
      )
    : null;
};

interface SelectNetworkProps {}

/**
 * Select Network
 *
 * Allows the user to select between Mainnet, Testnet, and Devnet
 * when viewing the Fullnode REST API docs. Pushes query parameters
 * for the network to the url on switching
 */
export const SelectNetwork = forwardRef<HTMLDivElement, SelectNetworkProps>(
  ({}, ref) => {
    const router = useRouter();

    const switchNetwork: ChangeEventHandler<HTMLSelectElement> = (event) => {
      const network = event.currentTarget.value;
      const currentPath = router.pathname;
      const currentQuery = { ...router.query, network };

      router.push({
        pathname: currentPath,
        query: currentQuery,
      });
    };

    const currentNetwork = router.query["network"];

    return (
      <div
        ref={ref}
        id="select-network-container"
        className="px-[12px] pt-[12px] pb-0"
      >
        <div
          style={{
            boxShadow:
              "0 0 0 1px var(--scalar-sidebar-search-border-color, var(--scalar-border-color))",
          }}
          className="text-gray-900 text-sm rounded-[var(--scalar-radius)] w-full pr-2.5  dark:placeholder-gray-400 dark:text-white"
        >
          <select
            className="w-full bg-transparent focus:outline-none focus:ring-0 p-2.5"
            id="select-network"
            onChange={switchNetwork}
            value={currentNetwork}
          >
            <option value="mainnet">Mainnet</option>
            <option value="testnet">Testnet</option>
            <option value="devnet">Devnet</option>
          </select>
        </div>
      </div>
    );
  },
);

/**
 * API Reference
 *
 * Uses Scalar for Fullnode Reference API Playground.
 * Must be used with `getStaticProps` in order to fetch
 * the OpenAPI spec
 */
export function ApiReference() {
  const { theme } = useTheme();
  const { reference } = useData();
  const router = useRouter();
  const selectNetworkRef = useRef<HTMLDivElement>(null);

  const { network } = router.query;
  const baseServerURL =
    typeof network === "string"
      ? networkReferencesMap[network]
      : networkReferencesMap["mainnet"];

  useEffect(() => {
    const sidebarElement = document.querySelector(".sidebar");
    const selectNetworkElement = selectNetworkRef.current;

    if (sidebarElement && selectNetworkElement) {
      sidebarElement.insertBefore(
        selectNetworkElement,
        sidebarElement.firstChild?.nextSibling || null,
      );
    }
  }, [network]); // Ensure the effect runs on network change

  return (
    <div>
      <Portal network={network} selector=".sidebar">
        <SelectNetwork />
      </Portal>
      <ApiReferenceReact
        key={baseServerURL}
        configuration={{
          baseServerURL,
          spec: {
            content: {
              ...reference,
              servers: [{ url: `${baseServerURL}/v1` }],
            },
          },
          darkMode: convertDarkMode(theme) === "dark",
        }}
      />
    </div>
  );
}

export default ApiReference;
