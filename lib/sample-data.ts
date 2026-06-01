export const academyCategories = [
  "Forex Trading",
  "Trading Psychology",
  "Technical Analysis",
  "Risk Management",
  "Trading Strategies",
  "Crypto Trading"
];

export const articles = [
  {
    id: "article-forex-foundation",
    title: "Forex Trading for Professionals: The Complete Foundation",
    slug: "forex-trading-professional-foundation",
    category: "Forex Trading",
    coverImage: "/images/academy-forex.jpg",
    publishedAt: new Date("2026-05-10"),
    content:
      "Build a clean foundation around sessions, liquidity, major pairs, spreads, and execution quality. Professional traders define when they trade, what markets deserve attention, and what invalidates a setup before capital is exposed."
  },
  {
    id: "article-repeatable-plan",
    title: "How to Build a Repeatable Trading Plan",
    slug: "build-repeatable-trading-plan",
    category: "Trading Strategies",
    coverImage: "/images/academy-plan.jpg",
    publishedAt: new Date("2026-05-12"),
    content:
      "A trading plan turns a market opinion into a process. It should define market selection, entry model, risk limits, trade management, review cadence, and a maximum daily loss that protects decision quality."
  },
  {
    id: "article-risk-management",
    title: "Risk Management Rules That Keep Traders Alive",
    slug: "risk-management-rules",
    category: "Risk Management",
    coverImage: "/images/academy-risk.jpg",
    publishedAt: new Date("2026-05-14"),
    content:
      "Risk management is the operating system behind every serious trading business. Use fixed fractional sizing, hard invalidation, correlated exposure limits, and weekly drawdown rules before increasing size."
  },
  {
    id: "article-market-structure",
    title: "Technical Analysis: Market Structure Before Indicators",
    slug: "technical-analysis-market-structure",
    category: "Technical Analysis",
    coverImage: "/images/academy-structure.jpg",
    publishedAt: new Date("2026-05-18"),
    content:
      "Indicators can support a decision, but market structure gives the context. Identify trend state, liquidity pools, displacement, retracement quality, and areas where risk can be defined precisely."
  },
  {
    id: "article-psychology-pressure",
    title: "Trading Psychology Under Real Pressure",
    slug: "trading-psychology-pressure",
    category: "Trading Psychology",
    coverImage: "/images/academy-psychology.jpg",
    publishedAt: new Date("2026-05-21"),
    content:
      "Discipline is easier when the system reduces choice. Predefine trade frequency, alert rules, maximum loss, and journaling prompts so emotional reactions do not become execution rules."
  }
];

