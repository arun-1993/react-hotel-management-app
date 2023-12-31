import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useBooking } from "../../hooks/useBooking";
import { useCheckOut } from "../../hooks/useCheckOut";
import { useDeleteBooking } from "../../hooks/useDeleteBooking";
import { useMoveBack } from "../../hooks/useMoveBack";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";
import Heading from "../../ui/Heading";
import Modal from "../../ui/Modal";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import Tag from "../../ui/Tag";
import BookingDataBox from "./BookingDataBox";

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

export default function BookingDetail() {
    const { isLoading, booking } = useBooking();
    const { checkOut, isCheckingOut } = useCheckOut();
    const { deleteBooking, isDeletingBooking } = useDeleteBooking();
    const moveBack = useMoveBack();
    const navigate = useNavigate();

    if (isLoading) return <Spinner />;

    if (!booking) return <Empty resourceName="booking" />;

    const { id, status } = booking;
    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };

    return (
        <Fragment>
            <Row>
                <HeadingGroup>
                    <Heading as="h1">Booking #{id}</Heading>
                    <Tag type={statusToTagName[status]}>
                        {status.replace("-", " ")}
                    </Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <ButtonGroup>
                {status === "unconfirmed" && (
                    <Button onClick={() => navigate(`/checkin/${booking.id}`)}>
                        Check in
                    </Button>
                )}

                {status === "checked-in" && (
                    <Button
                        onClick={() => checkOut(id)}
                        disabled={isCheckingOut}
                    >
                        Check out
                    </Button>
                )}

                <Modal>
                    <Modal.Toggle target="deleteBooking">
                        <Button $variation="danger">Delete</Button>
                    </Modal.Toggle>

                    <Modal.Window name="deleteBooking">
                        <ConfirmDelete
                            resourceName="booking"
                            onConfirm={() => {
                                deleteBooking(id, { onSuccess: moveBack });
                            }}
                            disabled={isDeletingBooking}
                        />
                    </Modal.Window>
                </Modal>

                <Button $variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </Fragment>
    );
}
