import { HiArrowRightOnRectangle } from "react-icons/hi2";

import { useLogout } from "../../hooks/useLogout";
import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";

export default function Logout() {
    const { isLoggingOut, logout } = useLogout();

    return (
        <ButtonIcon onClick={logout} disabled={isLoggingOut}>
            {isLoggingOut ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
        </ButtonIcon>
    );
}
