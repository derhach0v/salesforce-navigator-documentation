# Query Results Navigation

Master the art of navigating, editing, and managing query results with vim-style keybindings. Learn how to efficiently browse large datasets, edit records inline, and understand hierarchical data structures.

## Vim-Style Navigation

Navigate query results using the same vim keybindings you use in the Record Editor.

### Basic Movement

After executing a query, results appear in a table. Navigate with these keys:

| Key | Action | Description |
|-----|--------|-------------|
| `j` | Move down | Next row |
| `k` | Move up | Previous row |
| `h` | Scroll left | View columns to the left |
| `l` | Scroll right | View columns to the right |
| `gg` | Jump to first row | Top of results |
| `G` | Jump to last row | Bottom of results |

**Example Navigation:**

```
Results: 50 records

Row 1  │ 001xxx │ John Doe    │ john@example.com
Row 2  │ 001yyy │ Jane Smith  │ jane@example.com  ← Current (j to move down)
Row 3  │ 001zzz │ Bob Wilson  │ bob@example.com
...
Row 50 │ 001aaa │ Last Person │ last@example.com

Press gg → Jump to Row 1
Press G  → Jump to Row 50
Press 5j → Move down 5 rows (if supported)
```

**Visual Feedback:**
- Selected row highlighted in blue
- Row counter shows position (e.g., "Row 5/50")
- Auto-scrolls to keep selected row visible

### Page Navigation

For large result sets, use page-based movement:

| Key | Action | Description |
|-----|--------|-------------|
| `Ctrl+D` | Page down | Move down half a page |
| `Ctrl+U` | Page up | Move up half a page |
| `Ctrl+F` | Full page down | Move down a full page |
| `Ctrl+B` | Full page up | Move up a full page |

**When to Use:**
- Browsing 100+ records
- Skipping sections quickly
- Reviewing data in chunks

### Column Navigation

When results have many columns, scroll horizontally:

```
Columns: Id, Name, Email, Phone, Title, Department, Manager, ...

Press l → Scroll right to see more columns
Press h → Scroll left to previous columns
```

**Sticky First Column:**
The first column (usually `Id`) stays visible while scrolling horizontally for context.

::: tip Navigation Speed
Holding `j` or `k` scrolls continuously through results. Release to stop. Great for quickly scanning large datasets.
:::

## Inline Editing

Edit query result values directly and save them back to Salesforce.

### Entering Edit Mode

**Steps:**
1. Navigate to a cell with `j`/`k`/`h`/`l`
2. Press `i` to enter edit mode
3. Modify the value
4. Press `Enter` to confirm
5. Press `Esc` to cancel

**Example:**

```
Current cell: Email = "old@example.com"

1. Press i (enter edit mode)
2. Type: new@example.com
3. Press Enter (confirm change)
4. Cell shows orange border (unsaved change)
```

**Editable Field Types:**
- Text, Email, Phone, URL
- Number, Currency, Percent
- Date, DateTime, Time
- Boolean (Checkbox)
- Picklist (use `Ctrl+K` for selection)
- Textarea (Long Text Area)

**Read-Only Fields:**
- `Id` (system field)
- Formula fields
- Roll-up summary fields
- Auto-number fields
- System timestamps (CreatedDate, LastModifiedDate)

### Saving Changes

After editing one or more cells, save changes back to Salesforce:

**Single Record:**
```
:w  → Save current record
```

**All Modified Records:**
```
:wall  → Save all changed records at once
```

**Process:**
1. Modified cells show orange border
2. Enter command mode with `:`
3. Type `w` (or `wall` for multiple)
4. Press `Enter`
5. Changes sent to Salesforce via API
6. Success message appears: "Record updated"
7. Orange borders removed

**Example Session:**

```
Query: SELECT Id, Name, Email FROM Contact LIMIT 5

Results:
Row 1: John Doe, john@old.com  → Edit to john@new.com (orange border)
Row 2: Jane Smith, jane@old.com → Edit to jane@new.com (orange border)

Type :wall
Press Enter
→ "2 records updated successfully"
→ Orange borders removed
```

### Handling Errors

If a save fails, an error appears in the quickfix list:

```
Quickfix List (1 error):
1. Contact 003xxx: Field 'Email' failed validation: Invalid email format
```

