import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import styled from "styled-components";

import { useDarkMode } from "../../context/DarkModeContext";
import Heading from "../../ui/Heading";
import DashboardBox from "./DashboardBox";

const StyledSalesChart = styled(DashboardBox)`
    grid-column: 1 / -1;

    & .recharts-cartesian-grid-horizontal line,
    & .recharts-cartesian-grid-vertical line {
        stroke: var(--color-grey-300);
    }
`;

export default function SalesChart({ bookings, numDays }) {
    const { isDarkMode } = useDarkMode();

    const dateList = eachDayOfInterval({
        start: subDays(new Date(), numDays - 1),
        end: new Date(),
    });

    const data = dateList.map((date) => ({
        label: format(date, "MMM dd"),
        totalSales: bookings
            .filter((booking) => isSameDay(date, new Date(booking.created_at)))
            .reduce((total, booking) => total + booking.totalPrice, 0),
        extrasSales: bookings
            .filter((booking) => isSameDay(date, new Date(booking.created_at)))
            .reduce((total, booking) => total + booking.extrasPrice, 0),
    }));

    const colors = isDarkMode
        ? {
              totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
              extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
              text: "#e5e7eb",
              background: "#18212f",
          }
        : {
              totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
              extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
              text: "#374151",
              background: "#fff",
          };

    return (
        <StyledSalesChart>
            <Heading as="h2">
                Sales from {format(dateList.at(0), "MMM dd, yyyy")} &mdash;{" "}
                {format(dateList.at(-1), "MMM dd, yyyy")}
            </Heading>
            <ResponsiveContainer height={300} width="100%">
                <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="4" />

                    <XAxis
                        dataKey="label"
                        tick={{ fill: colors.text }}
                        tickLine={{ stroke: colors.text }}
                    />

                    <YAxis
                        unit="$"
                        tick={{ fill: colors.text }}
                        tickLine={{ stroke: colors.text }}
                    />

                    <Tooltip
                        contentStyle={{ backgroundColor: colors.background }}
                    />

                    <Area
                        dataKey="totalSales"
                        type="monotone"
                        strokeWidth={2}
                        stroke={colors.totalSales.stroke}
                        fill={colors.totalSales.fill}
                        name="Total sales"
                        unit="$"
                    />

                    <Area
                        dataKey="extrasSales"
                        type="monotone"
                        strokeWidth={2}
                        stroke={colors.extrasSales.stroke}
                        fill={colors.extrasSales.fill}
                        name="Extras sales"
                        unit="$"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </StyledSalesChart>
    );
}
