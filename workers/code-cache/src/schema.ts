import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const codecache = sqliteTable("codecache", {
  github_permalink: text("github_permalink").primaryKey(),
  code: text("code"),
  used_in_latest_docs: int("used_in_latest_docs", { mode: "boolean" })
    .notNull()
    .default(true),
  updated_at: text("updated_at")
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => new Date().toUTCString())
    .notNull(),
});