**Fix Process:**
1. Read error message
2. Navigate to failing cell
3. Press `i` to re-edit
4. Fix the value
5. Press `:w` to retry save

**Common Errors:**
- **Required field missing** - Fill in the required value
- **Invalid format** - Check field type (email, phone, number)
- **Validation rule** - Ensure value meets org's validation criteria
- **Field-level security** - Verify edit permissions
- **Picklist value invalid** - Use `Ctrl+K` to see valid values

::: warning Data Validation
Inline editing triggers the same validation rules and triggers as the standard Salesforce UI. If a record fails to save, you'll see the exact error message in the quickfix list.
:::

## Change Tracking

The Query Tool tracks all modifications before they're saved.

### Visual Indicators

| Indicator | Meaning |
|-----------|---------|
| **Orange border** | Cell has unsaved changes |
| **Normal border** | Cell is unchanged |
| **Blue highlight** | Currently selected cell |

**Example:**

```
Before editing:
│ Id      │ Name      │ Email          │
│ 003xxx  │ John Doe  │ john@email.com │  ← All cells normal

After editing Email:
│ Id      │ Name      │ Email          │
│ 003xxx  │ John Doe  │ john@new.com   │  ← Email has orange border

After :w (save):
│ Id      │ Name      │ Email          │
│ 003xxx  │ John Doe  │ john@new.com   │  ← Orange border removed
```

### Undo and Redo

Revert changes before saving:

| Key | Action | Description |
|-----|--------|-------------|
| `u` | Undo | Revert last change |
| `U` | Redo | Restore undone change |

**Undo Stack:**
```
1. Edit Email: old@email.com → new@email.com
2. Edit Phone: 555-1234 → 555-5678
3. Edit Name: John → Jonathan

Press u → Reverts Name change (Jonathan → John)
Press u → Reverts Phone change (555-5678 → 555-1234)
Press U → Restores Phone change (555-1234 → 555-5678)
```

**Stack Limits:**
- Undo stack: Last 50 changes
- Redo stack: Cleared when new change made
- Stack persists until query re-executed

### Viewing Change Details

Press `Ctrl+K` on a modified cell to see change history:

```
Field: Email
Previous Value: old@example.com
Current Value:  new@example.com
Modified: 2 minutes ago
Status: Unsaved
```

**Popup Shows:**
- Field name and type
- Original value (before edit)
- Current value (after edit)
- Timestamp of change
- Save status

**Press `Esc` to close popup**

## Show/Hide Columns

Customize which columns are visible in results.

### Column Management

**Open Column Selector:**
```
:columns  → Opens column visibility popup
```

**Popup Interface:**

```
Show/Hide Columns (8 columns):

[✓] Id
[✓] Name
[✓] Email
[ ] Phone          ← Hidden
[✓] Title
[ ] Department     ← Hidden
[✓] CreatedDate
[✓] LastModifiedDate

Navigate: j/k
Toggle: Space
Close: Esc
```

**Controls:**

| Key | Action |
|-----|--------|
| `j` / `k` | Navigate column list |
| `Space` | Toggle column visibility |
| `Esc` | Close popup and apply changes |

### Hiding Columns

**Why Hide Columns:**
- Focus on relevant fields
- Reduce horizontal scrolling
- Export only needed data
- Simplify visual analysis

**Example Workflow:**

```
Query: SELECT Id, Name, Email, Phone, Title, Department, Manager, CreatedDate FROM Contact LIMIT 50

Initial: All 8 columns visible (lots of scrolling)

1. Type :columns
2. Navigate to Phone (j key)
3. Press Space (uncheck)
4. Navigate to Department
5. Press Space (uncheck)
6. Navigate to Manager
7. Press Space (uncheck)
8. Press Esc (apply)

Result: Only 5 columns visible (easier to scan)
```

### Restoring Columns

Hidden columns are remembered for the current query session:

```
Type :columns → Opens popup with checkboxes
Press Space on hidden columns to show them again
Press Esc to apply
```

**Re-executing Query:**
When you re-execute the query (`:refresh` or `Ctrl+Enter`), column visibility resets to show all columns.

::: info Export Behavior
When exporting with `:exportcsv` or `:exportjson`, only visible columns are included. Hide columns you don't need before exporting.
:::

