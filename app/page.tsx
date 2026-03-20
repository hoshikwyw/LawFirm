"use client";

import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { FaqSection } from "@/components/FaqSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ContactSection } from "@/components/ContactSection";

function CountUp({
  target,
  prefix = "",
  suffix = "",
  duration = 2000,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

const PRACTICE_AREAS = [
  {
    title: "Corporate Law",
    description: "M&A, governance, and strategic transactions for businesses of every scale.",
  },
  {
    title: "Litigation",
    description: "Complex commercial disputes, trials, and appellate advocacy.",
  },
  {
    title: "Real Estate",
    description: "Acquisitions, development, leasing, and real estate finance.",
  },
  {
    title: "Trusts & Estates",
    description: "Estate planning, probate, and wealth preservation strategies.",
  },
];

const CASE_RESULTS = [
  { prefix: "$", target: 47, suffix: "M", label: "Verdict secured in high-stakes commercial litigation" },
  { prefix: "",  target: 98, suffix: "%", label: "Client satisfaction and case outcome success rate" },
  { prefix: "",  target: 150, suffix: "+", label: "Years of combined experience across the firm" },
];


const revealUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-soft-bone text-deep-charcoal">
      {/* Hero — mobile stacked, desktop split */}
      <section className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-5 py-16 sm:px-6 sm:py-20 lg:min-h-[82vh] lg:grid-cols-2 lg:gap-24 lg:px-12 lg:py-28">
        <motion.div
          className="flex flex-col justify-center"
          {...revealUp}
        >
          <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-muted-gold/90">
            Legal Excellence
          </p>
          <h1 className="mt-3 font-serif text-3xl font-bold leading-[1.06] tracking-tight text-deep-charcoal sm:text-4xl md:text-5xl lg:text-7xl">
            Justice in Detail.
            <br />
            <span className="text-muted-gold">Results in Focus.</span>
          </h1>
          <div className="mt-6 flex items-center gap-4" aria-hidden>
            <div className="h-px w-12 bg-muted-gold/70" />
            <div className="h-px w-8 bg-muted-gold/40" />
          </div>
          <p className="mt-4 max-w-lg font-sans text-base leading-[1.7] text-deep-charcoal/70 sm:text-lg">
            Precision advocacy and strategic counsel for discerning clients.
          </p>
          <a
            href="#contact"
            className="mt-8 inline-flex w-full items-center justify-center rounded-md bg-deep-charcoal px-8 py-4 font-sans text-sm font-medium tracking-wide text-soft-bone shadow-premium transition-all hover:bg-deep-charcoal/90 hover:shadow-premium-lg focus:outline-none focus:ring-2 focus:ring-muted-gold/40 focus:ring-offset-2 sm:w-fit"
          >
            Book a Consultation
          </a>
        </motion.div>

        {/* Portrait image — hidden on mobile, visible on desktop */}
        <motion.div
          className="relative hidden items-center justify-end lg:flex"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <div
            className="aspect-[3/4] w-full max-w-md rounded-2xl border border-deep-charcoal/[0.08] bg-deep-charcoal/[0.04] shadow-premium flex items-center justify-center"
            aria-hidden
          >
            <span className="font-serif text-sm uppercase tracking-[0.2em] text-deep-charcoal/35">
              Professional portrait
            </span>
          </div>
        </motion.div>
      </section>

      {/* Practice Areas — 4 cards, hover lift */}
      <section id="practice-areas" className="border-t border-deep-charcoal/[0.06] bg-soft-bone py-16 sm:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
          <motion.div {...revealUp}>
            <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-muted-gold/80">
              Expertise
            </p>
            <h2 className="mt-2 font-serif text-2xl font-bold tracking-tight text-deep-charcoal sm:text-3xl md:text-4xl">
              Practice Areas
            </h2>
            <p className="mt-3 max-w-xl font-sans text-sm leading-[1.7] text-deep-charcoal/65 sm:text-base">
              Focused expertise across the disciplines that matter most to our clients.
            </p>
          </motion.div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:mt-16 lg:grid-cols-4">
            {PRACTICE_AREAS.map((area, i) => (
              <motion.article
                key={area.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
                whileHover={{ y: -8 }}
                className="rounded-2xl border border-deep-charcoal/[0.08] bg-soft-bone p-6 shadow-premium transition-all hover:shadow-premium-lg hover:border-muted-gold/25 lg:p-7"
              >
                <h3 className="font-serif text-lg font-semibold tracking-tight text-deep-charcoal sm:text-xl">
                  {area.title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-[1.65] text-deep-charcoal/65">
                  {area.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Services — Supabase-powered service cards */}
      <ServicesSection />

      {/* Authority — 3 case results, oversized numbers */}
      <section className="border-t border-deep-charcoal/10 bg-deep-charcoal py-16 text-soft-bone sm:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
          <motion.div {...revealUp}>
            <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-muted-gold/70">
              Results
            </p>
            <h2 className="mt-2 font-serif text-2xl font-bold tracking-tight text-soft-bone sm:text-3xl md:text-4xl">
              Authority in Numbers
            </h2>
            <p className="mt-3 max-w-xl font-sans text-sm leading-[1.7] text-soft-bone/75 sm:text-base">
              Outcomes that reflect our commitment to excellence.
            </p>
          </motion.div>
          <div className="mt-12 grid grid-cols-1 gap-10 sm:gap-12 md:mt-20 md:grid-cols-3 md:gap-16">
            {CASE_RESULTS.map((result, i) => (
              <motion.div
                key={i}
                className="flex flex-col"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
              >
                <span className="font-serif text-5xl font-bold leading-none tracking-tight text-muted-gold sm:text-6xl md:text-7xl lg:text-8xl">
                  <CountUp
                    target={result.target}
                    prefix={result.prefix}
                    suffix={result.suffix}
                    duration={1800}
                  />
                </span>
                <p className="mt-4 font-sans text-sm leading-[1.65] text-soft-bone/85 sm:text-base">
                  {result.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — Supabase-powered accordion */}
      <FaqSection />

      {/* Contact — Supabase-powered */}
      <ContactSection />
    </div>
  );
}
