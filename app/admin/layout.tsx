"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const NAV = [
  { href: "/admin/profile",  label: "Lawyer Profile", icon: "👤" },
  { href: "/admin/contact",  label: "Contact Info",   icon: "📞" },
  { href: "/admin/faqs",     label: "FAQs",           icon: "❓" },
  { href: "/admin/services", label: "Services",       icon: "⚖️" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    // Login page manages its own auth — don't interfere
    if (isLoginPage) {
      setChecking(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/admin/login");
      } else {
        setChecking(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace("/admin/login");
    });

    return () => subscription.unsubscribe();
  }, [router, isLoginPage]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  // Render login page without the dashboard shell
  if (isLoginPage) return <>{children}</>;

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-soft-bone">
        <div className="size-6 animate-spin rounded-full border-2 border-muted-gold border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8F8FA]">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-deep-charcoal/[0.07] bg-white">
        {/* Brand */}
        <div className="border-b border-deep-charcoal/[0.07] px-6 py-5">
          <p className="font-serif text-lg font-semibold tracking-tight text-deep-charcoal">Law Firm</p>
          <p className="mt-0.5 font-sans text-xs text-deep-charcoal/45">Admin Dashboard</p>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4">
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
      </aside>

      {/* Main content */}
      <main className="ml-60 flex-1 px-8 py-10">
        {children}
      </main>
    </div>
  );
}
