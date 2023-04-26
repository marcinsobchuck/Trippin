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

export const SortFilterButton = styled.div`
  cursor: pointer;
  position: sticky;
  top: 70px;
  right: 24px;
  height: 34px;
  width: 34px;
  z-index: 1;
  display: flex;
  align-self: flex-end;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.DarkerBlue};
  color: ${Colors.White};
  border-radius: 9px;
  font-size: ${FontSize.Small};
  font-weight: ${FontWeight.Medium};
  margin-top: 30px;
  transition: 0.2s;
  :hover {
    background-color: ${Colors.LightBlue};
  }
`;
