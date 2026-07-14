import { useState } from "react";
import axios from "axios";

import type { Driver } from "../../drivers/types/driver";
import { useAssignDriver } from "../hooks/useAssignDriver";

type AssignDriverControlProps = {
    vehicleId: string;
    currentDriverId: string | null;
    drivers: Driver[];
};

export function AssignDriverControl({
    vehicleId,
    currentDriverId,
    drivers,
}: AssignDriverControlProps) {
    const [selectedDriverId, setSelectedDriverId] = useState(
        currentDriverId ?? "",
    );
    const [serverError, setServerError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(
        null,
    );

    const assignDriverMutation = useAssignDriver();

    const handleAssign = async () => {
        if (!selectedDriverId) {
            setServerError("Selecciona un conductor");
            setSuccessMessage(null);
            return;
        }

        try {
            setServerError(null);
            setSuccessMessage(null);

            await assignDriverMutation.mutateAsync({
                vehicleId,
                driverId: selectedDriverId,
            });

            setSuccessMessage(
                "Conductor asignado correctamente",
            );
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const detail = error.response?.data?.detail;

                setServerError(
                    typeof detail === "string"
                        ? detail
                        : "No se pudo asignar el conductor",
                );

                return;
            }

            setServerError("Ocurrió un error inesperado");
        }
    };

    return (
        <div className="min-w-56">
            <div className="flex gap-2">
                <select
                    value={selectedDriverId}
                    onChange={(event) => {
                        setSelectedDriverId(event.target.value);
                        setServerError(null);
                        setSuccessMessage(null);
                    }}
                    className="min-w-0 flex-1 rounded-md border border-slate-300 px-2 py-2 text-sm outline-none focus:border-blue-500"
                >
                    <option value="">
                        Seleccionar conductor
                    </option>

                    {drivers.map((driver) => (
                        <option
                            key={driver.id}
                            value={driver.id}
                        >
                            {driver.name}
                        </option>
                    ))}
                </select>

                <button
                    type="button"
                    onClick={handleAssign}
                    disabled={
                        assignDriverMutation.isPending
                        || !selectedDriverId
                    }
                    className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {assignDriverMutation.isPending
                        ? "..."
                        : "Asignar"}
                </button>
            </div>

            {serverError && (
                <p className="mt-1 text-sm text-red-600">
                    {serverError}
                </p>
            )}

            {successMessage && (
                <p className="mt-1 text-sm text-green-600">
                    {successMessage}
                </p>
            )}
        </div>
    );
}