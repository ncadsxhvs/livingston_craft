# Livingston Craft - Task Backlog

**Last Updated:** February 2026
**Status:** Prioritized by Impact & Effort

---

## 🔥 High Priority - Quick Wins (Week 1-2)

### 1. Form Spam Protection
**Why:** Prevent bot submissions to sample request and newsletter forms
**Impact:** ⭐⭐⭐⭐ | **Effort:** 2 hours

**Tasks:**
- [ ] Add honeypot field to both forms (invisible to users, catches bots)
- [ ] Implement server-side validation to reject honeypot submissions
- [ ] Add rate limiting (max 3 requests per hour per IP)
- [ ] Test with spam bot simulators

**Acceptance Criteria:**
- Honeypot field hidden from users
- Bot submissions return 400 error
- Rate limit blocks excessive requests
- Real users unaffected

---

### 2. Analytics Event Tracking
**Why:** Understand user behavior and optimize conversion funnel
**Impact:** ⭐⭐⭐⭐ | **Effort:** 1 hour

**Tasks:**
- [ ] Track "Get Free Sample" button clicks
- [ ] Track "Subscribe" button clicks
- [ ] Track modal opens (sample request, newsletter)
- [ ] Track form submissions (success/failure)
- [ ] Track scroll depth (how far users scroll)
- [ ] Track product showcase views

**Acceptance Criteria:**
- Events appear in Vercel Analytics dashboard
- All key user actions tracked
- Conversion funnel visible

**Code Example:**
```typescript
import { track } from '@vercel/analytics'

track('sample_request_opened', { product: 'Hardwood' })
track('cta_clicked', { location: 'hero' })
```

---

### 3. SEO Fundamentals
**Why:** Improve search visibility and organic traffic
**Impact:** ⭐⭐⭐⭐⭐ | **Effort:** 4 hours

**Tasks:**
- [ ] Add Schema.org structured data for products
- [ ] Generate sitemap.xml (app/sitemap.ts)
- [ ] Create robots.txt (app/robots.ts)
- [ ] Add Open Graph images for social sharing
- [ ] Optimize meta descriptions
- [ ] Add canonical URLs
- [ ] Test with Google Rich Results Test

**Acceptance Criteria:**
- Products show rich snippets in Google search
- Sitemap accessible at /sitemap.xml
- Robots.txt configured correctly
- Social shares show proper images/titles

---

### 4. Loading States & Blur Placeholders
**Why:** Better perceived performance, smoother UX
**Impact:** ⭐⭐⭐⭐ | **Effort:** 2 hours

**Tasks:**
- [ ] Generate blur placeholders for hero images (plaiceholder library)
- [ ] Add skeleton loaders for product sections
- [ ] Implement page transition loading bar
- [ ] Add shimmer effect to loading cards

**Acceptance Criteria:**
- No content "pop-in" on image load
- Smooth transitions between loading states
- CLS (Cumulative Layout Shift) < 0.1

---

### 5. Performance Monitoring
**Why:** Track real-world performance and catch regressions
**Impact:** ⭐⭐⭐ | **Effort:** 2 hours

**Tasks:**
- [ ] Set up Web Vitals reporting to Vercel Analytics
- [ ] Configure performance budgets (max bundle sizes)
- [ ] Add bundle analyzer to build process
- [ ] Create performance dashboard

**Acceptance Criteria:**
- Core Web Vitals tracked in production
- Build fails if bundle exceeds limits
- Performance trends visible over time

---

## 🎯 Medium Priority - UX Improvements (Week 3-4)

### 6. Customer Reviews & Photos
**Why:** Build trust, increase conversion with social proof
**Impact:** ⭐⭐⭐⭐⭐ | **Effort:** 8 hours

**Tasks:**
- [ ] Design review card component
- [ ] Create reviews data structure/API
- [ ] Add review section to each product
- [ ] Implement star rating component
- [ ] Add customer photo gallery
- [ ] Integrate with review platform (Trustpilot/Google Reviews)

**Acceptance Criteria:**
- Reviews visible on product pages
- Average rating displayed prominently
- Customer photos in gallery
- Reviews filterable by rating

---

### 7. Price Calculator Widget
**Why:** Remove pricing confusion, qualify leads better
**Impact:** ⭐⭐⭐⭐ | **Effort:** 6 hours

**Tasks:**
- [ ] Design calculator UI (modal or sidebar)
- [ ] Add room dimension inputs (length × width)
- [ ] Calculate square footage
- [ ] Show breakdown: Materials + Installation + Underlayment + Trim
- [ ] Add product selector dropdown
- [ ] Add installation preference (DIY vs Professional)
- [ ] Display total cost estimate

