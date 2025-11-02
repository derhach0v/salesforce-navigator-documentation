# Power User Tips and Tricks

Master advanced techniques, discover hidden features, and learn productivity hacks to maximize your efficiency with Salesforce Navigator.

## Hidden Features

### Double-Press Commands

**Ctrl+K Twice for Different Actions:**

In Editor, press `Ctrl+K` once:
- On picklist field: Opens picklist selector
- On lookup field: Shows reference record details
- On modified field: Shows change history
- On any field: Shows field metadata

Press `Ctrl+K` twice (quickly):
- Opens advanced field inspection
- Shows API name, type, length, precision
- Displays all field properties

**Shift+K for Reference Details:**

On lookup/reference fields, `Shift+K` shows detailed record info:
```
Field: AccountId
Value: 001xx000003DH1QAAW

Referenced Record:
  Name: Acme Corporation
  Type: Customer
  Owner: John Doe
  Created: 2025-01-15
  Last Modified: 2025-10-20
```

### Quick Record ID Copy

In Editor:
```
:copy  → Copies current record ID
```

In Query results, on ID cell:
```
y  → Copies ID value
```

In Inspector (Objects tab):
```
y  → Copies object API name
```

### Filtered Search vs Regular Search

**Regular Search (`/`):**
- All fields visible
- Matches highlighted in green
- Great for exploring

**Filtered Search (`Ctrl+/`):**
- Only matching fields shown
- Faster navigation
- Great for focused editing

**Pro Tip:** Use `/` when learning field layout, `Ctrl+/` when you know what you want.

### Navigation Multipliers

Some implementations support count prefixes:
```
5j  → Move down 5 fields
10k → Move up 10 fields
3gg → Jump to field 3
```

If not supported, use gg/G for quick jumps:
```
gg → Jump to top
G  → Jump to bottom
Then j/k to fine-tune position
```

### Command History Search

In Query Tool:
```
Ctrl+R → Opens fuzzy command history search
Type to filter
Select with j/k
Enter to execute
```

### Yank and Paste Workflow

Copy field value and paste to multiple fields:
```
1. Navigate to field with source value
2. Press y (yank)
3. Navigate to target field (j/k)
4. Press p (paste)
5. Repeat steps 3-4 for other fields

Example: Copy email from one contact to another
1. Open first contact (Ctrl+Shift+E)
2. Navigate to Email field (/ or Ctrl+/)
3. Press y
4. Open second contact (Ctrl+Shift+E in new tab)
5. Navigate to Email field
6. Press p
7. Press :w to save
```

## Productivity Hacks

### Keyboard Mastery

**Stay in Normal Mode:**
- Spend 90% of time in Normal mode
- Only enter Insert mode to type
- Immediately Esc back to Normal
- This keeps hands on home row

**Home Row Navigation:**
- `j` `k` keep fingers on home row
- No reaching for arrow keys
- Faster, less RSI
- More ergonomic

**Command Chaining:**

Chain commands for efficiency:
```
ij → Enter Insert mode, move down (doesn't work in all implementations)

Better approach:
i [type] Esc j → Edit, exit, move down

Fastest for bulk edits:
i [type] Esc j i [type] Esc j i [type] Esc
```

### Template Library

**Build a Template Library:**

Save frequently used queries with descriptive names:
```
:savequery Active High Value Accounts
:savequery Contacts Without Email
:savequery Weekly Won Opportunities Report
:savequery Stale Open Cases
:savequery User Permission Audit
```

**Organize by Category:**
```
[Sales] High Value Opportunities
[Sales] Pipeline by Stage
[Service] Open Cases Today
[Service] Unassigned Cases
[Admin] User Audit
[Admin] Permission Set Assignments
[Data] Missing Emails
[Data] Duplicate Records
```

**Use Descriptive Names:**

Bad:
```
:savequery Query1
:savequery Report
:savequery Test
```

Good:
```
:savequery Q4-2025-Won-Deals-By-Rep
:savequery Contacts-Missing-Email-Customer-Accounts
:savequery Last-30-Days-Case-Volume-By-Priority
```

### Variable Strategies

**Global Variables for Constants:**

