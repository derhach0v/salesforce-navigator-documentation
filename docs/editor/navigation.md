# Navigation

Master the Record Editor's navigation system to move through fields quickly and efficiently. Learn all movement commands, search techniques, and visual indicators.

## Basic Movement

Navigate between fields using vim-style keybindings.

### Up and Down

| Key | Action | Example |
|-----|--------|---------|
| `j` | Move down one field | Go to next field |
| `k` | Move up one field | Go to previous field |

**How It Works:**
- Fields are ordered as they appear in the page layout
- System fields (Id, CreatedDate, etc.) appear first
- Custom fields appear after standard fields
- Related lists are separate (toggle with `:togglerelated`)

**Example:**

```
Starting at Name field (5/42)
Press j → Email (6/42)
Press j → Phone (7/42)
Press k → Email (6/42)
Press k → Name (5/42)
```

**Visual Feedback:**
- Current field has **blue border**
- Field counter updates (e.g., "6/42")
- Field scrolls into view automatically

::: tip Smooth Scrolling
The editor automatically scrolls to keep the current field visible. No need to manually scroll—just press `j` or `k` and the field comes to you.
:::

### Jump to First and Last

| Key | Action | Example |
|-----|--------|---------|
| `gg` | Jump to first field | Usually "Id" |
| `G` | Jump to last field | Last visible field |

**Usage:**

```
Press gg → Field 1/42 (Id or first field)
Press G → Field 42/42 (last field)
```

**Common Workflow:**

```
1. Open record (starts at first field)
2. Press G to jump to bottom
3. Check last modified date
4. Press gg to return to top
```

**Special Cases:**
- If filtered search is active, `gg` goes to first **visible** field
- If related lists panel is open, `G` goes to last field in main panel
- Read-only mode doesn't affect `gg`/`G` behavior

### Repeat Commands

Some implementations support count prefixes:

```
5j → Move down 5 fields
10k → Move up 10 fields
3gg → Jump to field 3
```

::: info Implementation Note
Count prefixes depend on the vim implementation. If they don't work, just press the key multiple times (e.g., `j j j j j` for 5 fields down).
:::

## Search Features

Find fields by name using two search modes: regular and filtered.

### Regular Search (`/`)

Highlights matching fields but keeps all fields visible.

**How to Use:**

1. Press `/` in Normal mode
2. Type field name (e.g., "Email")
3. All fields remain visible
4. Matching fields highlighted in **green**
5. Press `Ctrl+N` to jump to next match
6. Press `Ctrl+P` to jump to previous match
7. Press `Esc` to exit search

**Example:**

```
Press /
Type: phone
Results:
  - Phone (highlighted in green)
  - MobilePhone (highlighted in green)
  - HomePhone (highlighted in green)
  - AccountPhone (highlighted in green)

Press Ctrl+N → Jump to Phone
Press Ctrl+N → Jump to MobilePhone
Press Ctrl+N → Jump to HomePhone
Press Ctrl+P → Jump back to MobilePhone
```

**Search Behavior:**
- Case-insensitive matching
- Partial matches included (e.g., "phone" matches "MobilePhone")
- Searches both Label and API Name
- Highlights persist until search cleared

::: tip When to Use Regular Search
Use regular search (`/`) when you want to see all fields for context while highlighting matches. Great for exploring the record structure.
:::

### Filtered Search (`Ctrl+/`)

Shows only matching fields, hiding non-matches.

**How to Use:**

1. Press `Ctrl+/` in Normal mode
2. Type field name (e.g., "Email")
3. Only matching fields shown
4. Navigate with `j`/`k` as usual
5. Press `Esc` to clear filter and show all fields

**Example:**

```
Before Ctrl+/:
  1. Id
  2. Name
  3. Email
  4. Phone
  5. Address
  ...
  42. LastModifiedDate

Press Ctrl+/
Type: email

After filter:
  1. Email
  2. Email__c (custom field)
  3. Secondary_Email__c
  (all other fields hidden)

Press Esc → All 42 fields visible again
```

**Filtered Search Benefits:**
- Faster navigation with fewer fields
- Less scrolling
- Focus on specific field types
- Quick edits to related fields

::: tip When to Use Filtered Search
Use filtered search (`Ctrl+/`) when you know exactly which field you need and want to edit it quickly without distraction.
:::

### Search Navigation

Once search matches are highlighted, navigate between them:

| Key | Action |
|-----|--------|
| `Ctrl+N` | Jump to next match |
| `Ctrl+P` | Jump to previous match |

**Example Workflow:**