export const news = [
  {
    id: "news-dollar-rate-cuts",
    title: "Dollar Holds Firm as Traders Reprice Rate Cut Expectations",
    slug: "dollar-holds-firm-rate-cut-expectations",
    category: "FOREX" as const,
    source: "Market Desk",
    sourceUrl: "https://example.com/forex-dollar",
    publishedAt: new Date("2026-05-31"),
    content:
      "The US dollar remained supported as traders reduced expectations for near-term policy easing. Major FX pairs are consolidating ahead of upcoming labor and inflation data."
  },
  {
    id: "news-gold-safe-haven",
    title: "Gold Tests Resistance After Safe-Haven Demand Returns",
    slug: "gold-tests-resistance-safe-haven-demand",
    category: "GOLD" as const,
    source: "Metals Brief",
    sourceUrl: "https://example.com/gold-resistance",
    publishedAt: new Date("2026-05-30"),
    content:
      "Gold moved toward a key resistance zone as geopolitical hedging and softer real yields improved demand. Traders are watching whether momentum can hold above the previous swing high."
  },
  {
    id: "news-bitcoin-etf-flows",
    title: "Bitcoin Consolidates as ETF Flows Cool",
    slug: "bitcoin-consolidates-etf-flows-cool",
    category: "CRYPTO" as const,
    source: "Crypto Wire",
    sourceUrl: "https://example.com/btc-etf-flows",
    publishedAt: new Date("2026-05-29"),
    content:
      "Bitcoin traded inside a narrow range as spot ETF inflows moderated. The market remains sensitive to liquidity conditions and broader risk sentiment."
  },
  {
    id: "news-macro-inflation",
    title: "Macro Calendar: Inflation Data Takes Center Stage",
    slug: "macro-calendar-inflation-data",
    category: "MACRO" as const,
    source: "Macro Desk",
    sourceUrl: "https://example.com/macro-calendar",
    publishedAt: new Date("2026-05-28"),
    content:
      "This week's macro focus is inflation, central bank speakers, and manufacturing data. Volatility risk is elevated around scheduled releases."
  },
  {
    id: "news-eurusd-weekly",
    title: "EUR/USD Buyers Defend Key Weekly Level",
    slug: "eurusd-buyers-defend-weekly-level",
    category: "FOREX" as const,
    source: "FX Desk",
    sourceUrl: "https://example.com/eurusd-weekly",
    publishedAt: new Date("2026-05-27"),
    content:
      "EUR/USD buyers defended a key weekly level, but the pair still needs a clean break above near-term resistance to confirm bullish continuation."
  },
  {
    id: "news-ethereum-range",
    title: "Ethereum Traders Watch Breakout Range",
    slug: "ethereum-traders-watch-breakout-range",
    category: "CRYPTO" as const,
    source: "Crypto Wire",
    sourceUrl: "https://example.com/eth-range",
    publishedAt: new Date("2026-05-26"),
    content:
      "Ethereum continues to compress inside a technical range. A daily close outside the range could set the tone for the next directional move."
  },
  {
    id: "news-gold-volatility",
    title: "Gold Volatility Rises Ahead of US Data",
    slug: "gold-volatility-rises-us-data",
    category: "GOLD" as const,
    source: "Metals Brief",
    sourceUrl: "https://example.com/gold-volatility",
    publishedAt: new Date("2026-05-25"),
    content:
      "Options pricing points to higher expected volatility in gold as traders position for incoming US data and central bank commentary."
  },
  {
    id: "news-sterling-growth",
    title: "Sterling Softens After Growth Data Miss",
    slug: "sterling-softens-growth-data-miss",
    category: "FOREX" as const,
    source: "FX Desk",
    sourceUrl: "https://example.com/gbp-growth",
    publishedAt: new Date("2026-05-24"),
    content:
      "Sterling eased after growth figures came in below expectations. The move keeps GBP crosses vulnerable while rate expectations adjust."
  },
  {
    id: "news-liquidity-risk",
    title: "Liquidity Conditions Improve Across Risk Assets",
    slug: "liquidity-conditions-improve-risk-assets",
    category: "MACRO" as const,
    source: "Macro Desk",
    sourceUrl: "https://example.com/liquidity-risk",
    publishedAt: new Date("2026-05-23"),
    content:
      "Liquidity measures improved modestly across risk assets, supporting equities and crypto while reducing near-term demand for defensive positioning."
  },
  {
    id: "news-altcoin-breadth",
    title: "Altcoin Market Breadth Remains Selective",
    slug: "altcoin-market-breadth-selective",
    category: "CRYPTO" as const,
    source: "Crypto Wire",
    sourceUrl: "https://example.com/altcoin-breadth",
    publishedAt: new Date("2026-05-22"),
    content:
      "Altcoin breadth remains selective, with capital rotating toward higher-liquidity names while smaller tokens lag the broader crypto market."
  }
];

export const tradeSetups = [
  {
    id: "setup-xauusd-long",
    symbol: "XAU/USD",
    direction: "LONG" as const,
    entryPrice: 2342.5,
    takeProfit: 2378.0,
    stopLoss: 2324.0,
    status: "ACTIVE" as const,
    publishedAt: new Date("2026-06-01T07:30:00Z"),
    closedAt: null
  },
  {
    id: "setup-eurusd-short",
    symbol: "EUR/USD",
    direction: "SHORT" as const,
    entryPrice: 1.0872,
    takeProfit: 1.079,
    stopLoss: 1.0924,
    status: "WIN" as const,
    publishedAt: new Date("2026-05-31T08:15:00Z"),
    closedAt: new Date("2026-05-31T14:20:00Z")
  },
  {
    id: "setup-btcusd-long",
    symbol: "BTC/USD",
    direction: "LONG" as const,
    entryPrice: 68250,
    takeProfit: 70400,
    stopLoss: 67150,
    status: "WIN" as const,
    publishedAt: new Date("2026-05-30T10:00:00Z"),
    closedAt: new Date("2026-05-30T19:10:00Z")
  },
  {
    id: "setup-gbpjpy-short",
    symbol: "GBP/JPY",
    direction: "SHORT" as const,
    entryPrice: 199.42,
    takeProfit: 197.8,
    stopLoss: 200.2,
    status: "LOSS" as const,
    publishedAt: new Date("2026-05-29T09:45:00Z"),
    closedAt: new Date("2026-05-29T12:35:00Z")
  },
  {
    id: "setup-nas100-long",
    symbol: "NAS100",
    direction: "LONG" as const,
    entryPrice: 18840,
    takeProfit: 19020,
    stopLoss: 18720,
    status: "WIN" as const,
    publishedAt: new Date("2026-05-28T13:30:00Z"),
    closedAt: new Date("2026-05-28T17:05:00Z")
  }
];

export const winRate = Math.round(
  (tradeSetups.filter((setup) => setup.status === "WIN").length /
    tradeSetups.filter((setup) => setup.status !== "ACTIVE").length) *
    100
);
