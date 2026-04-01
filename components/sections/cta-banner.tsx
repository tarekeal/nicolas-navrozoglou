import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { designConfig } from "@/lib/design-config";

export function CtaBanner() {
  return (
    <section
      className={cn("cta-gradient", designConfig.layout.sectionPadding)}
      aria-labelledby="cta-heading"
    >
      <div className={cn("mx-auto px-4 sm:px-6 lg:px-8", `max-w-${designConfig.layout.maxWidth}`)}>
        <div className="relative z-10 text-center">
          <h2
            id="cta-heading"
            className="mb-4 font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            Prenez soin de votre sourire
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/85">
            Prenez rendez-vous en ligne ou appelez-nous pour une consultation.
          </p>
          <Button
            asChild
            size="lg"
            className={cn(
              "h-12 px-8 text-[15px] font-semibold",
              "bg-white text-primary hover:bg-white/90"
            )}
          >
            <Link href="/booking">Prendre rendez-vous en ligne</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
