"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewWeeklyRecapPage() {
  const router = useRouter();
  const [weekLabel, setWeekLabel] = useState("");
  const [summary, setSummary] = useState("");
  const [wins, setWins] = useState("0");
  const [losses, setLosses] = useState("0");
  const [keyLesson, setKeyLesson] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const response = await fetch("/api/weekly-recap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        weekLabel,
        summary,
        wins: Number(wins),
        losses: Number(losses),
        keyLesson
      })
    });

    setLoading(false);

    if (!response.ok) {
      setMessage("Could not publish recap. Check admin access and form fields.");
      return;
    }

    router.push("/weekly-recap");
    router.refresh();
  }

  return (
    <>
      <PageHero
        eyebrow="Admin"
        title="New Weekly Recap"
        description="Publish a post-analysis summary of closed setups and lessons from the week."
      />
      <section className="container flex justify-center pb-16">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Weekly Recap</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-5">
              {message ? (
                <div className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-100">
                  {message}
                </div>
              ) : null}
              <Field label="Week Label" htmlFor="weekLabel">
                <input
                  id="weekLabel"
                  required
                  value={weekLabel}
                  onChange={(event) => setWeekLabel(event.target.value)}
                  placeholder="Week of Jun 2, 2026"
                  className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </Field>
              <Field label="Summary" htmlFor="summary">
                <textarea
                  id="summary"
                  required
                  rows={6}
                  value={summary}
                  onChange={(event) => setSummary(event.target.value)}
                  className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm leading-6 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </Field>
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Wins" htmlFor="wins">
                  <input
                    id="wins"
                    required
                    type="number"
                    min="0"
                    value={wins}
                    onChange={(event) => setWins(event.target.value)}
                    className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </Field>
                <Field label="Losses" htmlFor="losses">
                  <input
                    id="losses"
                    required
                    type="number"
                    min="0"
                    value={losses}
                    onChange={(event) => setLosses(event.target.value)}
                    className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </Field>
              </div>
              <Field label="Key Lesson" htmlFor="keyLesson">
                <textarea
                  id="keyLesson"
                  required
                  rows={3}
                  value={keyLesson}
                  onChange={(event) => setKeyLesson(event.target.value)}
                  className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm leading-6 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </Field>
              <Button type="submit" disabled={loading}>
                {loading ? "Publishing..." : "Publish Recap"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </>
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
