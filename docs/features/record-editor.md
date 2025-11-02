# Record Editor

The Record Editor brings vim-like modal editing to Salesforce records. Edit any record with powerful keyboard navigation, change tracking, and smart field handling—all without touching your mouse.

<!-- Screenshot placeholder: Record Editor -->

## Overview

The Record Editor opens in a new browser tab and provides a terminal-like interface for editing Salesforce records. Instead of clicking through fields, you navigate with `j` and `k`, edit with `i`, and save with `:w`—just like vim.

**Key Benefits:**
- **Keyboard-driven** - Navigate and edit without using the mouse
- **Modal editing** - Separate modes for navigation, editing, and commands
- **Change tracking** - See exactly what changed before saving
- **Undo/Redo** - Full undo history with `u` and `U`
- **Smart fields** - Context-aware editing for picklists, lookups, and dates
- **Split-screen** - Edit multiple records side-by-side

::: tip Quick Access
Press `Ctrl+Shift+E` from any Salesforce record page to open it in the Record Editor.
:::

## Modal Editing

The Record Editor uses **modal editing**, meaning different keyboard shortcuts work depending on which mode you're in. This might feel unusual at first, but it makes editing incredibly efficient.

### Normal Mode (Blue Border)

This is the default mode when you open the editor. Use it to:
- Navigate between fields
- Search for specific fields
- Copy and paste values
- Enter other modes

**Visual Indicator:** Blue border around the editor, "NORMAL" badge in top-right corner

### Insert Mode (Dark Blue Border)

Edit mode where you can type to change field values. Enter by pressing `i` or `a` in Normal mode.

**Visual Indicator:** Dark blue border, "INSERT" badge in top-right corner

### Command Mode (Red Border)

Execute colon commands like `:w` (save) or `:q` (quit). Enter by typing `:` in Normal mode.

**Visual Indicator:** Red border, "COMMAND" badge in top-right corner, command input at bottom

### Search Mode (Green Border)

Search for fields by name. Enter by pressing `/` (regular search) or `Ctrl+/` (filtered search) in Normal mode.

**Visual Indicator:** Green border, "SEARCH" badge in top-right corner

## Basic Workflow

Here's a typical editing session:

1. **Open record** - Press `Ctrl+Shift+E` on any Salesforce record page
2. **Navigate** - Press `j` to move down, `k` to move up
3. **Find field** - Press `/` and type field name
4. **Edit value** - Press `i` to enter Insert mode, type new value
5. **Exit Insert** - Press `Esc` to return to Normal mode
6. **Save** - Type `:w` and press `Enter`

```
Example: Updating an Account name
1. Open Account record
2. Press Ctrl+Shift+E
3. Press / and type "Name"
4. Press Ctrl+N to jump to Name field
5. Press i to edit
6. Type new name "Acme Corporation"
7. Press Esc to exit Insert mode
8. Type :w to save
```

::: warning Unsaved Changes
Fields with unsaved changes show an **orange border**. All changes are tracked until you save with `:w` or discard them.
:::

## Navigation Commands

Move between fields quickly with these shortcuts:

| Command | Action | Example |
|---------|--------|---------|
| `j` | Move down one field | Next field in the list |
| `k` | Move up one field | Previous field in the list |
| `gg` | Jump to first field | Usually "Id" or "Name" |
| `G` | Jump to last field | Last visible field |
| `/` | Regular search | Highlights matches, keeps all fields visible |
| `Ctrl+/` | Filtered search | Shows only matching fields |
| `Ctrl+N` | Next search match | Jump to next highlighted field |
| `Ctrl+P` | Previous search match | Jump to previous highlighted field |

**Navigation Example:**

```
Current position: Field 10/42
Press j → Field 11/42
Press k → Field 10/42
Press gg → Field 1/42
Press G → Field 42/42
```

## Field Counter

The field counter in the bottom-right corner shows your current position:

```
10 / 42
│   └── Total number of fields
└────── Current field number
```

Use it to:
- Track progress through long records
- Know how many fields remain
- Verify you're on the correct field

## Visual Indicators

The editor provides constant visual feedback:

