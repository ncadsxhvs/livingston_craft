import { NextResponse } from "next/server";
import { withAuth } from "@backend/lib/api-utils";
import { createShipmentSchema } from "@shared/validation/logistics";
import * as shipmentService from "@backend/services/shipment.service";
import { ValidationError } from "@backend/lib/errors";

export const GET = withAuth(async () => {
  const shipments = await shipmentService.listShipments();
  return NextResponse.json(shipments);
});

export const POST = withAuth(async (request) => {
  const body = await request.json();
  const result = createShipmentSchema.safeParse(body);
  if (!result.success) {
    throw new ValidationError(
      "Validation failed",
      result.error.issues.map((e) => ({ field: e.path.join("."), message: e.message }))
    );
  }
  const shipment = await shipmentService.createShipment(result.data);
  return NextResponse.json(shipment, { status: 201 });
});
