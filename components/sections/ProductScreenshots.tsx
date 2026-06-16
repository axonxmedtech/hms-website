"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Monitor, Tablet, BarChart3, Pill } from "lucide-react";

const SCREENSHOT_TABS = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Monitor,
    image: "/admin_dashboard.png",
    content: {
      title: "Real-Time Hospital Dashboard",
      description: "Complete operational visibility at a glance",
      cards: [],
      features: [],
    },
  },
  {
    id: "patients",
    label: "Patient Records",
    icon: Tablet,
    image: "/patient_list.png",
    content: {
      title: "Unified Patient Records",
      description: "Complete medical history in one view",
      cards: [],
      features: [],
    },
  },
  {
    id: "pharmacy",
    label: "Pharmacy",
    icon: Pill,
    image: "/pharmacy_dashboard.png",
    content: {
      title: "Pharmacy Management",
      description: "Inventory control with zero stockouts",
      cards: [],
      features: [],
    },
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    content: {
      title: "Reports & Analytics",
      description: "Data-driven decision making for hospital leadership",
      cards: [
        { label: "Monthly Revenue", value: "₹2.1Cr", color: "bg-emerald-50 text-emerald-600" },
        { label: "Avg Occupancy", value: "78%", color: "bg-blue-50 text-blue-600" },
        { label: "Patient NPS", value: "4.8/5", color: "bg-purple-50 text-purple-600" },
        { label: "Growth", value: "+23%", color: "bg-teal-50 text-teal-600" },
      ],
      features: ["Revenue trends", "Department comparison", "Predictive analytics", "Custom date ranges"],
    },
  },
];

export default function ProductScreenshots() {
  const [ref, isVisible] = useScrollAnimation();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-healthcare-bg bg-grid">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-healthcare-secondary/10 border border-healthcare-secondary/20 text-xs font-bold text-healthcare-secondary uppercase tracking-wider mb-4">
            Product Preview
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-healthcare-text leading-tight">
            See AxonX Medtech <span className="gradient-text">in Action</span>
          </h2>
          <p className="mt-4 text-lg text-healthcare-muted leading-relaxed">
            Intuitive interfaces designed specifically for healthcare workflows. No training manuals needed.
          </p>
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {SCREENSHOT_TABS.map((tab, i) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(i)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeTab === i
                    ? "bg-healthcare-primary text-white shadow-md shadow-healthcare-primary/20"
                    : "bg-white text-healthcare-muted hover:bg-healthcare-border/50 border border-healthcare-border"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </motion.div>

        {/* Screenshot browser frame */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-5xl mx-auto"
        >
          <div className="rounded-2xl border border-healthcare-border bg-white shadow-2xl shadow-healthcare-primary/5 overflow-hidden">
            {/* Browser toolbar */}
            <div className="flex items-center gap-2 px-5 py-3.5 bg-slate-50 border-b border-healthcare-border">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 mx-8">
                <div className="h-7 bg-white rounded-lg border border-healthcare-border flex items-center px-4">
                  <span className="text-xs text-healthcare-muted">
                    app.axonx.health/{SCREENSHOT_TABS[activeTab].id}
                  </span>
                </div>
              </div>
            </div>

            {/* Screenshot content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {"image" in SCREENSHOT_TABS[activeTab] ? (
                  // Real screenshot image for dashboard / patients / pharmacy
                  <img
                    src={(SCREENSHOT_TABS[activeTab] as { image: string }).image}
                    alt={SCREENSHOT_TABS[activeTab].content.title}
                    className="w-full h-auto block"
                  />
                ) : (
                  // Analytics: keep the generated UI
                  <div className="p-6 lg:p-8">
                    {/* Title bar */}
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-heading font-bold text-healthcare-text">
                          {SCREENSHOT_TABS[activeTab].content.title}
                        </h3>
                        <p className="text-sm text-healthcare-muted">
                          {SCREENSHOT_TABS[activeTab].content.description}
                        </p>
                      </div>
                      <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold rounded-full bg-healthcare-success/10 text-healthcare-success">
                        <span className="h-1.5 w-1.5 rounded-full bg-healthcare-success animate-pulse" />
                        Live
                      </span>
                    </div>

                    {/* Stats cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      {SCREENSHOT_TABS[activeTab].content.cards.map((card, i) => (
                        <motion.div
                          key={card.label}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.05 * i, duration: 0.3 }}
                          className={`rounded-xl p-4 ${card.color.split(" ")[0]}`}
                        >
                          <p className="text-xs text-healthcare-muted font-medium mb-1">{card.label}</p>
                          <p className={`text-2xl font-heading font-bold ${card.color.split(" ")[1]}`}>
                            {card.value}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Chart area */}
                    <div className="grid lg:grid-cols-3 gap-4">
                      <div className="lg:col-span-2 rounded-xl border border-healthcare-border p-4">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-semibold text-healthcare-text">Trends</span>
                          <span className="text-xs text-healthcare-muted">Last 7 days</span>
                        </div>
                        <div className="flex items-end gap-2 h-32">
                          {[45, 62, 55, 78, 65, 82, 72, 88, 70, 92, 80, 95].map((h, i) => (
                            <motion.div
                              key={i}
                              initial={{ height: 0 }}
                              animate={{ height: `${h}%` }}
                              transition={{ delay: 0.05 * i, duration: 0.5, ease: "easeOut" }}
                              className="flex-1 rounded-t-sm"
                              style={{
                                backgroundColor:
                                  i >= 10
                                    ? "#00BFA5"
                                    : `rgba(15, 76, 129, ${0.2 + (h / 100) * 0.6})`,
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Quick features */}
                      <div className="rounded-xl border border-healthcare-border p-4">
                        <span className="text-sm font-semibold text-healthcare-text block mb-3">Quick Access</span>
                        <div className="space-y-2">
                          {SCREENSHOT_TABS[activeTab].content.features.map((f, i) => (
                            <motion.div
                              key={f}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * i, duration: 0.3 }}
                              className="flex items-center gap-2 py-2 px-3 rounded-lg bg-healthcare-bg text-sm text-healthcare-text"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-healthcare-accent" />
                              {f}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
