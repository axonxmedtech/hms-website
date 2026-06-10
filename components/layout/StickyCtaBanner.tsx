"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import BookDemoButton from "@/components/ui/BookDemoButton";

export default function StickyCtaBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isDismissed) return;
      setIsVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  return (
    <AnimatePresence>
      {isVisible && !isDismissed && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-40 glass border-t border-healthcare-border shadow-lg lg:hidden"
        >
          <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-healthcare-text truncate">
                Ready to modernize your hospital?
              </p>
            </div>
            <div className="flex items-center gap-2">
              <BookDemoButton
                href="#cta"
                size="sm"
                className="whitespace-nowrap"
              >
                Book Demo
              </BookDemoButton>
              <button
                onClick={() => setIsDismissed(true)}
                className="flex-shrink-0 p-1.5 rounded-full text-healthcare-muted hover:bg-healthcare-border/50 transition-colors"
                aria-label="Dismiss banner"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
