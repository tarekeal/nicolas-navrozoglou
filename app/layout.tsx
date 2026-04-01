import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/analytics";
import { StructuredData } from "@/components/structured-data";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { LanguageProvider } from "@/lib/language-context";
import { ThemeProvider } from "@/components/theme-provider";
import { CookieBanner } from "@/components/cookie-banner";

const baseUrl = "https://dr-navrozoglou.be";

const fontSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontSerif = Fraunces({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default:
      "Nicolas Navrozoglou | Cabinet dentaire de Nicolas Navrozoglou à Forest, Bruxelles. Endodontie, implants, esthétique dentaire.",
    template: "%s | Nicolas Navrozoglou",
  },
  description:
    "Cabinet dentaire de Nicolas Navrozoglou à Forest, Bruxelles. Endodontie, implants, esthétique dentaire.",
  keywords: ["nicolas-navrozoglou"],
  authors: [{ name: "Nicolas Navrozoglou", url: baseUrl }],
  creator: "Nicolas Navrozoglou",
  publisher: "Nicolas Navrozoglou",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr",
    url: baseUrl,
    siteName: "Nicolas Navrozoglou",
    title:
      "Nicolas Navrozoglou | Cabinet dentaire de Nicolas Navrozoglou à Forest, Bruxelles. Endodontie, implants, esthétique dentaire.",
    description:
      "Cabinet dentaire de Nicolas Navrozoglou à Forest, Bruxelles. Endodontie, implants, esthétique dentaire.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nicolas Navrozoglou",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Nicolas Navrozoglou | Cabinet dentaire de Nicolas Navrozoglou à Forest, Bruxelles. Endodontie, implants, esthétique dentaire.",
    description:
      "Cabinet dentaire de Nicolas Navrozoglou à Forest, Bruxelles. Endodontie, implants, esthétique dentaire.",
    images: ["/og-image.png"],
  },
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    {
      rel: "apple-touch-icon",
      url: "/apple-touch-icon.png",
      sizes: "180x180",
    },
  ],
  manifest: "/site.webmanifest",
  alternates: {
    canonical: baseUrl,
    languages: {
      fr: baseUrl,
      "x-default": baseUrl,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${fontSans.variable} ${fontSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
            <Analytics />
            <CookieBanner />
            <StructuredData />
            <BreadcrumbSchema />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
