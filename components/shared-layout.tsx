"use client";

import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/scroll-progress";

/**
 * Shared layout shell — delegates nav and footer to dedicated components.
 *
 * IMPORTANT FOR AGENTS: Do NOT hardcode nav/footer HTML here.
 * Build `components/nav.tsx` and `components/footer.tsx` separately,
 * using the selected variant from `references/frontend/component-variants.md`.
 * Each project should have a structurally different nav and footer
 * based on the design archetype.
 */

interface SharedLayoutProps {
  children: React.ReactNode;
}

export function SharedLayout({ children }: SharedLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Nav />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
