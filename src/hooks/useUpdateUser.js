import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateCurrentUser } from "../services/apiAuth";

export function useUpdateUser() {
    const queryClient = useQueryClient();

    const { isLoading: isUpdatingUser, mutate: updateUser } = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: () => {
            toast.success("Account successfully updated");
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
        onError: (error) => toast.error(error.message),
    });

    return { isUpdatingUser, updateUser };
}
