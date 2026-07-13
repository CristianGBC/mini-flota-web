import { axiosInstance } from "../../../api/axiosInstance";

import type {
    Driver,
    DriverCreate,
} from "../types/driver";


export async function getDrivers(): Promise<Driver[]> {
    const response = await axiosInstance.get<Driver[]>(
        "/drivers/",
    );

    return response.data;
}


export async function createDriver(driver: DriverCreate): Promise<Driver> {
    const response = await axiosInstance.post<Driver>(
        "/drivers/",
        driver,
    );

    return response.data;
}