# Livingston Craft - Project Documentation

**Status:** Production Ready
**Version:** 1.0
**Last Updated:** February 2026

---

## 🎯 Project Overview

Premium flooring e-commerce landing page with modern design, sample request system, and newsletter subscription. Built with Next.js 14, featuring elegant animations, professional typography, and Gmail-powered email notifications.

**Live Site:** [Add your Vercel URL here]
**Repository:** https://github.com/ncadsxhvs/livingston_craft

---

## 🛠 Tech Stack

### Core
- **Next.js** 14.2.35 (App Router, Server Components)
- **React** 18.3.1
- **TypeScript** 5.6.3
- **Tailwind CSS** 3.4.15

### UI & Animation
- **Framer Motion** 12.23.24 - Animations
- **shadcn/ui** - Component library
- **Lucide React** 0.552.0 - Icons
- **Google Fonts** - Cormorant Garamond (serif) + Outfit (sans-serif)

### Forms & Email
- **React Hook Form** 7.66.0
- **Zod** 4.1.12 - Validation
- **Nodemailer** - Gmail integration

### Analytics
- **Vercel Analytics** 1.6.1

---

## 🔧 Manual Configuration Steps

### 1. Gmail Setup for Email Notifications

**Required for:** Sample requests and newsletter subscriptions

#### Step 1: Enable 2-Step Verification
1. Go to https://myaccount.google.com/security
2. Enable **2-Step Verification**

#### Step 2: Create App Password
1. Go to https://myaccount.google.com/apppasswords
2. Select: **Mail** + **Other (Custom name)**
3. Name it: `Livingston Craft Website`
4. Copy the **16-digit password** (format: `xxxx xxxx xxxx xxxx`)

#### Step 3: Add to Environment Variables
Create `.env.local` in project root:

```env
# Gmail Configuration
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=xxxxxxxxxxxxxxxx  # Remove spaces from app password

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**⚠️ Important:** Never commit `.env.local` to Git (already in `.gitignore`)

---

### 2. Vercel Deployment Configuration

#### Environment Variables
Add these in **Vercel Dashboard** → **Settings** → **Environment Variables**:

| Variable | Value | Environments |
|----------|-------|--------------|
| `GMAIL_USER` | `your-email@gmail.com` | ✅ Production, Preview, Development |
| `GMAIL_APP_PASSWORD` | `your-16-digit-password` | ✅ Production, Preview, Development |

#### Deployment Steps
1. Connect GitHub repo to Vercel
2. Add environment variables (above)
3. Deploy from `main` branch
4. Vercel auto-deploys on every push to `main`

---

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   ├── request-sample/route.ts    # Sample request email handler
│   │   └── subscribe/route.ts         # Newsletter subscription handler
│   ├── globals.css                    # Global styles + custom animations
│   ├── layout.tsx                     # Root layout + Analytics
│   └── page.tsx                       # Home page
│
├── components/
│   ├── modals/
│   │   ├── sample-request-modal.tsx   # Sample request form
│   │   └── subscribe-modal.tsx        # Newsletter signup form
│   ├── sections/
│   │   ├── photo-gallery.tsx          # Hero photo gallery
│   │   ├── product-showcase.tsx       # Product displays
│   │   ├── feature-highlights.tsx     # Features grid
│   │   ├── comparison-table.tsx       # Product comparison
│   │   └── how-it-works.tsx          # Process steps
│   ├── layout/
│   │   ├── header.tsx                 # Navigation
│   │   └── footer.tsx                 # Footer + Subscribe
│   ├── common/
│   │   ├── color-swatch.tsx          # Color selector
│   │   └── section-wrapper.tsx       # Section container
│   └── ui/                            # shadcn/ui components
│
├── lib/
│   ├── data/
│   │   └── products.ts                # Product data
│   └── utils.ts                       # Utility functions
│
├── types/
│   └── product.ts                     # TypeScript types
│
├── public/
│   └── images/
│       └── homepage/                  # Hero gallery images
│
├── .env.local                         # Local environment vars (DO NOT COMMIT)
└── .env.example                       # Template for .env.local
```

---

## ✨ Implemented Features

### Design & UX
- ✅ Professional serif typography (Cormorant Garamond)
- ✅ Sophisticated color palette (wood, cream, stone tones)
- ✅ Smooth scroll animations with Framer Motion
- ✅ Responsive design (mobile-first)
- ✅ Grain textures and gradient overlays
- ✅ Hover micro-interactions

### Functional Features
- ✅ **Photo Gallery Hero** - 2 homepage images with overlay
- ✅ **Sample Request System** - Form modal with email notifications
- ✅ **Newsletter Subscription** - Footer signup with welcome emails
- ✅ **Product Showcases** - 4 products with color swatches
- ✅ **Feature Highlights** - 6 feature cards with animations
- ✅ **Comparison Table** - Product comparison grid
- ✅ **Vercel Analytics** - Page view tracking

