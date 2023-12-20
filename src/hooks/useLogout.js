import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { logout as logoutApi } from "../services/apiAuth";

export function useLogout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { isLoading: isLoggingOut, mutate: logout } = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            toast.success("Successfully logged out");
            queryClient.removeQueries();
            navigate("/login", { replace: true });
        },
        onError: (error) => toast.error(error.message),
    });

    return { isLoggingOut, logout };
}
