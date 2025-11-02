# Editing

Learn how to modify field values, track changes, undo mistakes, and copy data between fields in the Record Editor.

## Insert Mode

Insert mode allows you to edit field values. Enter Insert mode from Normal mode, make your changes, then return to Normal mode.

### Entering Insert Mode

| Key | Action | Description |
|-----|--------|-------------|
| `i` | Insert | Edit current field |
| `a` | Append | Edit current field (same as `i`) |

**How It Works:**

1. Navigate to desired field with `j`/`k`
2. Press `i` to enter Insert mode
3. Field becomes editable
4. Border changes to **dark blue**
5. Mode indicator shows "INSERT"

**Example:**

```
Normal mode:
  Name [====blue border====]
  Value: "John Doe"

Press i:
  Name [====dark blue====]
  Value: "John Doe|" (cursor appears)
  Mode: INSERT

Type "Smith":
  Name [====dark blue====]
  Value: "John DoeSmith|"

Press Backspace 5 times, type "Jane Smith":
  Name [====dark blue====]
  Value: "Jane Smith|"
```

::: info No Difference Between i and a
Unlike vim, where `i` inserts before cursor and `a` appends after, the Record Editor treats both as "edit this field". This simplifies the interface since you're editing entire field values, not text at specific cursor positions.
:::

### Exiting Insert Mode

Return to Normal mode to navigate or execute commands.

| Key | Action |
|-----|--------|
| `Esc` | Exit Insert mode, return to Normal mode |

**What Happens:**
- Border changes back to **blue**
- Mode indicator shows "NORMAL"
- Changes are tracked but **not saved**
- Field shows **orange border** (unsaved changes)
- You can navigate away and return

**Example:**

```
In Insert mode editing Email:
  Email [====dark blue====]
  Value: "newemail@example.com|"

Press Esc:
  Email [====orange border====] (modified, unsaved)
  Value: "newemail@example.com"
  Mode: NORMAL
```

::: warning Unsaved Changes
Exiting Insert mode does NOT save changes. You must use `:w` in Command mode to save. Orange borders indicate unsaved modifications.
:::

## Edit Field Values

Different field types have different editing interfaces.

### Text Fields

Free-form text input.

**Field Types:**
- Text
- Email
- Phone
- URL
- Textarea (Long Text Area)

**Editing:**

```
Press i
Type or paste text
Press Esc
```

**Example:**

```
Field: Description
Before: "Old description"
Press i → Type "New detailed description"
Press Esc
After: "New detailed description" (orange border)
```

**Special Characters:**
- Newlines supported in Textarea fields
- Special characters allowed (emoji, unicode)
- HTML not rendered (stored as plain text)

### Number Fields

Numeric input with validation.

**Field Types:**
- Number
- Currency
- Percent

**Editing:**

```
Press i
Type numeric value
Press Esc
```

**Example:**

```
Field: AnnualRevenue (Currency)
Before: 1000000
Press i → Type "2500000"
Press Esc
After: 2500000 (orange border)
```

**Validation:**
- Only numbers and decimal point allowed
- Currency symbol auto-added on save
- Percent symbol auto-added on save
- Invalid input shows error message

### Boolean Fields

Checkbox for true/false values.

**Field Types:**
- Checkbox

**Editing:**

```
Press i
Click checkbox or press Space
Press Esc
```

**Values:**
- `true` - Checkbox checked
- `false` - Checkbox unchecked
- `empty` - No value (if allowed)

**Example:**

```
Field: IsActive
Before: true (checked)
Press i → Press Space
After: false (unchecked, orange border)
```

### Date and DateTime Fields

Date/time picker interface.

**Field Types:**
- Date
- DateTime

**Editing:**

```
Press i
Date picker appears
Select date (and time if DateTime)
Press Esc or click outside
```

**Example:**

```
Field: StartDate
Before: 2025-01-15
Press i → Select 2025-02-20 from picker
Press Esc
After: 2025-02-20 (orange border)
```

**Format:**
- Date: `YYYY-MM-DD`
- DateTime: `YYYY-MM-DDTHH:MM:SSZ`
- Displays in user's timezone
- Stored in UTC

### Picklist Fields

Dropdown with predefined values.

**Field Types:**
- Picklist
- Multi-select Picklist

**Editing:**

```
Press i
Dropdown appears with valid values
Select value(s)
Press Esc
```

**Example:**

```
Field: Status
Values: Draft, In Review, Approved, Rejected
Before: Draft
Press i → Select "Approved"
Press Esc
After: Approved (orange border)
```

**Dependent Picklists:**
- Controlling field changes reset dependent field
- Dependent values filtered by controlling value
- Invalid combinations prevented

