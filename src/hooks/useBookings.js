import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getBookings } from "../services/apiBookings";

export function useBookings() {
    const [searchParams] = useSearchParams();

    const filterValue = searchParams.get("status");
    const filter =
        !filterValue || filterValue === "all"
            ? null
            : { field: "status", value: filterValue };

    const sortByParams = searchParams.get("sortBy") || "startDate-asc";
    const [field, direction] = sortByParams.split("-");
    const sortBy = { field, direction };

    const page = Number(searchParams.get("page")) || 1;

    const {
        isLoading,
        data: { data: bookings, count } = {},
        error,
    } = useQuery({
        queryKey: ["bookings", filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page }),
    });

    return { isLoading, bookings, count, error };
}
