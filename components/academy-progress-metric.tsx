"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card } from "@/components/ui/card";

export function AcademyProgressMetric({ totalLessons }: { totalLessons: number }) {
  const { data: session } = useSession();
  const [completedLessons, setCompletedLessons] = useState(0);

  useEffect(() => {
    if (!session) {
      setCompletedLessons(0);
      return;
    }

    fetch("/api/progress")
      .then((response) => (response.ok ? response.json() : []))
      .then((ids: string[]) => setCompletedLessons(ids.length))
      .catch(() => setCompletedLessons(0));
  }, [session]);

  const percentage = totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <Card className="p-6">
      <p className="text-sm text-slate-400">Academy Progress</p>
      <p className="mt-2 text-4xl font-bold text-green-400">{percentage}%</p>
      <p className="mt-2 text-sm text-slate-500">
        {completedLessons} / {totalLessons} lessons
      </p>
    </Card>
  );
}
