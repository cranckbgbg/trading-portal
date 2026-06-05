import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="rounded-md bg-primary px-2 py-1 text-primary-foreground">xrent</span>
          <span className="text-foreground">.bg</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          <Link href="/cars" className="hover:text-foreground">
            Автомобили
          </Link>
          <Link href="/#how" className="hover:text-foreground">
            Как работи
          </Link>
          <Link href="/#contact" className="hover:text-foreground">
            Контакти
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">Вход</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/register">Регистрация</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
