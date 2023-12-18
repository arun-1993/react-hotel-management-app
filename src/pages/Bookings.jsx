import { Fragment } from "react";

import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

export default function Bookings() {
    return (
        <Fragment>
            <Row>
                <Heading as="h1">Bookings</Heading>
                <BookingTableOperations />
            </Row>

            <Row type="vertical">
                <BookingTable />
            </Row>
        </Fragment>
    );
}
