import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const codecache = sqliteTable("codecache", {
  github_permalink: text("github_permalink").primaryKey(),
  code: text("code"),
});
