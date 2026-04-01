"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

const navPaths = [
  { path: "", label: "Accueil" },
  { path: "/services", label: "Services" },
  { path: "/about", label: "À propos" },
  { path: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const { currentLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-[72px] w-full border-b transition-all",
        "bg-white/90 backdrop-blur-md",
        scrolled ? "border-border/40" : "border-transparent"
      )}
      style={{
        transitionDuration: "var(--duration-micro)",
        transitionTimingFunction: "var(--ease-default)",
      }}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 font-serif text-lg font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius)] bg-primary text-sm font-bold text-primary-foreground">
            DN
          </span>
          <span className="hidden sm:inline">N. Navrozoglou</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
          {navPaths.map(({ path, label }) => {
            const href = `/${currentLanguage}${path}`;
            const isActive =
              path === ""
                ? pathname === `/${currentLanguage}`
                : pathname.startsWith(`/${currentLanguage}${path}`);

            return (
              <Link
                key={path}
                href={href}
                className={cn(
                  "link-underline rounded-[var(--radius)] px-3 py-2 text-sm font-medium transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right side: Language + CTA + Mobile */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>
          <Button
            asChild
            size="sm"
            className="hidden h-9 px-4 text-sm font-semibold lg:inline-flex"
          >
            <Link href={`/${currentLanguage}/booking`}>Rendez-vous</Link>
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
