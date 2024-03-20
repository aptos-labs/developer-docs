---
title: "Labs-Hosted Indexer API"
---

import BetaNotice from '../../../src/components/\_indexer_beta_notice.mdx';

<BetaNotice />

## GraphQL API Endpoints

When making GraphQL queries to the Labs-Hosted Indexer API, use the following endpoints:

- **Mainnet:** https://api.mainnet.aptoslabs.com/v1/graphql
- **Testnet:** https://api.testnet.aptoslabs.com/v1/graphql
- **Devnet:** https://api.devnet.aptoslabs.com/v1/graphql

## Hasura Explorer

The following URLs are for the Hasura Explorer for the Labs-Hosted Indexer API:

- **Mainnet:** https://cloud.hasura.io/public/graphiql?endpoint=https://api.mainnet.aptoslabs.com/v1/graphql
- **Testnet:** https://cloud.hasura.io/public/graphiql?endpoint=https://api.testnet.aptoslabs.com/v1/graphql
- **Devnet:** https://cloud.hasura.io/public/graphiql?endpoint=https://api.devnet.aptoslabs.com/v1/graphql

## Rate limits

The following rate limit applies for the Aptos Labs hosted indexer API:

- For a web application that calls this Aptos-provided indexer API directly from the client (for example, wallet or explorer), the rate limit is currently 5000 requests per five minutes by IP address. **Note that this limit can change with or without prior notice.**

If you need a higher rate limit, consider running the Aptos Indexer API yourself. See the guide to self-hosting [here](/indexer/api/self-hosted).
