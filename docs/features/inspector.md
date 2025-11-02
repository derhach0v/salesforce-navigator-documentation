# Inspector Panel

The Inspector Panel provides instant access to Salesforce metadata from anywhere in your org. View object definitions, user details, and org information without navigating away from your current page.

<!-- Screenshot placeholder: Inspector Panel -->

## Overview

The Inspector Panel is a floating popup that displays metadata in three organized tabs: Objects, Users, and Org. It works on list views, setup pages, record pages—anywhere in Salesforce Lightning.

**Key Benefits:**
- **Always accessible** - Works on any Salesforce page
- **Keyboard navigation** - vim-style `j`/`k`/`h`/`l` controls
- **Quick copy** - Press `y` to copy any value
- **Draggable** - Position wherever you want on screen
- **Searchable** - Find objects and users instantly
- **Context-aware** - Shows relevant data based on current page

::: tip Quick Access
Press `Ctrl+Shift+I` from any Salesforce page to toggle the Inspector Panel.
:::

## Three Tabs

### Objects Tab

Displays all standard and custom objects in your org.

**What You See:**
- Object Label (e.g., "Account", "Custom_Object__c")
- Object API Name
- Key Prefix (3-character ID prefix)
- Total count of objects

**Features:**
- Search objects by label or API name
- Click any object to open in Object Manager
- Navigate with `j`/`k` keys
- Copy API name with `y`

**Example:**

```
Objects (842)
Search: account

Results:
  Account
  AccountContactRelation
  AccountHistory
  AccountShare
  Account_Custom__c
```

**Search Tips:**
- Type partial names: "acc" finds "Account"
- Search API names: "custom__c" finds custom objects
- Case-insensitive matching
- Press `Esc` to clear search

### Users Tab

Shows all users in your Salesforce org with detailed information.

**What You See:**
- Username
- Full Name
- Email
- Profile
- Role
- Active status
- Login As button (for admins)

**Features:**
- Search by username, name, or email
- Click to view user detail page
- "Login As" feature for testing (requires permission)
- Navigate with `j`/`k` keys
- Copy user email or ID with `y`

**Example:**

```
Users (245)
Search: john

Results:
  john.doe@company.com
  John Doe
  System Administrator
  [Login As] button
```

**Login As Feature:**

If you have the "Login As" permission:
1. Navigate to a user in the Users tab
2. Click the "Login As" button
3. Opens Salesforce as that user in new tab
4. Great for testing permissions and troubleshooting

::: warning Admin Permission Required
The "Login As" feature requires the "View All Users" and "Manage Users" permissions. If you don't have these, the button won't appear.
:::

### Org Tab

Displays organization-level metadata and system information.

**What You See:**
- Org Name
- Org ID (18-character)
- Instance Name (e.g., "NA1", "CS42")
- API Version
- Edition (Enterprise, Unlimited, Developer, etc.)
- Features Enabled (e.g., Multi-Currency, Chatter)
- Limits and Usage:
  - API Calls (used/total)
  - Data Storage (used/total)
  - File Storage (used/total)

**Features:**
- Copy Org ID with `y`
- View API limits at a glance
- Check org edition and features
- Monitor storage usage

**Example:**

```
Organization Info
Name: Acme Corporation
Org ID: 00D5g000001AbCdEAK
Instance: NA173
Edition: Enterprise
API Version: 61.0

API Limits:
  Used: 1,245 / 15,000 (8%)

Storage:
  Data: 2.4 GB / 10 GB (24%)
  File: 1.8 GB / 10 GB (18%)
```

## Search Functionality

The Inspector Panel provides powerful search in Objects and Users tabs.

### Objects Search

Search by object label or API name:

```
Type: contact
Results:
  - Contact (standard object)
  - ContactHistory
  - ContactShare
  - Contact_Custom__c (custom object)
```

Prefix search:
```
Type: custom__c
Results: All custom objects
```

### Users Search

Search across multiple fields:
- Username
- First Name
- Last Name
- Email
- Profile

```
Type: admin
Results:
  - Users with "admin" in username
  - Users with System Administrator profile
  - Users named "Admin"
```

