import { Colors } from "src/enums/colors.enum";
import { FontWeight } from "src/enums/fontWeight.enum";
import { Link } from "react-scroll";
import svg from "react-inlinesvg";
import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;
  flex-wrap: wrap;
`;

export const PageNumber = styled(Link)<{ $isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 14px;
  border-radius: 9px;
  background-color: ${Colors.Silver};
  color: ${Colors.DarkBlue};
  font-weight: ${FontWeight.Medium};

  margin: 0 6px;
  width: 40px;
  text-align: center;
  cursor: pointer;
  transition: 0.2s;
  :hover {
    background-color: ${Colors.DarkerBlue};
    color: ${Colors.White};
  }

  ${({ $isActive }) =>
    $isActive &&
    css`
      color: ${Colors.White};
      background-color: ${Colors.DarkerBlue};
    `}
`;

const sharedStyles = css`
  height: 28px;
  width: 28px;
  color: ${Colors.DeepDarkBlue};
  transition: 0.2s;
`;

export const IconWrapper = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 38px;
  height: 38px;
  cursor: pointer;
  :hover {
    svg {
      color: ${Colors.LightBlue};
    }
  }
`;

export const RightArrow = styled(svg)`
  ${sharedStyles};
  transform: rotate(270deg);
`;

export const LeftArrow = styled(svg)`
  ${sharedStyles};
  transform: rotate(90deg);
`;
