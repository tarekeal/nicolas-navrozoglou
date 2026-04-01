import type { Metadata } from "next";
import { HeroCentered } from "@/components/sections/hero-centered";
import { ContactSplit } from "@/components/sections/contact-split";
import { FaqAccordion } from "@/components/sections/faq-accordion";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez le cabinet de Nicolas Navrozoglou. Avenue Van Volxem 15, 1190 Forest. Téléphone, email et formulaire de contact.",
};

export default function ContactPage() {
  return (
    <>
      <HeroCentered
        title="Contactez-nous"
        subtitle="N'hésitez pas à nous contacter pour toute question ou demande de rendez-vous."
      />
      <ContactSplit />
      <FaqAccordion />
    </>
  );
}
