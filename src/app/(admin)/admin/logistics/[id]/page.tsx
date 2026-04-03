import { db } from "@backend/db";
import { shipments, shipmentItems, vendors } from "@backend/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ShipmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [shipment] = await db
    .select({
      id: shipments.id,
      bolNumber: shipments.bolNumber,
      proNumber: shipments.proNumber,
      status: shipments.status,
      carrier: shipments.carrier,
      serviceLevel: shipments.serviceLevel,
      freightChargeType: shipments.freightChargeType,
      trackingNumber: shipments.trackingNumber,
      shipDate: shipments.shipDate,
      deliveryDate: shipments.deliveryDate,
      shipFromName: shipments.shipFromName,
      shipFromAddress: shipments.shipFromAddress,
      shipFromContact: shipments.shipFromContact,
      shipToName: shipments.shipToName,
      shipToAddress: shipments.shipToAddress,
      shipToContact: shipments.shipToContact,
      totalWeight: shipments.totalWeight,
      totalPallets: shipments.totalPallets,
      customerPo: shipments.customerPo,
      carrierQuoteId: shipments.carrierQuoteId,
      pickupNumber: shipments.pickupNumber,
      specialInstructions: shipments.specialInstructions,
      notes: shipments.notes,
      vendorName: vendors.name,
    })
    .from(shipments)
    .leftJoin(vendors, eq(shipments.vendorId, vendors.id))
    .where(eq(shipments.id, id));

  if (!shipment) notFound();

  const items = await db
    .select()
    .from(shipmentItems)
    .where(eq(shipmentItems.shipmentId, id));

  const statusStyles: Record<string, string> = {
    pending: "bg-amber-50 text-amber-700",
    picked_up: "bg-blue-50 text-blue-700",
    in_transit: "bg-indigo-50 text-indigo-700",
    out_for_delivery: "bg-purple-50 text-purple-700",
    delivered: "bg-emerald-50 text-emerald-700",
    cancelled: "bg-stone-100 text-stone-500",
  };

  return (
    <div>
      <Link
        href="/admin/logistics"
        className="mb-4 inline-block text-sm text-stone-400 hover:text-wood-700"
      >
        ← Back to Logistics
      </Link>

      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="mb-1 font-serif text-3xl font-light text-wood-900">
            BOL #{shipment.bolNumber}
          </h1>
          <p className="text-sm text-stone-400">
            {shipment.vendorName && `${shipment.vendorName} · `}
            {shipment.carrier}
            {shipment.serviceLevel && ` (${shipment.serviceLevel})`}
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${statusStyles[shipment.status] ?? "bg-stone-100 text-stone-600"}`}
        >
          {shipment.status.replace(/_/g, " ")}
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Shipment Info */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-stone-400">
            Shipment Details
          </h2>
          <dl className="space-y-3 text-sm">
            <Field label="PRO #" value={shipment.proNumber} />
            <Field label="Carrier Quote ID" value={shipment.carrierQuoteId} />
            <Field label="Customer PO" value={shipment.customerPo} />
            <Field label="Pickup Number" value={shipment.pickupNumber} />
            <Field label="Freight Charges" value={shipment.freightChargeType} />
            <Field
              label="Ship Date"
              value={shipment.shipDate ? new Date(shipment.shipDate).toLocaleDateString() : null}
            />
            <Field
              label="Delivery Date"
              value={shipment.deliveryDate ? new Date(shipment.deliveryDate).toLocaleDateString() : null}
            />
            <Field
              label="Total Weight"
              value={shipment.totalWeight ? `${Number(shipment.totalWeight).toLocaleString()} lbs` : null}
            />
            <Field
              label="Total Pallets"
              value={shipment.totalPallets?.toString()}
            />
          </dl>
        </div>

        {/* Route */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-stone-200 bg-white p-6">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-stone-400">
              Ship From
            </h2>
            <p className="font-medium text-wood-900">{shipment.shipFromName ?? "—"}</p>
            {shipment.shipFromAddress && (
              <p className="mt-1 text-sm text-stone-500">{shipment.shipFromAddress}</p>
            )}
            {shipment.shipFromContact && (
              <p className="mt-1 text-sm text-stone-400">Contact: {shipment.shipFromContact}</p>
            )}
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-6">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-stone-400">
              Ship To
            </h2>
            <p className="font-medium text-wood-900">{shipment.shipToName ?? "—"}</p>
            {shipment.shipToAddress && (
              <p className="mt-1 text-sm text-stone-500">{shipment.shipToAddress}</p>
            )}
            {shipment.shipToContact && (
              <p className="mt-1 text-sm text-stone-400">Contact: {shipment.shipToContact}</p>
            )}
          </div>
        </div>
      </div>

      {/* Special Instructions */}
      {shipment.specialInstructions && (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-amber-700">
            Special Instructions
          </h2>
          <p className="text-sm text-amber-900">{shipment.specialInstructions}</p>
        </div>
      )}

      {/* Line Items */}
      {items.length > 0 && (
        <div className="mt-6 rounded-2xl border border-stone-200 bg-white">
          <div className="border-b border-stone-100 px-6 py-4">
            <h2 className="text-sm font-semibold text-stone-900">
              Cargo — {items.length} item{items.length !== 1 ? "s" : ""}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-stone-100 text-xs uppercase tracking-wider text-stone-400">
                  <th className="px-6 py-3 font-medium">Qty</th>
                  <th className="px-6 py-3 font-medium">Type</th>
                  <th className="px-6 py-3 font-medium">Description</th>
                  <th className="px-6 py-3 font-medium">Weight</th>
                  <th className="px-6 py-3 font-medium">Class</th>
                  <th className="px-6 py-3 font-medium">Dimensions</th>
                  <th className="px-6 py-3 font-medium">NMFC</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-stone-50 last:border-0"
                  >
                    <td className="px-6 py-3 text-stone-900">{item.quantity}</td>
                    <td className="px-6 py-3 text-stone-600">{item.type ?? "—"}</td>
                    <td className="px-6 py-3 text-stone-600">{item.productName}</td>
                    <td className="px-6 py-3 text-stone-600">
                      {item.weight ? `${Number(item.weight).toLocaleString()} lbs` : "—"}
                    </td>
                    <td className="px-6 py-3 text-stone-600">{item.freightClass ?? "—"}</td>
                    <td className="px-6 py-3 text-stone-600">{item.dimensions ?? "—"}</td>
                    <td className="px-6 py-3 text-stone-600">{item.nmfcCode ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div className="flex justify-between">
      <dt className="text-stone-400">{label}</dt>
      <dd className="font-medium text-stone-900">{value}</dd>
    </div>
  );
}
