# Advanced Features

Master the Record Editor's advanced capabilities: split-screen editing, related lists navigation, enhanced metadata display, command history, and multi-record workflows.

## Split-Screen Editing

Edit multiple records side-by-side in the same tab.

### Opening Split View

**Method 1: Click Lookup ID**

```
1. Open a record (e.g., Contact)
2. Navigate to a lookup field (e.g., AccountId)
3. Click the Salesforce ID in the Value column
4. Related record opens in split view (50/50)
```

**Method 2: Command**

```
1. Type :vsplit <RecordId>
2. Record opens in vertical split
```

**Example:**

```
Left Panel:          Right Panel:
Contact Record       Account Record
─────────────────────────────────────
Name: John Doe       Name: Acme Corp
Email: john@...      Type: Customer
AccountId: 001...    Revenue: $1M
(click ID) ────────→ (opens here)
```

### Split View Layout

**Vertical Split (Default):**
```
┌──────────────────┬──────────────────┐
│                  │                  │
│  Record 1        │  Record 2        │
│  (50% width)     │  (50% width)     │
│                  │                  │
└──────────────────┴──────────────────┘
```

**Horizontal Split:**
```
┌────────────────────────────────────┐
│          Record 1                  │
│          (50% height)              │
├────────────────────────────────────┤
│          Record 2                  │
│          (50% height)              │
└────────────────────────────────────┘
```

::: tip Toggle Split Orientation
Press `Ctrl+Shift+S` to toggle between vertical and horizontal split layouts.
:::

### Navigate Between Panels

**Keyboard:**

| Key | Action |
|-----|--------|
| `Ctrl+W h` | Focus left panel |
| `Ctrl+W l` | Focus right panel |
| `Ctrl+W j` | Focus bottom panel (horizontal split) |
| `Ctrl+W k` | Focus top panel (horizontal split) |
| `Ctrl+W w` | Cycle through panels |

**Example:**

```
In left panel (Contact):
  Press Ctrl+W l → Move to right panel (Account)

In right panel (Account):
  Press Ctrl+W h → Move back to left panel (Contact)
```

**Visual Indicator:**
- Active panel has **brighter border**
- Inactive panel has **dimmed border**

### Close Split Panel

**Close Current Panel:**
```
Type :q
→ Current panel closes
→ Other panel expands to full width
```

**Close Both Panels:**
```
In either panel: Type :qa
→ Both panels close
→ Tab closes (or returns to Salesforce)
```

**Example:**

```
Left Panel: Contact    Right Panel: Account
Type :q (in right panel)
→ Account closes
→ Contact expands to full width
```

### Edit Workflow

**Common Pattern:**

```
1. Open parent record (e.g., Account)
2. Click on a lookup ID (e.g., OwnerId)
3. User record opens in split view
4. Edit User in right panel
5. Type :w to save User
6. Type :q to close right panel
7. Back to Account in full view
```

**Multi-Level Navigation:**

```
Account → Contact → Case
1. Open Account
2. Click ContactId → Contact opens in split
3. In Contact, click CaseId → Case opens (replaces split)
4. Edit Case
5. :q → Back to Contact
6. :q → Back to Account
```

::: warning Split Limit
Maximum 2 panels at once. Opening a third record replaces the current split panel, not adds a new one.
:::

## Related Lists Panel

View and navigate to related child records.

### Open Related Lists

**Command:**
```
Type :togglerelated
→ Related lists panel appears on right
```

**Shortcut:**
```
Type :tr (alias)
```

**Example:**

```
Before:
┌────────────────────────────────────┐
│                                    │
│     Account Record (full width)    │
│                                    │
└────────────────────────────────────┘

After :togglerelated:
┌──────────────────┬─────────────────┐
│                  │ Related Lists   │
│  Account Record  │ ──────────────  │
│  (70% width)     │ Contacts (15)   │
│                  │ Opportunities   │
│                  │   (23)          │
│                  │ Cases (7)       │
│                  │ Activities (42) │
└──────────────────┴─────────────────┘
```

### Related Lists Content

**Shows:**
- Related list name (e.g., "Contacts")
- Record count (e.g., "15")
- Recent records (up to 10)
- Record names/titles

**Example:**

```
Related Lists Panel:
─────────────────────
Contacts (15)
  • John Doe
  • Jane Smith
  • Bob Johnson
  • Alice Williams
  • Charlie Brown
  + 10 more

Opportunities (23)
  • Burlington Deal - $50K
  • Acme Expansion - $125K
  • GenePoint Renewal - $30K
  + 20 more

Cases (7)
  • Issue with login
  • Feature request
  • Data import help
  + 4 more
```

### Navigate Related Lists

**Keyboard:**

