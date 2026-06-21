"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Construction, Mail, ArrowRight } from "lucide-react";

export default function UnderDevelopment() {
  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0F172A 0%, #0F4C81 55%, #1E3A5F 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-healthcare-accent/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-healthcare-secondary/10 blur-3xl pointer-events-none" />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="flex items-center gap-3 mb-10"
        >
          <Image
            src="/icon.png"
            alt="AxonX Medtech Icon"
            width={44}
            height={44}
            priority
            className="h-10 w-auto object-contain"
          />
          <Image
            src="/logo.png"
            alt="AxonX Medtech"
            width={177}
            height={36}
            priority
            className="h-7 w-auto object-contain brightness-0 invert"
          />
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.4, type: "spring" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-healthcare-accent/20 border border-healthcare-accent/30 text-healthcare-accent text-xs font-bold uppercase tracking-widest mb-6"
        >
          <Construction className="h-3.5 w-3.5" />
          Under Development
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight mb-4"
        >
          We&apos;re Building{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #00BFA5 0%, #1E88E5 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Something Great
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="text-slate-300 text-base sm:text-lg leading-relaxed mb-10"
        >
          AxonX Medtech is currently being polished for launch. Our hospital
          management platform will be live very soon.
        </motion.p>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.4 }}
          className="w-full mb-2"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Progress
            </span>
            <span className="text-xs font-bold text-healthcare-accent">75%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "75%" }}
              transition={{ delay: 0.7, duration: 1.2, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, #00BFA5 0%, #1E88E5 100%)",
              }}
            />
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-3"
        >
          <a
            href="mailto:axonxmedtech@gmail.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
          >
            <Mail className="h-4 w-4 text-healthcare-accent" />
            axonxmedtech@gmail.com
          </a>
          <a
            href="tel:+919022915865"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-healthcare-accent/20 border border-healthcare-accent/30 text-sm font-semibold text-healthcare-accent hover:bg-healthcare-accent/30 transition-colors"
          >
            +91 90229 15865
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>

      {/* Bottom tag */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-6 text-xs text-slate-500 font-medium"
      >
        © {new Date().getFullYear()} AxonX Medtech Technologies
      </motion.p>
    </div>
  );
}
