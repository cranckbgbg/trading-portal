"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function JournalEntryForm({ onCancel }: { onCancel?: () => void }) {
  const router = useRouter();
  const [symbol, setSymbol] = useState("");
  const [direction, setDirection] = useState<"LONG" | "SHORT">("LONG");
  const [entryPrice, setEntryPrice] = useState("");
  const [lotSize, setLotSize] = useState("0.01");
  const [tradeDate, setTradeDate] = useState(new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const response = await fetch("/api/journal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        symbol,
        direction,
        entryPrice: Number(entryPrice),
        lotSize: Number(lotSize),
        tradeDate,
        notes
      })
    });

    setLoading(false);

    if (!response.ok) {
      setMessage("Could not log trade. Check your subscription access and fields.");
      return;
    }

    setSymbol("");
    setEntryPrice("");
    setLotSize("0.01");
    setTradeDate(new Date().toISOString().slice(0, 10));
    setNotes("");
    router.refresh();
    onCancel?.();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Log New Trade</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
          {message ? (
            <div className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-100 md:col-span-2">
              {message}
            </div>
          ) : null}
          <Field label="Symbol" htmlFor="symbol">
            <input
              id="symbol"
              required
              value={symbol}
              onChange={(event) => setSymbol(event.target.value)}
              placeholder="XAUUSD"
              className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </Field>
          <Field label="Direction" htmlFor="direction">
            <select
              id="direction"
              value={direction}
              onChange={(event) => setDirection(event.target.value as "LONG" | "SHORT")}
              className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="LONG">LONG</option>
              <option value="SHORT">SHORT</option>
            </select>
          </Field>
          <Field label="Entry Price" htmlFor="entryPrice">
            <input
              id="entryPrice"
              required
              type="number"
              step="any"
              value={entryPrice}
              onChange={(event) => setEntryPrice(event.target.value)}
              className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </Field>
          <Field label="Lot Size" htmlFor="lotSize">
            <input
              id="lotSize"
              required
              type="number"
              step="any"
              value={lotSize}
              onChange={(event) => setLotSize(event.target.value)}
              className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </Field>
          <Field label="Date" htmlFor="tradeDate">
            <input
              id="tradeDate"
              required
              type="date"
              value={tradeDate}
              onChange={(event) => setTradeDate(event.target.value)}
              className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </Field>
          <div className="grid gap-1.5 md:col-span-2">
            <label htmlFor="notes" className="text-sm text-slate-300">
              Notes
            </label>
            <textarea
              id="notes"
              rows={4}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm leading-6 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex gap-3 md:col-span-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Trade"}
            </Button>
            {onCancel ? (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            ) : null}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function Field({
  label,
  htmlFor,
  children
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={htmlFor} className="text-sm text-slate-300">
        {label}
      </label>
      {children}
    </div>
  );
}
