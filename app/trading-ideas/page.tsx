import { PageHero } from "@/components/page-hero";
import { SetupCard } from "@/components/setup-card";
import { getTradeSetups } from "@/lib/content";

export default async function TradingIdeasPage() {
  const setups = await getTradeSetups();

  return (
    <>
      <PageHero
        eyebrow="Trading Ideas"
        title="Public previews for trust, full execution plans for subscribers."
        description="Guests can inspect market coverage and publishing cadence while exact levels remain behind the subscription paywall."
      />
      <section className="container grid gap-5 pb-16 md:grid-cols-2 lg:grid-cols-3">
        {setups.map((setup, index) => (
          <SetupCard key={`${setup.symbol}-${index}`} setup={normalizeSetup(setup)} locked={index !== 0} />
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
