/* eslint-env node */
import { docsConfig } from "@docs-config";
import type { NextApiRequest, NextApiResponse, NextConfig } from "next";
import { buildDynamicMDX } from "nextra/remote";

export const config: NextConfig = {
  // runtime: "edge",
  api: {
    bodyParser: {
      sizeLimit: "500kb",
    },
  },
};

type ResponseData = {
  code: Awaited<ReturnType<typeof buildDynamicMDX>>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const body = req.body;
  const compileMdxOptions = {};
  const compiledMdx = await buildDynamicMDX(body, compileMdxOptions);
  res.status(200).json({ code: compiledMdx });
}
