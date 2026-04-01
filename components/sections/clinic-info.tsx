"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Scan, Monitor, ShieldCheck } from "lucide-react";

const ease = [0.4, 0, 0.2, 1] as const;

const facilities = [
  {
    icon: Building2,
    title: "8 Cabinets modernes",
    description: "Cabinets entierement equipes avec les dernieres technologies pour votre confort.",
  },
  {
    icon: Scan,
    title: "Radiographie 3D (CBCT)",
    description:
      "Imagerie tridimensionnelle pour des diagnostics precis et une planification optimale.",
  },
  {
    icon: Monitor,
    title: "Imagerie numerique",
    description: "Cameras intra-orales et radiographies numeriques pour un suivi detaille.",
  },
  {
    icon: ShieldCheck,
    title: "Sterilisation aux normes",
    description:
      "Protocoles de sterilisation stricts respectant les normes europeennes les plus exigeantes.",
  },
];

export function ClinicInfo() {
  return (
    <section className="bg-muted/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease }}
          className="mb-12 max-w-2xl"
        >
          <h2 className="mb-4 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Notre Cabinet
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            La Clinique Dentaire Van Volxem dispose de 8 cabinets equipes des dernieres
            technologies, dont la radiographie 3D (CBCT) pour des diagnostics precis.
          </p>
        </motion.div>

        {/* Clinic photo placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, ease }}
          className="mb-12"
        >
          <div
            className={cn(
              "relative aspect-[21/9] w-full overflow-hidden",
              "from-primary/8 bg-gradient-to-br via-secondary/5 to-transparent"
            )}
            style={{ borderRadius: "var(--radius)" }}
          >
            <Image
              src="/images/waiting-room.jpg"
              alt="Salle d'attente moderne de la Clinique Dentaire Van Volxem"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </motion.div>

        {/* Facility cards grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {facilities.map((facility, index) => {
            const Icon = facility.icon;
            return (
              <motion.div
                key={facility.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.4,
                  ease,
                  delay: index * 0.08,
                }}
              >
                <Card className={cn("card-hover h-full border-border bg-card p-0")}>
                  <CardContent className="p-6">
                    <div className="service-icon mb-4">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="mb-2 font-serif text-lg font-semibold text-foreground">
                      {facility.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {facility.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