**Multi-Select:**
```
Press i
Check multiple values
Press Esc
Values: "Value1;Value2;Value3" (semicolon-separated)
```

### Reference/Lookup Fields

Link to related records.

**Field Types:**
- Lookup
- Master-Detail
- External Lookup

**Editing:**

```
Press i
Type to search related records
Select from dropdown
Press Esc
```

**Example:**

```
Field: AccountId (Lookup to Account)
Before: 001xx000003DH1QAAW (Acme Corp)
Press i → Type "Burlington"
Dropdown shows: Burlington Textiles
Select "Burlington Textiles"
Press Esc
After: 001xx000003DH2RBAW (Burlington Textiles, orange border)
```

**Search:**
- Type at least 2 characters
- Searches Name field by default
- Shows up to 10 results
- Empty search shows recent records

**Clear Lookup:**
```
Press i
Clear the field (delete all text)
Press Esc
Value: (empty)
```

::: tip Lookup Navigation
Click any Salesforce ID in the Value column to open that record in the editor. Great for editing related records!
:::

### Address Fields

Compound fields with multiple components.

**Field Types:**
- Address (Billing, Shipping, etc.)

**Two Display Modes:**

**JSON Mode (default):**
```json
{
  "street": "123 Main St",
  "city": "San Francisco",
  "state": "CA",
  "postalCode": "94105",
  "country": "USA"
}
```

**Section Mode (toggle with Ctrl+A):**
```
Street: 123 Main St
City: San Francisco
State: CA
Postal Code: 94105
Country: USA
```

**Editing:**

```
Press i
Edit JSON or individual fields
Press Esc
```

**Toggle Mode:**
```
Press Ctrl+A to switch between JSON and Section views
```

## Undo and Redo

Track and reverse changes with full undo history.

### Undo

Reverse the last change.

| Key | Action |
|-----|--------|
| `u` | Undo last change |

**Example:**

```
Original: Name = "John Doe"

Edit 1: Change to "Jane Smith"
Edit 2: Change to "Bob Johnson"
Edit 3: Change to "Alice Williams"

Press u → "Bob Johnson" (undid Edit 3)
Press u → "Jane Smith" (undid Edit 2)
Press u → "John Doe" (undid Edit 1)
```

**Undo Stack:**
- All changes tracked per field
- Undo history unlimited (until save)
- `:w` (save) clears undo history
- Undo only affects current field

### Redo

Reapply an undone change.

| Key | Action |
|-----|--------|
| `U` | Redo last undone change |

**Example:**

```
Current: "John Doe"

After Edit 1: "Jane Smith"
Press u → "John Doe" (undid)
Press U → "Jane Smith" (redid)
```

**Redo Behavior:**
- Only available after undo
- New edits clear redo stack
- Redo also unlimited
- Works per field

**Combined Undo/Redo Workflow:**

```
1. Name = "Original"
2. Edit to "Change 1"
3. Edit to "Change 2"
4. Edit to "Change 3"
5. Press u u → Back to "Change 1"
6. Press U → Forward to "Change 2"
7. Edit to "Change 4" → Redo stack cleared
8. Press u → Back to "Change 2"
9. Press U → Forward to "Change 4"
```

::: tip Experimental Edits
Use undo/redo to try different values and see which looks best. Make a change, press `u` to revert, try another, press `u` again. When you find the right value, leave it and move on.
:::

## Copy and Paste

Copy values between fields with yank and paste commands.

### Copy (Yank)

Copy the current field's value to clipboard.

| Key | Action |
|-----|--------|
| `y` | Yank (copy) field value |

**Example:**

```
Navigate to Email field
Value: "john.doe@example.com"
Press y
Message: "Copied: john.doe@example.com"
```

**What Gets Copied:**
- Text fields: Full text content
- Numbers: Numeric value as text
- Dates: ISO format (YYYY-MM-DD)
- Booleans: "true" or "false"
- Lookups: Salesforce ID (18-character)
- Picklists: Selected value(s)

### Paste

Paste the copied value into the current field.

| Key | Action |
|-----|--------|
| `p` | Paste yanked value |

**Example:**

```
1. Navigate to Email field
2. Press y (copy "john.doe@example.com")
3. Navigate to Secondary_Email__c field
4. Press p
5. Value becomes "john.doe@example.com" (orange border)
```

**Paste Validation:**
- Target field type must match
- Numbers can't paste into picklists
- Text can paste into most field types
- Lookups require valid Salesforce ID

**Copy/Paste Workflow:**

```
Copy email to multiple fields:
1. Navigate to Email
2. Press y
3. Navigate to Backup_Email__c
4. Press p
5. Navigate to Contact_Email__c
6. Press p
7. Type :w to save all changes
```

