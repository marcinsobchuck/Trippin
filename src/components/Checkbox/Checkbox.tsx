import React from 'react';

import tick from 'src/assets/images/tick.svg';

import {
  CheckboxContainer,
  HiddenCheckbox,
  Icon,
  StyledCheckbox,
} from './Checkbox.styled';

interface CheckboxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  disabled: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled,
}) => (
  <CheckboxContainer disabled={disabled}>
    <HiddenCheckbox
      type="checkbox"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
    />
    <StyledCheckbox checked={checked}>
      <Icon src={tick} />
    </StyledCheckbox>
    {label}
  </CheckboxContainer>
);
