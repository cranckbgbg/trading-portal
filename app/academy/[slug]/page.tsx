import { notFound } from "next/navigation";
import { MarkAsReadButton } from "@/components/mark-as-read-button";
import { Badge } from "@/components/ui/badge";
import { getArticle } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="container max-w-3xl py-16">
      <Badge>{article.category}</Badge>
      <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl">{article.title}</h1>
      <p className="mt-4 text-sm text-slate-500">Published {formatDate(article.publishedAt)}</p>
      <div className="mt-10 rounded-lg border border-white/10 bg-card p-8 text-lg leading-9 text-slate-300">
        {article.content}
      </div>
      <div className="mt-8">
        <MarkAsReadButton articleId={article.id} />
      </div>
    </article>
  );
}