### Search Commands

| Key | Action |
|-----|--------|
| `Type` | Filter results by search term |
| `Esc` | Clear search and show all results |
| `j` / `k` | Navigate filtered results |
| `Enter` | Open selected item |

::: tip Fuzzy Matching
Search supports partial matches. Type "stduser" to find "Standard User" profile or "acc__c" to find custom Account objects.
:::

## Keyboard Navigation

The Inspector Panel is fully keyboard-navigable with vim-style keybindings.

### Basic Navigation

| Key | Action | Example |
|-----|--------|---------|
| `j` | Move down one item | Next object/user in list |
| `k` | Move up one item | Previous object/user in list |
| `h` | Switch to left tab | Objects → (wraps to Org) |
| `l` | Switch to right tab | Objects → Users → Org |
| `y` | Copy selected value | Yank to clipboard |
| `/` | Focus search input | Start typing to search |
| `Esc` | Close panel or clear search | Exit or reset |

### Tab Navigation

```
Press h/l to cycle through tabs:
Objects ← → Users ← → Org ← → Objects (wraps)
```

### Scrolling

The list automatically scrolls to keep the selected item visible:
- Selected item highlighted in blue
- Scrolls smoothly as you navigate
- Scroll position persists when switching tabs

**Example Navigation Session:**

```
1. Press Ctrl+Shift+I (open panel)
2. Press / (focus search)
3. Type "account" (filter objects)
4. Press Esc (exit search, focus list)
5. Press j j j (move down 3 items)
6. Press y (copy API name)
7. Press l (switch to Users tab)
8. Press k k (move up 2 items)
9. Press Esc (close panel)
```

## Copy Functionality

