"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, X } from "lucide-react";
import { SectionWrapper } from "@frontend/components/common/section-wrapper";
import { products } from "@frontend/lib/data/products";

const comparisonData = products.map((product) => ({
  name: product.name,
  price: product.priceRange,
  durability: product.durability,
  waterResistance: product.waterResistance,
  installation: product.installation,
  maintenance: product.maintenance,
}));

const getRatingIcon = (rating: string) => {
  const lowerRating = rating.toLowerCase();
  if (lowerRating.includes("excellent")) {
    return <span className="text-green-600">★★★★★</span>;
  } else if (lowerRating.includes("very good") || lowerRating.includes("good")) {
    return <span className="text-green-600">★★★★☆</span>;
  } else if (lowerRating.includes("moderate")) {
    return <span className="text-yellow-600">★★★☆☆</span>;
  }
  return <span className="text-stone-400">★★☆☆☆</span>;
};

export function ComparisonTable() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper id="comparison" background="white">
      <div ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
            Compare Our Products
          </h2>
          <p className="mt-4 text-lg text-stone-600">
            Find the perfect flooring for your needs
          </p>
        </motion.div>

        {/* Table Container - Horizontal Scroll on Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-lg"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50">
                <th className="sticky left-0 bg-stone-50 px-6 py-4 text-left text-sm font-semibold text-stone-900">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-stone-900">
                  Price Range
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-stone-900">
                  Durability
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-stone-900">
                  Water Resistance
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-stone-900">
                  Installation
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-stone-900">
                  Maintenance
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {comparisonData.map((product, index) => (
                <motion.tr
                  key={product.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="transition-colors hover:bg-cream-50"
                >
                  <td className="sticky left-0 bg-white px-6 py-4 font-semibold text-stone-900 hover:bg-cream-50">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 text-stone-700">{product.price}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getRatingIcon(product.durability)}
                      <span className="text-sm text-stone-600">
                        {product.durability}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getRatingIcon(product.waterResistance)}
                      <span className="text-sm text-stone-600">
                        {product.waterResistance}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-stone-700">
                    {product.installation}
                  </td>
                  <td className="px-6 py-4 text-stone-700">
                    {product.maintenance}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Help Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 text-center text-sm text-stone-500"
        >
          Not sure which flooring is right for you?{" "}
          <a href="#contact" className="font-semibold text-wood-700 hover:underline">
            Talk to an expert
          </a>
        </motion.p>
      </div>
    </SectionWrapper>
  );
}
