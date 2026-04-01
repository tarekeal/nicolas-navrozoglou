"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { designConfig } from "@/lib/design-config";

const ease: [number, number, number, number] = [0.4, 0, 0.2, 1];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export function AboutPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className={cn("bg-muted/40", designConfig.layout.sectionPadding)}
      aria-labelledby="about-preview-heading"
    >
      <div className={cn("mx-auto px-4 sm:px-6 lg:px-8", `max-w-${designConfig.layout.maxWidth}`)}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
        >
          {/* Left — Clinic photo placeholder */}
          <motion.div variants={fadeInUp}>
            <div
              className={cn(
                "relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius)] bg-muted"
              )}
              style={{ boxShadow: "var(--shadow-md)" }}
            >
              <Image
                src="/images/clinic.jpg"
                alt="Cabinet dentaire moderne à la Clinique Van Volxem"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          {/* Right — Text */}
          <motion.div variants={fadeInUp}>
            <p className="section-label">À propos</p>
            <h2
              id="about-preview-heading"
              className="mb-4 font-serif text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Votre dentiste à Forest
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
              Diplômé de l&apos;ULB, Nicolas Navrozoglou est spécialisé en endodontie et utilise les
              technologies les plus modernes pour vos soins.
            </p>
            <p className="mb-8 leading-relaxed text-muted-foreground">
              Il exerce à la Clinique Dentaire Van Volxem à Forest, dans un cadre accueillant et
              moderne. Soins disponibles en français, néerlandais et anglais.
            </p>
            <Button asChild size="lg" variant="outline" className="h-12 px-7">
              <Link href="/about">Découvrir notre équipe</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
