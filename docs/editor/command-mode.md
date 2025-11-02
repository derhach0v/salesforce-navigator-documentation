# Command Mode

Execute powerful colon commands to save, quit, refresh, and control the Record Editor. Command mode is your control center for record-level operations.

## Overview

Command mode is entered by typing `:` in Normal mode. A command input appears at the bottom of the editor where you type commands and press `Enter` to execute.

**Visual Indicators:**
- **Red border** around editor
- "COMMAND" badge in top-right
- Command input at bottom with `:` prefix
- Cursor in command input

**Basic Workflow:**

```
1. Normal mode (blue border)
2. Type : (colon)
3. Command mode activated (red border)
4. Type command (e.g., "w")
5. Press Enter to execute
6. Return to Normal mode
```

::: tip Quick Commands
Most commands are short: `:w` (write), `:q` (quit), `:wq` (write and quit). Inspired by vim, they're designed to be typed quickly.
:::

## Save Commands

### Write (Save)

Save changes to the current record.

| Command | Action |
|---------|--------|
| `:w` | Save all modified fields |
| `:write` | Same as `:w` |

**How It Works:**

1. Collects all fields with orange borders (unsaved changes)
2. Validates each field value
3. Sends update request to Salesforce API
4. Shows success or error message
5. Orange borders removed on success
6. Editor remains open

**Example:**

```
Modified fields:
  Email [====orange====]
  Phone [====orange====]

Type :w and press Enter

Salesforce API called:
  PATCH /services/data/v61.0/sobjects/Contact/003xxx

Success message:
  "Record saved successfully"

Modified fields cleared:
  Email (normal border)
  Phone (normal border)
```

**Error Handling:**

If save fails, errors appear in the quickfix list:

```
Type :w

Error message:
  "Validation error: Email is invalid"

Quickfix list:
  1. Email: Must be a valid email address
  2. Phone: Required field missing

Orange borders remain until errors fixed
```

::: warning Required Fields
Required fields must be populated before saving. Leave a required field empty and `:w` will fail with "Required field missing" error.
:::

### Write and Quit

Save changes and close the editor tab.

| Command | Action |
|---------|--------|
| `:wq` | Save and close tab |
| `:x` | Same as `:wq` |

**Workflow:**

```
1. Edit fields
2. Type :wq
3. Changes saved
4. Tab closes automatically
5. Return to previous page (or next tab if multiple open)
```

**Example:**

```
Edit Email, Phone, Status
Type :wq
→ Fields saved
→ Tab closes
→ Back to Salesforce
```

**Use Cases:**
- Quick single-record edits
- Workflow: Open → Edit → :wq → Done
- Keyboard-only flow (never touch mouse)

## Quit Commands

### Quit

Close the editor tab without saving.

| Command | Action |
|---------|--------|
| `:q` | Quit (close tab) |
| `:quit` | Same as `:q` |

**With Unsaved Changes:**

If orange borders exist:

```
Type :q

Warning prompt:
  "You have unsaved changes. Quit anyway? (y/n)"

Type y → Discard changes, close tab
Type n → Cancel, return to Normal mode
```

**Without Changes:**

```
Type :q
→ Tab closes immediately (no prompt)
```

::: danger Unsaved Changes Lost
`:q` with unsaved changes discards all modifications permanently. There's no undo after quitting. Use `:wq` to save before quitting.
:::

### Force Quit

Quit without confirmation, even with unsaved changes.

| Command | Action |
|---------|--------|
| `:q!` | Force quit (discard changes, no prompt) |
| `:quit!` | Same as `:q!` |

**Example:**

```
Edit 10 fields (all orange borders)
Type :q!
→ All changes discarded
→ Tab closes immediately
→ No confirmation prompt
```

**Use Cases:**
- Experimental edits you don't want to keep
- Navigated to wrong record
- Testing values without commitment

## Edit Commands

### Edit Referenced Record

Open a related record by its ID.