| Key | Action |
|-----|--------|
| `j` | Move down one item |
| `k` | Move up one item |
| `Enter` | Open selected record |
| `Ctrl+W h` | Focus main panel |
| `Ctrl+W l` | Focus related lists panel |

**Example:**

```
1. Type :tr (open related lists)
2. Press Ctrl+W l (focus related lists panel)
3. Press j j (move down to "Jane Smith")
4. Press Enter
5. Contact "Jane Smith" opens in split view
```

### Open Related Record

**Click Method:**
```
Click any record name in related lists
→ Record opens in split view
```

**Keyboard Method:**
```
Navigate to record with j/k
Press Enter
→ Record opens in split view
```

**Result:**

```
Before (related list item selected):
┌──────────────────┬─────────────────┐
│  Account         │ Contacts (15)   │
│                  │ • John Doe      │
│                  │ • Jane Smith ←  │
│                  │ • Bob Johnson   │
└──────────────────┴─────────────────┘

After pressing Enter:
┌──────────┬──────────┬─────────────┐
│ Account  │ Contact  │ Related Lst │
│          │ (Jane)   │ (collapsed) │
└──────────┴──────────┴─────────────┘
```

### Close Related Lists

**Command:**
```
Type :togglerelated (or :tr)
→ Panel closes, main record expands
```

**Example:**

```
With related lists:
Account (70%) | Related Lists (30%)

Type :tr:
Account (100%)
```

## Lookup Navigation

Click any Salesforce ID to navigate to that record.

### Clickable IDs

All lookup and reference fields display clickable IDs:

**Field Types:**
- Lookup fields (AccountId, OwnerId, etc.)
- Master-Detail fields
- Polymorphic lookups (WhoId, WhatId)

**Visual Indicator:**
- IDs shown as blue underlined links
- Hover shows hand cursor
- Click opens related record

**Example:**

```
Field Display:
Name                  Value
───────────────────────────────────────
AccountId             001xx000003DH1QAAW
                      ↑ (clickable link)
OwnerId               005xx000003DH2RBAW
                      ↑ (clickable link)
```

### Navigation Behavior

**Single Record Open:**
```
Click lookup ID
→ Related record opens in new tab
→ Original record remains in background tab
```

**Split View Open:**
```
Click lookup ID (when split exists)
→ Related record replaces current split panel
→ Main record stays on left
```

**Example Workflow:**

```
1. Editing Contact
2. Click AccountId (001xx...)
3. Account opens in split view
4. Click OwnerId on Account (005xx...)
5. User opens (replaces Account in split)
6. :q to close User
7. Back to Contact (full view)
```

### Polymorphic Lookup Navigation

Some lookups can reference multiple object types:

**Example: WhoId (Contact or Lead)**

```
Field: WhoId (Task)
Value: 003xx... (Contact: John Doe)
Click ID
→ Contact opens

Different Task:
Field: WhoId
Value: 00Qxx... (Lead: Jane Smith)
Click ID
→ Lead opens
```

The editor automatically detects the object type and opens the correct record.

::: tip Quick Related Record Review
Use lookup navigation to quickly check related records without leaving your editing session. Click ID → Review → :q → Back to editing.
:::

## Enhanced Type Column

The Type column shows rich metadata about each field.

### Standard Type Display

**Shows:**
- Field type name (Text, Number, Lookup, etc.)
- Field length (for Text fields)
- Decimal places (for Number fields)
- Relationship object (for Lookups)

**Example:**

```
Name              Type                        Value
────────────────────────────────────────────────────
FirstName         Text(40)                    John
Email             Email(80)                   john@example.com
AnnualRevenue     Currency(18,0)              $1,000,000
AccountId         Lookup(Account)             001xx...AAW
IsActive          Checkbox                    true
CreatedDate       DateTime                    2025-10-15 10:30
```

### Enhanced Metadata

Hover over the Type column to see additional metadata:

**Tooltip Shows:**
- Required field indicator
- Unique field indicator
- External ID indicator
- Formula definition (for formula fields)
- Rollup summary definition (for rollup fields)
- Picklist values (for picklists)

**Example:**

```
Hover over "Email" type:
┌────────────────────────────┐
│ Type: Email                │
│ Length: 80                 │
│ Required: Yes              │
│ Unique: Yes                │
│ External ID: No            │
└────────────────────────────┘

Hover over "Total__c" type:
┌────────────────────────────┐
│ Type: Formula (Currency)   │
│ Formula: Amount * Quantity │
│ Decimal Places: 2          │
│ Read-Only: Yes             │
└────────────────────────────┘
```

### Field Icons

Icons in the Type column indicate special properties:

| Icon | Meaning |
|------|---------|
| 🔒 | Read-only (formula, system) |
| ⚠️ | Required field |
| 🔑 | External ID |
| 🔗 | Lookup/Reference |
| 📅 | Date/DateTime |
| #️⃣ | Number/Currency |

