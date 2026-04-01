"use client";

import { SharedLayout } from "@/components/shared-layout";
import { PageHero } from "@/components/page-hero";

export default function HomePageClient() {
  return (
    <SharedLayout>
      <PageHero
        label="Nicolas Navrozoglou"
        headline="Welcome to Nicolas Navrozoglou"
        description="Cabinet dentaire de Nicolas Navrozoglou à Forest, Bruxelles. Endodontie, implants, esthétique dentaire."
      />
    </SharedLayout>
  );
}
