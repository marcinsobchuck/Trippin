import styled from 'styled-components';

import { Form } from 'formik';
import svg from 'react-inlinesvg';

import { FontSize } from 'src/enums/fontSize.enum';

import { Breakpoint } from '../../../../../../enums/breakpoint.enum';
import { Colors } from '../../../../../../enums/colors.enum';

export const Wrapper = styled.div`
  background-color: ${Colors.BlackOpacity};
  border-radius: 6px;
  width: 100%;

  @media ${Breakpoint.TabletS} {
    margin: 0 30px;
    width: auto;
  }

  @media ${Breakpoint.Tablet} {
    width: 500px;
  }

  @media ${Breakpoint.DesktopXL} {
    width: auto;
  }
`;

export const StyledForm = styled(Form)`
  padding: 24px;
`;

export const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 24px;
  margin-bottom: 20px;
  border-top: 1px solid ${Colors.WhiteOpacity};

  @media ${Breakpoint.DesktopXL} {
    flex-direction: row;
  }
`;

export const SettingsWrapper = styled.div`
  position: relative;
  margin-bottom: 16px;
  width: fit-content;
  display: flex;
`;

export const FlightSettings = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  padding: 9px;
  border-radius: 9px;
  transition: 0.3s;
  :hover {
    background-color: ${Colors.WhiteOpacity};
  }
  :active {
    background-color: transparent;
  }
`;

export const PassengersWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;

  svg {
    margin-right: 6px;
  }
`;

export const StyledIcon = styled(svg)`
  width: 16px;
  height: 16px;
  fill: ${Colors.White};
  margin-right: 6px;
`;

export const ItemText = styled.p`
  color: ${Colors.White};
  font-size: ${FontSize.Small};
  text-align: center;
`;
