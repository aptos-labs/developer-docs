---
title: "Labs-Hosted Transaction Stream Service"
---

import BetaNotice from '../../../src/components/\_indexer_beta_notice.mdx';

<BetaNotice />

If you are running your own instance of the [Indexer API](/indexer/api), or a [custom processor](/indexer/custom-processors), you must have access to an instance of the Transaction Stream Service. This page contains information about how to use the Labs-Hosted Transaction Stream Service.

## Endpoints

All endpoints are in GCP us-central1 unless otherwise specified.

- **Mainnet:** grpc.mainnet.aptoslabs.com:443
- **Testnet:** grpc.testnet.aptoslabs.com:443
- **Devnet:** grpc.devnet.aptoslabs.com:443

<!--
## Rate limits
The following rate limit applies for the Aptos Labs hosted Transaction Stream Service:

- todo todo

If you need a higher rate limit, consider running the Transaction Stream Service yourself. See the guide to self-hosting [here](./self-hosted).
-->

## Authorization via API Key

In order to use the Labs-Hosted Transaction Stream Service you must have an API key. To get an API key, do the following:

1. Go to https://developers.aptoslabs.com.
2. Sign in and select "API Keys" in the left sidebar.
3. Create a new key. You will see the token value in the first table.

You can provide the API key by setting the `Authorization` HTTP header ([MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization)). For example, with curl:

```
curl -H 'Authorization: Bearer aptoslabs_yj4donpaKy_Q6RBP4cdBmjA8T51hto1GcVX5ZS9S65dx'
```

For more comprehensive information about how to use the Transaction Stream Service, see the docs for the downstream systems:

- [Indexer API](/indexer/api/self-hosted)
- [Custom Processors](/indexer/custom-processors)
