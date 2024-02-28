---
title: "Download CLI Binaries"
---

# Download Aptos CLI Binaries

The `aptos` tool is a command line interface (CLI) for developing on the Aptos blockchain, debugging Move contracts, and conducting node operations. This document describes how to install the `aptos` CLI tool using precompiled binaries that reduce variables in setting up your environment. Also see:

- [Installing the Aptos CLI](./index.md) for alternatives to using the precompiled binaries.
- [Installing the Move Prover](./install-move-prover.md) for an optional tool to validate your Move code.
- [Using Aptos CLI](../use-cli/use-aptos-cli.md) for detailed instructions on employing the Aptos CLI.

Binary releases are recommended for most users, otherwise see [Building Aptos From Source](../../../guides/building-from-source.md)

<details>
<summary>macOS</summary>

## macOS

We do not release binaries for macOS, you must use [brew](https://brew.sh/).

</details>

<details>
<summary>Linux</summary>

## Linux

:::tip
These instructions have been tested on Ubuntu 20.04.
:::

1. Go to the [Aptos CLI release page](https://github.com/aptos-labs/aptos-core/releases?q=cli&expanded=true).
2. Click the **Assets** expandable menu for the latest release.
3. You will see the zip files with the filename of the format: `aptos-cli-<version>-<platform>`. These are the platform-specific pre-compiled binaries of the CLI. Download the zip file for your platform, dismissing any warnings.
4. Unzip the downloaded file. This will extract the `aptos` CLI binary file into your default downloads folder.
5. Move this extracted `aptos` binary file into your preferred local folder.

   :::tip
   Upgrading? Remember to look in the default download folder
   When you update the CLI binary with the latest version, note that the newer version binary will be downloaded to your default Downloads folder. Remember to move this newer version binary from the Downloads folder to `~/bin/aptos` folder (overwriting the older version).
   :::

6. Make this `~/bin/aptos` an executable by running this command:
   - `chmod +x ~/bin/aptos`.
7. Type `~/bin/aptos help` to read help instructions.
8. Add `~/bin` to your path in your `.bashrc` or `.zshrc` file for future use.

</details>

<details>
<summary>Windows 10, 11 and Windows Server 2022+</summary>

## Windows 10, 11 and Windows Server 2022+

:::tip
These instructions have been tested on Windows 11 and Windows Server 2022. Windows support is new and some features may be not complete. Open [GitHub issues](https://github.com/aptos-labs/aptos-core/issues) for bugs.
:::

1. Go to the [Aptos CLI release page](https://github.com/aptos-labs/aptos-core/releases?q=cli&expanded=true).
2. Click the **Assets** expandable menu for the latest release.
3. You will see the zip files with the filename of the format: `aptos-cli-<version>-<platform>`. These are the platform-specific pre-compiled binaries of the CLI. Download the zip file for your platform, dismissing any warnings.
4. Unzip the downloaded file. This will extract the `aptos` CLI binary file into your default downloads folder. For example, on Windows it is the `\Users\user\Downloads` folder.
5. Move this extracted `aptos` binary file into your preferred local folder.
   :::tip Upgrading? Remember to look in the default download folder
   When you update the CLI binary with the latest version, note that the newer version binary will be downloaded to your default Downloads folder. Remember to move this newer version binary from the Downloads folder to your preferred location.
   :::
6. Open a PowerShell terminal via the windows start menu
7. In the PowerShell terminal, you can get help instructions by running the command with help. For example ` .\Downloads\aptos-cli-0.3.5-Windows-x86_64\aptos.exe help` to read help instructions.

</details>
