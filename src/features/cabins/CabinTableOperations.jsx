import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

export default function CabinTableOperations() {
    return (
        <TableOperations>
            <Filter
                filterName="show"
                options={[
                    { value: "all", label: "All" },
                    { value: "no-discount", label: "No discount" },
                    { value: "with-discount", label: "With discount" },
                ]}
            />

            <SortBy
                options={[
                    { value: "name-asc", label: "Cabin: A-Z" },
                    { value: "name-desc", label: "Cabin: Z-A" },
                    {
                        value: "maxCapacity-asc",
                        label: "Capacity: Low to High",
                    },
                    {
                        value: "maxCapacity-desc",
                        label: "Capacity: High to Low",
                    },
                    { value: "regularPrice-asc", label: "Price: Low to High" },
                    { value: "regularPrice-desc", label: "Price: High to Low" },
                    { value: "discount-asc", label: "Discount: Low to High" },
                    { value: "discount-desc", label: "Discount: High to Low" },
                ]}
            />
        </TableOperations>
    );
}
