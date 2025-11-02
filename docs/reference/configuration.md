# Configuration

Configure Salesforce Navigator settings, permissions, and preferences to optimize your workflow.

## Extension Settings

Salesforce Navigator stores settings in Chrome's local storage.

### Accessing Settings

Currently, there is no dedicated settings UI. Configuration is managed through:
- Chrome extension permissions
- Browser settings
- Command-based toggles (`:togglereadonly`, `:togglerelated`, etc.)

### Storage Location

Settings are stored in:
```
Chrome Local Storage (per browser profile)
- Query history
- Saved query templates
- Global variables
- Inspector button position
- Split-screen layout preferences
- Metadata cache
```

**Storage Limits:**
- Chrome local storage: 10MB per extension
- Metadata cache: ~2-5MB
- Query history: Last 50 queries
- Templates: Unlimited (within storage limit)

## Browser Permissions

The extension requires specific permissions to function.

### Required Permissions

| Permission | Purpose | Usage |
|------------|---------|-------|
| `activeTab` | Access current tab | Read Salesforce page data, inject scripts |
| `storage` | Store preferences | Save templates, history, variables, cache |
| `cookies` | Read cookies | Retrieve Salesforce session ID for API calls |
| `scripting` | Inject scripts | Add Navigator Panel, Inspector, Editor functionality |
| `tabs` | Open new tabs | Open Editor and Query Tool in new tabs |
| `windows` | Incognito mode | Support "Login as User" in incognito window |

### Host Permissions

Extension works on these Salesforce domains:

```
*://*.salesforce.com/*
*://*.lightning.force.com/*
*://*.my.salesforce-setup.com/*
```

**Included:**
- Main Salesforce domain (`yourorg.salesforce.com`)
- Lightning Experience (`yourorg.lightning.force.com`)
- Setup pages (`yourorg.my.salesforce-setup.com`)
- Sandbox environments (`yourorg--sandbox.lightning.force.com`)

### Managing Permissions

**View Permissions:**
```
1. Open Chrome
2. Navigate to chrome://extensions/
3. Find "Salesforce Navigator"
4. Click "Details"
5. View "Permissions" section
```

**Revoke Permissions:**
```
1. chrome://extensions/
2. Find extension
3. Click "Remove"
```

::: warning Permission Required
If you deny permissions, certain features will not work (e.g., denying cookies prevents API authentication).
:::

## Customizing Keyboard Shortcuts

Chrome allows customizing some extension shortcuts.

### Changing Global Shortcuts

**Steps:**
```
1. Open Chrome
2. Navigate to chrome://extensions/shortcuts
3. Find "Salesforce Navigator"
4. Click pencil icon next to shortcut
5. Press new key combination
6. Click "OK"
```

**Customizable Shortcuts:**
- Open Navigator Panel (default: `Ctrl+Shift+M`)
- Open Record Editor (default: `Ctrl+Shift+E`)
- Toggle Inspector Panel (default: `Ctrl+Shift+I`)
- Open SOQL Query Tool (default: `Ctrl+Shift+Q`)

**Restrictions:**
- Must use modifier keys (Ctrl, Shift, Alt/Opt, Cmd)
- Cannot conflict with browser shortcuts
- Cannot customize in-page shortcuts (`j`, `k`, `i`, etc.)

::: tip Shortcut Conflicts
If your desired shortcut doesn't work, check for conflicts with:
- Other Chrome extensions
- Operating system shortcuts
- Browser built-in shortcuts
:::

## Inspector Button Position

The Inspector floating button position is saved automatically.

### Repositioning

**Drag and Drop:**
```
1. Press Ctrl+Shift+I to show button
2. Click and hold button
3. Drag to desired position
4. Release mouse
5. Position saved automatically
```

**Position Storage:**
- Saved to Chrome local storage
- Persists across page reloads
- Persists across browser restarts
- Per-browser profile (not synced)

**Default Position:**
```
Bottom-right corner:
  bottom: 20px
  right: 20px
```

**Recommended Positions:**
- Bottom-right (default) - Out of the way
- Bottom-left - Near Salesforce navigation
- Top-right - Near other Salesforce tools
- Top-left - Near app launcher

### Resetting Position

If button is off-screen or misplaced:

```
1. Open browser console (F12)
2. Go to Application > Local Storage
3. Find extension storage
4. Delete "inspectorButtonPosition" key
5. Refresh page
6. Button resets to bottom-right
```

## Other Preferences

### Editor Preferences

**Read-Only Fields:**
```
Command: :togglereadonly
Effect: Show/hide formula and read-only fields
Storage: Session-only (reset on tab close)
```

**Address Display:**
```
Command: :toggleaddress
Effect: Switch between JSON and section display
Storage: Session-only
```

**Related Lists:**
```
Command: :togglerelated
Effect: Show/hide related lists panel
Storage: Session-only
```

### Query Tool Preferences

**Column Visibility:**
```
Command: :columns
Effect: Show/hide specific columns
Storage: Session-only (reset on query re-execute)
```

