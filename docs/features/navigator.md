# Navigator Panel

The Navigator Panel is a Spotlight-style command palette that provides instant access to Salesforce metadata and setup pages. Press `Ctrl+Shift+M` to open it from any Lightning page.

<!-- Screenshot placeholder: Navigator Panel -->

## Overview

The Navigator Panel lets you search across:

- 🔄 **Flows** - All active and inactive flows
- 📦 **Objects** - Standard and custom objects (sObjects)
- 🔐 **Permission Sets** - All permission sets in your org
- 👤 **Profiles** - All user profiles
- ⚙️ **Apex Classes** - All Apex classes
- 🔔 **Apex Triggers** - All Apex triggers
- 📄 **Visualforce Pages** - All VF pages
- 🧩 **Visualforce Components** - All VF components
- 🛠️ **Setup Pages** - 50+ frequently accessed setup pages

## Quick Start

1. Press `Ctrl+Shift+M` from any Salesforce Lightning page
2. Start typing to search
3. Use `↑`/`↓` arrow keys to navigate results
4. Press `Enter` to navigate to the selected item
5. Press `Esc` to close the panel

::: tip Fuzzy Search
The search supports fuzzy matching. Type "accobj" to find "Account Object" or "permset" to find "Permission Sets". You don't need to type the full name.
:::

## Search Features

### Basic Search

Simply type in the search box to find items across all categories:

```
Type: account
Results:
  - Account (Object)
  - AccountContactRelation (Object)
  - AccountShare (Object)
```

### Prefix Filtering

Use prefixes to narrow your search to specific types:

| Prefix | Type | Example |
|--------|------|---------|
| `flow>` | Flows only | `flow>approval` |
| `object>` | Objects only | `object>account` |
| `permset>` | Permission Sets only | `permset>admin` |
| `profile>` | Profiles only | `profile>standard` |
| `apex>` | Apex Classes only | `apex>controller` |
| `trigger>` | Apex Triggers only | `trigger>before` |
| `vfpage>` | Visualforce Pages only | `vfpage>custom` |
| `vfcomp>` | Visualforce Components only | `vfcomp>header` |
| `setup>` | Setup Pages only | `setup>users` |

Example:

```
Type: object>contact
Results: Shows only objects matching "contact"
```

### Search by Label or API Name

The Navigator searches both the label (display name) and API name:

```
Type: acc
Results:
  - Account (Label match)
  - Account_Custom__c (API name match)
```

### Result Limiting

- **Before search**: Shows first 10 results per category
- **After typing**: Shows all matching results
- **Debounced search**: 400ms delay to avoid excessive API calls

## Metadata Types

### Flows

View and navigate to all flows in your org:

- Shows **Flow Label** and **Flow API Name**
- Displays **Latest Version Id**
- Opens in **Flow Builder** when selected
- Includes both active and inactive flows

**URL Pattern:**
```
/builder_platform_interaction/flowBuilder.app?flowId={LatestVersionId}
```

### Objects (sObjects)

Search all standard and custom objects:

- Shows **Object Label** (e.g., "Account")
- Shows **Object API Name** (e.g., "Account")
- Displays **Key Prefix** (3-character ID prefix)
- Opens in **Object Manager** → **Details** page
- Includes custom objects (e.g., `MyCustomObject__c`)

**URL Pattern:**
```
/lightning/setup/ObjectManager/{ApiName}/Details/view
```

**Note:** Objects are fetched from the REST API `/services/data/v61.0/sobjects/` endpoint, which returns all sObjects including standard, custom, and platform objects.

### Permission Sets

Find and navigate to permission sets:

- Shows **Permission Set Label**
- Opens in **Permission Set detail page**
- Fetched from Tooling API

**URL Pattern:**
```
/lightning/setup/PermSets/page?address=%2F{PermissionSetId}
```

### Profiles

Search for user profiles:

- Shows **Profile Name**
- Opens in **Profile detail page**
- Fetched from Tooling API

**URL Pattern:**
```
/lightning/setup/EnhancedProfiles/page?address=%2F{ProfileId}
```

### Apex Classes

Find Apex classes quickly:

- Shows **Class Name**
- Opens in **Apex Class detail page**
- Fetched from Tooling API

**URL Pattern:**
```
/lightning/setup/ApexClasses/page?address=%2F{ApexClassId}
```

### Apex Triggers

Navigate to Apex triggers:

- Shows **Trigger Name**
- Opens in **Apex Trigger detail page**
- Fetched from Tooling API

**URL Pattern:**
```
/lightning/setup/ApexTriggers/page?address=%2F{ApexTriggerId}
```

### Visualforce Pages

Access Visualforce pages:

- Shows **Page Name**
- Opens in **Visualforce Page detail page**
- Fetched from Tooling API

**URL Pattern:**
```
/lightning/setup/ApexPages/page?address=%2F{ApexPageId}
```

### Visualforce Components

Find Visualforce components:

- Shows **Component Name**
- Opens in **Visualforce Component detail page**
- Fetched from Tooling API

**URL Pattern:**
```
/lightning/setup/ApexComponents/page?address=%2F{ApexComponentId}
```

### Setup Pages

Quick access to 50+ commonly used setup pages:

#### Users & Permissions
- Users
- Profiles
- Permission Sets
- Permission Set Groups
- Roles
- Public Groups
- Queues

#### Security & Authentication
- Session Settings
- Password Policies
- Login Access Policies
- Identity Verification
- Single Sign-On Settings

