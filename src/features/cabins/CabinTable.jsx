import { useSearchParams } from "react-router-dom";

import { useCabins } from "../../hooks/useCabins.js";
import Menus from "../../ui/Menus.jsx";
import Spinner from "../../ui/Spinner.jsx";
import Table from "../../ui/Table.jsx";
import CabinRow from "./CabinRow.jsx";

export default function CabinTable() {
    const { isLoading, cabins } = useCabins();
    const [searchParams] = useSearchParams();

    if (isLoading) return <Spinner />;

    const filterValue = searchParams.get("show") || "all";

    function getFilteredCabins() {
        if (filterValue === "all") return cabins;

        if (filterValue === "no-discount")
            return cabins.filter((cabin) => cabin.discount === 0);

        if (filterValue === "with-discount")
            return cabins.filter((cabin) => cabin.discount !== 0);
    }

    const filteredCabins = getFilteredCabins();

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
                    data={filteredCabins}
                    render={(cabin) => (
                        <CabinRow cabin={cabin} key={cabin.id} />
                    )}
                />
            </Menus>
        </Table>
    );
}
