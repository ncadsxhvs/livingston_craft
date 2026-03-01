# Flooring Landing Page - Project Context

## Project Brief
Apple-inspired landing page for premium flooring products. Minimalist design, smooth scrolling, stunning visuals.

**Design Reference:** https://www.apple.com/iphone/

## Core Principle
**Think Apple:** Every pixel serves a purpose. Minimal text, maximum impact.

---

## Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **UI Components:** shadcn/ui
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Images:** Next/Image + Cloudinary
- **Forms:** React Hook Form

---

## Products

1. **Hardwood Flooring** - "Timeless elegance. Built to last."
2. **Luxury Vinyl** - "Beauty meets durability."
3. **Engineered Wood** - "Premium feel. Practical performance."
4. **Laminate Collection** - "Affordable luxury for every home."

---

## Page Structure

1. Hero (30vh) - "Transform Your Space"
2. Promo Banner (optional)
3. Product Showcases (4 × 100vh) - Full-screen, one per product
4. Feature Highlights (60vh) - 6 key benefits
5. Comparison Table (80vh)
6. Inspiration Gallery (100vh)
7. How It Works (60vh) - 4 steps
8. Social Proof (60vh)
9. Final CTA (50vh)
10. Footer

**Total:** ~10 viewport heights

---

## Design Principles

> **See design-principal.md for detailed design system, colors, typography, spacing, and animation patterns.**

### Key Elements
- Full-screen product showcases
- Interactive color swatches per product
- Smooth scroll animations
- Large, generous white space
- Premium, high-resolution imagery
- Mobile-first responsive design

---

## Content Requirements

### Copywriting Style
- Maximum 1-2 sentences per section
- Power words: Transform, Elevate, Premium, Timeless
- Benefit-focused, not feature-focused
- Conversational but professional

### Photography
- Ultra-high resolution
- Consistent lighting and color grading
- Show texture and grain detail
- Lifestyle shots in real rooms

---

## Forms

### Sample Request
Fields: Name, Email, Address, Product Selection

### Quote Request
Fields: Name, Email, Phone, Project Details, Square Footage

---

## User Flows

### Primary Flow
Hero → Product showcase → Sample/Quote request → Form submission

### Secondary Flow  
Gallery → Find inspiration → "Get This Look" → Product details → Request

---

## Performance Targets

- Page load: < 2 seconds
- Lighthouse score: 90+ (all metrics)
- Smooth 60fps animations
- Mobile-first responsive design

---

## shadcn/ui Components to Use

- Button - CTAs and navigation
- Form - Sample and quote requests
- Card - Feature highlights, testimonials
- Dialog - Product details, form modals
- Carousel - Inspiration gallery
- Tabs - Comparison table

---

## Development Checklist

### Phase 1: Foundation (Week 1-2)
- [ ] Next.js setup with Tailwind
- [ ] Navigation component (sticky)
- [ ] Hero section
- [ ] Footer component

### Phase 2: Products (Week 3-4)
- [ ] 4 product showcase sections
- [ ] Color switcher functionality
- [ ] Scroll animations
- [ ] Image optimization

### Phase 3: Content (Week 5)
- [ ] Feature highlights grid
- [ ] Comparison table
- [ ] How it works section

### Phase 4: Interactive (Week 6)
- [ ] Inspiration gallery with filters
- [ ] Sample request form
- [ ] Quote request form
- [ ] Form validation

### Phase 5: Polish (Week 7-8)
- [ ] Advanced animations
- [ ] Performance optimization
- [ ] Mobile refinement
- [ ] Cross-browser testing
- [ ] SEO optimization
- [ ] Analytics setup

---

## Critical Success Factors

✅ **Images are hero-quality** - High-res, consistent lighting, show texture
✅ **Animations are smooth** - 60fps, no jank
✅ **Copy is concise** - Short, punchy, benefit-focused
✅ **White space is generous** - Let content breathe
✅ **CTAs are clear** - No confusion about next steps
✅ **Mobile works perfectly** - 60%+ of traffic

---

## Common Pitfalls to Avoid

❌ Too much text per section
❌ Generic stock photos
❌ Slow image loading
❌ Janky scroll animations
❌ Complex navigation
❌ Aggressive pop-ups
❌ Multiple competing CTAs

---

## Quick Reference: Apple's Best Practices

1. **Full-screen sections** - Each product is a hero
2. **Large typography** - Headlines are bold, impactful
3. **Minimal navigation** - Clean, appears/hides on scroll
4. **Product colors** - Interactive swatches change images
5. **Smooth scrolling** - Parallax and fade effects
6. **White space** - Content breathes
7. **Premium photography** - High quality, consistent
8. **Mobile-optimized** - Simplified but still beautiful
9. **Sticky CTAs** - Always accessible
10. **Loading states** - Smooth transitions

---

## Testing Before Launch

- [ ] Page loads in < 2s
- [ ] Smooth scrolling (all browsers)
- [ ] Color switchers work
- [ ] Forms submit correctly
- [ ] Mobile navigation works
- [ ] Images lazy-load
- [ ] Lighthouse score 90+
- [ ] Works on iOS Safari, Chrome, Firefox, Edge

---

## When Building, Always Ask:

1. **Would Apple do it this way?**
2. **Can this text be shorter?**
3. **Does this animation add value?**
4. **Is this image high enough quality?**
5. **Is the user flow obvious?**

---

**Project Goal:** Create a premium, Apple-like experience that makes visitors feel confident about choosing your flooring products.

**Success = Minimalism + Quality + Smooth Interactions**