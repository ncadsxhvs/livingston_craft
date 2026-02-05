"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { SampleRequestModal } from "@/components/modals/sample-request-modal";

const images = [
  {
    src: "/images/homepage/59295445-b3d1-4c62-a3a4-e8a491efca7f.jpg",
    alt: "Premium flooring showcase",
  },
  {
    src: "/images/homepage/grok-image-77a71355-66c7-45f0-ad8c-d7a432f11fa5.png",
    alt: "Luxury interior design",
  },
];

export function PhotoGallery() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToProducts = () => {
    const productsSection = document.getElementById("products");
    productsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-stone-900 via-wood-900 to-stone-950">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl font-light text-white tracking-tight leading-tight mb-6">
            Transform Your <span className="italic font-normal text-cream-200">Space</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl sm:text-2xl text-cream-100/80 font-light leading-relaxed">
            Premium flooring crafted with precision, designed to elevate every corner of your home
          </p>
        </motion.div>

        {/* Photo Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {images.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3 + index * 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative aspect-[4/3] overflow-hidden rounded-3xl"
            >
              {/* Image container with sophisticated shadow */}
              <div className="relative h-full w-full shadow-2xl ring-1 ring-white/10">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={index === 0}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                {/* Subtle grain texture */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
                  <div
                    className="h-full w-full"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button
            onClick={scrollToProducts}
            className="group relative overflow-hidden rounded-full bg-white px-10 py-4 text-base font-medium text-wood-900 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cream-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative">Explore Our Collection</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative overflow-hidden rounded-full border-2 border-white/30 bg-white/5 backdrop-blur-sm px-10 py-4 text-base font-medium text-white hover:border-white hover:bg-white/10 transition-all duration-300"
          >
            <span className="relative">Get Free Samples</span>
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToProducts}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream-300/60 hover:text-white transition-colors duration-300 group"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        aria-label="Scroll to products"
      >
        <span className="text-xs uppercase tracking-wider font-medium">Discover</span>
        <ChevronDown className="h-6 w-6 group-hover:scale-110 transition-transform" />
      </motion.button>

      {/* Sample Request Modal */}
      <SampleRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
