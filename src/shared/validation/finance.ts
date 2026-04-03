import { z } from "zod";

export const createInvoiceSchema = z.object({
  quoteId: z.string().uuid("Invalid quote ID").optional(),
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  customerName: z.string().min(1, "Customer name is required"),
  customerEmail: z.string().email("Invalid email").optional().or(z.literal("")),
  dueDate: z.string().datetime().optional(),
  notes: z.string().optional(),
  items: z
    .array(
      z.object({
        description: z.string().min(1, "Description is required"),
        quantity: z.number().int().positive("Quantity must be positive"),
        unitPrice: z.number().positive("Unit price must be positive"),
      })
    )
    .min(1, "At least one item is required"),
});

export const createExpenseSchema = z.object({
  vendorId: z.string().uuid("Invalid vendor ID").optional(),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  amount: z.number().positive("Amount must be positive"),
  date: z.string().datetime("Invalid date"),
  receiptUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  notes: z.string().optional(),
});

export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>;
export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;
