---
title: "Install On Linux"
---

# Install the Aptos CLI on Linux

For Linux, the easiest way to install the Aptos CLI tool is via Python script, although if that does not work, you can also install manually via downloading pre-compiled binaries. The pre-compiled binaries approach is not generally recommended as updating is very manual.

:::caution
Note: If you are using an ARM architecture, you will have to install using the steps here: [Install Specific Aptos CLI Versions (Advanced)](install-cli-specific-version.md)
:::

# Install via Python Script

1. Ensure you have Python 3.6+ installed by running `python3 --version`.
   1. If python3 is not installed, you can find installation instructions on [python.org](http://python.org).
2. In the terminal, either use this `curl` command:

   ```bash
   curl -fsSL "https://aptos.dev/scripts/install_cli.py" | python3
   ```

   Or use the equivalent `wget` command:

   ```bash
   wget -qO- "https://aptos.dev/scripts/install_cli.py" | python3
   ```

   :::caution
   If you receive the error `Couldn't find distutils or packaging. We cannot check the current version of the CLI. We will install the latest version.` you can fix it by running `pip3 install packaging` then repeating this step.
   :::

3. (Optional) It can be helpful to add the Aptos CLI to a folder in your PATH, or to add it to your PATH directly. The steps to add a folder to your PATH are shell dependent.
   1. You can run `echo $SHELL` to print the default shell for your machine, then google specific steps to add a folder to your PATH for that shell.
4. Verify the script is installed by opening a new terminal and running `aptos help`
   1. You should see a list of commands you can run using the CLI.
   2. In the future, this is a helpful resource to learn exactly how each command works.

### Updating

If you would like to update the Aptos CLI to the latest version, you can run `aptos update`.

# Install via Pre-Compiled Binaries (Backup Method)

1. Go to the [Aptos CLI release page](https://github.com/aptos-labs/aptos-core/releases?q=cli&expanded=true).
2. Click the "Assets" expandable menu for the latest release to see the pre-compiled binaries.
3. Download the zip file for Linux.
   1. It’ll have a name like: `aptos-cli-<version>-Ubuntu-x86_64.zip`.
   2. Make sure you choose the right zip file for your computer architecture.
   3. You will likely have to dismiss warnings that this is a suspicious file when downloading.
4. Unzip the downloaded file.
5. Move the extracted Aptos binary file into your preferred folder.
6. Open a terminal and navigate to your preferred folder.
7. Make `~/aptos` an executable by running `chmod +x ~/aptos`.
8. Verify that this installed version works by running `~/aptos help`.
   1. You should see instructions for how to use all CLI commands. These can be helpful in the future when you are trying to understand how to use specific commands.
9. (Optional) It can be helpful to add the Aptos CLI to a folder in your PATH, or to add it to your PATH directly. The steps to add a folder to your PATH are shell dependent.
   1. You can run `echo $SHELL` to print the default shell for your machine, then google specific steps to add a folder to your PATH for that shell.

### Updating

When using this method, you can update the Aptos CLI by deleting your existing installation, then following the installation steps again.
