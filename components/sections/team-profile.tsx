"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Microscope, Building2, FileCheck } from "lucide-react";

const ease = [0.4, 0, 0.2, 1] as const;

const qualifications = [
  { icon: GraduationCap, label: "ULB Bruxelles 2015" },
  { icon: Microscope, label: "Spécialisation en Endodontie" },
  { icon: FileCheck, label: "NIHII : 3 002 427 001" },
];

export function TeamProfile() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Photo placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.32, ease }}
          >
            <div
              className={cn(
                "relative aspect-[3/4] w-full overflow-hidden",
                "bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent"
              )}
              style={{ borderRadius: "var(--radius)" }}
            >
              <Image
                src="/images/clinic.jpg"
                alt="Cabinet dentaire moderne de la Clinique Van Volxem"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          {/* Bio content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease }}
          >
            <Badge
              className={cn(
                "mb-4 rounded-full border-0 px-4 py-1.5 text-sm font-medium",
                "bg-primary/10 text-primary"
              )}
            >
              Votre dentiste
            </Badge>
            <h2 className="mb-2 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Nicolas Navrozoglou
            </h2>
            <p className="mb-6 text-lg font-medium text-primary">Dentiste &amp; Endodontiste</p>
            <p className="mb-8 text-base leading-relaxed text-muted-foreground">
              Diplômé de l&apos;ULB en 2015, Nicolas Navrozoglou s&apos;est spécialisé en
              endodontie. Il exerce à la Clinique Dentaire Van Volxem à Forest, où il met son
              expertise au service de votre santé bucco-dentaire.
            </p>

            {/* Qualifications */}
            <div className="flex flex-wrap gap-3">
              {qualifications.map((q) => {
                const Icon = q.icon;
                return (
                  <Badge
                    key={q.label}
                    variant="outline"
                    className={cn(
                      "gap-2 px-3 py-2 text-sm font-normal",
                      "border-border bg-muted/50 text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                    {q.label}
                  </Badge>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
