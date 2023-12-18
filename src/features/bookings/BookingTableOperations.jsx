import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

export default function BookingTableOperations() {
    return (
        <TableOperations>
            <Filter
                filterName="status"
                options={[
                    { value: "all", label: "All" },
                    { value: "checked-in", label: "Checked in" },
                    { value: "checked-out", label: "Checked out" },
                    { value: "unconfirmed", label: "Unconfirmed" },
                ]}
            />

            <SortBy
                options={[
                    {
                        value: "startDate-asc",
                        label: "Start Date: Earliest First",
                    },
                    {
                        value: "startDate-desc",
                        label: "Start Date: Latest First",
                    },
                    {
                        value: "totalPrice-asc",
                        label: "Price: Low to High",
                    },
                    {
                        value: "totalPrice-desc",
                        label: "Price: High to Low",
                    },
                ]}
            />
        </TableOperations>
    );
}
