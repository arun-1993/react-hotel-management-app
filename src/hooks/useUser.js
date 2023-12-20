import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "../services/apiAuth";

export function useUser() {
    const {
        isLoading: isLoadingUser,
        data: user,
        isFetching: isFetchingUser,
    } = useQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser,
    });

    return {
        isLoadingUser,
        isAuthenticated: user?.role === "authenticated",
        isFetchingUser,
        user,
    };
}