## Related Objects Display

View and navigate hierarchical data when queries include related objects.

### Understanding Related Data

When you query child relationships, results show hierarchical structure:

```sql
SELECT Id, Name,
  (SELECT FirstName, LastName, Email FROM Contacts),
  (SELECT CaseNumber, Status FROM Cases)
FROM Account
LIMIT 5
```

**Hierarchical Display:**

```
▶ Account: Acme Corp (001xxx)
  ├─▶ Contacts (3 records)
  │   ├─ John Doe, john@acme.com
  │   ├─ Jane Smith, jane@acme.com
  │   └─ Bob Wilson, bob@acme.com
  └─▶ Cases (2 records)
      ├─ Case-00001, New
      └─ Case-00002, In Progress

▶ Account: Global Inc (001yyy)
  ├─▶ Contacts (1 record)
  │   └─ Alice Brown, alice@global.com
  └─▶ Cases (0 records)
```

### Expanding and Collapsing

**Controls:**

| Key | Action |
|-----|--------|
| `Enter` | Expand/collapse current row |
| `j` / `k` | Navigate expanded rows |
| `:collapseall` | Collapse all expandable rows |

**Navigation Example:**

```
Row 1: ▶ Account: Acme Corp
       Press Enter → Expands to show:

Row 1: ▼ Account: Acme Corp
Row 2:   ├─▶ Contacts (3)
         Press Enter on Row 2 → Expands to show:

Row 1: ▼ Account: Acme Corp
Row 2:   ├─▼ Contacts (3)
Row 3:   │  ├─ John Doe
Row 4:   │  ├─ Jane Smith
Row 5:   │  └─ Bob Wilson
Row 6:   └─▶ Cases (2)

Press j to navigate down through child rows
Press k to navigate back up
```

### Indentation Levels

Visual hierarchy with indentation:

```
Level 0: Parent record (Account)
Level 1:   Related object collection (Contacts, Cases)
Level 2:     Individual child records (Contact 1, Contact 2)
```

**Indicators:**
- `▶` - Collapsed (click to expand)
- `▼` - Expanded (click to collapse)
- `├─` - Has more siblings below
- `└─` - Last sibling in group

### Editing Related Records

You can edit child records inline:

```
▼ Account: Acme Corp
  ├─▼ Contacts (3)
  │  ├─ John Doe, john@acme.com
  │  │  Navigate to Email cell
  │  │  Press i to edit
  │  │  Type new@acme.com
  │  │  Press Enter
  │  │  Orange border shows unsaved change
  │  └─ Press :w to save

Result: Contact record updated
```

### Collapsing All

To simplify view with many expanded rows:

```
:collapseall  → All expandable rows collapse
```

**Before:**
```
▼ Account 1
  ├─▼ Contacts (5)
  │  ├─ Contact 1
  │  ├─ Contact 2
  │  └─ ...
  └─▼ Cases (3)
     ├─ Case 1
     └─ ...
▼ Account 2
  └─▼ Contacts (2)
     ├─ Contact 1
     └─ Contact 2
```

**After `:collapseall`:**
```
▶ Account 1
▶ Account 2
```

## Result Type Checking

The Query Tool validates field types for inline editing.

### Type Validation

When you edit a cell, the tool checks the field type:

**Text Fields:**
```
Field: Name
Type: String(80)
Validation: Max length 80 characters
```

**Number Fields:**
```
Field: Amount
Type: Currency(16,2)
Validation: Numbers only, max 16 digits, 2 decimal places
```

**Date Fields:**
```
Field: CloseDate
Type: Date
Validation: YYYY-MM-DD format or date picker
```

**Boolean Fields:**
```
Field: IsActive
Type: Checkbox
Validation: true, false, or empty (case-insensitive)
```

### Picklist Type Checking

For picklist fields, only valid values are allowed:

**Standard Picklist:**
```
Field: LeadSource
Type: Picklist
Valid Values: Web, Phone Inquiry, Partner Referral, Purchased List

Press Ctrl+K to see and select valid values
```

**Multi-Select Picklist:**
```
Field: Interests
Type: Multi-Select Picklist
Valid Values: Technology, Finance, Healthcare, Education

Press Ctrl+K, use Space to select multiple, Enter to apply
```

