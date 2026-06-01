import Link from "next/link";
import {
  BarChart3,
  BookOpen,
  CheckCircle2,
  Clock,
  FileText,
  Mail,
  MessageCircle,
  Target,
  XCircle
} from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getStats } from "@/lib/content";

const faqs = [
  {
    q: "What is a Trade Setup?",
    a: "A trade setup is a pre-planned market scenario with a defined entry price, take profit target, and stop loss level. It is not a recommendation to trade — it is an educational example of how a structured approach to a market opportunity looks in practice."
  },
  {
    q: "Is this financial advice?",
    a: "No. All content on ApexTrade is for educational and informational purposes only. We do not provide personalised financial advice, we do not manage funds, and we are not regulated by the FCA. Before making any trading decision, consult an independent financial adviser."
  },
  {
    q: "How does the WIN / LOSS tracking work?",
    a: "When a setup is published, it is marked ACTIVE. Once price reaches the take profit or stop loss level, the Admin closes it as WIN or LOSS. All outcomes are visible to subscribers. We do not delete losing setups."
  },
  {
    q: "How do I subscribe?",
    a: "Go to the Pricing page and choose a Monthly or Annual plan. You will be redirected to a secure Stripe checkout. Once payment is confirmed, your account is upgraded and you gain access to the Trade Setups feed, Trade Journal, and Watchlist."
  },
  {
    q: "Can I cancel my subscription?",
    a: "Yes, you can cancel at any time. Your access continues until the end of the current billing period. There are no cancellation fees."
  },
  {
    q: "What markets do you cover?",
    a: "We primarily focus on Forex pairs (EURUSD, GBPUSD, GBPJPY), Gold (XAUUSD), and major indices (NAS100, SPX500). Crypto setups are published occasionally. The Economic Calendar covers all major USD, EUR, and GBP events."
  }
];

