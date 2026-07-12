import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { useCreateVehicle } from "../hooks/useCreateVehicle";
import {
    vehicleSchema,
    type VehicleFormData,
} from "../utils/vehicleValidator";

export function VehicleForm() {
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
        },
    } = useForm<VehicleFormData>({
        resolver: zodResolver(vehicleSchema),
        defaultValues: {
            plate: "",
            brand: "",
            model: "",
            year: undefined,
            capacity_kg: undefined,
            status: "active",
        },
    });

    const createVehicleMutation = useCreateVehicle();

    const onSubmit = async (data: VehicleFormData) => {
        try {
            setServerError(null);

            await createVehicleMutation.mutateAsync(data);

            reset();
            
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const detail = error.response?.data?.detail;

                setServerError(
                    typeof detail === "string"
                        ? detail
                        : "No se pudo crear el vehículo",
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
                Registrar vehículo
            </h2>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                <div>
                    <label
                        htmlFor="plate"
                        className="mb-1 block text-sm font-medium text-slate-700"
                    >
                        Placa
                    </label>

                    <input
                        id="plate"
                        type="text"
                        placeholder="ABC-1234"
                        {...register("plate")}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                    />

                    {errors.plate && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.plate.message}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="brand"
                        className="mb-1 block text-sm font-medium text-slate-700"
                    >
                        Marca
                    </label>

                    <input
                        id="brand"
                        type="text"
                        {...register("brand")}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                    />

                    {errors.brand && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.brand.message}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="model"
                        className="mb-1 block text-sm font-medium text-slate-700"
                    >
                        Modelo
                    </label>

                    <input
                        id="model"
                        type="text"
                        {...register("model")}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                    />

                    {errors.model && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.model.message}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="year"
                        className="mb-1 block text-sm font-medium text-slate-700"
                    >
                        Año
                    </label>

                    <input
                        id="year"
                        type="number"
                        {...register("year", {
                            valueAsNumber: true,
                        })}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                    />

                    {errors.year && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.year.message}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="capacity_kg"
                        className="mb-1 block text-sm font-medium text-slate-700"
                    >
                        Capacidad en kg
                    </label>

                    <input
                        id="capacity_kg"
                        type="number"
                        step="0.01"
                        {...register("capacity_kg", {
                            valueAsNumber: true,
                        })}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                    />

                    {errors.capacity_kg && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.capacity_kg.message}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="status"
                        className="mb-1 block text-sm font-medium text-slate-700"
                    >
                        Estado
                    </label>

                    <select
                        id="status"
                        {...register("status")}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                    >
                        <option value="active">
                            Activo
                        </option>

                        <option value="inactive">
                            Inactivo
                        </option>
                    </select>

                    {errors.status && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.status.message}
                        </p>
                    )}
                </div>
            </div>

            {serverError && (
                <p
                    role="alert"
                    className="mt-5 rounded-md bg-red-50 p-3 text-red-700"
                >
                    {serverError}
                </p>
            )}

            <button
                type="submit"
                disabled={createVehicleMutation.isPending}
                className="mt-6 rounded-md bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {createVehicleMutation.isPending
                    ? "Guardando..."
                    : "Crear vehículo"}
            </button>
        </form>
    );
}