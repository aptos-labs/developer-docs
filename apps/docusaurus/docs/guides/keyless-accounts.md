---
title: "Keyless Accounts Developer Documentation"
---

## Introduction

Keyless accounts represent a pivotal advancement within the Aptos ecosystem, revolutionizing the way users onboard and interact with decentralized applications (dApps). Aptos Keyless allows users to gain ownership of an Aptos blockchain account from their existing OpenID Connect (OIDC) account(s) (e.g., Sign in with Google; Sign in with Apple), rather than from a traditional secret key or mnemonic. In a nutshell, with Aptos Keyless, a user’s blockchain account is their OIDC account. Over time, Keyless will evolve to support many IdPs who support the OIDC standard, but we will begin with support for the providers listed [here TOD](https://github.com/aptos-foundation/AIPs/blob/main/aips/aip-61.md). 

At the core of the keyless accounts paradigm lies a deep understanding of user experience and security challenges prevalent in traditional blockchain systems. Managing private keys, the cornerstone of user identity and asset ownership, often proves cumbersome and error-prone for users, particularly those lacking technical expertise. Keyless accounts offer an elegant solution by obviating the need for users to grapple with the intricacies of private key management. Instead, users authenticate themselves through access to common social sign in options like Google, Apple, and many more. With this new system comes some important tradeoffs to understand on behalf of your users before implementing Keyless in your application. The following pages will expand on the benefits of Keyless accounts, how to integrate, the system architecture, and FAQs. For a more verbose and technical dive into Keyless accounts, please see [AIP-61-Keyless Accounts](https://github.com/aptos-foundation/AIPs/blob/main/aips/aip-61.md).

There are two ways to interact with Keyless accounts in the Aptos ecosystem. Developers are able to either 1) integrate the Aptos Keyless SDK directly into their dApp or 2) integrate a wallet, like Aptos Connect, that supports Keyless account creation.  This documentation will focus on case #1 and more details on #2 can be found here. Please note that a direct integration of the Keyless SDK will result in user accounts being domain specific to your dApp whereas the use of a wallet integration will allow your users to carry their accounts to any application that supports that wallet. 

Note: the Aptos Keyless SDK and Aptos Connect are representative examples of the aforementioned product experience, but developers in our ecosystem are building alternatives, like a Keyless Unity SDK and alternative wallet products with Keyless integration. 

## Aptos Keyless Benefits

Keyless accounts are revolutionary to users for the following reasons:

1. Simplified login user experience: "1-click" account creation via familiar Web2 logins like Sign In with Google.
2. Enhanced dApp user experience: Ability to transact on the Aptos blockchain without needing to navigate away from the application experience to download a wallet.
3. Secure key management: Requires no manual secret key management by the user. Users sign transactions with the JSON Web Token (JWT) token issued by OIDC providers. As such, blockchain account access is synonymous with access to one’s OIDC account
4. Improved account recovery: Web2-like recovery flows are available to regain access to one’s blockchain account in case the user ever loses access to their OIDC account.
5. Seamless cross-device experiences: Users log in with their OIDC account no matter what device they are on - no need to download wallet software on each device, import their keys and encrypt them with a password, which must be maintained.

With these benefits, come some important structural components of Keyless accounts for developers to be aware of. You can see more on this in our FAQs.

## OIDC Support

Aptos Keyless supports the following IdPs on our network(s). Support for additional IdPs to come. Please reach out if you have need for coverage for a specific use case. 

| Identity Provider | Devnet | Testnet | Mainnet
| ----------------- | -------|---------|---------|
| Google            | Live   | Live    | Live |
| Apple             | Live   | Live    | - |
| Microsoft         | In review | - | - |
| Github            | In review | - | - |
| Facebook          | In review | - | - |

To integrate Aptos Keyless into your dApp, you must register your dApp with at least one of the available identity providers via their OIDC registration process. Each respective registration process will assign a Client ID to your application, which will serve as an identifier for your application in the Keyless architecture.  

### Registering your dApp with Google

**Step 1: Sign in to Google Developer Console**