| Command | Action |
|---------|--------|
| `:edit <RecordId>` | Open record in new tab |
| `:e <RecordId>` | Same as `:edit` |

**Example:**

```
Type :edit 001xx000003DH1QAAW
→ Account record opens in new editor tab
→ Current record remains open in original tab
```

**Usage:**

```
1. Copy a Salesforce ID (from lookup field, etc.)
2. Type :edit and paste ID
3. Press Enter
4. Related record opens
```

**Workflow:**

```
Editing Contact:
  1. Navigate to AccountId field
  2. Copy ID: 001xx000003DH1QAAW
  3. Type :edit 001xx000003DH1QAAW
  4. Account opens in new tab
  5. Edit Account
  6. Close tab to return to Contact
```

::: tip Lookup Navigation Alternative
Instead of `:edit`, you can click any Salesforce ID in the Value column to open that record. Both methods work—choose what feels faster.
:::

## Refresh Commands

### Refresh Record

Reload record data from Salesforce, discarding unsaved changes.

| Command | Action |
|---------|--------|
| `:refresh` | Reload record from server |
| `:e` | Same as `:refresh` |

**What Happens:**

1. All unsaved changes discarded (orange borders cleared)
2. Fresh data fetched from Salesforce API
3. Editor reloads with latest values
4. Scroll position maintained
5. Success message: "Record refreshed"

**Example:**

```
Before refresh:
  Email: john@new.com [====orange====] (modified)
  Phone: 555-1234 [====orange====] (modified)

Type :refresh

After refresh:
  Email: john@old.com (original value restored)
  Phone: 555-9999 (original value restored)
```

**Use Cases:**
- Discard all changes without quitting
- Reload after another user modified record
- Verify latest data before editing
- Reset after experimental changes

::: warning All Changes Discarded
`:refresh` discards ALL unsaved changes across all fields. There's no undo after refresh. Save important changes with `:w` first.
:::

## Toggle Commands

### Toggle Read-Only Mode

Enable or disable read-only mode (prevents accidental edits).

| Command | Action |
|---------|--------|
| `:togglereadonly` | Switch read-only on/off |
| `:ro` | Same as `:togglereadonly` |

**Read-Only On:**
- All fields become read-only
- Insert mode disabled (`i` key does nothing)
- Visual indicator: "READ-ONLY" badge
- Navigation still works (`j`/`k`)
- Copy still works (`y`)

**Read-Only Off:**
- Normal editing restored
- Insert mode enabled
- Badge removed

**Example:**

```
Type :togglereadonly
→ "READ-ONLY MODE: ON"
→ All fields locked

Type :togglereadonly
→ "READ-ONLY MODE: OFF"
→ Editing enabled
```

**Use Cases:**
- Browsing records without risk of changes
- Sharing screen during demos
- Reviewing data before edits
- Learning mode for new users

### Toggle Related Lists

Show or hide the related lists panel.

| Command | Action |
|---------|--------|
| `:togglerelated` | Show/hide related lists |
| `:tr` | Same as `:togglerelated` |

**Related Lists Panel:**
- Shows related records (Contacts, Opportunities, etc.)
- Appears on right side of editor
- Click any record to open in split view
- Navigate with `j`/`k` within panel

**Example:**

```
Type :togglerelated
→ Related lists panel appears on right
→ Shows: Contacts (5), Opportunities (12), Cases (3)

Type :togglerelated
→ Panel hides
→ Full width restored
```

**Use Cases:**
- Browse related records while editing
- Quick navigation to child records
- Understanding record relationships
- Split-screen editing workflows

::: info Split-Screen
When you click a related record, it opens in split view (50/50). Edit both parent and child simultaneously. Press `:q` in either panel to close that side.
:::

## Copy Commands

### Copy Record ID

Copy the current record's Salesforce ID to clipboard.

| Command | Action |
|---------|--------|
| `:copy` | Copy record ID (18-character) |
| `:yank` | Same as `:copy` |

**Example:**

