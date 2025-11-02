# SOQL Query Tool

The SOQL Query Tool provides a powerful interface for writing and executing SOQL queries with autocomplete, vim-style navigation, inline editing, and export capabilities.

<!-- Screenshot placeholder: SOQL Query Tool -->

## Overview

Write SOQL queries with intelligent autocomplete, execute them with a keystroke, navigate results with vim keybindings, edit data inline, and export to JSON or CSV—all in one streamlined interface.

**Key Benefits:**
- **Autocomplete** - SOQL keywords, objects, and field suggestions
- **Syntax highlighting** - Color-coded query visualization
- **Vim navigation** - Browse results with `j`/`k` keys
- **Inline editing** - Edit results directly and save back to Salesforce
- **Export** - Download as JSON or CSV
- **Query history** - Access previous queries
- **Variables** - Define global and local variables for reusable queries
- **Templates** - Save frequently used queries
- **Quickfix list** - View and navigate errors

::: tip Quick Access
Press `Ctrl+Shift+Q` from any Salesforce page to open the SOQL Query Tool.
:::

## Writing Queries

### Basic Query Structure

```sql
SELECT Id, Name, Email
FROM Contact
WHERE Account.Name = 'Acme'
LIMIT 10
```

**Components:**
- `SELECT` - Fields to retrieve
- `FROM` - Object to query
- `WHERE` - Filter conditions (optional)
- `LIMIT` - Max records to return (optional)

### Autocomplete

The query editor provides intelligent suggestions as you type.

**SOQL Keywords:**
```sql
Type: SEL
Suggests: SELECT, SELECT COUNT()

Type: WHERE
Suggests: WHERE, ORDER BY, LIMIT, GROUP BY
```

**Object Names:**
```sql
Type: FROM Acc
Suggests: Account, AccountContactRelation, AccountHistory
```

**Field Names:**
```sql
Type: SELECT Na
(on Contact object)
Suggests: Name, NameSuffix, NamePrefix
```

**Relationship Fields:**
```sql
Type: Account.
Suggests: Account.Name, Account.Type, Account.Owner.Name
```

**How to Use Autocomplete:**

1. Start typing a SOQL keyword, object, or field
2. Autocomplete dropdown appears automatically
3. Navigate suggestions with `↑`/`↓` arrow keys
4. Press `Enter` or `Tab` to accept suggestion
5. Press `Esc` to close autocomplete without selecting

::: info Smart Context
Autocomplete is context-aware. After typing `FROM Account`, field suggestions will be Account-specific. After `WHERE`, operators like `=`, `!=`, `IN` are suggested.
:::

### Syntax Highlighting

Queries are color-coded for readability:

| Element | Color | Example |
|---------|-------|---------|
| Keywords | Blue | `SELECT`, `FROM`, `WHERE` |
| Strings | Green | `'Acme'`, `'john@example.com'` |
| Fields | White | `Name`, `Email`, `CreatedDate` |
| Operators | Orange | `=`, `!=`, `>`, `<`, `IN` |
| Numbers | Purple | `100`, `50.5` |
| Functions | Yellow | `COUNT()`, `MAX()`, `TODAY()` |

**Example:**

```sql
SELECT Id, Name, CreatedDate
FROM Account
WHERE AnnualRevenue > 1000000
  AND Type = 'Customer'
ORDER BY Name
LIMIT 50
```

## Executing Queries

### Run Query

**Method 1: Button**
- Click the "Execute" button

**Method 2: Keyboard**
- Press `Ctrl+Enter` anywhere in the query editor

**Method 3: Command**
- Type `:execute` in command mode

**Execution Process:**

1. Query is validated for syntax
2. Sent to Salesforce via REST API
3. Results appear in the results panel below
4. Record count displayed (e.g., "50 records found")
5. Execution time shown (e.g., "234ms")

### View Results

Results appear in a table with:
- **Columns** - All selected fields
- **Rows** - Returned records (up to LIMIT)
- **Scroll** - Horizontal for many fields, vertical for many records
- **Navigation** - Vim keybindings (`j`/`k`)

**Example Result:**

```
50 records found (234ms)

Id                  Name                Email
001xx000003DH1QAAW  John Doe           john@example.com
001xx000003DH1RBAW  Jane Smith         jane@example.com
001xx000003DH1RCAW  Bob Johnson        bob@example.com
...
```

### Navigate Results

Use vim-style keys to browse results:

| Key | Action |
|-----|--------|
| `j` | Move down one row |
| `k` | Move up one row |
| `gg` | Jump to first row |
| `G` | Jump to last row |
| `h` | Scroll left |
| `l` | Scroll right |
| `Ctrl+D` | Page down |
| `Ctrl+U` | Page up |

