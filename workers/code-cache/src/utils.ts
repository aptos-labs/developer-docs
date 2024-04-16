import type { Request as IttyRequest } from "itty-router";
import type { Env, WorkersRequest } from ".";
import type { UnifiedReturnReturnType } from "./github";
import { json } from "itty-router-extras";

export async function getSha256Digest(message: string) {
  // Convert the message string to an ArrayBuffer
  const encoder = new TextEncoder();
  const data = encoder.encode(message);

  // Calculate the SHA-256 digest
  const digestBuffer = await crypto.subtle.digest(
    {
      name: "SHA-256",
    },
    data, // The data you want to hash as an ArrayBuffer
  );

  // Convert the ArrayBuffer to a hexadecimal string
  const hashArray = Array.from(new Uint8Array(digestBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}

/**
 * Check API Key
 *
 * Check to see if the correct API key is set
 */
export function checkApiKey(request: WorkersRequest, env: Env) {
  let apiKey = request.headers.get("x-api-key");
  
  if (!apiKey || apiKey !== env.API_KEY) {
    throw new Error("Incorrect API Key set in request headers [x-api-key]");
  }
  
  return;
}

type ResponseWrapper = {
  status: "success" | "error";
  status_code: 200 | 400 | 403;
  data: UnifiedReturnReturnType | UnifiedReturnReturnType[] | null;
  message?: string;
};

/**
 * Wraps response nicely into format
 *
 * ```ts
 * {
 *   status: "success" | "error",
 *   data: null | T,
 *   status_code: 200 | 400 | 403
 * }
 * ```
 */
export function wrap(props: Omit<ResponseWrapper, "status">): Response {
  const status = props.status_code === 200 ? "success" : "error";

  return json({
    status,
    ...props,
  });
}

/**
 * Middleware to check / set CORS headers
 *
 * Endpoint should only be accessible from https://aptos.dev
 * unless wrangler is run in dev mode
 */
export function setCORSHeaders(request: WorkersRequest, env: Env) {
  let origin = request.headers.get("Origin") || "";
  let headers = new Headers();

  // Define allowed origins based on the environment
  const allowedOrigins = [
    "*.aptos.dev",
    "*.vercel.app",
    "http://localhost",
  ];

  // Check if the origin is allowed
  const isAllowedOrigin = allowedOrigins.some((allowedOrigin) => {
    return origin === allowedOrigin || origin.endsWith("." + allowedOrigin);
  });

  if (isAllowedOrigin) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS",
    );
    headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    headers.set("Access-Control-Allow-Credentials", "true");
  } else {
    throw new Error("Error: Invalid origin");
  }
}
