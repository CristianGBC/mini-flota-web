import { z } from "zod";

const currentYear = new Date().getFullYear();

export const vehicleSchema = z.object({
    plate: z
        .string()
        .regex(
            /^[A-Z]{3}-\d{4}$/,
            "La placa debe tener el formato ABC-1234",
        ),

    brand: z
        .string()
        .min(2, "La marca debe tener al menos 2 caracteres")
        .max(50, "La marca no puede superar 50 caracteres"),

    model: z
        .string()
        .min(1, "El modelo es obligatorio")
        .max(50, "El modelo no puede superar 50 caracteres"),

    year: z
        .number()
        .min(1990, "El año debe ser mayor o igual a 1990")
        .max(
            currentYear,
            `El año no puede ser mayor a ${currentYear}`,
        ),

    capacity_kg: z
        .number()
        .positive("La capacidad debe ser mayor que 0"),

    status: z.enum(["active", "inactive"]),
});

export type VehicleFormData = z.infer<typeof vehicleSchema>;