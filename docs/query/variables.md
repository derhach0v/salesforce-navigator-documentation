# Query Variables

Learn to use variables for dynamic, reusable SOQL queries. Master global variables (^), local variables (:), and built-in variables to create flexible query templates.

## Variable Types

Salesforce Navigator supports three types of variables for queries:

| Type | Prefix | Scope | Persistence | Example |
|------|--------|-------|-------------|---------|
| **Global** | `^` | All queries | Saved to storage | `^accountName` |
| **Local** | `:` | Current query | Session only | `:minRevenue` |
| **Built-in** | `$` | All queries | System-defined | `$TODAY` |

### Global Variables

Global variables are saved to Chrome storage and persist across sessions.

**Characteristics:**
- Prefix: `^` (caret symbol)
- Stored permanently until deleted
- Available in all queries
- Shared across query tabs
- Survives browser restart

**When to Use:**
- Frequently used values (account names, user IDs)
- Org-specific constants (time zones, default owners)
- Configuration values (limits, thresholds)

### Local Variables

Local variables exist only for the current query session.

**Characteristics:**
- Prefix: `:` (colon symbol)
- Cleared when query tab closes
- Not saved to storage
- Isolated per query tab

**When to Use:**
- One-time query filters
- Temporary test values
- Ad-hoc parameter passing
- Exploratory queries

### Built-in Variables

Built-in system variables provided by Salesforce Navigator.

**Characteristics:**
- Prefix: `$` (dollar sign)
- Pre-defined by system
- Cannot be modified
- Automatically updated (dates)

**Available Built-ins:**
- Date/time variables
- Current user information
- Org information

## Defining Variables

Set variable values using the `:let` command.

### Global Variable Definition

**Syntax:**
```
:let ^variableName = value
```

**Examples:**

```sql
-- String value
:let ^accountName = 'Acme Corporation'

-- Number value
:let ^minRevenue = 1000000

-- Date value
:let ^startDate = 2025-01-01

-- Boolean value
:let ^isActive = true
```

**Setting Multiple Variables:**

```sql
:let ^accountType = 'Customer'
:let ^industry = 'Technology'
:let ^minEmployees = 100
```

### Local Variable Definition

**Syntax:**
```
:let :variableName = value
```

**Examples:**

```sql
-- Local string
:let :searchTerm = 'sales'

-- Local number
:let :tempLimit = 50

-- Local date
:let :queryDate = 2025-11-02
```

### Variable Assignment Rules

**Naming:**
- Must start with letter
- Can contain letters, numbers, underscores
- Case-sensitive (`^Name` ≠ `^name`)
- No spaces allowed

**Valid Names:**
```
^accountName ✓
^min_revenue ✓
^account123 ✓
```

**Invalid Names:**
```
^123account ✗ (starts with number)
^account name ✗ (contains space)
^account-name ✗ (contains hyphen)
```

**Value Types:**

| Type | Example | Notes |
|------|---------|-------|
| String | `'Acme Corp'` | Must use single quotes |
| Number | `1000000` | No quotes |
| Date | `2025-01-01` | ISO format |
| Boolean | `true` or `false` | Lowercase, no quotes |

## Using Variables in Queries

Reference variables in SOQL queries with their prefix.

### Basic Variable Usage

**Example 1: String Variable**

```sql
-- Define variable
:let ^companyName = 'Acme Corporation'

-- Use in query
SELECT Id, Name, AnnualRevenue
FROM Account
WHERE Name = ^companyName
```

**Resolved Query:**
```sql
SELECT Id, Name, AnnualRevenue
FROM Account
WHERE Name = 'Acme Corporation'
```

**Example 2: Number Variable**

```sql
-- Define variable
:let ^minimumAmount = 50000

-- Use in query
SELECT Id, Name, Amount, StageName
FROM Opportunity
WHERE Amount > ^minimumAmount
```

**Resolved Query:**
```sql
SELECT Id, Name, Amount, StageName
FROM Opportunity
WHERE Amount > 50000
```

### Multiple Variables

Use several variables in one query:

```sql
-- Define variables
:let ^accountType = 'Customer'
:let ^minRevenue = 1000000
:let ^maxRecords = 100

-- Use in query
SELECT Id, Name, Type, AnnualRevenue
FROM Account
WHERE Type = ^accountType
  AND AnnualRevenue > ^minRevenue
LIMIT ^maxRecords
```

**Resolved Query:**
```sql
SELECT Id, Name, Type, AnnualRevenue
FROM Account
WHERE Type = 'Customer'
  AND AnnualRevenue > 1000000
LIMIT 100
```

### Variables in Different Clauses

Variables work in all SOQL clauses:

