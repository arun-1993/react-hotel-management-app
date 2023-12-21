import { createContext, useContext, useEffect } from "react";

import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(
        false,
        "isDarkMode"
    );

    useEffect(
        function () {
            if (isDarkMode) {
                document.documentElement.classList.remove("light-mode");
                document.documentElement.classList.add("dark-mode");
            } else {
                document.documentElement.classList.remove("dark-mode");
                document.documentElement.classList.add("light-mode");
            }
        },
        [isDarkMode]
    );

    function toggleDarkMode() {
        setIsDarkMode((isDarkMode) => !isDarkMode);
    }

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
}

export function useDarkMode() {
    const context = useContext(DarkModeContext);

    if (context === undefined)
        throw new Error("DarkModeContext was used outside of DarkModeProvider");

    return context;
}
