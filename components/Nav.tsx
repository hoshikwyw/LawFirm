"use client";

import Link from "next/link";

export function Nav() {
  return (
    <header className="glassmorphism sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
        <Link
          href="#"
          className="font-serif text-xl font-semibold tracking-tight text-deep-charcoal"
        >
          Law Firm
        </Link>
        <div className="flex items-center gap-10">
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
      </nav>
    </header>
  );
}