```
1. Press / and type "custom"
2. All custom fields highlighted
3. Press Ctrl+N repeatedly to visit each
4. Press i to edit any field
5. Press Esc to return to Normal mode
6. Press Ctrl+N to continue to next match
```

**Wraparound:**
- `Ctrl+N` at last match wraps to first match
- `Ctrl+P` at first match wraps to last match

**Search Counter:**

While searching, the field counter shows match count:

```
3 / 8 matches
│   └── Total matches
└────── Current match number
```

### Clear Search

Exit search mode and clear highlights:

| Action | Keys |
|--------|------|
| Clear search | `Esc` |
| Clear filtered search | `Esc` |

**What Happens:**
- Search highlighting removed
- All fields become visible (if filtered)
- Return to Normal mode
- Focus stays on current field

## Field Counter

The field counter in the bottom-right corner provides position information.

### Normal Mode Counter

Shows current position out of total fields:

```
10 / 42
│    └── Total fields visible
└─────── Current field number
```

**Updates:**
- When navigating with `j`/`k`
- When jumping with `gg`/`G`
- When focusing fields with mouse

### Search Mode Counter

Shows match count during search:

```
3 / 8 matches
│   └── Total search matches
└────── Current match number
```

**Example:**

```
Press / and type "date"
Counter shows: 1 / 5 matches

Press Ctrl+N
Counter shows: 2 / 5 matches

Press Ctrl+N
Counter shows: 3 / 5 matches
```

### Filtered Search Counter

Shows visible fields after filter:

```
5 / 42 (filtered)
│   └── Total fields (unfiltered)
└────── Visible fields (filtered)
```

**Interpretation:**
- 5 fields match the filter
- 42 total fields in the record
- Currently showing only the 5 matches

::: info Counter Uses
The counter helps you:
- Track progress through long records
- Know how many fields remain
- Verify you're on the correct field
- Understand filter results
:::

## Visual Indicators

The editor uses color and styling to communicate state.

### Focus Indicators

| Indicator | Meaning |
|-----------|---------|
| **Blue border** | Current field in Normal mode |
| **Dark blue border** | Current field in Insert mode |
| **No border** | Field not focused |

**Example:**

```
Normal Mode:
  Name [====blue border====]
  Email
  Phone

Insert Mode (editing Email):
  Name
  Email [====dark blue====]
  Phone
```

### Change Indicators

| Indicator | Meaning |
|-----------|---------|
| **Orange border** | Field has unsaved changes |
| **Normal border** | Field unchanged or saved |

**Example:**

```
After editing:
  Name [====blue====]           (current, unchanged)
  Email [====orange====]         (modified, unsaved)
  Phone [====orange====]         (modified, unsaved)

After :w (save):
  Name [====blue====]           (current, unchanged)
  Email                          (saved)
  Phone                          (saved)
```

### Search Indicators

| Indicator | Meaning |
|-----------|---------|
| **Green highlight** | Field matches search |
| **Green border** | Current match in search |
| **Dimmed** | Field hidden by filter (Ctrl+/) |

**Example (Regular Search):**

```
After / and typing "email":
  Name
  Email [====green border====]   (current match)
  Phone
  Email__c [====green====]        (other match)
```

**Example (Filtered Search):**

```
After Ctrl+/ and typing "email":
  Email [====green border====]   (current match, visible)
  Email__c [====green====]        (other match, visible)
  (all other fields hidden)
```

### Read-Only Indicators

| Indicator | Meaning |
|-----------|---------|
| **Gray text** | Read-only field (formula, system) |
| **Lock icon** | Field locked by admin |
| **White text** | Editable field |

**Example:**

```
Id                     [gray] (system field)
Name                   [white] (editable)
Formula_Field__c       [gray] (formula field)
CreatedDate            [gray] (system field)
```

::: tip Quick Glance
With practice, you'll instantly recognize field states by color: blue = current, orange = modified, green = search match, gray = read-only.
:::

## Advanced Navigation

### Field Type Filtering

Navigate only to specific field types (future feature):

```
:filter text        → Show only text fields
:filter number      → Show only number fields
:filter date        → Show only date fields
:filter reference   → Show only lookup fields
:clearfilter        → Show all fields
```

### Recently Modified Fields

Jump to recently changed fields (future feature):

```
:changes    → Show only fields with unsaved changes
]c          → Next changed field
[c          → Previous changed field
```

### Required Fields

Navigate to required fields (future feature):

```
:required   → Show only required fields
]r          → Next required field
[r          → Previous required field
```

## Keyboard Shortcuts Reference

### Basic Movement

