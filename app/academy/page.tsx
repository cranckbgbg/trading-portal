import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AcademyProgressList } from "@/components/academy-progress-list";
import { academyCategories } from "@/lib/sample-data";
import { getArticles } from "@/lib/content";

export default async function AcademyPage() {
  const articles = await getArticles();
  const serializedArticles = articles.map((article) => ({
    ...article,
    publishedAt: article.publishedAt.toISOString()
  }));

  return (
    <>
      <PageHero
        eyebrow="Trading Academy"
        title="Structured education for forex, crypto, gold, risk, psychology, and strategy."
        description="Organized by category so new and experienced traders can move from fundamentals to execution with less noise."
      />
      <section className="container pb-16">
        <div className="flex flex-wrap gap-2">
          {academyCategories.map((category) => (
            <Badge key={category}>{category}</Badge>
          ))}
        </div>
        <AcademyProgressList articles={serializedArticles} />
      </section>

      <section className="container pb-16">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-8 py-12 text-center">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-48 w-48 rounded-full bg-green-500/10 blur-3xl" />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white md:text-3xl">Ready to put your knowledge into practice?</h2>
            <p className="mx-auto mt-3 max-w-md text-slate-400">
              Subscribe to access live trade setups with defined entry, take profit, and stop loss — and track your own results in the trade journal.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/pricing">View Pricing</Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href="/trading-ideas">See Trading Ideas →</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
