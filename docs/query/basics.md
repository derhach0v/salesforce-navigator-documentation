# SOQL Query Basics

Master the fundamentals of writing and executing SOQL queries with Salesforce Navigator's Query Tool. Learn basic syntax, autocomplete features, query execution, and common patterns.

## Getting Started

The SOQL Query Tool provides a dedicated environment for writing, executing, and managing SOQL queries with intelligent autocomplete and syntax highlighting.

### Opening the Query Tool

**Method 1: Keyboard Shortcut**
```
Press Ctrl+Shift+Q from any Salesforce page
```

**Method 2: Navigator Panel**
```
1. Press Ctrl+Shift+M
2. Type "query"
3. Press Enter
```

The Query Tool opens in a new browser tab with:
- Query editor at the top
- Results panel below
- Command palette at the bottom (press `:`)

::: tip First Query
Try executing this simple query to get started:
```sql
SELECT Id, Name FROM Account LIMIT 5
```
Press `Ctrl+Enter` to execute.
:::

## Query Structure

SOQL (Salesforce Object Query Language) uses a SQL-like syntax optimized for Salesforce data.

### Basic Query Anatomy

```sql
SELECT Field1, Field2, Field3
FROM ObjectName
WHERE FilterCondition
ORDER BY SortField
LIMIT MaxRecords
```

**Components:**

| Clause | Required | Purpose | Example |
|--------|----------|---------|---------|
| `SELECT` | Yes | Fields to retrieve | `Id, Name, Email` |
| `FROM` | Yes | Object to query | `Contact`, `Account` |
| `WHERE` | No | Filter criteria | `CreatedDate = TODAY` |
| `ORDER BY` | No | Sort results | `Name ASC`, `Amount DESC` |
| `LIMIT` | No | Max records | `10`, `100`, `2000` |

### Simple Query Examples

**Query all fields for one object:**
```sql
SELECT Id, Name, Email, Phone
FROM Contact
LIMIT 10
```

**Query with filter:**
```sql
SELECT Id, Name, Type
FROM Account
WHERE Type = 'Customer'
```

**Query with sorting:**
```sql
SELECT Id, Name, Amount, CloseDate
FROM Opportunity
ORDER BY Amount DESC
LIMIT 20
```

## Autocomplete Features

The Query Tool provides intelligent autocomplete as you type, making it easy to write correct SOQL without memorizing field names.

### SOQL Keywords

Type the first few letters of a keyword to see suggestions:

```sql
Type: SEL
Suggests:
  ├─ SELECT
  └─ SELECT COUNT()

Type: WH
Suggests:
  ├─ WHERE
  └─ WHEN
```

**Common Keywords:**
- `SELECT`, `FROM`, `WHERE`
- `ORDER BY`, `GROUP BY`, `HAVING`
- `LIMIT`, `OFFSET`
- `AND`, `OR`, `NOT`
- `IN`, `NOT IN`, `LIKE`
- `TODAY`, `YESTERDAY`, `THIS_MONTH`

### Object Names

After typing `FROM`, autocomplete suggests objects:

```sql
SELECT Id, Name
FROM Acc
     └─ Suggests: Account, AccountContactRelation, AccountHistory
```

**Features:**
- All standard objects (Account, Contact, Lead, etc.)
- All custom objects (ending with `__c`)
- Platform objects (User, Profile, PermissionSet)
- Fuzzy matching (type "opp" → finds "Opportunity")

### Field Names

After `SELECT` or in `WHERE` clauses, autocomplete suggests fields:

```sql
SELECT Na
       └─ Suggests: Name, NamePrefix, NameSuffix

SELECT Id, Email
FROM Contact
WHERE Last
      └─ Suggests: LastName, LastModifiedDate, LastModifiedById
```

**Context-Aware:**
- Suggestions based on selected object in `FROM` clause
- Shows field type (Text, Number, Date, Reference)
- Includes custom fields

### Relationship Fields

