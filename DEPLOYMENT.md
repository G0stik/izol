# Production Deployment Guide

This guide will help you deploy your Izol systém website to production.

## Step 1: Build the Production Version

First, create an optimized production build:

```bash
npm run build
```

or if you're using pnpm:

```bash
pnpm build
```

This will:
- Type-check your TypeScript code
- Build and optimize your React app
- Create a `dist` folder with all production-ready files

## Step 2: Test the Production Build Locally

Before deploying, test the production build locally:

```bash
npm run preview
```

or

```bash
pnpm preview
```

This serves the built files so you can verify everything works correctly.

## Step 3: Choose a Deployment Platform

### Option A: Vercel (Recommended - Easiest)

1. **Install Vercel CLI** (optional, or use web interface):
   ```bash
   npm i -g vercel
   ```

2. **Deploy from your project folder**:
   ```bash
   vercel
   ```
   Follow the prompts. Vercel will automatically detect Vite and configure everything.

3. **Or use the web interface**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your repository
   - Vercel auto-detects Vite settings

**Benefits:**
- Free tier available
- Automatic HTTPS
- Global CDN
- Automatic deployments on git push
- Custom domain support

### Option B: Netlify

1. **Install Netlify CLI**:
   ```bash
   npm i -g netlify-cli
   ```

2. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

3. **Or use web interface**:
   - Go to [netlify.com](https://netlify.com)
   - Sign up and connect your Git repository
   - Build command: `npm run build`
   - Publish directory: `dist`

**Note:** For React Router to work on Netlify, create `public/_redirects` file:
```
/*    /index.html   200
```

### Option C: GitHub Pages

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update `package.json`**:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     },
     "homepage": "https://yourusername.github.io/izol"
   }
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

4. **Update `vite.config.ts`** to set base path:
   ```typescript
   export default defineConfig({
     base: '/izol/',  // Your repository name
     // ... rest of config
   })
   ```

### Option D: Traditional Web Hosting (cPanel, FTP, etc.)

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Upload the `dist` folder contents** to your web server's public directory (usually `public_html` or `www`)

3. **Configure your server**:
   - Ensure your server supports client-side routing
   - Most hosts require an `.htaccess` file for Apache servers

   Create `dist/.htaccess`:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

4. **Upload everything** from `dist` folder to your server

## Important Configuration Notes

### For React Router (Client-Side Routing)

Your site uses React Router, which requires special server configuration:

- **All routes must serve `index.html`** - When users visit `/about` directly or refresh the page, the server should serve your React app, not a 404
- **This is automatically handled by:** Vercel, Netlify (with `_redirects` file)
- **For traditional hosting:** Use the `.htaccess` file mentioned above

### Environment Variables

If you need environment variables:
1. Create `.env.production` file
2. Prefix variables with `VITE_` (e.g., `VITE_API_URL=https://api.example.com`)
3. Access in code: `import.meta.env.VITE_API_URL`

### Custom Domain

After deployment:
1. Get your domain name
2. Add DNS records as instructed by your hosting provider
3. Update DNS settings (usually A record or CNAME)

## Quick Checklist

- [ ] Build the project (`npm run build`)
- [ ] Test locally (`npm run preview`)
- [ ] Choose deployment platform
- [ ] Configure routing (for React Router)
- [ ] Deploy
- [ ] Test all pages and navigation
- [ ] Set up custom domain (if needed)
- [ ] Enable HTTPS (usually automatic)
- [ ] Test on mobile devices

## Recommended: Vercel

**Why Vercel?**
- ✅ Zero configuration needed
- ✅ Automatic deployments
- ✅ Free HTTPS
- ✅ Global CDN
- ✅ Best performance
- ✅ Easy custom domains

Just run `vercel` or connect your GitHub repo through their website!

---

## Troubleshooting

**404 errors on direct page visits:**
- Ensure server is configured to serve `index.html` for all routes
- Check your hosting provider's documentation for SPA routing support

**Images not loading:**
- Verify images in `public` folder are referenced with absolute paths starting with `/`
- Check that `public` folder contents are included in build

**Build errors:**
- Run `npm run build` and fix TypeScript/linting errors
- Ensure all dependencies are installed (`npm install`)

