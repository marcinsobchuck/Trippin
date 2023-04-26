import styled, { css } from 'styled-components';

import svg from 'react-inlinesvg';

interface IconImageProps {
  width?: number;
  height?: number;
}

interface StyledSVGProps extends IconImageProps {
  fill?: string;
  color?: string;
}

const getSharedStyles = (width?: number, height?: number) => css`
  width: ${width ? `${width}px` : '16px'};
  height: ${height ? `${height}px` : '16px'};
`;

export const StyledSVG = styled(svg)<StyledSVGProps>`
  ${({ width, height }) => getSharedStyles(width, height)}

  fill: ${({ fill }) => fill || 'none'};
  color: ${({ color }) => color || ''};

  transition: 0.2s;
`;

export const StyledIMG = styled.img<IconImageProps>`
  ${({ width, height }) => getSharedStyles(width, height)}
`;
