import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { OrganizationSchema, WebsiteSchema } from "@/components/seo/structured-data";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://livingstoncraft.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Livingston Craft | Premium Flooring Solutions",
    template: "%s | Livingston Craft",
  },
  description: "Transform your space with premium flooring. Explore hardwood, luxury vinyl, engineered wood, and laminate flooring. Free samples, 25-year warranty, expert installation.",
  keywords: [
    "flooring",
    "hardwood flooring",
    "luxury vinyl flooring",
    "laminate flooring",
    "engineered wood",
    "home improvement",
    "floor installation",
    "premium flooring",
    "waterproof flooring",
    "eco-friendly flooring"
  ],
  authors: [{ name: "Livingston Craft", url: siteUrl }],
  creator: "Livingston Craft",
  publisher: "Livingston Craft",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Livingston Craft | Premium Flooring Solutions",
    description: "Transform your space with premium flooring. Free samples, 25-year warranty, expert installation.",
    siteName: "Livingston Craft",
    images: [
      {
        url: `${siteUrl}/images/homepage/59295445-b3d1-4c62-a3a4-e8a491efca7f.jpg`,
        width: 1200,
        height: 630,
        alt: "Premium flooring showcase - Livingston Craft",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Livingston Craft | Premium Flooring Solutions",
    description: "Transform your space with premium flooring. Free samples, 25-year warranty, expert installation.",
    images: [`${siteUrl}/images/homepage/59295445-b3d1-4c62-a3a4-e8a491efca7f.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <OrganizationSchema siteUrl={siteUrl} />
        <WebsiteSchema siteUrl={siteUrl} />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