**Acceptance Criteria:**
- Calculator accessible from product pages
- Real-time cost updates as user types
- Clear breakdown of all costs
- "Request Quote" CTA with pre-filled details

---

### 8. Product Filtering & Search
**Why:** Help users find exactly what they need quickly
**Impact:** ⭐⭐⭐⭐ | **Effort:** 8 hours

**Tasks:**
- [ ] Add search bar to header
- [ ] Create filter sidebar component
- [ ] Implement filters:
  - [ ] Room type (Kitchen, Bathroom, Living Room, etc.)
  - [ ] Price range (slider)
  - [ ] Style (Modern, Rustic, Traditional, etc.)
  - [ ] Features (Waterproof, Pet-friendly, etc.)
  - [ ] Color family
- [ ] Add sort options (Price, Popularity, Newest)
- [ ] Create "Shop by Room" landing pages

**Acceptance Criteria:**
- Filters work in real-time
- Multiple filters combinable
- URL updates with filter state (shareable)
- Mobile-friendly filter drawer

---

### 9. Educational Content Hub
**Why:** Build trust, reduce support queries, improve SEO
**Impact:** ⭐⭐⭐⭐ | **Effort:** 12 hours (content-heavy)

**Tasks:**
- [ ] Create "Learning Center" page
- [ ] Write guides:
  - [ ] "Flooring 101" (types, materials, finishes)
  - [ ] "Best Flooring for Kitchens"
  - [ ] "Best Flooring for Bathrooms"
  - [ ] "Hardwood vs Engineered vs Laminate"
  - [ ] "DIY Installation Guide"
- [ ] Add installation difficulty ratings to products
- [ ] Create maintenance guides
- [ ] Add FAQ section per product
- [ ] Embed tutorial videos

**Acceptance Criteria:**
- 5+ comprehensive guides published
- Guides SEO-optimized
- Internal linking to products
- Difficulty ratings on all products

---

### 10. Accessibility Improvements
**Why:** Better UX for all users, legal compliance, SEO boost
**Impact:** ⭐⭐⭐ | **Effort:** 3 hours

**Tasks:**
- [ ] Add skip navigation link
- [ ] Improve modal ARIA labels
- [ ] Add focus-visible styles
- [ ] Test keyboard navigation
- [ ] Run automated accessibility audit (axe DevTools)
- [ ] Fix color contrast issues
- [ ] Add alt text to all images
- [ ] Test with screen reader

**Acceptance Criteria:**
- WCAG 2.1 AA compliance
- All interactive elements keyboard accessible
- Screen reader friendly
- Color contrast ratios meet standards

---

## 🚀 High Impact - Major Features (Week 5-8)

### 11. Room Visualizer / AR Tool
**Why:** #1 barrier to online flooring purchase - "Will it look good in my room?"
**Impact:** ⭐⭐⭐⭐⭐ | **Effort:** 20+ hours

**Options:**

**Option A: Photo Upload Visualizer**
- [ ] User uploads room photo
- [ ] AI detects floor area
- [ ] Overlay selected flooring product
- [ ] Adjust perspective/lighting
- [ ] Save/share visualization

**Option B: Style Gallery**
- [ ] Create room galleries (5-6 per product)
- [ ] Show each product in: Kitchen, Bathroom, Living Room, Bedroom, Office
- [ ] Professional photography

**Option C: Style Quiz**
- [ ] "Find Your Perfect Floor" quiz
- [ ] Questions: Room type, style preference, budget, features needed
- [ ] Recommend 2-3 products with reasoning

**Acceptance Criteria:**
- Users can visualize products in realistic settings
- High-quality renders/photos
- Mobile-friendly
- Drives conversion lift of 20-30%

---

### 12. Live Chat Integration
**Why:** Capture high-intent leads, answer questions in real-time
**Impact:** ⭐⭐⭐⭐ | **Effort:** 4 hours

**Tasks:**
- [ ] Choose chat platform (Intercom, Drift, Crisp)
- [ ] Install chat widget
- [ ] Configure business hours
- [ ] Set up automated responses
- [ ] Create chat routing rules
- [ ] Train team on chat best practices

**Acceptance Criteria:**
- Chat widget visible on all pages
- Auto-responses for common questions
- Leads captured in CRM
- Response time < 2 minutes during business hours

---

### 13. Sample Order Tracking
**Why:** Reduce "where are my samples?" anxiety
**Impact:** ⭐⭐⭐ | **Effort:** 6 hours

