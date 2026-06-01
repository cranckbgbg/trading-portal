import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/ui/card";
import { getTradeSetups } from "@/lib/content";

export default async function AdminTradeSetupsPage() {
  const setups = await getTradeSetups();

  return (
    <>
      <PageHero eyebrow="Admin Trade Setups" title="Create trade setups and mark outcomes as WIN or LOSS." description="The API routes support creating trade setups and updating their status for win-rate reporting." />
      <section className="container grid gap-4 pb-16">
        {setups.map((setup, index) => (
          <Card key={`${setup.symbol}-${index}`} className="grid gap-3 p-5 md:grid-cols-5 md:items-center">
            <strong>{setup.symbol}</strong>
            <span className="text-slate-400">{setup.direction}</span>
            <span className="text-slate-400">Entry {String(setup.entryPrice)}</span>
            <span className="text-slate-400">TP {String(setup.takeProfit)}</span>
            <span className="text-green-400">{setup.status}</span>
          </Card>
        ))}
      </section>
    </>
  );
}
