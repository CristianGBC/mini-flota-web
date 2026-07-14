import { useQuery } from "@tanstack/react-query";

import { getDrivers } from "../api/drivers";


export function useDrivers() {
    return useQuery({
        queryKey: ["drivers"],
        queryFn: getDrivers,
    });
}