**WHERE Clause:**
```sql
WHERE OwnerId = ^userId
```

**LIMIT Clause:**
```sql
LIMIT ^maxResults
```

**ORDER BY Clause:**
```sql
ORDER BY ^sortField DESC
```

**OFFSET Clause:**
```sql
OFFSET ^skipCount
```

## Built-in Variables

Pre-defined variables for common use cases.

### Date Variables

Current date and time values:

| Variable | Value | Example |
|----------|-------|---------|
| `$TODAY` | Today's date | `2025-11-02` |
| `$TOMORROW` | Tomorrow's date | `2025-11-03` |
| `$YESTERDAY` | Yesterday's date | `2025-11-01` |
| `$THIS_WEEK` | Start of current week | Monday's date |
| `$THIS_MONTH` | Start of current month | `2025-11-01` |
| `$THIS_YEAR` | Start of current year | `2025-01-01` |

**Example Usage:**

```sql
-- Records created today
SELECT Id, Name, CreatedDate
FROM Account
WHERE CreatedDate = $TODAY

-- Records created this month
SELECT Id, Name, CreatedDate
FROM Opportunity
WHERE CreatedDate >= $THIS_MONTH

-- Records created yesterday
SELECT Id, Subject, CreatedDate
FROM Case
WHERE CreatedDate = $YESTERDAY
```

### User Variables

Current user context:

| Variable | Value | Example |
|----------|-------|---------|
| `$USERID` | Current user's ID | `005xx000001AbCdEAK` |
| `$USERNAME` | Current user's username | `admin@company.com` |

**Example Usage:**

```sql
-- My opportunities
SELECT Id, Name, Amount, StageName
FROM Opportunity
WHERE OwnerId = $USERID

-- Records I created
SELECT Id, Name, CreatedDate
FROM Account
WHERE CreatedById = $USERID
```

### Org Variables

Organization context (if supported):

| Variable | Value | Example |
|----------|-------|---------|
| `$ORGID` | Organization ID | `00D5g000001AbCdEAK` |

**Example Usage:**

```sql
-- Verify org context
SELECT Id FROM Account WHERE /* org = */ $ORGID LIMIT 1
```

::: info Variable Resolution
Variables are resolved before query execution. The actual query sent to Salesforce contains the substituted values, not variable names.
:::

## Autocomplete for Variables

The Query Tool provides autocomplete for defined variables.

### Triggering Variable Autocomplete

**Type the prefix:**
```
Type: ^
Autocomplete shows all global variables

Type: :
Autocomplete shows all local variables

Type: $
Autocomplete shows all built-in variables
```

**Example:**

```sql
SELECT Id, Name FROM Account WHERE Type = ^
                                          └─ Autocomplete popup:
                                             ^accountType
                                             ^companyName
                                             ^industry
                                             ^minRevenue
```

### Autocomplete Features

**Navigation:**
- `↑` / `↓` - Navigate variable list
- `Enter` / `Tab` - Insert selected variable
- `Esc` - Close autocomplete

**Filtering:**
```
Type: ^acc
Shows: ^accountType, ^accountName (filtered to "acc")

Type: $TO
Shows: $TODAY, $TOMORROW (filtered to "TO")
```

**Variable Info:**
Hover over variable to see:
- Variable name
- Current value
- Type (string, number, date, boolean)
- Scope (global, local, built-in)

## Query Templates with Variables

Save reusable queries with variable placeholders.

### Creating Templates

**Step 1: Define Variables**

```sql
:let ^accountType = 'Customer'
:let ^minRevenue = 500000
```

**Step 2: Write Query with Variables**

```sql
SELECT Id, Name, Type, AnnualRevenue, Industry
FROM Account
WHERE Type = ^accountType
  AND AnnualRevenue > ^minRevenue
ORDER BY AnnualRevenue DESC
LIMIT 100
```

**Step 3: Save as Template**

```
:savequery High Value Accounts
```

**Template Saved:**
- Query text with variable references
- Variable definitions included
- Template name: "High Value Accounts"

### Using Templates

**Load Template:**

```
:loadquery High Value Accounts
```

**Modify Variables:**

```sql
-- Change variable values
:let ^accountType = 'Partner'
:let ^minRevenue = 1000000

-- Execute with new values
Ctrl+Enter
```

**Result:**
- Same query structure
- Different filter values
- Reusable across scenarios

### Template Examples

**Template 1: Recent Records by Object**

```sql
-- Variables
:let ^objectName = 'Account'
:let ^daysBack = 7

-- Query
SELECT Id, Name, CreatedDate
FROM ^objectName
WHERE CreatedDate = LAST_N_DAYS:^daysBack
ORDER BY CreatedDate DESC
```

