---
title: "Aptos Keyless Integration Guide"
---

Aptos Keyless allows your users to set up an Aptos blockchain account from their existing Google accounts, rather than from a traditional secret key or mnemonic. In a nutshell, with Aptos Keyless, a user’s blockchain account is their Google account. In the future, Aptos Keyless will support many OpenID Connect (OIDC) providers, not just Google.

Importantly, Aptos Keyless maintains user privacy in two ways:

1. A user’s email address is not revealed on-chain to anybody, including other users and validators.
2. A user’s blockchain address and associated transaction history is hidden from the identity provider (e.g. Google).

Keyless accounts are revolutionary to users for the following reasons: 

1. “1-click” account creation via familiar Web2 logins like `Sign In with Google`.
2. Ability to transact on the Aptos blockchain without needing to navigate away from the application experience to download a wallet.
3. Requires no secret key management by the user. This means blockchain account access is synonymous with access to one’s OIDC account and Web2-like recovery flows are available to regain access to one’s blockchain account in case the user ever loses access to their OIDC account.
4. Seamless cross-devices experiences; users log in with their OIDC account no matter what device they are on - no need to download wallet software on each device, import their keys and encrypt them with a password, which must be maintained.

:::tip Keyless Account Scoping
Use of the ***Aptos Keyless Integration Guide*** will allow for the integration of keyless accounts directly into your application. This means that blockchain accounts created on your application are scoped to the domain of your application (logging in with your Google account on dApp A and logging in with your Google account on dApp B will create separate accounts). Stay tuned for more to come on Aptos’ plan to allow Keyless accounts to be used portably across applications.
:::

*Note: this guide is oriented toward non-wallet applications. If you are a wallet developer and have interest in using Keyless accounts, please reach out to us directly.*


## Terminology

