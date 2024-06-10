---
title: "Install Specific Versions (Advanced)"
---

# Install Specific Aptos CLI Versions (Advanced)

If you need a specific version of the Aptos CLI, you can build it directly from the Aptos source code. This installation method is primarily used to interact with specific features on Devnet which may not have made it to Testnet / Mainnet yet. You may also want to follow these steps if you are running an architecture which does not play well with the existing releases / pre-compiled binaries.

If you do not need this advanced method, you can find the normal install steps [here](./index.md).

## Install on macOS / Linux

1. Follow the steps to build Aptos from source here: https://aptos.dev/guides/building-from-source/.
2. Ensure you have `cargo` installed by following the steps on [this page](https://doc.rust-lang.org/cargo/getting-started/installation.html#install-rust-and-cargo).
3. Build the CLI tool: `cargo build --package aptos --profile cli`.
   1. The binary will be available at `target/cli/aptos`.
4. (Optional) Move this executable to a place in your PATH.
5. Verify the installation worked by running `target/cli/aptos help`.
   1. These help instructions also serve as a useful detailed guide for specific commands.

## Install on Windows

1. Follow the steps to build Aptos from source here: https://aptos.dev/guides/building-from-source/.
2. Ensure you have `cargo` installed by following the steps on [this page](https://doc.rust-lang.org/cargo/getting-started/installation.html#install-rust-and-cargo).
3. Build the CLI tool: `cargo build --package aptos --profile cli`.
   1. The binary will be available at `target\cli\aptos.exe`.
4. (Optional) Move this executable to a place in your PATH.
5. Verify the installation worked by running `target\cli\aptos.exe help`.
   1. These help instructions also serve as a useful detailed guide for specific commands.