Access related object fields with dot notation:

```sql
SELECT Account.Name
              └─ Autocomplete after typing "."

Suggests:
  ├─ Account.Name
  ├─ Account.Type
  ├─ Account.Industry
  └─ Account.Owner.Name (nested relationship)
```

**Parent Relationships:**
```sql
SELECT Id, Name, Account.Name, Owner.Name
FROM Contact
```

**Child Relationships (Subqueries):**
```sql
SELECT Id, Name,
  (SELECT FirstName, LastName FROM Contacts)
FROM Account
```

### Using Autocomplete

**Keyboard Controls:**

| Key | Action |
|-----|--------|
| `Type` | Trigger autocomplete automatically |
| `↑` / `↓` | Navigate suggestions |
| `Enter` or `Tab` | Accept suggestion |
| `Esc` | Close autocomplete |
| `Ctrl+Space` | Manually trigger autocomplete |

**Workflow:**
```
1. Type "SEL" → SELECT appears
2. Press Tab → "SELECT " inserted
3. Type "Na" → Name, NamePrefix appear
4. Press ↓ to select Name
5. Press Enter → "Name" inserted
6. Type ", Em" → Email appears
7. Press Tab → "Email" inserted
```

::: info Autocomplete Tips
- Wait 300ms for autocomplete to appear
- Type at least 2 characters for best results
- Use Ctrl+Space if autocomplete doesn't trigger
- Fuzzy matching means "accname" finds "AccountName"
:::

## Syntax Highlighting

Queries are color-coded for readability:

```sql
SELECT Id, Name, CreatedDate
FROM Account
WHERE AnnualRevenue > 1000000
  AND Type = 'Customer'
ORDER BY Name
LIMIT 50
```

**Color Scheme:**

| Element | Color | Example |
|---------|-------|---------|
| Keywords | Blue | `SELECT`, `FROM`, `WHERE` |
| Strings | Green | `'Customer'`, `'Acme'` |
| Numbers | Purple | `1000000`, `50` |
| Fields | White | `Id`, `Name`, `CreatedDate` |
| Operators | Orange | `=`, `>`, `<`, `AND`, `OR` |
| Functions | Yellow | `COUNT()`, `MAX()`, `TODAY()` |

This visual coding helps you:
- Spot syntax errors quickly
- Distinguish between field names and values
- Understand query structure at a glance

## Executing Queries

Run queries to fetch data from Salesforce.

### Execution Methods

**Method 1: Keyboard Shortcut**
```
Press Ctrl+Enter anywhere in the query editor
```

**Method 2: Execute Button**
```
Click the "Execute" button below the query editor
```

**Method 3: Command Mode**
```
Press : (colon) to open command palette
Type: execute
Press Enter
```

### Execution Process

When you execute a query:

1. **Validation** - Query syntax is checked
2. **API Call** - Query sent to Salesforce REST API
3. **Response** - Results returned and displayed
4. **Metrics** - Record count and execution time shown

**Visual Feedback:**

```
Executing query... (loading spinner)
    ↓
50 records found (234ms)
    ↓
Results displayed in table below
```

### Reading Results

Results appear in a table format:

```
Query: SELECT Id, Name, Email FROM Contact LIMIT 5

Results (5 records, 234ms):
┌─────────────────────┬──────────────┬─────────────────────┐
│ Id                  │ Name         │ Email               │
├─────────────────────┼──────────────┼─────────────────────┤
│ 003xx000003DH1QAAW │ John Doe     │ john@example.com    │
│ 003xx000003DH1RBAW │ Jane Smith   │ jane@example.com    │
│ 003xx000003DH1RCAW │ Bob Johnson  │ bob@example.com     │
│ 003xx000003DH1RDAW │ Alice Brown  │ alice@example.com   │
│ 003xx000003DH1REAW │ Charlie Lee  │ charlie@example.com │
└─────────────────────┴──────────────┴─────────────────────┘

Use j/k to navigate rows
```

