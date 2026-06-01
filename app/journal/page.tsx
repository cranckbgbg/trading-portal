import { getServerSession } from "next-auth";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { JournalEntryForm } from "@/components/journal-entry-form";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

type JournalEntryView = {
  id: string;
  symbol: string;
  direction: "LONG" | "SHORT";
  entryPrice: number;
  exitPrice: number | null;
  lotSize: number;
  outcome: string | null;
  pnl: number | null;
  notes: string | null;
  tradeDate: Date;
};

export default async function JournalPage() {
  const session = await getServerSession(authOptions);
  const entries = await getJournalEntries(session?.user?.id);
  const closedEntries = entries.filter((entry) => entry.outcome);
  const wins = closedEntries.filter((entry) => entry.outcome === "WIN").length;
  const totalPnl = entries.reduce((total, entry) => total + (entry.pnl ?? 0), 0);
  const winRate = closedEntries.length ? Math.round((wins / closedEntries.length) * 100) : 0;

  return (
    <>
      <PageHero
        eyebrow="Personal Trade Journal"
        title="Track your own trades, notes, outcomes, and discipline."
        description="A private subscriber workspace for reviewing your execution. The journal tracks your decisions; it does not provide recommendations."
      />
      <section className="container grid gap-5 pb-16">
        <div className="grid gap-5 md:grid-cols-3">
          <Metric label="Total Trades" value={String(entries.length)} />
          <Metric label="Win Rate" value={`${winRate}%`} />
          <Metric label="Total P&L" value={formatMoney(totalPnl)} />
        </div>

        <details className="group rounded-lg border border-white/10 bg-card p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
            <span className="text-xl font-semibold text-white">Log New Trade</span>
            <Button type="button" size="sm">Open Form</Button>
          </summary>
          <div className="mt-5">
            <JournalEntryForm />
          </div>
        </details>

        <Card className="overflow-hidden">
          <div className="grid min-w-[860px] grid-cols-[1fr_0.9fr_0.8fr_0.8fr_0.8fr_0.8fr_0.9fr_1.4fr] gap-3 border-b border-white/10 p-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <span>Date</span>
            <span>Symbol</span>
            <span>Direction</span>
            <span>Entry</span>
            <span>Exit</span>
            <span>P&L</span>
            <span>Outcome</span>
            <span>Notes</span>
          </div>
          <div className="overflow-x-auto">
            {entries.length ? (
              entries.map((entry) => (
                <div
                  key={entry.id}
                  className="grid min-w-[860px] grid-cols-[1fr_0.9fr_0.8fr_0.8fr_0.8fr_0.8fr_0.9fr_1.4fr] gap-3 border-b border-white/10 p-4 text-sm text-slate-300 last:border-b-0"
                >
                  <span>{formatDate(entry.tradeDate)}</span>
                  <strong className="text-white">{entry.symbol}</strong>
                  <span>{entry.direction}</span>
                  <span>{entry.entryPrice}</span>
                  <span>{entry.exitPrice ?? "-"}</span>
                  <span className={entry.pnl && entry.pnl > 0 ? "text-green-400" : entry.pnl && entry.pnl < 0 ? "text-red-400" : ""}>
                    {entry.pnl === null ? "-" : formatMoney(entry.pnl)}
                  </span>
                  <span>{entry.outcome ? <Badge>{entry.outcome}</Badge> : "Open"}</span>
                  <span className="line-clamp-2">{entry.notes ?? "-"}</span>
                </div>
              ))
            ) : (
              <div className="p-6 text-sm text-slate-400">
                No journal entries yet. Log your first trade to begin tracking your own process.
              </div>
            )}
          </div>
        </Card>
      </section>
    </>
  );
}

async function getJournalEntries(userId?: string): Promise<JournalEntryView[]> {
  if (!userId || !process.env.DATABASE_URL) {
    return [];
  }

  try {
    const entries = await prisma.journalEntry.findMany({
      where: { userId },
      orderBy: { tradeDate: "desc" }
    });

    return entries.map((entry) => ({
      ...entry,
      entryPrice: Number(entry.entryPrice),
      exitPrice: entry.exitPrice === null ? null : Number(entry.exitPrice),
      lotSize: Number(entry.lotSize),
      pnl: entry.pnl === null ? null : Number(entry.pnl)
    }));
  } catch {
    return [];
  }
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <Card className="p-6">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-4xl font-bold text-green-400">{value}</p>
    </Card>
  );
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  }).format(value);
}
