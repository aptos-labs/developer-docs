import { i18nConfig, getOrigin } from "./docs.config.js";

/**
 * @type {import('next-sitemap').IConfig}
 */
export default {
  siteUrl: getOrigin() || "https://preview.aptos.dev",
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  outDir: "public",
  generateIndexSitemap: false,
  languages: Object.keys(i18nConfig).map((key) => i18nConfig[key].locale),
};
