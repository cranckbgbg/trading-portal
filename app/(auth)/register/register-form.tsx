"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [gdpr, setGdpr] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!gdpr) {
      setError("Необходимо е съгласие с обработката на лични данни (GDPR).");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, gdprConsent: true })
    });

    if (!res.ok) {
      setLoading(false);
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Регистрацията не бе успешна.");
      return;
    }

    // Auto-login after successful registration.
    await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false
    });

    router.push("/account");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="name">Име</Label>
        <Input id="name" required value={form.name} onChange={update("name")} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="email">Имейл</Label>
        <Input id="email" type="email" autoComplete="email" required value={form.email} onChange={update("email")} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="phone">Телефон (по желание)</Label>
        <Input id="phone" type="tel" value={form.phone} onChange={update("phone")} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="password">Парола</Label>
        <Input id="password" type="password" autoComplete="new-password" required value={form.password} onChange={update("password")} />
        <p className="text-xs text-muted-foreground">
          Минимум 8 символа, главна и малка буква и цифра.
        </p>
      </div>

      <label className="flex items-start gap-2 text-sm text-muted-foreground">
        <input
          type="checkbox"
          className="mt-1"
          checked={gdpr}
          onChange={(e) => setGdpr(e.target.checked)}
        />
        <span>
          Съгласен/на съм с обработката на личните ми данни съгласно{" "}
          <Link href="/legal/privacy" className="text-primary hover:underline">
            Политиката за поверителност
          </Link>
          .
        </span>
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Създаване…" : "Регистрация"}
      </Button>
    </form>
  );
}
