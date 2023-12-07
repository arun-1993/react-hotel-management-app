import { Fragment, useState } from "react";

import CabinTable from "../features/cabins/CabinTable.jsx";
import CreateCabinForm from "../features/cabins/CreateCabinForm.jsx";
import Button from "../ui/Button.jsx";
import Heading from "../ui/Heading.jsx";
import Row from "../ui/Row.jsx";

export default function Cabins() {
    const [showForm, setShowForm] = useState(false);

    return (
        <Fragment>
            <Row>
                <Heading as="h1">All cabins</Heading>
                <p>Filter/Sort</p>
            </Row>

            <Row type="vertical">
                <CabinTable />
                <Button onClick={() => setShowForm((showForm) => !showForm)}>
                    Add new cabin
                </Button>
                {showForm && <CreateCabinForm />}
            </Row>
        </Fragment>
    );
}
