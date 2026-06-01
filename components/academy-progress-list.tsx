"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

export type AcademyArticleCard = {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  publishedAt: string;
};

export function AcademyProgressList({ articles }: { articles: AcademyArticleCard[] }) {
  const { data: session } = useSession();
  const [readArticleIds, setReadArticleIds] = useState<string[]>([]);

  useEffect(() => {
    if (!session) {
      setReadArticleIds([]);
      return;
    }

    let mounted = true;

    fetch("/api/progress")
      .then((response) => (response.ok ? response.json() : []))
      .then((ids: string[]) => {
        if (mounted) {
          setReadArticleIds(ids);
        }
      })
      .catch(() => {
        if (mounted) {
          setReadArticleIds([]);
        }
      });

    return () => {
      mounted = false;
    };
  }, [session]);

  const readSet = useMemo(() => new Set(readArticleIds), [readArticleIds]);
  const completedCount = articles.filter((article) => readSet.has(article.id)).length;
  const percentage = articles.length ? Math.round((completedCount / articles.length) * 100) : 0;
  const completedCategories = useMemo(() => {
    const categories = Array.from(new Set(articles.map((article) => article.category)));

    return categories.filter((category) => {
      const categoryArticles = articles.filter((article) => article.category === category);
      return categoryArticles.every((article) => readSet.has(article.id));
    });
  }, [articles, readSet]);

  return (
    <>
      {session ? (
        <Card className="mt-8 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-slate-400">Academy Progress</p>
              <p className="mt-1 font-semibold text-white">
                {completedCount} of {articles.length} lessons completed
              </p>
            </div>
            <Badge>{percentage}%</Badge>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full rounded-full bg-green-500" style={{ width: `${percentage}%` }} />
          </div>
          {completedCategories.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {completedCategories.map((category) => (
                <Badge key={category}>{category} Complete</Badge>
              ))}
            </div>
          ) : null}
        </Card>
      ) : null}

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => {
          const completed = readSet.has(article.id);

          return (
            <Card key={article.slug} className="relative transition hover:border-green-500/45">
              {completed ? (
                <CheckCircle2 className="absolute right-4 top-4 h-5 w-5 text-green-400" />
              ) : null}
              <CardHeader>
                <div className="flex items-center justify-between gap-3 pr-7">
                  <Badge>{article.category}</Badge>
                  <span className="text-xs text-slate-500">{formatDate(article.publishedAt)}</span>
                </div>
                <CardTitle>{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-4 text-sm leading-6 text-slate-400">{article.content}</p>
                <Link href={`/academy/${article.slug}`} className="mt-5 inline-flex text-sm font-semibold text-green-400">
                  Read lesson
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