### Email System
Both sample requests and subscriptions send **2 emails**:

1. **To Business Owner** (`GMAIL_USER`):
   - Customer information
   - Timestamp
   - Product details (for samples)

2. **To Customer**:
   - Confirmation message
   - Next steps
   - Branded HTML email

---

## 🎨 Color Palette

```css
/* Wood Tones */
--wood-700: #755344  /* Primary dark */
--wood-800: #61463b
--wood-900: #513c33

/* Cream Tones */
--cream-50: #fdfcfa   /* Backgrounds */
--cream-100: #f9f6f1
--cream-200: #f3ede3

/* Stone Tones */
--stone-600: #515151  /* Text */
--stone-900: #1a1a1a
```

---

## 🚀 Development

### Local Setup
```bash
# Install dependencies
npm install

# Add environment variables
cp .env.example .env.local
# Edit .env.local with your Gmail credentials

# Run development server
npm run dev
# Open http://localhost:3000

# Build for production
npm run build
npm start
```

### Testing Email System Locally
1. Set up Gmail credentials in `.env.local`
2. Run dev server: `npm run dev`
3. Click "Get Free Samples" or "Subscribe"
4. Submit form
5. Check your Gmail inbox for notifications

---

## 📊 Future Improvements (Priority Order)

Based on UX analysis for flooring e-commerce:

### High Priority
1. **Customer Reviews & Photos** - Build trust with social proof
2. **Price Calculator** - Room size → total cost estimator
3. **Product Filtering** - Filter by room type, price, features
4. **Room Visualizer** - AR or photo upload to see products in space

### Medium Priority
5. **Educational Content** - Installation guides, flooring comparisons
6. **Live Chat** - "Talk to a flooring expert"
7. **Sample Tracking** - Order status for requested samples
8. **Multiple Product Images** - Close-ups, angles, room shots

### Technical Improvements
- [ ] Implement form spam protection (honeypot/captcha)
- [ ] Add error monitoring (Sentry)
- [ ] Optimize images to WebP/AVIF
- [ ] Add sitemap.xml and robots.txt
- [ ] Schema markup for products
- [ ] Blog/CMS integration (Sanity/Contentful)

---

## 🔒 Security Notes

### Environment Variables
- ✅ Never commit `.env.local` to Git
- ✅ Rotate Gmail app passwords periodically
- ✅ Use different credentials for development/production
- ✅ Revoke unused app passwords at https://myaccount.google.com/apppasswords

### Email Safety
- Gmail may rate-limit if sending too many emails
- Consider upgrading to dedicated email service (SendGrid, Resend) for high volume
- Current setup suitable for < 100 emails/day

---

## 📞 Support & Troubleshooting

### Common Issues

**"Invalid login" error for Gmail:**
- Verify 2-Step Verification is enabled
- Regenerate app password
- Remove quotes from `.env.local` values
- Check for spaces in app password

**Emails not sending in production:**
- Verify environment variables are set in Vercel
- Check Vercel deployment logs
- Ensure Gmail credentials are correct

**Build fails with ESLint errors:**
- Escape apostrophes: `don't` → `don&apos;t`
- Run `npm run build` locally first

**Modal not opening:**
- Check browser console for errors
- Verify modal state management
- Test in different browsers

---

## 📝 Git Workflow

### Branches
- `main` - Production (auto-deploys to Vercel)
- `feat/*` - Feature branches
- `fix/*` - Bug fixes

### Commit Messages
```
feat: Add room visualizer
fix: Resolve modal z-index issue
style: Update button hover states
docs: Update README
```

### Deployment
- Push to `main` → Auto-deploy to Vercel
- Preview deployments for all PRs
- Rollback via Vercel dashboard if needed

---

## 📚 Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [shadcn/ui](https://ui.shadcn.com/)

### Tools Used
- **Design:** Figma
- **Fonts:** Google Fonts (Cormorant Garamond, Outfit)
- **Icons:** Lucide React
- **Hosting:** Vercel
- **Analytics:** Vercel Analytics
- **Email:** Gmail (Nodemailer)

---

## 📈 Success Metrics

### Performance Targets
- Lighthouse Score: 90+ (all metrics)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Zero console errors

### Business Metrics
- Sample request conversion: 5-10%
- Newsletter signup: 2-5%
- Average session duration: > 2 min
- Bounce rate: < 40%

---

**Last Updated:** February 5, 2026
**Maintained By:** Development Team
**Questions?** Check `/GMAIL_SETUP.md` for detailed email configuration
