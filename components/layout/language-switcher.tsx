"use client";

import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage, type Locale } from "@/lib/language-context";
import { cn } from "@/lib/utils";

const localeLabels: Record<Locale, string> = {
  fr: "Français",
  nl: "Nederlands",
  en: "English",
};

const localeFlags: Record<Locale, string> = {
  fr: "FR",
  nl: "NL",
  en: "EN",
};

interface LanguageSwitcherProps {
  variant?: "default" | "ghost" | "footer";
  className?: string;
}

export function LanguageSwitcher({ variant = "default", className }: LanguageSwitcherProps) {
  const { currentLanguage, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant === "footer" ? "ghost" : "ghost"}
          size="sm"
          className={cn(
            "gap-1.5 px-2 text-sm font-medium",
            variant === "footer" &&
              "text-background/80 hover:bg-background/10 hover:text-background",
            className
          )}
          aria-label="Changer de langue"
        >
          <Globe className="h-4 w-4" />
          <span>{localeFlags[currentLanguage]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {(Object.keys(localeLabels) as Locale[]).map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => setLanguage(locale)}
            className={cn(
              "cursor-pointer gap-2",
              locale === currentLanguage && "bg-accent font-medium"
            )}
          >
            <span className="w-6 text-xs font-semibold text-muted-foreground">
              {localeFlags[locale]}
            </span>
            <span>{localeLabels[locale]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
