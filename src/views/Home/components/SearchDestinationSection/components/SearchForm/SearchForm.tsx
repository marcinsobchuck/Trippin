import { useState } from 'react';

import { Formik, FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';

import { Icon } from 'src/components/Icon/Icon';
import { Colors } from 'src/enums/colors.enum';
import { Button } from 'src/styles/Button.styled';
import { SearchFormTypes } from 'src/views/Home/types/types';

import { SearchFormDatePicker } from '../SearchFormDatePicker/SearchFormDatePicker';
import { SearchFormFlightSettingsModal } from '../SearchFormFlightSettingsModal/SearchFormFlightSettingsModal';
import { SearchFormInput } from '../SearchFormInput/SearchFormInput';
import { SearchFormRadio } from '../SearchFormRadio/SearchFormRadio';

import { initialValues } from './config';
import {
  FlightSettings,
  InputsWrapper,
  ItemText,
  ItemWrapper,
  PassengersWrapper,
  SettingsWrapper,
  StyledForm,
  Wrapper,
} from './SearchForm.styled';
import { SearchFormProps } from './SearchForm.types';
import { searchSchema } from './validationSchema';

export const SearchForm: React.FC<SearchFormProps> = ({ formRef, currentRecommendedPlace, onSubmit }) => {
  const [showFlightSettingsModal, setShowFlightSettingsModal] = useState<boolean>(false);

  const { t } = useTranslation();

  return (
    <Wrapper>
      <Formik
        validationSchema={searchSchema}
        initialValues={initialValues}
        innerRef={formRef}
        onSubmit={onSubmit}
      >
        {({ values, isSubmitting, errors }: FormikProps<SearchFormTypes>) => (
          <StyledForm>
            <SettingsWrapper>
              <SearchFormRadio name="flightType" />
              <FlightSettings
                type="button"
                onClick={() => setShowFlightSettingsModal((prevState) => !prevState)}
              >
                <PassengersWrapper>
                  <ItemWrapper>
                    <Icon name="adultIcon" width={16} height={16} fill={Colors.White} />
                    <ItemText>{values.flightSettings.adults}</ItemText>
                  </ItemWrapper>
                  <ItemWrapper>
                    <Icon name="childIcon" width={16} height={16} fill={Colors.White} />
                    <ItemText>{values.flightSettings.children}</ItemText>
                  </ItemWrapper>
                  <ItemWrapper>
                    <Icon name="infantIcon" width={16} height={16} fill={Colors.White} />
                    <ItemText>{values.flightSettings.infants}</ItemText>
                  </ItemWrapper>
                </PassengersWrapper>
                <ItemText>{t(values.flightSettings.cabin_key)}</ItemText>
              </FlightSettings>

              <SearchFormFlightSettingsModal
                setShowFlightSettingsModal={setShowFlightSettingsModal}
                showFlightSettingsModal={showFlightSettingsModal}
                name="flightSettings"
              />
            </SettingsWrapper>
            <InputsWrapper>
              <SearchFormInput
                label={t('views.home.labels.start')}
                name="start"
                placeholder={t('views.home.placeholders.start')}
                type="text"
                error={errors.start?.id}
              />
              <SearchFormInput
                label={t('views.home.labels.destination')}
                name="destination"
                placeholder={t('views.home.placeholders.destination')}
                type="text"
                currentRecommendedPlace={currentRecommendedPlace}
                isDestination
              />
              <SearchFormDatePicker name="date" error={errors.date} />
            </InputsWrapper>

            <Button variant="quaternary" type="submit" disabled={isSubmitting}>
              {t('views.home.buttons.search')}
            </Button>
          </StyledForm>
        )}
      </Formik>
    </Wrapper>
  );
};
