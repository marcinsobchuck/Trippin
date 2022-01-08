import { Colors } from "src/enums/colors.enum";
import { FontWeight } from "src/enums/fontWeight.enum";
import styled from "styled-components";
import svg from "react-inlinesvg";
import { Button } from "src/styles/Button.styled";
import { FontSize } from "src/enums/fontSize.enum";
import { Boxshadow } from "src/enums/boxShadow.enum";
import { Form } from "formik";
import { Breakpoint } from "src/enums/breakpoint.enum";

interface ModalOverlayProps {
  isOpen: boolean;
}

export const ModalOverlay = styled.div<ModalOverlayProps>`
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${Colors.DeepDarkBlueOpacity};
  z-index: 3;
  transition: background-color 0.15s ease-in-out 0s;
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: ${Colors.White};
  box-shadow: ${Boxshadow.Boxshadow};
  border-radius: 6px;
  padding: 30px;

  @media ${Breakpoint.TabletS} {
    width: 360px;
    height: auto;
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  right: 6px;
  top: 6px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 8px;
  width: 32px;
  border-radius: 6px;
  transition: 0.2s;
  :hover {
    background-color: ${Colors.Silver};
  }
`;

export const CloseIcon = styled(svg)`
  fill: ${Colors.DarkerBlue};
  height: 16px;
  width: 16px;
`;

export const ModalTitle = styled.h2`
  color: ${Colors.DarkerBlue};
  font-weight: ${FontWeight.SemiBold};
  margin-bottom: 42px;
`;

export const StyledButton = styled(Button)`
  font-size: ${FontSize.Regular};
  margin-top: auto;
  margin-bottom: 30px;

  @media ${Breakpoint.TabletS} {
    margin-top: 30px;
    margin-bottom: 0;
  }
`;
