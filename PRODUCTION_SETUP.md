# ApexTrade — Production Setup Guide

## Overview

The site runs with fallback (sample) data without a database.
To enable real auth, trade setups, and user accounts, complete the steps below.

---

## Step 1 — Neon Database

1. Go to **https://neon.tech** and create a free account.
2. Create a new project → name it `apextrade`.
3. Copy the **Connection string** (looks like `postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require`).
4. Add it to Vercel: **Settings → Environment Variables → `DATABASE_URL`**.

### Push the schema to Neon (run locally):

```bash
DATABASE_URL="your-neon-connection-string" npx prisma db push
```

This creates all tables in Neon without needing migration files.

### Seed initial data (run locally):

```bash
DATABASE_URL="your-neon-connection-string" npx prisma db seed
```

This creates:
- Admin user: `admin@tradingportal.test` with role ADMIN
- Sample articles, news, and trade setups

### Promote yourself to ADMIN:

After your first login via magic link, run in Neon console or locally:

```bash
DATABASE_URL="your-neon-connection-string" npx prisma studio
```

Find your user → change `role` from `FREE` to `ADMIN`.

---

## Step 2 — Resend Email (Magic Link)

1. Go to **https://resend.com** and create a free account.
2. Go to **API Keys → Create API Key** → copy the key (starts with `re_`).
3. **Option A — Quick test** (no domain needed):
   - `EMAIL_FROM=onboarding@resend.dev`
   - `EMAIL_SERVER=smtps://resend:re_YOUR_API_KEY@smtp.resend.com:465`
4. **Option B — Your domain** (recommended for production):
   - Go to Resend → **Domains → Add Domain** → follow DNS instructions
   - `EMAIL_FROM=noreply@yourdomain.com`
   - `EMAIL_SERVER=smtps://resend:re_YOUR_API_KEY@smtp.resend.com:465`

---

## Step 3 — Vercel Environment Variables

Add all these in **Vercel → Project → Settings → Environment Variables**:

| Variable | Value | Where to get |
|---|---|---|
| `DATABASE_URL` | `postgresql://...neon.tech/...` | Neon project → Connection string |
| `NEXTAUTH_SECRET` | random 32-char string | `openssl rand -base64 32` in terminal |
| `NEXTAUTH_URL` | `https://your-project.vercel.app` | Your Vercel project URL |
| `EMAIL_SERVER` | `smtps://resend:re_KEY@smtp.resend.com:465` | Resend API key |
| `EMAIL_FROM` | `noreply@yourdomain.com` | Your verified Resend domain |
| `STRIPE_SECRET_KEY` | `sk_live_...` | Stripe dashboard (optional) |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | Stripe webhooks (optional) |
| `STRIPE_PRICE_MONTHLY` | `price_...` | Stripe product prices (optional) |
| `STRIPE_PRICE_YEARLY` | `price_...` | Stripe product prices (optional) |
| `N8N_WEBHOOK_API_KEY` | any secret string | Set yourself (optional) |

After adding variables → **Vercel → Deployments → Redeploy** (to pick up new env vars).

---

## Step 4 — Generate NEXTAUTH_SECRET

Run this in your terminal and copy the output:

```bash
openssl rand -base64 32
```

---

## Step 5 — Local Test Checklist

Before deploying, test locally with real env variables:

```bash
# Create local .env file (never commit this)
cp .env.example .env
# Fill in your real values, then:
npm run dev
```

Test these flows:
- [ ] Homepage loads with real data (not sample data)
- [ ] `/login` → enter email → magic link arrives in inbox
- [ ] Click magic link → redirected to `/trade-setups`
- [ ] `/trade-setups` shows real setups (subscriber or admin)
- [ ] `/admin` redirects FREE users to `/pricing`
- [ ] `/journal` redirects guests to `/pricing`

---

## Step 6 — Production Deploy Checklist

- [ ] `DATABASE_URL` added to Vercel
- [ ] `NEXTAUTH_SECRET` added to Vercel
- [ ] `NEXTAUTH_URL` set to production URL in Vercel
- [ ] `EMAIL_SERVER` and `EMAIL_FROM` added to Vercel
- [ ] `npx prisma db push` run against Neon
- [ ] `npx prisma db seed` run to populate initial data
- [ ] Redeployed on Vercel after adding env vars
- [ ] Magic link login tested in production
- [ ] Admin role assigned to your account

---

## Useful Commands

```bash
# Validate prisma schema
npm run prisma:validate

# Push schema to database (use for Neon — no migration files needed)
DATABASE_URL="..." npm run prisma:push

# Seed data
DATABASE_URL="..." npm run prisma:seed

# Open Prisma Studio (visual database editor)
DATABASE_URL="..." npx prisma studio

# Deploy migrations (use if you have migration files)
DATABASE_URL="..." npm run prisma:deploy
```

---

## Auth Flow

```
Guest visits /trade-setups
  → middleware redirects to /pricing (production only)

User clicks "Sign In"
  → /login page → enters email
  → Resend sends magic link
  → User clicks link → NextAuth creates session
  → Redirected to /trade-setups

Admin visits /admin
  → middleware checks role === "ADMIN"
  → If not admin → redirect to /pricing
```

---

## Notes

- In **development** (`NODE_ENV=development`), middleware is bypassed — all routes are accessible without login. This is intentional for local testing.
- Magic link sessions expire after 24 hours by default.
- FREE users who log in can see the site but not access protected pages (/trade-setups, /journal, /watchlist, /dashboard).
- To grant SUBSCRIBER access, update the user's role in Prisma Studio or directly in Neon.
