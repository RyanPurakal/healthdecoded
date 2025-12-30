# GitHub Pages Deployment Setup

This guide is for deploying a **project site** (repository named `healthdecoded`).

Your site will be available at: `https://yourusername.github.io/healthdecoded`

> **Note:** If you want a user site at `username.github.io`, you'd need to rename your repository to `username.github.io`. This setup is for a project site, which is perfect for the Health Decoded website.

## Quick Setup Steps

### 1. Update Repository URL

Edit `package.json` and replace `yourusername` with your actual GitHub username and `healthdecoded` with your repository name:

```json
"homepage": "https://yourusername.github.io/healthdecoded"
```

**Examples:**

- If your repo is `https://github.com/ryanpurakal/healthdecoded`, use:
  ```json
  "homepage": "https://ryanpurakal.github.io/healthdecoded"
  ```
- If your repo is `https://github.com/ryanpurakal/health-decoded`, use:
  ```json
  "homepage": "https://ryanpurakal.github.io/health-decoded"
  ```

### 2. Install gh-pages

```bash
npm install --save-dev gh-pages
```

### 3. Initialize Git (if not already done)

```bash
git init
git add .
git commit -m "Initial commit"
```

### 4. Connect to GitHub

```bash
git remote add origin https://github.com/yourusername/healthdecoded.git
git branch -M main
git push -u origin main
```

### 5. Deploy to GitHub Pages

```bash
npm run deploy
```

This will:

1. Build your app (`npm run build`)
2. Deploy to the `gh-pages` branch on GitHub
3. Make your site available at `https://yourusername.github.io/healthdecoded`

### 6. Enable GitHub Pages

Following the [official GitHub Pages documentation](https://docs.github.com/en/pages/quickstart):

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (under "Code and automation" in sidebar)
3. Under **Build and deployment** → **Source**, select **Deploy from a branch**
4. Under **Branch**, select the `gh-pages` branch
5. Click **Save**

Your site should be live at `https://yourusername.github.io/healthdecoded` within a few minutes!

> **Note:** It can take up to 10 minutes for changes to publish after deployment.

## Updating Your Site

Every time you make changes:

```bash
git add .
git commit -m "Your commit message"
git push
npm run deploy
```

## How It Works

- The `404.html` file handles React Router client-side routing
- GitHub Pages serves your app from the `gh-pages` branch
- The `homepage` field in `package.json` ensures assets load correctly
- BrowserRouter will work correctly with the 404.html redirect

## Troubleshooting

### Routes not working (404 errors)

- Make sure `404.html` is in your `public/` folder
- Verify the `homepage` field in `package.json` matches your GitHub Pages URL

### Assets not loading

- Check that the `homepage` field in `package.json` is correct
- Ensure assets are referenced with relative paths

### Build fails

- Make sure `gh-pages` is installed: `npm install --save-dev gh-pages`
- Check that all dependencies are installed: `npm install`

## Your Site URL

After deployment, your site will be available at:

```
https://yourusername.github.io/healthdecoded
```

Replace `yourusername` and `healthdecoded` with your actual GitHub username and repository name.
