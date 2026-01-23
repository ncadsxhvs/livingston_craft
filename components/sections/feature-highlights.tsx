"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ShieldCheck,
  Hammer,
  Leaf,
  Droplet,
  Sparkles,
  Headphones,
} from "lucide-react";
import { SectionWrapper } from "@/components/common/section-wrapper";

const features = [
  {
    id: "durability",
    title: "Built to Last",
    description: "Built to withstand life's moments with 25-year warranty",
    icon: ShieldCheck,
  },
  {
    id: "installation",
    title: "Easy Installation",
    description: "Professional installation or DIY-friendly options",
    icon: Hammer,
  },
  {
    id: "eco-friendly",
    title: "Eco-Friendly",
    description: "Sustainably sourced materials with eco certifications",
    icon: Leaf,
  },
  {
    id: "water-resistant",
    title: "Water Resistant",
    description: "Perfect for kitchens, bathrooms, and high-traffic areas",
    icon: Droplet,
  },
  {
    id: "maintenance",
    title: "Low Maintenance",
    description: "Beautiful floors, minimal effort required",
    icon: Sparkles,
  },
  {
    id: "support",
    title: "Lifetime Support",
    description: "Expert guidance from selection to installation",
    icon: Headphones,
  },
];

export function FeatureHighlights() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper id="features" background="cream">
      <div ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
            Why Choose Livingston Craft?
          </h2>
          <p className="mt-4 text-lg text-stone-600">
            Quality, durability, and style you can trust
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-xl"
              >
                {/* Icon */}
                <div className="mb-4 inline-flex rounded-xl bg-cream-100 p-3 text-wood-700 transition-colors group-hover:bg-wood-700 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>

                {/* Content */}
                <h3 className="mb-2 text-xl font-semibold text-stone-900">
                  {feature.title}
                </h3>
                <p className="text-stone-600">{feature.description}</p>

                {/* Hover Effect */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-wood-600 to-wood-800 transform scale-x-0 transition-transform group-hover:scale-x-100" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
