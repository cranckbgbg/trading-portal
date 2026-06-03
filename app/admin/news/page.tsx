import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/ui/card";
import { getNews } from "@/lib/content";

export default async function AdminNewsPage() {
  const news = await getNews();

  return (
    <>
      <PageHero eyebrow="Admin News" title="Manage market news and editorial content." description="Review, publish and organise market news across Forex, Gold, Crypto and Macro categories." />
      <section className="container grid gap-4 pb-16">
        {news.map((item) => (
          <Card key={item.slug} className="p-5">
            <p className="text-sm text-green-400">{item.category}</p>
            <h2 className="mt-1 text-xl font-semibold">{item.title}</h2>
          </Card>
        ))}
      </section>
    </>
  );
}
