import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLogin } from "../../hooks/useLogin";
import { useUser } from "../../hooks/useUser";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";
import FullPage from "../../ui/FullPage";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import SpinnerMini from "../../ui/SpinnerMini";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { isLoggingIn, login } = useLogin();
    const { isLoadingUser, isAuthenticated } = useUser();

    useEffect(
        function () {
            if (isAuthenticated) navigate("/");
        },
        [isAuthenticated, navigate]
    );

    if (isLoadingUser)
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        );

    function handleSubmit(e) {
        e.preventDefault();

        if (!email || !password) return;

        login(
            { email, password },
            {
                onSettled: () => {
                    setEmail("");
                    setPassword("");
                },
            }
        );
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormRowVertical label="Email address">
                <Input
                    type="email"
                    id="email"
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoggingIn}
                />
            </FormRowVertical>
            <FormRowVertical label="Password">
                <Input
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoggingIn}
                />
            </FormRowVertical>
            <FormRowVertical>
                <Button size="large" disabled={isLoggingIn}>
                    {isLoggingIn ? <SpinnerMini /> : "Login"}
                </Button>
            </FormRowVertical>
        </Form>
    );
}