**Visual Indicator:**
- Selected row highlighted in blue
- Row number shown (e.g., "Row 5/50")

::: tip Fast Navigation
Use `gg` to jump to the top and `G` to jump to the bottom of large result sets. Press `j` 5 times or `5j` (if supported) to move down 5 rows quickly.
:::

## Export Results

Export query results to JSON or CSV format.

### Export as JSON

```json
[
  {
    "Id": "001xx000003DH1QAAW",
    "Name": "John Doe",
    "Email": "john@example.com"
  },
  {
    "Id": "001xx000003DH1RBAW",
    "Name": "Jane Smith",
    "Email": "jane@example.com"
  }
]
```

**Steps:**
1. Execute a query
2. Click "Export as JSON" button
3. File downloads to `Downloads/salesforce-query-results.json`

**Use Cases:**
- Import into other tools
- Backup data
- Share with developers
- Parse programmatically

### Export as CSV

```csv
Id,Name,Email
001xx000003DH1QAAW,John Doe,john@example.com
001xx000003DH1RBAW,Jane Smith,jane@example.com
```

**Steps:**
1. Execute a query
2. Click "Export as CSV" button
3. File downloads to `Downloads/salesforce-query-results.csv`

**Use Cases:**
- Open in Excel or Google Sheets
- Data analysis
- Import into databases
- Share with non-technical users

::: info Export Limits
Exports include all returned records up to the SOQL LIMIT. If you query 2,000 records with `LIMIT 2000`, all 2,000 are exported. Salesforce's standard SOQL limits apply.
:::

## Query History

Access previously executed queries with command history.

**How It Works:**
- Every executed query is saved
- History persists across sessions
- Navigate with `↑`/`↓` arrow keys
- Select a query to reload it

**Using Query History:**

1. Focus the query editor
2. Press `↑` arrow key
3. Previous query appears
4. Press `↑` again for earlier queries
5. Press `↓` to go forward through history
6. Press `Enter` to execute the selected query

**Example:**

```
Current: (empty)
Press ↑ → SELECT Id, Name FROM Account LIMIT 10
Press ↑ → SELECT Id, Email FROM Contact WHERE LastName = 'Doe'
Press ↑ → SELECT COUNT() FROM Opportunity WHERE StageName = 'Closed Won'
Press ↓ → SELECT Id, Email FROM Contact WHERE LastName = 'Doe'
```

**History Limit:**
- Stores last 50 queries
- Oldest queries removed automatically
- Stored in browser local storage

## Query Templates

Save frequently used queries as templates for quick access.

### Create Template

```sql
-- Template: Active Opportunities
SELECT Id, Name, Amount, StageName, CloseDate
FROM Opportunity
WHERE IsClosed = false
ORDER BY Amount DESC
LIMIT 50
```

**Steps:**
1. Write and test your query
2. Click "Save as Template" button
3. Enter template name (e.g., "Active Opportunities")
4. Template saved to templates list

### Use Template

**Steps:**
1. Click "Templates" dropdown
2. Select template name
3. Query appears in editor
4. Modify if needed
5. Execute with `Ctrl+Enter`

**Example Templates:**

```
Common Templates:
  - Active Opportunities
  - Contacts Without Accounts
  - Recently Modified Accounts
  - Users by Profile
  - Failed Opportunities This Quarter
```

### Manage Templates

**Edit Template:**
1. Load template from dropdown
2. Modify query
3. Click "Save as Template" with same name
4. Confirm overwrite

**Delete Template:**
1. Click "Manage Templates" button
2. Select template to delete
3. Click delete icon
4. Confirm deletion

::: tip Template Organization
Use descriptive names like "High-Value-Accounts-Last-Month" instead of "Query1". Good naming makes templates easy to find and reuse.
:::

## Variables

Define variables for dynamic, reusable queries.

### Global Variables

Available across all queries in the same session.

**Define Global Variable:**

```sql
-- Set global variable
:let $accountName = 'Acme'

-- Use in query
SELECT Id, Name, AnnualRevenue
FROM Account
WHERE Name = $accountName
```

**Syntax:**
- `:let $variableName = value`
- Variable names start with `$`
- Values can be strings, numbers, or booleans

**Example:**

```sql
:let $minRevenue = 1000000
:let $type = 'Customer'

SELECT Id, Name, AnnualRevenue, Type
FROM Account
WHERE AnnualRevenue > $minRevenue
  AND Type = $type
```

### Local Variables

Scoped to a single query.

**Define Local Variable:**

