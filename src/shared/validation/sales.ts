import { z } from "zod";

export const createLeadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  source: z.string().optional(),
  notes: z.string().optional(),
});

export const createSampleRequestSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "ZIP code is required"),
  productName: z.string().optional(),
  message: z.string().optional(),
});

export const createQuoteSchema = z.object({
  leadId: z.string().uuid("Invalid lead ID").optional(),
  totalAmount: z.number().positive("Amount must be positive").optional(),
  squareFootage: z.number().int().positive().optional(),
  productDetails: z.record(z.string(), z.unknown()).optional(),
  notes: z.string().optional(),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type CreateSampleRequestInput = z.infer<typeof createSampleRequestSchema>;
export type CreateQuoteInput = z.infer<typeof createQuoteSchema>;
