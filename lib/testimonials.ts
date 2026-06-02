export type Testimonial = {
  name: string;
  country: string;
  flag: string;
  style: string;
  result: string;
  quote: string;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Martin K.",
    country: "Germany",
    flag: "🇩🇪",
    style: "Swing Trader",
    result: "12/16 setups closed WIN",
    quote:
      "The weekly recaps changed how I review my trades. Seeing the reasoning behind each setup taught me more than any course.",
    avatar: "MK"
  },
  {
    name: "Sofia R.",
    country: "Spain",
    flag: "🇪🇸",
    style: "Day Trader",
    result: "Journal streak: 47 days",
    quote:
      "I used to skip journaling. The built-in trade journal made it easy — now I can see exactly where I lose discipline.",
    avatar: "SR"
  },
  {
    name: "James T.",
    country: "United Kingdom",
    flag: "🇬🇧",
    style: "Scalper",
    result: "Academy: 100% complete",
    quote:
      "Finished the full academy in 3 weeks. The risk management module alone was worth the subscription.",
    avatar: "JT"
  },
  {
    name: "Aiko M.",
    country: "Japan",
    flag: "🇯🇵",
    style: "Swing Trader",
    result: "Watchlist: 8 symbols tracked",
    quote:
      "I track 8 symbols and get notified when a setup drops. The economic calendar helps me avoid high-risk news windows.",
    avatar: "AM"
  },
  {
    name: "Lucas P.",
    country: "Brazil",
    flag: "🇧🇷",
    style: "Day Trader",
    result: "3 months active subscriber",
    quote:
      "The daily brief every morning gives me context before I open a chart. It's the first thing I read with my coffee.",
    avatar: "LP"
  },
  {
    name: "Elena V.",
    country: "Bulgaria",
    flag: "🇧🇬",
    style: "Swing Trader",
    result: "Win rate improved +18%",
    quote:
      "After tracking my own setups in the journal for 60 days I found a pattern in my losses. That was a game changer.",
    avatar: "EV"
  }
];
