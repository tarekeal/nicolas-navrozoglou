import Link from "next/link";
import { Stethoscope, Microscope, Puzzle, Sparkles, Sun, Baby, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { designConfig } from "@/lib/design-config";

const services = [
  {
    icon: Stethoscope,
    title: "Dentisterie Générale",
    description:
      "Examens de routine, détartrages, obturations et soins préventifs pour maintenir votre santé bucco-dentaire.",
    href: "/services#general",
  },
  {
    icon: Microscope,
    title: "Endodontie",
    description:
      "Traitement de canal assisté par microscope. Spécialité de Nicolas Navrozoglou pour sauver vos dents naturelles.",
    href: "/services#endodontics",
  },
  {
    icon: Puzzle,
    title: "Implants Dentaires",
    description:
      "Implants unitaires, bridges sur implants et solutions All-on-4 pour remplacer les dents manquantes.",
    href: "/services#implants",
  },
  {
    icon: Sparkles,
    title: "Dentisterie Esthétique",
    description:
      "Facettes, bonding et conception de sourire pour un résultat naturel et harmonieux.",
    href: "/services#cosmetic",
  },
  {
    icon: Sun,
    title: "Blanchiment Dentaire",
    description:
      "Blanchiment professionnel au cabinet et kits à domicile pour un sourire éclatant.",
    href: "/services#whitening",
  },
  {
    icon: Baby,
    title: "Dentisterie Pédiatrique",
    description:
      "Soins dentaires adaptés aux enfants dans un environnement rassurant et bienveillant.",
    href: "/services#pediatric",
  },
] as const;

export function ServicesGrid() {
  return (
    <section className={cn(designConfig.layout.sectionPadding)} aria-labelledby="services-heading">
      <div className={cn("mx-auto px-4 sm:px-6 lg:px-8", `max-w-${designConfig.layout.maxWidth}`)}>
        {/* Section header */}
        <div className="mb-14 text-center">
          <p className="section-label">Services</p>
          <h2
            id="services-heading"
            className="mb-4 font-serif text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Nos Services Dentaires
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Des soins complets sous un même toit
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="card-hover group relative p-0">
              <CardHeader className="px-6 pb-3 pt-6">
                <div className="service-icon mb-4">
                  <service.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <CardTitle className="font-serif text-xl font-semibold">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <CardDescription className="mb-4 text-[15px] leading-relaxed">
                  {service.description}
                </CardDescription>
                <Link
                  href={service.href}
                  className="link-underline inline-flex items-center gap-1.5 text-sm font-medium text-primary"
                >
                  En savoir plus
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    style={{
                      transitionDuration: "var(--duration-micro)",
                      transitionTimingFunction: "var(--ease-default)",
                    }}
                    aria-hidden="true"
                  />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
