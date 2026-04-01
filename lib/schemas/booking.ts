import { z } from "zod";

export const bookingSchema = z.object({
  service: z.string().min(1, "Veuillez choisir un type de consultation"),
  date: z.string().min(1, "Veuillez choisir une date"),
  time: z.string().min(1, "Veuillez choisir un créneau horaire"),
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Veuillez entrer une adresse e-mail valide"),
  phone: z
    .string()
    .min(8, "Veuillez entrer un numéro de téléphone valide")
    .regex(/^[+]?[\d\s\-().]+$/, "Format de téléphone invalide"),
  birthdate: z.string().optional(),
  message: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
