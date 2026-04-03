import { cn } from "@frontend/lib/utils";
import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  fullHeight?: boolean;
  background?: "white" | "cream" | "muted";
  id?: string;
}

export function SectionWrapper({
  children,
  className,
  fullHeight = false,
  background = "white",
  id,
}: SectionWrapperProps) {
  const bgColors = {
    white: "bg-white",
    cream: "bg-cream-50",
    muted: "bg-muted",
  };

  return (
    <section
      id={id}
      className={cn(
        "relative w-full",
        fullHeight && "min-h-screen",
        bgColors[background],
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {children}
      </div>
    </section>
  );
}
