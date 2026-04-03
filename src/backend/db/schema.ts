import {
  pgTable,
  uuid,
  text,
  varchar,
  timestamp,
  decimal,
  integer,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";

// ── Logistics ──

export const vendors = pgTable("vendors", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  contactName: varchar("contact_name", { length: 255 }),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  address: text("address"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const shipments = pgTable("shipments", {
  id: uuid("id").defaultRandom().primaryKey(),
  vendorId: uuid("vendor_id").references(() => vendors.id),
  bolNumber: varchar("bol_number", { length: 100 }).notNull(),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  shipDate: timestamp("ship_date"),
  deliveryDate: timestamp("delivery_date"),
  carrier: varchar("carrier", { length: 255 }),
  trackingNumber: varchar("tracking_number", { length: 255 }),
  proNumber: varchar("pro_number", { length: 100 }),
  serviceLevel: varchar("service_level", { length: 100 }),
  freightChargeType: varchar("freight_charge_type", { length: 50 }),
  shipFromName: varchar("ship_from_name", { length: 255 }),
  shipFromAddress: text("ship_from_address"),
  shipFromContact: varchar("ship_from_contact", { length: 255 }),
  shipToName: varchar("ship_to_name", { length: 255 }),
  shipToAddress: text("ship_to_address"),
  shipToContact: varchar("ship_to_contact", { length: 255 }),
  totalWeight: decimal("total_weight", { precision: 10, scale: 2 }),
  totalPallets: integer("total_pallets"),
  customerPo: varchar("customer_po", { length: 255 }),
  carrierQuoteId: varchar("carrier_quote_id", { length: 100 }),
  pickupNumber: varchar("pickup_number", { length: 100 }),
  specialInstructions: text("special_instructions"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const shipmentItems = pgTable("shipment_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  shipmentId: uuid("shipment_id")
    .references(() => shipments.id, { onDelete: "cascade" })
    .notNull(),
  productName: varchar("product_name", { length: 255 }).notNull(),
  sku: varchar("sku", { length: 100 }),
  quantity: integer("quantity").notNull(),
  unit: varchar("unit", { length: 50 }).default("sqft"),
  type: varchar("type", { length: 50 }),
  weight: decimal("weight", { precision: 10, scale: 2 }),
  freightClass: varchar("freight_class", { length: 20 }),
  dimensions: varchar("dimensions", { length: 100 }),
  nmfcCode: varchar("nmfc_code", { length: 50 }),
  stackable: boolean("stackable"),
  hazmat: boolean("hazmat"),
  notes: text("notes"),
});

// ── Sales ──

export const leads = pgTable("leads", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  source: varchar("source", { length: 100 }),
  status: varchar("status", { length: 50 }).notNull().default("new"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const sampleRequests = pgTable("sample_requests", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  address: text("address").notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 50 }).notNull(),
  zip: varchar("zip", { length: 20 }).notNull(),
  productName: varchar("product_name", { length: 255 }),
  message: text("message"),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const quotes = pgTable("quotes", {
  id: uuid("id").defaultRandom().primaryKey(),
  leadId: uuid("lead_id").references(() => leads.id),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }),
  squareFootage: integer("square_footage"),
  productDetails: jsonb("product_details"),
  status: varchar("status", { length: 50 }).notNull().default("draft"),
  validUntil: timestamp("valid_until"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ── Finance ──

export const invoices = pgTable("invoices", {
  id: uuid("id").defaultRandom().primaryKey(),
  quoteId: uuid("quote_id").references(() => quotes.id),
  invoiceNumber: varchar("invoice_number", { length: 100 }).notNull(),
  customerName: varchar("customer_name", { length: 255 }).notNull(),
  customerEmail: varchar("customer_email", { length: 255 }),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  paidAmount: decimal("paid_amount", { precision: 10, scale: 2 }).default("0"),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  dueDate: timestamp("due_date"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const invoiceItems = pgTable("invoice_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  invoiceId: uuid("invoice_id")
    .references(() => invoices.id)
    .notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  quantity: integer("quantity").notNull(),
  unitPrice: decimal("unit_price", { precision: 10, scale: 2 }).notNull(),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
});

export const expenses = pgTable("expenses", {
  id: uuid("id").defaultRandom().primaryKey(),
  vendorId: uuid("vendor_id").references(() => vendors.id),
  category: varchar("category", { length: 100 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  date: timestamp("date").notNull(),
  receiptUrl: varchar("receipt_url", { length: 500 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
