import styled from 'styled-components';

import svg from 'react-inlinesvg';

import { Colors } from 'src/enums/colors.enum';
import { FontSize } from 'src/enums/fontSize.enum';

export const Wrapper = styled.div`
  background-color: ${Colors.DeepDarkBlue};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
  padding: 32px 0 14px;
  overflow: hidden;
`;

export const SocialIcon = styled(svg)`
  cursor: pointer;
  width: 32px;
  height: 32px;
  fill: ${Colors.White};
  margin: 0px 6px;
  transition: 0.3s;
  :hover {
    fill: ${Colors.LightBlue};
  }
`;

export const TooltipText = styled.span`
  visibility: hidden;
  width: 140px;
  background-color: #555;
  color: ${Colors.White};
  font-size: ${FontSize.SmallXS};
  text-align: center;
  border-radius: 6px;
  padding: 3px;
  position: absolute;
  z-index: 1;
  bottom: -90%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  will-change: opacity;
  transition: opacity 0.7s;

  ::after {
    content: "";
    position: absolute;
    top: -42%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent #555 transparent;
  }
`;

export const StyledEmail = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: ${FontSize.Small};
  color: ${Colors.Silver};
  padding: 6px 12px;
  border-radius: 9px;
  margin-top: 3px;
  transition: 0.3s;
  :hover {
    background-color: ${Colors.Gray};
    color: ${Colors.White};
  }
  :hover ${TooltipText} {
    visibility: visible;
    opacity: 1;
  }
`;

export const CopyWrapper = styled.div`
  display: flex;
`;

export const CopyIcon = styled(svg)`
  fill: ${Colors.White};
  width: 18px;
  height: 18px;
  margin-right: 6px;
`;

export const Copyright = styled.p`
  color: ${Colors.Silver};
  font-size: ${FontSize.SmallXS};
  margin-top: 34px;
  padding-top: 3px;
  border-top: 1px solid ${Colors.WhiteOpacity};
`;
