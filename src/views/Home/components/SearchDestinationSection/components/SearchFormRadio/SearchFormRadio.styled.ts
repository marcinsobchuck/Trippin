import styled from 'styled-components';

import { Breakpoint } from 'src/enums/breakpoint.enum';
import { Colors } from 'src/enums/colors.enum';
import { FontSize } from 'src/enums/fontSize.enum';
import { StyledRadioLabel } from 'src/styles/RadioInput.styled';

export const Wrapper = styled.div`
  margin-right: 16px;
`;

export const RadioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media ${Breakpoint.TabletM} {
    flex-direction: row;
  }
`;

export const Title = styled.p`
  font-size: ${FontSize.Regular};
  color: ${Colors.White};
  margin-bottom: 6px;
`;

export const ReStyledRadioLabel = styled(StyledRadioLabel)`
  color: ${Colors.White};
  @media ${Breakpoint.TabletM} {
    margin-right: 12px;
  }
`;
