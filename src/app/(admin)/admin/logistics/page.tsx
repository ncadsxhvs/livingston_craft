import { db } from "@backend/db";
import { shipments, vendors } from "@backend/db/schema";
import { eq, sql } from "drizzle-orm";
import Link from "next/link";

export default async function LogisticsPage() {
  const shipmentList = await db
    .select({
      id: shipments.id,
      bolNumber: shipments.bolNumber,
      proNumber: shipments.proNumber,
      status: shipments.status,
      carrier: shipments.carrier,
      serviceLevel: shipments.serviceLevel,
      shipDate: shipments.shipDate,
      deliveryDate: shipments.deliveryDate,
      totalWeight: shipments.totalWeight,
      totalPallets: shipments.totalPallets,
      customerPo: shipments.customerPo,
      shipFromName: shipments.shipFromName,
      shipToName: shipments.shipToName,
      vendorName: vendors.name,
      createdAt: shipments.createdAt,
    })
    .from(shipments)
    .leftJoin(vendors, eq(shipments.vendorId, vendors.id))
    .orderBy(sql`${shipments.createdAt} DESC`);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-1 font-serif text-3xl font-light text-wood-900">
            Logistics
          </h1>
          <p className="text-sm text-stone-400">
            {shipmentList.length} shipment{shipmentList.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {shipmentList.length === 0 ? (
        <div className="rounded-2xl border border-stone-200 bg-white px-6 py-16 text-center">
          <p className="text-sm text-stone-400">
            No shipments yet. Use the API or seed script to add shipments.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-stone-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-stone-100 text-xs uppercase tracking-wider text-stone-400">
                  <th className="px-6 py-3 font-medium">BOL #</th>
                  <th className="px-6 py-3 font-medium">PRO #</th>
                  <th className="px-6 py-3 font-medium">Vendor</th>
                  <th className="px-6 py-3 font-medium">Carrier</th>
                  <th className="px-6 py-3 font-medium">Route</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Weight</th>
                  <th className="px-6 py-3 font-medium">Pallets</th>
                  <th className="px-6 py-3 font-medium">Ship Date</th>
                </tr>
              </thead>
              <tbody>
                {shipmentList.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b border-stone-50 last:border-0 transition-colors hover:bg-cream-50"
                  >
                    <td className="px-6 py-3 font-medium text-wood-900">
                      <Link href={`/admin/logistics/${s.id}`} className="hover:underline">
                        {s.bolNumber}
                      </Link>
                    </td>
                    <td className="px-6 py-3 text-stone-600">
                      {s.proNumber ?? "—"}
                    </td>
                    <td className="px-6 py-3 text-stone-600">
                      {s.vendorName ?? "—"}
                    </td>
                    <td className="px-6 py-3 text-stone-600">
                      {s.carrier ?? "—"}
                      {s.serviceLevel && (
                        <span className="ml-1.5 text-xs text-stone-400">
                          ({s.serviceLevel})
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-stone-600">
                      <span className="block text-xs">{s.shipFromName ?? "—"}</span>
                      <span className="block text-xs text-stone-400">
                        → {s.shipToName ?? "—"}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <StatusBadge status={s.status} />
                    </td>
                    <td className="px-6 py-3 text-stone-600">
                      {s.totalWeight
                        ? `${Number(s.totalWeight).toLocaleString()} lbs`
                        : "—"}
                    </td>
                    <td className="px-6 py-3 text-stone-600">
                      {s.totalPallets ?? "—"}
                    </td>
                    <td className="px-6 py-3 text-stone-600">
                      {s.shipDate
                        ? new Date(s.shipDate).toLocaleDateString()
                        : "—"}
                    </td>
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

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-amber-50 text-amber-700",
    picked_up: "bg-blue-50 text-blue-700",
    in_transit: "bg-indigo-50 text-indigo-700",
    out_for_delivery: "bg-purple-50 text-purple-700",
    delivered: "bg-emerald-50 text-emerald-700",
    cancelled: "bg-stone-100 text-stone-500",
  };
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status] ?? "bg-stone-100 text-stone-600"}`}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}
