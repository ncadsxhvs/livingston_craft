"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Product } from "@/types/product";
import { ColorSwatch } from "@/components/common/color-swatch";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ProductSchema } from "@/components/seo/structured-data";

// Lazy load modal (only loads when opened)
const SampleRequestModal = dynamic(() => import("@/components/modals/sample-request-modal").then(mod => ({ default: mod.SampleRequestModal })), {
  ssr: false
});

interface ProductShowcaseProps {
  product: Product;
  index: number;
}

export function ProductShowcase({ product, index }: ProductShowcaseProps) {
  const [activeColorId, setActiveColorId] = useState(product.colors[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const activeColor = product.colors.find((c) => c.id === activeColorId) || product.colors[0];
  const isReverse = index % 2 !== 0;

  const siteUrl = typeof window !== 'undefined'
    ? window.location.origin
    : process.env.NEXT_PUBLIC_SITE_URL || 'https://livingstoncraft.com';

  return (
    <section
      ref={ref}
      id={product.id}
      className="relative min-h-screen flex items-center py-24 overflow-hidden bg-white"
    >
      {/* SEO: Product Structured Data */}
      <ProductSchema product={product} siteUrl={siteUrl} />

      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream-50/40 via-transparent to-stone-50/40 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 w-full relative z-10">
        <div
          className={cn(
            "grid gap-16 lg:grid-cols-12 lg:gap-20 items-center",
            isReverse && "lg:grid-flow-dense"
          )}
        >
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: isReverse ? 60 : -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className={cn("relative lg:col-span-6", isReverse && "lg:col-start-7")}
          >
            <div className="relative group">
              {/* Main image container with sophisticated shadow */}
              <div className="relative aspect-[5/4] overflow-hidden rounded-3xl bg-stone-100 shadow-2xl ring-1 ring-black/5">
                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent z-10 pointer-events-none" />

                {/* Placeholder Image */}
                <div
                  className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundColor: activeColor.hex }}
                >
                  <div className="text-center p-8 relative z-20">
                    <p className="font-serif text-3xl font-light text-white/90 drop-shadow-lg">
                      {product.name}
                    </p>
                    <p className="text-xl text-white/70 mt-3 drop-shadow">
                      {activeColor.name}
                    </p>
                    <div className="mt-8 w-16 h-px bg-white/40 mx-auto" />
                  </div>
                </div>

                {/* Subtle grain texture */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-20 mix-blend-overlay">
                  <div
                    className="h-full w-full"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }}
                  />
                </div>
              </div>

              {/* Floating Price Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -12 }}
                animate={isInView ? { scale: 1, rotate: -6 } : {}}
                transition={{ delay: 0.5, type: "spring", bounce: 0.4 }}
                className="absolute -right-6 -top-6 z-30"
              >
                <div className="relative group/badge">
                  <div className="absolute inset-0 bg-gradient-to-br from-wood-600 to-wood-800 rounded-2xl blur-xl opacity-40 group-hover/badge:opacity-60 transition-opacity" />
                  <div className="relative bg-white rounded-2xl px-6 py-4 shadow-2xl border border-stone-200/50">
                    <p className="text-xs uppercase tracking-wider text-stone-500 font-semibold">From</p>
                    <p className="text-lg font-bold text-wood-900 mt-0.5">
                      {product.priceRange}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Decorative accent */}
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-wood-200/30 to-cream-300/30 rounded-full blur-2xl -z-10" />
            </div>
          </motion.div>

          {/* Product Content */}
          <motion.div
            initial={{ opacity: 0, x: isReverse ? -60 : 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className={cn("lg:col-span-6", isReverse && "lg:col-start-1 lg:row-start-1")}
          >
            <div className="space-y-8 max-w-xl">
              {/* Product Name */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  <h2 className="font-serif text-6xl sm:text-7xl font-light text-wood-900 tracking-tight leading-[0.95]">
                    {product.name}
                  </h2>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="flex items-center gap-3"
                >
                  <div className="h-px w-12 bg-gradient-to-r from-wood-400 to-transparent" />
                  <p className="text-xl text-stone-600 font-light italic">{product.tagline}</p>
                </motion.div>
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-lg text-stone-600 leading-relaxed"
              >
                {product.description}
              </motion.p>

              {/* Color Swatches */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="space-y-4 pt-2"
              >
                <p className="text-sm uppercase tracking-wider text-stone-900 font-semibold">
                  Available Colors
                </p>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <ColorSwatch
                      key={color.id}
                      color={color}
                      isActive={color.id === activeColorId}
                      onClick={() => setActiveColorId(color.id)}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="space-y-3 pt-2"
              >
                {product.features.map((feature, i) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.9 + i * 0.08 }}
                    className="flex items-start gap-3 group/feature"
                  >
                    <CheckCircle2 className="w-5 h-5 text-wood-600 mt-0.5 flex-shrink-0 group-hover/feature:text-wood-800 transition-colors" />
                    <span className="text-stone-700 leading-relaxed">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="flex flex-wrap gap-4 pt-6"
              >
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group relative overflow-hidden rounded-full bg-gradient-to-br from-wood-700 to-wood-900 px-8 py-4 text-base font-medium text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center gap-2">
                    Get Free Sample
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <button className="group relative overflow-hidden rounded-full border-2 border-stone-300 bg-transparent px-8 py-4 text-base font-medium text-stone-900 hover:border-wood-800 hover:bg-wood-800 hover:text-white transition-all duration-300">
                  <span className="relative">Learn More</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Sample Request Modal */}
      <SampleRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={product.name}
      />
    </section>
  );
}

// Helper function to conditionally join classnames
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
