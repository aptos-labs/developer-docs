---
title: "Aptos Wallet Standard"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Aptos Wallet Standard

The wallet standard provides guidelines for interoperability between wallet types. This ensures dapp developers do not need to change
their applications to handle different wallets. This standard offers a single interface for all dapp developers, allowing easy additions of new wallets and more users to each application. This interoperability allows users to choose which wallet they want without worrying about whether apps support their use cases.

In order to ensure interoperability across Aptos wallets, the following is required:

1. Mnemonics - a set of words that can be used to derive account private keys
2. dapp API - entry points into the wallet to support access to identity managed by the wallet
3. Key rotation - the feature handling both the relationship around mnemonics and the recovery of accounts in different wallets

## Mnemonics phrases

A mnemonic phrase is a multiple word phrase that can be used to generate account addresses.
We recommend one mnemonic per account in order to handle key rotation better.
However, some wallets may want to support one mnemonic to many accounts coming from other chains. To support both of these use cases, the Aptos wallet standard uses a [Bitcoin Improvement Proposal (BIP44)](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) to derive path for mnemonics to accounts.

### Creating an Aptos account

Aptos account creation can be supported across wallets in the following manner:

1. Generate a mnemonic phrase, for example with BIP39.
2. Get the master seed from that mnemonic phrase.
3. Use the BIP44-derived path to retrieve an account address (e.g. `m/44'/637'/0'/0'/0'`)
   - See the [Aptos TypeScript SDK's implementation for the derive path](https://github.com/aptos-labs/aptos-core/blob/1bc5fd1f5eeaebd2ef291ac741c0f5d6f75ddaef/ecosystem/typescript/sdk/src/aptos_account.ts#L49-L69)
   - For example, Petra Wallet always uses the path `m/44'/637'/0'/0'/0'` since there is one mnemonic per one account.

```typescript
/**
   * Creates new account with bip44 path and mnemonics,
   * @param path. (e.g. m/44'/637'/0'/0'/0')
   * Detailed description: {@link https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki}
   * @param mnemonics.
   * @returns AptosAccount
   */
  static fromDerivePath(path: string, mnemonics: string): AptosAccount {
    if (!AptosAccount.isValidPath(path)) {
      throw new Error("Invalid derivation path");
    }

    const normalizeMnemonics = mnemonics
      .trim()
      .split(/\s+/)
      .map((part) => part.toLowerCase())
      .join(" ");

    const { key } = derivePath(path, bytesToHex(bip39.mnemonicToSeedSync(normalizeMnemonics)));

    return new AptosAccount(new Uint8Array(key));
  }
```

### Supporting one mnemonic per multiple account wallets

This is not recommended because the one-mnemonic-to-many-accounts paradigm makes it harder to handle rotated keys (the mnemonic changes for one account but not others).
However, many wallets from other ecosystems use this paradigm, and take these steps to generate accounts

1. Generate a mnemonic phrase, for example with BIP39.
2. Get the master seed from that mnemonic phrase.
3. Use the BIP44-derived path to retrieve private keys (e.g. `m/44'/637'/i'/0'/0'`) where `i` is the account index.
   - See the [Aptos TypeScript SDK's implementation for the derive path](https://github.com/aptos-labs/aptos-core/blob/1bc5fd1f5eeaebd2ef291ac741c0f5d6f75ddaef/ecosystem/typescript/sdk/src/aptos_account.ts#L49-L69)
4. Increase `i` until all the accounts the user wants to import are found.
   - Note: The iteration should be limited, if an account doesn't exist during iteration, keep iterating for a constant `address_gap_limit` (10 for now) to see if there are any other accounts. If an account is found we will continue to iterate as normal.

ie.

```typescript
const gapLimit = 10;
let currentGap = 0;

for (let i = 0; currentGap < gapLimit; i += 1) {
  const derivationPath = `m/44'/637'/${i}'/0'/0'`;
  const account = fromDerivePath(derivationPath, mnemonic);
  const response = account.getResources();
  if (response.status !== 404) {
    wallet.addAccount(account);
    currentGap = 0;
  } else {
    currentGap += 1;
  }
}
```

## Wallet and dapp communication

More important than account creation, is how wallets connect to dapps. Additionally, following these APIs will allow for the wallet developer to integrate with the [Aptos Wallet Adapter Standard](../integration/wallet-adapter-concept.md).

Aptos' wallet standard follows a [chain agnostic generalized standard](https://github.com/wallet-standard/wallet-standard) for wallets and dapps communication that defines interfaces and conventions for applications interaction with injected wallets.

On a high level, the APIs are as follows:

- `connect()`, `disconnect()`
- `getAccount()`
- `getNetwork()`
- `signTransaction(transaction: AnyRawTransaction)`
- `signMessage(payload: AptosSignMessageInput)`
- Event listening (`onAccountChanged(newAccount: AccountInfo)`, `onNetworkChanged(newNetwork: NetworkInfo)`)

### Specification

**Standard Features**

A standard feature is a method that must or should be supported and implemented by a wallet.
Here is a list of the suggested [Aptos features](https://github.com/aptos-labs/wallet-standard/tree/main/src/features).

Each feature should be defined with an `aptos` namespace, `colon` and the `{method}` name, i.e `aptos:connect`.

> a feature marked with `*` is an optional feature

`aptos:connect` method to establish a connection between a dapp and a wallet.

```ts
// `silent?: boolean` - gives ability to trigger connection without user prompt (for example, for auto-connect)
// `networkInfo?: NetworkInfo` - defines the network that the dapp will use (shortcut for connect and change network)

connect(silent?: boolean, networkInfo?: NetworkInfo): Promise<UserResponse<AccountInfo>>;
```

`aptos:disconnect` method to disconnect a connection established between a dapp and a wallet

```ts
disconnect(): Promise<void>;
```

`aptos:getAccount` to get the current connected account in the wallet

```ts
getAccount():Promise<UserResponse<AccountInfo>>
```

`aptos:getNetwork` to get the current network in the wallet

```ts
getNetwork(): Promise<UserResponse<NetworkInfo>>;
```

`aptos:signTransaction` for the current connected account in the wallet to sign a transaction using the wallet.

```ts
// `transaction: AnyRawTransaction` - a generated raw transaction created with Aptos’ TS SDK

signTransaction(transaction: AnyRawTransaction):AccountAuthenticator
```

`aptos:signMessage` for the current connected account in the wallet to sign a message using the wallet.

```ts
// `message: AptosSignMessageInput` - a message to sign

signMessage(message: AptosSignMessageInput):Promise<UserResponse<AptosSignMessageOutput>>;
```

`aptos:onAccountChange` event for the wallet to fire when an account has been changed in the wallet.

```ts
// `newAccount: AccountInfo` - The new connected account

onAccountChange(newAccount: AccountInfo): Promise<void>
```

`aptos:onNetworkChange` event for the wallet to fire when the network has been changed in the wallet.

```ts
// `newNetwork: NetworkInfo` - The new wallet current network

onNetworkChange(newNetwork: NetworkInfo):Promise<void>
```

`aptos:signAndSubmitTransaction*` method to sign and submit a transaction using the current connected account in the wallet.

```ts
// `transaction: AnyRawTransaction` - a generated raw transaction created with Aptos’ TS SDK

signAndSubmitTransaction(transaction: AnyRawTransaction): Promise<UserResponse<PendingTransactionResponse>>;
```

`aptos:changeNetwork*` event for the dapp to send to the wallet to change the wallet’s current network

```ts
// `network:NetworkInfo` - The network for the wallet to change to

changeNetwork(network:NetworkInfo):Promise<UserResponse<{success: boolean,reason?: string}>>
```

`aptos:openInMobileApp*` a function that supports redirecting a user from a web browser on mobile to a native mobile app. The wallet plugin should add the location url a wallet should open the in-app browser at.

```ts
openInMobileApp(): void
```

Types

> Note: `UserResponse` type is used for when a user rejects a rejectable request. For example, when user wants to connect but instead closes the window popup.

```ts
export interface UserApproval<TResponseArgs> {
 status: 'approved'
 args: TResponseArgs
}

export interface UserRejection {
 status: 'rejected'
}

export type UserResponse<TResponseArgs> = UserApproval<TResponseArgs> | UserRejection;

export interface AccountInfo = { account: Account, ansName?: string }

export interface NetworkInfo {
  name: Network
  chainId: number
  url?: string
}

export type AptosSignMessageInput = {
  address?: boolean
  application?: boolean
  chainId?: boolean
  message: string
  nonce: string
}

export type AptosSignMessageOutput = {
  address?: string
  application?: string
  chainId?: number
  fullMessage: string
  message: string
  nonce: string
  prefix: 'APTOS'
  signature: Signature
}
```

**Standard Errors**

### Standard Implementation

---

We publish a helper library [@aptos-labs/wallet-standard](https://www.npmjs.com/package/@aptos-labs/wallet-standard) which provides types and utilities that make it simple to get started

<ins>Wallet Implementation</ins>

A wallet must implement a [AptosWallet interface](https://github.com/aptos-labs/wallet-standard/blob/main/src/wallet.ts) with the wallet provider info and features:

```ts
import { AptosWallet } from "@aptos-labs/wallet-standrd";

class MyWallet implements AptosWallet {
  url: string;
  version: "1.0.0";
  name: string;
  icon:
    | `data:image/svg+xml;base64,${string}`
    | `data:image/webp;base64,${string}`
    | `data:image/png;base64,${string}`
    | `data:image/gif;base64,${string}`;
  chains: AptosChain;
  features: AptosFeatures;
  accounts: readonly AptosWalletAccount[];
}
```

A wallet must implement a [AptosWalletAccount interface](https://github.com/aptos-labs/wallet-standard/blob/main/src/account.ts) that represents the accounts that have been authorized by the dapp.

```ts
import { WalletAccount } from "@aptos-labs/wallet-standrd";

enum AptosAccountVariant {
  Ed25519,
  MultiEd25519,
  SingleKey,
  MultiKey,
}

class MyWalletAccount implements WalletAccount {
  address: string;

  publicKey: Uint8Array;

  chains: AptosChain;

  features: AptosFeatures;

  variant: AptosAccountVariant;

  label?: string;

  icon?:
    | `data:image/svg+xml;base64,${string}`
    | `data:image/webp;base64,${string}`
    | `data:image/png;base64,${string}`
    | `data:image/gif;base64,${string}`
    | undefined;
}
```

A wallet registers itself using the [registerWallet](https://github.com/wallet-standard/wallet-standard/blob/master/packages/core/wallet/src/register.ts#L25) method to notify the dapp it is ready to be registered.

```ts
import { registerWallet } from "@aptos-labs/wallet-standrd";

const myWallet = new MyWallet();

registerWallet(myWallet);
```

<ins>Dapp Implementation</ins>

A dapp uses the [getAptosWallets()](https://github.com/aptos-labs/wallet-standard/blob/main/src/detect.ts#L30) function which gets all the Aptos standard compatible wallets.

```ts
import { getAptosWallets } from "@aptos-labs/wallet-standard";

let { aptosWallets, on } = getAptosWallets();
```

On first load, and before the dapp has been loaded, it gets all the wallets that have been registered so far. To keep getting all the registered wallets after this point, the dapp must add an event listener for new wallets that get registered receiving an unsubscribe function, which it can later use to remove the listener.

```ts
const removeRegisterListener = on("register", function () {
  // The dapp can add new aptos wallets to its own state context as they are registered
  let { aptosWallets } = getAptosWallets();
});

const removeUnregisterListener = on("unregister", function () {
  let { aptosWallets } = getAptosWallets();
});
```

The dapp has an event listener now, so it sees new wallets immediately and doesn't need to poll or list them again.
This also works if the dapp loads before any wallets (it will initialize, see no wallets, then see wallets as they load)

A dapp makes a wallet request by calling the feature name that coresponds to the desired action.

```ts
const onConnect = () => {
  this.wallet.features["aptos:connect"].connect();
};
```

## Appendix

- **[AIP-62](https://github.com/aptos-foundation/AIPs/blob/main/aips/aip-62.md)** for wallet standard
