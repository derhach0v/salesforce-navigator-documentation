# Getting Started

Welcome to Salesforce Navigator! This guide will help you understand the core concepts and get productive quickly.

## Core Concepts

### Modal Editing

Salesforce Navigator's Record Editor is based on **modal editing**, inspired by vim. Instead of always typing, you switch between different modes:

- **Normal Mode** (Blue) - Navigate and execute commands
- **Insert Mode** (Dark Blue) - Edit field values
- **Command Mode** (Red) - Execute colon commands like `:w` or `:q`
- **Search Mode** (Green) - Search for fields

Each mode has its own set of commands and behaviors. This separation makes the interface faster and more powerful.

::: info Why Modal Editing?
Modal editing might feel unfamiliar at first, but it's incredibly efficient. Once you learn the basics, you'll navigate and edit records faster than ever before. The key insight: most time is spent reading and navigating, not typing—so optimize for those activities.
:::

### Keyboard Shortcuts

All features are triggered by keyboard shortcuts:

| Shortcut | Feature | Description |
|----------|---------|-------------|
| `Ctrl+Shift+M` | Navigator Panel | Open command palette |
| `Ctrl+Shift+E` | Record Editor | Edit current record |
| `Ctrl+Shift+I` | Inspector Panel | Toggle inspector popup |
| `Ctrl+Shift+Q` | SOQL Query | Open query tool |

These shortcuts work on any Salesforce Lightning page.

### Session Management

Salesforce Navigator uses your existing Salesforce session. No additional login required. The extension:

1. Retrieves your `sid` cookie from Salesforce
2. Uses it as a Bearer token for API calls
3. Converts domains automatically (e.g., `lightning.force.com` → `my.salesforce.com`)

::: warning Session Required
You must be logged into Salesforce for the extension to work. If your session expires, refresh the page and log back in.
:::

## Your First 5 Minutes

### 1. Open Navigator Panel

1. Navigate to any Salesforce Lightning page
2. Press `Ctrl+Shift+M`
3. Type "Account" to search for the Account object
4. Press `Enter` to navigate

<!-- Screenshot placeholder: Navigator Panel -->

::: tip Fuzzy Search
You don't need to type the full name. Try "permset" for Permission Sets or "flowbuild" for Flow Builder. The search uses fuzzy matching to find what you need.
:::

### 2. Edit Your First Record

1. Open any Salesforce record (e.g., an Account)
2. Press `Ctrl+Shift+E`
3. A new tab opens with the Record Editor
4. Try these commands:
   - Press `j` to move down to the next field
   - Press `k` to move up to the previous field
   - Press `i` to enter Insert mode
   - Type a new value
   - Press `Esc` to exit Insert mode
   - Type `:w` and press `Enter` to save

<!-- Screenshot placeholder: Record Editor -->

::: tip Getting Unstuck
If you ever feel lost, press `Esc` to return to Normal mode. Type `:help` to see all available commands.
:::

### 3. Search for Fields

While in the Record Editor:

1. Press `/` to start a regular search
2. Type a field name (e.g., "Name")
3. All fields remain visible, matches are highlighted
4. Press `Ctrl+N` to jump to next match

Or use filtered search:

1. Press `Ctrl+/` to start filtered search
2. Type a field name
3. Only matching fields are shown
4. Press `Esc` to show all fields again

### 4. Open Inspector Panel

1. From any Salesforce page, press `Ctrl+Shift+I`
2. The inspector popup appears in the bottom-right
3. View tabs: Objects, Users, Org
4. Press `j`/`k` to navigate, `y` to copy values
5. Press `h`/`l` to switch between tabs

<!-- Screenshot placeholder: Inspector Panel -->

### 5. Run a SOQL Query

1. Press `Ctrl+Shift+Q` from any page
2. Type a SOQL query:
   ```sql
   SELECT Id, Name, Email FROM Contact WHERE Account.Name = 'Acme' LIMIT 10
   ```
3. Press the Execute button or `Ctrl+Enter`
4. Navigate results with `j`/`k`
5. Click Export to download as JSON or CSV

<!-- Screenshot placeholder: SOQL Query Tool -->

## Essential Commands

### Navigator Panel Commands

| Command | Action |
|---------|--------|
| `Type` | Fuzzy search across all metadata |
| `flow>` | Filter to flows only |
| `object>` | Filter to objects only |
| `setup>` | Filter to setup pages only |
| `↑` / `↓` | Navigate results |
| `Enter` | Open selected item |
| `Esc` | Close panel |

### Record Editor Commands

| Mode | Command | Action |
|------|---------|--------|
| Normal | `j` | Move down one field |
| Normal | `k` | Move up one field |
| Normal | `gg` | Jump to first field |
| Normal | `G` | Jump to last field |
| Normal | `i` | Enter Insert mode (edit current field) |
| Normal | `a` | Enter Insert mode (edit current field) |
| Normal | `/` | Search fields (regular) |
| Normal | `Ctrl+/` | Search fields (filtered) |
| Normal | `u` | Undo last change |
| Normal | `U` | Redo last undone change |
| Normal | `y` | Copy (yank) field value |
| Normal | `p` | Paste yanked value |
| Normal | `Ctrl+K` | View field details popup |
| Insert | `Type` | Edit field value |
| Insert | `Esc` | Exit Insert mode |
| Command | `:w` | Save changes |
| Command | `:wq` | Save and quit |
| Command | `:q` | Quit without saving |
| Command | `:help` | Show help |

