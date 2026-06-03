import { PageHero } from "@/components/page-hero";
import { SetupCard } from "@/components/setup-card";
import { getTradeSetups } from "@/lib/content";
import { BarChart3 } from "lucide-react";
import Link from "next/link";

export default async function TradeSetupsPage() {
  const setups = await getTradeSetups();

  return (
    <>
      <PageHero
        eyebrow="Subscriber Trade Setups"
        title="Live trade setups with exact entry, target, and stop loss."
        description="Each setup is published with clear levels and closed publicly as WIN or LOSS. Your edge starts with a structured process."
      />
      <section className="container pb-16">
        {setups.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <BarChart3 className="h-12 w-12 text-slate-600 mb-4" />
            <h3 className="text-xl font-semibold text-white">No active setups right now</h3>
            <p className="mt-2 max-w-sm text-sm text-slate-400">New trade setups are published regularly. Check back soon or browse the academy while you wait.</p>
            <Link href="/academy" className="mt-6 text-sm font-semibold text-green-400 hover:underline">Browse the Academy →</Link>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {setups.map((setup, index) => (
              <SetupCard key={`${setup.symbol}-${index}`} setup={normalizeSetup(setup)} />
            ))}
          </div>
        )}
      </section>
    </>
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
