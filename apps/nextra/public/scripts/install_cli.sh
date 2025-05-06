#!/bin/sh
# This script installs the Aptos CLI.
# It will perform the following steps:
# - Determine what platform (OS + arch) the script is being invoked from
# - Download the CLI
# - Put it in an appropriate location

# ANSI color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Default values
SCRIPT="aptos"
TEST_COMMAND="$SCRIPT info"
BIN_DIR="$HOME/.local/bin"
FORCE=false
ACCEPT_ALL=false
VERSION=""
GENERIC_LINUX=false
UNIVERSAL_INSTALLER_URL="https://raw.githubusercontent.com/gregnazario/universal-installer/main/scripts/install_pkg.sh"

# Print colored message
print_message() {
    color=$1
    shift
    printf "%b%s%b\n" "$color" "$*" "$NC"
}

# Print error and exit
die() {
    print_message "$RED" "Error: $1"
    exit 1
}

# Check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Install required packages using universal installer
install_required_packages() {
    # Download universal installer if not present
    print_message "$YELLOW" "Downloading universal installer..."
    if command_exists curl; then
        curl -s "$UNIVERSAL_INSTALLER_URL" -o /tmp/install_pkg.sh
    elif command_exists wget; then
        wget -q "$UNIVERSAL_INSTALLER_URL" -O /tmp/install_pkg.sh
    else
        die "Neither curl nor wget is installed. Please install one of them manually."
    fi
    chmod +x /tmp/install_pkg.sh

    # Install unzip if not present
    if ! command_exists unzip; then
        print_message "$YELLOW" "Installing unzip..."
        /tmp/install_pkg.sh unzip || die "Failed to install unzip"
        rm /tmp/install_pkg.sh
    fi
}

# Get the latest version from GitHub API
get_latest_version() {
    if command_exists curl; then
        curl -s "https://api.github.com/repos/aptos-labs/aptos-core/releases?per_page=100" | \
        grep -m 1 '"tag_name": "aptos-cli-v' | \
        cut -d'"' -f4 | \
        sed 's/aptos-cli-v//'
    elif command_exists wget; then
        wget -qO- "https://api.github.com/repos/aptos-labs/aptos-core/releases?per_page=100" | \
        grep -m 1 '"tag_name": "aptos-cli-v' | \
        cut -d'"' -f4 | \
        sed 's/aptos-cli-v//'
    else
        die "Neither curl nor wget is installed. Please install one of them."
    fi
}

# Determine the target platform
get_target() {
    case "$(uname -s)" in
        Linux*)
            # Check for musl libc
            if ldd --version 2>&1 | grep -q musl; then
                die "MUSL libc is not supported. Please install from source."
            fi

            case "$(uname -m)" in
                x86_64|amd64)
                    if [ "$GENERIC_LINUX" = true ]; then
                        echo "Linux-x86_64"
                    else
                        # Check for Ubuntu version
                        if [ -f /etc/os-release ]; then
                            . /etc/os-release
                            case "$VERSION_ID" in
                                24.04*) echo "Ubuntu-24.04-x86_64" ;;
                                22.04*) echo "Ubuntu-22.04-x86_64" ;;
                                *) echo "Linux-x86_64" ;;
                            esac
                        else
                            echo "Linux-x86_64"
                        fi
                    fi
                    ;;
                aarch64|arm64)
                    echo "Linux-aarch64"
                    ;;
                *)
                    die "Unsupported architecture: $(uname -m)"
                    ;;
            esac
            ;;
        Darwin*)
            case "$(uname -m)" in
                x86_64|amd64)
                    echo "macos-x86_64"
                    ;;
                arm64|aarch64)
                    echo "macos-arm64"
                    ;;
                *)
                    die "Unsupported architecture: $(uname -m)"
                    ;;
            esac
            ;;
        *)
            die "Unsupported operating system: $(uname -s)"
            ;;
    esac
}

# Download and install the CLI
install_cli() {
    version=$1
    target=$2
    
    print_message "$CYAN" "Downloading Aptos CLI version $version for $target..."
    
    # Create bin directory if it doesn't exist
    mkdir -p "$BIN_DIR"
    
    # Download URL
    url="https://github.com/aptos-labs/aptos-core/releases/download/aptos-cli-v$version/aptos-cli-$version-$target.zip"
    
    # Create temporary directory
    tmp_dir=$(mktemp -d)
    trap 'rm -rf "$tmp_dir"' EXIT
    
    # Download and extract
    if command_exists curl; then
        curl -L "$url" -o "$tmp_dir/aptos-cli.zip"
    elif command_exists wget; then
        wget "$url" -O "$tmp_dir/aptos-cli.zip"
    else
        die "Neither curl nor wget is installed. Please install one of them."
    fi
    
    # Extract the zip file
    if command_exists unzip; then
        unzip -q "$tmp_dir/aptos-cli.zip" -d "$tmp_dir"
    else
        die "unzip is not installed. Please install it."
    fi
    
    # Move the binary to the bin directory
    mv "$tmp_dir/aptos" "$BIN_DIR/"
    chmod +x "$BIN_DIR/aptos"
    
    print_message "$GREEN" "Aptos CLI installed successfully!"
}

# Main installation process
main() {
    # Install required packages first
    install_required_packages

    # Parse command line arguments
    while [ $# -gt 0 ]; do
        case "$1" in
            -f|--force)
                FORCE=true
                shift
                ;;
            -y|--yes)
                ACCEPT_ALL=true
                shift
                ;;
            --bin-dir)
                BIN_DIR="$2"
                shift 2
                ;;
            --cli-version)
                VERSION="$2"
                shift 2
                ;;
            --generic-linux)
                GENERIC_LINUX=true
                shift
                ;;
            *)
                die "Unknown option: $1"
                ;;
        esac
    done
    
    # Get version if not specified
    if [ -z "$VERSION" ]; then
        VERSION=$(get_latest_version)
    fi
    
    # Get target platform
    target=$(get_target)
    
    # Check if CLI is already installed
    if [ -x "$BIN_DIR/aptos" ] && [ "$FORCE" = false ]; then
        current_version=$("$BIN_DIR/aptos" --version | awk '{print $NF}')
        if [ "$current_version" = "$VERSION" ]; then
            print_message "$YELLOW" "Aptos CLI version $VERSION is already installed."
            exit 0
        fi
    fi
    
    # Install the CLI
    install_cli "$VERSION" "$target"
    
    # Add to PATH if not already there
    if ! echo "$PATH" | grep -q "$BIN_DIR"; then
        print_message "$YELLOW" "Adding $BIN_DIR to PATH..."
        case "$SHELL" in
            */fish)
                echo "set -U fish_user_paths $BIN_DIR \$fish_user_paths" >> "$HOME/.config/fish/config.fish"
                ;;
            *)
                echo "export PATH=\"$BIN_DIR:\$PATH\"" >> "$HOME/.profile"
                ;;
        esac
        print_message "$GREEN" "Please restart your terminal or run 'source ~/.profile' to update your PATH."
    fi
    
    # Test the installation
    print_message "$CYAN" "Testing the installation..."
    if "$BIN_DIR/aptos" --version >/dev/null 2>&1; then
        print_message "$GREEN" "Aptos CLI is working correctly!"
    else
        print_message "$RED" "There was a problem with the installation."
        exit 1
    fi
}

# Run the main function
main "$@" 