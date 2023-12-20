import { Fragment } from "react";

import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";

export default function Users() {
    return (
        <Fragment>
            <Heading as="h1">Create a new user</Heading>
            <SignupForm />
        </Fragment>
    );
}
