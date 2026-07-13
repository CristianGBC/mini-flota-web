import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { assignDriver } from "../api/vehicles";


type AssignDriverVariables = {
    vehicleId: string;
    driverId: string;
};


export function useAssignDriver() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            vehicleId,
            driverId,
        }: AssignDriverVariables) => {
            return assignDriver(vehicleId, driverId);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["vehicles"],
            });

            await queryClient.invalidateQueries({
                queryKey: ["drivers"],
            });
        },
    });
}