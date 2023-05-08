import styled from 'styled-components';

import { Icon } from 'src/components/Icon/Icon';
import { Breakpoint } from 'src/enums/breakpoint.enum';
import { Colors } from 'src/enums/colors.enum';
import { FontSize } from 'src/enums/fontSize.enum';
import { FontWeight } from 'src/enums/fontWeight.enum';

interface SharedProps {
  isOpen: boolean;
}

export const Wrapper = styled.div<SharedProps>`
  font-size: ${FontSize.Small};
  font-weight: ${FontWeight.Medium};
  color: ${Colors.DarkerBlue};
  transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-101%)')};
  transition: transform 0.3s ease-in-out;
  position: sticky;
  z-index: 10;
  left: 0;
  top: 0;
  min-height: 92px;
  width: 100%;
  padding: 12px 36px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${Colors.Silver};
  border-left: 1px solid ${Colors.Silver};
  background-color: ${Colors.White};
  @media ${Breakpoint.TabletM} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const ButtonWrapper = styled.div`
  background-color: ${Colors.DarkerBlue};
  right: 18px;
  bottom: -31px;
  height: 32px;
  width: 32px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 9px;
  border-bottom-right-radius: 9px;
  border: 1px solid ${Colors.Silver};
  border-top: none;
  transition: 0.3s;
  cursor: pointer;
  :hover {
    background-color: ${Colors.LightBlue};
  }
`;

export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
`;

export const StyledIcon = styled(Icon)<SharedProps>`
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0)')};
  fill: ${({ isOpen }) => !isOpen && Colors.White};
`;
