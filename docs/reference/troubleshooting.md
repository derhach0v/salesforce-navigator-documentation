# Troubleshooting

Solutions to common issues with Salesforce Navigator. Find quick fixes for extension problems, keyboard shortcuts, API errors, and performance issues.

## Extension Not Working

### Extension Not Loading

**Symptoms:**
- Navigator Panel doesn't open (`Ctrl+Shift+M`)
- No Inspector button visible
- Shortcuts not responding

**Solutions:**

**1. Verify Extension is Enabled**
```
chrome://extensions/
↓
Find "Salesforce Navigator"
↓
Ensure toggle is ON (blue)
```

**2. Refresh Salesforce Page**
```
Press F5 or Ctrl+R to reload
Extension scripts re-inject on page load
```

**3. Check Salesforce Domain**
```
Extension works on:
  ✓ *.salesforce.com
  ✓ *.lightning.force.com
  ✓ *.my.salesforce-setup.com

Does NOT work on:
  ✗ Classic Salesforce (non-Lightning)
  ✗ Non-Salesforce domains
  ✗ Salesforce login page
```

**4. Reinstall Extension**
```
1. chrome://extensions/
2. Remove extension
3. Reinstall from source
4. Refresh Salesforce page
```

**5. Check Browser Console**
```
Press F12 → Console tab
Look for errors related to extension
Report errors to GitHub
```

### Features Not Appearing

**Symptom:** Some features work, others don't

**Causes & Solutions:**

| Missing Feature | Likely Cause | Solution |
|-----------------|--------------|----------|
| Navigator Panel | Script not injected | Refresh page |
| Inspector Button | Positioning issue | Reset position via console |
| Editor | Tab blocked | Check popup blocker |
| Query Tool | Tab blocked | Allow popups from Salesforce |

## Shortcuts Not Responding

### Global Shortcuts Not Working

**Shortcuts:** `Ctrl+Shift+M`, `Ctrl+Shift+E`, `Ctrl+Shift+I`, `Ctrl+Shift+Q`

**Solutions:**

**1. Check Shortcut Conflicts**
```
chrome://extensions/shortcuts
↓
Look for conflicts (red warning)
↓
Change conflicting shortcut
```

**2. Verify Page is Active**
```
Click anywhere on Salesforce page
Wait 1 second
Try shortcut again
```

**3. Check Browser Focus**
```
Ensure Chrome is in foreground
Not in another app or screen
Click Chrome window first
```

**4. Test on Different Page**
```
Navigate to Home page
Try shortcut
If works: Page-specific issue
If not: Browser or extension issue
```

### In-Page Shortcuts Not Working

**Shortcuts:** `j`, `k`, `i`, `/`, `:`, etc.

**Solutions:**

**1. Verify Correct Mode**
```
Editor Normal Mode: j/k should work
Editor Insert Mode: j/k types letters (press Esc first)
Query Results: j/k should work
Query Editor: j/k types letters (not vim mode)
```

**2. Check Focus**
```
Click on editor or results area
Shortcut target must have focus
Try clicking then pressing shortcut
```

**3. Exit Current Mode**
```
Press Esc to return to Normal mode
Try shortcut again
```

**4. Reload Tab**
```
Close editor/query tab
Re-open with Ctrl+Shift+E or Ctrl+Shift+Q
Try again
```

## API Errors

### Session Expired

**Error:** `401 Unauthorized` or `INVALID_SESSION_ID`

**Cause:** Salesforce session timed out

**Solution:**
```
1. Refresh Salesforce page (F5)
2. Log back in if prompted
3. Try action again
4. Extension will use new session automatically
```

**Prevention:**
```
Setup > Security > Session Settings
↓
Increase "Timeout value"
OR
Stay active in Salesforce (prevents timeout)
```

### Insufficient Permissions

**Error:** `403 Forbidden` or `INSUFFICIENT_ACCESS`

**Cause:** Missing Salesforce permissions

**Solutions:**