### Inspector Panel Commands

| Command | Action |
|---------|--------|
| `j` | Move down |
| `k` | Move up |
| `h` | Switch to left tab |
| `l` | Switch to right tab |
| `y` | Copy selected value |
| `/` | Search objects or users |
| `Esc` | Close panel |

## Understanding Modes

### Normal Mode (Blue Border)

This is the default mode. You can:
- Navigate between fields with `j`/`k`
- Jump to first/last field with `gg`/`G`
- Search fields with `/`
- Enter Insert mode with `i` or `a`
- Enter Command mode by typing `:`
- Copy/paste values with `y`/`p`

The mode indicator in the top-right shows "NORMAL" in blue.

### Insert Mode (Dark Blue Border)

In this mode, you can type to edit the field value. You enter Insert mode by pressing `i` or `a` in Normal mode.

- Type freely to change the field
- Press `Esc` to return to Normal mode
- Changes are tracked but not saved until you use `:w`

The mode indicator shows "INSERT" in dark blue.

### Command Mode (Red Border)

Enter Command mode by typing `:` in Normal mode. The command input appears at the bottom of the editor.

- Type commands like `w`, `wq`, `q`, `help`, `refresh`
- Press `Enter` to execute
- Press `Esc` to cancel

The mode indicator shows "COMMAND" in red.

### Search Mode (Green Border)

Enter Search mode by pressing `/` or `Ctrl+/` in Normal mode.

- Type to search field names
- Regular search (`/`) highlights matches
- Filtered search (`Ctrl+/`) shows only matches
- Press `Esc` to exit search

The mode indicator shows "SEARCH" in green.

## Tips for Success

### 1. Stay in Normal Mode

Spend most of your time in Normal mode. Only enter Insert mode when you need to edit a value. This keeps your hands on the home row and navigation fast.

### 2. Use Fuzzy Search

In Navigator Panel, type abbreviations:
- "ps" finds "Permission Sets"
- "accobj" finds "Account Object"
- "flowbuild" finds "Flow Builder"

### 3. Learn Incrementally

You don't need to memorize everything. Start with:
1. `j`/`k` for navigation
2. `i` to edit
3. `:wq` to save and quit

Add more commands as you get comfortable.

### 4. Use Visual Indicators

The extension provides visual feedback:
- **Blue border** - Normal mode, focused field
- **Dark blue** - Insert mode, editing
- **Orange border** - Field has unsaved changes
- **Green border** - Search match
- **Field counter** (bottom-right) - Current position / total fields

### 5. Read the Field Counter

The field counter in the bottom-right (e.g., "5/42") shows:
- Current field number
- Total number of fields

Use it to track your progress through long records.

## Common Workflows

### Bulk Editing Multiple Fields

1. Open record with `Ctrl+Shift+E`
2. Navigate to first field with `j`/`k`
3. Press `i`, edit value, press `Esc`
4. Press `j` to move to next field
5. Press `i`, edit value, press `Esc`
6. Repeat for all fields
7. Type `:w` to save all changes at once

### Finding a Specific Field

**Method 1: Filtered Search**
1. Press `Ctrl+/`
2. Type field name (e.g., "Email")
3. Only matching fields shown
4. Press `i` to edit
5. Press `Esc` to exit search and show all fields

**Method 2: Regular Search**
1. Press `/`
2. Type field name
3. All fields visible, matches highlighted
4. Press `Ctrl+N` to jump to next match
5. Press `i` to edit

### Editing Related Records

1. Open parent record (e.g., Account)
2. Find a lookup field (e.g., Owner)
3. Click the ID link in the Value column
4. Related record opens in new editor tab
5. Edit related record
6. Close tab to return to parent

### Exporting Query Results

1. Press `Ctrl+Shift+Q`
2. Write SOQL query
3. Execute query
4. Click "Export as JSON" or "Export as CSV"
5. File downloads to your Downloads folder

## What's Next?

Now that you understand the basics, dive deeper into each feature:

- **[Navigator Panel](/features/navigator)** - Master metadata search and navigation
- **[Record Editor](/features/record-editor)** - Learn all editing commands and field types
- **[Inspector Panel](/features/inspector)** - Explore org and object metadata
- **[SOQL Query Tool](/features/query-tool)** - Write queries with autocomplete and variables

Or jump to:

- **[Keyboard Shortcuts Reference](/reference/keyboard-shortcuts)** - Complete command list
- **[Common Workflows](/examples/workflows)** - Real-world examples
- **[Tips & Tricks](/examples/tips)** - Power user techniques

::: tip Practice Makes Perfect
The more you use Salesforce Navigator, the faster you'll get. Start with simple tasks and gradually incorporate more commands. Within a week, you'll be navigating Salesforce faster than ever before.
:::
