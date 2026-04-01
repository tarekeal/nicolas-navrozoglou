"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "motion/react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  ChevronRight,
  ChevronLeft,
  Check,
  CalendarDays,
  User,
  Stethoscope,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { bookingSchema, type BookingFormData } from "@/lib/schemas/booking";
import { fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { designConfig } from "@/lib/design-config";

type SubmitStatus = "idle" | "loading" | "success" | "error";

const services = [
  { value: "consultation", label: "Consultation générale", icon: Stethoscope },
  { value: "checkup", label: "Contrôle annuel", icon: Check },
  { value: "emergency", label: "Urgence", icon: Stethoscope },
  { value: "endodontics", label: "Endodontie", icon: Stethoscope },
  { value: "whitening", label: "Blanchiment", icon: Stethoscope },
  { value: "implant", label: "Implant", icon: Stethoscope },
  { value: "other", label: "Autre", icon: Stethoscope },
];

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
];

const steps = [
  { id: 1, label: "Service", icon: Stethoscope },
  { id: 2, label: "Date & Heure", icon: CalendarDays },
  { id: 3, label: "Vos informations", icon: User },
  { id: 4, label: "Confirmation", icon: Check },
];

export function BookingWidget() {
  const [currentStep, setCurrentStep] = useState(1);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const {
    register,
    handleSubmit,
    control,
    watch,
    trigger,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      service: "",
      date: "",
      time: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      birthdate: "",
      message: "",
    },
  });

  const formValues = watch();

  async function onSubmit(data: BookingFormData) {
    setStatus("loading");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Booking failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  async function goToNextStep() {
    let fieldsToValidate: (keyof BookingFormData)[] = [];
    if (currentStep === 1) fieldsToValidate = ["service"];
    if (currentStep === 2) fieldsToValidate = ["date", "time"];
    if (currentStep === 3) fieldsToValidate = ["firstName", "lastName", "email", "phone"];

    const valid = await trigger(fieldsToValidate);
    if (valid) setCurrentStep((prev) => Math.min(prev + 1, 4));
  }

  function goToPrevStep() {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }

  const selectedServiceLabel = services.find((s) => s.value === formValues.service)?.label ?? "";

  if (status === "success") {
    return (
      <section
        className={cn(designConfig.layout.sectionPadding)}
        aria-label="Confirmation de rendez-vous"
      >
        <div
          className={cn("mx-auto px-4 sm:px-6 lg:px-8", `max-w-${designConfig.layout.maxWidth}`)}
        >
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-lg text-center"
          >
            <Card className="card-hover">
              <CardContent className="flex flex-col items-center gap-4 p-8 sm:p-12">
                <CheckCircle className="h-16 w-16 text-primary" />
                <h2 className="font-serif text-2xl font-semibold">Demande envoyée</h2>
                <p className="text-muted-foreground">
                  Nous avons bien reçu votre demande de rendez-vous. Nous vous contacterons dans les
                  plus brefs délais pour confirmer.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(designConfig.layout.sectionPadding)}
      aria-label="Formulaire de rendez-vous"
    >
      <div className={cn("mx-auto px-4 sm:px-6 lg:px-8", `max-w-${designConfig.layout.maxWidth}`)}>
        <div className="mx-auto max-w-2xl">
          {/* Progress indicator */}
          <div className="mb-10">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isCompleted = currentStep > step.id;
                const isCurrent = currentStep === step.id;

                return (
                  <div key={step.id} className="flex flex-1 items-center">
                    <div className="flex flex-col items-center gap-1.5">
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                          isCompleted && "border-primary bg-primary text-primary-foreground",
                          isCurrent && "border-primary bg-primary/10 text-primary",
                          !isCompleted &&
                            !isCurrent &&
                            "border-muted-foreground/30 text-muted-foreground/50"
                        )}
                        style={{ transitionDuration: "var(--duration-micro)" }}
                      >
                        {isCompleted ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <StepIcon className="h-5 w-5" />
                        )}
                      </div>
                      <span
                        className={cn(
                          "hidden text-xs font-medium sm:block",
                          isCurrent ? "text-primary" : "text-muted-foreground"
                        )}
                      >
                        {step.label}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={cn(
                          "mx-2 h-0.5 flex-1 rounded-full",
                          currentStep > step.id ? "bg-primary" : "bg-muted"
                        )}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground sm:hidden">
              Étape {currentStep} / {steps.length} &mdash; {steps[currentStep - 1].label}
            </p>
          </div>

          {/* Form card */}
          <Card className="card-hover">
            <CardContent className="p-6 sm:p-8">
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <AnimatePresence mode="wait">
                  {/* Step 1: Service */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step-1"
                      variants={fadeInUp}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <h3 className="mb-6 font-serif text-xl font-semibold">
                        Quel type de consultation souhaitez-vous ?
                      </h3>
                      <Controller
                        name="service"
                        control={control}
                        render={({ field }) => (
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className="grid gap-3 sm:grid-cols-2"
                          >
                            {services.map((service) => (
                              <Label
                                key={service.value}
                                htmlFor={`service-${service.value}`}
                                className={cn(
                                  "flex cursor-pointer items-center gap-3 rounded-[var(--radius)] border p-4 transition-all",
                                  field.value === service.value
                                    ? "border-primary bg-primary/5 shadow-[var(--shadow-sm)]"
                                    : "border-border hover:border-primary/40"
                                )}
                                style={{ transitionDuration: "var(--duration-micro)" }}
                              >
                                <RadioGroupItem
                                  value={service.value}
                                  id={`service-${service.value}`}
                                />
                                <span className="text-sm font-medium">{service.label}</span>
                              </Label>
                            ))}
                          </RadioGroup>
                        )}
                      />
                      {errors.service && (
                        <p className="mt-2 text-sm text-destructive">{errors.service.message}</p>
                      )}
                    </motion.div>
                  )}

                  {/* Step 2: Date & Time */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step-2"
                      variants={fadeInUp}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <h3 className="mb-6 font-serif text-xl font-semibold">
                        Choisissez une date et un créneau
                      </h3>
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                          <Label className="mb-2 block text-sm font-medium">Date souhaitée</Label>
                          <Controller
                            name="date"
                            control={control}
                            render={({ field }) => (
                              <Calendar
                                mode="single"
                                selected={field.value ? new Date(field.value) : undefined}
                                onSelect={(date) => {
                                  if (date) field.onChange(format(date, "yyyy-MM-dd"));
                                }}
                                disabled={(date) =>
                                  date < new Date() || date.getDay() === 0 || date.getDay() === 6
                                }
                                locale={fr}
                                className="rounded-[var(--radius)] border"
                              />
                            )}
                          />
                          {errors.date && (
                            <p className="mt-1 text-sm text-destructive">{errors.date.message}</p>
                          )}
                        </div>
                        <div>
                          <Label className="mb-2 block text-sm font-medium">Heure souhaitée</Label>
                          <Controller
                            name="time"
                            control={control}
                            render={({ field }) => (
                              <div className="grid grid-cols-3 gap-2">
                                {timeSlots.map((slot) => (
                                  <button
                                    key={slot}
                                    type="button"
                                    onClick={() => field.onChange(slot)}
                                    className={cn(
                                      "rounded-[var(--radius)] border px-3 py-2 text-sm font-medium transition-all",
                                      field.value === slot
                                        ? "border-primary bg-primary text-primary-foreground"
                                        : "border-border hover:border-primary/40 hover:bg-muted"
                                    )}
                                    style={{ transitionDuration: "var(--duration-micro)" }}
                                  >
                                    {slot}
                                  </button>
                                ))}
                              </div>
                            )}
                          />
                          {errors.time && (
                            <p className="mt-1 text-sm text-destructive">{errors.time.message}</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Patient Info */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step-3"
                      variants={fadeInUp}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <h3 className="mb-6 font-serif text-xl font-semibold">Vos informations</h3>
                      <div className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <Label htmlFor="booking-firstName">Prénom</Label>
                            <Input
                              id="booking-firstName"
                              {...register("firstName")}
                              aria-invalid={!!errors.firstName}
                              className="mt-1.5"
                            />
                            {errors.firstName && (
                              <p className="mt-1 text-sm text-destructive">
                                {errors.firstName.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="booking-lastName">Nom</Label>
                            <Input
                              id="booking-lastName"
                              {...register("lastName")}
                              aria-invalid={!!errors.lastName}
                              className="mt-1.5"
                            />
                            {errors.lastName && (
                              <p className="mt-1 text-sm text-destructive">
                                {errors.lastName.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <Label htmlFor="booking-email">E-mail</Label>
                            <Input
                              id="booking-email"
                              type="email"
                              {...register("email")}
                              aria-invalid={!!errors.email}
                              className="mt-1.5"
                            />
                            {errors.email && (
                              <p className="mt-1 text-sm text-destructive">
                                {errors.email.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="booking-phone">Téléphone</Label>
                            <Input
                              id="booking-phone"
                              type="tel"
                              {...register("phone")}
                              aria-invalid={!!errors.phone}
                              className="mt-1.5"
                            />
                            {errors.phone && (
                              <p className="mt-1 text-sm text-destructive">
                                {errors.phone.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="booking-birthdate">Date de naissance (optionnel)</Label>
                          <Input
                            id="booking-birthdate"
                            type="date"
                            {...register("birthdate")}
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="booking-message">Remarques (optionnel)</Label>
                          <Textarea
                            id="booking-message"
                            rows={3}
                            {...register("message")}
                            placeholder="Informations complémentaires..."
                            className="mt-1.5 resize-none"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Confirmation */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step-4"
                      variants={fadeInUp}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <h3 className="mb-6 font-serif text-xl font-semibold">Récapitulatif</h3>
                      <div className="space-y-4 rounded-[var(--radius)] border border-border bg-muted/50 p-5">
                        <div className="grid gap-3 text-sm sm:grid-cols-2">
                          <div>
                            <p className="font-medium text-muted-foreground">
                              Type de consultation
                            </p>
                            <p className="font-semibold">{selectedServiceLabel}</p>
                          </div>
                          <div>
                            <p className="font-medium text-muted-foreground">Date & Heure</p>
                            <p className="font-semibold">
                              {formValues.date
                                ? format(new Date(formValues.date), "d MMMM yyyy", { locale: fr })
                                : ""}{" "}
                              à {formValues.time}
                            </p>
                          </div>
                          <div>
                            <p className="font-medium text-muted-foreground">Nom</p>
                            <p className="font-semibold">
                              {formValues.firstName} {formValues.lastName}
                            </p>
                          </div>
                          <div>
                            <p className="font-medium text-muted-foreground">E-mail</p>
                            <p className="font-semibold">{formValues.email}</p>
                          </div>
                          <div>
                            <p className="font-medium text-muted-foreground">Téléphone</p>
                            <p className="font-semibold">{formValues.phone}</p>
                          </div>
                          {formValues.message && (
                            <div className="sm:col-span-2">
                              <p className="font-medium text-muted-foreground">Remarques</p>
                              <p>{formValues.message}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {status === "error" && (
                        <div className="mt-4 rounded-[var(--radius)] border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                          Une erreur est survenue. Veuillez réessayer.
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation buttons */}
                <div className="mt-8 flex items-center justify-between">
                  {currentStep > 1 ? (
                    <Button type="button" variant="outline" onClick={goToPrevStep}>
                      <ChevronLeft className="mr-1 h-4 w-4" />
                      Retour
                    </Button>
                  ) : (
                    <div />
                  )}

                  {currentStep < 4 ? (
                    <Button type="button" onClick={goToNextStep}>
                      Suivant
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="submit" disabled={status === "loading"}>
                      {status === "loading" ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Envoi...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Check className="h-4 w-4" />
                          Confirmer le rendez-vous
                        </span>
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
