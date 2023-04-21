import styled from 'styled-components';

import { Colors } from '../../enums/colors.enum';
import { FontSize } from '../../enums/fontSize.enum';
import { FontWeight } from '../../enums/fontWeight.enum';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 6px;
`;
export const StyledLabel = styled.label`
  color: ${Colors.LightBlue};
  font-size: ${FontSize.Medium};
`;
export const StyledInput = styled.input`
  border: none;
  border-bottom: 2px solid ${Colors.Blue};
  padding: 12px 0px 4px;
  margin-bottom: 4px;
  font-size: ${FontSize.Small};
  ::placeholder {
    color: ${Colors.Silver};
  }
  :focus {
    border-bottom: 2px solid ${Colors.LightBlue};
  }
`;

export const ErrorStyled = styled.span`
  color: ${Colors.Red};
  font-size: ${FontSize.Small};
  font-weight: ${FontWeight.Light};
`;

export const ErrorSpace = styled.div`
  visibility: hidden;
  font-size: ${FontSize.Small};
  font-weight: ${FontWeight.Light};
`;
