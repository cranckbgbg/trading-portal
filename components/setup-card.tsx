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
};

export function SetupCard({ setup, locked = false }: { setup: TradeSetup; locked?: boolean }) {
  const isLong = setup.direction === "LONG";

  return (
    <Card className="relative overflow-hidden p-5">
      <div className={locked ? "setup-blur" : ""}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">Live setup</p>
            <h3 className="mt-1 text-2xl font-bold">{setup.symbol}</h3>
          </div>
          <Badge className={isLong ? "text-emerald-300" : "text-rose-300"}>
            {isLong ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
            {setup.direction}
          </Badge>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
          <Metric label="Entry" value={setup.entryPrice} />
          <Metric label="Take Profit" value={setup.takeProfit} />
          <Metric label="Stop Loss" value={setup.stopLoss} />
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-sm text-slate-400">Status</span>
          <span className="font-semibold text-green-400">{setup.status}</span>
        </div>
      </div>
      {locked ? (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 p-6 text-center">
          <Lock className="h-8 w-8 text-green-400" />
          <p className="max-w-xs text-sm text-slate-200">Subscribe to unlock entry, target, stop loss and live updates.</p>
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
