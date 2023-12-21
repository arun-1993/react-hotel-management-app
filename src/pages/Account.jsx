import { Fragment } from "react";

import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

export default function Account() {
    return (
        <Fragment>
            <Heading as="h1">Update your account</Heading>

            <Row type="vertical">
                <Heading as="h3">Update user data</Heading>
                <UpdateUserDataForm />
            </Row>

            <Row type="vertical">
                <Heading as="h3">Update password</Heading>
                <UpdatePasswordForm />
            </Row>
        </Fragment>
    );
}
