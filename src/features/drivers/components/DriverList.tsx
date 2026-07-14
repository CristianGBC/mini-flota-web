import type { Driver } from "../types/driver";


type DriverListProps = {
    drivers: Driver[];
};


export function DriverList({ drivers }: DriverListProps) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-slate-200">
                <thead className="bg-slate-100">
                    <tr>
                        <th className="border-b px-4 py-3 text-left">
                            Nombre
                        </th>

                        <th className="border-b px-4 py-3 text-left">
                            Licencia
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {drivers.map((driver) => (
                        <tr
                            key={driver.id}
                            className="hover:bg-slate-50"
                        >
                            <td className="border-b px-4 py-3">
                                {driver.name}
                            </td>

                            <td className="border-b px-4 py-3">
                                {driver.license}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}