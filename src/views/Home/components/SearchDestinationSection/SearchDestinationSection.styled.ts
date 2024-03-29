import styled from 'styled-components';

import { animated } from 'react-spring';

import { Icon } from 'src/components/Icon/Icon';
import { Logo } from 'src/components/Logo/Logo';
import { Breakpoint } from 'src/enums/breakpoint.enum';
import { Colors } from 'src/enums/colors.enum';
import { FontSize } from 'src/enums/fontSize.enum';
import { FontWeight } from 'src/enums/fontWeight.enum';

interface AnimatedBackgroundProps {
  $backgroundImage: string;
}

export const AnimatedBackground = styled(animated.div)<AnimatedBackgroundProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -10;
  background-image: ${({ $backgroundImage }) => ($backgroundImage ? `url(${$backgroundImage})` : null)};
  background-size: cover;
  background-position: center;
  will-change: opacity;
`;

export const Wrapper = styled.div`
  position: relative;
  z-index: 12;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 0 12px;
  @media ${Breakpoint.TabletS} {
    justify-content: flex-start;
    padding: 0;
  }
`;

export const SidebarWrapper = styled.div`
  display: none;

  @media ${Breakpoint.TabletS} {
    width: 38vw;
    height: 100vh;
    background-color: ${Colors.BlackOpacity};
    border-right: 1px solid ${Colors.WhiteOpacity};
    display: flex;
    flex-direction: column;
  }

  @media ${Breakpoint.Tablet} {
    width: 33vw;
  }
`;

export const SidebarNavbar = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const BurgerMenuIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  right: 4px;
  top: 32px;
  width: 34px;
  height: 34px;
  cursor: pointer;
  padding: 6px;
  align-self: flex-end;
  margin-right: 16px;
  border-radius: 9px;
  transition: 0.2s;
  background-color: ${Colors.BlackOpacity};

  :hover {
    background-color: ${Colors.DeepDarkBlueOpacity};
    color: black;
    fill: black;
  }

  @media ${Breakpoint.TabletS} {
    position: static;
    background-color: transparent;
  }

  @media ${Breakpoint.Desktop} {
    display: none;
  }
`;

export const Menu = styled.div`
  display: none;

  @media ${Breakpoint.Desktop} {
    display: flex;
    position: relative;
    align-self: flex-end;
    margin-right: 12px;
  }
`;

export const MenuItem = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  background-color: transparent;
  transition: 0.2s;
  padding: 4px 8px;
  border-radius: 6px;
  color: ${Colors.White};
  font-size: ${FontSize.Regular};
  align-self: center;

  :hover {
    background-color: ${Colors.WhiteOpacity};
  }
  :active {
    background-color: ${Colors.DeepDarkBlueOpacity};
  }
`;

export const StyledIcon = styled(Icon)`
  margin-right: 3px;
`;

export const CurrencyIndicator = styled.p`
  margin-right: 6px;
  margin-left: 3px;
`;

export const CurrencyIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export const LanguageFlag = styled.img`
  width: 24px;
  height: 24px;
`;

export const StyledLogo = styled(Logo)`
  margin: 40px 0px 4px 30px;
`;

export const ListWrapper = styled.ul`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: flex-end;
`;

interface ItemProps {
  isActive?: boolean;
}

export const Item = styled.li<ItemProps>`
  color: ${({ isActive }) => (isActive ? Colors.White : Colors.White)};
  font-weight: ${FontWeight.SemiBold};
  font-size: ${FontSize.Medium};
  margin: 3px 0;
  padding-right: 20px;
  cursor: pointer;
  border-bottom: ${({ isActive }) => (isActive ? `4px solid ${Colors.LightBlue}` : '4px solid transparent')};
  transition: 0.2s;
  :hover {
    background-color: ${Colors.WhiteOpacity};
  }
  @media ${Breakpoint.Tablet} {
    font-size: ${FontSize.Big};
    padding-right: 30px;
  }
`;
