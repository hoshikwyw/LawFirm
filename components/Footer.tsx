"use client";

import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-deep-charcoal">
      {/* Main footer body */}
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="font-serif text-xl font-semibold tracking-tight text-soft-bone">
              Law Firm
            </p>
            <p className="mt-3 max-w-xs font-sans text-sm leading-[1.7] text-soft-bone/45">
              Precision advocacy and strategic counsel for discerning clients. Justice in detail, results in focus.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-4 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-soft-bone/35">
              Navigation
            </p>
            <ul className="space-y-2.5">
              {[
                { label: "Practice Areas", href: "#practice-areas" },
                { label: "Services",       href: "#services" },
                { label: "Results",        href: "#" },
                { label: "FAQ",            href: "#" },
                { label: "Contact",        href: "#contact" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="font-sans text-sm text-soft-bone/55 transition-colors hover:text-muted-gold"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Admin */}
          <div>
            <p className="mb-4 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-soft-bone/35">
              Legal
            </p>
            <ul className="space-y-2.5">
              <li>
                <span className="font-sans text-sm text-soft-bone/55">
                  Attorney–client communications are confidential.
                </span>
              </li>
              <li>
                <span className="font-sans text-sm text-soft-bone/55">
                  This site does not constitute legal advice.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.07]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-5 sm:flex-row lg:px-12">
          <p className="font-sans text-xs text-soft-bone/35">
            © {year} Law Firm. All rights reserved.
          </p>

          {/* Admin dashboard link — subtle, for the lawyer */}
          <Link
            href="/admin"
            className="group flex items-center gap-2 rounded-lg border border-white/[0.08] px-3.5 py-2 font-sans text-xs font-medium text-soft-bone/35 transition-all duration-200 hover:border-muted-gold/30 hover:text-muted-gold"
          >
            <svg
              className="size-3.5 opacity-60 transition-opacity group-hover:opacity-100"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Admin Dashboard
          </Link>
        </div>
      </div>
    </footer>
  );
}
