export type CalendarEvent = {
  id: string;
  date: string;
  time: string;
  name: string;
  currency: string;
  impact: "HIGH" | "MEDIUM" | "LOW";
  previous: string;
  forecast: string;
  actual: string | null;
  description: string;
};

export const calendarEvents: CalendarEvent[] = [
  {
    id: "us-nfp-jun-2026",
    date: "2026-06-05",
    time: "13:30 UTC",
    name: "US Non-Farm Payrolls",
    currency: "USD",
    impact: "HIGH",
    previous: "175K",
    forecast: "180K",
    actual: null,
    description:
      "Non-Farm Payrolls measures monthly job creation in the US economy. Stronger job growth can influence rate expectations and often affects USD, gold, equities, and yields."
  },
  {
    id: "us-cpi-jun-2026",
    date: "2026-06-03",
    time: "13:30 UTC",
    name: "US Consumer Price Index",
    currency: "USD",
    impact: "HIGH",
    previous: "3.4%",
    forecast: "3.3%",
    actual: null,
    description:
      "CPI tracks inflation paid by consumers. Elevated readings can pressure risk assets if traders expect central banks to keep policy tighter for longer."
  },
  {
    id: "fomc-minutes-jun-2026",
    date: "2026-06-04",
    time: "19:00 UTC",
    name: "FOMC Minutes",
    currency: "USD",
    impact: "HIGH",
    previous: "Hawkish tone",
    forecast: "Balanced tone",
    actual: null,
    description:
      "FOMC Minutes provide detail on the Federal Reserve's policy debate. Traders study language around inflation, labor conditions, and rate path risks."
  },
  {
    id: "ecb-speech-jun-2026",
    date: "2026-06-02",
    time: "10:00 UTC",
    name: "ECB President Speech",
    currency: "EUR",
    impact: "MEDIUM",
    previous: "Dovish guidance",
    forecast: "Policy guidance",
    actual: null,
    description:
      "ECB speeches can shift euro expectations when officials discuss inflation, growth, or timing of policy changes. The market reaction depends heavily on tone."
  },
  {
    id: "us-retail-sales-jun-2026",
    date: "2026-06-04",
    time: "13:30 UTC",
    name: "US Retail Sales",
    currency: "USD",
    impact: "MEDIUM",
    previous: "0.4%",
    forecast: "0.3%",
    actual: null,
    description:
      "Retail Sales measures consumer spending momentum. It helps traders understand demand strength and can affect USD and equity index sentiment."
  },
  {
    id: "us-jobless-claims-jun-2026",
    date: "2026-06-05",
    time: "13:30 UTC",
    name: "US Initial Jobless Claims",
    currency: "USD",
    impact: "MEDIUM",
    previous: "222K",
    forecast: "225K",
    actual: null,
    description:
      "Initial Jobless Claims show how many people filed for unemployment benefits. Rising claims can signal labor market cooling before larger reports confirm it."
  },
  {
    id: "global-pmi-jun-2026",
    date: "2026-06-02",
    time: "09:00 UTC",
    name: "Eurozone Manufacturing PMI",
    currency: "EUR",
    impact: "LOW",
    previous: "49.0",
    forecast: "49.3",
    actual: "49.5",
    description:
      "PMI surveys show business activity trends. Readings below 50 indicate contraction, while improvements can suggest easing pressure in the manufacturing cycle."
  },
  {
    id: "uk-gdp-jun-2026",
    date: "2026-06-06",
    time: "07:00 UTC",
    name: "UK Monthly GDP",
    currency: "GBP",
    impact: "MEDIUM",
    previous: "0.2%",
    forecast: "0.1%",
    actual: null,
    description:
      "GDP measures economic output. Slower growth can weigh on a currency if it increases expectations for easier policy or weaker investment conditions."
  }
];
