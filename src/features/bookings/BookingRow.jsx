import { format, isToday } from "date-fns";
import { HiArrowDownOnSquare, HiEye } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Stacked = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    & span:first-child {
        font-weight: 500;
    }

    & span:last-child {
        color: var(--color-grey-500);
        font-size: 1.2rem;
    }
`;

const Amount = styled.div`
    font-family: "Sono";
    font-weight: 500;
`;

export default function BookingRow({ booking }) {
    const navigate = useNavigate();

    const {
        startDate,
        endDate,
        numNights,
        totalPrice,
        status,
        guests: { fullName: guestName, email },
        cabins: { name: cabinName },
    } = booking;

    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };

    return (
        <Table.Row>
            <Cabin>{cabinName}</Cabin>

            <Stacked>
                <span>{guestName}</span>
                <span>{email}</span>
            </Stacked>

            <Stacked>
                <span>
                    {isToday(new Date(startDate))
                        ? "Today"
                        : formatDistanceFromNow(startDate)}{" "}
                    &rarr; {numNights} {numNights === 1 ? "night" : "nights"}{" "}
                    stay
                </span>

                <span>
                    {format(new Date(startDate), "MMM dd, yyyy")} &mdash;{" "}
                    {format(new Date(endDate), "MMM dd, yyyy")}
                </span>
            </Stacked>

            <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

            <Amount>{formatCurrency(totalPrice)}</Amount>

            <Menus.Menu>
                <Menus.Toggle menuId={booking.id} />

                <Menus.List menuId={booking.id}>
                    <Menus.Button
                        icon={<HiEye />}
                        onClick={() => navigate(`/bookings/${booking.id}`)}
                    >
                        View details
                    </Menus.Button>

                    {status === "unconfirmed" && (
                        <Menus.Button
                            icon={<HiArrowDownOnSquare />}
                            onClick={() => navigate(`/checkin/${booking.id}`)}
                        >
                            Check in
                        </Menus.Button>
                    )}
                </Menus.List>
            </Menus.Menu>
        </Table.Row>
    );
}
