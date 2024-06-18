---
title: "Fungible Asset"
slug: "fungible-asset"
hidden: false
---

# Fungible Asset Template

The Fungible Asset template provides an end-to-end Fungible Asset minting dapp. With this dapp you can learn how Fungible Assets work on Aptos, how to write a smart contract and a front end that communicates with the contract. In addition, it offers a beautiful pre-made UI for a Fungible Asset minting dapp you can quickly adjust and deploy into a live server.

Read more about [Aptos Fungible Asset Standard](https://aptos.dev/standards/fungible-asset)

The fungible asset template provides 3 pages

1. Public mint page - that page would eventually get deployed into a live server where the public can come to it to mint a fungible asset
2. Create Asset page - where you can create a new Fungible Asset. This page is not accessible on production.
3. My Assets page - where you can view all the assets created under the current move module (i.e smart contract). This page is not accessible on production.

## Public Mint Page

When you first run your app locally with `npm run dev` you would see the public mint page with some data placeholders for content and images. Some of the content can be configured in the `frontend/config.ts` file and some will get pulled from an Aptos server once you configure your asset address.

### Config an asset address

To config the asset address and have the public mint page fetch the asset data, you would need to assign the `asset_id` variable in the `frontend/config.ts` file with the FA address you want to use. If you have [created the asset](#create-a-fungible-asset-page) with the tool, you should be able to find it on the [My Assets Page](#my-assets-page).

### Modify static content

Once the asset address has been set up, you can head over to the `frontend/config.ts` file to change and modify any static content on the page. Obviously you can also modify the code itself as you wish.

#### How to add static images?

The public mint page uses static images in the UI. Initialy, the images are imported from the `frontend/assets/placeholder` folder. To use custom images, you should add the image you want to use to the `frontend/assets` folder (under any new folder you want to create) and then import the image as `import MyImage from "@/assets/<my-new-folder>/my-image.png";` in the `frontend/config.ts` file and add it under the section you want to have it.

For example, to update an image in the “Our Team" section - add the image under the `frontend/assets/<my-new-folder>` folder, import the image as `import MyImage from "@/assets/<my-new-folder>/my-image.png";` and change the`img`property in the `ourTeam` section with `MyImage`

#### How to modify css/style?

<!-- TODO -->

## Create a Fungible Asset page

When you first run your app locally with `npm run dev` you would see the Public Mint page, click the “Create Asset” button, that would take you to a page where you can create a new asset.

### Publish the Move module

To create a new asset, we need to publish the Move module to chain so we can communicate with it.

The smart contract is built in a way that only the admin or a specific defined account can create a new asset.

Create or find the account you would want to use to create an asset with. If you haven't created an account - simply use a Wallet, for example [Petra](https://petra.app/), to quickly [create an account](https://petra.app/docs/use#create-a-new-account).

1. Run `npm run move:init` - a command to generate a new aptos config file with an account that would be used to publish the move contract. Once you run that command it would:

- Generate a new `.aptos/config.yaml` file that holds the profile with a privateKey, publicKey and account address as well as the network endpoints it uses to make calls to.
- Configure you development environment and add a `VITE_MODULE_ADDRESS` variable into the `.env` file with the account address of the generated account from the previous step.

2. To set who is the account that has the privilage to create a new asset, head over to the `.env` file and update `VITE_CREATOR_ADDRESS` to be the address of the account you want to use to create the asset with.

3. Run `npm run move:publish`

### Connect a wallet

Once you [published the move module](#publish-the-move-module), you would want to connect your wallet so you can submit transactions. Make sure your Wallet is set to the same account you used in the [previous section](#publish-the-move-module) to publish your move module and that your wallet is set to the same network you selected to work with.

Now you can connect your wallet by clicking on the "Connect Wallet" button on the top right, and start with creating your asset.

### Upload an Asset File

To create an asset you would need an image for the asset.

The image file can be of any of the type - `"png", "jpg", "jpeg", "gltf”.`

To upload the asset image, you can use the file input on the UI and choose the file you want to upload, that would submit the file to [Irys](https://irys.xyz/), a decentralized asset server, that will store your file.

During the upload process, you would need to sign a message to approve file uploading to Irys and maybe a transfer transaction submission if first need to fund an Irys node to store the files on. Can read more about the process [here](https://docs.irys.xyz/hands-on/tutorials/uploading-nfts).

### Fill out asset details

Next, you would want to fill out some asset details:

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

This page displays all the assets that have been created under the current move module. You can click on the FA address, that would redirect you to the Aptos Explorer site where you can see your asset.

When you are ready to use an asset on the Public Mint Page, you would want to copy the FA address and assign it to the `asset_id` on the `frontend/config.ts` file.

Some stats are available on this page, like the max supply of the asset and the number of asset minted.

## How can I take it from here?

Remember, one of the goals of this template is to educate and provide a real life example on how a Fungible Asset minting dapp can be on Aptos. We provide some basic concepts and features but there is much more you can do for your dapp.

Some ideas you can look at and support are

1. Allowlist mint stage
2. A custom flow after someone mints an Asset
3. Check out our [TS SDK](https://github.com/aptos-labs/aptos-ts-sdk) to see what other [API queries](https://github.com/aptos-labs/aptos-ts-sdk/blob/main/src/api/digitalAsset.ts) you can use to support more features or fetch more datas

## Ready for MAINNET

If you started your dapp on tesnet and you had all the tests and happy with your Fungible Asset you probably want to get the asset on mainnet.

Creating an asset on mainnet is the same flow as creating it on tesnet but we need to first configure some things.

1. Change the `VITE_APP_NETWORK` value to `mainnet` on the `.env` file
2. Run `npm run move:init` to initialize an account to work against the Mainnet
   1. If you already have an account you would like to use to publish the contract under, you can pass its private key when the tool asks for that.
   2. If you are generating a new account, you would want to transfer this account some APT on Aptos Mainnet since the tool can’t fund the account when it is against Mainnet.
3. Check: open `.aptos/config.yaml` file and see that you have a profile under the `mainnet` name. In addition, open the `.env` file and check the `VITE_MODULE_ADDRESS` value is the same as the mainnet profile account account address.
4. Create or get the account you want to create a collection with, open the `.env` file and assign the account address as the `VITE_CREATOR_ADDRESS` value.
5. Finally, run `npm run move:publish` to publish your move module on Aptos mainnet.
6. The next step would be to create an asset using this account. Simply follow [https://www.notion.so/aptoslabs/WIP-create-aptos-dapp-doc-41982c9e40e049cd962e1e0e42d0bdbd?pvs=4#20ef513460fb4452aedbece1a7523425](https://www.notion.so/WIP-create-aptos-dapp-dev-doc-41982c9e40e049cd962e1e0e42d0bdbd?pvs=21)

## Deploy to a live server

`create-aptos-dapp` utilizes Vite as the development tool. To deploy a Vite static site to a live server, you can simply follow [Vite deployment guide](https://vitejs.dev/guide/static-deploy). In a nutshell, you would need to:

1. Run `npm run build` to build a static site
2. Run `npm run preview` to see how your dapp would look like on a live server
3. Next, all you need is to deploy your static site to a live server, there are some options for you to choose from and can follow [this guide](https://vitejs.dev/guide/static-deploy#github-pages) on how to use each
