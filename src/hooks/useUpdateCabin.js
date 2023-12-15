import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createUpdateCabin } from "../services/apiCabins";

export function useUpdateCabin() {
    const queryClient = useQueryClient();

    const { isLoading: isUpdating, mutate: updateCabin } = useMutation({
        mutationFn: ({ cabin, id }) => createUpdateCabin(cabin, id),
        onSuccess: () => {
            toast.success("Cabin successfully edited");
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
        },
        onError: (error) => toast.error(error.message),
    });

    return { isUpdating, updateCabin };
}
