"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/data";
import BookDemoButton from "@/components/ui/BookDemoButton";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass border-b border-healthcare-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group" aria-label="AxonX Medtech Home">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-healthcare-primary text-white transition-transform group-hover:scale-105">
              <Activity className="h-5 w-5" />
            </div>
            <span className="text-xl font-heading font-bold text-healthcare-text">
              AxonX <span className="text-healthcare-primary">Medtech</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-healthcare-muted transition-colors hover:text-healthcare-primary"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA — Book Demo only, no Sign In */}
          <div className="hidden lg:flex lg:items-center">
            <BookDemoButton href="#cta" size="sm">Book Free Demo</BookDemoButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex items-center justify-center h-10 w-10 rounded-lg text-healthcare-text hover:bg-healthcare-border/50 transition-colors"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden border-t border-healthcare-border bg-white overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  onClick={() => setIsMobileOpen(false)}
                  className="block px-4 py-3 text-base font-medium text-healthcare-text rounded-lg hover:bg-healthcare-bg transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="pt-3 border-t border-healthcare-border mt-3">
                <BookDemoButton
                  href="#cta"
                  onClick={() => setIsMobileOpen(false)}
                  className="w-full justify-center"
                >
                  Book Free Demo
                </BookDemoButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
