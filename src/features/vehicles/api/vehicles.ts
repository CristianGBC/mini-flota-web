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

export async function assignDriver(
    vehicleId: string,
    driverId: string,
): Promise<Vehicle> {
    const response = await axiosInstance.put<Vehicle>(
        `/vehicles/${vehicleId}/driver`,
        {
            driver_id: driverId,
        },
    );

    return response.data;
}