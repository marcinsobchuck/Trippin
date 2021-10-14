import styled, { css } from "styled-components";
import { Colors } from "../../enums/colors.enum";
import Loader from "react-loader-spinner";
import { FontSize } from "../../enums/fontSize.enum";
import { FontWeight } from "../../enums/fontWeight.enum";
import { Breakpoint } from "../../enums/breakpoint.enum";

interface InputWrapperProps {
  isOpen?: boolean;
}

interface StyledLabelprops {
  isOpen?: boolean;
}
interface StyledLabelWrapperProps {
  isOpen?: boolean;
}

interface StyledInputProps {
  isOpen?: boolean;
}

interface StyledListProps {
  isOpen?: boolean;
}

interface StyledItemProps {
  isOpen?: boolean;
}

export const InputWrapper = styled.div<InputWrapperProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  ${({ isOpen }) =>
    isOpen &&
    css`
      position: absolute;
      z-index: 1000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100vh;
      background-color: ${Colors.White};
    `}
  @media ${Breakpoint.Desktop} {
    flex-basis: 50%;
  }
`;

export const StyledLabelWrapper = styled.div<StyledLabelWrapperProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({ isOpen }) =>
    isOpen &&
    css`
      border-bottom: 2px solid ${Colors.Silver};
      margin-bottom: 16px;
      padding: 16px;
    `}
`;

export const StyledLabel = styled.label<StyledLabelprops>`
  display: flex;
  color: ${({ isOpen }) => (isOpen ? Colors.DarkerBlue : Colors.White)};
`;

export const StyledInput = styled.input<StyledInputProps>`
  border: none;
  border-radius: 3px;
  padding: 8px 16px;

  ${({ isOpen }) =>
    isOpen &&
    css`
      border: 2px solid ${Colors.Silver};
      margin: 0 10px;
      :focus,
      :active {
        border: 2px solid ${Colors.DarkerBlue};
      }
    `}
  @media ${Breakpoint.TabletS} {
    padding: 12px 16px;
  }
  @media ${Breakpoint.Desktop} {
    &[placeholder="Start"] {
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
      border-right: 2px solid ${Colors.Silver};
    }
    &[placeholder="Destination"] {
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
    }
  }
`;

export const StyledList = styled.ul<StyledListProps>`
  position: absolute;
  width: 100%;
  z-index: 1000;
  top: 68px;
  border-radius: 6px;
  overflow: hidden;
  margin-top: 6px;
  ${({ isOpen }) =>
    isOpen &&
    css`
      top: 120px;
      border-radius: 0;
    `}
`;

export const StyledLoader = styled(Loader)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 6px;
`;

export const StyledItem = styled.li<StyledItemProps>`
  display: flex;
  justify-content: space-between;
  padding: 6px 12px;
  border-bottom: 1px solid ${Colors.Silver};
  cursor: pointer;

  ${({ isOpen }) =>
    isOpen &&
    css`
      padding: 14px 12px;
    `}
`;

export const PlaceInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledCountryName = styled.p`
  font-size: ${FontSize.SmallXS};
  font-weight: ${FontWeight.Light};
`;

export const StyledFlag = styled.img`
  align-self: center;
`;
