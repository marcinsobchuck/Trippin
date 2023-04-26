/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import { Colors } from 'src/enums/colors.enum';

import { Icon } from '../Icon/Icon';

import { CheckboxContainer, HiddenCheckbox, StyledCheckbox } from './Checkbox.styled';
import { CheckboxProps } from './Checkbox.types';

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label, disabled }) => (
  <CheckboxContainer disabled={disabled}>
    <HiddenCheckbox type="checkbox" checked={checked} onChange={onChange} disabled={disabled} />
    <StyledCheckbox checked={checked}>
      <Icon name="tickIcon" width={12} height={12} fill={Colors.White} />
    </StyledCheckbox>
    {label}
  </CheckboxContainer>
);
