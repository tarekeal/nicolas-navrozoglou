"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Train } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

const serviceHashes = [
  { hash: "#dentisterie-generale", label: "Dentisterie Générale" },
  { hash: "#endodontie", label: "Endodontie" },
  { hash: "#implants", label: "Implants Dentaires" },
  { hash: "#esthetique", label: "Dentisterie Esthétique" },
  { hash: "#blanchiment", label: "Blanchiment Dentaire" },
  { hash: "#pediatrique", label: "Dentisterie Pédiatrique" },
];

const legalLinks = [
  { href: "/legal", label: "Mentions légales" },
  { href: "/privacy", label: "Confidentialité" },
  { href: "/accessibility", label: "Accessibilité" },
];

export function Footer() {
  const { currentLanguage } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted text-foreground border-t border-border" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Contact Info */}
          <div className="space-y-5">
            <Link
              href={`/${currentLanguage}`}
              className="inline-flex items-center gap-2 font-serif text-lg font-semibold text-foreground"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius)] bg-primary text-sm font-bold text-primary-foreground">
                DN
              </span>
              N. Navrozoglou
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Cabinet dentaire de Nicolas Navrozoglou. Soins dentaires de qualité à
              Forest, Bruxelles.
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <span className="flex items-start gap-2 text-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  Avenue Van Volxem 15, 1190 Forest, Bruxelles
                </span>
              </li>
              <li>
                <a
                  href="tel:023078819"
                  className="flex items-center gap-2 text-foreground transition-colors hover:text-foreground"
                >
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  02 307 88 19
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@dr-navrozoglou.be"
                  className="flex items-center gap-2 text-foreground transition-colors hover:text-foreground"
                >
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  contact@dr-navrozoglou.be
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Services
            </h3>
            <ul className="space-y-2.5">
              {serviceHashes.map(({ hash, label }) => (
                <li key={hash}>
                  <Link
                    href={`/${currentLanguage}/services${hash}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Hours & Transport */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Horaires
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Lundi &ndash; Vendredi</p>
                  <p>9h00 &ndash; 18h00</p>
                </div>
              </div>
              <Separator className="bg-slate-700/50" />
              <div>
                <h4 className="mb-2 text-sm font-semibold text-foreground">Accès</h4>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Train className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <p>
                    Tram 32, 82, 97 (arrêt Zaman-Forest National)
                    <br />
                    Train : Gare de Forest-Est
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Informations
            </h3>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <Separator className="my-8 bg-slate-700/50" />
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} Nicolas Navrozoglou. Tous droits réservés.
          </p>
          <LanguageSwitcher variant="footer" />
        </div>
      </div>
    </footer>
  );
}
