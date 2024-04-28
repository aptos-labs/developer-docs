import type { DrizzleD1Database } from "drizzle-orm/d1";
import { drizzle } from "drizzle-orm/d1";
import { eq, inArray, like, and } from "drizzle-orm/expressions";
import type { Request as IttyRequest, Route } from "itty-router";
import { Router } from "itty-router";
import { codecache } from "./schema";
import { fetchCodeSnippetFromGithub, unifiedReturn } from "./github";
import { checkApiKey, setCORSHeaders, wrap } from "./utils";

export * from './github'

export interface Env {
  DB: D1Database;
  API_KEY: string;
  ENVIRONMENT: string;
}

export interface WorkersRequest extends IttyRequest {
  db: DrizzleD1Database;
  headers: Request["headers"];
}

interface Methods {
  get: Route;
  post: Route;
}

type GithubPermalinks = { github_permalinks: string[] };

/**
 * Middleware
 *
 * 1. Inject DB
 * 2. Set CORS Headers
 */
// @ts-ignore
async function middleware(request: WorkersRequest, env: Env) {
  try {
    setCORSHeaders(request, env);
    checkApiKey(request, env);
  } catch (err) {
    return wrap({
      data: null,
      status_code: 400,
      message: `${(err as any).message}`,
    });
  }

  // Drizzle doesn't support adding schema to sqlite
  const db = drizzle(env.DB);
  request.db = db;
}

const router = Router<WorkersRequest, Methods>({ base: "/" });

/**
 * GET /codecache
 *
 * Gets all of the permalinks in the DB and their corresponding code
 * snippet information
 */
router.get("/codecache", middleware, async (req: WorkersRequest, env: Env) => {
  try {
    const query = req.db.select().from(codecache);
    const response = await query.all();
    return wrap({ data: unifiedReturn(response), status_code: 200 });
  } catch (err) {
    return wrap({
      data: null,
      status_code: 400,
      message: `${(err as any).message}`,
    });
  }
});

/**
 * GET /codecache/repos?github_repo={}
 *
 * Gets all of the permalinks corresponding to a repo
 * snippet information
 *
 * This is primarily to determine if certain permalinks
 * are out of date
 */
router.get(
  "/codecache/repos",
  middleware,
  async (req: WorkersRequest, env: Env) => {
    try {
      if (req.query) {
        const github_repo = req.query["github_repo"];
        const response = await req.db
          .select()
          .from(codecache)
          .where(
            and(
              like(codecache.github_permalink, `%${github_repo}%`),
              eq(codecache.used_in_latest_docs, true),
            ),
          )
          .all();
        return wrap({
          data: unifiedReturn(response),
          status_code: 200,
        });
      }
      const query = req.db.select().from(codecache);
      const response = await query.all();
      return wrap({ data: unifiedReturn(response), status_code: 200 });
    } catch (err) {
      return wrap({
        data: null,
        status_code: 400,
        message: `${(err as any).message}`,
      });
    }
  },
);

// Maybe revisit this if performance is an issue
const updateAllPermalinksSql = `
UPDATE codecache
SET used_in_latest_docs = CASE
  WHEN github_permalink IN ('permalink1', 'permalink2', 'permalink3') THEN 1
  ELSE 0
END;
`;

/**
 * POST /codecache/used-in-latest-docs
 *
 * Body includes array of strings `github_permalinks` (permalinks that should be updated)
 *
 * If a github_permalink is not included in the array, it will be marked as
 * `used_in_latest_docs` false, else, true
 *
 * This is primarily to determine if certain permalinks in the docs
 * are out of date
 */
router.post(
  "/codecache/used-in-latest-docs",
  middleware,
  async (req: WorkersRequest, env: Env) => {
    try {
      const { github_permalinks }: GithubPermalinks = await req.json!();

      await req.db
        .update(codecache)
        .set({ used_in_latest_docs: false })
        .returning()
        .all();

      const result = await req.db
        .update(codecache)
        .set({ used_in_latest_docs: true })
        .where(inArray(codecache.github_permalink, github_permalinks))
        .returning()
        .all();

      return wrap({ data: unifiedReturn(result), status_code: 200 });
    } catch (err) {
      return wrap({
        data: null,
        status_code: 400,
        message: `${(err as any).message}`,
      });
    }
  },
);

/**
 * POST /codecache/code
 *
 * Fetches a specific permalink
 * Could also be a GET request, but github_permalink looks a bit strange
 * as a query parameter
 */
router.post(
  "/codecache/code",
  middleware,
  async (req: WorkersRequest, env: Env) => {
    try {
      const { github_permalink } = await req.json!();

      if (!github_permalink) {
        throw new Error("github_permalink was not found in request body");
      }

      const result = await req.db
        .select()
        .from(codecache)
        .where(eq(codecache.github_permalink, github_permalink))
        .get();

      if (result) {
        return wrap({
          data: unifiedReturn([result]),
          status_code: 200,
        });
      }

      return wrap({
        data: null,
        message: "Error: not found",
        status_code: 400,
      });
    } catch (err) {
      return wrap({
        data: null,
        status_code: 400,
        message: `${(err as any).message}`,
      });
    }
  },
);

/**
 * POST /codecache
 *
 * This is the primary endpoint here. Given an arary of github_permalinks
 * It checks to see if a github_permalink is cached in sqlite.
 *
 * If yes, it returns the cached code snippet.
 * If not, it fetches and caches the code snippet and returns the result.
 *
 * @example body
 * ```json
 * {
 *   "github_permalinks": ["https://github.com/aptos-labs/aptos-core/..."]
 * }
 * ```
 */
router.post("/codecache", middleware, async (req: WorkersRequest, env: Env) => {
  try {
    const { github_permalinks }: GithubPermalinks = await req.json!();

    if (!github_permalinks) {
      throw new Error("Error: github_permalinks was not found in request body");
    } else if (!Array.isArray(github_permalinks)) {
      throw new Error(
        "Error: expects github_permalinks to be an array but did not receive an array",
      );
    }

    // First check to see if permalink is cached in db
    // Prepared statement
    // findMany() is not available for sqlite it seems
    const p1 = req.db
      .select()
      .from(codecache)
      .where(inArray(codecache.github_permalink, github_permalinks))
      .prepare();

    const cache = await p1.execute();

    if (cache && github_permalinks.length === cache.length) {
      return wrap({
        status_code: 200,
        data: unifiedReturn(cache),
      });
    }

    // You only want to request the permalinks that are not in the cache
    // Filter for the permalinks that are not there, then request those from github
    // (Opposite of set intersection)
    const cachePermalinks = cache?.map((value) => value.github_permalink);
    const diffPermalinks = github_permalinks.filter(
      (item) => !cachePermalinks?.includes(item),
    );

    const promises = diffPermalinks.map((permalink) => {
      return fetchCodeSnippetFromGithub(permalink);
    });

    const response = await Promise.all(promises);

    // Insert code snippet into DB
    const res = await req.db
      .insert(codecache)
      .values(response)
      .onConflictDoNothing()
      .returning()
      .get();

    const result = await p1.execute();

    return wrap({
      data: unifiedReturn(result),
      status_code: 200,
    });
  } catch (err: any) {
    return wrap({
      data: null,
      status_code: 400,
      message: `${(err as any).message}`,
    });
  }
});

export default {
  fetch: router.handle,
};
