import { z } from "zod";


export const driverSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "El nombre es obligatorio"),
    license: z
        .string()
        .trim()
        .regex(
            /^\d{10}$/,
            "La licencia debe contener exactamente 10 dígitos",
        ),
});


export type DriverFormData = z.infer<typeof driverSchema>;