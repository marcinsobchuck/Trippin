import React from 'react';

import { useField } from 'formik';
import { useTranslation } from 'react-i18next';

import { CustomRadioInput, StyledRadioInput } from 'src/styles/RadioInput.styled';

import { RadioWrapper, ReStyledRadioLabel, Title, Wrapper } from './SearchFormRadio.styled';
import { SearchFormRadioProps } from './SearchFormRadio.types';

export const SearchFormRadio: React.FC<SearchFormRadioProps> = ({ ...props }) => {
  const [field] = useField(props);

  const { t } = useTranslation();

  return (
    <Wrapper>
      <Title>{t('views.home.labels.flightType')}</Title>
      <RadioWrapper>
        <ReStyledRadioLabel>
          <StyledRadioInput {...field} type="radio" value="round" defaultChecked />
          <CustomRadioInput />
          {t('views.home.flightType.round')}
        </ReStyledRadioLabel>
        <ReStyledRadioLabel>
          <StyledRadioInput {...field} type="radio" value="oneway" />
          <CustomRadioInput />
          {t('views.home.flightType.oneway')}
        </ReStyledRadioLabel>
      </RadioWrapper>
    </Wrapper>
  );
};
