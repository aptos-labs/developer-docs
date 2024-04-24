import { Callout } from "nextra/components";

export function IndexerBetaNotice() {
  return (
    <Callout type="info">
      The Indexer API, Transaction Stream Service, and Custom Processors are
      currently in beta. Please report any problems you encounter by creating an
      issue in the
      [aptos-indexer-processors](https://github.com/aptos-labs/aptos-indexer-processors/issues/new/choose)
      repo.
    </Callout>
  );
}
