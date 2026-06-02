"use client";

import { useEffect, useRef } from "react";
import { testimonials } from "@/lib/testimonials";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let direction = 1;
    const interval = window.setInterval(() => {
      if (pausedRef.current) return;

      el.scrollLeft += direction * 1.5;

      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) direction = -1;
      if (el.scrollLeft <= 0) direction = 1;
    }, 30);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="overflow-hidden py-16">
      <div className="container mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-green-400">Community</p>
        <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">What our members say</h2>
      </div>
      <div
        ref={scrollRef}
        className="scrollbar-hide flex gap-5 overflow-x-auto px-4 pb-4 md:px-8"
        style={{ scrollBehavior: "auto" }}
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          pausedRef.current = false;
        }}
      >
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <Card
            key={`${testimonial.name}-${index}`}
            className="flex min-w-[320px] max-w-[320px] flex-col justify-between border-white/10 p-6 transition hover:border-green-500/40"
          >
            <p className="text-sm italic leading-6 text-slate-300">&quot;{testimonial.quote}&quot;</p>
            <div className="mt-5 flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-500/20 text-sm font-bold text-green-400">
                {testimonial.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  {testimonial.flag} {testimonial.name}
                </p>
                <p className="text-xs text-slate-500">
                  {testimonial.country} · {testimonial.style}
                </p>
              </div>
              <Badge className="ml-auto shrink-0 text-xs">{testimonial.result}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
