# Surf: TypeScript Type Safety for Move Contracts

## What is Surf

Surf is a TypeScript library built on top of the Aptos TypeScript SDK and the wallet adapter that provides static type safety for your Move contracts by inferring type from contract ABI (Application Binary Interface). It allows you to catch type errors at compile time rather than at runtime. Most existing TypeScript IDEs will automatically provide warnings if you try to access fields that don't exist, or provide wrong input types.

## Usage

First, download the ABI of the Move contract and save it to a TypeScript file. In this case, we're naming the file `abi.ts` in the `src/utils` folder.

```bash filename="gen_abi.sh"
#! /bin/bash

# replace it with the network your contract lives on
NETWORK=testnet
# replace it with your contract address
CONTRACT_ADDRESS=0x12345
# replace it with your module name, every .move file except move script has module_address::module_name {}
MODULE_NAME=fungible_asset_launchpad

# save the ABI to a TypeScript file
echo "export const ABI = $(curl https://fullnode.$NETWORK.aptoslabs.com/v1/accounts/$CONTRACT_ADDRESS/module/$MODULE_NAME | sed -n 's/.*"abi":\({.*}\).*}$/\1/p') as const" > src/utils/abi.ts
```

With the ABI, you can use Surf as a layer on top of the Aptos TypeScript SDK client `Aptos`, when interacting with Move contracts. For non-contract related operations, the `Aptos` will still need to be used.

```ts filename="src/utils/aptos.ts"
import { Aptos, AptosConfig } from "@aptos-labs/ts-sdk";
import { ABI } from "./abi";

const config = new AptosConfig();
// First, create an Aptos client
export const aptos = new Aptos(config);
// Second, create a SurfClient with the Aptos client and the ABI
export const surfClient = createSurfClient(aptos).useABI(ABI);
```

## Resources

- [Surf GitHub](https://github.com/ThalaLabs/surf)
- [A simple Next.js example demonstrating Surf](https://github.com/ThalaLabs/surf/tree/main/example)
- [An example of a fungible asset launchpad using Surf](https://github.com/aptos-labs/move-by-examples/tree/main/fungible-asset-launchpad): This example is part of the Solana to Aptos guide on Aptos Learn, you can try it [here](https://fungible-asset-launchpad.vercel.app/) and read the complete tutorial [here](https://learn.aptoslabs.com/example/solana-to-aptos-2/fa-launchpad/demo).

## Credits

Surf is built by [Thala Labs](https://thala.fi/), an Aptos ecosystem project, and maintained together by the Aptos community.

## Feedback

If you have any feedback or questions, please open an issue on [Surf's GitHub](https://github.com/ThalaLabs/surf/issues).