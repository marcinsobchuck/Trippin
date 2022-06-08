import { Colors } from "src/enums/colors.enum";
import svg from "react-inlinesvg";
import styled from "styled-components";
import { Breakpoint } from "src/enums/breakpoint.enum";

export const Wrapper = styled.div`
  position: sticky;
  z-index: 10;
  left: 0;
  top: 0;
  min-height: 86px;
  width: 100%;
  padding: 12px 36px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${Colors.Silver};
  border-left: 1px solid ${Colors.Silver};
  background-color: ${Colors.White};
  @media ${Breakpoint.TabletM} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const ButtonWrapper = styled.div`
  background-color: ${Colors.DarkerBlue};
  right: 18px;
  bottom: -31px;
  height: 32px;
  width: 32px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 9px;
  border-bottom-right-radius: 9px;
  border: 1px solid ${Colors.Silver};
  border-top: none;
  cursor: pointer;
`;

export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
`;

export const Arrow = styled(svg)`
  color: ${Colors.White};
  transform: rotate(180deg);
  width: 22px;
  height: 22px;
`;
