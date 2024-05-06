export default {
  index: {
    title: 'Introduction',
    type: 'page',
    display: 'hidden'
  },
  learn: {
    type: 'page',
    title: 'Learn ↗',
    href: 'https://learn.aptoslabs.com/',
    newWindow: true,
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
      cli: {
        title: 'CLI'
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
      blockchain: {
        title: 'Blockchain'
      },
      nodes: {
        title: 'Nodes'
      },
      releases: {
        title: 'Releases'
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
    title: 'Docs',
    display: 'hidden'
  },
};
