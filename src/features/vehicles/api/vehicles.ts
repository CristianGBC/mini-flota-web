import { axiosInstance } from "../../../api/axiosInstance";

import type {
    Vehicle,
    VehicleCreate,
} from "../types/vehicle";

export async function getVehicles(): Promise<Vehicle[]> {
    const response = await axiosInstance.get<Vehicle[]>(
        "/vehicles/",
    );

    return response.data;
}

export async function createVehicle(
    vehicle: VehicleCreate,
): Promise<Vehicle> {
    const response = await axiosInstance.post<Vehicle>(
        "/vehicles/",
        vehicle,
    );

    return response.data;
}