const fs = require('fs');
const path = require('path');

const generateSitemapIndex = () => {
  const sitemapIndexContent = `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
      <loc>https://preview.aptos.dev/sitemap-en.xml</loc>
    </sitemap>
    <sitemap>
      <loc>https://preview.aptos.dev/sitemap-zh.xml</loc>
    </sitemap>
    <sitemap>
      <loc>https://preview.aptos.dev/sitemap-fr.xml</loc>
    </sitemap>
  </sitemapindex>`;

  fs.writeFileSync(path.resolve(__dirname, 'public', 'sitemap.xml'), sitemapIndexContent);
};

generateSitemapIndex();
