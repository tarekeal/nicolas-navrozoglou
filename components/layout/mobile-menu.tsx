"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

const navPaths = [
  { path: "", label: "Accueil" },
  { path: "/services", label: "Services" },
  { path: "/about", label: "À propos" },
  { path: "/contact", label: "Contact" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { currentLanguage } = useLanguage();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Ouvrir le menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[360px]">
        <SheetHeader className="text-left">
          <SheetTitle className="font-serif text-lg">N. Navrozoglou</SheetTitle>
        </SheetHeader>

        <nav className="mt-8 flex flex-col gap-1" aria-label="Navigation mobile">
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
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-[var(--radius)] px-4 py-3 text-base font-medium transition-colors",
                  isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <Separator className="my-6" />

        <div className="flex flex-col gap-4 px-4">
          <LanguageSwitcher />
          <Button asChild className="w-full">
            <Link href={`/${currentLanguage}/booking`} onClick={() => setOpen(false)}>
              Rendez-vous
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
