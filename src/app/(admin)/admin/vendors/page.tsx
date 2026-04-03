import { db } from "@backend/db";
import { vendors, shipments } from "@backend/db/schema";
import { eq, sql } from "drizzle-orm";

export default async function VendorsPage() {
  const vendorList = await db
    .select({
      id: vendors.id,
      name: vendors.name,
      contactName: vendors.contactName,
      phone: vendors.phone,
      email: vendors.email,
      address: vendors.address,
      notes: vendors.notes,
      shipmentCount: sql<number>`count(${shipments.id})`,
    })
    .from(vendors)
    .leftJoin(shipments, eq(vendors.id, shipments.vendorId))
    .groupBy(vendors.id)
    .orderBy(vendors.name);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-1 font-serif text-3xl font-light text-wood-900">
            Vendors
          </h1>
          <p className="text-sm text-stone-400">
            {vendorList.length} vendor{vendorList.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {vendorList.length === 0 ? (
        <div className="rounded-2xl border border-stone-200 bg-white px-6 py-16 text-center">
          <p className="text-sm text-stone-400">
            No vendors yet. Use the API or seed script to add vendors.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vendorList.map((v) => (
            <div
              key={v.id}
              className="rounded-2xl border border-stone-200 bg-white p-6"
            >
              <h3 className="text-base font-semibold text-wood-900">
                {v.name}
              </h3>
              {v.contactName && (
                <p className="mt-1 text-sm text-stone-500">
                  Contact: {v.contactName}
                </p>
              )}
              {v.phone && (
                <p className="mt-0.5 text-sm text-stone-500">{v.phone}</p>
              )}
              {v.address && (
                <p className="mt-0.5 text-sm text-stone-400">{v.address}</p>
              )}
              <div className="mt-4 flex items-center gap-3 border-t border-stone-100 pt-4">
                <span className="rounded-full bg-cream-100 px-2.5 py-0.5 text-xs font-medium text-wood-800">
                  {v.shipmentCount} shipment{v.shipmentCount !== 1 ? "s" : ""}
                </span>
              </div>
              {v.notes && (
                <p className="mt-3 text-xs text-stone-400">{v.notes}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
