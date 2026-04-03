import { NextResponse } from "next/server";
import { withAuth } from "@backend/lib/api-utils";
import { updateShipmentStatusSchema } from "@shared/validation/logistics";
import * as shipmentService from "@backend/services/shipment.service";
import { ValidationError } from "@backend/lib/errors";

export const PATCH = withAuth(async (request: Request) => {
  const parts = new URL(request.url).pathname.split("/");
  const id = parts.at(-2)!;
  const body = await request.json();
  const result = updateShipmentStatusSchema.safeParse(body);
  if (!result.success) {
    throw new ValidationError(
      "Validation failed",
      result.error.issues.map((e) => ({ field: e.path.join("."), message: e.message }))
    );
  }
  const shipment = await shipmentService.updateShipmentStatus(id, result.data);
  return NextResponse.json(shipment);
});
