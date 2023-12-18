import { useBookings } from "../../hooks/useBookings";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import BookingRow from "./BookingRow";

export default function BookingTable() {
    const { isLoading, bookings } = useBookings();

    if (isLoading) return <Spinner />;

    if (bookings.length === 0) return <Empty resourceName="bookings" />;

    return (
        <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
            <Table.Header>
                <div>Cabin</div>
                <div>Guest</div>
                <div>Dates</div>
                <div>Status</div>
                <div>Amount</div>
                <div></div>
            </Table.Header>

            <Table.Body
                data={bookings}
                render={(booking) => (
                    <BookingRow key={booking.id} booking={booking} />
                )}
            />
        </Table>
    );
}
