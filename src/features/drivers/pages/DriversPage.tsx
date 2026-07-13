import { DriverForm } from "../components/DriverForm";
import { DriverList } from "../components/DriverList";
import { useDrivers } from "../hooks/useDrivers";
import { Link } from "@tanstack/react-router";

export function DriversPage() {
    const {
        data: drivers,
        isLoading,
        isError,
    } = useDrivers();

    return (
        <main className="min-h-screen bg-slate-100 px-6 py-10">
            <div className="mx-auto max-w-6xl space-y-8">
                <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            Gestión de conductores
                        </h1>

                        <p className="mt-2 text-slate-600">
                            Registra y consulta los conductores de la flota.
                        </p>
                    </div>

                    <nav className="flex gap-3">
                        <Link
                            to="/vehicles"
                            className="rounded-md bg-white px-4 py-2 font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                        >
                            Vehículos
                        </Link>

                        <Link
                            to="/drivers"
                            className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white"
                        >
                            Conductores
                        </Link>
                    </nav>
                </header>

                <DriverForm />

                <section className="rounded-xl bg-white p-6 shadow-sm">
                    <h2 className="mb-5 text-xl font-semibold text-slate-900">
                        Conductores registrados
                    </h2>

                    {isLoading && (
                        <p className="text-slate-600">
                            Cargando conductores...
                        </p>
                    )}

                    {isError && (
                        <p
                            role="alert"
                            className="rounded-md bg-red-50 p-3 text-red-700"
                        >
                            No se pudieron cargar los conductores.
                        </p>
                    )}

                    {!isLoading
                        && !isError
                        && (!drivers || drivers.length === 0) && (
                            <p className="text-slate-600">
                                No hay conductores registrados.
                            </p>
                        )}

                    {!isLoading
                        && !isError
                        && drivers
                        && drivers.length > 0 && (
                            <DriverList drivers={drivers} />
                        )}
                </section>
            </div>
        </main>
    );
}