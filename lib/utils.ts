import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatDate(value: Date | string) {
  return new Intl.DateTimeFormat("bg-BG", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}

export function formatPrice(value: number, currency = "BGN") {
  return new Intl.NumberFormat("bg-BG", {
    style: "currency",
    currency
  }).format(value);
}
