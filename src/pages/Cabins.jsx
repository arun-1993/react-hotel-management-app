import { Fragment } from "react";

import CabinTable from "../features/cabins/CabinTable.jsx";
import Heading from "../ui/Heading.jsx";
import Row from "../ui/Row.jsx";

export default function Cabins() {
    return (
        <Fragment>
            <Row>
                <Heading as="h1">All cabins</Heading>
                <p>Filter/Sort</p>
            </Row>

            <Row type="vertical">
                <CabinTable />
            </Row>
        </Fragment>
    );
}
