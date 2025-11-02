# Installation

Learn how to install Salesforce Navigator on your Chrome or Chromium-based browser.

## Prerequisites

Before installing, ensure you have:

- ✅ **Google Chrome**, **Microsoft Edge**, **Brave**, or another Chromium-based browser
- ✅ **Salesforce Lightning Experience** access (Classic is not supported)
- ✅ **Active Salesforce session** (you must be logged in)

::: warning Salesforce Classic Not Supported
Salesforce Navigator is built for **Lightning Experience only**. Classic pages are not supported. If your org uses Classic, consider migrating to Lightning for the best experience.
:::

## Installation Methods

### Method 1: Chrome Web Store (Recommended)

::: info Coming Soon
The extension will soon be available on the Chrome Web Store for easy one-click installation. Check back soon or install manually using Method 2.
:::

1. Visit the [Chrome Web Store page](#) (link coming soon)
2. Click **Add to Chrome**
3. Click **Add Extension** in the confirmation dialog
4. The extension icon appears in your browser toolbar

### Method 2: Manual Installation (Developer Mode)

For early access or development purposes:

#### Step 1: Download Source Code

Clone the repository or download the ZIP:

```bash
git clone https://github.com/denysderhachov/salesforce-navigator.git
cd salesforce-navigator
```

Or download ZIP:
1. Go to [GitHub Repository](https://github.com/denysderhachov/salesforce-navigator)
2. Click **Code** → **Download ZIP**
3. Extract the ZIP file to a folder

#### Step 2: Enable Developer Mode

1. Open Chrome and navigate to `chrome://extensions/`
2. Toggle **Developer mode** in the top-right corner
3. The toggle should be blue/on

<!-- Screenshot placeholder: Enable Developer Mode -->

#### Step 3: Load Unpacked Extension

1. Click **Load unpacked** button
2. Navigate to the `salesforce-navigator` folder
3. Select the folder (not individual files)
4. Click **Select Folder** or **Open**

The extension will appear in your extensions list.

<!-- Screenshot placeholder: Load Unpacked -->

#### Step 4: Pin Extension (Optional)

1. Click the extensions puzzle icon in your toolbar
2. Find **Salesforce Navigator** in the list
3. Click the pin icon to keep it visible

<!-- Screenshot placeholder: Pin Extension -->

## Verify Installation

After installation:

1. Navigate to any Salesforce Lightning page
2. Press `Ctrl+Shift+M` (or `Cmd+Shift+M` on Mac)
3. The Navigator Panel should appear

If the panel opens, installation is successful! 🎉

## Permissions Explained

Salesforce Navigator requests the following permissions:

| Permission | Reason |
|------------|--------|
| `activeTab` | Access the current Salesforce tab to inject UI elements |
| `storage` | Store user preferences (button position, settings) |
| `cookies` | Retrieve Salesforce session ID (`sid` cookie) for API authentication |
| `scripting` | Inject content scripts into Salesforce pages |
| `tabs` | Open Record Editor and Query Tool in new tabs |
| `windows` | Support "Login as User" in incognito windows |

::: info Privacy & Security
Salesforce Navigator **does not** send your data to external servers. All API calls go directly to your Salesforce instance. The extension is open source—[review the code](https://github.com/denysderhachov/salesforce-navigator) anytime.
:::

### Host Permissions

The extension requests access to these Salesforce domains:

- `https://*.salesforce.com/`
- `https://*.lightning.force.com/`
- `https://*.my.salesforce-setup.com/`

This allows the extension to work across all Salesforce orgs and instances.

## Keyboard Shortcuts

After installation, verify that keyboard shortcuts are configured:

1. Navigate to `chrome://extensions/shortcuts`
2. Find **Salesforce Navigator**
3. Verify shortcuts are set:

| Command | Default Shortcut | Description |
|---------|-----------------|-------------|
| Open Navigator Panel | `Ctrl+Shift+M` | Open metadata search |
| Edit Current Object | `Ctrl+Shift+E` | Open record editor |
| Open Query Tool | `Ctrl+Shift+Q` | Open SOQL query tool |
| Toggle Inspector | `Ctrl+Shift+I` | Toggle inspector panel |

::: tip Customize Shortcuts
You can change shortcuts on the `chrome://extensions/shortcuts` page. Click the pencil icon next to any command and press your preferred key combination.
:::

### Mac Users

On macOS, use `Cmd` instead of `Ctrl`:

- `Cmd+Shift+M` - Navigator Panel
- `Cmd+Shift+E` - Record Editor
- `Cmd+Shift+Q` - Query Tool
- `Cmd+Shift+I` - Inspector Panel

## Troubleshooting Installation

### Extension Not Appearing

1. Verify you're in **Developer mode** (`chrome://extensions/`)
2. Click **Load unpacked** again and select the folder
3. Check browser console for errors (`Ctrl+Shift+J`)

### Shortcuts Not Working

1. Check `chrome://extensions/shortcuts`
2. Ensure shortcuts are not conflicting with other extensions
3. Try customizing shortcuts to different key combinations

### Permission Errors

If you see permission errors:

1. Navigate to `chrome://extensions/`
2. Find **Salesforce Navigator**
3. Click **Details**
4. Scroll to **Site access**
5. Ensure it's set to "On all sites" or "On specific sites" (Salesforce domains)

### Session ID Not Retrieved

If features don't work:

1. Ensure you're **logged into Salesforce**
2. Refresh the Salesforce page
3. Try logging out and back in
4. Check that cookies are enabled in your browser

## Updating the Extension

### Chrome Web Store Version

Extensions from the Chrome Web Store update automatically. You'll receive updates within a few hours of release.

### Manual Installation Version

To update a manually installed extension:

1. Pull latest code: `git pull origin main`
2. Navigate to `chrome://extensions/`
3. Click the **reload icon** on the Salesforce Navigator card
4. Refresh any open Salesforce tabs

::: warning Manual Updates Required
If you installed manually, you must update manually. Consider installing from the Chrome Web Store once available for automatic updates.
:::

## Uninstalling

To remove the extension:

1. Navigate to `chrome://extensions/`
2. Find **Salesforce Navigator**
3. Click **Remove**
4. Confirm in the dialog

All stored preferences will be deleted.

## Multi-Org Setup

Salesforce Navigator works across multiple Salesforce orgs automatically:

1. Log into different orgs in different tabs or browser profiles
2. The extension retrieves the session ID for each tab individually
3. No additional configuration needed

::: tip Browser Profiles
For managing multiple orgs, consider using [Chrome Profiles](https://support.google.com/chrome/answer/2364824). Each profile has its own cookies and sessions, preventing conflicts.
:::

## Next Steps

Now that you've installed the extension, you're ready to start using it!

- **[Getting Started Guide](/guide/getting-started)** - Learn the basics
- **[Navigator Panel](/features/navigator)** - Search metadata and setup pages
- **[Record Editor](/features/record-editor)** - Edit records with vim keybindings
- **[Keyboard Shortcuts](/reference/keyboard-shortcuts)** - Master all commands

::: tip Need Help?
If you encounter issues during installation, please [open an issue](https://github.com/denysderhachov/salesforce-navigator/issues) on GitHub. Include your browser version, OS, and any error messages.
:::
