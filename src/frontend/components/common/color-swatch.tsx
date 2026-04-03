"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@frontend/lib/utils";

interface ColorSwatchProps {
  color: {
    id: string;
    name: string;
    hex: string;
  };
  isActive: boolean;
  onClick: () => void;
}

export function ColorSwatch({ color, isActive, onClick }: ColorSwatchProps) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center gap-2 transition-all"
      aria-label={`Select ${color.name} color`}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "relative h-12 w-12 rounded-full border-2 transition-all",
          isActive
            ? "border-stone-900 shadow-lg ring-2 ring-stone-900 ring-offset-2"
            : "border-stone-300 hover:border-stone-500"
        )}
        style={{ backgroundColor: color.hex }}
      >
        {isActive && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Check className="h-6 w-6 text-white drop-shadow-lg" strokeWidth={3} />
          </motion.div>
        )}
      </motion.div>
      <span
        className={cn(
          "text-xs font-medium transition-colors",
          isActive ? "text-stone-900" : "text-stone-500 group-hover:text-stone-700"
        )}
      >
        {color.name}
      </span>
    </button>
  );
}
