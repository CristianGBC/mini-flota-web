import type { Driver } from "../../drivers/types/driver";

export type Vehicle = {
    id: string;
    plate: string;
    brand: string;
    model: string;
    year: number;
    capacity_kg: number;
    status: "active" | "inactive";
    driver: Driver | null;
};

export type VehicleCreate = {
    plate: string;
    brand: string;
    model: string;
    year: number;
    capacity_kg: number;
    status: "active" | "inactive";
};