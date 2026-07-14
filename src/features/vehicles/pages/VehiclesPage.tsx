import { Link } from "@tanstack/react-router";

import { useDrivers } from "../../drivers/hooks/useDrivers";
import { VehicleForm } from "../components/VehicleForm";
import { VehicleTable } from "../components/VehicleTable";
import { useVehicles } from "../hooks/useVehicles";

export function VehiclesPage() {
    const {
        data: vehicles,
        isLoading,
        isError,
    } = useVehicles();

    const {
        data: drivers,
        isLoading: areDriversLoading,
        isError: areDriversError,
    } = useDrivers();

    const isLoadingData = isLoading || areDriversLoading;
    const hasError = isError || areDriversError;

    const assignedDriverIds = new Set(
        (vehicles ?? [])
            .map((vehicle) => vehicle.driver?.id)
            .filter(
                (driverId): driverId is string => Boolean(driverId),
            ),
    );

    return (
        <main className="min-h-screen bg-slate-100 px-6 py-10">
            <div className="mx-auto max-w-6xl space-y-8">
                <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            Gestión de vehículos
                        </h1>

                        <p className="mt-2 text-slate-600">
                            Registra, consulta y asigna conductores a los vehículos de la flota.
                        </p>
                    </div>

                    <nav className="flex gap-3">
                        <Link
                            to="/vehicles"
                            className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white"
                        >
                            Vehículos
                        </Link>

                        <Link
                            to="/drivers"
                            className="rounded-md bg-white px-4 py-2 font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                        >
                            Conductores
                        </Link>
                    </nav>
                </header>

                <VehicleForm />

                <section className="rounded-xl bg-white p-6 shadow-sm">
                    <h2 className="mb-5 text-xl font-semibold text-slate-900">
                        Vehículos registrados
                    </h2>

                    {isLoadingData && (
                        <p className="text-slate-600">
                            Cargando vehículos y conductores...
                        </p>
                    )}

                    {hasError && (
                        <p
                            role="alert"
                            className="rounded-md bg-red-50 p-3 text-red-700"
                        >
                            No se pudieron cargar los vehículos o los conductores.
                        </p>
                    )}

                    {!isLoadingData
                        && !hasError
                        && (!vehicles || vehicles.length === 0) && (
                            <p className="text-slate-600">
                                No hay vehículos registrados.
                            </p>
                        )}

                    {!isLoadingData
                        && !hasError
                        && vehicles
                        && vehicles.length > 0 && (
                            <VehicleTable
                                vehicles={vehicles}
                                drivers={drivers ?? []}
                                assignedDriverIds={assignedDriverIds}
                            />
                        )}
                </section>
            </div>
        </main>
    );
}