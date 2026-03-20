"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { supabase, type ContactInfo } from "@/lib/supabase";
import { ContactForm } from "@/components/ContactForm";

function PhoneIcon() {
  return (
    <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function AddressIcon() {
  return (
    <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function SocialIcon({ name }: { name: string }) {
  const cls = "size-5";
  switch (name) {
    case "linkedin":
      return <svg className={cls} fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>;
    case "facebook":
      return <svg className={cls} fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>;
    case "twitter":
      return <svg className={cls} fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>;
    case "instagram":
      return <svg className={cls} fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>;
    default:
      return null;
  }
}

export function ContactSection() {
  const [info, setInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("contact_info")
      .select("*")
      .single()
      .then(({ data }) => {
        if (data) setInfo(data);
        setLoading(false);
      });
  }, []);

  const socials = info
    ? [
        { label: "LinkedIn",  href: info.linkedin_url,  icon: "linkedin"  },
        { label: "Facebook",  href: info.facebook_url,  icon: "facebook"  },
        { label: "Twitter",   href: info.twitter_url,   icon: "twitter"   },
        { label: "Instagram", href: info.instagram_url, icon: "instagram" },
      ].filter((s) => s.href)
    : [];

  return (
    <section id="contact" className="border-t border-deep-charcoal/[0.06] bg-soft-bone py-16 sm:py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-muted-gold/80">
            Get in touch
          </p>
          <h2 className="mt-2 font-serif text-2xl font-bold tracking-tight text-deep-charcoal sm:text-3xl md:text-4xl">
            Contact
          </h2>
          <p className="mt-3 max-w-xl font-sans text-sm leading-[1.7] text-deep-charcoal/65 sm:text-base">
            Send us a message about your legal matter, or use the chat button to message us on Messenger.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 md:gap-10 lg:gap-12">
          {/* Contact buttons */}
          <motion.div
            className="rounded-2xl border border-deep-charcoal/[0.08] bg-soft-bone p-6 shadow-premium sm:p-8 md:p-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <ContactForm
              viberNumber={info?.viber_number ?? undefined}
              messengerUsername={info?.messenger_username ?? undefined}
              email={info?.email ?? undefined}
            />
          </motion.div>

          {/* Info panel */}
          <motion.aside
            className="flex flex-col gap-6 rounded-2xl border border-deep-charcoal/[0.08] bg-deep-charcoal/[0.04] p-6 shadow-premium sm:p-8 md:gap-8 md:p-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="font-serif text-xl font-semibold tracking-tight text-deep-charcoal">
              Reach us directly
            </h3>

            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 animate-pulse">
                    <div className="size-11 shrink-0 rounded-xl bg-deep-charcoal/[0.07]" />
                    <div className="h-4 w-40 rounded bg-deep-charcoal/[0.07]" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4 sm:gap-5">
                {info?.phone && (
                  <a
                    href={`tel:${info.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-4 font-sans text-deep-charcoal/85 transition-colors hover:text-muted-gold"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted-gold/15 text-muted-gold">
                      <PhoneIcon />
                    </span>
                    <span className="text-sm sm:text-base">{info.phone}</span>
                  </a>
                )}
                {info?.email && (
                  <a
                    href={`mailto:${info.email}`}
                    className="flex items-center gap-4 font-sans text-deep-charcoal/85 transition-colors hover:text-muted-gold"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted-gold/15 text-muted-gold">
                      <EmailIcon />
                    </span>
                    <span className="break-all text-sm sm:text-base">{info.email}</span>
                  </a>
                )}
                {info?.address && (
                  <div className="flex items-start gap-4 font-sans text-deep-charcoal/75">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted-gold/15 text-muted-gold">
                      <AddressIcon />
                    </span>
                    <span className="text-sm leading-[1.6] sm:text-base">{info.address}</span>
                  </div>
                )}
              </div>
            )}

            {socials.length > 0 && (
              <div className="border-t border-deep-charcoal/[0.08] pt-6 md:pt-8">
                <p className="mb-4 font-sans text-sm font-medium tracking-wide text-deep-charcoal/75">
                  Follow us
                </p>
                <div className="flex flex-wrap gap-3">
                  {socials.map(({ label, href, icon }) => (
                    <a
                      key={label}
                      href={href!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex size-11 items-center justify-center rounded-xl border border-deep-charcoal/10 bg-soft-bone text-deep-charcoal/75 transition-all hover:border-muted-gold/30 hover:bg-muted-gold/10 hover:text-muted-gold"
                      aria-label={label}
                    >
                      <SocialIcon name={icon} />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
