import styled from "styled-components";
import svg from "react-inlinesvg";
import { Colors } from "../../enums/colors.enum";

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100px;
`;

export const LogoIcon = styled(svg)`
  height: auto;
  width: 36px;
  fill: ${Colors.DarkerBlue};
`;
export const LogoText = styled.p`
  color: ${Colors.DarkerBlue};
  font-family: "Merriweather Sans", sans-serif;
  font-weight: 500;
  font-size: 18px;
  position: absolute;
  right: 5px;
  top: 11px;
`;
