---
title: "Building Aptos From Source"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Building Aptos From Source

[Binary releases are available](../tools/aptos-cli/install-cli/index.md), but if you want to build from source or develop on the Aptos tools, this is how.

## Supported operating systems

Aptos can be built on various operating systems, including Linux, macOS. and Windows. Aptos is tested extensively on Linux and macOS, and less so on Windows. Here are the versions we use:

- Linux - Ubuntu version 20.04 and 22.04
- macOS - macOS Monterey and later
- Microsoft Windows - Windows 10, 11 and Windows Server 2022+

## Clone the Aptos-core repo

1. Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git). Git is required to clone the aptos-core repo, and will need to be installed prior to continuing. You can install it with the instructions on the official [Git website](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

2. Clone the Aptos repository. To clone the Aptos repository (repo), you first need to open a command line prompt (Terminal on macOS / Linux, PowerShell on Windows). Then run the following command to clone the Git repository from GitHub.

   ```
   git clone https://github.com/aptos-labs/aptos-core.git
   ```

3. Now let's go into the newly created directory `aptos-core` by _changing directory_ or `cd`ing into it:
   ```
   cd aptos-core
   ```

### (Optional) Check out release branch

Optionally, check out a release branch to install an Aptos node. We suggest you check out `devnet` for your first development. See [Choose a network](./system-integrators-guide.md#choose-a-network) for an explanation of their differences.

<details>
<summary>Release Branches</summary>
<Tabs groupId="network">
    <TabItem value="devnet" label="Devnet">

    git checkout --track origin/devnet

</TabItem>
    <TabItem value="testnet" label="Testnet" default>

    git checkout --track origin/testnet

</TabItem>
<TabItem value="mainnet" label="Mainnet">

    git checkout --track origin/mainnet

</TabItem>
</Tabs>
</details>

## Set up build dependencies

Prepare your developer environment by installing the dependencies needed to build, test and inspect Aptos Core.
No matter your selected mechanism for installing these dependencies, **it is imperative you keep your entire toolchain up-to-date**. If you encounter issues later, update all packages and try again.

<details>
<summary>macOS</summary>

**> Using the automated script**

1. Ensure you have `brew` package manager installed: https://brew.sh/
2. Run the dev setup script to prepare your environment: `./scripts/dev_setup.sh`
3. Update your current shell environment: `source ~/.cargo/env`.

:::tip
You can see the available options for the script by running `./scripts/dev_setup.sh --help`
:::

**> Manual installation of dependencies**

If the script above doesn't work for you, you can install these manually, but it's **not recommended**.

1. [Rust](https://www.rust-lang.org/tools/install)
2. [CMake](https://cmake.org/download/)
3. [LLVM](https://releases.llvm.org/)
4. [LLD](https://lld.llvm.org/)

</details>

<details>
<summary>Linux</summary>

**> Using the automated script**

1. Run the dev setup script to prepare your environment: `./scripts/dev_setup.sh`
2. Update your current shell environment: `source ~/.cargo/env`

:::tip
You can see the available options for the script by running `./scripts/dev_setup.sh --help`
:::

**> Manual installation of dependencies**

If the script above does not work for you, you can install these manually, but it is **not recommended**:

1. [Rust](https://www.rust-lang.org/tools/install).
2. [CMake](https://cmake.org/download/).
3. [LLVM](https://releases.llvm.org/).
4. [libssl-dev](https://packages.ubuntu.com/jammy/libssl-dev) and [libclang-dev](https://packages.ubuntu.com/jammy/libclang-dev)

</details>

<details>
<summary>Windows</summary>

**> Using the automated script**

1. Open a PowerShell terminal as an administrator.
2. Run the dev setup script to prepare your environment: `PowerShell -ExecutionPolicy Bypass -File ./scripts/windows_dev_setup.ps1`
3. Open a new PowerShell terminal after installing all dependencies

**> Manual installation of dependencies**

1. Install [Rust](https://www.rust-lang.org/tools/install).
2. Install [LLVM](https://releases.llvm.org/). Visit their GitHub repository for the [latest prebuilt release](https://github.com/llvm/llvm-project/releases/tag/llvmorg-15.0.7).
3. Install [Microsoft Visual Studio Build Tools for Windows](https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022). During setup, select "Desktop development with C++" and three additional options: MSVC C++ build tools, Windows 10/11 SDK, and C++ CMake tools for Windows.
4. If on Windows ARM, install [Visual Studio](https://visualstudio.microsoft.com/vs).
5. If not already installed during Visual Studio/Build Tools installation, install [CMake](https://cmake.org/download/).
6. Open a new PowerShell terminal after installing all dependencies

</details>

### Additional Tools

If you used `scripts/dev_setup.sh` for macOS or Linux setup, additional tools are optionally available.

#### TypeScript

[Using the released SDK can be achieved from npm/pnpm/yarn](/sdks/ts-sdk/index.md).

## Building Aptos

The simplest check that you have a working environment is to build everything and run the tests.

```bash
cargo build
cargo test -- --skip prover
```

If you installed the Move Prover Tools above then you don't need to skip the prover tests.

Other documentation of specific tools has recommended patterns for `cargo build` and `cargo run`

- [Run a Local Development Network](../guides/local-development-network.md)
- [Indexer](../indexer/legacy/indexer-fullnode.md)
- [Node Health Checker](../nodes/measure/node-health-checker.md)
- [Running a Local Multi-node Network](running-a-local-multi-node-network.md)
