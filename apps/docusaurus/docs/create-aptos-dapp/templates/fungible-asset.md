---
title: "Create Aptos Dapp Fungible Asset Template"
hidden: false
---

# Create Aptos Dapp Fungible Asset Template

The Fungible Asset template provides an end-to-end Fungible Asset minting dapp. With this dapp, you can learn how Fungible Assets work on Aptos, how to write a smart contract and how to write a front end connected to the contract. In addition, it offers a beautiful pre-made UI for a Fungible Asset minting dapp users can quickly adjust and deploy into a live server.

Read more about the [Aptos Fungible Asset Standard](https://aptos.dev/standards/fungible-asset)

The Fungible Asset template provides 3 pages:

1. Public Mint Fungible Asset Page - A page for the public to mint Fungible Assets.
2. Create Fungible Asset page - A page for creating new asset. This page is not accessible on production.
3. My Fungible Assets page - A page to view all the assets created under the current Move module (smart contract). This page is not accessible on production.

## Public Mint Page

First run the dapp locally with `npm run dev`. You would see the public mint page with some data placeholders for content and images. Some of the content can be configured in the `frontend/config.ts` file and some will be pulled from an Aptos full node once you configure your collection.

### Configure an asset address

For the public mint page to fetch the asset, you will need to configure the asset address. First, assign the `asset_id` variable in the `frontend/config.ts` file with the asset address. If you have [created the asset](#create-a-fungible-asset-page) with the tool, you should be able to find it on the [My Assets Page](#my-assets-page).

### Modify static content

Once the asset address has been configured, view the `frontend/config.ts` file to change any static content on the page. You can also modify the code itself as you wish.

#### How to add static images?

The public mint page uses static images in the UI. Initially, the images are imported from the `frontend/assets/placeholder` folder. To use custom images, you should add the image you want to use to the `frontend/assets` folder (under any new folder you want to create) and then import the image as seen below in the `frontend/config.ts` file and add it under the section you want to have it.

```jsx
import MyImage from "@/assets/<my-new-folder>/my-image.png";
```

For example, to update an image in the “Our Team" section - add the image under the `frontend/assets/<my-new-folder>` folder, import the image as `import MyImage from "@/assets/<my-new-folder>/my-image.png";` and change the`img`property in the `ourTeam` section with `MyImage`.

## Create a Fungible Asset page

When you first running `npm run dev`, you will see the Public Mint page. To create an asset, click the “Create Asset" button, which will navigate you to create a new fungible asset.

### Publish the Move module

To create a new asset, we will need to publish the Move module on-chain.

The smart contract is built in a way that only the admin or a specific defined account can create a new asset.

Create or find the account you want to create an asset with. If you haven't created an account - simply use a Wallet, for example [Petra](https://petra.app/), to quickly [create an account](https://petra.app/docs/use#create-a-new-account).

1. Run `npm run move:init` - a command to initialize an account to publish the Move contract. When you run that command it will:

   - Generate a new CLI `.aptos/config.yaml` file that holds a profile with the account private key, account address, and network configuration.
   - Configure your development environment and add a `VITE_MODULE_ADDRESS` variable into the `.env` file with the account address from the previous step.

2. To set who can create a new asset, edit the `.env` file and update `VITE_CREATOR_ADDRESS` to be the address of the account allowed to create assets.

3. Run `npm run move:publish`

### Connect a wallet

Once you have [published the move module](#publish-the-move-module), you will need to connect your wallet to submit transactions. Make sure your Wallet is set to the same account you used in the [previous section](#publish-the-move-module) to publish your Move module.
Also ensure that your wallet is set to the same network you selected to work with (e.g. testnet).

Now, you can connect your wallet by clicking on the "Connect Wallet" button at the top right, and start with creating your asset.

### Upload an Asset File

To create an asset you will need an image file.

Image file can be of any of the type - `"png", "jpg", "jpeg", "gif”.`

Once you are ready to upload the asset image file, you can choose the file you want to upload through the file input UI.

When adding the file, it submits the it to [Irys](https://irys.xyz/), a decentralized asset server, that will store your files.

During the upload process, you will need to sign a message to approve file uploading to Irys. Additionally, you may need to fund an Irys node. Read more about the process [here](https://docs.irys.xyz/hands-on/tutorials/uploading-nfts).

### Fill out asset details

Next, you want to fill out some asset details:

- Asset Name - which defines asset name
- Asset Symbol - which defines the asset symbol
- Max Supply - which defines the max supply of the asset
- Mint fee per fungible asset - which defines the mint fee cost per asset
- Max mint per account - which defines the maximum amount of assets an account can mint
- Decimal - which defines the number of decimals of the asset
- Project URL - the project URL
- (Optional) Mint for myself - which defines how many assets you would want to mint for yourself once the asset is created

### Submit a create asset transaction

Once everything has filled out, you should be able to click the “Create Asset” button and submit a create asset transaction. The only next step would be to approve the transaction on the wallet.

## My Assets Page

This page displays all the assets that have been created under the current Move module. You can click on the asset address, which redirects you to the Aptos Explorer site where you can see your asset.

When you are ready to use an asset on the Public Mint Page, you need to copy the asset address and assign it to the `asset_id` on the `frontend/config.ts` file.

Some stats are available on this page, like the max supply of the asset and the number of asset minted.

## How can I take it from here?

Remember, one of the goals of this template is to educate and provide a real life example on how a Fungible Asset minting dapp can be on Aptos. We provide some basic concepts and features but there is much more you can do for your dapp.

Some ideas you can try are:

1. Allowlist mint stages
2. Custom flows after someone mints an asset (or even token gated experiences)
3. Check out our [TS SDK](https://github.com/aptos-labs/aptos-ts-sdk) to see what other [API queries](https://github.com/aptos-labs/aptos-ts-sdk/blob/main/src/api/digitalAsset.ts) you can use to support more features and fetch more data.

## Ready for Mainnet

If you started your dapp on testnet, and you are happy with your asset testing, you will want to get the asset on mainnet.

Creating a asset on mainnet is the same flow as creating on testnet, but we need to change some configuration.

1. Change the `VITE_APP_NETWORK` value to `mainnet` in the `.env` file
2. Run `npm run move:init` to initialize an account to work against Mainnet
   1. If you already have an account you would like to use to publish the contract under, you can pass its private key when the prompt asks for that.
   2. If you are generating a new account, you need to transfer this account some APT on Aptos Mainnet since the tool can’t fund the account when it is against Mainnet.
3. Check: open `.aptos/config.yaml` file and see that you have a profile under the `mainnet` name. In addition, open the `.env` file and check the `VITE_MODULE_ADDRESS` value is the same as the mainnet profile account account address.
4. Create or get the account you want to create a asset with, open the `.env` file and assign the account address as the `VITE_CREATOR_ADDRESS` value.
5. Finally, run `npm run move:publish` to publish your move module on Aptos mainnet.
6. The next step would be to create an asset using this account. Simply follow [https://www.notion.so/aptoslabs/WIP-create-aptos-dapp-doc-41982c9e40e049cd962e1e0e42d0bdbd?pvs=4#20ef513460fb4452aedbece1a7523425](https://www.notion.so/WIP-create-aptos-dapp-dev-doc-41982c9e40e049cd962e1e0e42d0bdbd?pvs=21)

## Deploy to a live server

`create-aptos-dapp` utilizes Vite as the development tool. To deploy a Vite static site to a live server, you can simply follow [Vite deployment guide](https://vitejs.dev/guide/static-deploy). In a nutshell, you would need to:

1. Run `npm run build` to build a static site
2. Run `npm run preview` to see how your dapp would look like on a live server
3. Next, all you need is to deploy your static site to a live server, there are some options for you to choose from and can follow [this guide](https://vitejs.dev/guide/static-deploy#github-pages) on how to use each

## Update the look and feel of the dapp

This template is styled with [Tailwind CSS](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/). These libraries provide the app with a neutral and clean look and feel while leaving it open to a lot of customization so that you can make the app truly yours.

### What is Tailwind CSS?

Tailwind is a utility-first CSS framework that scans your components for class names and generates a static CSS file containing the corresponding styles at build-time.

This framework makes it easy to quickly author styles that are co-located with your component markup without any incurring any runtime performance costs. It also helps you to maintain a consistent theme throughout your app that is responsive to light and dark mode.

To learn more about Tailwind CSS, please refer to their official [documentation](https://tailwindcss.com/docs/utility-first).

### What is `shadcn/ui`?

Shadcn is a collection of accessible components that you can copy and paste into your app through their CLI tool. Since the source files live in your app's codebase, you can customize them as much as you need to.

These components are built on top of [Radix UI Primitives](https://www.radix-ui.com/primitives) and are styled with [Tailwind CSS](https://tailwindcss.com/). To learn more about `shadcn/ui`, please refer to their official [documentation](https://ui.shadcn.com/docs).

### How to modify the theme?

The theme for this template is split across `/tailwind.config.js` and `frontend/index.css`. The Tailwind config declares all of the theme colors, text styles, animation keyframes, border radii, etc. The root CSS file (`index.css`) declares the actual color values for light and dark mode as CSS custom properties (CSS variables), the base radius value, and applies any global CSS required.

For example, if you want to make all of the buttons and cards more round in your app, you can increase the base radius value (`--radius`) in `index.css`.

If you want to add a new text style, you can define it in the `addTextStyles` function towards the end of `tailwind.config.js`.

And if you want to modify the primary color of the app, you can update the HSL color values defined in `index.css`.

### How to add components?

Additional components can be added through the `shadcn-ui` CLI. For example, if you wish to add a `Switch` component, you can run the following command:

```bash
npx shadcn-ui@latest add switch
```

This command will create a `switch.tsx` file in your `/frontend/components/ui` directory that contains a styled switch component. For a full list of available shadcn components, please refer to the [shadcn component documentation](https://ui.shadcn.com/docs/components).

If you need to add a component that's not included in the `shadcn/ui` collection, you're welcome to add your own components under `/frontend/components` or within the `/frontend/pages` directory if they're specific to the page that you're working on.

### How to add colors?

If you're creating your own custom components or adding to the UI in some way, you may need to add some new colors. To add a new color, you must first define the light and dark HSL color values in `/frontend/index.css` and then add the new theme color token to the theme defined in `tailwind.config.js`.

For more detailed instructions, please refer to the [shadcn documentation on theming](https://ui.shadcn.com/docs/theming).

### How to add dark mode?

In an effort to maintain simplicity in the dapp template, only light mode is set up. However, color values are defined for both light and dark mode in the theme. If you wish to add dark mode to your app, you simply have to add the shadcn `ThemeProvider` and `ModeToggle` to your app. Once added, the UI will be fully responsive to both light and dark mode. For detailed instruction on how to achieve this, please refer to the [shadcn dark mode documentation](https://ui.shadcn.com/docs/dark-mode/vite).
