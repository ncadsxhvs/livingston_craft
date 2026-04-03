import { NextResponse } from "next/server";
import { withAuth } from "@backend/lib/api-utils";
import { updateShipmentSchema } from "@shared/validation/logistics";
import * as shipmentService from "@backend/services/shipment.service";
import { ValidationError } from "@backend/lib/errors";

export const GET = withAuth(async (request: Request) => {
  const id = new URL(request.url).pathname.split("/").at(-1)!;
  const shipment = await shipmentService.getShipment(id);
  return NextResponse.json(shipment);
});

export const PUT = withAuth(async (request: Request) => {
  const id = new URL(request.url).pathname.split("/").at(-1)!;
  const body = await request.json();
  const result = updateShipmentSchema.safeParse(body);
  if (!result.success) {
    throw new ValidationError(
      "Validation failed",
      result.error.issues.map((e) => ({ field: e.path.join("."), message: e.message }))
    );
  }
  const shipment = await shipmentService.updateShipment(id, result.data);
  return NextResponse.json(shipment);
});

export const DELETE = withAuth(async (request: Request) => {
  const id = new URL(request.url).pathname.split("/").at(-1)!;
  await shipmentService.deleteShipment(id);
  return NextResponse.json({ success: true });
});
