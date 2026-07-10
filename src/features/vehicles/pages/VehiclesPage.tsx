import { VehicleForm } from "../components/VehicleForm";
import { VehicleTable } from "../components/VehicleTable";
import { useVehicles } from "../hooks/useVehicles";

export function VehiclesPage() {
    const {
        data: vehicles,
        isLoading,
        isError,
    } = useVehicles();

    return (
        <main className="min-h-screen bg-slate-100 px-6 py-10">
            <div className="mx-auto max-w-6xl space-y-8">
                <header>
                    <h1 className="text-3xl font-bold text-slate-900">
                        Gestión de vehículos
                    </h1>

                    <p className="mt-2 text-slate-600">
                        Registra y consulta los vehículos de la flota.
                    </p>
                </header>

                <VehicleForm />

                <section className="rounded-xl bg-white p-6 shadow-sm">
                    <h2 className="mb-5 text-xl font-semibold text-slate-900">
                        Vehículos registrados
                    </h2>

                    {isLoading && (
                        <p className="text-slate-600">
                            Cargando vehículos...
                        </p>
                    )}

                    {isError && (
                        <p
                            role="alert"
                            className="rounded-md bg-red-50 p-3 text-red-700"
                        >
                            No se pudieron cargar los vehículos.
                        </p>
                    )}

                    {!isLoading
                        && !isError
                        && (!vehicles || vehicles.length === 0) && (
                            <p className="text-slate-600">
                                No hay vehículos registrados.
                            </p>
                        )}

                    {!isLoading
                        && !isError
                        && vehicles
                        && vehicles.length > 0 && (
                            <VehicleTable vehicles={vehicles} />
                        )}
                </section>
            </div>
        </main>
    );
}