---
title: "Use create-aptos-dapp"
slug: "index"
hidden: false
---

# create-aptos-dapp

`create-aptos-dapp` provides a starter kit for dapp developers to easily bootstrap a dapp on the Aptos network.

## Quick Start

To start with the create-aptos-dapp tool you can simply run this command on your terminal

```bash
npx create-aptos-dapp
```

## **What is create-aptos-dapp?**

`create-aptos-dapp` simplifies the initial setup and configuration process, provides a modern development workflow, gives pre-made e2e dapp templates and offers a range of benefits that save time and effort, enabling developers to focus on building dapps on Aptos effectively.

## **Why use create-aptos-dapp?**

- **Template Setup**: `create-aptos-dapp` tool generates a predefined end-to-end dapp templates and configuration files for you. This saves you from manually setting up the basic project structure, which can be time-consuming and error-prone.
- **Dependencies Management**: `create-aptos-dapp` tool manages project dependencies for you. It generates a `package.json` file with the required packages and their versions, ensuring that your project uses compatible libraries.
- **Move Folder:** `create-aptos-dapp` generates a `move` folder that includes the basic structure for move modules. It creates a `Move.toml` and `sources` folder with a move module (smart contract) in it.
- **Best Practices**: `create-aptos-dapp` tool incorporates best practices and structure recommendations to develop for the Aptos network. This ensures that your project starts with a solid foundation.
- **Built-in Scripts**: `create-aptos-dapp` tool includes built-in scripts for common tasks like initialize default profile, compile move module and publish smart contract to chain. This simplifies common development workflows.

## What tools create-aptos-dapp utilizes?

- React framework
- Vite development tool
- shadcn/ui + tailwind for styling
- Aptos TS SDK
- Aptos Wallet Adapter
- Node based Move commands scripts

## How to use create-aptos-dapp?

To create a Aptos dapp, open your terminal, `cd` into the directory you’d like to create the dapp in, and run the following command:

```jsx
npx create-aptos-dapp
```

That command will download the tool and start the wizard flow where you can make project selections

```jsx
// todo add a gif/recording of the wizard flow
```

Finally, the tool would prompt next steps for you to follow

## Templates

`create-aptos-dapp` provides you with pre-made end-to-end dapp templates, i.e a ready dapp with configurations and a beautiful UI to get you started with creating a dapp on Aptos.

The goals of the templates are to

1. Get you familiar with Aptos Standards by having an end-to-end dapp template examples
2. Educate you on how to build a dapp on Aptos from the front-end side and the smart contract side and how everything connects together
3. Provide you with a pre-made templates you can easily configure and deploy into a live server

## [Digital Asset Template](./templates/digital-asset.md)

## [Fungible Asset Template](./templates/fungible-asset.md)
