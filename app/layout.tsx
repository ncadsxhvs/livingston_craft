import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

export const metadata: Metadata = {
  title: "Livingston Craft | Transform Your Space",
  description: "Premium flooring that elevates every room. Discover our collection of hardwood, luxury vinyl, engineered wood, and laminate flooring.",
  keywords: ["flooring", "hardwood", "luxury vinyl", "laminate", "home improvement"],
  authors: [{ name: "Livingston Craft" }],
  openGraph: {
    title: "Livingston Craft | Transform Your Space",
    description: "Premium flooring that elevates every room",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