```sql
-- Inline variable definition
WITH minRevenue = 500000

SELECT Id, Name, AnnualRevenue
FROM Account
WHERE AnnualRevenue > minRevenue
```

**Difference from Global:**
- Local variables don't persist across queries
- Defined with `WITH` clause
- No `$` prefix

### Built-in Variables

Pre-defined variables for common values:

| Variable | Value | Example |
|----------|-------|---------|
| `$TODAY` | Today's date | `2025-11-02` |
| `$TOMORROW` | Tomorrow's date | `2025-11-03` |
| `$YESTERDAY` | Yesterday's date | `2025-11-01` |
| `$THIS_WEEK` | Start of this week | Monday's date |
| `$THIS_MONTH` | Start of this month | `2025-11-01` |
| `$THIS_YEAR` | Start of this year | `2025-01-01` |
| `$USERID` | Current user's ID | `005xx000001AbCdEAK` |

**Example:**

```sql
SELECT Id, Name, CreatedDate
FROM Opportunity
WHERE CreatedDate = $TODAY
  AND OwnerId = $USERID
```

::: info Variable Substitution
Variables are substituted before query execution. The actual query sent to Salesforce contains the resolved values, not variable names.
:::

## Inline Editing

Edit query results directly and save changes back to Salesforce.

### Edit a Cell

**Steps:**
1. Navigate to a cell with `j`/`k`/`h`/`l`
2. Press `i` to enter edit mode
3. Modify the value
4. Press `Enter` to confirm
5. Press `Esc` to cancel

**Visual Indicator:**
- Editing cell has blue border
- Modified cells show orange border (unsaved)
- Saved cells return to normal

### Save Changes

**Single Record:**
```
1. Edit fields on a record
2. Press :w to save that record
3. Changes sent to Salesforce via REST API
4. Success/error message appears
```

**Multiple Records:**
```
1. Edit multiple records
2. Press :wall to save all modified records
3. Each record saved individually
4. Results shown in quickfix list
```

**Example Session:**

```sql
Query: SELECT Id, Name, Email FROM Contact LIMIT 5

Results:
Id                  Name         Email
003...QAAW         John Doe      john@old.com

1. Navigate to Email cell
2. Press i to edit
3. Change to john@new.com
4. Press Enter
5. Cell shows orange border (modified)
6. Press :w to save
7. Success message: "Contact updated"
```

### Field Validation

Inline editing respects field types:

- **Text** - Free-form input
- **Number** - Validates numeric values
- **Date** - Date picker appears
- **DateTime** - Date + time picker
- **Boolean** - Checkbox or true/false
- **Picklist** - Dropdown with valid values
- **Reference** - Must be valid Salesforce ID

**Error Handling:**

If save fails:
1. Error message appears in quickfix list
2. Cell remains orange (unsaved)
3. Fix the error
4. Retry save with `:w`

::: warning Validation Rules
Inline editing triggers the same validation rules as the standard UI. If a validation rule blocks the save, you'll see the error message in the quickfix list.
:::

## Quickfix List

The quickfix list displays errors, warnings, and save results.

**What Appears:**
- SOQL syntax errors
- Query execution errors
- Inline editing save results
- Validation rule failures
- Field-level security errors

**Example Errors:**

```
Quickfix List (3 errors):
1. Line 2: Unexpected token 'FORM'. Did you mean 'FROM'?
2. Contact 003...QAAW: Field 'Email' failed validation: Invalid email format
3. Account 001...RBAW: Insufficient access rights on field 'AnnualRevenue'
```

**Navigate Quickfix:**

| Key | Action |
|-----|--------|
| `j` | Move to next error |
| `k` | Move to previous error |
| `Enter` | Jump to error location (in query or results) |
| `:copen` | Open quickfix list |
| `:cclose` | Close quickfix list |

**Fix Workflow:**

```
1. Execute query with error
2. Error appears in quickfix list
3. Press Enter on error
4. Cursor jumps to error location
5. Fix the error
6. Re-execute query
7. Quickfix list clears if successful
```

## Advanced Query Features

### Subqueries

Query related records within the same query:

```sql
SELECT Id, Name,
  (SELECT Id, FirstName, LastName FROM Contacts)
FROM Account
WHERE Name = 'Acme'
```

### Aggregate Functions

Calculate totals, averages, counts:

```sql
SELECT COUNT(Id), AVG(Amount), MAX(Amount)
FROM Opportunity
WHERE StageName = 'Closed Won'
GROUP BY OwnerId
```

### Date Functions

Use SOQL date literals:

```sql
SELECT Id, Name, CreatedDate
FROM Account
WHERE CreatedDate = THIS_MONTH
   OR CreatedDate = LAST_N_DAYS:30
```

