import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Salesforce Navigator",
  description: "Keyboard-driven navigation and vim-like editing for Salesforce Lightning Experience",
  base: '/',
  cleanUrls: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#4659e3' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'en' }],
    ['meta', { name: 'og:site_name', content: 'Salesforce Navigator' }],
  ],

  vite: {
    server: {
      host: true,
      allowedHosts: [
        '96874e60d41f.ngrok-free.app',
        '.ngrok.io',
        '.ngrok-free.app'
      ]
    }
  },

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Features', link: '/features/navigator' },
      { text: 'Reference', link: '/reference/keyboard-shortcuts' },
      { text: 'GitHub', link: 'https://github.com/denysderhachov/salesforce-navigator' }
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'What is Salesforce Navigator?', link: '/guide/what-is-salesforce-navigator' },
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Installation', link: '/guide/installation' }
        ]
      },
      {
        text: 'Features',
        items: [
          { text: 'Navigator Panel', link: '/features/navigator' },
          { text: 'Record Editor', link: '/features/record-editor' },
          { text: 'Inspector Panel', link: '/features/inspector' },
          { text: 'SOQL Query Tool', link: '/features/query-tool' }
        ]
      },
      {
        text: 'Record Editor Deep Dive',
        items: [
          { text: 'Navigation Commands', link: '/editor/navigation' },
          { text: 'Editing Commands', link: '/editor/editing' },
          { text: 'Command Mode', link: '/editor/command-mode' },
          { text: 'Field Types', link: '/editor/field-types' },
          { text: 'Advanced Features', link: '/editor/advanced-features' }
        ]
      },
      {
        text: 'SOQL Query Tool',
        items: [
          { text: 'Query Basics', link: '/query/basics' },
          { text: 'Query Results', link: '/query/results' },
          { text: 'Variables & Templates', link: '/query/variables' },
          { text: 'Export & Share', link: '/query/export' }
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: 'Keyboard Shortcuts', link: '/reference/keyboard-shortcuts' },
          { text: 'Configuration', link: '/reference/configuration' },
          { text: 'API & Permissions', link: '/reference/api-permissions' },
          { text: 'Troubleshooting', link: '/reference/troubleshooting' }
        ]
      },
      {
        text: 'Examples',
        items: [
          { text: 'Common Workflows', link: '/examples/workflows' },
          { text: 'SOQL Query Examples', link: '/examples/queries' },
          { text: 'Tips & Tricks', link: '/examples/tips' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/denysderhachov/salesforce-navigator' }
    ],

    search: {
      provider: 'local',
      options: {
        detailedView: true
      }
    },

    footer: {
      message: 'Built with VitePress',
      copyright: 'Inspired by Salesforce Inspector Reloaded and Neovim'
    },

    editLink: {
      pattern: 'https://github.com/denysderhachov/salesforce-navigator-documentation/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    }
  },

  markdown: {
    lineNumbers: true,
    theme: {
      light: 'github-light',
      dark: 'tokyo-night'
    }
  }
})
