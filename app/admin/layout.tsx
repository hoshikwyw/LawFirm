"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const NAV = [
  { href: "/admin/profile",  label: "Lawyer Profile", icon: "👤" },
  { href: "/admin/contact",  label: "Contact Info",   icon: "📞" },
  { href: "/admin/faqs",     label: "FAQs",           icon: "❓" },
  { href: "/admin/services", label: "Services",       icon: "⚖️" },
  { href: "/admin/accounts", label: "My Account",     icon: "🔐" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const [checking, setChecking]   = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) { setChecking(false); return; }

    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.replace("/admin/login");
      else setChecking(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) router.replace("/admin/login");
    });

    return () => subscription.unsubscribe();
  }, [router, isLoginPage]);

  // Close drawer on route change
  useEffect(() => { setDrawerOpen(false); }, [pathname]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  if (isLoginPage) return <>{children}</>;

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-soft-bone">
        <div className="size-6 animate-spin rounded-full border-2 border-muted-gold border-t-transparent" />
      </div>
    );
  }

  const sidebarContent = (
    <>
      {/* Brand */}
      <div className="border-b border-deep-charcoal/[0.07] px-6 py-5">
        <p className="font-serif text-lg font-semibold tracking-tight text-deep-charcoal">Law Firm</p>
        <p className="mt-0.5 font-sans text-xs text-deep-charcoal/45">Admin Dashboard</p>
      </div>

      {/* Nav links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="mb-2 px-3 font-sans text-[10px] font-semibold uppercase tracking-[0.15em] text-deep-charcoal/35">
          Content
        </p>
        {NAV.map(({ href, label, icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 font-sans text-sm font-medium transition-colors ${
                active
                  ? "bg-deep-charcoal text-soft-bone"
                  : "text-deep-charcoal/65 hover:bg-deep-charcoal/[0.055] hover:text-deep-charcoal"
              }`}
            >
              <span className="text-base">{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>

      {/* View site + sign out */}
      <div className="border-t border-deep-charcoal/[0.07] px-3 py-4 space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 font-sans text-sm font-medium text-deep-charcoal/55 transition-colors hover:bg-deep-charcoal/[0.055] hover:text-deep-charcoal"
        >
          <span className="text-base">🌐</span>
          View Site
        </a>
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 font-sans text-sm font-medium text-deep-charcoal/55 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <span className="text-base">🚪</span>
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-[#F8F8FA]">

      {/* ── Desktop sidebar (permanent) ── */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-deep-charcoal/[0.07] bg-white lg:flex">
        {sidebarContent}
      </aside>

      {/* ── Mobile drawer backdrop ── */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-deep-charcoal/30 backdrop-blur-sm lg:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* ── Mobile drawer ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-deep-charcoal/[0.07] bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          onClick={() => setDrawerOpen(false)}
          className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-lg text-deep-charcoal/40 hover:bg-deep-charcoal/[0.055] hover:text-deep-charcoal"
          aria-label="Close menu"
        >
          <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {sidebarContent}
      </aside>

      {/* ── Main area ── */}
      <div className="flex min-h-screen w-full flex-col lg:pl-60">

        {/* Mobile top header */}
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-deep-charcoal/[0.07] bg-white px-4 py-3 lg:hidden">
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex size-9 items-center justify-center rounded-xl text-deep-charcoal/60 hover:bg-deep-charcoal/[0.055] hover:text-deep-charcoal"
            aria-label="Open menu"
          >
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <p className="font-serif text-base font-semibold tracking-tight text-deep-charcoal">
            {NAV.find((n) => n.href === pathname)?.label ?? "Dashboard"}
          </p>
          <button
            onClick={handleSignOut}
            className="ml-auto flex size-9 items-center justify-center rounded-xl text-deep-charcoal/50 hover:bg-red-50 hover:text-red-500"
            aria-label="Sign out"
          >
            <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
