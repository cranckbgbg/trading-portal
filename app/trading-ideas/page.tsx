import { PageHero } from "@/components/page-hero";
import { SetupCard } from "@/components/setup-card";
import { getTradeSetups } from "@/lib/content";
import { TrendingUp } from "lucide-react";
import Link from "next/link";

export default async function TradingIdeasPage() {
  const setups = await getTradeSetups();

  return (
    <>
      <PageHero
        eyebrow="Trading Ideas"
        title="Market opportunities we are watching right now."
        description="Browse our latest trading ideas. Subscribe to unlock exact entry, take profit and stop loss levels for every setup."
      />
      <section className="container pb-16">
        {setups.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <TrendingUp className="h-12 w-12 text-slate-600 mb-4" />
            <h3 className="text-xl font-semibold text-white">No trading ideas published yet</h3>
            <p className="mt-2 max-w-sm text-sm text-slate-400">New market opportunities are added regularly. Explore the academy to sharpen your analysis while you wait.</p>
            <Link href="/academy" className="mt-6 text-sm font-semibold text-green-400 hover:underline">Browse the Academy →</Link>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {setups.map((setup, index) => (
              <SetupCard key={`${setup.symbol}-${index}`} setup={normalizeSetup(setup)} locked={index !== 0} />
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
