import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../hooks/useUser";
import FullPage from "./FullPage";
import Spinner from "./Spinner";

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const { isFetchingUser, isAuthenticated } = useUser();

    useEffect(
        function () {
            if (!isFetchingUser && !isAuthenticated) return navigate("/login");
        },
        [isFetchingUser, isAuthenticated, navigate]
    );

    if (isFetchingUser)
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        );

    if (isAuthenticated) return children;
}
