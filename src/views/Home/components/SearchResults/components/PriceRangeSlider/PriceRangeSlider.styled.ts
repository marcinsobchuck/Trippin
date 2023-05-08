import styled from 'styled-components';

import { Breakpoint } from 'src/enums/breakpoint.enum';

export const Wrapper = styled.div`
  padding-right: 38px;
  margin-bottom: 6px;
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media ${Breakpoint.TabletM} {
    width: 280px;
  }
`;

export const Label = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LabelText = styled.p`
  margin-bottom: 3px;

  span {
    margin-left: 3px;
  }
`;
