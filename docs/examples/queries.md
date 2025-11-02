# Common SOQL Query Examples

A comprehensive collection of SOQL query examples for everyday Salesforce tasks. Copy, modify, and use these queries in the Query Tool.

## Simple Queries

### Basic Record Retrieval

**Get first 10 accounts:**
```sql
SELECT Id, Name, Type, Industry
FROM Account
LIMIT 10
```

**Get specific record by ID:**
```sql
SELECT Id, Name, Email, Phone
FROM Contact
WHERE Id = '003xx000003DH1QAAW'
```

**Get records by name:**
```sql
SELECT Id, Name, Type
FROM Account
WHERE Name = 'Acme Corporation'
```

**Get all active users:**
```sql
SELECT Id, Username, Name, Email, IsActive
FROM User
WHERE IsActive = true
ORDER BY Name
```

## Queries with WHERE Clauses

### Text Filters

**Contains:**
```sql
SELECT Id, Name, Email
FROM Contact
WHERE Name LIKE '%Smith%'
```

**Starts with:**
```sql
SELECT Id, Name, Website
FROM Account
WHERE Name LIKE 'Acme%'
```

**Ends with:**
```sql
SELECT Id, Name, Email
FROM Contact
WHERE Email LIKE '%@acme.com'
```

**Not equal:**
```sql
SELECT Id, Name, Type
FROM Account
WHERE Type != 'Prospect'
```

### Number Filters

**Greater than:**
```sql
SELECT Id, Name, AnnualRevenue
FROM Account
WHERE AnnualRevenue > 1000000
```

**Less than or equal:**
```sql
SELECT Id, Name, Amount
FROM Opportunity
WHERE Amount <= 50000
```

**Between (using AND):**
```sql
SELECT Id, Name, Amount
FROM Opportunity
WHERE Amount >= 10000
  AND Amount <= 100000
```

### Date Filters

**Today:**
```sql
SELECT Id, Subject, CreatedDate
FROM Case
WHERE CreatedDate = TODAY
```

**This week:**
```sql
SELECT Id, Name, CloseDate
FROM Opportunity
WHERE CloseDate = THIS_WEEK
```

**Last 30 days:**
```sql
SELECT Id, Name, CreatedDate
FROM Lead
WHERE CreatedDate = LAST_N_DAYS:30
```

**Date range:**
```sql
SELECT Id, Name, CloseDate, Amount
FROM Opportunity
WHERE CloseDate >= 2025-01-01
  AND CloseDate <= 2025-12-31
```

**This month:**
```sql
SELECT Id, CaseNumber, CreatedDate
FROM Case
WHERE CreatedDate = THIS_MONTH
```

### Boolean Filters

**Is true:**
```sql
SELECT Id, Name, Email
FROM Contact
WHERE HasOptedOutOfEmail = false
```

**Is false:**
```sql
SELECT Id, Name, Amount, IsClosed
FROM Opportunity
WHERE IsClosed = false
```

### NULL Checks

**Is null:**
```sql
SELECT Id, Name, Phone
FROM Contact
WHERE Phone = null
```

**Is not null:**
```sql
SELECT Id, Name, Email
FROM Contact
WHERE Email != null
```

## Queries with Relationships

### Parent Relationships

**Single parent field:**
```sql
SELECT Id, FirstName, LastName, Account.Name
FROM Contact
ORDER BY Account.Name, LastName
```

**Multiple parent fields:**
```sql
SELECT Id, Name, Account.Name, Account.Type, Account.Industry, Owner.Name
FROM Opportunity
WHERE Account.Type = 'Customer'
```

**Nested relationships (up to 5 levels):**
```sql
SELECT Id, Name, Owner.Name, Owner.Manager.Name, Owner.Manager.Manager.Name
FROM Account
LIMIT 10
```

**Parent field in WHERE clause:**
```sql
SELECT Id, FirstName, LastName, Email, Account.Name
FROM Contact
WHERE Account.Industry = 'Technology'
  AND Account.AnnualRevenue > 5000000
```

### Child Relationships (Subqueries)

**Single child relationship:**
```sql
SELECT Id, Name,
  (SELECT Id, FirstName, LastName, Email FROM Contacts)
FROM Account
WHERE Type = 'Customer'
LIMIT 10
```

**Multiple child relationships:**
```sql
SELECT Id, Name,
  (SELECT Id, FirstName, LastName FROM Contacts),
  (SELECT Id, Subject, Status FROM Cases)
FROM Account
LIMIT 5
```

**Child relationship with filters:**
```sql
SELECT Id, Name,
  (SELECT Id, FirstName, LastName, Email
   FROM Contacts
   WHERE Email != null
   ORDER BY LastName)
FROM Account
WHERE Industry = 'Technology'
LIMIT 10
```

