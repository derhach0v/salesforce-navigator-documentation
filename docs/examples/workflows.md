# Real-World Workflows

Practical examples of using Salesforce Navigator in real-world scenarios. Learn how admins, developers, and analysts use Navigator to streamline their daily tasks.

## Bulk Editing Multiple Records

**Scenario:** Update the owner for 50 opportunities in your pipeline.

**Traditional Method:** 10-15 minutes
- Open list view
- Select records (10 at a time limit)
- Click "Change Owner"
- Select new owner
- Repeat 5 times

**Navigator Method:** 2-3 minutes

```
1. Open Query Tool (Ctrl+Shift+Q)

2. Write query:
   SELECT Id, Name, OwnerId, StageName
   FROM Opportunity
   WHERE OwnerId = '005xx000001AbCd'  -- Your ID
     AND StageName IN ('Prospecting', 'Qualification')
   LIMIT 50

3. Execute (Ctrl+Enter)

4. Navigate to first OwnerId cell (j/k keys)

5. Press i to edit

6. Type new owner ID: 005xx000001XyZ12

7. Press Enter

8. Press j to move to next row

9. Press p to paste same owner ID

10. Repeat steps 8-9 for all 50 records

11. Save all changes: :wall

12. Done! All 50 opportunities updated
```

**Time Saved:** 10 minutes
**Advantages:** No list view limitations, vim speed, bulk save

::: tip Pro Technique
Use `y` to yank the first owner ID, then `p` to paste it rapidly as you navigate down with `j`. The workflow becomes: `j p j p j p` (super fast!).
:::

## Searching Across Related Objects

**Scenario:** Find all contacts for accounts in the "Technology" industry with recent activity.

**Traditional Method:** 5-10 minutes
- Create report
- Add filters
- Run report
- Export data

**Navigator Method:** 1 minute

```
1. Open Query Tool (Ctrl+Shift+Q)

2. Write query:
   SELECT Id, FirstName, LastName, Email, Account.Name, Account.Industry
   FROM Contact
   WHERE Account.Industry = 'Technology'
     AND LastActivityDate >= LAST_N_DAYS:30
   ORDER BY Account.Name, LastName

3. Execute (Ctrl+Enter)

4. Review results with j/k navigation

5. Export if needed: :exportcsv
```

**Time Saved:** 5-8 minutes
**Advantages:** Immediate results, no report setup, reusable query

## Data Export Workflows

**Scenario:** Weekly export of closed-won opportunities for sales reporting.

**Traditional Method:** 8-12 minutes
- Navigate to reports
- Find or create report
- Adjust filters
- Run report
- Export to Excel
- Clean up data

**Navigator Method:** 2 minutes

```
1. Open Query Tool (Ctrl+Shift+Q)

2. Load saved template:
   :loadquery Weekly Won Opportunities

3. Verify date range (or update variable):
   :let ^startDate = 2025-10-28
   :let ^endDate = 2025-11-02

4. Execute (Ctrl+Enter)

5. Hide unnecessary columns:
   :columns
   Uncheck: SystemModstamp, CreatedById, LastModifiedById
   Press Esc

6. Export:
   :exportcsv

7. Rename file:
   closed-won-2025-11-02.csv

8. Share with team
```

**Time Saved:** 6-10 minutes per week = 5-8 hours per year
**Advantages:** Templated, consistent format, fast execution

**Template:**

```sql
-- Saved as "Weekly Won Opportunities"
SELECT Id, Name, Account.Name, Amount, CloseDate, Owner.Name,
       StageName, Type, LeadSource
FROM Opportunity
WHERE StageName = 'Closed Won'
  AND CloseDate >= ^startDate
  AND CloseDate <= ^endDate
ORDER BY CloseDate DESC, Amount DESC
```

## Admin Tasks

### Permission Set Assignment

**Scenario:** Grant "API Access" permission set to 20 new users.

```
1. Open Inspector (Ctrl+Shift+I)

2. Switch to Users tab (l key)

3. Search for new users:
   Type: new_hire

4. For each user:
   - Copy user ID (navigate with j, press y)
   - Open new tab: Setup > Permission Sets > API Access
   - Add user (paste ID)

Alternative: Use Query Tool
1. Get user IDs:
   SELECT Id, Username FROM User WHERE CreatedDate = THIS_WEEK

2. Navigate to Permission Set Assignments in Setup

3. Paste IDs for bulk assignment
```

### User Audit

