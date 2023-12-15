import { Fragment } from "react";

import CabinTable from "../features/cabins/CabinTable.jsx";
import CabinTableOperations from "../features/cabins/CabinTableOperations.jsx";
import CreateCabin from "../features/cabins/CreateCabin.jsx";
import Heading from "../ui/Heading.jsx";
import Row from "../ui/Row.jsx";

export default function Cabins() {
    return (
        <Fragment>
            <Row>
                <Heading as="h1">All cabins</Heading>
                <CabinTableOperations />
            </Row>

            <Row type="vertical">
                <CabinTable />
                <CreateCabin />
            </Row>
        </Fragment>
    );
}
