import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";

import { getStaysAfterDate } from "../services/apiBookings";

export function useRecentStays() {
    const [searchParams] = useSearchParams();

    const numDays = Number(searchParams.get("duration")) || 7;
    const queryDate = subDays(new Date(), numDays).toISOString();

    const { isLoading: loadingRecentStays, data: confirmedStays } = useQuery({
        queryFn: () => getStaysAfterDate(queryDate),
        queryKey: ["stays", `last-${numDays}`],
    });

    return { loadingRecentStays, confirmedStays };
}
