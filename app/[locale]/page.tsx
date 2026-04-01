import type { Metadata } from "next";
import { HeroSplit } from "@/components/sections/hero-split";
import { ServicesGrid } from "@/components/sections/services-grid";
import { AboutPreview } from "@/components/sections/about-preview";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";
import { StatsRow } from "@/components/sections/stats-row";
import { CtaBanner } from "@/components/sections/cta-banner";

export const metadata: Metadata = {
  title: "Nicolas Navrozoglou | Dentiste & Endodontiste a Bruxelles",
  description:
    "Cabinet dentaire de Nicolas Navrozoglou a Forest, Bruxelles. Endodontie, implants, esthetique dentaire. Prenez rendez-vous en ligne.",
};

export default function HomePage() {
  return (
    <>
      <HeroSplit />
      <ServicesGrid />
      <AboutPreview />
      <TestimonialsCarousel />
      <StatsRow />
      <CtaBanner />
    </>
  );
}
