import { Colors } from "src/enums/colors.enum";
import { FontWeight } from "src/enums/fontWeight.enum";
import { Link } from "react-scroll";
import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;
  flex-wrap: wrap;
`;

export const PageNumber = styled(Link)<{ isActive: boolean }>`
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
  :hover {
    background-color: ${Colors.DarkerBlue};
    color: ${Colors.White};
  }

  ${({ isActive }) =>
    isActive &&
    css`
      color: ${Colors.White};
      background-color: ${Colors.DarkerBlue};
    `}
`;
