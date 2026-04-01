"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Heart, Eye, Globe } from "lucide-react";

const ease = [0.4, 0, 0.2, 1] as const;

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "Les techniques et technologies les plus recentes pour des soins optimaux.",
  },
  {
    icon: Heart,
    title: "Bienveillance",
    description: "Le confort et le bien-etre de nos patients au coeur de notre approche.",
  },
  {
    icon: Eye,
    title: "Transparence",
    description: "Une communication claire sur les traitements, les alternatives et les couts.",
  },
  {
    icon: Globe,
    title: "Accessibilite",
    description: "Soins multilingues (FR/NL/EN), situation centrale et facilement accessible.",
  },
];

export function ValuesGrid() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Nos Valeurs
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
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
                  <CardContent className="p-8">
                    <div className="service-icon mb-4">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="mb-2 font-serif text-xl font-semibold text-foreground">
                      {value.title}
                    </h3>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {value.description}
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
