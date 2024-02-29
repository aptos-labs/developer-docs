import { GoogleAnalytics } from '@next/third-parties/google'
import { docsConfig } from '@docs-config'
import '../styles.css'

export const config = {
  runtime: 'experimental-edge',
}

/**
 * Learn more about using Google Analytics 4 with the 
 * Next.js pages router here
 * @see https://nextjs.org/docs/pages/building-your-application/optimizing/third-party-libraries#google-analytics
 */
export default function App({ Component, pageProps }) {
  return (
    <>
      <GoogleAnalytics gaId={docsConfig.googleAnalyticsId} />
      <Component {...pageProps} />
    </>
  )
}
