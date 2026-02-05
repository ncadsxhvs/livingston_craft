"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle, Mail } from "lucide-react";

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubscribeModal({ isOpen, onClose }: SubscribeModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to subscribe");
      }

      setSubmitStatus("success");

      // Reset form and close after 2 seconds
      setTimeout(() => {
        setEmail("");
        setSubmitStatus("idle");
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error subscribing:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-stone-100 transition-colors z-10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-stone-600" />
              </button>

              {/* Content */}
              <div className="p-8 sm:p-10">
                {/* Icon */}
                <div className="mb-6 inline-flex p-4 rounded-2xl bg-gradient-to-br from-wood-500/10 to-wood-600/10">
                  <Mail className="w-8 h-8 text-wood-700" />
                </div>

                {/* Header */}
                <div className="mb-6">
                  <h2 className="font-serif text-3xl sm:text-4xl font-light text-wood-900 mb-3">
                    Stay Updated
                  </h2>
                  <p className="text-lg text-stone-600">
                    Subscribe to our newsletter for exclusive offers, design inspiration, and flooring tips.
                  </p>
                </div>

                {/* Success Message */}
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <p className="text-emerald-800">
                      Welcome! You&apos;re subscribed to our newsletter.
                    </p>
                  </motion.div>
                )}

                {/* Error Message */}
                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl"
                  >
                    <p className="text-red-800">
                      Something went wrong. Please try again.
                    </p>
                  </motion.div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="subscribe-email" className="block text-sm font-semibold text-stone-900 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="subscribe-email"
                      name="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-wood-600 focus:ring-2 focus:ring-wood-600/20 outline-none transition-all"
                      placeholder="you@example.com"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group relative overflow-hidden rounded-full bg-gradient-to-br from-wood-700 to-wood-900 px-8 py-4 text-base font-medium text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Subscribing...
                        </>
                      ) : (
                        "Subscribe"
                      )}
                    </span>
                  </button>
                </form>

                {/* Privacy note */}
                <p className="mt-4 text-xs text-center text-stone-500">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
