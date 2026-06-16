"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { WORKFLOW_STEPS } from "@/lib/data";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function WorkflowSection() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section ref={ref} id="workflow" className="py-20 lg:py-28 bg-white scroll-mt-20 lg:scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-healthcare-primary/10 border border-healthcare-primary/20 text-xs font-bold text-healthcare-primary uppercase tracking-wider mb-4">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-healthcare-text leading-tight">
            From Sign-Up to{" "}
            <span className="gradient-text">Go-Live in 72 Hours</span>
          </h2>
          <p className="mt-4 text-lg text-healthcare-muted leading-relaxed">
            We handle the heavy lifting. Your hospital goes digital without disrupting daily operations.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-0">
          {WORKFLOW_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 * i, duration: 0.5 }}
                className="relative"
              >
                {/* Connector line (desktop) */}
                {i < WORKFLOW_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-14 right-0 w-full h-0.5 bg-gradient-to-r from-healthcare-accent/40 to-healthcare-primary/20 translate-x-1/2 z-0" />
                )}

                <div className="relative z-10 bg-white rounded-2xl border border-healthcare-border p-7 lg:mx-3 hover:shadow-xl hover:shadow-healthcare-primary/5 hover:border-healthcare-accent/30 transition-all duration-300 group">
                  {/* Step number + icon */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="relative">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-healthcare-primary text-white font-heading text-2xl font-bold shadow-lg shadow-healthcare-primary/20">
                        {step.step}
                      </div>
                      {/* Pulse ring on hover */}
                      <div className="absolute inset-0 rounded-2xl bg-healthcare-primary/20 opacity-0 group-hover:opacity-100 group-hover:animate-pulse-ring" />
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-healthcare-accent/10 text-healthcare-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-heading font-bold text-healthcare-text mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-healthcare-muted leading-relaxed mb-5">
                    {step.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-2">
                    {step.details.map((detail) => (
                      <div
                        key={detail}
                        className="flex items-center gap-2 text-sm text-healthcare-text"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-healthcare-accent flex-shrink-0" />
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile connector */}
                {i < WORKFLOW_STEPS.length - 1 && (
                  <div className="flex justify-center py-3 lg:hidden">
                    <ArrowRight className="h-5 w-5 text-healthcare-accent rotate-90" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