Set once, use everywhere:
```sql
:let ^myUserId = '005xx000001AbCd'
:let ^teamGroupId = '00Gxx000001XyZ'
:let ^productionAccountPrefix = '001'
:let ^minDealSize = 50000
:let ^fiscalYearStart = 2025-01-01
```

**Local Variables for One-Time Queries:**

Quick temporary filters:
```sql
:let :todayDate = 2025-11-02
:let :tempStatus = 'Open'
:let :testAccountId = '001xx000003DH1Q'
```

**Built-in Variables for Dynamic Queries:**

Use system variables for always-current data:
```sql
SELECT Id, Name FROM Opportunity
WHERE OwnerId = $USERID
  AND CloseDate >= $THIS_MONTH

-- Query works for any user, any month
-- No manual updates needed
```

### Split-Screen Workflows

**Side-by-Side Comparison:**

Compare two related records:
```
1. Query parent records (e.g., Accounts)
2. Open first account in editor (split-screen)
3. In left pane, navigate to second account
4. :editinsplitscreen
5. Now you have two accounts side-by-side
6. Compare fields, values, relationships
```

**Rapid Related Record Editing:**

Edit multiple child records without switching tabs:
```
1. Query parent with child IDs
2. For each child:
   - Navigate to child ID cell
   - :editinsplitscreen
   - Edit in right pane
   - Save (:w)
   - Back to left pane (Ctrl+H)
   - Navigate to next child
3. Repeat for all children
```

### Batch Operations

**Bulk Field Updates:**

Update same field across many records:
```
1. Query records
2. Navigate to field column
3. Edit first cell: i [value] Enter
4. Yank value: y
5. Navigate down, paste: j p
6. Repeat: j p j p j p...
7. Save all: :wall

Alternative (faster):
1-3. Same as above
4. Hold j key (continuous scroll)
5. Tap p at each record (paste while scrolling)
6. Save all: :wall
```

**Pattern-Based Editing:**

Use variables for pattern-based updates:
```
Query:
SELECT Id, Name, Email FROM Contact
WHERE Email = null

For each record:
1. Navigate to Email cell
2. Press i
3. Type: [firstname].[lastname]@company.com
   (based on Name field value)
4. Enter
5. j (next record)
6. Repeat
7. :wall
```

## Workflow Optimizations

### Morning Routine

**Open Your Dashboard:**

Create a "Daily Check" template:
```sql
-- My Daily Dashboard
-- Saved as: Daily-Dashboard

-- My open opportunities
SELECT Id, Name, Amount, StageName, CloseDate
FROM Opportunity
WHERE OwnerId = $USERID
  AND IsClosed = false
ORDER BY CloseDate ASC
LIMIT 20

-- Tasks due today
SELECT Id, Subject, Status, WhoId, Who.Name
FROM Task
WHERE OwnerId = $USERID
  AND ActivityDate = $TODAY
ORDER BY Priority ASC
```

**One-Command Workflow:**
```
1. Ctrl+Shift+Q (open Query Tool)
2. :loadquery Daily-Dashboard
3. Ctrl+Enter (execute)
4. Review results with j/k
5. Take action as needed
```

### End-of-Day Routine

**Daily Summary Export:**

Template for daily summary:
```sql
-- Daily Summary
:let ^todayDate = 2025-11-02

-- Activities completed today
SELECT Id, Subject, Status, WhoId, Who.Name, WhatId, What.Name
FROM Task
WHERE OwnerId = $USERID
  AND ActivityDate = ^todayDate
  AND Status = 'Completed'

-- Opportunities updated today
SELECT Id, Name, Amount, StageName, LastModifiedDate
FROM Opportunity
WHERE OwnerId = $USERID
  AND LastModifiedDate = ^todayDate

-- Export both, send to manager
:exportcsv
```

### Weekly Reporting

**Automated Weekly Report:**

Create template with relative dates:
```sql
-- Weekly Won Deals
SELECT Id, Name, Account.Name, Amount, CloseDate, Owner.Name, LeadSource
FROM Opportunity
WHERE StageName = 'Closed Won'
  AND CloseDate = THIS_WEEK
ORDER BY Amount DESC

-- Execute every Monday
-- Export as CSV
-- Email to sales team
```

**Batch Weekly Tasks:**

