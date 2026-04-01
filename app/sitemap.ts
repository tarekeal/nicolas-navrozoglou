import type { MetadataRoute } from "next";

const baseUrl = "https://dr-navrozoglou.be";
const locales = ["fr", "nl", "en"];

function withAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = `${baseUrl}/${locale}${path}`;
  }
  languages["x-default"] = `${baseUrl}/fr${path}`;
  return { languages };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const pages = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/booking", priority: 0.9, changeFrequency: "monthly" as const },
  ];

  return pages.flatMap(({ path, priority, changeFrequency }) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
      alternates: withAlternates(path),
    }))
  );
}
