import type { Metadata } from "next";
import { HeroCentered } from "@/components/sections/hero-centered";
import { BookingWidget } from "@/components/sections/booking-widget";

export const metadata: Metadata = {
  title: "Rendez-vous en ligne",
  description:
    "Prenez rendez-vous en ligne avec Nicolas Navrozoglou, dentiste et endodontiste à Forest, Bruxelles.",
};

export default function BookingPage() {
  return (
    <>
      <HeroCentered
        title="Prendre rendez-vous"
        subtitle="Réservez votre consultation en quelques clics."
      />
      <BookingWidget />
    </>
  );
}