**Template 2: User's Records**

```sql
-- Variables
:let ^recordType = 'Opportunity'
:let ^stage = 'Prospecting'

-- Query
SELECT Id, Name, StageName, Amount, CloseDate
FROM ^recordType
WHERE OwnerId = $USERID
  AND StageName = ^stage
ORDER BY CloseDate ASC
```

**Template 3: Filtered Export**

```sql
-- Variables
:let ^status = 'Active'
:let ^minDate = 2025-01-01
:let ^maxRecords = 2000

-- Query
SELECT Id, Name, Email, Phone, Status, CreatedDate
FROM Contact
WHERE Status = ^status
  AND CreatedDate >= ^minDate
LIMIT ^maxRecords
```

## Saving and Loading Templates

Manage query templates with commands.

### Saving Templates

**Command:**
```
:savequery [template name]
```

**Examples:**

```
:savequery Active Opportunities
:savequery High Value Customers
:savequery Last Week Cases
```

**What Gets Saved:**
- Query text (with variables)
- Global variable definitions
- Template metadata (name, created date)

### Loading Templates

**Command:**
```
:loadquery [template name]
```

**Workflow:**

```
1. Type :loadquery
2. Autocomplete shows saved templates
3. Select template from list
4. Query appears in editor
5. Variables are set automatically
6. Execute with Ctrl+Enter
```

**Example:**

```
:loadquery Active Opportunities
→ Query loaded:
  SELECT Id, Name, Amount, StageName
  FROM Opportunity
  WHERE IsClosed = false
    AND OwnerId = $USERID
  ORDER BY Amount DESC

Variables set:
  ^minAmount = 10000
  ^maxRecords = 50

Execute: Ctrl+Enter
```

### Managing Templates

**View All Templates:**
```
:loadquery
(Shows list of all saved templates)
```

**Delete Template:**
```
Currently not supported via command
Use :loadquery to see list, then manage via sidebar
```

**Rename Template:**
```
1. Load template
2. :savequery [new name]
3. Creates new template with new name
```

## Variables Sidebar

View and manage all variables in a dedicated panel.

### Opening Sidebar

**Command:**
```
:variables
or
:vars
```

**Sidebar Appears:**
- Right side of query tool
- Lists all global and local variables
- Shows variable values
- Allows editing and deletion

### Sidebar Layout

```
Variables
─────────────────────
Global (3):
  ^accountType = 'Customer'
  ^minRevenue = 1000000
  ^maxRecords = 100

Local (2):
  :tempStatus = 'Active'
  :queryDate = 2025-11-02

Built-in:
  $TODAY = 2025-11-02
  $USERID = 005xxx...
```

### Sidebar Actions

**Edit Variable:**
```
1. Click variable name
2. Popup appears with current value
3. Edit value
4. Press Enter to save
```

**Delete Variable:**
```
1. Click delete icon (X) next to variable
2. Confirm deletion
3. Variable removed
```

**Copy Variable:**
```
1. Click copy icon next to variable
2. Variable name copied to clipboard
3. Paste into query
```

### Keyboard Navigation

When sidebar has focus:

| Key | Action |
|-----|--------|
| `j` / `k` | Navigate variable list |
| `Enter` | Edit selected variable |
| `d` | Delete selected variable |
| `y` | Copy variable name |
| `Esc` | Close sidebar |

## Practical Examples

Real-world scenarios using variables.

### Example 1: Daily Report Query

**Setup:**

```sql
-- Global variables for report parameters
:let ^reportDate = 2025-11-02
:let ^teamId = '00Gxx000001AbCd'
:let ^minAmount = 25000
```

**Query:**

```sql
SELECT Id, Name, Amount, StageName, CloseDate, Owner.Name
FROM Opportunity
WHERE CloseDate = ^reportDate
  AND OwnerId IN (
    SELECT UserId FROM GroupMember WHERE GroupId = ^teamId
  )
  AND Amount > ^minAmount
ORDER BY Amount DESC
```

**Usage:**
- Update `^reportDate` daily
- Run same query structure
- Consistent report format

### Example 2: Multi-Org Query Template

**Setup:**

```sql
-- Org-specific variables
:let ^productionAccountPrefix = '001'
:let ^sandboxAccountPrefix = '006'
:let ^currentPrefix = ^productionAccountPrefix
```

**Query:**

```sql
SELECT Id, Name, Type, Industry
FROM Account
WHERE Id LIKE ^currentPrefix + '%'
LIMIT 100
```

**Usage:**
- Switch between orgs by changing `^currentPrefix`
- Same query for production and sandbox
- Easy org comparison

