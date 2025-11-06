# Premium Flooring Landing Page

A modern, Apple-inspired landing page for showcasing premium flooring products. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Hero Section** - Full-screen hero with animations and CTAs
- **Product Showcases** - 4 interactive product sections with color swatches
  - Hardwood Flooring
  - Luxury Vinyl
  - Engineered Wood
  - Laminate Collection
- **Feature Highlights** - 6 key benefits in an animated grid
- **Comparison Table** - Side-by-side product comparison
- **How It Works** - 4-step process visualization
- **Responsive Design** - Mobile-first, fully responsive layout
- **Smooth Animations** - Framer Motion scroll animations and transitions

## 🛠 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod (ready for integration)
- **Icons**: Lucide React

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd spc_landingpage
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design System

### Colors

- **Cream** - Warm neutrals for backgrounds
- **Wood** - Earth tones for accents
- **Stone** - Greys for text and borders

### Typography

- System fonts with fallback to SF Pro Display style
- Large, generous spacing
- Clear hierarchy

### Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Main landing page
├── components/
│   ├── common/            # Reusable components
│   │   ├── color-swatch.tsx
│   │   └── section-wrapper.tsx
│   ├── layout/            # Layout components
│   │   ├── header.tsx
│   │   └── footer.tsx
│   ├── sections/          # Page sections
│   │   ├── hero.tsx
│   │   ├── product-showcase.tsx
│   │   ├── feature-highlights.tsx
│   │   ├── comparison-table.tsx
│   │   └── how-it-works.tsx
│   └── ui/                # shadcn/ui components
│       └── button.tsx
├── lib/
│   ├── data/              # Static data
│   │   ├── products.ts
│   │   └── features.ts
│   └── utils.ts           # Utility functions
├── types/
│   └── product.ts         # TypeScript types
└── public/
    └── images/            # Image assets (placeholders for now)
```

## 🎯 Current Implementation Status

### ✅ Completed (Phase 1-3)

- [x] Project setup and configuration
- [x] Design system and Tailwind config
- [x] Core layout components (Header, Footer, Button, SectionWrapper)
- [x] Hero section with animations
- [x] All 4 product showcases with color swatches
- [x] Feature highlights section
- [x] Comparison table
- [x] How It Works section
- [x] Final CTA section
- [x] Responsive design for all sections
- [x] Smooth scroll animations

### 🚧 TODO (Phase 4-5)

- [ ] Inspiration Gallery with filters
- [ ] Testimonials section
- [ ] Sample request form (modal)
- [ ] Quote request form (modal)
- [ ] Newsletter signup functionality
- [ ] Replace placeholder images with real assets
- [ ] Add more micro-interactions
- [ ] Performance optimization
- [ ] SEO enhancements
- [ ] Accessibility audit

## 🖼 Images

The project currently uses placeholder images. To add real images:

1. Place product images in `public/images/products/`
2. Place gallery images in `public/images/gallery/`
3. Update image paths in `lib/data/products.ts`

### Recommended Image Sizes

- **Hero**: 2880×1800 (optimized to 1920×1200 for desktop, 800×500 for mobile)
- **Products**: 1920×1080 (optimized to 1200×675 for desktop, 600×338 for mobile)
- **Gallery**: 1200×900 (optimized to 800×600 for desktop, 400×300 for mobile)

## 🚀 Deployment

This project is optimized for **Vercel** deployment with zero configuration required.

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ncadsxhvs/spc_landingpage)

**Or manually:**

1. **Push to GitHub** (already done ✅)
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import `ncadsxhvs/spc_landingpage` repository
   - Click "Deploy" (all settings auto-detected)

3. **Live in 2-3 minutes!** 🎉
   - Get a free `.vercel.app` domain
   - Automatic HTTPS/SSL
   - Global CDN
   - Auto-deployments on git push

📖 **[Read full deployment guide →](./DEPLOYMENT.md)**

### What's Included

- ✅ `vercel.json` - Optimized configuration with security headers
- ✅ Automatic Next.js detection
- ✅ Preview deployments for pull requests
- ✅ Zero-downtime deployments
- ✅ Built-in Web Analytics

### Local Production Build

Test production build locally:

```bash
npm run build
npm start
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to customize the color palette:

```typescript
colors: {
  cream: { ... },
  wood: { ... },
  stone: { ... },
}
```

### Products

Edit `lib/data/products.ts` to add/modify products.

### Navigation

Edit `components/layout/header.tsx` to modify navigation links.

## 📄 License

[Your License Here]

## 👥 Contributing

[Your contribution guidelines here]

---

**Built with** ❤️ **using Next.js, TypeScript, and Tailwind CSS**
