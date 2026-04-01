"use client";

import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { designConfig } from "@/lib/design-config";

const testimonials = [
  {
    name: "Marie L.",
    treatment: "Traitement de canal",
    quote:
      "J'avais tres peur du traitement de canal, mais Nicolas Navrozoglou m'a mise a l'aise des le premier instant. Professionnel et humain.",
    rating: 5,
  },
  {
    name: "Thomas D.",
    treatment: "Implant dentaire",
    quote:
      "Excellent suivi du debut a la fin. Le resultat est parfait et naturel. Je recommande vivement ce cabinet.",
    rating: 5,
  },
  {
    name: "Sophie V.",
    treatment: "Blanchiment",
    quote:
      "Resultat impressionnant en une seule seance. L'equipe est tres professionnelle et le cabinet est moderne et accueillant.",
    rating: 5,
  },
  {
    name: "Ahmed B.",
    treatment: "Controle annuel",
    quote:
      "Tres satisfait de la qualite des soins. Nicolas Navrozoglou prend le temps d'expliquer chaque etape. Cabinet propre et bien equipe.",
    rating: 5,
  },
] as const;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} etoiles sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function TestimonialsCarousel() {
  return (
    <section
      className={cn(designConfig.layout.sectionPadding)}
      aria-labelledby="testimonials-heading"
    >
      <div className={cn("mx-auto px-4 sm:px-6 lg:px-8", `max-w-${designConfig.layout.maxWidth}`)}>
        {/* Section header */}
        <div className="mb-14 text-center">
          <p className="section-label">Temoignages</p>
          <h2
            id="testimonials-heading"
            className="mb-4 font-serif text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Ce que disent nos patients
          </h2>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="mx-auto w-full max-w-5xl"
          aria-label="Carousel de temoignages patients"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.name} className="pl-4 md:basis-1/2">
                <Card className="card-hover h-full" style={{ borderRadius: "var(--radius)" }}>
                  <CardContent className="flex h-full flex-col p-6">
                    <StarRating rating={testimonial.rating} />
                    <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-muted-foreground">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <div className="mt-6 border-t border-border pt-4">
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.treatment}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-8 flex items-center justify-center gap-2">
            <CarouselPrevious className="static translate-y-0" aria-label="Temoignage precedent" />
            <CarouselNext className="static translate-y-0" aria-label="Temoignage suivant" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
