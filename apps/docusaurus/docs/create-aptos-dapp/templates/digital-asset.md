---
title: "Digital Asset"
slug: "digital-asset"
hidden: false
---

# Digital Asset Template

A Digital Asset is an NFT stored on a blockchain that uniquely defines ownership of an asset. The Digital Asset template provides an end-to-end NFT minting dapp. With this dapp you can learn how NFTs work on Aptos, how to write a smart contract and a front end that communicates with the contract. In addition, it offers a beautiful pre-made UI for a NFT minting dapp you can quickly adjust and deploy into a live server.

Read more about [Aptos Digital Asset Standard](https://aptos.dev/standards/digital-asset)

The Digital Asset template provides 3 pages

1. Public Mint NFT Page - that page would eventually get deployed into a live server where the public can come to it to mint an NFT
2. Create Collection Page - where you can create a new NFT collection. This page is not accessible on production.
3. My Collections Page - where you can view all the collections created under the current move module (i.e smart contract). This page is not accessible on production.

## Public Mint Page

When you first run your app locally with `npm run dev` you would see the public mint page with some data placeholders for content and images. Some of the content can be configured in the `frontend/config.ts` file and some will get pulled from an Aptos server once you configure your collection.

### Config a collection address

To config the collection address and have the public mint page fetch the collection data, you would need to assign the `collection_id` variable in the `frontend/config.ts` file with the collection address you want to use. If you have [created the collection](#create-a-nft-collection-page) with the tool, you should be able to find it on the[ My Collections Page](#my-collections-page).

### Modify static content

Once the collection address has been set up, you can head over to the `frontend/config.ts` file to change and modify any static content on the page. Obviously you can also modify the code itself as you wish.

**How to add static images?**

The public mint page uses static images in the UI. Initialy, the images are imported from the `frontend/assets/placeholder` folder. To use custom images, you should add the image you want to use to the `frontend/assets` folder (under any new folder you want to create) and then import the image as `import MyImage from "@/assets/<my-new-folder>/my-image.png";` in the `frontend/config.ts` file and add it under the section you want to have it.

For example, to update an image in the “Our Team" section - add the image under the `frontend/assets/<my-new-folder>` folder, import the image as `import MyImage from "@/assets/<my-new-folder>/my-image.png";` and change the`img`property in the `ourTeam` section with `MyImage`

**How to modify css/style?**

<!-- TODO -->

## Create a NFT Collection Page

When you first run your app locally with `npm run dev` you would see the Public Mint page, click the “Create Collection” button, that would take you to a page where you can create a new nft collection.

### Publish the Move module

To create a new collection, we need to publish the Move module to chain so we can communicate with it.

The smart contract is built in a way that only the admin or a specific defined account can create a new collections.

Create or find the account you would want to use to create a collection with. If you haven't created an account - simply use a Wallet, for example [Petra](https://petra.app/), to quickly [create an account](https://petra.app/docs/use#create-a-new-account).

1. Run `npm run move:init` - a command to generate a new aptos config file with an account that would be used to publish the move contract. Once you run that command it would:

- Generate a new `.aptos/config.yaml` file that holds the profile with a privateKey, publicKey and account address as well as the network endpoints it uses to make calls to.
- Configure you development environment and add a `VITE_MODULE_ADDRESS` variable into the `.env` file with the account address of the generated account from the previous step.

2. To set who is the account that has the privilage to create a new collection, head over to the `.env` file and update `VITE_CREATOR_ADDRESS` to be the address of the account you want to use to create the collection with.

3. Run `npm run move:publish`

### Connect a wallet

Once you [published the move module](#publish-the-move-module), you would want to connect your wallet so you can submit transactions. Make sure your Wallet is set to the same account you used in the [previous section](#publish-the-move-module) to publish your move module and that your wallet is set to the same network you selected to work with.

Now you can connect your wallet by clicking on the "Connect Wallet" button on the top right, and start with creating your nft collection.

### Upload Collection Files Data

To create a NFT collection you would need image files and metadata files.

Image files can be of any of the type - `"png", "jpg", "jpeg", "gltf”.` But, make sure all image files have the same file extension. If some images will have `jpeg` extension and some `jpg` extension the upload would fail.

Metadata files are `json` files that hold the Collection data and each of the NFT data.

`create-aptos-dapp` requires you to upload a folder with all the relevant files, a folder structure should be

```jsx
assets/ // root folder
 collection.jpeg // the collection image
 collection.json // the collection metadata
 images/ // NFT images folder
  1.jpeg
  2.jpeg
  3.jpeg
 metadatas // NFT metadatas folder
  1.json
  2.json
  3.json
```

:::note
Make sure all image files have the same file extension. If some images will have `jpeg` extension and some `jpg` extension the upload would fail.
:::

<!-- TODO: change ERC-1155 once finish rewriting the NFT standards page  -->

We recommend the developers follow the [ERC-1155 off-chain data](https://eips.ethereum.org/EIPS/eip-1155) schema to format their JSON files. One thing to note, since the image field will be updated with the arweave link after this step, feel free to leave it empty.

Example of `collection.json` file

```jsx
// collection.json
{
  "name": "Aptos NFTs", // Name of the collection.
  "description": "My NFT Collection on Aptos.", // Descrpition of the collection
  "image": "to_fill_after_upload", // This is the URL to the image of the collection, we will assign arewave link so feel free to leave it empty
  "external_url": "https://your_project_url.io" // URL to an external website where the user can also view the image.
}
```

Example of a NFT metadata file. The metadata file should have the same name as the relevant image but with a json extension. i.e if the nft image name is `1.jpeg` then a relevant metadata file should be `1.json`

```jsx
// 1.json
{
  "description": "nft 1 in collection", // Descrpition of the NFT
  "image": "to_fill_after_upload", // This is the URL to the image of the nft, we will assign arewave link so feel free to leave it empty
  "name": "NFT 1", // Name of the NFT.
  "external_url": "https://your_project_url.io/1", // URL to an external website where the user can also view the image.
  "attributes": [ // Object array, where an object should contain trait_type and value fields. value can be a string or a number.
    {
      "trait_type": "meme_level",
      "value": "1"
    }
  ]
}

```

Once you built the folder and you are ready to upload the collection files data, you can use the file input on the UI and choose the folder you want to upload, that would submit the files to [Irys](https://irys.xyz/), a decentralized asset server, that will store your files.

During the upload process, you would need to sign 2 messages to approve file uploading to Irys and maybe be a transfer transaction submission if first need to fund an Irys node to store the files on. Can read more about the process [here](https://docs.irys.xyz/hands-on/tutorials/uploading-nfts).

### Fill out collection details

Next, you would want to fill out some collection details:

- Public mint start date - which defines when the public mint starts
- Public mint end date - which defines when the public mint ends (can leave it empty if there is no end date)
- Limit mint per address - which defines the limit of how many NFTs an account can mint
- (Optional) Royalty Percentage for each NFT - which defines the royalties for nft marketplaces to read and respect when users trade nfts
- (Optional) Mint fee per NFT - which defines the mint fee cost per nft
- (Optional) Mint for myself - which defines how many NFTs you would want to mint for yourself once the collection is created

### Submit a create collection transaction

Once everything has filled out, you should be able to click the “Create Collection” button and submit a create collection transaction. The only next step would be to approve the transaction on the wallet.

## My Collections Page

This page displays all the collections that have been created under the current move module. You can click on the contract address, that would redirect you to the Aptos Explorer site where you can see your collection.

When you are ready to use a collection on the Public Mint Page, you would want to copy the collection address and assign it to the `collection_id` on the `frontend/config.ts` file.

Some stats are available on this page, like the amount of minted NFTs and Max Supply of the NFTs.

## How can I take it from here?

Remember, one of the goals of this template is to educate and provide a real life example on how a NFT minting dapp can be on Aptos. We provide some basic concepts and features but there is much more you can do for your dapp.

Some ideas you can look at and support are

1. Allowlist mint stage
2. A custom flow after someone mints a NFT
3. Check out our [TS SDK](https://github.com/aptos-labs/aptos-ts-sdk) to see what other [API queries](https://github.com/aptos-labs/aptos-ts-sdk/blob/main/src/api/digitalAsset.ts) you can use to support more features or fetch more datas

## Ready for MAINNET

If you started your dapp on tesnet and you had all the tests and happy with your NFT collection you probably want to get the collection on mainnet.

Creating a collection on mainnet is the same flow as creating it on tesnet but we need to first configure some things.

1. Change the `VITE_APP_NETWORK` value to `mainnet` on the `.env` file
2. Run `npm run move:init` to initialize an account to work against the Mainnet
   1. If you already have an account you would like to use to publish the contract under, you can pass its private key when the prompt asks for that.
   2. If you are generating a new account, you would want to transfer this account some APT on Aptos Mainnet since the tool can’t fund the account when it is against Mainnet.
3. Check: open `.aptos/config.yaml` file and see that you have a profile under the `mainnet` name. In addition, open the `.env` file and check the `VITE_MODULE_ADDRESS` value is the same as the mainnet profile account account address.
4. Head over to `scripts/move/publish.js` file, and change the `minter` address to [`0x3c41ff6b5845e0094e19888cba63773591be9de59cafa9e582386f6af15dd490`](https://explorer.aptoslabs.com/object/0x3c41ff6b5845e0094e19888cba63773591be9de59cafa9e582386f6af15dd490/modules/code/mint_stage?network=mainnet) so it would use the Mainnet token-minter address.
5. Create or get the account you want to create a collection with, open the `.env` file and assign the account address as the `VITE_CREATOR_ADDRESS` value.
6. Finally, run `npm run move:publish` to publish your move module on Aptos mainnet.
7. The next step would be to create a collection using this account. Simply follow [the instructions here](#create-a-nft-collection-page)

## Deploy to a live server

`create-aptos-dapp` utilizes Vite as the development tool. To deploy a Vite static site to a live server, you can simply follow [Vite deployment guide](https://vitejs.dev/guide/static-deploy). In a nutshell, you would need to:

1. Run `npm run build` to build a static site
2. Run `npm run preview` to see how your dapp would look like on a live server
3. Next, all you need is to deploy your static site to a live server, there are some options for you to choose from and can follow [this guide](https://vitejs.dev/guide/static-deploy#github-pages) on how to use each
