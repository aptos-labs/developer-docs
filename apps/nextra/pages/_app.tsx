import { GoogleAnalytics } from "@next/third-parties/google";
import { docsConfig } from "@docs-config";
import "../styles.css";
import { DynamicPreloadSearch } from "@components/preload-search";

export const config = {
  runtime: "experimental-edge",
};

/**
 * Learn more about using Google Analytics 4 with the
 * Next.js pages router here
 * @see https://nextjs.org/docs/pages/building-your-application/optimizing/third-party-libraries#google-analytics
 */
export default function App({ Component, pageProps }) {
  return (
    <>
      <GoogleAnalytics gaId={docsConfig.googleAnalyticsId} />
      {/* TODO: Andrew to revisit it https://aptos-org.slack.com/archives/C03EG004E56/p1747077993064609?thread_ts=1747077730.108909&cid=C03EG004E56 */}
      {/* <DynamicPreloadSearch /> */}
      <Component {...pageProps} />
    </>
  );
}
