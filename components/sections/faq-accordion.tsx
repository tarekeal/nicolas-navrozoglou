"use client";

import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { sectionVariants } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { designConfig } from "@/lib/design-config";

const faqItems = [
  {
    question: "Comment prendre rendez-vous ?",
    answer:
      "Vous pouvez prendre rendez-vous en ligne via notre page de réservation ou en nous appelant au 02 307 88 19.",
  },
  {
    question: "Acceptez-vous les nouveaux patients ?",
    answer:
      "Oui, nous accueillons les nouveaux patients avec plaisir. Prenez rendez-vous en ligne ou par téléphone.",
  },
  {
    question: "Quelles assurances acceptez-vous ?",
    answer:
      "Nous acceptons toutes les mutuelles belges. N'hésitez pas à nous contacter pour plus d'informations sur le remboursement de vos soins.",
  },
  {
    question: "Que faire en cas d'urgence dentaire ?",
    answer:
      "En cas d'urgence durant les heures d'ouverture, appelez-nous immédiatement au 02 307 88 19. En dehors des heures, contactez le 112.",
  },
  {
    question: "Le traitement de canal est-il douloureux ?",
    answer:
      "Grâce aux techniques modernes et à l'anesthésie locale, le traitement de canal se déroule sans douleur. Nicolas Navrozoglou est spécialiste en endodontie et assure votre confort tout au long de la procédure.",
  },
  {
    question: "Le blanchiment dentaire est-il sans risque ?",
    answer:
      "Le blanchiment professionnel réalisé au cabinet est parfaitement sûr. Nous évaluons d'abord votre santé dentaire pour garantir un résultat optimal sans effets secondaires.",
  },
];

export function FaqAccordion() {
  return (
    <section className={cn(designConfig.layout.sectionPadding)} aria-labelledby="faq-heading">
      <div className={cn("mx-auto px-4 sm:px-6 lg:px-8", `max-w-${designConfig.layout.maxWidth}`)}>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mx-auto max-w-3xl"
        >
          <div className="mb-10 text-center">
            <p className="section-label">FAQ</p>
            <h2
              id="faq-heading"
              className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Questions fréquentes
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="leading-relaxed text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
