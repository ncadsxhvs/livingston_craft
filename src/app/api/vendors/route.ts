import { NextResponse } from "next/server";
import { withAuth } from "@backend/lib/api-utils";
import { createVendorSchema } from "@shared/validation/logistics";
import * as vendorService from "@backend/services/vendor.service";
import { ValidationError } from "@backend/lib/errors";

export const GET = withAuth(async () => {
  const vendors = await vendorService.listVendors();
  return NextResponse.json(vendors);
});

export const POST = withAuth(async (request) => {
  const body = await request.json();
  const result = createVendorSchema.safeParse(body);
  if (!result.success) {
    throw new ValidationError(
      "Validation failed",
      result.error.issues.map((e) => ({ field: e.path.join("."), message: e.message }))
    );
  }
  const vendor = await vendorService.createVendor(result.data);
  return NextResponse.json(vendor, { status: 201 });
});
