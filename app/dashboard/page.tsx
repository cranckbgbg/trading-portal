import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { AcademyProgressMetric } from "@/components/academy-progress-metric";
import { WatchlistMetric } from "@/components/watchlist-metric";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getArticles, getStats } from "@/lib/content";

export default async function DashboardPage() {
  const [stats, articles] = await Promise.all([getStats(), getArticles()]);

  return (
    <>
      <PageHero
        eyebrow="Dashboard"
        title="Subscriber command center."
        description="A protected area for performance snapshots, saved lessons, billing status, and quick access to the live trade setup feed."
      />
      <section className="container grid gap-5 pb-16 md:grid-cols-5">
        <Metric label="Win rate" value={`${stats.winRate}%`} />
        <Metric label="Setups tracked" value={String(stats.totalSetups)} />
        <Metric label="Closed ideas" value={String(stats.closedSetups)} />
        <AcademyProgressMetric totalLessons={articles.length} />
        <WatchlistMetric />
        <Card className="p-6 md:col-span-5">
          <h2 className="text-2xl font-semibold">Next action</h2>
          <p className="mt-3 max-w-2xl text-slate-400">Open the subscriber trade setup feed to review current active ideas and recent outcomes.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/trade-setups">Open Trade Setups</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/journal">Open Trade Journal</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/watchlist">Open Watchlist</Link>
            </Button>
          </div>
        </Card>
      </section>
    </>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <Card className="p-6">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-4xl font-bold text-green-400">{value}</p>
    </Card>
  );
}
