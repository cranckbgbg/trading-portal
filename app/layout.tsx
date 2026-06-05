import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AuthSessionProvider } from "@/components/session-provider";

export const metadata: Metadata = {
  title: "xrent.bg | Коли под наем",
  description:
    "xrent.bg — професионална платформа за коли под наем от собствен автопарк. Търсене по дата, час и локация, онлайн резервации и сигурни плащания."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg">
      <body className="font-sans">
        <AuthSessionProvider>
          <SiteHeader />
          <main className="min-h-[70vh]">{children}</main>
          <SiteFooter />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
