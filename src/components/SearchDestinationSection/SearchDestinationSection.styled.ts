import styled from "styled-components";
import { Breakpoint } from "../../enums/breakpoint.enum";
import { Colors } from "../../enums/colors.enum";
import { FontSize } from "../../enums/fontSize.enum";
import { FontWeight } from "../../enums/fontWeight.enum";
import { Logo } from "../Logo/Logo";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  @media ${Breakpoint.TabletS} {
    justify-content: flex-start;
    padding: 0px;
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
    align-items: flex-end;
  }

  @media ${Breakpoint.Tablet} {
    width: 33vw;
  }
`;

export const StyledLogo = styled(Logo)`
  margin-top: 40px;
  margin-left: 30px;
  align-self: flex-start;
`;

export const ListWrapper = styled.ul`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  border-bottom: ${({ isActive }) =>
    isActive ? `4px solid ${Colors.LightBlue}` : "4px solid transparent"};
  transition: 0.2s;
  :hover {
    background-color: ${Colors.WhiteOpacity};
  }
  @media ${Breakpoint.Tablet} {
    font-size: ${FontSize.Big};
    padding-right: 30px;
  }
`;
