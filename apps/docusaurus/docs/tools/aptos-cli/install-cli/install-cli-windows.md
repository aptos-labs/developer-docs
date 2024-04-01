---
title: "Install On Windows"
---

# Install the Aptos CLI on Windows

For Windows, the easiest way to install the Aptos CLI tool is via Python script. If that does not work, you can also install manually via pre-compiled binaries. The pre-compiled binaries approach is not generally recommended as updating is very manual.

# Install via Python Script

1. Ensure you have Python 3.6+ installed by running `python3 --version`.
   1. If python3 is not installed, you can find installation instructions on [python.org](http://python.org).
2. In PowerShell, run the install script:

   ```zsh
   iwr "https://aptos.dev/scripts/install_cli.py" -useb | Select-Object -ExpandProperty Content | python3
   ```

   :::caution
   If you receive the error `ModuleNotFoundError: No module named packaging` you can install `packaging` by running `pip3 install packaging` then repeat this step.
   :::

   1. You should see instructions in your terminal saying “Execute the following command to update your PATH:”.

3. Copy and run the command to update your PATH from the terminal.
   1. It should look something like `setx PATH "%PATH%;C:\Users\<your_account_name>\.aptoscli\bin"`.
4. Verify the script is installed by opening a new terminal and running `aptos help`.
   1. You should see a list of commands you can run using the CLI.
   2. In the future, this is a helpful resource to learn exactly how each command works.

### Updating

If you would like to update the Aptos CLI to the latest version, you can run `aptos update`.

# Install via Pre-Compiled Binaries (Backup Method)

1. Go to the [Aptos CLI release page](https://github.com/aptos-labs/aptos-core/releases?q=cli&expanded=true).
2. Click the ”Assets” expandable menu for the latest release to see the pre-compiled binaries.
3. Download the zip file for Windows.
   1. It will have a name like: `aptos-cli-<version>-Windows-x86_64.zip`
   2. You will likely have to dismiss warnings that this is a suspicious file when downloading.
4. Unzip the downloaded file.
5. Move the extracted Aptos binary file into the folder you would like to call it from in the future.
6. Right click, then copy the path to the executable.
   1. Ex. `C:\Users\<username>\Downloads\aptos-cli-3.1.0-Windows-x86_64\aptos.exe`.
7. Open PowerShell via the Start Menu.
8. Verify the installation by running the `help` command.
   1. Ex. `C:\Users\<username>\Downloads\aptos-cli-3.1.0-Windows-x86_64\aptos.exe help`.

:::caution
If neither of the above methods work, you will have to build the CLI from source by following these steps: [Install Specific Aptos CLI Versions (Advanced)](install-cli-specific-version.md)
:::

### Updating

When using this method, you can update the Aptos CLI by deleting your existing installation, then following the installation steps again.
