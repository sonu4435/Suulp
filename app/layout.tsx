import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeContext";

export const metadata: Metadata = {
  title: "Suulp — Build Your Business Empire with AI",
  description:
    "Suulp is the all-in-one AI-powered SaaS platform. Build your website with AI in 60 seconds, manage customers with CRM & CSM, deploy ElevenLabs voice AI, auto-generate mobile apps, and export your Next.js code. Everything your business needs — one royal platform.",
  keywords:
    "AI website builder, SaaS platform builder, no-code CMS, CRM, CSM, ElevenLabs voice AI, drag drop website, business platform, mobile app builder, code export, Next.js",
  authors: [{ name: "Suulp" }],
  creator: "Suulp",
  publisher: "Suulp",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://suulp.com",
    siteName: "Suulp",
    title: "Suulp — Build Your Business Empire with AI",
    description:
      "AI website builder + CMS + CRM + Voice AI concierge. One platform, infinite possibility.",
    images: [
      {
        url: "https://suulp.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Suulp Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Suulp — Build Your Business Empire with AI",
    description:
      "AI website builder + CMS + CRM + Voice AI — the only platform you need.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#BFA06A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      {/*
        NOTE: No className="dark" on body — theme is handled by ThemeProvider's
        .dk / .lk class on its wrapper div. Default is light (lk).
      */}
      <body style={{ margin: 0, padding: 0, overflowX: "hidden" }}>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
