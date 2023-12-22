import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";

import { getBookingsAfterDate } from "../services/apiBookings";

export function useRecentBookings() {
    const [searchParams] = useSearchParams();

    const numDays = Number(searchParams.get("duration")) || 7;
    const queryDate = subDays(new Date(), numDays).toISOString();

    const { isLoading: loadingRecentBookings, data: recentBookings } = useQuery(
        {
            queryFn: () => getBookingsAfterDate(queryDate),
            queryKey: ["bookings", `last-${numDays}`],
        }
    );

    return { loadingRecentBookings, recentBookings };
}
