import type { Driver } from "../../drivers/types/driver";
import type { Vehicle } from "../types/vehicle";
import { AssignDriverControl } from "./AssignDriverControl";

type VehicleTableProps = {
    vehicles: Vehicle[];
    drivers: Driver[];
    assignedDriverIds: Set<string>;
};

export function VehicleTable({
    vehicles,
    drivers,
    assignedDriverIds,
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

                        <th className="border-b px-4 py-3 text-left">
                            Conductor
                        </th>

                        <th className="border-b px-4 py-3 text-left">
                            Asignación
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {vehicles.map((vehicle) => {
                        const availableDrivers = drivers.filter(
                            (driver) => {
                                const isCurrentDriver =
                                    driver.id === vehicle.driver?.id;

                                const isAlreadyAssigned =
                                    assignedDriverIds.has(driver.id);

                                return (
                                    !isAlreadyAssigned
                                    || isCurrentDriver
                                );
                            },
                        );

                        return (
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

                                <td className="border-b px-4 py-3">
                                    {vehicle.driver ? (
                                        <div>
                                            <p className="font-medium text-slate-900">
                                                {vehicle.driver.name}
                                            </p>

                                            <p className="text-sm text-slate-500">
                                                {vehicle.driver.license}
                                            </p>
                                        </div>
                                    ) : (
                                        <span className="text-slate-500">
                                            Sin conductor
                                        </span>
                                    )}
                                </td>

                                <td className="border-b px-4 py-3">
                                    <AssignDriverControl
                                        vehicleId={vehicle.id}
                                        currentDriverId={
                                            vehicle.driver?.id ?? null
                                        }
                                        drivers={availableDrivers}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}