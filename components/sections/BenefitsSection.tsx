"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { BENEFITS } from "@/lib/data";

export default function BenefitsSection() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-healthcare-bg bg-grid">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-healthcare-success/10 border border-healthcare-success/20 text-xs font-bold text-healthcare-success uppercase tracking-wider mb-4">
            Why AxonX Medtech
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-healthcare-text leading-tight">
            Built for <span className="gradient-text">Measurable Results</span>
          </h2>
          <p className="mt-4 text-lg text-healthcare-muted leading-relaxed">
            Every feature is designed to deliver concrete improvements in efficiency, revenue, and patient satisfaction.
          </p>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFITS.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.08 * i, duration: 0.5 }}
                className="group relative bg-white rounded-2xl border border-healthcare-border p-7 hover:shadow-xl hover:shadow-healthcare-accent/5 hover:border-healthcare-accent/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Metric watermark */}
                <span className="absolute top-4 right-5 text-4xl font-heading font-extrabold text-healthcare-accent/10 leading-none select-none pointer-events-none group-hover:text-healthcare-accent/20 transition-colors">
                  {benefit.metric}
                </span>

                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-healthcare-accent/10 text-healthcare-accent mb-5 group-hover:bg-healthcare-accent/20 transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-healthcare-text mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-healthcare-muted leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* Bottom accent bar on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-healthcare-accent to-healthcare-secondary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
