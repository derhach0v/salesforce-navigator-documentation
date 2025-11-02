# API Permissions and Architecture

Understand the Salesforce APIs used by Navigator, required permissions, API limits, session management, and security considerations.

## Salesforce APIs Used

Salesforce Navigator uses two primary APIs to interact with your Salesforce org.

### REST API (v61.0)

**Purpose:** Query and modify data, fetch metadata

**Endpoints:**

| Endpoint | Usage | Example |
|----------|-------|---------|
| `/services/data/v61.0/sobjects/` | List all objects | Get object names for Navigator |
| `/services/data/v61.0/sobjects/{object}/describe` | Object metadata | Get field definitions for Editor |
| `/services/data/v61.0/sobjects/{object}/{id}` | Get/Update record | Fetch/save record data |
| `/services/data/v61.0/query/` | SOQL queries | Execute queries in Query Tool |
| `/services/data/v61.0/limits/` | Org limits | Check API usage in Inspector |

**Request Format:**

```http
GET /services/data/v61.0/sobjects/Account/001xx000003DH1QAAW
Host: yourorg.my.salesforce.com
Authorization: Bearer {sessionId}
Accept: application/json
```

**Response Format:**

```json
{
  "Id": "001xx000003DH1QAAW",
  "Name": "Acme Corporation",
  "Type": "Customer",
  "AnnualRevenue": 5000000,
  ...
}
```

### Tooling API (v61.0)

**Purpose:** Access development metadata (Flows, Apex, Pages)

**Endpoints:**

| Endpoint | Usage | Example |
|----------|-------|---------|
| `/services/data/v61.0/tooling/query/` | Query metadata | List Flows, Apex Classes, etc. |

**Request Format:**

```http
GET /services/data/v61.0/tooling/query/?q=SELECT+Id,MasterLabel+FROM+Flow
Host: yourorg.my.salesforce.com
Authorization: Bearer {sessionId}
Accept: application/json
```

**Used For:**
- Navigator Panel: Listing Flows, Apex Classes, Visualforce Pages
- Metadata discovery

### API Version

