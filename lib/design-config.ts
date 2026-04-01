/**
 * Design configuration — resolved values from the design system.
 * Generated from the organic "Warm Trust" archetype.
 * Import this to make layout/style decisions at runtime.
 */

export const designConfig = {
  archetype: "organic",

  typography: {
    headingFont: "serif" as "sans" | "serif",
  },

  layout: {
    navClasses: "bg-white/90 backdrop-blur-md border-b border-border/40",
    footerClasses: "bg-muted/60 text-foreground border-t border-border/40",
    sectionPadding: "py-20 sm:py-28",
    maxWidth: "7xl",
  },

  shape: {
    borderRadius: "12px",
  },

  shadows: {
    sm: "0 1px 2px rgba(30,20,10,0.03)",
    md: "0 2px 8px rgba(30,20,10,0.05)",
    lg: "0 8px 20px rgba(30,20,10,0.07)",
  },

  motion: {
    durationMicro: 250,
    durationPage: 450,
    ease: [0.4, 0, 0.2, 1],
    distance: 20,
    stagger: 0.08,
  },
} as const;

export type DesignConfig = typeof designConfig;
