"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { FAQ_ITEMS } from "@/lib/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqSection() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section ref={ref} id="faq" className="py-20 lg:py-28 bg-healthcare-bg scroll-mt-20 lg:scroll-mt-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-healthcare-primary/10 border border-healthcare-primary/20 text-xs font-bold text-healthcare-primary uppercase tracking-wider mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-healthcare-text leading-tight">
            Frequently Asked{" "}
            <span className="gradient-text">Questions</span>
          </h2>
          <p className="mt-4 text-lg text-healthcare-muted leading-relaxed">
            Everything you need to know about AxonX Medtech. Can&apos;t find what you&apos;re looking for?{" "}
            <a href="#cta" className="text-healthcare-accent hover:underline font-medium">
              Contact our team
            </a>
            .
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion className="space-y-3">
            {FAQ_ITEMS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-white rounded-xl border border-healthcare-border px-6 data-[state=open]:shadow-md data-[state=open]:border-healthcare-accent/30 transition-all"
              >
                <AccordionTrigger className="text-left text-sm sm:text-base font-semibold text-healthcare-text hover:text-healthcare-primary py-5 [&[data-state=open]>svg]:text-healthcare-accent">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-healthcare-muted leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
