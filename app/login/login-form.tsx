"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function LoginForm({ authConfigured }: { authConfigured: boolean }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!authConfigured) {
      setError("Authentication is not configured for this local preview yet.");
      return;
    }

    setLoading(true);
    setError("");

    const result = await signIn("email", {
      email,
      callbackUrl: "/trade-setups",
      redirect: false
    });

    setLoading(false);

    if (result?.error) {
      setError("Could not send the magic link. Check the database and email settings.");
      return;
    }

    setSent(true);
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign in to ApexTrade</CardTitle>
      </CardHeader>
      <CardContent>
        {sent ? (
          <div className="py-6 text-center">
            <p className="mb-2 text-lg font-semibold text-green-400">Check your email</p>
            <p className="text-sm text-slate-400">
              We sent a magic link to <span className="text-white">{email}</span>. Click the link to sign in.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-4">
            {!authConfigured ? (
              <div className="rounded-md border border-green-500/30 bg-green-500/10 p-3 text-sm leading-6 text-green-100">
                Local login is disabled until `DATABASE_URL` and `NEXTAUTH_SECRET` are configured.
              </div>
            ) : null}
            {error ? (
              <div className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-100">
                {error}
              </div>
            ) : null}
            <div className="grid gap-1.5">
              <label htmlFor="email" className="text-sm text-slate-300">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <Button type="submit" disabled={loading || !authConfigured} className="w-full">
              {loading ? "Sending..." : "Send magic link"}
            </Button>
            <p className="text-center text-xs text-slate-500">
              No password needed. We will email you a secure link.
            </p>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
