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