Press `y` to copy values to clipboard (vim's "yank" command).

### What Gets Copied

**Objects Tab:**
- Copies the selected object's **API Name**
- Example: `Account`, `Custom_Object__c`

**Users Tab:**
- Copies the selected user's **Username**
- Example: `john.doe@company.com`

**Org Tab:**
- Copies the **Org ID**
- Example: `00D5g000001AbCdEAK`

**Visual Feedback:**

After pressing `y`, a notification appears:
```
✓ Copied to clipboard: Account
```

::: tip Quick API Names
Need an object's API name for SOQL? Open Inspector, search for the object, and press `y` to copy it instantly.
:::

## Draggable Button

The Inspector Panel includes a draggable floating button for quick access.

**Features:**
- Appears as a small circular button
- Drag to any position on screen
- Click to toggle panel open/close
- Position persists across pages
- Semi-transparent when not hovered

**Usage:**

1. The button appears in the bottom-right corner
2. Click and drag to move it
3. Click to open/close the Inspector Panel
4. Position is saved in browser storage

**Customization:**

The button can be positioned anywhere:
- Bottom-right (default)
- Bottom-left (out of the way)
- Top-right (near other tools)
- Anywhere that suits your workflow

## Works Everywhere

The Inspector Panel functions on all Salesforce Lightning pages:

### List Views

View objects while browsing list views:
```
On Accounts list view:
  - Open Inspector
  - Switch to Objects tab
  - Search for Account
  - View Account metadata
```

### Setup Pages

Access metadata from setup pages:
```
On Users setup page:
  - Open Inspector
  - Switch to Users tab
  - Search for specific user
  - Click "Login As" to test permissions
```

### Record Pages

Check org info from any record:
```
On Contact record:
  - Open Inspector
  - Switch to Org tab
  - View API limits
  - Copy Org ID
```

### Home Page

Available even on the home page:
```
On Lightning Home:
  - Open Inspector
  - Works the same as anywhere else
```

::: info Universal Access
The Inspector Panel is injected on all `lightning.force.com` pages, making it universally accessible throughout Salesforce.
:::

## Common Use Cases

### Find Object API Name

```
1. Press Ctrl+Shift+I
2. Press / to search
3. Type object name
4. Press Esc to focus list
5. Press y to copy API name
```

### Login As Another User

```
1. Press Ctrl+Shift+I
2. Press l to switch to Users tab
3. Type username in search
4. Press Esc to focus list
5. Navigate to user with j/k
6. Click "Login As" button
```

### Check API Limit Usage

```
1. Press Ctrl+Shift+I
2. Press l l to switch to Org tab
3. View API calls used/remaining
4. Check data storage usage
```

### Copy Org ID

```
1. Press Ctrl+Shift+I
2. Press l l to switch to Org tab
3. Press y to copy Org ID
4. Paste into support ticket or documentation
```

### Browse All Custom Objects

```
1. Press Ctrl+Shift+I
2. Press / to search
3. Type "__c"
4. View all custom objects
5. Navigate with j/k
```

## Technical Details

### Data Sources

The Inspector Panel fetches data from:

**Objects:**
```
GET /services/data/v61.0/sobjects/
```
Returns all sObjects (standard, custom, platform)

**Users:**
```
GET /services/data/v61.0/query/?q=SELECT Id, Username, Name, Email, Profile.Name, UserRole.Name, IsActive FROM User
```
Returns all users with related profile and role

**Org:**
```
GET /services/data/v61.0/query/?q=SELECT OrganizationType, Name, InstanceName FROM Organization
GET /services/data/v61.0/limits/
```
Returns org details and API limits

### Caching

Data is cached for the session:
- Objects: Cached until page refresh
- Users: Cached until page refresh
- Org: Cached until page refresh

Subsequent opens use cached data for instant display.

### Performance

- Initial load: ~500ms (3 API calls)
- Subsequent opens: Instant (cached)
- Search: Real-time filtering (<10ms)
- Navigation: Instant (no API calls)

## Visual Design

The Inspector Panel uses the Tokyo Night Moon theme:

**Colors:**
- Background: `#222436`
- Selected item: `#4659e3` (blue)
- Hover: `#2a2d3d` (dark gray)
- Text: `#c8d3f5` (light)
- Search border: `#2f334d`
- Tab active: `#4659e3` (blue)

**Layout:**
- Width: `400px`
- Max height: `600px`
- Position: Fixed (draggable)
- Shadow: `0 4px 20px rgba(0,0,0,0.3)`
- Border radius: `8px`

## Keyboard Shortcuts Reference

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+I` | Toggle Inspector Panel |
| `j` | Move down |
| `k` | Move up |
| `h` | Previous tab |
| `l` | Next tab |
| `y` | Copy value |
| `/` | Focus search |
| `Esc` | Close panel or clear search |
| `Enter` | Open selected item |

## Troubleshooting

### Panel Doesn't Open

1. Verify you're on a Salesforce Lightning page
2. Check the extension is enabled
3. Refresh the page and try again
4. Check browser console for errors (`F12`)

### No Objects Showing

1. Check API access permissions
2. Verify session hasn't expired
3. Check browser console for API errors
4. Try refreshing the page

### Login As Button Missing

1. Verify you have "Manage Users" permission
2. Check "View All Users" permission
3. Some users may not allow Login As (security policies)
4. Check if Single Sign-On is blocking the feature

### Search Not Working

1. Clear search with `Esc` and try again
2. Check spelling (search is case-insensitive)
3. Try searching API name instead of label
4. Ensure you're typing in the search input

### Can't Copy Values

1. Verify you're focused on the list (not search input)
2. Press `Esc` to focus the list
3. Navigate to item with `j`/`k`
4. Press `y` to copy
5. Check clipboard permissions in browser

## Next Steps

- **[Navigator Panel](/features/navigator)** - Search and navigate metadata
- **[Record Editor](/features/record-editor)** - Edit records with vim keybindings
- **[SOQL Query Tool](/features/query-tool)** - Run queries with autocomplete
- **[Keyboard Shortcuts](/reference/keyboard-shortcuts)** - Complete shortcut reference

::: tip Power User Tip
Keep the Inspector Panel open while working in Salesforce. Position the floating button in a convenient spot and toggle it with `Ctrl+Shift+I` whenever you need to check metadata, copy an API name, or login as another user.
:::
