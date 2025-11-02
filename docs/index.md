---
layout: home

hero:
  name: Salesforce Navigator
  text: Keyboard-Driven Salesforce Experience
  tagline: Vim-inspired navigation and editing for Salesforce Lightning. Navigate faster, edit smarter, work efficiently.
  image:
    src: /logo.svg
    alt: Salesforce Navigator
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/denysderhachov/salesforce-navigator
    - theme: alt
      text: Install Extension
      link: /guide/installation

features:
  - icon: ⌨️
    title: Navigator Panel
    details: Spotlight-style command palette with Ctrl+Shift+M. Search flows, objects, permission sets, Apex classes, and setup pages instantly with fuzzy search.
    link: /features/navigator
    linkText: Learn More

  - icon: ✏️
    title: Vim-Like Record Editor
    details: Modal editing with normal, insert, and command modes. Navigate with j/k, edit with i/a, save with :w, and undo with u. Full vim experience in Salesforce.
    link: /features/record-editor
    linkText: Learn More

  - icon: 🔍
    title: Inspector Panel
    details: View and export org, user, object, and record metadata from anywhere. Drag and position anywhere on screen. Works on list views and setup pages.
    link: /features/inspector
    linkText: Learn More

  - icon: 📊
    title: SOQL Query Tool
    details: Execute SOQL queries with syntax highlighting, autocomplete, and vim navigation. Export as JSON/CSV. Save query templates and use variables.
    link: /features/query-tool
    linkText: Learn More

  - icon: 🎨
    title: Beautiful Dark Theme
    details: Tokyo Night Moon color scheme with smooth transitions. Custom scrollbars, syntax highlighting, and thoughtful visual states for optimal readability.

  - icon: ⚡
    title: Lightning Fast
    details: Pre-loaded data with sessionStorage caching. Instant popup experience. Optimized API calls with debounced search and smart result limiting.

  - icon: 🔐
    title: Secure & Private
    details: Uses your existing Salesforce session. No external servers. All data stays between your browser and Salesforce. Open source for transparency.

  - icon: 🎯
    title: Keyboard-First
    details: Every action accessible via keyboard. Arrow navigation, vim motions, search shortcuts, and command mode. Mouse optional, efficiency maximized.

  - icon: 📝
    title: Smart Picklists
    details: Interactive picklist selection with Space to toggle, dependent picklist support, and multiselect handling. Navigate values with j/k like vim.

  - icon: 🔗
    title: Lookup Navigation
    details: Click reference field IDs to open related records in new editor tabs. Jump between parent and child records seamlessly. Split-screen editing support.

  - icon: 📋
    title: Change Tracking
    details: Visual indicators for modified fields with orange borders. Undo/redo with u/U. View previous and current values with Ctrl+K popup.

  - icon: 🔄
    title: Export Capabilities
    details: Export query results as JSON or CSV. Copy field API names, labels, and values. Share session IDs and org IDs for troubleshooting.
---

## Why Salesforce Navigator?

Salesforce Lightning is powerful but can be slow to navigate with just a mouse. Clicking through menus, searching for objects, and editing records takes time. **Salesforce Navigator** brings keyboard-driven efficiency to your workflow.

### Inspired by the Best

- **Salesforce Inspector Reloaded** - Metadata inspection and data export
- **Neovim** - Modal editing and keyboard-driven interface design
- **Spotlight/Raycast** - Quick command palette navigation

### Built for Power Users

Whether you're a Salesforce admin managing permissions, a developer writing SOQL queries, or an analyst exporting data - Salesforce Navigator accelerates your most common tasks.

## Quick Start

1. **Install** the Chrome extension (coming soon to Chrome Web Store)
2. **Navigate** to any Salesforce Lightning page
3. **Press** `Ctrl+Shift+M` to open the Navigator Panel
4. **Start typing** to search for flows, objects, or setup pages
5. **Press** `Ctrl+Shift+E` on a record to edit with vim keybindings

::: tip First Time with Vim?
Don't worry! The editor includes a help command (`:help`) and intuitive modes. Press `i` to start editing, `Esc` to exit insert mode, and `:wq` to save and quit. You'll be navigating like a pro in no time.
:::

## Key Features at a Glance

| Feature | Shortcut | Description |
|---------|----------|-------------|
| Navigator Panel | `Ctrl+Shift+M` | Search metadata and navigate to setup pages |
| Record Editor | `Ctrl+Shift+E` | Vim-like modal editor for records |
| Inspector Panel | `Ctrl+Shift+I` | View org, user, and object metadata |
| SOQL Query | `Ctrl+Shift+Q` | Execute queries with vim navigation |

## What's Next?

<div class="vp-doc" style="margin-top: 2rem;">

### 📖 [Getting Started Guide](/guide/getting-started)
Learn the basics and understand core concepts.

### ⌨️ [Keyboard Shortcuts](/reference/keyboard-shortcuts)
Master all available shortcuts and commands.

### 💡 [Common Workflows](/examples/workflows)
See real-world examples and best practices.

</div>
