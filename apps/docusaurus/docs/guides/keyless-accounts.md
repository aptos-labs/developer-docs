---
title: "Aptos Keyless"
---

## Aptos Keyless Integration Guide

Aptos Keyless allows your users to set up an Aptos blockchain account from their existing Google accounts, rather than from a traditional secret key or mnemonic. In a nutshell, with Aptos Keyless, a user’s blockchain account is their Google account. In the future, Aptos Keyless will support many OpenID Connect (OIDC) providers, not just Google.

Importantly, Aptos Keyless maintains user privacy in two ways:

1. A user’s email address is not revealed on-chain to anybody, including other users and validators.
2. A user’s blockchain address and associated transaction history is hidden from the identity provider (e.g. Google).

Keyless accounts are revolutionary to users for the following reasons:

1. "1-click" account creation via familiar Web2 logins like `Sign In with Google`.
2. Ability to transact on the Aptos blockchain without needing to navigate away from the application experience to download a wallet.
3. Requires no secret key management by the user. This means blockchain account access is synonymous with access to one’s OIDC account and Web2-like recovery flows are available to regain access to one’s blockchain account in case the user ever loses access to their OIDC account.
4. Seamless cross-device experiences; users log in with their OIDC account no matter what device they are on - no need to download wallet software on each device, import their keys and encrypt them with a password, which must be maintained.

:::tip Keyless Account Scoping
Use of the **_Aptos Keyless Integration Guide_** will allow for the integration of keyless accounts directly into your application. This means that blockchain accounts are scoped to your application's domain (logging in with your Google account on dApp A and logging in with your Google account on dApp B will create separate accounts). Stay tuned for more to come on Aptos’ plan to allow Keyless accounts to be used portably across applications.

To provide feedback, get support, or be a design partner as we enhance Aptos Keyless, join us here: https://t.me/+h5CN-W35yUFiYzkx
:::

## Terminology

- **OpenID Connect (OIDC)**: is the identity authentication protocol used to enable federated identity verification. This protocol is what is used when a user goes through the "Sign in with Google" flow for example.
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
  - `iat`, the time the JWT was issued at.
- **Ephemeral Key Pair:** a temporary public/private key pair that is used to sign transactions for an Aptos Keyless account. The public key and its expiration date are committed in the JWT token via the `nonce` field.
- **Keyless Account:** a blockchain account that is directly-derived from (1) a user’s OIDC account (e.g., `alice@gmail.com`) and (2) an associated application’s OAuth client_id (e.g., Notion.so). Users authenticate through the OIDC flow.
- **JSON Web Key (JWK):** is the cryptographic public key of the OIDC provider. This public key is used to verify the signature on the JWTs that the OIDC provider issues to the client application. This way, the client application can verify the authenticity of the tokens and ensure that they have not been tampered with.
- **client_id:** the OAuth identifier for your application that you will receive from the IdP after registering your application with them. This will be used in our keyless architecture in the address derivation for your users.
- **redirect_uri:** the URI of the callback handler once the user successfully authenticates. Needs to be registered with your IdP.

# Keyless Account Integration Steps

:::info Mainnet not yet supported
Currently Aptos Keyless is only supported in devnet and testnet. Mainnet support to come in the following weeks.
:::

At a high level, there are three steps to follow in order to integrate Keyless Accounts.

1. **Configure your OpenID integration with your IdP.** In this step, the dApp will register with the IdP of choice (e.g. Google) and receive a `client_id`
2. **Install the Aptos TypeScript SDK.**
3. **Integrate Keyless Account support in your application client**
   1. Set up the `"Sign In with [Idp]"` flow for your user.
   2. Instantiate the user’s `KeylessAccount`
   3. Sign and submit transactions via the `KeylessAccount`.

## Example Implementaion

You can find an example app demonstrating how to do basic Keyless integration with Google in the repository below.  Follow the directions in the README to get started quickly with Keyless.  For more detailed instructions please read the rest of the integration guide.

https://github.com/aptos-labs/aptos-keyless-example/

## Step 1. Configure your OpenID integration with your IdP

### Supported Identity Providers

Currently only Google is supported. We will support additional OIDC providers in the future (e.g., Apple, Kakaotalk, Microsoft, etc.).

| Identity Provider | Auth URL                                                                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Google            | https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=id_token&scope=openid%20email&nonce=${NONCE} |