**Tasks:**
- [ ] Create order tracking page
- [ ] Generate unique tracking IDs
- [ ] Send confirmation email with tracking link
- [ ] Show order status: Received → Shipped → Delivered
- [ ] Add estimated delivery date
- [ ] Email notifications on status changes

**Acceptance Criteria:**
- Every sample request gets tracking ID
- Status visible at /track/[id]
- Automated email updates
- Shipping integration (if applicable)

---

## 💡 Nice to Have - Future Enhancements

### 14. Error Monitoring (Sentry)
**Impact:** ⭐⭐ | **Effort:** 2 hours

**Tasks:**
- [ ] Install Sentry
- [ ] Configure error tracking
- [ ] Set up alerts
- [ ] Create error dashboard

---

### 15. Advanced Image Optimization
**Impact:** ⭐⭐⭐ | **Effort:** 3 hours

**Tasks:**
- [ ] Convert images to AVIF (70% smaller than WebP)
- [ ] Implement responsive images (different sizes per device)
- [ ] Add blur-up placeholders with plaiceholder
- [ ] Optimize font loading (font-display: swap)

---

### 16. Caching & Static Generation
**Impact:** ⭐⭐⭐ | **Effort:** 2 hours

**Tasks:**
- [ ] Add ISR (Incremental Static Regeneration)
- [ ] Cache API responses (Redis or Vercel KV)
- [ ] Configure CDN caching headers
- [ ] Implement stale-while-revalidate

---

### 17. A/B Testing Setup
**Impact:** ⭐⭐ | **Effort:** 4 hours

**Tasks:**
- [ ] Choose A/B testing platform (Vercel Edge Config, Optimizely)
- [ ] Create test framework
- [ ] Set up experiment tracking
- [ ] Design first test (CTA button colors, copy, etc.)

---

### 18. Progressive Web App (PWA)
**Impact:** ⭐⭐ | **Effort:** 4 hours

**Tasks:**
- [ ] Add manifest.json
- [ ] Create service worker
- [ ] Enable offline support
- [ ] Add "Add to Home Screen" prompt
- [ ] Configure app icons

---

### 19. Blog/CMS Integration
**Impact:** ⭐⭐⭐ | **Effort:** 8 hours

**Tasks:**
- [ ] Choose CMS (Sanity, Contentful, Strapi)
- [ ] Set up content models
- [ ] Create blog listing page
- [ ] Create blog post template
- [ ] Add search functionality
- [ ] Implement categories/tags

---

### 20. Dealer Locator Map
**Impact:** ⭐⭐ | **Effort:** 6 hours

**Tasks:**
- [ ] Integrate Google Maps API
- [ ] Create dealer database
- [ ] Add location search
- [ ] Show nearest dealers
- [ ] Add dealer profiles
- [ ] Enable "Get Directions"

---

## 📊 Task Summary

| Priority | Tasks | Est. Hours | Impact |
|----------|-------|------------|--------|
| **High (Week 1-2)** | 5 tasks | 11 hours | ⭐⭐⭐⭐⭐ |
| **Medium (Week 3-4)** | 5 tasks | 39 hours | ⭐⭐⭐⭐ |
| **Major (Week 5-8)** | 3 tasks | 30+ hours | ⭐⭐⭐⭐⭐ |
| **Nice to Have** | 7 tasks | 29 hours | ⭐⭐⭐ |

---

## 🎯 Recommended Implementation Order

### Sprint 1 (Week 1-2): Quick Wins
1. Form Spam Protection (2h)
2. Analytics Event Tracking (1h)
3. Loading States (2h)
4. Performance Monitoring (2h)
5. SEO Fundamentals (4h)

**Total: 11 hours | Expected Impact: Immediate improvements**

### Sprint 2 (Week 3-4): UX Enhancements
1. Customer Reviews (8h)
2. Price Calculator (6h)
3. Accessibility (3h)

**Total: 17 hours | Expected Impact: Higher conversion**

### Sprint 3 (Week 5-6): Major Features Part 1
1. Product Filtering & Search (8h)
2. Educational Content (12h)

**Total: 20 hours | Expected Impact: Better engagement**

### Sprint 4 (Week 7-8): Major Features Part 2
1. Room Visualizer (20h)
2. Live Chat (4h)
3. Sample Tracking (6h)

**Total: 30 hours | Expected Impact: Competitive advantage**

---

## 📝 Notes

- **Effort estimates** are for experienced developers
- **Impact ratings** based on flooring e-commerce best practices
- **Dependencies:** Some tasks may require others (e.g., search needs filtering)
- **Flexibility:** Prioritize based on business goals and resources

---

**Next Action:** Review with team, assign owners, set deadlines
