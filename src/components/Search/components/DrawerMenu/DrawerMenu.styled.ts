import { Colors } from "src/enums/colors.enum";
import svg from "react-inlinesvg";
import styled, { css } from "styled-components";
import { Breakpoint } from "src/enums/breakpoint.enum";
import { Link } from "react-router-dom";
import { FontWeight } from "src/enums/fontWeight.enum";

interface SharedProps {
  isOpen?: boolean;
}

interface MenuItemProps {
  $isDisabled: boolean;
}

export const Overlay = styled.div<SharedProps>`
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ isOpen }) =>
    isOpen ? `${Colors.DeepDarkBlueOpacity}` : "transparent"};
  z-index: 1;
  transition: background-color 0.15s ease-in-out 0s;

  @media ${Breakpoint.Desktop} {
    display: none;
  }
`;

export const Wrapper = styled.div<SharedProps>`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 3;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${Colors.DeepDarkBlue};
  padding: 30px;
  padding-bottom: 40px;
  transition: transform 0.3s cubic-bezier(0.64, 0, 0.78, 0);
  transform: translateX(-102%);

  ${({ isOpen }) =>
    isOpen &&
    css`
      transform: translateX(0);
      transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    `}
  @media ${Breakpoint.TabletS} {
    width: 45vw;
  }

  @media ${Breakpoint.Desktop} {
    display: none;
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  right: 12px;
  top: 12px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  transition: 0.2s;
  fill: ${Colors.White};

  :hover {
    background-color: ${Colors.LightGray};
    fill: ${Colors.DarkerBlue};
  }
`;

export const CloseIcon = styled(svg)`
  height: 24px;
  width: 24px;
`;

export const MenuItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 90px;
  color: ${Colors.White};
`;

export const RegionalSettingsMenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: 0.2s;
  padding-bottom: 8px;
  border-bottom: 2px solid transparent;

  :hover {
    border-bottom: 2px solid ${Colors.LightBlue};
  }
`;

export const CurrentSettings = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${Colors.White};
  transition: 0.2s;
  padding-bottom: 2px;

  p {
    margin-left: 1px;
    margin-right: 6px;
  }
`;

export const StyledImg = styled.img`
  width: 22px;
  height: 22px;
`;

export const ItemText = styled.p`
  text-align: center;
`;

export const LinksWrapper = styled.div`
  padding: 32px 0;
  border-bottom: 1px solid ${Colors.WhiteOpacity};
  border-top: 1px solid ${Colors.WhiteOpacity};
  margin: 32px 0;
`;

export const MenuItem = styled(Link)<MenuItemProps>`
  display: block;
  cursor: pointer;
  transition: 0.2s;
  color: ${Colors.White};
  font-weight: ${FontWeight.Medium};
  margin-bottom: 9px;
  border-bottom: 2px solid transparent;
  transition: 0.2s;
  padding-bottom: 8px;

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      color: ${Colors.Gray};
      pointer-events: none;
    `}
  :hover {
    border-bottom: 2px solid ${Colors.LightBlue};
  }
`;
