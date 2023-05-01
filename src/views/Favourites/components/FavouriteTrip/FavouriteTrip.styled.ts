import styled from 'styled-components';

import { animated } from 'react-spring';

import { Breakpoint } from 'src/enums/breakpoint.enum';
import { Colors } from 'src/enums/colors.enum';
import { FontSize } from 'src/enums/fontSize.enum';
import { FontWeight } from 'src/enums/fontWeight.enum';

interface SharedReturnTypes {
  isReturnRoute?: boolean;
}

export const ActionsMenu = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 70px;
  border-top-left-radius: 9px;
  border-bottom-left-radius: 9px;
  transform: translateX(100px);
  transition: transform 0.3s ease-in-out;
  background-color: ${Colors.White};
  cursor: pointer;
  transition: 0.3s;

  :hover {
    background-color: ${Colors.Silver};
  }
`;

export const TripContainer = styled(animated.div)`
  position: relative;
  background-color: ${Colors.NiceGray};
  border-radius: 9px;
  border: 1px solid ${Colors.Silver};
  overflow: hidden;

  :hover ${ActionsMenu} {
    transform: translateX(0);
  }

  &:not(:last-child) {
    margin-bottom: 16px;
  }

  @media ${Breakpoint.Desktop} {
    height: 1200px;
  }
`;

export const RouteContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media ${Breakpoint.Desktop} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const InfoContainer = styled.div`
  padding: 12px 18px;

  @media ${Breakpoint.Desktop} {
    flex-basis: 40%;

    :last-of-type {
      text-align: right;
    }
  }
`;

export const TextPrimary = styled.p`
  font-weight: ${FontWeight.SemiBold};
  color: ${Colors.DarkBlue};
`;

export const DateText = styled.p`
  font-size: ${FontSize.Small};
  font-weight: ${FontWeight.Medium};
`;

export const Divider = styled.div<SharedReturnTypes>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: ${({ isReturnRoute }) => (isReturnRoute ? Colors.DarkBlue : Colors.LighterBlue)};
  height: ${({ isReturnRoute }) => (isReturnRoute ? '60px' : '30px')};

  @media ${Breakpoint.Desktop} {
    flex-basis: 10%;
    height: ${({ isReturnRoute }) => (isReturnRoute ? '60px' : 'auto')};
  }
`;

export const FontAwesomeIcon = styled.i<SharedReturnTypes>`
  color: ${({ isReturnRoute }) => (isReturnRoute ? Colors.White : Colors.Blue)};

  transform: ${({ isReturnRoute }) => (isReturnRoute ? 'rotate(-90deg)' : 'rotate(0)')};

  @media ${Breakpoint.Desktop} {
    transform: rotate(-90deg);
  }
`;

export const Summary = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px dashed ${Colors.Gray};
  padding: 8px 18px 18px;
`;

export const PriceText = styled.h2`
  text-align: left;
  font-size: ${FontSize.Big};
  color: ${Colors.DeepDarkBlue};
  font-weight: ${FontWeight.SemiBold};
`;