1. Navigate to the [Google Cloud Console](https://console.cloud.google.com/).
2. Sign in with your Google account credentials.

**Step 2: Create a New Project**

1. If you don't have an existing project, click on the "Select a project" dropdown menu at the top of the page and choose "New Project."
2.  Enter a name for your project and click "Create." Detailed instructions can be found [here](https://cloud.google.com/resource-manager/docs/creating-managing-projects#creating_a_project).

**Step 3: Configure Consent Screen**

1. In the left sidebar, navigate to "APIs & Services" > "OAuth consent screen."
2. Choose "External" user type and click "Create."
3. Enter the required details such as the application name, user support email, and developer contact information.
4. Optionally, add additional details like the application logo and privacy policy URL.
5. Click "Save and continue." Detailed steps are available [here](https://developers.google.com/workspace/guides/create-credentials#configure_the_oauth_consent_screen).

**Step 4: Register Your Application**

1. In the left sidebar, navigate to "APIs & Services" > "Credentials."
2. Click on "Create Credentials" and select "OAuth client ID."
3. Choose the application type (e.g., Web application, Desktop app, or Mobile app).
4. Enter the necessary details such as the name of your application and the authorized redirect URIs. For OIDC, the redirect URIs should follow the format https://your-app-domain.com/auth/google/callback. 
5. Click "Create."

**Step 5: Obtain Client ID and Client Secret**

1. After creating the OAuth client ID, Google will provide you with a client ID and client secret. These credentials are essential for authenticating your application.
2. Note down the client ID and client secret securely. Do not expose them publicly.

**Step 6: Configure OIDC Integration in Your Application**

1. Integrate OIDC authentication into your application using a suitable OIDC library or framework (e.g., Passport.js for Node.js, Spring Security for Java, or Auth0 for various platforms).
2. Use the client ID and client secret obtained from Google to configure OIDC authentication in your application settings.
3. Set up the appropriate callback URL (https://your-app-domain.com/auth/google/callback) for handling authentication responses from Google.

### Registering your dApp with Apple

**Step 1: Sign in to Apple Developer Account**

1. Go to the [Apple Developer website](https://developer.apple.com/).
2. Sign in with your Apple ID.

**Step 2: Create a New App ID**

1. Navigate to the "Certificates, Identifiers & Profiles" section.
2. Click on "Identifiers" in the sidebar.
3. Click the "+" button to create a new App ID.
4. Fill in the details for your app, including the name and bundle ID.
5. Enable "Sign in with Apple" under the "Capabilities" section.
6. Click "Continue" and then "Register" to create the App ID.

**Step 3: Generate a Private Key**

1. In the "Keys" section of the "Certificates, Identifiers & Profiles" page, click the "+" button to create a new key.
2. Enter a name for the key, enable the "Sign in with Apple" capability, and click "Continue."
3. Download the generated private key and securely store it. This key will be used to authenticate your app with Apple's OIDC service.

**Step 4: Configure Redirect URIs**

1. Under the "App ID" section, locate your newly created App ID and click on it.
2. Scroll down to the "Sign in with Apple" section and click on "Edit."
3. Add the redirect URIs that your application will use for callback after authentication. The format should be https://your-app-domain.com/auth/apple/callback.
4. Click "Save" to update the settings.

**Step 5: Set Up Your OIDC Integration**

1. Use an OIDC library or framework compatible with Apple's OIDC service (e.g., Passport.js for Node.js, Spring Security for Java).
2. Configure your application to use the client ID and private key obtained from Apple during the registration process.
3. Set up the appropriate callback URL (https://your-app-domain.com/auth/apple/callback) for handling authentication responses from Apple.

## Aptos Keyless Integration Guide

:::info Only devnet and testnet is supported
Currently Aptos Keyless is only supported in devnet and testnet. Mainnet support scheduled for June 7.
:::

:::tip Keyless Account Scoping
Use of the **_Aptos Keyless Integration Guide_** will allow for the integration of keyless accounts directly into your application. This means that blockchain accounts are scoped to your application's domain (logging in with your Google account on dApp A and logging in with your Google account on dApp B will create separate accounts). Stay tuned for more to come on Aptos’ plan to allow Keyless accounts to be used portably across applications.

To provide feedback, get support, or be a design partner as we enhance Aptos Keyless, join us here: https://t.me/+h5CN-W35yUFiYzkx
:::

At a high level, there are three steps to follow in order to integrate Keyless Accounts.

1. **Configure your OpenID integration with your IdP.** In this step, the dApp will register with the IdP of choice (e.g. Google) and receive a `client_id`
2. **Install the Aptos TypeScript SDK.**
3. **Integrate Keyless Account support in your application client**
   1. Set up the `"Sign In with [Idp]"` flow for your user.
   2. Instantiate the user’s `KeylessAccount`
   3. Sign and submit transactions via the `KeylessAccount`.

### Step 1. Configure your OpenID integration with your IdP

#### Supported Identity Providers

TODOTODO

Currently only Google is supported. We will support additional OIDC providers in the future (e.g., Apple, Kakaotalk, Microsoft, etc.).

| Identity Provider | Auth URL                                                                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Google            | https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=id_token&scope=openid%20email&nonce=${NONCE} |

The implicit flow (no authorization code exchange) is the preferred method of authentication. The integration steps assume use of implicit flow.

### Step 2. Install the Aptos TypeScript SDK

```bash
# Experimental SDK version with Keyless support.
pnpm install @aptos-labs/ts-sdk
```

:::info SDK is experimental
The API and SDK is still experimental and being actively developed under the '@zeta' tag.
If your integration stops working please try upgrading the package to the latest '@zeta' version of the SDK. This version may lack features of the non-experimental SDK.
:::

### Step 3. Client Integration Steps

Below are the default steps for a client to integrate Keyless Accounts

#### 1. Present the user with a "Sign In with [IdP]" button on the UI

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

#### 2. Handle the callback by parsing the token and create a Keyless account for the user

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

## How does Keyless Work?

Aptos Keyless enables a dApp to **derive** and **access** a blockchain account for a user if that user successfully signs in to dApp via an OIDC provider (e.g., Google). Importantly, this blockchain account is **scoped to the dApp**. This means other dApps, who can similarly sign-in the same user, via the same OIDC provider, are not able to access this account and instead get their own account.

_But how does this work?_

At a very high level, a successful sign-in into the dApp via the OIDC provider will result in the dApp receiving a **JSON Web Token (JWT)** signed by the OIDC provider. The JWT will contain, among other things, three important pieces of information:

1. The user’s identity (contained in the JWT’s “sub” field)
2. The dApp’s identity (contained in the JWT’s “aud” field)
3. Application-specific data; specifically, an ephemeral public key (EPK) (contained in the JWT’s “nonce” field), whose associated ephemeral secret key (ESK) only the user knows.

Now, assume that the user’s blockchain account address is (more or less) a hash of the user’s identity in “sub” and the dApp’s identity in “aud” from above.

Then, the key observation is that the signed JWT effectively acts as a digital certificate, temporarily binding the blockchain address to the EPK, and allowing the EPK to sign TXNs for it. In other words, it securely delegates TXN signing rights for this blockchain account to the EPK. (Note: The EPK contains an expiration date and is thus short-lived.)

Importantly, if the user loses their ESK, the user can obtain a new signed JWT over a new EPK via the application by simply signing in again via the OIDC provider. (Or, in some cases, by requesting a new signed JWT using an OAuth refresh token.)

With this system, the challenge is maintaining privacy, since revealing the JWT on-chain would leak the user’s identity. Furthermore, revealing the EPK to the OIDC provider would allow it to track the user’s TXN on-chain.

We explain below how Keyless accounts work and how they address these challenges.
Flow: Deriving a keyless account for a user in a dApp
First, let us look at how a dApp can sign-in a user via (say) Google, derive that user’s keyless blockchain address and, for example, send that user an asset.

Step 1: The user generates an ephemeral key pair: an EPK with an expiration date, and its associated ESK. The dApp keeps the EPK and safely stores the ESK on the user-side (e.g., in the browser’s local storage, or in a trusted enclave if the ESK is a WebAuthn passkey).

Step 2: The dApp commits to the EPK using a blinding factor ⍴. When the user clicks on the “Sign in with Google” button, the dApp redirects the user to Google’s sign in page and, importantly, sets the nonce parameter in the URL to the EPK commitment. This hides the EPK from Google, maintaining privacy of the user’s TXN activity.

Step 3: Typically, the user has an HTTP cookie from having previously-signed-in to their Google account, so Google merely checks this cookie. If the user has multiple Google accounts, Google asks the user to select which one they want to sign-in into dApp.xyz. (The less common path is for the user to have to type in their Google username and password.)

Step 4: Once the user successfully signed in (via HTTP cookie or password), then Google will send the dApp a signed JWT, which includes the user's sub identifier (e.g., "uid-123"), the application’s aud identifier (e.g., "dApp-xyz") and the nonce with the EPK commitment. (This assumes that the dApp.xyz application has previously registered with Google and received this "dApp-xyz" identifier.)

Step 5: The dApp now has almost everything it needs to derive a keyless account for the user: the user’s identifier (sub) and the dApp’s identifier (aud). But, to preserve the privacy of the user, the dApp will use a third piece of information: a blinding factor r called a pepper. The dApp will contact a so-called guardian who will deterministically compute a random r for the given (sub, aud). Importantly, the guardian will only reveal r to the dApp upon seeing a validly-signed JWT for the queried (sub, aud).

Step 6: The dApp derives the address of the account as addr = H("uid-123", "dApp-xyz", r), where H is a cryptographic hash function.

Note that the pepper r is used to hide the user and app identity inside the address since, as we described above, only an authorized user with a valid JWT will be able to obtain this pepper.

Also, note that the address is independent of the EPK. This is why the ESK need not be long-lived and can be lost.

Finally, the dApp can, for example, send an NFT to the user at their address addr.

But how can the dApp authorize TXN from this account at addr? We discuss that next.
Flow: Obtaining a zero-knowledge proof before transacting
In the previous flow, we showed how a dApp can sign in a Google user and derive their privacy-preserving keyless address, with the help of a guardian.

Next, we show how this dApp can obtain a zero-knowledge proof (ZKP), which will allow it to authorize transactions from this address for the user. Importantly, the transaction will hide the user’s identifying information (e.g., the "sub" field).


Step 1: The dApp sends all the necessary public information (i.e., epk, GPK) and private information (i.e., JWT, signature σG from Google, EPK blinding factor ⍴, and pepper r) to the prover service.

Step 2: The prover derives the user’s address addr and computes a zero-knowledge proof (ZKP) π for the keyless relation 𝓡keyless (described below). It then sends π to the dApp.

The ZKP will be used to convince the validators that the user is in possession of (1) a JWT signed by Google, (2) which commits to the epk in its "nonce" field, and (3) contains the same information as in the address, without leaking anything about the JWT, its signature, ⍴, or r.

More formally, the ZKP π convinces a verifier, who has public inputs (addr, epk, GPK), that the prover knows secret inputs (jwt, σG, ⍴, r) such that the relation 𝓡keyless depicted below holds:



Recall from before that the signed JWT acts as a digital certificate, temporarily binding the blockchain address addr to the EPK, and allowing the epk to sign TXNs for it. However, the JWT would leak the user’s identity, so The ZKP serves to hide the JWT (and other private information) while arguing that the proper checks hold.

Next, we show how the dApp can now authorize TXNs from addr.
Flow: Sending a TXN from a keyless account
The previous flow explained how a dApp can obtain a ZKP from the prover service. Next, we describe how the dApp leverages this ZKP to transact for the account.


Step 1: The dApp obtains an ephemeral signature σeph over the TXN from the user. This could be done behind the user’s back, by the dApp itself who might manage the ESK. Or, it could be an actual signing request sent to the user, such as when the ESK is a WebAuthn passkey, which is stored on the user’s trusted hardware.

Step 2: The dApp sends the TXN, the ZKP π, the ephemeral public key epk, the ephemeral signature σeph to the blockchain validators.

Step 3: To check the TXN is validly-signed, the validators perform several steps: (1) check that epk has not expired, (2) fetch the user’s address addr from the TXN, (3) verify the ZKP against addr, epk, and Google’s GPK, and (4) verify the ephemeral signature σeph on the TXN against the epk. If all these checks pass, they can safely execute the TXN.

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

## Ceremony

Aptos engaged in iterative trusted setup ceremonies to secure our Groth16 based ZK circuit. A trusted setup ceremony is a multi-party computation (MPC) that outputs the prover and verifier keys used in a zkSNARK system, common for efficient zero-knowledge proof systems. As long as a single participant in the ceremony is honest, the process is considered secure and the outputs will be valid. Our initial ceremony consisted of 140+ members of the Aptos ecosystem, which was an incredible show of the power of decentralization, security, and community - and a follow up ceremony was held following a developer feedback phase that allowed us to identify and implement an improvement to our circuit that helped us ensure Keyless is universally accessible. Our final ceremony contributions can be found in this repo [here] and verified using the process outlined [here].

## Frequently Asked Questions

What is the best way to use Keyless accounts?

The best way to use Keyless accounts depends on your use case. If seamless account interoperability across our ecosystem is important to your dApp experience (think: mint an NFT on your platform and allow users to sell their NFT on an external NFT marketplace), you might want to consider integrating a wallet that supports Keyless. If you want to create a fully embedded account experience in your dApp, allowing users to transact without ever leaving your application, you might want to do a direct integration of the Aptos Keyless SDK.

Does Keyless work with sponsored transactions or do my users always need to pay for their own gas?

Yes, Keyless works with sponsored transactions like any regular private key based account. 

If I use the Aptos Keyless SDK, can my user’s use their accounts across other dApps?

Keyless accounts are scoped to the domain they are created with as the address derivation includes a unique identifier for the application. 

What is Aptos Connect? Account Management Infrastructure: Central to the keyless accounts paradigm is a robust account management infrastructure that facilitates the creation, deletion, and management of user accounts, alongside the storage and retrieval of associated metadata.

While the adoption of keyless accounts heralds a paradigm shift towards enhanced usability and security, it is imperative for developers to remain cognizant of tradeoffs associated with this system vs. common alternatives like plaintext private keys.

Dependency on External Services: Keyless accounts introduce a degree of dependency on external authentication services, necessitating contingency plans and fallback mechanisms to mitigate service disruptions and ensure uninterrupted user access