**Example:**

```
Name              Type                Icon
────────────────────────────────────────────
Name              Text(80)            ⚠️
Email             Email(80)           ⚠️ 🔑
Total__c          Formula(Currency)   🔒
AccountId         Lookup(Account)     🔗
StartDate         Date                📅
```

## Command History

Access previously executed commands with keyboard navigation.

### Access History

**In Command Mode:**

```
1. Press : to enter Command mode
2. Press Ctrl+R (or ↑ arrow)
3. Previous command appears
4. Press Ctrl+R again for earlier commands
5. Press Enter to execute or edit first
```

**Example:**

```
Command history (most recent first):
  :w
  :togglerelated
  :edit 001xx000003DH1QAAW
  :refresh
  :togglereadonly

Press : → Type nothing
Press Ctrl+R → :w
Press Ctrl+R → :togglerelated
Press Ctrl+R → :edit 001xx000003DH1QAAW
Press Enter → Opens that Account
```

### Navigate History

| Key | Action |
|-----|--------|
| `Ctrl+R` or `↑` | Previous command |
| `↓` | Next command (newer) |
| `Enter` | Execute command |
| `Esc` | Cancel, back to Normal mode |

### Edit Before Execute

Recall a command and modify it before executing:

```
Press :
Press Ctrl+R → :edit 001xx000003DH1QAAW
Edit to:       :edit 001xx000003DH1RBAW (different ID)
Press Enter → Opens new record
```

### History Persistence

- **Stored:** Last 50 commands
- **Persists:** Across browser sessions
- **Scope:** Per Salesforce org
- **Storage:** Browser local storage

::: tip Frequent Commands
If you often run `:togglerelated` or `:edit <specific-id>`, use Ctrl+R to recall instead of retyping. Saves time and reduces typos.
:::

## Position Tracking

The editor tracks your position and scroll state.

### Field Position

**Displayed in Field Counter:**

```
15 / 42
│   └── Total fields
└────── Current field position
```

**Persists:**
- When navigating away and back
- When toggling panels
- When refreshing (`:refresh`)

**Example:**

```
1. Navigate to field 15
2. Click lookup ID → Related record opens
3. Edit related record
4. :q → Close related record
5. Back at field 15 (position preserved)
```

### Scroll Position

**Maintained:**
- Main record scroll position
- Related lists scroll position
- Split panel scroll positions

**Example:**

```
1. Scroll down to field 30 (middle of record)
2. Open related lists (:tr)
3. Browse related records
4. Close related lists (:tr)
5. Scroll position at field 30 (preserved)
```

### Focus Tracking

**Active Element Tracked:**
- Current field
- Current panel (in split view)
- Command input
- Search input

**Restoration:**

```
1. Focus on Email field
2. Press Ctrl+K (open popup)
3. View changes
4. Press Esc (close popup)
5. Focus returns to Email field
```

## Multi-Record Workflows

Efficient patterns for editing multiple records.

### Workflow 1: Parent-Child Editing

```
Goal: Update Account and all related Contacts

1. Open Account
2. Edit Account fields (Name, Type, etc.)
3. Type :w to save Account
4. Type :tr to open related lists
5. Click first Contact
6. Edit Contact in split view
7. Type :w to save Contact
8. Type :q to close Contact
9. Click next Contact in related list
10. Repeat steps 6-9 for each Contact
11. Type :tr to close related lists
12. Type :q to close Account
```

### Workflow 2: Sequential Record Editing

```
Goal: Edit multiple Contacts in sequence

1. Open Contact list view in Salesforce
2. Open first Contact in editor (Ctrl+Shift+E)
3. Edit fields
4. Type :wq (save and close)
5. Back to list view
6. Open second Contact
7. Edit fields
8. Type :wq
9. Repeat for all Contacts
```

### Workflow 3: Related Record Chain

```
Goal: Navigate and edit a chain of related records

1. Open Opportunity
2. Click AccountId → Account opens
3. Click ParentAccountId → Parent Account opens
4. Edit Parent Account
5. Type :w to save
6. Type :q to close Parent
7. Back to Account
8. Edit Account
9. Type :w to save
10. Type :q to close Account
11. Back to Opportunity
12. Edit Opportunity
13. Type :wq to save and close
```

### Workflow 4: Bulk Field Updates

```
Goal: Update same field across multiple records

1. Open first record
2. Navigate to target field (e.g., Status)
3. Press i, edit to new value, press Esc
4. Type :wq to save and close
5. Open next record
6. Press / and type "Status"
7. Press Ctrl+N to jump to Status field
8. Press p to paste previous value
9. Type :wq to save and close
10. Repeat steps 5-9 for remaining records
```