The implicit flow (no authorization code exchange) is the preferred method of authentication. The integration steps assume use of implicit flow.

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
pnpm install @aptos-labs/ts-sdk@zeta
```

:::info SDK is experimental
The API and SDK is still experimental and being actively developed under the '@zeta' tag.
If your integration stops working please try upgrading the package to the latest '@zeta' version of the SDK. This version may lack features of the non-experimental SDK.
:::

## Step 3. Client Integration Steps

Below are the default steps for a client to integrate Keyless Accounts

### 1. Present the user with a "Sign In with [IdP]" button on the UI

    1. In the background, we create an ephemeral key pair. Store this in local storage.

        ```tsx
        import {EphemeralKeyPair} from '@aptos-labs/ts-sdk';

        const ephemeralKeyPair = EphemeralKeyPair.generate();
        ```

    2. Save the `EphemeralKeyPair` in local storage, keyed by its `nonce`.

        ```tsx
        // This saves the EphemeralKeyPair in local storage keyed, by its nonce.
        storeEphemeralKeyPair(ephemeralKeyPair);
        ```

<details>
<summary>Example implementation for `storeEphemeralKeyPair`</summary>

:::tip
This implementation is an example of how to store the `EphemeralKeyPair` in local storage using the nonce as the key. Different implementations may be used according to your application's needs.
:::

```typescript
/**
 * Stored ephemeral key pairs in localStorage (nonce -> ephemeralKeyPair)
 */
export type StoredEphemeralKeyPairs = { [nonce: string]: EphemeralKeyPair };

/**
 * Retrieve all ephemeral key pairs from localStorage and decode them. The new ephemeral key pair
 * is then stored in localStorage with the nonce as the key.
 */
export const storeEphemeralKeyPair = (
  ephemeralKeyPair: EphemeralKeyPair,
): void => {
  // Retrieve the current ephemeral key pairs from localStorage
  const accounts = getLocalEphemeralKeyPairs();

  // Store the new ephemeral key pair in localStorage
  accounts[ephemeralKeyPair.nonce] = ephemeralKeyPair;
  localStorage.setItem(
    "ephemeral-key-pairs",
    encodeEphemeralKeyPairs(accounts),
  );
};

/**
 * Retrieve all ephemeral key pairs from localStorage and decode them.
 */
export const getLocalEphemeralKeyPairs = (): StoredEphemeralKeyPairs => {
  const rawEphemeralKeyPairs = localStorage.getItem("ephemeral-key-pairs");
  try {
    return rawEphemeralKeyPairs
      ? decodeEphemeralKeyPairs(rawEphemeralKeyPairs)
      : {};
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(
      "Failed to decode ephemeral key pairs from localStorage",
      error,
    );
    return {};
  }
};

/**
 * Encoding for the EphemeralKeyPair class to be stored in localStorage
 */
const EphemeralKeyPairEncoding = {
  decode: (e: any) => EphemeralKeyPair.fromBytes(e.data),
  encode: (e: EphemeralKeyPair) => ({
    __type: "EphemeralKeyPair",
    data: e.bcsToBytes(),
  }),
};

/**
 * Stringify the ephemeral key pairs to be stored in localStorage
 */
export const encodeEphemeralKeyPairs = (
  keyPairs: StoredEphemeralKeyPairs,
): string =>
  JSON.stringify(keyPairs, (_, e) => {
    if (typeof e === "bigint") return { __type: "bigint", value: e.toString() };
    if (e instanceof Uint8Array)
      return { __type: "Uint8Array", value: Array.from(e) };
    if (e instanceof EphemeralKeyPair)
      return EphemeralKeyPairEncoding.encode(e);
    return e;
  });

/**
 * Parse the ephemeral key pairs from a string
 */
export const decodeEphemeralKeyPairs = (
  encodedEphemeralKeyPairs: string,
): StoredEphemeralKeyPairs =>
  JSON.parse(encodedEphemeralKeyPairs, (_, e) => {
    if (e && e.__type === "bigint") return BigInt(e.value);
    if (e && e.__type === "Uint8Array") return new Uint8Array(e.value);
    if (e && e.__type === "EphemeralKeyPair")
      return EphemeralKeyPairEncoding.decode(e);
    return e;
  });
```

</details>

    3. Prepare the URL params of the login URL. Set the `redirect_uri` and `client_id` to your configured values with the IdP. Set the `nonce` to the nonce of the `EphemeralKeyPair` from step 1.1.

        ```tsx
        const redirectUri = 'https://.../login/callback'
        const clientId = env.IDP_CLIENT_ID
        // Get the nonce associated with ephemeralKeyPair
        const nonce = ephemeralKeyPair.nonce
        ```

    4. Construct the login URL for the user to authenticate with the IdP. Make sure the `openid` scope is set. Other scopes such as `email` and `profile` can be set based on your app’s needs.

        ```tsx
        const loginUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=id_token&scope=openid+email+profile&nonce=${nonce}&redirect_uri=${redirectUri}&client_id=${clientId}`
        ```

    5. When the user clicks the login button, redirect the user to the `loginUrl` that was created in step 1.4.

