const fs = require('fs');
const path = require('path');
const { parseStringPromise, Builder } = require('xml2js');

const sitemapFilePath = path.resolve(__dirname, 'public', 'sitemap.xml');
const outputDir = path.resolve(__dirname, 'public');
const languages = ['en', 'zh', 'fr'];

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
};

const generateLanguageSitemaps = async () => {
  const sitemap = await readSitemap(sitemapFilePath);

  languages.forEach((lang) => {
    const langUrls = sitemap.urlset.url.filter(url => url.loc[0].includes(`/${lang}/`));
    const langSitemapPath = path.resolve(outputDir, `sitemap-${lang}.xml`);
    writeSitemap(langSitemapPath, langUrls);
  });
};

generateLanguageSitemaps().then(() => {
  console.log('Language-specific sitemaps generated.');
}).catch(err => {
  console.error('Error generating language-specific sitemaps:', err);
});
