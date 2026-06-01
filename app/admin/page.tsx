import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getArticles, getNews, getStats, getTradeSetups } from "@/lib/content";

export default async function AdminPage() {
  const [stats, articles, news, setups] = await Promise.all([
    getStats(),
    getArticles(),
    getNews(),
    getTradeSetups()
  ]);

  return (
    <>
      <PageHero
        eyebrow="Admin"
        title="Content and trade setup operations overview."
        description="Manage academy content, market news, and trade setup outcomes from one protected admin area."
      />
      <section className="container pb-16">
        <div className="mb-6 flex flex-wrap justify-end gap-3">
          <Button asChild>
            <Link href="/admin/market-brief/new">New Daily Brief</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/weekly-recap/new">New Weekly Recap</Link>
          </Button>
        </div>
        <div className="grid gap-5 md:grid-cols-4">
          <AdminMetric label="Win rate" value={`${stats.winRate}%`} href="/admin/trade-setups" />
          <AdminMetric label="Articles" value={String(articles.length)} href="/admin/articles" />
          <AdminMetric label="News items" value={String(news.length)} href="/admin/news" />
          <AdminMetric label="Trade setups" value={String(setups.length)} href="/admin/trade-setups" />
        </div>
      </section>
    </>
  );
}

function AdminMetric({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <Link href={href}>
      <Card className="p-6 transition hover:border-green-500/45">
        <p className="text-sm text-slate-400">{label}</p>
        <p className="mt-2 text-4xl font-bold text-green-400">{value}</p>
      </Card>
    </Link>
  );
}
