import { Fragment } from "react";

import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

export default function Dashboard() {
    return (
        <Fragment>
            <Row>
                <Heading as="h1">Dashboard</Heading>
                <DashboardFilter />
            </Row>

            <DashboardLayout />
        </Fragment>
    );
}