**Scenario:** Review all active users and their profiles for compliance audit.

```
1. Open Query Tool (Ctrl+Shift+Q)

2. Query users:
   SELECT Id, Username, Name, Email, Profile.Name,
          UserRole.Name, IsActive, LastLoginDate
   FROM User
   WHERE IsActive = true
   ORDER BY Profile.Name, LastName

3. Execute (Ctrl+Enter)

4. Review with j/k navigation

5. Export for audit:
   :exportcsv

6. Rename: user-audit-2025-11-02.csv

7. Submit to compliance team
```

### Flow Management

**Scenario:** Find and open all inactive flows to review for deletion.

```
1. Open Navigator (Ctrl+Shift+M)

2. Filter to flows:
   Type: flow>

3. Browse inactive flows (manually search)

OR better:

1. Open Query Tool (Ctrl+Shift+Q)

2. Query flows via Tooling API:
   -- This requires Tooling API SOQL (advanced)
   -- Use Navigator for visual browsing
   -- Or use Setup > Flows > filter by "Inactive"

3. Navigate with Navigator panel for each flow
```

## Developer Tasks

### Apex Debugging

**Scenario:** Investigate recent Apex errors in production.

```
1. Open Query Tool (Ctrl+Shift+Q)

2. Query ApexLog (if available):
   SELECT Id, Application, LogUser.Name, Operation,
          Request, Status, LogLength
   FROM ApexLog
   WHERE LogDate = TODAY
   ORDER BY LogDate DESC
   LIMIT 50

OR query custom logging object:

   SELECT Id, Error_Message__c, Stack_Trace__c,
          User__r.Name, CreatedDate
   FROM Apex_Error__c
   WHERE CreatedDate >= THIS_WEEK
   ORDER BY CreatedDate DESC

3. Review errors (j/k navigation)

4. Click ID to open record in editor (split-screen)

5. Copy stack trace for investigation (y key)
```

### Data Model Exploration

**Scenario:** Understand relationships between objects for new feature development.

```
1. Open Inspector (Ctrl+Shift+I)

2. Search for object:
   Type: Account

3. Open object in Object Manager (Enter)

4. Review fields and relationships

OR using Editor:

1. Open any Account record (Ctrl+Shift+E)

2. View relationships:
   :showrelationships

3. Navigate relationships panel

4. Identify parent and child objects

OR using Query Tool:

1. Query with relationships:
   SELECT Id, Name,
          (SELECT Id, FirstName, LastName FROM Contacts),
          (SELECT Id, Name, Amount FROM Opportunities)
   FROM Account
   LIMIT 1

2. Expand rows (Enter key) to see structure
```

### Testing Permission Sets

**Scenario:** Validate that new permission set grants correct access.

```
1. Open Inspector (Ctrl+Shift+I)

2. Find test user (Users tab)

3. Login as test user:
   - Navigate to user (j/k)
   - Click "Login As" button
   - OR press t (current tab) or i (incognito)

4. New tab opens as test user

5. Test access:
   - Open Navigator (Ctrl+Shift+M)
   - Try accessing restricted objects
   - Open Editor on test records (Ctrl+Shift+E)
   - Try editing restricted fields

6. Verify access as expected

7. Close tab, return to admin session
```

## Analyst Tasks

### SOQL Query Development

**Scenario:** Build complex query for dashboard data source.

```
1. Open Query Tool (Ctrl+Shift+Q)

2. Start simple:
   SELECT Id, Name FROM Opportunity

3. Execute (Ctrl+Enter)

4. Add fields with autocomplete:
   SELECT Id, Name, Amount, StageName, CloseDate

5. Add filters:
   WHERE CloseDate >= THIS_MONTH
     AND Amount > 10000

6. Test (Ctrl+Enter)

7. Add relationships:
   SELECT Id, Name, Amount, Account.Name, Account.Industry,
          Owner.Name, Owner.Profile.Name
   FROM Opportunity
   WHERE ...

8. Test again

9. Add aggregations (if needed):
   SELECT Account.Industry, COUNT(Id), SUM(Amount)
   FROM Opportunity
   WHERE ...
   GROUP BY Account.Industry

10. Save as template:
    :savequery Dashboard Opportunity Data

11. Export for dashboard:
    :exportjson

12. Use JSON in visualization tool
```

### Data Quality Analysis

**Scenario:** Find contacts with missing email addresses for data cleanup.