Query-based task management:
```sql
-- Find accounts needing weekly check-in
SELECT Id, Name, Owner.Name, LastActivityDate
FROM Account
WHERE Type = 'Customer'
  AND LastActivityDate < LAST_N_DAYS:7
ORDER BY LastActivityDate ASC
LIMIT 50

-- For each: Create task or log call
```

## Keyboard Mastery Drills

### Drill 1: Navigation Speed

**Goal:** Navigate 20 fields in < 5 seconds

Practice:
```
1. Open test record with 20+ fields
2. Start at top (gg)
3. Press j 20 times rapidly
4. Should reach field 20 in ~5 seconds
5. Try again, beat your time
```

Target: 2-3 seconds for 20 fields

### Drill 2: Edit Cycle

**Goal:** Edit, save, quit in < 3 seconds

Practice:
```
1. Ctrl+Shift+E (open editor)
2. i [type] Esc :wq (edit, save, quit)
3. Repeat 10 times
4. Aim for < 3 seconds each
```

Target: Muscle memory, no thinking

### Drill 3: Query Execution

**Goal:** Write and execute simple query in < 10 seconds

Practice:
```
1. Ctrl+Shift+Q (open query tool)
2. Type: SELECT Id, Name FROM Account LIMIT 10
3. Ctrl+Enter (execute)
4. Time yourself
```

Target: < 10 seconds from shortcut to results

### Drill 4: Search and Edit

**Goal:** Find field and edit in < 5 seconds

Practice:
```
1. Open editor on test record
2. Ctrl+/ (filtered search)
3. Type field name
4. Esc (focus field)
5. i [type] Esc (edit)
6. Time yourself
```

Target: < 5 seconds

## Common Patterns

### The "Quick Query" Pattern

**Use Case:** One-off data lookup

```
Ctrl+Shift+Q → Type query → Ctrl+Enter → Review → Ctrl+W (close tab)
Total time: 10-15 seconds
```

### The "Bulk Edit" Pattern

**Use Case:** Update multiple records

```
Query → Edit first → Yank → j p j p j p... → :wall
```

### The "Template + Export" Pattern

**Use Case:** Weekly report generation

```
:loadquery [template] → Update variables → Ctrl+Enter → :exportcsv → Rename file → Send
```

### The "Split-Screen Research" Pattern

**Use Case:** Investigate related records

```
Query parent → Navigate to child ID → :editinsplitscreen → Compare → Document findings
```

### The "Field Copy" Pattern

**Use Case:** Copy data between records

```
Open record 1 → Navigate to field → y → Open record 2 → Navigate to field → p → :w
```

## Pro Tips

### Tip 1: Learn One Feature Per Week

**Week 1:** Basic navigation (j, k, gg, G)
**Week 2:** Searching (/, Ctrl+/)
**Week 3:** Editing (i, u, :w, :wq)
**Week 4:** Query tool basics (Ctrl+Shift+Q, execute)
**Week 5:** Copy/paste (y, p)
**Week 6:** Variables and templates
**Week 7:** Split-screen editing
**Week 8:** Advanced query features

### Tip 2: Minimize Mouse Usage

**Challenge:** Use Navigator for 1 hour without touching mouse.

Forces you to:
- Learn keyboard shortcuts
- Build muscle memory
- Discover efficiency gains

Result: 2-3x faster workflow

### Tip 3: Create a Personal Cheat Sheet

**What to Include:**
- Your 10 most-used shortcuts
- Your template names (for quick recall)
- Your global variable names
- Common query patterns

**Keep it Visible:**
- Print and place near monitor
- Or use digital sticky note
- Review before each Navigator session

### Tip 4: Use Query Comments

**Document your queries:**

```sql
-- Purpose: Find high-value accounts for Q4 campaign
-- Owner: Jane Doe
-- Last Updated: 2025-11-02
-- Runs: Weekly on Mondays

SELECT Id, Name, AnnualRevenue, Owner.Name
FROM Account
WHERE AnnualRevenue > 5000000
  AND Type = 'Customer'
ORDER BY AnnualRevenue DESC
LIMIT 100
```

**Benefits:**
- Remember query purpose
- Share with teammates
- Audit query usage
- Track changes over time

### Tip 5: Leverage Autocomplete

**Don't Type, Select:**

