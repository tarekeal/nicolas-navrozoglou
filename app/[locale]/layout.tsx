import { notFound } from "next/navigation";
import { SharedLayout } from "@/components/shared-layout";

const supportedLocales = ["fr", "nl", "en"] as const;
type Locale = (typeof supportedLocales)[number];

function isValidLocale(locale: string): locale is Locale {
  return (supportedLocales as readonly string[]).includes(locale);
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <SharedLayout>{children}</SharedLayout>;
}
