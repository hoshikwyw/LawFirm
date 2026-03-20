"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const transparent = !scrolled && !menuOpen;

  return (
    <header className="sticky top-0 z-50 flex justify-center px-4 pt-3 md:px-6 md:pt-4">
      <div
        className={`w-full max-w-5xl rounded-2xl transition-all duration-300 ${
          transparent ? "" : "nav-glass nav-glass--scrolled"
        }`}
      >
        <nav className="flex items-center justify-between px-5 py-3 md:px-7 md:py-3.5">
          {/* Logo */}
          <Link
            href="#"
            className={`font-serif text-[17px] font-semibold tracking-tight transition-colors duration-300 ${
              transparent ? "text-soft-bone" : "text-deep-charcoal"
            }`}
          >
            Law Firm
          </Link>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-1 md:flex">
            <Link
              href="#practice-areas"
              className={`rounded-xl px-4 py-2 font-sans text-[13px] font-medium tracking-wide transition-all duration-200 ${
                transparent
                  ? "text-white/80 hover:bg-white/10 hover:text-white"
                  : "text-deep-charcoal/65 hover:bg-deep-charcoal/[0.055] hover:text-deep-charcoal"
              }`}
            >
              Practice Areas
            </Link>
            <Link
              href="#contact"
              className={`rounded-xl px-4 py-2 font-sans text-[13px] font-medium tracking-wide transition-all duration-200 ${
                transparent
                  ? "text-white/80 hover:bg-white/10 hover:text-white"
                  : "text-deep-charcoal/65 hover:bg-deep-charcoal/[0.055] hover:text-deep-charcoal"
              }`}
            >
              Contact
            </Link>

            {/* CTA pill */}
            <a
              href="#contact"
              className={`ml-3 rounded-xl px-4 py-2 font-sans text-[13px] font-medium tracking-wide transition-all duration-200 ${
                transparent
                  ? "border border-white/30 text-white hover:bg-white/10"
                  : "bg-deep-charcoal text-soft-bone shadow-[0_1px_3px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.08)] hover:bg-deep-charcoal/85"
              }`}
            >
              Book a Consultation
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`flex size-9 items-center justify-center rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-muted-gold/50 md:hidden ${
              transparent
                ? "text-white/80 hover:bg-white/10 hover:text-white"
                : "text-deep-charcoal/70 hover:bg-deep-charcoal/[0.055] hover:text-deep-charcoal"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={`block transition-all duration-300 ${menuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"} absolute`}
            >
              <svg className="size-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </span>
            <span
              className={`block transition-all duration-300 ${menuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"} absolute`}
            >
              <svg className="size-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
          </button>
        </nav>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="nav-menu-open border-t border-white/20 px-3 pb-3 pt-2 md:hidden">
            <div className="flex flex-col gap-1">
              <Link
                href="#practice-areas"
                className="rounded-xl px-4 py-2.5 font-sans text-[13px] font-medium tracking-wide text-deep-charcoal/70 transition-colors hover:bg-deep-charcoal/[0.055] hover:text-deep-charcoal"
                onClick={() => setMenuOpen(false)}
              >
                Practice Areas
              </Link>
              <Link
                href="#contact"
                className="rounded-xl px-4 py-2.5 font-sans text-[13px] font-medium tracking-wide text-deep-charcoal/70 transition-colors hover:bg-deep-charcoal/[0.055] hover:text-deep-charcoal"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
              <a
                href="#contact"
                className="mt-1.5 flex items-center justify-center rounded-xl bg-deep-charcoal px-4 py-2.5 font-sans text-[13px] font-medium tracking-wide text-soft-bone shadow-[0_1px_3px_rgba(0,0,0,0.18)] transition-colors hover:bg-deep-charcoal/85"
                onClick={() => setMenuOpen(false)}
              >
                Book a Consultation
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
