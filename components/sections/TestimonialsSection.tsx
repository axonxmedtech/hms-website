"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { TESTIMONIALS } from "@/lib/data";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const [ref, isVisible] = useScrollAnimation();
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section ref={ref} id="testimonials" className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-xs font-bold text-amber-600 uppercase tracking-wider mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-healthcare-text leading-tight">
            Trusted by <span className="gradient-text">Hospital Leaders</span>
          </h2>
          <p className="mt-4 text-lg text-healthcare-muted leading-relaxed">
            Don&apos;t take our word for it — hear from the administrators and doctors who run their hospitals on AxonX Medtech every day.
          </p>
        </motion.div>

        {/* Desktop: All 3 cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden lg:grid lg:grid-cols-3 gap-6"
        >
          {TESTIMONIALS.map((testimonial, i) => (
            <div
              key={testimonial.author}
              className="relative bg-healthcare-bg rounded-2xl border border-healthcare-border p-7 hover:shadow-lg hover:border-healthcare-primary/20 transition-all duration-300"
            >
              {/* Quote icon */}
              <Quote className="h-8 w-8 text-healthcare-accent/20 mb-4" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <blockquote className="text-sm text-healthcare-text leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3 pt-5 border-t border-healthcare-border">
                {/* Avatar */}
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-healthcare-primary text-white font-bold text-sm">
                  {testimonial.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-bold text-healthcare-text">{testimonial.author}</p>
                  <p className="text-xs text-healthcare-muted">
                    {testimonial.role}, {testimonial.organization}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Mobile: Carousel */}
        <div className="lg:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="relative bg-healthcare-bg rounded-2xl border border-healthcare-border p-6"
            >
              <Quote className="h-8 w-8 text-healthcare-accent/20 mb-4" />

              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: TESTIMONIALS[activeIndex].rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <blockquote className="text-sm text-healthcare-text leading-relaxed mb-6">
                &ldquo;{TESTIMONIALS[activeIndex].quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3 pt-5 border-t border-healthcare-border">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-healthcare-primary text-white font-bold text-sm">
                  {TESTIMONIALS[activeIndex].author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-bold text-healthcare-text">
                    {TESTIMONIALS[activeIndex].author}
                  </p>
                  <p className="text-xs text-healthcare-muted">
                    {TESTIMONIALS[activeIndex].role}, {TESTIMONIALS[activeIndex].organization}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-healthcare-border hover:bg-healthcare-bg transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5 text-healthcare-text" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === activeIndex ? "w-6 bg-healthcare-accent" : "w-2 bg-healthcare-border"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-healthcare-border hover:bg-healthcare-bg transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5 text-healthcare-text" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