::: info System Clipboard
`y` copies to the system clipboard, so you can paste into other applications with `Ctrl+V`. Similarly, you can copy text from elsewhere and paste with `p` in the editor.
:::

## Copy API Names

Copy field API names for use in code, formulas, or queries.

### Copy Label API Name

| Key | Action |
|-----|--------|
| `Ctrl+C` | Copy field label API name |

**Example:**

```
Navigate to "Annual Revenue" field
Press Ctrl+C
Copied: "AnnualRevenue"
```

**Use Cases:**
- Writing SOQL queries
- Creating formulas
- Developing Apex code
- Documentation

### Copy Full API Name

| Key | Action |
|-----|--------|
| `Ctrl+Shift+C` | Copy full field API name with object |

**Example:**

```
Navigate to "Custom Field" on Account
Press Ctrl+Shift+C
Copied: "Account.Custom_Field__c"
```

**Format:**
- Standard fields: `ObjectName.FieldName`
- Custom fields: `ObjectName.FieldName__c`
- Relationship fields: `ObjectName.RelationshipName__r.FieldName`

**Workflow:**

```
1. Navigate to field you need in SOQL
2. Press Ctrl+Shift+C
3. Switch to SOQL Query Tool (Ctrl+Shift+Q)
4. Paste into query
```

::: tip Quick SOQL Building
Use `Ctrl+Shift+C` to copy field API names while browsing a record, then paste them into your SOQL queries. Faster than looking up field names in Object Manager!
:::

## Change Tracking

The editor tracks all modifications until save.

### Visual Indicators

| Indicator | Meaning |
|-----------|---------|
| **Orange border** | Field has unsaved changes |
| **Normal border** | Field unchanged or saved |
| **Modified count** | "3 fields modified" in status bar |

**Example:**

```
Edit Email: "new@example.com"
  Email [====orange border====]

Edit Phone: "555-1234"
  Phone [====orange border====]

Status bar: "2 fields modified"
```

### View Changes

See all modified fields with the Ctrl+K popup.

**Steps:**

1. Press `Ctrl+K` in Normal mode
2. Popup shows "Changes" tab
3. Lists all modified fields
4. Shows old → new values

**Example Popup:**

```
Changes (3 fields):
  Email: john@old.com → john@new.com
  Phone: 555-9999 → 555-1234
  Status: Draft → Approved
```

### Discard Changes

Revert a field to its original value.

**Method 1: Undo**
```
Navigate to modified field
Press u repeatedly until original value restored
```

**Method 2: Refresh**
```
Type :refresh
All unsaved changes discarded
```

**Method 3: Quit Without Saving**
```
Type :q
If changes exist, confirmation prompt appears
Confirm to discard all changes
```

::: warning Discard Confirmation
`:q` with unsaved changes shows: "You have unsaved changes. Quit anyway? (y/n)". Type `y` to discard or `n` to cancel.
:::

## Ctrl+K Popup

Press `Ctrl+K` to open a popup with three tabs: Changes, Picklists, and Lookups.

### Changes Tab

**Shows:**
- All modified fields
- Original values
- New values
- Field API names

**Example:**

```
Changes (2):
┌─────────────────────────────────┐
│ Email                           │
│ Old: john@old.com               │
│ New: john@new.com               │
├─────────────────────────────────┤
│ AnnualRevenue                   │
│ Old: 1000000                    │
│ New: 2500000                    │
└─────────────────────────────────┘
```

**Navigation:**
- `j`/`k` to navigate changes
- `Enter` to jump to field
- `Esc` to close popup

### Picklists Tab

**Shows (when focused on picklist field):**
- All valid picklist values
- Currently selected value highlighted
- Dependent values (if applicable)

**Example:**

```
Status (Picklist):
┌─────────────────────────────────┐
│ Draft                           │
│ In Review                       │
│ Approved          ← (selected)  │
│ Rejected                        │
└─────────────────────────────────┘
```

**Usage:**
1. Navigate to picklist field
2. Press `Ctrl+K`
3. Switch to "Picklists" tab
4. View all options
5. Press `Esc` to close

### Lookups Tab

**Shows (when focused on lookup field):**
- Related record details
- Record type
- Key fields (Name, etc.)
- Link to open record

**Example:**

```
AccountId (Lookup to Account):
┌─────────────────────────────────┐
│ Name: Acme Corporation          │
│ Type: Customer                  │
│ Industry: Technology            │
│ [Open in Editor]                │
└─────────────────────────────────┘
```

**Usage:**
1. Navigate to lookup field
2. Press `Ctrl+K`
3. Switch to "Lookups" tab
4. View related record details
5. Click "Open in Editor" to edit

