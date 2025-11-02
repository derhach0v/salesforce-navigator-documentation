# Keyboard Shortcuts Reference

Complete reference of all keyboard shortcuts in Salesforce Navigator. Master these to achieve maximum productivity.

## Global Shortcuts

These shortcuts work on any Salesforce Lightning page:

| Shortcut | Feature | Action |
|----------|---------|--------|
| `Ctrl+Shift+M` | Navigator Panel | Open/close command palette |
| `Ctrl+Shift+E` | Record Editor | Edit current record in new tab |
| `Ctrl+Shift+I` | Inspector Panel | Toggle inspector popup |
| `Ctrl+Shift+Q` | SOQL Query Tool | Open query tool in new tab |

::: tip Platform Differences
On macOS, use `Cmd` instead of `Ctrl` for all shortcuts.
:::

## Navigator Panel Shortcuts

When Navigator Panel is open (`Ctrl+Shift+M`):

| Key | Action | Description |
|-----|--------|-------------|
| `Type` | Search | Fuzzy search across all metadata |
| `↑` / `↓` | Navigate | Move through search results |
| `Enter` | Select | Open selected item |
| `Esc` | Close | Close Navigator Panel |

### Search Prefixes

| Prefix | Filter | Example |
|--------|--------|---------|
| `flow>` | Flows only | `flow>approval` |
| `object>` | Objects only | `object>account` |
| `setup>` | Setup pages only | `setup>users` |
| `permission>` | Permission sets only | `permission>admin` |

## Record Editor Shortcuts

### Normal Mode

Navigation and commands in Normal mode (blue border):

| Key | Action | Description |
|-----|--------|-------------|
| `j` | Move down | Next field |
| `k` | Move up | Previous field |
| `gg` | Jump to first | First field |
| `G` | Jump to last | Last field |
| `i` | Insert mode | Edit current field |
| `a` | Insert mode | Edit current field (append) |
| `/` | Search | Regular search (highlights matches) |
| `Ctrl+/` | Filtered search | Show only matching fields |
| `Ctrl+N` | Next match | Jump to next search result |
| `Ctrl+P` | Previous match | Jump to previous search result |
| `u` | Undo | Revert last change |
| `U` | Redo | Restore undone change |
| `y` | Yank | Copy field value to clipboard |
| `p` | Paste | Paste yanked value to current field |
| `Ctrl+K` | Details popup | View field info, changes, or picklist |
| `Shift+K` | Reference details | View lookup record details |
| `:` | Command mode | Enter command mode |
| `Esc` | Normal mode | Return to Normal mode |

### Insert Mode

Editing fields (dark blue border):

| Key | Action | Description |
|-----|--------|-------------|
| `Type` | Edit | Type to modify field value |
| `Enter` | Confirm | Confirm text field edit |
| `Esc` | Exit | Return to Normal mode |
| `Ctrl+K` | Picklist | Open picklist selector (if picklist field) |

### Command Mode

Execute commands (red border, colon prompt at bottom):

| Command | Action | Description |
|---------|--------|-------------|
| `:w` | Save | Save changes to Salesforce |
| `:wq` | Save and quit | Save and close editor |
| `:q` | Quit | Close editor without saving |
| `:q!` | Force quit | Close without saving (discard changes) |
| `:refresh` | Refresh | Reload record data from Salesforce |
| `:cancel` | Cancel | Discard all changes and quit |
| `:edit` | Edit reference | Open referenced record in new editor |
| `:copy` | Copy ID | Copy record ID to clipboard |
| `:copylabel` | Copy label | Copy current field label |
| `:copyapiname` | Copy API name | Copy current field API name |
| `:togglerelated` | Toggle related | Show/hide related lists panel |
| `:togglereadonly` | Toggle readonly | Show/hide read-only and formula fields |
| `:toggleaddress` | Toggle address | Switch address display mode |
| `:showrelationships` | Show relationships | Display parent/child relationships |
| `:help` | Help | Show all shortcuts |

### Search Mode

Finding fields (green border):

| Key | Action | Description |
|-----|--------|-------------|
| `/` | Regular search | All fields visible, matches highlighted |
| `Ctrl+/` | Filtered search | Only matching fields visible |
| `Type` | Filter | Type to search field names |
| `Ctrl+N` | Next match | Jump to next matching field |
| `Ctrl+P` | Previous match | Jump to previous matching field |
| `Esc` | Exit search | Clear search and show all fields |

### Picklist Selection

When `Ctrl+K` popup is open on picklist field:

| Key | Action | Description |
|-----|--------|-------------|
| `j` / `k` | Navigate | Move through picklist values |
| `Space` | Toggle | Select/deselect value (multi-select only) |
| `Enter` | Apply | Confirm selection and close popup |
| `Esc` | Cancel | Close popup without changes |

