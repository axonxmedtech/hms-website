"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { PROBLEMS } from "@/lib/data";

export default function ProblemsSection() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section ref={ref} id="problems" className="py-20 lg:py-28 bg-healthcare-bg bg-grid">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-xs font-bold text-red-600 uppercase tracking-wider mb-4">
            The Problem
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-healthcare-text leading-tight">
            Healthcare Shouldn&apos;t Run on{" "}
            <span className="text-red-500">Spreadsheets & Paper</span>
          </h2>
          <p className="mt-4 text-lg text-healthcare-muted leading-relaxed">
            Most hospitals still operate with disconnected systems, manual processes, and zero
            visibility. These problems cost time, revenue, and patient safety every single day.
          </p>
        </motion.div>

        {/* Problem cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROBLEMS.map((problem, i) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="group relative bg-white rounded-xl border border-healthcare-border/70 p-6 lg:p-7 hover:border-red-200 hover:shadow-lg hover:shadow-red-50 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Number watermark */}
                <span className="absolute top-4 right-5 text-6xl font-heading font-extrabold text-healthcare-border/40 leading-none select-none pointer-events-none group-hover:text-red-100 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-50 text-red-500 mb-4 group-hover:bg-red-100 transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-healthcare-text mb-2 leading-snug pr-8">
                    {problem.title}
                  </h3>
                  <p className="text-sm text-healthcare-muted leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