| Key | Action |
|-----|--------|
| `j` | Move down one field |
| `k` | Move up one field |
| `gg` | Jump to first field |
| `G` | Jump to last field |

### Search

| Key | Action |
|-----|--------|
| `/` | Regular search (highlight matches) |
| `Ctrl+/` | Filtered search (show only matches) |
| `Ctrl+N` | Jump to next search match |
| `Ctrl+P` | Jump to previous search match |
| `Esc` | Exit search, clear highlights |

### Navigation Info

| Display | Meaning |
|---------|---------|
| `10 / 42` | Field 10 of 42 total |
| `3 / 8 matches` | Match 3 of 8 search results |
| `5 / 42 (filtered)` | 5 visible of 42 total |

## Common Workflows

### Quick Edit Specific Field

```
1. Press Ctrl+/ (filtered search)
2. Type field name (e.g., "Email")
3. Press Esc to focus list
4. Press i to edit
5. Type new value
6. Press Esc to exit Insert mode
7. Type :w to save
```

### Browse All Date Fields

```
1. Press / (regular search)
2. Type "date"
3. All date fields highlighted
4. Press Ctrl+N to jump to each
5. Review values
6. Press Esc to clear search
```

### Navigate Long Record

```
1. Press gg to go to top
2. Press j to scan fields
3. Press G to jump to bottom
4. Check LastModifiedDate
5. Press gg to return to top
```

### Find and Edit Multiple Related Fields

```
1. Press / and type "phone"
2. Phone, MobilePhone, HomePhone highlighted
3. Press Ctrl+N to go to Phone
4. Press i, edit, press Esc
5. Press Ctrl+N to go to MobilePhone
6. Press i, edit, press Esc
7. Press Ctrl+N to go to HomePhone
8. Press i, edit, press Esc
9. Type :w to save all changes
```

## Tips and Tricks

### Stay in Normal Mode

**Tip:** Keep hands on `j` and `k` keys
- Most time spent navigating, not editing
- Quick scan of fields with rapid `j` presses
- Only enter Insert mode when ready to edit

### Use Filtered Search for Speed

**Tip:** `Ctrl+/` is faster than scrolling
```
Instead of:
  j j j j j j j j j j (10 fields down)

Use:
  Ctrl+/ → type "field" → Esc → i (instant)
```

### Combine Search with Edit

**Tip:** Search, edit, repeat workflow
```
1. Ctrl+/ → type "custom__c" (filter to custom fields)
2. i → edit first → Esc
3. j → next custom field
4. i → edit → Esc
5. Repeat steps 3-4
6. :w to save all
```

### Use Field Counter for Audits

**Tip:** Track progress through record reviews
```
"I've reviewed 15 of 42 fields (35% complete)"
Use counter to know when you're done
```

### Learn Field Order

**Tip:** After a few sessions, you'll memorize field positions
```
"Email is always around field 5-7"
"Custom fields start at field 25"
"Dates are at the bottom"

Use j/k to navigate without looking
```

## Troubleshooting

### Navigation Not Working

**Symptom:** `j`/`k` keys don't move focus
**Solution:**
1. Ensure you're in Normal mode (blue border)
2. Press `Esc` to exit Insert or Command mode
3. Check that focus is on the editor (click anywhere)
4. Verify extension is active

### Search Not Finding Fields

**Symptom:** No highlights after typing search
**Solution:**
1. Check spelling (case-insensitive, but must match)
2. Try API name instead of label (e.g., "Email__c")
3. Press `Esc` and restart search
4. Verify field exists on page layout

### Can't See Current Field

**Symptom:** Field counter updates but field not visible
**Solution:**
1. Wait for auto-scroll (500ms delay)
2. Manually scroll to field
3. Use `gg` then navigate to desired field
4. Check if filtered search is hiding the field

### Counter Shows Wrong Number

**Symptom:** Counter says "5/42" but feels like wrong field
**Solution:**
1. Field order matches page layout, not alphabetical
2. System fields come first
3. Custom fields grouped together
4. Use `/` to search by name if unsure

## Next Steps

- **[Editing](/editor/editing)** - Insert mode, undo/redo, copy/paste
- **[Command Mode](/editor/command-mode)** - All colon commands
- **[Field Types](/editor/field-types)** - How different fields are edited
- **[Advanced Features](/editor/advanced-features)** - Split-screen, related lists

::: tip Practice Makes Perfect
Spend 10 minutes navigating a test record with just `j`, `k`, `gg`, `G`, and `/`. Muscle memory develops quickly, and soon you'll navigate faster than clicking.
:::