| Indicator | Meaning |
|-----------|---------|
| **Blue border** | Normal mode, field has focus |
| **Dark blue border** | Insert mode, editing active |
| **Orange border** | Field has unsaved changes |
| **Green border** | Field matches current search |
| **Gray text** | Read-only field (formula, system) |
| **Field counter** | Current position / Total fields |

## When to Use the Record Editor

The Record Editor excels at:

### ✅ Best For

- **Bulk field updates** - Edit 10+ fields in one session
- **Keyboard-only workflows** - Keep hands on home row
- **Complex edits** - Multiple related changes that need review
- **Data entry** - Fast navigation between fields
- **Power users** - Those comfortable with vim or terminal tools

### ❌ Not Ideal For

- **Single field changes** - Standard Salesforce UI is faster
- **Rich text editing** - No WYSIWYG editor available
- **File uploads** - Use standard UI for attachments
- **First-time users** - Requires learning modal editing

::: tip Learning Curve
Expect 15-30 minutes to feel comfortable with basic commands. After a few sessions, you'll be faster than clicking through the standard UI.
:::

## Related Features

The Record Editor integrates with other Salesforce Navigator features:

### Split-Screen Editing

Open multiple records side-by-side:
1. Open first record
2. Find a lookup field (e.g., Account Owner)
3. Click the ID in the Value column
4. Related record opens in split view

### Related Lists Panel

View and navigate related records:
- Press `:togglerelated` to show/hide
- Click any related record to edit
- Navigate with `j`/`k` within the panel

### Lookup Navigation

Click any Salesforce ID to navigate:
- Reference fields link to related records
- Opens in new tab or split view
- Maintains parent record context

## Advanced Topics

For deeper dives into specific capabilities:

- **[Navigation](/editor/navigation)** - Detailed navigation commands and search techniques
- **[Editing](/editor/editing)** - Insert mode, undo/redo, copy/paste workflows
- **[Command Mode](/editor/command-mode)** - All colon commands and command history
- **[Field Types](/editor/field-types)** - How each Salesforce field type is handled
- **[Advanced Features](/editor/advanced-features)** - Split-screen, related lists, and power user techniques

## Quick Reference

### Essential Commands

| Action | Command |
|--------|---------|
| Navigate down | `j` |
| Navigate up | `k` |
| Jump to first | `gg` |
| Jump to last | `G` |
| Edit field | `i` |
| Search fields | `/` |
| Save changes | `:w` |
| Save and quit | `:wq` |
| Quit without saving | `:q` |
| Undo | `u` |
| Redo | `U` |

### Mode Switching

| From | To | Command |
|------|-----|---------|
| Normal | Insert | `i` or `a` |
| Insert | Normal | `Esc` |
| Normal | Command | `:` |
| Command | Normal | `Esc` or `Enter` |
| Normal | Search | `/` or `Ctrl+/` |
| Search | Normal | `Esc` |

## Troubleshooting

### Editor Doesn't Open

1. Verify you're on a Salesforce record detail page
2. Check that the URL contains `/r/` (record path)
3. Ensure you're logged into Salesforce
4. Check browser console for errors (`F12`)

### Can't Edit Fields

1. Confirm you're in Insert mode (dark blue border)
2. Check if field is read-only (gray text)
3. Verify field-level security permissions
4. Some fields are system-managed (Id, CreatedDate)

### Changes Not Saving

1. Look for error messages in the quickfix list (bottom of editor)
2. Check required fields are populated
3. Verify validation rules aren't blocking save
4. Ensure you have edit permission on the record

### Search Not Finding Fields

1. Try different search terms (API name vs Label)
2. Use `Ctrl+/` for filtered search to see only matches
3. Check if field is on the page layout
4. Some system fields may be hidden

## Next Steps

Now that you understand the Record Editor basics:

1. **Try it out** - Open a test record and practice `j`, `k`, `i`, `:wq`
2. **Learn navigation** - Read [Navigation](/editor/navigation) for search techniques
3. **Master editing** - Check [Editing](/editor/editing) for copy/paste and undo
4. **Explore commands** - See [Command Mode](/editor/command-mode) for all `:` commands
5. **Handle field types** - Visit [Field Types](/editor/field-types) for picklists and lookups

::: tip Practice Record
Create a test Account or Contact and practice editing. You can't break anything—just type `:q` to quit without saving if you make a mistake.
:::
