import React from 'react';

import minus from 'src/assets/images/minus.svg';
import plus from 'src/assets/images/plus.svg';

import {
  StepperIcon,
  StepperIconWrapper,
  StepperWrapper,
  StyledStepperInput,
} from './Stepper.styled';
import { StepperProps } from './Stepper.types';

export const Stepper: React.FC<StepperProps> = ({
  decrement,
  increment,
  value,
  minValue,
  maxValue,
  passengers: { adults, children, infants },
}) => {
  const detectDisabled = () => {
    if (adults + children + infants >= 9) {
      return true;
    }
    return value >= maxValue;
  };

  return (
    <StepperWrapper>
      <StepperIconWrapper
        type="button"
        disabled={value <= minValue}
        onClick={decrement}
      >
        <StepperIcon src={minus} />
      </StepperIconWrapper>
      <StyledStepperInput type="text" value={value} readOnly />
      <StepperIconWrapper
        type="button"
        disabled={detectDisabled()}
        onClick={increment}
      >
        <StepperIcon src={plus} />
      </StepperIconWrapper>
    </StepperWrapper>
  );
};
