"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type TradeSetup = {
  id: string;
  symbol: string;
  direction: "LONG" | "SHORT";
  entryPrice: number;
  takeProfit: number;
  stopLoss: number;
  status: "ACTIVE" | "WIN" | "LOSS";
  publishedAt: string;
  closedAt: string | null;
};

export default function WatchlistPage() {
  const [symbol, setSymbol] = useState("");
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [setups, setSetups] = useState<TradeSetup[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadWatchlist();
    loadSetups();
  }, []);

  const rows = useMemo(
    () =>
      watchlist.map((item) => {
        const matches = setups
          .filter((setup) => normalizeSymbol(setup.symbol) === normalizeSymbol(item))
          .sort(
            (a, b) =>
              new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
          );

        return {
          symbol: item,
          count: matches.length,
          latest: matches[0] ?? null
        };
      }),
    [setups, watchlist]
  );

  async function loadWatchlist() {
    const response = await fetch("/api/watchlist");
    setWatchlist(response.ok ? await response.json() : []);
  }

  async function loadSetups() {
    const response = await fetch("/api/trade-setups");
    setSetups(response.ok ? await response.json() : []);
  }

  async function addSymbol(event: React.FormEvent) {
    event.preventDefault();

    if (!symbol.trim()) {
      return;
    }

    setLoading(true);
    setMessage("");

    const response = await fetch("/api/watchlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ symbol })
    });

    setLoading(false);

    if (!response.ok) {
      setMessage("Could not add symbol. Check your subscription access.");
      return;
    }

    setSymbol("");
    await loadWatchlist();
  }

  async function removeSymbol(item: string) {
    const response = await fetch("/api/watchlist", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ symbol: item })
    });

    if (!response.ok) {
      setMessage("Could not remove symbol.");
      return;
    }

    await loadWatchlist();
  }

  return (
    <>
      <PageHero
        eyebrow="My Watchlist"
        title="Symbols you're watching — matched against published trade setups."
        description="Build a personal list of markets to monitor and see when matching trade setups have been published."
      />
      <section className="container grid gap-5 pb-16">
        <Card className="p-5">
          <form onSubmit={addSymbol} className="flex flex-col gap-3 sm:flex-row">
            <input
              value={symbol}
              onChange={(event) => setSymbol(event.target.value)}
              placeholder="EURUSD, XAUUSD, BTCUSD"
              className="min-h-11 flex-1 rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add"}
            </Button>
          </form>
          {message ? <p className="mt-3 text-sm text-red-300">{message}</p> : null}
        </Card>

        <div className="grid gap-4">
          {rows.length ? (
            rows.map((row) => (
              <Card key={row.symbol} className="p-5">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-xl font-bold text-white">{row.symbol}</h2>
                      <Badge>{row.count} published setups</Badge>
                    </div>
                    {row.latest ? (
                      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-400">
                        <Badge>{row.latest.direction}</Badge>
                        <Badge>{row.latest.status}</Badge>
                        <span>{formatDate(row.latest.publishedAt)}</span>
                      </div>
                    ) : (
                      <p className="mt-3 text-sm text-slate-400">No matching published setups yet.</p>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeSymbol(row.symbol)}
                    className="border-red-500/30 text-red-300 hover:bg-red-500/10 hover:text-red-200"
                  >
                    <X className="h-4 w-4" />
                    Remove
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-6 text-sm text-slate-400">
              Add symbols you&apos;re monitoring to get matched setups here.
            </Card>
          )}
        </div>
      </section>
    </>
  );
}

function normalizeSymbol(value: string) {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}
