import { Fragment } from "react";

import BookingTable from "../features/bookings/BookingTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

export default function Bookings() {
    return (
        <Fragment>
            <Row>
                <Heading as="h1">Bookings</Heading>
            </Row>

            <Row type="vertical">
                <BookingTable />
            </Row>
        </Fragment>
    );
}
