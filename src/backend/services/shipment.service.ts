import { eq } from "drizzle-orm";
import { db } from "@backend/db";
import { shipments, shipmentItems, vendors } from "@backend/db/schema";
import {
  CreateShipmentInput,
  UpdateShipmentInput,
  UpdateShipmentStatusInput,
} from "@shared/validation/logistics";
import { NotFoundError } from "@backend/lib/errors";

export async function listShipments() {
  return db
    .select({
      id: shipments.id,
      vendorId: shipments.vendorId,
      vendorName: vendors.name,
      bolNumber: shipments.bolNumber,
      status: shipments.status,
      shipDate: shipments.shipDate,
      deliveryDate: shipments.deliveryDate,
      carrier: shipments.carrier,
      trackingNumber: shipments.trackingNumber,
      proNumber: shipments.proNumber,
      serviceLevel: shipments.serviceLevel,
      totalWeight: shipments.totalWeight,
      totalPallets: shipments.totalPallets,
      customerPo: shipments.customerPo,
      createdAt: shipments.createdAt,
    })
    .from(shipments)
    .leftJoin(vendors, eq(shipments.vendorId, vendors.id))
    .orderBy(shipments.createdAt);
}

export async function getShipment(id: string) {
  const [shipment] = await db
    .select()
    .from(shipments)
    .where(eq(shipments.id, id));
  if (!shipment) throw new NotFoundError("Shipment not found");

  const items = await db
    .select()
    .from(shipmentItems)
    .where(eq(shipmentItems.shipmentId, id));

  return { ...shipment, items };
}

export async function createShipment(data: CreateShipmentInput) {
  const { items, totalWeight, totalPallets, ...shipmentData } = data;

  const result = await db.transaction(async (tx) => {
    const [shipment] = await tx
      .insert(shipments)
      .values({
        ...shipmentData,
        shipDate: shipmentData.shipDate ? new Date(shipmentData.shipDate) : undefined,
        totalWeight: totalWeight?.toString(),
        totalPallets,
      })
      .returning();

    if (items?.length) {
      const itemRows = items.map((item) => ({
        shipmentId: shipment.id,
        productName: item.productName,
        sku: item.sku,
        quantity: item.quantity,
        unit: item.unit,
        type: item.type,
        weight: item.weight?.toString(),
        freightClass: item.freightClass,
        dimensions: item.dimensions,
        nmfcCode: item.nmfcCode,
        stackable: item.stackable,
        hazmat: item.hazmat,
        notes: item.notes,
      }));
      await tx.insert(shipmentItems).values(itemRows);
    }

    return shipment;
  });

  return getShipment(result.id);
}

export async function updateShipment(id: string, data: UpdateShipmentInput) {
  const { totalWeight, totalPallets, shipDate, ...rest } = data;
  const [shipment] = await db
    .update(shipments)
    .set({
      ...rest,
      ...(shipDate !== undefined && { shipDate: new Date(shipDate) }),
      ...(totalWeight !== undefined && { totalWeight: totalWeight.toString() }),
      ...(totalPallets !== undefined && { totalPallets }),
      updatedAt: new Date(),
    })
    .where(eq(shipments.id, id))
    .returning();
  if (!shipment) throw new NotFoundError("Shipment not found");
  return shipment;
}

export async function updateShipmentStatus(id: string, data: UpdateShipmentStatusInput) {
  const [shipment] = await db
    .update(shipments)
    .set({ status: data.status, updatedAt: new Date() })
    .where(eq(shipments.id, id))
    .returning();
  if (!shipment) throw new NotFoundError("Shipment not found");
  return shipment;
}

export async function deleteShipment(id: string) {
  const [shipment] = await db
    .delete(shipments)
    .where(eq(shipments.id, id))
    .returning();
  if (!shipment) throw new NotFoundError("Shipment not found");
  return shipment;
}
