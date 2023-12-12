import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateSetting as update } from "../services/apiSettings";

export function useUpdateSetting() {
    const queryClient = useQueryClient();

    const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
        mutationFn: update,
        onSuccess: () => {
            toast.success("Setting updated");
            queryClient.invalidateQueries({ queryKey: ["settings"] });
        },
        onError: (error) => toast.error(error.message),
    });

    return { isUpdating, updateSetting };
}
