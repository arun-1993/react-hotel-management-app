import { format, isToday } from "date-fns";
import {
    HiArrowDownOnSquare,
    HiArrowUpOnSquare,
    HiEye,
    HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useCheckOut } from "../../hooks/useCheckOut";
import { useDeleteBooking } from "../../hooks/useDeleteBooking";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
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
    const { checkOut, isCheckingOut } = useCheckOut();
    const { deleteBooking, isDeletingBooking } = useDeleteBooking();

    const {
        id: bookingId,
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

            <Modal>
                <Menus.Menu>
                    <Menus.Toggle menuId={bookingId} />

                    <Menus.List menuId={bookingId}>
                        <Menus.Button
                            icon={<HiEye />}
                            onClick={() => navigate(`/bookings/${bookingId}`)}
                        >
                            View details
                        </Menus.Button>

                        {status === "unconfirmed" && (
                            <Menus.Button
                                icon={<HiArrowDownOnSquare />}
                                onClick={() =>
                                    navigate(`/checkin/${bookingId}`)
                                }
                            >
                                Check in
                            </Menus.Button>
                        )}

                        {status === "checked-in" && (
                            <Menus.Button
                                icon={<HiArrowUpOnSquare />}
                                onClick={() => checkOut(bookingId)}
                                disabled={isCheckingOut}
                            >
                                Check out
                            </Menus.Button>
                        )}

                        <Modal.Toggle target="deleteBooking">
                            <Menus.Button
                                icon={<HiTrash />}
                                disabled={isDeletingBooking}
                            >
                                Delete
                            </Menus.Button>
                        </Modal.Toggle>
                    </Menus.List>
                </Menus.Menu>

                <Modal.Window name="deleteBooking">
                    <ConfirmDelete
                        resourceName="booking"
                        onConfirm={() => deleteBooking(bookingId)}
                        disabled={isDeletingBooking}
                    />
                </Modal.Window>
            </Modal>
        </Table.Row>
    );
}
