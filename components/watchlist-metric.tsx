"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card } from "@/components/ui/card";

export function WatchlistMetric() {
  const { data: session } = useSession();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!session) {
      setCount(0);
      return;
    }

    fetch("/api/watchlist")
      .then((response) => (response.ok ? response.json() : []))
      .then((symbols: string[]) => setCount(symbols.length))
      .catch(() => setCount(0));
  }, [session]);

  return (
    <Card className="p-6">
      <p className="text-sm text-slate-400">My Watchlist</p>
      <p className="mt-2 text-4xl font-bold text-green-400">{count}</p>
      <p className="mt-2 text-sm text-slate-500">symbols monitored</p>
    </Card>
  );
}
