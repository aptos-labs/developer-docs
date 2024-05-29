const fs = require('fs');
const path = require('path');
const { parseStringPromise, Builder } = require('xml2js');

const sitemapFilePath = path.resolve(__dirname, 'public', 'sitemap.xml');
const outputDir = path.resolve(__dirname, 'public');
const languages = ['en'];

const readSitemap = async (filePath) => {
  const xml = fs.readFileSync(filePath, 'utf-8');
  return await parseStringPromise(xml);
};

const writeSitemap = (filePath, urls) => {
  const builder = new Builder();
  const xml = builder.buildObject({
    urlset: {
      $: { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' },
      url: urls
    }
  });
  fs.writeFileSync(filePath, xml);
  console.log(`Sitemap written to ${filePath}`);
};

const generateLanguageSitemaps = async () => {
  const sitemap = await readSitemap(sitemapFilePath);
  if (!sitemap.urlset || !sitemap.urlset.url) {
    console.error('No URLs found in the main sitemap.');
    return;
  }

  languages.forEach((lang) => {
    const langUrls = sitemap.urlset.url.filter(url => url.loc[0].includes(`/${lang}/`));
    if (langUrls.length > 0) {
      const langSitemapPath = path.resolve(outputDir, `sitemap-${lang}.xml`);
      writeSitemap(langSitemapPath, langUrls);
    } else {
      console.warn(`No URLs found for language: ${lang}`);
    }
  });

  const sitemapIndexContent = `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${languages.map(lang => `
      <sitemap>
        <loc>https://preview.aptos.dev/sitemap-${lang}.xml</loc>
      </sitemap>`).join('')}
  </sitemapindex>`;

  fs.writeFileSync(path.resolve(outputDir, 'sitemap.xml'), sitemapIndexContent);
  console.log('Index sitemap written to public/sitemap.xml');

  const robotsTxtContent = `# *
User-agent: *
Allow: /

# Host
Host: https://preview.aptos.dev

# Sitemaps
Sitemap: https://preview.aptos.dev/sitemap.xml
${languages.map(lang => `Sitemap: https://preview.aptos.dev/sitemap-${lang}.xml`).join('\n')}
`;

  fs.writeFileSync(path.resolve(outputDir, 'robots.txt'), robotsTxtContent);
  console.log('robots.txt written to public/robots.txt');
};

generateLanguageSitemaps().then(() => {
  console.log('Language-specific sitemaps and robots.txt generated.');
}).catch(err => {
  console.error('Error generating language-specific sitemaps and robots.txt:', err);
});
