import type { Metadata } from "next";
import { HeroCentered } from "@/components/sections/hero-centered";
import { TeamProfile } from "@/components/sections/team-profile";
import { ClinicInfo } from "@/components/sections/clinic-info";
import { ValuesGrid } from "@/components/sections/values-grid";
import { CtaBanner } from "@/components/sections/cta-banner";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Découvrez Nicolas Navrozoglou, diplômé de l'ULB, spécialiste en endodontie. Clinique Dentaire Van Volxem à Forest.",
};

export default function AboutPage() {
  return (
    <>
      <HeroCentered
        title="À propos de Nicolas Navrozoglou"
        subtitle="Dédié à l'excellence en soins dentaires."
        badge="Notre équipe"
      />
      <TeamProfile />
      <ClinicInfo />
      <ValuesGrid />
      <CtaBanner />
    </>
  );
}
