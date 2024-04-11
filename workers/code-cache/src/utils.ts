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
 * Check API Key Hash
 *
 * Remove later lol, this doesn't solve the problem
 *
 * User should submit the SHA256(API_KEY) in requests as a hex string
 * Check to see if the correct API keys is set
 */
export async function checkApiKeyHash(request: IttyRequest, env: Env) {
  if (!request.query) {
    throw new Error("No query parameters set");
  }
  if (!request.query["apiKeyHash"]) {
    throw new Error("No API Key Hash set");
  }

  const apiKeyHash = request.query["apiKeyHash"];
  const expectedApiKeyHash = await getSha256Digest(env.API_TOKEN);

  if (apiKeyHash !== expectedApiKeyHash) {
    throw new Error("Incorrect API Key Hash set");
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
  const allowedOrigins = ["https://aptos.dev"];
  console.log(env.ENVIRONMENT);
  if (env.ENVIRONMENT === "dev") {
    allowedOrigins.push("http://localhost");
  }

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

    return headers;
  } else {
    throw new Error("Error: Invalid origin");
  }
}
