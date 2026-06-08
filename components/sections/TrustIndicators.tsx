"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { TRUST_LOGOS, COMPLIANCE_BADGES } from "@/lib/data";
import { Building2 } from "lucide-react";

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
            Trusted by leading healthcare organizations across the country
          </p>
        </motion.div>

        {/* Logo cloud */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4"
        >
          {TRUST_LOGOS.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-healthcare-border/50 hover:border-healthcare-primary/20 hover:shadow-sm transition-all group"
            >
              <Building2 className="h-6 w-6 text-healthcare-muted group-hover:text-healthcare-primary transition-colors" />
              <span className="text-xs font-semibold text-healthcare-muted text-center group-hover:text-healthcare-primary transition-colors leading-tight">
                {name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Compliance badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          {COMPLIANCE_BADGES.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.name}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-healthcare-primary/5 border border-healthcare-primary/10"
              >
                <Icon className="h-4 w-4 text-healthcare-primary" />
                <span className="text-xs font-bold text-healthcare-primary">{badge.name}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
