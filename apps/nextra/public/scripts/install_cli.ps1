# This script installs the Aptos CLI on Windows.
# It will perform the following steps:
# - Determine the system architecture
# - Download the CLI
# - Put it in an appropriate location

# ANSI color codes for PowerShell
$ESC = [char]0x1B
$RED = "${ESC}[31m"
$GREEN = "${ESC}[32m"
$YELLOW = "${ESC}[33m"
$BLUE = "${ESC}[34m"
$CYAN = "${ESC}[36m"
$BOLD = "${ESC}[1m"
$NC = "${ESC}[0m"

# Default values
$SCRIPT = "aptos.exe"
$TEST_COMMAND = "$SCRIPT info"
$BIN_DIR = "$env:USERPROFILE\.aptoscli\bin"
$FORCE = $false
$ACCEPT_ALL = $false
$VERSION = ""

# Print colored message
function Write-ColorMessage {
    param(
        [string]$Color,
        [string]$Message
    )
    Write-Host "$Color$Message$NC"
}

# Print error and exit
function Die {
    param([string]$Message)
    Write-ColorMessage -Color $RED -Message "Error: $Message"
    exit 1
}

# Check if a command exists
function Test-CommandExists {
    param([string]$Command)
    return [bool](Get-Command -Name $Command -ErrorAction SilentlyContinue)
}

# Get the latest version from GitHub API
function Get-LatestVersion {
    try {
        $response = Invoke-RestMethod -Uri "https://api.github.com/repos/aptos-labs/aptos-core/releases?per_page=100"
        $latestRelease = $response | Where-Object { $_.tag_name -match 'aptos-cli-v' } | Select-Object -First 1
        return $latestRelease.tag_name -replace 'aptos-cli-v', ''
    }
    catch {
        Die "Failed to get latest version: $_"
    }
}

# Determine the target platform
function Get-Target {
    $arch = (Get-WmiObject -Class Win32_Processor).Architecture
    switch ($arch) {
        0 { return "Windows-x86_64" }  # x86
        9 { return "Windows-x86_64" }  # x64
        default { Die "Unsupported architecture: $arch" }
    }
}

# Download and install the CLI
function Install-CLI {
    param(
        [string]$Version,
        [string]$Target
    )
    
    Write-ColorMessage -Color $CYAN -Message "Downloading Aptos CLI version $Version for $Target..."
    
    # Create bin directory if it doesn't exist
    if (-not (Test-Path $BIN_DIR)) {
        New-Item -ItemType Directory -Path $BIN_DIR -Force | Out-Null
    }
    
    # Download URL
    $url = "https://github.com/aptos-labs/aptos-core/releases/download/aptos-cli-v$Version/aptos-cli-$Version-$Target.zip"
    $zipPath = Join-Path $env:TEMP "aptos-cli.zip"
    
    try {
        # Download the file
        # Check if curl is installed
        if (-not (Test-CommandExists "curl.exe")) {
            Invoke-WebRequest -Uri $url -OutFile $zipPath
        } else {
            # Use curl to download the file
            curl.exe -L $url -o $zipPath
        }
        
        # Extract the zip file
        Expand-Archive -Path $zipPath -DestinationPath $BIN_DIR -Force
        
        # Clean up
        Remove-Item $zipPath -Force
    }
    catch {
        Die "Failed to download or extract CLI: $_"
    }
    
    Write-ColorMessage -Color $GREEN -Message "Aptos CLI installed successfully!"
}

# Main installation process
function Main {
    # Parse command line arguments
    for ($i = 0; $i -lt $args.Count; $i++) {
        switch ($args[$i]) {
            '-f' { $FORCE = $true }
            '--force' { $FORCE = $true }
            '-y' { $ACCEPT_ALL = $true }
            '--yes' { $ACCEPT_ALL = $true }
            '--bin-dir' {
                if ($i + 1 -lt $args.Count) {
                    $BIN_DIR = $args[$i + 1]
                    $i++
                }
                else {
                    Die "No directory specified for --bin-dir"
                }
            }
            '--cli-version' {
                if ($i + 1 -lt $args.Count) {
                    $VERSION = $args[$i + 1]
                    $i++
                }
                else {
                    Die "No version specified for --cli-version"
                }
            }
            default {
                Die "Unknown option: $($args[$i])"
            }
        }
    }
    
    # Get version if not specified
    if (-not $VERSION) {
        $VERSION = Get-LatestVersion
    }
    
    # Get target platform
    $target = Get-Target
    
    # Check if CLI is already installed
    $cliPath = Join-Path $BIN_DIR $SCRIPT
    if ((Test-Path $cliPath) -and (-not $FORCE)) {
        $currentVersion = (& $cliPath --version | Select-String -Pattern '\d+\.\d+\.\d+').Matches.Value
        if ($currentVersion -eq $VERSION) {
            Write-ColorMessage -Color $YELLOW -Message "Aptos CLI version $VERSION is already installed."
            return
        }
    }
    
    # Install the CLI
    Install-CLI -Version $VERSION -Target $target
    
    # Add to PATH if not already there
    $currentPath = [Environment]::GetEnvironmentVariable('Path', 'User')
    if (-not $currentPath.Contains($BIN_DIR)) {
        Write-ColorMessage -Color $YELLOW -Message "Adding $BIN_DIR to PATH..."
        [Environment]::SetEnvironmentVariable('Path', "$currentPath;$BIN_DIR", 'User')
        Write-ColorMessage -Color $GREEN -Message "Please restart your terminal to update your PATH."
    }
    
    # Test the installation
    Write-ColorMessage -Color $CYAN -Message "Testing the installation..."
    if (& $cliPath --version) {
        Write-ColorMessage -Color $GREEN -Message "Aptos CLI is working correctly!"
    }
    else {
        Write-ColorMessage -Color $RED -Message "There was a problem with the installation."
        return
    }
}

# Run the main function
Main $args 
