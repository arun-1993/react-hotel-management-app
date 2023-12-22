import { Fragment } from "react";
import {
    HiOutlineBanknotes,
    HiOutlineBriefcase,
    HiOutlineCalendarDays,
    HiOutlineChartBar,
} from "react-icons/hi2";

import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";

export default function Stats({
    bookings,
    confirmedStays,
    numDays,
    cabinCount,
}) {
    const bookingCount = bookings.length;
    const totalCheckins = confirmedStays.length;
    const totalSales = bookings.reduce(
        (totalPrice, booking) => totalPrice + booking.totalPrice,
        0
    );
    const occupancyRate =
        confirmedStays.reduce(
            (totalDays, confirmedStay) => totalDays + confirmedStay.numNights,
            0
        ) /
        (numDays * cabinCount);

    return (
        <Fragment>
            <Stat
                icon={<HiOutlineBriefcase />}
                title="Bookings"
                value={bookingCount}
                color="blue"
            />

            <Stat
                icon={<HiOutlineCalendarDays />}
                title="Check-Ins"
                value={totalCheckins}
                color="indigo"
            />

            <Stat
                icon={<HiOutlineBanknotes />}
                title="Sales"
                value={formatCurrency(totalSales)}
                color="green"
            />

            <Stat
                icon={<HiOutlineChartBar />}
                title="Occupancy Rate"
                value={`${Math.round(occupancyRate * 100)}%`}
                color="yellow"
            />
        </Fragment>
    );
}
