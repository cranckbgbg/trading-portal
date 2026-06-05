import Link from "next/link";

export function SiteFooter() {
  return (
    <footer id="contact" className="mt-20 border-t border-border bg-card">
      <div className="container flex flex-col gap-4 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-foreground">xrent.bg</p>
          <p>Коли под наем от собствен автопарк.</p>
        </div>
        <nav className="flex flex-wrap gap-4">
          <Link href="/cars" className="hover:text-foreground">
            Автомобили
          </Link>
          <Link href="/legal/terms" className="hover:text-foreground">
            Общи условия
          </Link>
          <Link href="/legal/privacy" className="hover:text-foreground">
            Поверителност (GDPR)
          </Link>
        </nav>
        <p>© {new Date().getFullYear()} xrent.bg</p>
      </div>
    </footer>
  );
}
