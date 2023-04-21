import styled, { css } from 'styled-components';

import { Link } from 'react-router-dom';

import { Boxshadow } from 'src/enums/boxShadow.enum';
import { Colors } from 'src/enums/colors.enum';
import { FontSize } from 'src/enums/fontSize.enum';
import { FontWeight } from 'src/enums/fontWeight.enum';

interface StyledTextProps {
  $isDisabled?: boolean;
}

export const Wrapper = styled.div`
  width: 130px;
  border-radius: 9px;
  background-color: ${Colors.White};
  padding: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: ${Boxshadow.Boxshadow};
`;

export const StyledText = styled(Link)<StyledTextProps>`
  color: ${Colors.DarkerBlue};
  width: 100%;
  background-color: transparent;
  padding: 12px 0;
  cursor: pointer;
  transition: 0.2s;
  font-size: ${FontSize.Small};
  font-weight: ${FontWeight.Medium};
  text-align: center;

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      color: ${Colors.Silver};
      pointer-events: none;
    `}

  :last-of-type {
    border-top: 1px solid ${Colors.Silver};
    padding-top: 20px;
    padding-bottom: 0;
  }
  :hover {
    color: ${Colors.LightBlue};
  }
`;
