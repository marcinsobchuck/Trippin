import styled from 'styled-components';

import { Form } from 'formik';

import { Boxshadow } from 'src/enums/boxShadow.enum';
import { Breakpoint } from 'src/enums/breakpoint.enum';
import { Colors } from 'src/enums/colors.enum';
import { FontSize } from 'src/enums/fontSize.enum';
import { FontWeight } from 'src/enums/fontWeight.enum';
import { Button } from 'src/styles/Button.styled';

interface ModalOverlayProps {
  isOpen: boolean;
}

export const ModalOverlay = styled.div<ModalOverlayProps>`
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${Colors.DeepDarkBlueOpacity};
  z-index: 9999;
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
