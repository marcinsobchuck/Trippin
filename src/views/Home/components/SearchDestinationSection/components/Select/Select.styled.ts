import styled from 'styled-components';

import { Boxshadow } from 'src/enums/boxShadow.enum';
import { Colors } from 'src/enums/colors.enum';
import { FontSize } from 'src/enums/fontSize.enum';

export const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

export const StyledLabel = styled.label`
  font-size: ${FontSize.Small};
  color: ${Colors.Black};
  margin-bottom: 3px;
`;

export const StyledButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  border: 1px solid ${Colors.Silver};
  border-radius: 6px;
  padding: 6px 12px;
  transition: 0.2s;
  :hover {
    border: 1px solid ${Colors.LightBlue};
  }
`;

export const StyledSelectedItem = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledIcon = styled.img`
  width: 22px;
  height: 22px;
`;

export const StyledText = styled.p`
  margin-left: 8px;
`;

export const StyledList = styled.ul`
  position: absolute;
  top: 74px;
  border-radius: 6px;
  z-index: 2;
  width: 100%;
  background-color: ${Colors.White};
  box-shadow: ${Boxshadow.Boxshadow};
`;

export const StyledListItem = styled.li`
  cursor: pointer;
  padding: 10px 18px;
  border-bottom: 1px solid ${Colors.Silver};
  display: flex;
  justify-content: space-between;
`;
