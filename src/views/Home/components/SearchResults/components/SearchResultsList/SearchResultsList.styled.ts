import styled from 'styled-components';

import { Breakpoint } from 'src/enums/breakpoint.enum';
import { Colors } from 'src/enums/colors.enum';
import { FontSize } from 'src/enums/fontSize.enum';
import { FontWeight } from 'src/enums/fontWeight.enum';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StickyWrapper = styled.div`
  height: calc(100vh - 92px);
  position: sticky;
  left: 0;
  top: 92px;
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1024px;
  margin: 0 auto;
  padding: 36px;
  width: 100%;

  @media ${Breakpoint.DesktopXL} {
    padding: 30px;
  }
`;

export const NoFlightsWrapper = styled.div`
  padding: 0 12px;
  max-width: 500px;
  min-width: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const NoFlightsTitle = styled.h2`
  font-size: ${FontSize.Big};
  font-weight: ${FontWeight.SemiBold};
  color: ${Colors.DeepDarkBlue};
  margin-bottom: 18px;
`;

export const NoFlightsText = styled.p`
  font-size: ${FontSize.Regular};
  font-weight: ${FontWeight.Medium};
  color: ${Colors.DarkerBlue};
  margin-bottom: 24px;
`;
