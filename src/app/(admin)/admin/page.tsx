import { db } from "@backend/db";
import { vendors, shipments, shipmentItems } from "@backend/db/schema";
import { eq, sql } from "drizzle-orm";
import Link from "next/link";

export default async function AdminDashboard() {
  const [vendorCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(vendors);

  const [shipmentCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(shipments);

  const [activeShipments] = await db
    .select({ count: sql<number>`count(*)` })
    .from(shipments)
    .where(
      sql`${shipments.status} IN ('pending', 'picked_up', 'in_transit', 'out_for_delivery')`
    );

  const [totalWeight] = await db
    .select({ total: sql<string>`COALESCE(SUM(${shipments.totalWeight}::numeric), 0)` })
    .from(shipments);

  const recentShipments = await db
    .select({
      id: shipments.id,
      bolNumber: shipments.bolNumber,
      carrier: shipments.carrier,
      status: shipments.status,
      shipDate: shipments.shipDate,
      totalWeight: shipments.totalWeight,
      totalPallets: shipments.totalPallets,
      vendorName: vendors.name,
    })
    .from(shipments)
    .leftJoin(vendors, eq(shipments.vendorId, vendors.id))
    .orderBy(sql`${shipments.createdAt} DESC`)
    .limit(5);

  const stats = [
    { label: "Vendors", value: vendorCount.count, href: "/admin/vendors" },
    { label: "Total Shipments", value: shipmentCount.count, href: "/admin/logistics" },
    { label: "Active Shipments", value: activeShipments.count, href: "/admin/logistics" },
    {
      label: "Total Weight",
      value: `${Number(totalWeight.total).toLocaleString()} lbs`,
      href: "/admin/logistics",
    },
  ];

  return (
    <div>
      <h1 className="mb-1 font-serif text-3xl font-light text-wood-900">
        Dashboard
      </h1>
      <p className="mb-8 text-sm text-stone-400">Overview of your logistics operations</p>

      {/* KPI Cards */}
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-2xl border border-stone-200 bg-white p-6 transition-shadow hover:shadow-md"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-stone-400">
              {stat.label}
            </p>
            <p className="mt-2 text-2xl font-semibold text-wood-900">
              {stat.value}
            </p>
          </Link>
        ))}
      </div>

      {/* Recent Shipments */}
      <div className="rounded-2xl border border-stone-200 bg-white">
        <div className="flex items-center justify-between border-b border-stone-100 px-6 py-4">
          <h2 className="text-sm font-semibold text-stone-900">
            Recent Shipments
          </h2>
          <Link
            href="/admin/logistics"
            className="text-xs font-medium text-wood-700 hover:text-wood-900"
          >
            View all
          </Link>
        </div>
        {recentShipments.length === 0 ? (
          <p className="px-6 py-10 text-center text-sm text-stone-400">
            No shipments yet. Create your first shipment to get started.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-stone-100 text-xs uppercase tracking-wider text-stone-400">
                  <th className="px-6 py-3 font-medium">BOL #</th>
                  <th className="px-6 py-3 font-medium">Vendor</th>
                  <th className="px-6 py-3 font-medium">Carrier</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Weight</th>
                  <th className="px-6 py-3 font-medium">Pallets</th>
                  <th className="px-6 py-3 font-medium">Ship Date</th>
                </tr>
              </thead>
              <tbody>
                {recentShipments.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b border-stone-50 last:border-0"
                  >
                    <td className="px-6 py-3 font-medium text-wood-900">
                      <Link href={`/admin/logistics/${s.id}`} className="hover:underline">
                        {s.bolNumber}
                      </Link>
                    </td>
                    <td className="px-6 py-3 text-stone-600">
                      {s.vendorName ?? "—"}
                    </td>
                    <td className="px-6 py-3 text-stone-600">
                      {s.carrier ?? "—"}
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
        )}
      </div>
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
