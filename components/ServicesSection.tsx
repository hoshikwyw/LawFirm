"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { supabase, type Service } from "@/lib/supabase";

export function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("services")
      .select("*")
      .order("order", { ascending: true })
      .then(({ data }) => {
        if (data) setServices(data);
        setLoading(false);
      });
  }, []);

  return (
    <section
      id="services"
      className="border-t border-deep-charcoal/[0.06] bg-deep-charcoal py-16 sm:py-20 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-muted-gold/70">
            What We Offer
          </p>
          <h2 className="mt-2 font-serif text-2xl font-bold tracking-tight text-soft-bone sm:text-3xl md:text-4xl">
            Our Services
          </h2>
          <p className="mt-3 max-w-xl font-sans text-sm leading-[1.7] text-soft-bone/60 sm:text-base">
            Comprehensive legal services tailored to protect your interests and drive results.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {loading
            ? [...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-2xl border border-white/[0.07] bg-white/[0.04] p-6 lg:p-7"
                >
                  <div className="mb-4 size-10 rounded-xl bg-white/[0.08]" />
                  <div className="h-4 w-2/3 rounded bg-white/[0.08]" />
                  <div className="mt-3 space-y-2">
                    <div className="h-3 w-full rounded bg-white/[0.06]" />
                    <div className="h-3 w-4/5 rounded bg-white/[0.06]" />
                  </div>
                </div>
              ))
            : services.length === 0
            ? (
                <p className="col-span-full font-sans text-sm text-soft-bone/40">
                  No services listed yet.
                </p>
              )
            : services.map((service, i) => (
                <motion.article
                  key={service.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.45,
                    delay: i * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -6 }}
                  className="group rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 transition-all duration-300 hover:border-muted-gold/25 hover:bg-white/[0.07] lg:p-7"
                >
                  {/* Icon */}
                  <div className="mb-4 flex size-11 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.06] text-xl transition-colors duration-300 group-hover:border-muted-gold/30 group-hover:bg-muted-gold/10">
                    {service.icon}
                  </div>

                  <h3 className="font-serif text-lg font-semibold tracking-tight text-soft-bone sm:text-xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 font-sans text-sm leading-[1.7] text-soft-bone/55">
                    {service.description}
                  </p>

                  {/* Learn more link */}
                  <a
                    href="#contact"
                    className="mt-5 inline-flex items-center gap-1.5 font-sans text-xs font-medium tracking-wide text-muted-gold/70 transition-colors hover:text-muted-gold"
                  >
                    Get in touch
                    <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </motion.article>
              ))}
        </div>
      </div>
    </section>
  );
}
