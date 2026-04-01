"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { contactSchema, type ContactFormData } from "@/lib/schemas/contact";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { designConfig } from "@/lib/design-config";

type SubmitStatus = "idle" | "loading" | "success" | "error";

const subjects = [
  { value: "general", label: "Question générale" },
  { value: "appointment", label: "Demande de rendez-vous" },
  { value: "emergency", label: "Urgence dentaire" },
  { value: "other", label: "Autre" },
];

export function ContactSplit() {
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormData) {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      className={cn(designConfig.layout.sectionPadding)}
      aria-labelledby="contact-form-heading"
    >
      <div className={cn("mx-auto px-4 sm:px-6 lg:px-8", `max-w-${designConfig.layout.maxWidth}`)}>
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
          {/* Contact Form — spans 3 columns */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="lg:col-span-3"
          >
            <Card className="card-hover border-border">
              <CardContent className="p-6 sm:p-8">
                <h2 id="contact-form-heading" className="mb-6 font-serif text-2xl font-semibold">
                  Envoyez-nous un message
                </h2>

                {status === "success" ? (
                  <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center gap-4 py-12 text-center"
                  >
                    <CheckCircle className="h-12 w-12 text-primary" />
                    <h3 className="font-serif text-xl font-semibold">Message envoyé</h3>
                    <p className="max-w-sm text-muted-foreground">
                      Nous avons bien reçu votre message. Nous vous contacterons dans les plus brefs
                      délais.
                    </p>
                    <Button variant="outline" onClick={() => setStatus("idle")} className="mt-2">
                      Envoyer un autre message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                    <motion.div variants={fadeInUp}>
                      <Label htmlFor="contact-name">Nom complet</Label>
                      <Input
                        id="contact-name"
                        placeholder="Jean Dupont"
                        {...register("name")}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className="mt-1.5"
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-1 text-sm text-destructive">
                          {errors.name.message}
                        </p>
                      )}
                    </motion.div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <motion.div variants={fadeInUp}>
                        <Label htmlFor="contact-email">Adresse e-mail</Label>
                        <Input
                          id="contact-email"
                          type="email"
                          placeholder="jean@exemple.be"
                          {...register("email")}
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "email-error" : undefined}
                          className="mt-1.5"
                        />
                        {errors.email && (
                          <p id="email-error" className="mt-1 text-sm text-destructive">
                            {errors.email.message}
                          </p>
                        )}
                      </motion.div>

                      <motion.div variants={fadeInUp}>
                        <Label htmlFor="contact-phone">Téléphone</Label>
                        <Input
                          id="contact-phone"
                          type="tel"
                          placeholder="0470 12 34 56"
                          {...register("phone")}
                          className="mt-1.5"
                        />
                      </motion.div>
                    </div>

                    <motion.div variants={fadeInUp}>
                      <Label htmlFor="contact-subject">Sujet</Label>
                      <Select onValueChange={(value) => setValue("service", value)}>
                        <SelectTrigger id="contact-subject" className="mt-1.5">
                          <SelectValue placeholder="Choisir un sujet" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects.map((subject) => (
                            <SelectItem key={subject.value} value={subject.value}>
                              {subject.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                      <Label htmlFor="contact-message">Votre message</Label>
                      <Textarea
                        id="contact-message"
                        placeholder="Décrivez votre demande..."
                        rows={5}
                        {...register("message")}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "message-error" : undefined}
                        className="mt-1.5 resize-none"
                      />
                      {errors.message && (
                        <p id="message-error" className="mt-1 text-sm text-destructive">
                          {errors.message.message}
                        </p>
                      )}
                    </motion.div>

                    {status === "error" && (
                      <div className="flex items-center gap-2 rounded-[var(--radius)] border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        Une erreur est survenue. Veuillez réessayer.
                      </div>
                    )}

                    <motion.div variants={fadeInUp}>
                      <Button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full sm:w-auto"
                      >
                        {status === "loading" ? (
                          <span className="flex items-center gap-2">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            Envoi en cours...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Send className="h-4 w-4" />
                            Envoyer
                          </span>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info — spans 2 columns */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-6 lg:col-span-2"
          >
            <motion.div variants={fadeInUp}>
              <Card className="card-hover border-border">
                <CardContent className="space-y-5 p-6">
                  <h3 className="font-serif text-xl font-semibold">Informations pratiques</h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="service-icon !h-10 !w-10">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Adresse</p>
                        <p className="text-sm text-muted-foreground">
                          Avenue Van Volxem 15
                          <br />
                          1190 Forest, Bruxelles
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-start gap-3">
                      <div className="service-icon !h-10 !w-10">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Téléphone</p>
                        <a href="tel:023078819" className="text-sm text-primary hover:underline">
                          02 307 88 19
                        </a>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-start gap-3">
                      <div className="service-icon !h-10 !w-10">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">E-mail</p>
                        <a
                          href="mailto:contact@dr-navrozoglou.be"
                          className="text-sm text-primary hover:underline"
                        >
                          contact@dr-navrozoglou.be
                        </a>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-start gap-3">
                      <div className="service-icon !h-10 !w-10">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Horaires</p>
                        <p className="text-sm text-muted-foreground">
                          Lundi &ndash; Vendredi : 9h00 &ndash; 18h00
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Google Maps Embed */}
            <motion.div variants={fadeInUp}>
              <Card className="card-hover overflow-hidden border-border">
                <div className="aspect-[4/3] w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2521.3!2d4.3380!3d50.8125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAvenue+Van+Volxem+15%2C+1190+Forest!5e0!3m2!1sfr!2sbe!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localisation du cabinet dentaire - Avenue Van Volxem 15, 1190 Forest"
                    className="h-full w-full"
                  />
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
