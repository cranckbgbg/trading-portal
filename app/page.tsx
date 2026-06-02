import Link from "next/link";
import { ArrowRight, BarChart3, BookOpen, Newspaper, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CountUp } from "@/components/count-up";
import { SetupCard } from "@/components/setup-card";
import { MarketBriefCard } from "@/components/market-brief-card";
import { TestimonialsSection } from "@/components/testimonials-section";
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
            <HeroStat label="Public win rate" end={stats.winRate} suffix="%" />
            <HeroStat label="Total setups" end={stats.totalSetups} suffix="+" />
            <HeroStat label="Members" end={stats.members} suffix="+" />
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

      <TestimonialsSection />

      {/* HOW IT WORKS */}
      <section className="container py-16">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-400">Simple process</p>
          <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">How ApexTrade works</h2>
        </div>
        <div className="relative grid gap-8 md:grid-cols-3">
          <div className="absolute left-1/4 right-1/4 top-8 hidden h-px bg-gradient-to-r from-transparent via-green-500/40 to-transparent md:block" />

          <HowItWorksStep
            number="01"
            title="Subscribe"
            description="Choose a Monthly or Annual plan. Instant access to the full trade setup feed, academy, journal, and economic calendar."
            icon="🔑"
          />
          <HowItWorksStep
            number="02"
            title="Follow the setups"
            description="Each setup includes entry, take profit, and stop loss. Study the reasoning, track it in your journal, and build your process."
            icon="📊"
          />
          <HowItWorksStep
            number="03"
            title="Review and improve"
            description="Every Friday — a weekly recap. Every setup is closed as WIN or LOSS. Full transparency. Track your progress over time."
            icon="📈"
          />
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

      {/* PRE-FOOTER CTA */}
      <section className="container py-16">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-8 py-14 text-center md:px-16">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-64 w-64 rounded-full bg-green-500/10 blur-3xl" />
          </div>
          <div className="relative z-10">
            <Badge className="mb-4">Start today</Badge>
            <h2 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Trade with structure.
              <br />
              Build a real edge.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-7 text-slate-400">
              Access live trade setups, personal trade journal, economic calendar, weekly recaps, and structured academy content. Cancel any time.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild className="h-11 px-8 text-base">
                <Link href="/pricing">View Pricing Plans</Link>
              </Button>
              <Button asChild variant="ghost" className="h-11 border border-white/20 px-8 text-base">
                <Link href="/trading-ideas">See Trading Ideas →</Link>
              </Button>
            </div>
            <p className="mt-6 text-xs text-slate-600">
              Educational content only · Not financial advice · Cancel anytime
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function HeroStat({ label, end, suffix }: { label: string; end: number; suffix?: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-card p-4">
      <p className="text-3xl font-bold text-green-400">
        <CountUp end={end} suffix={suffix} />
      </p>
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

function HowItWorksStep({
  number,
  title,
  description,
  icon
}: {
  number: string;
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="relative flex flex-col items-center text-center">
      <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-green-500/40 bg-slate-900 text-2xl">
        {icon}
      </div>
      <div className="absolute left-1/2 top-6 z-0 flex h-5 w-5 -translate-x-1/2 items-center justify-center">
        <span className="text-xs font-bold text-green-400">{number}</span>
      </div>
      <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 max-w-xs text-sm leading-6 text-slate-400">{description}</p>
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
