"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { SECURITY_FEATURES } from "@/lib/data";
import { Shield } from "lucide-react";

export default function SecuritySection() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section ref={ref} id="security" className="py-20 lg:py-28 security-gradient relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-healthcare-accent/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-healthcare-secondary/5 blur-3xl pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="flex justify-center mb-5">
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-healthcare-accent/20 text-healthcare-accent">
                <Shield className="h-8 w-8" />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-healthcare-accent/10 animate-pulse-ring" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
            Enterprise-Grade Security,{" "}
            <span className="text-healthcare-accent">Built In</span>
          </h2>
          <p className="mt-4 text-lg text-slate-300 leading-relaxed">
            Patient data protection isn&apos;t a feature — it&apos;s the foundation. Every layer of AxonX Medtech
            is designed with security-first principles.
          </p>
        </motion.div>

        {/* Security cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SECURITY_FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.08 * i, duration: 0.5 }}
                className="group rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:bg-white/10 hover:border-healthcare-accent/30 transition-all duration-300"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-healthcare-accent/15 text-healthcare-accent mb-4 group-hover:bg-healthcare-accent/25 transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-14 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "AES-256", label: "Encryption Standard" },
              { value: "99.9%", label: "Uptime SLA" },
              { value: "0", label: "Data Breaches" },
              { value: "24/7", label: "Security Monitoring" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl sm:text-3xl font-heading font-extrabold text-healthcare-accent">
                  {stat.value}
                </div>
                <p className="mt-1 text-xs text-slate-400 font-medium uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
