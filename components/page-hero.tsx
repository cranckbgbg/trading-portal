import { Badge } from "@/components/ui/badge";

export function PageHero({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="container py-14 md:py-20">
      <Badge>{eyebrow}</Badge>
      <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight text-white md:text-6xl">
        {title}
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">{description}</p>
    </section>
  );
}
