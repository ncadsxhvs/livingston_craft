import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const footerLinks = {
  products: [
    { name: "Hardwood Flooring", href: "#hardwood" },
    { name: "Luxury Vinyl", href: "#vinyl" },
    { name: "Engineered Wood", href: "#engineered" },
    { name: "Laminate Collection", href: "#laminate" },
  ],
  company: [
    { name: "About Us", href: "#about" },
    { name: "Our Process", href: "#process" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Blog", href: "#blog" },
  ],
  support: [],
  legal: [
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Service", href: "#terms" },
    { name: "Warranty", href: "#warranty" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-5 lg:py-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-white">Livingston Craft</h3>
            <p className="mt-4 text-sm text-stone-400">
              Transform your space with premium flooring that elevates every room.
              Quality materials, expert installation, lifetime support.
            </p>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white">Stay Updated</h4>
              <form className="mt-2 flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-md bg-stone-800 px-4 py-2 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button size="sm" type="submit">
                  Subscribe
                </Button>
              </form>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 flex flex-wrap gap-4 text-xs text-stone-400">
              <span className="flex items-center gap-1">
                <span className="text-green-500">✓</span> 25-Year Warranty
              </span>
              <span className="flex items-center gap-1">
                <span className="text-green-500">✓</span> Eco-Certified
              </span>
              <span className="flex items-center gap-1">
                <span className="text-green-500">✓</span> Free Samples
              </span>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-semibold text-white">Products</h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-stone-400 transition-colors hover:text-white"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white">Company</h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-stone-400 transition-colors hover:text-white"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-white">Support</h4>
            <div className="mt-4 space-y-4">
              <a
                href="mailto:info@livingstoncraftinc.com"
                className="block text-sm text-stone-400 transition-colors hover:text-white"
              >
                info@livingstoncraftinc.com
              </a>
              <div>
                <Image
                  src="/images/logo.png"
                  alt="Livingston Craft"
                  width={120}
                  height={60}
                  className="h-16 w-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-stone-800 py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-stone-400 transition-colors hover:text-white"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-stone-400">
              {footerLinks.legal.map((link, index) => (
                <>
                  <a
                    key={link.name}
                    href={link.href}
                    className="transition-colors hover:text-white"
                  >
                    {link.name}
                  </a>
                  {index < footerLinks.legal.length - 1 && (
                    <span className="text-stone-700">|</span>
                  )}
                </>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-sm text-stone-400">
              © {new Date().getFullYear()} Livingston Craft. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
