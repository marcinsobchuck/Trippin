import styled from 'styled-components';

import svg from 'react-inlinesvg';

import { Colors } from 'src/enums/colors.enum';
import { FontWeight } from 'src/enums/fontWeight.enum';

export const StepperWrapper = styled.div`
  display: flex;
  width: 100px;
  justify-content: space-between;
  align-items: center;
`;

export const StepperIcon = styled(svg)`
  height: 18px;
  width: 18px;
  fill: ${Colors.DarkerBlue};
`;

export const StepperIconWrapper = styled.button`
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 9px;
  transition: 0.3s;
  cursor: pointer;
  background-color: ${Colors.LightGray};
  :hover:not(:disabled) {
    background-color: ${Colors.Silver};
  }
  :active:not(:disabled) {
    background-color: ${Colors.Gray};
  }
  :disabled {
    cursor: not-allowed;
  }
  :disabled ${StepperIcon} {
    fill: ${Colors.Gray};
  }
`;

export const StyledStepperInput = styled.input`
  font-weight: ${FontWeight.Bold};
  border: none;
  text-align: center;
  min-width: 0;
`;
