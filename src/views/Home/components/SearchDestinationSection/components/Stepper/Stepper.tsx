import React from 'react';

import { Icon } from 'src/components/Icon/Icon';
import { Colors } from 'src/enums/colors.enum';

import { StepperIconWrapper, StepperWrapper, StyledStepperInput } from './Stepper.styled';
import { StepperProps } from './Stepper.types';

export const Stepper: React.FC<StepperProps> = ({
  decrement,
  increment,
  value,
  minValue,
  maxValue,
  passengers: { adults, children, infants },
  testIncrementId,
}) => {
  const detectDisabled = () => {
    if (adults + children + infants >= 9) {
      return true;
    }
    return value >= maxValue;
  };

  return (
    <StepperWrapper>
      <StepperIconWrapper type="button" disabled={value <= minValue} onClick={decrement}>
        <Icon name="minusIcon" width={18} height={18} fill={Colors.DarkerBlue} />
      </StepperIconWrapper>
      <StyledStepperInput type="text" value={value} readOnly />
      <StepperIconWrapper
        data-testid={testIncrementId}
        type="button"
        disabled={detectDisabled()}
        onClick={increment}
      >
        <Icon name="plusIcon" width={18} height={18} fill={Colors.DarkerBlue} />
      </StepperIconWrapper>
    </StepperWrapper>
  );
};
