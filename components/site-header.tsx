"use client";

import Link from "next/link";
import { BarChart3, Menu, X, ShieldCheck, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

const navigation = [
  { href: "/academy", label: "Academy" },
  { href: "/news", label: "News" },
  { href: "/calendar", label: "Calendar" },
  { href: "/weekly-recap", label: "Recaps" },
  { href: "/trading-ideas", label: "Trading Ideas" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" }
];

export function SiteHeader() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0f1e]/88 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 text-base font-bold">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-green-500 text-slate-950">
            <BarChart3 className="h-5 w-5" />
          </span>
          ApexTrade
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-green-400">
              {item.label}
            </Link>
          ))}
          {session ? (
            <>
              <Link href="/watchlist" className="transition hover:text-green-400">
                Watchlist
              </Link>
              <Link href="/journal" className="transition hover:text-green-400">
                Journal
              </Link>
            </>
          ) : null}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          {session ? (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-slate-400 hover:text-white"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/pricing">
                  <ShieldCheck className="h-4 w-4" />
                  Join Trade Setups
                </Link>
              </Button>
            </>
          )}
        </div>
        <Button className="md:hidden" variant="ghost" size="icon" aria-label="Open menu" onClick={() => setMobileOpen((prev) => !prev)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#0a0f1e] md:hidden">
          <nav className="container flex flex-col gap-1 py-4">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2.5 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-green-400">
                {item.label}
              </Link>
            ))}
            {session && (
              <>
                <Link href="/watchlist" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2.5 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-green-400">Watchlist</Link>
                <Link href="/journal" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2.5 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-green-400">Journal</Link>
              </>
            )}
            <div className="mt-3 border-t border-white/10 pt-3 flex flex-col gap-2">
              {session ? (
                <>
                  <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2.5 text-sm text-slate-300 hover:bg-slate-800">Dashboard</Link>
                  <button onClick={() => { setMobileOpen(false); signOut({ callbackUrl: "/" }); }} className="rounded-md px-3 py-2.5 text-left text-sm text-slate-400 hover:bg-slate-800">Sign Out</button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2.5 text-sm text-slate-300 hover:bg-slate-800">Sign In</Link>
                  <Link href="/pricing" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-semibold text-green-400 hover:bg-slate-800">Join Trade Setups →</Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
