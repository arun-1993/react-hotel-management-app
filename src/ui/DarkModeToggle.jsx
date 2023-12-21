import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

import { useDarkMode } from "../context/DarkModeContext";
import ButtonIcon from "./ButtonIcon";

export default function DarkModeToggle() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    return (
        <ButtonIcon
            onClick={toggleDarkMode}
            title={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
        >
            {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
        </ButtonIcon>
    );
}