**Counting child records:**
```sql
SELECT Id, Name,
  (SELECT COUNT() FROM Opportunities)
FROM Account
ORDER BY Name
LIMIT 20
```

## Aggregate Queries

### COUNT

**Count all records:**
```sql
SELECT COUNT()
FROM Contact
```

**Count with filter:**
```sql
SELECT COUNT()
FROM Opportunity
WHERE StageName = 'Closed Won'
  AND CloseDate = THIS_YEAR
```

**Count with GROUP BY:**
```sql
SELECT StageName, COUNT(Id)
FROM Opportunity
GROUP BY StageName
ORDER BY COUNT(Id) DESC
```

**Count by type:**
```sql
SELECT Type, COUNT(Id) recordCount
FROM Account
GROUP BY Type
ORDER BY recordCount DESC
```

### SUM

**Sum amounts:**
```sql
SELECT SUM(Amount)
FROM Opportunity
WHERE StageName = 'Closed Won'
  AND CloseDate = THIS_QUARTER
```

**Sum by owner:**
```sql
SELECT Owner.Name, SUM(Amount) totalAmount
FROM Opportunity
WHERE StageName = 'Closed Won'
GROUP BY Owner.Name
ORDER BY totalAmount DESC
```

**Sum by stage:**
```sql
SELECT StageName, SUM(Amount) totalRevenue
FROM Opportunity
GROUP BY StageName
ORDER BY totalRevenue DESC
```

### AVG, MIN, MAX

**Average amount:**
```sql
SELECT AVG(Amount) avgDealSize
FROM Opportunity
WHERE StageName = 'Closed Won'
  AND CloseDate = THIS_YEAR
```

**Min, Max, Avg together:**
```sql
SELECT MIN(Amount) minAmount,
       MAX(Amount) maxAmount,
       AVG(Amount) avgAmount
FROM Opportunity
WHERE StageName = 'Closed Won'
  AND CloseDate = THIS_YEAR
```

**Group by with aggregates:**
```sql
SELECT LeadSource,
       COUNT(Id) dealCount,
       SUM(Amount) totalRevenue,
       AVG(Amount) avgDealSize,
       MAX(Amount) largestDeal
FROM Opportunity
WHERE StageName = 'Closed Won'
  AND CloseDate = THIS_YEAR
GROUP BY LeadSource
ORDER BY totalRevenue DESC
```

### HAVING Clause

**Filter aggregated results:**
```sql
SELECT Account.Name, COUNT(Id) opportunityCount
FROM Opportunity
GROUP BY Account.Name
HAVING COUNT(Id) > 5
ORDER BY opportunityCount DESC
```

**Multiple HAVING conditions:**
```sql
SELECT Owner.Name, COUNT(Id) wonDeals, SUM(Amount) totalRevenue
FROM Opportunity
WHERE StageName = 'Closed Won'
  AND CloseDate = THIS_YEAR
GROUP BY Owner.Name
HAVING COUNT(Id) >= 10
  AND SUM(Amount) > 500000
ORDER BY totalRevenue DESC
```

## Date Queries

### Date Literals

**Today, Yesterday, Tomorrow:**
```sql
SELECT Id, Subject, CreatedDate
FROM Case
WHERE CreatedDate = TODAY

SELECT Id, Subject, CreatedDate
FROM Case
WHERE CreatedDate = YESTERDAY

SELECT Id, Subject, ActivityDate
FROM Task
WHERE ActivityDate = TOMORROW
```

**This Week, Last Week:**
```sql
SELECT Id, Name, CloseDate
FROM Opportunity
WHERE CloseDate = THIS_WEEK

SELECT Id, Subject, CreatedDate
FROM Case
WHERE CreatedDate = LAST_WEEK
```

**This Month, Last Month:**
```sql
SELECT Id, Name, CreatedDate
FROM Account
WHERE CreatedDate = THIS_MONTH

SELECT Id, CaseNumber, CreatedDate
FROM Case
WHERE CreatedDate = LAST_MONTH
```

**This Quarter, Last Quarter:**
```sql
SELECT Id, Name, CloseDate, Amount
FROM Opportunity
WHERE CloseDate = THIS_QUARTER
  AND StageName = 'Closed Won'

SELECT Id, Name, CloseDate, Amount
FROM Opportunity
WHERE CloseDate = LAST_QUARTER
```

**This Year, Last Year:**
```sql
SELECT Id, Name, CloseDate, Amount
FROM Opportunity
WHERE CloseDate = THIS_YEAR

SELECT Id, Name, AnnualRevenue, CreatedDate
FROM Account
WHERE CreatedDate = LAST_YEAR
```

### Relative Date Literals

