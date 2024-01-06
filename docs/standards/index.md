---
title: "Aptos Standards"
---

# Aptos Standards

Standards define a common interoperable interface for all developers to build upon. They consist of rules to ensure compatibility across applications and wallets on the Aptos blockchain. See a [list of known coin resource addresses](https://github.com/hippospace/aptos-coin-list) in Aptos provided by
hippospace.

## Move Standard

### [Aptos Object](./aptos-object.md)

The [Object model](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-framework/sources/object.move) allows Move to represent a complex type as a set of resources stored within a single address and offers a rich capability model that allows for fine-grained resource control and ownership management.

## Asset Standards

### [Digital Asset (DA)](./digital-asset.md)

The new [Aptos Digital Asset Standard](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-token-objects/sources/token.move) allows:

- Rich, flexible assets and collectibles.
- Easy enhancement of base functionality to provide richer custom functionalities. An example of this is the [aptos_token module](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-token-objects/sources/aptos_token.move)

Digital Asset (DA) is recommended for any new collections or protocols that want to build NFT or semi-fungible tokens.

### [Fungible Asset (FA)](./fungible-asset.md)

The new [Aptos Fungible Asset Standard](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-framework/sources/fungible_asset.move) is a standard meant for simple, type-safe, and fungible assets based on object model intending to replace Aptos coin.
Fungible Asset (FA) offers more features and flexibility to Aptos move developers on creating and managing fungible assets.

## Wallet Standard

### [Aptos Wallet](./wallets.md)

The Wallet standard ensures that all wallets use the same functionality for key features. This includes:

- The same mnemonic so that wallets can be moved between providers.
- [Wallet adapter](../integration/wallet-adapter-concept.md) so that all applications can interact seamlessly with a common interface.

## Legacy Standards

### [Aptos Token](./aptos-token.md)

The old existing [Token module](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-token/sources/token.move), on the other hand:

- Encapsulates rich, flexible assets and collectibles. These assets are discrete (non-decimal) and can be fungible, semi-fungible, or non-fungible.
- The token standard is in its own `AptosToken` package at the Address `0x3` to allow for rapid iteration based on feedback from the community.

### [Aptos Coin](./aptos-coin.md)

The [Coin module](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-framework/sources/coin.move) is a lightweight standard meant for simple, type-safe, and fungible assets. The coin standard is separated out into its own Move module to ensure that:

- Applications and users can create and use simple tokens, with high performance and low gas overhead.
- The Coin standard is part of the Aptos core framework, so it can be used for currencies, including the gas currency.