### Split-Screen Mode

When editor is in split-screen with query results:

| Key | Action | Description |
|-----|--------|-------------|
| `Ctrl+H` | Focus query | Switch focus to query pane |
| `Ctrl+L` | Focus editor | Switch focus to editor pane |
| `Cmd+Shift+H` (Mac) | Resize left | Move divider left (increase editor) |
| `Cmd+Shift+L` (Mac) | Resize right | Move divider right (increase query) |
| `Meta+Shift+H` (Win) | Resize left | Move divider left |
| `Meta+Shift+L` (Win) | Resize right | Move divider right |

## Inspector Panel Shortcuts

When Inspector Panel is open (`Ctrl+Shift+I`):

| Key | Action | Description |
|-----|--------|-------------|
| `j` / `k` | Navigate | Move up/down through items |
| `h` / `l` | Switch tabs | Move between Objects/Users/Org tabs |
| `y` | Yank | Copy selected value to clipboard |
| `/` | Search | Focus search input |
| `Type` | Filter | Search objects or users |
| `Enter` | Open | Open selected item in Salesforce |
| `Esc` | Close | Close Inspector Panel or clear search |
| `t` | Login (tab) | Login as user in current tab (Users tab) |
| `i` | Login (incognito) | Login as user in incognito (Users tab) |

## SOQL Query Tool Shortcuts

### Query Editor

Writing and executing queries:

| Key | Action | Description |
|-----|--------|-------------|
| `Type` | Write query | Type SOQL query with autocomplete |
| `Ctrl+Enter` | Execute | Run query and show results |
| `↑` / `↓` | History | Navigate query history |
| `Ctrl+Space` | Autocomplete | Manually trigger autocomplete |
| `Tab` / `Enter` | Accept | Accept autocomplete suggestion |
| `Esc` | Close autocomplete | Dismiss autocomplete popup |
| `:` | Command mode | Open command palette |

### Query Results

Navigating and editing results:

| Key | Action | Description |
|-----|--------|-------------|
| `j` / `k` | Navigate rows | Move up/down through records |
| `h` / `l` | Scroll columns | Scroll left/right |
| `gg` / `G` | Jump | First/last row |
| `Ctrl+D` / `Ctrl+U` | Page | Page down/up |
| `i` | Edit cell | Enter edit mode for selected cell |
| `Enter` | Confirm/Expand | Confirm edit or expand/collapse row |
| `Esc` | Cancel | Cancel edit |
| `u` / `U` | Undo/Redo | Undo or redo cell edits |
| `Ctrl+K` | Cell details | View cell change history |
| `y` | Yank | Copy cell value |

### Query Commands

Execute via command mode (`:` then command):

| Command | Action | Description |
|---------|--------|-------------|
| `:execute` | Execute | Run query |
| `:w` | Save | Save modified records |
| `:wall` | Save all | Save all modified records |
| `:savequery [name]` | Save query | Save query as template |
| `:loadquery [name]` | Load query | Load saved query template |
| `:history` | History | Show query history |
| `:columns` | Show/hide | Toggle column visibility |
| `:variables` / `:vars` | Variables | Open variables sidebar |
| `:exportcsv` | Export CSV | Export results as CSV |
| `:exportjson` | Export JSON | Export results as JSON |
| `:clear` | Clear | Clear query and results |
| `:refresh` | Refresh | Re-execute query |
| `:help` | Help | Show keyboard shortcuts |
| `:q` | Quit | Close query tab |
| `:collapseall` | Collapse | Collapse all expandable rows |
| `:editinsplitscreen` | Split edit | Open record in split-screen editor |
| `:clearpane` | Close pane | Close split-screen |
| `:let ^var = value` | Global variable | Define global variable |
| `:let :var = value` | Local variable | Define local variable |
| `:syncmetadata` | Sync metadata | Refresh SOQL metadata cache |
| `:syncobjectfields` | Sync fields | Sync object field metadata |
| `:clearcache` | Clear cache | Clear metadata cache |

### Column Management

When `:columns` popup is open:

| Key | Action | Description |
|-----|--------|-------------|
| `j` / `k` | Navigate | Move through column list |
| `Space` | Toggle | Show/hide column |
| `Esc` | Apply | Close popup and apply changes |

### Variables Sidebar

When `:variables` sidebar is open:

| Key | Action | Description |
|-----|--------|-------------|
| `j` / `k` | Navigate | Move through variable list |
| `Enter` | Edit | Edit selected variable |
| `d` | Delete | Delete selected variable |
| `y` | Yank | Copy variable name |
| `Esc` | Close | Close sidebar |

