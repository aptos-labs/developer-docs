const fs = require("fs");
const path = require("path");

const ENV_FILE = path.join(__dirname, "apps/nextra/.env");

try {
  if (!fs.existsSync(ENV_FILE)) {
    console.error("Error: .env file does not exist under apps/nextra.");
    process.exit(1);
  }

  const envFileContent = fs.readFileSync(ENV_FILE, "utf8");
  if (!envFileContent.includes("NEXT_PUBLIC_ORIGIN=")) {
    console.error("Error: NEXT_PUBLIC_ORIGIN is not defined in the .env file.");
    process.exit(1);
  }

  console.log("Pre-build check passed.");
} catch (err) {
  console.error("An error occurred during the pre-build check:", err);
  process.exit(1);
}
