// next-sitemap.config.mjs

/**
 * @type {import('next-sitemap').IConfig}
 */
export default {
  siteUrl: process.env.SITE_URL || "https://preview.aptos.dev",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  outDir: "public",
};

// Example Support for different locales in sitemap
// /**
//  * @type {import('next-sitemap').IConfig}
//  */
// const config = {
//   siteUrl: process.env.SITE_URL || 'https://preview.aptos.dev', // Base URL of your site
//   generateRobotsTxt: true, // Generate a robots.txt file
//   sitemapSize: 5000, // Split sitemap into multiple files if there are more than 5000 URLs
//   outDir: 'public', // Output directory for the generated sitemap files
//   alternateRefs: [
//     {
//       href: 'https://es.preview.aptos.dev', // URL for the Spanish version of the site
//       hreflang: 'es', // Language code for Spanish
//     },
//     {
//       href: 'https://fr.preview.aptos.dev', // URL for the French version of the site
//       hreflang: 'fr', // Language code for French
//     },
//   ],
//   transform: async (config, path) => {
//     return {
//       loc: path, // The URL of the page
//       changefreq: config.changefreq, // How frequently the page changes
//       priority: config.priority, // Priority of the page
//       lastmod: config.autoLastmod ? new Date().toISOString() : undefined, // Last modification date
//       alternateRefs: config.alternateRefs ?? [], // Alternate language URLs
//     };
//   },
// };

// export default config;