#### Data Management
- Data Import Wizard
- Data Export
- Mass Delete Records
- Mass Transfer Records
- Storage Usage

#### Automation
- Flows
- Process Builder
- Workflow Rules
- Approval Processes

#### Customization
- Object Manager
- Schema Builder
- Custom Labels
- Custom Settings
- Custom Metadata Types

#### Platform Tools
- Apex Classes
- Apex Triggers
- Visualforce Pages
- Lightning Components
- Static Resources

#### Integration & APIs
- API
- Remote Site Settings
- CORS
- Named Credentials

#### System Administration
- Company Information
- Fiscal Year
- Business Hours
- Holidays
- Email Administration

#### Development
- Dev Hub
- Sandboxes
- Change Sets
- Deployment Status

And many more! Type `setup>` followed by any keyword to search.

## Technical Details

### API Calls

The Navigator Panel makes the following API calls on load:

1. **Flows**: `GET /services/data/v61.0/tooling/query/?q=SELECT Id, MasterLabel, ApiName, LatestVersionId FROM FlowDefinition`
2. **Objects**: `GET /services/data/v61.0/sobjects/`
3. **Permission Sets**: `GET /services/data/v61.0/tooling/query/?q=SELECT Id, Name, Label FROM PermissionSet`
4. **Profiles**: `GET /services/data/v61.0/tooling/query/?q=SELECT Id, Name FROM Profile`
5. **Apex Classes**: `GET /services/data/v61.0/tooling/query/?q=SELECT Id, Name FROM ApexClass`
6. **Apex Triggers**: `GET /services/data/v61.0/tooling/query/?q=SELECT Id, Name FROM ApexTrigger`
7. **Visualforce Pages**: `GET /services/data/v61.0/tooling/query/?q=SELECT Id, Name FROM ApexPage`
8. **Visualforce Components**: `GET /services/data/v61.0/tooling/query/?q=SELECT Id, Name FROM ApexComponent`

::: info Performance
API calls are made only when the panel opens. Results are cached in memory for the session. Subsequent opens use cached data for instant display.
:::

### Search Algorithm

The search uses case-insensitive substring matching:

```javascript
const matches = items.filter(item =>
  item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
  item.apiName.toLowerCase().includes(searchTerm.toLowerCase())
);
```

For fuzzy matching, it checks if characters appear in order:

```javascript
// "accobj" matches "Account Object"
function fuzzyMatch(searchTerm, text) {
  let searchIndex = 0;
  for (let char of text.toLowerCase()) {
    if (char === searchTerm[searchIndex]?.toLowerCase()) {
      searchIndex++;
    }
  }
  return searchIndex === searchTerm.length;
}
```

### Session Management

The Navigator Panel retrieves your Salesforce session ID:

1. Content script requests session ID from background service worker
2. Background worker retrieves `sid` cookie from `lightning.force.com` domain
3. Session ID is used as Bearer token for API calls
4. Domain is converted to `my.salesforce.com` for API requests

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `Type` | Search across all metadata |
| `↑` | Move up one result |
| `↓` | Move down one result |
| `Enter` | Navigate to selected item |
| `Esc` | Close Navigator Panel |

::: tip Navigation Speed
Use arrow keys for precision or type more characters to narrow results. Both approaches are fast—choose what feels natural.
:::

## Common Use Cases

### Find a Flow

```
1. Press Ctrl+Shift+M
2. Type: flow>approval
3. Press Enter to open in Flow Builder
```

### Navigate to Object Manager

```
1. Press Ctrl+Shift+M
2. Type: object>account
3. Press Enter to open Account in Object Manager
```

### Open Permission Set

```
1. Press Ctrl+Shift+M
2. Type: permset>sales
3. Press Enter to open Permission Set detail page
```

### Access Setup Page

```
1. Press Ctrl+Shift+M
2. Type: setup>users
3. Press Enter to open Users setup page
```

## Visual Design

The Navigator Panel uses the Tokyo Night Moon theme:

- **Background**: `#222436` (main), `#1b1d2b` (header)
- **Search box**: `#2f334d` border, `#c8d3f5` text
- **Selected item**: `#4659e3` blue background
- **Hover**: `#2a2d3d` background
- **Type badge**: `#2a5a9e` background, `#82aaff` text
- **Scrollbar**: `#2d3f76` thumb, `#1b1d2b` track

### Layout

- Width: `600px`
- Max height: `70vh`
- Centered on screen
- Shadow: `0 4px 20px rgba(0,0,0,0.3)`
- Border radius: `8px`

## Troubleshooting

### Panel Doesn't Open

1. Ensure you're on a Salesforce Lightning page
2. Check that the extension is enabled
3. Verify you're logged into Salesforce
4. Try refreshing the page

### No Results Shown

1. Check your internet connection
2. Verify Salesforce API access (API Enabled permission)
3. Check browser console for errors (`F12`)
4. Ensure session hasn't expired

### Slow Search

1. The first search triggers API calls (may take 1-2 seconds)
2. Subsequent searches use cached data (instant)
3. Large orgs may have many metadata items (consider prefix filtering)

## Next Steps

- **[Record Editor](/features/record-editor)** - Edit records with vim keybindings
- **[Inspector Panel](/features/inspector)** - View metadata details
- **[SOQL Query Tool](/features/query-tool)** - Run queries with autocomplete
- **[Keyboard Shortcuts](/reference/keyboard-shortcuts)** - Full command reference
