import { articles, news, tradeSetups } from "@/lib/sample-data";
import { prisma } from "@/lib/prisma";

export type AppTradeSetup = {
  id: string;
  symbol: string;
  direction: "LONG" | "SHORT";
  entryPrice: number;
  takeProfit: number;
  stopLoss: number;
  status: "ACTIVE" | "WIN" | "LOSS";
  publishedAt: Date;
  closedAt: Date | null;
};

export type AppMarketBrief = {
  id: string;
  title: string;
  body: string;
  markets: string[];
  publishedAt: Date;
};

export type AppWeeklyRecap = {
  id: string;
  weekLabel: string;
  summary: string;
  wins: number;
  losses: number;
  keyLesson: string;
  publishedAt: Date;
};

const sampleMarketBrief: AppMarketBrief = {
  id: "1",
  title: "Monday Market Context",
  body: "DXY is holding key support at 104.20 while gold consolidates above $2,300. Watch for CPI data Wednesday — elevated readings could pressure risk assets. Equity indices are range-bound ahead of the print.",
  markets: ["DXY", "XAUUSD", "SPX500"],
  publishedAt: new Date()
};

const sampleWeeklyRecap: AppWeeklyRecap = {
  id: "1",
  weekLabel: "Week of Jun 2, 2026",
  summary:
    "This week we tracked three active setups across EURUSD, XAUUSD, and GBPJPY. Two closed as wins following a clear DXY reversal after NFP. The GBPJPY short was stopped out ahead of the BoE speech — a reminder that central bank risk windows require tighter position sizing.",
  wins: 2,
  losses: 1,
  keyLesson:
    "Reduce size ahead of scheduled central bank events — volatility is directional but timing is unpredictable.",
  publishedAt: new Date()
};

async function withFallback<T>(query: () => Promise<T>, fallback: T) {
  if (!process.env.DATABASE_URL) {
    return fallback;
  }

  try {
    return await query();
  } catch {
    return fallback;
  }
}

export async function getLatestBrief() {
  return withFallback<AppMarketBrief>(
    async () => {
      const brief = await prisma.marketBrief.findFirst({
        orderBy: { publishedAt: "desc" }
      });

      return brief ?? sampleMarketBrief;
    },
    sampleMarketBrief
  );
}

export async function getRecaps() {
  return withFallback<AppWeeklyRecap[]>(
    async () => prisma.weeklyRecap.findMany({ orderBy: { publishedAt: "desc" } }),
    [sampleWeeklyRecap]
  );
}

export async function getLatestRecap() {
  const recaps = await getRecaps();
  return recaps[0] ?? null;
}

export async function getArticles() {
  return withFallback(
    () => prisma.article.findMany({ orderBy: { publishedAt: "desc" } }),
    articles
  );
}

export async function getArticle(slug: string) {
  return withFallback(
    () => prisma.article.findUnique({ where: { slug } }),
    articles.find((article) => article.slug === slug) ?? null
  );
}

export async function getNews(category?: string) {
  const normalized = category?.toUpperCase();
  const fallback = normalized
    ? news.filter((item) => item.category === normalized)
    : news;

  return withFallback(
    () =>
      prisma.news.findMany({
        where: normalized ? { category: normalized as never } : undefined,
        orderBy: { publishedAt: "desc" }
      }),
    fallback
  );
}

export async function getNewsItem(slug: string) {
  return withFallback(
    () => prisma.news.findUnique({ where: { slug } }),
    news.find((item) => item.slug === slug) ?? null
  );
}

export async function getRelatedNews(category: string, excludeSlug: string, limit = 3) {
  const normalized = category.toUpperCase();
  const fallback = news
    .filter((item) => item.category === normalized && item.slug !== excludeSlug)
    .slice(0, limit);

  return withFallback(
    () =>
      prisma.news.findMany({
        where: {
          category: normalized as never,
          slug: { not: excludeSlug }
        },
        orderBy: { publishedAt: "desc" },
        take: limit
      }),
    fallback
  );
}

export async function getTradeSetups() {
  return withFallback<AppTradeSetup[]>(
    async () => {
      const records = await prisma.tradeSetup.findMany({ orderBy: { publishedAt: "desc" } });
      return records.map((setup) => ({
        ...setup,
        entryPrice: Number(setup.entryPrice),
        takeProfit: Number(setup.takeProfit),
        stopLoss: Number(setup.stopLoss)
      }));
    },
    tradeSetups as AppTradeSetup[]
  );
}

export async function getStats() {
  const allSetups = await getTradeSetups();
  const closedSetups = allSetups.filter((setup) => setup.status !== "ACTIVE");
  const wins = closedSetups.filter((setup) => setup.status === "WIN").length;
  const losses = closedSetups.filter((setup) => setup.status === "LOSS").length;
  const symbols = Array.from(new Set(allSetups.map((setup) => setup.symbol)));
  const bySymbol = symbols
    .map((symbol) => {
      const symbolSetups = closedSetups.filter((setup) => setup.symbol === symbol);
      const symbolWins = symbolSetups.filter((setup) => setup.status === "WIN").length;

      return {
        symbol,
        total: symbolSetups.length,
        wins: symbolWins,
        winRate: symbolSetups.length ? Math.round((symbolWins / symbolSetups.length) * 100) : 0
      };
    })
    .filter((symbol) => symbol.total > 0)
    .sort((a, b) => b.total - a.total);

  return {
    winRate: closedSetups.length ? Math.round((wins / closedSetups.length) * 100) : 0,
    totalSetups: allSetups.length,
    members: 1280,
    closedSetups: closedSetups.length,
    wins,
    losses,
    activeSetups: allSetups.filter((setup) => setup.status === "ACTIVE").length,
    bySymbol
  };
}