- **OpenID Connect (OIDC)**: is the identity authentication protocol used to enable federated identity verification.  This protocol is what is used when a user goes through the “Sign in with Google” flow for example.
- **Identity Provider (IdP)**: is the trusted authority who authenticates your identity via OIDC. Supported example includes: Google.
- **JSON Web Token (JWT):** is an open standard used to share security information between two parties — a client and a server. Each JWT contains encoded JSON objects, including a set of claims. JWTs are signed using a cryptographic algorithm to ensure that the claims cannot be altered after the token is issued.
    - `iss`, an identifier for the OIDC provider (e.g., https://accounts.google.com)
    - `aud`, the OAuth `client_id` of the application that the user is signing in to (e.g., [Notion.so](https://notion.so))
    - `sub`, an identifier that the OIDC provider uses to identify the user
        - This could be an identifier specific to this `client_id`
        - Or, it could be an identifier shared across different `client_id`'s (e.g., Facebook’s OIDC does this)
    - `email`, some providers might also expose the user’s email as one of the fields (e.g., Google)
        - in addition, an `email_verified` field will be exposed to indicate if the provider has verified that the user owns this email address
    - `nonce`, arbitrary data that the application wants the OIDC provider to sign over
    - `iat`, the time the the JWT was issued at.
- **Ephemeral Key Pair:** a temporary public/private key pair that is used to sign transactions for an Aptos Keyless account. The public key and its expiration date are committed in the JWT token via the `nonce` field.
- **Keyless Account:** a blockchain account that is directly-derived from (1) a user’s OIDC account (e.g., `alice@gmail.com`) and (2) an associated application’s OAuth client_id (e.g., Notion.so). Users authenticate through the OIDC flow.
- **JSON Web Key (JWK):** is the cryptographic public key of the OIDC provider. This public key is used to verify the signature on the JWTs that the OIDC provider issues to the client application. This way, the client application can verify the authenticity of the tokens and ensure that they have not been tampered with.
- **Pepper:** a secret value added to a key before hashing to preserve privacy.
- **client_id:** the OAuth identifier for your application that you will receive from the IdP after registering your application with them. This will be used in our keyless architecture in the address derivation for your users.
- **redirect_uri:** the URI of the callback handler once the user successfully authenticates. Needs to be registered with your IdP.

# Keyless Account Integration Steps

At a high level, there are three steps to follow in order to integrate Keyless Accounts. 

1. **Configure your OpenID integration with your IdP.** In this step, the dApp will register with the IdP of choice (e.g. Google) and receive a `client_id`
2. **Install the Aptos TypeScript SDK.** 
3. **Integrate Keyless Account support in your application client**
    1. Set up the `“Sign In with [Idp]”` flow for your user.
    2. Instantiate the user’s `KeylessAccount`
    3. Sign and submit transactions via the `KeylessAccount`.

## Step 1. Configure your OpenID integration with your IdP

### Supported Identity Providers

Currently only Google is supported. We will support additional OIDC providers in the future (e.g., Apple, Kakaotalk, Microsoft, etc.).

| Identity Provider | Auth URL |
| --- | --- |
| Google | https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=id_token&scope=openid%20email&nonce=${NONCE} |

### Google

To support OpenID authentication you will need the **`client_id`** from your provider and setup authorized origins and redirect URIs.

1. Setup your project in the [Google API Console](https://console.developers.google.com/)
    1. Register for a Google Cloud account if you don’t have one
    2. Create a new project if it doesn’t exist
2. Go to [Credentials](https://console.developers.google.com/apis/credentials)
3. Select or create your OAuth 2.0 Client ID
4. Configure authorized origin (your dApp origin)
5. Configure redirect URIs (the handler for the callback after authentication which will receive the authorization code and/or id_token)
6. Obtain the `client_id` of your application

## Step 2. Install the Aptos TypeScript SDK

```bash
# Experimental SDK version with Keyless support.
npm install @aptos-labs/ts-sdk@zeta
```

:::info SDK is experimental
The API and SDK is still experimental and being actively developed under the '@zeta' tag.
If your integration stops working please try upgrading the package to the latest '@zeta' version of the SDK.  This version may lack features of the non-experimental SDK.
:::

## Step 3. Client Integration Steps

Below are the default steps for a client to integrate Keyless Accounts

### 1. Present the user with a “Sign In with [IdP]” button on the UI
    1. In the background, we create an ephemeral key pair. Store this in local storage.
        
        ```tsx
        import {EphemeralKeyPair} from '@aptos-labs/ts-sdk';
        
        const ephemeralKeyPair = EphemeralKeyPair.generate();
        ```
        
    2. Save the `EphemeralKeyPair` in local storage keyed by its `nonce`.
        
        ```jsx
        // This saves the EphemeralKeyPair in local storage keyed by the nonce. 
        storeEphemeralKeyPair(ephemeralKeyPair.nonce, ephemeralKeyPair); 
        ```
        
    3. Prepare the URL params of the login URL.  Set the `redirect_uri` and `client_id` to your configured values with the IdP.  Set the `nonce` to the nonce of the `EphemeralKeyPair` from step 1.i.
        
        ```jsx
        const redirectUri = 'https://.../login/callback'
        const clientId = env.IDP_CLIENT_ID
        // Get the nonce associated with ephemeralKeyPair
        const nonce = ephemeralKeyPair.nonce
        ```
        
    4. Construct the login URL for the user to authenticate with the IdP.  Make sure the `openid` scope is set.  Other scopes such as `email` and `profile` can be set based on your app’s needs.
        
        ```jsx
        const loginUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=id_token&scope=openid+email+profile&nonce=${nonce}&redirect_uri=${redirectUri}&client_id=${clientId}`
        ```
        
    5. When the user clicks the login button, redirect the user to the `loginUrl` that was created in step 1.iv.
### 2. Handle the callback by parsing the token and create a Keyless account for the user.
    1. Once the user completes the login flow, they will be redirected to the `redirect_uri` set in step 1. The JWT will be set in the URL as a search parameter in a URL fragment keyed by `id_token`. Extract the JWT from the `window` by doing the following:
        
        ```tsx
        const parseJWTFromURL = (url: string): string | null => {
          const urlObject = new URL(url);
          const fragment = urlObject.hash.substring(1);
          const params = new URLSearchParams(fragment);
          return params.get('id_token');
        };
        
        // window.location.href = https://.../login/google/callback#id_token=...
        const jwt = parseJWTFromURL(window.location.href)
        ```
        
    2. Decode the JWT and get the extract the nonce value from the payload.
        
        ```jsx
        import { jwtDecode } from 'jwt-decode';
        
        const payload = jwtDecode<{ nonce: string }>(jwt);
        const jwtNonce = payload.nonce
        ```
        
    3. Fetch the `EphemeralKeyPair` stored in step 1.ii with the decoded nonce.
    
        
        ```jsx
        const ephemeralKeyPair = getLocalEphemeralKeyPairt(jwtNonce);
        ```
        
    4. Instantiate the user’s `KeylessAccount`
        
        ```jsx
        import {Aptos} from '@aptos-labs/ts-sdk';
        
        const aptos = new Aptos();
        const keylessAccount = await aptos.deriveKeylessAccount({
            jwt,
            ephemeralKeyPair,
        });
        ```
        
    
### 3. Submit transactions to the Aptos blockchain.
    1. Create the transaction you want to submit.  Below is a simple coin transfer transaction for example:
        
        ```jsx
        import {Account} from '@aptos-labs/ts-sdk';
        
        const bob = Account.generate();
        const transaction = await aptos.transferCoinTransaction({
            sender: keylessAccount.accountAddress,
            recipient: bob.accountAddress,
            amount: 100,
        });
        ```
        
    2. Sign and submit the transaction to the chain.
        
        ```jsx
        const committedTxn = await aptos.signAndSubmitTransaction({ signer: keylessAccount, transaction });
        ```
        
    3. Wait for the transaction to be processed on-chain
        
        ```jsx
        const committedTransactionResponse = await aptos.waitForTransaction({ transactionHash: committedTxn.hash });
        ```

