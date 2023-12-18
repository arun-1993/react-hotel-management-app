import { useSearchParams } from "react-router-dom";

import { useCabins } from "../../hooks/useCabins.js";
import Empty from "../../ui/Empty.jsx";
import Menus from "../../ui/Menus.jsx";
import Spinner from "../../ui/Spinner.jsx";
import Table from "../../ui/Table.jsx";
import CabinRow from "./CabinRow.jsx";

export default function CabinTable() {
    const { isLoading, cabins } = useCabins();
    const [searchParams] = useSearchParams();

    if (isLoading) return <Spinner />;

    if (cabins.length === 0) return <Empty resourceName="cabins" />;

    // Filter Cabins
    const filterValue = searchParams.get("show") || "all";

    function getFilteredCabins() {
        if (filterValue === "all") return cabins;

        if (filterValue === "no-discount")
            return cabins.filter((cabin) => cabin.discount === 0);

        if (filterValue === "with-discount")
            return cabins.filter((cabin) => cabin.discount !== 0);
    }

    const filteredCabins = getFilteredCabins();

    //Sort Cabins
    const sortBy = searchParams.get("sortBy") || "name-asc";
    const [field, direction] = sortBy.split("-");
    const modifier = direction === "asc" ? 1 : -1;
    const sortedCabins = filteredCabins.sort(
        (a, b) => (a[field] - b[field]) * modifier
    );

    return (
        <Table role="table" columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
            <Table.Header role="row">
                <div></div>
                <div>Cabin</div>
                <div>Capacity</div>
                <div>Price</div>
                <div>Discount</div>
                <div></div>
            </Table.Header>

            <Menus>
                <Table.Body
                    data={sortedCabins}
                    render={(cabin) => (
                        <CabinRow cabin={cabin} key={cabin.id} />
                    )}
                />
            </Menus>
        </Table>
    );
}