```
1. Open Query Tool (Ctrl+Shift+Q)

2. Query missing emails:
   SELECT Id, FirstName, LastName, AccountId, Account.Name,
          Phone, Title, CreatedDate
   FROM Contact
   WHERE Email = null
     AND Account.Type = 'Customer'
   ORDER BY Account.Name, LastName
   LIMIT 500

3. Execute (Ctrl+Enter)

4. Review results (j/k navigation)

5. For each fixable record:
   - Navigate to Email cell
   - Press i to edit
   - Enter email address
   - Press Enter

6. Save all changes:
   :wall

7. Export remaining unfixed for manual outreach:
   :exportcsv

8. Rename: contacts-missing-emails-2025-11-02.csv
```

### Monthly Report Generation

**Scenario:** Generate monthly metrics report for leadership.

```
1. Open Query Tool (Ctrl+Shift+Q)

2. Set date variables:
   :let ^startDate = 2025-10-01
   :let ^endDate = 2025-10-31

3. Query 1: New Accounts
   SELECT COUNT(Id) newAccounts
   FROM Account
   WHERE CreatedDate >= ^startDate
     AND CreatedDate <= ^endDate

4. Execute, note count

5. Query 2: Closed Won Amount
   SELECT SUM(Amount) totalWon
   FROM Opportunity
   WHERE StageName = 'Closed Won'
     AND CloseDate >= ^startDate
     AND CloseDate <= ^endDate

6. Execute, note amount

7. Query 3: Top 10 Deals
   SELECT Name, Account.Name, Amount, CloseDate, Owner.Name
   FROM Opportunity
   WHERE StageName = 'Closed Won'
     AND CloseDate >= ^startDate
     AND CloseDate <= ^endDate
   ORDER BY Amount DESC
   LIMIT 10

8. Execute, export:
   :exportcsv

9. Copy into report template

10. Repeat for other metrics (use saved query templates)
```

## Time-Saving Patterns

### The "Quick Check" Pattern

**Use Case:** Quickly verify a record's status without opening it.

```
1. Copy record ID from email/chat
2. Ctrl+Shift+Q (Query Tool)
3. Type: SELECT Id, Status, Owner.Name FROM Case WHERE Id = '[paste]'
4. Ctrl+Enter
5. Glance at result
6. Close tab (Ctrl+W)

Total time: 5 seconds
```

### The "Bulk Update" Pattern

**Use Case:** Update multiple records with same value.

```
1. Query records (Ctrl+Shift+Q)
2. Navigate to field column
3. Press i, enter value, Enter (first record)
4. Press y (yank value)
5. Press j p j p j p... (navigate down, paste)
6. :wall (save all)

Works for: Status updates, owner changes, picklist values
```

### The "Template + Variable" Pattern

**Use Case:** Reusable queries with changing parameters.

```
1. Create template with variables
2. :loadquery [template name]
3. Update variables (:let ^var = value)
4. Execute (Ctrl+Enter)
5. Export if needed

Use for: Reports, dashboards, compliance queries
```

### The "Split-Screen Edit" Pattern

**Use Case:** Edit related records side-by-side.

```
1. Query parent records (Account)
2. Navigate to child ID (Contact.Id)
3. :editinsplitscreen
4. Edit child record in right pane
5. Save (:w)
6. Navigate to next child in left pane
7. Repeat

Faster than opening separate tabs
```

## Productivity Metrics

**Estimated Time Savings:**

| Task | Traditional | Navigator | Savings |
|------|-------------|-----------|---------|
| Bulk edit 50 records | 15 min | 3 min | 12 min |
| Export weekly report | 10 min | 2 min | 8 min |
| Find related records | 8 min | 1 min | 7 min |
| Test user permissions | 12 min | 3 min | 9 min |
| Data quality check | 20 min | 5 min | 15 min |

**Daily Usage (Power User):**
- 10 queries: 30 min saved
- 5 record edits: 15 min saved
- 3 exports: 18 min saved
- **Total: ~1 hour saved per day**

**Monthly Savings:** 20+ hours
**Yearly Savings:** 250+ hours (6+ weeks!)

## Next Steps

- **[Common Queries](/examples/queries)** - SOQL query examples
- **[Tips & Tricks](/examples/tips)** - Power user techniques
- **[Keyboard Shortcuts](/reference/keyboard-shortcuts)** - Master all shortcuts

::: tip Build Your Workflow Library
Document your most common workflows. Create query templates for repetitive tasks. Share workflows with your team. Over time, you'll build a personal library that saves hours each week.
:::
