import { config } from "dotenv";
config({ path: ".env.local" });

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { vendors, shipments, shipmentItems } from "./schema";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

async function seed() {
  console.log("Seeding database...");

  // Vendor: Everbright Flooring Inc
  const [vendor] = await db
    .insert(vendors)
    .values({
      name: "Everbright Flooring Inc",
      contactName: "Sharon",
      phone: "+510-732-0888",
      address: "33001 Dowe Ave, Union City, CA 94587",
      notes: "Business Hours: Mon-Fri, 8:30 AM - 4:00 PM. Release Number: INV#30454",
    })
    .returning();

  console.log(`Created vendor: ${vendor.name} (${vendor.id})`);

  // Shipment: BOL #36229776
  const [shipment] = await db
    .insert(shipments)
    .values({
      vendorId: vendor.id,
      bolNumber: "36229776",
      status: "in_transit",
      carrier: "Roadrunner",
      proNumber: "669644445",
      serviceLevel: "Direct",
      freightChargeType: "3rd_party",
      shipDate: new Date("2026-04-02"),
      shipFromName: "EVERBRIGHT FLOORING INC",
      shipFromAddress: "33001 Dowe Ave, Union City, CA 94587",
      shipFromContact: "Karen",
      shipToName: "KING FREIGHT NY WHSE",
      shipToAddress: "23 Commerce Road, STE K, Fairfield, NJ 07004",
      shipToContact: "Sally Yu — 201-355-2979",
      totalWeight: "10760",
      totalPallets: 4,
      customerPo: "DEL OTHER0100130",
      carrierQuoteId: "81660905",
      pickupNumber: "INV30454",
      specialInstructions: "FCFS 9:00 AM to 4:00 PM. Contact: Sally Yu, 201-355-2979",
    })
    .returning();

  console.log(`Created shipment: BOL #${shipment.bolNumber} (${shipment.id})`);

  // Shipment items
  await db.insert(shipmentItems).values([
    {
      shipmentId: shipment.id,
      productName: "Flooring",
      quantity: 2,
      type: "Pallets",
      weight: "5380",
      freightClass: "60.0",
      dimensions: "76 x 40 x 46",
      nmfcCode: "70950-08",
      unit: "pallets",
    },
    {
      shipmentId: shipment.id,
      productName: "Flooring",
      quantity: 2,
      type: "Pallets",
      weight: "5380",
      freightClass: "60.0",
      dimensions: "76 x 40 x 53",
      nmfcCode: "70950-08",
      unit: "pallets",
    },
  ]);

  console.log("Created 2 shipment items");
  console.log("Seed complete!");
  await pool.end();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
