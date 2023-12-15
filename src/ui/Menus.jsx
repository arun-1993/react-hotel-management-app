import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";

import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const StyledToggle = styled.button`
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    transform: translateX(0.8rem);
    transition: all 0.2s;

    &:hover {
        background-color: var(--color-grey-100);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        color: var(--color-grey-700);
    }
`;

const StyledList = styled.ul`
    position: fixed;

    background-color: var(--color-grey-0);
    box-shadow: var(--shadow-md);
    border-radius: var(--border-radius-md);

    right: ${(props) => props.$position.x}px;
    top: ${(props) => props.$position.y}px;
`;

const StyledButton = styled.button`
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    padding: 1.2rem 2.4rem;
    font-size: 1.4rem;
    transition: all 0.2s;

    display: flex;
    align-items: center;
    gap: 1.6rem;

    &:hover {
        background-color: var(--color-grey-50);
    }

    & svg {
        width: 1.6rem;
        height: 1.6rem;
        color: var(--color-grey-400);
        transition: all 0.3s;
    }
`;

const MenuContext = createContext();

export default function Menus({ children }) {
    const [openMenuId, setOpenMenuId] = useState("");
    const [menuPosition, setMenuPosition] = useState(null);

    const openMenu = setOpenMenuId;
    const closeMenu = () => setOpenMenuId("");

    return (
        <MenuContext.Provider
            value={{
                openMenuId,
                openMenu,
                closeMenu,
                menuPosition,
                setMenuPosition,
            }}
        >
            {children}
        </MenuContext.Provider>
    );
}

function Toggle({ menuId }) {
    const { openMenuId, openMenu, closeMenu, setMenuPosition } =
        useContext(MenuContext);

    function handleClick(e) {
        const position = e.target.closest("button").getBoundingClientRect();

        setMenuPosition({
            x: window.innerWidth - position.width - position.x,
            y: position.height + position.y + 8,
        });

        if (openMenuId === "" || openMenuId !== menuId) openMenu(menuId);
        else closeMenu();

        e.stopPropagation();
    }

    return (
        <StyledToggle onClick={handleClick}>
            <HiEllipsisVertical />
        </StyledToggle>
    );
}

function List({ menuId, children }) {
    const { openMenuId, closeMenu, menuPosition } = useContext(MenuContext);
    const ref = useOutsideClick(closeMenu, false);

    if (openMenuId !== menuId) return null;

    return createPortal(
        <StyledList $position={menuPosition} ref={ref}>
            {children}
        </StyledList>,
        document.body
    );
}

function Button({ icon, disabled = false, onClick, children }) {
    const { closeMenu } = useContext(MenuContext);

    function handleClick() {
        onClick?.();
        closeMenu();
    }

    return (
        <li>
            <StyledButton disabled={disabled} onClick={handleClick}>
                {icon} {<span>{children}</span>}
            </StyledButton>
        </li>
    );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
