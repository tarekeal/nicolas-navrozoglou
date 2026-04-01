"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Stethoscope,
  Microscope,
  Puzzle,
  Sparkles,
  Sun,
  Baby,
  HeartPulse,
  AlignLeft,
  type LucideIcon,
} from "lucide-react";

interface ServiceBlock {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  image: string;
}

const ease = [0.4, 0, 0.2, 1] as const;

const services: ServiceBlock[] = [
  {
    id: "dentisterie-generale",
    icon: Stethoscope,
    title: "Dentisterie Generale",
    description:
      "Examens de routine, detartrages, obturations et soins preventifs pour maintenir votre sante bucco-dentaire.",
    features: [
      "Examens et diagnostics complets",
      "Detartrage et nettoyage professionnel",
      "Obturations et restaurations",
      "Soins preventifs personnalises",
    ],
    image: "/images/treatment.jpg",
  },
  {
    id: "endodontie",
    icon: Microscope,
    title: "Endodontie",
    description:
      "Traitement de canal assiste par microscope. Specialite de Nicolas Navrozoglou pour sauver vos dents naturelles.",
    features: [
      "Traitement de canal sous microscope",
      "Re-traitement endodontique",
      "Chirurgie apicale",
      "Diagnostic de la douleur dentaire",
    ],
    image: "/images/equipment.jpg",
  },
  {
    id: "implants",
    icon: Puzzle,
    title: "Implants Dentaires",
    description:
      "Implants unitaires, bridges sur implants et solutions All-on-4 pour remplacer les dents manquantes.",
    features: [
      "Implants unitaires",
      "Bridges sur implants",
      "Solutions All-on-4",
      "Planification 3D (CBCT)",
    ],
    image: "/images/clinic.jpg",
  },
  {
    id: "esthetique",
    icon: Sparkles,
    title: "Dentisterie Esthetique",
    description:
      "Facettes, bonding et conception de sourire pour un resultat naturel et harmonieux.",
    features: [
      "Facettes ceramiques",
      "Bonding dentaire",
      "Conception de sourire",
      "Couronnes tout-ceramique",
    ],
    image: "/images/smile.jpg",
  },
  {
    id: "blanchiment",
    icon: Sun,
    title: "Blanchiment Dentaire",
    description:
      "Blanchiment professionnel au cabinet et kits a domicile pour un sourire eclatant.",
    features: [
      "Blanchiment au cabinet",
      "Kits de blanchiment a domicile",
      "Resultats en une seance",
      "Suivi personnalise",
    ],
    image: "/images/smile.jpg",
  },
  {
    id: "pediatrique",
    icon: Baby,
    title: "Dentisterie Pediatrique",
    description:
      "Soins dentaires adaptes aux enfants dans un environnement rassurant et bienveillant.",
    features: [
      "Premiers examens dentaires",
      "Soins preventifs enfants",
      "Scellants dentaires",
      "Education a l'hygiene bucco-dentaire",
    ],
    image: "/images/waiting-room.jpg",
  },
  {
    id: "parodontologie",
    icon: HeartPulse,
    title: "Parodontologie",
    description:
      "Traitement des maladies des gencives, detartrage en profondeur et soins parodontaux.",
    features: [
      "Traitement de la gingivite",
      "Detartrage en profondeur",
      "Chirurgie parodontale",
      "Maintenance parodontale",
    ],
    image: "/images/treatment.jpg",
  },
  {
    id: "orthodontie",
    icon: AlignLeft,
    title: "Orthodontie",
    description:
      "Aligneurs invisibles, appareils traditionnels et solutions orthodontiques modernes.",
    features: [
      "Aligneurs invisibles (Invisalign)",
      "Appareils fixes traditionnels",
      "Orthodontie pour adultes",
      "Contention et suivi",
    ],
    image: "/images/equipment.jpg",
  },
];

export function ServicesAlternating() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="space-y-20 sm:space-y-28">
          {services.map((service, index) => {
            const isReversed = index % 2 === 1;
            const Icon = service.icon;

            return (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.4,
                  ease,
                }}
                className={cn(
                  "grid items-center gap-10 lg:grid-cols-2 lg:gap-16",
                  isReversed && "lg:[direction:rtl]"
                )}
              >
                {/* Service image */}
                <div className="lg:[direction:ltr]">
                  <div
                    className={cn("relative aspect-[4/3] w-full overflow-hidden")}
                    style={{ borderRadius: "var(--radius)" }}
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="lg:[direction:ltr]">
                  <div className="service-icon mb-4">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mb-3 font-serif text-2xl font-semibold tracking-tight text-foreground">
                    {service.title}
                  </h3>
                  <p className="mb-6 text-base leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <ul className="space-y-2.5" role="list">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                      >
                        <span
                          className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
