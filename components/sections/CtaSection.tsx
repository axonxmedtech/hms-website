"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Send, Sparkles } from "lucide-react";

export default function CtaSection() {
  const [ref, isVisible] = useScrollAnimation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <section ref={ref} id="cta" className="py-20 lg:py-28 cta-gradient relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-healthcare-accent/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full bg-white/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-healthcare-accent uppercase tracking-wider mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Get Started
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
              Ready to Modernize{" "}
              <span className="text-healthcare-accent">Your Hospital?</span>
            </h2>

            <p className="mt-5 text-lg text-blue-100/80 leading-relaxed max-w-lg">
              Join 500+ hospitals that have transformed their operations with AxonX Medtech. Book a
              personalized demo and see exactly how it works for your setup.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Personalized demo for your hospital type",
                "Complete ROI analysis included",
                "Go live in as fast as 72 hours",
                "Dedicated onboarding manager assigned",
                "No credit card or commitment required",
              ].map((text) => (
                <div key={text} className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-healthcare-accent flex-shrink-0" />
                  <span className="text-sm text-blue-100/90 font-medium">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl p-7 lg:p-9 shadow-2xl shadow-black/20">
              {!isSubmitted ? (
                <>
                  <h3 className="text-xl font-heading font-bold text-healthcare-text mb-1.5">
                    Book Your Free Demo
                  </h3>
                  <p className="text-sm text-healthcare-muted mb-6">
                    Fill in your details and our team will reach out within 2 hours.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="cta-name"
                          className="block text-xs font-bold text-healthcare-text uppercase tracking-wider mb-1.5"
                        >
                          Full Name *
                        </label>
                        <input
                          id="cta-name"
                          type="text"
                          required
                          placeholder="Dr. Rajesh Sharma"
                          className="w-full px-4 py-3 rounded-xl border border-healthcare-border bg-healthcare-bg text-sm text-healthcare-text placeholder:text-healthcare-muted/50 focus:outline-none focus:ring-2 focus:ring-healthcare-accent/30 focus:border-healthcare-accent transition-all"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="cta-email"
                          className="block text-xs font-bold text-healthcare-text uppercase tracking-wider mb-1.5"
                        >
                          Email *
                        </label>
                        <input
                          id="cta-email"
                          type="email"
                          required
                          placeholder="admin@hospital.com"
                          className="w-full px-4 py-3 rounded-xl border border-healthcare-border bg-healthcare-bg text-sm text-healthcare-text placeholder:text-healthcare-muted/50 focus:outline-none focus:ring-2 focus:ring-healthcare-accent/30 focus:border-healthcare-accent transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="cta-hospital"
                          className="block text-xs font-bold text-healthcare-text uppercase tracking-wider mb-1.5"
                        >
                          Hospital Name *
                        </label>
                        <input
                          id="cta-hospital"
                          type="text"
                          required
                          placeholder="Sunrise Hospital"
                          className="w-full px-4 py-3 rounded-xl border border-healthcare-border bg-healthcare-bg text-sm text-healthcare-text placeholder:text-healthcare-muted/50 focus:outline-none focus:ring-2 focus:ring-healthcare-accent/30 focus:border-healthcare-accent transition-all"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="cta-phone"
                          className="block text-xs font-bold text-healthcare-text uppercase tracking-wider mb-1.5"
                        >
                          Phone
                        </label>
                        <input
                          id="cta-phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl border border-healthcare-border bg-healthcare-bg text-sm text-healthcare-text placeholder:text-healthcare-muted/50 focus:outline-none focus:ring-2 focus:ring-healthcare-accent/30 focus:border-healthcare-accent transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="cta-message"
                        className="block text-xs font-bold text-healthcare-text uppercase tracking-wider mb-1.5"
                      >
                        Message
                      </label>
                      <textarea
                        id="cta-message"
                        rows={3}
                        placeholder="Tell us about your hospital and what you're looking for..."
                        className="w-full px-4 py-3 rounded-xl border border-healthcare-border bg-healthcare-bg text-sm text-healthcare-text placeholder:text-healthcare-muted/50 focus:outline-none focus:ring-2 focus:ring-healthcare-accent/30 focus:border-healthcare-accent transition-all resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-healthcare-accent hover:bg-healthcare-accent/90 text-white font-bold py-6 rounded-xl shadow-lg shadow-healthcare-accent/20 transition-all hover:shadow-xl hover:shadow-healthcare-accent/30 text-base disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="inline-block h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Booking Your Demo...
                        </>
                      ) : (
                        <>
                          Book My Free Demo
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-healthcare-muted text-center pt-1">
                      No credit card required • Free setup assistance • Cancel anytime
                    </p>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-healthcare-success/10 text-healthcare-success mb-5">
                    <Send className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-healthcare-text mb-2">
                    Demo Booked Successfully!
                  </h3>
                  <p className="text-sm text-healthcare-muted max-w-xs leading-relaxed">
                    Our team will reach out within 2 hours to schedule your personalized demo. Check your inbox for confirmation.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