### Complex Filters

Combine multiple conditions:

```sql
SELECT Id, Name, Email
FROM Contact
WHERE (Account.Type = 'Customer' OR Account.Type = 'Partner')
  AND LeadSource IN ('Web', 'Email Campaign')
  AND CreatedDate > 2025-01-01T00:00:00Z
  AND Email != null
LIMIT 100
```

## Keyboard Shortcuts Reference

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+Q` | Open SOQL Query Tool |
| `Ctrl+Enter` | Execute query |
| `↑` / `↓` | Navigate query history (in editor) |
| `j` / `k` | Navigate results (in results panel) |
| `gg` / `G` | Jump to first/last result |
| `h` / `l` | Scroll results left/right |
| `i` | Edit selected cell |
| `Enter` | Confirm edit |
| `Esc` | Cancel edit or close tool |
| `:w` | Save edited record |
| `:wall` | Save all edited records |

## Common Use Cases

### Find All Contacts for an Account

```sql
SELECT Id, FirstName, LastName, Email, Phone
FROM Contact
WHERE AccountId = '001xx000003DH1QAAW'
ORDER BY LastName
```

### Recently Created Opportunities

```sql
SELECT Id, Name, Amount, StageName, CloseDate, Owner.Name
FROM Opportunity
WHERE CreatedDate = THIS_WEEK
ORDER BY CreatedDate DESC
```

### Users by Profile

```sql
SELECT Id, Username, Name, Email, Profile.Name, IsActive
FROM User
WHERE Profile.Name = 'System Administrator'
ORDER BY Name
```

### Count Records by Type

```sql
SELECT Type, COUNT(Id) recordCount
FROM Account
GROUP BY Type
ORDER BY recordCount DESC
```

### Find Duplicate Emails

```sql
SELECT Email, COUNT(Id) duplicateCount
FROM Contact
WHERE Email != null
GROUP BY Email
HAVING COUNT(Id) > 1
```

## Technical Details

### API Endpoint

Queries are executed via REST API:

```
POST /services/data/v61.0/query/
Authorization: Bearer {sessionId}
Content-Type: application/json

{
  "query": "SELECT Id, Name FROM Account LIMIT 10"
}
```

### Query Limits

Standard Salesforce SOQL limits apply:

- **Max records**: 2,000 per query (use QueryMore for pagination)
- **Max query length**: 20,000 characters
- **Max subqueries**: 55
- **Timeout**: 120 seconds

### Caching

- Query results are not cached
- Each execution makes a new API call
- Templates and history stored in local storage

### Performance

- Simple queries: ~100-300ms
- Complex queries with joins: ~500-1000ms
- Large result sets (2,000 records): ~1-2 seconds

::: info QueryMore Support
For queries returning more than 2,000 records, use the QueryMore endpoint or add pagination with OFFSET. Future versions may support automatic pagination.
:::

## Troubleshooting

### Query Syntax Error

**Symptom:** Error in quickfix list
**Solution:**
1. Check SOQL syntax (SELECT, FROM, WHERE order)
2. Verify field names (case-sensitive)
3. Ensure object API name is correct
4. Use autocomplete to avoid typos

### No Results Returned

**Symptom:** "0 records found"
**Solution:**
1. Remove WHERE clause to see all records
2. Check filter conditions
3. Verify data exists in org
4. Check field-level security permissions

### Can't Edit Results

**Symptom:** Edit mode doesn't activate
**Solution:**
1. Ensure you're in results panel (not query editor)
2. Press `i` on an editable field
3. Check if field is read-only (Id, formulas)
4. Verify edit permissions on object

### Save Fails

**Symptom:** Error in quickfix list after `:w`
**Solution:**
1. Read error message carefully
2. Check validation rules
3. Verify required fields are populated
4. Ensure field-level security allows edits

### Autocomplete Not Working

**Symptom:** No suggestions appear
**Solution:**
1. Ensure you're typing in query editor
2. Check context (after FROM for objects, after SELECT for fields)
3. Wait 300ms for autocomplete to trigger
4. Press `Ctrl+Space` to manually trigger

## Next Steps

- **[Navigator Panel](/features/navigator)** - Quick metadata search
- **[Record Editor](/features/record-editor)** - Edit records with vim keybindings
- **[Inspector Panel](/features/inspector)** - View org and object metadata
- **[Keyboard Shortcuts](/reference/keyboard-shortcuts)** - Complete reference

::: tip Learn SOQL
New to SOQL? Check out [Salesforce's SOQL documentation](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/) for a comprehensive guide to query syntax and functions.
:::
