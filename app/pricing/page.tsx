import { Check, Crown } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Monthly",
    price: "$49",
    description: "Full access with monthly flexibility.",
    features: ["Live trade setups feed", "Trading ideas", "Setup history", "Premium news context"],
    highlighted: false
  },
  {
    name: "Annual",
    price: "$399",
    description: "Best value for committed traders.",
    features: ["Everything in Monthly", "Priority setup alerts", "Quarterly strategy reports", "Two months included"],
    highlighted: true
  }
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Unlock the trade setup feed and trade with a clearer process."
        description="Stripe checkout is wired through API routes and ready for real price IDs once the account is configured."
      />
      <section className="container grid gap-5 pb-16 md:grid-cols-2">
        {plans.map((plan) => (
          <Card key={plan.name} className={plan.highlighted ? "border-green-500/60 shadow-glow" : ""}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{plan.name}</CardTitle>
                {plan.highlighted ? <Badge><Crown className="h-3.5 w-3.5" /> Best value</Badge> : null}
              </div>
              <p className="text-5xl font-bold text-white">{plan.price}</p>
              <p className="text-slate-400">{plan.description}</p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm text-slate-300">
                    <Check className="h-4 w-4 text-green-400" />
                    {feature}
                  </div>
                ))}
              </div>
              <form action="/api/checkout" method="post" className="mt-8">
                <input type="hidden" name="plan" value={plan.name.toLowerCase()} />
                <Button className="w-full" type="submit">Start with {plan.name}</Button>
              </form>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}
