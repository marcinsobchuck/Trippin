import styled from 'styled-components';

import { Breakpoint } from 'src/enums/breakpoint.enum';

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
