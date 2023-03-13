import styled from "styled-components";

import { Colors } from "src/enums/colors.enum";
import { FontSize } from "src/enums/fontSize.enum";
import { FontWeight } from "src/enums/fontWeight.enum";

export const TripContainer = styled.div`
  padding: 12px 18px;
  border-radius: 9px;
  background-color: ${Colors.NiceGray};

  :not(:last-of-type) {
    margin-bottom: 12px;
  }
`;

export const TextPrimary = styled.p`
  font-size: ${FontSize.Medium};
  font-weight: ${FontWeight.Medium};
  color: ${Colors.DarkBlue};
`;

export const Date = styled.p``;
