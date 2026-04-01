"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

export type Locale = "fr" | "nl" | "en";

const SUPPORTED_LOCALES: Locale[] = ["fr", "nl", "en"];
const DEFAULT_LOCALE: Locale = "fr";
const STORAGE_KEY = "nicolas-navrozoglou-language";

interface LanguageContextValue {
  currentLanguage: Locale;
  setLanguage: (locale: Locale) => void;
  isInitialized: boolean;
}

const LanguageContext = createContext<LanguageContextValue>({
  currentLanguage: DEFAULT_LOCALE,
  setLanguage: () => {},
  isInitialized: false,
});

function getLocaleFromPath(pathname: string): Locale | null {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (first && SUPPORTED_LOCALES.includes(first as Locale)) {
    return first as Locale;
  }
  return null;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const localeFromPath = getLocaleFromPath(pathname);
  const [currentLanguage, setCurrentLanguage] = useState<Locale>(localeFromPath ?? DEFAULT_LOCALE);
  const [isInitialized, setIsInitialized] = useState(false);

  // Sync state when URL changes
  useEffect(() => {
    const pathLocale = getLocaleFromPath(pathname);
    if (pathLocale && pathLocale !== currentLanguage) {
      setCurrentLanguage(pathLocale);
    }
  }, [pathname, currentLanguage]);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const setLanguage = useCallback(
    (locale: Locale) => {
      setCurrentLanguage(locale);
      localStorage.setItem(STORAGE_KEY, locale);

      // Navigate to the same page in the new locale
      const pathLocale = getLocaleFromPath(pathname);
      if (pathLocale) {
        // Replace /fr/... with /nl/...
        const rest = pathname.slice(pathLocale.length + 1); // e.g. "/services"
        router.push(`/${locale}${rest}`);
      } else {
        router.push(`/${locale}`);
      }
    },
    [pathname, router]
  );

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, isInitialized }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
