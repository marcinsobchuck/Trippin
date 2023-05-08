import { useState } from 'react';

import { Formik, FormikHelpers, FormikProps } from 'formik';
import isEqual from 'lodash.isequal';
import { useTranslation } from 'react-i18next';

import { Icon } from 'src/components/Icon/Icon';
import { Colors } from 'src/enums/colors.enum';
import { SearchFormTypes } from 'src/shared/types';
import { Button } from 'src/styles/Button.styled';
import { useSearchContext } from 'src/views/Home/hooks/useSearchContext';

import {
  setIsParamsEqual,
  setRangeSliderValue,
  setSearchFormData,
} from '../../../../reducer/actions/search.actions';
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

export const SearchForm: React.FC<SearchFormProps> = ({ formRef, currentRecommendedPlace }) => {
  const [showFlightSettingsModal, setShowFlightSettingsModal] = useState<boolean>(false);

  const [{ searchFormData }, dispatch] = useSearchContext();

  const { t } = useTranslation();

  const handleSubmit = (submitData: SearchFormTypes, { setSubmitting }: FormikHelpers<SearchFormTypes>) => {
    const paramsCheck = isEqual(submitData, searchFormData);

    setIsParamsEqual(dispatch, paramsCheck);
    setRangeSliderValue(dispatch, [0, 0]);
    setSearchFormData(dispatch, submitData);

    setTimeout(() => setSubmitting(false), 1500);
  };

  return (
    <Wrapper>
      <Formik
        validationSchema={searchSchema}
        initialValues={initialValues}
        innerRef={formRef}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting }: FormikProps<SearchFormTypes>) => (
          <StyledForm>
            <SettingsWrapper>
              <SearchFormRadio name="flightType" />
              <FlightSettings onClick={() => setShowFlightSettingsModal((prevState) => !prevState)}>
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
              />
              <SearchFormInput
                label={t('views.home.labels.destination')}
                name="destination"
                placeholder={t('views.home.placeholders.destination')}
                type="text"
                currentRecommendedPlace={currentRecommendedPlace}
                isDestination
              />
              <SearchFormDatePicker name="date" />
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
