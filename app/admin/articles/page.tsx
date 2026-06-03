import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/ui/card";
import { getArticles } from "@/lib/content";

export default async function AdminArticlesPage() {
  const articles = await getArticles();

  return (
    <>
      <PageHero eyebrow="Admin Articles" title="Manage academy education content." description="Create and organise educational articles across Forex, Risk Management, Psychology and Strategy categories." />
      <section className="container grid gap-4 pb-16">
        {articles.map((article) => (
          <Card key={article.slug} className="p-5">
            <p className="text-sm text-green-400">{article.category}</p>
            <h2 className="mt-1 text-xl font-semibold">{article.title}</h2>
          </Card>
        ))}
      </section>
    </>
  );
}
