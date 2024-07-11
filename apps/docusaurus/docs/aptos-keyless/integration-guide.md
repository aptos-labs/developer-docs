---
title: "Integration Guide"
# id: "Aptos Keyless Integration Guide"
---

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

## Example Implementation

You can find an example app demonstrating basic Keyless integration with Google in the [aptos-keyless-example repository](https://github.com/aptos-labs/aptos-keyless-example/). Follow the directions in the README to start with the example. For more detailed instructions on keyless, please read the rest of this integration guide.

## Step 1. Configure your OpenID integration with your IdP

The first step is to setup the configuration with your IdP(s).

[Follow the instructions here](oidc-support.md)

## Step 2. Install the Aptos TypeScript SDK

```bash
# Keyless is supported in version 1.18.1 and above
pnpm install @aptos-labs/ts-sdk
```

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

        const aptos = new Aptos(new AptosConfig({network: Network.DEVNET})); // Configure your network here
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
