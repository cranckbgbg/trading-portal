"use client";

import { useState } from "react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewMarketBriefPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [markets, setMarkets] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const response = await fetch("/api/market-brief", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        body,
        markets: markets
          .split(",")
          .map((market) => market.trim())
          .filter(Boolean)
      })
    });

    setLoading(false);

    if (!response.ok) {
      setMessage("Could not publish brief. Check admin access and form fields.");
      return;
    }

    setTitle("");
    setBody("");
    setMarkets("");
    setMessage("Daily brief published.");
  }

  return (
    <>
      <PageHero
        eyebrow="Admin"
        title="New Daily Market Brief"
        description="Publish a short educational market context note for the day."
      />
      <section className="container flex justify-center pb-16">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Daily Market Brief</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-5">
              {message ? (
                <div className="rounded-md border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-100">
                  {message}
                </div>
              ) : null}
              <div className="grid gap-1.5">
                <label htmlFor="title" className="text-sm text-slate-300">
                  Title
                </label>
                <input
                  id="title"
                  required
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="grid gap-1.5">
                <label htmlFor="body" className="text-sm text-slate-300">
                  Body
                </label>
                <textarea
                  id="body"
                  required
                  rows={7}
                  value={body}
                  onChange={(event) => setBody(event.target.value)}
                  className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm leading-6 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="grid gap-1.5">
                <label htmlFor="markets" className="text-sm text-slate-300">
                  Markets
                </label>
                <input
                  id="markets"
                  required
                  value={markets}
                  onChange={(event) => setMarkets(event.target.value)}
                  placeholder="DXY, XAUUSD, SPX500"
                  className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? "Publishing..." : "Publish Brief"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
