export default {
  index: {
    title: 'Introduction',
    type: 'page',
    display: 'hidden'
  },
  build: {
    type: 'menu',
    title: 'Build',
    items: {
      quick_start: {
        title: 'Quick Start'
      },
      smart_contracts: {
        title: 'Smart Contracts'
      },
      apis: {
        title: 'APIs',
      },
      sdks: {
        title: 'SDKs'
      },
      indexer: {
        title: 'Indexer'
      },
      aptos_cli: {
        title: 'Aptos CLI'
      },
      advanced_guides: {
        title: 'Advanced Guides'
      }
    }
  },
  network: {
    type: 'menu',
    title: 'Network',
    items: {
      aptos_blockchain: {
        title: 'Aptos Blockchain'
      },
      aptos_nodes: {
        title: 'Aptos Nodes'
      },
      aptos_releases: {
        title: 'Aptos Releases'
      },
      glossary: {
        title: 'Glossary'
      }
    }
  },
  developer_platforms: {
    type: 'menu',
    title: 'Developer Platforms',
    items: {
      forum: {
        title: 'Forum ↗',
        href: 'https://forum.aptoslabs.com/',
        newWindow: true,
        type: 'page'
      },
      api_gateway: {
        title: 'API Gateway ↗',
        href: 'https://developers.aptoslabs.com/',
        newWindow: true,
        type: 'page'
      },
      token_hub: {
        title: 'Token Hub ↗',
        href: '',
        newWindow: true,
        type: 'page'
      }
    }
  },
  docs: {
    type: 'page',
    title: 'Docs'
  },
  nextra_link: {
    type: 'page',
    title: 'Nextra ↗',
    href: 'https://github.com/shuding/nextra',
    newWindow: true
  },
};
