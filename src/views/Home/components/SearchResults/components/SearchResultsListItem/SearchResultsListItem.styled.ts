import styled from 'styled-components';

import svg from 'react-inlinesvg';

import { Boxshadow } from 'src/enums/boxShadow.enum';
import { Breakpoint } from 'src/enums/breakpoint.enum';
import { Colors } from 'src/enums/colors.enum';
import { FontSize } from 'src/enums/fontSize.enum';
import { FontWeight } from 'src/enums/fontWeight.enum';

export const DetailsButton = styled.div`
  margin-bottom: 9px;
  padding: 6px 12px;
  transition: 0.3s;
  border-radius: 9px;
  font-size: ${FontSize.Small};
`;

export const ItemWrapper = styled.div`
  border-radius: 9px;
  border: 1px solid transparent;
  padding: 18px;

  box-shadow: ${Boxshadow.Boxshadow};
  margin-bottom: 24px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition: 0.3s;
  width: 100%;
  background-color: ${Colors.White};

  :hover ${DetailsButton} {
    background-color: ${Colors.Silver};
  }

  :hover {
    border: 1px solid ${Colors.Silver};
  }

  @media ${Breakpoint.Desktop} {
    flex-direction: row;
    height: 670px;
  }
`;

export const FlightWrapper = styled.div`
  @media ${Breakpoint.Desktop} {
    flex-basis: 65%;
    border-right: 1px solid ${Colors.Silver};
  }
`;

export const StyledIcon = styled(svg)`
  width: 16px;
  height: 16px;
  color: ${Colors.DeepDarkBlue};
  transform: rotate(90deg);

  @media ${Breakpoint.Mobile} {
    transform: rotate(0deg);
    margin: 0 6px;
  }
`;

export const FlightDirections = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 9px;
  border-bottom: 1px solid ${Colors.Silver};
  margin-bottom: 12px;
`;

export const FlightDirectionsWrapper = styled.div`
  color: ${Colors.DarkerBlue};
  font-size: ${FontSize.Small};
  font-weight: ${FontWeight.SemiBold};
  display: flex;
  flex-direction: column;
  @media ${Breakpoint.Mobile} {
    flex-direction: row;
    align-items: center;
  }
`;

export const Price = styled.p`
  font-weight: ${FontWeight.Bold};
  font-size: ${FontSize.Big};
  color: ${Colors.DeepDarkBlue};
  margin-right: 9px;
`;

export const SectionDivider = styled.div`
  position: relative;
  font-size: ${FontSize.SmallXS};
  font-weight: ${FontWeight.SemiBold};
  color: ${Colors.Blue};
  text-align: center;
  border-bottom: 1px solid ${Colors.Silver};
  line-height: 1px;
  margin: 30px 0;

  span {
    background-color: ${Colors.White};
    padding: 0 10px;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 8px;

  i {
    font-size: ${FontSize.SmallXS};
  }

  @media ${Breakpoint.Desktop} {
    justify-content: center;
  }
`;

export const FavouriteWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 12px;
  border-radius: 9px;
  margin-top: 14px;
  transition: 0.3s;
  :hover {
    background-color: ${Colors.DeepDarkBlue};
    color: ${Colors.White};
    fill: ${Colors.White};
  }
  p {
    margin-right: 3px;
  }
`;

export const FavouriteIcon = styled(svg)`
  width: 16px;
  height: 16px;
`;
