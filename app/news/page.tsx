import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getNews } from "@/lib/content";
import { formatDate } from "@/lib/utils";

const filters = ["All", "Forex", "Gold", "Crypto", "Macro"];

export default async function NewsPage({
  searchParams
}: {
  searchParams: { category?: string };
}) {
  const selected = searchParams.category;
  const items = await getNews(selected);

  return (
    <>
      <PageHero
        eyebrow="Market News"
        title="Fast market updates filtered by Forex, Gold, Crypto, and Macro."
        description="Stay ahead with fast market updates across Forex, Gold, Crypto, and Macro. Filtered by category so you see what matters to your trading."
      />
      <section className="container pb-16">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const href = filter === "All" ? "/news" : `/news?category=${filter}`;
            return (
              <Link key={filter} href={href}>
                <Badge className={!selected && filter === "All" ? "border-green-400" : ""}>{filter}</Badge>
              </Link>
            );
          })}
        </div>
        <div className="mt-8 grid gap-4">
          {items.map((item) => (
            <Link key={item.slug} href={`/news/${item.slug}`} className="rounded-lg border border-white/10 bg-card p-6 transition hover:border-green-500/45">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Badge>{item.category}</Badge>
                <span className="text-xs text-slate-500">{formatDate(item.publishedAt)}</span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-white">{item.title}</h2>
              <p className="mt-3 line-clamp-2 leading-7 text-slate-400">{item.content}</p>
              <p className="mt-4 text-sm text-slate-500">Source: {item.source ?? "Editorial desk"}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container pb-16">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-8 py-12 text-center">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-48 w-48 rounded-full bg-green-500/10 blur-3xl" />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white md:text-3xl">Get structured trade ideas alongside the news</h2>
            <p className="mx-auto mt-3 max-w-md text-slate-400">
              Subscribers get live trade setups with exact entry and risk levels — not just news, but a structured process for acting on it.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/pricing">View Pricing</Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href="/trading-ideas">Browse Trading Ideas →</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
