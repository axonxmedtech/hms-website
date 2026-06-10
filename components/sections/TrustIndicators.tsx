"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { HOSPITAL_TYPES } from "@/lib/data";

export default function TrustIndicators() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section ref={ref} className="py-16 lg:py-20 bg-white border-b border-healthcare-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-sm font-semibold text-healthcare-muted uppercase tracking-wider">
            Built for every type of healthcare facility
          </p>
        </motion.div>

        {/* Hospital types grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4"
        >
          {HOSPITAL_TYPES.map((hospital, i) => {
            const Icon = hospital.icon;
            return (
              <motion.div
                key={hospital.name}
                initial={{ opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
                className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-healthcare-border/50 hover:border-healthcare-primary/20 hover:shadow-sm transition-all group"
              >
                <Icon className="h-6 w-6 text-healthcare-muted group-hover:text-healthcare-primary transition-colors" />
                <span className="text-xs font-semibold text-healthcare-muted text-center group-hover:text-healthcare-primary transition-colors leading-tight">
                  {hospital.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
