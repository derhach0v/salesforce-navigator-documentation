# Exporting Query Results

Export query results to JSON or CSV formats for analysis, reporting, and data integration. Learn how to copy results, share queries, and leverage query history.

## Export Formats

Salesforce Navigator supports two export formats optimized for different use cases.

### JSON Format

JavaScript Object Notation - ideal for programmatic access and API integration.

**Characteristics:**
- Preserves data types (strings, numbers, booleans, null)
- Maintains nested structure (related objects)
- Machine-readable
- Compact file size

**Best For:**
- API integrations
- Import into other systems
- Developer workflows
- Preserving data structure

**Example Output:**

```json
[
  {
    "Id": "001xx000003DH1QAAW",
    "Name": "Acme Corporation",
    "Type": "Customer",
    "AnnualRevenue": 5000000,
    "Industry": "Technology",
    "Phone": "555-1234",
    "CreatedDate": "2025-01-15T10:30:00.000Z"
  },
  {
    "Id": "001xx000003DH1RBAW",
    "Name": "Global Industries",
    "Type": "Partner",
    "AnnualRevenue": 12000000,
    "Industry": "Manufacturing",
    "Phone": "555-5678",
    "CreatedDate": "2025-02-20T14:45:00.000Z"
  }
]
```

### CSV Format

Comma-Separated Values - ideal for spreadsheets and data analysis.

**Characteristics:**
- Flat structure (no nesting)
- Readable in Excel, Google Sheets, Numbers
- Human-readable
- Universal compatibility

**Best For:**
- Spreadsheet analysis
- Data visualization
- Sharing with non-technical users
- Business reports

**Example Output:**

```csv
Id,Name,Type,AnnualRevenue,Industry,Phone,CreatedDate
001xx000003DH1QAAW,Acme Corporation,Customer,5000000,Technology,555-1234,2025-01-15T10:30:00.000Z
001xx000003DH1RBAW,Global Industries,Partner,12000000,Manufacturing,555-5678,2025-02-20T14:45:00.000Z
```

## Exporting as JSON

Export query results in JSON format.

### Export Method

**Command:**
```
:exportjson
```

**Steps:**
1. Execute a query (`Ctrl+Enter`)
2. Wait for results to load
3. Type `:exportjson`
4. Press `Enter`
5. File downloads to `Downloads/salesforce-query-results.json`

**Button Method:**
```
1. Execute query
2. Click "Export as JSON" button below results
3. File downloads automatically
```

### JSON Structure

**Flat Query:**

```json
[
  {
    "Id": "003xx000003DH1QAAW",
    "FirstName": "John",
    "LastName": "Doe",
    "Email": "john@example.com",
    "Phone": "555-1234"
  }
]
```

**Query with Relationships:**

```json
[
  {
    "Id": "003xx000003DH1QAAW",
    "FirstName": "John",
    "LastName": "Doe",
    "Account": {
      "Id": "001xx000003DH1QAAW",
      "Name": "Acme Corporation"
    }
  }
]
```

**Query with Child Relationships:**

```json
[
  {
    "Id": "001xx000003DH1QAAW",
    "Name": "Acme Corporation",
    "Contacts": {
      "records": [
        {
          "Id": "003xx000003DH1QAAW",
          "FirstName": "John",
          "LastName": "Doe"
        },
        {
          "Id": "003xx000003DH1RBAW",
          "FirstName": "Jane",
          "LastName": "Smith"
        }
      ]
    }
  }
]
```

### JSON Features

**Data Type Preservation:**

```json
{
  "Id": "001xxx",               // String
  "Name": "Acme",              // String
  "AnnualRevenue": 1000000,    // Number
  "IsActive": true,            // Boolean
  "Description": null,         // Null
  "CreatedDate": "2025-01-15T10:30:00.000Z"  // ISO Date String
}
```

**Null Handling:**
- Missing values exported as `null`
- Empty strings exported as `""`
- Zero values exported as `0`

