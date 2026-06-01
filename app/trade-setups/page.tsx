import { PageHero } from "@/components/page-hero";
import { SetupCard } from "@/components/setup-card";
import { getTradeSetups } from "@/lib/content";

export default async function TradeSetupsPage() {
  const setups = await getTradeSetups();

  return (
    <>
      <PageHero
        eyebrow="Subscriber Trade Setups"
        title="Live trade setups with exact entry, target, stop loss, and status."
        description="This protected feed is intended for subscribers and admins after authentication and subscription validation."
      />
      <section className="container grid gap-5 pb-16 md:grid-cols-2 lg:grid-cols-3">
        {setups.map((setup, index) => (
          <SetupCard key={`${setup.symbol}-${index}`} setup={normalizeSetup(setup)} />
        ))}
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
