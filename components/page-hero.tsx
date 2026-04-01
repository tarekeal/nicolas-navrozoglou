"use client";

import { motion } from "motion/react";

/**
 * Page hero — PLACEHOLDER.
 *
 * IMPORTANT FOR AGENTS: This template is a minimal scaffold.
 * You MUST rewrite this component to match the selected hero variant
 * from `references/frontend/component-variants.md`.
 *
 * Available variants: centered, split, fullscreen, bento, statement, asymmetric.
 * Each has a completely different HTML structure — do NOT use this default for every project.
 */

interface PageHeroProps {
  label: string;
  headline: string;
  description: string;
  children?: React.ReactNode;
}

export function PageHero({ label, headline, description, children }: PageHeroProps) {
  return (
    <section className="hero-gradient py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl"
        >
          <p className="section-label">{label}</p>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {headline}
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
          {children}
        </motion.div>
      </div>
    </section>
  );
}
