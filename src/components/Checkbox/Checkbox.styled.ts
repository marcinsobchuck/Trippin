import styled from 'styled-components';

import { Colors } from 'src/enums/colors.enum';

export const HiddenCheckbox = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const StyledCheckbox = styled.div<{ checked: boolean }>`
  margin-right: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;
  background: ${({ checked }) => (checked ? Colors.DarkBlue : Colors.LightGray)};
  border-radius: 3px;
  transition: 0.3s;

  svg {
    visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')};
  }
`;

export const CheckboxContainer = styled.label<{ disabled: boolean }>`
  display: flex;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  :hover ${StyledCheckbox} {
    background-color: ${Colors.LightBlue};
  }
`;
