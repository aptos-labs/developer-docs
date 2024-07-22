import { defineConfig } from "tsup";

const env = process.env.NODE_ENV;

export default defineConfig({
  entry: ["src/index.ts"],
  splitting: true,
  sourcemap: env === "production", // source map is only available in prod
  clean: true, // rimraf dist folder
  dts: true, // generate dts file for main module
  format: ["esm"], // generate esm files
  minify: env === "production",
  bundle: env === "production",
  skipNodeModulesBundle: true,
  entryPoints: ["src/index.ts"],
  watch: env === "development",
  target: "es2020",
  outDir: env === "production" ? "dist" : "lib",
  external: ["react", "nextra-theme-docs"],
});
