import { Lock, TrendingDown, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type TradeSetup = {
  symbol: string;
  direction: "LONG" | "SHORT";
  entryPrice: number | string;
  takeProfit: number | string;
  stopLoss: number | string;
  status: "ACTIVE" | "WIN" | "LOSS";
  publishedAt?: Date | string;
};

function StatusBadge({ status }: { status: "ACTIVE" | "WIN" | "LOSS" }) {
  if (status === "WIN") return <span className="text-xs font-semibold text-green-400">● WIN</span>;
  if (status === "LOSS") return <span className="text-xs font-semibold text-red-400">● LOSS</span>;
  return <span className="text-xs font-semibold text-amber-400">● ACTIVE</span>;
}

export function SetupCard({ setup, locked = false }: { setup: TradeSetup; locked?: boolean }) {
  const isLong = setup.direction === "LONG";

  const formattedDate = setup.publishedAt
    ? new Date(setup.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
    : null;

  return (
    <Card className="relative overflow-hidden p-5">
      <div className={locked ? "setup-blur select-none" : ""}>
        <div className="flex items-start justify-between gap-4">
          <div>
            {formattedDate && <p className="text-xs text-slate-500 mb-1">{formattedDate}</p>}
            <h3 className="text-2xl font-bold text-white">{setup.symbol}</h3>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <Badge className={isLong ? "text-emerald-300" : "text-rose-300"}>
              {isLong ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
              {setup.direction}
            </Badge>
            <StatusBadge status={setup.status} />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
          <Metric label="Entry" value={setup.entryPrice} />
          <Metric label="Take Profit" value={setup.takeProfit} />
          <Metric label="Stop Loss" value={setup.stopLoss} />
        </div>
      </div>
      {locked ? (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 p-6 text-center bg-slate-950/60 backdrop-blur-sm">
          <Lock className="h-8 w-8 text-green-400" />
          <p className="max-w-xs text-sm text-slate-200 font-medium">Subscribe to unlock entry, target, stop loss and live updates.</p>
          <Button asChild size="sm">
            <Link href="/pricing">Unlock Trade Setups</Link>
          </Button>
        </div>
      ) : null}
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-md border border-white/10 bg-slate-950/40 p-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 font-semibold text-white">{String(value)}</p>
    </div>
  );
}
