import styled from "styled-components";

import { Breakpoint } from "src/enums/breakpoint.enum";
import { Colors } from "src/enums/colors.enum";
import { FontWeight } from "src/enums/fontWeight.enum";

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${Breakpoint.TabletM} {
    flex-direction: row;
  }
`;

export const NotFoundImage = styled.img`
  width: 360px;
  height: 360px;
  @media ${Breakpoint.TabletM} {
    width: 520px;
    height: 520px;
  }
`;

export const MainText = styled.h1`
  font-size: 32px;
  color: ${Colors.DeepDarkBlue};
  font-weight: ${FontWeight.Bold};

  @media ${Breakpoint.TabletM} {
    font-size: 64px;
  }
`;

export const Text = styled.p`
  font-size: 16px;
  color: ${Colors.Blue};
  font-weight: ${FontWeight.Medium};
  @media ${Breakpoint.TabletM} {
    font-size: 32px;
  }
`;
