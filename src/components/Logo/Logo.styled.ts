import styled from 'styled-components';

import svg from 'react-inlinesvg';

import { Colors } from 'src/enums/colors.enum';

interface StyledLogoProps {
  clickable: boolean;
  color?: string;
}

export const LogoWrapper = styled.div<StyledLogoProps>`
  display: flex;
  align-items: center;
  position: relative;
  width: 100px;
  fill: ${({ color }) => color || Colors.DarkerBlue};
  color: ${({ color }) => color || Colors.DarkerBlue};
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'auto')};
`;

export const LogoIcon = styled(svg)`
  height: auto;
  width: 36px;
`;
export const LogoText = styled.p`
  font-family: 'Merriweather Sans', sans-serif;
  font-weight: 500;
  font-size: 18px;
  position: absolute;
  right: 5px;
  top: 11px;
`;
