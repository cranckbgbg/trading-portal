import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/40">
      <div className="container grid gap-8 py-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="text-lg font-bold text-white">ApexTrade</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
            Professional trading education, market news, and subscriber-only trade setups built for disciplined traders.
          </p>
        </div>
        <FooterColumn title="Platform" links={[["Trade Setups", "/trade-setups"], ["Trading Ideas", "/trading-ideas"], ["Pricing", "/pricing"]]} />
        <FooterColumn title="Education" links={[["Academy", "/academy"], ["News", "/news"], ["About", "/about"]]} />
        <FooterColumn title="Admin" links={[["Dashboard", "/dashboard"], ["Admin", "/admin"]]} />
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
