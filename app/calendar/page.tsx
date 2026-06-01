"use client";

import { useMemo, useState } from "react";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { calendarEvents, type CalendarEvent } from "@/lib/calendar-data";
import { formatDate } from "@/lib/utils";

const filters: Array<"ALL" | CalendarEvent["impact"]> = ["ALL", "HIGH", "MEDIUM", "LOW"];

export default function CalendarPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("ALL");
  const filteredEvents = useMemo(
    () =>
      filter === "ALL"
        ? calendarEvents
        : calendarEvents.filter((event) => event.impact === filter),
    [filter]
  );

  const eventsByDate = useMemo(() => groupEventsByDate(filteredEvents), [filteredEvents]);

  return (
    <>
      <PageHero
        eyebrow="Economic Calendar"
        title="Key market events and what they mean for price."
        description="A weekly view of scheduled macro events with educational context. This is not advisory content."
      />
      <section className="container grid gap-6 pb-16">
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <Button
              key={item}
              type="button"
              variant={filter === item ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(item)}
            >
              {item === "ALL" ? "All" : item}
            </Button>
          ))}
        </div>

        {eventsByDate.length ? (
          eventsByDate.map(([date, events]) => (
            <section key={date} className="grid gap-3">
              <h2 className="text-lg font-semibold text-white">{formatDate(date)}</h2>
              <div className="grid gap-4">
                {events.map((event) => (
                  <CalendarEventCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          ))
        ) : (
          <Card className="p-6 text-sm text-slate-400">No events scheduled.</Card>
        )}
      </section>
    </>
  );
}

function CalendarEventCard({ event }: { event: CalendarEvent }) {
  return (
    <Card className="p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-slate-400">
          {event.date} · {event.time}
        </span>
        <Badge>{event.currency}</Badge>
        <span className={impactClass(event.impact)}>{event.impact}</span>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-bold text-white">{event.name}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-400">{event.description}</p>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <CalendarMetric label="Previous" value={event.previous} />
        <CalendarMetric label="Forecast" value={event.forecast} />
        <CalendarMetric
          label="Actual"
          value={event.actual ?? "-"}
          className={actualClass(event)}
        />
      </div>
    </Card>
  );
}

function CalendarMetric({
  label,
  value,
  className = "text-white"
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className="rounded-md border border-white/10 bg-black/30 p-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className={`mt-1 font-semibold ${className}`}>{value}</p>
    </div>
  );
}

function groupEventsByDate(events: CalendarEvent[]) {
  const groups = new Map<string, CalendarEvent[]>();

  for (const event of events) {
    groups.set(event.date, [...(groups.get(event.date) ?? []), event]);
  }

  return Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b));
}

function impactClass(impact: CalendarEvent["impact"]) {
  const base = "rounded-md border px-2.5 py-1 text-xs font-semibold";

  if (impact === "HIGH") {
    return `${base} border-red-500/30 bg-red-500/10 text-red-300`;
  }

  if (impact === "MEDIUM") {
    return `${base} border-yellow-500/30 bg-yellow-500/10 text-yellow-300`;
  }

  return `${base} border-slate-500/30 bg-slate-500/10 text-slate-300`;
}

function actualClass(event: CalendarEvent) {
  if (!event.actual) {
    return "text-white";
  }

  const actual = parseEventNumber(event.actual);
  const forecast = parseEventNumber(event.forecast);

  if (actual === null || forecast === null || actual === forecast) {
    return "text-white";
  }

  return actual > forecast ? "text-green-400" : "text-red-400";
}

function parseEventNumber(value: string) {
  const match = value.replace(/,/g, "").match(/-?\d+(\.\d+)?/);
  return match ? Number(match[0]) : null;
}
