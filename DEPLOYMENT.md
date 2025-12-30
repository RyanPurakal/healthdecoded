# Deployment Guide for Health Decoded

This guide covers deployment options for both the current React frontend and future full-stack application.

## Current Setup (React Frontend Only)

Your app is built with Create React App and uses React Router for client-side routing.

### Build Command

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

---

## Deployment Options

### Option 1: Vercel (Recommended for React Apps) ⭐

**Best for:** React frontends, automatic deployments, free tier

**Steps:**

1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel` (in your project directory)
4. Follow prompts - Vercel auto-detects React apps

**Or use GitHub integration:**

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel automatically builds and deploys on every push

**Pros:**

- Free tier with generous limits
- Automatic HTTPS
- Global CDN
- Automatic deployments from Git
- Perfect for React Router (handles client-side routing)

**Configuration needed:**
Create `vercel.json` in root:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

### Option 2: Netlify

**Best for:** React apps, static sites, form handling

**Steps:**

1. Install Netlify CLI: `npm i -g netlify-cli`
2. Build: `npm run build`
3. Deploy: `netlify deploy --prod --dir=build`

**Or use drag-and-drop:**

1. Run `npm run build`
2. Go to [app.netlify.com](https://app.netlify.com)
3. Drag and drop the `build` folder

**Or use GitHub integration:**

1. Connect GitHub repo to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`

**Configuration needed:**
Create `netlify.toml` in root:

```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### Option 3: GitHub Pages

**Best for:** Free hosting, simple static sites

**Steps:**

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to `package.json`:

```json
{
  "homepage": "https://yourusername.github.io/healthdecoded",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

3. Deploy: `npm run deploy`

**Note:** Requires updating `homepage` field and using HashRouter instead of BrowserRouter for React Router.

---

### Option 4: AWS Amplify

**Best for:** AWS ecosystem integration

**Steps:**

1. Push code to GitHub/GitLab/Bitbucket
2. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
3. Connect repository
4. Set build settings:
   - Build command: `npm run build`
   - Output directory: `build`

---

### Option 5: Firebase Hosting

**Best for:** Google ecosystem, easy setup

**Steps:**

1. Install Firebase CLI: `npm i -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

**Configuration:**

- Public directory: `build`
- Single-page app: Yes (for React Router)

---

## Full-Stack Deployment Options

When you add a backend, here are recommended architectures:

### Architecture 1: Separate Frontend + Backend

**Frontend:** Deploy React app to Vercel/Netlify
**Backend:** Deploy API to:

- **Railway** (easy Node.js/Express deployment)
- **Render** (free tier, auto-deploys)
- **Heroku** (classic, but paid now)
- **AWS Elastic Beanstalk**
- **DigitalOcean App Platform**

**Database:**

- **Supabase** (PostgreSQL, free tier)
- **MongoDB Atlas** (free tier)
- **PlanetScale** (MySQL, free tier)
- **Railway** (PostgreSQL, included)

**Example Stack:**

- Frontend: Vercel (React)
- Backend: Railway (Node.js/Express)
- Database: Supabase (PostgreSQL)

---

### Architecture 2: Full-Stack on One Platform

**Vercel (with Serverless Functions):**

- Frontend: React app
- Backend: API routes in `/api` folder
- Database: External (Supabase, MongoDB Atlas)

**Render:**

- Frontend: Static site
- Backend: Web service
- Database: PostgreSQL (included)

**Railway:**

- Full-stack deployment
- PostgreSQL included
- One-click deploy

---

## Recommended Full-Stack Setup

### Option A: Vercel + Supabase (Recommended)

**Frontend:** Vercel
**Backend:** Vercel Serverless Functions or separate Node.js API
**Database:** Supabase (PostgreSQL)

**Steps:**

1. Deploy frontend to Vercel
2. Create Supabase project
3. Use Supabase client in React app
4. Add API routes in Vercel if needed

---

### Option B: Railway (All-in-One)

**Everything:** Railway

- Frontend: Static site
- Backend: Node.js service
- Database: PostgreSQL (included)

**Steps:**

1. Create Railway account
2. Create new project
3. Add PostgreSQL service
4. Add web service for backend
5. Add static site for frontend

---

## Environment Variables

For production, set these in your deployment platform:

```env
REACT_APP_API_URL=https://your-api-url.com
REACT_APP_SUPABASE_URL=your-supabase-url
REACT_APP_SUPABASE_KEY=your-supabase-key
```

**Important:** In Create React App, environment variables must start with `REACT_APP_`

---

## Custom Domain Setup

Most platforms support custom domains:

1. **Vercel/Netlify:** Add domain in dashboard, update DNS
2. **Railway:** Add domain in project settings
3. **Render:** Add custom domain in service settings

DNS records needed:

- A record or CNAME pointing to platform

---

## CI/CD Setup

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: "18"
      - run: npm install
      - run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## Quick Start: Deploy Now

### Fastest Option (Vercel):

1. **Push to GitHub:**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/healthdecoded.git
git push -u origin main
```

2. **Create vercel.json:**

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

3. **Deploy:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repo
   - Deploy!

Your site will be live at `https://healthdecoded.vercel.app`

---

## Next Steps for Full-Stack

1. **Choose backend framework:**

   - Node.js/Express
   - Next.js (React framework with API routes)
   - Python/FastAPI
   - Go/Gin

2. **Set up database:**

   - Create Supabase/MongoDB Atlas account
   - Design schema
   - Set up connection

3. **Update React app:**

   - Add API client
   - Create service layer
   - Add environment variables

4. **Deploy backend:**
   - Choose platform (Railway, Render, etc.)
   - Set environment variables
   - Deploy

---

## Troubleshooting

### React Router 404 Errors

- Ensure your platform supports client-side routing
- Add redirect rules (see Vercel/Netlify configs above)

### Build Failures

- Check Node version matches deployment platform
- Ensure all dependencies are in `package.json`
- Check for environment variable issues

### CORS Issues

- Configure CORS on backend
- Use proxy in development
- Set proper headers in production

---

## Resources

- [Vercel Deployment Docs](https://vercel.com/docs)
- [Netlify Deployment Docs](https://docs.netlify.com/)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)
- [Supabase Docs](https://supabase.com/docs)
- [Railway Docs](https://docs.railway.app/)

