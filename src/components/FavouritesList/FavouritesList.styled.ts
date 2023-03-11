import styled from "styled-components";

import { Colors } from "src/enums/colors.enum";
import { FontSize } from "src/enums/fontSize.enum";
import { FontWeight } from "src/enums/fontWeight.enum";

import svg from "react-inlinesvg";

export const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const UserIcon = styled(svg)`
  width: 36px;
  height: 36px;
  margin-right: 9px;
  fill: ${Colors.Silver};
`;

export const Email = styled.p`
  font-size: ${FontSize.Small};
  font-weight: ${FontWeight.SemiBold};
`;

export const Heading = styled.h2`
  font-size: ${FontSize.Big};
  color: ${Colors.DeepDarkBlue};
  font-weight: ${FontWeight.Bold};
  margin-bottom: 24px;
`;
