"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-deep-charcoal/8 bg-deep-charcoal/[0.03] py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="font-serif text-sm font-medium tracking-wide text-deep-charcoal/70">
            © {new Date().getFullYear()} Law Firm. All rights reserved.
          </p>
          <div className="flex gap-10">
            <Link
              href="#practice-areas"
              className="font-sans text-sm tracking-wide text-deep-charcoal/65 transition-colors hover:text-muted-gold"
            >
              Practice Areas
            </Link>
            <Link
              href="#contact"
              className="font-sans text-sm tracking-wide text-deep-charcoal/65 transition-colors hover:text-muted-gold"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
