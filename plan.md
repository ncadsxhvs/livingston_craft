# Backend System: Logistics, Finance & Sales Pipeline

## Context

Livingston Craft is a flooring company with a Next.js 14 landing page deployed on Vercel. The backend uses Supabase (hosted Postgres) with Drizzle ORM, admin auth via Supabase Auth, and an admin dashboard at `/admin`.

---

## Tech Stack

| Layer | Choice | Status |
|-------|--------|--------|
| Database | Supabase (hosted Postgres) | Done |
| Auth | Supabase Auth (email/password) | Done |
| ORM | Drizzle ORM | Done |
| API | Next.js API Routes (`src/app/api/`) | Done (logistics) |
| Admin UI | Next.js pages under `src/app/(admin)/admin/` | Done (logistics) |
| File Storage | Supabase Storage (BOL PDFs, invoices) | Not started |
| Deployment | Vercel (frontend + API) + Supabase | Done |

---

## Database Schema (Implemented)

### Logistics Tables

```
vendors
├── id, name, contact_name, email, phone, address, notes
└── created_at, updated_at

shipments
├── id, vendor_id (FK → vendors), bol_number, status
├── carrier, tracking_number, pro_number, service_level
├── freight_charge_type, ship_date, delivery_date
├── ship_from_name, ship_from_address, ship_from_contact
├── ship_to_name, ship_to_address, ship_to_contact
├── total_weight, total_pallets
├── customer_po, carrier_quote_id, pickup_number
├── special_instructions, notes
└── created_at, updated_at

shipment_items
├── id, shipment_id (FK → shipments, cascade delete)
├── product_name, sku, quantity, unit
├── type, weight, freight_class, dimensions
├── nmfc_code, stackable, hazmat, notes
```

### Sales Tables (schema exists, no admin UI yet)

```
leads, sample_requests, quotes
```

### Finance Tables (schema exists, no admin UI yet)

```
invoices, invoice_items, expenses
```

---

## Project Structure

```
src/
├── app/
│   ├── (admin)/
│   │   ├── login/page.tsx              # Admin login
│   │   └── admin/
│   │       ├── layout.tsx              # Sidebar nav + auth guard
│   │       ├── page.tsx                # Dashboard (KPIs + recent shipments)
│   │       ├── vendors/page.tsx        # Vendor list (cards)
│   │       └── logistics/
│   │           ├── page.tsx            # Shipment list (table)
│   │           └── [id]/page.tsx       # Shipment detail (BOL view)
│   ├── api/
│   │   ├── vendors/
│   │   │   ├── route.ts               # GET list, POST create
│   │   │   └── [id]/route.ts          # GET, PUT, DELETE
│   │   ├── shipments/
│   │   │   ├── route.ts               # GET list, POST create
│   │   │   └── [id]/
│   │   │       ├── route.ts           # GET, PUT, DELETE
│   │   │       └── status/route.ts    # PATCH status
│   │   ├── request-sample/route.ts    # Public form submission
│   │   └── subscribe/route.ts         # Public newsletter
│   ├── globals.css
│   ├── layout.tsx                      # Root layout (SEO, analytics)
│   └── page.tsx                        # Landing page
├── backend/
│   ├── db/
│   │   ├── schema.ts                  # Drizzle schema (all tables)
│   │   ├── index.ts                   # DB connection (pg Pool)
│   │   └── seed.ts                    # Seed from logistics/ data
│   ├── lib/
│   │   ├── api-utils.ts               # withAuth, apiHandler, withValidation
│   │   └── errors.ts                  # AppError, ValidationError, NotFoundError, UnauthorizedError
│   ├── services/
│   │   ├── vendor.service.ts          # Vendor CRUD
│   │   └── shipment.service.ts        # Shipment CRUD + items
│   └── supabase/
│       ├── client.ts                  # Browser client
│       ├── server.ts                  # Server client (cookies)
│       └── middleware.ts              # Session refresh + admin route protection
├── frontend/
│   ├── components/                    # Landing page components
│   └── lib/                           # Utils, product data
├── shared/
│   ├── validation/logistics.ts        # Zod schemas for vendors + shipments
│   └── types/product.ts
├── middleware.ts                       # Root middleware (auth)
```

---

## Build Phases

### Phase 1: Foundation — DONE
- [x] Supabase project + env vars configured
- [x] Drizzle ORM schema + push to DB
- [x] Supabase Auth (admin login page)
- [x] Admin layout with sidebar nav + auth guard
- [x] Root middleware protecting `/admin` routes

### Phase 2: Logistics — DONE
- [x] Vendors CRUD (API + admin page)
- [x] Shipments CRUD (API + admin pages: list, detail)
- [x] Shipment items with cargo detail (weight, class, dimensions, NMFC)
- [x] Shipment status tracking (pending → in_transit → delivered → cancelled)
- [x] Seed script with real BOL data (Everbright Flooring, BOL #36229776)
- [x] Dashboard with KPI cards + recent shipments table
- [ ] PDF upload to Supabase Storage
- [ ] Vendor detail page

### Phase 3: Sales Pipeline — NOT STARTED
- [ ] Leads CRUD + admin pages
- [ ] Connect sample request form → creates lead + sample_request in DB
- [ ] Quotes CRUD with margin calculator
- [ ] Kanban board UI for lead status

### Phase 4: Finance — NOT STARTED
- [ ] Invoices CRUD + admin pages
- [ ] Expenses tracking
- [ ] Dashboard KPIs (revenue, margins, outstanding invoices)
- [ ] PDF invoice generation

### Phase 5: Integration & Polish — NOT STARTED
- [ ] Cross-system dashboard (logistics + sales + finance KPIs)
- [ ] Connect shipments ↔ invoices ↔ leads
- [ ] Search across all entities
- [ ] Mobile-responsive admin UI

---

## DB Commands

```bash
npm run db:push      # Push schema to Supabase (no migration files)
npm run db:generate  # Generate migration SQL
npm run db:migrate   # Run migrations
npm run db:seed      # Seed vendor + shipment data from logistics/
```

---

## Seeded Data

| Entity | Data |
|--------|------|
| Vendor | Everbright Flooring Inc — Union City, CA — Contact: Sharon |
| Shipment | BOL #36229776 — Roadrunner (Direct) — PRO #669644445 |
| Route | Everbright (Union City, CA) → King Freight NY (Fairfield, NJ) |
| Cargo | 4 pallets, 10,760 lbs flooring, Class 60.0, NMFC 70950-08 |