**Dependent Picklist:**
```
Field: SubCategory (depends on Category)
Type: Picklist
Valid Values: (filtered based on Category value)

Example:
  If Category = "Electronics"
    SubCategory values: TV, Computer, Phone
  If Category = "Clothing"
    SubCategory values: Shirts, Pants, Shoes
```

### Reference Field Checking

For lookup fields, the tool validates Salesforce IDs:

```
Field: AccountId
Type: Reference(Account)
Validation: Must be 15 or 18 character Salesforce ID
Valid: 001xx000003DH1QAAW ✓
Invalid: InvalidID123 ✗
```

**Opening Referenced Record:**
```
1. Navigate to reference field cell (AccountId)
2. Press Ctrl+K to view record details popup
3. Click ID link to open in split-screen editor
   OR
   Type :editinsplitscreen to open in right pane
```

## Block Editing for Readonly Fields

Prevent accidental edits to system and calculated fields.

### Readonly Field Protection

Certain fields cannot be edited:

**System Fields:**
- `Id` - Record identifier
- `CreatedDate` - Creation timestamp
- `CreatedById` - Creator user ID
- `LastModifiedDate` - Last update timestamp
- `LastModifiedById` - Last modifier user ID
- `SystemModstamp` - System timestamp

**Calculated Fields:**
- Formula fields (computed from other fields)
- Roll-up summary fields (aggregated from child records)
- Auto-number fields (system-generated sequences)

### Visual Indicators

Readonly fields are visually distinct:

```
│ Id (readonly)   │ Name (editable)  │ CreatedDate (readonly) │
│ 003xxx          │ John Doe         │ 2025-01-15             │
   ↑ Gray text       ↑ White text       ↑ Gray text
```

**Indicators:**
- Gray text color
- Lock icon (optional)
- No edit cursor on hover
- Pressing `i` shows message: "Field is read-only"

### Edit Attempt Blocking

If you try to edit a readonly field:

```
1. Navigate to Id field
2. Press i
3. Message appears: "Cannot edit read-only field: Id"
4. Focus returns to navigation mode
```

**Error Types:**

```
Formula Field:
"Cannot edit formula field: Total_Amount__c"

Roll-up Summary:
"Cannot edit roll-up summary field: Total_Opportunities"

System Field:
"Cannot edit system field: CreatedDate"
```

### Identifying Editable Fields

In the Type column, check for indicators:

```
│ Field           │ Type                    │ Value      │
├─────────────────┼─────────────────────────┼────────────┤
│ Id              │ id (readonly)           │ 003xxx     │
│ Name            │ string(80)              │ John Doe   │
│ Email           │ email(80)               │ j@email    │
│ Total_Amount__c │ currency(16,2) (formula)│ $1,250.00  │
│ CreatedDate     │ datetime (readonly)     │ 2025-01-15 │
```

**Legend:**
- **(readonly)** - System field, cannot edit
- **(formula)** - Calculated field, cannot edit
- No indicator - Editable field

::: tip Focus on Editable Fields
Use the Type column to quickly identify which fields you can edit. Gray text and "(readonly)" or "(formula)" indicators mean the field is protected.
:::

## Keyboard Shortcuts Reference

| Shortcut | Action |
|----------|--------|
| `j` / `k` | Navigate rows |
| `h` / `l` | Scroll columns |
| `gg` / `G` | Jump to first/last row |
| `Ctrl+D` / `Ctrl+U` | Page down/up |
| `i` | Edit cell |
| `Enter` | Confirm edit or expand/collapse |
| `Esc` | Cancel edit |
| `u` / `U` | Undo/redo |
| `Ctrl+K` | View cell details |
| `:w` | Save current record |
| `:wall` | Save all records |
| `:columns` | Show/hide columns |
| `:collapseall` | Collapse all rows |

## Next Steps

- **[Variables](/query/variables)** - Use variables in queries and edits
- **[Export](/query/export)** - Export results to JSON or CSV
- **[Query Basics](/query/basics)** - Learn SOQL fundamentals
- **[Workflows](/examples/workflows)** - Real-world query workflows

::: tip Practice Navigation
Load a query with 50+ records and practice navigating with `j`, `k`, `gg`, and `G`. Then try editing a few cells and saving with `:w`. The more you practice, the faster you'll become.
:::
