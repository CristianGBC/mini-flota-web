import { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useCreateDriver } from "../hooks/useCreateDriver";
import {
    driverSchema,
    type DriverFormData,
} from "../utils/driverValidator";


export function DriverForm() {
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
        },
    } = useForm<DriverFormData>({
        resolver: zodResolver(driverSchema),
        defaultValues: {
            name: "",
            license: "",
        },
    });

    const createDriverMutation = useCreateDriver();

    const onSubmit = async (data: DriverFormData) => {
        try {
            setServerError(null);

            await createDriverMutation.mutateAsync(data);

            reset();
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const detail = error.response?.data?.detail;

                setServerError(
                    typeof detail === "string"
                        ? detail
                        : "No se pudo crear el conductor",
                );

                return;
            }

            setServerError("Ocurrió un error inesperado");
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-xl bg-white p-6 shadow-sm"
        >
            <h2 className="mb-5 text-xl font-semibold text-slate-900">
                Registrar conductor
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
                <div>
                    <label
                        htmlFor="name"
                        className="mb-1 block text-sm font-medium text-slate-700"
                    >
                        Nombre
                    </label>

                    <input
                        id="name"
                        type="text"
                        placeholder="Juan Carlos"
                        {...register("name")}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    {errors.name && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="license"
                        className="mb-1 block text-sm font-medium text-slate-700"
                    >
                        Licencia
                    </label>

                    <input
                        id="license"
                        type="text"
                        inputMode="numeric"
                        maxLength={10}
                        placeholder="1234567890"
                        {...register("license")}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    {errors.license && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.license.message}
                        </p>
                    )}
                </div>
            </div>

            {serverError && (
                <p
                    role="alert"
                    className="mt-5 rounded-md bg-red-50 p-3 text-sm text-red-700"
                >
                    {serverError}
                </p>
            )}

            <button
                type="submit"
                disabled={createDriverMutation.isPending}
                className="mt-6 rounded-md bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {createDriverMutation.isPending
                    ? "Guardando..."
                    : "Crear conductor"}
            </button>
        </form>
    );
}