### 2. Handle the callback by parsing the token and create a Keyless account for the user

    1. Once the user completes the login flow, they will be redirected to the `redirect_uri` set in step 1. The JWT will be set in the URL as a search parameter in a URL fragment, keyed by `id_token`. Extract the JWT from the `window` by doing the following:

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

        ```tsx
        import { jwtDecode } from 'jwt-decode';

        const payload = jwtDecode<{ nonce: string }>(jwt);
        const jwtNonce = payload.nonce
        ```

    3. Fetch the `EphemeralKeyPair` stored in step 1.2 with the decoded nonce.


        ```tsx
        const ephemeralKeyPair = getLocalEphemeralKeyPair(jwtNonce);
        ```

<details>
<summary>Example implementation for `getLocalEphemeralKeyPair`</summary>

:::tip
This implementation is an example of how to retrieve the `EphemeralKeyPair` from local storage using the nonce as the key. Different implementations may be used according to your application's needs. It is important that you validate the expiry timestamp of the ephemeral key pair to ensure that it is still valid.
:::

```typescript
/**
 * Stored ephemeral key pairs in localStorage (nonce -> ephemeral key pair)
 */
export type StoredEphemeralKeyPairs = { [nonce: string]: EphemeralKeyPair };

/**
 * Retrieve the ephemeral key pair with the given nonce from localStorage.
 */
export const getLocalEphemeralKeyPair = (
  nonce: string,
): EphemeralKeyPair | null => {
  const keyPairs = getLocalEphemeralKeyPairs();

  // Get the account with the given nonce (the generated nonce of the ephemeral key pair may not match
  // the nonce in localStorage), so we need to validate it before returning it (implementation specific).
  const ephemeralKeyPair = keyPairs[nonce];
  if (!ephemeralKeyPair) return null;

  // If the account is valid, return it, otherwise remove it from the device and return null
  return validateEphemeralKeyPair(nonce, ephemeralKeyPair);
};

/**
 * Retrieve all ephemeral key pairs from localStorage and decode them.
 */
export const getLocalEphemeralKeyPairs = (): StoredEphemeralKeyPairs => {
  const rawEphemeralKeyPairs = localStorage.getItem("ephemeral-key-pairs");
  try {
    return rawEphemeralKeyPairs
      ? decodeEphemeralKeyPairs(rawEphemeralKeyPairs)
      : {};
  } catch (error) {
    console.warn(
      "Failed to decode ephemeral key pairs from localStorage",
      error,
    );
    return {};
  }
};

/**
 * Validate the ephemeral key pair with the given nonce and the expiry timestamp. If the nonce does not match
 * the generated nonce of the ephemeral key pair, the ephemeral key pair is removed from localStorage. This is
 * to validate that the nonce algorithm is the same (e.g. if the nonce algorithm changes).
 */
export const validateEphemeralKeyPair = (
  nonce: string,
  ephemeralKeyPair: EphemeralKeyPair,
): EphemeralKeyPair | null => {
  // Check the nonce and the expiry timestamp of the account to see if it is valid
  if (
    nonce === ephemeralKeyPair.nonce &&
    ephemeralKeyPair.expiryDateSecs > BigInt(Math.floor(Date.now() / 1000))
  ) {
    return ephemeralKeyPair;
  }
  removeEphemeralKeyPair(nonce);
  return null;
};

/**
 * Remove the ephemeral key pair with the given nonce from localStorage.
 */
export const removeEphemeralKeyPair = (nonce: string): void => {
  const keyPairs = getLocalEphemeralKeyPairs();
  delete keyPairs[nonce];
  localStorage.setItem(
    "ephemeral-key-pairs",
    encodeEphemeralKeyPairs(keyPairs),
  );
};
```

</details>

    4. Instantiate the user’s `KeylessAccount`

        ```tsx
        import {Aptos, AptosConfig, Network} from '@aptos-labs/ts-sdk';

        const aptos = new Aptos(new AptosConfig({network: Network.DEVNET}));  // Only devnet and testnet supported as of now.
        const keylessAccount = await aptos.deriveKeylessAccount({
            jwt,
            ephemeralKeyPair,
        });
        ```