Instead of typing full field names:
```
Type: SEL → Tab → Na → Tab → Em → Tab
Result: SELECT Name, Email
```

Faster than typing `SELECT Name, Email`

**Benefits:**
- Fewer typos
- Faster query writing
- Learn field names
- Discover new fields

### Tip 6: Master Command Mode

**Memorize These Commands:**

**Essential:**
- `:w` - Save
- `:q` - Quit
- `:wq` - Save and quit

**Useful:**
- `:refresh` - Reload data
- `:togglereadonly` - Hide formulas
- `:copy` - Copy record ID

**Advanced:**
- `:editinsplitscreen` - Split-screen edit
- `:exportcsv` - Export results
- `:columns` - Show/hide columns

**Pro:**
- `:let ^var = value` - Set global variable
- `:savequery [name]` - Save template
- `:wall` - Save all modified records

### Tip 7: Understand Modes

**Blue = Navigate**
- Use j, k, gg, G
- Ready to move

**Dark Blue = Edit**
- Type to change value
- Press Esc to finish

**Red = Command**
- Type colon commands
- Press Enter to execute

**Green = Search**
- Type to filter
- Press Esc to exit

**Remember:** Always press Esc to return to Normal (blue) mode

### Tip 8: Build Workflows, Not Queries

**Think in Workflows:**

Bad: "I need a query for opportunities"
Good: "I need a workflow to update my pipeline every morning"

**Workflow Example:**

```
Morning Pipeline Review Workflow:
1. Ctrl+Shift+Q
2. :loadquery My-Open-Opportunities
3. Ctrl+Enter
4. Review with j/k
5. For each opportunity:
   - Note action needed
   - Update stage if needed (inline edit)
   - Add task (open in new tab)
6. :wall (save all changes)
7. :exportcsv (export for manager)
8. Email CSV to manager
```

### Tip 9: Use Navigator for Learning

**Explore Salesforce with Navigator:**

```
1. Open Inspector (Ctrl+Shift+I)
2. Browse all objects (Objects tab)
3. For interesting objects:
   - Open in Object Manager (Enter)
   - Or query a few records:
     SELECT Id, Name FROM [Object] LIMIT 5
4. Review fields in Editor (Ctrl+Shift+E)
5. Learn by doing
```

**Benefits:**
- Understand data model
- Discover hidden objects
- Learn relationships
- Become Salesforce expert

### Tip 10: Share Knowledge

**Help Your Team:**
- Share query templates
- Document workflows
- Create training materials
- Conduct lunch-and-learn sessions

**Benefits:**
- Team efficiency multiplies
- Common query library grows
- Best practices emerge
- Continuous improvement

## Measuring Your Progress

### Efficiency Metrics

**Track These:**
- Time to open and edit record: Target < 5 seconds
- Time to write and execute query: Target < 15 seconds
- Time to export weekly report: Target < 2 minutes
- Mouse clicks per hour: Target < 20 (aim for 0!)

**Weekly Goal:**

Save 1 hour per week using Navigator
= 50 hours per year
= 1+ weeks of productivity gained

### Proficiency Levels

**Beginner (Week 1-2):**
- Can open Navigator, Editor, Query Tool
- Knows j, k, i, Esc, :wq
- Uses mouse occasionally

**Intermediate (Week 3-4):**
- Navigates with gg, G, /
- Uses y, p for copy/paste
- Writes simple queries
- Rarely uses mouse

**Advanced (Week 5-8):**
- Master of all modes
- Creates query templates
- Uses variables
- Split-screen editing
- Never uses mouse

**Expert (Week 9+):**
- Custom workflows
- Template library
- Teaches others
- Contributes feedback
- Fastest person on team

## Next Steps

- **[Workflows](/examples/workflows)** - Real-world workflow examples
- **[Common Queries](/examples/queries)** - Query examples to copy
- **[Keyboard Shortcuts](/reference/keyboard-shortcuts)** - Complete shortcut reference

::: tip Your Journey to Mastery
Mastery takes time. Focus on one technique per week. Practice daily. Build muscle memory. Within 2 months, you'll be navigating Salesforce faster than you ever thought possible. The investment pays off quickly—most users save 5-10 hours per month after becoming proficient.
:::
