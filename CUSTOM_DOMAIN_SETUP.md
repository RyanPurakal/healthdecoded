# Custom Domain Setup for GitHub Pages

This guide explains how to set up a custom domain for your Health Decoded GitHub Pages site.

## Current Setup

Your site is currently available at:

- **https://ryanpurakal.github.io/healthdecoded**

## Why Use a Custom Domain?

- **Professional URL**: `healthdecoded.org` instead of `ryanpurakal.github.io/healthdecoded`
- **Branding**: Better matches your organization's identity
- **SEO**: Easier to remember and share

## Prerequisites

1. Own a domain name (purchase from GoDaddy, Namecheap, Google Domains, etc.)
2. Access to your domain's DNS settings

## Setup Steps

### Step 1: Configure Domain in GitHub Repository

1. Go to your repository: https://github.com/RyanPurakal/healthdecoded
2. Click **Settings** → **Pages**
3. Under **Custom domain**, enter your domain (e.g., `healthdecoded.org` or `www.healthdecoded.org`)
4. Click **Save**

### Step 2: Configure DNS Records

You'll need to add DNS records with your domain provider. Choose one:

#### Option A: Apex Domain (e.g., `healthdecoded.org`)

Add **A records** pointing to GitHub's IP addresses:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

#### Option B: Subdomain (e.g., `www.healthdecoded.org`)

Add a **CNAME record**:

```
Type: CNAME
Name: www
Value: ryanpurakal.github.io
```

### Step 3: Verify Domain (Recommended)

Following the [official GitHub documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages):

1. Go to your **GitHub Profile Settings** (not repository settings)
   - Click your profile picture → **Settings**
   - Click **Pages** (under "Code, planning, and automation")
2. Click **Add a domain**
3. Enter your domain and click **Add domain**
4. GitHub will provide a TXT record to add to your DNS:
   - Add the TXT record: `_github-pages-challenge-RyanPurakal.yourdomain.com`
5. Wait for DNS propagation (can take up to 24 hours, usually faster)
6. Verify DNS changes:
   ```bash
   dig _github-pages-challenge-RyanPurakal.yourdomain.com +nostats +nocomments +nocmd TXT
   ```
7. Return to GitHub Pages settings and click **Verify**

### Step 4: Update package.json (if needed)

If you're using a custom domain at the root (apex domain), update `package.json`:

```json
{
  "homepage": "https://healthdecoded.org"
}
```

Then rebuild and redeploy:

```bash
npm run deploy
```

## Domain Verification Benefits

- **Security**: Prevents domain takeover attacks
- **Protection**: Only your repositories can use the verified domain
- **Badge**: Shows "Verified" badge on your profile (for organization sites)

## Common Domain Providers

### GoDaddy

1. Log in → My Products → DNS
2. Add/Edit DNS records

### Namecheap

1. Domain List → Manage → Advanced DNS
2. Add new records

### Google Domains

1. DNS → Custom records
2. Add A or CNAME records

### Cloudflare

1. Select domain → DNS → Records
2. Add A or CNAME records

## Troubleshooting

### Domain not working

- Wait up to 24 hours for DNS propagation
- Check DNS records are correct using: `dig yourdomain.com`
- Verify HTTPS is enabled in GitHub Pages settings

### Mixed content warnings

- GitHub Pages automatically enables HTTPS
- Make sure all assets use HTTPS or relative paths

### Verification fails

- Ensure TXT record is correctly added
- Wait for DNS propagation (can take up to 24 hours)
- Double-check the record name matches exactly

## Next Steps

1. Purchase a domain (if you haven't already)
2. Configure DNS records
3. Add domain in GitHub repository settings
4. Verify domain in GitHub profile settings
5. Wait for DNS propagation
6. Test your custom domain!

## Resources

- [GitHub Pages Custom Domain Docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Verify Custom Domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
- [Manage Custom Domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)