**1. Check Profile Permissions**
```
Setup > Users > Profiles > [Your Profile]
↓
Verify permissions:
  - API Enabled ✓
  - View Setup and Configuration ✓
  - Object read/edit access ✓
```

**2. Check Field-Level Security**
```
Setup > Object Manager > [Object] > Fields
↓
Click field > "Set Field-Level Security"
↓
Ensure "Visible" and "Read-Only" are correct
```

**3. Contact Salesforce Admin**
```
Request permissions:
  - API Enabled
  - Edit access on objects
  - Field-level security on restricted fields
```

### API Limit Exceeded

**Error:** `REQUEST_LIMIT_EXCEEDED`

**Cause:** Hit daily API call limit

**Solutions:**

**1. Check Current Usage**
```
Inspector > Org Tab > API Limits
↓
See used/total API calls
```

**2. Wait for Reset**
```
API limits reset at midnight (Salesforce org time)
OR
Optimize queries to use fewer calls
```

**3. Optimize Usage**
```
- Add LIMIT to queries
- Use cached metadata (don't clear cache)
- Batch record saves (:wall instead of multiple :w)
- Reduce Navigator Panel opens
```

**4. Check Other Integrations**
```
Setup > System Overview > API Usage
↓
Identify other apps consuming API calls
↓
Disable or optimize them
```

### Query Errors

**Error:** SOQL syntax errors in quickfix list

**Common Errors:**

| Error | Cause | Solution |
|-------|-------|----------|
| `Unexpected token 'FORM'` | Typo in keyword | Change to `FROM` |
| `Field does not exist` | Wrong field name | Use autocomplete or check object |
| `Invalid field: Account.Nme` | Typo in relationship | Change to `Account.Name` |
| `LIMIT must be less than 2001` | Exceeds limit | Reduce LIMIT value |
| `Missing FROM clause` | Incomplete query | Add `FROM ObjectName` |

**Solution Process:**
```
1. Read error message in quickfix list
2. Press Enter to jump to error location
3. Fix syntax
4. Re-execute query (Ctrl+Enter)
```

## Performance Issues

### Slow Navigator Panel

**Symptom:** Panel takes 5+ seconds to open

**Causes & Solutions:**

**1. Large Org**
```
Cause: Many custom objects, flows, Apex classes
Solution: Use search prefixes (flow>, object>)
```

**2. Network Latency**
```
Cause: Slow connection to Salesforce
Solution: Check network, move closer to Wi-Fi
```

**3. Cache Not Built**
```
Cause: First load fetches all metadata
Solution: Wait for initial load, subsequent opens faster
```

### Slow Query Execution

**Symptom:** Query takes 10+ seconds to run

**Causes & Solutions:**

**1. Large Result Set**
```
Cause: Query returns many records
Solution: Add LIMIT 100
```

**2. Complex Query**
```
Cause: Multiple relationships, subqueries
Solution: Simplify query, reduce subqueries
```

**3. Unindexed Fields**
```
Cause: WHERE clause on non-indexed fields
Solution: Use indexed fields (Id, Name, CreatedDate)
```

**4. Salesforce Performance**
```
Cause: Org under heavy load
Solution: Try again later, contact Salesforce support
```

### Slow Record Editor

**Symptom:** Editor takes 5+ seconds to open

**Causes & Solutions:**

**1. Many Fields**
```
Cause: Object has 200+ fields
Solution: Use :togglereadonly to hide calculated fields
```

**2. Complex Metadata**
```
Cause: Many picklists, lookups, formulas
Solution: Metadata cached after first load
```

**3. Related Lists**
```
Cause: Many related lists loading
Solution: Keep related lists hidden (default)
```

## Browser Compatibility

### Chrome Issues

**Supported Versions:** Chrome 110+

**Issues:**

| Issue | Cause | Solution |
|-------|-------|----------|
| Extension not installing | Old Chrome | Update Chrome |
| Shortcuts not working | Conflicting extensions | Disable other extensions |
| Slow performance | Many tabs open | Close unused tabs |

