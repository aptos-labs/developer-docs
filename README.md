# Developer Documentation

- [Developer Documentation](#developer-documentation)
  - [Installation](#installation)
    - [Requirements](#requirements)
  - [Clone the Developer docs repo](#clone-the-developer-docs-repo)
  - [Install deps](#install-deps)
  - [Develop on Nextra (New)](#develop-on-nextra-new)
  - [Develop on Docusaurus (Legacy)](#develop-on-docusaurus-legacy)
  - [Debugging](#debugging)
  - [Regenerating contributors](#regenerating-contributors)

> Visit the `README.md` under `apps/docusaurus` for more steps on building / developing in this repo

We now use [lychee-broken-link-checker](https://github.com/marketplace/actions/lychee-broken-link-checker) to check for broken links in the GitHub Markdown. We use a corresponding link checker for pages on Aptos.dev.

With results visible at:
https://github.com//aptos-labs/developer-docs/actions/workflows/links.yml

## Installation

**IMPORTANT**: These installation steps apply to macOS environment.

### Requirements

Before you proceed, make sure you install the following tools.

- Install [Node.js](https://nodejs.org/en/download/) by executing the below command on your Terminal:

```sh
brew install node
```

- Install the latest [pnpm](https://pnpm.io/installation) by executing the below command on your Terminal:

```sh
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

## Clone the Developer docs repo

```sh
git clone https://github.com/aptos-labs/developer-docs.git
```

## Install deps

You may have to run the following command first if you are on macOS M1 Sonoma or newer
```sh
pnpm add node-gyp -g
```

```sh
pnpm install
```

## Develop on Nextra (New)

> Note: PLEASE SEE `apps/nextra/README.md` for more details!


0. Setup environment

Ensure you have configured your `.env` properly under `apps/nextra/.env`. There is a `.env.example` there that you can duplicate and rename to `.env` for simplicity.

To ensure you have the right setup, you can run

```sh
pnpm prebuild
```

1. Build Nextra

```bash
npx turbo run build --filter={apps/nextra}...
```

This will build `apps/nextra` and all local packages it depends on.

2. Navigate to the correct subdirectory

```sh
cd apps/nextra
```

3. Run development server

```sh
pnpm dev
```

## Develop on Docusaurus (Legacy)

1. Navigate to the correct subdirectory

```sh
cd apps/docusaurus
```

2. Build the repository

```sh
pnpm build
```

3. Navigate to the correct subdirectory

```sh
pnpm serve
```

## Debugging

Fix formatting issues by running:

```sh
pnpm fmt
```

## Regenerating contributors

The src/contributors.json file (which powers the list of Authors at the bottom of doc pages) needs to be manually generated.

In order to generate the contributor map you must authenticate with GitHub. The best way to do that is using GitHub CLI ([installation guide(https://github.com/cli/cli#installation)]). Once you have the GitHub CLI installed, you can run the following command to authenticate:

```sh
gh auth login --scopes read:user,user:email
```

Once that is done, you can generate the map with this command:

```sh
pnpm contributors
```