### Quickfix List

When quickfix errors are shown:

| Key | Action | Description |
|-----|--------|-------------|
| `j` / `k` | Navigate | Move through errors |
| `Enter` | Jump | Jump to error location |
| `:copen` | Open | Open quickfix list |
| `:cclose` | Close | Close quickfix list |

## Quick Reference Tables

### By Feature

#### Navigator Panel
- `Ctrl+Shift+M` - Open
- `↑` `↓` - Navigate
- `Enter` - Select
- `Esc` - Close

#### Record Editor
- `Ctrl+Shift+E` - Open
- `j` `k` - Navigate
- `i` - Edit
- `:w` - Save
- `:q` - Quit

#### Inspector Panel
- `Ctrl+Shift+I` - Toggle
- `j` `k` - Navigate
- `h` `l` - Switch tabs
- `y` - Copy
- `Esc` - Close

#### Query Tool
- `Ctrl+Shift+Q` - Open
- `Ctrl+Enter` - Execute
- `j` `k` - Navigate results
- `i` - Edit cell
- `:exportcsv` - Export

### By Mode

#### Normal Mode (Editor)
- `j` `k` - Move
- `gg` `G` - Jump
- `i` - Insert
- `/` - Search
- `u` `U` - Undo/Redo
- `y` `p` - Copy/Paste
- `:` - Command

#### Insert Mode (Editor)
- `Type` - Edit
- `Esc` - Exit
- `Ctrl+K` - Picklist

#### Command Mode (Editor & Query)
- `:w` - Save
- `:q` - Quit
- `:wq` - Save and quit
- `:help` - Help

#### Search Mode (Editor)
- `/` - Regular
- `Ctrl+/` - Filtered
- `Ctrl+N` - Next
- `Ctrl+P` - Previous
- `Esc` - Exit

## Platform-Specific Differences

### macOS vs Windows/Linux

| Feature | macOS | Windows/Linux |
|---------|-------|---------------|
| Global shortcuts | `Cmd+Shift+[Key]` | `Ctrl+Shift+[Key]` |
| Resize split panes | `Cmd+Shift+H/L` | `Meta+Shift+H/L` |
| Copy | `Cmd+C` | `Ctrl+C` |
| Paste | `Cmd+V` | `Ctrl+V` |
| Select all | `Cmd+A` | `Ctrl+A` |

::: info Meta Key
On Windows/Linux, `Meta` typically refers to the Windows key. Some systems may use `Alt` instead.
:::

### Browser Differences

**Chrome:**
- All shortcuts work as documented
- Best performance

**Edge (Chromium):**
- All shortcuts work as documented
- Performance similar to Chrome

**Other Chromium browsers:**
- Should work as documented
- Test before relying on shortcuts

## Customizing Shortcuts

Currently, keyboard shortcuts cannot be customized. The extension uses Chrome's built-in command API with fixed bindings.

**Potential Conflicts:**

If a shortcut doesn't work:
1. Check for browser extension conflicts
2. Verify Salesforce page is active
3. Check browser console for errors
4. Try reloading the page

**Common Conflicts:**
- Other Salesforce extensions (Inspector, Optimizer)
- Browser developer tools (same shortcuts)
- Operating system shortcuts (screenshot, spotlight)

## Tips for Mastery

### Start Small

**Week 1: Learn the Basics**
- `Ctrl+Shift+M` (Navigator)
- `Ctrl+Shift+E` (Editor)
- `j` `k` (navigation)
- `i` (insert)
- `:wq` (save and quit)

**Week 2: Add Commands**
- `:w` (save)
- `:q` (quit)
- `/` (search)
- `u` (undo)

**Week 3: Master Advanced**
- `Ctrl+K` (details)
- `y` `p` (copy/paste)
- `Ctrl+N` (search navigation)
- `:columns` (hide columns)

### Practice Daily

Set a goal: Use only keyboard shortcuts for 1 hour each day. Avoid the mouse entirely.

### Create Cheat Sheet

Print this page or create a custom cheat sheet with your most-used shortcuts.

### Muscle Memory

Repeat shortcuts until they become automatic:
- `j j j j j` (navigation drill)
- `i [type] Esc` (edit drill)
- `:wq` (save drill)

## Next Steps

- **[Configuration](/reference/configuration)** - Extension settings
- **[Troubleshooting](/reference/troubleshooting)** - Common issues
- **[Workflows](/examples/workflows)** - Real-world examples
- **[Tips & Tricks](/examples/tips)** - Power user techniques

::: tip Print This Page
Consider printing this reference and keeping it nearby while you learn Salesforce Navigator. Within 2 weeks, you'll have memorized the most important shortcuts.
:::
