import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
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
        description="The feed is built for manual editorial control and automated n8n publishing through a protected webhook."
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
    </>
  );
}
