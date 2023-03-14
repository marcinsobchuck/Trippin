import styled from "styled-components";

import { Colors } from "src/enums/colors.enum";
import { FontSize } from "src/enums/fontSize.enum";
import { FontWeight } from "src/enums/fontWeight.enum";
import { Breakpoint } from "src/enums/breakpoint.enum";

export const TripContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${Colors.NiceGray};
  border-radius: 9px;
  border: 1px solid ${Colors.Silver};

  :not(:last-of-type) {
    margin-bottom: 12px;
  }

  @media ${Breakpoint.Desktop} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const InfoContainer = styled.div`
  padding: 12px 18px;
  flex-basis: 40%;

  @media ${Breakpoint.Desktop} {
    :last-of-type {
      text-align: right;
    }
  }
`;

export const TextPrimary = styled.p`
  font-weight: ${FontWeight.SemiBold};
  color: ${Colors.DarkBlue};
`;

export const TextSecondary = styled.p``;

export const DateText = styled.p`
  font-size: ${FontSize.Small};
  font-weight: ${FontWeight.Medium};
`;

export const Divider = styled.div`
  text-align: center;
  background-color: ${Colors.LighterBlue};

  @media ${Breakpoint.Desktop} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-basis: 5%;
  }
`;

export const FontAwesomeIcon = styled.i`
  color: ${Colors.Blue};

  @media ${Breakpoint.Desktop} {
    transform: rotate(-90deg);
  }
`;
