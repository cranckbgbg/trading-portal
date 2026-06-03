"use client";

import Link from "next/link";
import { BarChart3 } from "lucide-react";
import { useSession } from "next-auth/react";

export function SiteFooter() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <footer className="border-t border-white/10 bg-slate-950/40">
      <div className="container grid gap-8 py-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-green-500 text-slate-950">
              <BarChart3 className="h-4 w-4" />
            </span>
            ApexTrade
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
            Professional trading education, market news, and subscriber-only trade setups built for disciplined traders.
          </p>
        </div>
        <FooterColumn title="Platform" links={[
          ["Trade Setups", "/trade-setups"],
          ["Trading Ideas", "/trading-ideas"],
          ["Calendar", "/calendar"],
          ["Weekly Recaps", "/weekly-recap"],
          ["Pricing", "/pricing"],
        ]} />
        <FooterColumn title="Education" links={[
          ["Academy", "/academy"],
          ["News", "/news"],
          ["About", "/about"],
        ]} />
        <FooterColumn title="Account" links={[
          ["Dashboard", "/dashboard"],
          ["Trade Journal", "/journal"],
          ["Watchlist", "/watchlist"],
          ...(isAdmin ? [["Admin", "/admin"] as [string, string]] : []),
        ]} />
      </div>
      <div className="container border-t border-white/5 py-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-slate-600">© 2026 ApexTrade. All rights reserved.</p>
          <p className="max-w-xl text-xs text-slate-700 leading-5">
            Educational content only. Not financial advice. Not FCA regulated. Trading involves substantial risk of loss.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <p className="font-semibold text-slate-200">{title}</p>
      <div className="mt-3 grid gap-2 text-sm text-slate-400">
        {links.map(([label, href]) => (
          <Link key={href} href={href} className="hover:text-green-400">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
