import styled from 'styled-components';

import svg from 'react-inlinesvg';

import { Boxshadow } from 'src/enums/boxShadow.enum';
import { Breakpoint } from 'src/enums/breakpoint.enum';
import { Colors } from 'src/enums/colors.enum';
import { FontSize } from 'src/enums/fontSize.enum';
import { FontWeight } from 'src/enums/fontWeight.enum';
import { StyledRadioLabel } from 'src/styles/RadioInput.styled';

export const Wrapper = styled.div`
  position: fixed;
  z-index: 2;
  right: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  padding: 20px;
  background-color: ${Colors.White};

  @media ${Breakpoint.TabletS} {
    position: absolute;
    width: 300px;
    height: auto;
    border-radius: 9px;
    left: 30px;
    box-shadow: ${Boxshadow.Boxshadow};
  }
  @media ${Breakpoint.TabletM} {
    left: 110px;
  }
`;

export const ModalTitle = styled.h2`
  color: ${Colors.DarkerBlue};
  font-weight: ${FontWeight.SemiBold};
  margin-bottom: 24px;
`;

export const IconWrapper = styled.div`
  position: absolute;
  right: 6px;
  top: 6px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 8px;
  width: 32px;
  border-radius: 6px;
  transition: 0.2s;
  :hover {
    background-color: ${Colors.Silver};
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
`;

export const RowLeftSide = styled.div`
  display: flex;
  align-items: center;
`;

export const SectionTitle = styled.div`
  font-size: ${FontSize.Regular};
  color: ${Colors.DarkBlue};
  font-weight: ${FontWeight.Medium};
  margin-bottom: 18px;
`;

export const StyledIcon = styled(svg)`
  fill: ${Colors.DarkerBlue};
  height: 22px;
  width: 22px;
  margin-right: 6px;
`;

export const StyledText = styled.p`
  font-size: ${FontSize.Small};
  font-weight: ${FontWeight.Bold};
`;

export const UnderText = styled.p`
  font-size: ${FontSize.SmallXS};
  font-weight: ${FontWeight.Regular};
  line-height: 10px;
`;

export const RadioWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ReStyledRadioLabel = styled(StyledRadioLabel)`
  font-weight: ${FontWeight.SemiBold};
  margin-bottom: 9px;
`;
