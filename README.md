
> # Documentation has moved to the new [aptos-docs](https://github.com/aptos-labs/aptos-docs) repository.
> This repository is now archived and will not receive updates.

<p align="center">
 <img width="100%" src="https://github.com/aptos-labs/aptos-core/raw/main/.assets/aptos_banner.png" alt="Aptos Developer Docs">
</p>

<div align="center">
  
[![Website](https://img.shields.io/badge/Website-Aptos.dev-0077b5?logo=internet-explorer&logoColor=white)](https://aptos.dev)
[![Docs](https://img.shields.io/badge/Docs-4CAF50?logo=read-the-docs&logoColor=white)](https://aptos.dev/en/build/get-started)
[![Discord](https://img.shields.io/badge/Join-Discord-5865F2?logo=discord&logoColor=white)](https://discord.com/invite/aptosnetwork)
[![X (Twitter)](https://img.shields.io/badge/Follow-000000?logo=x&logoColor=white)](https://x.com/aptos)
[![GitHub Issues](https://img.shields.io/github/issues/aptos-labs/developer-docs?color=yellow&logo=github)](https://github.com/aptos-labs/developer-docs/issues)

With results visible at:
[https://github.com/aptos-labs/developer-docs/actions/workflows/links.yml](https://github.com/aptos-labs/developer-docs/actions/workflows/links.yml)
</div>

---

# 📖 **Aptos Developer Documentation**

> Official **Aptos developer documentation**, providing everything you need to set up, develop, and test your projects.

## 📌 **Table of Contents**
- [💻 Installation](#installation)
  - [⚙️ Requirements](#requirements)
- [📂 Clone the Repository](#clone-the-repository)
- [📦 Install Dependencies](#install-dependencies)
- [🚀 Develop on Nextra](#develop-on-nextra)
- [🐞 Debugging](#debugging)
- [🔄 Regenerating Contributors](#regenerating-contributors)

> 📌 **For additional instructions**, see the `README.md` inside `apps/nextra/`.

Aptos uses [lychee-broken-link-checker](https://github.com/marketplace/actions/lychee-broken-link-checker) to verify broken links in Markdown files.  

Results can be viewed here:  
🔗 [GitHub Actions: Link Checking](https://github.com/aptos-labs/developer-docs/actions/workflows/links.yml)

---

## 💻 **Installation**

### ⚙️ **Requirements**
Before you proceed, ensure you have installed the following dependencies:

- **Node.js**  
  📌 Install via Homebrew:
  ```sh
  brew install node
  ```

- **pnpm (package manager)**  
  📌 Install the latest version:
  ```sh
  curl -fsSL https://get.pnpm.io/install.sh | sh -
  ```

---

## 📂 **Clone the Repository**
```sh
git clone https://github.com/aptos-labs/developer-docs.git
```

---

## 📦 **Install Dependencies**
📌 If you are using **macOS M1 Sonoma or later**, first run:
```sh
pnpm add node-gyp -g
```

📌 Then install all dependencies:
```sh
pnpm install
```

---

## 🚀 **Develop on Nextra**
> ⚠ **Important**: For more details, see `apps/nextra/README.md`.

### 1️⃣ **Set up the environment**
📌 Ensure your `.env` is properly configured inside `apps/nextra/.env`.  
Use `.env.example` as a template.

📌 Validate the setup:
```sh
pnpm prebuild
```

### 2️⃣ **Build Nextra**
```bash
pnpm run build
```
📌 This command builds `apps/nextra` and all dependent local packages.

### 3️⃣ **Navigate to the subdirectory**
```sh
cd apps/nextra
```

### 4️⃣ **Run the local development server**
```sh
pnpm run dev
```
📌 Server will be available at:  
🔗 **[http://localhost:3000](http://localhost:3000)**

---

## 🐞 **Debugging**
📌 Fix formatting issues by running:
```sh
pnpm fmt
```

---

## 🔄 **Regenerating Contributors**
📌 The `src/contributors.json` file (which powers the author list at the bottom of doc pages) needs manual updates.

### 1️⃣ **Authenticate with GitHub**
📌 Install **GitHub CLI**:  
🔗 [Installation Guide](https://github.com/cli/cli#installation)

📌 Log into your GitHub account:
```sh
gh auth login --scopes read:user,user:email
```

### 2️⃣ **Generate the contributor list**
```sh
pnpm contributors
```
📌 The updated list will now appear in the documentation.

---

## 🔗 **Useful Links**
[![Website](https://img.shields.io/badge/Website-Aptos.dev-0077b5?logo=internet-explorer&logoColor=white&style=for-the-badge)](https://aptos.dev)
[![Docs](https://img.shields.io/badge/Docs-4CAF50?logo=read-the-docs&logoColor=white&style=for-the-badge)](https://aptos.dev/en/build/get-started)
[![Discord](https://img.shields.io/badge/Join-Discord-5865F2?logo=discord&logoColor=white&style=for-the-badge)](https://discord.com/invite/aptosnetwork)
[![X (Twitter)](https://img.shields.io/badge/Follow-000000?logo=x&logoColor=white&style=for-the-badge)](https://x.com/aptos)
[![GitHub Discussions](https://img.shields.io/badge/GitHub-Discussions-181717?logo=github&logoColor=white&style=for-the-badge)](https://github.com/aptos-labs/developer-docs/discussions)


---

## 📜 **License**
This project is licensed under the **Apache 2.0**.  
See [`LICENSE`](LICENSE) for more details.

---

## 🤝 **Contributors**
A huge thank you to everyone who has contributed to this project! 🙌  

<a href="https://github.com/aptos-labs/developer-docs/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=aptos-labs/developer-docs" />
</a>