**Last N Days:**
```sql
SELECT Id, Name, CreatedDate
FROM Lead
WHERE CreatedDate = LAST_N_DAYS:7

SELECT Id, Subject, CreatedDate
FROM Case
WHERE CreatedDate = LAST_N_DAYS:30
```

**Next N Days:**
```sql
SELECT Id, Subject, ActivityDate
FROM Task
WHERE ActivityDate = NEXT_N_DAYS:7
  AND Status != 'Completed'

SELECT Id, Name, CloseDate
FROM Opportunity
WHERE CloseDate = NEXT_N_DAYS:30
  AND IsClosed = false
```

**Last N Months:**
```sql
SELECT Id, Name, CloseDate, Amount
FROM Opportunity
WHERE CloseDate = LAST_N_MONTHS:6
  AND StageName = 'Closed Won'
```

## Queries with ORDER BY and LIMIT

### Sorting

**Ascending order:**
```sql
SELECT Id, Name, CreatedDate
FROM Account
ORDER BY Name ASC
LIMIT 50
```

**Descending order:**
```sql
SELECT Id, Name, Amount, CloseDate
FROM Opportunity
WHERE StageName = 'Closed Won'
ORDER BY Amount DESC
LIMIT 20
```

**Multiple sort fields:**
```sql
SELECT Id, FirstName, LastName, Account.Name
FROM Contact
ORDER BY Account.Name ASC, LastName ASC, FirstName ASC
LIMIT 100
```

**Sort by date:**
```sql
SELECT Id, Subject, CreatedDate, Priority
FROM Case
WHERE Status != 'Closed'
ORDER BY CreatedDate DESC, Priority ASC
LIMIT 50
```

### LIMIT and OFFSET

**First 100 records:**
```sql
SELECT Id, Name FROM Account
ORDER BY Name
LIMIT 100
```

**Next 100 records (pagination):**
```sql
SELECT Id, Name FROM Account
ORDER BY Name
LIMIT 100 OFFSET 100
```

**Third page of 100:**
```sql
SELECT Id, Name FROM Account
ORDER BY Name
LIMIT 100 OFFSET 200
```

## Complex Queries

### Multiple Conditions with AND/OR

**AND conditions:**
```sql
SELECT Id, Name, Type, Industry, AnnualRevenue
FROM Account
WHERE Type = 'Customer'
  AND Industry = 'Technology'
  AND AnnualRevenue > 10000000
ORDER BY AnnualRevenue DESC
```

**OR conditions:**
```sql
SELECT Id, Name, StageName
FROM Opportunity
WHERE StageName = 'Closed Won'
   OR StageName = 'Closed Lost'
ORDER BY CloseDate DESC
LIMIT 100
```

**Combined AND/OR with parentheses:**
```sql
SELECT Id, FirstName, LastName, Email, Account.Name
FROM Contact
WHERE (Account.Type = 'Customer' OR Account.Type = 'Partner')
  AND (LeadSource = 'Web' OR LeadSource = 'Referral')
  AND Email != null
ORDER BY LastName
```

### IN Clause

**IN with list:**
```sql
SELECT Id, Name, StageName
FROM Opportunity
WHERE StageName IN ('Prospecting', 'Qualification', 'Needs Analysis', 'Value Proposition')
ORDER BY CreatedDate DESC
```

**IN with IDs:**
```sql
SELECT Id, Name, Email
FROM Contact
WHERE Id IN ('003xx001', '003xx002', '003xx003')
```

**NOT IN:**
```sql
SELECT Id, Name, StageName
FROM Opportunity
WHERE StageName NOT IN ('Closed Won', 'Closed Lost')
ORDER BY CloseDate ASC
```

**IN with subquery:**
```sql
SELECT Id, Name, Email
FROM Contact
WHERE AccountId IN (
  SELECT Id FROM Account WHERE Type = 'Customer'
)
ORDER BY LastName
```

### Subqueries in WHERE

**Find contacts of high-value accounts:**
```sql
SELECT Id, FirstName, LastName, Email, Account.Name
FROM Contact
WHERE AccountId IN (
  SELECT Id FROM Account WHERE AnnualRevenue > 10000000
)
ORDER BY Account.Name
```

**Find opportunities for accounts with open cases:**
```sql
SELECT Id, Name, StageName, Account.Name
FROM Opportunity
WHERE AccountId IN (
  SELECT AccountId FROM Case WHERE Status != 'Closed'
)
ORDER BY Account.Name
```

## Common Business Queries

### Sales Queries

**Pipeline by stage:**
```sql
SELECT StageName, COUNT(Id) count, SUM(Amount) total
FROM Opportunity
WHERE IsClosed = false
GROUP BY StageName
ORDER BY COUNT(Id) DESC
```