export default async function AboutPage() {
  const stats = await getStats();

  return (
    <>
      <PageHero
        eyebrow="About"
        title="A trading portal built around education, transparency, and execution discipline."
        description="ApexTrade is built by an active trader for traders who want structure, transparency, and education — not noise."
      />
      <section className="container grid gap-5 pb-10 md:grid-cols-3">
        <Metric label="Win Rate" value={`${stats.winRate}%`} />
        <Metric label="Total Setups" value={String(stats.totalSetups)} />
        <Metric label="Closed Setups" value={String(stats.closedSetups)} />
        <p className="text-sm text-slate-500 md:col-span-3">
          Updated in real time from our public track record.
        </p>
      </section>
      <section className="container grid gap-5 pb-16 md:grid-cols-3">
        <Card className="p-6">
          <h2 className="text-xl font-semibold">Education first</h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Academy content is structured by category — Forex, Risk Management, Psychology, Strategy — so you build a process instead of chasing random setups.
          </p>
        </Card>
        <Card className="p-6">
          <h2 className="text-xl font-semibold">Transparent outcomes</h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Every trade setup is closed publicly as WIN or LOSS. We don&apos;t hide the losses. Performance is visible, verifiable, and honest.
          </p>
        </Card>
        <Card className="p-6">
          <h2 className="text-xl font-semibold">Automation ready</h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Daily briefs, weekly recaps, and market news keep the platform alive every day — not just when setups are published.
          </p>
        </Card>

        <Card className="p-6 md:col-span-3">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-slate-700 text-xl font-bold text-green-400">
              AT
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Who is behind ApexTrade</h2>
              <p className="mt-1 text-sm font-semibold text-green-400">Founder &amp; Lead Analyst</p>
              <div className="mt-4 grid gap-4 text-sm leading-7 text-slate-400">
                <p>
                  ApexTrade was built by a full-time forex and commodities trader with years of screen time across EURUSD, XAUUSD, and index markets.
                </p>
                <p>
                  The platform exists because most trading education either avoids showing real results or drowns subscribers in low-quality signals with no accountability.
                </p>
                <p>
                  The goal here is different: publish structured trade setups with clear entry, take profit, and stop loss — close them honestly — and teach the reasoning behind each one through the Academy.
                </p>
                <p>
                  We are not a signal service. We do not manage money. We do not provide personalised financial advice. What we offer is structured market education and a transparent track record.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <div className="md:col-span-3">
          <h2 className="text-3xl font-bold">Our Philosophy</h2>
        </div>
        <Card className="p-6">
          <Target className="mb-4 h-8 w-8 text-green-400" />
          <h2 className="text-xl font-semibold">Process over prediction</h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            No setup is guaranteed. We focus on high-probability contexts, clean risk-reward, and consistent execution — not on being right every time.
          </p>
        </Card>
        <Card className="p-6">
          <BookOpen className="mb-4 h-8 w-8 text-green-400" />
          <h2 className="text-xl font-semibold">Education with every setup</h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Each setup is accompanied by context: why this level, what invalidates it, and what the risk is. Understanding the reasoning matters more than the outcome.
          </p>
        </Card>
        <Card className="p-6">
          <BarChart3 className="mb-4 h-8 w-8 text-green-400" />
          <h2 className="text-xl font-semibold">Win rate is public</h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            The homepage shows live win rate calculated from all closed setups. There is no cherry-picking, no deleted losses, no inflated numbers.
          </p>
        </Card>

        <Card className="p-8 md:col-span-3">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-400">
              Track Record
            </p>
            <p className="mt-4 text-7xl font-bold text-green-400 sm:text-8xl">
              {stats.winRate}%
            </p>
            <p className="mt-3 text-sm text-slate-400">
              win rate from {stats.closedSetups} closed setups
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-black/20 p-4 text-center">
              <p className="text-3xl font-bold text-green-400">{stats.wins}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Wins
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/20 p-4 text-center">
              <p className="text-3xl font-bold text-red-400">{stats.losses}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Losses
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/20 p-4 text-center">
              <p className="text-3xl font-bold text-yellow-400">{stats.activeSetups}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Active
              </p>
            </div>
          </div>

          <div className="mt-8">
            <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-green-500"
                style={{ width: `${stats.winRate}%` }}
              />
            </div>
            <div className="mt-1 flex justify-between text-xs text-slate-500">
              <span>{stats.wins} wins</span>
              <span>{stats.losses} losses</span>
            </div>
          </div>

          {stats.bySymbol.length > 0 ? (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-white">Performance by Symbol</h3>
              <div className="mt-4 grid gap-4">
                {stats.bySymbol.map((item) => (
                  <div
                    key={item.symbol}
                    className="grid gap-3 rounded-lg border border-white/10 bg-black/20 p-4 sm:grid-cols-[1fr_auto_200px] sm:items-center sm:gap-4"
                  >
                    <span className="font-semibold text-white">{item.symbol}</span>
                    <span className="text-sm text-slate-400">
                      {item.wins}/{item.total}
                    </span>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-green-500"
                        style={{ width: `${item.winRate}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </Card>

        <div className="grid gap-5 md:col-span-3 md:grid-cols-3">
          <StatCard label="Win Rate" value={`${stats.winRate}%`} note="From all closed setups" />
          <StatCard label="Total Setups" value={String(stats.totalSetups)} note="Published since launch" />
          <StatCard label="Closed Setups" value={String(stats.closedSetups)} note="WIN or LOSS — all recorded" />
        </div>

        <div id="disclaimer" className="rounded-lg border border-white/10 bg-slate-900/60 p-6 md:col-span-3">
          <p className="text-xs leading-6 text-slate-500">
            RISK DISCLAIMER: The content published on ApexTrade is for educational and informational purposes only. It does not constitute financial advice, investment advice, or a recommendation to buy or sell any financial instrument. Trading financial markets involves substantial risk of loss and is not suitable for all investors. Past performance is not indicative of future results. You should not invest money you cannot afford to lose. Always seek independent financial advice if you are unsure.
          </p>
          <p className="mt-4 text-xs leading-6 text-slate-500">
            ApexTrade does not hold any FCA authorisation or registration. The trade setups published are educational examples only.
          </p>
        </div>

        <Card className="p-6 md:col-span-3">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-400">
                Why we publish losses
              </p>
              <h2 className="mt-3 text-3xl font-bold">Transparency is the product</h2>
              <div className="mt-5 grid gap-4 text-sm leading-7 text-slate-400">
                <p>
                  Most trading platforms show only their wins. Screenshots of profitable trades, cherry-picked results, no mention of the setups that didn&apos;t work.
                </p>
                <p>We do the opposite.</p>
                <p>
                  Every setup published on ApexTrade is closed publicly — as a WIN if price reached the take profit, or as a LOSS if the stop loss was hit. Subscribers can see the full history. Nothing is deleted. Nothing is hidden.
                </p>
                <p>
                  This is not charity. A transparent track record is the only way to build real trust with serious traders.
                </p>
              </div>
            </div>
            <div className="grid content-center gap-4">
              <div className="flex items-start gap-3 rounded-lg border border-white/10 bg-black/20 p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
                <p className="text-sm font-medium text-slate-200">
                  Take Profit hit → Closed as WIN → Visible in history
                </p>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-white/10 bg-black/20 p-4">
                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                <p className="text-sm font-medium text-slate-200">
                  Stop Loss hit → Closed as LOSS → Visible in history
                </p>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-white/10 bg-black/20 p-4">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-yellow-400" />
                <p className="text-sm font-medium text-slate-200">
                  Price still open → Status: ACTIVE → Monitored daily
                </p>
              </div>
            </div>
          </div>
        </Card>

        <div className="md:col-span-3">
          <h2 className="text-3xl font-bold">How setups are published</h2>
          <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-start md:gap-0">
            <TimelineStep
              number="1"
              title="Analyst identifies setup"
              description="A high-probability market context is identified based on technical structure, key levels, and macro backdrop."
            />
            <TimelineConnector />
            <TimelineStep
              number="2"
              title="Setup is published"
              description="Entry, take profit, and stop loss are defined. The setup goes live in the subscriber feed with full context."
            />
            <TimelineConnector />
            <TimelineStep
              number="3"
              title="Market moves"
              description="Subscribers monitor the setup. No changes to levels after publication — no moving goalposts."
            />
            <TimelineConnector />
            <TimelineStep
              number="4"
              title="Setup is closed"
              description="When TP or SL is hit, the Admin closes the setup as WIN or LOSS. The outcome is permanent and public."
            />
          </div>
        </div>

        <div className="md:col-span-3">
          <h2 className="text-3xl font-bold">What we are NOT</h2>
        </div>
        <Card className="border-l-4 border-l-red-500 p-6">
          <h2 className="text-xl font-semibold">Not a signal service</h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            We do not send Telegram alerts, WhatsApp messages, or push notifications telling you to enter a trade right now. Setups are published in advance with defined levels.
          </p>
        </Card>
        <Card className="border-l-4 border-l-red-500 p-6">
          <h2 className="text-xl font-semibold">Not financial advice</h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Nothing on this platform constitutes a recommendation to buy or sell. The setups are educational examples. You are responsible for your own trading decisions.
          </p>
        </Card>
        <Card className="border-l-4 border-l-red-500 p-6">
          <h2 className="text-xl font-semibold">Not a managed account</h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            We do not trade on your behalf. We do not have access to your broker account. We do not charge performance fees.
          </p>
        </Card>

        <div className="md:col-span-3">
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          <div className="mt-6 grid gap-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="group rounded-lg border border-white/10 bg-card">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-base font-semibold text-white">
                  {faq.q}
                  <span className="text-xl text-green-400 transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="border-t border-white/10 px-5 pb-5 pt-4 text-sm leading-6 text-slate-400">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-10 text-center">
            <Badge className="mb-4">Join ApexTrade</Badge>
            <h2 className="text-4xl font-bold text-white">Start trading with more structure.</h2>
            <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-400">
              Access the full trade setup feed, personal trade journal, economic calendar, weekly recaps, and structured academy content. Cancel any time.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild className="h-11 px-8">
                <Link href="/pricing">View Pricing Plans</Link>
              </Button>
              <Button asChild variant="ghost" className="h-11 px-8">
                <Link href="/academy">Explore the Academy</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <h2 className="text-3xl font-bold">Have a question?</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <Card className="p-6">
              <Mail className="mb-3 h-8 w-8 text-green-400" />
              <h3 className="text-lg font-semibold">Email us</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Reach us at support@apextrade.com for subscription questions, technical issues, or partnership enquiries.
              </p>
              <Button asChild variant="ghost" className="mt-4">
                <Link href="mailto:support@apextrade.com">Send Email</Link>
              </Button>
            </Card>
            <Card className="p-6">
              <MessageCircle className="mb-3 h-8 w-8 text-green-400" />
              <h3 className="text-lg font-semibold">Telegram community</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Join our free Telegram channel for daily market context, brief commentary, and platform updates.
              </p>
              <Button asChild variant="ghost" className="mt-4">
                <Link href="#">Join Channel</Link>
              </Button>
            </Card>
            <Card className="p-6">
              <FileText className="mb-3 h-8 w-8 text-green-400" />
              <h3 className="text-lg font-semibold">Terms &amp; Risk Disclaimer</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Read our full risk disclaimer and terms of use before subscribing. Trading involves substantial risk of loss.
              </p>
              <Button asChild variant="ghost" className="mt-4">
                <Link href="#disclaimer">Read Disclaimer</Link>
              </Button>
            </Card>
          </div>
        </div>

        <p className="text-center text-xs text-slate-600 md:col-span-3">
          © 2026 ApexTrade. Educational content only. Not financial advice. Not FCA regulated.
        </p>
      </section>
    </>
  );
}

function TimelineStep({
  number,
  title,
  description
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-1 flex-col items-center text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20 font-bold text-green-400">
        {number}
      </div>
      <h3 className="mt-4 text-base font-semibold text-white">{title}</h3>
      <p className="mt-2 max-w-xs text-sm leading-6 text-slate-400">{description}</p>
    </div>
  );
}

function TimelineConnector() {
  return <div className="mt-5 hidden h-px flex-1 bg-white/10 md:block" />;
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <Card className="p-6">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-4xl font-bold text-green-400">{value}</p>
    </Card>
  );
}

function StatCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <Card className="p-6">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-4xl font-bold text-green-400">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{note}</p>
    </Card>
  );
}