### Example 3: Parameterized Search

**Setup:**

```sql
-- Search parameters
:let :searchField = 'Name'
:let :searchValue = '%Acme%'
:let :resultLimit = 50
```

**Query:**

```sql
-- Note: Dynamic field names in WHERE not directly supported
-- Use templates for different field searches

-- Template 1: Name search
SELECT Id, Name, Email, Phone
FROM Contact
WHERE Name LIKE :searchValue
LIMIT :resultLimit

-- Template 2: Email search
SELECT Id, Name, Email, Phone
FROM Contact
WHERE Email LIKE :searchValue
LIMIT :resultLimit
```

**Usage:**
- Update `:searchValue` for different searches
- Reuse same template structure
- Adjust `:resultLimit` as needed

### Example 4: Date Range Query

**Setup:**

```sql
-- Date range variables
:let ^startDate = 2025-01-01
:let ^endDate = 2025-12-31
```

**Query:**

```sql
SELECT Id, CaseNumber, Subject, Status, CreatedDate
FROM Case
WHERE CreatedDate >= ^startDate
  AND CreatedDate <= ^endDate
ORDER BY CreatedDate DESC
```

**Usage:**
- Change date range without rewriting query
- Year-over-year comparisons
- Quarterly reports

### Example 5: User Context Query

**Setup:**

```sql
-- No variables needed (uses built-in)
```

**Query:**

```sql
-- My open opportunities
SELECT Id, Name, Amount, StageName, CloseDate
FROM Opportunity
WHERE OwnerId = $USERID
  AND IsClosed = false
ORDER BY CloseDate ASC

-- Cases I created today
SELECT Id, CaseNumber, Subject, Status
FROM Case
WHERE CreatedById = $USERID
  AND CreatedDate = $TODAY
```

**Usage:**
- Automatically filters to current user
- No hardcoded IDs
- Works for any user

## Best Practices

### Use Meaningful Names

**Bad:**
```sql
:let ^v1 = 'Customer'
:let ^v2 = 1000000
```

**Good:**
```sql
:let ^accountType = 'Customer'
:let ^minimumRevenue = 1000000
```

### Global vs Local Decision

**Use Global When:**
- Value reused across multiple queries
- Value rarely changes
- Need persistence across sessions

**Use Local When:**
- One-time test value
- Query-specific parameter
- Exploratory data analysis

### Document Complex Variables

Add comments above variable definitions:

```sql
-- Account type for customer analysis
:let ^accountType = 'Customer'

-- Minimum revenue threshold (in USD)
:let ^minimumRevenue = 1000000

-- Date range for quarterly report
:let ^startDate = 2025-07-01
:let ^endDate = 2025-09-30
```

### Validate Variable Values

Before executing, verify variable values:

```
:vars  → Open sidebar
Check values are correct
Execute query
```

## Troubleshooting

### Variable Not Found

**Error:**
```
Variable ^accountName is not defined
```

**Solution:**
```
1. Type :vars to see all variables
2. Check spelling (case-sensitive)
3. Define variable: :let ^accountName = 'Acme'
4. Re-execute query
```

### Wrong Variable Type

**Error:**
```
Expected number, got string: ^minimumRevenue = 'abc'
```

**Solution:**
```
:let ^minimumRevenue = 1000000  (remove quotes)
```

### Variable Not Substituting

**Symptom:**
Variable name appears in error message instead of value

**Solution:**
```
1. Ensure variable has correct prefix (^, :, $)
2. Verify variable is defined (:vars)
3. Check for typos in variable name
```

### Autocomplete Not Showing Variables

**Solution:**
```
1. Type the full prefix (^, :, or $)
2. Wait 300ms for autocomplete
3. Press Ctrl+Space to force trigger
4. Ensure variables are defined (:vars)
```

## Keyboard Shortcuts Reference

| Shortcut | Action |
|----------|--------|
| `:let ^var = value` | Define global variable |
| `:let :var = value` | Define local variable |
| `:vars` | Open variables sidebar |
| `:savequery [name]` | Save query template |
| `:loadquery [name]` | Load query template |
| `^` + type | Autocomplete global variables |
| `:` + type | Autocomplete local variables |
| `$` + type | Autocomplete built-in variables |

## Next Steps

- **[Query Basics](/query/basics)** - Learn SOQL fundamentals
- **[Query Results](/query/results)** - Navigate and edit results
- **[Export](/query/export)** - Export query results
- **[Common Queries](/examples/queries)** - Query examples with variables

::: tip Power User Technique
Create global variables for your most common query parameters (your user ID, team ID, favorite date ranges). Then build a library of templates using these variables. You'll write queries 10x faster.
:::
