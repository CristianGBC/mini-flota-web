import type { Vehicle } from "../types/vehicle";

type VehicleTableProps = {
    vehicles: Vehicle[];
};

export function VehicleTable({
    vehicles,
}: VehicleTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-slate-200">
                <thead className="bg-slate-100">
                    <tr>
                        <th className="border-b px-4 py-3 text-left">
                            Placa
                        </th>

                        <th className="border-b px-4 py-3 text-left">
                            Marca
                        </th>

                        <th className="border-b px-4 py-3 text-left">
                            Modelo
                        </th>

                        <th className="border-b px-4 py-3 text-left">
                            Año
                        </th>

                        <th className="border-b px-4 py-3 text-left">
                            Capacidad
                        </th>

                        <th className="border-b px-4 py-3 text-left">
                            Estado
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {vehicles.map((vehicle) => (
                        <tr
                            key={vehicle.id}
                            className="hover:bg-slate-50"
                        >
                            <td className="border-b px-4 py-3">
                                {vehicle.plate}
                            </td>

                            <td className="border-b px-4 py-3">
                                {vehicle.brand}
                            </td>

                            <td className="border-b px-4 py-3">
                                {vehicle.model}
                            </td>

                            <td className="border-b px-4 py-3">
                                {vehicle.year}
                            </td>

                            <td className="border-b px-4 py-3">
                                {vehicle.capacity_kg} kg
                            </td>

                            <td className="border-b px-4 py-3">
                                <span
                                    className={
                                        vehicle.status === "active"
                                            ? "rounded bg-green-100 px-2 py-1 text-sm text-green-700"
                                            : "rounded bg-red-100 px-2 py-1 text-sm text-red-700"
                                    }
                                >
                                    {vehicle.status === "active"
                                        ? "Activo"
                                        : "Inactivo"}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}