import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

type MarketBrief = {
  title: string;
  body: string;
  markets: string[];
  publishedAt: Date | string;
};

export function MarketBriefCard({ brief }: { brief: MarketBrief }) {
  return (
    <Card className="border-l-4 border-l-green-500 border-white/10 bg-card p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Badge>Daily Brief</Badge>
        <span className="text-xs text-slate-500">{formatDate(brief.publishedAt)}</span>
      </div>
      <div className="mt-5">
        <h2 className="text-xl font-semibold text-white">{brief.title}</h2>
        <p className="mt-3 leading-7 text-slate-300">{brief.body}</p>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {brief.markets.map((market) => (
          <Badge key={market}>{market}</Badge>
        ))}
      </div>
    </Card>
  );
}
