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
    </>
  );
}
