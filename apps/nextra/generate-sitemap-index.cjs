const fs = require('fs');
const path = require('path');

const outputDir = path.resolve(__dirname, 'public');

const loadConfig = async () => {
  const configModule = await import('./next-sitemap.config.mjs');
  return configModule.default;
};

const getAvailableLanguages = async () => {
  const config = await loadConfig();
  const languages = config.languages;
  return languages.filter(lang => fs.existsSync(path.resolve(outputDir, `sitemap-${lang}.xml`)));
};

const generateSitemapIndex = async () => {
  const availableLanguages = await getAvailableLanguages();
  
  const sitemapIndexContent = `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${availableLanguages.map(lang => `
      <sitemap>
        <loc>https://preview.aptos.dev/sitemap-${lang}.xml</loc>
      </sitemap>`).join('')}
  </sitemapindex>`;

  fs.writeFileSync(path.resolve(outputDir, 'sitemap.xml'), sitemapIndexContent);
  console.log('Index sitemap written to public/sitemap.xml');
};

generateSitemapIndex();
