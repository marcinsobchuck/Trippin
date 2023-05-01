import styled from 'styled-components';

import border from 'src/assets/images/border.svg';

import { Colors } from 'src/enums/colors.enum';
import { FontSize } from 'src/enums/fontSize.enum';
import { FontWeight } from 'src/enums/fontWeight.enum';

import { FlightBadgeProps } from './FlightRoute.types';

export const FlightGeneralInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${FontSize.Small};
  font-weight: ${FontWeight.Medium};
  color: ${Colors.Blue};
  margin-bottom: 6px;
`;

export const FlightGeneralInfoItem = styled.div`
  margin-bottom: 3px;
`;

export const StyledFA = styled.i`
  font-size: ${FontSize.Small};
  color: ${Colors.Gray};
  margin-right: 6px;
`;

export const FlightDirection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: ${FontSize.Small};
  margin-bottom: 12px;

  p {
    font-weight: ${FontWeight.Light};
    line-height: 16px;
    color: ${Colors.Gray};
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  span {
    letter-spacing: normal;
    text-transform: none;
    color: black;
    font-weight: ${FontWeight.SemiBold};
    font-size: ${FontSize.SmallXS};
  }
`;

export const FlightDetailsWrapper = styled.div`
  position: relative;

  :before {
    content: '';
    position: absolute;
    left: 7px;
    top: 0;
    bottom: 0;
    width: 2px;
    z-index: 1;
    background: url(${border}) repeat-y;
  }
`;

export const FlightDetails = styled.div`
  padding-left: 26px;
`;

export const BadgesWrapper = styled.div`
  padding-left: 26px;
  display: flex;
`;

export const FlightDetailsItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  font-size: ${FontSize.Small};
  font-weight: ${FontWeight.Medium};
  margin-bottom: 18px;
`;

export const FlightDetailsItemIcon = styled.div`
  position: absolute;
  padding: 4px 0;
  left: 3px;
  top: 50%;
  z-index: 2;
  transform: translate(0, -50%);
  font-size: ${FontSize.SmallXXS};
  color: ${Colors.Gray};
  background-color: ${Colors.White};
`;

export const FlightBadge = styled.div<FlightBadgeProps>`
  font-size: ${FontSize.SmallXS};
  font-weight: ${FontWeight.SemiBold};
  padding: 4px 9px;
  border-radius: 9px;
  border: 1px solid ${Colors.Silver};
  color: ${({ color }) => color || Colors.Black};
  background-color: ${({ bgColor }) => bgColor || 'transparent'};
  margin-right: 6px;
`;
