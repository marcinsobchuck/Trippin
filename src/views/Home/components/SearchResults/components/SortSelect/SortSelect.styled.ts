import styled from 'styled-components';

import { Breakpoint } from 'src/enums/breakpoint.enum';
import { Colors } from 'src/enums/colors.enum';
import { FontSize } from 'src/enums/fontSize.enum';
import { FontWeight } from 'src/enums/fontWeight.enum';

export const Wrapper = styled.div`
  align-self: flex-start;
  min-width: 180px;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 16px;

  @media ${Breakpoint.TabletM} {
    margin: 0;
  }
`;

export const StyledLabel = styled.label`
  font-size: ${FontSize.Small};
  font-weight: ${FontWeight.Medium};
  color: ${Colors.DarkerBlue};
  margin-bottom: 3px;
`;

export const StyledButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 9px;
  border: 1px solid ${Colors.Silver};
  background-color: ${Colors.White};
  padding: 3px 9px;
  transition: 0.2s;
  :hover {
    border-color: ${Colors.LightBlue};
  }
`;

export const StyledText = styled.p`
  font-size: ${FontSize.Small};
  color: ${Colors.Black};
`;

export const StyledList = styled.div`
  width: 100%;
  background-color: ${Colors.White};
  position: absolute;
  top: 60px;
  border-radius: 9px;
  overflow: hidden;
`;

export const StyledItem = styled.div`
  cursor: pointer;
  padding: 6px 9px;
  border-bottom: 1px solid ${Colors.Silver};

  :last-of-type {
    border-bottom: none;
  }
`;