**Split-Screen Layout:**
```
Commands:
  Cmd+Shift+H/L (resize)
  :clearpane (close)
Effect: Adjust query/editor pane ratio
Storage: Saved to local storage (persists)
```

**Variables:**
```
Global variables (^): Saved to local storage
Local variables (:): Session-only
Built-in variables ($): System-defined
```

### Metadata Cache

**Cache Settings:**
```
Storage: Chrome local storage
Size: ~2-5MB
Expiration: 7 days (objects), 24 hours (fields)
```

**Cache Commands:**
```
:syncmetadata - Refresh object list
:syncobjectfields - Refresh field metadata
:clearcache - Clear entire cache
```

**Cache Behavior:**
- Tier 1: Object names (all objects, expires in 7 days)
- Tier 2: Priority object fields (Account, Contact, Opportunity, etc., expires in 24 hours)
- Tier 3: On-demand object fields (fetched when used, expires in 24 hours)

## Resetting Settings

Clear all extension data to start fresh.

### Partial Reset

**Clear Query History:**
```
1. Open Query Tool
2. Open browser console (F12)
3. Application > Local Storage
4. Delete "queryHistory" key
```

**Clear Templates:**
```
1. Application > Local Storage
2. Delete "savedQueries" key
```

**Clear Variables:**
```
1. Application > Local Storage
2. Delete "globalQueryVariables" key
```

**Clear Cache:**
```
Command: :clearcache
OR
Application > Local Storage > Delete "soqlMetadataCache"
```

### Full Reset

**Remove and Reinstall:**
```
1. chrome://extensions/
2. Find "Salesforce Navigator"
3. Click "Remove"
4. Confirm removal
5. Reinstall extension
6. All settings cleared
```

::: warning Data Loss
Removing the extension deletes all saved templates, variables, and preferences. Export important queries before uninstalling.
:::

## Privacy and Data

### What's Stored

**Locally (Chrome Storage):**
- Query history (last 50 queries)
- Saved query templates
- Global variables
- Metadata cache (object and field names)
- UI preferences (button position, split layout)
- Quickfix errors (last 24 hours)

**Not Stored:**
- Salesforce credentials (uses existing session)
- Record data (fetched on-demand)
- Personal information
- Usage analytics

### Data Sharing

**The extension does NOT:**
- Send data to external servers
- Track usage
- Collect analytics
- Share data with third parties
- Store data in the cloud

**All data stays:**
- In your browser
- On your computer
- Within your Salesforce session

### Security

**Session Management:**
- Uses existing Salesforce session (`sid` cookie)
- No additional authentication required
- Session expires based on Salesforce settings

**API Calls:**
- Direct to Salesforce (no proxy)
- Uses your session bearer token
- Same security as Salesforce UI

**Code:**
- Open source (view on GitHub)
- No obfuscation
- Auditable

## Performance Tuning

### Optimize Metadata Cache

**For Fast Orgs (< 100 custom objects):**
```
:syncmetadata
(Full cache loads quickly)
```

**For Large Orgs (> 500 objects):**
```
Use on-demand field loading
Only cache priority objects
Clear cache periodically: :clearcache
```

### Reduce Storage Usage

**Limit Query History:**
```
Currently: 50 queries
To reduce: Clear history manually via console
```

**Limit Templates:**
```
Review and delete unused templates:
:loadquery (view list)
Delete via sidebar or console
```

**Clear Old Cache:**
```
:clearcache (clears all cached metadata)
Metadata re-fetched on next use
```

## Troubleshooting Configuration

### Settings Not Persisting

**Symptom:** Preferences reset on browser restart

**Cause:** Chrome storage not saving

**Solution:**
```
1. Check Chrome storage quota:
   chrome://settings/content/cookies
2. Ensure "Allow cookies" is enabled
3. Check browser in "Incognito mode" (storage disabled)
4. Try re-installing extension
```

### Shortcuts Not Working

**Symptom:** Keyboard shortcuts don't trigger features

**Solution:**
```
1. Check chrome://extensions/shortcuts
2. Verify shortcuts are assigned
3. Check for conflicts with other extensions
4. Test on different Salesforce page
5. Reload extension: chrome://extensions/ > Reload
```

### Button Position Lost

**Symptom:** Inspector button resets to default position

**Solution:**
```
1. Position is per-profile (not synced)
2. Reposition button and verify it saves
3. Check local storage for "inspectorButtonPosition"
4. If issue persists, clear browser cache and try again
```

### Cache Issues

**Symptom:** Autocomplete suggests wrong fields or objects

**Solution:**
```
:clearcache (clear all cached metadata)
:syncmetadata (refresh object list)
:syncobjectfields (refresh field metadata)
```

## Next Steps

- **[API Permissions](/reference/api-permissions)** - Salesforce API and permissions
- **[Troubleshooting](/reference/troubleshooting)** - Common issues
- **[Keyboard Shortcuts](/reference/keyboard-shortcuts)** - Complete shortcut list

::: tip Configuration Backup
If you have many saved templates and variables, periodically export them to a file for backup. Currently, you'll need to use browser console to access and export Chrome local storage data.
:::
