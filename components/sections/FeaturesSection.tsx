"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { FEATURE_MODULES, ROLES } from "@/lib/data";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function FeaturesSection() {
  const [ref, isVisible] = useScrollAnimation();
  const [activeRole, setActiveRole] = useState(0);

  return (
    <section ref={ref} id="features" className="py-20 lg:py-28 bg-white scroll-mt-20 lg:scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-healthcare-accent/10 border border-healthcare-accent/20 text-xs font-bold text-healthcare-accent uppercase tracking-wider mb-4">
            Feature Modules
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-healthcare-text leading-tight">
            One Platform.{" "}
            <span className="gradient-text">Every Department.</span>
          </h2>
          <p className="mt-4 text-lg text-healthcare-muted leading-relaxed">
            Nine integrated modules that cover your entire hospital workflow — from patient
            registration to discharge, prescription to dispensing.
          </p>
        </motion.div>

        {/* Module cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {FEATURE_MODULES.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <motion.div
                key={mod.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.06 * i, duration: 0.5 }}
                className="group relative bg-healthcare-bg rounded-xl border border-healthcare-border/70 p-6 hover:bg-white hover:border-healthcare-accent/30 hover:shadow-lg hover:shadow-healthcare-accent/5 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-healthcare-primary/10 text-healthcare-primary flex-shrink-0 group-hover:bg-healthcare-accent/10 group-hover:text-healthcare-accent transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-healthcare-text mb-1.5">
                      {mod.name}
                    </h3>
                    <p className="text-sm text-healthcare-muted leading-relaxed mb-3">
                      {mod.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {mod.highlights.map((h) => (
                        <span
                          key={h}
                          className="inline-block px-2 py-0.5 text-[11px] font-semibold rounded-md bg-healthcare-primary/5 text-healthcare-primary/80"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <ArrowRight className="absolute bottom-5 right-5 h-4 w-4 text-healthcare-accent opacity-0 translate-x-[-4px] group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </motion.div>
            );
          })}
        </div>

        {/* Role-based access section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-healthcare-text">
              Tailored Dashboards for Every Role
            </h3>
            <p className="mt-2 text-healthcare-muted">
              Each team member sees only what they need — nothing more, nothing less.
            </p>
          </div>

          {/* Role tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {ROLES.map((role, i) => {
              const Icon = role.icon;
              return (
                <button
                  key={role.key}
                  onClick={() => setActiveRole(i)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    activeRole === i
                      ? "bg-healthcare-primary text-white shadow-md shadow-healthcare-primary/20"
                      : "bg-healthcare-bg text-healthcare-muted hover:bg-healthcare-border/50 border border-healthcare-border"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {role.label}
                </button>
              );
            })}
          </div>

          {/* Role content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRole}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-healthcare-border bg-white overflow-hidden shadow-sm"
            >
              <div className="grid lg:grid-cols-5">
                {/* Role info */}
                <div className="lg:col-span-2 p-6 lg:p-8 bg-healthcare-bg/50 border-b lg:border-b-0 lg:border-r border-healthcare-border">
                  <div className="flex items-center gap-3 mb-4">
                    {(() => {
                      const Icon = ROLES[activeRole].icon;
                      return (
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-healthcare-primary/10 text-healthcare-primary">
                          <Icon className="h-6 w-6" />
                        </div>
                      );
                    })()}
                    <div>
                      <h4 className="text-lg font-heading font-bold text-healthcare-text">
                        {ROLES[activeRole].title}
                      </h4>
                      <span className="inline-block mt-0.5 px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-healthcare-accent/10 text-healthcare-accent uppercase tracking-wider">
                        {ROLES[activeRole].badge}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-healthcare-muted leading-relaxed">
                    {ROLES[activeRole].description}
                  </p>
                </div>

                {/* Feature list */}
                <div className="lg:col-span-3 p-6 lg:p-8">
                  <p className="text-xs font-bold text-healthcare-muted uppercase tracking-wider mb-5">
                    Key Capabilities
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {ROLES[activeRole].features.map((feature, i) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * i, duration: 0.3 }}
                        className="flex items-start gap-2.5 p-3 rounded-lg border border-healthcare-border/50 hover:border-healthcare-accent/30 hover:bg-healthcare-accent/5 transition-all"
                      >
                        <CheckCircle2 className="h-4 w-4 text-healthcare-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-healthcare-text">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
