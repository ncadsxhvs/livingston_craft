import { z } from "zod";

export const createVendorSchema = z.object({
  name: z.string().min(1, "Vendor name is required"),
  contactName: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().optional(),
  address: z.string().optional(),
  notes: z.string().optional(),
});

export const updateVendorSchema = createVendorSchema.partial();

const shipmentItemSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  sku: z.string().optional(),
  quantity: z.number().int().positive("Quantity must be positive"),
  unit: z.string().optional(),
  type: z.string().optional(),
  weight: z.number().positive().optional(),
  freightClass: z.string().optional(),
  dimensions: z.string().optional(),
  nmfcCode: z.string().optional(),
  stackable: z.boolean().optional(),
  hazmat: z.boolean().optional(),
  notes: z.string().optional(),
});

export const createShipmentSchema = z.object({
  vendorId: z.string().uuid("Invalid vendor ID").optional(),
  bolNumber: z.string().min(1, "BOL number is required"),
  carrier: z.string().optional(),
  trackingNumber: z.string().optional(),
  shipDate: z.string().datetime().optional(),
  proNumber: z.string().optional(),
  serviceLevel: z.string().optional(),
  freightChargeType: z.enum(["prepaid", "collect", "3rd_party"]).optional(),
  shipFromName: z.string().optional(),
  shipFromAddress: z.string().optional(),
  shipFromContact: z.string().optional(),
  shipToName: z.string().optional(),
  shipToAddress: z.string().optional(),
  shipToContact: z.string().optional(),
  totalWeight: z.number().positive().optional(),
  totalPallets: z.number().int().nonnegative().optional(),
  customerPo: z.string().optional(),
  carrierQuoteId: z.string().optional(),
  pickupNumber: z.string().optional(),
  specialInstructions: z.string().optional(),
  notes: z.string().optional(),
  items: z.array(shipmentItemSchema).optional(),
});

export const updateShipmentSchema = createShipmentSchema.partial().omit({ items: true });

export const updateShipmentStatusSchema = z.object({
  status: z.enum([
    "pending",
    "picked_up",
    "in_transit",
    "out_for_delivery",
    "delivered",
    "cancelled",
  ]),
});

export type CreateVendorInput = z.infer<typeof createVendorSchema>;
export type UpdateVendorInput = z.infer<typeof updateVendorSchema>;
export type CreateShipmentInput = z.infer<typeof createShipmentSchema>;
export type UpdateShipmentInput = z.infer<typeof updateShipmentSchema>;
export type UpdateShipmentStatusInput = z.infer<typeof updateShipmentStatusSchema>;