### Edge Issues

**Supported:** Edge (Chromium) 110+

**Issues:**

| Issue | Solution |
|-------|----------|
| Extension not loading | Install from source (not store) |
| Keyboard shortcuts different | Use Windows key instead of Meta |

### Other Browsers

**Safari:** Not supported (different extension system)

**Firefox:** Not supported (Manifest V3 limited support)

**Brave:** Should work (Chromium-based), test before relying on

## How to Report Bugs

### Before Reporting

**1. Reproduce the Issue**
```
Can you make it happen again?
Does it happen every time?
Does it happen on different pages?
```

**2. Check Existing Issues**
```
GitHub > Issues
Search for similar reports
Comment on existing issue if found
```

**3. Gather Information**
```
- Chrome version: chrome://version/
- Extension version: chrome://extensions/
- Salesforce org type: Production, Sandbox, Developer
- Console errors: F12 > Console > Screenshot
```

### Creating a Bug Report

**Template:**

```markdown
## Bug Description
Clear, concise description of the bug

## Steps to Reproduce
1. Open Navigator Panel (Ctrl+Shift+M)
2. Search for "Account"
3. Press Enter
4. [Expected] Account opens
5. [Actual] Nothing happens

## Environment
- Chrome Version: 120.0.6099.109
- Extension Version: 1.0.0
- Salesforce Org: Production
- Browser Console Errors: [attach screenshot]

## Additional Context
Any other relevant information
```

**Where to Report:**

```
GitHub Issues:
https://github.com/denysderhachov/salesforce-navigator/issues

Include:
- Clear description
- Steps to reproduce
- Environment details
- Console errors (if any)
- Screenshots (if helpful)
```

## Common Issues Summary

### Quick Fixes Table

| Issue | Quick Fix |
|-------|-----------|
| Extension not working | Refresh page (F5) |
| Shortcuts not responding | Check chrome://extensions/shortcuts |
| Session expired | Refresh and re-login |
| API errors | Check permissions, API limits |
| Slow performance | Clear cache, add LIMIT to queries |
| Editor not opening | Check popup blocker |
| Query fails | Check syntax in quickfix list |
| Can't edit field | Check field-level security |
| Inspector button missing | Reset position via console |
| Autocomplete not working | Wait 300ms or press Ctrl+Space |

### Diagnostic Checklist

**Run through these when troubleshooting:**

```
✓ Extension enabled (chrome://extensions/)
✓ Salesforce page active (Lightning, not Classic)
✓ Page refreshed recently
✓ Logged into Salesforce (session active)
✓ Correct permissions (API Enabled, object access)
✓ No conflicting extensions
✓ Browser console checked (F12)
✓ Shortcuts not conflicting (chrome://extensions/shortcuts)
✓ Popup blocker allows extension
✓ Network connection stable
```

## Getting Help

### Community Support

**GitHub Discussions:**
```
https://github.com/denysderhachov/salesforce-navigator/discussions

Ask questions
Share workflows
Request features
```

**GitHub Issues:**
```
https://github.com/denysderhachov/salesforce-navigator/issues

Report bugs only
Provide detailed information
Attach screenshots
```

### Self-Help Resources

**Documentation:**
- [Getting Started](/guide/getting-started)
- [Keyboard Shortcuts](/reference/keyboard-shortcuts)
- [Configuration](/reference/configuration)
- [API Permissions](/reference/api-permissions)

**Examples:**
- [Workflows](/examples/workflows)
- [Common Queries](/examples/queries)
- [Tips & Tricks](/examples/tips)

## Next Steps

- **[Configuration](/reference/configuration)** - Extension settings
- **[API Permissions](/reference/api-permissions)** - Salesforce APIs and permissions
- **[Keyboard Shortcuts](/reference/keyboard-shortcuts)** - Complete shortcut list

::: tip When Stuck
1. Try refreshing the page
2. Check browser console (F12)
3. Review this troubleshooting guide
4. Search GitHub Issues
5. Create new issue with details
:::
