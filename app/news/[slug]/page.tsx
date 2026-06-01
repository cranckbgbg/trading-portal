import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { getNewsItem } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export default async function NewsArticlePage({ params }: { params: { slug: string } }) {
  const item = await getNewsItem(params.slug);

  if (!item) {
    notFound();
  }

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
    </article>
  );
}
