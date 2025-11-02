# Quick Start Guide

Get the Salesforce Navigator documentation site running in 60 seconds.

## Run Locally

```bash
# Navigate to the project
cd salesforce-navigator-documentation

# Install dependencies (if not already done)
npm install

# Start development server
npm run docs:dev
```

Visit `http://localhost:5173` in your browser.

## Build for Production

```bash
# Build the site
npm run docs:build

# Preview production build
npm run docs:preview
```

## Deploy to GitHub Pages

### First Time Setup

1. **Create GitHub repository**:
   - Go to GitHub and create a new repository named `salesforce-navigator-documentation`
   - Don't initialize with README (we already have files)

2. **Push your code**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Complete documentation site"
   git remote add origin https://github.com/YOUR_USERNAME/salesforce-navigator-documentation.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to repository **Settings** → **Pages**
   - Source: Select **GitHub Actions**
   - Wait 2-3 minutes for deployment

4. **Access your site**:
   ```
   https://YOUR_USERNAME.github.io/salesforce-navigator-documentation/
   ```

### Update Site

```bash
# Make changes to markdown files
# Test locally
npm run docs:dev

# Commit and push
git add .
git commit -m "Update documentation"
git push origin main

# GitHub Actions automatically rebuilds and deploys
```

## Project Structure

```
salesforce-navigator-documentation/
├── docs/
│   ├── .vitepress/
│   │   ├── config.mts           # Site configuration
│   │   └── theme/                # Custom Tokyo Night theme
│   ├── guide/                    # Getting started guides
│   ├── features/                 # Feature documentation
│   ├── editor/                   # Record Editor deep dive
│   ├── query/                    # SOQL Query Tool
│   ├── reference/                # Reference docs
│   ├── examples/                 # Examples and tips
│   ├── public/                   # Static assets (logo)
│   └── index.md                  # Homepage
├── package.json
├── README.md
├── DEPLOYMENT.md                 # Full deployment guide
└── QUICKSTART.md                 # This file
```

## What's Included

### 24 Documentation Pages:

**Guide (3 pages)**
- What is Salesforce Navigator?
- Getting Started
- Installation

**Features (4 pages)**
- Navigator Panel
- Record Editor
- Inspector Panel
- SOQL Query Tool

**Record Editor Deep Dive (5 pages)**
- Navigation Commands
- Editing Commands
- Command Mode
- Field Types
- Advanced Features

**Query Tool (4 pages)**
- Query Basics
- Query Results
- Variables & Templates
- Export & Share

**Reference (4 pages)**
- Keyboard Shortcuts
- Configuration
- API & Permissions
- Troubleshooting

**Examples (3 pages)**
- Common Workflows
- SOQL Query Examples
- Tips & Tricks

### Features:

- ✅ **VitePress** - Fast, modern static site generator
- ✅ **Tokyo Night Moon Theme** - Matching extension design
- ✅ **Built-in Search** - Fast client-side search
- ✅ **Responsive Design** - Mobile, tablet, desktop
- ✅ **Dark Mode** - Beautiful dark theme by default
- ✅ **Custom Styling** - Matching extension colors and fonts
- ✅ **GitHub Pages Ready** - Automatic deployment via GitHub Actions
- ✅ **SEO Optimized** - Meta tags, sitemap, structured headings
- ✅ **Fast Performance** - Optimized builds, lazy loading
- ✅ **Accessible** - Keyboard navigation, ARIA labels

## Customization

### Change Base URL

If your repository has a different name, update `docs/.vitepress/config.mts`:

```typescript
export default defineConfig({
  base: '/YOUR-REPO-NAME/',  // Change this
  // ...
})
```

### Add Screenshots

Replace placeholder comments with actual images:

1. Add PNG files to `docs/assets/`
2. Update markdown files:
   ```markdown
   ![Navigator Panel](../assets/navigator-panel.png)
   ```

### Customize Theme

Edit `docs/.vitepress/theme/custom.css` to change:
- Colors
- Fonts
- Spacing
- Animations

### Update Navigation

Edit `docs/.vitepress/config.mts`:

```typescript
themeConfig: {
  nav: [...],      // Top navigation
  sidebar: [...]   // Sidebar navigation
}
```

## Common Commands

```bash
# Development
npm run docs:dev          # Start dev server
npm run docs:build        # Build for production
npm run docs:preview      # Preview production build

# Deployment
npm run deploy            # Manual deploy to GitHub Pages
git push origin main      # Automatic deploy (GitHub Actions)
```

## Next Steps

1. ✅ **Test locally**: `npm run docs:dev`
2. ✅ **Review content**: Check all documentation pages
3. ✅ **Add screenshots**: Replace placeholder comments
4. ✅ **Deploy to GitHub Pages**: Follow steps above
5. ✅ **Share the link**: Add to extension README
6. ✅ **Monitor builds**: Check GitHub Actions tab

## Need Help?

- **VitePress docs**: https://vitepress.dev/
- **GitHub Pages**: https://docs.github.com/en/pages
- **Full deployment guide**: See `DEPLOYMENT.md`
- **Project README**: See `README.md`

## Congratulations! 🎉

You now have a comprehensive, beautiful documentation site for Salesforce Navigator!

The site includes:
- Complete feature documentation
- Keyboard shortcut references
- Real-world examples
- Troubleshooting guides
- Beautiful Tokyo Night Moon theme
- Fast search functionality
- Mobile-responsive design
- Automatic GitHub Pages deployment

Happy documenting! 📚
