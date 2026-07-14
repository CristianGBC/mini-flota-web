import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { createDriver } from "../api/drivers";


export function useCreateDriver() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createDriver,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["drivers"],
            });
        },
    });
}