**Result Metadata:**
- **Record count** - Total records returned
- **Execution time** - Query performance in milliseconds
- **Column headers** - Field labels or API names
- **Scrollable** - Horizontal (many columns) and vertical (many rows)

### Understanding Execution Time

**Performance Indicators:**

| Time | Performance | Typical Cause |
|------|-------------|---------------|
| < 200ms | Excellent | Simple query, small dataset |
| 200-500ms | Good | Standard query with filters |
| 500-1000ms | Fair | Complex query or large dataset |
| > 1000ms | Slow | Multiple relationships or aggregations |

**Optimization Tips:**
- Use `WHERE` clauses to filter results
- Add `LIMIT` to reduce records returned
- Avoid querying all fields (use specific fields)
- Index fields used in `WHERE` clauses
- Minimize nested relationship queries

## Common SOQL Patterns

Learn these patterns to write effective queries quickly.

### Pattern 1: All Records with Limit

Get a sample of records:

```sql
SELECT Id, Name
FROM Contact
LIMIT 10
```

**When to Use:**
- Exploring object structure
- Testing queries
- Quick data checks

### Pattern 2: Filtered Records

Query specific records:

```sql
SELECT Id, Name, Email
FROM Contact
WHERE LastName = 'Smith'
```

**Common Filters:**
```sql
WHERE Email != null
WHERE CreatedDate = TODAY
WHERE Status = 'Active'
WHERE Amount > 1000
```

### Pattern 3: Sorted Results

Order records by field:

```sql
SELECT Id, Name, Amount
FROM Opportunity
ORDER BY Amount DESC
LIMIT 10
```

**Sorting Options:**
- `ASC` - Ascending (A-Z, 0-9, oldest-newest)
- `DESC` - Descending (Z-A, 9-0, newest-oldest)
- Multiple fields: `ORDER BY Name ASC, CreatedDate DESC`

### Pattern 4: Related Field Access

Query parent object fields:

```sql
SELECT Id, Name, Account.Name, Owner.Name
FROM Contact
WHERE Account.Type = 'Customer'
```

**Relationship Depth:**
- Up to 5 levels: `Account.Owner.Manager.Name`
- Mix standard and custom relationships

### Pattern 5: Date Filters

Query by date:

```sql
SELECT Id, Name, CreatedDate
FROM Account
WHERE CreatedDate = THIS_MONTH
```

**Date Literals:**
- `TODAY`, `YESTERDAY`, `TOMORROW`
- `THIS_WEEK`, `LAST_WEEK`, `NEXT_WEEK`
- `THIS_MONTH`, `LAST_MONTH`, `NEXT_MONTH`
- `THIS_YEAR`, `LAST_YEAR`, `NEXT_YEAR`
- `LAST_N_DAYS:30`, `NEXT_N_MONTHS:3`

### Pattern 6: Multiple Conditions

Combine filters with AND/OR:

```sql
SELECT Id, Name, Email, Phone
FROM Contact
WHERE (Account.Type = 'Customer' OR Account.Type = 'Partner')
  AND Email != null
  AND CreatedDate > 2025-01-01
```

**Logical Operators:**
- `AND` - Both conditions must be true
- `OR` - Either condition can be true
- `NOT` - Negates condition
- Use parentheses to group conditions

### Pattern 7: IN Clause

Match multiple values:

```sql
SELECT Id, Name, StageName
FROM Opportunity
WHERE StageName IN ('Prospecting', 'Qualification', 'Closed Won')
```

**Variations:**
```sql
WHERE Id IN ('001xxx', '001yyy', '001zzz')
WHERE OwnerId IN (SELECT Id FROM User WHERE IsActive = true)
```

### Pattern 8: NULL Checks

Find records with/without values:

```sql
-- Records WITH a value
SELECT Id, Name, Email
FROM Contact
WHERE Email != null

-- Records WITHOUT a value
SELECT Id, Name, Phone
FROM Contact
WHERE Phone = null
```