**Special Characters:**
- Escaped properly (`"`, `\`, newlines)
- UTF-8 encoding for international characters
- Preserves whitespace

### Using Exported JSON

**Import into JavaScript:**

```javascript
const data = require('./salesforce-query-results.json');
console.log(data[0].Name); // "Acme Corporation"
```

**Parse in Python:**

```python
import json

with open('salesforce-query-results.json', 'r') as f:
    data = json.load(f)

for record in data:
    print(record['Name'])
```

**Load in Node.js:**

```javascript
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('salesforce-query-results.json', 'utf8'));
```

## Exporting as CSV

Export query results in CSV format for spreadsheet applications.

### Export Method

**Command:**
```
:exportcsv
```

**Steps:**
1. Execute a query (`Ctrl+Enter`)
2. Wait for results to load
3. Type `:exportcsv`
4. Press `Enter`
5. File downloads to `Downloads/salesforce-query-results.csv`

**Button Method:**
```
1. Execute query
2. Click "Export as CSV" button below results
3. File downloads automatically
```

### CSV Structure

**Header Row:**
```csv
Id,Name,Email,Phone,CreatedDate
```
- First row contains field names
- Comma-separated
- No spaces around commas

**Data Rows:**
```csv
003xx000003DH1QAAW,John Doe,john@example.com,555-1234,2025-01-15T10:30:00.000Z
003xx000003DH1RBAW,Jane Smith,jane@example.com,555-5678,2025-02-20T14:45:00.000Z
```

**Handling Special Characters:**

| Character | Handling | Example |
|-----------|----------|---------|
| Comma `,` | Quoted field | `"Doe, John"` |
| Quote `"` | Escaped `""` | `"Say ""Hi"""` → Say "Hi" |
| Newline `\n` | Quoted field | `"Line 1\nLine 2"` |
| Leading/trailing spaces | Quoted field | `" Trimmed "` |

### CSV Features

**Flat Structure:**
- Parent relationships flattened:
  ```csv
  Id,Name,Account.Name,Account.Type
  003xxx,John Doe,Acme Corp,Customer
  ```
- Child relationships omitted (use JSON for nested data)

**Data Type Handling:**

```csv
Id,Name,Amount,IsActive,CreatedDate
001xxx,Acme,1000000,true,2025-01-15T10:30:00.000Z
```
- All values treated as text
- No type information preserved
- Import tools infer types

**Empty Values:**
```csv
Id,Name,Email,Phone
003xxx,John Doe,,555-1234
       ↑ Empty email (no value between commas)
```

### Opening in Spreadsheet Apps

**Excel:**
1. Open Excel
2. File > Open
3. Select `salesforce-query-results.csv`
4. Data imports automatically

**Google Sheets:**
1. Open Google Sheets
2. File > Import
3. Upload `salesforce-query-results.csv`
4. Choose "Comma" as separator
5. Click "Import"

**Apple Numbers:**
1. Open Numbers
2. Drag and drop CSV file
3. Data imports automatically

### Using Exported CSV

**Filter and Sort:**
```
1. Open in Excel
2. Select data range
3. Data > Filter
4. Sort by any column
```

**Pivot Tables:**
```
1. Open in Excel
2. Select data
3. Insert > PivotTable
4. Analyze data
```

**Formulas:**
```excel
=SUMIF(Type,"Customer",AnnualRevenue)  // Sum revenue for customers
=COUNTIF(Industry,"Technology")        // Count tech companies
=AVERAGE(Amount)                       // Average opportunity amount
```

## Copying Query Results

Copy selected data to clipboard for quick sharing.

### Copying Entire Results

**Method:**
```
1. Execute query
2. Select all results (Ctrl+A in results area)
3. Copy (Ctrl+C)
4. Paste into document, email, or chat
```

**Format:**
- Tab-separated values
- Preserves rows and columns
- Pastes cleanly into Excel, Google Docs, Slack

**Example Copied Data:**

```
Id                  Name            Email
003xx000003DH1QAAW  John Doe        john@example.com
003xx000003DH1RBAW  Jane Smith      jane@example.com
```

### Copying Individual Cells

**Method:**
```
1. Navigate to cell with j/k/h/l
2. Press y (yank/copy)
3. Paste into query or document (Ctrl+V)
```

**What Gets Copied:**
- Raw cell value
- No formatting
- Suitable for reuse in queries

**Example:**

```
Cell: Email = "john@example.com"
Press y
Paste: john@example.com (no quotes)
```

### Copying Column Values

**Method:**
```
1. Click column header
2. Press Ctrl+C
3. Paste into document
```

**Format:**
```
john@example.com
jane@example.com
bob@example.com
alice@example.com
```
- One value per line
- No header
- Easy to paste into another tool

## Sharing Queries

Share queries with teammates for collaboration.

### Sharing Query Text

**Method 1: Copy from Editor**
```
1. Select query text in editor (Ctrl+A)
2. Copy (Ctrl+C)
3. Paste into email, Slack, documentation
```

**Method 2: Save as Template**
```
1. Write query
2. :savequery [Shared Query Name]
3. Share query name with team
4. Team members can :loadquery [Shared Query Name]
```

**Example Shared Query:**

```sql
-- Team Query: High Value Accounts
-- Purpose: Identify accounts with >$1M revenue for Q4 campaign
-- Owner: John Doe
-- Last Updated: 2025-11-02

SELECT Id, Name, Type, AnnualRevenue, Industry, Owner.Name
FROM Account
WHERE AnnualRevenue > 1000000
  AND Type = 'Customer'
ORDER BY AnnualRevenue DESC
LIMIT 100
```

### Sharing Query Results

**Method 1: Export and Share File**
```
1. Execute query
2. :exportcsv (or :exportjson)
3. Share file via email, Slack, Google Drive
```

**Method 2: Screenshot**
```
1. Execute query
2. Take screenshot of results (OS screenshot tool)
3. Share image
```

**Method 3: Copy and Paste**
```
1. Execute query
2. Select all results (Ctrl+A)
3. Copy (Ctrl+C)
4. Paste into shared document
```

### Query Documentation

Document queries for team reference:

**Template:**

```markdown
## Query: Active Opportunities by Stage

**Purpose:**
Weekly report of all open opportunities grouped by stage

**Query:**
```sql
SELECT Id, Name, Amount, StageName, CloseDate, Owner.Name
FROM Opportunity
WHERE IsClosed = false
ORDER BY StageName, Amount DESC
```

**Frequency:** Weekly (Mondays)

**Recipients:** Sales team

**Output:** CSV export to shared drive

**Notes:** Filter out opportunities < $5,000
```

## Query History and Reuse

Access and reuse previously executed queries.

### Accessing Query History

**Method 1: Arrow Keys**
```
1. Focus query editor
2. Press ↑ (up arrow)
3. Previous query appears
4. Press ↑ again for earlier queries
5. Press ↓ to go forward
```

**Method 2: History Command**
```
:history  → Shows list of recent queries
```

**History Display:**

```
Query History (last 50):

1. 2 minutes ago
   SELECT Id, Name FROM Account LIMIT 10

2. 5 minutes ago
   SELECT Id, Email FROM Contact WHERE LastName = 'Doe'

3. 10 minutes ago
   SELECT COUNT() FROM Opportunity WHERE StageName = 'Closed Won'

Navigate: j/k
Select: Enter
Close: Esc
```

### Reusing Queries

**Workflow:**

```
1. Type :history
2. Navigate to query with j/k
3. Press Enter
4. Query loads into editor
5. Modify if needed
6. Execute with Ctrl+Enter
```

**Quick Reuse:**
```
1. Press ↑ in query editor
2. Last query appears
3. Press Ctrl+Enter immediately to re-execute
```

### History Limits

**Capacity:**
- Stores last 50 queries
- Oldest queries removed automatically
- Persists across browser sessions

**Storage:**
- Saved to Chrome local storage
- Survives browser restart
- Cleared on extension uninstall

**Privacy:**
- History is per-browser profile
- Not shared across devices
- Not synced to cloud

### Modifying Historical Queries

**Process:**

```
1. Load query from history (↑ or :history)
2. Modify query text
   - Change fields
   - Update filters
   - Adjust LIMIT
3. Execute modified query
4. New query added to history
5. Original query remains in history
```

**Example:**

```
Original:
SELECT Id, Name FROM Account LIMIT 10

Modified:
SELECT Id, Name, Type, Industry FROM Account WHERE Type = 'Customer' LIMIT 50

Both stored in history
```

## Export Best Practices

### Choose the Right Format

**Use JSON When:**
- Integrating with APIs
- Preserving data types
- Working with nested data (relationships)
- Need programmatic access

**Use CSV When:**
- Analyzing in Excel or Google Sheets
- Creating reports for non-technical users
- Need human-readable format
- Working with flat data

### Filter Before Exporting

**Bad:**
```sql
SELECT Id, Name, Email, Phone, Address, Description, ...
FROM Contact  -- Exports all 50,000 records
```

**Good:**
```sql
SELECT Id, Name, Email, Phone
FROM Contact
WHERE CreatedDate = THIS_MONTH
  AND Email != null
LIMIT 1000  -- Exports relevant 1,000 records
```

**Benefits:**
- Smaller file size
- Faster export
- More manageable dataset
- Focused analysis

### Hide Unnecessary Columns

Before exporting, hide columns you don't need:

```
1. Execute query
2. Type :columns
3. Uncheck columns to hide
4. Press Esc
5. Export with :exportcsv or :exportjson
6. Only visible columns included
```

**Example:**

```
Query: SELECT Id, Name, Email, Phone, CreatedDate, LastModifiedDate, SystemModstamp FROM Contact

Hide: SystemModstamp, CreatedDate (not needed for report)

Export: Only Id, Name, Email, Phone, LastModifiedDate included
```

### Add Meaningful File Names

After export, rename file immediately:

**Default:**
```
salesforce-query-results.json
```

**Renamed:**
```
high-value-accounts-2025-11-02.json
active-contacts-q4-report.csv
opportunities-by-stage-november.csv
```

**Benefits:**
- Easy to find later
- Clear purpose
- Versioned (date included)

### Document Export Queries

Save query with export for reproducibility:

```
File: active-contacts-q4-report.csv

Query:
SELECT Id, Name, Email, Phone, Title, Account.Name
FROM Contact
WHERE IsActive = true
  AND CreatedDate >= 2025-10-01
ORDER BY Account.Name, LastName

Exported: 2025-11-02
Records: 1,250
```

## Troubleshooting

### Export Button Disabled

**Cause:** No query results loaded

**Solution:**
```
1. Execute a query first (Ctrl+Enter)
2. Wait for results to load
3. Export button becomes enabled
```

### File Not Downloading

**Cause:** Browser blocking download

**Solution:**
```
1. Check browser popup blocker
2. Allow downloads from extension
3. Check Downloads folder permissions
4. Try different browser
```

### CSV Opens Incorrectly in Excel

**Cause:** Excel not recognizing CSV format

**Solution:**
```
1. Open Excel first
2. File > Import > CSV
3. Choose "Comma" as delimiter
4. Select UTF-8 encoding
5. Import data
```

### JSON Parse Error

**Cause:** Invalid JSON syntax

**Solution:**
```
1. Open JSON in text editor (VS Code, Notepad++)
2. Use JSON validator (jsonlint.com)
3. Check for trailing commas, unclosed brackets
4. Re-export from query tool
```

### Large Export Slow

**Cause:** Too many records

**Solution:**
```
1. Add LIMIT clause (e.g., LIMIT 1000)
2. Filter with WHERE clause
3. Export in batches
4. Use smaller date ranges
```

## Keyboard Shortcuts Reference

| Shortcut | Action |
|----------|--------|
| `:exportjson` | Export results as JSON |
| `:exportcsv` | Export results as CSV |
| `:history` | View query history |
| `↑` / `↓` | Navigate query history |
| `y` | Copy cell value (yank) |
| `Ctrl+A` | Select all results |
| `Ctrl+C` | Copy selection |
| `:columns` | Show/hide columns before export |

## Next Steps

- **[Query Basics](/query/basics)** - Learn SOQL fundamentals
- **[Query Results](/query/results)** - Navigate and edit results
- **[Variables](/query/variables)** - Dynamic queries with variables
- **[Workflows](/examples/workflows)** - Real-world export workflows

::: tip Export Workflow
Develop a routine: Execute query → Hide unnecessary columns → Export → Rename file → Document query. This ensures clean, reproducible exports every time.
:::