```
Editing Contact: 003xx000003DH1QAAW

Type :copy
→ Copied to clipboard: 003xx000003DH1QAAW
→ Message: "Record ID copied"
```

**Use Cases:**
- Paste into SOQL queries
- Share record links with team
- Use in automation tools
- Reference in documentation

**Alternative Methods:**
- Navigate to Id field and press `y`
- Press `Ctrl+C` on Id field

## Help Commands

### Show Help

Display all available commands and keybindings.

| Command | Action |
|---------|--------|
| `:help` | Show help overlay |
| `:h` | Same as `:help` |

**Help Overlay Shows:**
- All Normal mode commands (`j`, `k`, `gg`, `G`, etc.)
- Insert mode commands (`i`, `a`, `Esc`)
- Command mode commands (`:w`, `:q`, `:wq`, etc.)
- Search commands (`/`, `Ctrl+/`)
- Copy/paste commands (`y`, `p`)
- Special commands (`Ctrl+K`, etc.)

**Example:**

```
Type :help

Help Overlay:
┌─────────────────────────────────────────┐
│ Navigation:                             │
│   j/k - Move down/up                    │
│   gg/G - First/last field               │
│   /,Ctrl+/ - Search                     │
│                                         │
│ Editing:                                │
│   i - Insert mode                       │
│   u/U - Undo/redo                       │
│   y/p - Copy/paste                      │
│                                         │
│ Commands:                               │
│   :w - Save                             │
│   :q - Quit                             │
│   :wq - Save and quit                   │
│   :help - This help                     │
└─────────────────────────────────────────┘

Press Esc to close
```

**Use Cases:**
- Learning commands
- Quick reference during editing
- Onboarding new users
- Refreshing memory on less-used commands

## Command History

Access previously executed commands with `Ctrl+R`.

**How It Works:**

1. Press `:` to enter Command mode
2. Press `Ctrl+R` in command input
3. Previous command appears
4. Press `Ctrl+R` again for earlier commands
5. Press `Enter` to execute or edit before executing

**Example:**

```
Previously executed:
  :w
  :edit 001xx000003DH1QAAW
  :togglerelated
  :refresh

Press :
Press Ctrl+R → :refresh
Press Ctrl+R → :togglerelated
Press Ctrl+R → :edit 001xx000003DH1QAAW
Press Enter → Opens that record
```

**History Storage:**
- Last 50 commands saved
- Persists across sessions
- Stored in browser local storage
- Unique per org

::: tip Repeat Common Commands
If you frequently run `:togglerelated` or `:edit <specific-id>`, use `Ctrl+R` to quickly recall instead of retyping.
:::

## Command Aliases

Many commands have short aliases for speed:

| Full Command | Alias | Action |
|--------------|-------|--------|
| `:write` | `:w` | Save |
| `:quit` | `:q` | Quit |
| `:edit` | `:e` | Edit record or refresh |
| `:help` | `:h` | Show help |
| `:togglereadonly` | `:ro` | Toggle read-only |
| `:togglerelated` | `:tr` | Toggle related lists |

**Example:**

```
Type :w instead of :write
Type :e instead of :edit
Type :h instead of :help
```

## All Commands Reference

### File Operations

| Command | Alias | Action |
|---------|-------|--------|
| `:write` | `:w` | Save changes |
| `:quit` | `:q` | Quit (prompt if changes) |
| `:quit!` | `:q!` | Force quit (discard changes) |
| `:wq` | `:x` | Save and quit |

### Navigation

| Command | Alias | Action |
|---------|-------|--------|
| `:edit <id>` | `:e <id>` | Open record by ID |
| `:refresh` | `:e` | Reload record |

### Toggles

| Command | Alias | Action |
|---------|-------|--------|
| `:togglereadonly` | `:ro` | Toggle read-only mode |
| `:togglerelated` | `:tr` | Toggle related lists panel |

### Utilities