### Workflow 5: Split-Screen Comparison

```
Goal: Compare two records side-by-side

1. Open first record
2. Copy record ID of second record
3. Type :vsplit <RecordId>
4. Both records visible side-by-side
5. Navigate both with Ctrl+W h/l
6. Compare field values
7. Edit as needed
8. Type :wall to save both
9. Type :qa to close both
```

## Keyboard Shortcuts Reference

### Split-Screen

| Shortcut | Action |
|----------|--------|
| `Click ID` | Open related record in split |
| `:vsplit <id>` | Open vertical split |
| `:split <id>` | Open horizontal split |
| `Ctrl+W h` | Focus left panel |
| `Ctrl+W l` | Focus right panel |
| `Ctrl+W w` | Cycle panels |
| `Ctrl+Shift+S` | Toggle split orientation |
| `:q` | Close current panel |
| `:qa` | Close all panels |

### Related Lists

| Shortcut | Action |
|----------|--------|
| `:togglerelated` | Toggle related lists panel |
| `:tr` | Alias for :togglerelated |
| `Ctrl+W l` | Focus related lists |
| `j` / `k` | Navigate items |
| `Enter` | Open selected record |

### Navigation

| Shortcut | Action |
|----------|--------|
| `Click ID` | Open related record |
| `:edit <id>` | Open record by ID |
| `Ctrl+K` | View field metadata |

### Command History

| Shortcut | Action |
|----------|--------|
| `Ctrl+R` | Previous command |
| `↑` | Previous command |
| `↓` | Next command |
| `Enter` | Execute command |
| `Esc` | Cancel |

## Tips and Tricks

### Quick Parent-Child Editing

**Tip:** Use related lists for fast child editing
```
1. Open parent (:tr to show related)
2. Click child → Edit → :wq
3. Automatically back to parent
4. Click next child → Edit → :wq
5. Repeat until all children updated
```

### Copy Values Across Records

**Tip:** Use yank and paste across split panels
```
Left panel (Account 1):
  Navigate to AnnualRevenue
  Press y

Right panel (Account 2):
  Navigate to AnnualRevenue
  Press p
  Type :w
```

### Bookmark Complex Commands

**Tip:** Save complex `:edit` commands in a note
```
Keep a list of frequently accessed record IDs:
  Main Account: :edit 001xx000003DH1QAAW
  Test User: :edit 005xx000003DH2RBAW
  Template Contact: :edit 003xx000003DH3SCAW

Copy/paste when needed
```

### Use Split for Data Entry

**Tip:** Reference record in one panel, enter in another
```
Left panel: Template/source record (read-only :ro)
Right panel: New record (edit fields)
Copy values from left, paste into right
```

### Related Lists for Audit

**Tip:** Check related records before editing parent
```
1. Open Account
2. :tr (open related lists)
3. Review Contacts, Opportunities, Cases
4. Understand impact of changes
5. Edit Account with full context
```

## Troubleshooting

### Split View Doesn't Open

**Symptom:** Click ID but split doesn't appear
**Solution:**
1. Ensure ID is a valid Salesforce record ID
2. Check if you have access to related record
3. Try `:vsplit <id>` command instead
4. Verify network connection

### Can't Switch Between Panels

**Symptom:** `Ctrl+W h/l` doesn't work
**Solution:**
1. Ensure split view is open (2 panels visible)
2. Try `Ctrl+W w` to cycle
3. Click in target panel to focus
4. Check if panels are properly loaded

### Related Lists Empty

**Symptom:** Related lists panel shows no records
**Solution:**
1. Verify related records exist in Salesforce
2. Check related list configuration on page layout
3. Ensure you have access (sharing rules)
4. Try :refresh to reload data

### Position Not Preserved

**Symptom:** Scroll position resets after actions
**Solution:**
1. This is expected for some actions (like :refresh)
2. Navigate back to field with j/k or search (/)
3. Use gg to jump to top, then navigate
4. Close and reopen may reset position

### Command History Not Working

**Symptom:** `Ctrl+R` doesn't show history
**Solution:**
1. Ensure you're in Command mode (press :)
2. Execute some commands first (history starts empty)
3. Check browser local storage isn't disabled
4. Try ↑ arrow instead of Ctrl+R

## Next Steps

- **[Navigation](/editor/navigation)** - Master field navigation and search
- **[Editing](/editor/editing)** - Insert mode, undo/redo, copy/paste
- **[Command Mode](/editor/command-mode)** - All colon commands
- **[Field Types](/editor/field-types)** - Field-specific editing guides

::: tip Power User Level
You've reached the advanced section! Practice these techniques to unlock the full potential of the Record Editor. Split-screen editing and related lists navigation will 10x your productivity on complex record hierarchies.
:::
