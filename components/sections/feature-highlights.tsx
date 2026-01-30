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
    color: "from-amber-500/10 to-amber-600/10",
    iconColor: "text-amber-700",
  },
  {
    id: "installation",
    title: "Easy Installation",
    description: "Professional installation or DIY-friendly options",
    icon: Hammer,
    color: "from-wood-500/10 to-wood-600/10",
    iconColor: "text-wood-700",
  },
  {
    id: "eco-friendly",
    title: "Eco-Friendly",
    description: "Sustainably sourced materials with eco certifications",
    icon: Leaf,
    color: "from-emerald-500/10 to-emerald-600/10",
    iconColor: "text-emerald-700",
  },
  {
    id: "water-resistant",
    title: "Water Resistant",
    description: "Perfect for kitchens, bathrooms, and high-traffic areas",
    icon: Droplet,
    color: "from-blue-500/10 to-blue-600/10",
    iconColor: "text-blue-700",
  },
  {
    id: "maintenance",
    title: "Low Maintenance",
    description: "Beautiful floors, minimal effort required",
    icon: Sparkles,
    color: "from-purple-500/10 to-purple-600/10",
    iconColor: "text-purple-700",
  },
  {
    id: "support",
    title: "Lifetime Support",
    description: "Expert guidance from selection to installation",
    icon: Headphones,
    color: "from-rose-500/10 to-rose-600/10",
    iconColor: "text-rose-700",
  },
];

export function FeatureHighlights() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper id="features" background="cream">
      <div ref={ref} className="relative">
        {/* Decorative background elements */}
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-wood-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-cream-300/20 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center relative z-10"
        >
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-wood-900 tracking-tight mb-6">
            Why Choose <span className="italic font-normal">Livingston Craft</span>?
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-stone-600 font-light leading-relaxed">
            Quality, durability, and style you can trust. Every floor tells a story of craftsmanship.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + index * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative h-full overflow-hidden rounded-3xl bg-white p-8 shadow-lg ring-1 ring-black/5 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-6 inline-flex">
                      <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${feature.color} transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                        <Icon className={`h-7 w-7 ${feature.iconColor} transition-colors duration-500`} />

                        {/* Glow effect */}
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 -z-10`} />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 text-2xl font-semibold text-wood-900 transition-colors duration-300">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-stone-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-wood-100/50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Bottom border accent */}
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-wood-600 via-wood-700 to-wood-800 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA accent */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-16 text-center relative z-10"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/60 backdrop-blur-sm border border-wood-200/50 shadow-lg">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 fill-amber-500" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-medium text-stone-700">
              Rated 4.9/5 from over 10,000 reviews
            </span>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