## Keyboard Shortcuts Reference

### Insert Mode

| Key | Action |
|-----|--------|
| `i` | Enter Insert mode (edit field) |
| `a` | Enter Insert mode (same as `i`) |
| `Esc` | Exit Insert mode |

### Undo/Redo

| Key | Action |
|-----|--------|
| `u` | Undo last change |
| `U` | Redo last undone change |

### Copy/Paste

| Key | Action |
|-----|--------|
| `y` | Copy (yank) field value |
| `p` | Paste yanked value |
| `Ctrl+C` | Copy field label API name |
| `Ctrl+Shift+C` | Copy full field API name |

### Popups

| Key | Action |
|-----|--------|
| `Ctrl+K` | Open Changes/Picklists/Lookups popup |
| `h`/`l` | Switch popup tabs |
| `j`/`k` | Navigate popup items |
| `Enter` | Select popup item |
| `Esc` | Close popup |

## Common Workflows

### Bulk Update Multiple Fields

```
1. Navigate to first field (j/k)
2. Press i to edit
3. Type new value
4. Press Esc
5. Press j to next field
6. Repeat steps 2-5
7. Press Ctrl+K to review changes
8. Type :w to save all
```

### Copy Value Across Multiple Fields

```
1. Navigate to source field
2. Press y to copy
3. Navigate to target field 1
4. Press p to paste
5. Navigate to target field 2
6. Press p to paste
7. Type :w to save
```

### Experimental Editing with Undo

```
1. Navigate to field
2. Press i, type "Option A", press Esc
3. Review... not quite right
4. Press u (undo)
5. Press i, type "Option B", press Esc
6. Review... better!
7. Keep it, move to next field
```

### Copy Field API Name for SOQL

```
1. Navigate to field
2. Press Ctrl+Shift+C
3. Switch to Query Tool (Ctrl+Shift+Q)
4. Paste into SELECT clause
5. Add to query
```

### Review Changes Before Save

```
1. Edit multiple fields
2. Press Ctrl+K
3. Review all changes in popup
4. Verify values correct
5. Press Esc to close
6. Type :w to save or :q to discard
```

## Tips and Tricks

### Use Undo Freely

**Tip:** Don't be afraid to experiment
```
Try a value → Press u if wrong → Try another
Undo is instant and unlimited
```

### Copy API Names While Browsing

**Tip:** Build SOQL queries from record exploration
```
1. Open record
2. Browse fields with j/k
3. Copy interesting field API names (Ctrl+Shift+C)
4. Build query from copied names
```

### Ctrl+K for Quick Overview

**Tip:** Check what you've changed before saving
```
Edit 5 fields → Press Ctrl+K → Review changes → :w
Prevents accidentally saving wrong values
```

### Paste to Duplicate Records

**Tip:** Copy fields from one record to another
```
Record 1: Press y on each field
Record 2: Open in split view
Record 2: Press p on each field
Creates duplicate with modified fields
```

## Troubleshooting

### Can't Edit Field

**Symptom:** Insert mode doesn't activate
**Solution:**
1. Check if field is read-only (gray text)
2. Verify field-level security permissions
3. System fields (Id, CreatedDate) are not editable
4. Formula and rollup fields are read-only

### Changes Not Tracked

**Symptom:** No orange border after editing
**Solution:**
1. Ensure you pressed `Esc` to exit Insert mode
2. Verify value actually changed
3. Check if new value equals original value
4. Some fields auto-format on blur

### Undo Not Working

**Symptom:** `u` doesn't revert changes
**Solution:**
1. Undo works per field, not globally
2. Navigate to the modified field first
3. If already saved (`:w`), undo history cleared
4. Refresh record with `:refresh` to revert saves

### Paste Fails

**Symptom:** `p` doesn't paste value
**Solution:**
1. Ensure you copied with `y` first
2. Check field type compatibility
3. Verify pasted value is valid for field
4. Some fields reject certain formats

### Ctrl+K Popup Empty

**Symptom:** Popup shows no changes
**Solution:**
1. Make changes first (edit fields)
2. Changes must be unsaved (orange borders)
3. After `:w`, changes list clears
4. Switch to Picklists/Lookups tab for field info

## Next Steps

- **[Navigation](/editor/navigation)** - Move through fields efficiently
- **[Command Mode](/editor/command-mode)** - Save, quit, and utility commands
- **[Field Types](/editor/field-types)** - Detailed field editing guides
- **[Advanced Features](/editor/advanced-features)** - Split-screen and power techniques

::: tip Practice Editing
Open a test record and practice: `j` to navigate, `i` to edit, `y` to copy, `p` to paste, `u` to undo. These five commands handle 90% of editing workflows!
:::
