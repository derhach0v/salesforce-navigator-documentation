# Salesforce Navigator Documentation

Official documentation site for the [Salesforce Navigator Chrome Extension](https://github.com/denysderhachov/salesforce-navigator).

## About

This documentation provides comprehensive guides, references, and examples for using Salesforce Navigator - a keyboard-driven Chrome extension that brings vim-like editing and navigation to Salesforce Lightning Experience.

## Features

- 🔍 **Searchable Documentation** - Fast client-side search across all pages
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🎨 **Tokyo Night Moon Theme** - Beautiful dark theme matching the extension
- ⚡ **Fast Performance** - Built with VitePress for blazing-fast load times
- ♿ **Accessible** - Keyboard navigation and screen reader friendly

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run docs:dev

# Build for production
npm run docs:build

# Preview production build
npm run docs:preview
```

### Project Structure

```
salesforce-navigator-documentation/
├── docs/
│   ├── .vitepress/
│   │   ├── config.mts          # VitePress configuration
│   │   └── theme/               # Custom theme
│   │       ├── index.ts
│   │       └── custom.css       # Tokyo Night Moon styling
│   ├── guide/                   # Getting started guides
│   ├── features/                # Feature documentation
│   ├── editor/                  # Record Editor deep dive
│   ├── query/                   # SOQL Query Tool docs
│   ├── reference/               # Reference documentation
│   ├── examples/                # Examples and workflows
│   ├── public/                  # Static assets
│   └── index.md                 # Homepage
├── package.json
└── README.md
```

## Documentation Structure

### Guide
- What is Salesforce Navigator?
- Getting Started
- Installation

### Features
- Navigator Panel
- Record Editor
- Inspector Panel
- SOQL Query Tool

### Editor Deep Dive
- Navigation Commands
- Editing Commands
- Command Mode
- Field Types
- Advanced Features

### Query Tool
- Query Basics
- Query Results
- Variables & Templates
- Export & Share

### Reference
- Keyboard Shortcuts
- Configuration
- API & Permissions
- Troubleshooting

### Examples
- Common Workflows
- SOQL Query Examples
- Tips & Tricks

## Contributing

Contributions are welcome! To contribute:

1. Fork this repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature/improvement`)
6. Create a Pull Request

### Documentation Guidelines

- Use clear, concise language
- Include practical examples
- Add code blocks with proper syntax highlighting
- Use VitePress components (tip, warning, info) appropriately
- Maintain the friendly, professional tone
- Test all links and examples

## Deployment

This site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

### Manual Deployment

```bash
# Build the site
npm run docs:build

# Deploy to GitHub Pages
npm run deploy
```

## Built With

- [VitePress](https://vitepress.dev/) - Static Site Generator
- [Vue 3](https://vuejs.org/) - Frontend Framework
- [Vite](https://vitejs.dev/) - Build Tool
- [Tokyo Night](https://github.com/tokyo-night/tokyo-night-vscode-theme) - Color Theme

## License

This documentation is licensed under the MIT License.

## Related Projects

- [Salesforce Navigator Extension](https://github.com/denysderhachov/salesforce-navigator) - Main Chrome extension
- [Salesforce Inspector Reloaded](https://github.com/tprouvot/Salesforce-Inspector-reloaded) - Inspiration for metadata inspection
- [Neovim](https://neovim.io/) - Inspiration for vim-like editing

## Support

If you find issues with the documentation:

1. Check the [troubleshooting guide](https://denysderhachov.github.io/salesforce-navigator-documentation/reference/troubleshooting)
2. Search existing [issues](https://github.com/denysderhachov/salesforce-navigator/issues)
3. Create a new issue with the `documentation` label

## Acknowledgments

- Inspired by [Salesforce Inspector Reloaded](https://github.com/tprouvot/Salesforce-Inspector-reloaded)
- Modal editing concept from [Neovim](https://neovim.io/)
- Theme based on [Tokyo Night](https://github.com/tokyo-night/tokyo-night-vscode-theme)
- Documentation powered by [VitePress](https://vitepress.dev/)
