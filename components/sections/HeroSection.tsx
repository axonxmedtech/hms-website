"use client";

import { motion } from "framer-motion";
import { Play, CheckCircle2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HERO_STATS, TICKER_ITEMS } from "@/lib/data";
import { useScrollAnimation, useCountAnimation } from "@/hooks/useScrollAnimation";
import BookDemoButton from "@/components/ui/BookDemoButton";

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [ref, isVisible] = useScrollAnimation();
  const count = useCountAnimation(value, isVisible);
  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-healthcare-primary">
        {Number.isInteger(value) ? count : count.toFixed(1)}
        <span className="text-healthcare-accent">{suffix}</span>
      </div>
      <p className="mt-1.5 text-sm text-healthcare-muted font-medium">{label}</p>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden hero-gradient bg-grid" id="hero">
      {/* Decorative blobs */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-healthcare-accent/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-healthcare-secondary/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-8 lg:pt-36 lg:pb-12">
        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-healthcare-primary/5 border border-healthcare-primary/10 mb-6"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-healthcare-success animate-pulse" />
              <span className="text-xs font-semibold text-healthcare-primary uppercase tracking-wider">
                Built for Indian Healthcare 🇮🇳
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-extrabold text-healthcare-text leading-[0.95] tracking-tight">
              The Operating System for{" "}
              <span className="gradient-text">Modern Hospitals</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-healthcare-muted leading-relaxed max-w-xl">
              Unify patient care, operations, and revenue management into one intelligent platform.
              From OPD to pharmacy, billing to analytics — everything your hospital needs.
            </p>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
              <BookDemoButton href="#cta" size="lg">
                Book a Free Demo
              </BookDemoButton>
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-full border-2 border-healthcare-border bg-transparent text-healthcare-text hover:bg-healthcare-bg hover:border-healthcare-accent/30 font-heading font-extrabold text-base px-8 h-14 transition-all duration-300 active:scale-[0.98] select-none"
              >
                <Play className="mr-2 h-4 w-4 text-healthcare-accent" />
                Watch Product Tour
              </a>
            </div>

            {/* Trust points */}
            <div className="mt-8 flex flex-col sm:flex-row gap-x-6 gap-y-2">
              {["No credit card required", "Go live in 72 hours", "Free onboarding"].map(
                (text) => (
                  <span key={text} className="flex items-center gap-1.5 text-sm text-healthcare-muted">
                    <CheckCircle2 className="h-4 w-4 text-healthcare-success flex-shrink-0" />
                    {text}
                  </span>
                )
              )}
            </div>
          </motion.div>

          {/* Right: Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="relative"
          >
            <div className="animate-float">
              {/* Browser frame */}
              <div className="rounded-xl border border-healthcare-border bg-white shadow-2xl shadow-healthcare-primary/10 overflow-hidden">
                {/* Browser toolbar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-healthcare-border">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                    <div className="h-3 w-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="h-6 bg-white rounded-md border border-healthcare-border flex items-center px-3">
                      <span className="text-xs text-healthcare-muted truncate">app.axonx.health/dashboard</span>
                    </div>
                  </div>
                </div>

                {/* Dashboard content */}
                <div className="p-4 sm:p-6 space-y-4">
                  {/* Top stat cards */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Today's Patients", value: "127", change: "+12%", color: "bg-blue-50 text-healthcare-primary" },
                      { label: "Beds Available", value: "23/80", change: "71%", color: "bg-teal-50 text-healthcare-accent" },
                      { label: "Revenue Today", value: "₹4.2L", change: "+8%", color: "bg-emerald-50 text-healthcare-success" },
                    ].map((stat) => (
                      <div key={stat.label} className={`rounded-lg p-3 ${stat.color.split(" ")[0]}`}>
                        <p className="text-[10px] sm:text-xs text-healthcare-muted font-medium">{stat.label}</p>
                        <p className={`text-lg sm:text-xl font-heading font-bold ${stat.color.split(" ")[1]}`}>{stat.value}</p>
                        <span className="text-[10px] text-healthcare-success font-semibold">↑ {stat.change}</span>
                      </div>
                    ))}
                  </div>

                  {/* Chart placeholder */}
                  <div className="rounded-lg border border-healthcare-border p-3">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-healthcare-text">Patient Flow — Weekly</span>
                      <span className="text-[10px] text-healthcare-accent font-bold px-2 py-0.5 bg-healthcare-accent/10 rounded-full">Live</span>
                    </div>
                    <div className="flex items-end gap-1.5 h-20">
                      {[40, 65, 55, 80, 60, 75, 90, 70, 85, 60, 95, 75].map((h, i) => (
                        <div key={i} className="flex-1 rounded-t transition-all hover:bg-healthcare-accent" style={{ height: `${h}%`, backgroundColor: i === 10 ? "#00BFA5" : `rgba(15, 76, 129, ${0.15 + (h / 100) * 0.5})` }} />
                      ))}
                    </div>
                  </div>

                  {/* Recent activity */}
                  <div className="space-y-2">
                    {[
                      { text: "Dr. Sharma completed consultation — OPD #247", time: "2 min ago" },
                      { text: "Bed 12A assigned to patient Ravi Kumar", time: "5 min ago" },
                      { text: "Pharmacy: Low stock alert — Paracetamol 500mg", time: "12 min ago" },
                    ].map((item) => (
                      <div key={item.text} className="flex items-center justify-between text-xs py-2 border-b border-healthcare-border/50 last:border-0">
                        <span className="text-healthcare-text truncate pr-4">{item.text}</span>
                        <span className="text-healthcare-muted whitespace-nowrap text-[10px]">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.4, type: "spring" }}
              className="absolute -left-4 top-1/4 bg-white rounded-lg shadow-lg border border-healthcare-border p-3 hidden lg:flex items-center gap-2"
            >
              <div className="h-8 w-8 rounded-full bg-healthcare-success/10 flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 text-healthcare-success" />
              </div>
              <div>
                <p className="text-xs font-bold text-healthcare-text">Cloud Native</p>
                <p className="text-[10px] text-healthcare-muted">Zero infrastructure needed</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.4, type: "spring" }}
              className="absolute -right-4 bottom-1/4 bg-white rounded-lg shadow-lg border border-healthcare-border p-3 hidden lg:flex items-center gap-2"
            >
              <div className="h-8 w-8 rounded-full bg-healthcare-accent/10 flex items-center justify-center">
                <span className="text-sm font-bold text-healthcare-accent">99.9%</span>
              </div>
              <div>
                <p className="text-xs font-bold text-healthcare-text">Uptime SLA</p>
                <p className="text-[10px] text-healthcare-muted">Always available</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-16 lg:mt-24 py-10 px-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-healthcare-border/50 shadow-sm"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {HERO_STATS.map((stat) => (
              <StatCounter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Ticker */}
      <div className="mt-8 border-y border-healthcare-border/50 bg-white/40 py-3 overflow-hidden">
        <div className="animate-ticker flex whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 px-6 text-sm font-medium text-healthcare-muted">
              {item}
              <span className="text-healthcare-accent/40">•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
