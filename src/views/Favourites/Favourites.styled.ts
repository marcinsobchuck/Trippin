import styled from "styled-components";

import { Boxshadow } from "src/enums/boxShadow.enum";
import { Colors } from "src/enums/colors.enum";
import svg from "react-inlinesvg";
import { Breakpoint } from "src/enums/breakpoint.enum";

export const Header = styled.header`
  position: relative;
  display: flex;
  justify-content: right;
  align-items: center;
  width: 100%;
  height: 80px;
  margin-bottom: 30px;
  padding: 10px 16px;
  border-bottom: 1px solid ${Colors.LightGray};
  box-shadow: ${Boxshadow.Boxshadow};

  @media ${Breakpoint.Desktop} {
    justify-content: center;
  }
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  left: 10px;
  display: flex;
  align-items: center;
  padding: 6px 10px 6px 3px;
  border-radius: 9px;
  cursor: pointer;
  transition: 0.3s;

  :hover {
    background-color: ${Colors.NiceGray};
  }
`;

export const ButtonText = styled.p`
  color: ${Colors.DeepDarkBlue};
`;

export const Arrow = styled(svg)`
  color: ${Colors.DeepDarkBlue};
  transform: rotate(90deg);
  width: 32px;
  height: 32px;
`;

export const MainContentWrapper = styled.div`
  padding: 10px 16px;

  @media ${Breakpoint.Desktop} {
    margin: 0 auto;
    max-width: 1024px;
  }
`;

export const FavouriteTripsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
`;

export const FavouriteTrip = styled.div`
  padding: 12px 18px;
  border-radius: 9px;
  background-color: ${Colors.NiceGray};

  :not(:last-of-type) {
    margin-bottom: 12px;
  }
`;