### 3. Submit transactions to the Aptos blockchain

    1. Create the transaction you want to submit.  Below is a simple coin transfer transaction for example:

        ```tsx
        import {Account} from '@aptos-labs/ts-sdk';

        const bob = Account.generate();
        const transaction = await aptos.transferCoinTransaction({
            sender: keylessAccount.accountAddress,
            recipient: bob.accountAddress,
            amount: 100,
        });
        ```

    2. Sign and submit the transaction to the chain.

        ```tsx
        const committedTxn = await aptos.signAndSubmitTransaction({ signer: keylessAccount, transaction });
        ```

    3. Wait for the transaction to be processed on-chain

        ```tsx
        const committedTransactionResponse = await aptos.waitForTransaction({ transactionHash: committedTxn.hash });
        ```

### 4. Error Handling

Eventually your EphemeralKeyPair will expire or the JWK used to validate the token will be rotated.  In these cases the KeylessAccount must be refreshed with a new JWT token.  To detect errors, use a try catch on sign and submit and switch on the KeylessError.type.

  ```tsx
  try {
    const committedTxn = await aptos.signAndSubmitTransaction({ signer: keylessAccount, transaction });
  } catch(error) {
    if (error instanceOf KeylessError) {
      switch(error.type) { 
        case KeylessError.EPK_EXPIRED: { 
            // Handle error
            break; 
        } 
        case KeylessError.JWK_EXPIRED: { 
            // Handle error
            break; 
        } 
        default: { 
            break; 
        } 
      } 
    }
  }
  ```

## SDK Configurable Options

The Keyless SDK provides several configurable options for Keyless Account derivation

### Choice of pepper

Developers may opt to use their own pepper service/scheme and can override use of the labs hosted pepper service.

Example
```tsx
const keylessAccount = await aptos.deriveKeylessAccount({
    jwt,
    ephemeralKeyPair,
    pepper: "05e2844f1a7d5d27ca57f89d6f599fb073b2352b97d4905fa1c431236e00eb",
});
```

### Claim to use for user identification

Certain dApps may want to use 'email' instead of the default 'sub' claim to identify user.  This allows dApps to mint NFTs to a user's email even if the user has not created an account yet.  Note that this also means that if a user changes their emails with respect to the IdP, they may love access to their account.

Example
```tsx
const keylessAccount = await aptos.deriveKeylessAccount({
    jwt,
    ephemeralKeyPair,
    uidKey: "email",
});
```

### Asyncronous proof fetching

Fetching the proof may take a few seconds and can be done in the background to allow for a more responsive user experience.  To enable asyncronous proof fetching just provide a callback to be invoked on proof fetch completion.

Example
```tsx
const handleProofFetchStatus = async (res: ProofFetchStatus) => {
  if (res.status === 'Failed') {
    // Handle failue
    return
  }
  // Handle success
  store.persist.rehydrate();
};
const keylessAccount = await aptos.deriveKeylessAccount({
    jwt,
    ephemeralKeyPair,
    proofFetchCallback: handleProofFetchStatus,
});
```

### EphemeralKeyPair expiry time 

By default, the expiry time of the EphemeralKeyPair is set to be maximum allowed time in the future, now + 10000000 seconds.  To avoid proofs that are long lived which can be a security risk, 
```tsx
const ephemeralKeyPair = EphemeralKeyPair.generate({expiryDateSecs: 1721397500});
```

## Pepper Service API

The pepper service is an Aptos Labs hosted API that computes a pepper as a result of a verifiable unpredictible function (VUF).  The inputs to the VUF are the iss, uid_key (defaults to sub), uid_val, aud.

To recieve a pepper from the API you must input a JWT token and its nonce components (ephemeral public key, blinder, and expiry timestamp).  The service will do the following checks
- verify that the computed nonce from nonce components match the nonce on the JWT token.
- check that the ephemeral public key hasn't expired
- check that the token is still valid under the issuer's JWK key set

If these checks pass you will get back the user's pepper in the response.

