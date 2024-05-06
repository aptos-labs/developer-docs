# Developer Documentation

- [Developer Documentation](#developer-documentation)
  - [Installation](#installation)
    - [Requirements](#requirements)
  - [Clone the Developer docs repo](#clone-the-developer-docs-repo)
  - [Build and serve the docs locally](#build-and-serve-the-docs-locally)
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

## Build and serve the docs locally

1. Run `pnpm`.

```sh
pnpm install
```

2. Build the repository

```sh
pnpm build
```

3. Navigate to the correct subdirectory

**Docusaurus**
```sh
cd apps/docusaurus
```

**Nextra**
```sh
cd apps/nextra
```

4. Run the development server

**Docusaurus**
```sh
pnpm serve
```

**Nextra**
```sh
pnpm dev
```

See the README.md in each respective app for more information

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
