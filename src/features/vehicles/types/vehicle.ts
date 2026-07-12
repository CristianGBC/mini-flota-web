export type Vehicle = {
    id: string;
    plate: string;
    brand: string;
    model: string;
    year: number;
    capacity_kg: number;
    status: "active" | "inactive";
};

export type VehicleCreate = {
    plate: string;
    brand: string;
    model: string;
    year: number;
    capacity_kg: number;
    status: "active" | "inactive";
};