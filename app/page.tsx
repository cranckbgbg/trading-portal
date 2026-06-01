import Link from "next/link";
import { ArrowRight, BarChart3, BookOpen, Newspaper, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SetupCard } from "@/components/setup-card";
import { MarketBriefCard } from "@/components/market-brief-card";
import { calendarEvents } from "@/lib/calendar-data";
import { getArticles, getLatestBrief, getLatestRecap, getNews, getStats, getTradeSetups } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export default async function HomePage() {
  const [stats, latestSetups, latestNews, articles, latestBrief, latestRecap] = await Promise.all([
    getStats(),
    getTradeSetups(),
    getNews(),
    getArticles(),
    getLatestBrief(),
    getLatestRecap()
  ]);
  const highImpactEvents = calendarEvents
    .filter((event) => event.impact === "HIGH")
    .slice(0, 3);

  return (
    <>
      <section className="container grid min-h-[calc(100vh-4rem)] items-center gap-10 py-12 md:grid-cols-[1.1fr_0.9fr] md:py-16">
        <div>
          <Badge>Professional trade setups and education</Badge>
          <h1 className="mt-6 max-w-4xl text-5xl font-bold tracking-tight text-white md:text-7xl">
            Trade with sharper context, cleaner risk, and verified setup history.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            A modern portal inspired by leading trading education platforms, rebuilt around subscriber trade setups, transparent performance, fast market news, and structured academy content.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="default">
              <Link href="/pricing">
                Unlock Trade Setups <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="default">
              <Link href="/academy">Explore Academy</Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <HeroStat label="Public win rate" value={`${stats.winRate}%`} />
            <HeroStat label="Total setups" value={`${stats.totalSetups}+`} />
            <HeroStat label="Members" value={`${stats.members.toLocaleString()}+`} />
          </div>
        </div>
        <div className="rounded-lg border border-green-500/20 bg-card p-4 shadow-glow">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Latest premium idea</p>
              <p className="font-semibold text-white">Subscriber feed preview</p>
            </div>
            <Zap className="h-5 w-5 text-green-400" />
          </div>
          <SetupCard setup={normalizeSetup(latestSetups[0])} locked />
        </div>
      </section>

      <section className="container pb-6">
        <MarketBriefCard brief={latestBrief} />
      </section>

      <section className="container pb-12">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <Badge>This Week</Badge>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">This Week&apos;s Key Events</h2>
          </div>
          <Link href="/calendar" className="text-sm font-semibold text-green-400">
            View full calendar →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {highImpactEvents.length ? (
            highImpactEvents.map((event) => (
              <Card key={event.id} className="p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <Badge>{event.currency}</Badge>
                  <span className="text-xs font-semibold text-red-300">HIGH</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{event.name}</h3>
                <p className="mt-2 text-sm text-slate-500">
                  {formatDate(event.date)} · {event.time}
                </p>
              </Card>
            ))
          ) : (
            <Card className="p-6 text-sm text-slate-400 md:col-span-3">No events scheduled.</Card>
          )}
        </div>
      </section>

      {latestRecap ? (
        <section className="container pb-12">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <Badge>Latest Weekly Recap</Badge>
              <h2 className="mt-4 text-3xl font-bold md:text-4xl">{latestRecap.weekLabel}</h2>
            </div>
            <Link href="/weekly-recap" className="text-sm font-semibold text-green-400">
              All recaps →
            </Link>
          </div>
          <Card className="mt-6 p-6">
            <p className="leading-7 text-slate-300">{latestRecap.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-md border border-green-500/30 bg-green-500/10 px-2.5 py-1 text-xs font-semibold text-green-400">
                {latestRecap.wins} WIN
              </span>
              <span className="rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-300">
                {latestRecap.losses} LOSS
              </span>
            </div>
          </Card>
        </section>
      ) : null}

      <section className="border-y border-white/10 bg-slate-950/35 py-12">
        <div className="container grid gap-4 md:grid-cols-4">
          <Feature icon={<ShieldCheck />} title="Verified outcomes" text="Trade setups can be marked WIN or LOSS by admins, feeding public trust stats." />
          <Feature icon={<BarChart3 />} title="Setup-first product" text="Trading ideas are visible to guests while exact execution stays paywalled." />
          <Feature icon={<Newspaper />} title="Automated news" text="n8n can publish market updates directly into the news feed." />
          <Feature icon={<BookOpen />} title="Structured academy" text="Education is organized by category for clear progression." />
        </div>
      </section>

      <section className="container py-16">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <Badge>Trading Ideas</Badge>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">Latest trading ideas preview</h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/trading-ideas">View all ideas</Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {latestSetups.slice(0, 3).map((setup, index) => (
            <SetupCard key={`${setup.symbol}-${index}`} setup={normalizeSetup(setup)} locked={index !== 1} />
          ))}
        </div>
      </section>

      <section className="container grid gap-8 py-16 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <Badge>Market desk</Badge>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">Fast news by market category</h2>
          <p className="mt-4 text-slate-300">
            Forex, gold, crypto, and macro updates are designed for quick filtering and automated publishing workflows.
          </p>
          <Button asChild className="mt-6" variant="outline">
            <Link href="/news">Open news feed</Link>
          </Button>
        </div>
        <div className="grid gap-4">
          {latestNews.slice(0, 4).map((item) => (
            <Link key={item.slug} href={`/news/${item.slug}`} className="rounded-lg border border-white/10 bg-card p-5 transition hover:border-green-500/45">
              <div className="flex items-center justify-between gap-4">
                <Badge>{item.category}</Badge>
                <span className="text-xs text-slate-500">{formatDate(item.publishedAt)}</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">{item.content}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container py-16">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <Badge>Academy</Badge>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">Education organized like a real trading curriculum</h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/academy">Browse academy</Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <Card key={article.slug} className="transition hover:border-green-500/45">
              <CardHeader>
                <Badge>{article.category}</Badge>
                <CardTitle>{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-sm leading-6 text-slate-400">{article.content}</p>
                <Link href={`/academy/${article.slug}`} className="mt-5 inline-flex text-sm font-semibold text-green-400">
                  Read article
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-card p-4">
      <p className="text-3xl font-bold text-green-400">{value}</p>
      <p className="mt-1 text-sm text-slate-400">{label}</p>
    </div>
  );
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-card p-5">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-green-500/10 text-green-400">
        {icon}
      </div>
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
    </div>
  );
}

function normalizeSetup(setup: any) {
  return {
    ...setup,
    entryPrice: Number(setup.entryPrice),
    takeProfit: Number(setup.takeProfit),
    stopLoss: Number(setup.stopLoss)
  };
}
