/* eslint sort-keys: error */
import type { DocsThemeConfig } from 'nextra-theme-docs'
import { useConfig } from 'nextra-theme-docs'
import { useRouter } from 'nextra/hooks'
import { docsConfig, i18nConfig } from '@docs-config'

interface FrontmatterConfig { 
  description?: string; 
  image?: string; 
  title?: string 
}

const i18nLocales = Object.entries(i18nConfig).map(([locale, { direction, name }]) => {
  return {
    direction: (direction as 'ltr' | 'rtl' | undefined) || undefined,
    locale,
    name,
  }
})

function isFullUrl(url: string): boolean {
  // This regex checks for strings that start with a scheme like http:// or https://
  const pattern = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//;
  return pattern.test(url);
}

const url = new URL(docsConfig.githubUrl);
const pathname = url.pathname.endsWith('/') && url.pathname !== '/' ? url.pathname.slice(0, -1) : url.pathname;
const githubUrl = `${url.protocol}//${url.host}${pathname}${url.search}${url.hash}`;

const config: DocsThemeConfig = {
  darkMode: true,
  docsRepositoryBase: docsConfig.githubUrl,
  editLink: {
    content: function useText() {
      const { locale } = useRouter()
      return i18nConfig[locale!].editText
    },
    component: ({ children, className, filePath }) => {
      const href = `${githubUrl}/edit/main${docsConfig.relativeDocsPath}/${filePath}`;
      return <a className={className} href={href}>{children}</a>
    }
  },
  feedback: {
    content: function useFeedback() {
      const { locale } = useRouter();
      return i18nConfig[locale!].feedbackText;
    },
    labels: 'feedback',
    useLink() {
      return docsConfig.githubNewIssueUrl
    }
  },
  footer: {
    content: function useText() {
      const { locale } = useRouter()
      return (
        <a
          rel="noreferrer"
          target="_blank"
          className="flex items-center gap-2 font-semibold"
          href={i18nConfig[locale!].footerLinkText}
        >
          {i18nConfig[locale!].footerLinkElement}
        </a>
      )
    }
  },
  gitTimestamp: function GitTimestamp({ timestamp }) {
    const { locale } = useRouter()
    return (
      <>
        {i18nConfig[locale!].lastUpdatedOn + ' '}
        <time dateTime={timestamp.toISOString()}>
          {timestamp.toLocaleDateString(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </time>
      </>
    )
  },
  head: function useHead() {
    const config = useConfig<FrontmatterConfig>();
    const { frontMatter } = config;
    const { locale } = useRouter();

    if (!docsConfig.origin) throw new Error('Origin is not defined in docs.config.js. Ensure it is part of your .env file for your project by adding something like `NEXT_PUBLIC_ORIGIN="http://localhost:3030"`')
    
    const description = frontMatter.description || docsConfig.defaultDescription

    /**
     * Why this is separated:
     * opengraph images render fine with dynamic search params
     * twitter opengraph images must end with .png / .jpeg, and cannot have dynamic search params at the end
     * e.g., api/og.png?title=something does not render on Twitter, but DOES render on iMessage
     */
    let ogImage: string;
    let twitterImage: string;
    const url = new URL(docsConfig.origin)
    const imagePath = frontMatter.image || '/api/og.png';
    const title = `${frontMatter.title || config.title} | ${docsConfig.defaultTitle} (${locale})`


    if (frontMatter.image && isFullUrl(imagePath)) {
      ogImage = imagePath; // Use the full URL if it is indeed a full URL
      twitterImage = imagePath;
    } else {
      url.pathname = imagePath; // Modify pathname to the imagePath or default
      twitterImage = url.toString();

      url.searchParams.append('title', title)
      ogImage = url.toString();
    }

    return (
      <>
        <title>{title}</title>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content={title} />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        {/* Favicons, meta */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <meta name="msapplication-TileColor" content="#fff" />
        <meta httpEquiv="Content-Language" content="en" />

        {/* OpenGraph Copied from vercel.com */}
        {/* Had a lot of issues with twitter cards rendering, lots of trial and error, you have been warned :) */}
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image:title" content={title + ' OG Image'} />
        <meta name="twitter:image" content={twitterImage} />
        <meta name="twitter:image:width" content="2400" />
        <meta name="twitter:image:height" content="1256" />
        {/* <meta name="twitter:image:file_name" content="og-dark.png" /> */}
        <meta name="twitter:image:content_type" content="image/png" />

        {/* Apple */}
        <meta name="apple-mobile-web-app-title" content={docsConfig.defaultTitle} />
      </>
    )
  },
  i18n: i18nLocales,
  logo: function Logo() {
    const { locale } = useRouter()
    return (
      <>
        <span
          className="select-none font-extrabold ltr:ml-2 rtl:mr-2"
          title={`${docsConfig.defaultTitle}: ${i18nConfig[locale!].title || ''}`}
        >
          {docsConfig.defaultTitle}
        </span>
      </>
    )
  },
  nextThemes: {
    defaultTheme: 'light'
  },
  project: {
    link: docsConfig.githubUrl
  },
  search: {
    emptyResult: function useEmptyResult() {
      const { locale } = useRouter();
      return (
        <span className="_block _select-none _p-8 _text-center _text-sm _text-gray-400">
          {i18nConfig[locale!].searchEmptyText}
        </span>
      )
    },
    error: function useError() {
      const { locale } = useRouter();
      return i18nConfig[locale!].searchErrorText;
    },
    loading: function useLoading() {
      const { locale } = useRouter()
      return i18nConfig[locale!].searchEmptyText;
    },
    placeholder: function usePlaceholder() {
      const { locale } = useRouter()
      return i18nConfig[locale!].searchPlaceholderText;
    }
  },
  sidebar: {
    autoCollapse: true,
    defaultMenuCollapseLevel: 1,
    toggleButton: true
  },
  toc: {
    float: true
  }
}

export default config
