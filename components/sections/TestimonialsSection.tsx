"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { USE_CASE_PERSONAS } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export default function TestimonialsSection() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section ref={ref} id="testimonials" className="py-20 lg:py-28 bg-white scroll-mt-20 lg:scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-xs font-bold text-amber-600 uppercase tracking-wider mb-4">
            Who It&apos;s For
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-healthcare-text leading-tight">
            Built for <span className="gradient-text">Healthcare Leaders</span>
          </h2>
          <p className="mt-4 text-lg text-healthcare-muted leading-relaxed">
            Whether you&apos;re an administrator managing operations, a doctor treating patients, or a pharmacist managing stock — AxonX Medtech is designed for how you work.
          </p>
        </motion.div>

        {/* Persona Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {USE_CASE_PERSONAS.map((persona, i) => {
            const Icon = persona.icon;
            return (
              <motion.div
                key={persona.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 * i, duration: 0.5 }}
                className="group relative bg-healthcare-bg rounded-2xl border border-healthcare-border p-7 hover:shadow-lg hover:border-healthcare-primary/20 transition-all duration-300"
              >
                {/* Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-healthcare-accent/10 text-healthcare-accent mb-5 group-hover:bg-healthcare-accent/20 transition-colors">
                  <Icon className="h-7 w-7" />
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-heading font-bold text-healthcare-text mb-2">
                  {persona.title}
                </h3>
                <p className="text-sm text-healthcare-muted leading-relaxed mb-5">
                  {persona.description}
                </p>

                {/* Feature tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {persona.features.map((feature) => (
                    <span
                      key={feature}
                      className="inline-flex items-center px-2.5 py-1 rounded-lg bg-healthcare-primary/5 text-xs font-semibold text-healthcare-primary border border-healthcare-primary/10"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA Link */}
                <a
                  href="#features"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-healthcare-accent hover:text-healthcare-accent/80 transition-colors group/link"
                >
                  See Features
                  <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                </a>

                {/* Bottom accent bar on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-healthcare-accent to-healthcare-secondary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-b-2xl" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