**Top 20 opportunities:**
```sql
SELECT Id, Name, Amount, StageName, CloseDate, Account.Name, Owner.Name
FROM Opportunity
WHERE IsClosed = false
ORDER BY Amount DESC
LIMIT 20
```

**Won opportunities this quarter:**
```sql
SELECT Id, Name, Amount, CloseDate, Account.Name, Owner.Name
FROM Opportunity
WHERE StageName = 'Closed Won'
  AND CloseDate = THIS_QUARTER
ORDER BY Amount DESC
```

**Stale opportunities (no activity):**
```sql
SELECT Id, Name, Amount, StageName, LastActivityDate, Owner.Name
FROM Opportunity
WHERE LastActivityDate < LAST_N_DAYS:30
  AND IsClosed = false
ORDER BY LastActivityDate ASC
```

### Service Queries

**Open cases by priority:**
```sql
SELECT Priority, COUNT(Id) caseCount
FROM Case
WHERE Status != 'Closed'
GROUP BY Priority
ORDER BY Priority ASC
```

**Cases created today:**
```sql
SELECT Id, CaseNumber, Subject, Priority, Status, Owner.Name
FROM Case
WHERE CreatedDate = TODAY
ORDER BY Priority ASC, CreatedDate ASC
```

**Unassigned cases:**
```sql
SELECT Id, CaseNumber, Subject, Priority, CreatedDate
FROM Case
WHERE OwnerId = null
  AND Status != 'Closed'
ORDER BY Priority ASC, CreatedDate ASC
```

**Cases by type:**
```sql
SELECT Type, COUNT(Id) count
FROM Case
WHERE Status != 'Closed'
GROUP BY Type
ORDER BY COUNT(Id) DESC
```

### Marketing Queries

**Leads by source:**
```sql
SELECT LeadSource, COUNT(Id) leadCount
FROM Lead
WHERE CreatedDate = THIS_MONTH
GROUP BY LeadSource
ORDER BY leadCount DESC
```

**Converted leads:**
```sql
SELECT Id, Name, Company, Email, ConvertedDate, ConvertedAccountId
FROM Lead
WHERE IsConverted = true
  AND ConvertedDate = THIS_QUARTER
ORDER BY ConvertedDate DESC
```

**Uncontacted leads:**
```sql
SELECT Id, Name, Company, Email, LeadSource, CreatedDate
FROM Lead
WHERE Status = 'Open - Not Contacted'
  AND CreatedDate >= LAST_N_DAYS:7
ORDER BY CreatedDate ASC
```

### Data Quality Queries

**Accounts without contacts:**
```sql
SELECT Id, Name, Type, Industry
FROM Account
WHERE Id NOT IN (SELECT AccountId FROM Contact WHERE AccountId != null)
  AND Type = 'Customer'
ORDER BY Name
```

**Contacts without email:**
```sql
SELECT Id, FirstName, LastName, Account.Name, Phone
FROM Contact
WHERE Email = null
  AND Account.Type = 'Customer'
ORDER BY Account.Name, LastName
```

**Duplicate emails:**
```sql
SELECT Email, COUNT(Id) duplicateCount
FROM Contact
WHERE Email != null
GROUP BY Email
HAVING COUNT(Id) > 1
ORDER BY duplicateCount DESC
```

**Records with missing required fields:**
```sql
SELECT Id, Name, Phone, Email, Website
FROM Account
WHERE (Phone = null OR Email = null OR Website = null)
  AND Type = 'Customer'
ORDER BY Name
```

## Query Templates with Variables

**Parameterized account query:**
```sql
-- Variables
:let ^accountType = 'Customer'
:let ^minRevenue = 5000000
:let ^industry = 'Technology'

-- Query
SELECT Id, Name, Type, Industry, AnnualRevenue, Owner.Name
FROM Account
WHERE Type = ^accountType
  AND AnnualRevenue > ^minRevenue
  AND Industry = ^industry
ORDER BY AnnualRevenue DESC
LIMIT 100
```

**Date-based opportunity query:**
```sql
-- Variables
:let ^startDate = 2025-01-01
:let ^endDate = 2025-12-31
:let ^stage = 'Closed Won'

-- Query
SELECT Id, Name, Amount, CloseDate, Account.Name, Owner.Name
FROM Opportunity
WHERE StageName = ^stage
  AND CloseDate >= ^startDate
  AND CloseDate <= ^endDate
ORDER BY CloseDate DESC, Amount DESC
```

## Next Steps

- **[Query Basics](/query/basics)** - Learn SOQL fundamentals
- **[Query Variables](/query/variables)** - Use variables in queries
- **[Workflows](/examples/workflows)** - Real-world query workflows

::: tip Building Your Query Library
Save these queries as templates (`:savequery [name]`) for quick access. Modify them for your specific use cases. Build a personal library of queries you use regularly.
:::
