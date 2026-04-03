import { NextResponse } from "next/server";
import { withAuth } from "@backend/lib/api-utils";
import { updateVendorSchema } from "@shared/validation/logistics";
import * as vendorService from "@backend/services/vendor.service";
import { ValidationError } from "@backend/lib/errors";

type Params = { params: Promise<{ id: string }> };

export const GET = withAuth(async (_request: Request, context?: { user?: { id: string; email: string } }) => {
  const url = new URL(_request.url);
  const id = url.pathname.split("/").pop()!;
  const vendor = await vendorService.getVendor(id);
  return NextResponse.json(vendor);
});

export const PUT = withAuth(async (request: Request) => {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop()!;
  const body = await request.json();
  const result = updateVendorSchema.safeParse(body);
  if (!result.success) {
    throw new ValidationError(
      "Validation failed",
      result.error.issues.map((e) => ({ field: e.path.join("."), message: e.message }))
    );
  }
  const vendor = await vendorService.updateVendor(id, result.data);
  return NextResponse.json(vendor);
});

export const DELETE = withAuth(async (request: Request) => {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop()!;
  await vendorService.deleteVendor(id);
  return NextResponse.json({ success: true });
});
