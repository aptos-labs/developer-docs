/* eslint-disable no-undef */
import bundleAnalyzer from '@next/bundle-analyzer'
import nextra from 'nextra'
import { i18nConfig } from './docs.config.js';
import { macros } from '@aptos-labs/aptos-nextra-config'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  defaultShowCopyCode: true,
  latex: {
    options: {
      macros: {
        ...macros,
      }
    },
    renderer: 'katex',
  }
})

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})

/**
 * @type {import('next').NextConfig}
 */
export default withBundleAnalyzer(
  withNextra({
    eslint: {
      // Eslint behaves weirdly in this monorepo.
      ignoreDuringBuilds: true
    },
    i18n: {
      locales: Object.keys(i18nConfig).map((locale) => locale),
      defaultLocale: 'en'
    },
    distDir: './.next', // Nextra supports custom `nextConfig.distDir`
    redirects: async () => [
      {
        source: '/docs',
        destination: '/en/docs',
        statusCode: 302
      },
      {
        source: '/',
        destination: '/en',
        permanent: true
      }
    ],
    reactStrictMode: true,
    transpilePackages: ['@aptos-labs/aptos-nextra-config']
  })
)
