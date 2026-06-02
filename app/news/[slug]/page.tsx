import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getNewsItem, getRelatedNews } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export default async function NewsArticlePage({ params }: { params: { slug: string } }) {
  const item = await getNewsItem(params.slug);

  if (!item) {
    notFound();
  }

  const related = await getRelatedNews(item.category, item.slug);

  return (
    <article className="container max-w-3xl py-16">
      <Badge>{item.category}</Badge>
      <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl">{item.title}</h1>
      <p className="mt-4 text-sm text-slate-500">
        {formatDate(item.publishedAt)} · {item.source ?? "Editorial desk"}
      </p>
      <div className="mt-10 rounded-lg border border-white/10 bg-card p-8 text-lg leading-9 text-slate-300">
        {item.content}
      </div>

      {related.length > 0 ? (
        <div className="mt-16">
          <h2 className="mb-6 text-xl font-semibold text-white">More from {item.category}</h2>
          <div className="grid gap-4">
            {related.map((relatedItem) => (
              <Link key={relatedItem.slug} href={`/news/${relatedItem.slug}`}>
                <Card className="p-5 transition hover:border-green-500/45">
                  <div className="flex items-center justify-between gap-3">
                    <Badge>{relatedItem.category}</Badge>
                    <span className="text-xs text-slate-500">
                      {formatDate(relatedItem.publishedAt)}
                    </span>
                  </div>
                  <h3 className="mt-3 font-semibold text-white">{relatedItem.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-400">
                    {relatedItem.content}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </article>
  );
}
