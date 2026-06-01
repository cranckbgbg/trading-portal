import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured. Add STRIPE_SECRET_KEY and price IDs to enable checkout." },
      { status: 500 }
    );
  }

  const formData = await request.formData();
  const plan = String(formData.get("plan") ?? "monthly");
  const price =
    plan === "annual" ? process.env.STRIPE_PRICE_YEARLY : process.env.STRIPE_PRICE_MONTHLY;

  if (!price) {
    return NextResponse.json({ error: "Missing Stripe price ID" }, { status: 500 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price, quantity: 1 }],
    success_url: `${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/dashboard`,
    cancel_url: `${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/pricing`
  });

  return NextResponse.redirect(session.url ?? "/pricing", { status: 303 });
}
