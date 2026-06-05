import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Phase 1 landing placeholder. The real catalog, search form and featured cars
// are built in Phase 2 (F-01..F-04). This page only establishes the shell.
export default function HomePage() {
  return (
    <div>
      <section className="container py-20 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
          Коли под наем от собствен автопарк
        </p>
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          Наеми автомобил бързо, сигурно и онлайн
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Търсене по дата, час и локация, прозрачни цени и онлайн резервация.
          Платформата е в процес на изграждане — следва каталогът с автомобили.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild size="default">
            <Link href="/register">Създай профил</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/cars">Виж автомобилите</Link>
          </Button>
        </div>
      </section>

      <section id="how" className="container grid gap-6 pb-10 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>1. Намери</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Избери период и локация — показваме само свободните за теб автомобили.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>2. Резервирай</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Регистрирай се, потвърди данните си и резервирай онлайн за минути.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>3. Карай</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Вземи автомобила от избраната локация и потегляй спокойно.
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
