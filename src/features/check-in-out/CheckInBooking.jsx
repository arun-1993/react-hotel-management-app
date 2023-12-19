import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";

import { useBooking } from "../../hooks/useBooking";
import { useCheckIn } from "../../hooks/useCheckIn";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useSettings } from "../../hooks/useSettings";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";
import BookingDataBox from "../bookings/BookingDataBox";

const Box = styled.div`
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

export default function CheckInBooking() {
    const [confirmPaid, setConfirmPaid] = useState(false);
    const [addBreakfast, setAddBreakfast] = useState(false);
    const moveBack = useMoveBack();
    const { isLoading: loadingBooking, booking } = useBooking();
    const { isLoading: loadingSettings, settings } = useSettings();
    const { isCheckingIn, checkIn } = useCheckIn();

    useEffect(
        () => setConfirmPaid(booking?.isPaid ?? false),
        [booking?.isPaid]
    );

    if (loadingBooking || loadingSettings) return <Spinner />;

    const {
        id: bookingId,
        guests,
        totalPrice,
        numGuests,
        hasBreakfast,
        numNights,
    } = booking;
    const optionalBreakfastPrice =
        numGuests * numNights * settings.breakfastPrice;

    function handleCheckin() {
        if (!confirmPaid) return;

        if (addBreakfast) {
            checkIn({
                bookingId,
                breakfast: {
                    hasBreakfast: true,
                    extrasPrice: optionalBreakfastPrice,
                    totalPrice: totalPrice + optionalBreakfastPrice,
                },
            });
        } else {
            checkIn({ bookingId, breakfast: {} });
        }
    }

    return (
        <Fragment>
            <Row>
                <Heading as="h1">Check in booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            {!hasBreakfast && (
                <Box>
                    <Checkbox
                        id="breakfast"
                        checked={addBreakfast}
                        onChange={() => {
                            setAddBreakfast((addBreakfast) => !addBreakfast);
                            setConfirmPaid(false);
                        }}
                    >
                        Include breakfast for{" "}
                        {formatCurrency(optionalBreakfastPrice)}
                    </Checkbox>
                </Box>
            )}

            <Box>
                <Checkbox
                    id="confirm"
                    checked={confirmPaid}
                    onChange={() =>
                        setConfirmPaid((confirmPaid) => !confirmPaid)
                    }
                    disabled={confirmPaid || isCheckingIn}
                >
                    I confirm that {guests.fullName} has made the payment of{" "}
                    {!addBreakfast
                        ? formatCurrency(totalPrice)
                        : `${formatCurrency(
                              totalPrice + optionalBreakfastPrice
                          )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                              optionalBreakfastPrice
                          )})`}{" "}
                    in full
                </Checkbox>
            </Box>

            <ButtonGroup>
                <Button
                    onClick={handleCheckin}
                    disabled={!confirmPaid || isCheckingIn}
                >
                    Check in booking #{bookingId}
                </Button>
                <Button $variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </Fragment>
    );
}
