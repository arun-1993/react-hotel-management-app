import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { login as loginApi } from "../services/apiAuth";

export function useLogin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { isLoading: isLoggingIn, mutate: login } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),
        onSuccess: (data) => {
            toast.success("Successfully logged in");
            queryClient.invalidateQueries({ queryKey: ["user"] });
            queryClient.setQueryData(["user"], data.user);
            navigate("/dashboard");
        },
        onError: (error) => toast.error(error.message),
    });

    return { isLoggingIn, login };
}
