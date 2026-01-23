# Deployment Guide - Vercel

This guide will help you deploy the Livingston Craft Landing Page to Vercel.

## 🚀 Quick Deploy

### Prerequisites
- ✅ GitHub repository: `https://github.com/ncadsxhvs/spc_landingpage.git`
- ✅ Vercel account (sign up at [vercel.com](https://vercel.com))
- ✅ Latest code pushed to main branch

---

## Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Import Project

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Sign in to your account

2. **Import Git Repository**
   - Click "Import Project" or "Add New..." → "Project"
   - Select "Import Git Repository"
   - Choose **GitHub** as the source
   - Find and select: `ncadsxhvs/spc_landingpage`
   - Click "Import"

### Step 2: Configure Project

Vercel will **auto-detect** these settings (no changes needed):

```
Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Node.js Version: 20.x (default)
```

### Step 3: Environment Variables (Optional)

For the initial deployment, **no environment variables are required**. Your app will work perfectly without them.

**Optional variables** (can be added later):
- `NEXT_PUBLIC_SITE_URL`: Your production URL (e.g., `https://premium-flooring.vercel.app`)

To add later:
1. Go to Project Settings → Environment Variables
2. Add variables
3. Redeploy

### Step 4: Deploy

1. Review the configuration
2. Click **"Deploy"** button
3. Wait 2-3 minutes for build to complete
4. 🎉 Your site is live!

### Step 5: Access Your Site

After deployment:
- Vercel will show your production URL (e.g., `https://premium-flooring-abc123.vercel.app`)
- Click the URL to view your live site
- Share the link!

---

## Method 2: Deploy via Vercel CLI (Alternative)

### Install Vercel CLI

```bash
npm install -g vercel
```

### Login to Vercel

```bash
vercel login
```

### Deploy

From the project root:

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

The CLI will:
1. Link your project to Vercel
2. Upload your code
3. Build and deploy
4. Provide you with URLs

---

## 🔄 Automatic Deployments

Once connected, Vercel will automatically:

- ✅ **Deploy on git push**: Every push to `main` triggers a production deployment
- ✅ **Preview deployments**: Pull requests get unique preview URLs
- ✅ **Zero downtime**: Deployments happen without interrupting users
- ✅ **Instant rollback**: Revert to any previous deployment with one click

---

## 📊 Post-Deployment Checklist

After your first deployment, verify:

### Functionality Test
- [ ] Hero section loads with animations
- [ ] All 4 product showcases display correctly
- [ ] Color swatches are interactive (click to change colors)
- [ ] Feature highlights section renders
- [ ] Comparison table is readable
- [ ] How It Works section displays
- [ ] Navigation menu works (desktop & mobile)
- [ ] Footer links are present
- [ ] Scroll animations trigger smoothly

### Mobile Test
- [ ] Open site on mobile device
- [ ] Test hamburger menu
- [ ] Verify touch interactions work
- [ ] Check text is readable
- [ ] Ensure buttons are tappable

### Performance Test
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] Target: 90+ score on Performance
- [ ] Check Lighthouse scores in Chrome DevTools

---

## 🌐 Custom Domain (Optional)

To add a custom domain:

1. Go to Project Settings → Domains
2. Click "Add"
3. Enter your domain (e.g., `premiumflooring.com`)
4. Follow DNS configuration instructions
5. Vercel will provide nameservers or CNAME records
6. Update DNS settings with your domain provider
7. Wait for DNS propagation (5-60 minutes)
8. SSL certificate will be automatically provisioned

---

## 📈 Monitoring & Analytics

### Vercel Analytics (Free)

Enable in Project Settings:
1. Go to Analytics tab
2. Enable Web Analytics
3. View real-time visitor data

### View Deployment Logs

1. Go to Deployments tab
2. Click any deployment
3. View build logs, function logs, and runtime logs

### Performance Monitoring

Vercel automatically tracks:
- **First Contentful Paint (FCP)**
- **Largest Contentful Paint (LCP)**
- **Cumulative Layout Shift (CLS)**
- **First Input Delay (FID)**

Access via: Project → Analytics → Web Vitals

---

## 🔧 Troubleshooting

### Build Fails

**Check build logs:**
1. Go to Deployments
2. Click failed deployment
3. View "Building" section for errors

**Common fixes:**
- Ensure `package.json` has all dependencies
- Check TypeScript errors: `npm run lint`
- Verify build works locally: `npm run build`

### Images Not Loading

- Images in `public/` folder are automatically served
- Use Next/Image component for optimization
- Check image paths are correct (case-sensitive)

### Environment Variables Not Working

- Ensure variables start with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding new variables
- Check variable names match exactly

### 404 Errors

- Vercel handles Next.js routing automatically
- Ensure pages are in `app/` directory
- Check `vercel.json` for rewrite rules

---

## 🔐 Security Headers

The project includes `vercel.json` with security headers:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

These enhance security without requiring any configuration.

---

## 💰 Pricing

Your project fits in Vercel's **Free Tier**:
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic SSL/HTTPS
- ✅ Global CDN
- ✅ Preview deployments
- ✅ Web Analytics (basic)

**Upgrade needed only if:**
- You exceed 100GB bandwidth
- You need advanced analytics
- You require team collaboration features

---

## 📝 Deployment URLs

After deployment, you'll have:

- **Production URL**: `https://premium-flooring-abc123.vercel.app`
- **Git Branch Previews**: Automatic for each branch
- **Pull Request Previews**: Unique URL for each PR

---

## 🔄 Redeployment

### Automatic
- Push to main branch → auto-deploys to production
- Open PR → auto-creates preview deployment

### Manual
1. Go to Deployments
2. Find previous deployment
3. Click "..." → "Redeploy"

---

## 🎯 Next Steps After Deployment

1. **Share your live URL** with stakeholders
2. **Test on real devices** (iOS, Android)
3. **Monitor Vercel Analytics** for visitor data
4. **Add custom domain** (optional)
5. **Implement remaining features**:
   - Inspiration gallery
   - Testimonials
   - Contact forms
   - Real product images
6. **Set up Google Analytics** (optional)
7. **Optimize images** as you add real assets

---

## 🆘 Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Vercel Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- **Next.js Deployment**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)

---

## ✅ Deployment Checklist Summary

- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Initial deployment successful
- [ ] Live URL accessible
- [ ] All sections load correctly
- [ ] Mobile responsive verified
- [ ] Performance score checked
- [ ] Automatic deployments enabled

---

**Estimated time to first deployment: 5-10 minutes** ⚡

**Your landing page is production-ready and optimized for Vercel!**
