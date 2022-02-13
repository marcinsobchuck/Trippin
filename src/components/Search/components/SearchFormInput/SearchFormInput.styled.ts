import styled, { css } from "styled-components";
import { Colors } from "../../../../enums/colors.enum";
import { FontSize } from "../../../../enums/fontSize.enum";
import { FontWeight } from "../../../../enums/fontWeight.enum";
import { Breakpoint } from "../../../../enums/breakpoint.enum";
import svg from "react-inlinesvg";
import { Boxshadow } from "src/enums/boxShadow.enum";

interface SharedProps {
  isFullscreen?: boolean;
}

export const InputWrapper = styled.div<SharedProps>`
  position: relative;

  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  ${({ isFullscreen }) =>
    isFullscreen &&
    css`
      position: absolute;
      z-index: 10;
      left: 0;
      top: 0;
      width: 100%;
      height: 100vh;
      background-color: ${Colors.White};
    `}
  @media ${Breakpoint.DesktopXL} {
    width: 260px;
  }
`;

export const StyledLabelWrapper = styled.div<SharedProps>`
  ${({ isFullscreen }) =>
    isFullscreen &&
    css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid ${Colors.Silver};
      margin-bottom: 16px;
      padding: 16px;
    `}
`;

export const StyledLabel = styled.label<SharedProps>`
  font-size: ${FontSize.Small};
  display: flex;
  color: ${({ isFullscreen }) =>
    isFullscreen ? Colors.DarkerBlue : Colors.White};
  ${({ isFullscreen }) =>
    isFullscreen &&
    css`
      color: ${Colors.DarkerBlue};
      font-size: ${FontSize.Medium};
      font-weight: ${FontWeight.SemiBold};
    `}
`;

export const StyledInput = styled.input<SharedProps>`
  border: none;
  border-radius: 3px;
  padding: 8px 16px;
  font-size: ${FontSize.Regular};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  ${({ isFullscreen }) =>
    isFullscreen &&
    css`
      border: 2px solid ${Colors.Silver};
      margin: 0 10px;
      :focus,
      :active {
        border: 2px solid ${Colors.DarkerBlue};
      }
    `}

  ::placeholder {
    color: ${Colors.Silver};
  }
  @media ${Breakpoint.TabletS} {
    padding: 12px 16px;
  }
  @media ${Breakpoint.DesktopXL} {
    border-right: 2px solid ${Colors.Silver};

    &[placeholder="Start"] {
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
    }
    &[placeholder="Destination"] {
      border-radius: 0;
    }
    &[placeholder="Cel podróży"] {
      border-radius: 0;
    }
  }
`;

export const StyledList = styled.ul<SharedProps>`
  position: absolute;
  width: 100%;
  z-index: 11;
  top: 72px;
  border-radius: 6px;
  overflow: hidden;
  margin-top: 6px;
  box-shadow: ${Boxshadow.Boxshadow};
  ${({ isFullscreen }) =>
    isFullscreen &&
    css`
      top: 120px;
      border-radius: 0;
      box-shadow: none;
    `}
`;

export const StyledItem = styled.li<SharedProps>`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  border-bottom: 1px solid ${Colors.Silver};
  cursor: pointer;
  min-height: 56px;

  ${({ isFullscreen }) =>
    isFullscreen &&
    css`
      padding: 14px 12px;
    `}
`;

export const AnywhereItem = styled.li`
  display: flex;
  align-items: center;
  background-color: ${Colors.DarkerBlue};
  color: ${Colors.White};
  padding: 24px 12px;
  cursor: pointer;
  transition: 0.2s;

  :hover {
    background-color: ${Colors.Blue};
    color: ${Colors.White};
  }

  p {
    font-size: ${FontSize.SmallXS};
    font-weight: ${FontWeight.SemiBold};
  }

  span {
    margin-left: 4px;
    text-decoration: underline;
    font-weight: ${FontWeight.Bold};
  }

  @media ${Breakpoint.TabletS} {
    padding: 14px 12px;
  }
`;

export const StyledGlobe = styled(svg)`
  fill: ${Colors.White};
  height: 20px;
  width: 20px;
  margin-right: 16px;
`;

export const PlaceInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledIcon = styled(svg)`
  fill: ${Colors.BlackOpacity};
  height: 20px;
  width: 20px;
  margin-right: 16px;
`;

export const StyledCountryName = styled.p`
  font-size: ${FontSize.SmallXS};
  font-weight: ${FontWeight.Light};
`;

export const StyledFlag = styled.img`
  margin-left: auto;
`;
