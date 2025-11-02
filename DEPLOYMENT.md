# Deployment Guide

This guide explains how to deploy the Salesforce Navigator documentation site to GitHub Pages.

## Prerequisites

- Git repository on GitHub
- Node.js 18+ installed
- npm installed

## Deployment Methods

### Method 1: Automatic Deployment (Recommended)

The site is configured to automatically deploy to GitHub Pages when you push to the `main` branch.

#### Setup Steps

1. **Initialize Git Repository (if not already done)**

```bash
cd salesforce-navigator-documentation
git init
git add .
git commit -m "Initial commit: Complete documentation site"
```

2. **Create GitHub Repository**

- Go to [GitHub](https://github.com/new)
- Create a new repository named `salesforce-navigator-documentation`
- Do NOT initialize with README, .gitignore, or license (we already have these)

3. **Push to GitHub**

```bash
git remote add origin https://github.com/YOUR_USERNAME/salesforce-navigator-documentation.git
git branch -M main
git push -u origin main
```

4. **Enable GitHub Pages**

- Go to your repository on GitHub
- Click **Settings** → **Pages**
- Under "Build and deployment":
  - Source: Select **GitHub Actions**
- The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically:
  - Build the VitePress site
  - Deploy to GitHub Pages

5. **Wait for Deployment**

- Go to **Actions** tab in your repository
- Watch the "Deploy VitePress site to Pages" workflow run
- Once complete (green checkmark), your site is live!

6. **Access Your Site**

Your documentation will be available at:
```
https://YOUR_USERNAME.github.io/salesforce-navigator-documentation/
```

### Method 2: Manual Deployment

If you prefer manual control:

1. **Build the site**

```bash
npm run docs:build
```

2. **Deploy to GitHub Pages**

```bash
npm run deploy
```

This uses `gh-pages` package to push the `docs/.vitepress/dist` folder to the `gh-pages` branch.

## Configuration

### Base URL

The site is configured with base URL `/salesforce-navigator-documentation/` in `docs/.vitepress/config.mts`:

```typescript
export default defineConfig({
  base: '/salesforce-navigator-documentation/',
  // ...
})
```

If your repository has a different name, update this value.

### Custom Domain (Optional)

To use a custom domain:

1. Add `CNAME` file to `docs/public/`:

```bash
echo "docs.salesforce-navigator.com" > docs/public/CNAME
```

2. Configure DNS:
   - Add a CNAME record pointing to `YOUR_USERNAME.github.io`
   - Or add A records pointing to GitHub's IPs

3. Update base URL in config:

```typescript
export default defineConfig({
  base: '/',  // Use root for custom domain
  // ...
})
```

4. In GitHub Settings → Pages:
   - Enter your custom domain
   - Enable "Enforce HTTPS"

## Workflow Details

The GitHub Actions workflow (`.github/workflows/deploy.yml`) does the following:

1. **Build Job**:
   - Checks out the repository
   - Sets up Node.js 20
   - Installs dependencies with `npm ci`
   - Builds the site with `npm run docs:build`
   - Uploads the built site as an artifact

2. **Deploy Job**:
   - Downloads the artifact
   - Deploys to GitHub Pages

## Local Testing

Before deploying, test the production build locally:

```bash
# Build the site
npm run docs:build

# Preview the production build
npm run docs:preview
```

The preview server runs on `http://localhost:4173` (or another port if 4173 is in use).

## Updating the Site

To update the documentation:

1. Make changes to markdown files in `docs/`
2. Test locally with `npm run docs:dev`
3. Commit and push to `main` branch:

```bash
git add .
git commit -m "Update documentation"
git push origin main
```

4. GitHub Actions automatically rebuilds and deploys

## Troubleshooting

### Build Fails

1. Check the Actions tab for error logs
2. Verify all markdown links are valid
3. Ensure no broken image references
4. Test build locally: `npm run docs:build`

### Site Not Updating

1. Check Actions tab - deployment may be in progress
2. Hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R)
3. Clear browser cache
4. Wait 2-3 minutes for CDN to update

### 404 Errors on Navigation

- Verify `base` URL in config matches repository name
- Check that links in markdown use correct paths
- Ensure navbar and sidebar links are absolute (start with `/`)

### Styles Not Loading

- Clear browser cache
- Check browser console for 404 errors
- Verify `base` URL configuration
- Check that custom CSS files are in correct location

## Adding Screenshots

To add screenshots (currently placeholders):

1. Take screenshots of the extension features
2. Save as PNG files in `docs/assets/`:
   - `navigator-panel.png`
   - `record-editor.png`
   - `inspector-panel.png`
   - `query-tool.png`
   - `developer-mode.png`
   - `load-unpacked.png`
   - `pin-extension.png`

3. Update markdown files to reference images:

```markdown
![Navigator Panel](../assets/navigator-panel.png)
```

4. Rebuild and deploy

## Performance Tips

1. **Optimize Images**: Use compressed PNG or WebP format
2. **Enable Caching**: GitHub Pages automatically caches static assets
3. **Lazy Loading**: VitePress automatically lazy-loads pages
4. **Search Index**: VitePress generates optimized search index

## Security

- GitHub Actions uses `GITHUB_TOKEN` automatically (no secrets needed)
- All builds run in isolated containers
- Source code is public (adjust if using private repo)

## Monitoring

Monitor your site with:

- **GitHub Actions**: Build and deployment logs
- **GitHub Pages insights**: Visitor statistics (if enabled)
- **Google Analytics**: Add to `docs/.vitepress/config.mts` head section
- **Uptime monitoring**: Use services like UptimeRobot

## Next Steps

After deployment:

1. ✅ Verify site loads correctly
2. ✅ Test all navigation links
3. ✅ Test search functionality
4. ✅ Check mobile responsiveness
5. ✅ Add screenshots (replace placeholders)
6. ✅ Share documentation URL in extension README
7. ✅ Submit to Chrome Web Store with docs link

## Support

If you encounter issues:

1. Check [VitePress docs](https://vitepress.dev/)
2. Review [GitHub Pages docs](https://docs.github.com/en/pages)
3. Check [GitHub Actions docs](https://docs.github.com/en/actions)
4. Open an issue in the repository
