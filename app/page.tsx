"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PhotoGallery } from "@/components/sections/photo-gallery";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { SectionLoading } from "@/components/common/section-loading";
import { products } from "@/lib/data/products";

// Lazy load below-fold sections (loaded when scrolled into view)
const FeatureHighlights = dynamic(() => import("@/components/sections/feature-highlights").then(mod => ({ default: mod.FeatureHighlights })), {
  loading: () => <SectionLoading />
});

const ComparisonTable = dynamic(() => import("@/components/sections/comparison-table").then(mod => ({ default: mod.ComparisonTable })), {
  loading: () => <SectionLoading />
});

const HowItWorks = dynamic(() => import("@/components/sections/how-it-works").then(mod => ({ default: mod.HowItWorks })), {
  loading: () => <SectionLoading />
});

// Lazy load modal (only loads when opened)
const SampleRequestModal = dynamic(() => import("@/components/modals/sample-request-modal").then(mod => ({ default: mod.SampleRequestModal })), {
  ssr: false
});

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Photo Gallery Section */}
        <PhotoGallery />

        {/* Product Showcases */}
        <div id="products">
          {products.map((product, index) => (
            <ProductShowcase key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Feature Highlights */}
        <FeatureHighlights />

        {/* Comparison Table */}
        <ComparisonTable />

        {/* How It Works */}
        <HowItWorks />

        {/* CTA Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-wood-800 via-wood-900 to-wood-950 py-32">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  90deg,
                  rgba(255, 255, 255, 0.4) 0px,
                  rgba(255, 255, 255, 0.4) 1px,
                  transparent 1px,
                  transparent 3px
                ), repeating-linear-gradient(
                  0deg,
                  rgba(255, 255, 255, 0.1) 0px,
                  rgba(255, 255, 255, 0.1) 1px,
                  transparent 1px,
                  transparent 80px
                )`,
              }}
            />
          </div>

          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-wood-600/20 rounded-full blur-3xl -translate-y-1/2" />
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cream-400/10 rounded-full blur-3xl -translate-y-1/2" />

          <div className="relative mx-auto max-w-5xl px-6 text-center sm:px-8 lg:px-12">
            {/* Overline */}
            <div className="mb-6 inline-flex items-center gap-2 text-sm uppercase tracking-widest text-cream-300 font-semibold">
              <div className="w-8 h-px bg-cream-400/50" />
              <span>Get Started Today</span>
              <div className="w-8 h-px bg-cream-400/50" />
            </div>

            {/* Main headline */}
            <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-white tracking-tight leading-tight mb-6">
              Ready to Transform <br className="hidden sm:block" />
              <span className="italic font-normal text-cream-200">Your Space</span>?
            </h2>

            {/* Subheading */}
            <p className="mx-auto max-w-2xl text-xl sm:text-2xl text-cream-100 font-light leading-relaxed mb-12">
              Start with free samples delivered to your door, or speak with our flooring experts for personalized recommendations
            </p>

            {/* CTAs */}
            <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
              <button
                onClick={() => setIsModalOpen(true)}
                className="group relative overflow-hidden rounded-full bg-white px-10 py-5 text-base font-semibold text-wood-900 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-white/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cream-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center gap-2">
                  Order Free Samples
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="group relative overflow-hidden rounded-full border-2 border-white/30 bg-white/5 backdrop-blur-sm px-10 py-5 text-base font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white/10"
              >
                <span className="relative">Request a Quote</span>
              </button>
            </div>

            {/* Trust indicators */}
            <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-cream-200/80">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-cream-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Free nationwide shipping</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-cream-300/50 hidden sm:block" />
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-cream-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Expert consultation included</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-cream-300/50 hidden sm:block" />
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-cream-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>25-year warranty</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Sample Request Modal */}
      <SampleRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
