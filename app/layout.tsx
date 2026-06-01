import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AuthSessionProvider } from "@/components/session-provider";

export const metadata: Metadata = {
  title: "ApexTrade | Trading Education and Trade Setups",
  description:
    "A professional trading education and trade setups portal with market news, academy content, and subscriber-only live trade setups."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans">
        <AuthSessionProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
