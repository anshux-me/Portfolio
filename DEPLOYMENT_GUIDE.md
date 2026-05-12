# Deployment Guide - Vercel

Your portfolio is now ready to deploy on Vercel! Follow these steps:

## Step 1: Sign Up on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" and choose "Continue with GitHub"
3. Authorize Vercel to access your GitHub account

## Step 2: Import Your Project

1. Click "Add New..." → "Project"
2. Select "Import Git Repository"
3. Search for and select your "Portfolio" repository
4. Click "Import"

## Step 3: Configure Project

The configuration is already set up! Vercel will automatically detect:
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## Step 4: Deploy

1. Click "Deploy" button
2. Wait for the build to complete (usually 1-2 minutes)
3. Once deployed, you'll get a live URL like: `https://your-name.vercel.app`

## Step 5: Custom Domain (Optional)

1. In Vercel dashboard, go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Automatic Deployments

After initial deployment, every time you push to the `main` branch:
- Vercel automatically builds and deploys your portfolio
- No manual action needed!

## Environment Variables (if needed)

If you add environment variables later:
1. Go to project Settings → Environment Variables
2. Add your variables
3. Redeploy by pushing to GitHub or using Vercel CLI

## Troubleshooting

### Build fails on Vercel but works locally
- Check Node version: Vercel uses Node 18 by default
- Clear `node_modules` and `package-lock.json`
- Run `npm install` and `npm run build` locally again
- Push changes to GitHub

### Issues with OGL library
- Already optimized with code splitting in `vite.config.ts`
- Build time should be under 2 minutes
- Check Vercel build logs for details

### DNS Issues with Custom Domain
- Go to Vercel domain settings
- Check nameserver configuration
- DNS propagation can take 24-48 hours

## What's Included for Deployment

✅ `vercel.json` - Vercel configuration
✅ `.vercelignore` - Files to ignore during build
✅ `vite.config.ts` - Optimized build settings
✅ `.gitignore` - Git configuration
✅ `.npmrc` - npm configuration
✅ `package.json` - All dependencies locked with versions

## Performance Metrics

After deployment, check Vercel Analytics:
1. Dashboard → your project → Analytics
2. Monitor:
   - First Contentful Paint (FCP)
   - Largest Contentful Paint (LCP)
   - Cumulative Layout Shift (CLS)

## Rolling Back

If something goes wrong:
1. Go to Vercel Dashboard → Deployments
2. Find the previous working deployment
3. Click "..." → "Promote to Production"

## Support

- **Vercel Docs**: https://vercel.com/docs
- **GitHub Issues**: Create issue in your repository
- **Vite Docs**: https://vitejs.dev

---

Your portfolio is deployment-ready! 🚀