**Current Version:** `61.0` (Spring '25)

**Version Updates:**
- Extension updated quarterly to match Salesforce releases
- Older versions supported (back to v60.0)
- New features may require newer versions

**Checking Version:**

```
Inspector Panel > Org Tab > API Version
```

## Required Salesforce Permissions

Your Salesforce user needs specific permissions to use Navigator features.

### Basic Permissions

Required for all users:

| Permission | Purpose | Without It |
|------------|---------|------------|
| **View Setup and Configuration** | Access setup pages, objects | Navigator Panel won't list setup items |
| **API Enabled** | Make API calls | Extension won't work at all |
| **Run Reports** | Access some metadata | Some Navigator items unavailable |

### Feature-Specific Permissions

| Feature | Permission | Alternative |
|---------|------------|-------------|
| **Navigator - Flows** | View Flow | Flow items hidden |
| **Navigator - Apex** | Author Apex | Apex items hidden |
| **Editor - Edit Records** | Edit on {Object} | Fields read-only |
| **Query - Run Queries** | API Enabled + Read access | Queries fail |
| **Inspector - View Users** | View All Users | Can only see self |
| **Inspector - Login As** | Manage Users | Button hidden |

### Object-Level Permissions

For Record Editor and Query Tool:

**Read Permission:**
```
Required to:
  - View records
  - Execute SELECT queries
  - Open records in Editor
```

**Edit Permission:**
```
Required to:
  - Save record changes
  - Update records via inline editing
```

**Delete Permission:**
```
Not used by Navigator (no delete functionality)
```

### Field-Level Security

**Read Access:**
```
If you can't read a field:
  - Field hidden in Editor
  - Field excluded from query results
  - Autocomplete doesn't suggest field
```

**Edit Access:**
```
If you can't edit a field:
  - Field shown as read-only in Editor
  - Inline edit blocked in Query results
  - Save fails with FLS error
```

**Example Error:**

```
Quickfix List:
1. Account 001xxx: Insufficient access rights on field 'AnnualRevenue'
```

### Profile and Permission Sets

**System Administrator:**
```
✓ All features available
✓ View all objects
✓ Edit all fields
✓ Login as other users
```

**Standard User:**
```
✓ Basic features (Navigator, Editor, Query)
✗ May have limited object access
✗ May have FLS restrictions
✗ Cannot login as other users
```

**Custom Profiles:**
```
Features depend on assigned permissions
Check: Setup > Users > Profiles > [Your Profile]
```

## API Limits and Governor Limits

Salesforce enforces API limits to ensure fair usage.

### API Request Limits

**Daily Limits:**

| Edition | Requests/Day | Per User | Total |
|---------|--------------|----------|-------|
| Developer | 5,000 | 5,000 | N/A |
| Professional | 15,000 | 1,000 | Shared |
| Enterprise | 100,000 | 1,000 | Shared |
| Unlimited | 500,000 | 5,000 | Shared |

**Navigator API Usage:**

| Action | API Calls | Example |
|--------|-----------|---------|
| Open Navigator Panel | 3-5 calls | Fetch Flows, Objects, Apex |
| Open Inspector | 3 calls | Fetch Objects, Users, Org |
| Open Record Editor | 2 calls | Fetch metadata + record |
| Execute SOQL Query | 1 call | Run query |
| Save Record | 1 call | Update record |
| Autocomplete | 0-1 calls | Use cached data or fetch |

**Typical Daily Usage:**

```
Heavy User (100 actions/day):
  - 50 queries: 50 calls
  - 25 record edits: 50 calls (fetch + save)
  - 20 Navigator opens: 80 calls
  - 5 Inspector opens: 15 calls
  Total: ~195 calls/day (2-4% of Enterprise limit)
```

### SOQL Limits

**Query Limits:**

| Limit | Value | Impact |
|-------|-------|--------|
| Max records per query | 2,000 | Use LIMIT clause |
| Max query length | 20,000 chars | Keep queries concise |
| Max subqueries | 55 | Avoid excessive nesting |
| Query timeout | 120 seconds | Optimize slow queries |

**Query Tool Handling:**

```
SELECT Id, Name FROM Account  -- May return 2,000 max

Use pagination for more:
SELECT Id, Name FROM Account LIMIT 2000 OFFSET 0
SELECT Id, Name FROM Account LIMIT 2000 OFFSET 2000
```

### Governor Limits

**Record Limits:**

| Operation | Limit | Navigator Impact |
|-----------|-------|------------------|
| DML Rows | 10,000 | Inline edit: max 10,000 saves |
| SOQL Queries | 100 | Autocomplete caching minimizes |
| Records Retrieved | 50,000 | Query limit: 2,000 |

**Best Practices:**

1. **Cache Metadata:** Navigator caches object/field metadata to reduce API calls
2. **Batch Saves:** Use `:wall` to save multiple records efficiently
3. **Add LIMIT:** Always use `LIMIT` in queries to control result size
4. **Monitor Usage:** Check API usage in Inspector > Org tab

## Session Management

Navigator uses your existing Salesforce session for authentication.

### How It Works

**Session Retrieval:**

```
1. Extension reads 'sid' cookie from Salesforce domain
2. Cookie contains session ID (Bearer token)
3. Session ID used in Authorization header for API calls
```

**Example:**

```http
Authorization: Bearer 00D5g000001AbCd!AR8AQP5d...
```

**No Additional Login:**
- Uses your existing Salesforce session
- No username/password required
- No OAuth flow
- No external authentication

### Session Expiration

**When Session Expires:**

```
Symptom: API calls fail with 401 Unauthorized

Solution:
1. Refresh Salesforce page
2. Log back into Salesforce
3. Extension automatically uses new session
```

**Session Timeout:**
```
Configured in Salesforce Setup:
  Setup > Security > Session Settings > Timeout Value
  Default: 2 hours
```

**Keeping Session Active:**

```
- Interact with Salesforce regularly
- Use Navigator features (makes API calls)
- Refresh Salesforce tab periodically
```

### Cookie-Based Authentication

**Cookie Details:**

| Attribute | Value |
|-----------|-------|
| Name | `sid` |
| Domain | `.salesforce.com` |
| Path | `/` |
| Secure | Yes (HTTPS only) |
| HttpOnly | No (accessible by extension) |
| SameSite | None |

**Security:**
- Cookie encrypted in transit (HTTPS)
- Scoped to Salesforce domains
- Expires with session

**Privacy:**
- Cookie not sent to external domains
- Extension doesn't store session ID persistently
- Re-read on each API call

### Domain Conversion

Navigator automatically converts domains for API calls.

**Conversion Rules:**

```
User Domain → API Domain

yourorg.lightning.force.com
  ↓
yourorg.my.salesforce.com

yourorg--sandbox.lightning.force.com
  ↓
yourorg--sandbox.my.salesforce.com
```

**Why Conversion:**
- Lightning domain: User interface
- my.salesforce.com: API endpoint
- APIs don't work on lightning.force.com

**Automatic Handling:**
- Extension detects current domain
- Converts to API domain
- Uses converted domain for all API calls
- Transparent to user

## Security Considerations

### Data Privacy

**What Navigator Accesses:**
- Salesforce session ID (from cookie)
- Record data (via API, on-demand)
- Object and field metadata
- User and org information

**What Navigator Does NOT Access:**
- Passwords or credentials
- Data from non-Salesforce domains
- Personal information outside Salesforce
- Other browser tabs or extensions

### API Security

**Transport Security:**
```
All API calls:
  - HTTPS only (encrypted)
  - TLS 1.2 or higher
  - Certificate validation
```

**Authorization:**
```
Every API call includes:
  - Bearer token (session ID)
  - Salesforce validates on server
  - Same security as Salesforce UI
```

**No Proxies:**
```
Direct connection:
  Your Browser → Salesforce API

No third parties:
  ✗ No external servers
  ✗ No logging services
  ✗ No analytics platforms
```

### Permission Scoping

**Extension Only Accesses:**
- Data you can already see in Salesforce
- APIs you can already use
- Objects/fields your profile permits

**Cannot Bypass:**
- Salesforce security model
- Profile permissions
- Sharing rules
- Field-level security
- Organization-wide defaults

### Audit Trail

**Salesforce Tracks:**
- All API calls made by extension
- Appears as your user in audit logs
- Same as if you used Salesforce UI

**View Audit Logs:**
```
Setup > Security > View Setup Audit Trail
```

**API Usage Reports:**
```
Setup > System Overview > API Usage
```

### Best Practices

**Do:**
- Keep Salesforce session active
- Log out when done
- Use strong passwords
- Enable two-factor authentication
- Review API usage regularly

**Don't:**
- Share session IDs
- Use on public computers without logging out
- Grant excessive permissions to users
- Disable session timeout

### Compliance

**Navigator Supports:**
- GDPR (no data sent outside browser)
- HIPAA (uses Salesforce's HIPAA compliance)
- SOC 2 (relies on Salesforce infrastructure)
- FedRAMP (if Salesforce org is FedRAMP authorized)

**Open Source:**
- Code is open source (auditable)
- No obfuscation
- Transparent operation
- Community-reviewed

## Troubleshooting API Issues

### 401 Unauthorized

**Cause:** Session expired

**Solution:**
```
1. Refresh Salesforce page
2. Log back in
3. Try action again
```

### 403 Forbidden

**Cause:** Insufficient permissions

**Solution:**
```
1. Check profile permissions
2. Verify object/field access
3. Request permission from admin
```

### API Limit Exceeded

**Cause:** Hit daily API limit

**Solution:**
```
1. Wait for limit reset (midnight Salesforce time)
2. Optimize queries (add LIMIT, filter)
3. Reduce Navigator usage
4. Check other integrations consuming limits
```

### Slow API Calls

**Cause:** Large queries, complex metadata, or network latency

**Solution:**
```
1. Add LIMIT to queries
2. Use WHERE clauses
3. Clear metadata cache: :clearcache
4. Check network connection
```

## Next Steps

- **[Configuration](/reference/configuration)** - Extension settings
- **[Troubleshooting](/reference/troubleshooting)** - Common issues
- **[Keyboard Shortcuts](/reference/keyboard-shortcuts)** - Complete shortcut list

::: tip Monitor API Usage
Regularly check your API usage in Inspector > Org tab to ensure you're within limits. Navigator is designed to be efficient, but awareness helps avoid surprises.
:::
