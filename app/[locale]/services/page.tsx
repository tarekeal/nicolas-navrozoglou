import type { Metadata } from "next";
import { HeroCentered } from "@/components/sections/hero-centered";
import { ServicesAlternating } from "@/components/sections/services-alternating";
import { CtaBanner } from "@/components/sections/cta-banner";

export const metadata: Metadata = {
  title: "Services Dentaires",
  description:
    "Dentisterie générale, endodontie, implants, esthétique, blanchiment, pédiatrique, parodontologie et orthodontie à Bruxelles.",
};

export default function ServicesPage() {
  return (
    <>
      <HeroCentered
        title="Nos Services Dentaires"
        subtitle="Des soins complets sous un même toit. Découvrez l'ensemble de nos traitements dentaires."
        badge="Services"
      />
      <ServicesAlternating />
      <CtaBanner />
    </>
  );
}
