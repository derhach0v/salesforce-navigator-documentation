# What is Salesforce Navigator?

**Salesforce Navigator** is a Chrome extension that brings keyboard-driven navigation and vim-like editing capabilities to Salesforce Lightning Experience. It enhances productivity by providing command palette navigation, record editing, metadata inspection, and SOQL query execution—all controlled via keyboard shortcuts.

## The Problem

Salesforce Lightning is a powerful platform, but navigation can be slow:

- 🖱️ **Too much clicking** - Finding objects, flows, or setup pages requires multiple clicks through menus
- ⏱️ **Slow record editing** - Opening edit forms, clicking fields, and saving changes is time-consuming
- 🔍 **Difficult metadata access** - Viewing object details, field properties, or user information requires navigation
- 📊 **Manual data export** - Running SOQL queries and exporting results involves multiple steps

## The Solution

Salesforce Navigator solves these problems with four core features:

### 1. Navigator Panel (`Ctrl+Shift+M`)

A Spotlight-style command palette for instant navigation:

```
Press Ctrl+Shift+M → Type "Account" → Select "Account Object" → Navigate instantly
```

Search across:
- Flows
- Objects
- Permission Sets
- Profiles
- Apex Classes
- Triggers
- Visualforce Pages
- Setup Pages

### 2. Record Editor (`Ctrl+Shift+E`)

Vim-inspired modal editing for records:

```
Press Ctrl+Shift+E → Navigate with j/k → Press i to edit → Press :wq to save
```

Features:
- Normal, Insert, and Command modes
- Vim keybindings (j/k/gg/G/i/a/u/U)
- Field search with `/` and `Ctrl+/`
- Smart picklists with dependent field support
- Lookup navigation to related records
- Change tracking with undo/redo

### 3. Inspector Panel (`Ctrl+Shift+I`)

View metadata from anywhere in Salesforce:

```
Press Ctrl+Shift+I → View org/user/object details → Copy values with y
```

Capabilities:
- Organization metadata
- User details and permissions
- Object definitions
- Record information
- Works on list views and setup pages
- Draggable floating button

### 4. SOQL Query Tool (`Ctrl+Shift+Q`)

Execute queries with vim-like interface:

```
Press Ctrl+Shift+Q → Write query with autocomplete → Execute → Navigate results with j/k
```

Features:
- Syntax highlighting
- Autocomplete for SOQL keywords
- Inline result editing
- Export as JSON/CSV
- Query templates and variables
- Query history

## Design Philosophy

Salesforce Navigator is built on three principles:

### 🎯 Keyboard-First

Every action is accessible via keyboard. Mouse usage is optional, not required. This philosophy comes from vim's modal editing and terminal-based workflows.

### ⚡ Performance

Fast loading with pre-cached data, optimized API calls, and debounced search. No waiting for panels to load or searches to complete.

### 🎨 Beautiful by Default

Dark theme inspired by Tokyo Night Moon. Thoughtful color choices, smooth transitions, and visual feedback for every action.

## Inspiration

Salesforce Navigator draws inspiration from:

- **[Salesforce Inspector Reloaded](https://github.com/tprouvot/Salesforce-Inspector-reloaded)** - The gold standard for Salesforce metadata inspection
- **[Neovim](https://neovim.io/)** - Modal editing, keyboard-driven interface, and composable commands
- **[Spotlight/Raycast](https://www.raycast.com/)** - Quick command palette navigation
- **[Tokyo Night](https://github.com/tokyo-night/tokyo-night-vscode-theme)** - Beautiful, readable dark theme

## Technology Stack

- **Chrome Extension API** (Manifest V3)
- **Salesforce REST API** (v61.0)
- **Salesforce Tooling API**
- **Vanilla JavaScript** - No frameworks, pure performance
- **CSS3** - Custom properties, transitions, and modern layout

## Browser Support

Salesforce Navigator works on:

- ✅ Google Chrome
- ✅ Microsoft Edge (Chromium)
- ✅ Brave Browser
- ✅ Any Chromium-based browser with Manifest V3 support

## What's Next?

Ready to get started? Head to the [Installation Guide](/guide/installation) to install the extension, or read the [Getting Started Guide](/guide/getting-started) to learn the basics.

::: tip Learn by Doing
The best way to learn Salesforce Navigator is to use it! Install the extension, open a Salesforce record, and press `Ctrl+Shift+E`. Try navigating with `j` and `k`, editing with `i`, and saving with `:wq`. You'll get the hang of it quickly.
:::
