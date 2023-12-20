import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { signup as signupApi } from "../services/apiAuth";

export function useSignup() {
    const { isLoading: isSigningUp, mutate: signup } = useMutation({
        mutationFn: signupApi,
        onSuccess: () =>
            toast.success(
                "Account successfully created! Please verify the new account"
            ),
        onError: (error) => toast.error(error.message),
    });

    return { isSigningUp, signup };
}
