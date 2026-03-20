"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { supabase, type Faq } from "@/lib/supabase";

function FaqItem({ faq, index }: { faq: Faq; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-deep-charcoal/[0.08] last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-muted-gold/50 focus-visible:ring-offset-2 rounded-sm"
        aria-expanded={open}
      >
        <span className="font-serif text-base font-semibold tracking-tight text-deep-charcoal sm:text-lg">
          {faq.question}
        </span>

        {/* Plus / Minus icon */}
        <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-deep-charcoal/15 text-deep-charcoal/50 transition-all duration-200 group-hover:border-muted-gold/40">
          <motion.svg
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="size-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 5v14M5 12h14" />
          </motion.svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 font-sans text-sm leading-[1.75] text-deep-charcoal/65 sm:text-base">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FaqSection() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("faqs")
      .select("*")
      .order("order", { ascending: true })
      .then(({ data }) => {
        if (data) setFaqs(data);
        setLoading(false);
      });
  }, []);

  return (
    <section className="border-t border-deep-charcoal/[0.06] bg-soft-bone py-16 sm:py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr] lg:gap-24">
          {/* Left — heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-muted-gold/80">
              FAQ
            </p>
            <h2 className="mt-2 font-serif text-2xl font-bold tracking-tight text-deep-charcoal sm:text-3xl md:text-4xl">
              Common Questions
            </h2>
            <p className="mt-3 font-sans text-sm leading-[1.7] text-deep-charcoal/60 sm:text-base">
              Answers to the questions we hear most from prospective clients.
            </p>
          </motion.div>

          {/* Right — accordion */}
          <div className="divide-y-0">
            {loading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse border-b border-deep-charcoal/[0.08] py-5">
                    <div className="h-4 w-3/4 rounded bg-deep-charcoal/[0.07]" />
                  </div>
                ))}
              </div>
            ) : faqs.length === 0 ? (
              <p className="font-sans text-sm text-deep-charcoal/40">No questions yet.</p>
            ) : (
              faqs.map((faq, i) => <FaqItem key={faq.id} faq={faq} index={i} />)
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