Example request
```json
{
    "jwt_b64": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InRlc3QtcnNhIn0.eyJpc3MiOiJ0ZXN0IiwiYXVkIjoidGVzdCIsInN1YiI6InRlc3QiLCJlbWFpbCI6InRlc3QiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaWF0IjoxNzE1OTI3NTI2LCJleHAiOjI3MDAwMDAwMDAsIm5vbmNlIjoiMTY1NjkyNDIwNzExODc3NTA3OTMwODk3NDIwMzcxMzUzMjY0NzY0MzQyMTI4MDgyNTM2MDA1MzEwMTE2NDQzNzAzNTMzMTkxNjIzNDEifQ.PcSnAEebQeKP2ge8hQizIazekQb_x9xS6xNqZM4cmRseisfHpXelLPGfwWsecGa6f3SZWXYeCMCtij2OXXMveYfPYTbDd8d01Ks8lHvcr5PLuRP1jvwVfLP34oKRsjjE1Dowams1xyKDmEI8qWA3IY5QILH6xIIhnnz4Qa6AvibzG_1cbXmGDaC4_zzAvL812QSzQfJ3hr45j_EAQcFOnuy_vUm7WqLVxWlWb0Vi3D5ahZe6wdlS4otcwXG8R5P94qVdZECSzsGwOyGPztUTwZuUGZV20-sxJPZmyrWNXZoNqOs3FQuAN6QfkFTcmenU1roNBZ2XTzBEGh2PDGV1ow",
    "epk": "11208fe2661376a2d938e77123d51f06a42116a0da22aaf79cf9e80527bc91bfaab8",
    "epk_blinder": "258a117208bab6b620ed4edd496fd63d327daca0d17f8d460ec2dd0bcb7a90",
    "exp_date_secs": 1725926400,
}
```

Example response
```json
{
    "pepper": "f634a051057e7c8632194c80a5c7c4d0cd10edbd8fc4505b7d2018839b0f6f",
    "address": "0xd19c3bcd94cdb6576b4a0ed958ed94805b78e1d7f4bdab3e5033bd7fb09d9bbd"
}
```

## Prover Service API

The prover service is an Aptos Labs hosted API that computes zero-knowledge proofs.

The input to the prover consists of the same request to the pepper service with the addition of the pepper and the max expiry horizon.  The inputs to the prover must satisfy the circuit relation for secret witness generation.

Example request
```json
{
    "jwt_b64": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InRlc3QtcnNhIn0.eyJpc3MiOiJ0ZXN0IiwiYXVkIjoidGVzdCIsInN1YiI6InRlc3QiLCJlbWFpbCI6InRlc3QiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaWF0IjoxNzE1OTI3NTI2LCJleHAiOjI3MDAwMDAwMDAsIm5vbmNlIjoiMTY1NjkyNDIwNzExODc3NTA3OTMwODk3NDIwMzcxMzUzMjY0NzY0MzQyMTI4MDgyNTM2MDA1MzEwMTE2NDQzNzAzNTMzMTkxNjIzNDEifQ.PcSnAEebQeKP2ge8hQizIazekQb_x9xS6xNqZM4cmRseisfHpXelLPGfwWsecGa6f3SZWXYeCMCtij2OXXMveYfPYTbDd8d01Ks8lHvcr5PLuRP1jvwVfLP34oKRsjjE1Dowams1xyKDmEI8qWA3IY5QILH6xIIhnnz4Qa6AvibzG_1cbXmGDaC4_zzAvL812QSzQfJ3hr45j_EAQcFOnuy_vUm7WqLVxWlWb0Vi3D5ahZe6wdlS4otcwXG8R5P94qVdZECSzsGwOyGPztUTwZuUGZV20-sxJPZmyrWNXZoNqOs3FQuAN6QfkFTcmenU1roNBZ2XTzBEGh2PDGV1ow",
    "epk": "11208fe2661376a2d938e77123d51f06a42116a0da22aaf79cf9e80527bc91bfaab8",
    "epk_blinder": "258a117208bab6b620ed4edd496fd63d327daca0d17f8d460ec2dd0bcb7a90",
    "exp_date_secs": 1725926400,
    "exp_horizon_secs": 10000000,
    "pepper": "f634a051057e7c8632194c80a5c7c4d0cd10edbd8fc4505b7d2018839b0f6f"
}
```

Example response
```json
{
    "proof": {
        "a": "11b90e23bb57ecfd09e336d30756dfce2f8f54db183116d8b9c1f218bcc1b280",
        "b": "99d62fd33fe3721b0ee1a99a56de12dfc0ca9e9afbc858ece5b3c7fa9a9116060332aab2816f94f0f25f5c325bf422206b00c478f856aeb151e38bbb4fa501a4",
        "c": "fc1ff9fe5740bd87344b0d95fa1fb5df4741b1e67511c6a2cd9902da597aba2f"
    },
    "public_inputs_hash": "123366eb10261f9e08471a2c25dba06e5c666a6cf6326bb9dff8579b9202a80f",
    "training_wheels_signature": "00403eeff1cb27d501c9e2c44042fa132ba16897ce1db5abb27dbefe6f7dacd7dc0accf1a2e2cc404125f97596154b1e49c4fbef7fae1cce01edd64847d50f4e3e0a"
}
```


For more details on the design of keyless accounts see [`AIP-61`](https://github.com/aptos-foundation/AIPs/blob/main/aips/aip-61.md)
