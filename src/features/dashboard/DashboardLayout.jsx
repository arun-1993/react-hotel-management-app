import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { useCabins } from "../../hooks/useCabins";
import { useRecentBookings } from "../../hooks/useRecentBookings";
import { useRecentStays } from "../../hooks/useRecentStays";
import Spinner from "../../ui/Spinner";
import TodayActivity from "../check-in-out/TodayActivity";
import DurationChart from "./DurationChart";
import SalesChart from "./SalesChart";
import Stats from "./Stats";

const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
`;

export default function DashboardLayout() {
    const [searchParams] = useSearchParams();
    const { isLoading, cabins } = useCabins();
    const { loadingRecentBookings, recentBookings } = useRecentBookings();
    const { loadingRecentStays, confirmedStays } = useRecentStays();

    const numDays = Number(searchParams.get("duration")) || 7;

    if (loadingRecentBookings || loadingRecentStays || isLoading)
        return <Spinner />;

    return (
        <StyledDashboardLayout>
            <Stats
                bookings={recentBookings}
                confirmedStays={confirmedStays}
                numDays={numDays}
                cabinCount={cabins.length}
            />

            <TodayActivity />

            <DurationChart confirmedStays={confirmedStays} />

            <SalesChart bookings={recentBookings} numDays={numDays} />
        </StyledDashboardLayout>
    );
}