### Pattern 9: LIKE Pattern Matching

Search for partial text matches:

```sql
SELECT Id, Name, Email
FROM Contact
WHERE Name LIKE '%John%'
```

**Wildcards:**
- `%` - Matches any characters
- `_` - Matches single character
- `'John%'` - Starts with "John"
- `'%Smith'` - Ends with "Smith"
- `'%manager%'` - Contains "manager"

### Pattern 10: Counting Records

Get record counts:

```sql
SELECT COUNT()
FROM Account
WHERE Type = 'Customer'
```

**Aggregate Functions:**
```sql
SELECT COUNT(Id), MAX(Amount), AVG(Amount)
FROM Opportunity
WHERE StageName = 'Closed Won'
```

## Query Validation

The Query Tool validates syntax before execution.

### Common Syntax Errors

**Missing FROM clause:**
```sql
SELECT Id, Name
❌ Missing FROM

Fix:
SELECT Id, Name
FROM Account
```

**Invalid field name:**
```sql
SELECT Id, Nme FROM Account
            ❌ Field doesn't exist

Fix:
SELECT Id, Name FROM Account
```

**Missing quotes on strings:**
```sql
WHERE Name = John
           ❌ String values need quotes

Fix:
WHERE Name = 'John'
```

**Invalid operator:**
```sql
WHERE Amount => 1000
             ❌ Not a valid operator

Fix:
WHERE Amount >= 1000
```

### Validation Feedback

Errors appear in the quickfix list:

```
Quickfix List (1 error):
1. Line 2: Unexpected token 'FORM'. Did you mean 'FROM'?
```

**Fix Process:**
1. Error appears with line number
2. Press Enter on error to jump to location
3. Fix the syntax
4. Re-execute query
5. Quickfix list clears on success

## Query Best Practices

### Use Specific Fields

**Bad:**
```sql
SELECT Name FROM Account  -- Only gets Name
```

**Good:**
```sql
SELECT Id, Name, Type, Industry, AnnualRevenue
FROM Account  -- Gets all needed fields
```

### Always Use LIMIT

**Bad:**
```sql
SELECT Id, Name FROM Account  -- Returns ALL records (could be millions)
```

**Good:**
```sql
SELECT Id, Name FROM Account LIMIT 100  -- Returns max 100 records
```

**LIMIT Guidelines:**
- Development: `LIMIT 10-50`
- Testing: `LIMIT 100-500`
- Production: `LIMIT 2000` (SOQL max)

### Filter Before Sorting

**Slow:**
```sql
SELECT Id, Name FROM Account
ORDER BY Name  -- Sorts all records first
WHERE Type = 'Customer'  -- Then filters
```

**Fast:**
```sql
SELECT Id, Name FROM Account
WHERE Type = 'Customer'  -- Filters first (smaller dataset)
ORDER BY Name  -- Then sorts
```

### Use Indexed Fields in WHERE

**Slower:**
```sql
WHERE Description LIKE '%keyword%'  -- Not indexed
```

**Faster:**
```sql
WHERE Status = 'Active'  -- Indexed field
  AND Description LIKE '%keyword%'
```

**Common Indexed Fields:**
- `Id`, `Name`, `OwnerId`
- `CreatedDate`, `LastModifiedDate`
- `RecordTypeId`
- Custom fields marked as External ID

## Next Steps

Now that you understand query basics, explore advanced features:

- **[Query Results](/query/results)** - Navigate and edit results with vim keys
- **[Variables](/query/variables)** - Use variables for dynamic queries
- **[Export](/query/export)** - Export results as JSON or CSV
- **[Common Queries](/examples/queries)** - Real-world query examples

::: tip Practice Makes Perfect
Try writing 5-10 simple queries to get comfortable with autocomplete and syntax highlighting. Start with objects you know (Account, Contact) and gradually add WHERE clauses and relationships.
:::
