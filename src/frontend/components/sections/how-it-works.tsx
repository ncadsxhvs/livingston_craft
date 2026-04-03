"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Search, Package, FileText, Wrench } from "lucide-react";
import { SectionWrapper } from "@frontend/components/common/section-wrapper";

const steps = [
  {
    number: 1,
    title: "Browse & Select",
    description: "Explore our collections and find your perfect flooring style",
    icon: Search,
  },
  {
    number: 2,
    title: "Request Sample",
    description: "Order free samples delivered straight to your door",
    icon: Package,
  },
  {
    number: 3,
    title: "Get a Quote",
    description: "Free consultation and detailed estimate for your project",
    icon: FileText,
  },
  {
    number: 4,
    title: "Professional Install",
    description: "Expert installation or comprehensive DIY support",
    icon: Wrench,
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper id="process" background="white">
      <div ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-stone-600">
            From selection to installation in four simple steps
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Hidden on mobile */}
          <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-stone-200 lg:block" />

          <div className="space-y-12 lg:space-y-24">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center"
                >
                  {/* Step Number Circle */}
                  <div className="absolute left-1/2 top-0 z-10 hidden h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-wood-700 text-2xl font-bold text-white shadow-lg lg:flex">
                    {step.number}
                  </div>

                  {/* Content */}
                  <div
                    className={cn(
                      "lg:text-right",
                      isEven ? "lg:col-start-1" : "lg:col-start-2 lg:text-left"
                    )}
                  >
                    <div className="flex items-start gap-4 lg:block">
                      {/* Mobile Number */}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-wood-700 text-xl font-bold text-white lg:hidden">
                        {step.number}
                      </div>

                      <div className="flex-1">
                        <div
                          className={cn(
                            "mb-4 inline-flex rounded-xl bg-cream-100 p-3 text-wood-700",
                            isEven ? "lg:float-right" : "lg:float-left"
                          )}
                        >
                          <Icon className="h-8 w-8" />
                        </div>
                        <h3 className="mb-2 text-2xl font-bold text-stone-900">
                          {step.title}
                        </h3>
                        <p className="text-lg text-stone-600">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

// Helper function
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
