"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface HeroCenteredProps {
  title: string;
  subtitle?: string;
  badge?: string;
}

export function HeroCentered({ title, subtitle, badge }: HeroCenteredProps) {
  return (
    <section className="hero-gradient py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] as const }}
          className="mx-auto max-w-3xl text-center"
        >
          {badge && (
            <Badge
              className={cn(
                "mb-4 rounded-full border-0 px-4 py-1.5 text-sm font-medium",
                "bg-primary/10 text-primary"
              )}
            >
              {badge}
            </Badge>
          )}
          <h1 className="mb-4 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
