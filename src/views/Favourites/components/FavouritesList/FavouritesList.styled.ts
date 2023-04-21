import styled from 'styled-components';

import { Breakpoint } from 'src/enums/breakpoint.enum';
import { Colors } from 'src/enums/colors.enum';
import { FontSize } from 'src/enums/fontSize.enum';
import { FontWeight } from 'src/enums/fontWeight.enum';

export const FavouriteTripsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
`;

export const NoResults = styled.div`
  height: 200px;
  width: 220px;

  @media ${Breakpoint.Desktop} {
    width: 400px;
  }
`;

export const NoResultsText = styled.p`
  font-weight: ${FontWeight.Medium};
  font-size: ${FontSize.Big};
  color: ${Colors.DarkBlue};

  @media ${Breakpoint.Desktop} {
    font-size: ${FontSize.BigXL};
  }
`;

export const NoResultsLink = styled.p`
  font-weight: ${FontWeight.SemiBold};
  font-size: ${FontSize.Small};
  color: ${Colors.Gray};
  margin-bottom: 24px;

  @media ${Breakpoint.Desktop} {
    font-size: ${FontSize.Small};
  }
`;
