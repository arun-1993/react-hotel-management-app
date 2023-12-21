import styled from "styled-components";

import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
    text-align: center;
`;

const Img = styled.img`
    height: 9.6rem;
    width: auto;
`;

export default function Logo() {
    const { isDarkMode } = useDarkMode();

    const imageSource = `/logo-${isDarkMode ? "dark" : "light"}.png`;

    return (
        <StyledLogo>
            <Img src={imageSource} />
        </StyledLogo>
    );
}
