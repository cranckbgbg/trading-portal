import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/ui/card";
import { getArticles } from "@/lib/content";

export default async function AdminArticlesPage() {
  const articles = await getArticles();

  return (
    <>
      <PageHero eyebrow="Admin Articles" title="Create, edit, and delete academy articles." description="This screen is ready for CRUD forms once authentication and database writes are enabled." />
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
