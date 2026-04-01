"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
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

export function HeroSplit() {
  return (
    <section
      className={cn("hero-gradient relative overflow-hidden", designConfig.layout.sectionPadding)}
      aria-label="Introduction"
    >
      <div className={cn("mx-auto px-4 sm:px-6 lg:px-8", `max-w-${designConfig.layout.maxWidth}`)}>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left — Doctor photo placeholder */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="order-2 lg:order-1"
          >
            <div
              className={cn(
                "relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden lg:max-w-none",
                "rounded-[var(--radius)] bg-muted"
              )}
              style={{ boxShadow: "var(--shadow-lg)" }}
            >
              <Image
                src="/images/hero-smile.jpg"
                alt="Consultation dentaire à la Clinique Van Volxem"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(187 65% 36% / 0.15) 0%, hsl(155 42% 42% / 0.10) 100%)",
                }}
              />
            </div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="order-1 lg:order-2"
          >
            <motion.div variants={fadeInUp}>
              <Badge
                className={cn(
                  "mb-6 rounded-full border-0 px-4 py-1.5 text-[13px] font-medium",
                  "bg-primary/10 text-primary"
                )}
              >
                Dentiste &amp; Endodontiste a Bruxelles
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="mb-6 font-serif text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.5rem]"
            >
              Votre sourire, <span className="text-primary">notre expertise</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mb-8 max-w-lg text-lg leading-relaxed text-muted-foreground"
            >
              Nicolas Navrozoglou et son equipe vous accueillent dans un cadre moderne et chaleureux
              a Forest, Bruxelles. Des soins dentaires de qualite, dans la langue de votre choix.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="h-12 px-7 text-[15px]">
                <Link href="/booking">Prendre rendez-vous</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-7 text-[15px]">
                <Link href="/services">Decouvrir nos services</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
