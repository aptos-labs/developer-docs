// next-sitemap.config.mjs

/**
 * @type {import('next-sitemap').IConfig}
 */
export default {
  siteUrl: process.env.SITE_URL || "https://preview.aptos.dev",
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  outDir: "public",
  generateIndexSitemap: false, 
};
