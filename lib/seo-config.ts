import { baseUrl } from "@/lib/config";
import type { Locale } from "@/lib/language-context";

interface PageSeo {
  title: string;
  description: string;
  keywords: string[];
}

type PageKey = "home" | "contact" | "legal" | "privacy" | "about" | "services" | "blog" | "faq";

const seoData: Record<Locale, Record<PageKey, PageSeo>> = {
  en: {
    home: {
      title: "Nicolas Navrozoglou | Cabinet dentaire de Nicolas Navrozoglou à Forest, Bruxelles. Endodontie, implants, esthétique dentaire.",
      description: "Cabinet dentaire de Nicolas Navrozoglou à Forest, Bruxelles. Endodontie, implants, esthétique dentaire.",
      keywords: ["nicolas-navrozoglou"],
    },
    about: {
      title: "About | Nicolas Navrozoglou",
      description: "Learn more about Nicolas Navrozoglou. Discover our team, mission, and values.",
      keywords: ["about nicolas-navrozoglou", "nicolas-navrozoglou team"],
    },
    services: {
      title: "Services | Nicolas Navrozoglou",
      description: "Explore the services offered by Nicolas Navrozoglou. Cabinet dentaire de Nicolas Navrozoglou à Forest, Bruxelles. Endodontie, implants, esthétique dentaire.",
      keywords: ["nicolas-navrozoglou services"],
    },
    blog: {
      title: "Blog | Nicolas Navrozoglou",
      description: "Insights, news, and articles from Nicolas Navrozoglou.",
      keywords: ["nicolas-navrozoglou blog", "nicolas-navrozoglou articles"],
    },
    faq: {
      title: "FAQ | Nicolas Navrozoglou",
      description: "Frequently asked questions about Nicolas Navrozoglou and our services.",
      keywords: ["nicolas-navrozoglou faq", "nicolas-navrozoglou questions"],
    },
    contact: {
      title: "Contact | Nicolas Navrozoglou",
      description: "Get in touch with Nicolas Navrozoglou. We would love to hear from you.",
      keywords: ["contact nicolas-navrozoglou"],
    },
    legal: {
      title: "Legal Notice | Nicolas Navrozoglou",
      description: "Legal notice of Nicolas Navrozoglou.",
      keywords: [],
    },
    privacy: {
      title: "Privacy Policy | Nicolas Navrozoglou",
      description: "Privacy policy and data protection of Nicolas Navrozoglou.",
      keywords: [],
    },
  },
  fr: {
    home: {
      title: "Nicolas Navrozoglou | Cabinet dentaire de Nicolas Navrozoglou à Forest, Bruxelles. Endodontie, implants, esthétique dentaire.",
      description: "Cabinet dentaire de Nicolas Navrozoglou à Forest, Bruxelles. Endodontie, implants, esthétique dentaire.",
      keywords: ["nicolas-navrozoglou"],
    },
    about: {
      title: "A propos | Nicolas Navrozoglou",
      description: "Decouvrez Nicolas Navrozoglou. Notre equipe, notre mission et nos valeurs.",
      keywords: ["a propos nicolas-navrozoglou", "equipe nicolas-navrozoglou"],
    },
    services: {
      title: "Services | Nicolas Navrozoglou",
      description: "Decouvrez les services proposes par Nicolas Navrozoglou. Cabinet dentaire de Nicolas Navrozoglou à Forest, Bruxelles. Endodontie, implants, esthétique dentaire.",
      keywords: ["services nicolas-navrozoglou"],
    },
    blog: {
      title: "Blog | Nicolas Navrozoglou",
      description: "Conseils, actualites et articles de Nicolas Navrozoglou.",
      keywords: ["blog nicolas-navrozoglou", "articles nicolas-navrozoglou"],
    },
    faq: {
      title: "FAQ | Nicolas Navrozoglou",
      description: "Questions frequemment posees sur Nicolas Navrozoglou et nos services.",
      keywords: ["faq nicolas-navrozoglou", "questions nicolas-navrozoglou"],
    },
    contact: {
      title: "Contact | Nicolas Navrozoglou",
      description: "Contactez Nicolas Navrozoglou. Nous serions ravis de vous entendre.",
      keywords: ["contact nicolas-navrozoglou"],
    },
    legal: {
      title: "Mentions legales | Nicolas Navrozoglou",
      description: "Mentions legales de Nicolas Navrozoglou.",
      keywords: [],
    },
    privacy: {
      title: "Politique de confidentialite | Nicolas Navrozoglou",
      description: "Politique de confidentialite et protection des donnees de Nicolas Navrozoglou.",
      keywords: [],
    },
  },
  nl: {
    home: {
      title: "Nicolas Navrozoglou | Cabinet dentaire de Nicolas Navrozoglou à Forest, Bruxelles. Endodontie, implants, esthétique dentaire.",
      description: "Cabinet dentaire de Nicolas Navrozoglou à Forest, Bruxelles. Endodontie, implants, esthétique dentaire.",
      keywords: ["nicolas-navrozoglou"],
    },
    about: {
      title: "Over ons | Nicolas Navrozoglou",
      description: "Ontdek Nicolas Navrozoglou. Ons team, onze missie en onze waarden.",
      keywords: ["over nicolas-navrozoglou", "team nicolas-navrozoglou"],
    },
    services: {
      title: "Diensten | Nicolas Navrozoglou",
      description: "Ontdek de diensten van Nicolas Navrozoglou. Cabinet dentaire de Nicolas Navrozoglou à Forest, Bruxelles. Endodontie, implants, esthétique dentaire.",
      keywords: ["diensten nicolas-navrozoglou"],
    },
    blog: {
      title: "Blog | Nicolas Navrozoglou",
      description: "Inzichten, nieuws en artikelen van Nicolas Navrozoglou.",
      keywords: ["blog nicolas-navrozoglou", "artikelen nicolas-navrozoglou"],
    },
    faq: {
      title: "FAQ | Nicolas Navrozoglou",
      description: "Veelgestelde vragen over Nicolas Navrozoglou en onze diensten.",
      keywords: ["faq nicolas-navrozoglou", "vragen nicolas-navrozoglou"],
    },
    contact: {
      title: "Contact | Nicolas Navrozoglou",
      description: "Neem contact op met Nicolas Navrozoglou. We horen graag van u.",
      keywords: ["contact nicolas-navrozoglou"],
    },
    legal: {
      title: "Juridische vermeldingen | Nicolas Navrozoglou",
      description: "Juridische vermeldingen van Nicolas Navrozoglou.",
      keywords: [],
    },
    privacy: {
      title: "Privacybeleid | Nicolas Navrozoglou",
      description: "Privacybeleid en gegevensbescherming van Nicolas Navrozoglou.",
      keywords: [],
    },
  },
};

export function getLocalizedMetadata(locale: Locale, page: PageKey): PageSeo {
  return seoData[locale]?.[page] ?? seoData.en[page];
}

export function getAlternateUrls(path: string) {
  const cleanPath = path === "/" ? "" : path;
  return {
    "en": `${baseUrl}${cleanPath}`,
    "fr": `${baseUrl}${cleanPath}`,
    "nl": `${baseUrl}${cleanPath}`,
    "x-default": `${baseUrl}${cleanPath}`,
  };
}
