"use client";

import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const scrollToProducts = () => {
    const productsSection = document.getElementById("products");
    productsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-cream-100 via-cream-50 to-white">
      {/* Animated grain texture */}
      <div className="absolute inset-0 opacity-[0.015] animate-grain pointer-events-none">
        <div
          className="h-[200%] w-[200%]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Decorative wood grain pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              rgba(117, 83, 68, 0.4) 0px,
              rgba(117, 83, 68, 0.4) 1px,
              transparent 1px,
              transparent 3px
            ), repeating-linear-gradient(
              0deg,
              rgba(117, 83, 68, 0.1) 0px,
              rgba(117, 83, 68, 0.1) 1px,
              transparent 1px,
              transparent 80px
            )`,
          }}
        />
      </div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-wood-200/20 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cream-300/20 blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          {/* Promotional Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 inline-block"
          >
            <div className="group relative overflow-hidden rounded-full border border-wood-200/50 bg-white/80 backdrop-blur-sm px-6 py-2.5 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-wood-100/0 via-wood-100/50 to-wood-100/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <div className="relative flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-wood-600" />
                <p className="text-sm font-medium text-wood-900">
                  <span className="font-semibold">Free consultation</span> with every purchase
                </p>
              </div>
            </div>
          </motion.div>

          {/* Main Headline with staggered reveal */}
          <div className="mb-6 overflow-hidden">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-7xl sm:text-8xl lg:text-9xl font-light text-wood-900 tracking-tight leading-[0.95]"
            >
              Transform
            </motion.h1>
          </div>
          <div className="mb-8 overflow-hidden">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-7xl sm:text-8xl lg:text-9xl font-light text-wood-900 tracking-tight leading-[0.95]"
            >
              Your <span className="italic font-normal text-wood-700">Space</span>
            </motion.h1>
          </div>

          {/* Divider line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto w-24 h-px bg-gradient-to-r from-transparent via-wood-400 to-transparent mb-8"
          />

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mx-auto max-w-2xl text-xl sm:text-2xl text-stone-600 font-light leading-relaxed"
          >
            Premium flooring crafted with precision, designed to elevate every corner of your home
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <button
              onClick={scrollToProducts}
              className="group relative overflow-hidden rounded-full bg-gradient-to-br from-wood-700 to-wood-900 px-10 py-4 text-base font-medium text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative">Explore Our Collection</span>
            </button>
            <button className="group relative overflow-hidden rounded-full border-2 border-wood-800 bg-transparent px-10 py-4 text-base font-medium text-wood-900 hover:bg-wood-800 hover:text-white transition-all duration-300">
              <span className="relative">Request a Quote</span>
            </button>
          </motion.div>

          {/* Trust Indicators with refined styling */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm"
          >
            <div className="flex items-center gap-2.5 text-stone-600">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-amber-500" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="font-medium">50,000+ homeowners</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-stone-300 hidden sm:block" />
            <div className="text-stone-600 font-medium">Free samples nationwide</div>
            <div className="w-1 h-1 rounded-full bg-stone-300 hidden sm:block" />
            <div className="text-stone-600 font-medium">25-year warranty</div>
          </motion.div>
        </motion.div>
      </div>

      {/* Refined Scroll Indicator */}
      <motion.button
        onClick={scrollToProducts}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-400 hover:text-wood-700 transition-colors duration-300 group"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        aria-label="Scroll to products"
      >
        <span className="text-xs uppercase tracking-wider font-medium">Discover</span>
        <ChevronDown className="h-6 w-6 group-hover:scale-110 transition-transform" />
      </motion.button>
    </section>
  );
}
