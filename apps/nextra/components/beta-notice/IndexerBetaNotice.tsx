import { Callout } from "nextra/components";

export function IndexerBetaNotice() {
  return (
    <Callout type="info">
      The Indexer API, Transaction Stream Service, and Custom Processors are
      currently in beta. Please report any problems you encounter by creating an
      issue in the{" "}
      <a
        href="https://github.com/aptos-labs/aptos-indexer-processors-v2/issues/new/choose"
        className="_text-primary-600 _underline _decoration-from-font"
        style={{ textUnderlinePosition: "from-font" }}
      >
        aptos-indexer-processors
      </a>{" "}
      repo.
    </Callout>
  );
}