| Command | Alias | Action |
|---------|-------|--------|
| `:copy` | `:yank` | Copy record ID |
| `:help` | `:h` | Show help overlay |

## Common Workflows

### Quick Edit Session

```
1. Open record (Ctrl+Shift+E)
2. Navigate to field (j/k)
3. Edit value (i → type → Esc)
4. Save and quit (:wq)
```

### Multi-Field Update

```
1. Edit field 1 (i → type → Esc)
2. Move to field 2 (j)
3. Edit field 2 (i → type → Esc)
4. Move to field 3 (j)
5. Edit field 3 (i → type → Esc)
6. Review changes (Ctrl+K)
7. Save (:w)
8. Quit (:q)
```

### Browse Related Records

```
1. Open parent record
2. Show related lists (:togglerelated)
3. Click related record
4. Split view opens
5. Edit child record
6. Save child (:w)
7. Quit child (:q)
8. Back to parent
```

### Safe Exploration

```
1. Open record
2. Enable read-only (:togglereadonly)
3. Browse fields safely (j/k)
4. Copy values (y)
5. Disable read-only (:togglereadonly)
6. Edit as needed
```

### Refresh After External Edit

```
Someone else edited the record:
1. Type :refresh
2. Latest data loads
3. Make your changes
4. Save (:w)
```

## Tips and Tricks

### Chain Commands

Some commands can be combined:

```
:w | :togglerelated
→ Save, then toggle related lists

:refresh | :ro
→ Refresh, then enable read-only
```

::: info Command Chaining
Not all commands support chaining. Experiment to see what works. Generally, `:w`, `:refresh`, and toggles can be chained.
:::

### Auto-Complete Commands

Start typing and press `Tab`:

```
Type :to
Press Tab → :togglereadonly or :togglerelated (cycle through)
```

### Abort Command

Press `Esc` to exit Command mode without executing:

```
Type :delete
Realize it's wrong
Press Esc → Back to Normal mode, nothing executed
```

### Reuse Commands

Use `Ctrl+R` for frequent commands:

```
Opening same related records:
1. :edit 001xx000003DH1QAAW
2. Later: press :, press Ctrl+R, press Enter
```

## Troubleshooting

### Command Not Found

**Symptom:** "Unknown command: xyz"
**Solution:**
1. Check spelling (case-sensitive)
2. Use `:help` to see available commands
3. Try alias (e.g., `:w` instead of `:write`)
4. Ensure you're in Command mode (`:` typed)

### Save Fails

**Symptom:** Error message after `:w`
**Solution:**
1. Read error in quickfix list
2. Check required fields populated
3. Validate field values (e.g., email format)
4. Verify edit permissions
5. Fix errors and retry `:w`

### Can't Quit

**Symptom:** `:q` doesn't close tab
**Solution:**
1. If unsaved changes, prompt appears: type `y` or `n`
2. Use `:q!` to force quit
3. Use `:wq` to save and quit
4. Check for errors blocking quit

### Refresh Discards Changes

**Symptom:** `:refresh` clears my edits
**Solution:**
1. This is expected behavior
2. Save first with `:w` before refreshing
3. Use `:w` then `:refresh` to save and reload
4. Don't use `:refresh` if you want to keep changes

### Read-Only Won't Disable

**Symptom:** `:togglereadonly` doesn't enable editing
**Solution:**
1. Type command again to toggle off
2. Check "READ-ONLY" badge is gone
3. Verify with `:togglereadonly` until badge disappears
4. Some fields may be inherently read-only (formulas, system)

## Next Steps

- **[Navigation](/editor/navigation)** - Move through fields efficiently
- **[Editing](/editor/editing)** - Insert mode, undo/redo, copy/paste
- **[Field Types](/editor/field-types)** - How different fields are edited
- **[Advanced Features](/editor/advanced-features)** - Split-screen, related lists, power techniques

::: tip Memorize These Three
Learn `:w`, `:q`, and `:wq` first. These three commands handle 95% of Command mode usage. Everything else is a bonus.
:::
