import styled from 'styled-components';

import { Breakpoint } from 'src/enums/breakpoint.enum';
import { Colors } from 'src/enums/colors.enum';
import { FontSize } from 'src/enums/fontSize.enum';
import { FontWeight } from 'src/enums/fontWeight.enum';

export const Wrapper = styled.div`
  margin-right: 24px;
  margin-bottom: 6px;
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media ${Breakpoint.TabletM} {
    width: 220px;
  }
`;

export const Label = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LabelText = styled.p`
  font-size: ${FontSize.Small};
  font-weight: ${FontWeight.Medium};
  color: ${Colors.DarkerBlue};
  margin-bottom: 3px;

  span {
    margin-left: 3px;
  }
`;
