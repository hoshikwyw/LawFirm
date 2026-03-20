"use client";

import Link from "next/link";
import { useState } from "react";

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="glassmorphism sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12 lg:py-5">
        <Link
          href="#"
          className="font-serif text-xl font-semibold tracking-tight text-deep-charcoal"
        >
          Law Firm
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-10 md:flex">
          <Link
            href="#practice-areas"
            className="relative font-sans text-sm font-medium tracking-wide text-deep-charcoal/75 transition-colors hover:text-deep-charcoal after:absolute after:bottom-[-2px] after:left-0 after:h-px after:w-0 after:bg-muted-gold after:transition-[width] hover:after:w-full"
          >
            Practice Areas
          </Link>
          <Link
            href="#contact"
            className="relative font-sans text-sm font-medium tracking-wide text-deep-charcoal/75 transition-colors hover:text-deep-charcoal after:absolute after:bottom-[-2px] after:left-0 after:h-px after:w-0 after:bg-muted-gold after:transition-[width] hover:after:w-full"
          >
            Contact
          </Link>
        </div>

        {/* Mobile hamburger button */}
        <button
          className="flex size-10 items-center justify-center rounded-lg text-deep-charcoal/75 transition-colors hover:bg-deep-charcoal/5 hover:text-deep-charcoal focus:outline-none focus:ring-2 focus:ring-muted-gold/40 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="border-t border-deep-charcoal/[0.06] px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-1">
            <Link
              href="#practice-areas"
              className="rounded-lg px-3 py-3 font-sans text-sm font-medium tracking-wide text-deep-charcoal/75 transition-colors hover:bg-deep-charcoal/5 hover:text-deep-charcoal"
              onClick={() => setMenuOpen(false)}
            >
              Practice Areas
            </Link>
            <Link
              href="#contact"
              className="rounded-lg px-3 py-3 font-sans text-sm font-medium tracking-wide text-deep-charcoal/75 transition-colors hover:bg-deep-charcoal/5 hover:text-deep-charcoal"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
            <a
              href="#contact"
              className="mt-2 flex items-center justify-center rounded-lg bg-deep-charcoal px-4 py-3 font-sans text-sm font-medium tracking-wide text-soft-bone transition-colors hover:bg-deep-charcoal/90"
              onClick={() => setMenuOpen(false)}
            >
              Book a Consultation
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
