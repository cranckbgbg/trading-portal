import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getRecaps } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export default async function WeeklyRecapPage() {
  const recaps = await getRecaps();

  return (
    <>
      <PageHero
        eyebrow="Weekly Recap"
        title="What we tracked, what closed, and what we learned."
        description="A post-analysis archive of closed setups and educational lessons. This is not a forecast."
      />
      <section className="container grid gap-5 pb-16">
        {recaps.length ? (
          recaps.map((recap) => (
            <Card key={recap.id} className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-white">{recap.weekLabel}</h2>
                <span className="text-xs text-slate-500">{formatDate(recap.publishedAt)}</span>
              </div>
              <p className="mt-5 leading-7 text-slate-300">{recap.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-md border border-green-500/30 bg-green-500/10 px-2.5 py-1 text-xs font-semibold text-green-400">
                  {recap.wins} WIN
                </span>
                <span className="rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-300">
                  {recap.losses} LOSS
                </span>
              </div>
              <div className="mt-5 rounded-md border border-yellow-500/25 bg-yellow-500/10 p-4">
                <Badge>Key Lesson</Badge>
                <p className="mt-3 italic leading-7 text-yellow-200">{recap.keyLesson}</p>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-6 text-sm text-slate-400">First weekly recap coming Friday.</Card>
        )}
      </section>
    </>
  );
}
