"use client";

import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function MarkAsReadButton({ articleId }: { articleId: string }) {
  const { data: session } = useSession();
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCompleted(localStorage.getItem(`read_${articleId}`) === "true");
  }, [articleId]);

  if (!session) {
    return null;
  }

  async function markAsRead() {
    setLoading(true);

    const response = await fetch("/api/progress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ articleId })
    });

    setLoading(false);

    if (!response.ok) {
      return;
    }

    localStorage.setItem(`read_${articleId}`, "true");
    setCompleted(true);
  }

  return (
    <Button type="button" onClick={markAsRead} disabled={completed || loading}>
      {completed ? (
        <>
          <CheckCircle2 className="h-4 w-4" />
          Completed
        </>
      ) : loading ? (
        "Saving..."
      ) : (
        "Mark as Read"
      )}
    </Button>
  );
}
