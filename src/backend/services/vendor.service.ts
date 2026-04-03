import { eq } from "drizzle-orm";
import { db } from "@backend/db";
import { vendors } from "@backend/db/schema";
import { CreateVendorInput, UpdateVendorInput } from "@shared/validation/logistics";
import { NotFoundError } from "@backend/lib/errors";

export async function listVendors() {
  return db.select().from(vendors).orderBy(vendors.name);
}

export async function getVendor(id: string) {
  const [vendor] = await db.select().from(vendors).where(eq(vendors.id, id));
  if (!vendor) throw new NotFoundError("Vendor not found");
  return vendor;
}

export async function createVendor(data: CreateVendorInput) {
  const [vendor] = await db.insert(vendors).values(data).returning();
  return vendor;
}

export async function updateVendor(id: string, data: UpdateVendorInput) {
  const [vendor] = await db
    .update(vendors)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(vendors.id, id))
    .returning();
  if (!vendor) throw new NotFoundError("Vendor not found");
  return vendor;
}

export async function deleteVendor(id: string) {
  const [vendor] = await db.delete(vendors).where(eq(vendors.id, id)).returning();
  if (!vendor) throw new NotFoundError("Vendor not found");
  return vendor;
}
